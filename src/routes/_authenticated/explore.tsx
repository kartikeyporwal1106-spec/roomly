import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { looksLabels } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCourseYear, formatFloor, hostelGenderLabel } from "@/lib/roomly-data";

export const Route = createFileRoute("/_authenticated/explore")({
  component: Explore,
});

function Explore() {
  const [q, setQ] = useState("");
  const [hostelId, setHostelId] = useState<string>("all");
  const [year, setYear] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const { data: hostels } = useQuery({
    queryKey: ["hostels"],
    queryFn: async () => (await supabase.from("hostels").select("*").order("gender").order("hostel_name")).data ?? [],
  });

  const { data: people, isLoading } = useQuery({
    queryKey: ["explore", hostelId, year, status],
    queryFn: async () => {
      let query = supabase.from("profiles")
        .select("id,name,profile_photo,branch,year,looking_status,bio,room:rooms(id,room_number,floor:floors(floor_number,hostel:hostels(id,hostel_name)))")
        .eq("onboarding_complete", true)
        .order("created_at", { ascending: false })
        .limit(60);
      if (year !== "all") query = query.eq("year", parseInt(year, 10));
      if (status !== "all") query = query.eq("looking_status", status as any);
      const { data } = await query;
      return data ?? [];
    },
  });

  const filtered = useMemo(() => {
    return (people ?? []).filter((p: any) => {
      if (hostelId !== "all" && p.room?.floor?.hostel?.id !== hostelId) return false;
      if (q) {
        const s = q.toLowerCase();
        if (!(p.name?.toLowerCase().includes(s) || p.branch?.toLowerCase().includes(s))) return false;
      }
      return true;
    });
  }, [people, q, hostelId]);

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1
            className="text-3xl tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Explore roommates
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Find someone whose vibe matches yours.</p>
        </div>

        <div className="surface-panel flex flex-col gap-3 p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or course" className="pl-9" />
          </div>
          <Select value={hostelId} onValueChange={setHostelId}>
            <SelectTrigger className="md:w-44"><SelectValue placeholder="Hostel" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All hostels</SelectItem>
              {hostels?.map((h) => <SelectItem key={h.id} value={h.id}>{h.hostel_name} · {hostelGenderLabel(h.gender)}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="md:w-32"><SelectValue placeholder="Year" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any year</SelectItem>
              {[1,2,3,4,5].map((y) => <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="md:w-52"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="looking_for_roommate">Looking for roommate</SelectItem>
              <SelectItem value="looking_for_room">Looking for room</SelectItem>
              <SelectItem value="not_looking">Not looking</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}
          </div>
        ) : filtered.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p: any) => (
              <Link key={p.id} to="/profile/$id" params={{ id: p.id }} className="surface-panel group p-5 transition hover:border-primary/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12"><AvatarImage src={p.profile_photo ?? undefined} /><AvatarFallback>{p.name?.[0] ?? "?"}</AvatarFallback></Avatar>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{p.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{formatCourseYear(p.branch, p.year)}</div>
                  </div>
                </div>
                {p.room ? (
                  <div className="mt-3 text-xs text-muted-foreground">
                    {p.room.floor.hostel.hostel_name} · {formatFloor(p.room.floor.floor_number)}
                  </div>
                ) : null}
                {p.bio && <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.bio}</p>}
                <Badge variant="secondary" className="mt-3">{looksLabels[p.looking_status]}</Badge>
              </Link>
            ))}
          </div>
        ) : (
          <div className="surface-panel p-12 text-center text-sm text-muted-foreground">No matches. Try loosening the filters.</div>
        )}
      </div>
    </AppShell>
  );
}
