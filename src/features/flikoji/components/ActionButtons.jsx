export function ActionButtons({
  theme,
  onPeek,
  peekCount,
  peekActive,
  gameOver,
  onNewGame
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        marginBottom: "14px",
        flexWrap: "wrap",
        justifyContent: "center"
      }}
    >
      <button
        className="game-btn action-btn"
        onClick={onPeek}
        disabled={peekCount <= 0 || peekActive || gameOver}
        style={{ background: theme.action }}
      >
        {"\uD83D\uDC41"} PEEK ({peekCount})
      </button>
      <button className="game-btn action-btn" onClick={onNewGame} style={{ background: theme.newGame }}>
        New Game
      </button>
    </div>
  );
}
