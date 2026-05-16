import React from 'react';
import type { Difficulty } from '../types';
import { useGameLogic } from '../hooks/useGameLogic';
import Target from './Target';
import ScoreBoard from './ScoreBoard';
import DifficultySelector from './DifficultySelector';
import '../styles/Game.css';

interface Props {
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
}

const Game: React.FC<Props> = ({ difficulty, onDifficultyChange }) => {
  const {
    status,
    targets,
    score,
    missed,
    timeLeft,
    countdown,
    highScores,
    startGame,
    hitTarget,
    config,
  } = useGameLogic(difficulty);

  return (
    <div className="game">
      <DifficultySelector
        current={difficulty}
        onChange={onDifficultyChange}
        disabled={status === 'playing' || status === 'countdown'}
      />

      <ScoreBoard
        score={score}
        missed={missed}
        timeLeft={timeLeft}
        highScores={highScores}
        difficulty={difficulty}
        status={status}
        onRestart={startGame}
      />

      <div className="game__arena" aria-label="Game arena">
        {/* Overlay states */}
        {status === 'idle' && (
          <div className="game__overlay">
            <p className="game__overlay-sub">Test your reaction speed</p>
            <button className="game__start-btn" onClick={startGame}>
              Start Game
            </button>
          </div>
        )}

        {status === 'countdown' && (
          <div className="game__overlay">
            <span className="game__countdown">{countdown}</span>
          </div>
        )}

        {status === 'finished' && (
          <div className="game__overlay game__overlay--dim">
            <p className="game__overlay-sub">Game Over</p>
          </div>
        )}

        {/* Targets */}
        {status === 'playing' &&
          targets.map(t => (
            <Target
              key={t.id}
              target={t}
              lifetime={config.targetLifetime}
              onHit={hitTarget}
            />
          ))}
      </div>
    </div>
  );
};

export default Game;