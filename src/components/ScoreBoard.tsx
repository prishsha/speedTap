import React from 'react';
import { Difficulty, DIFFICULTY_CONFIGS } from '../types';
import '../styles/ScoreBoard.css';

interface Props {
  score: number;
  missed: number;
  timeLeft: number;
  highScores: Record<Difficulty, number>;
  difficulty: Difficulty;
  status: string;
  onRestart: () => void;
}

const ScoreBoard: React.FC<Props> = ({
  score,
  missed,
  timeLeft,
  highScores,
  difficulty,
  status,
  onRestart,
}) => {
  const isNewHigh = status === 'finished' && score > 0 && score >= highScores[difficulty];

  return (
    <div className="scoreboard">
      <div className="scoreboard__stats">
        <div className="scoreboard__stat">
          <span className="scoreboard__stat-value">{score}</span>
          <span className="scoreboard__stat-label">Score</span>
        </div>
        <div className="scoreboard__stat scoreboard__stat--timer">
          <span className={`scoreboard__stat-value${timeLeft <= 5 && status === 'playing' ? ' scoreboard__stat-value--urgent' : ''}`}>
            {timeLeft}s
          </span>
          <span className="scoreboard__stat-label">Time</span>
        </div>
        <div className="scoreboard__stat">
          <span className="scoreboard__stat-value scoreboard__stat-value--missed">{missed}</span>
          <span className="scoreboard__stat-label">Missed</span>
        </div>
      </div>

      <div className="scoreboard__high">
        <span className="scoreboard__high-label">Best on {DIFFICULTY_CONFIGS[difficulty].label}</span>
        <span className="scoreboard__high-value">🏆 {highScores[difficulty]}</span>
      </div>

      {status === 'finished' && (
        <div className="scoreboard__result">
          {isNewHigh && <p className="scoreboard__new-high">🎉 New High Score!</p>}
          <p className="scoreboard__final">Final Score: <strong>{score}</strong></p>
          <p className="scoreboard__final">Targets Missed: <strong>{missed}</strong></p>
          <button className="scoreboard__restart-btn" onClick={onRestart}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;