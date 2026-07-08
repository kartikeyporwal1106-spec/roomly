import { n as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { _ as ChevronUp, v as ChevronDown, y as Check } from "../_libs/lucide-react.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { m as FirebaseError, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import "../_libs/firebase.mjs";
import { a as setPersistence, i as onAuthStateChanged, n as browserLocalPersistence, o as signInWithPopup, r as getAuth, s as signOut, t as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
import { a as getFirestore, i as doc, n as setDoc, o as serverTimestamp, r as updateDoc, t as getDoc } from "../_libs/@firebase/firestore+[...].mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/client-CmRslIl6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
function env(name) {
	return {
		"BASE_URL": "/",
		"DEV": false,
		"FIREBASE_API_KEY": "AIzaSyDXQ-5cKEc9HBCjN49o_-FAsdFfOrlhAaA",
		"FIREBASE_APP_ID": "1:267656342867:web:99ef68c49fb075302fc5a6",
		"FIREBASE_AUTH_DOMAIN": "roomexchange.firebaseapp.com",
		"FIREBASE_MESSAGING_SENDER_ID": "267656342867",
		"FIREBASE_PROJECT_ID": "roomexchange",
		"FIREBASE_STORAGE_BUCKET": "roomexchange.firebasestorage.app",
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PROJECT_ID": "twgfnocepsmmsjghtkeq",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_cxCmsT5MUqOdznWjs7Gqgg_BKBfyAnU",
		"VITE_SUPABASE_URL": "https://twgfnocepsmmsjghtkeq.supabase.co"
	}[`VITE_${name}`] || {
		"BASE_URL": "/",
		"DEV": false,
		"FIREBASE_API_KEY": "AIzaSyDXQ-5cKEc9HBCjN49o_-FAsdFfOrlhAaA",
		"FIREBASE_APP_ID": "1:267656342867:web:99ef68c49fb075302fc5a6",
		"FIREBASE_AUTH_DOMAIN": "roomexchange.firebaseapp.com",
		"FIREBASE_MESSAGING_SENDER_ID": "267656342867",
		"FIREBASE_PROJECT_ID": "roomexchange",
		"FIREBASE_STORAGE_BUCKET": "roomexchange.firebasestorage.app",
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PROJECT_ID": "twgfnocepsmmsjghtkeq",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_cxCmsT5MUqOdznWjs7Gqgg_BKBfyAnU",
		"VITE_SUPABASE_URL": "https://twgfnocepsmmsjghtkeq.supabase.co"
	}[name] || (typeof processModule !== "undefined" ? processModule.env?.[name] : void 0);
}
var firebaseConfig = {
	apiKey: env("FIREBASE_API_KEY"),
	authDomain: env("FIREBASE_AUTH_DOMAIN"),
	projectId: env("FIREBASE_PROJECT_ID"),
	storageBucket: env("FIREBASE_STORAGE_BUCKET"),
	messagingSenderId: env("FIREBASE_MESSAGING_SENDER_ID"),
	appId: env("FIREBASE_APP_ID")
};
function missingFirebaseConfig() {
	return Object.entries(firebaseConfig).filter(([, value]) => !value).map(([key]) => key.replace(/[A-Z]/g, (char) => `_${char}`).toUpperCase());
}
function isFirebaseConfigured() {
	return missingFirebaseConfig().length === 0;
}
function getFirebaseApp() {
	const missing = missingFirebaseConfig();
	if (missing.length) throw new Error(`Missing Firebase environment variable(s): ${missing.join(", ")}`);
	return getApps()[0] ?? initializeApp(firebaseConfig);
}
function getFirebaseAuth() {
	return getAuth(getFirebaseApp());
}
function getFirebaseFirestore() {
	return getFirestore(getFirebaseApp());
}
async function getCurrentFirebaseUser() {
	if (!isFirebaseConfigured()) return null;
	const firebaseAuth = getFirebaseAuth();
	if (firebaseAuth.currentUser) return firebaseAuth.currentUser;
	return new Promise((resolve) => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
			unsubscribe();
			resolve(user);
		});
	});
}
async function waitForFirebaseUser(uid, timeoutMs = 5e3) {
	const firebaseAuth = getFirebaseAuth();
	if (firebaseAuth.currentUser?.uid === uid) return firebaseAuth.currentUser;
	return new Promise((resolve, reject) => {
		const timeout = window.setTimeout(() => {
			unsubscribe();
			reject(/* @__PURE__ */ new Error("Firebase sign-in completed, but the browser session was not ready yet."));
		}, timeoutMs);
		const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
			if (user?.uid !== uid) return;
			window.clearTimeout(timeout);
			unsubscribe();
			resolve(user);
		});
	});
}
async function signInWithGoogle() {
	const firebaseAuth = getFirebaseAuth();
	await setPersistence(firebaseAuth, browserLocalPersistence);
	const provider = new GoogleAuthProvider();
	provider.setCustomParameters({ prompt: "select_account" });
	const result = await signInWithPopup(firebaseAuth, provider);
	syncFirestoreUser(result.user);
	return result.user;
}
async function syncFirestoreUser(user) {
	try {
		const userRef = doc(getFirebaseFirestore(), "users", user.uid);
		const snapshot = await getDoc(userRef);
		const userData = {
			uid: user.uid,
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
			lastLogin: serverTimestamp()
		};
		if (snapshot.exists()) await updateDoc(userRef, userData);
		else await setDoc(userRef, {
			...userData,
			createdAt: serverTimestamp()
		});
	} catch {}
}
async function signOutFirebase() {
	if (!isFirebaseConfigured()) return;
	await signOut(getFirebaseAuth());
}
function firebaseAuthErrorMessage(error) {
	if (!(error instanceof FirebaseError)) return "Authentication failed. Please try again.";
	switch (error.code) {
		case "auth/popup-closed-by-user":
		case "auth/cancelled-popup-request": return "Google sign-in was closed before it finished.";
		case "auth/popup-blocked": return "Your browser blocked the Google sign-in popup. Please allow popups and try again.";
		case "auth/network-request-failed": return "Network error during sign-in. Check your connection and try again.";
		case "auth/account-exists-with-different-credential": return "An account already exists with a different sign-in method.";
		case "auth/unauthorized-domain": return "This domain is not allowed in Firebase Authentication settings.";
		default: return error.message || "Authentication failed. Please try again.";
	}
}
//#endregion
export { SelectTrigger as a, getCurrentFirebaseUser as c, signInWithGoogle as d, signOutFirebase as f, SelectItem as i, isFirebaseConfigured as l, Select as n, SelectValue as o, waitForFirebaseUser as p, SelectContent as r, firebaseAuthErrorMessage as s, Button as t, missingFirebaseConfig as u };
