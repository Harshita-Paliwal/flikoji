export function StatsSection({
  theme,
  isHard,
  seconds,
  moves,
  matched,
  totalPairs,
  bestForDiff,
  difficulty,
  formatTime
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "16px",
          color: theme.stat,
          marginBottom: "10px",
          fontSize: isHard ? "27px" : "31px",
          fontWeight: 700,
          justifyContent: "center"
        }}
      >
        <div>{"\u23F1"} {formatTime(seconds)}</div>
        <div>{"\uD83C\uDFAF"} {moves}</div>
        <div>{"\u2705"} {matched}/{totalPairs}</div>
      </div>

      <div
        style={{
          color: theme.stat,
          textAlign: "center",
          marginBottom: "12px",
          fontSize: "16px",
          fontWeight: 600
        }}
      >
        Best ({difficulty}):{" "}
        {bestForDiff
          ? `${formatTime(bestForDiff.time)} | ${bestForDiff.moves} moves`
          : "--:-- | -- moves"}
      </div>
    </>
  );
}
