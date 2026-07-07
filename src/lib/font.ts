export type FontKey = "inter" | "comic" | "system";

const STORAGE_KEY = "roomly-font";

export function getFontCssValue(key: FontKey) {
  switch (key) {
    case "inter":
      return "'Inter', ui-rounded, 'SF Pro Rounded', 'Avenir Next Rounded', 'Trebuchet MS', system-ui, sans-serif";
    case "comic":
      return "'Comic Sans MS', 'Comic Sans', cursive";
    case "system":
    default:
      return "ui-rounded, 'SF Pro Rounded', 'Avenir Next Rounded', 'Trebuchet MS', system-ui, sans-serif";
  }
}

export function setFont(key: FontKey) {
  try {
    window.localStorage.setItem(STORAGE_KEY, key);
    const val = getFontCssValue(key);
    document.documentElement.style.setProperty('--font-body', val);
    document.documentElement.style.setProperty('--font-display', val);
  } catch (e) {
    // ignore
  }
}

export function storedFont(): FontKey {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) as FontKey | null;
    if (saved === "inter" || saved === "comic" || saved === "system") return saved;
  } catch (e) {
    // ignore
  }
  return "inter";
}

// expose helper for console
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.roomlySetFont = setFont;
}
