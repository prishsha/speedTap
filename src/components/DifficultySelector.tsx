import React from 'react';
import { Difficulty, DIFFICULTY_CONFIGS } from '../types';
import '../styles/DifficultySelector.css';

interface Props {
  current: Difficulty;
  onChange: (d: Difficulty) => void;
  disabled: boolean;
}

const DifficultySelector: React.FC<Props> = ({ current, onChange, disabled }) => (
  <div className="difficulty">
    <span className="difficulty__label">Difficulty</span>
    <div className="difficulty__buttons">
      {(Object.keys(DIFFICULTY_CONFIGS) as Difficulty[]).map(d => (
        <button
          key={d}
          className={`difficulty__btn difficulty__btn--${d}${current === d ? ' difficulty__btn--active' : ''}`}
          onClick={() => onChange(d)}
          disabled={disabled}
        >
          {DIFFICULTY_CONFIGS[d].label}
        </button>
      ))}
    </div>
  </div>
);

export default DifficultySelector;