import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { looksLabels, cleanlinessLabels, studyLabels, personalityLabels } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, Mail, Phone } from "lucide-react";
import { formatCourseYear, formatFloor } from "@/lib/roomly-data";
import { fetchCurrentProfile } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/profile/$id")({
  component: ProfilePage,
});

function ProfilePage() {
  const { id } = useParams({ from: "/_authenticated/profile/$id" });
  const qc = useQueryClient();
  const [sending, setSending] = useState(false);

  const { data: me } = useQuery({
    queryKey: ["profile", "self"],
    queryFn: fetchCurrentProfile,
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles")
        .select("*, room:rooms(room_number,floor:floors(floor_number,hostel:hostels(hostel_name)))")
        .eq("id", id).maybeSingle();
      return data;
    },
  });

  const { data: prefs } = useQuery({
    queryKey: ["preferences", id],
    queryFn: async () => (await supabase.from("preferences").select("*").eq("user_id", id).maybeSingle()).data,
  });

  const { data: request } = useQuery({
    queryKey: ["request-between", me?.id, id],
    enabled: !!me,
    queryFn: async () => {
      const { data } = await supabase.from("roommate_requests")
        .select("*")
        .or(`and(sender_id.eq.${me!.id},receiver_id.eq.${id}),and(sender_id.eq.${id},receiver_id.eq.${me!.id})`)
        .order("created_at", { ascending: false })
        .limit(1);
      return data?.[0] ?? null;
    },
  });

  const sendRequest = async () => {
    if (!me) return;
    setSending(true);
    try {
      const { error } = await supabase.from("roommate_requests").insert({
        sender_id: me.id, receiver_id: id, status: "pending",
      });
      if (error) throw error;
      toast.success("Request sent");
      qc.invalidateQueries({ queryKey: ["request-between"] });
    } catch (e: any) {
      toast.error(e.message ?? "Could not send request");
    } finally {
      setSending(false);
    }
  };

  if (isLoading) return <AppShell><Skeleton className="h-64 w-full" /></AppShell>;
  if (!profile) return <AppShell><div className="surface-panel p-8 text-center">Profile not found.</div></AppShell>;

  const isSelf = me?.id === profile.id;
  const accepted = request?.status === "accepted";

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="surface-panel p-8 lg:col-span-1">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.profile_photo ?? undefined} />
            <AvatarFallback className="text-2xl">{profile.name?.[0] ?? "?"}</AvatarFallback>
          </Avatar>
          <h1
            className="mt-4 text-2xl tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {profile.name}
          </h1>
          <div className="text-sm text-muted-foreground">{formatCourseYear(profile.branch, profile.year)}</div>
          <Badge variant="secondary" className="mt-3">{looksLabels[profile.looking_status ?? "not_looking"]}</Badge>

          {profile.room && (
            <div className="mt-6 rounded-lg border border-border p-4 text-sm">
              <div className="text-xs text-muted-foreground">Current room</div>
              <div className="mt-1 font-medium">Room {(profile.room as any).room_number}</div>
              <div className="text-xs text-muted-foreground">{(profile.room as any).floor.hostel.hostel_name} · {formatFloor((profile.room as any).floor.floor_number)}</div>
            </div>
          )}

          {!isSelf && (
            <div className="mt-6">
              {request?.status === "pending" ? (
                <Button disabled className="w-full">Request pending</Button>
              ) : accepted ? (
                <div className="rounded-lg border border-border p-4 text-sm">
                  <div className="mb-2 font-medium">Contact unlocked</div>
                  {profile.email && <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-3.5 w-3.5" /> {profile.email}</div>}
                  {profile.phone && <div className="mt-1 flex items-center gap-2 text-muted-foreground"><Phone className="h-3.5 w-3.5" /> {profile.phone}</div>}
                </div>
              ) : (
                <Button onClick={sendRequest} disabled={sending} className="w-full">
                  {sending && <Loader2 className="h-4 w-4 animate-spin" />} Send roommate request
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6 lg:col-span-2">
          {profile.bio && (
            <div className="surface-panel p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">About</div>
              <p className="mt-2 whitespace-pre-wrap text-sm">{profile.bio}</p>
            </div>
          )}

          {prefs && (
            <div className="surface-panel p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Lifestyle</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Row label="Sleeps at" value={prefs.sleep_time ?? "—"} />
                <Row label="Wakes at" value={prefs.wake_time ?? "—"} />
                <Row label="Cleanliness" value={prefs.cleanliness ? cleanlinessLabels[prefs.cleanliness] : "—"} />
                <Row label="Study style" value={prefs.study_style ? studyLabels[prefs.study_style] : "—"} />
                <Row label="Personality" value={prefs.personality ? personalityLabels[prefs.personality] : "—"} />
                <Row label="Music" value={prefs.music ?? "—"} />
              </div>
              {(prefs.languages?.length ?? 0) > 0 && (
                <div className="mt-4">
                  <div className="text-xs text-muted-foreground">Languages</div>
                  <div className="mt-1 flex flex-wrap gap-1">{prefs.languages!.map((l) => <Badge key={l} variant="outline">{l}</Badge>)}</div>
                </div>
              )}
              {(prefs.hobbies?.length ?? 0) > 0 && (
                <div className="mt-3">
                  <div className="text-xs text-muted-foreground">Hobbies</div>
                  <div className="mt-1 flex flex-wrap gap-1">{prefs.hobbies!.map((l) => <Badge key={l} variant="outline">{l}</Badge>)}</div>
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {prefs.smoking && <Badge variant="secondary">Smokes</Badge>}
                {prefs.drinking && <Badge variant="secondary">Drinks</Badge>}
                {prefs.gaming && <Badge variant="secondary">Gamer</Badge>}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
