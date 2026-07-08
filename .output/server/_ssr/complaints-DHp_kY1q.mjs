import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { c as Search } from "../_libs/lucide-react.mjs";
import { i as formatFloor, o as supabase } from "./roomly-data-CG4yHoL5.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-DRgGkNn7.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-gunzrkKA.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/complaints-DHp_kY1q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Complaints() {
	const [filter, setFilter] = (0, import_react.useState)("");
	const { data, isLoading } = useQuery({
		queryKey: ["complaints"],
		queryFn: async () => {
			const { data } = await supabase.from("preferences").select(`*, user:profiles(id,name,profile_photo,room:rooms(room_number,floor:floors(floor_number,hostel:hostels(hostel_name))))`).order("user", { ascending: true });
			return data ?? [];
		}
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full" }) });
	const rows = (data ?? []).filter((r) => {
		if (!filter) return true;
		const q = filter.toLowerCase();
		const name = (r.user?.name ?? "").toLowerCase();
		const roomNo = String((r.user?.room)?.room_number ?? "");
		const hostel = (r.user?.room)?.floor?.hostel?.hostel_name ?? "";
		return name.includes(q) || roomNo.includes(q) || hostel.toLowerCase().includes(q);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold",
				children: "Complaints & Amenities"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "View reported amenity issues across all rooms and floors."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: filter,
						onChange: (e) => setFilter(e.target.value),
						placeholder: "Search name, room or hostel",
						className: "input"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-2 top-2 h-4 w-4 text-muted-foreground" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/settings",
					className: "text-sm text-primary",
					children: "Settings"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "surface-panel p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: "No reports found."
				}) : rows.map((r) => {
					const u = r.user ?? {};
					const room = u.room ?? null;
					const hostel = room?.floor?.hostel?.hostel_name ?? "-";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-10 w-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: u.profile_photo ?? void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: (u.name ?? "?")[0] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium truncate",
									children: u.name ?? "Unknown"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground truncate",
									children: [
										hostel,
										" · ",
										room ? `Room ${room.room_number} · ${formatFloor(room.floor?.floor_number)}` : "No room"
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmenBadge, {
									label: "Exhaust",
									ok: !!r.amen_exhaust
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmenBadge, {
									label: "Fan",
									ok: !!r.amen_fan
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmenBadge, {
									label: "Curtains",
									ok: !!r.amen_curtains
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmenBadge, {
									label: "Bulb",
									ok: !!r.amen_bulb
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmenBadge, {
									label: "Cooler",
									ok: !!r.booking_cooler
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/profile/${u.id}`,
									className: "text-xs text-primary hover:underline",
									children: "View"
								})
							]
						})]
					}, r.user_id ?? Math.random());
				})
			})
		})]
	}) });
}
function AmenBadge({ label, ok }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		variant: ok ? "secondary" : "destructive",
		className: "text-xs",
		children: [
			label,
			": ",
			ok ? "OK" : "Issue"
		]
	});
}
//#endregion
export { Complaints as component };
