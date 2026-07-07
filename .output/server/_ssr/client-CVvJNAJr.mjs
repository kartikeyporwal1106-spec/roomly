import { m as FirebaseError, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import "../_libs/firebase.mjs";
import { a as setPersistence, i as onAuthStateChanged, n as browserLocalPersistence, o as signInWithPopup, r as getAuth, s as signOut, t as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
import { a as getFirestore, i as doc, n as setDoc, o as serverTimestamp, r as updateDoc, t as getDoc } from "../_libs/@firebase/firestore+[...].mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/client-CVvJNAJr.js
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
async function signInWithGoogle() {
	const firebaseAuth = getFirebaseAuth();
	const firestore = getFirebaseFirestore();
	await setPersistence(firebaseAuth, browserLocalPersistence);
	const provider = new GoogleAuthProvider();
	provider.setCustomParameters({ prompt: "select_account" });
	const result = await signInWithPopup(firebaseAuth, provider);
	try {
		const userRef = doc(firestore, "users", result.user.uid);
		const snapshot = await getDoc(userRef);
		const userData = {
			uid: result.user.uid,
			displayName: result.user.displayName,
			email: result.user.email,
			photoURL: result.user.photoURL,
			lastLogin: serverTimestamp()
		};
		if (snapshot.exists()) await updateDoc(userRef, userData);
		else await setDoc(userRef, {
			...userData,
			createdAt: serverTimestamp()
		});
	} catch {}
	return result.user;
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
export { signInWithGoogle as a, missingFirebaseConfig as i, getCurrentFirebaseUser as n, signOutFirebase as o, isFirebaseConfigured as r, firebaseAuthErrorMessage as t };
