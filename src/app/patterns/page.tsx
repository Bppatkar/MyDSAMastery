import type { Metadata } from 'next';
import { Layers, Zap } from 'lucide-react';
import { PatternList } from '@/components/patterns/PatternList';
import { TOTAL_PATTERNS, TOTAL_QUESTIONS } from '@/lib/constants';

export const metadata: Metadata = {
  title       : 'DSA Patterns',
  description : '15 core DSA patterns with 450 LeetCode problems',
};

export default function PatternsPage() {
  return (
    <div className="min-h-screen">

      {/* ── Header ── */}
      <div className="border-b border-[#1e1e2e] bg-[#0c0c15]">
        <div className="px-6 py-8 max-w-5xl">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Title */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-emerald-400" />
                </div>
                <h1 className="text-2xl font-bold text-white">DSA Patterns</h1>
              </div>
              <p className="text-[#7a7a9a] text-sm max-w-lg">
                Master {TOTAL_PATTERNS} patterns that solve 90% of FAANG interview questions.
                {' '}{TOTAL_QUESTIONS} problems — easy to hard.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-5 flex-shrink-0">
              <Stat value={String(TOTAL_PATTERNS)} label="Patterns"  color="text-emerald-400" />
              <div className="w-px h-8 bg-[#1e1e2e]" />
              <Stat value={String(TOTAL_QUESTIONS)} label="Problems"  color="text-blue-400"    />
              <div className="w-px h-8 bg-[#1e1e2e]" />
              <Stat value="30"                      label="Per Pattern" color="text-purple-400" />
            </div>
          </div>

          {/* Tip */}
          <div className="flex items-center gap-2 mt-5 px-4 py-2.5 rounded-xl bg-emerald-500/6 border border-emerald-500/12 w-fit">
            <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <p className="text-sm text-[#7a7a9a]">
              <span className="text-emerald-400 font-medium">Tip:</span>{' '}
              Start with Sliding Window (#1) and follow the order for best results.
            </p>
          </div>
        </div>
      </div>

      {/* ── Pattern Grid ── */}
      <div className="px-6 py-8 max-w-5xl">
        <PatternList />
      </div>
    </div>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-2xl font-black ${color}`}>{value}</div>
      <div className="text-xs text-[#5a5a7a]">{label}</div>
    </div>
  );
}