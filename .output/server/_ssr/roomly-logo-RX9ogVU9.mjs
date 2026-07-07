import { t as cn } from "./utils-C_uf36nf.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roomly-logo-RX9ogVU9.js
var import_jsx_runtime = require_jsx_runtime();
function RoomlyLogo({ className, markClassName, textClassName, showTagline = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("relative h-9 w-9 shrink-0 rounded-[0.45rem] border-2 border-primary/90", "border-b-0 border-r-0 shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_30%,transparent)]", markClassName),
			style: { boxShadow: "0 0 18px color-mix(in oklab, var(--primary) 30%, transparent)" },
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-[0.42rem] top-[0.42rem] h-[1.05rem] w-[1.05rem] rounded-full border-[0.24rem] border-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-[0.38rem] left-[0.62rem] h-[1.2rem] w-[0.34rem] rounded-full bg-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-[0.38rem] right-[0.24rem] h-[1.35rem] w-[0.36rem] -rotate-12 rounded-full bg-primary" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("text-[1.45rem] font-black tracking-normal text-foreground", textClassName),
				children: ["room", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-primary",
					children: "ly"
				})]
			}), showTagline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 text-[0.58rem] font-semibold uppercase tracking-normal text-muted-foreground",
				children: "Find your room. Find your people."
			})]
		})]
	});
}
//#endregion
export { RoomlyLogo as t };
