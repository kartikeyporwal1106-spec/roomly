import { n as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as requireFirebaseUser } from "./firebase-user-Dy14YZtv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-fXylPtRg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-4a8mIRia.css";
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
var Route$11 = createRootRouteWithContext()({
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
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$11.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" })]
	});
}
var $$splitComponentImporter$10 = () => import("./auth-vcnvjh5B.mjs");
var Route$10 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign in — Roomly" }, {
		name: "description",
		content: "Sign in to Roomly to discover compatible roommates."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./route-Di7iQBCH.mjs");
var Route$9 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const user = await requireFirebaseUser();
		if (!user) throw redirect({ to: "/auth" });
		return { user };
	},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./routes-WTEUR2Ky.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./settings-DNf8Oj9h.mjs");
var Route$7 = createFileRoute("/_authenticated/settings")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./requests-DKu5_WcJ.mjs");
var Route$6 = createFileRoute("/_authenticated/requests")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./onboarding-afNJAkuS.mjs");
var Route$5 = createFileRoute("/_authenticated/onboarding")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./hostels-Br-Yz2f_.mjs");
var Route$4 = createFileRoute("/_authenticated/hostels")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./explore-CfW62efJ.mjs");
var Route$3 = createFileRoute("/_authenticated/explore")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./dashboard-AbtFkNNS.mjs");
var Route$2 = createFileRoute("/_authenticated/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin-8xgoLGBm.mjs");
var Route$1 = createFileRoute("/_authenticated/admin")({
	beforeLoad: async () => {
		await requireFirebaseUser();
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./profile._id-B0vYVZig.mjs");
var Route = createFileRoute("/_authenticated/profile/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var AuthRoute = Route$10.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$11
});
var AuthenticatedRouteRoute = Route$9.update({
	id: "/_authenticated",
	getParentRoute: () => Route$11
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var AuthenticatedSettingsRoute = Route$7.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRequestsRoute = Route$6.update({
	id: "/requests",
	path: "/requests",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOnboardingRoute = Route$5.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedHostelsRoute = Route$4.update({
	id: "/hostels",
	path: "/hostels",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedExploreRoute = Route$3.update({
	id: "/explore",
	path: "/explore",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$2.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRoute: Route$1.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
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
	AuthRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
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
