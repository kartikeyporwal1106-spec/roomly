import { n as __toESM } from "../_runtime.mjs";
import { a as hostelGenderLabel, i as formatFloor, n as compareRoomNumbers, o as supabase, t as COURSE_OPTIONS } from "./roomly-data-CG4yHoL5.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as getCurrentFirebaseUser } from "./client-CVvJNAJr.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as ArrowRight, d as LoaderCircle, m as Circle, r as Upload, x as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-gunzrkKA.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as fetchCurrentProfile } from "./queries-Si5Sn4Ez.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/@radix-ui/react-radio-group+[...].mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, t as Input } from "./select-COTGKTrK.mjs";
import { n as Textarea, t as Label } from "./textarea-DXDy8Nu5.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-afNJAkuS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var cleanLevels = [
	"messy",
	"average",
	"tidy",
	"very_tidy"
];
function Onboarding() {
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [rollNumber, setRollNumber] = (0, import_react.useState)("");
	const [course, setCourse] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)("1");
	const [gender, setGender] = (0, import_react.useState)("prefer_not_to_say");
	const [hostelId, setHostelId] = (0, import_react.useState)("");
	const [floorId, setFloorId] = (0, import_react.useState)("");
	const [roomId, setRoomId] = (0, import_react.useState)("");
	const [sleepTime, setSleepTime] = (0, import_react.useState)("23:30");
	const [wakeTime, setWakeTime] = (0, import_react.useState)("07:00");
	const [cleanIdx, setCleanIdx] = (0, import_react.useState)([2]);
	const [studyStyle, setStudyStyle] = (0, import_react.useState)("flexible");
	const [personality, setPersonality] = (0, import_react.useState)("ambivert");
	const [languages, setLanguages] = (0, import_react.useState)("");
	const [hobbies, setHobbies] = (0, import_react.useState)("");
	const [lookingStatus, setLookingStatus] = (0, import_react.useState)("looking_for_roommate");
	const [bio, setBio] = (0, import_react.useState)("");
	const [smoking, setSmoking] = (0, import_react.useState)(false);
	const [drinking, setDrinking] = (0, import_react.useState)(false);
	const [gaming, setGaming] = (0, import_react.useState)(false);
	const [photoUrl, setPhotoUrl] = (0, import_react.useState)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [loadError, setLoadError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
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
						const { data: room } = await supabase.from("rooms").select("id,floor_id,floor:floors(id,hostel_id)").eq("id", p.room_id).maybeSingle();
						if (room) {
							setFloorId(room.floor_id);
							setHostelId(room.floor?.hostel_id ?? "");
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
		queryFn: async () => (await supabase.from("hostels").select("*").order("gender").order("hostel_name")).data ?? []
	});
	const filteredHostels = (hostels ?? []).filter((h) => {
		if (gender === "male" || gender === "female") return h.gender === gender;
		return true;
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
			return (data ?? []).sort((a, b) => compareRoomNumbers(a.room_number, b.room_number));
		}
	});
	const totalSteps = 5;
	const next = () => setStep((s) => Math.min(4, s + 1));
	const prev = () => setStep((s) => Math.max(0, s - 1));
	const uploadPhoto = async (file) => {
		setUploading(true);
		try {
			const user = await getCurrentFirebaseUser();
			if (!user) return;
			const ext = file.name.split(".").pop();
			const path = `${user.uid}/avatar-${Date.now()}.${ext}`;
			const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
			if (upErr) throw upErr;
			const { data: signed } = await supabase.storage.from("avatars").createSignedUrl(path, 3600 * 24 * 365);
			setPhotoUrl(signed?.signedUrl ?? null);
			toast.success("Photo uploaded");
		} catch (e) {
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
				gender,
				looking_status: lookingStatus,
				bio,
				profile_photo: photoUrl,
				room_id: roomId || null,
				onboarding_complete: true
			};
			const { data: profile, error: pErr } = await supabase.from("profiles").upsert(profileUpdate, { onConflict: "firebase_uid" }).select("id").single();
			if (pErr) throw pErr;
			const prefs = {
				user_id: profile.id,
				sleep_time: sleepTime,
				wake_time: wakeTime,
				cleanliness: cleanLevels[cleanIdx[0]],
				study_style: studyStyle,
				personality,
				languages: languages.split(",").map((s) => s.trim()).filter(Boolean),
				hobbies: hobbies.split(",").map((s) => s.trim()).filter(Boolean),
				smoking,
				drinking,
				gaming
			};
			const { error: prefErr } = await supabase.from("preferences").upsert(prefs);
			if (prefErr) throw prefErr;
			toast.success("You're all set!");
			navigate({ to: "/dashboard" });
		} catch (e) {
			toast.error(e.message ?? "Something went wrong");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hero-glow min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl px-6 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Step ",
						step + 1,
						" of ",
						totalSteps
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round((step + 1) / totalSteps * 100), "%"] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: (step + 1) / totalSteps * 100 })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel p-8 md:p-10",
				children: [
					loadError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive",
						children: loadError
					}),
					step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-semibold tracking-tight",
								children: "Tell us about you"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "-mt-2 text-sm text-muted-foreground",
								children: "Basic details so people know who you are."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1.5",
								value: name,
								onChange: (e) => setName(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Roll number" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "mt-1.5",
									value: rollNumber,
									onChange: (e) => setRollNumber(e.target.value)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Course" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: course,
									onValueChange: setCourse,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "mt-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select your course" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: COURSE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: option,
										children: option
									}, option)) })]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Year" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
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
									].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: String(y),
										children: ["Year ", y]
									}, y)) })]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Gender" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: gender,
									onValueChange: setGender,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "mt-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
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
								})] })]
							})
						]
					}),
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-semibold tracking-tight",
								children: "Your hostel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "-mt-2 text-sm text-muted-foreground",
								children: "Where do you live right now? (You can skip if unsure.)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Hostel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: hostelId,
								onValueChange: (v) => {
									setHostelId(v);
									setFloorId("");
									setRoomId("");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select a hostel" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: filteredHostels.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: h.id,
									children: [
										h.hostel_name,
										" · ",
										hostelGenderLabel(h.gender)
									]
								}, h.id)) })]
							})] }),
							hostelId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Floor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: floorId,
								onValueChange: (v) => {
									setFloorId(v);
									setRoomId("");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select a floor" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: floors?.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: f.id,
									children: formatFloor(f.floor_number)
								}, f.id)) })]
							})] }),
							floorId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Room" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: roomId,
								onValueChange: setRoomId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select a room" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: rooms?.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: r.id,
									children: ["Room ", r.room_number]
								}, r.id)) })]
							})] })
						]
					}),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-semibold tracking-tight",
								children: "Your lifestyle"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "-mt-2 text-sm text-muted-foreground",
								children: "Helps us match you with compatible people."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Sleep time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "time",
									className: "mt-1.5",
									value: sleepTime,
									onChange: (e) => setSleepTime(e.target.value)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Wake time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "time",
									className: "mt-1.5",
									value: wakeTime,
									onChange: (e) => setWakeTime(e.target.value)
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cleanliness" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									value: cleanIdx,
									min: 0,
									max: 3,
									step: 1,
									onValueChange: setCleanIdx,
									className: "mt-3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex justify-between text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Relaxed" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Average" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tidy" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Very tidy" })
									]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Study style" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: studyStyle,
									onValueChange: setStudyStyle,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "mt-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "early_bird",
											children: "Early bird"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "night_owl",
											children: "Night owl"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "flexible",
											children: "Flexible"
										})
									] })]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Personality" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: personality,
									onValueChange: setPersonality,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "mt-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "introvert",
											children: "Introvert"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "ambivert",
											children: "Ambivert"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "extrovert",
											children: "Extrovert"
										})
									] })]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Languages" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1.5",
								placeholder: "Hindi, English, Tamil",
								value: languages,
								onChange: (e) => setLanguages(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Hobbies" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1.5",
								placeholder: "Cricket, coding, music",
								value: hobbies,
								onChange: (e) => setHobbies(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 md:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center justify-between rounded-lg border border-border p-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Smoking" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: smoking,
											onCheckedChange: setSmoking
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center justify-between rounded-lg border border-border p-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Drinking" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: drinking,
											onCheckedChange: setDrinking
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center justify-between rounded-lg border border-border p-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Gaming" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: gaming,
											onCheckedChange: setGaming
										})]
									})
								]
							})
						]
					}),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-semibold tracking-tight",
								children: "What are you looking for?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
								value: lookingStatus,
								onValueChange: setLookingStatus,
								className: "gap-3",
								children: [
									[
										"looking_for_roommate",
										"Looking for a roommate",
										"You have a room and want someone to share it."
									],
									[
										"looking_for_room",
										"Looking for a room",
										"You need a room and are open to joining one."
									],
									[
										"not_looking",
										"Not looking",
										"Just browsing for now."
									]
								].map(([val, title, desc]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 hover:bg-accent",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
										value: val,
										className: "mt-1"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-muted-foreground",
										children: desc
									})] })]
								}, val))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Short bio (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								className: "mt-1.5",
								rows: 4,
								placeholder: "Say hi in a sentence or two.",
								value: bio,
								onChange: (e) => setBio(e.target.value)
							})] })
						]
					}),
					step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-semibold tracking-tight",
								children: "Add a profile photo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "-mt-2 text-sm text-muted-foreground",
								children: "Optional, but helps people recognize you."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "h-24 w-24",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: photoUrl ?? void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: (name || "?")[0]?.toUpperCase() })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent",
									children: [
										uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
										photoUrl ? "Replace photo" : "Upload photo",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/*",
											className: "hidden",
											onChange: (e) => e.target.files && uploadPhoto(e.target.files[0])
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							onClick: prev,
							disabled: step === 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back"]
						}), step < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: next,
							children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: finish,
							disabled: saving,
							children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Finish"]
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { Onboarding as component };
