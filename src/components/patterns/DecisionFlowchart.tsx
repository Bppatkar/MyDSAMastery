'use client';

import { useState } from 'react';

interface QNode {
  id: string;
  type: 'start' | 'q' | 'ans';
  text: string;
  hint?: string;
  color?: string;
  yes?: string;
  no?: string;
}

const NODES: Record<string, QNode> = {
  start: { id: 'start', type: 'start', text: '🚀 Problem Shuru Karo!', hint: 'Pehle constraints aur examples padho. n ki size note karo.', yes: 'q_graph' },
  q_graph: { id: 'q_graph', type: 'q', text: 'Graph / Tree structure hai?', hint: 'Nodes + edges diye hain? Parent-child relation? "City road", "Course prereqs"?', yes: 'q_tree', no: 'q_sorted' },
  q_tree: { id: 'q_tree', type: 'q', text: 'Tree hai? (No cycle, connected)', hint: 'Binary Tree, BST, N-ary Tree? Ya general graph with cycles?', yes: 'a_dfs_tree', no: 'q_dag' },
  a_dfs_tree: { id: 'a_dfs_tree', type: 'ans', text: '🌲 DFS / BFS on Tree', hint: 'DFS → path sum, diameter, height. BFS → level order, right side view, zigzag.', color: '#22c55e' },
  q_dag: { id: 'q_dag', type: 'q', text: 'Directed Acyclic Graph hai? (No cycle)', hint: 'Dependency order chahiye? "Course finish karo", "Task scheduling"?', yes: 'a_topo', no: 'q_shortest' },
  a_topo: { id: 'a_topo', type: 'ans', text: '📊 Topological Sort', hint: "Kahn's algo (BFS + in-degree) ya DFS postorder. Cycle detect bhi isse hota hai.", color: '#f97316' },
  q_shortest: { id: 'q_shortest', type: 'q', text: 'Shortest path chahiye?', hint: '"Minimum cost", "Least steps", "Min time to reach"?', yes: 'q_weighted', no: 'q_connect' },
  q_weighted: { id: 'q_weighted', type: 'q', text: 'Graph weighted hai? (Edge costs hain?)', hint: 'Edges ke saath cost/weight diya hai? Ya sab edges equal hain?', yes: 'a_dijkstra', no: 'a_bfs_graph' },
  a_dijkstra: { id: 'a_dijkstra', type: 'ans', text: '⚡ Dijkstra / Bellman-Ford', hint: 'Dijkstra: O((V+E)logV) with min-heap. Bellman-Ford: negative weights ke liye.', color: '#3b82f6' },
  a_bfs_graph: { id: 'a_bfs_graph', type: 'ans', text: '🌊 BFS (Unweighted Shortest Path)', hint: 'BFS guarantees shortest path in unweighted graph. Queue use karo.', color: '#06b6d4' },
  q_connect: { id: 'q_connect', type: 'q', text: 'Connectivity / Group membership chahiye?', hint: '"Connected components", "Same group?", "Merge groups"?', yes: 'a_unionfind', no: 'a_dfs_graph' },
  a_unionfind: { id: 'a_unionfind', type: 'ans', text: '🔗 Union-Find (DSU)', hint: 'Path compression + union by rank. O(α(n)) ≈ O(1). Cycle detection bhi.', color: '#8b5cf6' },
  a_dfs_graph: { id: 'a_dfs_graph', type: 'ans', text: '🌳 DFS / BFS on Graph', hint: 'Islands count, flood fill, connected components, clone graph.', color: '#22c55e' },
  q_sorted: { id: 'q_sorted', type: 'q', text: 'Array sorted hai ya sort karke fayda hoga?', hint: 'Sorted input? Ya problem mention karta hai sorted array?', yes: 'q_binary', no: 'q_subarray' },
  q_binary: { id: 'q_binary', type: 'q', text: 'Single target dhundhna hai?', hint: '"Find element", "Search value", "Minimum possible answer"?', yes: 'a_bs', no: 'a_twoptr' },
  a_bs: { id: 'a_bs', type: 'ans', text: '🔍 Binary Search', hint: 'O(log n). Search on answer bhi try karo — "minimize max", "maximize min".', color: '#06b6d4' },
  a_twoptr: { id: 'a_twoptr', type: 'ans', text: '👆 Two Pointers', hint: 'Sorted array mein pairs, triplets, remove duplicates. Left + right pointer.', color: '#f59e0b' },
  q_subarray: { id: 'q_subarray', type: 'q', text: 'Subarray / Substring se related hai?', hint: '"Longest subarray", "Shortest substring", "Max sum", "Window"?', yes: 'q_window_size', no: 'q_all_poss' },
  q_window_size: { id: 'q_window_size', type: 'q', text: 'Window ki fixed size K di gayi hai?', hint: '"Size K subarray", "Every window of size K"?', yes: 'a_fixed_win', no: 'a_var_win' },
  a_fixed_win: { id: 'a_fixed_win', type: 'ans', text: '🪟 Sliding Window (Fixed K)', hint: 'Window slide karo. Running sum maintain karo. O(n).', color: '#10b981' },
  a_var_win: { id: 'a_var_win', type: 'ans', text: '🪟 Sliding Window (Variable)', hint: 'Expand right, shrink left when condition violate ho. Two pointers + hashmap.', color: '#10b981' },
  q_all_poss: { id: 'q_all_poss', type: 'q', text: '"Saari possibilities" generate karni hain?', hint: '"All subsets", "All permutations", "All paths", "Generate all valid"?', yes: 'a_backtrack', no: 'q_optimal' },
  a_backtrack: { id: 'a_backtrack', type: 'ans', text: '🎯 Backtracking', hint: 'Choose → Explore → Unchoose. Prune early. N-Queens, Sudoku, Word Search.', color: '#ef4444' },
  q_optimal: { id: 'q_optimal', type: 'q', text: '"Max/Min value" ya "Count ways" chahiye?', hint: 'Optimal solution? Overlapping subproblems hain? Same subproblem baar baar?', yes: 'a_dp', no: 'q_topk' },
  a_dp: { id: 'a_dp', type: 'ans', text: '🧠 Dynamic Programming', hint: 'State define karo → recurrence likho → base case set karo. Memo ya tabulation.', color: '#6366f1' },
  q_topk: { id: 'q_topk', type: 'q', text: '"K largest / K smallest / Top K" chahiye?', hint: '"Find K closest", "K frequent elements", "Kth largest"?', yes: 'a_heap', no: 'q_freq' },
  a_heap: { id: 'a_heap', type: 'ans', text: '⛰️ Heap / Priority Queue', hint: 'Min-heap of size K rakho. O(n log k). Python: heapq. JS: sorted array trick.', color: '#a855f7' },
  q_freq: { id: 'q_freq', type: 'q', text: 'Frequency / Lookup / "Seen before"?', hint: '"Count occurrences", "Two Sum", "Anagram", "Find duplicate"?', yes: 'a_hashmap', no: 'a_prefix' },
  a_hashmap: { id: 'a_hashmap', type: 'ans', text: '#️⃣ HashMap / HashSet', hint: 'O(1) lookup. Two Sum, Contains Duplicate, Group Anagrams, Word Frequency.', color: '#ec4899' },
  a_prefix: { id: 'a_prefix', type: 'ans', text: '∑ Prefix Sum / Other', hint: 'Range sum query, subarray sum = k, running total. Prefix[i] - prefix[j].', color: '#14b8a6' },
};

const TREE_ROWS = [
  { id: 'start', d: 0 }, { id: 'q_graph', d: 1, b: 'yes' },
  { id: 'q_tree', d: 2, b: 'yes' }, { id: 'a_dfs_tree', d: 3, b: 'yes' },
  { id: 'q_dag', d: 3, b: 'no' }, { id: 'a_topo', d: 4, b: 'yes' },
  { id: 'q_shortest', d: 4, b: 'no' }, { id: 'q_weighted', d: 5, b: 'yes' },
  { id: 'a_dijkstra', d: 6, b: 'yes' }, { id: 'a_bfs_graph', d: 6, b: 'no' },
  { id: 'q_connect', d: 5, b: 'no' }, { id: 'a_unionfind', d: 6, b: 'yes' },
  { id: 'a_dfs_graph', d: 6, b: 'no' }, { id: 'q_sorted', d: 2, b: 'no' },
  { id: 'q_binary', d: 3, b: 'yes' }, { id: 'a_bs', d: 4, b: 'yes' },
  { id: 'a_twoptr', d: 4, b: 'no' }, { id: 'q_subarray', d: 3, b: 'no' },
  { id: 'q_window_size', d: 4, b: 'yes' }, { id: 'a_fixed_win', d: 5, b: 'yes' },
  { id: 'a_var_win', d: 5, b: 'no' }, { id: 'q_all_poss', d: 4, b: 'no' },
  { id: 'a_backtrack', d: 5, b: 'yes' }, { id: 'q_optimal', d: 5, b: 'no' },
  { id: 'a_dp', d: 6, b: 'yes' }, { id: 'q_topk', d: 6, b: 'no' },
  { id: 'a_heap', d: 7, b: 'yes' }, { id: 'q_freq', d: 7, b: 'no' },
  { id: 'a_hashmap', d: 8, b: 'yes' }, { id: 'a_prefix', d: 8, b: 'no' },
];

export default function DecisionFlowchart() {
  const [cur, setCur] = useState('start');
  const [hist, setHist] = useState<string[]>([]);
  const [view, setView] = useState<'guide' | 'tree'>('guide');

  const node = NODES[cur];
  const isAns = node.type === 'ans';
  const isStart = node.type === 'start';

  const go = (ans: 'yes' | 'no') => {
    const next = ans === 'yes' ? node.yes : node.no;
    if (!next) return;
    setHist(h => [...h, cur]);
    setCur(next);
  };

  const S = {
    card: {
      borderRadius: 20, overflow: 'hidden',
      border: isAns ? `2px solid ${node.color}50` : '1px solid #1e1e2e',
      background: isAns ? `${node.color}09` : 'var(--bg-surface)',
    } as React.CSSProperties,
    pad: { padding: '28px 28px 24px' } as React.CSSProperties,
    h2: {
      fontSize: isAns ? 22 : 18, fontWeight: 800, lineHeight: 1.3,
      color: isAns ? node.color : 'var(--tx-1)', marginBottom: 10,
    } as React.CSSProperties,
    hint: {
      fontSize: 13, color: '#7a7a9a', lineHeight: 1.7,
      padding: '10px 14px', borderRadius: 10,
      background: 'var(--bg-base)', border: '1px solid var(--border)', marginTop: 10,
    } as React.CSSProperties,
    yesBtn: {
      padding: '14px 20px', borderRadius: 12, fontSize: 15, fontWeight: 700,
      cursor: 'pointer', border: 'none', textAlign: 'left' as const,
      display: 'flex', alignItems: 'center', gap: 12,
      background: 'rgba(16,185,129,0.10)', color: '#10b981', width: '100%',
    } as React.CSSProperties,
    noBtn: {
      padding: '14px 20px', borderRadius: 12, fontSize: 15, fontWeight: 700,
      cursor: 'pointer', border: 'none', textAlign: 'left' as const,
      display: 'flex', alignItems: 'center', gap: 12,
      background: 'rgba(239,68,68,0.09)', color: '#ef4444', width: '100%',
    } as React.CSSProperties,
    icon: (bg: string) => ({
      width: 30, height: 30, borderRadius: 8, background: bg,
      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 16, fontWeight: 900, flexShrink: 0,
    } as React.CSSProperties),
  };

  return (
    <div>
      {/* View Toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {[{ id: 'guide', l: '🎯 Step-by-Step Guide' }, { id: 'tree', l: '🗺️ Full Pattern Map' }].map(v => (
          <button key={v.id} onClick={() => setView(v.id as any)} style={{
            padding: '7px 18px', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: view === v.id ? 'rgba(16,185,129,0.12)' : 'transparent',
            color: view === v.id ? '#10b981' : 'var(--tx-3)',
            border: `1px solid ${view === v.id ? 'rgba(16,185,129,0.3)' : 'var(--border)'}`,
          }}>{v.l}</button>
        ))}
      </div>

      {/* GUIDE VIEW */}
      {view === 'guide' && (
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          {hist.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 16, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--tx-3)' }}>Path:</span>
              {hist.map((hid, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: 'var(--bg-elevated)', color: '#7a7a9a', border: '1px solid #1e1e2e' }}>
                    {NODES[hid].text.replace(/[🚀🌲📊⚡🔗🌊👆🪟🎯🧠⛰️∑🌳🔍]/g, '').trim().slice(0, 14)}
                  </span>
                  {i < hist.length - 1 && <span style={{ color: '#3a3a5e', fontSize: 10 }}>›</span>}
                </span>
              ))}
            </div>
          )}

          <div style={S.card}>
            {isAns && <div style={{ height: 4, background: node.color }} />}
            <div style={S.pad}>
              {/* Badge */}
              <div style={{ marginBottom: 16 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
                  padding: '3px 11px', borderRadius: 20,
                  background: isAns ? `${node.color}18` : 'var(--bg-elevated)',
                  color: isAns ? node.color : 'var(--tx-3)',
                  border: `1px solid ${isAns ? node.color + '35' : 'var(--border)'}`,
                }}>
                  {isAns ? '✓ PATTERN MILA!' : isStart ? 'START' : `Step ${hist.length + 1}`}
                </span>
              </div>

              <h2 style={S.h2}>{node.text}</h2>
              {node.hint && <div style={S.hint}>💡 {node.hint}</div>}

              <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {isStart && (
                  <button onClick={() => go('yes')} style={{ width: '100%', padding: 14, borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', border: 'none', background: '#10b981', color: '#fff' }}>
                    Shuru Karo! →
                  </button>
                )}

                {isAns && (
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button onClick={() => { setCur('start'); setHist([]); }} style={{ flex: 1, padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', border: 'none', background: node.color, color: '#fff', minWidth: 140 }}>
                      🔄 Naya Problem
                    </button>
                    <button onClick={() => { if (!hist.length) return; setCur(hist[hist.length - 1]); setHist(h => h.slice(0, -1)); }} style={{ flex: 1, padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', background: 'transparent', color: '#7a7a9a', border: '1px solid #1e1e2e', minWidth: 140 }}>
                      ← Wapas
                    </button>
                  </div>
                )}

                {!isStart && !isAns && (
                  <>
                    <button onClick={() => go('yes')} style={S.yesBtn}>
                      <span style={S.icon('#10b981')}>✓</span>
                      <span><strong>HAAN</strong> — Haan, ye wali condition hai</span>
                    </button>
                    <button onClick={() => go('no')} style={S.noBtn}>
                      <span style={S.icon('#ef4444')}>✗</span>
                      <span><strong>NAHI</strong> — Nahi, ye nahi hai</span>
                    </button>
                    {hist.length > 0 && (
                      <button onClick={() => { setCur(hist[hist.length - 1]); setHist(h => h.slice(0, -1)); }} style={{ padding: 10, borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', background: 'transparent', color: 'var(--tx-3)', border: '1px solid #1e1e2e' }}>
                        ← Pichla Question
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {!isAns && !isStart && (
            <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 10, fontSize: 12, background: 'var(--bg-base)', border: '1px dashed #1e1e2e', color: 'var(--tx-3)', textAlign: 'center' }}>
              ⚡ n≤20 → Backtrack | n≤10³ → O(n²) OK | n≤10⁶ → O(n) | n≤10⁹ → O(log n)
            </div>
          )}
        </div>
      )}

      {/* TREE VIEW */}
      {view === 'tree' && (
        <div style={{ overflowX: 'auto', paddingBottom: 16 }}>
          <div style={{ minWidth: 500 }}>
            {TREE_ROWS.map(({ id, d, b }) => {
              const n = NODES[id];
              const isA = n.type === 'ans';
              const isS = n.type === 'start';
              return (
                <div key={id} style={{ display: 'flex', alignItems: 'center', marginBottom: 5, paddingLeft: d * 22 }}>
                  {b && (
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: 6, flexShrink: 0 }}>
                      <div style={{ width: 16, height: 1, background: b === 'yes' ? '#10b981' : '#ef4444' }} />
                      <span style={{ fontSize: 9, fontWeight: 800, padding: '1px 5px', borderRadius: 3, background: b === 'yes' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.10)', color: b === 'yes' ? '#10b981' : '#ef4444' }}>
                        {b === 'yes' ? 'HAA' : 'NAA'}
                      </span>
                    </div>
                  )}
                  <button onClick={() => { setCur(id); setView('guide'); setHist([]); }} style={{
                    padding: '6px 13px', borderRadius: 9, fontSize: 12,
                    fontWeight: isA ? 700 : isS ? 800 : 500, cursor: 'pointer',
                    background: isS ? '#10b981' : isA ? `${n.color}18` : 'var(--bg-surface)',
                    border: isS ? 'none' : isA ? `1.5px solid ${n.color}30` : '1px solid #1e1e2e',
                    color: isS ? '#fff' : isA ? n.color : '#c8c8e8',
                    display: 'flex', alignItems: 'center', gap: 6,
                  } as any}>
                    {isA && <span style={{ width: 7, height: 7, borderRadius: '50%', background: n.color, flexShrink: 0 }} />}
                    {!isA && !isS && <span style={{ color: 'var(--tx-4)', fontSize: 9 }}>◆</span>}
                    {n.text.replace(/[🚀🌲📊⚡🔗🌊👆🪟🎯🧠⛰️∑🌳🔍]/g, '').trim()}
                  </button>
                </div>
              );
            })}
            <p style={{ marginTop: 20, fontSize: 11, color: 'var(--tx-4)', paddingLeft: 8 }}>
              💡 Kisi bhi node pe click karo → step-by-step guide wahan se start hoga
            </p>
          </div>
        </div>
      )}
    </div>
  );
}