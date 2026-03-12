import { EMOJI_POOL } from "./constants";

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildDeck(pairs) {
  const chosen = shuffle(EMOJI_POOL).slice(0, pairs);
  return shuffle(
    chosen.flatMap((item, idx) => [
      { ...item, id: idx * 2, pairId: idx, flipped: false, matched: false },
      { ...item, id: idx * 2 + 1, pairId: idx, flipped: false, matched: false }
    ])
  );
}

export function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function createConfettiPieces() {
  const colors = ["#22c55e", "#06b6d4", "#f59e0b", "#f43f5e", "#a855f7", "#f8fafc"];
  return Array.from({ length: 44 }, (_, idx) => ({
    id: `${Date.now()}-${idx}`,
    left: Math.random() * 100,
    delay: Math.random() * 0.25,
    duration: 1.7 + Math.random() * 0.9,
    drift: -40 + Math.random() * 80,
    rotate: -200 + Math.random() * 400,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
}
