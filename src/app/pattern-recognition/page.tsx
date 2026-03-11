'use client';
import { useState, useMemo } from 'react';
import { DSA_PATTERNS } from '@/lib/constants';
import { PATTERN_TYPES, getPatternTypes } from '@/lib/patternTypes';
import { RECOGNITION_CHALLENGES, RECOGNITION_BY_PATTERN, type RecognitionChallenge } from '@/lib/recognitionData';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Lightbulb, Brain, BookOpen, Target, Zap, AlertCircle } from 'lucide-react';

type Tab = 'trainer' | 'pattern-types' | 'keywords' | 'cheatsheet';

// ─── Helpers ────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PATTERN_NAME: Record<string, string> = Object.fromEntries(DSA_PATTERNS.map(p => [p.id, p.name]));
const PATTERN_COLOR: Record<string, string> = Object.fromEntries(DSA_PATTERNS.map(p => [p.id, p.color]));
const PATTERN_ICON: Record<string, string> = Object.fromEntries(DSA_PATTERNS.map(p => [p.id, p.icon]));

const DIFF_COLOR: Record<string, string> = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };

// ─── KEYWORD TRIGGERS reference ─────────────────────────────────
const KEYWORD_TRIGGERS = [
  { pattern: 'Sliding Window', color: '#10b981', triggers: ['subarray of size k', 'longest substring', 'window', 'contiguous subarray', 'without repeating', 'at most k distinct', 'maximum/minimum in each window'] },
  { pattern: 'Two Pointers', color: '#f59e0b', triggers: ['sorted array + pair sum', 'in-place remove', 'palindrome check', 'container water', 'triplets summing to', 'remove duplicates'] },
  { pattern: 'Binary Search', color: '#6366f1', triggers: ['sorted array + search', 'O(log n)', 'minimize maximum', 'maximize minimum', 'first/last occurrence', 'find kth position'] },
  { pattern: 'Fast & Slow Pointers', color: '#8b5cf6', triggers: ['cycle in linked list', 'middle of linked list', 'happy number', 'detect loop', 'cycle start node'] },
  { pattern: 'Merge Intervals', color: '#ec4899', triggers: ['overlapping intervals', 'merge intervals', 'meeting rooms', 'minimum rooms', 'insert interval'] },
  { pattern: 'Cyclic Sort', color: '#06b6d4', triggers: ['array values 1..n', 'missing number', 'find duplicate 1..n', 'first missing positive'] },
  { pattern: 'DFS', color: '#22c55e', triggers: ['all paths', 'root to leaf', 'all permutations/subsets/combos', 'number of islands', 'path sum', 'connected components'] },
  { pattern: 'BFS', color: '#3b82f6', triggers: ['level order traversal', 'shortest path (unweighted)', 'minimum steps', 'word ladder', 'rotting oranges'] },
  { pattern: 'Topological Sort', color: '#f97316', triggers: ['prerequisites', 'course schedule', 'dependency order', 'can finish', 'valid ordering', 'DAG'] },
  { pattern: 'Heap', color: '#a855f7', triggers: ['k largest/smallest', 'top k', 'kth element', 'running median', 'merge k sorted lists'] },
  { pattern: 'Backtracking', color: '#ef4444', triggers: ['generate all subsets', 'all permutations', 'combination sum', 'n-queens', 'sudoku solver'] },
  { pattern: 'Dynamic Programming', color: '#6366f1', triggers: ['count ways', 'max profit', 'minimum cost', 'longest subsequence', 'can you reach', 'optimal choices'] },
  { pattern: 'Bit Manipulation', color: '#64748b', triggers: ['single number (others appear twice)', 'XOR', 'power of 2', 'bitmask DP', 'count set bits'] },
  { pattern: 'Trie', color: '#0ea5e9', triggers: ['starts with prefix', 'autocomplete', 'word dictionary', 'prefix search', 'word search II'] },
  { pattern: 'Union-Find / Graph', color: '#84cc16', triggers: ['connected components', 'same group', 'shortest path weighted (Dijkstra)', 'minimum spanning tree'] },
];

// ─── DECISION CHEATSHEET ─────────────────────────────────────────
const CHEATSHEET = [
  {
    question: 'Is the input a sorted array?',
    patterns: [
      { cond: 'Find pair/triplet sum', ans: 'Two Pointers (Opposite Ends)' },
      { cond: 'Find target / O(log n)', ans: 'Binary Search' },
      { cond: 'Remove duplicates in-place', ans: 'Two Pointers (Same Direction)' },
    ],
  },
  {
    question: 'Is the input a string or array with a window/subarray constraint?',
    patterns: [
      { cond: 'Fixed size k', ans: 'Sliding Window (Fixed)' },
      { cond: 'Longest with at most k distinct / without repeating', ans: 'Sliding Window (Variable)' },
      { cond: 'Maximum in each window', ans: 'Sliding Window + Monotonic Deque' },
    ],
  },
  {
    question: 'Is it a tree/graph traversal?',
    patterns: [
      { cond: 'Level by level / shortest unweighted', ans: 'BFS' },
      { cond: 'All paths / path sum / backtrack', ans: 'DFS' },
      { cond: 'Weighted shortest path', ans: 'Dijkstra (Heap + BFS)' },
      { cond: 'Dependencies / ordering', ans: 'Topological Sort' },
      { cond: 'Connected components / union', ans: 'Union-Find' },
    ],
  },
  {
    question: 'Are you choosing k elements or counting optimal choices?',
    patterns: [
      { cond: 'k largest / k smallest / top k', ans: 'Heap / Priority Queue' },
      { cond: 'All subsets / permutations / combinations', ans: 'Backtracking / DFS' },
      { cond: 'Count ways / min cost / max profit', ans: 'Dynamic Programming' },
    ],
  },
  {
    question: 'Input has values in range [1..n]?',
    patterns: [
      { cond: 'Find missing number or duplicate', ans: 'Cyclic Sort' },
    ],
  },
  {
    question: 'Linked list problem?',
    patterns: [
      { cond: 'Cycle detection / middle', ans: 'Fast & Slow Pointers' },
    ],
  },
  {
    question: 'Problem asks about "minimize maximum" or "feasibility"?',
    patterns: [
      { cond: 'Monotonic feasibility function', ans: 'Binary Search on Answer Space' },
    ],
  },
  {
    question: 'String/word prefix or autocomplete?',
    patterns: [
      { cond: 'starts with / autocomplete / multiple word queries', ans: 'Trie' },
    ],
  },
  {
    question: 'Single unique element / O(1) space constraint?',
    patterns: [
      { cond: 'Others appear even times', ans: 'Bit Manipulation (XOR)' },
    ],
  },
];

// ================================================================
// TRAINER COMPONENT
// ================================================================
function TrainerTab() {
  const [filterPattern, setFilterPattern] = useState<string>('all');
  const [queueIndex, setQueueIndex] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);
  const [showFull, setShowFull] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);

  const pool = useMemo(() => {
    const base = filterPattern === 'all'
      ? RECOGNITION_CHALLENGES
      : RECOGNITION_BY_PATTERN[filterPattern] ?? [];
    return shuffle(base);
  }, [filterPattern]);

  const q = pool[queueIndex % Math.max(pool.length, 1)];

  // Build answer options: correct + 3 random wrong patterns
  const options = useMemo(() => {
    if (!q) return [];
    const others = DSA_PATTERNS.filter(p => p.id !== q.correctPattern).map(p => p.id);
    const wrong = shuffle(others).slice(0, 3);
    return shuffle([q.correctPattern, ...wrong]);
  }, [q, queueIndex]);

  const handleAnswer = (patternId: string) => {
    if (answered !== null) return;
    setAnswered(patternId);
    const correct = patternId === q.correctPattern;
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    if (!correct) setWrongGuesses(prev => [...new Set([...prev, q.correctPattern])]);
  };

  const next = () => {
    setAnswered(null);
    setShowFull(false);
    setQueueIndex(i => i + 1);
  };

  const reset = () => {
    setAnswered(null);
    setShowFull(false);
    setQueueIndex(0);
    setScore({ correct: 0, total: 0 });
    setWrongGuesses([]);
  };

  if (!q) return <div style={{ padding: 40, color: 'var(--tx-3)', textAlign: 'center' }}>No questions found.</div>;

  const isCorrect = answered === q.correctPattern;
  const correctColor = PATTERN_COLOR[q.correctPattern] || 'var(--accent)';

  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      {/* Main trainer */}
      <div style={{ flex: 1 }}>
        {/* Score + filter bar */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
          <select value={filterPattern} onChange={e => { setFilterPattern(e.target.value); setQueueIndex(0); setAnswered(null); setScore({ correct: 0, total: 0 }); }}
            style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 12 }}>
            <option value="all">All Patterns</option>
            {DSA_PATTERNS.map(p => (
              <option key={p.id} value={p.id}>{p.icon} {p.name} ({(RECOGNITION_BY_PATTERN[p.id] ?? []).length} q)</option>
            ))}
          </select>
          <div style={{ padding: '5px 12px', borderRadius: 8, background: 'var(--bg-elevated)', border: '1px solid var(--border)', fontSize: 12, color: 'var(--tx-2)' }}>
            Score: <span style={{ color: 'var(--accent)', fontWeight: 800 }}>{score.correct}/{score.total}</span>
            {score.total > 0 && <span style={{ marginLeft: 6, color: 'var(--tx-3)' }}> ({Math.round(score.correct / score.total * 100)}%)</span>}
          </div>
          <button onClick={reset} style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--tx-2)', cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
            <RotateCcw size={11} /> Reset
          </button>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--tx-4)' }}>#{queueIndex % pool.length + 1} / {pool.length}</span>
        </div>

        {/* Problem card */}
        <div style={{ background: 'var(--bg-surface)', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 16 }}>
          {/* Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Brain size={16} color="var(--accent)" />
            <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--tx-1)' }}>{q.title}</span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 12, background: `${DIFF_COLOR[q.difficulty]}20`, color: DIFF_COLOR[q.difficulty] }}>{q.difficulty}</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--tx-3)' }}>Q{q.id}</span>
          </div>

          {/* Problem body */}
          <div style={{ padding: '20px 20px 16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <div style={{ background: 'var(--bg-base)', borderRadius: 10, padding: 12, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 5 }}>📥 Input</div>
                <div style={{ fontSize: 12, color: 'var(--tx-1)', lineHeight: 1.6 }}>{q.inputDesc}</div>
              </div>
              <div style={{ background: 'var(--bg-base)', borderRadius: 10, padding: 12, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 5 }}>📤 Output</div>
                <div style={{ fontSize: 12, color: 'var(--tx-1)', lineHeight: 1.6 }}>{q.outputDesc}</div>
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 6 }}>⚡ Constraints</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {q.constraints.map((c, i) => (
                  <span key={i} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--tx-2)', fontFamily: 'monospace' }}>{c}</span>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 6 }}>🔑 Keywords in Problem</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {q.keywords.map((kw, i) => (
                  <span key={i} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: answered ? `${correctColor}15` : 'var(--accent-bg)', border: `1px solid ${answered ? correctColor + '40' : 'var(--accent-bdr)'}`, color: answered ? correctColor : 'var(--accent)', fontWeight: 600 }}>{kw}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Question */}
          <div style={{ padding: '14px 20px', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx-1)' }}>
              🤔 Which pattern should you use to solve this?
            </div>
          </div>
        </div>

        {/* Answer options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {options.map(patternId => {
            const name = PATTERN_NAME[patternId];
            const color = PATTERN_COLOR[patternId];
            const icon = PATTERN_ICON[patternId];
            const isSelected = answered === patternId;
            const isRight = patternId === q.correctPattern;

            let bg = 'var(--bg-surface)', borderColor = 'var(--border)', textColor = 'var(--tx-1)';
            if (answered !== null) {
              if (isRight) { bg = `${color}15`; borderColor = color; textColor = color; }
              else if (isSelected && !isRight) { bg = '#ef444415'; borderColor = '#ef4444'; textColor = '#ef4444'; }
              else { bg = 'var(--bg-surface)'; }
            }

            return (
              <button key={patternId} onClick={() => handleAnswer(patternId)} disabled={answered !== null}
                style={{ padding: '14px 16px', borderRadius: 12, border: `2px solid ${borderColor}`, background: bg, color: textColor, cursor: answered !== null ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{name}</div>
                </div>
                {answered !== null && isRight && <CheckCircle2 size={18} style={{ marginLeft: 'auto', flexShrink: 0 }} />}
                {answered !== null && isSelected && !isRight && <XCircle size={18} style={{ marginLeft: 'auto', flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>

        {/* Explanation (after answer) */}
        {answered !== null && (
          <div style={{ background: isCorrect ? `${correctColor}10` : '#ef444410', borderRadius: 14, border: `1px solid ${isCorrect ? correctColor + '40' : '#ef444440'}`, padding: 18, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              {isCorrect
                ? <CheckCircle2 size={18} color={correctColor} />
                : <XCircle size={18} color="#ef4444" />}
              <span style={{ fontWeight: 800, fontSize: 14, color: isCorrect ? correctColor : '#ef4444' }}>
                {isCorrect ? 'Correct! ✅' : `Wrong — Correct answer: ${PATTERN_ICON[q.correctPattern]} ${PATTERN_NAME[q.correctPattern]}`}
              </span>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 4 }}>Why this pattern?</div>
              <div style={{ fontSize: 13, color: 'var(--tx-1)', lineHeight: 1.7 }}>{q.whyThisPattern}</div>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 4 }}>🔑 Key Trigger Words</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {q.keyTriggers.map((t, i) => (
                  <span key={i} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: `${correctColor}20`, color: correctColor, fontWeight: 700, border: `1px solid ${correctColor}40` }}>"{t}"</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <div style={{ background: 'var(--bg-base)', borderRadius: 8, padding: 10, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 3 }}>Pattern Type</div>
                <div style={{ fontSize: 12, color: 'var(--tx-1)', fontWeight: 600 }}>{q.correctType}</div>
              </div>
              <div style={{ background: 'var(--bg-base)', borderRadius: 8, padding: 10, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 3 }}>Data Structure</div>
                <div style={{ fontSize: 12, color: 'var(--tx-1)', fontWeight: 600 }}>{q.correctDS}</div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-base)', borderRadius: 8, padding: 10, border: '1px solid var(--border)', marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 3 }}>Approach (1 line)</div>
              <div style={{ fontSize: 12, color: 'var(--tx-1)', fontFamily: 'monospace', lineHeight: 1.6 }}>{q.approach}</div>
            </div>

            <div style={{ fontSize: 11, color: 'var(--tx-3)' }}>⏱ Time: <span style={{ color: 'var(--tx-1)', fontWeight: 700 }}>{q.timeComplexity}</span></div>
          </div>
        )}

        {answered !== null && (
          <button onClick={next} style={{ width: '100%', padding: '12px 0', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'var(--accent)', color: '#fff', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            Next Question <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Sidebar: weak patterns */}
      {score.total >= 3 && (
        <div style={{ width: 200, flexShrink: 0 }}>
          <div style={{ background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border)', padding: 14 }}>
            <div style={{ fontWeight: 800, fontSize: 12, color: 'var(--tx-1)', marginBottom: 10 }}>📊 Session Stats</div>
            <div style={{ fontSize: 11, color: 'var(--tx-3)', marginBottom: 4 }}>Accuracy</div>
            <div style={{ fontWeight: 800, fontSize: 22, color: score.correct / score.total >= 0.7 ? '#10b981' : '#ef4444', marginBottom: 10 }}>
              {Math.round(score.correct / score.total * 100)}%
            </div>
            {wrongGuesses.length > 0 && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 6 }}>⚠️ Review These</div>
                {wrongGuesses.map(pid => (
                  <div key={pid} style={{ fontSize: 11, padding: '5px 8px', borderRadius: 6, background: '#ef444415', color: '#ef4444', marginBottom: 4, fontWeight: 600 }}>{PATTERN_ICON[pid]} {PATTERN_NAME[pid]}</div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ================================================================
// PATTERN TYPES TAB
// ================================================================
function PatternTypesTab() {
  const [selectedPattern, setSelectedPattern] = useState(PATTERN_TYPES[0].id);
  const [selectedType, setSelectedType] = useState<number>(0);

  const pw = PATTERN_TYPES.find(p => p.id === selectedPattern)!;
  const pt = pw.types[selectedType];

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {/* Pattern list */}
      <div style={{ width: 200, flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 8, padding: '0 4px' }}>Patterns</div>
        {PATTERN_TYPES.map(p => (
          <button key={p.id} onClick={() => { setSelectedPattern(p.id); setSelectedType(0); }}
            style={{ width: '100%', textAlign: 'left', padding: '9px 12px', borderRadius: 10, marginBottom: 3, border: 'none', cursor: 'pointer', transition: 'all 0.15s', background: selectedPattern === p.id ? `${p.color}15` : 'transparent', color: selectedPattern === p.id ? p.color : 'var(--tx-2)', outline: selectedPattern === p.id ? `1px solid ${p.color}40` : 'none', display: 'flex', alignItems: 'center', gap: 7 }}>
            <span>{p.icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontSize: 10, opacity: 0.7 }}>{p.types.length} types</div>
            </div>
          </button>
        ))}
      </div>

      {/* Types for selected pattern */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {pw.types.map((t, i) => (
            <button key={i} onClick={() => setSelectedType(i)} style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${selectedType === i ? pw.color : 'var(--border)'}`, background: selectedType === i ? `${pw.color}15` : 'transparent', color: selectedType === i ? pw.color : 'var(--tx-2)', fontWeight: selectedType === i ? 700 : 500, fontSize: 12, cursor: 'pointer' }}>
              {t.name}
            </button>
          ))}
        </div>

        {/* Type detail card */}
        <div style={{ background: 'var(--bg-surface)', borderRadius: 14, border: `1px solid ${pw.color}40`, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', background: `${pw.color}10`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>{pw.icon}</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--tx-1)' }}>{pt.name}</div>
              <div style={{ fontSize: 11, color: 'var(--tx-3)' }}>{pw.name} → {pt.name}</div>
            </div>
          </div>

          <div style={{ padding: 20 }}>
            <p style={{ fontSize: 13, color: 'var(--tx-1)', lineHeight: 1.7, marginBottom: 16 }}>{pt.description}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ background: 'var(--bg-base)', borderRadius: 10, padding: 14, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 8 }}>🔑 Trigger Words</div>
                {pt.triggers.map((t, i) => (
                  <div key={i} style={{ fontSize: 11, padding: '4px 0', color: 'var(--tx-2)', borderBottom: i < pt.triggers.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', gap: 6 }}>
                    <span style={{ color: pw.color }}>→</span>"{t}"
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--bg-base)', borderRadius: 10, padding: 14, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 8 }}>🗄️ Data Structure</div>
                <div style={{ fontSize: 12, color: 'var(--tx-1)', fontWeight: 600, marginBottom: 12 }}>{pt.dataStructure}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 4 }}>⏱ Complexity</div>
                <div style={{ fontSize: 11, color: 'var(--tx-2)' }}>Time: <span style={{ color: pw.color, fontWeight: 700 }}>{pt.complexity.time}</span></div>
                <div style={{ fontSize: 11, color: 'var(--tx-2)' }}>Space: <span style={{ color: pw.color, fontWeight: 700 }}>{pt.complexity.space}</span></div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-base)', borderRadius: 10, padding: 14, border: '1px solid var(--border)', marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 6 }}>📐 Approach</div>
              <div style={{ fontSize: 12, color: 'var(--tx-1)', fontFamily: 'monospace', lineHeight: 1.7 }}>{pt.approach}</div>
            </div>

            <div style={{ background: `${pw.color}10`, borderRadius: 10, padding: 14, border: `1px solid ${pw.color}30` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: pw.color, textTransform: 'uppercase', marginBottom: 5 }}>💡 Classic Example</div>
              <div style={{ fontSize: 12, color: 'var(--tx-1)', lineHeight: 1.7 }}>{pt.example}</div>
            </div>
          </div>
        </div>

        {/* Mini quiz for this pattern */}
        <div style={{ marginTop: 12, background: 'var(--bg-surface)', borderRadius: 12, border: '1px solid var(--border)', padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-2)', marginBottom: 8 }}>📝 Problems using "{pt.name}"</div>
          {(RECOGNITION_BY_PATTERN[selectedPattern] ?? []).filter(q => q.correctType === pt.name).length > 0
            ? (RECOGNITION_BY_PATTERN[selectedPattern] ?? []).filter(q => q.correctType === pt.name).map(q => (
              <div key={q.id} style={{ fontSize: 11, padding: '5px 0', borderBottom: '1px solid var(--border)', color: 'var(--tx-2)', display: 'flex', gap: 8 }}>
                <span style={{ color: DIFF_COLOR[q.difficulty], fontWeight: 700, minWidth: 45 }}>{q.difficulty}</span>
                <span>{q.title}</span>
              </div>
            ))
            : <div style={{ fontSize: 11, color: 'var(--tx-4)', fontStyle: 'italic' }}>Practice problems for this type will appear here</div>
          }
        </div>
      </div>
    </div>
  );
}

// ================================================================
// KEYWORDS TAB
// ================================================================
function KeywordsTab() {
  const [search, setSearch] = useState('');
  const filtered = search
    ? KEYWORD_TRIGGERS.filter(k => k.triggers.some(t => t.toLowerCase().includes(search.toLowerCase())) || k.pattern.toLowerCase().includes(search.toLowerCase()))
    : KEYWORD_TRIGGERS;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search keyword or pattern..." style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 13, boxSizing: 'border-box' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
        {filtered.map((k, i) => (
          <div key={i} style={{ background: 'var(--bg-surface)', borderRadius: 12, border: `1px solid ${k.color}30`, overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', background: `${k.color}12`, borderBottom: `1px solid ${k.color}25`, fontWeight: 800, fontSize: 13, color: k.color }}>{k.pattern}</div>
            <div style={{ padding: '10px 14px' }}>
              {k.triggers.map((t, j) => (
                <div key={j} style={{ fontSize: 11, padding: '4px 0', color: 'var(--tx-2)', borderBottom: j < k.triggers.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', gap: 6 }}>
                  <span style={{ color: k.color, flexShrink: 0 }}>→</span>
                  <span style={search && t.toLowerCase().includes(search.toLowerCase()) ? { color: 'var(--tx-1)', fontWeight: 700 } : {}}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// CHEATSHEET TAB
// ================================================================
function CheatsheetTab() {
  return (
    <div>
      <div style={{ background: 'var(--accent-bg)', borderRadius: 12, border: '1px solid var(--accent-bdr)', padding: '12px 16px', marginBottom: 16, fontSize: 12, color: 'var(--tx-2)', lineHeight: 1.7 }}>
        <strong style={{ color: 'var(--accent)' }}>How to use:</strong> When you see a new problem, go through these questions top to bottom. First matching condition = your pattern.
      </div>
      {CHEATSHEET.map((section, i) => (
        <div key={i} style={{ background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: 'var(--accent)', color: '#fff', width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
            <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--tx-1)' }}>{section.question}</span>
          </div>
          <div style={{ padding: '8px 0' }}>
            {section.patterns.map((p, j) => (
              <div key={j} style={{ padding: '8px 16px', display: 'flex', gap: 10, alignItems: 'flex-start', borderBottom: j < section.patterns.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: 11, color: 'var(--tx-3)', fontFamily: 'monospace', marginTop: 1, minWidth: 8 }}>↳</span>
                <span style={{ fontSize: 12, color: 'var(--tx-2)', flex: 1 }}>If: <span style={{ color: 'var(--tx-1)' }}>{p.cond}</span></span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--accent-bdr)', whiteSpace: 'nowrap' }}>{p.ans}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ================================================================
// MAIN PAGE
// ================================================================
export default function PatternRecognitionPage() {
  const [tab, setTab] = useState<Tab>('trainer');

  const TABS = [
    { id: 'trainer' as Tab,       label: '🎯 Pattern Trainer',    desc: 'Identify patterns from problem descriptions' },
    { id: 'pattern-types' as Tab, label: '🗂️ Pattern Types',      desc: 'Subtypes within each pattern' },
    { id: 'keywords' as Tab,      label: '🔑 Keyword Triggers',   desc: 'Words that reveal the pattern' },
    { id: 'cheatsheet' as Tab,    label: '📋 Decision Guide',     desc: 'Step-by-step pattern selection' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '24px 28px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-bg)', border: '1px solid var(--accent-bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🧠</div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 900, color: 'var(--tx-1)', margin: 0 }}>Pattern Recognition Training</h1>
              <p style={{ fontSize: 12, color: 'var(--tx-3)', margin: '2px 0 0' }}>
                {RECOGNITION_CHALLENGES.length} challenges · 15 patterns · Learn to identify DS & pattern from problem description alone
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 0 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '10px 18px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: tab === t.id ? 'var(--accent)' : 'var(--tx-3)', borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent', transition: 'all 0.15s' }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px' }}>
        {tab === 'trainer'       && <TrainerTab />}
        {tab === 'pattern-types' && <PatternTypesTab />}
        {tab === 'keywords'      && <KeywordsTab />}
        {tab === 'cheatsheet'    && <CheatsheetTab />}
      </div>
    </div>
  );
}
