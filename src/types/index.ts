export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameStatus = 'idle' | 'countdown' | 'playing' | 'finished';

export interface TargetItem {
  id: string;
  x: number; // percent
  y: number; // percent
  size: number; // px
  createdAt: number;
}

export interface DifficultyConfig {
  label: string;
  gameDuration: number;      // seconds
  targetLifetime: number;    // ms before target disappears
  spawnInterval: number;     // ms between spawns
  maxTargets: number;
  targetSize: number;        // px
  pointsPerHit: number;
  missedPenalty: number;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    label: 'Easy',
    gameDuration: 30,
    targetLifetime: 2500,
    spawnInterval: 1000,
    maxTargets: 3,
    targetSize: 72,
    pointsPerHit: 10,
    missedPenalty: 0,
  },
  medium: {
    label: 'Medium',
    gameDuration: 30,
    targetLifetime: 1600,
    spawnInterval: 700,
    maxTargets: 4,
    targetSize: 56,
    pointsPerHit: 20,
    missedPenalty: 5,
  },
  hard: {
    label: 'Hard',
    gameDuration: 30,
    targetLifetime: 900,
    spawnInterval: 450,
    maxTargets: 5,
    targetSize: 40,
    pointsPerHit: 40,
    missedPenalty: 10,
  },
};