import { DIFFICULTIES } from "../constants";

export function HeaderSection({ theme, isHard, difficulty, onDifficultyChange }) {
  return (
    <>
      <h1
        style={{
          color: theme.title,
          fontSize: isHard ? "44px" : "54px",
          margin: "0 0 10px",
          textAlign: "center"
        }}
      >
        {"\uD83C\uDF8F"} Flikoji
      </h1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "10px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {Object.keys(DIFFICULTIES).map((d) => (
          <button
            className={`game-btn diff-btn ${difficulty === d ? "active" : ""}`}
            key={d}
            onClick={() => onDifficultyChange(d)}
            style={{ background: difficulty === d ? theme.diffActive : theme.diff }}
          >
            {d}
          </button>
        ))}
      </div>
    </>
  );
}
