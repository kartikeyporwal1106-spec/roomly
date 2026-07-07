import { n as getCurrentFirebaseUser } from "./client-BO3TKPWh.mjs";
import { j as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-user-K8gk4vwa.js
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
