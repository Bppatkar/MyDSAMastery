// ============================================
// Pattern Types - DSA patterns ki type defs
// Puri app me yahi types use honge
// ============================================

export type PatternCategory =
  | 'Arrays & Strings'
  | 'Linked Lists'
  | 'Trees'
  | 'Graphs'
  | 'Dynamic Programming'
  | 'Heaps & Queues'
  | 'Binary Search'
  | 'Tries'
  | 'Bit Manipulation';

export type PatternDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Pattern {
  id: string;
  name: string;
  slug: string;
  category: PatternCategory;
  difficulty: PatternDifficulty;
  description: string;
  coreIdea: string;
  whenToUse: string[];
  triggers: string[];      // Keywords jo problem me dikh jayein
  timeComplexity: string;
  spaceComplexity: string;
  totalQuestions: number;
  icon: string;            // Emoji
  color: string;           // Hex color for UI
  examples: string[];      // Famous problem examples
  prerequisites: string[]; // Pehle kya sikhna chahiye
  order: number;           // Learning order
}

export interface PatternProgress {
  patternId: string;
  completed: number;
  total: number;
  percentage: number;
  lastSolved?: string;    // ISO date string
  startedAt?: string;
}

export interface PatternWithProgress extends Pattern {
  progress: PatternProgress;
}