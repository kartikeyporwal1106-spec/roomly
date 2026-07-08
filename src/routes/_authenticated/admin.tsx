import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Users, DoorOpen, Building2, UsersRound, Loader2, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { parseExcelFile, type ParsedExcelRow } from "@/lib/excel";
import { toast } from "sonner";
import { formatCourseYear } from "@/lib/roomly-data";
import { requireFirebaseUser } from "@/lib/firebase-user";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    await requireFirebaseUser();
  },
  component: Admin,
});

function Admin() {
  const [excelRows, setExcelRows] = useState<ParsedExcelRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  const normalizedRows = useMemo(() => {
    return excelRows
      .map((row) => {
        const hostelName = String(row.hostel_name ?? row.hostel ?? row["Hostel Name"] ?? "").trim();
        const floorNumberRaw = row.floor_number ?? row.floor ?? row["Floor Number"];
        const roomNumber = String(row.room_number ?? row.room ?? row["Room Number"] ?? "").trim();
        const capacityRaw = row.capacity ?? row.cap ?? row["Capacity"];
        const floorNumber = Number(floorNumberRaw);
        const capacity = Number(capacityRaw || 2);

        return {
          hostel_name: hostelName,
          floor_number: Number.isFinite(floorNumber) ? floorNumber : null,
          room_number: roomNumber,
          capacity: Number.isFinite(capacity) && capacity > 0 ? capacity : 2,
          original: row,
        };
      })
      .filter((row) => row.hostel_name && row.floor_number !== null && row.room_number);
  }, [excelRows]);

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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewError(null);
    const file = event.target.files?.[0];
    if (!file) {
      setExcelRows([]);
      setFileName(null);
      return;
    }

    if (!/\.(xlsx|xls|csv)$/i.test(file.name)) {
      setPreviewError("Please upload an Excel (.xlsx/.xls) or CSV file.");
      setExcelRows([]);
      setFileName(file.name);
      return;
    }

    try {
      const parsed = await parseExcelFile(file);
      if (parsed.length === 0) {
        setPreviewError("No rows found in the uploaded file.");
        setExcelRows([]);
        setFileName(file.name);
        return;
      }
      setExcelRows(parsed);
      setFileName(file.name);
    } catch (error) {
      setPreviewError("Could not parse the spreadsheet file.");
      setExcelRows([]);
      setFileName(file.name);
    }
  };

  const importExcel = async () => {
    if (!normalizedRows.length) {
      toast.error("No valid room rows found to import.");
      return;
    }

    setImporting(true);
    try {
      const hostels = Array.from(new Map(normalizedRows.map((row) => [row.hostel_name, { hostel_name: row.hostel_name }])).values());
      await supabase.from("hostels").upsert(hostels, { onConflict: "hostel_name" });

      const { data: storedHostels, error: hostelQueryError } = await supabase
        .from("hostels")
        .select("id,hostel_name")
        .in("hostel_name", hostels.map((h) => h.hostel_name));
      if (hostelQueryError || !storedHostels) throw hostelQueryError || new Error("Could not lookup hostels");

      const hostelMap = new Map(storedHostels.map((hostel) => [hostel.hostel_name, hostel.id]));
      const floors = Array.from(
        new Map(
          normalizedRows.map((row) => [
            `${row.hostel_name}:${row.floor_number}`,
            { hostel_id: hostelMap.get(row.hostel_name)!, floor_number: row.floor_number },
          ]),
        ).values(),
      );

      await supabase.from("floors").upsert(floors, { onConflict: "hostel_id,floor_number" });
      const floorIds = Array.from(new Set(floors.map((item) => item.hostel_id)));
      const { data: storedFloors, error: floorQueryError } = await supabase
        .from("floors")
        .select("id,hostel_id,floor_number")
        .in("hostel_id", floorIds);
      if (floorQueryError || !storedFloors) throw floorQueryError || new Error("Could not lookup floors");

      const floorMap = new Map(storedFloors.map((floor) => [`${floor.hostel_id}:${floor.floor_number}`, floor.id]));
      const rooms = normalizedRows.map((row) => ({
        floor_id: floorMap.get(`${hostelMap.get(row.hostel_name)}:${row.floor_number}`)!,
        room_number: row.room_number,
        capacity: row.capacity,
      }));

      const { error: roomsError } = await supabase.from("rooms").upsert(rooms, { onConflict: "floor_id,room_number" });
      if (roomsError) throw roomsError;

      toast.success(`Imported ${rooms.length} room rows from ${fileName ?? "your file"}.`);
      setExcelRows([]);
      setFileName(null);
    } catch (error) {
      toast.error((error as Error)?.message ?? "Import failed.");
    } finally {
      setImporting(false);
    }
  };

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
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Import rooms from Excel</h2>
              <p className="text-sm text-muted-foreground">Upload a spreadsheet with hostel, floor and room data.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-accent">
                <Upload className="h-4 w-4" />
                <span>{fileName ? `Replace file` : `Select file`}</span>
                <input type="file" accept=".xlsx,.xls,.csv" className="sr-only" onChange={handleFileChange} />
              </label>
              <Button onClick={importExcel} disabled={!normalizedRows.length || importing}>
                {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Import"}
              </Button>
            </div>
          </div>
          {fileName && (
            <div className="mb-4 rounded-xl border border-border bg-muted/10 p-4 text-sm text-muted-foreground">
              {normalizedRows.length} valid rows parsed from <strong>{fileName}</strong>.
              {previewError && <div className="mt-2 text-destructive">{previewError}</div>}
            </div>
          )}
          {normalizedRows.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2">
              {normalizedRows.slice(0, 4).map((row, index) => (
                <div key={index} className="rounded-xl border border-border p-3">
                  <div className="text-sm font-semibold">{row.hostel_name}</div>
                  <div className="text-xs text-muted-foreground">Floor {row.floor_number} · Room {row.room_number} · Capacity {row.capacity}</div>
                </div>
              ))}
            </div>
          )}
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
