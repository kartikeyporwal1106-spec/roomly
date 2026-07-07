import { cn } from "@/lib/utils";

type RoomlyLogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  showTagline?: boolean;
};

export function RoomlyLogo({
  className,
  markClassName,
  textClassName,
  showTagline = false,
}: RoomlyLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative h-9 w-9 shrink-0 rounded-[0.45rem] border-2 border-primary/90",
          "border-b-0 border-r-0 shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_30%,transparent)]",
          markClassName,
        )}
        style={{ boxShadow: "0 0 18px color-mix(in oklab, var(--primary) 30%, transparent)" }}
        aria-hidden="true"
      >
        <span className="absolute left-[0.42rem] top-[0.42rem] h-[1.05rem] w-[1.05rem] rounded-full border-[0.24rem] border-foreground" />
        <span className="absolute bottom-[0.38rem] left-[0.62rem] h-[1.2rem] w-[0.34rem] rounded-full bg-foreground" />
        <span className="absolute bottom-[0.38rem] right-[0.24rem] h-[1.35rem] w-[0.36rem] -rotate-12 rounded-full bg-primary" />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.45rem] font-black tracking-normal text-foreground",
            textClassName,
          )}
        >
          room<span className="text-primary">ly</span>
        </span>
        {showTagline && (
          <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-normal text-muted-foreground">
            Find your room. Find your people.
          </span>
        )}
      </span>
    </span>
  );
}
