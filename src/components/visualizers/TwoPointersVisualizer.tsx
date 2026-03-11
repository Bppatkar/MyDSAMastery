'use client';
import { useState } from 'react';

export default function TwoPointersVisualizer() {
  const [arr] = useState([2,7,11,15,18,22,26,30,35,40]);
  const [target, setTarget] = useState(37);
  const [lo, setLo] = useState<number|null>(null);
  const [hi, setHi] = useState<number|null>(null);
  const [result, setResult] = useState<[number,number]|null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const stateRef = { lo: 0, hi: arr.length-1 };

  const reset = () => { setLo(null); setHi(null); setResult(null); setSteps([]); setDone(false); };

  const runAll = async () => {
    reset();
    let l=0, h=arr.length-1;
    const s:string[]=[];
    while (l<h) {
      setLo(l); setHi(h);
      const sum = arr[l]+arr[h];
      s.push(`lo=${l}(${arr[l]}), hi=${h}(${arr[h]}) → sum=${sum}`);
      setSteps([...s]);
      await new Promise(r=>setTimeout(r,700));
      if (sum===target) { s.push(`✅ Found! arr[${l}]+arr[${h}]=${target}`); setResult([l,h]); setSteps([...s]); setDone(true); return; }
      else if (sum<target) { s.push(`sum < target → lo++`); l++; }
      else { s.push(`sum > target → hi--`); h--; }
      setSteps([...s]);
    }
    s.push('❌ No pair found'); setSteps([...s]); setDone(true);
  };

  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:900,color:'var(--tx-1)',margin:'0 0 4px'}}>👆 Two Pointers Visualizer</h2>
      <p style={{fontSize:13,color:'var(--tx-3)',margin:'0 0 20px'}}>Sorted array mein do elements ka sum = target dhundho</p>

      <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:20,padding:16,borderRadius:14,background:'var(--bg-surface)',border:'1px solid var(--border)',alignItems:'center'}}>
        <label style={{fontSize:13,color:'var(--tx-2)',fontWeight:700}}>Target: </label>
        <select value={target} onChange={e=>{setTarget(+e.target.value);reset();}} style={{padding:'6px 12px',borderRadius:8,border:'1px solid var(--border)',background:'var(--bg-elevated)',color:'var(--tx-1)'}}>
          {[22,33,37,42,51,62,66,75].map(v=><option key={v} value={v}>{v}</option>)}
        </select>
        <button onClick={runAll} disabled={done} style={{padding:'8px 20px',borderRadius:9,fontSize:13,fontWeight:700,cursor:done?'default':'pointer',border:'none',background:'var(--accent)',color:'#fff'}}>▶ Visualize</button>
        <button onClick={reset} style={{padding:'8px 18px',borderRadius:9,fontSize:13,fontWeight:700,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--tx-2)'}}>🔄 Reset</button>
      </div>

      <div style={{padding:20,borderRadius:14,background:'var(--bg-surface)',border:'1px solid var(--border)',marginBottom:16}}>
        <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap',marginBottom:16}}>
          {arr.map((v,i)=>{
            let bg='var(--bg-elevated)', bdr='var(--border)', clr='var(--tx-1)';
            if (result && (i===result[0]||i===result[1])) { bg='rgba(16,185,129,0.2)'; bdr='#10b981'; clr='#10b981'; }
            else if (i===lo) { bg='rgba(99,102,241,0.2)'; bdr='#6366f1'; clr='#6366f1'; }
            else if (i===hi) { bg='rgba(245,158,11,0.2)'; bdr='#f59e0b'; clr='#f59e0b'; }
            return (
              <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                <div style={{width:48,height:48,borderRadius:10,background:bg,border:`2px solid ${bdr}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:800,color:clr,transition:'all 0.3s'}}>{v}</div>
                <span style={{fontSize:9,color:'var(--tx-4)'}}>{i}</span>
                {i===lo && <span style={{fontSize:10,color:'#6366f1',fontWeight:700}}>← lo</span>}
                {i===hi && <span style={{fontSize:10,color:'#f59e0b',fontWeight:700}}>hi →</span>}
              </div>
            );
          })}
        </div>
        <div style={{textAlign:'center',fontSize:14,fontWeight:700,color:'var(--tx-2)'}}>
          {lo!==null&&hi!==null&&!result ? `Current sum: ${arr[lo]}+${arr[hi]}=${arr[lo]+arr[hi]} | Target: ${target}` : ''}
          {result ? <span style={{color:'#10b981'}}>✅ Found: arr[{result[0]}] + arr[{result[1]}] = {arr[result[0]]}+{arr[result[1]]}={target}</span> : ''}
        </div>
      </div>

      <div style={{padding:14,borderRadius:12,background:'var(--bg-surface)',border:'1px solid var(--border)',maxHeight:200,overflowY:'auto'}}>
        {steps.map((s,i)=><div key={i} style={{fontSize:12,color:s.startsWith('✅')?'#10b981':s.startsWith('❌')?'#ef4444':'var(--tx-2)',padding:'4px 0',borderBottom:'1px solid var(--border)'}}>{s}</div>)}
      </div>
    </div>
  );
}
