'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const SortingVisualizer = dynamic(() => import('@/components/visualizers/SortingVisualizer'), { ssr: false, loading: () => <Loading /> });
const BinarySearchVisualizer = dynamic(() => import('@/components/visualizers/BinarySearchVisualizer'), { ssr: false, loading: () => <Loading /> });
const TwoPointersVisualizer = dynamic(() => import('@/components/visualizers/TwoPointersVisualizer'), { ssr: false, loading: () => <Loading /> });
const SlidingWindowVisualizer = dynamic(() => import('@/components/visualizers/SlidingWindowVisualizer'), { ssr: false, loading: () => <Loading /> });
const LinkedListVisualizer = dynamic(() => import('@/components/visualizers/LinkedListVisualizer'), { ssr: false, loading: () => <Loading /> });
const TreeVisualizer = dynamic(() => import('@/components/visualizers/TreeVisualizer'), { ssr: false, loading: () => <Loading /> });
const GraphVisualizer = dynamic(() => import('@/components/visualizers/GraphVisualizer'), { ssr: false, loading: () => <Loading /> });
const StackQueueVisualizer = dynamic(() => import('@/components/visualizers/StackQueueVisualizer'), { ssr: false, loading: () => <Loading /> });

const Loading = () => <div style={{ padding: 40, textAlign: 'center', color: 'var(--tx-3)', fontSize: 13 }}>Loading visualizer...</div>;

const VISUALIZERS = [
  { id: 'sorting',        label: 'Sorting',         icon: '📊', desc: 'Bubble, Selection, Insertion, Merge, Quick' },
  { id: 'binary-search',  label: 'Binary Search',   icon: '🔍', desc: 'Step-by-step search on sorted array' },
  { id: 'two-pointers',   label: 'Two Pointers',    icon: '👆', desc: 'Left & right pointer movement' },
  { id: 'sliding-window', label: 'Sliding Window',  icon: '🪟', desc: 'Window expand & shrink animation' },
  { id: 'linked-list',    label: 'Linked List',     icon: '🔗', desc: 'Insert, delete, reverse, find middle' },
  { id: 'tree',           label: 'BST / Tree',      icon: '🌳', desc: 'Insert, search, inorder/preorder/postorder' },
  { id: 'graph',          label: 'Graph BFS/DFS',   icon: '🕸️', desc: 'Animated BFS and DFS traversal' },
  { id: 'stack-queue',    label: 'Stack & Queue',   icon: '📚', desc: 'Push/pop/enqueue/dequeue operations' },
];

export default function VisualizersPage() {
  const [active, setActive] = useState('sorting');
  const current = VISUALIZERS.find(v => v.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)', padding: '16px 24px' }}>
        <h1 style={{ fontSize: 18, fontWeight: 900, color: 'var(--tx-1)', margin: '0 0 3px' }}>⚡ Algorithm Visualizers</h1>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', margin: 0 }}>8 interactive visualizers — dekho kaise algorithms kaam karte hain</p>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: 200, flexShrink: 0, borderRight: '1px solid var(--border)', background: 'var(--bg-surface)', padding: 10, overflowY: 'auto' }}>
          {VISUALIZERS.map(v => (
            <button key={v.id} onClick={() => setActive(v.id)} style={{
              width: '100%', padding: '10px 12px', borderRadius: 10, marginBottom: 4, textAlign: 'left',
              cursor: 'pointer', border: 'none', transition: 'all 0.15s',
              background: active === v.id ? 'var(--accent-bg)' : 'transparent',
              color: active === v.id ? 'var(--accent)' : 'var(--tx-2)',
              outline: active === v.id ? '1px solid var(--accent-bdr)' : 'none',
            }}>
              <div style={{ fontSize: 16, marginBottom: 2 }}>{v.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{v.label}</div>
              <div style={{ fontSize: 10, color: active === v.id ? 'var(--accent)' : 'var(--tx-3)', marginTop: 2, opacity: 0.8 }}>{v.desc}</div>
            </button>
          ))}
        </div>

        {/* Visualizer area */}
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {active === 'sorting'        && <SortingVisualizer />}
          {active === 'binary-search'  && <BinarySearchVisualizer />}
          {active === 'two-pointers'   && <TwoPointersVisualizer />}
          {active === 'sliding-window' && <SlidingWindowVisualizer />}
          {active === 'linked-list'    && <LinkedListVisualizer />}
          {active === 'tree'           && <TreeVisualizer />}
          {active === 'graph'          && <GraphVisualizer />}
          {active === 'stack-queue'    && <StackQueueVisualizer />}
        </div>
      </div>
    </div>
  );
}
