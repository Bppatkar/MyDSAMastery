'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

type Algo = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap';

const ALGO_INFO: Record<Algo, { name:string; time:string; space:string; desc:string }> = {
  bubble:    { name:'Bubble Sort',    time:'O(n²)',    space:'O(1)',      desc:'Adjacent elements compare karke swap karo jab tak sorted na ho.' },
  selection: { name:'Selection Sort', time:'O(n²)',    space:'O(1)',      desc:'Har step mein minimum element dhundh ke sahi jagah rakh do.' },
  insertion: { name:'Insertion Sort', time:'O(n²)',    space:'O(1)',      desc:'Ek ek element uthao aur sorted part mein sahi jagah daalo.' },
  merge:     { name:'Merge Sort',     time:'O(n log n)',space:'O(n)',    desc:'Array ko divide karo, phir sorted halves ko merge karo.' },
  quick:     { name:'Quick Sort',     time:'O(n log n)',space:'O(log n)',desc:'Pivot choose karo, uske around array partition karo.' },
  heap:      { name:'Heap Sort',      time:'O(n log n)',space:'O(1)',    desc:'Max-heap banao, root ko end par le jao. Repeat.' },
};

export default function SortingVisualizer() {
  const [arr, setArr]           = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted]     = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [algo, setAlgo]         = useState<Algo>('bubble');
  const [speed, setSpeed]       = useState(80);
  const [running, setRunning]   = useState(false);
  const [size, setSize]         = useState(20);
  const stopRef = useRef(false);

  const genArr = useCallback(() => {
    setArr(Array.from({length: size}, () => Math.floor(Math.random()*90)+10));
    setComparing([]); setSorted([]); setSwapping([]);
  }, [size]);

  useEffect(() => { genArr(); }, [genArr]);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
  const delay = () => sleep(Math.max(10, 200 - speed*1.8));

  const runBubble = async (a: number[]) => {
    const arr = [...a];
    const sortedIdx: number[] = [];
    for (let i = 0; i < arr.length-1; i++) {
      for (let j = 0; j < arr.length-i-1; j++) {
        if (stopRef.current) return;
        setComparing([j, j+1]);
        await delay();
        if (arr[j] > arr[j+1]) {
          setSwapping([j, j+1]);
          [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
          setArr([...arr]);
          await delay();
        }
      }
      sortedIdx.unshift(arr.length-1-i);
      setSorted([...sortedIdx]);
    }
    setSorted(arr.map((_,i) => i)); setComparing([]); setSwapping([]);
  };

  const runSelection = async (a: number[]) => {
    const arr = [...a];
    const sortedIdx: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i+1; j < arr.length; j++) {
        if (stopRef.current) return;
        setComparing([minIdx, j]);
        await delay();
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        setSwapping([i, minIdx]);
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArr([...arr]);
        await delay();
      }
      sortedIdx.push(i);
      setSorted([...sortedIdx]);
    }
    setSorted(arr.map((_,i) => i)); setComparing([]); setSwapping([]);
  };

  const runInsertion = async (a: number[]) => {
    const arr = [...a];
    for (let i = 1; i < arr.length; i++) {
      if (stopRef.current) return;
      const key = arr[i];
      let j = i-1;
      setComparing([i]);
      while (j >= 0 && arr[j] > key) {
        if (stopRef.current) return;
        setSwapping([j, j+1]);
        arr[j+1] = arr[j];
        setArr([...arr]);
        await delay();
        j--;
      }
      arr[j+1] = key;
      setArr([...arr]);
      setSorted(arr.slice(0, i+1).map((_,k) => k));
      await delay();
    }
    setSorted(arr.map((_,i) => i)); setComparing([]); setSwapping([]);
  };

  const runMerge = async (a: number[]) => {
    const arr = [...a];
    const merge = async (lo: number, mid: number, hi: number) => {
      const left = arr.slice(lo, mid+1);
      const right = arr.slice(mid+1, hi+1);
      let i=0, j=0, k=lo;
      while (i<left.length && j<right.length) {
        if (stopRef.current) return;
        setComparing([lo+i, mid+1+j]);
        await delay();
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
        setArr([...arr]);
      }
      while (i<left.length) { arr[k++] = left[i++]; setArr([...arr]); await delay(); }
      while (j<right.length) { arr[k++] = right[j++]; setArr([...arr]); await delay(); }
    };
    const mergeSort = async (lo: number, hi: number) => {
      if (lo >= hi || stopRef.current) return;
      const mid = Math.floor((lo+hi)/2);
      await mergeSort(lo, mid);
      await mergeSort(mid+1, hi);
      await merge(lo, mid, hi);
    };
    await mergeSort(0, arr.length-1);
    setSorted(arr.map((_,i) => i)); setComparing([]); setSwapping([]);
  };

  const runQuick = async (a: number[]) => {
    const arr = [...a];
    const partition = async (lo: number, hi: number): Promise<number> => {
      const pivot = arr[hi];
      let i = lo-1;
      for (let j=lo; j<hi; j++) {
        if (stopRef.current) return -1;
        setComparing([j, hi]);
        await delay();
        if (arr[j] <= pivot) {
          i++;
          setSwapping([i, j]);
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArr([...arr]);
          await delay();
        }
      }
      [arr[i+1], arr[hi]] = [arr[hi], arr[i+1]];
      setArr([...arr]);
      return i+1;
    };
    const quickSort = async (lo: number, hi: number) => {
      if (lo >= hi || stopRef.current) return;
      const pi = await partition(lo, hi);
      if (pi === -1) return;
      setSorted(prev => [...new Set([...prev, pi])]);
      await quickSort(lo, pi-1);
      await quickSort(pi+1, hi);
    };
    await quickSort(0, arr.length-1);
    setSorted(arr.map((_,i) => i)); setComparing([]); setSwapping([]);
  };

  const start = async () => {
    stopRef.current = false;
    setRunning(true);
    setSorted([]); setComparing([]); setSwapping([]);
    const a = [...arr];

  const runHeap = async (a: number[]) => {
    const arr = [...a];
    const n = arr.length;
    const heapify = async (n2: number, i: number) => {
      let largest = i, l = 2*i+1, r = 2*i+2;
      if (l < n2 && arr[l] > arr[largest]) largest = l;
      if (r < n2 && arr[r] > arr[largest]) largest = r;
      if (largest !== i) {
        setHighlights([i, largest]);
        await sleep();
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setBars([...arr]);
        await heapify(n2, largest);
      }
    };
    for (let i = Math.floor(n/2)-1; i >= 0; i--) await heapify(n, i);
    for (let i = n-1; i > 0; i--) {
      setHighlights([0, i]);
      await sleep();
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setBars([...arr]);
      await heapify(i, 0);
    }
    setHighlights([]);
  };
    if (algo==='bubble')    await runBubble(a);
    if (algo==='selection') await runSelection(a);
    if (algo==='insertion') await runInsertion(a);
    if (algo==='merge')     await runMerge(a);
    if (algo==='quick')     await runQuick(a);
    if (algo==='heap')      await runHeap(a);
    setRunning(false);
  };

  const stop = () => { stopRef.current = true; setRunning(false); };

  const maxVal = Math.max(...arr, 1);
  const info = ALGO_INFO[algo];

  return (
    <div>
      <h2 style={{ fontSize:18, fontWeight:900, color:'var(--tx-1)', margin:'0 0 4px' }}>📊 Sorting Visualizer</h2>
      <p style={{ fontSize:13, color:'var(--tx-3)', margin:'0 0 20px' }}>{info.desc}</p>

      {/* Controls */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:20, padding:16, borderRadius:14, background:'var(--bg-surface)', border:'1px solid var(--border)' }}>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {(Object.keys(ALGO_INFO) as Algo[]).map(a => (
            <button key={a} onClick={() => { setAlgo(a); genArr(); }} disabled={running} style={{ padding:'6px 14px', borderRadius:8, fontSize:12, fontWeight:700, cursor:running?'default':'pointer', border:'1.5px solid', borderColor:algo===a?'var(--accent)':'var(--border)', background:algo===a?'var(--accent-bg)':'transparent', color:algo===a?'var(--accent)':'var(--tx-2)' }}>
              {ALGO_INFO[a].name}
            </button>
          ))}
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center', marginLeft:'auto' }}>
          <label style={{ fontSize:12, color:'var(--tx-3)' }}>Size: {size}</label>
          <input type="range" min={8} max={50} value={size} onChange={e=>{setSize(+e.target.value); genArr();}} disabled={running} style={{ width:80 }} />
          <label style={{ fontSize:12, color:'var(--tx-3)' }}>Speed</label>
          <input type="range" min={1} max={100} value={speed} onChange={e=>setSpeed(+e.target.value)} style={{ width:80 }} />
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={genArr} disabled={running} style={{ padding:'8px 18px', borderRadius:9, fontSize:13, fontWeight:700, cursor:running?'default':'pointer', border:'1px solid var(--border)', background:'var(--bg-elevated)', color:'var(--tx-1)' }}>🔀 New Array</button>
          {!running
            ? <button onClick={start} style={{ padding:'8px 18px', borderRadius:9, fontSize:13, fontWeight:700, cursor:'pointer', border:'none', background:'var(--accent)', color:'#fff' }}>▶ Start</button>
            : <button onClick={stop} style={{ padding:'8px 18px', borderRadius:9, fontSize:13, fontWeight:700, cursor:'pointer', border:'none', background:'#ef4444', color:'#fff' }}>⏹ Stop</button>
          }
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'flex', gap:12, marginBottom:16 }}>
        {[['Time', info.time, '#10b981'],['Space', info.space, '#6366f1'],['Comparing','2 elements','#f59e0b'],['Swapping','swapped','#ef4444']].map(([l,v,c])=>(
          <div key={l} style={{ padding:'8px 14px', borderRadius:10, background:'var(--bg-surface)', border:'1px solid var(--border)', fontSize:12 }}>
            <span style={{ color:'var(--tx-3)' }}>{l}: </span>
            <span style={{ fontWeight:700, color:c }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Bars */}
      <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:220, padding:16, borderRadius:14, background:'var(--bg-surface)', border:'1px solid var(--border)' }}>
        {arr.map((v, i) => {
          let color = '#6366f1';
          if (sorted.includes(i)) color = '#10b981';
          else if (swapping.includes(i)) color = '#ef4444';
          else if (comparing.includes(i)) color = '#f59e0b';
          return (
            <div key={i} style={{ flex:1, height:`${(v/maxVal)*100}%`, borderRadius:'4px 4px 0 0', background:color, transition:'height 0.05s', minWidth:4, display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
              {arr.length <= 20 && <span style={{ fontSize:8, color:'#fff', fontWeight:700, paddingBottom:2 }}>{v}</span>}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display:'flex', gap:16, marginTop:12 }}>
        {[['Comparing','#f59e0b'],['Swapping','#ef4444'],['Sorted','#10b981'],['Unsorted','#6366f1']].map(([l,c])=>(
          <div key={l} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--tx-3)' }}>
            <span style={{ width:12, height:12, borderRadius:3, background:c, display:'inline-block' }} />{l}
          </div>
        ))}
      </div>
    </div>
  );
}
