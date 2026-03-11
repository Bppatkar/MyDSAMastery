'use client';
import { useState } from 'react';

interface TreeNode { val: number; left?: TreeNode; right?: TreeNode; x?: number; y?: number; hl?: boolean; found?: boolean; }

function insert(root: TreeNode | null, val: number): TreeNode {
  if (!root) return { val };
  if (val < root.val) return { ...root, left: insert(root.left ?? null, val) };
  if (val > root.val) return { ...root, right: insert(root.right ?? null, val) };
  return root;
}
function pos(n: TreeNode | null, x: number, y: number, g: number): TreeNode | null {
  if (!n) return null;
  return { ...n, x, y, left: pos(n.left ?? null, x - g, y + 72, g / 1.8) as TreeNode|undefined, right: pos(n.right ?? null, x + g, y + 72, g / 1.8) as TreeNode|undefined };
}
function flat(n: TreeNode | null): TreeNode[] { if (!n) return []; return [n, ...flat(n.left??null), ...flat(n.right??null)]; }
function edges(n: TreeNode | null): {x1:number;y1:number;x2:number;y2:number}[] {
  if (!n) return [];
  const e = [];
  if (n.left) e.push({x1:n.x!,y1:n.y!,x2:n.left.x!,y2:n.left.y!});
  if (n.right) e.push({x1:n.x!,y1:n.y!,x2:n.right.x!,y2:n.right.y!});
  return [...e, ...edges(n.left??null), ...edges(n.right??null)];
}
function inorder(n: TreeNode | null, r: number[]): void { if (!n) return; inorder(n.left??null, r); r.push(n.val); inorder(n.right??null, r); }
function hlPath(n: TreeNode | null, v: number): TreeNode | null {
  if (!n) return null;
  if (n.val === v) return { ...n, hl: true, found: true };
  if (v < n.val) return { ...n, hl: true, left: hlPath(n.left??null, v) as TreeNode|undefined };
  return { ...n, hl: true, right: hlPath(n.right??null, v) as TreeNode|undefined };
}
function clean(n: TreeNode | null): TreeNode | null {
  if (!n) return null;
  return { ...n, hl: false, found: false, left: clean(n.left??null) as TreeNode|undefined, right: clean(n.right??null) as TreeNode|undefined };
}

const INIT = [10,5,15,3,7,12,20];
function buildTree(vals: number[]) {
  let t: TreeNode | null = null;
  for (const v of vals) t = insert(t, v);
  return pos(t, 270, 30, 110) as TreeNode;
}

export default function TreeVisualizer() {
  const [tree, setTree] = useState<TreeNode>(() => buildTree(INIT));
  const [inp, setInp] = useState('');
  const [srch, setSrch] = useState('');
  const [trav, setTrav] = useState<number[]>([]);
  const [log, setLog] = useState<string[]>(['BST with 7 default nodes loaded']);
  const lg = (m: string) => setLog(p => [m, ...p.slice(0,4)]);

  const doInsert = () => {
    const v = parseInt(inp); if (isNaN(v)) return;
    setTree(pos(insert(clean(tree), v), 270, 30, 110) as TreeNode);
    setTrav([]); setInp(''); lg(`Inserted ${v}`);
  };
  const doSearch = () => {
    const v = parseInt(srch); if (isNaN(v)) return;
    const hl = pos(hlPath(clean(tree), v), 270, 30, 110) as TreeNode;
    setTree(hl); setSrch('');
    const found = flat(hl).some(n => n.found);
    lg(found ? `✓ Found ${v}` : `${v} not in tree`);
  };
  const doInorder = () => {
    const r: number[] = []; inorder(tree, r); setTrav(r); lg(`Inorder: [${r.join(', ')}]`);
  };

  const ns = flat(tree); const es = edges(tree);

  return (
    <div style={{ color: 'var(--tx-1)', fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key==='Enter' && doInsert()} placeholder="Insert…" style={{ padding:'6px 10px', borderRadius:6, border:'1px solid var(--border)', background:'var(--bg-surface)', color:'var(--tx-1)', width:110, fontSize:13 }} />
        <button onClick={doInsert} style={{ padding:'6px 14px', borderRadius:6, background:'var(--accent)', color:'#fff', border:'none', cursor:'pointer', fontWeight:700, fontSize:13 }}>Insert</button>
        <input value={srch} onChange={e => setSrch(e.target.value)} onKeyDown={e => e.key==='Enter' && doSearch()} placeholder="Search…" style={{ padding:'6px 10px', borderRadius:6, border:'1px solid var(--border)', background:'var(--bg-surface)', color:'var(--tx-1)', width:110, fontSize:13 }} />
        <button onClick={doSearch} style={{ padding:'6px 14px', borderRadius:6, background:'#8b5cf6', color:'#fff', border:'none', cursor:'pointer', fontWeight:700, fontSize:13 }}>Search</button>
        <button onClick={doInorder} style={{ padding:'6px 12px', borderRadius:6, background:'var(--bg-surface)', color:'var(--tx-2)', border:'1px solid var(--border)', cursor:'pointer', fontSize:13 }}>Inorder</button>
        <button onClick={() => { setTree(buildTree(INIT)); setTrav([]); lg('Reset'); }} style={{ padding:'6px 12px', borderRadius:6, background:'var(--bg-surface)', color:'var(--tx-3)', border:'1px solid var(--border)', cursor:'pointer', fontSize:13 }}>Reset</button>
      </div>

      <div style={{ background:'var(--bg-surface)', borderRadius:10, border:'1px solid var(--border)', marginBottom:10 }}>
        <svg width="560" height="300" style={{ display:'block', margin:'0 auto' }}>
          {es.map((e,i) => <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="var(--border)" strokeWidth={2} />)}
          {ns.map(n => (
            <g key={n.val} transform={`translate(${n.x},${n.y})`}>
              <circle r={20} fill={n.found?'#10b981':n.hl?'#f59e0b':'var(--bg-base)'} stroke={n.found?'#10b981':n.hl?'#f59e0b':'var(--accent)'} strokeWidth={2.5} />
              <text textAnchor="middle" dominantBaseline="middle" fontSize={13} fontWeight={700} fill={(n.hl||n.found)?'#fff':'var(--tx-1)'}>{n.val}</text>
            </g>
          ))}
        </svg>
      </div>

      {trav.length > 0 && (
        <div style={{ background:'var(--bg-surface)', borderRadius:8, padding:'8px 12px', border:'1px solid var(--border)', marginBottom:10, fontSize:13 }}>
          <span style={{ color:'var(--tx-3)' }}>Inorder → </span>
          {trav.map((v,i) => (
            <span key={i} style={{ display:'inline-block', background:'var(--accent-bg)', color:'var(--accent)', borderRadius:4, padding:'1px 6px', margin:'0 2px', fontSize:12 }}>{v}</span>
          ))}
          <span style={{ color:'var(--tx-3)', fontSize:11, marginLeft:6 }}>← always sorted in BST ✓</span>
        </div>
      )}

      <div style={{ fontSize:11, color:'var(--tx-3)', lineHeight:1.7 }}>
        {log.map((l,i) => <div key={i} style={{ opacity: 1 - i*0.18 }}>» {l}</div>)}
      </div>
    </div>
  );
}
