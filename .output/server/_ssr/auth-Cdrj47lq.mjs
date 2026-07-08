import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { a as SelectTrigger, c as getCurrentFirebaseUser, d as signInWithGoogle, i as SelectItem, l as isFirebaseConfigured, n as Select, o as SelectValue, p as waitForFirebaseUser, r as SelectContent, s as firebaseAuthErrorMessage, t as Button, u as missingFirebaseConfig } from "./client-CmRslIl6.mjs";
import { t as RoomlyLogo } from "./roomly-logo-RX9ogVU9.mjs";
import { i as storedFont, n as setFont, r as setTheme } from "./font-sRXh1Zn-.mjs";
import { _ as useNavigate, g as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Cdrj47lq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const router = useRouter();
	const queryClient = useQueryClient();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [theme, setLocalTheme] = (0, import_react.useState)(() => {
		try {
			return typeof window !== "undefined" ? localStorage.getItem("roomly-theme") || "light" : "light";
		} catch (e) {
			return "light";
		}
	});
	const [font, setLocalFont] = (0, import_react.useState)(() => storedFont());
	(0, import_react.useEffect)(() => {
		getCurrentFirebaseUser().then((user) => {
			if (user) navigate({ to: "/dashboard" });
		});
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		try {
			setFont(storedFont());
		} catch (e) {}
	}, []);
	const handleGoogle = async () => {
		if (!ensureFirebaseReady()) return;
		setLoading(true);
		try {
			await waitForFirebaseUser((await signInWithGoogle()).uid);
			queryClient.removeQueries({ queryKey: ["profile"] });
			await router.invalidate();
			await navigate({
				to: "/dashboard",
				replace: true
			});
		} catch (error) {
			toast.error(firebaseAuthErrorMessage(error));
		} finally {
			setLoading(false);
		}
	};
	const ensureFirebaseReady = () => {
		if (isFirebaseConfigured()) return true;
		toast.error(`Missing Firebase config: ${missingFirebaseConfig().join(", ")}`);
		return false;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hero-glow min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mb-10 flex items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomlyLogo, { showTagline: true })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-panel p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 grid grid-cols-2 gap-3 md:grid-cols-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: theme,
							onValueChange: (v) => {
								try {
									setTheme(v);
									localStorage.setItem("roomly-theme", v);
									setLocalTheme(v);
								} catch (e) {}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-full text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "light",
									children: "Light"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "dark",
									children: "Dark"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "dev",
									children: "Dev"
								})
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: font,
							onValueChange: (v) => {
								try {
									setFont(v);
									localStorage.setItem("roomly-font", v);
									setLocalFont(v);
								} catch (e) {}
							},
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold tracking-tight",
						children: "Welcome back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Sign in with Google to keep exploring roommates."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						className: "mt-6 w-full",
						onClick: handleGoogle,
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), " Continue with Google"]
					})
				]
			})]
		})
	});
}
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "h-4 w-4",
		viewBox: "0 0 24 24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 5.38c1.62 0 3.06.56 4.2 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
			})
		]
	});
}
//#endregion
export { AuthPage as component };
