import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { formatFloor } from "@/lib/roomly-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/complaints")({
  component: Complaints,
});

function Complaints() {
  const [filter, setFilter] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["complaints"],
    queryFn: async () => {
      // Fetch preferences joined with profiles and room/floor/hostel
      const { data } = await supabase
        .from("preferences")
        .select(`*, user:profiles(id,name,profile_photo,room:rooms(room_number,floor:floors(floor_number,hostel:hostels(hostel_name))))`)
        .order("user", { ascending: true });
      return data ?? [];
    },
  });

  if (isLoading) return <AppShell><Skeleton className="h-40 w-full" /></AppShell>;

  const rows = (data ?? []).filter((r: any) => {
    if (!filter) return true;
    const q = filter.toLowerCase();
    const name = (r.user?.name ?? "").toLowerCase();
    const roomNo = String((r.user?.room as any)?.room_number ?? "");
    const hostel = (r.user?.room as any)?.floor?.hostel?.hostel_name ?? "";
    return name.includes(q) || roomNo.includes(q) || hostel.toLowerCase().includes(q);
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Complaints & Amenities</h1>
            <p className="text-sm text-muted-foreground">View reported amenity issues across all rooms and floors.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search name, room or hostel" className="input" />
              <Search className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
            </div>
            <Link to="/settings" className="text-sm text-primary">Settings</Link>
          </div>
        </div>

        <div className="surface-panel p-4">
          <div className="grid gap-3">
            {rows.length === 0 ? (
              <div className="text-sm text-muted-foreground">No reports found.</div>
            ) : (
              rows.map((r: any) => {
                const u = r.user ?? {};
                const room = (u.room as any) ?? null;
                const hostel = room?.floor?.hostel?.hostel_name ?? "-";
                return (
                  <div key={r.user_id ?? Math.random()} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10"><AvatarImage src={u.profile_photo ?? undefined} /><AvatarFallback>{(u.name ?? "?")[0]}</AvatarFallback></Avatar>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{u.name ?? "Unknown"}</div>
                        <div className="text-xs text-muted-foreground truncate">{hostel} · {room ? `Room ${room.room_number} · ${formatFloor(room.floor?.floor_number)}` : "No room"}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <AmenBadge label="Exhaust" ok={!!r.amen_exhaust} />
                      <AmenBadge label="Fan" ok={!!r.amen_fan} />
                      <AmenBadge label="Curtains" ok={!!r.amen_curtains} />
                      <AmenBadge label="Bulb" ok={!!r.amen_bulb} />
                      <AmenBadge label="Cooler" ok={!!r.booking_cooler} />
                      <Link to={`/profile/${u.id}`} className="text-xs text-primary hover:underline">View</Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function AmenBadge({ label, ok }: { label: string; ok: boolean }) {
  return (
    <Badge variant={ok ? "secondary" : "destructive"} className="text-xs">{label}: {ok ? "OK" : "Issue"}</Badge>
  );
}
