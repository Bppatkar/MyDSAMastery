import { DSA_PATTERNS } from '@/lib/constants';
import { useProgressStore } from '@/store/useProgressStore';

export function usePatterns() {
  const { getPatternProg } = useProgressStore();
  const patterns = DSA_PATTERNS.map((p) => ({
    ...p,
    progress: getPatternProg(p.id),
  }));
  return { patterns, total: DSA_PATTERNS.length };
}