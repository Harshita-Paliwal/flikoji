export function WinModal({ gameOver, theme, seconds, moves, formatTime, onPlayAgain }) {
  if (!gameOver) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: theme.overlay,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
        backdropFilter: "blur(4px)"
      }}
    >
      <div className="win-pop" style={{ background: theme.modal }}>
        <h2 className="win-title">{"\uD83C\uDF89"} You Won!</h2>
        <p className="win-sub">Time {formatTime(seconds)} | Moves {moves}</p>
        <button className="game-btn action-btn" onClick={onPlayAgain} style={{ background: theme.newGame }}>
          Play Again
        </button>
      </div>
    </div>
  );
}
