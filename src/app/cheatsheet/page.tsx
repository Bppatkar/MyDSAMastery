'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

const KEYWORD_PATTERNS = [
  {
    emoji: '🔢', color: '#10b981',
    keywords: ['"Max" / "Min" array mein', 'Sorting, Searching', 'Two Sum, Three Sum', 'Distinct / Unique elements', 'Smallest / Longest Substring / Subarray / Window'],
    keywords_kyu: 'Ye sab "array mein kuch dhundho" type ke questions hain. Sorted hai to Two Pointers. Subarray/substring hai to Sliding Window. Fast lookup chahiye to HashMap.',
    patterns: [
      { name: 'Two Pointers', desc: 'Sorted array mein pair dhundne ke liye — left/right converge', link: '/patterns/two-pointers' },
      { name: 'Hashing (HashMap)', desc: 'Fast O(1) lookup — "kya ye pehle aaya tha?"', link: '/algorithms' },
      { name: 'Sliding Window', desc: 'Contiguous subarray/substring — right badhao, left shrink karo', link: '/patterns/sliding-window' },
      { name: 'Prefix Sum', desc: 'Range ka sum fast nikalne ke liye — O(1) per query', link: '/algorithms' },
      { name: 'Binary Search', desc: 'Sorted ya monotonic condition mein — O(log n)', link: '/patterns/binary-search' },
    ],
  },
  {
    emoji: '🧠', color: '#8b5cf6',
    keywords: ['"Subsequence" (Longest, etc.)', '"Counting ways" / "How many ways?"', 'Knapsack, "Max / Min path"', '"Fibonacci-like" recurrences', 'Edit distance (string transformations)'],
    keywords_kyu: '"Kitne tarike hain?" ya "Best value kya hai?" — ye overlapping subproblems ka signal hai. Same calculation baar baar ho rahi hai — DP mein ek baar solve karo, yaad rakho.',
    patterns: [
      { name: 'DP on Sequences', desc: '1D ya 2D DP array — har index pe best answer store karo', link: '/patterns/dynamic-programming' },
      { name: 'Memoization (Top-Down)', desc: 'Recursion + cache — natural sochne ka tarika', link: '/patterns/dynamic-programming' },
      { name: 'Tabulation (Bottom-Up)', desc: 'Iterative DP — chhote problems pehle solve karo', link: '/patterns/dynamic-programming' },
    ],
  },
  {
    emoji: '📅', color: '#f59e0b',
    keywords: ['"Interval scheduling"', '"Scheduling tasks" ya "Meeting rooms"', 'Min number of platforms / rooms / trips', '"Activity selection" — choose tasks that min/max something'],
    keywords_kyu: 'Jab har item ka start aur end time ho — pehle sort karo (by start ya end), phir greedy choice karo. Priority Queue se track karo ki kaunsa resource available hai.',
    patterns: [
      { name: 'Sort + Greedy', desc: 'Sort by end time, greedily select non-overlapping', link: '/patterns/merge-intervals' },
      { name: 'Priority Queue (Heap)', desc: 'Earliest finishing task track karo — Min-Heap', link: '/patterns/heap' },
      { name: 'Merge Intervals', desc: 'Overlapping intervals combine karo — sort + single pass', link: '/patterns/merge-intervals' },
    ],
  },
  {
    emoji: '🌲', color: '#06b6d4',
    keywords: ['"Generate all" permutations / combinations / subsets', 'N-Queens, Sudoku solver', 'Pathfinding with constraints'],
    keywords_kyu: 'n chhota hai (≤ 20) aur sab possible solutions chahiye — backtracking use karo. Invalid path mila? Wapas aao (backtrack). Pruning se bahut kuch cut ho jaata hai.',
    patterns: [
      { name: 'DFS + Path Building', desc: 'Recursion se path build karo, leaf pe save karo', link: '/patterns/dfs' },
      { name: 'Backtracking', desc: 'Try → explore → undo (backtrack) — invalid paths early cut', link: '/patterns/subsets' },
      { name: 'Bitmask DP', desc: 'State ko bitmask mein store — n ≤ 20 ke liye', link: '/algorithms' },
    ],
  },
  {
    emoji: '🗺️', color: '#ef4444',
    keywords: ['"Routes", "Paths", "Cycles"', 'Connected components', 'Shortest path (weighted / unweighted)'],
    keywords_kyu: 'Graph ya grid hai — unweighted mein BFS (guaranteed shortest), all paths mein DFS, weighted mein Dijkstra. "Connected?" ke liye Union-Find ya BFS/DFS.',
    patterns: [
      { name: 'BFS', desc: 'Shortest path (unweighted) — level-by-level explore', link: '/patterns/bfs' },
      { name: 'DFS', desc: 'All paths, connected components, cycle detection', link: '/patterns/dfs' },
      { name: 'Topological Sort', desc: 'DAG mein dependencies order karo (Kahn\'s algorithm)', link: '/patterns/topological-sort' },
      { name: 'Dijkstra / Union-Find', desc: 'Weighted shortest path / group connectivity', link: '/algorithms' },
    ],
  },
];

const DS_COMPLEXITY = [
  {
    name: 'Array', icon: '📦', color: '#10b981',
    kyu: 'Index se seedha access O(1). Memory mein consecutive store hota hai. Middle mein insert/delete slow kyunki baaki sab shift karna parta hai.',
    use_when: 'Random access chahiye, size fixed ho, index-based access',
    ops: [
      { op: 'Insert (start pe)', best: 'O(1)', avg: 'O(n)', worst: 'O(n)', note: 'Sab elements right shift karna parta hai' },
      { op: 'Insert (end pe)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Seedha last mein daalo' },
      { op: 'Remove (start se)', best: 'O(1)', avg: 'O(n)', worst: 'O(n)', note: 'Sab elements left shift karna parta hai' },
      { op: 'Remove (end se)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Seedha last nikaalo' },
      { op: 'Search', best: 'O(1)', avg: 'O(n)', worst: 'O(n)', note: 'Start se end tak ek ek check karo' },
    ],
  },
  {
    name: 'Linked List (Head Only)', icon: '🔗', color: '#6366f1',
    kyu: 'Har node apne agle node ko jaanta hai (next pointer). Head pe fast O(1), tail pe slow O(n) kyunki puri list traverse karni padti hai.',
    use_when: 'Frequent insert/delete at head, stack ya queue implement karna, size dynamic ho',
    ops: [
      { op: 'Insert (head pe)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'newNode.next = head, head = newNode' },
      { op: 'Insert (tail pe)', best: 'O(n)', avg: 'O(n)', worst: 'O(n)', note: 'Pehle end tak jaao, phir add karo' },
      { op: 'Remove (head se)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'head = head.next' },
      { op: 'Remove (tail se)', best: 'O(n)', avg: 'O(n)', worst: 'O(n)', note: 'Second-last pe jaao, next = null' },
      { op: 'Search', best: 'O(1)', avg: 'O(n)', worst: 'O(n)', note: 'Head se traverse karo' },
    ],
  },
  {
    name: 'Stack (LIFO)', icon: '📚', color: '#f59e0b',
    kyu: 'Last In First Out — jaise plate stack. Sirf TOP se kaam hota hai. DFS, parentheses matching, "undo" ke liye perfect. Sab operations O(1)!',
    use_when: 'Parentheses matching, DFS iteration, undo operations, monotonic stack problems',
    ops: [
      { op: 'Push (top pe daalo)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Seedha top pe add' },
      { op: 'Pop (top se nikalo)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Top wala nikaal do' },
      { op: 'Peek (top dekho)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Sirf dekho, nikalo mat' },
    ],
  },
  {
    name: 'Queue (FIFO)', icon: '🚶', color: '#06b6d4',
    kyu: 'First In First Out — jaise line mein log. Front se nikalo, back mein daalo. BFS ke liye must-use! Sab operations O(1).',
    use_when: 'BFS, level-order traversal, scheduling, sliding window (deque)',
    ops: [
      { op: 'Enqueue (add karo)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Back mein add karo' },
      { op: 'Dequeue (nikalo)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Front se nikalo' },
      { op: 'Peek (front dekho)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Front dekho, nikalo mat' },
    ],
  },
  {
    name: 'BST (Binary Search Tree)', icon: '🌳', color: '#8b5cf6',
    kyu: 'Left < Root < Right. Balanced BST mein O(log n). Unbalanced ho jaye (sorted data insert karo) to O(n) — linked list ban jaata hai! AVL/Red-Black tree se balanced rakha jaata hai.',
    use_when: 'Sorted traversal, range queries, kth smallest/largest',
    ops: [
      { op: 'Insert', best: 'O(1)', avg: 'O(log n)', worst: 'O(n)', note: 'Worst case: sorted data = degenerate tree' },
      { op: 'Search', best: 'O(1)', avg: 'O(log n)', worst: 'O(n)', note: 'Root se compare karte jaao' },
      { op: 'Delete', best: 'O(1)', avg: 'O(log n)', worst: 'O(n)', note: 'Find + children reconnect karo' },
    ],
  },
  {
    name: 'Heap / Priority Queue', icon: '⛰️', color: '#ef4444',
    kyu: 'Min/Max element hamesha TOP pe rehta hai. Insert/Remove O(log n). "Top K elements" ke liye best choice. JS mein built-in nahi — array se implement karo.',
    use_when: 'Top K elements, task scheduling, Dijkstra, median finding',
    ops: [
      { op: 'Insert (push)', best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)', note: 'End mein add, bubble-up karo' },
      { op: 'Peek (min/max dekho)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Hamesha root pe hota hai' },
      { op: 'Remove Top (pop)', best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)', note: 'Root nikalo, last ko root pe, bubble-down karo' },
    ],
  },
  {
    name: 'Graph (Adjacency List)', icon: '🕸️', color: '#ec4899',
    kyu: 'Har node ki ek list hoti hai — uske neighbors. BFS/DFS dono O(V+E). Adjacency Matrix se better jab graph sparse ho (E << V²). LeetCode mein zyada yahi aata hai.',
    use_when: 'Social networks, roads, dependencies, grid problems',
    ops: [
      { op: 'Add Vertex', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'List mein naya entry daalo' },
      { op: 'Add Edge', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Neighbor list mein add karo' },
      { op: 'BFS / DFS', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', note: 'Har node aur edge exactly ek baar visit' },
    ],
  },
  {
    name: 'Set (HashSet)', icon: '🎯', color: '#10b981',
    kyu: 'Sirf unique elements store karta hai. Insert/Search/Remove average O(1). Worst O(n) sirf jab hash collisions bahut hon (rare). "Kya ye pehle aaya tha?" ke liye perfect.',
    use_when: 'Duplicate check, unique elements collect karo, visited track karo',
    ops: [
      { op: 'Add (insert)', best: 'O(1)', avg: 'O(1)', worst: 'O(n)', note: 'Hash banao, bucket mein daalo' },
      { op: 'Has / Contains', best: 'O(1)', avg: 'O(1)', worst: 'O(n)', note: 'Hash banao, bucket check karo' },
      { op: 'Delete', best: 'O(1)', avg: 'O(1)', worst: 'O(n)', note: 'Hash banao, bucket se hatao' },
    ],
  },
  {
    name: 'HashMap (Hash Table)', icon: '🗂️', color: '#f59e0b',
    kyu: 'Key-Value pairs store karta hai. Average O(1) sab operations — isliye LeetCode mein sabse zyada use hota hai. Frequency count, grouping, fast lookup — sab yahan.',
    use_when: 'Frequency count, group by, fast lookup by key, anagram grouping',
    ops: [
      { op: 'Put (key:value daalo)', best: 'O(1)', avg: 'O(1)', worst: 'O(n)', note: 'Key ka hash banao, store karo' },
      { op: 'Get (value nikalo)', best: 'O(1)', avg: 'O(1)', worst: 'O(n)', note: 'Key ka hash → value return' },
      { op: 'Delete (remove karo)', best: 'O(1)', avg: 'O(1)', worst: 'O(n)', note: 'Key dhundho, delete karo' },
    ],
  },
];

const TIME_GUIDE = [
  { complexity: 'O(1)', name: 'Constant — sabse fast!', example: 'Array[i], HashMap.get(), Stack.push()', color: '#10b981', speed: '⚡⚡⚡⚡⚡', note: 'n chahye 10⁹ ho, same time lagta hai' },
  { complexity: 'O(log n)', name: 'Logarithmic — bahut fast', example: 'Binary Search, Heap insert/remove, BST', color: '#06b6d4', speed: '⚡⚡⚡⚡', note: 'n=10⁹ mein sirf 30 steps!' },
  { complexity: 'O(n)', name: 'Linear — theek hai', example: 'Single loop, Sliding Window, BFS/DFS', color: '#8b5cf6', speed: '⚡⚡⚡', note: 'n=10⁶ mein 10 lakh steps — acceptable' },
  { complexity: 'O(n log n)', name: 'Linearithmic — chalega', example: 'Sorting (Merge/Quick/Heap), Segment Tree', color: '#f59e0b', speed: '⚡⚡', note: 'n=10⁵ mein ~1.7M steps — fine' },
  { complexity: 'O(n²)', name: 'Quadratic — sirf chhote n ke liye', example: 'Nested loops, Bubble Sort, Brute force', color: '#ef4444', speed: '⚡', note: 'n=10³ = 10⁶ steps OK. n=10⁵ = TLE!' },
  { complexity: 'O(2ⁿ)', name: 'Exponential — sirf n ≤ 20', example: 'Backtracking, Subset enumeration', color: '#dc2626', speed: '🐌', note: 'n=20: 1M steps. n=40: 10¹² = TLE!' },
  { complexity: 'O(n!)', name: 'Factorial — sirf n ≤ 10', example: 'Permutations, Travelling Salesman (brute)', color: '#991b1b', speed: '💀', note: 'n=10: 3.6M. n=12: 479M. n=15: yaar band karo 😅' },
];

function ComplexityBadge({ val }: { val: string }) {
  const c = val === 'O(1)' ? '#10b981' : val.includes('log') ? '#f59e0b' : val === 'O(n)' || val === 'O(V+E)' ? '#8b5cf6' : '#ef4444';
  return <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13, color: c, background: c + '20', border: `1px solid ${c}40`, padding: '4px 10px', borderRadius: 6 }}>{val}</div>;
}

type Tab = 'keywords' | 'ds' | 'time';

export default function CheatSheetPage() {
  const [tab, setTab] = useState<Tab>('keywords');
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>

      {/* Header */}
      <div style={{ padding: '20px 28px 0', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-bg)', border: '1px solid var(--accent-bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={20} color="var(--accent)" />
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: 'var(--tx-1)', margin: 0 }}>⚡ DSA Cheat Sheet</h1>
            <p style={{ fontSize: 13, color: 'var(--tx-3)', margin: 0 }}>Keywords → Pattern → DS → Complexity — sab ek jagah</p>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Link href="/pattern-recognition" style={{ fontSize: 11, padding: '5px 14px', borderRadius: 16, background: 'var(--bg-elevated)', color: 'var(--tx-3)', border: '1px solid var(--border)', textDecoration: 'none', fontWeight: 600 }}>🧠 Trainer</Link>
            <Link href="/algorithms" style={{ fontSize: 11, padding: '5px 14px', borderRadius: 16, background: 'var(--bg-elevated)', color: 'var(--tx-3)', border: '1px solid var(--border)', textDecoration: 'none', fontWeight: 600 }}>⚡ Algorithms</Link>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--border)', marginLeft: -28, marginRight: -28, paddingLeft: 28 }}>
          {[
            { id: 'keywords' as Tab, label: '🔑 Keywords → Patterns' },
            { id: 'ds' as Tab, label: '🗂️ Data Structure Complexity' },
            { id: 'time' as Tab, label: '⏱️ Time Complexity Guide' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '10px 20px', background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 600,
              color: tab === t.id ? 'var(--accent)' : 'var(--tx-3)',
              borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 28px', maxWidth: 1100 }}>

        {/* ─── KEYWORDS → PATTERNS ─── */}
        {tab === 'keywords' && (
          <div>
            <div style={{ padding: '14px 18px', background: 'var(--accent-bg)', borderRadius: 12, border: '1px solid var(--accent-bdr)', marginBottom: 24, fontSize: 13, color: 'var(--tx-1)', lineHeight: 1.8 }}>
              🎯 <strong>Trick:</strong> Question padhte waqt ye keywords notice karo → seedha pata chal jaata hai kaunsa pattern try karna hai.
              Ye 5 groups LeetCode ke ~90% questions cover karte hain. Click karo details ke liye!
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {KEYWORD_PATTERNS.map((row, i) => {
                const isOpen = expanded === `kw-${i}`;
                return (
                  <div key={i} style={{ borderRadius: 14, border: `1px solid ${isOpen ? row.color + '50' : 'var(--border)'}`, background: 'var(--bg-surface)', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                    <button onClick={() => setExpanded(isOpen ? null : `kw-${i}`)} style={{
                      width: '100%', padding: '16px 20px', background: isOpen ? row.color + '08' : 'transparent',
                      border: 'none', cursor: 'pointer', textAlign: 'left',
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 20, alignItems: 'center' }}>
                        {/* Keywords */}
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-4)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{row.emoji} Question mein ye dikhein</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                            {row.keywords.map((kw, j) => (
                              <span key={j} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: row.color + '18', color: row.color, border: `1px solid ${row.color}35`, fontWeight: 600 }}>{kw}</span>
                            ))}
                          </div>
                        </div>
                        {/* Patterns */}
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-4)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>→ In patterns ko sochna shuru karo</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {row.patterns.map((p, j) => (
                              <span key={j} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 6, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--tx-1)', fontWeight: 700 }}>{p.name}</span>
                            ))}
                          </div>
                        </div>
                        {isOpen ? <ChevronUp size={16} color="var(--tx-3)" /> : <ChevronDown size={16} color="var(--tx-3)" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div style={{ padding: '4px 20px 18px', borderTop: `1px solid ${row.color}20` }}>
                        <div style={{ marginBottom: 14, padding: '12px 16px', background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border)', fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7 }}>
                          💡 <strong style={{ color: 'var(--tx-1)' }}>Kyu ye patterns?</strong> {row.keywords_kyu}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                          {row.patterns.map((p, j) => (
                            <Link key={j} href={p.link} style={{ padding: '12px 16px', borderRadius: 10, background: row.color + '10', border: `1px solid ${row.color}30`, textDecoration: 'none', display: 'block' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = row.color + '20'; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = row.color + '10'; }}>
                              <div style={{ fontSize: 14, fontWeight: 800, color: row.color, marginBottom: 4 }}>{p.name} →</div>
                              <div style={{ fontSize: 12, color: 'var(--tx-3)', lineHeight: 1.5 }}>{p.desc}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── DATA STRUCTURE COMPLEXITY ─── */}
        {tab === 'ds' && (
          <div>
            <div style={{ padding: '14px 18px', background: 'var(--accent-bg)', borderRadius: 12, border: '1px solid var(--accent-bdr)', marginBottom: 24, fontSize: 13, color: 'var(--tx-1)', lineHeight: 1.8 }}>
              📊 <strong>Interview mein ye zaroor puchha jaata hai:</strong> "Is operation ki complexity kya hai?" Green = O(1) fast, Red = O(n) slow.
              Worst case hamesha batana — interviewer wahi expect karta hai!
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {DS_COMPLEXITY.map((ds, i) => {
                const isOpen = expanded === `ds-${i}`;
                return (
                  <div key={i} style={{ borderRadius: 14, border: `1px solid ${isOpen ? ds.color + '50' : 'var(--border)'}`, background: 'var(--bg-surface)', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                    <button onClick={() => setExpanded(isOpen ? null : `ds-${i}`)} style={{ width: '100%', padding: '16px 20px', background: isOpen ? ds.color + '08' : 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left' }}>
                      <span style={{ fontSize: 26 }}>{ds.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: ds.color }}>{ds.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--tx-3)', marginTop: 2 }}>Kab use karo: {ds.use_when}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 300 }}>
                        {ds.ops.map((op, j) => <ComplexityBadge key={j} val={op.avg} />)}
                      </div>
                      {isOpen ? <ChevronUp size={16} color="var(--tx-3)" style={{ flexShrink: 0 }} /> : <ChevronDown size={16} color="var(--tx-3)" style={{ flexShrink: 0 }} />}
                    </button>

                    {isOpen && (
                      <div style={{ padding: '4px 20px 18px', borderTop: `1px solid ${ds.color}20` }}>
                        <div style={{ marginBottom: 14, padding: '12px 16px', background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border)', fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7 }}>
                          💡 {ds.kyu}
                        </div>
                        <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: ds.color, padding: '10px 16px', gap: 10 }}>
                            {['Operation', 'Best', 'Average', 'Worst'].map(h => <div key={h} style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>{h}</div>)}
                          </div>
                          {ds.ops.map((op, j) => (
                            <div key={j} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 16px', gap: 10, borderTop: j === 0 ? 'none' : '1px solid var(--border)', background: j % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-elevated)', alignItems: 'center' }}>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx-1)' }}>{op.op}</div>
                                <div style={{ fontSize: 11, color: 'var(--tx-4)', marginTop: 2 }}>{op.note}</div>
                              </div>
                              <ComplexityBadge val={op.best} />
                              <ComplexityBadge val={op.avg} />
                              <ComplexityBadge val={op.worst} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── TIME COMPLEXITY ─── */}
        {tab === 'time' && (
          <div>
            <div style={{ padding: '14px 18px', background: 'var(--accent-bg)', borderRadius: 12, border: '1px solid var(--accent-bdr)', marginBottom: 24, fontSize: 13, color: 'var(--tx-1)', lineHeight: 1.8 }}>
              ⏱️ <strong>Constraints → Allowed Complexity Rule:</strong> n ≤ 10⁸ → O(n) ya better. n ≤ 10³ → O(n²) chalega. n ≤ 20 → O(2ⁿ) chalega.
              Ye ek rule se 80% pattern pehchaan ho jaati hai!
            </div>

            {/* n → complexity quick table */}
            <div style={{ marginBottom: 24, padding: '18px 20px', background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--tx-1)', marginBottom: 16 }}>📊 n ki value → Allowed Time Complexity</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { n: 'n ≤ 10⁸ – 10⁹', allowed: 'O(log n) ya O(1)', pattern: 'Binary Search, Mathematical formulas', color: '#10b981' },
                  { n: 'n ≤ 10⁵ – 10⁶', allowed: 'O(n) ya O(n log n)', pattern: 'Sliding Window, Two Pointers, Merge Sort, Heap', color: '#06b6d4' },
                  { n: 'n ≤ 10⁴', allowed: 'O(n log n) ya O(n²)', pattern: 'DP (1D), BFS/DFS on graph', color: '#8b5cf6' },
                  { n: 'n ≤ 10³', allowed: 'O(n²) chalega', pattern: 'DP (2D), All pairs comparison', color: '#f59e0b' },
                  { n: 'n ≤ 20', allowed: 'O(2ⁿ) ya O(n!)', pattern: 'Backtracking, Bitmask DP, Permutations', color: '#ef4444' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 200px 1fr', gap: 14, alignItems: 'center', padding: '12px 16px', borderRadius: 10, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                    <div style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: 14, color: row.color }}>{row.n}</div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13, color: row.color, background: row.color + '18', padding: '5px 12px', borderRadius: 8, border: `1px solid ${row.color}35` }}>{row.allowed}</div>
                    <div style={{ fontSize: 13, color: 'var(--tx-2)' }}>{row.pattern}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complexity cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 12, marginBottom: 24 }}>
              {TIME_GUIDE.map((tc, i) => (
                <div key={i} style={{ padding: '16px 18px', borderRadius: 14, background: 'var(--bg-surface)', border: `1px solid ${tc.color}40` }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                    <div style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 22, color: tc.color }}>{tc.complexity}</div>
                    <div style={{ fontSize: 13 }}>{tc.speed}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx-1)', marginBottom: 6 }}>{tc.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--tx-3)', fontFamily: 'monospace', padding: '6px 10px', background: 'var(--bg-elevated)', borderRadius: 6, lineHeight: 1.5, marginBottom: 8 }}>{tc.example}</div>
                  <div style={{ fontSize: 12, color: 'var(--tx-4)', lineHeight: 1.5 }}>💬 {tc.note}</div>
                </div>
              ))}
            </div>

            {/* Interview tips */}
            <div style={{ padding: '18px 20px', background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--tx-1)', marginBottom: 14 }}>🎤 Interview mein complexity explain karne ka tarika:</div>
              {[
                { q: 'Brute force batao?', a: 'Har pair (i,j) check karo — O(n²). n=10⁴ mein 10⁸ ops — TLE aayega.' },
                { q: 'Optimized kaise kiya?', a: 'Sliding Window use kiya — ek pointer badhata hai, ek shrink karta hai. O(n) mein ho gaya.' },
                { q: 'Space complexity?', a: 'O(k) extra space — HashMap mein sirf window ke elements store hain (max k unique).' },
                { q: 'In-place kaise?', a: 'Two Pointers ya Cyclic Sort — koi extra array nahi. O(1) space.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 16px', marginBottom: 8, background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border)', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent)', minWidth: 190, flexShrink: 0 }}>Q: {item.q}</div>
                  <div style={{ fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.6 }}>→ {item.a}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
