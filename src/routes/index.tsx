import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Users, DoorOpen, Bell } from "lucide-react";
import { RoomlyLogo } from "@/components/brand/roomly-logo";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <RoomlyLogo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
        </nav>
        <Link
          to="/auth"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Sign in
        </Link>
      </header>

      {/* Hero */}
      <section className="hero-glow relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 pb-24 pt-16 text-center md:pt-24">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Built for hostels, made for students
          </div>
          <h1
            className="mt-8 text-5xl leading-[1.02] tracking-tight md:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find the <span className="italic text-primary">right</span> roommate,<br />
            not just any bunk.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Roomly matches hostel students by sleep schedule, cleanliness, study
            style and vibe — so you room with someone who actually fits.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-accent"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Compatibility first",
              body: "Lifestyle-based matching using sleep, cleanliness, study style and personality — not just course and year.",
            },
            {
              icon: DoorOpen,
              title: "Live room availability",
              body: "Browse hostels → floors → rooms. See who's in and how many beds are open, in real time.",
            },
            {
              icon: Bell,
              title: "Verified requests",
              body: "Send a request, get notified, and only then share contact details. No random DMs.",
            },
          ].map((f) => (
            <div key={f.title} className="surface-panel p-6">
              <f.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How */}
      <section id="how" className="mx-auto max-w-6xl px-6 pb-32">
        <div className="surface-panel p-10 md:p-14">
          <h2
            className="text-3xl tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Three steps. That's it.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Create your profile", "College email, hostel, and a quick lifestyle survey."],
              ["02", "Discover roommates", "Filter by hostel, floor, sleep habits, cleanliness and more."],
              ["03", "Send a request", "Match, chat, and lock in your bunk-mate for the year."],
            ].map(([step, title, body]) => (
              <div key={step}>
                <div className="text-sm text-primary">{step}</div>
                <div className="mt-2 text-lg font-semibold">{title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Roomly. Built for hostel life.
      </footer>
    </div>
  );
}
