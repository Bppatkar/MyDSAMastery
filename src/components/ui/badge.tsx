// ============================================
// Badge Component - Small status/tag labels
// Difficulty, category, pattern type ke liye
// ============================================

import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant =
  | 'default'
  | 'easy'
  | 'medium'
  | 'hard'
  | 'secondary'
  | 'outline'
  | 'blue'
  | 'amber';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant ?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default   : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  easy      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  medium    : 'bg-amber-500/10  text-amber-400  border border-amber-500/20',
  hard      : 'bg-red-500/10    text-red-400    border border-red-500/20',
  secondary : 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  outline   : 'border border-[var(--border-strong)] text-[#6b6b8a]',
  blue      : 'bg-blue-500/10   text-blue-400   border border-blue-500/20',
  amber     : 'bg-amber-500/10  text-amber-400  border border-amber-500/20',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5',
        'rounded-full text-xs font-medium',
        'whitespace-nowrap',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}