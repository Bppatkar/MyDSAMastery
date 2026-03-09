// ============================================
// PatternProgress - Circular progress ring
// Dashboard aur pattern pages pe dikhega
// ============================================

'use client';

import { cn } from '@/lib/utils';

interface PatternProgressProps {
  completed  : number;
  total      : number;
  color     ?: string;
  size      ?: 'sm' | 'md' | 'lg';
  showLabel ?: boolean;
  className ?: string;
}

const SIZES = {
  sm : { circle: 48, stroke: 4,  font: 'text-xs'  },
  md : { circle: 64, stroke: 5,  font: 'text-sm'  },
  lg : { circle: 80, stroke: 6,  font: 'text-base' },
};

export function PatternProgress({
  completed,
  total,
  color     = '#10b981',
  size      = 'md',
  showLabel = true,
  className,
}: PatternProgressProps) {
  const cfg    = SIZES[size];
  const pct    = total > 0 ? Math.min(100, (completed / total) * 100) : 0;
  const r      = (cfg.circle - cfg.stroke * 2) / 2;
  const circum = 2 * Math.PI * r;
  const offset = circum - (pct / 100) * circum;

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <div className="relative" style={{ width: cfg.circle, height: cfg.circle }}>
        <svg
          width={cfg.circle}
          height={cfg.circle}
          className="-rotate-90"
          viewBox={`0 0 ${cfg.circle} ${cfg.circle}`}
        >
          {/* Track */}
          <circle
            cx={cfg.circle / 2}
            cy={cfg.circle / 2}
            r={r}
            fill="none"
            stroke="#1c1c2e"
            strokeWidth={cfg.stroke}
          />
          {/* Progress */}
          <circle
            cx={cfg.circle / 2}
            cy={cfg.circle / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={cfg.stroke}
            strokeLinecap="round"
            strokeDasharray={circum}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.7s ease' }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('font-bold', cfg.font)} style={{ color }}>
            {Math.round(pct)}%
          </span>
        </div>
      </div>
      {showLabel && (
        <span className="text-xs text-[#6b6b8a]">
          {completed}/{total}
        </span>
      )}
    </div>
  );
}