import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Building2, DoorOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { compareRoomNumbers, formatFloor, hostelGenderLabel } from "@/lib/roomly-data";

export const Route = createFileRoute("/_authenticated/hostels")({
  component: Hostels,
});

function Hostels() {
  const [hostelId, setHostelId] = useState<string | null>(null);
  const [floorId, setFloorId] = useState<string | null>(null);

  const { data: hostels } = useQuery({
    queryKey: ["hostels"],
    queryFn: async () => (await supabase.from("hostels").select("*").order("gender").order("hostel_name")).data ?? [],
  });
  const { data: floors } = useQuery({
    queryKey: ["floors", hostelId],
    enabled: !!hostelId,
    queryFn: async () => (await supabase.from("floors").select("*").eq("hostel_id", hostelId!).order("floor_number")).data ?? [],
  });
  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms-full", floorId],
    enabled: !!floorId,
    queryFn: async () => {
      const { data } = await supabase.from("rooms")
        .select("id,room_number,capacity, occupants:profiles(id,name,profile_photo)")
        .eq("floor_id", floorId!);
      return (data ?? []).sort((a, b) => compareRoomNumbers(a.room_number, b.room_number));
    },
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Rooms</h1>
          <p className="mt-1 text-sm text-muted-foreground">Explore hostels, floors, and available beds.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-[220px_180px_1fr]">
          {/* Hostels */}
          <div className="surface-panel p-3">
            <div className="mb-2 flex items-center gap-2 px-2 text-xs uppercase tracking-widest text-muted-foreground"><Building2 className="h-3.5 w-3.5" /> Hostels</div>
            <div className="flex flex-col gap-1">
              {hostels?.map((h) => (
                <button key={h.id} onClick={() => { setHostelId(h.id); setFloorId(null); }}
                  className={cn("rounded-lg px-3 py-2 text-left text-sm hover:bg-accent", hostelId === h.id && "bg-accent text-foreground")}>
                  <span className="block">{h.hostel_name}</span>
                  <span className="block text-xs text-muted-foreground">{hostelGenderLabel(h.gender)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Floors */}
          <div className="surface-panel p-3">
            <div className="mb-2 px-2 text-xs uppercase tracking-widest text-muted-foreground">Floors</div>
            {hostelId ? (
              <div className="flex flex-col gap-1">
                {floors?.map((f) => (
                  <button key={f.id} onClick={() => setFloorId(f.id)}
                    className={cn("rounded-lg px-3 py-2 text-left text-sm hover:bg-accent", floorId === f.id && "bg-accent text-foreground")}>
                    {formatFloor(f.floor_number)}
                  </button>
                ))}
              </div>
            ) : <div className="px-2 py-4 text-xs text-muted-foreground">Pick a hostel.</div>}
          </div>

          {/* Rooms */}
          <div className="surface-panel p-4">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><DoorOpen className="h-3.5 w-3.5" /> Rooms</div>
            {!floorId ? (
              <div className="py-10 text-center text-sm text-muted-foreground">Pick a floor to see rooms.</div>
            ) : isLoading ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3"><Skeleton className="h-24" /><Skeleton className="h-24" /><Skeleton className="h-24" /></div>
            ) : (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {rooms?.map((r: any) => {
                  const occ = r.occupants?.length ?? 0;
                  const free = r.capacity - occ;
                  return (
                    <div key={r.id} className="rounded-xl border border-border p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">Room {r.room_number}</div>
                        <span className={cn("rounded-full px-2 py-0.5 text-xs", free > 0 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground")}>
                          {free > 0 ? `${free} free` : "Full"}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">Capacity: {r.capacity} · Occupied: {occ}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
