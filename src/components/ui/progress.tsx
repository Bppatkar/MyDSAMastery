// ============================================
// Progress Bar Component
// Pattern completion, overall progress ke liye
// ============================================

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value   : number;   // 0 to max
  max    ?: number;   // default 100
  color  ?: 'green' | 'purple' | 'blue' | 'amber' | 'red';
  size   ?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel ?: boolean;
}

const colorMap = {
  green  : 'bg-emerald-500',
  purple : 'bg-purple-500',
  blue   : 'bg-blue-500',
  amber  : 'bg-amber-500',
  red    : 'bg-red-500',
};

const sizeMap = {
  xs : 'h-1',
  sm : 'h-1.5',
  md : 'h-2',
  lg : 'h-3',
};

export function Progress({
  className,
  value,
  max      = 100,
  color    = 'green',
  size     = 'md',
  showLabel = false,
  ...props
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('w-full', className)} {...props}>
      <div
        className={cn(
          'w-full bg-[#1c1c2e] rounded-full overflow-hidden',
          sizeMap[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700 ease-out',
            colorMap[color]
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-[#6b6b8a] mt-1">{Math.round(pct)}%</span>
      )}
    </div>
  );
}