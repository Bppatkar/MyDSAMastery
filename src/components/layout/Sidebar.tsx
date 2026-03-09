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

  // Sidebar sirf inhi routes pe dikhega
  const visible =
    pathname.startsWith('/patterns') ||
    pathname.startsWith('/practice');

  if (!visible) return null;

  return (
    <aside
      className={cn(
        // Sticky — navbar ke neeche chipka rehta hai, scroll ke saath
        'hidden lg:flex flex-col',
        'w-56 xl:w-64 flex-shrink-0',           // fixed width
        'sticky top-16',                          // below navbar
        'h-[calc(100vh-4rem)]',                  // full remaining height
        'overflow-y-auto',
        'border-r border-[#1e1e2e] bg-[#080810]',
      )}
    >
      <div className="p-4 flex flex-col gap-4">

        {/* ── Overall Progress ── */}
        <div className="p-4 bg-[#0f0f18] rounded-xl border border-[#1e1e2e]">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-xs font-semibold text-[#5a5a7a] uppercase tracking-wider">
              Overall
            </span>
            <span className="text-sm font-bold text-emerald-400">
              {totalSolved}
              <span className="text-[#5a5a7a] font-normal">/450</span>
            </span>
          </div>
          <Progress value={totalSolved} max={450} color="green" size="sm" />
          <p className="text-xs text-[#5a5a7a] mt-2">
            {Math.round((totalSolved / 450) * 100)}% complete
          </p>
        </div>

        {/* ── Pattern List ── */}
        <div>
          <h3 className="text-xs font-semibold text-[#5a5a7a] uppercase tracking-wider mb-2 px-1">
            15 Patterns
          </h3>

          <nav className="space-y-0.5">
            {DSA_PATTERNS.map((pattern) => {
              const prog   = getPatternProg(pattern.id);
              const active = pathname.includes(pattern.slug);
              const pct    = prog.percentage;

              return (
                <Link
                  key={pattern.id}
                  href={`/patterns/${pattern.slug}`}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg',
                    'transition-all duration-200 group',
                    active
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'border border-transparent text-[#7a7a9a] hover:bg-[#0f0f18] hover:text-[#e8e8f0]'
                  )}
                >
                  {/* Icon */}
                  <span className="text-base flex-shrink-0 w-5 text-center leading-none">
                    {pattern.icon}
                  </span>

                  {/* Name + mini bar */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-medium truncate">
                        {pattern.name}
                      </span>
                      {prog.completed > 0 && (
                        <span className="text-[10px] text-[#5a5a7a] flex-shrink-0">
                          {prog.completed}
                        </span>
                      )}
                    </div>

                    {/* Mini progress bar */}
                    {pct > 0 && (
                      <div className="mt-1 h-0.5 bg-[#1e1e2e] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width      : `${pct}%`,
                            background : pattern.color,
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
      </div>
    </aside>
  );
}