type Props = {
  score: number;
  highScore: number;
  timeLeft: number;
};

function ScoreBoard({ score, highScore, timeLeft }: Props) {
  return (
    <div className="scoreboard">
      <div className="card">Score: {score}</div>
      <div className="card">High Score: {highScore}</div>
      <div className="card">Time: {timeLeft}s</div>
    </div>
  );
}

export default ScoreBoard;