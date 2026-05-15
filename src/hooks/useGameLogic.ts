import { useState, useEffect, useRef, useCallback } from 'react';
import { Difficulty, GameStatus, TargetItem, DIFFICULTY_CONFIGS } from '../types';
import { getHighScores, saveHighScore } from '../utils/storage';

function randomId() {
  return Math.random().toString(36).slice(2, 9);
}

function spawnTarget(size: number): TargetItem {
  const padding = 8; // percent
  const x = padding + Math.random() * (100 - 2 * padding);
  const y = padding + Math.random() * (100 - 2 * padding);
  return { id: randomId(), x, y, size, createdAt: Date.now() };
}

export function useGameLogic(difficulty: Difficulty) {
  const config = DIFFICULTY_CONFIGS[difficulty];

  const [status, setStatus] = useState<GameStatus>('idle');
  const [targets, setTargets] = useState<TargetItem[]>([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.gameDuration);
  const [countdown, setCountdown] = useState(3);
  const [highScores, setHighScores] = useState(getHighScores());

  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const expireRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAllIntervals = useCallback(() => {
    [spawnRef, timerRef, countdownRef, expireRef].forEach(r => {
      if (r.current) clearInterval(r.current);
      r.current = null;
    });
  }, []);

  // Sync config when difficulty changes while idle
  useEffect(() => {
    if (status === 'idle' || status === 'finished') {
      setTimeLeft(DIFFICULTY_CONFIGS[difficulty].gameDuration);
    }
  }, [difficulty, status]);

  const startGame = useCallback(() => {
    clearAllIntervals();
    setTargets([]);
    setScore(0);
    setMissed(0);
    setTimeLeft(DIFFICULTY_CONFIGS[difficulty].gameDuration);
    setCountdown(3);
    setStatus('countdown');
  }, [difficulty, clearAllIntervals]);

  // Countdown phase
  useEffect(() => {
    if (status !== 'countdown') return;
    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!);
          setStatus('playing');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [status]);

  // Playing phase
  useEffect(() => {
    if (status !== 'playing') return;
    const cfg = DIFFICULTY_CONFIGS[difficulty];

    // Main game timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setStatus('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Target spawner
    spawnRef.current = setInterval(() => {
      setTargets(prev => {
        if (prev.length >= cfg.maxTargets) return prev;
        return [...prev, spawnTarget(cfg.targetSize)];
      });
    }, cfg.spawnInterval);

    // Target expiry checker
    expireRef.current = setInterval(() => {
      const now = Date.now();
      setTargets(prev => {
        const expired = prev.filter(t => now - t.createdAt >= cfg.targetLifetime);
        if (expired.length > 0) {
          setMissed(m => m + expired.length);
          if (cfg.missedPenalty > 0) {
            setScore(s => Math.max(0, s - expired.length * cfg.missedPenalty));
          }
        }
        return prev.filter(t => now - t.createdAt < cfg.targetLifetime);
      });
    }, 100);

    return () => clearAllIntervals();
  }, [status, difficulty, clearAllIntervals]);

  // Game finished
  useEffect(() => {
    if (status !== 'finished') return;
    clearAllIntervals();
    setTargets([]);
    setScore(finalScore => {
      saveHighScore(difficulty, finalScore);
      setHighScores(getHighScores());
      return finalScore;
    });
  }, [status, difficulty, clearAllIntervals]);

  const hitTarget = useCallback((id: string) => {
    setTargets(prev => prev.filter(t => t.id !== id));
    setScore(s => s + DIFFICULTY_CONFIGS[difficulty].pointsPerHit);
  }, [difficulty]);

  return {
    status,
    targets,
    score,
    missed,
    timeLeft,
    countdown,
    highScores,
    startGame,
    hitTarget,
    config: DIFFICULTY_CONFIGS[difficulty],
  };
}