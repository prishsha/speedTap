import { Difficulty } from '../types';

const KEY = 'speedtap_highscores';

type HighScores = Record<Difficulty, number>;

const defaultScores: HighScores = { easy: 0, medium: 0, hard: 0 };

export function getHighScores(): HighScores {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultScores };
    return { ...defaultScores, ...JSON.parse(raw) };
  } catch {
    return { ...defaultScores };
  }
}

export function saveHighScore(difficulty: Difficulty, score: number): void {
  const scores = getHighScores();
  if (score > scores[difficulty]) {
    scores[difficulty] = score;
    localStorage.setItem(KEY, JSON.stringify(scores));
  }
}