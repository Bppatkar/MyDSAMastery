// ============================================
// Helper Functions - Business logic helpers
// ============================================

import { DSA_PATTERNS } from './constants';

// Pattern slug se pattern object nikalo
export function getPatternBySlug(slug: string) {
  return DSA_PATTERNS.find((p) => p.slug === slug) ?? null;
}

// Pattern id se pattern nikalo
export function getPatternById(id: string) {
  return DSA_PATTERNS.find((p) => p.id === id) ?? null;
}

// Category ke saare patterns lo
export function getPatternsByCategory(category: string) {
  return DSA_PATTERNS.filter((p) => p.category === category);
}

// Streak calculate karo (consecutive days)
export function calcStreak(activities: { date: string; problemsSolved: number }[]): number {
  if (!activities.length) return 0;

  const sorted = [...activities]
    .filter((a) => a.problemsSolved > 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!sorted.length) return 0;

  let streak = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0);

  for (const activity of sorted) {
    const actDate = new Date(activity.date);
    actDate.setHours(0, 0, 0, 0);

    const diff = Math.round(
      (current.getTime() - actDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diff <= 1) {
      streak++;
      current = actDate;
    } else {
      break;
    }
  }

  return streak;
}