export function BoardGrid({
  cfg,
  cardSize,
  cardGap,
  deck,
  shakeIds,
  onFlip,
  cardFontSize,
  theme
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cfg.cols},${cardSize}px)`,
        gap: `${cardGap}px`
      }}
    >
      {deck.map((card) => (
        <div
          key={card.id}
          className={`card-cell ${shakeIds.includes(card.id) ? "shake" : ""}`}
          onClick={() => !card.matched && onFlip(card)}
          style={{
            width: `${cardSize}px`,
            height: `${cardSize}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            fontSize: `${cardFontSize}px`,
            cursor: card.matched ? "default" : "pointer",
            "--flip-rot": card.flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transform: "var(--flip-rot)",
            transition: "transform .35s ease, background-color .25s ease",
            color: "#fff",
            backgroundColor: card.matched ? "transparent" : theme.card,
            boxShadow: card.matched ? "none" : theme.cardGlow
          }}
        >
          {card.matched ? "" : card.flipped ? card.emoji : "\u2753"}
        </div>
      ))}

      {Array.from({ length: Math.max(0, cfg.rows * cfg.cols - deck.length) }).map((_, idx) => (
        <div
          key={`empty-${idx}`}
          style={{
            width: `${cardSize}px`,
            height: `${cardSize}px`,
            background: "transparent",
            borderRadius: "10px"
          }}
        />
      ))}
    </div>
  );
}
