'use client';
import { useState } from 'react';

export default function SlidingWindowVisualizer() {
  const [arr] = useState([4,2,7,3,6,1,8,5,9,2]);
  const [k, setK] = useState(3);
  const [windowStart, setWindowStart] = useState<number|null>(null);
  const [windowEnd, setWindowEnd] = useState<number|null>(null);
  const [maxWin, setMaxWin] = useState<[number,number]|null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [curSum, setCurSum] = useState<number|null>(null);
  const [maxSum, setMaxSum] = useState<number|null>(null);

  const reset = () => { setWindowStart(null); setWindowEnd(null); setMaxWin(null); setSteps([]); setCurSum(null); setMaxSum(null); };

  const run = async () => {
    reset();
    const s:string[]=[];
    let sum = arr.slice(0,k).reduce((a,b)=>a+b,0);
    let max = sum, maxS=0;
    setWindowStart(0); setWindowEnd(k-1); setCurSum(sum); setMaxSum(sum);
    s.push(`Initial window [0..${k-1}] = [${arr.slice(0,k).join(',')}], sum=${sum}`);
    setSteps([...s]);
    await new Promise(r=>setTimeout(r,800));
    for (let i=k; i<arr.length; i++) {
      sum = sum - arr[i-k] + arr[i];
      setWindowStart(i-k+1); setWindowEnd(i); setCurSum(sum);
      s.push(`Slide: remove arr[${i-k}]=${arr[i-k]}, add arr[${i}]=${arr[i]} → sum=${sum}`);
      setSteps([...s]);
      if (sum>max) { max=sum; maxS=i-k+1; setMaxSum(max); setMaxWin([maxS,i]); s.push(`  New max! sum=${sum} at [${i-k+1}..${i}]`); setSteps([...s]); }
      await new Promise(r=>setTimeout(r,800));
    }
    s.push(`✅ Max sum=${max} in window [${maxS}..${maxS+k-1}]`);
    setSteps([...s]);
    setWindowStart(maxS); setWindowEnd(maxS+k-1);
  };

  return (
    <div>
      <h2 style={{fontSize:18,fontWeight:900,color:'var(--tx-1)',margin:'0 0 4px'}}>🪟 Sliding Window Visualizer</h2>
      <p style={{fontSize:13,color:'var(--tx-3)',margin:'0 0 20px'}}>Fixed size k ka maximum sum subarray dhundho</p>

      <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:20,padding:16,borderRadius:14,background:'var(--bg-surface)',border:'1px solid var(--border)',alignItems:'center'}}>
        <label style={{fontSize:13,color:'var(--tx-2)',fontWeight:700}}>Window size k:</label>
        <select value={k} onChange={e=>{setK(+e.target.value);reset();}} style={{padding:'6px 12px',borderRadius:8,border:'1px solid var(--border)',background:'var(--bg-elevated)',color:'var(--tx-1)'}}>
          {[2,3,4,5].map(v=><option key={v} value={v}>{v}</option>)}
        </select>
        <button onClick={run} style={{padding:'8px 20px',borderRadius:9,fontSize:13,fontWeight:700,cursor:'pointer',border:'none',background:'var(--accent)',color:'#fff'}}>▶ Visualize</button>
        <button onClick={reset} style={{padding:'8px 18px',borderRadius:9,fontSize:13,fontWeight:700,cursor:'pointer',border:'1px solid var(--border)',background:'transparent',color:'var(--tx-2)'}}>🔄 Reset</button>
      </div>

      {curSum!==null && (
        <div style={{display:'flex',gap:12,marginBottom:16}}>
          <div style={{padding:'10px 18px',borderRadius:10,background:'var(--bg-surface)',border:'1px solid var(--border)'}}>
            <span style={{fontSize:11,color:'var(--tx-3)'}}>Current Sum </span>
            <span style={{fontSize:18,fontWeight:900,color:'#f59e0b'}}>{curSum}</span>
          </div>
          <div style={{padding:'10px 18px',borderRadius:10,background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.3)'}}>
            <span style={{fontSize:11,color:'var(--tx-3)'}}>Max Sum </span>
            <span style={{fontSize:18,fontWeight:900,color:'#10b981'}}>{maxSum}</span>
          </div>
        </div>
      )}

      <div style={{padding:20,borderRadius:14,background:'var(--bg-surface)',border:'1px solid var(--border)',marginBottom:16}}>
        <div style={{display:'flex',gap:8,justifyContent:'center'}}>
          {arr.map((v,i)=>{
            const inWin = windowStart!==null && windowEnd!==null && i>=windowStart && i<=windowEnd;
            const isMax = maxWin && i>=maxWin[0] && i<=maxWin[1];
            let bg='var(--bg-elevated)', bdr='var(--border)', clr='var(--tx-1)';
            if (isMax && windowStart===maxWin![0]) { bg='rgba(16,185,129,0.2)'; bdr='#10b981'; clr='#10b981'; }
            else if (inWin) { bg='rgba(245,158,11,0.2)'; bdr='#f59e0b'; clr='#f59e0b'; }
            return (
              <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                <div style={{width:46,height:46,borderRadius:10,background:bg,border:`2px solid ${bdr}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:800,color:clr,transition:'all 0.3s'}}>{v}</div>
                <span style={{fontSize:9,color:'var(--tx-4)'}}>{i}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{padding:14,borderRadius:12,background:'var(--bg-surface)',border:'1px solid var(--border)',maxHeight:200,overflowY:'auto'}}>
        {steps.map((s,i)=><div key={i} style={{fontSize:12,color:s.startsWith('✅')?'#10b981':s.includes('New max')?'#f59e0b':'var(--tx-2)',padding:'4px 0',borderBottom:'1px solid var(--border)'}}>{s}</div>)}
      </div>
    </div>
  );
}
