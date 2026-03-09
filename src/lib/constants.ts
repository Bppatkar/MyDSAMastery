// ============================================
// App Constants - Puri app mein reuse honge
// Koi magic number directly mat likho - yahan define karo
// ============================================

export const APP_NAME        = 'DSA Mastery';
export const APP_TAGLINE     = 'Master Algorithms. Crack Interviews.';
export const APP_VERSION     = '1.0.0';
export const APP_URL         = 'http://localhost:3000';

// === Stats ===
export const TOTAL_PATTERNS           = 15;
export const QUESTIONS_PER_PATTERN    = 30;
export const TOTAL_QUESTIONS          = TOTAL_PATTERNS * QUESTIONS_PER_PATTERN; // 450

// === Interview ===
export const INTERVIEW_DURATION_SECS  = 45 * 60; // 45 minutes

// === LocalStorage Keys ===
export const STORAGE_KEYS = {
  PROGRESS  : 'dsa_progress_v1',
  USER      : 'dsa_user_v1',
  EDITOR    : 'dsa_editor_v1',
} as const;

// === Navigation ===
export const NAV_LINKS = [
  { href: '/patterns',   label: 'Patterns',    icon: 'Layers'     },
  { href: '/practice',   label: 'Practice',    icon: 'Code2'      },
  { href: '/visualizers',label: 'Visualize',   icon: 'Activity'   },
  { href: '/editor',     label: 'Editor',      icon: 'Terminal'   },
  { href: '/ai',         label: 'AI Tutor',    icon: 'Bot'        },
  { href: '/interview',  label: 'Interview',   icon: 'Timer'      },
  { href: '/dashboard',  label: 'Dashboard',   icon: 'BarChart3'  },
] as const;

// === 15 DSA Patterns - Core Data ===
// Yahan sirf display data hai, full data Day 2 mein JSON files mein ayega
export const DSA_PATTERNS = [
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    slug: 'sliding-window',
    category: 'Arrays & Strings',
    difficulty: 'Beginner',
    icon: '🪟',
    color: '#10b981',
    description: 'Track a moving subarray or substring using a window that expands and shrinks',
    coreIdea: 'Replace O(n²) nested loops with O(n) single pass',
    totalQuestions: 30,
    order: 1,
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    slug: 'two-pointers',
    category: 'Arrays & Strings',
    difficulty: 'Beginner',
    icon: '👉',
    color: '#3b82f6',
    description: 'Move two indices toward each other or in the same direction to solve array problems',
    coreIdea: 'Two indices = shrink search space without extra memory',
    totalQuestions: 30,
    order: 2,
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    slug: 'binary-search',
    category: 'Arrays & Strings',
    difficulty: 'Beginner',
    icon: '🔍',
    color: '#f59e0b',
    description: 'Eliminate half the search space each iteration on sorted/monotonic data',
    coreIdea: 'O(log n) by halving — use on sorted arrays OR answer space',
    totalQuestions: 30,
    order: 3,
  },
  {
    id: 'fast-slow-pointers',
    name: 'Fast & Slow Pointers',
    slug: 'fast-slow-pointers',
    category: 'Linked Lists',
    difficulty: 'Beginner',
    icon: '⚡',
    color: '#8b5cf6',
    description: 'Two pointers at different speeds to detect cycles or find the midpoint',
    coreIdea: "Floyd's cycle detection — fast moves 2x, slow moves 1x",
    totalQuestions: 30,
    order: 4,
  },
  {
    id: 'merge-intervals',
    name: 'Merge Intervals',
    slug: 'merge-intervals',
    category: 'Arrays & Strings',
    difficulty: 'Intermediate',
    icon: '🔗',
    color: '#ec4899',
    description: 'Sort intervals by start time, then merge or clip overlapping ones',
    coreIdea: 'Input is [start, end] ranges that need combining',
    totalQuestions: 30,
    order: 5,
  },
  {
    id: 'cyclic-sort',
    name: 'Cyclic Sort',
    slug: 'cyclic-sort',
    category: 'Arrays & Strings',
    difficulty: 'Intermediate',
    icon: '🔄',
    color: '#14b8a6',
    description: 'Place each number at its correct index for arrays containing 1 to n',
    coreIdea: 'Numbers in [1,n] range → sort in O(n) without extra space',
    totalQuestions: 30,
    order: 6,
  },
  {
    id: 'dfs',
    name: 'DFS',
    slug: 'dfs',
    category: 'Trees',
    difficulty: 'Intermediate',
    icon: '🌳',
    color: '#22c55e',
    description: 'Depth-first exploration of trees and graphs using recursion or explicit stack',
    coreIdea: 'Go deep before wide — use for paths, cycle detection, components',
    totalQuestions: 30,
    order: 7,
  },
  {
    id: 'bfs',
    name: 'BFS',
    slug: 'bfs',
    category: 'Graphs',
    difficulty: 'Intermediate',
    icon: '🌊',
    color: '#06b6d4',
    description: 'Level-by-level exploration using a queue — finds shortest unweighted path',
    coreIdea: 'Queue-based level order — shortest path in unweighted graphs',
    totalQuestions: 30,
    order: 8,
  },
  {
    id: 'topological-sort',
    name: 'Topological Sort',
    slug: 'topological-sort',
    category: 'Graphs',
    difficulty: 'Intermediate',
    icon: '📊',
    color: '#f97316',
    description: 'Order tasks with dependencies in a directed acyclic graph (DAG)',
    coreIdea: 'Process nodes with zero in-degree first (Kahn\'s algorithm)',
    totalQuestions: 30,
    order: 9,
  },
  {
    id: 'heap',
    name: 'Heap / Priority Queue',
    slug: 'heap',
    category: 'Heaps & Queues',
    difficulty: 'Intermediate',
    icon: '⛰️',
    color: '#a855f7',
    description: 'Maintain efficient access to min, max, or top-K elements at all times',
    coreIdea: 'O(log n) insert/remove, O(1) peek — use for top-K and scheduling',
    totalQuestions: 30,
    order: 10,
  },
  {
    id: 'subset',
    name: 'Subsets / Backtracking',
    slug: 'subset',
    category: 'Dynamic Programming',
    difficulty: 'Intermediate',
    icon: '🎯',
    color: '#ef4444',
    description: 'Generate all valid combinations, permutations, or subsets via recursion',
    coreIdea: 'Take or not-take each element — prune invalid branches early',
    totalQuestions: 30,
    order: 11,
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    slug: 'dp',
    category: 'Dynamic Programming',
    difficulty: 'Advanced',
    icon: '🧠',
    color: '#6366f1',
    description: 'Cache overlapping subproblem results to convert exponential to polynomial time',
    coreIdea: 'Overlapping subproblems + optimal substructure = memoize/tabulate',
    totalQuestions: 30,
    order: 12,
  },
  {
    id: 'bit-manipulation',
    name: 'Bit Manipulation',
    slug: 'bit-manipulation',
    category: 'Bit Manipulation',
    difficulty: 'Intermediate',
    icon: '⚙️',
    color: '#64748b',
    description: 'Use XOR, AND, OR, and bit shifts for ultra-efficient O(1) solutions',
    coreIdea: 'Bit tricks: XOR for uniqueness, AND for masking, shifts for multiply/divide',
    totalQuestions: 30,
    order: 13,
  },
  {
    id: 'trie',
    name: 'Trie',
    slug: 'trie',
    category: 'Tries',
    difficulty: 'Advanced',
    icon: '🌐',
    color: '#0ea5e9',
    description: 'Prefix tree where each path from root to leaf represents a word or prefix',
    coreIdea: 'Each node = one character, all operations = O(word length)',
    totalQuestions: 30,
    order: 14,
  },
  {
    id: 'graph',
    name: 'Graph Algorithms',
    slug: 'graph',
    category: 'Graphs',
    difficulty: 'Advanced',
    icon: '🕸️',
    color: '#84cc16',
    description: 'Union-Find, Dijkstra, Bellman-Ford and advanced graph traversal patterns',
    coreIdea: 'Model relationships as nodes + edges, pick right algorithm per problem',
    totalQuestions: 30,
    order: 15,
  },
] as const;

// Type export for patterns
export type PatternSlug = typeof DSA_PATTERNS[number]['slug'];

// === Difficulty Config ===
export const DIFFICULTY_CONFIG = {
  Easy: {
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    label: 'Easy',
  },
  Medium: {
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    label: 'Medium',
  },
  Hard: {
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    label: 'Hard',
  },
} as const;

// === Languages ===
export const LANGUAGES = [
  { id: 'python',     label: 'Python',     monacoLang: 'python'     },
  { id: 'javascript', label: 'JavaScript', monacoLang: 'javascript' },
  { id: 'typescript', label: 'TypeScript', monacoLang: 'typescript' },
  { id: 'java',       label: 'Java',       monacoLang: 'java'       },
  { id: 'cpp',        label: 'C++',        monacoLang: 'cpp'        },
] as const;