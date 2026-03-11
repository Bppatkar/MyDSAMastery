'use client';

import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import PatternQuiz from '@/components/patterns/PatternQuiz';
import DecisionFlowchart from '@/components/patterns/DecisionFlowchart';

const KEYWORDS = [
  { pattern: 'Sliding Window', color: '#10b981', keywords: ['subarray', 'substring', 'window', 'consecutive', 'k-size', 'longest', 'shortest'] },
  { pattern: 'Two Pointers',   color: '#f59e0b', keywords: ['sorted pair', 'remove duplicates', 'reverse', 'palindrome', 'triplets'] },
  { pattern: 'Binary Search',  color: '#06b6d4', keywords: ['sorted', 'search', 'minimize max', 'maximize min', 'O(log n)'] },
  { pattern: 'Fast & Slow',    color: '#8b5cf6', keywords: ['cycle', 'linked list middle', 'happy number', 'detect loop'] },
  { pattern: 'Merge Intervals',color: '#ec4899', keywords: ['intervals', 'overlapping', 'meeting rooms', 'schedule'] },
  { pattern: 'Cyclic Sort',    color: '#14b8a6', keywords: ['1 to n', 'missing number', 'first missing', 'duplicate in range'] },
  { pattern: 'DFS',            color: '#22c55e', keywords: ['all paths', 'path sum', 'depth', 'islands', 'connected components'] },
  { pattern: 'BFS',            color: '#06b6d4', keywords: ['level order', 'shortest unweighted', 'rotting oranges', 'word ladder'] },
  { pattern: 'Topological Sort',color: '#f97316', keywords: ['prerequisites', 'course schedule', 'dependency', 'DAG'] },
  { pattern: 'Heap',           color: '#a855f7', keywords: ['k largest', 'k smallest', 'top k', 'kth', 'running median'] },
  { pattern: 'Backtracking',   color: '#ef4444', keywords: ['all subsets', 'all permutations', 'generate all', 'n-queens'] },
  { pattern: 'Dynamic Programming', color: '#6366f1', keywords: ['count ways', 'max profit', 'min cost', 'optimal'] },
  { pattern: 'Bit Manipulation',color: '#64748b', keywords: ['XOR', 'single number', 'power of 2', 'bitmask'] },
  { pattern: 'Trie',           color: '#0ea5e9', keywords: ['prefix', 'autocomplete', 'starts with', 'word search'] },
  { pattern: 'Union-Find',     color: '#84cc16', keywords: ['connected components', 'same group', 'MST', 'cycle undirected'] },
];

export default function PatternRecognitionPage() {
  const th = useTheme();
  const [tab, setTab] = useState<'quiz' | 'flowchart' | 'keywords' | 'guide'>('quiz');

  const TABS = [
    { id: 'quiz',      label: '🧪 Pattern Quiz' },
    { id: 'flowchart', label: '🗺️ Decision Tree' },
    { id: 'keywords',  label: '🔑 Keyword Triggers' },
    { id: 'guide',     label: '📖 4-Step Guide' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: th.bgBase, paddingBottom: 48 }}>
      <div style={{ background: th.bgSurface, borderBottom: `1px solid ${th.border}`, padding: '28px 28px 22px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: th.accentBg, border: `1px solid ${th.accentBdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🧠</div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: th.tx1, margin: 0 }}>Pattern Recognition</h1>
            <p style={{ fontSize: 12, color: th.tx3, margin: '3px 0 0' }}>100+ real LeetCode questions — pattern identify karna seekho</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: '0 auto', padding: '22px 20px' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 22, flexWrap: 'wrap' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id as any)} style={{
              padding: '7px 15px', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: tab === t.id ? th.accentBg : 'transparent',
              color: tab === t.id ? th.accent : th.tx3,
              border: `1px solid ${tab === t.id ? th.accentBdr : th.border}`,
            }}>{t.label}</button>
          ))}
        </div>

        {tab === 'quiz' && <PatternQuiz />}

        {tab === 'flowchart' && (
          <div style={{ background: th.bgCard, border: `1px solid ${th.border}`, borderRadius: 16, padding: 22 }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: th.tx1, margin: '0 0 6px' }}>🗺️ Pattern Decision Tree</h2>
            <p style={{ fontSize: 12, color: th.tx3, margin: '0 0 18px' }}>Hinglish mein questions ke jawab do — sahi DSA pattern identify hoga</p>
            <DecisionFlowchart />
          </div>
        )}

        {tab === 'keywords' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px,1fr))', gap: 10 }}>
            {KEYWORDS.map(({ pattern, color, keywords }) => (
              <div key={pattern} style={{ background: th.bgCard, border: `1px solid ${th.border}`, borderTop: `3px solid ${color}`, borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontWeight: 700, fontSize: 13, color, marginBottom: 8 }}>{pattern}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {keywords.map(k => (
                    <span key={k} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: `${color}12`, color, border: `1px solid ${color}28`, fontWeight: 600 }}>{k}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'guide' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 14 }}>
            {[
              { step: '01', icon: '📏', title: 'Constraints Padho', color: '#06b6d4', items: ['n ≤ 20 → Backtracking', 'n ≤ 10³ → O(n²) OK', 'n ≤ 10⁶ → O(n log n)', 'n ≤ 10⁹ → O(log n) only'] },
              { step: '02', icon: '📥', title: 'Input Format Dekho', color: '#10b981', items: ['Array sorted → Two Ptr/BS', 'Graph/Tree → DFS/BFS', 'Numbers 1–n → Cyclic Sort', 'String/prefix → Trie'] },
              { step: '03', icon: '📤', title: 'Output Type Socho', color: '#f97316', items: ['Boolean → DFS/Union-Find', 'Count/Min/Max → DP', 'All possibilities → Backtrack', 'Shortest path → BFS/Dijkstra'] },
              { step: '04', icon: '🔑', title: 'Keywords Dhundho', color: '#a855f7', items: ['"K largest" → Heap', '"Substring" → Sliding Window', '"Cycle" → Fast & Slow', '"Prerequisites" → Topo Sort'] },
            ].map(({ step, icon, title, color, items }) => (
              <div key={step} style={{ background: th.bgCard, border: `1px solid ${th.border}`, borderRadius: 14, padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 10, right: 14, fontSize: 24, fontWeight: 900, color: th.border, fontFamily: 'monospace', userSelect: 'none' }}>{step}</div>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontWeight: 800, fontSize: 14, color, marginBottom: 10 }}>{title}</div>
                {items.map(item => (
                  <div key={item} style={{ fontSize: 12.5, color: th.tx2, display: 'flex', gap: 7, lineHeight: 1.5, marginBottom: 6 }}>
                    <span style={{ color, fontWeight: 800, flexShrink: 0 }}>→</span>{item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}