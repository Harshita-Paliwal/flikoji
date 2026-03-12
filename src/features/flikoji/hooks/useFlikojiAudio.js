import { useCallback, useEffect, useRef } from "react";

export function useFlikojiAudio(isMuted) {
  const audioCtxRef = useRef(null);

  const ensureAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      audioCtxRef.current = new Ctx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const tone = useCallback(
    (freq, duration, type = "sine", gain = 0.06, delay = 0) => {
      if (isMuted) return;
      const ctx = ensureAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const startAt = ctx.currentTime + delay;
      const endAt = startAt + duration;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startAt);
      g.gain.setValueAtTime(0.0001, startAt);
      g.gain.exponentialRampToValueAtTime(gain, startAt + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, endAt);

      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(startAt);
      osc.stop(endAt);
    },
    [ensureAudioContext, isMuted]
  );

  const playSound = useCallback(
    (kind) => {
      if (kind === "flip") {
        tone(420, 0.05, "triangle", 0.035);
        return;
      }
      if (kind === "match") {
        tone(520, 0.06, "triangle", 0.045);
        tone(780, 0.08, "sine", 0.04, 0.06);
        return;
      }
      if (kind === "miss") {
        tone(210, 0.09, "square", 0.04);
        tone(170, 0.11, "square", 0.03, 0.05);
        return;
      }
      if (kind === "peek") {
        tone(660, 0.05, "sine", 0.03);
        return;
      }
      if (kind === "win") {
        tone(520, 0.08, "triangle", 0.05);
        tone(660, 0.09, "triangle", 0.045, 0.08);
        tone(840, 0.12, "sine", 0.04, 0.17);
      }
    },
    [tone]
  );

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return { playSound };
}
