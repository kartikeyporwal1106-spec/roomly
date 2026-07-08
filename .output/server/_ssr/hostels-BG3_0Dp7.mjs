import { n as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { b as Building2, h as DoorOpen } from "../_libs/lucide-react.mjs";
import { a as hostelGenderLabel, i as formatFloor, n as compareRoomNumbers, o as supabase } from "./roomly-data-CG4yHoL5.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-DRgGkNn7.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hostels-BG3_0Dp7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Hostels() {
	const [hostelId, setHostelId] = (0, import_react.useState)(null);
	const [floorId, setFloorId] = (0, import_react.useState)(null);
	const { data: hostels } = useQuery({
		queryKey: ["hostels"],
		queryFn: async () => (await supabase.from("hostels").select("*").order("gender").order("hostel_name")).data ?? []
	});
	const { data: floors } = useQuery({
		queryKey: ["floors", hostelId],
		enabled: !!hostelId,
		queryFn: async () => (await supabase.from("floors").select("*").eq("hostel_id", hostelId).order("floor_number")).data ?? []
	});
	const { data: rooms, isLoading } = useQuery({
		queryKey: ["rooms-full", floorId],
		enabled: !!floorId,
		queryFn: async () => {
			const { data } = await supabase.from("rooms").select("id,room_number,capacity, occupants:profiles(id,name,profile_photo)").eq("floor_id", floorId);
			return (data ?? []).sort((a, b) => compareRoomNumbers(a.room_number, b.room_number));
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl tracking-tight",
			style: { fontFamily: "var(--font-display)" },
			children: "Rooms"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Explore hostels, floors, and available beds."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-[220px_180px_1fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2 px-2 text-xs uppercase tracking-widest text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3.5 w-3.5" }), " Hostels"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-1",
						children: hostels?.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setHostelId(h.id);
								setFloorId(null);
							},
							className: cn("rounded-lg px-3 py-2 text-left text-sm hover:bg-accent", hostelId === h.id && "bg-accent text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block",
								children: h.hostel_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted-foreground",
								children: hostelGenderLabel(h.gender)
							})]
						}, h.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 px-2 text-xs uppercase tracking-widest text-muted-foreground",
						children: "Floors"
					}), hostelId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-1",
						children: floors?.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFloorId(f.id),
							className: cn("rounded-lg px-3 py-2 text-left text-sm hover:bg-accent", floorId === f.id && "bg-accent text-foreground"),
							children: formatFloor(f.floor_number)
						}, f.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 py-4 text-xs text-muted-foreground",
						children: "Pick a hostel."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorOpen, { className: "h-3.5 w-3.5" }), " Rooms"]
					}), !floorId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-10 text-center text-sm text-muted-foreground",
						children: "Pick a floor to see rooms."
					}) : isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24" })
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3 md:grid-cols-3",
						children: rooms?.map((r) => {
							const occ = r.occupants?.length ?? 0;
							const free = r.capacity - occ;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-semibold",
										children: ["Room ", r.room_number]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded-full px-2 py-0.5 text-xs", free > 0 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"),
										children: free > 0 ? `${free} free` : "Full"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										"Capacity: ",
										r.capacity,
										" · Occupied: ",
										occ
									]
								})]
							}, r.id);
						})
					})]
				})
			]
		})]
	}) });
}
//#endregion
export { Hostels as component };
