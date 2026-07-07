import { n as __toESM } from "../_runtime.mjs";
import { i as formatFloor, o as supabase, r as formatCourseYear } from "./roomly-data-CG4yHoL5.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { v as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Phone, d as LoaderCircle, l as Mail } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DIA09IQ5.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-gunzrkKA.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as studyLabels, i as personalityLabels, n as fetchCurrentProfile, r as looksLabels, t as cleanlinessLabels } from "./queries-CLR9Mji1.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile._id-W_twTOgQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { id } = useParams({ from: "/_authenticated/profile/$id" });
	const qc = useQueryClient();
	const [sending, setSending] = (0, import_react.useState)(false);
	const { data: me } = useQuery({
		queryKey: ["profile", "self"],
		queryFn: fetchCurrentProfile
	});
	const { data: profile, isLoading } = useQuery({
		queryKey: ["profile", id],
		queryFn: async () => {
			const { data } = await supabase.from("profiles").select("*, room:rooms(room_number,floor:floors(floor_number,hostel:hostels(hostel_name)))").eq("id", id).maybeSingle();
			return data;
		}
	});
	const { data: prefs } = useQuery({
		queryKey: ["preferences", id],
		queryFn: async () => (await supabase.from("preferences").select("*").eq("user_id", id).maybeSingle()).data
	});
	const { data: request } = useQuery({
		queryKey: [
			"request-between",
			me?.id,
			id
		],
		enabled: !!me,
		queryFn: async () => {
			const { data } = await supabase.from("roommate_requests").select("*").or(`and(sender_id.eq.${me.id},receiver_id.eq.${id}),and(sender_id.eq.${id},receiver_id.eq.${me.id})`).order("created_at", { ascending: false }).limit(1);
			return data?.[0] ?? null;
		}
	});
	const sendRequest = async () => {
		if (!me) return;
		setSending(true);
		try {
			const { error } = await supabase.from("roommate_requests").insert({
				sender_id: me.id,
				receiver_id: id,
				status: "pending"
			});
			if (error) throw error;
			toast.success("Request sent");
			qc.invalidateQueries({ queryKey: ["request-between"] });
		} catch (e) {
			toast.error(e.message ?? "Could not send request");
		} finally {
			setSending(false);
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full" }) });
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface-panel p-8 text-center",
		children: "Profile not found."
	}) });
	const isSelf = me?.id === profile.id;
	const accepted = request?.status === "accepted";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-panel p-8 lg:col-span-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
					className: "h-24 w-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: profile.profile_photo ?? void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
						className: "text-2xl",
						children: profile.name?.[0] ?? "?"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-2xl tracking-tight",
					style: { fontFamily: "var(--font-display)" },
					children: profile.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: formatCourseYear(profile.branch, profile.year)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: "mt-3",
					children: looksLabels[profile.looking_status ?? "not_looking"]
				}),
				profile.room && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-lg border border-border p-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Current room"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 font-medium",
							children: ["Room ", profile.room.room_number]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								profile.room.floor.hostel.hostel_name,
								" · ",
								formatFloor(profile.room.floor.floor_number)
							]
						})
					]
				}),
				!isSelf && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: request?.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: true,
						className: "w-full",
						children: "Request pending"
					}) : accepted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border p-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-2 font-medium",
								children: "Contact unlocked"
							}),
							profile.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" }),
									" ",
									profile.email
								]
							}),
							profile.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-center gap-2 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5" }),
									" ",
									profile.phone
								]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: sendRequest,
						disabled: sending,
						className: "w-full",
						children: [sending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Send roommate request"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 lg:col-span-2",
			children: [profile.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-widest text-muted-foreground",
					children: "About"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 whitespace-pre-wrap text-sm",
					children: profile.bio
				})]
			}), prefs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-widest text-muted-foreground",
						children: "Lifestyle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Sleeps at",
								value: prefs.sleep_time ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Wakes at",
								value: prefs.wake_time ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Cleanliness",
								value: prefs.cleanliness ? cleanlinessLabels[prefs.cleanliness] : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Study style",
								value: prefs.study_style ? studyLabels[prefs.study_style] : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Personality",
								value: prefs.personality ? personalityLabels[prefs.personality] : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Music",
								value: prefs.music ?? "—"
							})
						]
					}),
					(prefs.languages?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Languages"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 flex flex-wrap gap-1",
							children: prefs.languages.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: l
							}, l))
						})]
					}),
					(prefs.hobbies?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Hobbies"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 flex flex-wrap gap-1",
							children: prefs.hobbies.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: l
							}, l))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							prefs.smoking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: "Smokes"
							}),
							prefs.drinking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: "Drinks"
							}),
							prefs.gaming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: "Gamer"
							})
						]
					})
				]
			})]
		})]
	}) });
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-sm font-medium",
			children: value
		})]
	});
}
//#endregion
export { ProfilePage as component };
