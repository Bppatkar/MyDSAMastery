'use client';
import { useState } from 'react';

interface ListNode { val: number; id: number; highlight?: boolean; }
let nextId = 100;

export default function LinkedListVisualizer() {
  const [list, setList] = useState<ListNode[]>([{val:1,id:1},{val:3,id:2},{val:5,id:3},{val:7,id:4},{val:9,id:5}]);
  const [inp, setInp] = useState('');
  const [idxInp, setIdxInp] = useState('');
  const [log, setLog] = useState<string[]>(['Linked list with 5 nodes ready']);
  const lg = (m: string) => setLog(p => [m, ...p.slice(0,5)]);

  const insertHead = () => {
    const v = parseInt(inp); if (isNaN(v)) return;
    setList(p => [{val:v, id:++nextId, highlight:true}, ...p.map(n => ({...n, highlight:false}))]);
    setInp(''); lg(`Inserted ${v} at head`);
    setTimeout(() => setList(p => p.map(n => ({...n, highlight:false}))), 1200);
  };
  const insertTail = () => {
    const v = parseInt(inp); if (isNaN(v)) return;
    setList(p => [...p.map(n => ({...n, highlight:false})), {val:v, id:++nextId, highlight:true}]);
    setInp(''); lg(`Inserted ${v} at tail`);
    setTimeout(() => setList(p => p.map(n => ({...n, highlight:false}))), 1200);
  };
  const insertAt = () => {
    const v = parseInt(inp); const idx = parseInt(idxInp);
    if (isNaN(v) || isNaN(idx)) return;
    setList(p => {
      const arr = p.map(n => ({...n, highlight:false}));
      const i = Math.max(0, Math.min(idx, arr.length));
      arr.splice(i, 0, {val:v, id:++nextId, highlight:true});
      return arr;
    });
    setInp(''); setIdxInp(''); lg(`Inserted ${v} at index ${idx}`);
    setTimeout(() => setList(p => p.map(n => ({...n, highlight:false}))), 1200);
  };
  const deleteHead = () => {
    if (list.length === 0) return;
    lg(`Deleted head (${list[0].val})`);
    setList(p => p.slice(1));
  };
  const deleteTail = () => {
    if (list.length === 0) return;
    lg(`Deleted tail (${list[list.length-1].val})`);
    setList(p => p.slice(0,-1));
  };
  const reverse = () => {
    setList(p => [...p].reverse().map(n => ({...n, highlight:true})));
    lg('List reversed!');
    setTimeout(() => setList(p => p.map(n => ({...n, highlight:false}))), 1200);
  };

  const nodeW = 60; const gap = 30; const totalW = list.length * (nodeW + gap);

  return (
    <div style={{ color:'var(--tx-1)', fontFamily:'monospace' }}>
      <div style={{ display:'flex', gap:8, marginBottom:10, flexWrap:'wrap', alignItems:'center' }}>
        <input value={inp} onChange={e => setInp(e.target.value)} placeholder="Value…" style={{ padding:'6px 10px', borderRadius:6, border:'1px solid var(--border)', background:'var(--bg-surface)', color:'var(--tx-1)', width:90, fontSize:13 }} />
        <button onClick={insertHead} style={{ padding:'6px 10px', borderRadius:6, background:'var(--accent)', color:'#fff', border:'none', cursor:'pointer', fontSize:12, fontWeight:700 }}>Head</button>
        <button onClick={insertTail} style={{ padding:'6px 10px', borderRadius:6, background:'#10b981', color:'#fff', border:'none', cursor:'pointer', fontSize:12, fontWeight:700 }}>Tail</button>
        <input value={idxInp} onChange={e => setIdxInp(e.target.value)} placeholder="Idx…" style={{ padding:'6px 8px', borderRadius:6, border:'1px solid var(--border)', background:'var(--bg-surface)', color:'var(--tx-1)', width:60, fontSize:13 }} />
        <button onClick={insertAt} style={{ padding:'6px 10px', borderRadius:6, background:'#8b5cf6', color:'#fff', border:'none', cursor:'pointer', fontSize:12, fontWeight:700 }}>At Idx</button>
        <div style={{ width:1, height:24, background:'var(--border)', margin:'0 4px' }} />
        <button onClick={deleteHead} style={{ padding:'6px 10px', borderRadius:6, background:'var(--bg-surface)', color:'#ef4444', border:'1px solid #ef444440', cursor:'pointer', fontSize:12 }}>Del Head</button>
        <button onClick={deleteTail} style={{ padding:'6px 10px', borderRadius:6, background:'var(--bg-surface)', color:'#ef4444', border:'1px solid #ef444440', cursor:'pointer', fontSize:12 }}>Del Tail</button>
        <button onClick={reverse} style={{ padding:'6px 10px', borderRadius:6, background:'var(--bg-surface)', color:'var(--tx-2)', border:'1px solid var(--border)', cursor:'pointer', fontSize:12 }}>Reverse</button>
      </div>

      <div style={{ background:'var(--bg-surface)', borderRadius:10, border:'1px solid var(--border)', padding:'24px 16px', marginBottom:10, overflowX:'auto' }}>
        {list.length === 0 ? (
          <div style={{ textAlign:'center', color:'var(--tx-3)', fontSize:13 }}>Empty list</div>
        ) : (
          <div style={{ display:'flex', alignItems:'center', gap:0, minWidth:totalW }}>
            <div style={{ fontSize:10, color:'var(--tx-3)', marginRight:8 }}>HEAD</div>
            {list.map((n, i) => (
              <div key={n.id} style={{ display:'flex', alignItems:'center' }}>
                <div style={{
                  display:'flex', flexDirection:'column', alignItems:'center',
                  transition:'all 0.3s',
                }}>
                  <div style={{
                    width:52, height:40, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center',
                    background: n.highlight ? 'var(--accent)' : 'var(--bg-base)',
                    border: `2px solid ${n.highlight ? 'var(--accent)' : 'var(--border)'}`,
                    color: n.highlight ? '#fff' : 'var(--tx-1)',
                    fontWeight:700, fontSize:15, transition:'all 0.3s',
                  }}>{n.val}</div>
                  <div style={{ fontSize:9, color:'var(--tx-3)', marginTop:3 }}>[{i}]</div>
                </div>
                {i < list.length - 1 && (
                  <div style={{ display:'flex', alignItems:'center', margin:'0 4px', marginBottom:10 }}>
                    <div style={{ width:8, height:2, background:'var(--tx-3)' }} />
                    <div style={{ width:0, height:0, borderTop:'4px solid transparent', borderBottom:'4px solid transparent', borderLeft:`6px solid var(--tx-3)` }} />
                  </div>
                )}
              </div>
            ))}
            <div style={{ fontSize:11, color:'var(--tx-3)', marginLeft:8, marginBottom:12 }}>→ null</div>
            <div style={{ fontSize:10, color:'var(--tx-3)', marginLeft:4, marginBottom:12 }}>TAIL</div>
          </div>
        )}
      </div>

      <div style={{ fontSize:12, color:'var(--tx-3)', background:'var(--bg-surface)', borderRadius:8, padding:'6px 10px', border:'1px solid var(--border)', marginBottom:8 }}>
        Length: <span style={{ color:'var(--accent)', fontWeight:700 }}>{list.length}</span>
      </div>

      <div style={{ fontSize:11, color:'var(--tx-3)', lineHeight:1.8 }}>
        {log.map((l,i) => <div key={i} style={{ opacity:1-i*0.16 }}>» {l}</div>)}
      </div>
    </div>
  );
}
