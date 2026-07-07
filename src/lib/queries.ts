import { supabase } from "@/integrations/supabase/client";
import { firebaseUserProfile } from "@/lib/firebase-user";
import { getCurrentFirebaseUser } from "@/integrations/firebase/client";

export async function fetchCurrentProfile() {
  const user = await getCurrentFirebaseUser();
  if (!user) return null;

  const { data: existing } = await supabase
    .from("profiles")
    .select("*, room:rooms(*, floor:floors(*, hostel:hostels(*)))")
    .eq("firebase_uid", user.uid)
    .maybeSingle();
  if (existing) return existing;

  const { data, error } = await supabase
    .from("profiles")
    .upsert(firebaseUserProfile(user) as any, { onConflict: "firebase_uid" })
    .select("*, room:rooms(*, floor:floors(*, hostel:hostels(*)))")
    .single();
  if (error) throw error;
  return data;
}

export async function fetchPreferences(userId: string) {
  const { data } = await supabase.from("preferences").select("*").eq("user_id", userId).maybeSingle();
  return data;
}

export const looksLabels: Record<string, string> = {
  looking_for_roommate: "Looking for a roommate",
  looking_for_room: "Looking for a room",
  not_looking: "Not looking",
};

export const cleanlinessLabels: Record<string, string> = {
  very_tidy: "Very tidy",
  tidy: "Tidy",
  average: "Average",
  messy: "Relaxed",
};

export const studyLabels: Record<string, string> = {
  early_bird: "Early bird",
  night_owl: "Night owl",
  flexible: "Flexible",
};

export const personalityLabels: Record<string, string> = {
  introvert: "Introvert",
  ambivert: "Ambivert",
  extrovert: "Extrovert",
};
