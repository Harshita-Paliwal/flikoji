export function ToggleRow({ isMuted, setIsMuted, isDark, setIsDark }) {
  return (
    <div className="toggle-row">
      <button
        className="game-btn mute-btn"
        onClick={() => setIsMuted((v) => !v)}
        style={{
          background: isMuted
            ? "linear-gradient(135deg,#7f1d1d,#b91c1c)"
            : "linear-gradient(135deg,#059669,#0d9488)"
        }}
      >
        {isMuted ? "\uD83D\uDD07 Muted" : "\uD83D\uDD0A Sound"}
      </button>

      <button
        className="game-btn toggle-btn"
        onClick={() => setIsDark((v) => !v)}
        style={{
          background: isDark
            ? "linear-gradient(135deg,#0f766e,#0ea5a6)"
            : "linear-gradient(135deg,#4b5563,#1f2937)"
        }}
      >
        {isDark ? "\u2600 Light Mode" : "\uD83C\uDF19 Dark Mode"}
      </button>
    </div>
  );
}
