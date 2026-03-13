'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const SortingVisualizer    = dynamic(() => import('@/components/visualizers/SortingVisualizer'),    { ssr: false, loading: () => <Loading /> });
const BinarySearchViz      = dynamic(() => import('@/components/visualizers/BinarySearchVisualizer'),{ ssr: false, loading: () => <Loading /> });
const TwoPointersViz       = dynamic(() => import('@/components/visualizers/TwoPointersVisualizer'), { ssr: false, loading: () => <Loading /> });
const SlidingWindowViz     = dynamic(() => import('@/components/visualizers/SlidingWindowVisualizer'),{ ssr: false, loading: () => <Loading /> });
const LinkedListViz        = dynamic(() => import('@/components/visualizers/LinkedListVisualizer'),  { ssr: false, loading: () => <Loading /> });
const TreeVisualizer       = dynamic(() => import('@/components/visualizers/TreeVisualizer'),        { ssr: false, loading: () => <Loading /> });
const GraphVisualizer      = dynamic(() => import('@/components/visualizers/GraphVisualizer'),       { ssr: false, loading: () => <Loading /> });
const StackQueueViz        = dynamic(() => import('@/components/visualizers/StackQueueVisualizer'),  { ssr: false, loading: () => <Loading /> });
const DPVisualizer         = dynamic(() => import('@/components/visualizers/DPVisualizer'),          { ssr: false, loading: () => <Loading /> });
const DijkstraVisualizer   = dynamic(() => import('@/components/visualizers/DijkstraVisualizer'),    { ssr: false, loading: () => <Loading /> });
const UnionFindVisualizer  = dynamic(() => import('@/components/visualizers/UnionFindVisualizer'),   { ssr: false, loading: () => <Loading /> });

const Loading = () => (
  <div style={{ padding: 60, textAlign: 'center', color: 'var(--tx-3)', fontSize: 14 }}>
    ⏳ Loading visualizer...
  </div>
);

const VISUALIZERS = [
  // ── Core Patterns (80/20) ──────────────────────────────
  { id: 'sorting',        label: 'Sorting',          icon: '📊', tag: 'Core', color: '#06b6d4',
    desc: 'Bubble → Selection → Insertion → Merge → Quick → Heap — sab ek jagah' },
  { id: 'binary-search',  label: 'Binary Search',    icon: '🔍', tag: 'Core', color: '#6366f1',
    desc: 'Step-by-step: mid → compare → eliminate half' },
  { id: 'two-pointers',   label: 'Two Pointers',     icon: '👆', tag: 'Core', color: '#f59e0b',
    desc: 'Left + right pointer movement — converge ya same direction' },
  { id: 'sliding-window', label: 'Sliding Window',   icon: '🪟', tag: 'Core', color: '#10b981',
    desc: 'Window expand karo, shrink karo — fixed ya variable size' },
  { id: 'dp',             label: 'DP Table',         icon: '🧩', tag: 'Core', color: '#8b5cf6',
    desc: 'Climbing Stairs, Coin Change, LCS — table fill hote dekho' },
  // ── Data Structures ───────────────────────────────────
  { id: 'linked-list',    label: 'Linked List',      icon: '🔗', tag: 'DS', color: '#ec4899',
    desc: 'Insert, delete, reverse, find middle' },
  { id: 'tree',           label: 'BST / Tree',       icon: '🌳', tag: 'DS', color: '#22c55e',
    desc: 'Inorder, Preorder, Postorder — DFS on tree' },
  { id: 'stack-queue',    label: 'Stack & Queue',    icon: '📚', tag: 'DS', color: '#f97316',
    desc: 'Push/pop, enqueue/dequeue — LIFO vs FIFO' },
  // ── Graph Algorithms ──────────────────────────────────
  { id: 'graph',          label: 'Graph BFS/DFS',    icon: '🌊', tag: 'Graph', color: '#3b82f6',
    desc: 'BFS = shortest (unweighted). DFS = explore all paths.' },
  { id: 'dijkstra',       label: 'Dijkstra',         icon: '🗺️', tag: 'Graph', color: '#6366f1',
    desc: 'Weighted shortest path — BFS nahi chalega, ye chalega' },
  { id: 'union-find',     label: 'Union-Find',       icon: '🔗', tag: 'Graph', color: '#84cc16',
    desc: 'Components track karo — O(α(n)) per op' },
];

export default function VisualizersPage() {
  const [active, setActive] = useState('sorting');
  const current = VISUALIZERS.find(v => v.id === active)!;

  const groups = [
    { label: 'Core Patterns', tag: 'Core' },
    { label: 'Data Structures', tag: 'DS' },
    { label: 'Graph Algorithms', tag: 'Graph' },
  ];

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ width: 200, flexShrink: 0, borderRight: '1px solid var(--border)', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '14px 12px 8px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--tx-1)' }}>⚡ Visualizers</div>
          <div style={{ fontSize: 11, color: 'var(--tx-4)', marginTop: 2 }}>11 algorithms</div>
        </div>
        <div style={{ padding: '8px 8px', flex: 1 }}>
          {groups.map(g => (
            <div key={g.tag}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-4)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '10px 6px 5px' }}>{g.label}</div>
              {VISUALIZERS.filter(v => v.tag === g.tag).map(v => (
                <button key={v.id} onClick={() => setActive(v.id)} style={{
                  width: '100%', padding: '9px 10px', borderRadius: 8, marginBottom: 2,
                  textAlign: 'left', cursor: 'pointer', border: 'none', transition: 'all 0.15s',
                  background: active === v.id ? v.color + '18' : 'transparent',
                  outline: active === v.id ? `1px solid ${v.color}40` : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontSize: 15 }}>{v.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: active === v.id ? v.color : 'var(--tx-2)' }}>{v.label}</span>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Header bar */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 22 }}>{current.icon}</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--tx-1)' }}>{current.label}</div>
            <div style={{ fontSize: 12, color: 'var(--tx-3)' }}>{current.desc}</div>
          </div>
        </div>
        {/* Visualizer area */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {active === 'sorting'        && <SortingVisualizer />}
          {active === 'binary-search'  && <BinarySearchViz />}
          {active === 'two-pointers'   && <TwoPointersViz />}
          {active === 'sliding-window' && <SlidingWindowViz />}
          {active === 'dp'             && <DPVisualizer />}
          {active === 'linked-list'    && <LinkedListViz />}
          {active === 'tree'           && <TreeVisualizer />}
          {active === 'stack-queue'    && <StackQueueViz />}
          {active === 'graph'          && <GraphVisualizer />}
          {active === 'dijkstra'       && <DijkstraVisualizer />}
          {active === 'union-find'     && <UnionFindVisualizer />}
        </div>
      </div>
    </div>
  );
}
