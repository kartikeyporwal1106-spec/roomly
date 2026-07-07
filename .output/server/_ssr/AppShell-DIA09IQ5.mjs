import { t as cn } from "./utils-C_uf36nf.mjs";
import { o as signOutFirebase } from "./client-BO3TKPWh.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as RoomlyLogo } from "./roomly-logo-RX9ogVU9.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shield, f as House, o as Settings, p as DoorOpen, s as Search, u as LogOut, y as Bell } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-DIA09IQ5.js
var import_jsx_runtime = require_jsx_runtime();
var navItems = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: House
	},
	{
		to: "/explore",
		label: "Explore",
		icon: Search
	},
	{
		to: "/hostels",
		label: "Hostels",
		icon: DoorOpen
	},
	{
		to: "/requests",
		label: "Requests",
		icon: Bell
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const handleSignOut = async () => {
		await signOutFirebase();
		window.location.href = "/auth";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-background/95 px-5 py-6 backdrop-blur lg:flex lg:flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						className: "mb-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomlyLogo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-1 flex-col gap-1",
						children: [navItems.map((item) => {
							const Icon = item.icon;
							const active = pathname === item.to;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground", active && "bg-accent text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), item.label]
							}, item.to);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin",
							className: cn("mt-3 flex h-10 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground", pathname === "/admin" && "bg-accent text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" }), "Admin"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						className: "justify-start gap-3",
						onClick: handleSignOut,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Sign out"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomlyLogo, {
							markClassName: "h-8 w-8",
							textClassName: "text-xl"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						onClick: handleSignOut,
						"aria-label": "Sign out",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mt-3 flex gap-1 overflow-x-auto pb-1",
					children: navItems.map((item) => {
						const Icon = item.icon;
						const active = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("inline-flex h-9 shrink-0 items-center gap-2 rounded-md px-3 text-sm text-muted-foreground", active && "bg-accent text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), item.label]
						}, item.to);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-6xl px-4 py-6 lg:ml-64 lg:px-8 lg:py-8",
				children
			})
		]
	});
}
//#endregion
export { AppShell as t };
