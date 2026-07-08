import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent } from "./client-CmRslIl6.mjs";
import { t as RoomlyLogo } from "./roomly-logo-RX9ogVU9.mjs";
import { i as storedFont, n as setFont, r as setTheme, t as ThemeToggle } from "./font-sRXh1Zn-.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as requireFirebaseUser } from "./firebase-user-CLhvH6sB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CVOtIT5y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-y-IxSfCy.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function RoomlySplash() {
	const [isDev, setIsDev] = (0, import_react.useState)(false);
	const [font, setLocalFont] = (0, import_react.useState)(storedFont());
	(0, import_react.useEffect)(() => {
		try {
			const theme = window.localStorage.getItem("roomly-theme");
			setIsDev(theme === "dev");
		} catch (e) {}
	}, []);
	const handleFont = (v) => {
		try {
			setFont(v);
			localStorage.setItem("roomly-font", v);
			setLocalFont(v);
		} catch (e) {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "paper-noise absolute inset-0 opacity-40",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-col items-center gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomlyLogo, {
						showTagline: true,
						markClassName: "h-14 w-14",
						textClassName: "text-4xl"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 rounded-full border border-border bg-card px-2 py-0.5 text-xs font-semibold text-muted-foreground",
						children: isDev ? "Dev" : "Beta"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								try {
									setTheme("dev");
									localStorage.setItem("roomly-theme", "dev");
									setIsDev(true);
								} catch (e) {}
							},
							className: "rounded-full border border-border bg-card px-2 py-0.5 text-xs font-semibold text-muted-foreground",
							children: "Dev"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: font,
							onValueChange: handleFont,
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
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: "Built by Kartikey"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 w-48 overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-2/3 animate-pulse rounded-full bg-primary" })
				})
			]
		})]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-semibold tracking-tight text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "That page doesn't exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90",
					children: "Go home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold text-foreground",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Try again in a moment."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-full border border-input px-5 py-2 text-sm font-medium hover:bg-accent",
						children: "Home"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Roomly — Find your hostel roommate" },
			{
				name: "description",
				content: "Roomly helps hostel students discover compatible roommates, check room availability, and connect — all in one calm, verified space."
			},
			{
				property: "og:title",
				content: "Roomly — Find your hostel roommate"
			},
			{
				property: "og:description",
				content: "Discover compatible roommates, browse room availability, and send verified requests. Built for hostel students."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Roomly — Find your hostel roommate"
			},
			{
				name: "description",
				content: "Roomly helps hostel students discover compatible roommates, check room availability, and connect — all in one calm, verified space."
			},
			{
				property: "og:description",
				content: "Roomly helps hostel students discover compatible roommates, check room availability, and connect — all in one calm, verified space."
			},
			{
				name: "twitter:description",
				content: "Roomly helps hostel students discover compatible roommates, check room availability, and connect — all in one calm, verified space."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6c8fb040-a4af-4cbd-a1a4-cc7e255ee545/id-preview-60f2c2d1--070a43a3-f0ba-4f03-8a53-1d0ef8ca026f.lovable.app-1783362060379.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6c8fb040-a4af-4cbd-a1a4-cc7e255ee545/id-preview-60f2c2d1--070a43a3-f0ba-4f03-8a53-1d0ef8ca026f.lovable.app-1783362060379.png"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: ""
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `;(function(){try{var t=localStorage.getItem('roomly-theme');if(t==='dark'){document.documentElement.classList.add('dark');}else if(t==='dev'){document.documentElement.classList.add('dev');}else{document.documentElement.classList.add('dark');}var f=localStorage.getItem('roomly-font')||'inter';if(f==='comic'){document.documentElement.style.setProperty('--font-body', "'Comic Sans MS', 'Comic Sans', cursive");document.documentElement.style.setProperty('--font-display', "'Comic Sans MS', 'Comic Sans', cursive");}else if(f==='system'){document.documentElement.style.setProperty('--font-body', 'ui-rounded, "SF Pro Rounded", "Avenir Next Rounded", "Trebuchet MS", system-ui, sans-serif');document.documentElement.style.setProperty('--font-display', 'ui-rounded, "SF Pro Rounded", "Avenir Next Rounded", "Trebuchet MS", system-ui, sans-serif');}else{document.documentElement.style.setProperty('--font-body', "'Inter', ui-rounded, 'SF Pro Rounded', 'Avenir Next Rounded', 'Trebuchet MS', system-ui, sans-serif");document.documentElement.style.setProperty('--font-display', "'Inter', ui-rounded, 'SF Pro Rounded', 'Avenir Next Rounded', 'Trebuchet MS', system-ui, sans-serif");}}catch(e){} })();` } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	const [splashVisible, setSplashVisible] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let t = window.setTimeout(() => setSplashVisible(false), 1100);
		function onLoad() {
			setSplashVisible(false);
			window.clearTimeout(t);
		}
		if (document.readyState === "complete") onLoad();
		else window.addEventListener("load", onLoad, { once: true });
		return () => {
			window.clearTimeout(t);
			window.removeEventListener("load", onLoad);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			splashVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomlySplash, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" })
		]
	});
}
var $$splitComponentImporter$12 = () => import("./upsifs-hostel-BAWD5jaY.mjs");
var Route$12 = createFileRoute("/upsifs-hostel")({
	head: () => ({ meta: [{ title: "UPSIFS Hostel registration" }, {
		name: "description",
		content: "Register hostel students using a college email and sync spreadsheet data with Supabase."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./auth-Cdrj47lq.mjs");
var Route$11 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign in — Roomly" }, {
		name: "description",
		content: "Sign in to Roomly to discover compatible roommates."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./route-Di7iQBCH.mjs");
var Route$10 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const user = await requireFirebaseUser();
		if (!user) throw redirect({ to: "/auth" });
		return { user };
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./routes-De5C9vCz.mjs");
var Route$9 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./settings-Tzk1KssM.mjs");
var Route$8 = createFileRoute("/_authenticated/settings")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./requests-lGNIg_rD.mjs");
var Route$7 = createFileRoute("/_authenticated/requests")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./onboarding-hs6dakMx.mjs");
var Route$6 = createFileRoute("/_authenticated/onboarding")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./hostels-BG3_0Dp7.mjs");
var Route$5 = createFileRoute("/_authenticated/hostels")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./explore-nA_gLr8C.mjs");
var Route$4 = createFileRoute("/_authenticated/explore")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./dashboard-BghY8dlm.mjs");
var Route$3 = createFileRoute("/_authenticated/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./complaints-DHp_kY1q.mjs");
var Route$2 = createFileRoute("/_authenticated/complaints")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin-Cu3osnV9.mjs");
var Route$1 = createFileRoute("/_authenticated/admin")({
	beforeLoad: async () => {
		await requireFirebaseUser();
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./profile._id-ijFx3jkQ.mjs");
var Route = createFileRoute("/_authenticated/profile/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var UpsifsHostelRoute = Route$12.update({
	id: "/upsifs-hostel",
	path: "/upsifs-hostel",
	getParentRoute: () => Route$13
});
var AuthRoute = Route$11.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$13
});
var AuthenticatedRouteRoute = Route$10.update({
	id: "/_authenticated",
	getParentRoute: () => Route$13
});
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AuthenticatedSettingsRoute = Route$8.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRequestsRoute = Route$7.update({
	id: "/requests",
	path: "/requests",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOnboardingRoute = Route$6.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedHostelsRoute = Route$5.update({
	id: "/hostels",
	path: "/hostels",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedExploreRoute = Route$4.update({
	id: "/explore",
	path: "/explore",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$3.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedComplaintsRoute = Route$2.update({
	id: "/complaints",
	path: "/complaints",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRoute: Route$1.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedComplaintsRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedExploreRoute,
	AuthenticatedHostelsRoute,
	AuthenticatedOnboardingRoute,
	AuthenticatedRequestsRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedProfileIdRoute: Route.update({
		id: "/profile/$id",
		path: "/profile/$id",
		getParentRoute: () => AuthenticatedRouteRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	UpsifsHostelRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
