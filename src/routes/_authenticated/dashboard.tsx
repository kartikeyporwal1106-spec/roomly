import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { fetchCurrentProfile, looksLabels } from "@/lib/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, DoorOpen, Search, Users2, Bell } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { formatCourseYear, formatFloor } from "@/lib/roomly-data";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const { data: profile, error: profileError, isError, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchCurrentProfile,
    retry: 1,
  });

  useEffect(() => {
    if (!isLoading && profile && !profile.onboarding_complete) {
      navigate({ to: "/onboarding", replace: true });
    }
  }, [isLoading, navigate, profile]);

  const { data: suggested } = useQuery({
    queryKey: ["suggested", profile?.id],
    enabled: !!profile,
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id,name,profile_photo,branch,year,looking_status,room:rooms(room_number,floor:floors(floor_number,hostel:hostels(hostel_name)))")
        .eq("onboarding_complete", true)
        .neq("id", profile!.id)
        .eq("looking_status", "looking_for_roommate")
        .limit(6);
      return data ?? [];
    },
  });

  const { data: pending } = useQuery({
    queryKey: ["requests", "pending", profile?.id],
    enabled: !!profile,
    queryFn: async () => {
      const { data } = await supabase
        .from("roommate_requests")
        .select("id, sender:profiles!roommate_requests_sender_id_fkey(id,name,profile_photo,branch,year)")
        .eq("receiver_id", profile!.id).eq("status", "pending");
      return data ?? [];
    },
  });

  const { data: notes } = useQuery({
    queryKey: ["notifications", "recent", profile?.id],
    enabled: !!profile,
    queryFn: async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", profile!.id)
        .order("created_at", { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  if (isLoading) return <AppShell><Skeleton className="h-40 w-full" /></AppShell>;
  if (isError || !profile) {
    return (
      <AppShell>
        <div className="surface-panel mx-auto max-w-xl p-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard setup is not ready yet</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your Google login worked, but Roomly could not create or load your app profile from the database.
          </p>
          {profileError instanceof Error && (
            <p className="mt-3 rounded-md border border-border bg-muted/40 p-3 text-left text-xs text-muted-foreground">
              {profileError.message}
            </p>
          )}
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/onboarding" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">
              Finish setup
            </Link>
            <Link to="/auth" className="rounded-full border border-border px-5 py-2 text-sm font-medium">
              Back to sign in
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome */}
        <section className="surface-panel hero-glow relative overflow-hidden p-8">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Welcome back</div>
          <h1
            className="mt-2 text-3xl md:text-4xl tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {profile.name ?? "Hey there"} 👋
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {profile.looking_status
              ? looksLabels[profile.looking_status]
              : "Set your roommate status to start matching."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/explore" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              <Search className="h-4 w-4" /> Explore roommates
            </Link>
            <Link to="/settings" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">
              Edit profile
            </Link>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-3">
          {/* My room */}
          <div className="surface-panel p-6 md:col-span-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DoorOpen className="h-4 w-4" /> My room
            </div>
            {profile.room ? (
              <div className="mt-3">
                <div
                  className="text-2xl tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Room {(profile.room as any).room_number}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {formatFloor((profile.room as any).floor.floor_number)} · {(profile.room as any).floor.hostel.hostel_name}
                </div>
                <div className="mt-3 grid gap-2 text-sm">
                  <div className="text-xs text-muted-foreground">Room amenities</div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full border px-2 py-1 text-xs ${profile.booking_cooler ? 'bg-primary/10 border-primary' : 'bg-muted/10'}`}>Cooler booking: {profile.booking_cooler ? 'Yes' : 'No'}</span>
                    <span className={`rounded-full border px-2 py-1 text-xs ${profile.amen_exhaust ? 'bg-primary/10 border-primary' : 'bg-muted/10'}`}>Exhaust: {profile.amen_exhaust ? 'Working' : 'No'}</span>
                    <span className={`rounded-full border px-2 py-1 text-xs ${profile.amen_fan ? 'bg-primary/10 border-primary' : 'bg-muted/10'}`}>Fan: {profile.amen_fan ? 'Working' : 'No'}</span>
                    <span className={`rounded-full border px-2 py-1 text-xs ${profile.amen_curtains ? 'bg-primary/10 border-primary' : 'bg-muted/10'}`}>Curtains: {profile.amen_curtains ? 'Yes' : 'No'}</span>
                    <span className={`rounded-full border px-2 py-1 text-xs ${profile.amen_bulb ? 'bg-primary/10 border-primary' : 'bg-muted/10'}`}>Bulb: {profile.amen_bulb ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-3 text-sm text-muted-foreground">
                No room assigned yet.{" "}
                <Link to="/onboarding" className="text-primary hover:underline">Add one</Link>
              </div>
            )}
          </div>

          {/* Pending */}
          <div className="surface-panel p-6 md:col-span-1">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Users2 className="h-4 w-4" /> Pending requests</span>
              <Link to="/requests" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            {pending?.length ? (
              <div className="mt-3 space-y-2">
                {pending.slice(0, 3).map((p: any) => (
                  <Link key={p.id} to="/requests" className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent">
                    <Avatar className="h-8 w-8"><AvatarImage src={p.sender?.profile_photo ?? undefined} /><AvatarFallback>{p.sender?.name?.[0] ?? "?"}</AvatarFallback></Avatar>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{p.sender?.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{formatCourseYear(p.sender?.branch, p.sender?.year)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-3 text-sm text-muted-foreground">No pending requests.</div>
            )}
          </div>

          {/* Notifications */}
          <div className="surface-panel p-6 md:col-span-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Bell className="h-4 w-4" /> Notifications</div>
            {notes?.length ? (
              <div className="mt-3 space-y-3">
                {notes.map((n) => (
                  <div key={n.id} className="text-sm">
                    <div className="font-medium">{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.body}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-3 text-sm text-muted-foreground">You're all caught up.</div>
            )}
          </div>
        </div>

        {/* Suggested */}
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">Suggested roommates</h2>
            <Link to="/explore" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
              See all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {suggested?.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {suggested.map((p: any) => (
                <Link key={p.id} to="/profile/$id" params={{ id: p.id }} className="surface-panel group p-5 transition hover:border-primary/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12"><AvatarImage src={p.profile_photo ?? undefined} /><AvatarFallback>{p.name?.[0] ?? "?"}</AvatarFallback></Avatar>
                    <div className="min-w-0">
                      <div className="truncate font-medium">{p.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{formatCourseYear(p.branch, p.year)}</div>
                    </div>
                  </div>
                  {p.room && (
                    <div className="mt-3 text-xs text-muted-foreground">
                      {(p.room as any).floor.hostel.hostel_name} · {formatFloor((p.room as any).floor.floor_number)}
                    </div>
                  )}
                  <Badge variant="secondary" className="mt-3">{looksLabels[p.looking_status]}</Badge>
                </Link>
              ))}
            </div>
          ) : (
            <div className="surface-panel p-8 text-center text-sm text-muted-foreground">
              No matches yet. Try adjusting your preferences in{" "}
              <Link to="/settings" className="text-primary hover:underline">settings</Link>.
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
