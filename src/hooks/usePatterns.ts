// ============================================
// usePatterns Hook - Fully implemented
// Type-safe merge of JSON + TS pattern data
// ============================================

import { useMemo } from 'react';
import { useProgressStore } from '@/store/useProgressStore';
import { DSA_PATTERNS } from '@/lib/constants';
import { ALL_PATTERNS, type PatternData } from '@/lib/patternData';

// JSON imports (patterns 1, 2, 3)
import slidingWindowData from '@/data/patterns/sliding-window.json';
import twoPointersData   from '@/data/patterns/two-pointers.json';
import binarySearchData  from '@/data/patterns/binary-search.json';

// Merge all 15 patterns into one array
const JSON_PATTERNS = [
  slidingWindowData,
  twoPointersData,
  binarySearchData,
] as PatternData[];

const FULL_PATTERNS: PatternData[] = [...JSON_PATTERNS, ...ALL_PATTERNS];

// Exported merged list - use this anywhere
export { FULL_PATTERNS };

export function usePatterns() {
  const { getPatternProg, totalSolved } = useProgressStore();

  const patterns = useMemo(() =>
    DSA_PATTERNS.map((meta) => {
      // DSA_PATTERNS se base info lo, FULL_PATTERNS se detailed data
      const fullData = FULL_PATTERNS.find((p) => p.id === meta.id);
      const progress = getPatternProg(meta.id);

      return {
        // Base metadata (constants.ts se)
        ...meta,
        // Override with full JSON/TS data if available
        ...(fullData ?? {}),
        // Progress hamesha override karo
        progress,
      } as PatternData & {
        progress: ReturnType<typeof getPatternProg>;
        totalQuestions: number;
      };
    }),
  [getPatternProg]);

  const stats = useMemo(() => ({
    totalSolved,
    patternsStarted   : patterns.filter((p) => p.progress.completed > 0).length,
    patternsCompleted : patterns.filter((p) => p.progress.completed >= 30).length,
  }), [patterns, totalSolved]);

  return { patterns, stats, total: DSA_PATTERNS.length };
}

export function usePatternBySlug(slug: string) {
  const { getPatternProg } = useProgressStore();
  const fullData = FULL_PATTERNS.find((p) => p.slug === slug) ?? null;
  if (!fullData) return null;
  return {
    ...fullData,
    progress: getPatternProg(slug),
  };
}