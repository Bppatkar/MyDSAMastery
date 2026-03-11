'use client';
import { useState } from 'react';

interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }

function insert(root: TreeNode | null, val: number): TreeNode {
  if (!root) return { val, left: null, right: null };
  if (val < root.val) return { ...root, left: insert(root.left, val) };
  if (val > root.val) return { ...root, right: insert(root.right, val) };
  return root;
}

function assignPos(node: TreeNode | null, x: number, y: number, gap: number): any {
  if (!node) return null;
  return { ...node, x, y, left: assignPos(node.left, x - gap, y + 72, gap / 1.75), right: assignPos(node.right, x + gap, y + 72, gap / 1.75) };
}

function flatNodes(n: any, arr: any[] = []): any[] { if (!n) return arr; arr.push(n); flatNodes(n.left, arr); flatNodes(n.right, arr); return arr; }
function flatEdges(n: any, arr: any[] = []): any[] { if (!n) return arr; if (n.left) { arr.push([n.x, n.y, n.left.x, n.left.y]); flatEdges(n.left, arr); } if (n.right) { arr.push([n.x, n.y, n.right.x, n.right.y]); flatEdges(n.right, arr); } return arr; }
function inorder(n: TreeNode | null, a: number[] = []): number[] { if (!n) return a; inorder(n.left, a); a.push(n.val); inorder(n.right, a); return a; }
function preorder(n: TreeNode | null, a: number[] = []): number[] { if (!n) return a; a.push(n.val); preorder(n.left, a); preorder(n.right, a); return a; }
function postorder(n: TreeNode | null, a: number[] = []): number[] { if (!n) return a; postorder(n.left, a); postorder(n.right, a); a.push(n.val); return a; }

const DEFAULTS = [50, 30, 70, 20, 40, 60, 80, 10, 35];
function makeDefault() { let r: TreeNode | null = null; for (const v of DEFAULTS) r = insert(r, v); return r; }

export default function TreeVisualizer() {
  const [rawRoot, setRawRoot] = useState<TreeNode | null>(makeDefault);
  const [hl, setHl] = useState<Set<number>>(new Set());
  const [inputVal, setInputVal] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [log, setLog] = useState('BST loaded with 9 nodes');
  const [traversalArr, setTraversalArr] = useState<number[]>([]);
  const [tType, setTType] = useState('');

  const root = assignPos(rawRoot, 400, 40, 160);
  const nodes = flatNodes(root);
  const edges = flatEdges(root);

  const animate = (arr: number[], msg: string) => {
    setLog(msg); setTraversalArr(arr);
    arr.forEach((v, i) => setTimeout(() => setHl(new Set([v])), i * 350));
    setTimeout(() => setHl(new Set()), arr.length * 350 + 600);
  };

  const doInsert = () => {
    const v = parseInt(inputVal); if (isNaN(v)) return;
    setRawRoot(prev => insert(prev, v));
    setLog(`Inserted ${v}`); setHl(new Set([v]));
    setTimeout(() => setHl(new Set()), 1200); setInputVal('');
  };

  const doSearch = () => {
    const target = parseInt(searchVal); if (isNaN(target)) return;
    const path: number[] = []; let cur: TreeNode | null = rawRoot;
    while (cur) { path.push(cur.val); if (cur.val === target) break; cur = target < cur.val ? cur.left : cur.right; }
    const found = path[path.length - 1] === target;
    animate(path, `${found ? '✅ Found' : '❌ Not found'}: ${target} — path: ${path.join(' → ')}`);
    setSearchVal('');
  };

  const B = ({ label, onClick, color = 'var(--accent)' }: { label: string; onClick: () => void; color?: string }) => (
    <button onClick={onClick} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: color, color: '#fff' }}>{label}</button>
  );

  return (
    <div style={{ background: 'var(--bg-surface)', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--tx-1)' }}>🌳 BST Visualizer</span>
        <input value={inputVal} onChange={e => setInputVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && doInsert()} placeholder="Insert..." style={{ padding: '5px 9px', borderRadius: 7, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 12, width: 90 }} />
        <B label="Insert" onClick={doInsert} />
        <div style={{ width: 1, height: 18, background: 'var(--border)' }} />
        <B label="Inorder" onClick={() => { const a = inorder(rawRoot); setTType('inorder'); animate(a, `Inorder: [${a.join(', ')}]`); }} color="#6366f1" />
        <B label="Preorder" onClick={() => { const a = preorder(rawRoot); setTType('preorder'); animate(a, `Preorder: [${a.join(', ')}]`); }} color="#f59e0b" />
        <B label="Postorder" onClick={() => { const a = postorder(rawRoot); setTType('postorder'); animate(a, `Postorder: [${a.join(', ')}]`); }} color="#ec4899" />
        <div style={{ width: 1, height: 18, background: 'var(--border)' }} />
        <input value={searchVal} onChange={e => setSearchVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && doSearch()} placeholder="Search..." style={{ padding: '5px 9px', borderRadius: 7, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 12, width: 80 }} />
        <B label="Search" onClick={doSearch} color="#10b981" />
        <B label="Reset" onClick={() => { setRawRoot(makeDefault()); setTraversalArr([]); setHl(new Set()); setLog('Reset'); }} color="#6b7280" />
      </div>

      <div style={{ background: 'var(--bg-base)', overflowX: 'auto' }}>
        <svg width={800} height={370} style={{ display: 'block', margin: '0 auto' }}>
          {edges.map((e: number[], i: number) => (
            <line key={i} x1={e[0]} y1={e[1]} x2={e[2]} y2={e[3]} stroke="var(--border)" strokeWidth={2} />
          ))}
          {nodes.map((n: any) => {
            const isHL = hl.has(n.val);
            return (
              <g key={n.val} transform={`translate(${n.x},${n.y})`} style={{ transition: 'all 0.3s' }}>
                <circle r={22} fill={isHL ? 'var(--accent)' : 'var(--bg-elevated)'} stroke={isHL ? 'var(--accent)' : 'var(--border)'} strokeWidth={isHL ? 3 : 1.5} style={{ transition: 'all 0.3s' }} />
                <text textAnchor="middle" dy="5" fontSize={13} fontWeight={700} fill={isHL ? '#fff' : 'var(--tx-1)'} style={{ transition: 'all 0.3s' }}>{n.val}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ padding: '10px 18px', borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <span style={{ fontSize: 12, color: 'var(--tx-2)', fontFamily: 'monospace' }}>▶ {log}</span>
        {traversalArr.length > 0 && (
          <div style={{ marginTop: 6, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {traversalArr.map((v, i) => (
              <span key={i} style={{ fontSize: 11, padding: '2px 6px', borderRadius: 5, background: hl.has(v) ? 'var(--accent)' : 'var(--accent-bg)', color: hl.has(v) ? '#fff' : 'var(--accent)', fontWeight: 700, transition: 'all 0.3s' }}>{v}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
