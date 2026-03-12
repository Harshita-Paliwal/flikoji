export function ConfettiLayer({ confetti }) {
  if (confetti.length === 0) return null;

  return (
    <div className="confetti-wrap">
      {confetti.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            background: piece.color,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
            "--drift": `${piece.drift}px`,
            "--spin": `${piece.rotate}deg`
          }}
        />
      ))}
    </div>
  );
}
