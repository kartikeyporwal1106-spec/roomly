import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roomly-data-CG4yHoL5.js
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
		headers.set("apikey", supabaseKey);
		return fetch(input, {
			...init,
			headers
		});
	};
}
function createSupabaseClient() {
	const SUPABASE_URL = getSupabaseUrl();
	const SUPABASE_PUBLISHABLE_KEY = getSupabasePublishableKey();
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
		const message = `Missing Supabase environment variable(s): ${missingSupabaseConfig().join(", ")}. Add them to your local env file or connect Supabase in Lovable Cloud.`;
		console.error(`[Supabase] ${message}`);
		throw new Error(message);
	}
	return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
		global: { fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY) },
		auth: {
			storage: typeof window !== "undefined" ? localStorage : void 0,
			persistSession: true,
			autoRefreshToken: true
		}
	});
}
var _supabase;
function getSupabaseUrl() {
	return "https://twgfnocepsmmsjghtkeq.supabase.co";
}
function getSupabasePublishableKey() {
	return "sb_publishable_cxCmsT5MUqOdznWjs7Gqgg_BKBfyAnU";
}
function missingSupabaseConfig() {
	return [...!getSupabaseUrl() ? ["SUPABASE_URL"] : [], ...!getSupabasePublishableKey() ? ["SUPABASE_PUBLISHABLE_KEY"] : []];
}
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
var COURSE_OPTIONS = [
	"BTech MTech 2nd Sem",
	"BTech MTech 4th Sem",
	"BSc MSc 2nd Sem",
	"BSc MSc 4th Sem",
	"BSc MSc 6th Sem",
	"BSc LLB 2nd Sem",
	"BSc LLB 4th Sem",
	"MSc 2nd Sem"
];
function formatCourse(value) {
	return value?.trim() || "Course not set";
}
function formatYear(value) {
	return value ? `Year ${value}` : "Year not set";
}
function formatCourseYear(course, year) {
	return `${formatCourse(course)} · ${formatYear(year)}`;
}
function compareRoomNumbers(a, b) {
	const aNum = Number(a.replace(/\D/g, ""));
	const bNum = Number(b.replace(/\D/g, ""));
	if (Number.isFinite(aNum) && Number.isFinite(bNum) && aNum !== bNum) return aNum - bNum;
	return a.localeCompare(b);
}
function formatFloor(floorNumber) {
	if (floorNumber === 0) return "Ground floor";
	if (floorNumber === 1) return "First floor";
	if (floorNumber === 2) return "Second floor";
	return floorNumber == null ? "Floor not set" : `Floor ${floorNumber}`;
}
function hostelGenderLabel(gender) {
	if (gender === "male") return "Boys";
	if (gender === "female") return "Girls";
	return "All";
}
//#endregion
export { hostelGenderLabel as a, formatFloor as i, compareRoomNumbers as n, supabase as o, formatCourseYear as r, COURSE_OPTIONS as t };
