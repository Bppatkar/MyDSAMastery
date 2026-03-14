'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  RECOGNITION_CHALLENGES, CHALLENGES_BY_PATTERN, PATTERN_META_MAP, ALL_PATTERN_IDS,
  type RecognitionChallenge,
} from '@/lib/recognitionData';
import { PATTERN_TYPES, EXTRA_PATTERN_TYPES } from '@/lib/patternTypes';
import { DECISION_RULES, RULES_BY_PATTERN, type DecisionRule } from '@/lib/decisionMatrix';
import { ALL_QUESTION_STUBS } from '@/app/data/questions';
import { CheckCircle2, XCircle, ChevronRight, ExternalLink, Brain, Search, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const ALL_PATTERN_TYPES_DATA = [...PATTERN_TYPES, ...EXTRA_PATTERN_TYPES];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const DIFF_COLOR: Record<string, string> = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };
type Tab = 'trainer' | 'deep-guide' | 'pattern-types';

// ─── Step card — accordion, NO overflow:hidden on outer div ───────
function StepCard({ stepNum, revealed, onReveal, title, subtitle, icon, color, children }: {
  stepNum: number; revealed: boolean; onReveal: () => void;
  title: string; subtitle: string; icon: string; color: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      borderRadius: 12,
      border: `1px solid ${revealed ? color + '50' : 'var(--border)'}`,
      background: 'var(--bg-surface)',
      transition: 'border-color 0.3s',
    }}>
      <button onClick={revealed ? undefined : onReveal} style={{
        width: '100%', padding: '14px 16px', background: 'transparent', border: 'none',
        cursor: revealed ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
        borderRadius: 12,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
          background: revealed ? color : 'var(--bg-elevated)',
          border: `2px solid ${revealed ? color : 'var(--border)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, transition: 'all 0.3s',
        }}>
          {revealed ? icon : <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--tx-3)' }}>{stepNum}</span>}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: revealed ? color : 'var(--tx-2)' }}>{title}</div>
          <div style={{ fontSize: 12, color: 'var(--tx-4)', marginTop: 2 }}>{subtitle}</div>
        </div>
        {!revealed && (
          <div style={{ padding: '5px 14px', borderRadius: 20, background: color + '20', color, fontSize: 12, fontWeight: 700, border: `1px solid ${color}40`, whiteSpace: 'nowrap' }}>
            Dekho →
          </div>
        )}
      </button>

      {revealed && (
        <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${color}25` }}>
          <div style={{ height: 10 }} />
          {children}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 450 QUESTION TRAINER  
// Har question ka LeetCode link + constraints + keywords → pattern guess
// ═══════════════════════════════════════════════════════════════
const PATTERN_HINTS: Record<string, {
  n_hint: string; n_kyu: string;
  time_needed: string;
  input_hint: string;
  output_hint: string;
  keywords: string[];
  correct_pattern_name: string;
}> = {
  'sliding-window': {
    n_hint: 'n ≤ 10⁵ ya 10⁶ — matlab O(n) ya O(n log n) acceptable hai',
    n_kyu: 'Kyunki n=10⁶ mein O(n²) = 10¹² operations = TLE. O(n) = 10⁶ operations = AC ✅',
    time_needed: 'O(n)', input_hint: 'Array ya String diya hai',
    output_hint: 'Single max/min value ya length',
    keywords: ['subarray', 'substring', 'window', 'contiguous', 'consecutive', 'maximum sum'],
    correct_pattern_name: 'Sliding Window',
  },
  'two-pointers': {
    n_hint: 'n ≤ 10⁴ sorted array — O(n) ya O(n log n) chahiye',
    n_kyu: 'Sorted array mein O(n²) brute force slow hai. Two Pointers = O(n) mein pair dhundho ✅',
    time_needed: 'O(n)', input_hint: 'Sorted array ya string',
    output_hint: 'Pair/triplet ya in-place modification',
    keywords: ['sorted', 'pair', 'two sum', 'three sum', 'in-place', 'palindrome'],
    correct_pattern_name: 'Two Pointers',
  },
  'binary-search': {
    n_hint: 'n ≤ 10⁹ ya answer range bahut badi — O(log n) chahiye',
    n_kyu: 'n=10⁹ mein O(n) = 10⁹ operations = TLE. O(log n) = sirf 30 operations = AC ✅',
    time_needed: 'O(log n)', input_hint: 'Sorted array ya monotonic condition',
    output_hint: 'Index ya minimum/maximum value',
    keywords: ['sorted', 'search', 'find position', 'minimum k', 'log n'],
    correct_pattern_name: 'Binary Search',
  },
  'dfs': {
    n_hint: 'n ≤ 200-300 nodes ya grid — O(V+E) ya O(m×n) OK',
    n_kyu: 'Tree/graph mein har node ek baar visit karo = O(V+E). Recursion stack = O(h) space ✅',
    time_needed: 'O(V+E) ya O(m×n)', input_hint: 'Tree ya 2D grid',
    output_hint: 'Boolean, path, ya count',
    keywords: ['all paths', 'tree', 'grid', 'island', 'connected', 'backtrack'],
    correct_pattern_name: 'DFS',
  },
  'bfs': {
    n_hint: 'n ≤ 10⁴ graph/grid — O(V+E) chahiye',
    n_kyu: 'BFS queue mein har node sirf ek baar aata hai = O(V+E). Level = shortest distance ✅',
    time_needed: 'O(V+E)', input_hint: 'Graph ya grid',
    output_hint: 'Minimum steps ya shortest distance',
    keywords: ['shortest path', 'minimum steps', 'level order', 'nearest', 'spread'],
    correct_pattern_name: 'BFS',
  },
  'dynamic-programming': {
    n_hint: 'n ≤ 10³ ya 10⁴ — O(n²) ya O(n×W) OK',
    n_kyu: 'Overlapping subproblems mein recursion same cheez baar baar solve karta hai. DP memoize karta hai = O(n²) ✅',
    time_needed: 'O(n²) ya O(n)', input_hint: 'Array ya string',
    output_hint: 'Count, max/min single value',
    keywords: ['count ways', 'maximum', 'minimum', 'how many', 'subsequence', 'dp'],
    correct_pattern_name: 'Dynamic Programming',
  },
  'heap': {
    n_hint: 'n ≤ 10⁵, k given — O(n log k) chahiye',
    n_kyu: 'Sort karna O(n log n) — zyada slow. Heap size k maintain karo = O(n log k) — k << n to bahut fast ✅',
    time_needed: 'O(n log k)', input_hint: 'Unsorted array ya stream',
    output_hint: 'K largest/smallest elements ya kth element',
    keywords: ['k largest', 'k smallest', 'kth', 'top k', 'median', 'frequency'],
    correct_pattern_name: 'Heap / Priority Queue',
  },
  'topological-sort': {
    n_hint: 'n ≤ 2000 nodes, edges ≤ 5000 — O(V+E) OK',
    n_kyu: 'Dependencies ki ordering mein har node/edge ek baar process hoti hai = O(V+E) ✅',
    time_needed: 'O(V+E)', input_hint: 'Directed graph ya dependencies list',
    output_hint: 'Ordering ya boolean (cycle detect)',
    keywords: ['prerequisites', 'course schedule', 'order', 'dependency', 'cycle'],
    correct_pattern_name: 'Topological Sort',
  },
  'graph': {
    n_hint: 'n ≤ 10⁵ nodes — O(n α(n)) ≈ O(n) chahiye',
    n_kyu: 'Union-Find mein path compression + rank se har operation almost O(1) hota hai ✅',
    time_needed: 'O(n α(n)) ≈ O(n)', input_hint: 'Graph edges ya grid',
    output_hint: 'Components count ya boolean connectivity',
    keywords: ['connected components', 'union', 'cycle', 'group', 'provinces'],
    correct_pattern_name: 'Graph / Union-Find',
  },
  'subsets': {
    n_hint: 'n ≤ 15-20 — O(2^n) ya O(n!) OK',
    n_kyu: 'n ≤ 20 mein 2^20 = ~1M operations OK hai. n=40 hota to TLE. Small n = backtracking signal ✅',
    time_needed: 'O(2^n ya n!)', input_hint: 'Small array (n ≤ 20)',
    output_hint: 'List of all combinations/permutations/subsets',
    keywords: ['all subsets', 'all combinations', 'permutations', 'generate all', 'n queens'],
    correct_pattern_name: 'Backtracking',
  },
  'merge-intervals': {
    n_hint: 'n ≤ 10⁴ intervals — O(n log n) OK',
    n_kyu: 'Sort + single pass = O(n log n). Unsorted mein O(n²) comparison lagti. Sort karo ek baar, phir O(n) ✅',
    time_needed: 'O(n log n)', input_hint: 'Array of intervals [start, end]',
    output_hint: 'Merged intervals list',
    keywords: ['intervals', 'overlap', 'merge', 'schedule', 'meeting rooms'],
    correct_pattern_name: 'Merge Intervals',
  },
  'cyclic-sort': {
    n_hint: 'n numbers, values 1 to n range mein — O(n) chahiye',
    n_kyu: 'Har number sirf ek baar swap hota hai (apni correct position pe jaata hai) = O(n) total ✅',
    time_needed: 'O(n)', input_hint: '1 to n range ke numbers',
    output_hint: 'Missing ya duplicate number',
    keywords: ['missing number', 'duplicate', '1 to n', 'find missing', 'unsorted 1-n'],
    correct_pattern_name: 'Cyclic Sort',
  },
  'fast-slow-pointers': {
    n_hint: 'Linked list — O(n) aur O(1) space chahiye',
    n_kyu: 'Slow aur fast pointer: fast 2x speed se jaata hai, cycle mein hamesha milenge = O(n), O(1) space ✅',
    time_needed: 'O(n)', input_hint: 'Linked list',
    output_hint: 'Boolean (cycle) ya middle node',
    keywords: ['cycle', 'linked list', 'middle', 'loop', 'fast slow', 'floyd'],
    correct_pattern_name: 'Fast & Slow Pointers',
  },
  'bit-manipulation': {
    n_hint: 'n ≤ 10⁵ — O(n) ya O(1) chahiye',
    n_kyu: 'Bit operations CPU level pe hote hain — O(1) per operation. XOR: a^a=0 se duplicates cancel ✅',
    time_needed: 'O(n)', input_hint: 'Integer array',
    output_hint: 'Single integer (missing/unique)',
    keywords: ['single number', 'xor', 'bit', 'power of 2', 'count bits'],
    correct_pattern_name: 'Bit Manipulation',
  },
  'trie': {
    n_hint: 'Words ≤ 10⁴, length ≤ 1000 — O(L) per query',
    n_kyu: 'HashMap pe prefix check O(n) hogi. Trie mein prefix path follow karo = O(L) where L=word length ✅',
    time_needed: 'O(L) per query', input_hint: 'Array of strings',
    output_hint: 'Boolean (exists/prefix) ya list of words',
    keywords: ['prefix', 'autocomplete', 'search word', 'trie', 'starts with'],
    correct_pattern_name: 'Trie',
  },
};

function TrainerTab() {
  const [filterPattern, setFilterPattern] = useState('all');
  const [qIdx, setQIdx] = useState(0);
  const [revealedSteps, setRevealedSteps] = useState<Set<number>>(new Set());
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Use ALL_QUESTION_STUBS (450 questions) — with RECOGNITION_CHALLENGES for detailed step data
  const pool = useMemo(() => {
    const stubs = ALL_QUESTION_STUBS;
    if (filterPattern === 'all') return shuffle([...stubs]);
    return shuffle(stubs.filter(q => q.patternId === filterPattern));
  }, [filterPattern]);

  const stub = pool[qIdx % Math.max(pool.length, 1)];
  
  // Check if this question has detailed recognition data
  const detailQ = RECOGNITION_CHALLENGES.find(r => r.title === stub?.title) as RecognitionChallenge | undefined;
  const patternHint = PATTERN_HINTS[stub?.patternId ?? ''];

  // Options: correct pattern + 3 random others
  const options = useMemo(() => {
    if (!stub) return [];
    const correctId = stub.patternId;
    const otherIds = Object.keys(PATTERN_META_MAP).filter(p => p !== correctId);
    return shuffle([correctId, ...shuffle(otherIds).slice(0, 3)]);
  }, [stub]);

  const correctMeta = PATTERN_META_MAP[stub?.patternId ?? ''];
  const isCorrect = chosen === stub?.patternId;

  const revealStep = (n: number) => setRevealedSteps(prev => new Set([...prev, n]));
  const next = () => { setQIdx(i => i + 1); setRevealedSteps(new Set()); setChosen(null); };
  const reset = () => { setQIdx(0); setRevealedSteps(new Set()); setChosen(null); setScore({ correct: 0, total: 0 }); };
  const handleChoose = (p: string) => {
    if (chosen) return;
    setChosen(p);
    setScore(s => ({ correct: s.correct + (p === stub?.patternId ? 1 : 0), total: s.total + 1 }));
  };

  if (!stub) return null;
  const lcUrl = stub.leetcodeUrl || `https://leetcode.com/problems/${stub.slug}/`;
  const DIFF_C: Record<string, string> = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };

  // Step data — use detailed if available, otherwise use pattern hints
  const step1_n = detailQ?.step1.n_value ?? patternHint?.n_hint ?? 'Constraints dekho';
  const step1_kyu = patternHint?.n_kyu ?? 'Bade n ke liye algorithm ki efficiency important hoti hai';
  const step1_time = detailQ?.step1.time_needed ?? patternHint?.time_needed ?? '';
  const step2_input = detailQ?.step2.input_type ?? patternHint?.input_hint ?? 'Input type check karo';
  const step2_hints = detailQ?.step2.hints ?? [];
  const step3_output = detailQ?.step3.output_type ?? patternHint?.output_hint ?? 'Output type check karo';
  const step3_hints = detailQ?.step3.hints ?? [];
  const keywords = detailQ?.step4_keywords ?? patternHint?.keywords ?? stub.tags ?? [];

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 130px)', overflow: 'hidden' }}>

      {/* ══ LEFT: Problem (English — as-is from LeetCode) ══ */}
      <div style={{ width: '44%', flexShrink: 0, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Filter bar */}
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)', display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <select value={filterPattern} onChange={e => { setFilterPattern(e.target.value); setQIdx(0); setRevealedSteps(new Set()); setChosen(null); }}
            style={{ flex: 1, padding: '5px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 12 }}>
            <option value="all">Sab Questions ({ALL_QUESTION_STUBS.length})</option>
            {Object.entries(PATTERN_META_MAP).map(([k, v]) => (
              <option key={k} value={k}>{v.icon} {v.name} ({ALL_QUESTION_STUBS.filter(q => q.patternId === k).length})</option>
            ))}
          </select>
          <span style={{ fontSize: 12, color: 'var(--tx-4)', whiteSpace: 'nowrap' }}>#{qIdx % pool.length + 1}/{pool.length}</span>
          {score.total > 0 && (
            <span style={{ fontSize: 12, fontWeight: 700, color: score.correct / score.total >= 0.7 ? '#10b981' : '#ef4444' }}>
              {score.correct}/{score.total}
            </span>
          )}
          <button onClick={reset} style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--tx-3)', cursor: 'pointer', fontSize: 11 }}>Reset</button>
        </div>

        {/* Problem header */}
        <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid var(--border)', flexShrink: 0, background: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--tx-1)' }}>#{stub.id}. {stub.title}</span>
            <a href={lcUrl} target="_blank" rel="noopener" style={{ color: 'var(--tx-4)' }}><ExternalLink size={13} /></a>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: `${DIFF_C[stub.difficulty] ?? '#10b981'}20`, color: DIFF_C[stub.difficulty] ?? '#10b981', border: `1px solid ${DIFF_C[stub.difficulty] ?? '#10b981'}40` }}>
              {stub.difficulty}
            </span>
            <a href={lcUrl} target="_blank" rel="noopener"
              style={{ fontSize: 12, padding: '3px 12px', borderRadius: 12, background: '#f59e0b20', color: '#f59e0b', border: '1px solid #f59e0b40', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
              <ExternalLink size={11} /> LeetCode pe Padho
            </a>
          </div>
        </div>

        {/* Problem body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px' }}>
          {/* Tags as hints */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              🏷️ Tags
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {stub.tags.slice(0, 5).map((t, i) => (
                <span key={i} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 8, background: 'var(--bg-elevated)', color: 'var(--tx-3)', border: '1px solid var(--border)' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Pattern (hidden until answered) */}
          <div style={{ marginBottom: 16, padding: '12px 16px', background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 6 }}>🎯 PATTERN</div>
            {chosen ? (
              <div style={{ fontSize: 14, fontWeight: 800, color: correctMeta?.color }}>
                {correctMeta?.icon} {correctMeta?.name}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--tx-4)', fontStyle: 'italic' }}>
                Steps follow karo right side pe → pattern guess karo
              </div>
            )}
          </div>

          {/* Keywords to look for */}
          {keywords.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                🔑 Keywords to Notice
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {keywords.map((kw, i) => (
                  <span key={i} style={{
                    fontSize: 12, padding: '5px 12px', borderRadius: 20, fontWeight: 600,
                    background: chosen ? (correctMeta?.color ?? '#10b981') + '15' : 'var(--accent-bg)',
                    border: `1px solid ${chosen ? (correctMeta?.color ?? '#10b981') + '40' : 'var(--accent-bdr)'}`,
                    color: chosen ? correctMeta?.color : 'var(--accent)', transition: 'all 0.3s',
                  }}>{kw}</span>
                ))}
              </div>
            </div>
          )}

          {/* LeetCode link card */}
          <div style={{ padding: '12px 14px', background: '#f59e0b10', borderRadius: 10, border: '1px solid #f59e0b30', fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7 }}>
            📖 <strong>Pehle LeetCode pe problem padho</strong> — examples dekho, constraints samjho. Phir wapas aao aur right side ke steps follow karke pattern identify karo.
            <br/>
            <a href={lcUrl} target="_blank" rel="noopener" style={{ color: '#f59e0b', fontWeight: 700, textDecoration: 'none' }}>
              → #{stub.id} {stub.title} on LeetCode ↗
            </a>
          </div>
        </div>
      </div>

      {/* ══ RIGHT: 4 Steps (Hinglish) ══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-base)' }}>

        {/* Progress bar */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
          {[1, 2, 3, 4].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? 1 : 'none' }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${revealedSteps.has(s) ? 'var(--accent)' : 'var(--border)'}`,
                background: revealedSteps.has(s) ? 'var(--accent)' : 'var(--bg-elevated)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800,
                color: revealedSteps.has(s) ? '#fff' : 'var(--tx-3)',
                transition: 'all 0.3s',
              }}>{s}</div>
              {i < 3 && <div style={{ flex: 1, height: 2, background: revealedSteps.has(s + 1) ? 'var(--accent)' : 'var(--border)', margin: '0 6px', transition: 'all 0.3s' }} />}
            </div>
          ))}
          <span style={{ fontSize: 11, color: 'var(--tx-4)', marginLeft: 12, whiteSpace: 'nowrap' }}>
            {revealedSteps.size === 0 ? 'Step 1 se shuru karo 👆' : `${revealedSteps.size}/4 dekhe`}
          </span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* STEP 1: Constraints */}
          <StepCard stepNum={1} revealed={revealedSteps.has(1)} onReveal={() => revealStep(1)}
            title="Constraints dekho — kitna time milega?" subtitle="n ki value → allowed time complexity decide hoti hai" icon="🔢" color="#6366f1">
            <div style={{ fontSize: 15, fontWeight: 800, color: '#6366f1', marginBottom: 10, fontFamily: 'monospace' }}>
              {step1_n}
            </div>
            {step1_time && (
              <div style={{ fontSize: 14, color: 'var(--tx-1)', padding: '10px 14px', background: '#6366f115', borderRadius: 8, border: '1px solid #6366f130', marginBottom: 10, lineHeight: 1.7 }}>
                ✅ Time complexity chahiye: <strong style={{ color: '#6366f1' }}>{step1_time}</strong>
              </div>
            )}
            {/* KYU — the most important part */}
            <div style={{ fontSize: 13, padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)', lineHeight: 1.7, color: 'var(--tx-2)' }}>
              <strong style={{ color: '#6366f1' }}>🤔 Kyu?</strong> {step1_kyu}
            </div>
            {detailQ?.step1.eliminates?.map((e, i) => (
              <div key={i} style={{ fontSize: 13, color: '#ef4444', display: 'flex', gap: 8, marginTop: 8, lineHeight: 1.6 }}>
                <span style={{ flexShrink: 0 }}>❌</span><span><strong>Nahi chalega:</strong> {e}</span>
              </div>
            ))}
            {detailQ?.step1.allows?.map((a, i) => (
              <div key={i} style={{ fontSize: 13, color: '#10b981', display: 'flex', gap: 8, marginTop: 6, lineHeight: 1.6 }}>
                <span style={{ flexShrink: 0 }}>✅</span><span><strong>Consider karo:</strong> {a}</span>
              </div>
            ))}
          </StepCard>

          {/* STEP 2: Input Format */}
          <StepCard stepNum={2} revealed={revealedSteps.has(2)} onReveal={() => revealStep(2)}
            title="Input dekho — kaunsa pattern fit hoga?" subtitle="Input ka type → pattern narrow ho jaata hai" icon="📥" color="#f59e0b">
            <div style={{ fontSize: 16, fontWeight: 800, color: '#f59e0b', marginBottom: 10 }}>Input: {step2_input}</div>
            {step2_hints.length > 0 ? step2_hints.map((h, i) => (
              <div key={i} style={{ fontSize: 14, color: 'var(--tx-1)', padding: '10px 14px', marginBottom: 8, background: '#f59e0b10', borderRadius: 8, border: '1px solid #f59e0b25', display: 'flex', gap: 10, lineHeight: 1.7 }}>
                <span style={{ color: '#f59e0b', flexShrink: 0 }}>💡</span><span>{h}</span>
              </div>
            )) : (
              <div style={{ fontSize: 14, color: 'var(--tx-2)', padding: '10px 14px', background: '#f59e0b10', borderRadius: 8, border: '1px solid #f59e0b25', lineHeight: 1.7 }}>
                💡 Ye input type dekh ke socho: kaunse patterns is input ke saath kaam karte hain?
                <br/>Tags dekho: <strong style={{ color: '#f59e0b' }}>{stub.tags.join(', ')}</strong>
              </div>
            )}
          </StepCard>

          {/* STEP 3: Output Format */}
          <StepCard stepNum={3} revealed={revealedSteps.has(3)} onReveal={() => revealStep(3)}
            title="Output dekho — kya return karna hai?" subtitle="Output ka type → approach decide hoti hai" icon="📤" color="#10b981">
            <div style={{ fontSize: 16, fontWeight: 800, color: '#10b981', marginBottom: 10 }}>Output: {step3_output}</div>
            {step3_hints.length > 0 ? step3_hints.map((h, i) => (
              <div key={i} style={{ fontSize: 14, color: 'var(--tx-1)', padding: '10px 14px', marginBottom: 8, background: '#10b98110', borderRadius: 8, border: '1px solid #10b98125', display: 'flex', gap: 10, lineHeight: 1.7 }}>
                <span style={{ color: '#10b981', flexShrink: 0 }}>→</span><span>{h}</span>
              </div>
            )) : (
              <div style={{ fontSize: 14, color: 'var(--tx-2)', padding: '10px 14px', background: '#10b98110', borderRadius: 8, border: '1px solid #10b98125', lineHeight: 1.7 }}>
                → Output type aur constraints combine karo → pattern decide karo
              </div>
            )}
            {/* Keywords preview */}
            {keywords.length > 0 && (
              <div style={{ padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)', marginTop: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 6 }}>Ye keywords dikhein to seedha pattern pehchaan lo:</div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {keywords.slice(0, 6).map((kw, i) => (
                    <span key={i} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 5, background: 'var(--accent-bg)', color: 'var(--accent)', fontFamily: 'monospace', fontWeight: 600, border: '1px solid var(--accent-bdr)' }}>{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </StepCard>

          {/* STEP 4: Final Decision */}
          <StepCard stepNum={4} revealed={revealedSteps.has(4)} onReveal={() => revealStep(4)}
            title="Pattern + Algorithm — final decision!" subtitle="Kaunsa type, kaunsa DS, aur kyu?" icon="🎯" color="#ec4899">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '10px 0 12px' }}>
              <span style={{ fontSize: 24 }}>{correctMeta?.icon}</span>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: correctMeta?.color }}>{correctMeta?.name}</div>
                {detailQ && <div style={{ fontSize: 13, color: 'var(--tx-3)' }}>{detailQ.correct_type}</div>}
              </div>
            </div>
            {detailQ ? (
              <>
                <div style={{ fontSize: 14, color: 'var(--tx-1)', lineHeight: 1.8, marginBottom: 12, padding: '12px 16px', background: `${correctMeta?.color}10`, borderRadius: 10, border: `1px solid ${correctMeta?.color}30` }}>
                  <strong>Kyu ye pattern?</strong> {detailQ.why_pattern}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                  <div style={{ padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 4 }}>DATA STRUCTURE</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx-1)' }}>{detailQ.correct_ds}</div>
                  </div>
                  <div style={{ padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 4 }}>COMPLEXITY</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>
                      <span style={{ color: correctMeta?.color }}>T: {detailQ.time_complexity}</span>
                      <span style={{ color: 'var(--tx-4)', margin: '0 5px' }}>|</span>
                      <span style={{ color: 'var(--tx-2)' }}>S: {detailQ.space_complexity}</span>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '12px 14px', background: 'var(--bg-base)', borderRadius: 8, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 8 }}>APPROACH:</div>
                  <pre style={{ margin: 0, fontSize: 12, color: 'var(--tx-1)', lineHeight: 1.8, fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {detailQ.approach_line}
                  </pre>
                </div>
              </>
            ) : (
              <div style={{ fontSize: 14, color: 'var(--tx-2)', lineHeight: 1.8, padding: '12px 16px', background: `${correctMeta?.color}10`, borderRadius: 10, border: `1px solid ${correctMeta?.color}30` }}>
                <strong>Pattern:</strong> {correctMeta?.name}
                <br/>Is pattern ke saath practice karo →{' '}
                <Link href={`/patterns/${stub.patternId}`} style={{ color: correctMeta?.color, fontWeight: 700 }}>
                  {correctMeta?.name} page →
                </Link>
              </div>
            )}
          </StepCard>

          {/* Guess */}
          <div style={{ padding: '16px', background: 'var(--bg-surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--tx-1)', marginBottom: 12, textAlign: 'center' }}>
              {chosen ? (isCorrect ? '🎉 Sahi jawab!' : '❌ Galat — sahi jawab ye hai:') : '🤔 Ab batao — kaunsa pattern hai?'}
            </div>
            {!chosen ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {options.map(p => {
                  const m = PATTERN_META_MAP[p];
                  return (
                    <button key={p} onClick={() => handleChoose(p)} style={{
                      padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border)',
                      background: 'var(--bg-base)', cursor: 'pointer', textAlign: 'left',
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontSize: 13, color: 'var(--tx-1)', fontWeight: 600, transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.border = `1px solid ${m?.color}60`; el.style.background = `${m?.color}10`; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.border = '1px solid var(--border)'; el.style.background = 'var(--bg-base)'; }}
                    >
                      <span style={{ fontSize: 18 }}>{m?.icon}</span><span>{m?.name}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div>
                <div style={{ padding: '12px 16px', borderRadius: 10, background: isCorrect ? '#10b98115' : '#ef444415', border: `1px solid ${isCorrect ? '#10b98140' : '#ef444440'}`, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                  {isCorrect ? <CheckCircle2 size={22} color="#10b981" /> : <XCircle size={22} color="#ef4444" />}
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: isCorrect ? '#10b981' : '#ef4444' }}>
                      {isCorrect ? 'Bilkul sahi! ✅' : 'Galat ❌'}
                    </div>
                    {!isCorrect && (
                      <div style={{ fontSize: 13, color: 'var(--tx-2)', marginTop: 2 }}>
                        Sahi: {correctMeta?.icon} <strong>{correctMeta?.name}</strong>
                      </div>
                    )}
                  </div>
                </div>
                <button onClick={next} style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  Agla Question <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// DEEP GUIDE TAB
// ════════════════════════════════════════════════════════
function DeepGuideTab() {
  const [search, setSearch] = useState('');
  const [selPattern, setSelPattern] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let rules = DECISION_RULES as DecisionRule[];
    if (selPattern !== 'all') rules = rules.filter(r => r.pattern === selPattern);
    if (search.trim()) {
      const q = search.toLowerCase();
      rules = rules.filter(r =>
        r.input_signals.join(' ').toLowerCase().includes(q) ||
        r.keyword_signals.join(' ').toLowerCase().includes(q) ||
        r.pattern.toLowerCase().includes(q) ||
        r.mental_model.toLowerCase().includes(q)
      );
    }
    return rules;
  }, [search, selPattern]);

  const patternOptions = [...new Set(DECISION_RULES.map((r: DecisionRule) => r.pattern))];

  return (
    <div style={{ padding: '20px 24px', overflowY: 'auto', height: 'calc(100vh - 170px)' }}>
      <div style={{ background: 'var(--accent-bg)', borderRadius: 12, border: '1px solid var(--accent-bdr)', padding: '12px 18px', marginBottom: 20 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--accent)', marginBottom: 4 }}>📊 Deep Decision Guide — {DECISION_RULES.length} Rules</div>
        <div style={{ fontSize: 13, color: 'var(--tx-2)' }}>Har rule: kab lagao, kyu lagao, kya galti mat karo — Hinglish mein</div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--tx-4)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pattern, keyword..."
            style={{ width: '100%', padding: '8px 10px 8px 32px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 13, boxSizing: 'border-box' }} />
        </div>
        <select value={selPattern} onChange={e => setSelPattern(e.target.value)}
          style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 12 }}>
          <option value="all">Sab Patterns</option>
          {patternOptions.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((rule: DecisionRule) => {
          const meta = PATTERN_META_MAP[rule.pattern] ?? { color: '#10b981', icon: '🔹', name: rule.pattern };
          const isOpen = expanded === rule.id;
          return (
            <div key={rule.id} style={{ borderRadius: 12, border: `1px solid ${isOpen ? meta.color + '40' : 'var(--border)'}`, background: 'var(--bg-surface)', transition: 'border-color 0.2s' }}>
              <button onClick={() => setExpanded(isOpen ? null : rule.id)}
                style={{ width: '100%', padding: '14px 18px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{meta.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--tx-1)' }}>{rule.mental_model}</div>
                  <div style={{ fontSize: 12, color: meta.color, fontWeight: 600, marginTop: 2 }}>{meta.name} → {rule.pattern_type}</div>
                </div>
                {isOpen ? <ChevronUp size={16} color="var(--tx-3)" /> : <ChevronDown size={16} color="var(--tx-3)" />}
              </button>
              {isOpen && (
                <div style={{ padding: '0 18px 18px', borderTop: `1px solid ${meta.color}20` }}>
                  <div style={{ paddingTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 8 }}>📡 INPUT SIGNALS (kab dikhte hain)</div>
                      {rule.input_signals.map((s: string, i: number) => (
                        <div key={i} style={{ fontSize: 13, color: 'var(--tx-1)', padding: '3px 0', display: 'flex', gap: 6, lineHeight: 1.5 }}><span style={{ color: meta.color }}>•</span>{s}</div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 8 }}>🔑 KEYWORDS (question mein dekho)</div>
                      {rule.keyword_signals.map((s: string, i: number) => (
                        <div key={i} style={{ fontSize: 13, color: 'var(--tx-1)', padding: '3px 0', fontFamily: 'monospace', display: 'flex', gap: 6, lineHeight: 1.5 }}><span style={{ color: meta.color }}>•</span>{s}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: '10px 14px', background: meta.color + '10', borderRadius: 8, border: `1px solid ${meta.color}25`, marginBottom: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 6 }}>🧠 APPROACH (JavaScript)</div>
                    <pre style={{ margin: 0, fontSize: 12, color: 'var(--tx-1)', lineHeight: 1.8, fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{rule.approach}</pre>
                  </div>
                  <div style={{ padding: '10px 14px', background: '#ef444410', borderRadius: 8, border: '1px solid #ef444425' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', marginBottom: 4 }}>⚠️ COMMON MISTAKE (ye mat karo)</div>
                    <div style={{ fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.6 }}>{rule.wrong_choice}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// PATTERN TYPES TAB
// ════════════════════════════════════════════════════════
function PatternTypesTab() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ padding: '20px 24px', overflowY: 'auto', height: 'calc(100vh - 170px)' }}>
      <div style={{ background: 'var(--accent-bg)', borderRadius: 12, border: '1px solid var(--accent-bdr)', padding: '12px 18px', marginBottom: 20 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--accent)', marginBottom: 4 }}>
          🗂️ Pattern Types — {ALL_PATTERN_TYPES_DATA.length} Patterns
        </div>
        <div style={{ fontSize: 13, color: 'var(--tx-2)' }}>
          Har pattern ke types — triggers dekho → DS choose karo → approach samjho → question solve karo
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ALL_PATTERN_TYPES_DATA.map(pat => {
          const meta = PATTERN_META_MAP[pat.id] ?? { color: pat.color ?? 'var(--accent)', icon: pat.icon ?? '🔹', name: pat.name };
          const isOpen = expanded === pat.id;
          const types = pat.types ?? [];
          return (
            <div key={pat.id} style={{ borderRadius: 12, border: `1px solid ${isOpen ? meta.color + '40' : 'var(--border)'}`, background: 'var(--bg-surface)', transition: 'border-color 0.2s' }}>
              <button onClick={() => setExpanded(isOpen ? null : pat.id)}
                style={{ width: '100%', padding: '14px 18px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                <span style={{ fontSize: 24 }}>{meta.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--tx-1)' }}>{meta.name}</div>
                  <div style={{ fontSize: 12, color: meta.color, marginTop: 2, fontWeight: 600 }}>{types.length} types • Click karo → details dekho</div>
                </div>
                {isOpen ? <ChevronUp size={16} color="var(--tx-3)" /> : <ChevronDown size={16} color="var(--tx-3)" />}
              </button>
              {isOpen && (
                <div style={{ padding: '0 18px 18px', borderTop: `1px solid ${meta.color}20` }}>
                  <div style={{ paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {types.length === 0 ? (
                      <div style={{ fontSize: 13, color: 'var(--tx-4)', padding: '10px 0' }}>Ye pattern ka alag type nahi hota — seedha use karo.</div>
                    ) : types.map((sub, si) => (
                      <div key={si} style={{ padding: '14px 16px', background: meta.color + '08', borderRadius: 10, border: `1px solid ${meta.color}25` }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: meta.color, marginBottom: 8 }}>{sub.name}</div>
                        {sub.description && <div style={{ fontSize: 13, color: 'var(--tx-2)', marginBottom: 8, lineHeight: 1.6 }}>{sub.description}</div>}
                        {sub.triggers?.length > 0 && (
                          <div style={{ marginBottom: 8 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)' }}>🎯 Kab use karo: </span>
                            <span style={{ fontSize: 12, color: 'var(--tx-2)' }}>{Array.isArray(sub.triggers) ? sub.triggers.join(' | ') : sub.triggers}</span>
                          </div>
                        )}
                        {sub.dataStructure && (
                          <div style={{ marginBottom: 8 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)' }}>🗂️ Data Structure: </span>
                            <span style={{ fontSize: 12, color: 'var(--tx-1)', fontWeight: 700 }}>{sub.dataStructure}</span>
                          </div>
                        )}
                        {sub.approach && (
                          <div style={{ background: 'var(--bg-base)', borderRadius: 8, padding: '8px 12px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 4 }}>APPROACH:</div>
                            <div style={{ fontSize: 12, color: 'var(--tx-1)', fontFamily: 'monospace', lineHeight: 1.7 }}>{sub.approach}</div>
                          </div>
                        )}
                        <div style={{ fontSize: 11, color: 'var(--tx-4)', marginTop: 8, fontFamily: 'monospace' }}>
                          Time: {sub.complexity?.time} | Space: {sub.complexity?.space}
                        </div>
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
  );
}

// ════════════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════════════
export default function PatternRecognitionPage() {
  const [tab, setTab] = useState<Tab>('trainer');
  const tabs = [
    { id: 'trainer' as Tab, label: '🎯 Pattern Trainer' },
    { id: 'deep-guide' as Tab, label: '📖 Decision Guide' },
    { id: 'pattern-types' as Tab, label: '🗂️ Pattern Types' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 24px 0', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--accent-bg)', border: '1px solid var(--accent-bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={20} color="var(--accent)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--tx-1)' }}>Pattern Recognition Training</div>
            <div style={{ fontSize: 12, color: 'var(--tx-3)' }}>
              {ALL_QUESTION_STUBS.length} LeetCode problems · {DECISION_RULES.length} decision rules · Hinglish mein
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Link href="/algorithms" style={{ fontSize: 11, padding: '4px 12px', borderRadius: 16, background: 'var(--bg-elevated)', color: 'var(--tx-3)', border: '1px solid var(--border)', textDecoration: 'none', fontWeight: 600 }}>⚡ Algorithms</Link>
            <Link href="/patterns" style={{ fontSize: 11, padding: '4px 12px', borderRadius: 16, background: 'var(--bg-elevated)', color: 'var(--tx-3)', border: '1px solid var(--border)', textDecoration: 'none', fontWeight: 600 }}>📚 Patterns</Link>
            <Link href="/practice" style={{ fontSize: 11, padding: '4px 12px', borderRadius: 16, background: 'var(--bg-elevated)', color: 'var(--tx-3)', border: '1px solid var(--border)', textDecoration: 'none', fontWeight: 600 }}>💻 Practice</Link>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--border)', marginLeft: -24, marginRight: -24, paddingLeft: 24 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '10px 18px', background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 600,
              color: tab === t.id ? 'var(--accent)' : 'var(--tx-3)',
              borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent',
              transition: 'all 0.2s',
            }}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {tab === 'trainer' && <TrainerTab />}
        {tab === 'deep-guide' && <DeepGuideTab />}
        {tab === 'pattern-types' && <PatternTypesTab />}
      </div>
    </div>
  );
}
