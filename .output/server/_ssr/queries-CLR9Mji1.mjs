import { o as supabase } from "./roomly-data-CG4yHoL5.mjs";
import { n as getCurrentFirebaseUser } from "./client-BO3TKPWh.mjs";
import { t as firebaseUserProfile } from "./firebase-user-K8gk4vwa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-CLR9Mji1.js
async function fetchCurrentProfile() {
	const user = await getCurrentFirebaseUser();
	if (!user) return null;
	const { data: existing } = await supabase.from("profiles").select("*, room:rooms(*, floor:floors(*, hostel:hostels(*)))").eq("firebase_uid", user.uid).maybeSingle();
	if (existing) return existing;
	const { data } = await supabase.from("profiles").upsert(firebaseUserProfile(user), { onConflict: "firebase_uid" }).select("*, room:rooms(*, floor:floors(*, hostel:hostels(*)))").single();
	return data;
}
var looksLabels = {
	looking_for_roommate: "Looking for a roommate",
	looking_for_room: "Looking for a room",
	not_looking: "Not looking"
};
var cleanlinessLabels = {
	very_tidy: "Very tidy",
	tidy: "Tidy",
	average: "Average",
	messy: "Relaxed"
};
var studyLabels = {
	early_bird: "Early bird",
	night_owl: "Night owl",
	flexible: "Flexible"
};
var personalityLabels = {
	introvert: "Introvert",
	ambivert: "Ambivert",
	extrovert: "Extrovert"
};
//#endregion
export { studyLabels as a, personalityLabels as i, fetchCurrentProfile as n, looksLabels as r, cleanlinessLabels as t };
