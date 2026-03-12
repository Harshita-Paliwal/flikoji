import { useEffect, useRef, useState } from "react";
import { ActionButtons } from "./components/ActionButtons";
import { BackgroundLayer } from "./components/BackgroundLayer";
import { BoardGrid } from "./components/BoardGrid";
import { ConfettiLayer } from "./components/ConfettiLayer";
import { HeaderSection } from "./components/HeaderSection";
import { StatsSection } from "./components/StatsSection";
import { ToggleRow } from "./components/ToggleRow";
import { WinModal } from "./components/WinModal";
import { BEST_KEY, DIFFICULTIES, MUTE_KEY, THEMES } from "./constants";
import { useFlikojiAudio } from "./hooks/useFlikojiAudio";
import "./flikoji.css";
import { buildDeck, createConfettiPieces, formatTime, loadJson } from "./utils";

export default function FlikojiGame() {
  const [difficulty, setDifficulty] = useState("Easy");
  const [deck, setDeck] = useState(() => buildDeck(6));
  const [firstCard, setFirstCard] = useState(null);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const [locked, setLocked] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [peekActive, setPeekActive] = useState(false);
  const [peekCount, setPeekCount] = useState(3);
  const [isDark, setIsDark] = useState(true);
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem(MUTE_KEY) === "1");
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [shakeIds, setShakeIds] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [bestScores, setBestScores] = useState(() => loadJson(BEST_KEY, {}));

  const confettiTimeoutRef = useRef(null);
  const shakeTimeoutRef = useRef(null);

  const { playSound } = useFlikojiAudio(isMuted);

  const cfg = DIFFICULTIES[difficulty];
  const isHard = difficulty === "Hard";
  const theme = isDark ? THEMES.dark : THEMES.light;
  const cardSize = isHard ? 58 : 78;
  const cardGap = isHard ? 7 : 10;
  const cardFontSize = isHard ? 24 : 32;
  const containerPadding = isHard ? 10 : 18;

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    localStorage.setItem(MUTE_KEY, isMuted ? "1" : "0");
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem(BEST_KEY, JSON.stringify(bestScores));
  }, [bestScores]);

  useEffect(() => {
    return () => {
      if (confettiTimeoutRef.current) clearTimeout(confettiTimeoutRef.current);
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
    };
  }, []);

  const updateBest = (diff, timeTaken, moveCount) => {
    setBestScores((prev) => {
      const existing = prev[diff];
      if (!existing) return { ...prev, [diff]: { time: timeTaken, moves: moveCount } };

      const betterTime = timeTaken < existing.time;
      const equalTimeBetterMoves = timeTaken === existing.time && moveCount < existing.moves;
      return betterTime || equalTimeBetterMoves
        ? { ...prev, [diff]: { time: timeTaken, moves: moveCount } }
        : prev;
    });
  };

  const triggerConfetti = () => {
    setConfetti(createConfettiPieces());
    if (confettiTimeoutRef.current) clearTimeout(confettiTimeoutRef.current);
    confettiTimeoutRef.current = setTimeout(() => setConfetti([]), 2800);
  };

  const initGame = (diff) => {
    const d = diff || difficulty;
    const c = DIFFICULTIES[d];
    setDifficulty(d);
    setDeck(buildDeck(c.pairs));
    setFirstCard(null);
    setMoves(0);
    setMatched(0);
    setLocked(false);
    setGameOver(false);
    setSeconds(0);
    setGameStarted(false);
    setPeekCount(3);
    setPeekActive(false);
    setShakeIds([]);
    setConfetti([]);
  };

  const handleFlip = (card) => {
    if (locked || card.flipped || card.matched || gameOver || peekActive) return;
    if (!gameStarted) setGameStarted(true);
    playSound("flip");

    const current = deck.find((c) => c.id === card.id);
    setDeck((d) => d.map((c) => (c.id === current.id ? { ...c, flipped: true } : c)));

    if (!firstCard) {
      setFirstCard(current);
      return;
    }

    const nextMoves = moves + 1;
    setMoves(nextMoves);
    setLocked(true);
    const ids = [firstCard.id, current.id];

    if (firstCard.pairId === current.pairId) {
      setTimeout(() => {
        playSound("match");
        setDeck((d) =>
          d.map((c) => (ids.includes(c.id) ? { ...c, flipped: false, matched: true } : c))
        );

        setMatched((m) => {
          const next = m + 1;
          if (next === cfg.pairs) {
            setGameOver(true);
            playSound("win");
            triggerConfetti();
            updateBest(difficulty, seconds, nextMoves);
          }
          return next;
        });

        setFirstCard(null);
        setLocked(false);
      }, 500);
    } else {
      playSound("miss");
      setShakeIds(ids);
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
      shakeTimeoutRef.current = setTimeout(() => setShakeIds([]), 360);

      setTimeout(() => {
        setDeck((d) => d.map((c) => (ids.includes(c.id) ? { ...c, flipped: false } : c)));
        setFirstCard(null);
        setLocked(false);
      }, 800);
    }
  };

  const handlePeek = () => {
    if (peekCount <= 0 || peekActive || gameOver) return;
    playSound("peek");
    setPeekActive(true);
    setPeekCount((p) => p - 1);
    setDeck((d) => d.map((c) => (c.matched ? c : { ...c, flipped: true })));
    setTimeout(() => {
      setDeck((d) => d.map((c) => (c.matched ? c : { ...c, flipped: false })));
      setPeekActive(false);
    }, 200);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPointer({ x, y });
  };

  const bestForDiff = bestScores[difficulty];

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        height: "100dvh",
        background: `
          radial-gradient(circle at ${pointer.x}% ${pointer.y}%, ${theme.glowA} 0%, transparent 38%),
          radial-gradient(circle at ${100 - pointer.x}% ${100 - pointer.y}%, ${theme.glowB} 0%, transparent 44%),
          ${theme.bg}
        `,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: `${containerPadding}px`,
        fontFamily: "Segoe UI, sans-serif",
        overflow: "hidden",
        boxSizing: "border-box",
        position: "relative",
        transition: "background .3s ease"
      }}
    >
      <BackgroundLayer theme={theme} />
      <ToggleRow isMuted={isMuted} setIsMuted={setIsMuted} isDark={isDark} setIsDark={setIsDark} />

      <div style={{ position: "relative", zIndex: 2 }}>
        <HeaderSection
          theme={theme}
          isHard={isHard}
          difficulty={difficulty}
          onDifficultyChange={initGame}
        />

        <StatsSection
          theme={theme}
          isHard={isHard}
          seconds={seconds}
          moves={moves}
          matched={matched}
          totalPairs={cfg.pairs}
          bestForDiff={bestForDiff}
          difficulty={difficulty}
          formatTime={formatTime}
        />

        <ActionButtons
          theme={theme}
          onPeek={handlePeek}
          peekCount={peekCount}
          peekActive={peekActive}
          gameOver={gameOver}
          onNewGame={() => initGame()}
        />

        <BoardGrid
          cfg={cfg}
          cardSize={cardSize}
          cardGap={cardGap}
          deck={deck}
          shakeIds={shakeIds}
          onFlip={handleFlip}
          cardFontSize={cardFontSize}
          theme={theme}
        />
      </div>

      <ConfettiLayer confetti={confetti} />
      <WinModal
        gameOver={gameOver}
        theme={theme}
        seconds={seconds}
        moves={moves}
        formatTime={formatTime}
        onPlayAgain={() => initGame()}
      />
    </div>
  );
}
