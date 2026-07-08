import { n as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { c as Search, f as LogOut, h as DoorOpen, m as House, o as Shield, s as Settings, t as Users, x as Bell } from "../_libs/lucide-react.mjs";
import { a as SelectTrigger, f as signOutFirebase, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, t as Button } from "./client-CmRslIl6.mjs";
import { t as RoomlyLogo } from "./roomly-logo-RX9ogVU9.mjs";
import { i as storedFont, n as setFont, r as setTheme, t as ThemeToggle } from "./font-sRXh1Zn-.mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-DRgGkNn7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
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
		to: "/complaints",
		label: "Complaints",
		icon: Users
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
	const [font, setFontKey] = (0, import_react.useState)(storedFont());
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const handleSignOut = async () => {
		await signOutFirebase();
		queryClient.clear();
		await navigate({
			to: "/auth",
			replace: true
		});
	};
	(0, import_react.useEffect)(() => {
		try {
			setFont(storedFont());
		} catch (e) {}
	}, []);
	const handleFontChange = (v) => {
		const key = v;
		setFont(key);
		setFontKey(key);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-background/95 px-5 py-6 backdrop-blur lg:flex lg:flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							className: "flex items-center gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomlyLogo, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								title: "Set dev theme",
								onClick: () => {
									setTheme("dev");
								},
								className: "rounded-full border border-border bg-card px-2 py-0.5 text-xs font-semibold text-muted-foreground",
								children: "Dev"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-2 block text-xs font-semibold text-muted-foreground",
							children: "Font"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: font,
							onValueChange: handleFontChange,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-full text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "inter",
									children: "Inter"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "system",
									children: "System"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "comic",
									children: "Comic Sans"
								})
							] })]
						})]
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								title: "Set dev theme",
								onClick: () => {
									setTheme("dev");
								},
								className: "rounded-full border border-border bg-card px-2 py-0.5 text-xs font-semibold text-muted-foreground",
								children: "Dev"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: font,
								onValueChange: handleFontChange,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-32 text-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "inter",
										children: "Inter"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "system",
										children: "System"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "comic",
										children: "Comic Sans"
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								onClick: handleSignOut,
								"aria-label": "Sign out",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
							})
						]
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
