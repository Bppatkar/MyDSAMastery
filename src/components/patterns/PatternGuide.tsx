'use client';

import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

// ══════════════════════════════════════════════════════════════
// CONSTRAINT → PATTERN TABLE
// ══════════════════════════════════════════════════════════════
const CONSTRAINT_TABLE = [
  {
    constraint: 'n ≤ 10 or n ≤ 12',
    complexity: 'O(n!) or O(n × n!)',
    patterns: ['Backtracking (Permutations)'],
    example: 'Permutations, N-Queens',
    color: '#ef4444',
    why: 'n! possible states. Bas 10-12 tak feasible hai. Zyada hoga toh TLE.',
  },
  {
    constraint: 'n ≤ 20 or n ≤ 25',
    complexity: 'O(2^n)',
    patterns: ['Backtracking (Subsets)', 'Bitmask DP'],
    example: 'Subsets, Power Set, TSP',
    color: '#f97316',
    why: '2^25 ≈ 33 million — border pe hai. Bitmask DP ya pruning zaroori.',
  },
  {
    constraint: 'n ≤ 100',
    complexity: 'O(n³)',
    patterns: ['3D Dynamic Programming', 'Floyd-Warshall', 'Matrix Chain'],
    example: 'Shortest paths all pairs, Burst Balloons',
    color: '#f59e0b',
    why: '100³ = 10^6 — thik hai. 3D DP ya triple loop chalega.',
  },
  {
    constraint: 'n ≤ 1,000',
    complexity: 'O(n²)',
    patterns: ['2D Dynamic Programming', 'Two Pointers (nested)', 'Brute Force'],
    example: 'LCS, Edit Distance, 0/1 Knapsack, LIS O(n²)',
    color: '#eab308',
    why: '1000² = 10^6 — fine. 2D DP table easily fit hoti hai.',
  },
  {
    constraint: 'n ≤ 10⁵ (100,000)',
    complexity: 'O(n log n)',
    patterns: ['Sorting + Binary Search', 'Merge Sort', 'Heap / Priority Queue', 'Segment Tree', 'BIT'],
    example: 'Koko Bananas, Merge Intervals, Top K Elements',
    color: '#22c55e',
    why: '10^5 × log(10^5) ≈ 1.7 million — safe. Yahan log factor allow hai.',
  },
  {
    constraint: 'n ≤ 10⁵ ya 10⁶ (array/string)',
    complexity: 'O(n)',
    patterns: ['Sliding Window', 'Two Pointers', 'Hash Map / Hash Set', 'Monotonic Stack/Queue', 'Prefix Sum'],
    example: 'Longest Substring, Two Sum, Rotting Oranges',
    color: '#10b981',
    why: 'Linear scan must. Window ya map se O(n) mein karo.',
    highlight: true,
  },
  {
    constraint: 'n ≤ 10⁷ or 10⁸',
    complexity: 'O(n) with small constant',
    patterns: ['Two Pointers', 'Bit Manipulation', 'Math'],
    example: 'Counting, Sieve of Eratosthenes',
    color: '#06b6d4',
    why: 'Constant factor bahut important. No heavy operations per element.',
  },
  {
    constraint: 'n ≤ 10⁹ or 10¹⁸',
    complexity: 'O(log n) or O(1)',
    patterns: ['Binary Search on Answer', 'Math / Number Theory', 'Bit Manipulation'],
    example: 'Sqrt(x), Power(x,n), Missing Number',
    color: '#8b5cf6',
    why: 'Traverse nahi kar sakte. BS ya math formula use karo.',
  },
];

// ══════════════════════════════════════════════════════════════
// INPUT → OUTPUT → PATTERN MAPPING
// ══════════════════════════════════════════════════════════════
const IO_PATTERNS = [
  {
    category: 'Array — Contiguous',
    color: '#10b981',
    icon: '▬',
    rows: [
      { input: 'Unsorted array', output: 'Max/Min subarray sum', keywords: ['contiguous', 'subarray', 'maximum'], pattern: 'Sliding Window (variable)' },
      { input: 'Unsorted array + k', output: 'Max/min of fixed window', keywords: ['exactly k', 'fixed size'], pattern: 'Sliding Window (fixed k)' },
      { input: 'Array + target', output: 'Count subarrays with sum', keywords: ['count', 'number of subarrays'], pattern: 'Prefix Sum + Hash Map' },
      { input: 'Sorted array', output: 'Pair with sum = target', keywords: ['sorted', 'two numbers', 'sum'], pattern: 'Two Pointers (opposite ends)' },
      { input: 'Array with negatives', output: 'Maximum subarray sum', keywords: ['negative numbers', 'max sum', 'contiguous'], pattern: 'Kadane\'s (DP variant)' },
    ],
  },
  {
    category: 'Array — Search / Order',
    color: '#6366f1',
    icon: '⌕',
    rows: [
      { input: 'Sorted array', output: 'Index of target / -1', keywords: ['sorted', 'search', 'O(log n)'], pattern: 'Binary Search' },
      { input: 'Rotated sorted array', output: 'Target index', keywords: ['rotated', 'sorted', 'no duplicates'], pattern: 'Binary Search (modified)' },
      { input: 'Any array', output: 'Kth largest/smallest', keywords: ['kth', 'top k', 'k largest'], pattern: 'Heap (Min or Max)' },
      { input: 'Minimize/maximize something', output: 'Boolean feasibility', keywords: ['minimum capacity', 'maximum speed', 'at least k days'], pattern: 'Binary Search on Answer' },
      { input: 'Values in [1, n]', output: 'Missing / duplicate', keywords: ['1 to n', 'in-place', 'O(1) space'], pattern: 'Cyclic Sort' },
    ],
  },
  {
    category: 'String',
    color: '#f59e0b',
    icon: '"',
    rows: [
      { input: 'String s + pattern p', output: 'Anagram / permutation exists', keywords: ['anagram', 'permutation', 'character frequency'], pattern: 'Sliding Window + Freq Map' },
      { input: 'String', output: 'Longest valid substring', keywords: ['longest', 'at most k distinct', 'without repeat'], pattern: 'Sliding Window (variable)' },
      { input: 'String', output: 'Shortest window with all chars', keywords: ['minimum window', 'contains all'], pattern: 'Sliding Window (shrink)' },
      { input: 'String list', output: 'Prefix search / autocomplete', keywords: ['prefix', 'startsWith', 'dictionary'], pattern: 'Trie' },
      { input: 'Two strings', output: 'Common subsequence length', keywords: ['subsequence', 'common', 'two strings'], pattern: '2D Dynamic Programming (LCS)' },
    ],
  },
  {
    category: 'Linked List',
    color: '#ec4899',
    icon: '⟶',
    rows: [
      { input: 'Linked list', output: 'Cycle exists? / entry?', keywords: ['cycle', 'loop', 'O(1) space'], pattern: 'Fast & Slow Pointers (Floyd)' },
      { input: 'Linked list', output: 'Middle node', keywords: ['middle', 'single pass'], pattern: 'Fast & Slow (slow at middle)' },
      { input: 'Linked list', output: 'Kth from end', keywords: ['kth from end', 'nth node'], pattern: 'Two Pointers (gap of k)' },
      { input: 'Linked list (sorted)', output: 'Palindrome check', keywords: ['palindrome', 'linked list'], pattern: 'Fast & Slow + Reverse half' },
    ],
  },
  {
    category: 'Tree / Graph',
    color: '#22c55e',
    icon: '🌲',
    rows: [
      { input: 'Binary tree', output: 'Path sum / depth / LCA', keywords: ['root to leaf', 'depth', 'path'], pattern: 'DFS (recursion)' },
      { input: 'Binary tree', output: 'Level-by-level values', keywords: ['level order', 'BFS', 'layer'], pattern: 'BFS (queue)' },
      { input: '2D grid', output: 'Number of islands / components', keywords: ['connected', 'grid', 'count regions'], pattern: 'DFS or BFS flood fill' },
      { input: '2D grid', output: 'Shortest path / minimum steps', keywords: ['minimum steps', 'shortest', 'unweighted'], pattern: 'BFS (level = distance)' },
      { input: 'Directed graph + dependencies', output: 'Valid ordering / cycle?', keywords: ['prerequisites', 'dependencies', 'order'], pattern: 'Topological Sort (Kahn\'s)' },
      { input: 'Undirected graph', output: 'Connected components / cycle', keywords: ['connected', 'union', 'same group'], pattern: 'Union-Find (DSU)' },
    ],
  },
  {
    category: 'Optimization (Count / Min / Max)',
    color: '#a855f7',
    icon: '◆',
    rows: [
      { input: 'Choice at each step', output: 'Count ways / max profit', keywords: ['count ways', 'how many', 'maximum profit'], pattern: 'Dynamic Programming' },
      { input: 'Greedy choice provably optimal', output: 'Min cost / max value', keywords: ['greedy', 'always pick max/min first'], pattern: 'Greedy' },
      { input: 'All valid combinations needed', output: 'List of subsets / permutations', keywords: ['all possible', 'generate', 'list all'], pattern: 'Backtracking' },
      { input: 'Intervals [start, end]', output: 'Merge / schedule / rooms', keywords: ['intervals', 'overlapping', 'meetings'], pattern: 'Merge Intervals' },
    ],
  },
];

// ══════════════════════════════════════════════════════════════
// KEYWORD → PATTERN INSTANT LOOKUP
// ══════════════════════════════════════════════════════════════
const KEYWORDS_MAP = [
  { kw: 'contiguous subarray', pattern: 'Sliding Window', why: 'Contiguous = window. Variable ya fixed size decide karo.' },
  { kw: 'longest substring with', pattern: 'Sliding Window', why: '"Longest" + condition = expand/shrink window.' },
  { kw: 'at most k', pattern: 'Sliding Window', why: '"At most k" = window constraint. jab exceed karo shrink karo.' },
  { kw: 'minimum window containing', pattern: 'Sliding Window (shrink)', why: 'Right se expand, valid hone pe left se shrink.' },
  { kw: 'sorted array + two numbers', pattern: 'Two Pointers', why: 'Sorted + pair = opposite ends se aao.' },
  { kw: 'triplets / 3sum', pattern: 'Two Pointers', why: 'Fix ek, Two Pointers remaining 2 ke liye.' },
  { kw: 'sorted + search + O(log n)', pattern: 'Binary Search', why: 'Sorted = BS. "O(log n)" = almost confirm BS.' },
  { kw: 'minimize maximum / maximize minimum', pattern: 'Binary Search on Answer', why: 'Monotonic feasibility → BS on answer space.' },
  { kw: 'cycle in linked list', pattern: 'Fast & Slow Pointers', why: 'Floyd\'s algorithm. fast 2x, slow 1x. Meet = cycle.' },
  { kw: 'linked list middle', pattern: 'Fast & Slow Pointers', why: 'fast end pe → slow middle pe.' },
  { kw: 'intervals + merge / overlap', pattern: 'Merge Intervals', why: 'Sort by start. Overlap check: curr.start ≤ prev.end.' },
  { kw: 'meeting rooms / schedule', pattern: 'Merge Intervals + Heap', why: 'Min-heap of end times. size = rooms needed.' },
  { kw: 'values 1 to n + missing/duplicate', pattern: 'Cyclic Sort', why: 'Place each number at index i-1. Wrong index = missing/dup.' },
  { kw: 'level order / BFS tree', pattern: 'BFS', why: 'Queue. Size at loop start = nodes in that level.' },
  { kw: 'shortest path unweighted', pattern: 'BFS', why: 'BFS level = distance in unweighted graph.' },
  { kw: 'all paths / path sum / tree depth', pattern: 'DFS', why: 'Tree = DFS naturally. Postorder for bottom-up results.' },
  { kw: 'prerequisites / course order', pattern: 'Topological Sort', why: 'Directed dependencies → Kahn\'s BFS or DFS postorder.' },
  { kw: 'k largest / k smallest / kth', pattern: 'Heap', why: 'Min-heap size k for k-largest. Max-heap for k-smallest.' },
  { kw: 'running median', pattern: 'Two Heaps', why: 'Max-heap lower half + Min-heap upper half.' },
  { kw: 'all subsets / generate all', pattern: 'Backtracking', why: 'Include/exclude each element. 2^n paths.' },
  { kw: 'N-Queens / sudoku / constraint satisfaction', pattern: 'Backtracking + Pruning', why: 'Try + undo. Prune invalid states early.' },
  { kw: 'count ways / maximum profit / optimal', pattern: 'Dynamic Programming', why: 'Overlapping subproblems + optimal substructure = DP.' },
  { kw: 'prefix / autocomplete / startsWith', pattern: 'Trie', why: 'Trie = prefix tree. O(m) insert/search where m = word length.' },
  { kw: 'XOR / single number / cancel pairs', pattern: 'Bit Manipulation', why: 'a XOR a = 0. All paired elements cancel. Single remains.' },
  { kw: 'same group / connected components undirected', pattern: 'Union-Find', why: 'union(u,v). find(u)==find(v)? Same component.' },
];

// ══════════════════════════════════════════════════════════════
// 4-STEP FRAMEWORK
// ══════════════════════════════════════════════════════════════
const FOUR_STEPS = [
  {
    num: '01', icon: '📏', title: 'Constraint se Complexity Socho',
    color: '#06b6d4',
    detail: 'Sabse pehle n ki value dekho. Yeh directly batata hai kaunsa time complexity allowed hai aur kaunsa pattern possible hai.',
    tip: 'n ≤ 10⁵ to 10⁶ = O(n) ya O(n log n) must. Yahan Sliding Window, Two Ptr, Heap, BS kaam aate hain.',
  },
  {
    num: '02', icon: '📥', title: 'Input Format Identify Karo',
    color: '#10b981',
    detail: 'Input ka structure pattern hint karta hai: sorted array → BS/Two Ptr. Linked list → F&S. Tree/Grid → DFS/BFS. Values 1-n → Cyclic Sort.',
    tip: '"Sorted" word dikhe toh immediately Two Pointers ya Binary Search socho.',
  },
  {
    num: '03', icon: '📤', title: 'Output Type Dekho',
    color: '#f97316',
    detail: 'Output kya chahiye? Boolean → DFS/BFS. Count → DP ya Prefix Sum. All combinations → Backtracking. Index/element → Binary Search.',
    tip: '"Count ways" → DP. "All subsets" → Backtracking. "Minimum steps" → BFS. "Exists?" → DFS/HashMap.',
  },
  {
    num: '04', icon: '🔑', title: 'Keywords Spot Karo',
    color: '#a855f7',
    detail: 'Problem description mein specific words hote hain jo directly pattern reveal karte hain. Yeh words ek baar yaad ho gaye toh problem automatically identify hogi.',
    tip: '"Cycle" = F&S. "Level order" = BFS. "All paths" = DFS. "Kth largest" = Heap. "Sorted pair" = Two Pointers.',
  },
];

export default function PatternGuide() {
  const th = useTheme();
  const [activeTab, setActiveTab] = useState<'constraint' | 'io' | 'keywords' | 'steps'>('constraint');
  const [kwSearch, setKwSearch] = useState('');

  const filteredKw = kwSearch
    ? KEYWORDS_MAP.filter(k => k.kw.toLowerCase().includes(kwSearch.toLowerCase()) || k.pattern.toLowerCase().includes(kwSearch.toLowerCase()))
    : KEYWORDS_MAP;

  const tabs = [
    { id: 'constraint', label: '📏 Constraint → Pattern' },
    { id: 'io',         label: '📥 Input/Output → Pattern' },
    { id: 'keywords',   label: '🔑 Keywords Instant Lookup' },
    { id: 'steps',      label: '📖 4-Step Framework' },
  ] as const;

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 22, flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: '7px 15px', borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            background: activeTab === t.id ? th.accentBg : 'transparent',
            color: activeTab === t.id ? th.accent : th.tx3,
            border: `1px solid ${activeTab === t.id ? th.accentBdr : th.border}`,
            transition: 'all 0.15s',
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── CONSTRAINT TABLE ─────────────────────────────────────── */}
      {activeTab === 'constraint' && (
        <div>
          <div style={{ background: th.bgElevated, borderRadius: 12, padding: '14px 18px', marginBottom: 20, border: `1px solid ${th.border}` }}>
            <p style={{ fontSize: 13, color: th.tx2, margin: 0, lineHeight: 1.7 }}>
              <strong style={{ color: th.tx1 }}>Golden Rule:</strong> Pehle <code style={{ background: th.bgBase, padding: '1px 6px', borderRadius: 4, color: th.accent, fontSize: 12 }}>n</code> ki value dekho.
              Yeh constraint directly batata hai ki kaunsa time complexity answer mein accept hogi — aur us complexity se pattern narrow ho jaata hai.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CONSTRAINT_TABLE.map((row, i) => (
              <div key={i} style={{
                background: th.bgCard, border: `1px solid ${th.border}`,
                borderLeft: `4px solid ${row.color}`, borderRadius: 12, padding: '16px 20px',
                ...(row.highlight ? { boxShadow: `0 0 0 1px ${row.color}30` } : {}),
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '220px 160px 1fr', gap: 16, alignItems: 'start', flexWrap: 'wrap' }}>
                  {/* Constraint */}
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: th.tx3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Constraint</div>
                    <code style={{ fontSize: 14, fontWeight: 800, color: row.color, background: row.color + '15', padding: '3px 10px', borderRadius: 6 }}>
                      {row.constraint}
                    </code>
                  </div>
                  {/* Complexity */}
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: th.tx3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Time Complexity</div>
                    <code style={{ fontSize: 13, fontWeight: 700, color: th.tx1, background: th.bgElevated, padding: '3px 10px', borderRadius: 6, border: `1px solid ${th.border}` }}>
                      {row.complexity}
                    </code>
                  </div>
                  {/* Patterns */}
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: th.tx3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Patterns to Use</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
                      {row.patterns.map(p => (
                        <span key={p} style={{ fontSize: 11, padding: '2px 9px', borderRadius: 20, background: row.color + '18', color: row.color, border: `1px solid ${row.color}35`, fontWeight: 600 }}>{p}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 12, color: th.tx3, marginBottom: 4 }}>
                      <strong style={{ color: th.tx4 }}>Example:</strong> {row.example}
                    </div>
                    <div style={{ fontSize: 12, color: th.tx2, lineHeight: 1.55, fontStyle: 'italic' }}>→ {row.why}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick cheat card */}
          <div style={{ marginTop: 20, background: th.bgElevated, borderRadius: 12, padding: '16px 20px', border: `1px solid ${th.border}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: th.tx1, marginBottom: 12 }}>⚡ Quick Reference Card (Paste karo notebook mein)</div>
            <div style={{ fontFamily: 'monospace', fontSize: 12, color: th.tx2, lineHeight: 2, background: th.bgBase, padding: '12px 16px', borderRadius: 8, border: `1px solid ${th.border}` }}>
              {CONSTRAINT_TABLE.map(r => (
                <div key={r.constraint}>
                  <span style={{ color: r.color, fontWeight: 700 }}>{r.constraint.padEnd(25)}</span>
                  <span style={{ color: th.tx3 }}>{r.complexity.padEnd(20)}</span>
                  <span style={{ color: th.tx1 }}>→ {r.patterns[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── INPUT / OUTPUT TABLE ─────────────────────────────────── */}
      {activeTab === 'io' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {IO_PATTERNS.map(cat => (
            <div key={cat.category} style={{ background: th.bgCard, border: `1px solid ${th.border}`, borderTop: `3px solid ${cat.color}`, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: `1px solid ${th.border}`, background: th.bgElevated, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20, color: cat.color }}>{cat.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: cat.color }}>{cat.category}</span>
              </div>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '8px 18px', borderBottom: `1px solid ${th.border}`, background: th.bgBase }}>
                {['📥 Input', '📤 Output', '🔑 Keywords', '✅ Pattern'].map(h => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 700, color: th.tx3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
                ))}
              </div>
              {cat.rows.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '11px 18px', borderBottom: i < cat.rows.length - 1 ? `1px solid ${th.border}` : 'none', alignItems: 'start' }}
                  onMouseEnter={e => (e.currentTarget.style.background = th.bgHover)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div style={{ fontSize: 12, color: th.tx2, lineHeight: 1.55 }}>{row.input}</div>
                  <div style={{ fontSize: 12, color: th.tx2, lineHeight: 1.55 }}>{row.output}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {row.keywords.map(k => (
                      <span key={k} style={{ fontSize: 10, padding: '1px 7px', borderRadius: 20, background: cat.color + '15', color: cat.color, border: `1px solid ${cat.color}30`, fontWeight: 600 }}>{k}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: th.accent, background: th.accentBg, padding: '3px 10px', borderRadius: 20, border: `1px solid ${th.accentBdr}`, display: 'inline-block' }}>
                    {row.pattern}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── KEYWORDS INSTANT LOOKUP ───────────────────────────────── */}
      {activeTab === 'keywords' && (
        <div>
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: th.tx3, fontSize: 14 }}>🔍</span>
            <input
              value={kwSearch}
              onChange={e => setKwSearch(e.target.value)}
              placeholder="Keyword ya pattern type karo... e.g. 'cycle', 'kth', 'prefix'"
              style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 10, fontSize: 13, border: `1px solid ${th.border}`, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredKw.map((item, i) => (
              <div key={i} style={{ background: th.bgCard, border: `1px solid ${th.border}`, borderRadius: 11, padding: '13px 16px', display: 'grid', gridTemplateColumns: '1fr 180px 1fr', gap: 14, alignItems: 'center' }}
                onMouseEnter={e => (e.currentTarget.style.background = th.bgHover)}
                onMouseLeave={e => (e.currentTarget.style.background = th.bgCard)}>
                {/* Keyword */}
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: th.tx3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Jab dikhe:</div>
                  <code style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '3px 10px', borderRadius: 6, border: '1px solid rgba(245,158,11,0.25)' }}>
                    "{item.kw}"
                  </code>
                </div>
                {/* Arrow → Pattern */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, color: th.tx4, marginBottom: 3 }}>→</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: th.accent, background: th.accentBg, padding: '4px 12px', borderRadius: 20, border: `1px solid ${th.accentBdr}` }}>
                    {item.pattern}
                  </div>
                </div>
                {/* Why */}
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: th.tx3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Kyun?</div>
                  <div style={{ fontSize: 12, color: th.tx2, lineHeight: 1.6 }}>{item.why}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 4-STEP FRAMEWORK ─────────────────────────────────────── */}
      {activeTab === 'steps' && (
        <div>
          {/* Visual flow */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            {FOUR_STEPS.map((s, i) => (
              <>
                <div key={s.num} style={{ flex: 1, minWidth: 160, background: th.bgCard, border: `1px solid ${s.color}40`, borderTop: `3px solid ${s.color}`, borderRadius: 12, padding: '16px' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: s.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Step {s.num}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: th.tx1, marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: th.tx2, lineHeight: 1.65, marginBottom: 10 }}>{s.detail}</div>
                  <div style={{ fontSize: 12, color: s.color, background: s.color + '12', padding: '8px 10px', borderRadius: 8, border: `1px solid ${s.color}25`, lineHeight: 1.55 }}>
                    💡 {s.tip}
                  </div>
                </div>
                {i < FOUR_STEPS.length - 1 && (
                  <div key={`arrow-${i}`} style={{ fontSize: 24, color: th.tx4, flexShrink: 0 }}>→</div>
                )}
              </>
            ))}
          </div>

          {/* Worked Example */}
          <div style={{ background: th.bgCard, border: `1px solid ${th.border}`, borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: th.tx1, marginBottom: 16 }}>📌 Worked Example — "First Missing Positive" (LC #41)</div>
            {[
              { step: '01', color: '#06b6d4', label: 'Constraint', content: 'n ≤ 10⁵, O(n) time, O(1) space → Linear must, no sort/hashmap (both O(n) space)' },
              { step: '02', color: '#10b981', label: 'Input', content: 'Unsorted integer array with negatives, zeros, duplicates. Values unrestricted but answer in [1, n+1]' },
              { step: '03', color: '#f97316', label: 'Output', content: 'Smallest missing POSITIVE integer → need to check presence of 1, 2, 3... in O(1) space' },
              { step: '04', color: '#a855f7', label: 'Keywords', content: '"First missing positive" + "O(1) space" + "O(n) time" → Values 1-n must be at index i-1 → Cyclic Sort!' },
            ].map(({ step, color, label, content }) => (
              <div key={step} style={{ display: 'flex', gap: 14, marginBottom: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: color + '18', border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color, flexShrink: 0 }}>{step}</div>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, color, marginRight: 8 }}>{label}:</span>
                  <span style={{ fontSize: 12, color: th.tx2, lineHeight: 1.65 }}>{content}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 10, background: th.accentBg, border: `1px solid ${th.accentBdr}`, fontSize: 13, color: th.accent, fontWeight: 600 }}>
              ✅ Answer: Cyclic Sort — Place each number at its correct index, then scan for mismatch.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}