import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { b as Building2, h as DoorOpen, n as UsersRound, p as LoaderCircle, r as Upload, t as Users } from "../_libs/lucide-react.mjs";
import { t as Button } from "./client-CmRslIl6.mjs";
import { o as supabase, r as formatCourseYear } from "./roomly-data-CG4yHoL5.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-DRgGkNn7.mjs";
import { n as parseExcelFile, t as Card } from "./excel-U41mKD0u.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-gunzrkKA.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Cu3osnV9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Admin() {
	const [excelRows, setExcelRows] = (0, import_react.useState)([]);
	const [fileName, setFileName] = (0, import_react.useState)(null);
	const [previewError, setPreviewError] = (0, import_react.useState)(null);
	const [importing, setImporting] = (0, import_react.useState)(false);
	const normalizedRows = (0, import_react.useMemo)(() => {
		return excelRows.map((row) => {
			const hostelName = String(row.hostel_name ?? row.hostel ?? row["Hostel Name"] ?? "").trim();
			const floorNumberRaw = row.floor_number ?? row.floor ?? row["Floor Number"];
			const roomNumber = String(row.room_number ?? row.room ?? row["Room Number"] ?? "").trim();
			const capacityRaw = row.capacity ?? row.cap ?? row["Capacity"];
			const floorNumber = Number(floorNumberRaw);
			const capacity = Number(capacityRaw || 2);
			return {
				hostel_name: hostelName,
				floor_number: Number.isFinite(floorNumber) ? floorNumber : null,
				room_number: roomNumber,
				capacity: Number.isFinite(capacity) && capacity > 0 ? capacity : 2,
				original: row
			};
		}).filter((row) => row.hostel_name && row.floor_number !== null && row.room_number);
	}, [excelRows]);
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
	const handleFileChange = async (event) => {
		setPreviewError(null);
		const file = event.target.files?.[0];
		if (!file) {
			setExcelRows([]);
			setFileName(null);
			return;
		}
		if (!/\.(xlsx|xls|csv)$/i.test(file.name)) {
			setPreviewError("Please upload an Excel (.xlsx/.xls) or CSV file.");
			setExcelRows([]);
			setFileName(file.name);
			return;
		}
		try {
			const parsed = await parseExcelFile(file);
			if (parsed.length === 0) {
				setPreviewError("No rows found in the uploaded file.");
				setExcelRows([]);
				setFileName(file.name);
				return;
			}
			setExcelRows(parsed);
			setFileName(file.name);
		} catch (error) {
			setPreviewError("Could not parse the spreadsheet file.");
			setExcelRows([]);
			setFileName(file.name);
		}
	};
	const importExcel = async () => {
		if (!normalizedRows.length) {
			toast.error("No valid room rows found to import.");
			return;
		}
		setImporting(true);
		try {
			const hostels = Array.from(new Map(normalizedRows.map((row) => [row.hostel_name, { hostel_name: row.hostel_name }])).values());
			await supabase.from("hostels").upsert(hostels, { onConflict: "hostel_name" });
			const { data: storedHostels, error: hostelQueryError } = await supabase.from("hostels").select("id,hostel_name").in("hostel_name", hostels.map((h) => h.hostel_name));
			if (hostelQueryError || !storedHostels) throw hostelQueryError || /* @__PURE__ */ new Error("Could not lookup hostels");
			const hostelMap = new Map(storedHostels.map((hostel) => [hostel.hostel_name, hostel.id]));
			const floors = Array.from(new Map(normalizedRows.map((row) => [`${row.hostel_name}:${row.floor_number}`, {
				hostel_id: hostelMap.get(row.hostel_name),
				floor_number: row.floor_number
			}])).values());
			await supabase.from("floors").upsert(floors, { onConflict: "hostel_id,floor_number" });
			const floorIds = Array.from(new Set(floors.map((item) => item.hostel_id)));
			const { data: storedFloors, error: floorQueryError } = await supabase.from("floors").select("id,hostel_id,floor_number").in("hostel_id", floorIds);
			if (floorQueryError || !storedFloors) throw floorQueryError || /* @__PURE__ */ new Error("Could not lookup floors");
			const floorMap = new Map(storedFloors.map((floor) => [`${floor.hostel_id}:${floor.floor_number}`, floor.id]));
			const rooms = normalizedRows.map((row) => ({
				floor_id: floorMap.get(`${hostelMap.get(row.hostel_name)}:${row.floor_number}`),
				room_number: row.room_number,
				capacity: row.capacity
			}));
			const { error: roomsError } = await supabase.from("rooms").upsert(rooms, { onConflict: "floor_id,room_number" });
			if (roomsError) throw roomsError;
			toast.success(`Imported ${rooms.length} room rows from ${fileName ?? "your file"}.`);
			setExcelRows([]);
			setFileName(null);
		} catch (error) {
			toast.error(error?.message ?? "Import failed.");
		} finally {
			setImporting(false);
		}
	};
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
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Import rooms from Excel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Upload a spreadsheet with hostel, floor and room data."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-accent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fileName ? `Replace file` : `Select file` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: ".xlsx,.xls,.csv",
										className: "sr-only",
										onChange: handleFileChange
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: importExcel,
								disabled: !normalizedRows.length || importing,
								children: importing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Import"
							})]
						})]
					}),
					fileName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 rounded-xl border border-border bg-muted/10 p-4 text-sm text-muted-foreground",
						children: [
							normalizedRows.length,
							" valid rows parsed from ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: fileName }),
							".",
							previewError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-destructive",
								children: previewError
							})
						]
					}),
					normalizedRows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: normalizedRows.slice(0, 4).map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold",
								children: row.hostel_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									"Floor ",
									row.floor_number,
									" · Room ",
									row.room_number,
									" · Capacity ",
									row.capacity
								]
							})]
						}, index))
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
