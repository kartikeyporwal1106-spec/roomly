import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Loader2, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COURSE_OPTIONS, compareRoomNumbers, formatFloor, hostelGenderLabel } from "@/lib/roomly-data";
import { getCurrentFirebaseUser } from "@/integrations/firebase/client";
import { fetchCurrentProfile } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/onboarding")({
  component: Onboarding,
});

type Step = 0 | 1 | 2 | 3 | 4;

const cleanLevels = ["messy", "average", "tidy", "very_tidy"] as const;

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState<string>("1");
  const [gender, setGender] = useState<string>("prefer_not_to_say");

  const [hostelId, setHostelId] = useState<string>("");
  const [floorId, setFloorId] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [errors, setErrors] = useState<{ hostel?: string; room?: string }>({});

  const [sleepTime, setSleepTime] = useState("23:30");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [cleanIdx, setCleanIdx] = useState([2]);
  const [studyStyle, setStudyStyle] = useState<string>("flexible");
  const [personality, setPersonality] = useState<string>("ambivert");
  const [languages, setLanguages] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [bookingCooler, setBookingCooler] = useState(false);
  const [amenExhaust, setAmenExhaust] = useState(false);
  const [amenFan, setAmenFan] = useState(false);
  const [amenCurtains, setAmenCurtains] = useState(false);
  const [amenBulb, setAmenBulb] = useState(false);

  const [lookingStatus, setLookingStatus] = useState("looking_for_roommate");
  const [bio, setBio] = useState("");
  const [smoking, setSmoking] = useState(false);
  const [drinking, setDrinking] = useState(false);
  const [gaming, setGaming] = useState(false);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load existing
  useEffect(() => {
    (async () => {
      try {
        const p = await fetchCurrentProfile();
        if (p) {
          setName(p.name ?? "");
          setRollNumber(p.roll_number ?? "");
          setCourse(p.branch ?? "");
          setYear(String(p.year ?? "1"));
          setGender(p.gender ?? "prefer_not_to_say");
          setLookingStatus(p.looking_status ?? "looking_for_roommate");
          setBio(p.bio ?? "");
          setPhotoUrl(p.profile_photo);
          if (p.room_id) {
            setRoomId(p.room_id);
            const { data: room } = await supabase
              .from("rooms")
              .select("id,floor_id,floor:floors(id,hostel_id)")
              .eq("id", p.room_id)
              .maybeSingle();
            if (room) {
              setFloorId(room.floor_id);
              setHostelId((room.floor as any)?.hostel_id ?? "");
            }
          }
          if (p.onboarding_complete) navigate({ to: "/dashboard" });
        }
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "Could not load your profile.");
      }
    })();
  }, [navigate]);

  const { data: hostels } = useQuery({
    queryKey: ["hostels"],
    queryFn: async () => (await supabase.from("hostels").select("*").order("gender").order("hostel_name")).data ?? [],
  });
  const filteredHostels = (hostels ?? []).filter((h) => {
    if (gender === "male" || gender === "female") return h.gender === gender;
    return true;
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
      return (data ?? []).sort((a, b) => compareRoomNumbers(a.room_number, b.room_number));
    },
  });

  const totalSteps = 5;

  const next = () => {
    // when moving forward from hostel step, require hostel + room
    if (step === 1) {
      const e: { hostel?: string; room?: string } = {};
      if (!hostelId) e.hostel = "Please select your hostel";
      if (!roomId) e.room = "Please select your room";
      if (e.hostel || e.room) {
        setErrors(e);
        if (e.hostel) toast.error(e.hostel);
        else if (e.room) toast.error(e.room);
        return;
      }
      setErrors({});
    }
    setStep((s) => (Math.min(4, s + 1) as Step));
  };
  const prev = () => setStep((s) => (Math.max(0, s - 1) as Step));

  const uploadPhoto = async (file: File) => {
    setUploading(true);
    try {
      const user = await getCurrentFirebaseUser();
      if (!user) return;
      const ext = file.name.split(".").pop();
      const path = `${user.uid}/avatar-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
      if (upErr) throw upErr;
      const { data: signed } = await supabase.storage.from("avatars").createSignedUrl(path, 60 * 60 * 24 * 365);
      setPhotoUrl(signed?.signedUrl ?? null);
      toast.success("Photo uploaded");
    } catch (e: any) {
      toast.error(e.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const finish = async () => {
    setSaving(true);
    try {
      const user = await getCurrentFirebaseUser();
      if (!user) throw new Error("Not signed in");

      const profileUpdate = {
        firebase_uid: user.uid,
        email: user.email,
        name,
        roll_number: rollNumber,
        branch: course,
        year: parseInt(year, 10),
        gender: gender as any,
        looking_status: lookingStatus as any,
        bio,
        profile_photo: photoUrl,
        room_id: roomId || null,
        onboarding_complete: true,
      };
      const { data: profile, error: pErr } = await supabase
        .from("profiles")
        .upsert(profileUpdate as any, { onConflict: "firebase_uid" })
        .select("id")
        .single();
      if (pErr) throw pErr;

      const prefs = {
        user_id: profile.id,
        sleep_time: sleepTime,
        wake_time: wakeTime,
        cleanliness: cleanLevels[cleanIdx[0]] as any,
        study_style: studyStyle as any,
        personality: personality as any,
        languages: languages.split(",").map((s) => s.trim()).filter(Boolean),
        hobbies: hobbies.split(",").map((s) => s.trim()).filter(Boolean),
        smoking, drinking, gaming,
        booking_cooler: bookingCooler,
        amen_exhaust: amenExhaust,
        amen_fan: amenFan,
        amen_curtains: amenCurtains,
        amen_bulb: amenBulb,
      };
      const { error: prefErr } = await supabase.from("preferences").upsert(prefs);
      if (prefErr) throw prefErr;

      toast.success("You're all set!");
      navigate({ to: "/dashboard" });
    } catch (e: any) {
      toast.error(e.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="hero-glow min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs text-muted-foreground">
            <span>Step {step + 1} of {totalSteps}</span>
            <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
          </div>
          <Progress value={((step + 1) / totalSteps) * 100} />
        </div>

        <div className="surface-panel p-8 md:p-10">
          {loadError && (
            <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              {loadError}
            </div>
          )}

          {step === 0 && (
            <div className="space-y-5">
              <h1 className="text-2xl font-semibold tracking-tight">Tell us about you</h1>
              <p className="-mt-2 text-sm text-muted-foreground">Basic details so people know who you are.</p>
              <div><Label>Full name</Label><Input className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div className="grid gap-4 md:grid-cols-2">
                <div><Label>Roll number</Label><Input className="mt-1.5" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} /></div>
                <div>
                  <Label>Course</Label>
                  <Select value={course} onValueChange={setCourse}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select your course" /></SelectTrigger>
                    <SelectContent>
                      {COURSE_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Year</Label>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>{[1,2,3,4,5].map((y) => <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h1 className="text-2xl font-semibold tracking-tight">Your hostel</h1>
              <p className="-mt-2 text-sm text-muted-foreground">Where do you live right now? (You can skip if unsure.)</p>
              <div>
                <Label>Hostel</Label>
                <Select value={hostelId} onValueChange={(v) => { setHostelId(v); setFloorId(""); setRoomId(""); }}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select a hostel" /></SelectTrigger>
                  <SelectContent>
                    {filteredHostels.map((h) => (
                      <SelectItem key={h.id} value={h.id}>{h.hostel_name} · {hostelGenderLabel(h.gender)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {hostelId && (
                <div>
                  <Label>Floor</Label>
                  <Select value={floorId} onValueChange={(v) => { setFloorId(v); setRoomId(""); }}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select a floor" /></SelectTrigger>
                    <SelectContent>{floors?.map((f) => <SelectItem key={f.id} value={f.id}>{formatFloor(f.floor_number)}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              )}
              {floorId && (
                <div>
                  <Label>Room</Label>
                  <Select value={roomId} onValueChange={setRoomId}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select a room" /></SelectTrigger>
                    <SelectContent>{rooms?.map((r) => <SelectItem key={r.id} value={r.id}>Room {r.room_number}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              )}
              {roomId && (
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <label className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                    <span>Exhaust working</span>
                    <Switch checked={amenExhaust} onCheckedChange={setAmenExhaust} />
                  </label>
                  <label className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                    <span>Fan working</span>
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
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h1 className="text-2xl font-semibold tracking-tight">Your lifestyle</h1>
              <p className="-mt-2 text-sm text-muted-foreground">Helps us match you with compatible people.</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div><Label>Sleep time</Label><Input type="time" className="mt-1.5" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} /></div>
                <div><Label>Wake time</Label><Input type="time" className="mt-1.5" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} /></div>
              </div>
              <div>
                <Label>Cleanliness</Label>
                <Slider value={cleanIdx} min={0} max={3} step={1} onValueChange={setCleanIdx} className="mt-3" />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>Relaxed</span><span>Average</span><span>Tidy</span><span>Very tidy</span></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Study style</Label>
                  <Select value={studyStyle} onValueChange={setStudyStyle}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="early_bird">Early bird</SelectItem>
                      <SelectItem value="night_owl">Night owl</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Personality</Label>
                  <Select value={personality} onValueChange={setPersonality}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="introvert">Introvert</SelectItem>
                      <SelectItem value="ambivert">Ambivert</SelectItem>
                      <SelectItem value="extrovert">Extrovert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Languages</Label><Input className="mt-1.5" placeholder="Hindi, English, Tamil" value={languages} onChange={(e) => setLanguages(e.target.value)} /></div>
              <div><Label>Hobbies</Label><Input className="mt-1.5" placeholder="Cricket, coding, music" value={hobbies} onChange={(e) => setHobbies(e.target.value)} /></div>
              <div className="grid gap-3 md:grid-cols-3">
                <label className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"><span>Smoking</span><Switch checked={smoking} onCheckedChange={setSmoking} /></label>
                <label className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"><span>Drinking</span><Switch checked={drinking} onCheckedChange={setDrinking} /></label>
                <label className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"><span>Gaming</span><Switch checked={gaming} onCheckedChange={setGaming} /></label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h1 className="text-2xl font-semibold tracking-tight">What are you looking for?</h1>
              <RadioGroup value={lookingStatus} onValueChange={setLookingStatus} className="gap-3">
                {[
                  ["looking_for_roommate", "Looking for a roommate", "You have a room and want someone to share it."],
                  ["looking_for_room", "Looking for a room", "You need a room and are open to joining one."],
                  ["not_looking", "Not looking", "Just browsing for now."],
                ].map(([val, title, desc]) => (
                  <label key={val} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 hover:bg-accent">
                    <RadioGroupItem value={val} className="mt-1" />
                    <div>
                      <div className="font-medium">{title}</div>
                      <div className="text-sm text-muted-foreground">{desc}</div>
                    </div>
                  </label>
                ))}
              </RadioGroup>
              <div>
                <Label>Short bio (optional)</Label>
                <Textarea className="mt-1.5" rows={4} placeholder="Say hi in a sentence or two." value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <h1 className="text-2xl font-semibold tracking-tight">Add a profile photo</h1>
              <p className="-mt-2 text-sm text-muted-foreground">Optional, but helps people recognize you.</p>
              <div className="flex items-center gap-5">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={photoUrl ?? undefined} />
                  <AvatarFallback>{(name || "?")[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {photoUrl ? "Replace photo" : "Upload photo"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && uploadPhoto(e.target.files[0])} />
                </label>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={prev} disabled={step === 0}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            {step < 4 ? (
              <Button onClick={next}>Continue <ArrowRight className="h-4 w-4" /></Button>
            ) : (
              <Button onClick={finish} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} Finish
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
