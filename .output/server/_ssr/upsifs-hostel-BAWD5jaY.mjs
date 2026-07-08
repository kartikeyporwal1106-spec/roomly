import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { C as ArrowLeft, p as LoaderCircle, r as Upload } from "../_libs/lucide-react.mjs";
import { a as SelectTrigger, c as getCurrentFirebaseUser, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, t as Button } from "./client-CmRslIl6.mjs";
import { o as supabase, t as COURSE_OPTIONS } from "./roomly-data-CG4yHoL5.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as parseExcelFile, t as Card } from "./excel-U41mKD0u.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upsifs-hostel-BAWD5jaY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMAIL_KEYS = [
	"email",
	"college_email",
	"college email",
	"student_email",
	"student email"
];
var NAME_KEYS = [
	"name",
	"student_name",
	"student name",
	"full_name",
	"full name"
];
var ROLL_KEYS = [
	"roll_number",
	"roll no",
	"roll no.",
	"roll",
	"registration_number",
	"registration_no",
	"registration no"
];
var HOSTEL_KEYS = [
	"hostel_name",
	"hostel",
	"hostel name"
];
var FLOOR_KEYS = [
	"floor_number",
	"floor no",
	"floor no.",
	"floor",
	"floor number"
];
var ROOM_KEYS = [
	"room_number",
	"room no",
	"room no.",
	"room",
	"room number"
];
var BRANCH_KEYS = [
	"branch",
	"course",
	"department"
];
var YEAR_KEYS = [
	"year",
	"sem",
	"semester",
	"class"
];
var GENDER_KEYS = ["gender", "sex"];
var AMENITY_KEYS = {
	amen_exhaust: [
		"amen_exhaust",
		"exhaust",
		"exhaust working",
		"has_exhaust"
	],
	amen_fan: [
		"amen_fan",
		"fan",
		"fan working",
		"has_fan"
	],
	booking_cooler: [
		"booking_cooler",
		"cooler",
		"cooler working",
		"has_cooler"
	],
	amen_curtains: [
		"amen_curtains",
		"curtains",
		"has_curtains"
	],
	amen_bulb: [
		"amen_bulb",
		"bulb",
		"has_bulb",
		"light"
	]
};
function getStringField(row, keys) {
	for (const key of keys) {
		const value = row[key];
		if (value == null) continue;
		const trimmed = String(value).trim();
		if (trimmed) return trimmed;
	}
}
function getNumberField(row, keys) {
	const value = getStringField(row, keys);
	if (!value) return void 0;
	const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));
	return Number.isFinite(parsed) ? parsed : void 0;
}
function getBooleanField(row, keys) {
	const value = getStringField(row, keys);
	if (!value) return false;
	const normalized = value.trim().toLowerCase();
	return [
		"true",
		"yes",
		"y",
		"1",
		"on",
		"available",
		"present",
		"ok",
		"working"
	].includes(normalized);
}
function normalizeImportRow(row) {
	const email = getStringField(row, EMAIL_KEYS);
	const name = getStringField(row, NAME_KEYS);
	const hostel_name = getStringField(row, HOSTEL_KEYS);
	const floor_number = getNumberField(row, FLOOR_KEYS);
	const room_number = getStringField(row, ROOM_KEYS);
	if (!email || !name || !hostel_name || floor_number == null || !room_number) return null;
	const roll_number = getStringField(row, ROLL_KEYS);
	const branch = getStringField(row, BRANCH_KEYS);
	const year = getNumberField(row, YEAR_KEYS);
	const gender = getStringField(row, GENDER_KEYS);
	return {
		email,
		name,
		roll_number: roll_number || void 0,
		branch: branch || void 0,
		year: year ?? void 0,
		gender: gender || void 0,
		hostel_name,
		floor_number,
		room_number,
		booking_cooler: getBooleanField(row, AMENITY_KEYS.booking_cooler),
		amen_exhaust: getBooleanField(row, AMENITY_KEYS.amen_exhaust),
		amen_fan: getBooleanField(row, AMENITY_KEYS.amen_fan),
		amen_curtains: getBooleanField(row, AMENITY_KEYS.amen_curtains),
		amen_bulb: getBooleanField(row, AMENITY_KEYS.amen_bulb)
	};
}
function validateCollegeEmail(value) {
	const email = value.trim();
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function UpsifsHostel() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [rollNumber, setRollNumber] = (0, import_react.useState)("");
	const [branch, setBranch] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)("1");
	const [gender, setGender] = (0, import_react.useState)("");
	const [hostelId, setHostelId] = (0, import_react.useState)("");
	const [floorId, setFloorId] = (0, import_react.useState)("");
	const [roomId, setRoomId] = (0, import_react.useState)("");
	const [bookingCooler, setBookingCooler] = (0, import_react.useState)(false);
	const [amenExhaust, setAmenExhaust] = (0, import_react.useState)(false);
	const [amenFan, setAmenFan] = (0, import_react.useState)(false);
	const [amenCurtains, setAmenCurtains] = (0, import_react.useState)(false);
	const [amenBulb, setAmenBulb] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [adminChecked, setAdminChecked] = (0, import_react.useState)(false);
	const [excelRows, setExcelRows] = (0, import_react.useState)([]);
	const [fileName, setFileName] = (0, import_react.useState)(null);
	const [previewError, setPreviewError] = (0, import_react.useState)(null);
	const [importing, setImporting] = (0, import_react.useState)(false);
	const { data: hostels } = useQuery({
		queryKey: ["hostels"],
		queryFn: async () => (await supabase.from("hostels").select("*").order("hostel_name")).data ?? []
	});
	const { data: floors } = useQuery({
		queryKey: ["floors", hostelId],
		enabled: !!hostelId,
		queryFn: async () => (await supabase.from("floors").select("*").eq("hostel_id", hostelId).order("floor_number")).data ?? []
	});
	const { data: rooms } = useQuery({
		queryKey: ["rooms", floorId],
		enabled: !!floorId,
		queryFn: async () => {
			const { data } = await supabase.from("rooms").select("*").eq("floor_id", floorId);
			return (data ?? []).sort((a, b) => a.room_number.localeCompare(b.room_number, void 0, { numeric: true }));
		}
	});
	const adminEmails = (0, import_react.useMemo)(() => "admin@upsifs.edu".split(",").map((email) => email.trim().toLowerCase()).filter(Boolean), []);
	(0, import_react.useEffect)(() => {
		getCurrentFirebaseUser().then((user) => {
			const email = user?.email?.toLowerCase() ?? "";
			setIsAdmin(Boolean(email && adminEmails.includes(email)));
			setAdminChecked(true);
		});
	}, [adminEmails]);
	const importRows = (0, import_react.useMemo)(() => {
		return excelRows.map(normalizeImportRow).filter((value) => Boolean(value));
	}, [excelRows]);
	async function handleSubmit(event) {
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
				onboarding_complete: true
			};
			const { data: existingProfiles } = await supabase.from("profiles").select("id").eq("email", profilePayload.email).maybeSingle();
			let profileId;
			if (existingProfiles?.id) {
				await supabase.from("profiles").update(profilePayload).eq("id", existingProfiles.id);
				profileId = existingProfiles.id;
			} else {
				const { data: inserted, error: insertError } = await supabase.from("profiles").insert(profilePayload).select("id").single();
				if (insertError || !inserted) throw insertError || /* @__PURE__ */ new Error("Failed to save profile.");
				profileId = inserted.id;
			}
			const preferencePayload = {
				user_id: profileId,
				booking_cooler: bookingCooler,
				amen_exhaust: amenExhaust,
				amen_fan: amenFan,
				amen_curtains: amenCurtains,
				amen_bulb: amenBulb
			};
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
			toast.error(error?.message ?? "Could not create the profile.");
		} finally {
			setSubmitting(false);
		}
	}
	async function handleFileChange(event) {
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
			const hostelsToUpsert = Array.from(new Map(importRows.map((row) => [row.hostel_name, { hostel_name: row.hostel_name }])).values());
			const { error: hostelError } = await supabase.from("hostels").upsert(hostelsToUpsert, { onConflict: "hostel_name" });
			if (hostelError) throw hostelError;
			const hostelList = await supabase.from("hostels").select("id,hostel_name").in("hostel_name", hostelsToUpsert.map((hostel) => hostel.hostel_name));
			if (hostelList.error || !hostelList.data) throw hostelList.error || /* @__PURE__ */ new Error("Could not load hostels.");
			const hostelMap = new Map(hostelList.data.map((hostel) => [hostel.hostel_name, hostel.id]));
			const floorsToUpsert = Array.from(new Map(importRows.map((row) => [`${row.hostel_name}:${row.floor_number}`, {
				hostel_id: hostelMap.get(row.hostel_name),
				floor_number: row.floor_number
			}])).values());
			const { error: floorError } = await supabase.from("floors").upsert(floorsToUpsert, { onConflict: "hostel_id,floor_number" });
			if (floorError) throw floorError;
			const floorIds = Array.from(new Set(floorsToUpsert.map((floor) => floor.hostel_id)));
			const floorList = await supabase.from("floors").select("id,hostel_id,floor_number").in("hostel_id", floorIds);
			if (floorList.error || !floorList.data) throw floorList.error || /* @__PURE__ */ new Error("Could not load floors.");
			const floorMap = new Map(floorList.data.map((floor) => [`${floor.hostel_id}:${floor.floor_number}`, floor.id]));
			const roomsToUpsert = Array.from(new Map(importRows.map((row) => {
				const floorId = floorMap.get(`${hostelMap.get(row.hostel_name)}:${row.floor_number}`);
				return [`${hostelMap.get(row.hostel_name)}:${row.floor_number}:${row.room_number}`, {
					floor_id: floorId,
					room_number: row.room_number,
					capacity: 2
				}];
			})).values());
			const { error: roomError } = await supabase.from("rooms").upsert(roomsToUpsert, { onConflict: "floor_id,room_number" });
			if (roomError) throw roomError;
			const roomFloorIds = Array.from(new Set(roomsToUpsert.map((room) => room.floor_id)));
			const roomList = await supabase.from("rooms").select("id,floor_id,room_number").in("floor_id", roomFloorIds);
			if (roomList.error || !roomList.data) throw roomList.error || /* @__PURE__ */ new Error("Could not load rooms.");
			const roomMap = new Map(roomList.data.map((room) => [`${room.floor_id}:${room.room_number}`, room.id]));
			const emails = Array.from(new Set(importRows.map((row) => row.email)));
			const profileLookup = await supabase.from("profiles").select("id,email").in("email", emails);
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
					onboarding_complete: true
				};
				let profileId = existingProfiles.get(row.email);
				if (profileId) {
					const { error: updateError } = await supabase.from("profiles").update(profilePayload).eq("id", profileId);
					if (updateError) throw updateError;
				} else {
					const { data: inserted, error: insertError } = await supabase.from("profiles").insert(profilePayload).select("id").single();
					if (insertError || !inserted) throw insertError || /* @__PURE__ */ new Error("Failed to create profile.");
					profileId = inserted.id;
					existingProfiles.set(row.email, profileId);
				}
				const preferencesPayload = {
					user_id: profileId,
					booking_cooler: row.booking_cooler,
					amen_exhaust: row.amen_exhaust,
					amen_fan: row.amen_fan,
					amen_curtains: row.amen_curtains,
					amen_bulb: row.amen_bulb
				};
				const { error: prefError } = await supabase.from("preferences").upsert(preferencesPayload, { onConflict: "user_id" });
				if (prefError) throw prefError;
			}
			toast.success(`Imported ${importRows.length} student rows from ${fileName ?? "spreadsheet"}.`);
			setExcelRows([]);
			setFileName(null);
			setPreviewError(null);
		} catch (error) {
			toast.error(error?.message ?? "Could not import spreadsheet data.");
		} finally {
			setImporting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hero-glow min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm uppercase tracking-[0.2em] text-primary",
						children: "UPSIFS Hostel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-4xl font-semibold tracking-tight",
						children: "Register students with college email and hostel amenities."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-sm text-muted-foreground",
						children: "Add or update profiles in Supabase, including room assignment and amenity fields for exhaust, fan, cooler, curtains and bulb."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to home"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-panel p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "College email registration"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Create or update an individual student profile without Firebase sign in."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-muted px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground",
							children: "Manual entry"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-5",
						onSubmit: handleSubmit,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									value: email,
									onChange: (event) => setEmail(event.target.value),
									className: "mt-1.5",
									placeholder: "student@college.edu"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: name,
									onChange: (event) => setName(event.target.value),
									className: "mt-1.5",
									placeholder: "Student name"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 md:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Roll number" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: rollNumber,
										onChange: (event) => setRollNumber(event.target.value),
										className: "mt-1.5",
										placeholder: "Roll number"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Course / branch" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: branch,
										onValueChange: setBranch,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "mt-1.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select course" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: COURSE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: option,
											children: option
										}, option)) })]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Year" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: year,
										onValueChange: setYear,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "mt-1.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
											1,
											2,
											3,
											4,
											5
										].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: String(value),
											children: `Year ${value}`
										}, value)) })]
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 md:grid-cols-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Gender" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: gender,
									onValueChange: setGender,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "mt-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select gender" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "male",
											children: "Male"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "female",
											children: "Female"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "other",
											children: "Other"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "prefer_not_to_say",
											children: "Prefer not to say"
										})
									] })]
								})] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 md:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Hostel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: hostelId,
										onValueChange: (value) => {
											setHostelId(value);
											setFloorId("");
											setRoomId("");
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "mt-1.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select hostel" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: hostels?.map((hostel) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: hostel.id,
											children: hostel.hostel_name
										}, hostel.id)) })]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Floor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: floorId,
										onValueChange: (value) => {
											setFloorId(value);
											setRoomId("");
										},
										disabled: !hostelId,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "mt-1.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select floor" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: floors?.map((floor) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: floor.id,
											children: `Floor ${floor.floor_number}`
										}, floor.id)) })]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Room" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: roomId,
										onValueChange: setRoomId,
										disabled: !floorId,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "mt-1.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select room" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: rooms?.map((room) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: room.id,
											children: `Room ${room.room_number}`
										}, room.id)) })]
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 md:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center justify-between rounded-lg border border-border p-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cooler booked" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: bookingCooler,
											onCheckedChange: setBookingCooler
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center justify-between rounded-lg border border-border p-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Exhaust available" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: amenExhaust,
											onCheckedChange: setAmenExhaust
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center justify-between rounded-lg border border-border p-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fan available" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: amenFan,
											onCheckedChange: setAmenFan
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center justify-between rounded-lg border border-border p-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Curtains available" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: amenCurtains,
											onCheckedChange: setAmenCurtains
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center justify-between rounded-lg border border-border p-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bulb installed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: amenBulb,
											onCheckedChange: setAmenBulb
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: submitting,
								className: "mt-4 w-full",
								children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : null, "Save student"]
							})
						]
					})]
				}), isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-panel p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold",
								children: "Spreadsheet sync"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Upload Excel / CSV to create or update many student profiles at once."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fileName ? `Replace file` : `Select sheet` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: ".xlsx,.xls,.csv",
										className: "sr-only",
										onChange: handleFileChange
									})
								]
							})]
						}),
						fileName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 rounded-xl border border-border bg-muted/10 p-4 text-sm text-muted-foreground",
							children: [
								importRows.length,
								" valid student rows parsed from ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: fileName }),
								".",
								previewError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 text-destructive",
									children: previewError
								}) : null
							]
						}),
						importRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: importRows.slice(0, 5).map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "rounded-xl border border-border p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-medium",
									children: [
										row.name,
										" · ",
										row.email
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: [
										row.hostel_name,
										" · Floor ",
										row.floor_number,
										" · Room ",
										row.room_number
									]
								})]
							}, index))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl border border-dashed border-border bg-muted/5 p-4 text-sm text-muted-foreground",
							children: "Upload a sheet with columns like email, name, hostel_name, floor_number, room_number, booking_cooler, amen_exhaust, amen_fan, amen_curtains, amen_bulb."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleImport,
							disabled: !importRows.length || importing,
							className: "mt-5 w-full",
							children: [importing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : null, "Import spreadsheet data"]
						})
					]
				}) : adminChecked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-panel p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Admin-only spreadsheet sync"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Spreadsheet upload is only available to admin users. Sign in with an admin account to update from Excel."
					})]
				})]
			})]
		})
	});
}
//#endregion
export { UpsifsHostel as component };
