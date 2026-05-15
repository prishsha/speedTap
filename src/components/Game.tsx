import { useEffect, useState } from "react";
import ScoreBoard from "./ScoreBoard";
import Target from "./Target";

function Game() {
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [position, setPosition] = useState({
    top: "50%",
    left: "50%",
  });

  const [highScore, setHighScore] = useState<number>(() => {
    return Number(localStorage.getItem("highScore")) || 0;
  });

  const moveTarget = () => {
    const top = Math.random() * 80;
    const left = Math.random() * 80;

    setPosition({
      top: `${top}%`,
      left: `${left}%`,
    });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    moveTarget();
  };

  const handleClick = () => {
    if (!isPlaying) return;

    setScore((prev) => prev + 1);
    moveTarget();
  };

  useEffect(() => {
    let timer: number;

    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsPlaying(false);

      if (score > highScore) {
        localStorage.setItem("highScore", String(score));
        setHighScore(score);
      }
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  return (
    <div className="game-wrapper">
      <ScoreBoard
        score={score}
        highScore={highScore}
        timeLeft={timeLeft}
      />

      {!isPlaying ? (
        <button className="start-btn" onClick={startGame}>
          {timeLeft === 0 ? "Play Again" : "Start Game"}
        </button>
      ) : (
        <div className="game-area">
          <Target
            top={position.top}
            left={position.left}
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
}

export default Game;