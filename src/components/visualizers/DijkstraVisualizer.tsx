'use client';
import { useState, useRef, useCallback } from 'react';

// ── Graph Data ───────────────────────────────────────────────
const GRAPHS = {
  simple: {
    name: 'Simple (6 nodes)',
    nodes: [
      { id: 0, x: 80,  y: 160, label: 'A' },
      { id: 1, x: 220, y: 80,  label: 'B' },
      { id: 2, x: 220, y: 240, label: 'C' },
      { id: 3, x: 360, y: 80,  label: 'D' },
      { id: 4, x: 360, y: 240, label: 'E' },
      { id: 5, x: 480, y: 160, label: 'F' },
    ],
    edges: [
      { u: 0, v: 1, w: 4 }, { u: 0, v: 2, w: 2 },
      { u: 1, v: 2, w: 5 }, { u: 1, v: 3, w: 10 },
      { u: 2, v: 4, w: 3 }, { u: 3, v: 5, w: 4 },
      { u: 4, v: 3, w: 4 }, { u: 4, v: 5, w: 6 },
    ],
  },
  medium: {
    name: 'Medium (7 nodes)',
    nodes: [
      { id: 0, x: 80,  y: 200, label: 'S' },
      { id: 1, x: 220, y: 80,  label: 'A' },
      { id: 2, x: 220, y: 320, label: 'B' },
      { id: 3, x: 360, y: 80,  label: 'C' },
      { id: 4, x: 360, y: 320, label: 'D' },
      { id: 5, x: 480, y: 180, label: 'E' },
      { id: 6, x: 580, y: 200, label: 'T' },
    ],
    edges: [
      { u: 0, v: 1, w: 7 }, { u: 0, v: 2, w: 9 },
      { u: 1, v: 3, w: 10 }, { u: 1, v: 2, w: 4 },
      { u: 2, v: 4, w: 2 }, { u: 3, v: 5, w: 5 },
      { u: 4, v: 5, w: 6 }, { u: 5, v: 6, w: 3 },
      { u: 3, v: 6, w: 8 },
    ],
  },
};

type GraphKey = keyof typeof GRAPHS;

interface NodeState {
  dist: number;
  visited: boolean;
  prev: number | null;
  inQueue: boolean;
}

const INF = 1e9;

export default function DijkstraVisualizer() {
  const [graphKey, setGraphKey] = useState<GraphKey>('simple');
  const [start, setStart] = useState(0);
  const [nodeStates, setNodeStates] = useState<NodeState[]>([]);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [relaxingEdge, setRelaxingEdge] = useState<[number, number] | null>(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const speed = useRef(700);

  const graph = GRAPHS[graphKey];
  const sleep = () => new Promise(r => setTimeout(r, speed.current));

  const reset = useCallback(() => {
    setNodeStates([]);
    setCurrentNode(null);
    setRelaxingEdge(null);
    setRunning(false);
    setDone(false);
    setLog([]);
  }, []);

  const run = async () => {
    setRunning(true);
    setDone(false);
    setLog([]);
    const n = graph.nodes.length;

    // Build adjacency list
    const adj: { v: number; w: number }[][] = Array.from({ length: n }, () => []);
    for (const e of graph.edges) {
      adj[e.u].push({ v: e.v, w: e.w });
      adj[e.v].push({ v: e.u, w: e.w });
    }

    const dist = new Array(n).fill(INF);
    const visited = new Array(n).fill(false);
    const prev = new Array(n).fill(null);
    dist[start] = 0;

    const toState = (): NodeState[] => graph.nodes.map((_, i) => ({
      dist: dist[i], visited: visited[i], prev: prev[i], inQueue: !visited[i] && dist[i] < INF,
    }));

    setNodeStates(toState());
    addLog(`Start: node ${graph.nodes[start].label}, dist[${graph.nodes[start].label}]=0`);
    await sleep();

    for (let iter = 0; iter < n; iter++) {
      // Find min dist unvisited
      let u = -1;
      for (let i = 0; i < n; i++) {
        if (!visited[i] && dist[i] < INF) {
          if (u === -1 || dist[i] < dist[u]) u = i;
        }
      }
      if (u === -1) break;

      visited[u] = true;
      setCurrentNode(u);
      addLog(`Process: ${graph.nodes[u].label} (dist=${dist[u]})`);
      setNodeStates(toState());
      await sleep();

      // Relax edges
      for (const { v, w } of adj[u]) {
        if (visited[v]) continue;
        setRelaxingEdge([u, v]);
        const newDist = dist[u] + w;
        if (newDist < dist[v]) {
          dist[v] = newDist;
          prev[v] = u;
          addLog(`  Relax ${graph.nodes[u].label}→${graph.nodes[v].label}: dist[${graph.nodes[v].label}]=${newDist}`);
          setNodeStates(toState());
        }
        await sleep();
        setRelaxingEdge(null);
      }
    }

    setCurrentNode(null);
    setNodeStates(toState());
    setRunning(false);
    setDone(true);
    addLog('✅ Dijkstra complete!');
  };

  const addLog = (msg: string) => setLog(prev => [...prev, msg]);

  const getPath = (to: number): number[] => {
    if (nodeStates.length === 0 || nodeStates[to]?.dist === INF) return [];
    const path: number[] = [];
    let cur: number | null = to;
    while (cur !== null) {
      path.unshift(cur);
      cur = nodeStates[cur]?.prev ?? null;
    }
    return path;
  };

  const isPathEdge = (u: number, v: number, path: number[]) => {
    for (let i = 0; i < path.length - 1; i++) {
      if ((path[i] === u && path[i+1] === v) || (path[i] === v && path[i+1] === u)) return true;
    }
    return false;
  };

  const endPath = done ? getPath(graph.nodes.length - 1) : [];

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--tx-1)', marginBottom: 6 }}>🗺️ Dijkstra — Shortest Path (Weighted)</h2>
      <p style={{ fontSize: 13, color: 'var(--tx-3)', marginBottom: 16 }}>Weighted graph mein shortest path — BFS nahi chalega, Dijkstra chahiye!</p>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        <select value={graphKey} onChange={e => { setGraphKey(e.target.value as GraphKey); reset(); }}
          style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 13 }}>
          {(Object.entries(GRAPHS) as [GraphKey, typeof GRAPHS[GraphKey]][]).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
        </select>
        <label style={{ fontSize: 13, color: 'var(--tx-2)' }}>Start:
          <select value={start} onChange={e => { setStart(+e.target.value); reset(); }}
            style={{ marginLeft: 8, padding: '6px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 13 }}>
            {graph.nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
          </select>
        </label>
        <input type="range" min={100} max={900} defaultValue={700} onChange={e => speed.current = 1000 - +e.target.value} style={{ width: 80 }} />
        <button onClick={run} disabled={running}
          style={{ padding: '7px 18px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontWeight: 700, cursor: running ? 'not-allowed' : 'pointer', fontSize: 13 }}>
          {running ? 'Running...' : '▶ Start Dijkstra'}
        </button>
        <button onClick={reset} style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--tx-3)', cursor: 'pointer', fontSize: 13 }}>Reset</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>
        {/* SVG Graph */}
        <div style={{ background: 'var(--bg-elevated)', borderRadius: 14, border: '1px solid var(--border)', overflow: 'hidden' }}>
          <svg width="100%" viewBox="0 0 580 360" style={{ display: 'block' }}>
            {/* Edges */}
            {graph.edges.map((e, i) => {
              const u = graph.nodes[e.u], v = graph.nodes[e.v];
              const isRelaxing = relaxingEdge && ((relaxingEdge[0] === e.u && relaxingEdge[1] === e.v) || (relaxingEdge[0] === e.v && relaxingEdge[1] === e.u));
              const inPath = isPathEdge(e.u, e.v, endPath);
              const mx = (u.x + v.x) / 2, my = (u.y + v.y) / 2;
              return (
                <g key={i}>
                  <line x1={u.x} y1={u.y} x2={v.x} y2={v.y}
                    stroke={isRelaxing ? '#f59e0b' : inPath ? '#10b981' : 'var(--border)'}
                    strokeWidth={isRelaxing ? 3 : inPath ? 3 : 1.5}
                    strokeDasharray={isRelaxing ? '6 3' : 'none'}
                    style={{ transition: 'stroke 0.3s' }} />
                  <rect x={mx - 12} y={my - 10} width={24} height={18} rx={4}
                    fill="var(--bg-surface)" />
                  <text x={mx} y={my + 4} textAnchor="middle" fontSize={12} fontWeight={700}
                    fill={isRelaxing ? '#f59e0b' : inPath ? '#10b981' : 'var(--tx-3)'}>{e.w}</text>
                </g>
              );
            })}
            {/* Nodes */}
            {graph.nodes.map(node => {
              const state = nodeStates[node.id];
              const isCur = currentNode === node.id;
              const isStart = node.id === start;
              const isVisited = state?.visited;
              const inPath = endPath.includes(node.id);
              const color = isCur ? '#f59e0b' : inPath && done ? '#10b981' : isVisited ? '#6366f1' : isStart ? '#10b981' : 'var(--border)';
              return (
                <g key={node.id}>
                  <circle cx={node.x} cy={node.y} r={24}
                    fill={isCur ? '#f59e0b20' : inPath && done ? '#10b98120' : isVisited ? '#6366f115' : 'var(--bg-elevated)'}
                    stroke={color} strokeWidth={2.5}
                    style={{ transition: 'all 0.4s' }} />
                  <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize={16} fontWeight={900} fill={color}>
                    {node.label}
                  </text>
                  {state && (
                    <text x={node.x} y={node.y - 30} textAnchor="middle" fontSize={12} fontWeight={700}
                      fill={state.dist === INF ? 'var(--tx-4)' : '#10b981'}>
                      {state.dist === INF ? '∞' : state.dist}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Distance Table + Log */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Distance table */}
          <div style={{ background: 'var(--bg-elevated)', borderRadius: 12, border: '1px solid var(--border)', padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 10 }}>📊 Distance Table</div>
            {graph.nodes.map((node, i) => {
              const state = nodeStates[i];
              const isCur = currentNode === i;
              const inPath = endPath.includes(i);
              return (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '5px 8px', borderRadius: 6, marginBottom: 4,
                  background: isCur ? '#f59e0b15' : inPath && done ? '#10b98115' : state?.visited ? '#6366f110' : 'transparent',
                  border: `1px solid ${isCur ? '#f59e0b40' : 'transparent'}`,
                  transition: 'all 0.3s',
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: isCur ? '#f59e0b' : 'var(--tx-1)' }}>{node.label}</span>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {state?.visited && <span style={{ fontSize: 10, color: '#6366f1', fontWeight: 700 }}>✓</span>}
                    <span style={{ fontSize: 14, fontWeight: 800, color: state?.dist === undefined || state.dist === INF ? 'var(--tx-4)' : inPath && done ? '#10b981' : 'var(--tx-1)', fontFamily: 'monospace' }}>
                      {state === undefined ? '∞' : state.dist === INF ? '∞' : state.dist}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Log */}
          <div style={{ background: 'var(--bg-elevated)', borderRadius: 12, border: '1px solid var(--border)', padding: 12, flex: 1, overflowY: 'auto', maxHeight: 180 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 8 }}>📋 Steps</div>
            {log.length === 0 && <div style={{ fontSize: 12, color: 'var(--tx-4)' }}>Start karo...</div>}
            {log.map((l, i) => (
              <div key={i} style={{ fontSize: 11, color: l.startsWith('✅') ? '#10b981' : l.startsWith('  ') ? 'var(--tx-3)' : 'var(--tx-1)', padding: '2px 0', lineHeight: 1.5, fontFamily: 'monospace' }}>{l}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div style={{ marginTop: 14, padding: '10px 16px', background: '#6366f112', borderRadius: 10, border: '1px solid #6366f130', fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7 }}>
        💡 <strong>Kyu Dijkstra?</strong> BFS "hops" count karta hai — weight ignore karta hai. Dijkstra Min-Heap se hamesha cheapest unvisited node process karta hai → guaranteed shortest path.
        <br/>⚠️ <strong>Negative edges?</strong> Dijkstra fail karta hai → Bellman-Ford use karo.
      </div>
    </div>
  );
}
