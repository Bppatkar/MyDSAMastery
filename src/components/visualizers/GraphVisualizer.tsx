'use client';
import { useState, useRef } from 'react';

type Graph = Map<number, number[]>;

interface NodePos { x: number; y: number; }
const NODE_POS: NodePos[] = [
  { x: 230, y: 80 },  // 0
  { x: 120, y: 180 }, // 1
  { x: 340, y: 180 }, // 2
  { x: 60,  y: 280 }, // 3
  { x: 190, y: 280 }, // 4
  { x: 290, y: 280 }, // 5
  { x: 420, y: 280 }, // 6
];

const INIT_EDGES = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];

function buildGraph(edgeList: number[][]): Graph {
  const g: Graph = new Map();
  for (let i = 0; i < 7; i++) g.set(i, []);
  for (const [a, b] of edgeList) {
    g.get(a)!.push(b);
    g.get(b)!.push(a);
  }
  return g;
}

export default function GraphVisualizer() {
  const [graph] = useState<Graph>(() => buildGraph(INIT_EDGES));
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [queue, setQueue] = useState<number[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [mode, setMode] = useState<'bfs'|'dfs'>('bfs');
  const [log, setLog] = useState<string[]>(['Click BFS or DFS to start from node 0']);
  const [running, setRunning] = useState(false);
  const stepRef = useRef<number[]>([]);
  const lg = (m: string) => setLog(p => [m, ...p.slice(0,5)]);

  const reset = () => {
    setVisited(new Set()); setQueue([]); setCurrent(null);
    setLog(['Click BFS or DFS to start from node 0']); setRunning(false);
  };

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const runBFS = async () => {
    reset(); setRunning(true);
    const vis = new Set<number>();
    const q = [0];
    vis.add(0); setQueue([...q]); setVisited(new Set(vis));
    lg('BFS start from node 0');
    await sleep(500);
    const order: number[] = [];
    while (q.length > 0) {
      const node = q.shift()!;
      setCurrent(node); setQueue([...q]);
      order.push(node); lg(`Visiting node ${node}`);
      await sleep(600);
      const neighbors = graph.get(node) ?? [];
      for (const nb of neighbors) {
        if (!vis.has(nb)) {
          vis.add(nb); q.push(nb);
          setVisited(new Set(vis)); setQueue([...q]);
          await sleep(200);
        }
      }
    }
    setCurrent(null); lg(`BFS order: [${order.join(' → ')}]`);
    setRunning(false);
  };

  const runDFS = async () => {
    reset(); setRunning(true);
    const vis = new Set<number>();
    const order: number[] = [];
    lg('DFS start from node 0');
    await sleep(300);

    const dfs = async (node: number) => {
      if (vis.has(node)) return;
      vis.add(node); order.push(node);
      setCurrent(node); setVisited(new Set(vis));
      lg(`Visiting node ${node} (depth-first)`);
      await sleep(600);
      for (const nb of graph.get(node) ?? []) {
        if (!vis.has(nb)) await dfs(nb);
      }
    };

    await dfs(0);
    setCurrent(null); lg(`DFS order: [${order.join(' → ')}]`);
    setRunning(false);
  };

  const NODE_COLOR = (id: number) => {
    if (id === current) return '#f59e0b';
    if (visited.has(id)) return '#10b981';
    if (queue.includes(id)) return '#6366f1';
    return 'var(--bg-base)';
  };
  const NODE_STROKE = (id: number) => {
    if (id === current) return '#f59e0b';
    if (visited.has(id)) return '#10b981';
    if (queue.includes(id)) return '#6366f1';
    return 'var(--accent)';
  };

  return (
    <div style={{ color: 'var(--tx-1)', fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={runBFS} disabled={running} style={{ padding:'6px 16px', borderRadius:6, background:mode==='bfs'?'var(--accent)':'var(--bg-surface)', color:mode==='bfs'?'#fff':'var(--tx-2)', border:'1px solid var(--border)', cursor:running?'not-allowed':'pointer', fontWeight:700, fontSize:13 }}
          onMouseEnter={() => setMode('bfs')}>
          BFS
        </button>
        <button onClick={runDFS} disabled={running} style={{ padding:'6px 16px', borderRadius:6, background:mode==='dfs'?'#8b5cf6':'var(--bg-surface)', color:mode==='dfs'?'#fff':'var(--tx-2)', border:'1px solid var(--border)', cursor:running?'not-allowed':'pointer', fontWeight:700, fontSize:13 }}
          onMouseEnter={() => setMode('dfs')}>
          DFS
        </button>
        <button onClick={reset} disabled={running} style={{ padding:'6px 12px', borderRadius:6, background:'var(--bg-surface)', color:'var(--tx-3)', border:'1px solid var(--border)', cursor:'pointer', fontSize:13 }}>Reset</button>
        <div style={{ display:'flex', gap:12, marginLeft:8, fontSize:11, color:'var(--tx-3)' }}>
          <span><span style={{ display:'inline-block', width:10, height:10, borderRadius:'50%', background:'#f59e0b', marginRight:4 }} />Current</span>
          <span><span style={{ display:'inline-block', width:10, height:10, borderRadius:'50%', background:'#6366f1', marginRight:4 }} />In Queue</span>
          <span><span style={{ display:'inline-block', width:10, height:10, borderRadius:'50%', background:'#10b981', marginRight:4 }} />Visited</span>
        </div>
      </div>

      <div style={{ background:'var(--bg-surface)', borderRadius:10, border:'1px solid var(--border)', marginBottom:10 }}>
        <svg width="500" height="360" style={{ display:'block', margin:'0 auto' }}>
          {INIT_EDGES.map(([a, b], i) => (
            <line key={i}
              x1={NODE_POS[a].x} y1={NODE_POS[a].y}
              x2={NODE_POS[b].x} y2={NODE_POS[b].y}
              stroke={visited.has(a) && visited.has(b) ? '#10b981' : 'var(--border)'}
              strokeWidth={visited.has(a) && visited.has(b) ? 2.5 : 1.5}
            />
          ))}
          {[0,1,2,3,4,5,6].map(id => (
            <g key={id} transform={`translate(${NODE_POS[id].x},${NODE_POS[id].y})`}>
              <circle r={22} fill={NODE_COLOR(id)} stroke={NODE_STROKE(id)} strokeWidth={2.5} style={{ transition:'fill 0.3s, stroke 0.3s' }} />
              <text textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={700}
                fill={visited.has(id) || id === current ? '#fff' : 'var(--tx-1)'}>{id}</text>
            </g>
          ))}
          {queue.length > 0 && (
            <text x={10} y={345} fontSize={11} fill="var(--tx-3)">Queue: [{queue.join(', ')}]</text>
          )}
        </svg>
      </div>

      <div style={{ fontSize:11, color:'var(--tx-3)', lineHeight:1.8 }}>
        {log.map((l,i) => <div key={i} style={{ opacity:1-i*0.15 }}>» {l}</div>)}
      </div>
    </div>
  );
}
