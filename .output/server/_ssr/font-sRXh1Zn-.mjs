import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as Sun, u as Moon } from "../_libs/lucide-react.mjs";
import { t as Button } from "./client-CmRslIl6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/font-sRXh1Zn-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY$1 = "roomly-theme";
function applyTheme(mode) {
	document.documentElement.classList.toggle("dark", mode === "dark");
	document.documentElement.classList.toggle("light", mode === "light");
	document.documentElement.classList.toggle("dev", mode === "dev");
	document.documentElement.style.colorScheme = mode === "dark" ? "dark" : "light";
}
function storedTheme() {
	const saved = window.localStorage.getItem(STORAGE_KEY$1);
	if (saved === "dark") return "dark";
	if (saved === "dev") return "dev";
	return "dark";
}
function setTheme(mode) {
	window.localStorage.setItem(STORAGE_KEY$1, mode);
	applyTheme(mode);
}
if (typeof window !== "undefined") window.roomlySetTheme = setTheme;
function ThemeToggle() {
	const [theme, setTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const mode = storedTheme();
		setTheme(mode);
		applyTheme(mode);
	}, []);
	const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "dev" : "light";
	const Icon = theme === "light" ? Moon : theme === "dark" ? Sun : Moon;
	const toggleTheme = () => {
		window.localStorage.setItem(STORAGE_KEY$1, nextTheme);
		setTheme(nextTheme);
		applyTheme(nextTheme);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: "outline",
		size: "icon",
		onClick: toggleTheme,
		"aria-label": `Switch to ${nextTheme} theme`,
		title: `Switch to ${nextTheme} theme`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
	});
}
var STORAGE_KEY = "roomly-font";
function getFontCssValue(key) {
	switch (key) {
		case "inter": return "'Inter', ui-rounded, 'SF Pro Rounded', 'Avenir Next Rounded', 'Trebuchet MS', system-ui, sans-serif";
		case "comic": return "'Comic Sans MS', 'Comic Sans', cursive";
		default: return "ui-rounded, 'SF Pro Rounded', 'Avenir Next Rounded', 'Trebuchet MS', system-ui, sans-serif";
	}
}
function setFont(key) {
	try {
		window.localStorage.setItem(STORAGE_KEY, key);
		const val = getFontCssValue(key);
		document.documentElement.style.setProperty("--font-body", val);
		document.documentElement.style.setProperty("--font-display", val);
	} catch (e) {}
}
function storedFont() {
	try {
		const saved = window.localStorage.getItem(STORAGE_KEY);
		if (saved === "inter" || saved === "comic" || saved === "system") return saved;
	} catch (e) {}
	return "inter";
}
if (typeof window !== "undefined") window.roomlySetFont = setFont;
//#endregion
export { storedFont as i, setFont as n, setTheme as r, ThemeToggle as t };
