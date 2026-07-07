import { initializeApp, getApps } from "firebase/app";
import { FirebaseError } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

function env(name: string): string | undefined {
  return (
    import.meta.env[`VITE_${name}`] ||
    import.meta.env[name] ||
    (typeof process !== "undefined" ? process.env?.[name] : undefined)
  );
}

const firebaseConfig = {
  apiKey: env("FIREBASE_API_KEY"),
  authDomain: env("FIREBASE_AUTH_DOMAIN"),
  projectId: env("FIREBASE_PROJECT_ID"),
  storageBucket: env("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: env("FIREBASE_MESSAGING_SENDER_ID"),
  appId: env("FIREBASE_APP_ID"),
};

export function missingFirebaseConfig() {
  return Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key.replace(/[A-Z]/g, (char) => `_${char}`).toUpperCase());
}

export function isFirebaseConfigured() {
  return missingFirebaseConfig().length === 0;
}

export function getFirebaseApp() {
  const missing = missingFirebaseConfig();
  if (missing.length) {
    throw new Error(`Missing Firebase environment variable(s): ${missing.join(", ")}`);
  }

  return getApps()[0] ?? initializeApp(firebaseConfig as Record<string, string>);
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}

export function getFirebaseFirestore() {
  return getFirestore(getFirebaseApp());
}

export async function getCurrentFirebaseUser() {
  if (!isFirebaseConfigured()) return null;

  const firebaseAuth = getFirebaseAuth();
  if (firebaseAuth.currentUser) return firebaseAuth.currentUser;

  return new Promise<User | null>((resolve) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export async function signInWithGoogle() {
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
      lastLogin: serverTimestamp(),
    };

    if (snapshot.exists()) {
      await updateDoc(userRef, userData);
    } else {
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.warn("[Firebase] Could not sync Firestore user document", error);
  }

  return result.user;
}

export async function signOutFirebase() {
  if (!isFirebaseConfigured()) return;
  await signOut(getFirebaseAuth());
}

export function firebaseAuthErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) return "Authentication failed. Please try again.";

  switch (error.code) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Google sign-in was closed before it finished.";
    case "auth/popup-blocked":
      return "Your browser blocked the Google sign-in popup. Please allow popups and try again.";
    case "auth/network-request-failed":
      return "Network error during sign-in. Check your connection and try again.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with a different sign-in method.";
    case "auth/unauthorized-domain":
      return "This domain is not allowed in Firebase Authentication settings.";
    default:
      return error.message || "Authentication failed. Please try again.";
  }
}
