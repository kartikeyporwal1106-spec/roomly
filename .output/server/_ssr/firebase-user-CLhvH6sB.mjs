import { c as getCurrentFirebaseUser } from "./client-CmRslIl6.mjs";
import { j as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-user-CLhvH6sB.js
async function requireFirebaseUser() {
	const user = await getCurrentFirebaseUser();
	if (!user) throw redirect({ to: "/auth" });
	return user;
}
function firebaseUserProfile(user) {
	return {
		firebase_uid: user.uid,
		email: user.email,
		name: user.displayName,
		profile_photo: user.photoURL
	};
}
//#endregion
export { requireFirebaseUser as n, firebaseUserProfile as t };
