import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Bell, DoorOpen, Home, LogOut, Search, Settings, Shield, Users } from "lucide-react";

import { RoomlyLogo } from "@/components/brand/roomly-logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOutFirebase } from "@/integrations/firebase/client";

type AppShellProps = {
  children: ReactNode;
};

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/explore", label: "Explore", icon: Search },
  { to: "/hostels", label: "Hostels", icon: DoorOpen },
  { to: "/requests", label: "Requests", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: AppShellProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const handleSignOut = async () => {
    await signOutFirebase();
    queryClient.clear();
    await navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-background/95 px-5 py-6 backdrop-blur lg:flex lg:flex-col">
        <Link to="/dashboard" className="mb-8">
          <RoomlyLogo />
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground",
                  active && "bg-accent text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/admin"
            className={cn(
              "mt-3 flex h-10 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground",
              pathname === "/admin" && "bg-accent text-foreground",
            )}
          >
            <Shield className="h-4 w-4" />
            Admin
          </Link>
        </nav>

        <Button type="button" variant="ghost" className="justify-start gap-3" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </aside>

      <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <Link to="/dashboard">
            <RoomlyLogo markClassName="h-8 w-8" textClassName="text-xl" />
          </Link>
          <Button type="button" variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        <nav className="mt-3 flex gap-1 overflow-x-auto pb-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "inline-flex h-9 shrink-0 items-center gap-2 rounded-md px-3 text-sm text-muted-foreground",
                  active && "bg-accent text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 lg:ml-64 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  );
}
