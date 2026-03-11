'use client';
import { useState } from 'react';

interface Item { val: number | string; id: number; }
let idC = 200;

export default function StackQueueVisualizer() {
  const [mode, setMode] = useState<'stack' | 'queue'>('stack');
  const [stack, setStack] = useState<Item[]>([{val:3,id:idC++},{val:7,id:idC++},{val:1,id:idC++},{val:9,id:idC++}]);
  const [queue, setQueue] = useState<Item[]>([{val:'A',id:idC++},{val:'B',id:idC++},{val:'C',id:idC++}]);
  const [input, setInput] = useState('');
  const [hl, setHl] = useState<number | null>(null);
  const [log, setLog] = useState('Stack + Queue visualizer');
  const [popped, setPopped] = useState<Item | null>(null);

  const flash = (id: number) => { setHl(id); setTimeout(() => setHl(null), 800); };

  const push = () => {
    const v = input || Math.floor(Math.random() * 99) + 1;
    const item = { val: v, id: idC++ };
    if (mode === 'stack') { setStack(prev => [...prev, item]); setLog(`Pushed ${v} → stack top`); }
    else { setQueue(prev => [...prev, item]); setLog(`Enqueued ${v} → queue rear`); }
    flash(item.id); setInput('');
  };

  const pop = () => {
    if (mode === 'stack') {
      if (!stack.length) { setLog('Stack is empty!'); return; }
      const top = stack[stack.length - 1];
      setPopped(top); flash(top.id);
      setTimeout(() => { setStack(prev => prev.slice(0, -1)); setPopped(null); }, 500);
      setLog(`Popped: ${top.val}`);
    } else {
      if (!queue.length) { setLog('Queue is empty!'); return; }
      const front = queue[0];
      setPopped(front); flash(front.id);
      setTimeout(() => { setQueue(prev => prev.slice(1)); setPopped(null); }, 500);
      setLog(`Dequeued: ${front.val}`);
    }
  };

  const peek = () => {
    if (mode === 'stack') {
      if (!stack.length) { setLog('Stack empty'); return; }
      const top = stack[stack.length - 1]; flash(top.id);
      setLog(`Peek → ${top.val} (stack top)`);
    } else {
      if (!queue.length) { setLog('Queue empty'); return; }
      const front = queue[0]; flash(front.id);
      setLog(`Peek → ${front.val} (queue front)`);
    }
  };

  const items = mode === 'stack' ? stack : queue;

  const B = ({ label, onClick, color = 'var(--accent)' }: any) => (
    <button onClick={onClick} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: color, color: '#fff' }}>{label}</button>
  );

  return (
    <div style={{ background: 'var(--bg-surface)', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--tx-1)' }}>📚 Stack / Queue</span>
        <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
          {(['stack','queue'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setLog(`Switched to ${m}`); }} style={{ padding: '5px 14px', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: mode === m ? 'var(--accent)' : 'transparent', color: mode === m ? '#fff' : 'var(--tx-2)' }}>{m.charAt(0).toUpperCase() + m.slice(1)}</button>
          ))}
        </div>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && push()} placeholder="Value (optional)" style={{ padding: '5px 9px', borderRadius: 7, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 12, width: 120 }} />
        <B label={mode === 'stack' ? '⬆ Push' : '⬅ Enqueue'} onClick={push} />
        <B label={mode === 'stack' ? '⬇ Pop' : '➡ Dequeue'} onClick={pop} color="#ef4444" />
        <B label="👁 Peek" onClick={peek} color="#f59e0b" />
      </div>

      <div style={{ display: 'flex', gap: 0 }}>
        {/* Visualization */}
        <div style={{ flex: 1, padding: 24, background: 'var(--bg-base)', minHeight: 320 }}>
          {mode === 'stack' ? (
            <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: 4, minHeight: 260 }}>
              <div style={{ width: 200, borderBottom: '3px solid var(--accent)', marginTop: 8 }} />
              <div style={{ fontSize: 10, color: 'var(--tx-3)' }}>BOTTOM</div>
              {stack.map((item, i) => (
                <div key={item.id} style={{
                  width: 200, padding: '10px 0', textAlign: 'center', borderRadius: 10,
                  background: hl === item.id ? 'var(--accent)' : 'var(--bg-elevated)',
                  border: `2px solid ${hl === item.id ? 'var(--accent)' : 'var(--border)'}`,
                  color: hl === item.id ? '#fff' : 'var(--tx-1)',
                  fontWeight: 700, fontSize: 16, transition: 'all 0.3s',
                  position: 'relative',
                }}>
                  {item.val}
                  {i === stack.length - 1 && <span style={{ position: 'absolute', right: -50, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: 'var(--accent)', fontWeight: 700 }}>← TOP</span>}
                </div>
              ))}
              {stack.length === 0 && <div style={{ color: 'var(--tx-3)', fontSize: 13, padding: 20 }}>Empty stack</div>}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ fontSize: 10, color: '#10b981', fontWeight: 700, width: 50, textAlign: 'right' }}>FRONT →</div>
                {queue.map((item, i) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      padding: '12px 18px', borderRadius: 10, textAlign: 'center',
                      background: hl === item.id ? 'var(--accent)' : 'var(--bg-elevated)',
                      border: `2px solid ${hl === item.id ? 'var(--accent)' : 'var(--border)'}`,
                      color: hl === item.id ? '#fff' : 'var(--tx-1)',
                      fontWeight: 700, fontSize: 16, transition: 'all 0.3s', minWidth: 52,
                    }}>{item.val}</div>
                    {i < queue.length - 1 && <div style={{ fontSize: 16, color: 'var(--tx-3)', margin: '0 4px' }}>→</div>}
                  </div>
                ))}
                {queue.length === 0 && <div style={{ color: 'var(--tx-3)', fontSize: 13, padding: '12px 20px' }}>Empty queue</div>}
                {queue.length > 0 && <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 700, width: 50 }}>→ REAR</div>}
              </div>
              <div style={{ marginLeft: 53, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, color: '#10b981' }}>Dequeue from front</span>
                <span style={{ fontSize: 10, color: '#ef4444' }}>Enqueue to rear</span>
              </div>
            </div>
          )}
        </div>

        {/* Info panel */}
        <div style={{ width: 180, borderLeft: '1px solid var(--border)', background: 'var(--bg-surface)', padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 12 }}>Properties</div>
          {mode === 'stack' ? (
            <>
              <div style={{ fontSize: 12, color: 'var(--tx-2)', marginBottom: 6 }}>📦 LIFO — Last In First Out</div>
              <div style={{ fontSize: 11, color: 'var(--tx-3)', marginBottom: 4 }}>Size: {stack.length}</div>
              <div style={{ fontSize: 11, color: 'var(--tx-3)', marginBottom: 4 }}>Top: {stack[stack.length-1]?.val ?? 'none'}</div>
              <div style={{ marginTop: 12, fontSize: 11, color: 'var(--tx-3)' }}>Operations:</div>
              <div style={{ fontSize: 11, color: 'var(--tx-2)', marginTop: 4 }}>Push O(1)<br/>Pop O(1)<br/>Peek O(1)</div>
              <div style={{ marginTop: 12, fontSize: 11, color: 'var(--tx-3)' }}>Used for:</div>
              <div style={{ fontSize: 11, color: 'var(--tx-2)', marginTop: 4 }}>• Function calls<br/>• Undo/redo<br/>• Balanced brackets<br/>• DFS</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 12, color: 'var(--tx-2)', marginBottom: 6 }}>📬 FIFO — First In First Out</div>
              <div style={{ fontSize: 11, color: 'var(--tx-3)', marginBottom: 4 }}>Size: {queue.length}</div>
              <div style={{ fontSize: 11, color: 'var(--tx-3)', marginBottom: 4 }}>Front: {queue[0]?.val ?? 'none'}</div>
              <div style={{ marginTop: 12, fontSize: 11, color: 'var(--tx-3)' }}>Operations:</div>
              <div style={{ fontSize: 11, color: 'var(--tx-2)', marginTop: 4 }}>Enqueue O(1)<br/>Dequeue O(1)<br/>Peek O(1)</div>
              <div style={{ marginTop: 12, fontSize: 11, color: 'var(--tx-3)' }}>Used for:</div>
              <div style={{ fontSize: 11, color: 'var(--tx-2)', marginTop: 4 }}>• BFS<br/>• Task scheduling<br/>• Print queue<br/>• Sliding window</div>
            </>
          )}
        </div>
      </div>

      <div style={{ padding: '10px 18px', borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <span style={{ fontSize: 12, color: 'var(--tx-2)', fontFamily: 'monospace' }}>▶ {log}</span>
      </div>
    </div>
  );
}
