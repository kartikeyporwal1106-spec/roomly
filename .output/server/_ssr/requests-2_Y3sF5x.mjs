import { n as __toESM } from "../_runtime.mjs";
import { o as supabase, r as formatCourseYear } from "./roomly-data-CG4yHoL5.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AppShell } from "./AppShell-DIA09IQ5.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-gunzrkKA.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as fetchCurrentProfile } from "./queries-CLR9Mji1.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/requests-2_Y3sF5x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function Requests() {
	const qc = useQueryClient();
	const { data: me } = useQuery({
		queryKey: ["profile", "self"],
		queryFn: fetchCurrentProfile
	});
	const { data: incoming } = useQuery({
		queryKey: [
			"req",
			"incoming",
			me?.id
		],
		enabled: !!me,
		queryFn: async () => (await supabase.from("roommate_requests").select("*, sender:profiles!roommate_requests_sender_id_fkey(id,name,profile_photo,branch,year,email,phone)").eq("receiver_id", me.id).order("created_at", { ascending: false })).data ?? []
	});
	const { data: outgoing } = useQuery({
		queryKey: [
			"req",
			"outgoing",
			me?.id
		],
		enabled: !!me,
		queryFn: async () => (await supabase.from("roommate_requests").select("*, receiver:profiles!roommate_requests_receiver_id_fkey(id,name,profile_photo,branch,year,email,phone)").eq("sender_id", me.id).order("created_at", { ascending: false })).data ?? []
	});
	(0, import_react.useEffect)(() => {
		if (me) supabase.from("notifications").update({ read: true }).eq("user_id", me.id).eq("read", false).then();
	}, [me]);
	const respond = async (id, status) => {
		const { error } = await supabase.from("roommate_requests").update({ status }).eq("id", id);
		if (error) return toast.error(error.message);
		toast.success(`Request ${status}`);
		qc.invalidateQueries({ queryKey: ["req"] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl tracking-tight",
			style: { fontFamily: "var(--font-display)" },
			children: "Requests"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Manage your incoming and outgoing roommate requests."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "incoming",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
					value: "incoming",
					children: ["Incoming ", incoming?.length ? `(${incoming.length})` : ""]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
					value: "outgoing",
					children: ["Outgoing ", outgoing?.length ? `(${outgoing.length})` : ""]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "incoming",
					className: "mt-4 space-y-3",
					children: incoming?.length ? incoming.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel flex flex-wrap items-center gap-4 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/profile/$id",
							params: { id: r.sender.id },
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-12 w-12",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: r.sender.profile_photo ?? void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: r.sender.name?.[0] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: r.sender.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: formatCourseYear(r.sender.branch, r.sender.year)
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: r.status
							}), r.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => respond(r.id, "rejected"),
								children: "Decline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => respond(r.id, "accepted"),
								children: "Accept"
							})] })]
						})]
					}, r.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: "No incoming requests yet." })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "outgoing",
					className: "mt-4 space-y-3",
					children: outgoing?.length ? outgoing.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel flex flex-wrap items-center gap-4 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/profile/$id",
							params: { id: r.receiver.id },
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-12 w-12",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: r.receiver.profile_photo ?? void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: r.receiver.name?.[0] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: r.receiver.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: formatCourseYear(r.receiver.branch, r.receiver.year)
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: r.status
							}), r.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => respond(r.id, "cancelled"),
								children: "Cancel"
							})]
						})]
					}, r.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: "You haven't sent any requests." })
				})
			]
		})]
	}) });
}
function EmptyState({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface-panel p-10 text-center text-sm text-muted-foreground",
		children: text
	});
}
//#endregion
export { Requests as component };
