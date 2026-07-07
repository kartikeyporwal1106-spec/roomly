import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Users, DoorOpen, Building2, UsersRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatCourseYear } from "@/lib/roomly-data";
import { requireFirebaseUser } from "@/lib/firebase-user";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    await requireFirebaseUser();
  },
  component: Admin,
});

function Admin() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [users, hostels, rooms, requests] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("hostels").select("*", { count: "exact", head: true }),
        supabase.from("rooms").select("*", { count: "exact", head: true }),
        supabase.from("roommate_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
      ]);
      return {
        users: users.count ?? 0,
        hostels: hostels.count ?? 0,
        rooms: rooms.count ?? 0,
        pending: requests.count ?? 0,
      };
    },
  });

  const { data: recent } = useQuery({
    queryKey: ["admin-recent-users"],
    queryFn: async () => (await supabase.from("profiles")
      .select("id,name,email,branch,year,looking_status,profile_photo,created_at")
      .order("created_at", { ascending: false }).limit(20)).data ?? [],
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Overview of the Roomly platform.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Stat icon={UsersRound} label="Students" value={stats?.users ?? 0} />
          <Stat icon={Building2} label="Hostels" value={stats?.hostels ?? 0} />
          <Stat icon={DoorOpen} label="Rooms" value={stats?.rooms ?? 0} />
          <Stat icon={Users} label="Pending requests" value={stats?.pending ?? 0} />
        </div>

        <div className="surface-panel p-6">
          <h2 className="mb-4 text-lg font-semibold">Recent students</h2>
          <div className="space-y-2">
            {recent?.map((p: any) => (
              <div key={p.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent">
                <Avatar className="h-9 w-9"><AvatarImage src={p.profile_photo ?? undefined} /><AvatarFallback>{p.name?.[0] ?? "?"}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{p.name ?? p.email}</div>
                  <div className="truncate text-xs text-muted-foreground">{formatCourseYear(p.branch, p.year)}</div>
                </div>
                <Badge variant="outline">{p.looking_status ?? "—"}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: number }) {
  return (
    <Card className="surface-panel p-5">
      <Icon className="h-5 w-5 text-primary" />
      <div className="mt-3 text-3xl font-semibold tracking-tight">{value}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </Card>
  );
}
