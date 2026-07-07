import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

type ThemeMode = "light" | "dark" | "dev";

const STORAGE_KEY = "roomly-theme";

function applyTheme(mode: ThemeMode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
  document.documentElement.classList.toggle("light", mode === "light");
  document.documentElement.classList.toggle("dev", mode === "dev");
  // color-scheme supports only light/dark — fallback to light for dev
  document.documentElement.style.colorScheme = mode === "dark" ? "dark" : "light";
}

function storedTheme(): ThemeMode {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "dark") return "dark";
  if (saved === "dev") return "dev";
  // default to dark theme when no preference is stored
  return "dark";
}

// programmatic setter so other parts of the app or dev console can switch theme
export function setTheme(mode: ThemeMode) {
  window.localStorage.setItem(STORAGE_KEY, mode);
  applyTheme(mode);
}

// expose quick helper for console/dev use
if (typeof window !== "undefined") {
  // attach lazily to avoid SSR issues
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.roomlySetTheme = setTheme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const mode = storedTheme();
    setTheme(mode);
    applyTheme(mode);
  }, []);

  // cycle through themes: light -> dark -> dev -> light
  const nextTheme: ThemeMode = theme === "light" ? "dark" : theme === "dark" ? "dev" : "light";
  const Icon = theme === "light" ? Moon : theme === "dark" ? Sun : Moon;

  const toggleTheme = () => {
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
