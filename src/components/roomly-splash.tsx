import { useEffect, useState } from "react";
import { RoomlyLogo } from "@/components/brand/roomly-logo";
import { ThemeToggle, setTheme } from "@/components/theme-toggle";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { setFont, storedFont } from "@/lib/font";

export function RoomlySplash() {
  const [isDev, setIsDev] = useState(false);
  const [font, setLocalFont] = useState<string>(storedFont());

  useEffect(() => {
    try {
      const theme = window.localStorage.getItem("roomly-theme");
      setIsDev(theme === "dev");
    } catch (e) {
      // ignore
    }
  }, []);

  const handleFont = (v) => {
    try {
      setFont(v);
      localStorage.setItem("roomly-font", v);
      setLocalFont(v);
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background text-foreground">
      <div className="paper-noise absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative flex flex-col items-center gap-5">
        <div className="flex items-start gap-3">
          <RoomlyLogo showTagline markClassName="h-14 w-14" textClassName="text-4xl" />
          <span className="mt-1 rounded-full border border-border bg-card px-2 py-0.5 text-xs font-semibold text-muted-foreground">
            {isDev ? "Dev" : "Beta"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => {
              try {
                setTheme("dev");
                localStorage.setItem("roomly-theme", "dev");
                setIsDev(true);
              } catch (e) {}
            }}
            className="rounded-full border border-border bg-card px-2 py-0.5 text-xs font-semibold text-muted-foreground"
          >
            Dev
          </button>

          <Select value={font} onValueChange={handleFont}>
            <SelectTrigger className="w-32 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="comic">Comic Sans</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">Built by Kartikey</div>

        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}
