'use client';
import { useState } from 'react';

interface Item { val: number | string; id: number; highlight?: boolean; }
let nid = 200;

export default function StackQueueVisualizer() {
  const [mode, setMode] = useState<'stack'|'queue'>('stack');
  const [stack, setStack] = useState<Item[]>([{val:3,id:1},{val:7,id:2},{val:12,id:3}]);
  const [queue, setQueue] = useState<Item[]>([{val:5,id:4},{val:9,id:5},{val:2,id:6}]);
  const [inp, setInp] = useState('');
  const [log, setLog] = useState<string[]>(['Stack & Queue ready']);
  const lg = (m: string) => setLog(p => [m, ...p.slice(0,5)]);

  const items = mode === 'stack' ? stack : queue;
  const setItems = mode === 'stack' ? setStack : setQueue;

  const push = () => {
    const v = inp || String(Math.floor(Math.random()*99)+1);
    const newItem = {val:parseInt(v)||v, id:++nid, highlight:true};
    if (mode === 'stack') setStack(p => [...p, newItem]);
    else setQueue(p => [...p, newItem]);
    setInp(''); lg(`${mode==='stack'?'Push':'Enqueue'}: ${v}`);
    setTimeout(() => {
      if (mode === 'stack') setStack(p => p.map(x => ({...x, highlight:false})));
      else setQueue(p => p.map(x => ({...x, highlight:false})));
    }, 800);
  };

  const pop = () => {
    if (items.length === 0) { lg('Empty!'); return; }
    if (mode === 'stack') {
      const top = stack[stack.length - 1];
      lg(`Pop: ${top.val}`);
      setStack(p => p.slice(0,-1));
    } else {
      const front = queue[0];
      lg(`Dequeue: ${front.val}`);
      setQueue(p => p.slice(1));
    }
  };

  const peek = () => {
    if (items.length === 0) { lg('Empty!'); return; }
    const top = mode === 'stack' ? items[items.length-1] : items[0];
    setItems(p => p.map((x,i) => ({...x, highlight: mode==='stack' ? i===p.length-1 : i===0})));
    lg(`Peek: ${top.val}`);
    setTimeout(() => setItems(p => p.map(x => ({...x, highlight:false}))), 1000);
  };

  return (
    <div style={{ color:'var(--tx-1)', fontFamily:'monospace' }}>
      {/* Mode toggle */}
      <div style={{ display:'flex', gap:0, marginBottom:16, borderRadius:8, overflow:'hidden', border:'1px solid var(--border)', width:'fit-content' }}>
        {(['stack','queue'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding:'7px 20px', fontSize:13, fontWeight:700, border:'none', cursor:'pointer',
            background: mode===m ? 'var(--accent)' : 'var(--bg-surface)',
            color: mode===m ? '#fff' : 'var(--tx-2)',
          }}>{m === 'stack' ? '📚 Stack' : '🚶 Queue'}</button>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display:'flex', gap:8, marginBottom:16, alignItems:'center', flexWrap:'wrap' }}>
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key==='Enter' && push()} placeholder="Value (optional)…" style={{ padding:'6px 10px', borderRadius:6, border:'1px solid var(--border)', background:'var(--bg-surface)', color:'var(--tx-1)', width:150, fontSize:13 }} />
        <button onClick={push} style={{ padding:'6px 16px', borderRadius:6, background:'var(--accent)', color:'#fff', border:'none', cursor:'pointer', fontWeight:700, fontSize:13 }}>
          {mode==='stack' ? 'Push' : 'Enqueue'}
        </button>
        <button onClick={pop} style={{ padding:'6px 16px', borderRadius:6, background:'#ef4444', color:'#fff', border:'none', cursor:'pointer', fontWeight:700, fontSize:13 }}>
          {mode==='stack' ? 'Pop' : 'Dequeue'}
        </button>
        <button onClick={peek} style={{ padding:'6px 14px', borderRadius:6, background:'var(--bg-surface)', color:'var(--tx-2)', border:'1px solid var(--border)', cursor:'pointer', fontSize:13 }}>Peek</button>
      </div>

      <div style={{ display:'flex', gap:16, alignItems:'flex-end' }}>
        {/* Visual */}
        <div style={{ background:'var(--bg-surface)', borderRadius:10, border:'1px solid var(--border)', padding:16, flex:1, minHeight:200 }}>
          {mode === 'stack' ? (
            <div style={{ display:'flex', flexDirection:'column-reverse', gap:6, alignItems:'center' }}>
              <div style={{ fontSize:10, color:'var(--tx-3)', marginTop:4 }}>← BOTTOM</div>
              {stack.map((item, i) => (
                <div key={item.id} style={{
                  width:160, height:40, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 14px',
                  background: item.highlight ? 'var(--accent)' : i===stack.length-1 ? 'var(--accent-bg)' : 'var(--bg-base)',
                  border: `2px solid ${item.highlight ? 'var(--accent)' : i===stack.length-1 ? 'var(--accent)' : 'var(--border)'}`,
                  color: item.highlight ? '#fff' : 'var(--tx-1)',
                  fontWeight:700, fontSize:15, transition:'all 0.3s',
                  position:'relative',
                }}>
                  {item.val}
                  {i === stack.length-1 && <span style={{ fontSize:10, color: item.highlight?'#fff':'var(--accent)', fontWeight:400 }}>← TOP</span>}
                </div>
              ))}
              {stack.length === 0 && <div style={{ color:'var(--tx-3)', fontSize:13 }}>Stack is empty</div>}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:6, alignItems:'center' }}>
              <div style={{ fontSize:10, color:'var(--tx-3)', marginBottom:2 }}>FRONT (dequeue side) ↓</div>
              {queue.map((item, i) => (
                <div key={item.id} style={{
                  width:200, height:40, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 14px',
                  background: item.highlight ? 'var(--accent)' : i===0 ? 'var(--accent-bg)' : 'var(--bg-base)',
                  border: `2px solid ${item.highlight ? 'var(--accent)' : i===0 ? 'var(--accent)' : 'var(--border)'}`,
                  color: item.highlight ? '#fff' : 'var(--tx-1)',
                  fontWeight:700, fontSize:15, transition:'all 0.3s',
                }}>
                  {i===0 && <span style={{ fontSize:10, color: item.highlight?'#fff':'var(--accent)', fontWeight:400 }}>FRONT → </span>}
                  <span style={{ marginLeft: i===0?0:'auto', marginRight:'auto' }}>{item.val}</span>
                  {i===queue.length-1 && <span style={{ fontSize:10, color:'var(--tx-3)', fontWeight:400 }}>← REAR</span>}
                </div>
              ))}
              {queue.length === 0 && <div style={{ color:'var(--tx-3)', fontSize:13 }}>Queue is empty</div>}
              <div style={{ fontSize:10, color:'var(--tx-3)', marginTop:2 }}>↑ REAR (enqueue side)</div>
            </div>
          )}
        </div>

        {/* Info panel */}
        <div style={{ width:160, flexShrink:0 }}>
          <div style={{ background:'var(--bg-surface)', borderRadius:8, border:'1px solid var(--border)', padding:12, marginBottom:8 }}>
            <div style={{ fontSize:11, color:'var(--tx-3)', marginBottom:6 }}>COMPLEXITY</div>
            <div style={{ fontSize:12, color:'var(--tx-2)', lineHeight:1.8 }}>
              <div>Push/Pop: <span style={{ color:'var(--accent)' }}>O(1)</span></div>
              <div>Peek: <span style={{ color:'var(--accent)' }}>O(1)</span></div>
              <div>Search: <span style={{ color:'#f59e0b' }}>O(n)</span></div>
              <div>Space: <span style={{ color:'var(--accent)' }}>O(n)</span></div>
            </div>
          </div>
          <div style={{ background:'var(--bg-surface)', borderRadius:8, border:'1px solid var(--border)', padding:12 }}>
            <div style={{ fontSize:11, color:'var(--tx-3)', marginBottom:4 }}>SIZE</div>
            <div style={{ fontSize:24, fontWeight:900, color:'var(--accent)' }}>{items.length}</div>
          </div>
        </div>
      </div>

      <div style={{ fontSize:11, color:'var(--tx-3)', marginTop:10, lineHeight:1.8 }}>
        {log.map((l,i) => <div key={i} style={{ opacity:1-i*0.16 }}>» {l}</div>)}
      </div>
    </div>
  );
}
