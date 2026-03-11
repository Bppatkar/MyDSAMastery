'use client';
import { useState } from 'react';

interface LLNode { val: number; id: number; }

let idCounter = 100;

export default function LinkedListVisualizer() {
  const [nodes, setNodes] = useState<LLNode[]>([1, 2, 3, 4, 5].map((v, i) => ({ val: v, id: i })));
  const [inputVal, setInputVal] = useState('');
  const [inputIdx, setInputIdx] = useState('');
  const [highlight, setHighlight] = useState<Set<number>>(new Set());
  const [log, setLog] = useState('Linked List: 1 → 2 → 3 → 4 → 5');
  const [pointer, setPointer] = useState<number | null>(null); // id of pointer node
  const [slowFast, setSlowFast] = useState<{ slow: number; fast: number } | null>(null);

  const hl = (ids: number[], duration = 1200) => {
    setHighlight(new Set(ids));
    setTimeout(() => setHighlight(new Set()), duration);
  };

  const pushFront = () => {
    const v = parseInt(inputVal); if (isNaN(v)) return;
    const newNode = { val: v, id: idCounter++ };
    setNodes(prev => [newNode, ...prev]);
    setLog(`Pushed ${v} at head`);
    hl([newNode.id]); setInputVal('');
  };

  const pushBack = () => {
    const v = parseInt(inputVal); if (isNaN(v)) return;
    const newNode = { val: v, id: idCounter++ };
    setNodes(prev => [...prev, newNode]);
    setLog(`Pushed ${v} at tail`);
    hl([newNode.id]); setInputVal('');
  };

  const insertAt = () => {
    const v = parseInt(inputVal); const idx = parseInt(inputIdx);
    if (isNaN(v) || isNaN(idx)) return;
    const newNode = { val: v, id: idCounter++ };
    setNodes(prev => { const a = [...prev]; a.splice(Math.min(idx, a.length), 0, newNode); return a; });
    setLog(`Inserted ${v} at index ${idx}`);
    hl([newNode.id]); setInputVal(''); setInputIdx('');
  };

  const deleteHead = () => {
    if (!nodes.length) return;
    setLog(`Deleted head: ${nodes[0].val}`);
    setNodes(prev => prev.slice(1));
  };

  const deleteTail = () => {
    if (!nodes.length) return;
    setLog(`Deleted tail: ${nodes[nodes.length - 1].val}`);
    setNodes(prev => prev.slice(0, -1));
  };

  const reverse = async () => {
    setLog('Reversing list...');
    const ids = nodes.map(n => n.id);
    for (let i = 0; i < ids.length; i++) {
      await new Promise<void>(r => { setHighlight(new Set([ids[i]])); setTimeout(r, 200); });
    }
    setNodes(prev => [...prev].reverse());
    setHighlight(new Set());
    setLog(`Reversed: ${[...nodes].reverse().map(n => n.val).join(' → ')}`);
  };

  const findMiddle = async () => {
    if (nodes.length === 0) return;
    setLog('Finding middle — slow/fast pointers...');
    let slow = 0, fast = 0;
    const steps: [number, number][] = [[slow, fast]];
    while (fast < nodes.length - 1 && fast + 1 < nodes.length) {
      fast = Math.min(fast + 2, nodes.length - 1);
      slow = slow + 1;
      steps.push([slow, fast]);
    }
    for (const [s, f] of steps) {
      await new Promise<void>(r => setTimeout(r, 500));
      setSlowFast({ slow: nodes[s]?.id ?? -1, fast: nodes[f]?.id ?? -1 });
    }
    const mid = nodes[slow];
    setLog(`Middle node: ${mid.val} (index ${slow})`);
    hl([mid.id], 2000);
    setTimeout(() => setSlowFast(null), 2000);
  };

  const B = ({ label, onClick, color = 'var(--accent)' }: any) => (
    <button onClick={onClick} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, background: color, color: '#fff', whiteSpace: 'nowrap' }}>{label}</button>
  );

  return (
    <div style={{ background: 'var(--bg-surface)', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--tx-1)' }}>🔗 Linked List</span>
        <input value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder="Value" style={{ padding: '5px 9px', borderRadius: 7, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 12, width: 70 }} />
        <input value={inputIdx} onChange={e => setInputIdx(e.target.value)} placeholder="Index" style={{ padding: '5px 9px', borderRadius: 7, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 12, width: 60 }} />
        <B label="Push Front" onClick={pushFront} />
        <B label="Push Back" onClick={pushBack} color="#6366f1" />
        <B label="Insert At" onClick={insertAt} color="#f59e0b" />
        <B label="Del Head" onClick={deleteHead} color="#ef4444" />
        <B label="Del Tail" onClick={deleteTail} color="#ef4444" />
        <B label="Reverse" onClick={reverse} color="#ec4899" />
        <B label="Find Middle" onClick={findMiddle} color="#10b981" />
      </div>

      {/* List visualization */}
      <div style={{ padding: '28px 20px', background: 'var(--bg-base)', overflowX: 'auto', minHeight: 120 }}>
        {nodes.length === 0 ? (
          <span style={{ color: 'var(--tx-3)', fontSize: 13 }}>Empty list — push some nodes!</span>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 'max-content' }}>
            <div style={{ fontSize: 10, color: 'var(--tx-3)', marginRight: 8, textAlign: 'center' }}>HEAD<br/>↓</div>
            {nodes.map((n, i) => {
              const isHL = highlight.has(n.id);
              const isSlow = slowFast?.slow === n.id;
              const isFast = slowFast?.fast === n.id;
              return (
                <div key={n.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    {isSlow && <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: '#10b981', fontWeight: 700, whiteSpace: 'nowrap' }}>slow</div>}
                    {isFast && <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: '#f59e0b', fontWeight: 700, whiteSpace: 'nowrap' }}>fast</div>}
                    <div style={{
                      display: 'flex', borderRadius: 10, overflow: 'hidden',
                      border: `2px solid ${isHL ? 'var(--accent)' : isSlow ? '#10b981' : isFast ? '#f59e0b' : 'var(--border)'}`,
                      background: isHL ? 'var(--accent-bg)' : 'var(--bg-elevated)',
                      transition: 'all 0.3s', minWidth: 80,
                    }}>
                      <div style={{ padding: '10px 14px', fontWeight: 800, fontSize: 15, color: isHL ? 'var(--accent)' : 'var(--tx-1)', borderRight: '1px solid var(--border)' }}>{n.val}</div>
                      <div style={{ padding: '10px 8px', fontSize: 10, color: 'var(--tx-3)', display: 'flex', alignItems: 'center' }}>{i < nodes.length - 1 ? '→' : 'null'}</div>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: 9, color: 'var(--tx-4)', marginTop: 3 }}>[{i}]</div>
                  </div>
                  {i < nodes.length - 1 && <div style={{ fontSize: 20, color: 'var(--tx-3)', margin: '0 2px', paddingBottom: 16 }}>→</div>}
                </div>
              );
            })}
            <div style={{ fontSize: 10, color: 'var(--tx-3)', marginLeft: 8, textAlign: 'center' }}>TAIL<br/>↓</div>
          </div>
        )}
      </div>

      <div style={{ padding: '10px 18px', borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <span style={{ fontSize: 12, color: 'var(--tx-2)', fontFamily: 'monospace' }}>▶ {log}</span>
        <span style={{ marginLeft: 12, fontSize: 11, color: 'var(--tx-4)' }}>Length: {nodes.length}</span>
      </div>
    </div>
  );
}
