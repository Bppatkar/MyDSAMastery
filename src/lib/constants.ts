// ============================================
// Constants — App-wide shared data
// DSA_PATTERNS + PATTERN_META + totals
// ============================================

export const TOTAL_PATTERNS  = 15;
export const TOTAL_QUESTIONS = 450;
export const QUESTIONS_PER_PATTERN = 30;

// ── Full pattern metadata (used by usePatterns hook) ──────────────
export interface PatternMeta {
  id           : string;
  name         : string;
  slug         : string;
  icon         : string;
  color        : string;
  category     : string;
  difficulty   : 'Beginner' | 'Intermediate' | 'Advanced';
  description  : string;
  timeComplexity: string;
  order        : number;
}

export const DSA_PATTERNS: PatternMeta[] = [
  {
    id: 'sliding-window', name: 'Sliding Window', slug: 'sliding-window',
    icon: '🪟', color: '#10b981', category: 'Arrays & Strings', difficulty: 'Beginner',
    description: 'Track a moving subarray or substring using a window that expands and shrinks to find optimal results.',
    timeComplexity: 'O(n)', order: 1,
  },
  {
    id: 'two-pointers', name: 'Two Pointers', slug: 'two-pointers',
    icon: '👆', color: '#f59e0b', category: 'Arrays & Strings', difficulty: 'Beginner',
    description: 'Move two indices toward each other or in same direction to shrink the search space without nested loops.',
    timeComplexity: 'O(n)', order: 2,
  },
  {
    id: 'binary-search', name: 'Binary Search', slug: 'binary-search',
    icon: '🔍', color: '#6366f1', category: 'Arrays & Strings', difficulty: 'Beginner',
    description: 'Eliminate half the search space each step on sorted data or a monotonic answer space.',
    timeComplexity: 'O(log n)', order: 3,
  },
  {
    id: 'fast-slow-pointers', name: 'Fast & Slow Pointers', slug: 'fast-slow-pointers',
    icon: '⚡', color: '#eab308', category: 'Linked Lists', difficulty: 'Beginner',
    description: "Two pointers moving at different speeds — classic Floyd's cycle detection.",
    timeComplexity: 'O(n)', order: 4,
  },
  {
    id: 'merge-intervals', name: 'Merge Intervals', slug: 'merge-intervals',
    icon: '🔗', color: '#ec4899', category: 'Arrays & Strings', difficulty: 'Intermediate',
    description: 'Sort intervals by start, then merge/insert/clip overlapping ranges.',
    timeComplexity: 'O(n log n)', order: 5,
  },
  {
    id: 'cyclic-sort', name: 'Cyclic Sort', slug: 'cyclic-sort',
    icon: '🔄', color: '#06b6d4', category: 'Arrays & Strings', difficulty: 'Intermediate',
    description: 'Place numbers at their correct index for arrays containing values in [1,n] range.',
    timeComplexity: 'O(n)', order: 6,
  },
  {
    id: 'dfs', name: 'DFS', slug: 'dfs',
    icon: '🌲', color: '#22c55e', category: 'Trees', difficulty: 'Intermediate',
    description: 'Depth-first traversal using recursion or explicit stack to explore all paths.',
    timeComplexity: 'O(n)', order: 7,
  },
  {
    id: 'bfs', name: 'BFS', slug: 'bfs',
    icon: '🌊', color: '#3b82f6', category: 'Graphs', difficulty: 'Intermediate',
    description: 'Level-by-level traversal using a queue to find shortest paths.',
    timeComplexity: 'O(n)', order: 8,
  },
  {
    id: 'topological-sort', name: 'Topological Sort', slug: 'topological-sort',
    icon: '📊', color: '#8b5cf6', category: 'Graphs', difficulty: 'Intermediate',
    description: 'Order nodes in a DAG such that all dependencies come before dependents.',
    timeComplexity: 'O(V+E)', order: 9,
  },
  {
    id: 'heap-priority-queue', name: 'Heap / Priority Queue', slug: 'heap-priority-queue',
    icon: '🏔️', color: '#f97316', category: 'Heaps & Queues', difficulty: 'Intermediate',
    description: 'Maintain a dynamic sorted structure for efficient min/max queries.',
    timeComplexity: 'O(n log k)', order: 10,
  },
  {
    id: 'subsets-backtracking', name: 'Subsets / Backtracking', slug: 'subsets-backtracking',
    icon: '🧩', color: '#a855f7', category: 'Dynamic Programming', difficulty: 'Advanced',
    description: 'Explore all combinations/permutations by building choices incrementally and pruning dead ends.',
    timeComplexity: 'O(2^n)', order: 11,
  },
  {
    id: 'dynamic-programming', name: 'Dynamic Programming', slug: 'dynamic-programming',
    icon: '🧠', color: '#ef4444', category: 'Dynamic Programming', difficulty: 'Advanced',
    description: 'Break problems into overlapping subproblems and store results to avoid recomputation.',
    timeComplexity: 'O(n²)', order: 12,
  },
  {
    id: 'bit-manipulation', name: 'Bit Manipulation', slug: 'bit-manipulation',
    icon: '⚙️', color: '#64748b', category: 'Bit Manipulation', difficulty: 'Intermediate',
    description: 'Use bitwise operations for space-efficient and ultra-fast computations.',
    timeComplexity: 'O(1)', order: 13,
  },
  {
    id: 'trie', name: 'Trie', slug: 'trie',
    icon: '🌐', color: '#0ea5e9', category: 'Tries', difficulty: 'Advanced',
    description: 'Tree-like structure for prefix-based string operations and autocomplete.',
    timeComplexity: 'O(m)', order: 14,
  },
  {
    id: 'graph-algorithms', name: 'Graph Algorithms', slug: 'graph-algorithms',
    icon: '🕸️', color: '#10b981', category: 'Graphs', difficulty: 'Advanced',
    description: 'Union-Find, Dijkstra, Bellman-Ford for complex graph traversal and shortest paths.',
    timeComplexity: 'O(V+E)', order: 15,
  },
];

// ── Simplified meta for dropdowns/selects (used by practice page) ─
export const PATTERN_META = DSA_PATTERNS.map((p) => ({
  id   : p.id,
  name : p.name,
  slug : p.slug,
  icon : p.icon,
  color: p.color,
}));

// ── Difficulty colours ─────────────────────────────────────────────
export const DIFFICULTY_COLORS = {
  Easy   : '#22c55e',
  Medium : '#f59e0b',
  Hard   : '#ef4444',
} as const;

// ── Status colours ─────────────────────────────────────────────────
export const STATUS_COLORS = {
  Solved       : '#22c55e',
  Attempted    : '#f59e0b',
  'Not Started': '#6b7280',
} as const;