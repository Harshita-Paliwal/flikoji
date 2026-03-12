export const EMOJI_POOL = [
  { emoji: "\uD83E\uDD8A" }, { emoji: "\uD83D\uDC38" }, { emoji: "\uD83E\uDD84" }, { emoji: "\uD83D\uDC19" },
  { emoji: "\uD83E\uDD8B" }, { emoji: "\uD83D\uDC2C" }, { emoji: "\uD83E\uDD81" }, { emoji: "\uD83D\uDC27" },
  { emoji: "\uD83E\uDD80" }, { emoji: "\uD83D\uDC28" }, { emoji: "\uD83E\uDDA9" }, { emoji: "\uD83D\uDC33" },
  { emoji: "\uD83E\uDD9A" }, { emoji: "\uD83D\uDC1D" }, { emoji: "\uD83E\uDD9C" }, { emoji: "\uD83D\uDC22" },
  { emoji: "\uD83E\uDD94" }, { emoji: "\uD83D\uDC21" }
];

export const DIFFICULTIES = {
  Easy: { pairs: 6, cols: 4, rows: 3 },
  Medium: { pairs: 10, cols: 5, rows: 4 },
  Hard: { pairs: 18, cols: 6, rows: 6 }
};

export const THEMES = {
  light: {
    bg: "linear-gradient(135deg,#5d7ef6,#7754c9,#d98de9)",
    title: "#f7fbff",
    stat: "#eef5ff",
    card: "#4c51bf",
    cardGlow: "0 12px 24px rgba(40, 50, 120, 0.28)",
    diff: "linear-gradient(135deg,#3b82f6,#6366f1)",
    diffActive: "linear-gradient(135deg,#16a34a,#22c55e)",
    action: "linear-gradient(135deg,#ef4444,#f97316)",
    newGame: "linear-gradient(135deg,#0ea5e9,#0284c7)",
    modal: "linear-gradient(160deg,#1f2937,#111827)",
    overlay: "rgba(10,12,24,.45)",
    glowA: "rgba(160,212,255,.25)",
    glowB: "rgba(246,163,255,.24)",
    orbA: "rgba(255,255,255,.16)",
    orbB: "rgba(86,187,255,.18)",
    orbC: "rgba(255,131,205,.18)"
  },
  dark: {
    bg: "linear-gradient(135deg,#0f172a,#1e1b4b,#111827)",
    title: "#e5efff",
    stat: "#d8e6ff",
    card: "#1e3a8a",
    cardGlow: "0 14px 28px rgba(0, 0, 0, 0.42)",
    diff: "linear-gradient(135deg,#334155,#475569)",
    diffActive: "linear-gradient(135deg,#0f766e,#0ea5a6)",
    action: "linear-gradient(135deg,#b91c1c,#ea580c)",
    newGame: "linear-gradient(135deg,#0369a1,#1d4ed8)",
    modal: "linear-gradient(160deg,#020617,#111827)",
    overlay: "rgba(2,6,23,.64)",
    glowA: "rgba(56,189,248,.17)",
    glowB: "rgba(168,85,247,.17)",
    orbA: "rgba(148,163,184,.16)",
    orbB: "rgba(14,165,233,.17)",
    orbC: "rgba(217,70,239,.14)"
  }
};

export const BEST_KEY = "flikoji-best-v1";
export const MUTE_KEY = "flikoji-mute-v1";
