import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { requireFirebaseUser } from "@/lib/firebase-user";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const user = await requireFirebaseUser();
    if (!user) throw redirect({ to: "/auth" });
    return { user };
  },
  component: () => <Outlet />,
});
