import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { S as ArrowRight, c as Search, h as DoorOpen, n as UsersRound, x as Bell } from "../_libs/lucide-react.mjs";
import { i as formatFloor, o as supabase, r as formatCourseYear } from "./roomly-data-CG4yHoL5.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-DRgGkNn7.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-gunzrkKA.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { n as fetchCurrentProfile, r as looksLabels } from "./queries-Ch5H5dkL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BghY8dlm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const navigate = useNavigate();
	const { data: profile, error: profileError, isError, isLoading } = useQuery({
		queryKey: ["profile"],
		queryFn: fetchCurrentProfile,
		retry: 1
	});
	(0, import_react.useEffect)(() => {
		if (!isLoading && profile && !profile.onboarding_complete) navigate({
			to: "/onboarding",
			replace: true
		});
	}, [
		isLoading,
		navigate,
		profile
	]);
	const { data: suggested } = useQuery({
		queryKey: ["suggested", profile?.id],
		enabled: !!profile,
		queryFn: async () => {
			const { data } = await supabase.from("profiles").select("id,name,profile_photo,branch,year,looking_status,room:rooms(room_number,floor:floors(floor_number,hostel:hostels(hostel_name)))").eq("onboarding_complete", true).neq("id", profile.id).eq("looking_status", "looking_for_roommate").limit(6);
			return data ?? [];
		}
	});
	const { data: pending } = useQuery({
		queryKey: [
			"requests",
			"pending",
			profile?.id
		],
		enabled: !!profile,
		queryFn: async () => {
			const { data } = await supabase.from("roommate_requests").select("id, sender:profiles!roommate_requests_sender_id_fkey(id,name,profile_photo,branch,year)").eq("receiver_id", profile.id).eq("status", "pending");
			return data ?? [];
		}
	});
	const { data: notes } = useQuery({
		queryKey: [
			"notifications",
			"recent",
			profile?.id
		],
		enabled: !!profile,
		queryFn: async () => {
			const { data } = await supabase.from("notifications").select("*").eq("user_id", profile.id).order("created_at", { ascending: false }).limit(5);
			return data ?? [];
		}
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full" }) });
	if (isError || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-panel mx-auto max-w-xl p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Dashboard setup is not ready yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Your Google login worked, but Roomly could not create or load your app profile from the database."
			}),
			profileError instanceof Error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 rounded-md border border-border bg-muted/40 p-3 text-left text-xs text-muted-foreground",
				children: profileError.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/onboarding",
					className: "rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground",
					children: "Finish setup"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					className: "rounded-full border border-border px-5 py-2 text-sm font-medium",
					children: "Back to sign in"
				})]
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-panel hero-glow relative overflow-hidden p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-widest text-muted-foreground",
						children: "Welcome back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-2 text-3xl md:text-4xl tracking-tight",
						style: { fontFamily: "var(--font-display)" },
						children: [profile.name ?? "Hey there", " 👋"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-muted-foreground",
						children: profile.looking_status ? looksLabels[profile.looking_status] : "Set your roommate status to start matching."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/explore",
							className: "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), " Explore roommates"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/settings",
							className: "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent",
							children: "Edit profile"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel p-6 md:col-span-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorOpen, { className: "h-4 w-4" }), " My room"]
						}), profile.room ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-2xl tracking-tight",
									style: { fontFamily: "var(--font-display)" },
									children: ["Room ", profile.room.room_number]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										formatFloor(profile.room.floor.floor_number),
										" · ",
										profile.room.floor.hostel.hostel_name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 grid gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: "Room amenities"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `rounded-full border px-2 py-1 text-xs ${profile.booking_cooler ? "bg-primary/10 border-primary" : "bg-muted/10"}`,
												children: ["Cooler booking: ", profile.booking_cooler ? "Yes" : "No"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `rounded-full border px-2 py-1 text-xs ${profile.amen_exhaust ? "bg-primary/10 border-primary" : "bg-muted/10"}`,
												children: ["Exhaust: ", profile.amen_exhaust ? "Working" : "No"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `rounded-full border px-2 py-1 text-xs ${profile.amen_fan ? "bg-primary/10 border-primary" : "bg-muted/10"}`,
												children: ["Fan: ", profile.amen_fan ? "Working" : "No"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `rounded-full border px-2 py-1 text-xs ${profile.amen_curtains ? "bg-primary/10 border-primary" : "bg-muted/10"}`,
												children: ["Curtains: ", profile.amen_curtains ? "Yes" : "No"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `rounded-full border px-2 py-1 text-xs ${profile.amen_bulb ? "bg-primary/10 border-primary" : "bg-muted/10"}`,
												children: ["Bulb: ", profile.amen_bulb ? "Yes" : "No"]
											})
										]
									})]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 text-sm text-muted-foreground",
							children: [
								"No room assigned yet.",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/onboarding",
									className: "text-primary hover:underline",
									children: "Add one"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel p-6 md:col-span-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, { className: "h-4 w-4" }), " Pending requests"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/requests",
								className: "text-xs text-primary hover:underline",
								children: "View all"
							})]
						}), pending?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-2",
							children: pending.slice(0, 3).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/requests",
								className: "flex items-center gap-3 rounded-lg p-2 hover:bg-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "h-8 w-8",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: p.sender?.profile_photo ?? void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: p.sender?.name?.[0] ?? "?" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-medium",
										children: p.sender?.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: formatCourseYear(p.sender?.branch, p.sender?.year)
									})]
								})]
							}, p.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "No pending requests."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel p-6 md:col-span-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), " Notifications"]
						}), notes?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-3",
							children: notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: n.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: n.body
								})]
							}, n.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "You're all caught up."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Suggested roommates"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/explore",
					className: "inline-flex items-center gap-1 text-sm text-primary hover:underline",
					children: ["See all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
				})]
			}), suggested?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: suggested.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/profile/$id",
					params: { id: p.id },
					className: "surface-panel group p-5 transition hover:border-primary/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-12 w-12",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: p.profile_photo ?? void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: p.name?.[0] ?? "?" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-medium",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs text-muted-foreground",
									children: formatCourseYear(p.branch, p.year)
								})]
							})]
						}),
						p.room && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [
								p.room.floor.hostel.hostel_name,
								" · ",
								formatFloor(p.room.floor.floor_number)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "mt-3",
							children: looksLabels[p.looking_status]
						})
					]
				}, p.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel p-8 text-center text-sm text-muted-foreground",
				children: [
					"No matches yet. Try adjusting your preferences in",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/settings",
						className: "text-primary hover:underline",
						children: "settings"
					}),
					"."
				]
			})] })
		]
	}) });
}
//#endregion
export { Dashboard as component };
