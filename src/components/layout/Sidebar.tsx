'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useProgressStore } from '@/store/useProgressStore';
import { DSA_PATTERNS } from '@/lib/constants';

export function Sidebar() {
  const pathname = usePathname();
  const { totalSolved, getPatternProg } = useProgressStore();

  // Only show on patterns + practice routes
  const show = pathname.startsWith('/patterns') || pathname.startsWith('/practice');
  if (!show) return null;

  const overallPct = Math.round((totalSolved / 450) * 100);

  return (
    <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto border-r border-[#1e1e2e] bg-[#080810]">

      {/* ── Overall Progress ── */}
      <div className="p-4 border-b border-[#1e1e2e]">
        <div className="p-4 rounded-xl bg-[#0f0f18] border border-[#1e1e2e]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5a5a7a] uppercase tracking-wider">
              Overall Progress
            </span>
            <span className="text-sm font-bold text-emerald-400">
              {overallPct}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-[#1a1a28] rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
              style={{ width: `${overallPct}%` }}
            />
          </div>

          <p className="text-xs text-[#5a5a7a]">
            <span className="text-emerald-400 font-semibold">{totalSolved}</span>
            {' '}/ 450 problems solved
          </p>
        </div>
      </div>

      {/* ── Pattern List ── */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xs font-semibold text-[#5a5a7a] uppercase tracking-wider mb-3">
          15 Patterns
        </h3>

        <nav className="space-y-1">
          {DSA_PATTERNS.map((pattern) => {
            const prog   = getPatternProg(pattern.id);
            const active = pathname.includes(pattern.slug);
            const pct    = prog.percentage ?? 0;
            const done   = prog.completed >= 30;

            return (
              <Link
                key={pattern.id}
                href={`/patterns/${pattern.slug}`}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                  active
                    ? 'bg-emerald-500/12 border border-emerald-500/20 text-emerald-400'
                    : 'border border-transparent text-[#7a7a9a] hover:bg-[#0f0f18] hover:text-[#e8e8f0] hover:border-[#1e1e2e]'
                )}
              >
                {/* Pattern icon */}
                <span className="text-base w-6 text-center flex-shrink-0 leading-none">
                  {pattern.icon}
                </span>

                {/* Name + mini progress */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-medium truncate">
                      {pattern.name}
                    </span>
                    {done ? (
                      <span className="text-[10px] text-emerald-400 flex-shrink-0">✓</span>
                    ) : prog.completed > 0 ? (
                      <span className="text-[10px] text-[#5a5a7a] flex-shrink-0 tabular-nums">
                        {prog.completed}/30
                      </span>
                    ) : null}
                  </div>

                  {/* Mini bar — only if started */}
                  {pct > 0 && (
                    <div className="h-1 bg-[#1a1a28] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width      : `${pct}%`,
                          background : done ? '#10b981' : pattern.color,
                        }}
                      />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}