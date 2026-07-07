import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useEffect } from "react";
import { formatCourseYear } from "@/lib/roomly-data";
import { fetchCurrentProfile } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/requests")({
  component: Requests,
});

function Requests() {
  const qc = useQueryClient();
  const { data: me } = useQuery({ queryKey: ["profile", "self"], queryFn: fetchCurrentProfile });

  const { data: incoming } = useQuery({
    queryKey: ["req", "incoming", me?.id],
    enabled: !!me,
    queryFn: async () => (await supabase.from("roommate_requests")
      .select("*, sender:profiles!roommate_requests_sender_id_fkey(id,name,profile_photo,branch,year,email,phone)")
      .eq("receiver_id", me!.id).order("created_at", { ascending: false })).data ?? [],
  });

  const { data: outgoing } = useQuery({
    queryKey: ["req", "outgoing", me?.id],
    enabled: !!me,
    queryFn: async () => (await supabase.from("roommate_requests")
      .select("*, receiver:profiles!roommate_requests_receiver_id_fkey(id,name,profile_photo,branch,year,email,phone)")
      .eq("sender_id", me!.id).order("created_at", { ascending: false })).data ?? [],
  });

  useEffect(() => {
    // Mark notifications as read
    if (me) supabase.from("notifications").update({ read: true }).eq("user_id", me.id).eq("read", false).then();
  }, [me]);

  const respond = async (id: string, status: "accepted" | "rejected" | "cancelled") => {
    const { error } = await supabase.from("roommate_requests").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Request ${status}`);
    qc.invalidateQueries({ queryKey: ["req"] });
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Requests</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your incoming and outgoing roommate requests.</p>
        </div>

        <Tabs defaultValue="incoming">
          <TabsList>
            <TabsTrigger value="incoming">Incoming {incoming?.length ? `(${incoming.length})` : ""}</TabsTrigger>
            <TabsTrigger value="outgoing">Outgoing {outgoing?.length ? `(${outgoing.length})` : ""}</TabsTrigger>
          </TabsList>
          <TabsContent value="incoming" className="mt-4 space-y-3">
            {incoming?.length ? incoming.map((r: any) => (
              <div key={r.id} className="surface-panel flex flex-wrap items-center gap-4 p-4">
                <Link to="/profile/$id" params={{ id: r.sender.id }} className="flex items-center gap-3">
                  <Avatar className="h-12 w-12"><AvatarImage src={r.sender.profile_photo ?? undefined} /><AvatarFallback>{r.sender.name?.[0]}</AvatarFallback></Avatar>
                  <div>
                    <div className="font-medium">{r.sender.name}</div>
                    <div className="text-xs text-muted-foreground">{formatCourseYear(r.sender.branch, r.sender.year)}</div>
                  </div>
                </Link>
                <div className="ml-auto flex items-center gap-2">
                  <Badge variant="secondary">{r.status}</Badge>
                  {r.status === "pending" && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => respond(r.id, "rejected")}>Decline</Button>
                      <Button size="sm" onClick={() => respond(r.id, "accepted")}>Accept</Button>
                    </>
                  )}
                </div>
              </div>
            )) : <EmptyState text="No incoming requests yet." />}
          </TabsContent>
          <TabsContent value="outgoing" className="mt-4 space-y-3">
            {outgoing?.length ? outgoing.map((r: any) => (
              <div key={r.id} className="surface-panel flex flex-wrap items-center gap-4 p-4">
                <Link to="/profile/$id" params={{ id: r.receiver.id }} className="flex items-center gap-3">
                  <Avatar className="h-12 w-12"><AvatarImage src={r.receiver.profile_photo ?? undefined} /><AvatarFallback>{r.receiver.name?.[0]}</AvatarFallback></Avatar>
                  <div>
                    <div className="font-medium">{r.receiver.name}</div>
                    <div className="text-xs text-muted-foreground">{formatCourseYear(r.receiver.branch, r.receiver.year)}</div>
                  </div>
                </Link>
                <div className="ml-auto flex items-center gap-2">
                  <Badge variant="secondary">{r.status}</Badge>
                  {r.status === "pending" && (
                    <Button size="sm" variant="outline" onClick={() => respond(r.id, "cancelled")}>Cancel</Button>
                  )}
                </div>
              </div>
            )) : <EmptyState text="You haven't sent any requests." />}
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="surface-panel p-10 text-center text-sm text-muted-foreground">{text}</div>;
}
