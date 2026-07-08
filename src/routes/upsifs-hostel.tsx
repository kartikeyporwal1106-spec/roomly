import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentFirebaseUser } from "@/integrations/firebase/client";
import { parseExcelFile, type ParsedExcelRow } from "@/lib/excel";
import { COURSE_OPTIONS } from "@/lib/roomly-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Upload, ArrowLeft } from "lucide-react";

const EMAIL_KEYS = ["email", "college_email", "college email", "student_email", "student email"];
const NAME_KEYS = ["name", "student_name", "student name", "full_name", "full name"];
const ROLL_KEYS = ["roll_number", "roll no", "roll no.", "roll", "registration_number", "registration_no", "registration no"];
const HOSTEL_KEYS = ["hostel_name", "hostel", "hostel name"];
const FLOOR_KEYS = ["floor_number", "floor no", "floor no.", "floor", "floor number"];
const ROOM_KEYS = ["room_number", "room no", "room no.", "room", "room number"];
const BRANCH_KEYS = ["branch", "course", "department"];
const YEAR_KEYS = ["year", "sem", "semester", "class"];
const GENDER_KEYS = ["gender", "sex"];
const AMENITY_KEYS = {
  amen_exhaust: ["amen_exhaust", "exhaust", "exhaust working", "has_exhaust"],
  amen_fan: ["amen_fan", "fan", "fan working", "has_fan"],
  booking_cooler: ["booking_cooler", "cooler", "cooler working", "has_cooler"],
  amen_curtains: ["amen_curtains", "curtains", "has_curtains"],
  amen_bulb: ["amen_bulb", "bulb", "has_bulb", "light"] as string[],
};

type NormalizedImportRow = {
  email: string;
  name: string;
  roll_number?: string;
  branch?: string;
  year?: number;
  gender?: string;
  hostel_name: string;
  floor_number: number;
  room_number: string;
  booking_cooler: boolean;
  amen_exhaust: boolean;
  amen_fan: boolean;
  amen_curtains: boolean;
  amen_bulb: boolean;
};

function getStringField(row: ParsedExcelRow, keys: string[]) {
  for (const key of keys) {
    const value = row[key];
    if (value == null) continue;
    const trimmed = String(value).trim();
    if (trimmed) return trimmed;
  }
  return undefined;
}

function getNumberField(row: ParsedExcelRow, keys: string[]) {
  const value = getStringField(row, keys);
  if (!value) return undefined;
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function getBooleanField(row: ParsedExcelRow, keys: string[]) {
  const value = getStringField(row, keys);
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return ["true", "yes", "y", "1", "on", "available", "present", "ok", "working"].includes(normalized);
}

function normalizeImportRow(row: ParsedExcelRow): NormalizedImportRow | null {
  const email = getStringField(row, EMAIL_KEYS);
  const name = getStringField(row, NAME_KEYS);
  const hostel_name = getStringField(row, HOSTEL_KEYS);
  const floor_number = getNumberField(row, FLOOR_KEYS);
  const room_number = getStringField(row, ROOM_KEYS);

  if (!email || !name || !hostel_name || floor_number == null || !room_number) {
    return null;
  }

  const roll_number = getStringField(row, ROLL_KEYS);
  const branch = getStringField(row, BRANCH_KEYS);
  const year = getNumberField(row, YEAR_KEYS);
  const gender = getStringField(row, GENDER_KEYS);

  return {
    email,
    name,
    roll_number: roll_number || undefined,
    branch: branch || undefined,
    year: year ?? undefined,
    gender: gender || undefined,
    hostel_name,
    floor_number,
    room_number,
    booking_cooler: getBooleanField(row, AMENITY_KEYS.booking_cooler),
    amen_exhaust: getBooleanField(row, AMENITY_KEYS.amen_exhaust),
    amen_fan: getBooleanField(row, AMENITY_KEYS.amen_fan),
    amen_curtains: getBooleanField(row, AMENITY_KEYS.amen_curtains),
    amen_bulb: getBooleanField(row, AMENITY_KEYS.amen_bulb),
  };
}

function validateCollegeEmail(value: string) {
  const email = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const Route = createFileRoute("/upsifs-hostel")({
  head: () => ({
    meta: [
      { title: "UPSIFS Hostel registration" },
      { name: "description", content: "Register hostel students using a college email and sync spreadsheet data with the hostel system." },
    ],
  }),
  component: UpsifsHostel,
});

function UpsifsHostel() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("1");
  const [gender, setGender] = useState("");
  const [hostelId, setHostelId] = useState("");
  const [floorId, setFloorId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [bookingCooler, setBookingCooler] = useState(false);
  const [amenExhaust, setAmenExhaust] = useState(false);
  const [amenFan, setAmenFan] = useState(false);
  const [amenCurtains, setAmenCurtains] = useState(false);
  const [amenBulb, setAmenBulb] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);

  const [excelRows, setExcelRows] = useState<ParsedExcelRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  const { data: hostels } = useQuery({
    queryKey: ["hostels"],
    queryFn: async () => (await supabase.from("hostels").select("*").order("hostel_name")).data ?? [],
  });

  const { data: floors } = useQuery({
    queryKey: ["floors", hostelId],
    enabled: !!hostelId,
    queryFn: async () => (await supabase.from("floors").select("*").eq("hostel_id", hostelId).order("floor_number")).data ?? [],
  });

  const { data: rooms } = useQuery({
    queryKey: ["rooms", floorId],
    enabled: !!floorId,
    queryFn: async () => {
      const { data } = await supabase.from("rooms").select("*").eq("floor_id", floorId);
      return (data ?? []).sort((a, b) => a.room_number.localeCompare(b.room_number, undefined, { numeric: true }));
    },
  });

  const adminEmails = useMemo(
    () => (import.meta.env.VITE_UPSIFS_ADMIN_EMAILS ?? "admin@upsifs.edu")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
    [],
  );

  useEffect(() => {
    getCurrentFirebaseUser().then((user) => {
      const email = user?.email?.toLowerCase() ?? "";
      setIsAdmin(Boolean(email && adminEmails.includes(email)));
      setAdminChecked(true);
    });
  }, [adminEmails]);

  const importRows = useMemo(() => {
    return excelRows.map(normalizeImportRow).filter((value): value is NormalizedImportRow => Boolean(value));
  }, [excelRows]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateCollegeEmail(email)) {
      toast.error("Enter a valid college email.");
      return;
    }
    if (!name.trim()) {
      toast.error("Enter the student's name.");
      return;
    }
    if (!hostelId || !floorId || !roomId) {
      toast.error("Select hostel, floor, and room.");
      return;
    }

    setSubmitting(true);
    try {
      const profilePayload = {
        email: email.trim(),
        name: name.trim(),
        roll_number: rollNumber.trim() || null,
        branch: branch.trim() || null,
        year: Number.isFinite(Number(year)) ? Number(year) : null,
        gender: gender || null,
        room_id: roomId,
        onboarding_complete: true,
      } as any;

      const { data: existingProfiles } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", profilePayload.email)
        .maybeSingle();

      let profileId: string;
      if (existingProfiles?.id) {
        await supabase.from("profiles").update(profilePayload).eq("id", existingProfiles.id);
        profileId = existingProfiles.id;
      } else {
        const { data: inserted, error: insertError } = await supabase
          .from("profiles")
          .insert(profilePayload)
          .select("id")
          .single();
        if (insertError || !inserted) throw insertError || new Error("Failed to save profile.");
        profileId = inserted.id;
      }

      const preferencePayload = {
        user_id: profileId,
        booking_cooler: bookingCooler,
        amen_exhaust: amenExhaust,
        amen_fan: amenFan,
        amen_curtains: amenCurtains,
        amen_bulb: amenBulb,
      } as any;
      const { error: prefError } = await supabase.from("preferences").upsert(preferencePayload, { onConflict: "user_id" });
      if (prefError) throw prefError;

      toast.success("Hostel profile saved successfully.");
      setEmail("");
      setName("");
      setRollNumber("");
      setBranch("");
      setYear("1");
      setGender("");
      setHostelId("");
      setFloorId("");
      setRoomId("");
      setBookingCooler(false);
      setAmenExhaust(false);
      setAmenFan(false);
      setAmenCurtains(false);
      setAmenBulb(false);
    } catch (error) {
      toast.error((error as Error)?.message ?? "Could not create the profile.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPreviewError(null);
    const file = event.target.files?.[0];
    if (!file) {
      setExcelRows([]);
      setFileName(null);
      return;
    }

    if (!/\.(xlsx|xls|csv)$/i.test(file.name)) {
      setPreviewError("Please upload a .xlsx, .xls, or .csv file.");
      setExcelRows([]);
      setFileName(file.name);
      return;
    }

    try {
      const parsed = await parseExcelFile(file);
      if (!parsed.length) {
        setPreviewError("No rows were found in the uploaded spreadsheet.");
        setExcelRows([]);
        setFileName(file.name);
        return;
      }
      setExcelRows(parsed);
      setFileName(file.name);
    } catch {
      setPreviewError("Could not parse the spreadsheet file.");
      setExcelRows([]);
      setFileName(file.name);
    }
  }

  async function handleImport() {
    if (!importRows.length) {
      toast.error("No valid rows found in the spreadsheet.");
      return;
    }

    setImporting(true);
    try {
      const hostelsToUpsert = Array.from(
        new Map(importRows.map((row) => [row.hostel_name, { hostel_name: row.hostel_name }])).values(),
      );
      const { error: hostelError } = await supabase.from("hostels").upsert(hostelsToUpsert, { onConflict: "hostel_name" });
      if (hostelError) throw hostelError;

      const hostelList = await supabase
        .from("hostels")
        .select("id,hostel_name")
        .in("hostel_name", hostelsToUpsert.map((hostel) => hostel.hostel_name));
      if (hostelList.error || !hostelList.data) throw hostelList.error || new Error("Could not load hostels.");
      const hostelMap = new Map(hostelList.data.map((hostel) => [hostel.hostel_name, hostel.id]));

      const floorsToUpsert = Array.from(
        new Map(
          importRows.map((row) => [
            `${row.hostel_name}:${row.floor_number}`,
            { hostel_id: hostelMap.get(row.hostel_name)!, floor_number: row.floor_number },
          ]),
        ).values(),
      );
      const { error: floorError } = await supabase.from("floors").upsert(floorsToUpsert, { onConflict: "hostel_id,floor_number" });
      if (floorError) throw floorError;

      const floorIds = Array.from(new Set(floorsToUpsert.map((floor) => floor.hostel_id)));
      const floorList = await supabase
        .from("floors")
        .select("id,hostel_id,floor_number")
        .in("hostel_id", floorIds);
      if (floorList.error || !floorList.data) throw floorList.error || new Error("Could not load floors.");
      const floorMap = new Map(
        floorList.data.map((floor) => [`${floor.hostel_id}:${floor.floor_number}`, floor.id]),
      );

      const roomsToUpsert = Array.from(
        new Map(
          importRows.map((row) => {
            const floorId = floorMap.get(`${hostelMap.get(row.hostel_name)}:${row.floor_number}`);
            return [`${hostelMap.get(row.hostel_name)}:${row.floor_number}:${row.room_number}`, {
              floor_id: floorId!,
              room_number: row.room_number,
              capacity: 2,
            }];
          }),
        ).values(),
      );
      const { error: roomError } = await supabase.from("rooms").upsert(roomsToUpsert, { onConflict: "floor_id,room_number" });
      if (roomError) throw roomError;

      const roomFloorIds = Array.from(new Set(roomsToUpsert.map((room) => room.floor_id)));
      const roomList = await supabase
        .from("rooms")
        .select("id,floor_id,room_number")
        .in("floor_id", roomFloorIds);
      if (roomList.error || !roomList.data) throw roomList.error || new Error("Could not load rooms.");
      const roomMap = new Map(roomList.data.map((room) => [`${room.floor_id}:${room.room_number}`, room.id]));

      const emails = Array.from(new Set(importRows.map((row) => row.email)));
      const profileLookup = await supabase
        .from("profiles")
        .select("id,email")
        .in("email", emails);
      if (profileLookup.error) throw profileLookup.error;
      const existingProfiles = new Map(profileLookup.data?.map((profile) => [profile.email, profile.id]) ?? []);

      for (const row of importRows) {
        const roomId = roomMap.get(`${floorMap.get(`${hostelMap.get(row.hostel_name)}:${row.floor_number}`)}:${row.room_number}`);
        if (!roomId) continue;

        const profilePayload = {
          email: row.email,
          name: row.name,
          roll_number: row.roll_number ?? null,
          branch: row.branch ?? null,
          year: row.year ?? null,
          gender: row.gender ?? null,
          room_id: roomId,
          onboarding_complete: true,
        } as any;

        let profileId = existingProfiles.get(row.email);
        if (profileId) {
          const { error: updateError } = await supabase
            .from("profiles")
            .update(profilePayload)
            .eq("id", profileId);
          if (updateError) throw updateError;
        } else {
          const { data: inserted, error: insertError } = await supabase
            .from("profiles")
            .insert(profilePayload)
            .select("id")
            .single();
          if (insertError || !inserted) throw insertError || new Error("Failed to create profile.");
          profileId = inserted.id;
          existingProfiles.set(row.email, profileId);
        }

        const preferencesPayload = {
          user_id: profileId,
          booking_cooler: row.booking_cooler,
          amen_exhaust: row.amen_exhaust,
          amen_fan: row.amen_fan,
          amen_curtains: row.amen_curtains,
          amen_bulb: row.amen_bulb,
        } as any;
        const { error: prefError } = await supabase.from("preferences").upsert(preferencesPayload, { onConflict: "user_id" });
        if (prefError) throw prefError;
      }

      toast.success(`Imported ${importRows.length} student rows from ${fileName ?? "spreadsheet"}.`);
      setExcelRows([]);
      setFileName(null);
      setPreviewError(null);
    } catch (error) {
      toast.error((error as Error)?.message ?? "Could not import spreadsheet data.");
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="hero-glow min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary">UPSIFS Hostel</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Register students with college email and hostel amenities.</h1>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
              Add or update student profiles, including room assignment and amenities for exhaust, fan, cooler, curtains, and bulb.
            </p>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-accent">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <section className="surface-panel p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">College email registration</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Create or update an individual student profile with college email only.</p>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Manual entry</span>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5" placeholder="student@college.edu" />
                </div>
                <div>
                  <Label>Name</Label>
                  <Input value={name} onChange={(event) => setName(event.target.value)} className="mt-1.5" placeholder="Student name" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label>Roll number</Label>
                  <Input value={rollNumber} onChange={(event) => setRollNumber(event.target.value)} className="mt-1.5" placeholder="Roll number" />
                </div>
                <div>
                  <Label>Course / branch</Label>
                  <Select value={branch} onValueChange={setBranch}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select course" /></SelectTrigger>
                    <SelectContent>
                      {COURSE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Year</Label>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <SelectItem key={value} value={String(value)}>{`Year ${value}`}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label>Hostel</Label>
                  <Select value={hostelId} onValueChange={(value) => { setHostelId(value); setFloorId(""); setRoomId(""); }}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select hostel" /></SelectTrigger>
                    <SelectContent>
                      {hostels?.map((hostel) => (
                        <SelectItem key={hostel.id} value={hostel.id}>{hostel.hostel_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Floor</Label>
                  <Select value={floorId} onValueChange={(value) => { setFloorId(value); setRoomId(""); }} disabled={!hostelId}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select floor" /></SelectTrigger>
                    <SelectContent>{floors?.map((floor) => (
                      <SelectItem key={floor.id} value={floor.id}>{`Floor ${floor.floor_number}`}</SelectItem>
                    ))}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Room</Label>
                  <Select value={roomId} onValueChange={setRoomId} disabled={!floorId}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select room" /></SelectTrigger>
                    <SelectContent>{rooms?.map((room) => (
                      <SelectItem key={room.id} value={room.id}>{`Room ${room.room_number}`}</SelectItem>
                    ))}</SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                  <span>Cooler booked</span>
                  <Switch checked={bookingCooler} onCheckedChange={setBookingCooler} />
                </label>
                <label className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                  <span>Exhaust available</span>
                  <Switch checked={amenExhaust} onCheckedChange={setAmenExhaust} />
                </label>
                <label className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                  <span>Fan available</span>
                  <Switch checked={amenFan} onCheckedChange={setAmenFan} />
                </label>
                <label className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                  <span>Curtains available</span>
                  <Switch checked={amenCurtains} onCheckedChange={setAmenCurtains} />
                </label>
                <label className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                  <span>Bulb installed</span>
                  <Switch checked={amenBulb} onCheckedChange={setAmenBulb} />
                </label>
              </div>

              <Button type="submit" disabled={submitting} className="mt-4 w-full">
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save student
              </Button>
            </form>
          </section>

          {isAdmin ? (
            <section className="surface-panel p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Spreadsheet sync</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Upload Excel / CSV to create or update many student profiles at once.</p>
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">
                  <Upload className="h-4 w-4" />
                  <span>{fileName ? `Replace file` : `Select sheet`}</span>
                  <input type="file" accept=".xlsx,.xls,.csv" className="sr-only" onChange={handleFileChange} />
                </label>
              </div>

              {fileName && (
              <div className="mb-4 rounded-xl border border-border bg-muted/10 p-4 text-sm text-muted-foreground">
                {importRows.length} valid student rows parsed from <strong>{fileName}</strong>.
                {previewError ? <div className="mt-2 text-destructive">{previewError}</div> : null}
              </div>
            )}

            {importRows.length > 0 ? (
              <div className="space-y-3">
                {importRows.slice(0, 5).map((row, index) => (
                  <Card key={index} className="rounded-xl border border-border p-4">
                    <div className="font-medium">{row.name} · {row.email}</div>
                    <div className="text-sm text-muted-foreground">{row.hostel_name} · Floor {row.floor_number} · Room {row.room_number}</div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-border bg-muted/5 p-4 text-sm text-muted-foreground">Upload a sheet with columns like email, name, hostel_name, floor_number, room_number, booking_cooler, amen_exhaust, amen_fan, amen_curtains, amen_bulb.</p>
            )}

            <Button onClick={handleImport} disabled={!importRows.length || importing} className="mt-5 w-full">
              {importing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Import spreadsheet data
            </Button>
          </section>
          ) : (
            adminChecked && (
              <section className="surface-panel p-6">
                <h2 className="text-lg font-semibold">Admin-only spreadsheet sync</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Spreadsheet upload is only available to admin users. Sign in with an admin account to update from Excel.
                </p>
              </section>
            )
          )}
        </div>
      </div>
    </div>
  );
}
