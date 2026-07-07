import { n as __toESM } from "../_runtime.mjs";
import { a as hostelGenderLabel, i as formatFloor, o as supabase, r as formatCourseYear } from "./roomly-data-CG4yHoL5.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Search } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-epMf9U3A.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-gunzrkKA.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as looksLabels } from "./queries-Si5Sn4Ez.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, t as Input } from "./select-COTGKTrK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore-CfW62efJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Explore() {
	const [q, setQ] = (0, import_react.useState)("");
	const [hostelId, setHostelId] = (0, import_react.useState)("all");
	const [year, setYear] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const { data: hostels } = useQuery({
		queryKey: ["hostels"],
		queryFn: async () => (await supabase.from("hostels").select("*").order("gender").order("hostel_name")).data ?? []
	});
	const { data: people, isLoading } = useQuery({
		queryKey: [
			"explore",
			hostelId,
			year,
			status
		],
		queryFn: async () => {
			let query = supabase.from("profiles").select("id,name,profile_photo,branch,year,looking_status,bio,room:rooms(id,room_number,floor:floors(floor_number,hostel:hostels(id,hostel_name)))").eq("onboarding_complete", true).order("created_at", { ascending: false }).limit(60);
			if (year !== "all") query = query.eq("year", parseInt(year, 10));
			if (status !== "all") query = query.eq("looking_status", status);
			const { data } = await query;
			return data ?? [];
		}
	});
	const filtered = (0, import_react.useMemo)(() => {
		return (people ?? []).filter((p) => {
			if (hostelId !== "all" && p.room?.floor?.hostel?.id !== hostelId) return false;
			if (q) {
				const s = q.toLowerCase();
				if (!(p.name?.toLowerCase().includes(s) || p.branch?.toLowerCase().includes(s))) return false;
			}
			return true;
		});
	}, [
		people,
		q,
		hostelId
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl tracking-tight",
				style: { fontFamily: "var(--font-display)" },
				children: "Explore roommates"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Find someone whose vibe matches yours."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel flex flex-col gap-3 p-4 md:flex-row md:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search by name or course",
							className: "pl-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: hostelId,
						onValueChange: setHostelId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "md:w-44",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Hostel" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All hostels"
						}), hostels?.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value: h.id,
							children: [
								h.hostel_name,
								" · ",
								hostelGenderLabel(h.gender)
							]
						}, h.id))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: year,
						onValueChange: setYear,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "md:w-32",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Year" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "Any year"
						}), [
							1,
							2,
							3,
							4,
							5
						].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value: String(y),
							children: ["Year ", y]
						}, y))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: status,
						onValueChange: setStatus,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "md:w-52",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Status" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All statuses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "looking_for_roommate",
								children: "Looking for roommate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "looking_for_room",
								children: "Looking for room"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "not_looking",
								children: "Not looking"
							})
						] })]
					})
				]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full" }, i))
			}) : filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
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
						p.room ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [
								p.room.floor.hostel.hostel_name,
								" · ",
								formatFloor(p.room.floor.floor_number)
							]
						}) : null,
						p.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 line-clamp-2 text-sm text-muted-foreground",
							children: p.bio
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "mt-3",
							children: looksLabels[p.looking_status]
						})
					]
				}, p.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-panel p-12 text-center text-sm text-muted-foreground",
				children: "No matches. Try loosening the filters."
			})
		]
	}) });
}
//#endregion
export { Explore as component };
