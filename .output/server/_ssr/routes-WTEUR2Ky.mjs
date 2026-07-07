import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as RoomlyLogo } from "./roomly-logo-RX9ogVU9.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as ArrowRight, i as Sparkles, p as DoorOpen, t as Users, y as Bell } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-WTEUR2Ky.js
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomlyLogo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-8 text-sm text-muted-foreground md:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#features",
							className: "hover:text-foreground",
							children: "Features"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#how",
							className: "hover:text-foreground",
							children: "How it works"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						className: "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
						children: "Sign in"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "hero-glow relative overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl px-6 pb-24 pt-16 text-center md:pt-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }), "Built for hostels, made for students"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-8 text-5xl leading-[1.02] tracking-tight md:text-7xl",
							style: { fontFamily: "var(--font-display)" },
							children: [
								"Find the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-primary",
									children: "right"
								}),
								" roommate,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"not just any bunk."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg",
							children: "Roomly matches hostel students by sleep schedule, cleanliness, study style and vibe — so you room with someone who actually fits."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/auth",
								className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90",
								children: ["Get started ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#features",
								className: "inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-accent",
								children: "Learn more"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "features",
				className: "mx-auto max-w-6xl px-6 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-3",
					children: [
						{
							icon: Users,
							title: "Compatibility first",
							body: "Lifestyle-based matching using sleep, cleanliness, study style and personality — not just course and year."
						},
						{
							icon: DoorOpen,
							title: "Live room availability",
							body: "Browse hostels → floors → rooms. See who's in and how many beds are open, in real time."
						},
						{
							icon: Bell,
							title: "Verified requests",
							body: "Send a request, get notified, and only then share contact details. No random DMs."
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-panel p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-lg font-semibold",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: f.body
							})
						]
					}, f.title))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "how",
				className: "mx-auto max-w-6xl px-6 pb-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel p-10 md:p-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl tracking-tight md:text-4xl",
						style: { fontFamily: "var(--font-display)" },
						children: "Three steps. That's it."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-6 md:grid-cols-3",
						children: [
							[
								"01",
								"Create your profile",
								"College email, hostel, and a quick lifestyle survey."
							],
							[
								"02",
								"Discover roommates",
								"Filter by hostel, floor, sleep habits, cleanliness and more."
							],
							[
								"03",
								"Send a request",
								"Match, chat, and lock in your bunk-mate for the year."
							]
						].map(([step, title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-primary",
								children: step
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-lg font-semibold",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm text-muted-foreground",
								children: body
							})
						] }, step))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto max-w-6xl px-6 pb-10 text-xs text-muted-foreground",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Roomly. Built for hostel life."
				]
			})
		]
	});
}
//#endregion
export { Landing as component };
