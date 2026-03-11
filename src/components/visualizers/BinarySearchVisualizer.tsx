'use client';
import { useState, useRef } from 'react';

export default function BinarySearchVisualizer() {
  const [arr] = useState(() => Array.from({length:20},(_,i)=>(i+1)*5));
  const [target, setTarget] = useState(55);
  const [lo, setLo] = useState<number|null>(null);
  const [hi, setHi] = useState<number|null>(null);
  const [mid, setMid] = useState<number|null>(null);
  const [found, setFound] = useState<number|null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [running, setRunning] = useState(false);
  const stateRef = useRef({lo:0, hi:arr.length-1, steps:[] as string[]});

  const reset = () => {
    setLo(null); setHi(null); setMid(null); setFound(null);
    setSteps([]); setDone(false); setRunning(false);
    stateRef.current = {lo:0, hi:arr.length-1, steps:[]};
  };

  const stepForward = () => {
    if (done) return;
    const {lo: l, hi: h} = stateRef.current;
    if (l > h) {
      setSteps(s=>[...s, `❌ Target ${target} not found!`]);
      setDone(true); return;
    }
    const m = Math.floor((l+h)/2);
    setLo(l); setHi(h); setMid(m);
    const newSteps = [...stateRef.current.steps];
    newSteps.push(`lo=${l}, hi=${h}, mid=${m} → arr[${m}]=${arr[m]}`);
    if (arr[m] === target) {
      newSteps.push(`✅ Found ${target} at index ${m}!`);
      setFound(m); setDone(true);
    } else if (arr[m] < target) {
      newSteps.push(`arr[${m}]=${arr[m]} < ${target} → search right half`);
      stateRef.current = {lo:m+1, hi:h, steps:newSteps};
    } else {
      newSteps.push(`arr[${m}]=${arr[m]} > ${target} → search left half`);
      stateRef.current = {lo:l, hi:m-1, steps:newSteps};
    }
    setSteps(newSteps);
  };

  const runAll = async () => {
    reset();
    setRunning(true);
    await new Promise(r=>setTimeout(r,100));
    let l=0, h=arr.length-1;
    const s:string[]=[];
    while (l<=h) {
      const m=Math.floor((l+h)/2);
      setLo(l); setHi(h); setMid(m);
      s.push(`lo=${l}, hi=${h}, mid=${m} → arr[${m}]=${arr[m]}`);
      setSteps([...s]);
      await new Promise(r=>setTimeout(r,600));
      if (arr[m]===target) { s.push(`✅ Found at index ${m}!`); setFound(m); setSteps([...s]); break; }
      else if (arr[m]<target) { s.push(`→ Go right`); l=m+1; }
      else { s.push(`→ Go left`); h=m-1; }
      setSteps([...s]);
    }
    if (l>h) { s.push(`❌ Not found`); setSteps([...s]); }
    setDone(true); setRunning(false);
  };

  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:900,color:'var(--tx-1)',margin:'0 0 4px'}}>🔍 Binary Search Visualizer</h2>
      <p style={{fontSize:13,color:'var(--tx-3)',margin:'0 0 20px'}}>Sorted array mein O(log n) mein target dhundho</p>

      {/* Controls */}
      <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:20,padding:16,borderRadius:14,background:'var(--bg-surface)',border:'1px solid var(--border)',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <label style={{fontSize:13,color:'var(--tx-2)',fontWeight:700}}>Target:</label>
          <input type="number" value={target} onChange={e=>{setTarget(+e.target.value);reset();}}
            style={{width:80,padding:'6px 10px',borderRadius:8,border:'1px solid var(--border)',background:'var(--bg-elevated)',color:'var(--tx-1)',fontSize:14,fontWeight:700}} />
        </div>
        <button onClick={stepForward} disabled={done||running} style={{padding:'8px 18px',borderRadius:9,fontSize:13,fontWeight:700,cursor:done?'default':'pointer',border:'1px solid var(--border)',background:'var(--bg-elevated)',color:'var(--tx-1)'}}>
          ➡ Step
        </button>
        <button onClick={runAll} disabled={running} style={{padding:'8px 18px',borderRadius:9,fontSize:13,fontWeight:700,cursor:'pointer',border:'none',background:'var(--accent)',color:'#fff'}}>
          ▶ Run All
        </button>
        <button onClick={reset} style={{padding:'8px 18px',borderRadius:9,fontSize:13,fontWeight:700,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--tx-2)'}}>
          🔄 Reset
        </button>
      </div>

      {/* Array */}
      <div style={{display:'flex',gap:4,marginBottom:20,padding:20,borderRadius:14,background:'var(--bg-surface)',border:'1px solid var(--border)',flexWrap:'wrap'}}>
        {arr.map((v,i)=>{
          let bg='var(--bg-elevated)', bdr='var(--border)', clr='var(--tx-1)';
          if (found===i) { bg='rgba(16,185,129,0.2)'; bdr='#10b981'; clr='#10b981'; }
          else if (mid===i) { bg='rgba(245,158,11,0.2)'; bdr='#f59e0b'; clr='#f59e0b'; }
          else if (lo!==null && hi!==null && i>=lo && i<=hi) { bg='rgba(99,102,241,0.15)'; bdr='#6366f1'; clr='#6366f1'; }
          return (
            <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
              <div style={{width:44,height:44,borderRadius:10,background:bg,border:`2px solid ${bdr}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:800,color:clr,transition:'all 0.3s'}}>
                {v}
              </div>
              <span style={{fontSize:9,color:'var(--tx-4)'}}>{i}</span>
              {mid===i && <span style={{fontSize:9,color:'#f59e0b',fontWeight:700}}>mid</span>}
              {lo===i && found!==i && <span style={{fontSize:9,color:'#6366f1',fontWeight:700}}>lo</span>}
              {hi===i && found!==i && mid!==i && <span style={{fontSize:9,color:'#6366f1',fontWeight:700}}>hi</span>}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{display:'flex',gap:16,marginBottom:16}}>
        {[['Search space','#6366f1'],['Mid','#f59e0b'],['Found','#10b981']].map(([l,c])=>(
          <div key={l} style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'var(--tx-3)'}}>
            <span style={{width:12,height:12,borderRadius:3,background:c,display:'inline-block'}}/>{l}
          </div>
        ))}
      </div>

      {/* Steps log */}
      <div style={{padding:16,borderRadius:12,background:'var(--bg-surface)',border:'1px solid var(--border)',maxHeight:200,overflowY:'auto'}}>
        <p style={{fontSize:11,fontWeight:700,color:'var(--tx-3)',textTransform:'uppercase',margin:'0 0 8px'}}>Steps Log</p>
        {steps.length===0 ? <p style={{fontSize:13,color:'var(--tx-4)'}}>Step button dabaao ya Run All karo...</p>
          : steps.map((s,i)=><div key={i} style={{fontSize:12,color:s.startsWith('✅')?'#10b981':s.startsWith('❌')?'#ef4444':'var(--tx-2)',padding:'3px 0',borderBottom:'1px solid var(--border)'}}>{s}</div>)}
      </div>
    </div>
  );
}
