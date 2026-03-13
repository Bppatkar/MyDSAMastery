// ============================================
// PatternCard - Individual pattern ka card
// Fixed TypeScript types + Better UI
// ============================================

'use client';

import Link from 'next/link';
import { CheckCircle2, ChevronRight, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import type { PatternData } from '@/lib/patternData';
import type { PatternProgress } from '@/types/pattern';

interface PatternCardProps {
  pattern  : PatternData & { progress?: PatternProgress; totalQuestions?: number };
  size    ?: 'sm' | 'md' | 'lg';
  showLink ?: boolean;
}

// Difficulty badge colors
const DIFF_STYLES: Record<string, { text: string; bg: string; border: string }> = {
  Beginner     : { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  Intermediate : { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'   },
  Advanced     : { text: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20'     },
};

export function PatternCard({ pattern, size = 'md', showLink = true }: PatternCardProps) {
  const prog   = pattern.progress;
  const solved = prog?.completed ?? 0;
  const total  = pattern.questions?.length ?? pattern.totalQuestions ?? 30;
  const pct    = Math.round((solved / total) * 100);
  const done   = solved >= total;
  const started = solved > 0;

  const diff   = DIFF_STYLES[pattern.difficulty] ?? DIFF_STYLES.Intermediate;

  const cardContent = (
    <div
      className={cn(
        'group relative bg-[var(--bg-elevated)] border rounded-2xl h-full',
        'transition-all duration-300 overflow-hidden',
        showLink && 'hover:-translate-y-1 hover:shadow-xl cursor-pointer',
        done
          ? 'border-emerald-500/40 hover:border-emerald-500/60 hover:shadow-emerald-500/10'
          : 'border-[var(--border)] hover:border-[var(--border-strong)] hover:shadow-lg',
        size === 'sm' && 'p-4',
        size === 'md' && 'p-5',
        size === 'lg' && 'p-6',
      )}
    >
      {/* Top color accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, ${pattern.color}, transparent)` }}
      />

      {/* Completion badge */}
      {done && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span className="text-xs text-emerald-400 font-medium">Done</span>
        </div>
      )}

      {/* ── Icon + Meta ── */}
      <div className="flex items-start gap-3 mb-4">
        {/* Colored icon box */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-lg"
          style={{
            background : `linear-gradient(135deg, ${pattern.color}22, ${pattern.color}10)`,
            border     : `1px solid ${pattern.color}30`,
            boxShadow  : `0 4px 12px ${pattern.color}15`,
          }}
        >
          {pattern.icon}
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          {/* Name row */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className={cn(
              'font-bold text-[var(--tx-1)] group-hover:text-[var(--tx-1)] transition-colors truncate',
              size === 'sm' ? 'text-sm' : 'text-[15px]',
            )}>
              {pattern.name}
            </h3>
            {/* Order badge */}
            <span
              className="text-[11px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
              style={{ color: pattern.color, backgroundColor: `${pattern.color}18` }}
            >
              #{pattern.order}
            </span>
          </div>

          {/* Category + difficulty row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[var(--tx-3)] truncate">{pattern.category}</span>
            <span className="text-[#2a2a3e]">·</span>
            <span className={cn(
              'text-[11px] font-medium px-2 py-0.5 rounded-full border',
              diff.text, diff.bg, diff.border
            )}>
              {pattern.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* ── Description ── */}
      {size !== 'sm' && (
        <p className="text-xs text-[var(--tx-3)] leading-relaxed mb-4 line-clamp-2">
          {pattern.description}
        </p>
      )}

      {/* ── Trigger keywords (lg only) ── */}
      {size === 'lg' && pattern.triggers && pattern.triggers.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pattern.triggers.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--border)] text-[var(--tx-3)] border border-[var(--border-strong)]"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* ── Progress section ── */}
      <div className="space-y-2 mt-auto">
        {/* Progress labels */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {started && !done && (
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            )}
            <span
              className="text-xs font-semibold"
              style={{ color: started ? pattern.color : 'var(--tx-3)' }}
            >
              {solved}/{total}
              <span className="font-normal text-[var(--tx-3)]"> solved</span>
            </span>
          </div>
          <span className={cn(
            'text-xs font-bold tabular-nums',
            pct === 100 ? 'text-emerald-400' : pct > 0 ? 'text-[#8888a8]' : 'text-[var(--tx-4)]'
          )}>
            {pct}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width      : `${pct}%`,
              background : pct === 100
                ? 'linear-gradient(90deg, #10b981, #34d399)'
                : `linear-gradient(90deg, ${pattern.color}, ${pattern.color}bb)`,
              boxShadow  : pct > 0 ? `0 0 8px ${pattern.color}60` : 'none',
            }}
          />
        </div>
      </div>

      {/* ── Footer ── */}
      {size !== 'sm' && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--border)]">
          {/* Complexity badge */}
          <div className="flex items-center gap-3">
            {pattern.timeComplexity && (
              <span className="text-[11px] text-[var(--tx-3)]">
                <span className="text-[var(--tx-4)]">T:</span>{' '}
                <code className="text-[#6b6b8a]">{pattern.timeComplexity}</code>
              </span>
            )}
          </div>

          {showLink && (
            <div className="flex items-center gap-1 text-xs text-[var(--tx-4)] group-hover:text-emerald-400 transition-colors">
              <span className="hidden sm:inline">Start</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (!showLink) return cardContent;

  return (
    <Link href={`/patterns/${pattern.slug}`} className="block h-full">
      {cardContent}
    </Link>
  );
}