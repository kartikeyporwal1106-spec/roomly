import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { COURSE_OPTIONS } from "@/lib/roomly-data";
import { getCurrentFirebaseUser } from "@/integrations/firebase/client";

export const Route = createFileRoute("/_authenticated/settings")({
  component: Settings,
});

function Settings() {
  const qc = useQueryClient();
  const { data: me } = useQuery({ queryKey: ["firebase-user"], queryFn: getCurrentFirebaseUser });
  const { data: profile } = useQuery({
    queryKey: ["profile", "self"],
    enabled: !!me,
    queryFn: async () => (await supabase.from("profiles").select("*").eq("firebase_uid", me!.uid).maybeSingle()).data,
  });

  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (profile) setForm(profile); }, [profile]);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      name: form.name, bio: form.bio, branch: form.branch, year: parseInt(form.year, 10),
      phone: form.phone, looking_status: form.looking_status,
    }).eq("firebase_uid", me!.uid);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Profile updated");
    qc.invalidateQueries({ queryKey: ["profile"] });
  };

  if (!profile) return <AppShell><div className="surface-panel p-8">Loading…</div></AppShell>;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Settings</h1>
            <p className="mt-1 text-sm text-muted-foreground">Update your profile details.</p>
          </div>
          <Link to="/onboarding" className="text-sm text-primary hover:underline">Re-run onboarding</Link>
        </div>

        <div className="surface-panel space-y-5 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div><Label>Name</Label><Input className="mt-1.5" value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Phone</Label><Input className="mt-1.5" value={form.phone ?? ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Only shown after request accepted" /></div>
            <div>
              <Label>Course</Label>
              <Select value={form.branch ?? ""} onValueChange={(v) => setForm({ ...form, branch: v })}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select your course" /></SelectTrigger>
                <SelectContent>
                  {COURSE_OPTIONS.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div><Label>Year</Label>
              <Select value={String(form.year ?? "1")} onValueChange={(v) => setForm({ ...form, year: v })}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>{[1,2,3,4,5].map((y) => <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>Looking status</Label>
              <Select value={form.looking_status ?? "not_looking"} onValueChange={(v) => setForm({ ...form, looking_status: v })}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="looking_for_roommate">Looking for a roommate</SelectItem>
                  <SelectItem value="looking_for_room">Looking for a room</SelectItem>
                  <SelectItem value="not_looking">Not looking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>Bio</Label>
              <Textarea className="mt-1.5" rows={4} value={form.bio ?? ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </div>
          </div>
          <Button onClick={save} disabled={saving}>{saving && <Loader2 className="h-4 w-4 animate-spin" />} Save changes</Button>
        </div>
      </div>
    </AppShell>
  );
}
