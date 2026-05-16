import React, { useEffect, useState } from 'react';
import type { TargetItem } from '../types';
import './Target.css';

interface Props {
  target: TargetItem;
  lifetime: number;
  onHit: (id: string) => void;
}

const Target: React.FC<Props> = ({ target, lifetime, onHit }) => {
  const [hit, setHit] = useState(false);

  const handleClick = () => {
    if (hit) return;
    setHit(true);
    setTimeout(() => onHit(target.id), 160);
  };

  return (
    <button
      className={`target${hit ? ' target--hit' : ''}`}
      style={{
        left: `${target.x}%`,
        top: `${target.y}%`,
        width: target.size,
        height: target.size,
        '--lifetime': `${lifetime}ms`,
      } as React.CSSProperties}
      onClick={handleClick}
      aria-label="Hit target"
    />
  );
};

export default Target;