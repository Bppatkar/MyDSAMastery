'use client';
import { useState, useRef } from 'react';

function makeUF(n: number) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);
  const size = new Array(n).fill(1);
  return { parent, rank, size };
}

function find(parent: number[], x: number): number {
  if (parent[x] !== x) parent[x] = find(parent, parent[x]); // path compression
  return parent[x];
}

function union(parent: number[], rank: number[], size: number[], x: number, y: number): boolean {
  const rx = find(parent, x), ry = find(parent, y);
  if (rx === ry) return false; // already same
  if (rank[rx] < rank[ry]) { parent[rx] = ry; size[ry] += size[rx]; }
  else if (rank[rx] > rank[ry]) { parent[ry] = rx; size[rx] += size[ry]; }
  else { parent[ry] = rx; size[rx] += size[ry]; rank[rx]++; }
  return true;
}

const COLORS = ['#10b981','#6366f1','#f59e0b','#ef4444','#a855f7','#06b6d4','#ec4899','#84cc16'];

export default function UnionFindVisualizer() {
  const [n, setN] = useState(8);
  const [uf, setUF] = useState(() => makeUF(8));
  const [highlight, setHighlight] = useState<[number, number] | null>(null);
  const [log, setLog] = useState<{ msg: string; merged: boolean }[]>([]);
  const [nodeA, setNodeA] = useState(0);
  const [nodeB, setNodeB] = useState(1);

  const reset = (newN?: number) => {
    const size = newN ?? n;
    setUF(makeUF(size));
    setHighlight(null);
    setLog([]);
  };

  const doUnion = () => {
    const newUF = { parent: [...uf.parent], rank: [...uf.rank], size: [...uf.size] };
    const ra = find(newUF.parent, nodeA), rb = find(newUF.parent, nodeB);
    const merged = union(newUF.parent, newUF.rank, newUF.size, nodeA, nodeB);
    setUF(newUF);
    setHighlight([nodeA, nodeB]);
    setLog(prev => [...prev, {
      msg: merged
        ? `union(${nodeA}, ${nodeB}) → merged! Root ${ra} + Root ${rb} → one component`
        : `union(${nodeA}, ${nodeB}) → already same component (root=${ra})`,
      merged,
    }]);
    setTimeout(() => setHighlight(null), 1200);
  };

  const doFind = () => {
    const root = find([...uf.parent], nodeA);
    setHighlight([nodeA, nodeA]);
    setLog(prev => [...prev, { msg: `find(${nodeA}) → root = ${root}`, merged: false }]);
    setTimeout(() => setHighlight(null), 1000);
  };

  // Group nodes by component
  const parent = [...uf.parent];
  const roots = new Map<number, number[]>();
  for (let i = 0; i < n; i++) {
    const r = find(parent, i);
    if (!roots.has(r)) roots.set(r, []);
    roots.get(r)!.push(i);
  }

  // Node positions in circle layout
  const cx = 300, cy = 180, radius = 140;
  const nodePos = Array.from({ length: n }, (_, i) => ({
    x: cx + radius * Math.cos((2 * Math.PI * i / n) - Math.PI / 2),
    y: cy + radius * Math.sin((2 * Math.PI * i / n) - Math.PI / 2),
  }));

  // Assign colors by component
  const rootList = [...roots.keys()];
  const getColor = (i: number) => COLORS[rootList.indexOf(find([...uf.parent], i)) % COLORS.length];

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--tx-1)', marginBottom: 6 }}>🔗 Union-Find (Disjoint Set)</h2>
      <p style={{ fontSize: 13, color: 'var(--tx-3)', marginBottom: 16 }}>Connected components track karo — O(α(n)) per operation (almost O(1))</p>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center' }}>
        <label style={{ fontSize: 13, color: 'var(--tx-2)' }}>Nodes:
          <input type="number" min={3} max={12} value={n}
            onChange={e => { const v = +e.target.value; setN(v); reset(v); }}
            style={{ width: 55, marginLeft: 8, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 13 }} />
        </label>
        <label style={{ fontSize: 13, color: 'var(--tx-2)' }}>A:
          <input type="number" min={0} max={n-1} value={nodeA}
            onChange={e => setNodeA(+e.target.value)}
            style={{ width: 55, marginLeft: 8, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 13 }} />
        </label>
        <label style={{ fontSize: 13, color: 'var(--tx-2)' }}>B:
          <input type="number" min={0} max={n-1} value={nodeB}
            onChange={e => setNodeB(+e.target.value)}
            style={{ width: 55, marginLeft: 8, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 13 }} />
        </label>
        <button onClick={doUnion}
          style={{ padding: '7px 18px', borderRadius: 8, border: 'none', background: '#10b981', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
          union({nodeA}, {nodeB})
        </button>
        <button onClick={doFind}
          style={{ padding: '7px 18px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
          find({nodeA})
        </button>
        <button onClick={() => reset()} style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--tx-3)', cursor: 'pointer', fontSize: 13 }}>Reset</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 16 }}>
        {/* Visualization */}
        <div>
          {/* Circle graph */}
          <div style={{ background: 'var(--bg-elevated)', borderRadius: 14, border: '1px solid var(--border)', marginBottom: 12 }}>
            <svg width="100%" viewBox="0 0 600 360">
              {/* Parent edges */}
              {Array.from({ length: n }, (_, i) => {
                const p = uf.parent[i];
                if (p === i) return null;
                const ppos = nodePos[p], ipos = nodePos[i];
                return (
                  <line key={i} x1={ipos.x} y1={ipos.y} x2={ppos.x} y2={ppos.y}
                    stroke={getColor(i)} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.5} />
                );
              })}
              {/* Nodes */}
              {Array.from({ length: n }, (_, i) => {
                const pos = nodePos[i];
                const color = getColor(i);
                const root = find([...uf.parent], i);
                const isRoot = root === i;
                const isHighlighted = highlight && (highlight[0] === i || highlight[1] === i);
                return (
                  <g key={i}>
                    <circle cx={pos.x} cy={pos.y} r={isRoot ? 26 : 22}
                      fill={color + (isHighlighted ? '40' : '18')}
                      stroke={color} strokeWidth={isRoot ? 3 : 2}
                      style={{ transition: 'all 0.4s' }} />
                    <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize={15} fontWeight={800} fill={color}>{i}</text>
                    {isRoot && (
                      <text x={pos.x} y={pos.y - 32} textAnchor="middle" fontSize={10} fontWeight={700} fill={color}>ROOT</text>
                    )}
                    <text x={pos.x} y={pos.y + 36} textAnchor="middle" fontSize={10} fill="var(--tx-4)">
                      p={uf.parent[i]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Component groups */}
          <div style={{ background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border)', padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 8 }}>
              🏘️ Components: {roots.size}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[...roots.entries()].map(([root, members]) => (
                <div key={root} style={{
                  padding: '6px 12px', borderRadius: 10, background: getColor(root) + '18',
                  border: `1px solid ${getColor(root)}40`, display: 'flex', gap: 6, alignItems: 'center',
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: getColor(root) }}>Root {root}:</span>
                  <span style={{ fontSize: 12, color: 'var(--tx-2)' }}>{'{' + members.join(', ') + '}'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* parent[] table + log */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'var(--bg-elevated)', borderRadius: 12, border: '1px solid var(--border)', padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 10 }}>parent[] array</div>
            {Array.from({ length: n }, (_, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 6px', borderRadius: 6, marginBottom: 3, background: uf.parent[i] === i ? getColor(i) + '15' : 'transparent' }}>
                <span style={{ fontSize: 13, color: 'var(--tx-3)', fontFamily: 'monospace' }}>node[{i}]</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: getColor(i), fontFamily: 'monospace' }}>→ {uf.parent[i]}</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--bg-elevated)', borderRadius: 12, border: '1px solid var(--border)', padding: 12, flex: 1, overflowY: 'auto', maxHeight: 200 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 8 }}>📋 Operations</div>
            {log.length === 0 && <div style={{ fontSize: 11, color: 'var(--tx-4)' }}>Koi operation nahi kiya abhi...</div>}
            {log.map((l, i) => (
              <div key={i} style={{ fontSize: 11, color: l.merged ? '#10b981' : 'var(--tx-2)', padding: '3px 0', lineHeight: 1.5 }}>
                {l.msg}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14, padding: '10px 16px', background: '#10b98112', borderRadius: 10, border: '1px solid #10b98130', fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7 }}>
        💡 <strong>Key:</strong> parent[i]=i → i is root. find() path compression se har node seedha root ko point karta hai. union() rank se chota tree bade mein merge hota hai. 
        <br/>📋 <strong>Use karo jab:</strong> "Count components", "Cycle detect", "Same group mein hain?", "Minimum Spanning Tree"
      </div>
    </div>
  );
}
