import { n as __toESM } from "../_runtime.mjs";
import { o as supabase, r as formatCourseYear } from "./roomly-data-CG4yHoL5.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as UsersRound, p as DoorOpen, t as Users, v as Building2 } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DIA09IQ5.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-gunzrkKA.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-U1nGx-u7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
function Admin() {
	const { data: stats } = useQuery({
		queryKey: ["admin-stats"],
		queryFn: async () => {
			const [users, hostels, rooms, requests] = await Promise.all([
				supabase.from("profiles").select("*", {
					count: "exact",
					head: true
				}),
				supabase.from("hostels").select("*", {
					count: "exact",
					head: true
				}),
				supabase.from("rooms").select("*", {
					count: "exact",
					head: true
				}),
				supabase.from("roommate_requests").select("*", {
					count: "exact",
					head: true
				}).eq("status", "pending")
			]);
			return {
				users: users.count ?? 0,
				hostels: hostels.count ?? 0,
				rooms: rooms.count ?? 0,
				pending: requests.count ?? 0
			};
		}
	});
	const { data: recent } = useQuery({
		queryKey: ["admin-recent-users"],
		queryFn: async () => (await supabase.from("profiles").select("id,name,email,branch,year,looking_status,profile_photo,created_at").order("created_at", { ascending: false }).limit(20)).data ?? []
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl tracking-tight",
				style: { fontFamily: "var(--font-display)" },
				children: "Admin"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Overview of the Roomly platform."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: UsersRound,
						label: "Students",
						value: stats?.users ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: Building2,
						label: "Hostels",
						value: stats?.hostels ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: DoorOpen,
						label: "Rooms",
						value: stats?.rooms ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: Users,
						label: "Pending requests",
						value: stats?.pending ?? 0
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-lg font-semibold",
					children: "Recent students"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: recent?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-lg p-2 hover:bg-accent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-9 w-9",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: p.profile_photo ?? void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: p.name?.[0] ?? "?" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-medium",
									children: p.name ?? p.email
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs text-muted-foreground",
									children: formatCourseYear(p.branch, p.year)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: p.looking_status ?? "—"
							})
						]
					}, p.id))
				})]
			})
		]
	}) });
}
function Stat({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "surface-panel p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 text-3xl font-semibold tracking-tight",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-widest text-muted-foreground",
				children: label
			})
		]
	});
}
//#endregion
export { Admin as component };
