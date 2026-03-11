'use client';
import { useState } from 'react';
import SortingVisualizer from '@/components/visualizers/SortingVisualizer';
import BinarySearchVisualizer from '@/components/visualizers/BinarySearchVisualizer';
import TwoPointersVisualizer from '@/components/visualizers/TwoPointersVisualizer';
import SlidingWindowVisualizer from '@/components/visualizers/SlidingWindowVisualizer';
import LinkedListVisualizer from '@/components/visualizers/LinkedListVisualizer';
import TreeVisualizer from '@/components/visualizers/TreeVisualizer';
import GraphVisualizer from '@/components/visualizers/GraphVisualizer';
import StackQueueVisualizer from '@/components/visualizers/StackQueueVisualizer';

const VISUALIZERS = [
  { id: 'sorting',        label: 'Sorting',         icon: '📊', desc: 'Bubble, Merge, Quick Sort' },
  { id: 'binary-search',  label: 'Binary Search',   icon: '🔍', desc: 'Step-by-step search' },
  { id: 'two-pointers',   label: 'Two Pointers',    icon: '👆', desc: 'Left/Right pointer movement' },
  { id: 'sliding-window', label: 'Sliding Window',  icon: '🪟', desc: 'Window expand/shrink' },
  { id: 'linked-list',    label: 'Linked List',     icon: '🔗', desc: 'Nodes & traversal' },
  { id: 'tree',           label: 'BST / Tree',      icon: '🌳', desc: 'Inorder, BFS, DFS' },
  { id: 'graph',          label: 'Graph BFS/DFS',   icon: '🕸️', desc: 'Graph traversal' },
  { id: 'stack-queue',    label: 'Stack & Queue',   icon: '📚', desc: 'Push/pop/enqueue' },
];

export default function VisualizersPage() {
  const [active, setActive] = useState('sorting');

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-base)', display:'flex', flexDirection:'column' }}>
      {/* Header */}
      <div style={{ borderBottom:'1px solid var(--border)', background:'var(--bg-surface)', padding:'20px 28px' }}>
        <h1 style={{ fontSize:20, fontWeight:900, color:'var(--tx-1)', margin:'0 0 4px' }}>⚡ Algorithm Visualizers</h1>
        <p style={{ fontSize:13, color:'var(--tx-3)', margin:0 }}>8 interactive visualizers — dekho kaise algorithms kaam karte hain</p>
      </div>

      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>
        {/* Sidebar tabs */}
        <div style={{ width:200, flexShrink:0, borderRight:'1px solid var(--border)', background:'var(--bg-surface)', padding:12, overflowY:'auto' }}>
          {VISUALIZERS.map(v => (
            <button key={v.id} onClick={() => setActive(v.id)} style={{
              width:'100%', padding:'10px 12px', borderRadius:10, marginBottom:4, textAlign:'left', cursor:'pointer', border:'none', transition:'all 0.15s',
              background: active===v.id ? 'var(--accent-bg)' : 'transparent',
              color: active===v.id ? 'var(--accent)' : 'var(--tx-2)',
              outline: active===v.id ? '1px solid var(--accent-bdr)' : 'none',
            }}>
              <div style={{ fontSize:16, marginBottom:2 }}>{v.icon}</div>
              <div style={{ fontSize:12, fontWeight:700 }}>{v.label}</div>
              <div style={{ fontSize:10, color:'var(--tx-3)', marginTop:2 }}>{v.desc}</div>
            </button>
          ))}
        </div>

        {/* Visualizer area */}
        <div style={{ flex:1, overflow:'auto', padding:24 }}>
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
