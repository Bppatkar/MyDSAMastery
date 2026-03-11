'use client';
import { useState, useRef } from 'react';

interface Node { id: number; x: number; y: number; label: string; }
interface Edge { from: number; to: number; }

const DEFAULT_NODES: Node[] = [
  { id: 0, x: 300, y: 60, label: '0' }, { id: 1, x: 160, y: 180, label: '1' },
  { id: 2, x: 440, y: 180, label: '2' }, { id: 3, x: 80, y: 320, label: '3' },
  { id: 4, x: 260, y: 320, label: '4' }, { id: 5, x: 380, y: 320, label: '5' },
  { id: 6, x: 520, y: 320, label: '6' },
];
const DEFAULT_EDGES: Edge[] = [
  { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 },
  { from: 2, to: 5 }, { from: 2, to: 6 }, { from: 4, to: 5 },
];

async function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export default function GraphVisualizer() {
  const [nodeColors, setNodeColors] = useState<Record<number, string>>({});
  const [edgeColors, setEdgeColors] = useState<Record<string, string>>({});
  const [log, setLog] = useState<string[]>(['Graph loaded — 7 nodes, 7 edges']);
  const [running, setRunning] = useState(false);
  const [startNode, setStartNode] = useState(0);
  const cancelRef = useRef(false);

  const addLog = (msg: string) => setLog(prev => [msg, ...prev.slice(0, 6)]);
  const edgeKey = (a: number, b: number) => `${Math.min(a,b)}-${Math.max(a,b)}`;

  const buildAdj = () => {
    const adj: Record<number, number[]> = {};
    DEFAULT_NODES.forEach(n => { adj[n.id] = []; });
    DEFAULT_EDGES.forEach(e => { adj[e.from].push(e.to); adj[e.to].push(e.from); });
    return adj;
  };

  const runBFS = async () => {
    setRunning(true); cancelRef.current = false;
    setNodeColors({}); setEdgeColors({});
    addLog(`BFS from node ${startNode}`);
    const adj = buildAdj();
    const visited = new Set<number>();
    const queue = [startNode];
    visited.add(startNode);
    setNodeColors({ [startNode]: '#f59e0b' });

    while (queue.length && !cancelRef.current) {
      const cur = queue.shift()!;
      setNodeColors(prev => ({ ...prev, [cur]: 'var(--accent)' }));
      addLog(`Visit: ${cur} — neighbors: [${adj[cur].join(', ')}]`);
      await sleep(600);
      for (const nei of adj[cur]) {
        if (!visited.has(nei)) {
          visited.add(nei);
          setNodeColors(prev => ({ ...prev, [nei]: '#f59e0b' }));
          setEdgeColors(prev => ({ ...prev, [edgeKey(cur, nei)]: 'var(--accent)' }));
          queue.push(nei);
          await sleep(400);
        }
      }
    }
    addLog('BFS complete ✅');
    setRunning(false);
  };

  const runDFS = async () => {
    setRunning(true); cancelRef.current = false;
    setNodeColors({}); setEdgeColors({});
    addLog(`DFS from node ${startNode}`);
    const adj = buildAdj();
    const visited = new Set<number>();

    const dfs = async (node: number) => {
      if (cancelRef.current) return;
      visited.add(node);
      setNodeColors(prev => ({ ...prev, [node]: '#f59e0b' }));
      addLog(`Visit: ${node}`);
      await sleep(600);
      setNodeColors(prev => ({ ...prev, [node]: '#ec4899' }));
      for (const nei of adj[node]) {
        if (!visited.has(nei)) {
          setEdgeColors(prev => ({ ...prev, [edgeKey(node, nei)]: '#ec4899' }));
          await dfs(nei);
        }
      }
    };

    await dfs(startNode);
    addLog('DFS complete ✅');
    setRunning(false);
  };

  const reset = () => {
    cancelRef.current = true;
    setNodeColors({}); setEdgeColors({});
    setLog(['Reset']);
    setRunning(false);
  };

  const B = ({ label, onClick, color = 'var(--accent)', disabled = false }: any) => (
    <button onClick={onClick} disabled={disabled} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', fontSize: 12, fontWeight: 700, background: color, color: '#fff', opacity: disabled ? 0.5 : 1 }}>{label}</button>
  );

  return (
    <div style={{ background: 'var(--bg-surface)', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--tx-1)' }}>🕸️ Graph Traversal</span>
        <label style={{ fontSize: 12, color: 'var(--tx-3)' }}>Start:</label>
        <select value={startNode} onChange={e => setStartNode(+e.target.value)} style={{ padding: '5px 8px', borderRadius: 7, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 12 }}>
          {DEFAULT_NODES.map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
        </select>
        <B label="▶ BFS" onClick={runBFS} disabled={running} color="#3b82f6" />
        <B label="▶ DFS" onClick={runDFS} disabled={running} color="#ec4899" />
        <B label="Reset" onClick={reset} color="#6b7280" />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
          <span style={{ fontSize: 11, color: '#f59e0b' }}>● Queued</span>
          <span style={{ fontSize: 11, color: 'var(--accent)' }}>● BFS Visited</span>
          <span style={{ fontSize: 11, color: '#ec4899' }}>● DFS Visited</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 0 }}>
        <div style={{ flex: 1, background: 'var(--bg-base)', overflowX: 'auto' }}>
          <svg width={620} height={400} style={{ display: 'block' }}>
            {DEFAULT_EDGES.map((e, i) => {
              const from = DEFAULT_NODES.find(n => n.id === e.from)!;
              const to = DEFAULT_NODES.find(n => n.id === e.to)!;
              const color = edgeColors[edgeKey(e.from, e.to)] || 'var(--border)';
              return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={color} strokeWidth={color === 'var(--border)' ? 2 : 3} style={{ transition: 'stroke 0.3s' }} />;
            })}
            {DEFAULT_NODES.map(n => {
              const color = nodeColors[n.id] || 'var(--bg-elevated)';
              return (
                <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                  <circle r={24} fill={color} stroke={color === 'var(--bg-elevated)' ? 'var(--border)' : color} strokeWidth={2} style={{ transition: 'all 0.3s' }} />
                  <text textAnchor="middle" dy="5" fontSize={14} fontWeight={700} fill={color === 'var(--bg-elevated)' ? 'var(--tx-1)' : '#fff'} style={{ transition: 'all 0.3s' }}>{n.label}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{ width: 200, background: 'var(--bg-surface)', borderLeft: '1px solid var(--border)', padding: 12, overflowY: 'auto', maxHeight: 400 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 8, textTransform: 'uppercase' }}>Log</div>
          {log.map((msg, i) => (
            <div key={i} style={{ fontSize: 11, color: i === 0 ? 'var(--tx-1)' : 'var(--tx-3)', padding: '4px 0', borderBottom: '1px solid var(--border)', fontFamily: 'monospace' }}>{msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
