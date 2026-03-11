// ============================================
// PatternList - Main patterns grid with filters
// Fixed types + improved UI
// ============================================

'use client';

import { useState, useMemo } from 'react';
import { Search, X, LayoutGrid, List, Trophy, Target, Flame } from 'lucide-react';
import { PatternCard } from './PatternCard';
import { usePatterns } from '@/hooks/usePatterns';
import { cn } from '@/lib/utils';

const CATEGORIES  = ['All', 'Arrays & Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Heaps & Queues', 'Bit Manipulation', 'Tries'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const STATUS_OPTS  = ['All', 'Not Started', 'In Progress', 'Completed'];

export function PatternList() {
  const { patterns, stats } = usePatterns();

  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [diff,     setDiff]     = useState('All');
  const [status,   setStatus]   = useState('All');
  const [view,     setView]     = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() =>
    patterns.filter((p) => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q) ?? false) ||
          (p.triggers?.some((t) => t.toLowerCase().includes(q)) ?? false);
        if (!match) return false;
      }
      // Category
      if (category !== 'All' && p.category !== category) return false;
      // Difficulty
      if (diff !== 'All' && p.difficulty !== diff) return false;
      // Status
      if (status !== 'All') {
        const solved = p.progress?.completed ?? 0;
        const total  = p.questions?.length ?? 30;
        if (status === 'Not Started'  && solved > 0)           return false;
        if (status === 'In Progress'  && (solved === 0 || solved >= total)) return false;
        if (status === 'Completed'    && solved < total)        return false;
      }
      return true;
    }),
  [patterns, search, category, diff, status]);

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setDiff('All');
    setStatus('All');
  };
  const hasFilters = !!(search || category !== 'All' || diff !== 'All' || status !== 'All');

  return (
    <div>
      {/* ── Overall Progress Stats ── */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatPill
          icon={<Trophy className="w-4 h-4 text-amber-400" />}
          label="Completed"
          value={stats.patternsCompleted}
          total={15}
          color="text-amber-400"
        />
        <StatPill
          icon={<Flame className="w-4 h-4 text-orange-400" />}
          label="In Progress"
          value={stats.patternsStarted}
          total={15}
          color="text-orange-400"
        />
        <StatPill
          icon={<Target className="w-4 h-4 text-emerald-400" />}
          label="Problems Solved"
          value={stats.totalSolved}
          total={450}
          color="text-emerald-400"
        />
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--tx-3)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patterns or keywords..."
            className={cn(
              'w-full pl-9 pr-4 h-10 rounded-xl text-sm',
              'bg-[var(--bg-elevated)] border border-[var(--border)]',
              'text-[var(--tx-1)] placeholder:text-[#3a3a4e]',
              'focus:outline-none focus:border-emerald-500/40 focus:bg-[var(--bg-card)]',
              'transition-all duration-200'
            )}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--tx-3)] hover:text-[var(--tx-1)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdowns row */}
        <div className="flex gap-2">
          {/* Category */}
          <FilterSelect value={category} onChange={setCategory} options={CATEGORIES} />
          {/* Difficulty */}
          <FilterSelect value={diff} onChange={setDiff} options={DIFFICULTIES} />
          {/* Status */}
          <FilterSelect value={status} onChange={setStatus} options={STATUS_OPTS} />

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 h-10 px-3 rounded-xl text-sm text-[var(--tx-3)] hover:text-red-400 border border-[var(--border)] hover:border-red-500/30 transition-all"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}

          {/* View toggle */}
          <div className="flex rounded-xl border border-[var(--border)] overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={cn(
                'px-3 h-10 transition-colors',
                view === 'grid'
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'text-[var(--tx-3)] hover:text-[var(--tx-1)] bg-[var(--bg-elevated)]'
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                'px-3 h-10 transition-colors border-l border-[var(--border)]',
                view === 'list'
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'text-[var(--tx-3)] hover:text-[var(--tx-1)] bg-[var(--bg-elevated)]'
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-[var(--tx-3)]">
          <span className="text-[var(--tx-1)] font-semibold">{filtered.length}</span>
          {' '}of 15 patterns
          {hasFilters && ' (filtered)'}
        </span>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs text-emerald-400 hover:underline">
            Show all
          </button>
        )}
      </div>

      {/* ── Grid or List ── */}
      {filtered.length > 0 ? (
        view === 'grid' ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((pattern, i) => (
              <div
                key={pattern.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
              >
                <PatternCard pattern={pattern} size="md" />
              </div>
            ))}
          </div>
        ) : (
          /* List view */
          <div className="space-y-2">
            {filtered.map((pattern, i) => (
              <div
                key={pattern.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}
              >
                <PatternCard pattern={pattern} size="sm" />
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-20 border border-dashed border-[var(--border)] rounded-2xl">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-[var(--tx-3)] mb-3">No patterns match your filters.</p>
          <button
            onClick={clearFilters}
            className="text-emerald-400 hover:underline text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

// ── Helper: Filter Dropdown ──
function FilterSelect({
  value, onChange, options,
}: {
  value    : string;
  onChange : (v: string) => void;
  options  : string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'h-10 px-3 rounded-xl text-sm cursor-pointer',
        'bg-[var(--bg-elevated)] border border-[var(--border)]',
        'text-[#8888a8] focus:outline-none',
        'focus:border-emerald-500/40 transition-colors',
        value !== 'All' && 'border-emerald-500/30 text-emerald-400'
      )}
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-[var(--bg-elevated)] text-[var(--tx-1)]">
          {o}
        </option>
      ))}
    </select>
  );
}

// ── Helper: Stat Pill ──
function StatPill({
  icon, label, value, total, color,
}: {
  icon  : React.ReactNode;
  label : string;
  value : number;
  total : number;
  color : string;
}) {
  const pct = Math.round((value / total) * 100);
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
      <div className="flex-shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1">
          <span className={cn('text-lg font-black tabular-nums', color)}>{value}</span>
          <span className="text-xs text-[#3a3a4e]">/{total}</span>
        </div>
        <div className="text-[11px] text-[var(--tx-3)] truncate">{label}</div>
      </div>
    </div>
  );
}