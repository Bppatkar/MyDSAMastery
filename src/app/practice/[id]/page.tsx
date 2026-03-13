'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useProgressStore } from '@/store/useProgressStore';
import { ALL_QUESTION_STUBS } from '@/app/data/questions';
import { PATTERN_TYPES, EXTRA_PATTERN_TYPES } from '@/lib/patternTypes';
import { RULES_BY_PATTERN } from '@/lib/decisionMatrix';
import { ArrowLeft, ExternalLink, CheckCircle2, Circle, BookOpen, Lightbulb, Target, Code2, ChevronDown, ChevronUp } from 'lucide-react';

const ALL_PATTERN_TYPES_DATA = [...PATTERN_TYPES, ...EXTRA_PATTERN_TYPES];

const DIFF_COLOR: Record<string, string> = {
  Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444',
};

// ─── Optimal Approach Data per pattern ────────────────────────────
const PATTERN_APPROACH: Record<string, {
  name: string; icon: string; color: string;
  why: string;
  approach: string[];
  complexity: { time: string; space: string };
  ds: string;
  keyInsight: string;
}> = {
  'sliding-window': {
    name: 'Sliding Window', icon: '🪟', color: '#10b981',
    why: 'Contiguous subarray ya substring + optimize karna hai → O(n²) nested loops ko O(n) mein replace karo',
    approach: [
      'Do pointers lo: left = 0, right = 0',
      'right pointer se window expand karo',
      'Condition violate ho → left se shrink karo',
      'Har valid state pe result update karo',
    ],
    complexity: { time: 'O(n)', space: 'O(1) to O(k)' },
    ds: 'Two pointers + HashMap (if needed)',
    keyInsight: 'Window mein har element max 2 baar aata hai (ek baar add, ek baar remove) → O(n)',
  },
  'two-pointers': {
    name: 'Two Pointers', icon: '👆', color: '#f59e0b',
    why: 'Sorted array + pair dhundna + O(1) space → Two Pointers. O(n²) brute force se O(n) ho jaata hai',
    approach: [
      'Array sort karo agar sorted na ho',
      'left = 0, right = n-1',
      'Sum chhota → left++ (bada chahiye)',
      'Sum bada → right-- (chhota chahiye)',
      'Match mila → answer!',
    ],
    complexity: { time: 'O(n) after sort', space: 'O(1)' },
    ds: 'Two pointers on sorted array — no extra space',
    keyInsight: 'Sorted array mein: agar sum < target, left badhao. Agar sum > target, right ghatao. O(n).',
  },
  'binary-search': {
    name: 'Binary Search', icon: '🔍', color: '#6366f1',
    why: 'Sorted input ya monotonic function + O(log n) hint → Binary Search. Har step mein half eliminate.',
    approach: [
      'lo = 0, hi = n-1 (ya answer range)',
      'mid = lo + (hi-lo)//2',
      'arr[mid] == target → return mid',
      'arr[mid] < target → lo = mid+1',
      'arr[mid] > target → hi = mid-1',
    ],
    complexity: { time: 'O(log n)', space: 'O(1)' },
    ds: 'lo/hi pointers only — O(1) space',
    keyInsight: 'Har iteration mein exactly aadha search space eliminate → O(log n). n=10^9 bhi 30 steps mein!',
  },
  'fast-slow-pointers': {
    name: 'Fast & Slow Pointers', icon: '⚡', color: '#a855f7',
    why: 'Linked list cycle ya middle dhundna → Floyd\'s algorithm. No extra space.',
    approach: [
      'slow = head, fast = head',
      'slow ek step, fast do steps',
      'fast == slow → cycle hai (meeting point)',
      'Middle dhundna: fast null ho jaye → slow = middle',
    ],
    complexity: { time: 'O(n)', space: 'O(1)' },
    ds: 'Two pointers on linked list — no visited set needed',
    keyInsight: 'Cycle mein fast aur slow hamesha milenge. No HashMap, O(1) space.',
  },
  'merge-intervals': {
    name: 'Merge Intervals', icon: '🔀', color: '#ec4899',
    why: 'Intervals overlap check karna hai → sort by start, then greedy merge.',
    approach: [
      'Intervals ko start time se sort karo',
      'First interval result mein daalo',
      'Har agle interval ke liye: overlap hai → merge karo (end = max(end, curr.end))',
      'No overlap → as-is add karo',
    ],
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    ds: 'Sorted array of intervals + result list',
    keyInsight: 'Sort karne ke baad sirf adjacent intervals check karne padte hain — O(n log n).',
  },
  'cyclic-sort': {
    name: 'Cyclic Sort', icon: '🔄', color: '#06b6d4',
    why: '1 to n range ke numbers mein missing/duplicate dhundna → Cyclic Sort. O(n) time, O(1) space.',
    approach: [
      'Har number nums[i] ko apni correct position i-1 pe place karo',
      'nums[i] != correct position → swap karo',
      'Sab place ho jayein → scan karo',
      'nums[i] != i+1 → yahi missing/extra hai',
    ],
    complexity: { time: 'O(n)', space: 'O(1)' },
    ds: 'In-place swapping on array',
    keyInsight: 'Values 1-n hain to every number ka index known hai → O(1) space mein sort!',
  },
  'dfs': {
    name: 'DFS', icon: '🌲', color: '#22c55e',
    why: 'Tree/graph traversal, all paths explore karna, backtracking → DFS recursion.',
    approach: [
      'dfs(node, state)',
      'Base case: null node ya target reached',
      'Process current node',
      'Recurse on children',
      'Backtrack (undo state changes)',
    ],
    complexity: { time: 'O(V+E)', space: 'O(h) recursion stack' },
    ds: 'Recursion stack (implicit) or explicit stack',
    keyInsight: '"All paths" = DFS. "Shortest path" = BFS. Tree height = O(log n) avg, O(n) worst.',
  },
  'bfs': {
    name: 'BFS', icon: '🌊', color: '#3b82f6',
    why: 'Shortest path (unweighted) ya level-by-level → BFS with queue.',
    approach: [
      'Queue mein start node daalo',
      'Visited set maintain karo',
      'Level by level process karo',
      'Har node ke neighbours queue mein daalo',
      'Target mile → distance return karo',
    ],
    complexity: { time: 'O(V+E)', space: 'O(V)' },
    ds: 'Queue + visited set',
    keyInsight: 'BFS hamesha shortest path deta hai (unweighted). Level = distance from source.',
  },
  'topological-sort': {
    name: 'Topological Sort', icon: '📋', color: '#84cc16',
    why: 'Dependencies ke saath ordering chahiye ya cycle detect karna hai → Kahn\'s BFS algorithm.',
    approach: [
      'in_degree[] calculate karo',
      'Queue mein in_degree=0 nodes daalo',
      'Process: neighbor ka in_degree--',
      'in_degree == 0 → queue mein add',
      'Processed count != n → cycle!',
    ],
    complexity: { time: 'O(V+E)', space: 'O(V)' },
    ds: 'in-degree array + Queue + adjacency list',
    keyInsight: 'Cycle detect: agar processed nodes < n → cycle exist karta hai.',
  },
  'heap': {
    name: 'Heap / Priority Queue', icon: '🏔️', color: '#a855f7',
    why: '"K largest/smallest" ya "dynamic max/min" → Heap. O(n log k) < O(n log n) sort.',
    approach: [
      'K largest → min-heap of size k',
      'Har element push karo',
      'Size > k → pop (min niklo)',
      'Heap top = kth largest',
    ],
    complexity: { time: 'O(n log k)', space: 'O(k)' },
    ds: 'Min-Heap (for k largest) or Max-Heap (for k smallest)',
    keyInsight: 'Heap top hamesha min (or max). Size k maintain karo → kth element mil jaata hai.',
  },
  'subsets': {
    name: 'Subsets / Backtracking', icon: '🎯', color: '#ef4444',
    why: '"All" combinations/permutations/subsets generate karne hain → Backtracking. Small n.',
    approach: [
      'dfs(start, current_path)',
      'result.add(path.copy())',
      'for i = start to n:',
      '  path.add(nums[i])',
      '  dfs(i+1, path)',
      '  path.pop()  // backtrack',
    ],
    complexity: { time: 'O(2^n × n)', space: 'O(n)' },
    ds: 'Recursion + path list',
    keyInsight: 'Choose → Explore → Unchoose. Har element pe do choice: include ya exclude.',
  },
  'dynamic-programming': {
    name: 'Dynamic Programming', icon: '🧩', color: '#8b5cf6',
    why: 'Overlapping subproblems + "count ways" ya "max/min" → DP. Memoization stops recomputation.',
    approach: [
      'Subproblem define karo (dp[i] kya represent karta hai)',
      'Base cases set karo',
      'Recurrence relation likho: dp[i] = f(dp[i-1], dp[i-2], ...)',
      'Bottom-up ya top-down fill karo',
    ],
    complexity: { time: 'O(n) to O(n²)', space: 'O(1) to O(n)' },
    ds: 'dp[] array (1D ya 2D)',
    keyInsight: 'Agar recursion mein same subproblems baar baar solve ho rahe hain → DP lagao!',
  },
  'bit-manipulation': {
    name: 'Bit Manipulation', icon: '💻', color: '#f97316',
    why: 'XOR se duplicate find karo, bit counting, powers of 2 → O(1) ya O(log n) space.',
    approach: [
      'XOR property: a^a=0, a^0=a',
      'Sab XOR karo → duplicate cancel, unique bache',
      'n & (n-1) → last set bit remove',
      'n & (-n) → only lowest set bit',
    ],
    complexity: { time: 'O(n)', space: 'O(1)' },
    ds: 'No extra space — bitwise operations only',
    keyInsight: 'XOR: same numbers cancel out. Isliye "single number in pairs" instantly O(n), O(1) solve!',
  },
  'trie': {
    name: 'Trie', icon: '📝', color: '#14b8a6',
    why: 'String prefix search ya autocomplete → Trie. HashMap ki jagah Trie for shared prefixes.',
    approach: [
      'TrieNode: children[26], isEnd',
      'Insert: har character pe node banao',
      'Search: path follow karo',
      'StartsWith: path exist karta hai?',
    ],
    complexity: { time: 'O(L) per op', space: 'O(ALPHABET × L × N)' },
    ds: 'Tree of TrieNodes, each with children array',
    keyInsight: 'Common prefixes share same path → space efficient. O(L) search where L = word length.',
  },
  'graph': {
    name: 'Graph / Union-Find', icon: '🕸️', color: '#84cc16',
    why: 'Connected components ya cycle detection → Union-Find O(α(n)). Shortest weighted path → Dijkstra.',
    approach: [
      'parent[] initialize (parent[i]=i)',
      'find(x): path compression se root dhundho',
      'union(x,y): roots same hai → cycle! Else merge by rank',
      'Components count: roots count karo',
    ],
    complexity: { time: 'O(n α(n)) ≈ O(n)', space: 'O(n)' },
    ds: 'parent[] + rank[] arrays',
    keyInsight: 'Path compression + union by rank → almost O(1) per operation. Practical fastest.',
  },
};

// ─── Main Page ─────────────────────────────────────────────────────
export default function PracticeProblemPage() {
  const { id } = useParams<{ id: string }>();
  const numId = Number(id);
  const { solvedQuestions, attemptedQuestions, markSolved, markAttempted, unmark } = useProgressStore();
  const [showApproach, setShowApproach] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Find question stub
  const stub = ALL_QUESTION_STUBS.find(q => q.id === numId);
  
  const status = solvedQuestions.includes(numId) ? 'Solved'
    : attemptedQuestions.includes(numId) ? 'Attempted' : 'Todo';

  const patternData = stub ? PATTERN_APPROACH[stub.patternId] : null;
  const patternTypes = stub
    ? ALL_PATTERN_TYPES_DATA.find(p => p.id === stub.patternId)
    : null;
  const decisionRules = stub
    ? (RULES_BY_PATTERN[stub.patternId] ?? []).slice(0, 2)
    : [];

  if (!stub) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <div style={{ fontSize: 56 }}>🔍</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--tx-1)', margin: 0 }}>Question #{id}</h2>
        <p style={{ fontSize: 14, color: 'var(--tx-3)', textAlign: 'center', maxWidth: 400, lineHeight: 1.7 }}>
          Yeh question directly LeetCode pe solve karo. Wapas aao aur "Mark Solved" karo.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href={`https://leetcode.com/problems/${id}/`} target="_blank" rel="noopener noreferrer"
            style={{ padding: '10px 22px', borderRadius: 10, fontSize: 13, fontWeight: 700, background: '#f59e0b', color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ExternalLink style={{ width: 14, height: 14 }} /> Open on LeetCode
          </a>
          <Link href="/practice"
            style={{ padding: '10px 22px', borderRadius: 10, fontSize: 13, fontWeight: 700, border: '1px solid var(--border)', color: 'var(--tx-1)', textDecoration: 'none', background: 'transparent', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Practice
          </Link>
        </div>
      </div>
    );
  }

  const leetcodeUrl = stub.leetcodeUrl || `https://leetcode.com/problems/${stub.slug}/`;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* ── Top bar ── */}
      <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <Link href="/practice" style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--tx-3)', textDecoration: 'none', fontSize: 13 }}>
          <ArrowLeft size={14} /> Back
        </Link>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--tx-1)' }}>
            #{stub.id}. {stub.title}
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: `${DIFF_COLOR[stub.difficulty]}20`, color: DIFF_COLOR[stub.difficulty], border: `1px solid ${DIFF_COLOR[stub.difficulty]}40` }}>
            {stub.difficulty}
          </span>
          {stub.tags?.slice(0, 3).map(t => (
            <span key={t} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'var(--bg-elevated)', color: 'var(--tx-3)', border: '1px solid var(--border)' }}>{t}</span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a href={leetcodeUrl} target="_blank" rel="noopener"
            style={{ padding: '7px 14px', borderRadius: 8, background: '#f59e0b', color: '#000', fontWeight: 700, fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
            <ExternalLink size={12} /> LeetCode pe Solve Karo
          </a>

          <button onClick={() => {
            if (status === 'Solved') { unmark(numId, stub.patternId); }
            else { markSolved(numId, stub.difficulty as any, stub.patternId); }
          }} style={{
            padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12,
            background: status === 'Solved' ? 'var(--accent-bg)' : 'var(--accent)',
            color: status === 'Solved' ? 'var(--accent)' : '#fff',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            {status === 'Solved' ? <><CheckCircle2 size={12} /> Solved ✓</> : <><Circle size={12} /> Mark Solved</>}
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px' }}>

        {/* Pattern badge */}
        {patternData && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, padding: '12px 18px', background: patternData.color + '10', borderRadius: 12, border: `1px solid ${patternData.color}30` }}>
            <span style={{ fontSize: 22 }}>{patternData.icon}</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pattern</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: patternData.color }}>{patternData.name}</div>
            </div>
            <div style={{ flex: 1 }} />
            <Link href={`/patterns/${stub.patternId}`} style={{ fontSize: 12, color: 'var(--tx-3)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <BookOpen size={13} /> Pattern page →
            </Link>
          </div>
        )}

        {/* Open on LeetCode card */}
        <div style={{ padding: '20px 24px', background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--tx-1)', marginBottom: 6 }}>
              📖 Problem Statement
            </div>
            <div style={{ fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7, marginBottom: 12 }}>
              Full problem description, examples, aur constraints LeetCode pe available hain.
              Wahan padho, samjho, phir yahan wapis aao aur pattern identify karo.
            </div>
            <a href={leetcodeUrl} target="_blank" rel="noopener"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 20px', borderRadius: 10, background: '#f59e0b', color: '#000', fontWeight: 800, fontSize: 13, textDecoration: 'none' }}>
              <ExternalLink size={14} /> Open #{stub.id} on LeetCode →
            </a>
          </div>
          <div style={{ width: 80, height: 80, borderRadius: 16, background: '#f59e0b15', border: '1px solid #f59e0b30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, flexShrink: 0 }}>
            🔗
          </div>
        </div>

        {/* Pattern Info — Key Insight */}
        {patternData && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--tx-1)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Target size={18} color={patternData.color} />
              Pattern Analysis
            </div>

            {/* Why this pattern */}
            <div style={{ padding: '14px 18px', background: patternData.color + '10', borderRadius: 12, border: `1px solid ${patternData.color}30`, marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-4)', marginBottom: 6 }}>🎯 KYU YEH PATTERN?</div>
              <div style={{ fontSize: 14, color: 'var(--tx-1)', lineHeight: 1.7 }}>{patternData.why}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div style={{ padding: '14px 16px', background: 'var(--bg-surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-4)', marginBottom: 8 }}>🗂️ DATA STRUCTURE</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--tx-1)' }}>{patternData.ds}</div>
              </div>
              <div style={{ padding: '14px 16px', background: 'var(--bg-surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-4)', marginBottom: 8 }}>⏱️ COMPLEXITY</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>
                  <span style={{ color: patternData.color }}>Time: {patternData.complexity.time}</span>
                  <br />
                  <span style={{ color: 'var(--tx-3)', fontSize: 13 }}>Space: {patternData.complexity.space}</span>
                </div>
              </div>
            </div>

            {/* Key insight */}
            <div style={{ padding: '12px 18px', background: 'var(--bg-elevated)', borderRadius: 12, border: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 4 }}>KEY INSIGHT</div>
                <div style={{ fontSize: 14, color: 'var(--tx-1)', lineHeight: 1.6 }}>{patternData.keyInsight}</div>
              </div>
            </div>
          </div>
        )}

        {/* Optimal Approach — collapsible */}
        {patternData && (
          <div style={{ marginBottom: 20, borderRadius: 14, border: '1px solid var(--border)', overflow: 'hidden' }}>
            <button onClick={() => setShowApproach(!showApproach)}
              style={{ width: '100%', padding: '14px 18px', background: 'var(--bg-surface)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left' }}>
              <Code2 size={18} color={patternData.color} />
              <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--tx-1)', flex: 1 }}>Optimal Approach (No Brute Force!)</span>
              {showApproach ? <ChevronUp size={16} color="var(--tx-3)" /> : <ChevronDown size={16} color="var(--tx-3)" />}
            </button>
            {showApproach && (
              <div style={{ padding: '16px 18px', background: 'var(--bg-base)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 12, textTransform: 'uppercase' }}>Step-by-Step:</div>
                {patternData.approach.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: patternData.color + '20', border: `1.5px solid ${patternData.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: patternData.color, flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--tx-1)', fontFamily: step.startsWith(' ') ? 'monospace' : 'inherit', lineHeight: 1.6, paddingTop: 2 }}>{step.trim()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pattern Types — collapsible */}
        {patternTypes && patternTypes.types.length > 0 && (
          <div style={{ marginBottom: 20, borderRadius: 14, border: '1px solid var(--border)', overflow: 'hidden' }}>
            <button onClick={() => setShowTypes(!showTypes)}
              style={{ width: '100%', padding: '14px 18px', background: 'var(--bg-surface)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left' }}>
              <BookOpen size={18} color={patternData?.color ?? 'var(--accent)'} />
              <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--tx-1)', flex: 1 }}>
                {patternTypes.name} — {patternTypes.types.length} Types
              </span>
              {showTypes ? <ChevronUp size={16} color="var(--tx-3)" /> : <ChevronDown size={16} color="var(--tx-3)" />}
            </button>
            {showTypes && (
              <div style={{ padding: '16px 18px', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {patternTypes.types.map((t, i) => (
                  <div key={i} style={{ padding: '14px 16px', background: 'var(--bg-surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: patternData?.color ?? 'var(--accent)', marginBottom: 8 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--tx-2)', marginBottom: 4, lineHeight: 1.6 }}>{t.description}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
                      {t.triggers.slice(0, 4).map((tr, j) => (
                        <span key={j} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 12, background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--accent-bdr)' }}>{tr}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--tx-3)', fontFamily: 'monospace' }}>
                      T: {t.complexity.time} | S: {t.complexity.space}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Related Problems hint */}
        <div style={{ padding: '14px 18px', background: 'var(--bg-surface)', borderRadius: 12, border: '1px solid var(--border)', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx-2)', marginBottom: 8 }}>
            <Lightbulb size={14} style={{ display: 'inline', marginRight: 6 }} />
            Is problem ko solve karne ke baad
          </div>
          <div style={{ fontSize: 13, color: 'var(--tx-3)', lineHeight: 1.7 }}>
            → LeetCode pe solve karo → Wapas aao → "Mark Solved" karo<br/>
            → Is pattern ke aur questions practice karo →{' '}
            <Link href={`/patterns/${stub.patternId}`} style={{ color: 'var(--accent)', fontWeight: 700 }}>
              {patternData?.name ?? stub.patternName} pattern →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
