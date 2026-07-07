import { redirect } from "@tanstack/react-router";
import type { User } from "firebase/auth";

import { getCurrentFirebaseUser } from "@/integrations/firebase/client";

export async function requireFirebaseUser() {
  const user = await getCurrentFirebaseUser();
  if (!user) throw redirect({ to: "/auth" });
  return user;
}

export function firebaseUserProfile(user: User) {
  return {
    firebase_uid: user.uid,
    email: user.email,
    name: user.displayName,
    profile_photo: user.photoURL,
  };
}
