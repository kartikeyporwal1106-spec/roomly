import { n as __toESM } from "../_runtime.mjs";
import { o as supabase, t as COURSE_OPTIONS } from "./roomly-data-CG4yHoL5.mjs";
import { n as getCurrentFirebaseUser } from "./client-CVvJNAJr.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-epMf9U3A.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, t as Input } from "./select-COTGKTrK.mjs";
import { n as Textarea, t as Label } from "./textarea-DXDy8Nu5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DNf8Oj9h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Settings() {
	const qc = useQueryClient();
	const { data: me } = useQuery({
		queryKey: ["firebase-user"],
		queryFn: getCurrentFirebaseUser
	});
	const { data: profile } = useQuery({
		queryKey: ["profile", "self"],
		enabled: !!me,
		queryFn: async () => (await supabase.from("profiles").select("*").eq("firebase_uid", me.uid).maybeSingle()).data
	});
	const [form, setForm] = (0, import_react.useState)({});
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (profile) setForm(profile);
	}, [profile]);
	const save = async () => {
		setSaving(true);
		const { error } = await supabase.from("profiles").update({
			name: form.name,
			bio: form.bio,
			branch: form.branch,
			year: parseInt(form.year, 10),
			phone: form.phone,
			looking_status: form.looking_status
		}).eq("firebase_uid", me.uid);
		setSaving(false);
		if (error) return toast.error(error.message);
		toast.success("Profile updated");
		qc.invalidateQueries({ queryKey: ["profile"] });
	};
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface-panel p-8",
		children: "Loading…"
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl tracking-tight",
				style: { fontFamily: "var(--font-display)" },
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Update your profile details."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/onboarding",
				className: "text-sm text-primary hover:underline",
				children: "Re-run onboarding"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-panel space-y-5 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-1.5",
						value: form.name ?? "",
						onChange: (e) => setForm({
							...form,
							name: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-1.5",
						value: form.phone ?? "",
						onChange: (e) => setForm({
							...form,
							phone: e.target.value
						}),
						placeholder: "Only shown after request accepted"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Course" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: form.branch ?? "",
						onValueChange: (v) => setForm({
							...form,
							branch: v
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "mt-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select your course" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: COURSE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: option,
							children: option
						}, option)) })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Year" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: String(form.year ?? "1"),
						onValueChange: (v) => setForm({
							...form,
							year: v
						}),
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
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Looking status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.looking_status ?? "not_looking",
							onValueChange: (v) => setForm({
								...form,
								looking_status: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "mt-1.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "looking_for_roommate",
									children: "Looking for a roommate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "looking_for_room",
									children: "Looking for a room"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "not_looking",
									children: "Not looking"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "mt-1.5",
							rows: 4,
							value: form.bio ?? "",
							onChange: (e) => setForm({
								...form,
								bio: e.target.value
							})
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: save,
				disabled: saving,
				children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Save changes"]
			})]
		})]
	}) });
}
//#endregion
export { Settings as component };
