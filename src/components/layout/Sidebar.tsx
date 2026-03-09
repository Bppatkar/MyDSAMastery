// ============================================
// Sidebar - Pattern navigation + progress
// Sirf /patterns aur /practice routes pe show hoga
// ============================================

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/store/useProgressStore';
import { DSA_PATTERNS } from '@/lib/constants';

export function Sidebar() {
  const pathname = usePathname();
  const { totalSolved, getPatternProg } = useProgressStore();

  // Sidebar sirf ye routes pe dikhega
  const visible =
    pathname.startsWith('/patterns') || pathname.startsWith('/practice');

  if (!visible) return null;

  return (
    <aside className="hidden lg:flex flex-col w-60 xl:w-64 border-r border-[#2a2a3e] bg-[#0a0a0f] fixed left-0 top-16 bottom-0 overflow-y-auto z-40">
      <div className="p-4 flex flex-col gap-4">

        {/* Overall Progress Card */}
        <div className="p-4 bg-[#111118] rounded-xl border border-[#2a2a3e]">
          <div className="flex justify-between items-baseline mb-2.5">
            <span className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-wider">
              Overall
            </span>
            <span className="text-sm font-bold text-emerald-400">
              {totalSolved}
              <span className="text-[#6b6b8a] font-normal">/450</span>
            </span>
          </div>
          <Progress value={totalSolved} max={450} color="green" size="sm" />
          <p className="text-xs text-[#6b6b8a] mt-2">
            {Math.round((totalSolved / 450) * 100)}% complete
          </p>
        </div>

        {/* Pattern List */}
        <div>
          <h3 className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-wider mb-2 px-1">
            15 Patterns
          </h3>

          <nav className="space-y-0.5">
            {DSA_PATTERNS.map((pattern) => {
              const prog     = getPatternProg(pattern.id);
              const active   = pathname.includes(pattern.slug);
              const pct      = prog.percentage;

              return (
                <Link
                  key={pattern.id}
                  href={`/patterns/${pattern.slug}`}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg',
                    'transition-all duration-200 group',
                    active
                      ? 'bg-emerald-500/10 border border-emerald-500/20'
                      : 'border border-transparent hover:bg-[#111118]'
                  )}
                >
                  {/* Pattern icon */}
                  <span className="text-base flex-shrink-0 w-6 text-center">
                    {pattern.icon}
                  </span>

                  {/* Name + mini progress */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'text-xs font-medium truncate',
                          active
                            ? 'text-emerald-400'
                            : 'text-[#8888a8] group-hover:text-[#e8e8f0]'
                        )}
                      >
                        {pattern.name}
                      </span>
                      {prog.completed > 0 && (
                        <span className="text-xs text-[#6b6b8a] flex-shrink-0 ml-1">
                          {prog.completed}
                        </span>
                      )}
                    </div>

                    {/* Mini progress bar */}
                    {pct > 0 && (
                      <div className="mt-1 h-0.5 bg-[#1c1c2e] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}