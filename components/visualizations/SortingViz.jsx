"use client";
import { useState, useRef, useEffect, useCallback } from "react";

// ── Step generators ──────────────────────────────────────────
function* bubbleSteps(arr) {
  const a = [...arr], n = a.length;
  const sorted = new Set();
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      yield { arr: [...a], comparing: [j, j + 1], sorted: [...sorted], msg: `${a[j]} aur ${a[j+1]} compare kar rahe hain` };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { arr: [...a], swapped: [j, j + 1], sorted: [...sorted], msg: `${a[j+1]} > ${a[j]} → SWAP! 🔄` };
      }
    }
    sorted.add(n - 1 - i);
  }
  sorted.add(0);
  yield { arr: [...a], sorted: [...Array(n).keys()], msg: "Array sort ho gaya! ✅" };
}

function* selectionSteps(arr) {
  const a = [...arr], n = a.length;
  const sorted = new Set();
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    yield { arr: [...a], minAt: minIdx, scanFrom: i, sorted: [...sorted], msg: `Pass ${i+1}: Minimum dhundh rahe hain index ${i} se` };
    for (let j = i + 1; j < n; j++) {
      yield { arr: [...a], comparing: [minIdx, j], minAt: minIdx, sorted: [...sorted], msg: `${a[j]} < ${a[minIdx]}? ${a[j] < a[minIdx] ? 'Haan! Naya minimum' : 'Nahi'}` };
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      yield { arr: [...a], swapped: [i, minIdx], sorted: [...sorted], msg: `Minimum ${a[i]} ko index ${i} pe laya 🔄` };
    }
    sorted.add(i);
  }
  sorted.add(n - 1);
  yield { arr: [...a], sorted: [...Array(n).keys()], msg: "Array sort ho gaya! ✅" };
}

function* insertionSteps(arr) {
  const a = [...arr], n = a.length;
  yield { arr: [...a], sorted: [0], current: 0, msg: "Pehla element already sorted hai" };
  for (let i = 1; i < n; i++) {
    let key = a[i], j = i - 1;
    yield { arr: [...a], current: i, sorted: [...Array(i).keys()], msg: `${key} ko sahi jagah insert karna hai` };
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      yield { arr: [...a], comparing: [j, j + 1], sorted: [...Array(i).keys()], msg: `${a[j]} > ${key} → shift right` };
      j--;
    }
    a[j + 1] = key;
    yield { arr: [...a], inserted: j + 1, sorted: [...Array(i + 1).keys()], msg: `${key} insert kiya at index ${j+1} ✅` };
  }
  yield { arr: [...a], sorted: [...Array(n).keys()], msg: "Array sort ho gaya! ✅" };
}

function* mergeSortSteps(arr) {
  const a = [...arr];
  const steps = [];
  const sorted = new Array(a.length).fill(false);

  function mergeSort(l, r) {
    if (l >= r) return;
    const mid = Math.floor((l + r) / 2);
    steps.push({ arr: [...a], dividing: [l, mid, r], msg: `Divide: [${l}..${mid}] aur [${mid+1}..${r}]` });
    mergeSort(l, mid);
    mergeSort(mid + 1, r);
    merge(l, mid, r);
  }

  function merge(l, mid, r) {
    const left = a.slice(l, mid + 1);
    const right = a.slice(mid + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      steps.push({ arr: [...a], merging: [l, r], comparing: [l + i, mid + 1 + j], msg: `Merge: ${left[i]} vs ${right[j]}` });
      if (left[i] <= right[j]) a[k++] = left[i++];
      else a[k++] = right[j++];
    }
    while (i < left.length) a[k++] = left[i++];
    while (j < right.length) a[k++] = right[j++];
    steps.push({ arr: [...a], merged: [l, r], msg: `Merged [${l}..${r}]: [${a.slice(l, r+1)}]` });
  }

  mergeSort(0, a.length - 1);
  steps.push({ arr: [...a], sorted: [...Array(a.length).keys()], msg: "Array sort ho gaya! ✅" });
  yield* steps;
}

function* quickSortSteps(arr) {
  const a = [...arr];
  const steps = [];

  function quickSort(l, r) {
    if (l >= r) return;
    const pivot = a[r];
    steps.push({ arr: [...a], pivot: r, range: [l, r], msg: `Pivot = ${pivot} (index ${r})` });
    let i = l - 1;
    for (let j = l; j < r; j++) {
      steps.push({ arr: [...a], comparing: [j, r], pivotIdx: r, i, msg: `${a[j]} <= ${pivot}? ${a[j] <= pivot ? 'Haan' : 'Nahi'}` });
      if (a[j] <= pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        if (i !== j) steps.push({ arr: [...a], swapped: [i, j], msg: `Swap ${a[j]} aur ${a[i]}` });
      }
    }
    [a[i + 1], a[r]] = [a[r], a[i + 1]];
    steps.push({ arr: [...a], pivotFinal: i + 1, msg: `Pivot ${pivot} final position: index ${i+1} ✅` });
    quickSort(l, i);
    quickSort(i + 2, r);
  }

  quickSort(0, a.length - 1);
  steps.push({ arr: [...a], sorted: [...Array(a.length).keys()], msg: "Array sort ho gaya! ✅" });
  yield* steps;
}

const ALGOS = [
  { id: "bubble", name: "Bubble Sort", emoji: "🫧", color: "#22d3ee", gen: bubbleSteps,
    desc: "Adjacent elements compare aur swap karo. Sabse bada element har pass mein end mein 'bubble up' ho jaata hai.", complexity: "O(n²)" },
  { id: "selection", name: "Selection Sort", emoji: "🔍", color: "#a78bfa", gen: selectionSteps,
    desc: "Har pass mein minimum dhundho aur sahi position pe swap karo. Minimum swaps.", complexity: "O(n²)" },
  { id: "insertion", name: "Insertion Sort", emoji: "🃏", color: "#34d399", gen: insertionSteps,
    desc: "Card sort jaisi — naya element sahi jagah insert karo. Best case O(n) — nearly sorted ke liye perfect.", complexity: "O(n²) / O(n)" },
  { id: "merge", name: "Merge Sort", emoji: "🔀", color: "#fb923c", gen: mergeSortSteps,
    desc: "Divide & Conquer — half karo, sort karo, merge karo. Guaranteed O(n log n) — worst case bhi.", complexity: "O(n log n)" },
  { id: "quick", name: "Quick Sort", emoji: "⚡", color: "#f59e0b", gen: quickSortSteps,
    desc: "Pivot choose karo, partition karo — smaller left, larger right. In-place. Practically fastest.", complexity: "O(n log n) avg" },
];

const DEFAULT_ARR = [38, 27, 43, 3, 9, 82, 10];

function getBarColor(i, step, color) {
  if (step?.sorted?.includes(i)) return "#34d399";
  if (step?.swapped?.includes(i) || step?.inserted === i) return "#fb7185";
  if (step?.comparing?.includes(i)) return "#fbbf24";
  if (step?.pivot === i || step?.pivotIdx === i || step?.pivotFinal === i) return "#f59e0b";
  if (step?.minAt === i) return "#e879f9";
  if (step?.current === i) return color;
  if (step?.merging && i >= step.merging[0] && i <= step.merging[1]) return `${color}88`;
  return "var(--bg-elevated)";
}

export default function SortingViz() {
  const [algoIdx, setAlgoIdx] = useState(0);
  const [inputArr, setInputArr] = useState([...DEFAULT_ARR]);
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [customInput, setCustomInput] = useState("38,27,43,3,9,82,10");
  const timerRef = useRef(null);

  const algo = ALGOS[algoIdx];
  const currentStep = steps[stepIdx] || { arr: inputArr, msg: "▶ Start dabao ya step karo" };

  const generateSteps = useCallback((arr) => {
    const s = [...algo.gen(arr)];
    setSteps(s);
    setStepIdx(0);
    setPlaying(false);
  }, [algo]);

  useEffect(() => {
    generateSteps(inputArr);
  }, [algoIdx]);

  useEffect(() => {
    if (!playing) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setStepIdx(prev => {
        if (prev >= steps.length - 1) { setPlaying(false); return prev; }
        return prev + 1;
      });
    }, speed);
    return () => clearInterval(timerRef.current);
  }, [playing, speed, steps]);

  const handleCustom = () => {
    const arr = customInput.split(",").map(Number).filter(n => !isNaN(n)).slice(0, 12);
    if (arr.length < 2) return;
    setInputArr(arr);
    generateSteps(arr);
  };

  const shuffle = () => {
    const arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
    setInputArr(arr);
    setCustomInput(arr.join(","));
    generateSteps(arr);
  };

  const maxVal = Math.max(...(currentStep.arr || inputArr));

  return (
    <div style={{ background: "var(--bg-card)", borderRadius: "20px", padding: "32px", border: "1px solid var(--border)" }}>
      {/* Algo selector */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
        {ALGOS.map((a, i) => (
          <button key={a.id} onClick={() => { setAlgoIdx(i); }} style={{
            padding: "8px 16px", borderRadius: "10px", cursor: "pointer", fontSize: "13px", fontWeight: 600,
            background: algoIdx === i ? `${a.color}15` : "transparent",
            border: `1px solid ${algoIdx === i ? a.color : "var(--bg-elevated)"}`,
            color: algoIdx === i ? a.color : "#64748b",
          }}>
            {a.emoji} {a.name}
          </button>
        ))}
      </div>

      {/* Info */}
      <div style={{ background: "var(--bg-surface)", borderRadius: "10px", padding: "16px", marginBottom: "24px", border: `1px solid ${algo.color}20` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
          <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.6, margin: 0 }}>{algo.desc}</p>
          <code style={{ padding: "4px 12px", borderRadius: "6px", fontSize: "12px", background: `${algo.color}15`, color: algo.color, flexShrink: 0 }}>{algo.complexity}</code>
        </div>
      </div>

      {/* Bars visualization */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "6px", height: "200px", marginBottom: "16px", padding: "0 8px" }}>
        {(currentStep.arr || inputArr).map((val, i) => {
          const color = getBarColor(i, currentStep, algo.color);
          const height = Math.max(16, (val / maxVal) * 180);
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              <div style={{ fontSize: "11px", color: "var(--text-3)", marginBottom: "4px" }}>{val}</div>
              <div style={{
                width: "100%", height: `${height}px`,
                background: color, borderRadius: "6px 6px 2px 2px",
                transition: "height 0.2s ease, background-color 0.15s ease",
                position: "relative",
              }} />
              <div style={{ fontSize: "10px", color: "var(--text-3)", marginTop: "4px" }}>{i}</div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
        {[
          { color: "var(--bg-elevated)", label: "Normal" },
          { color: "#fbbf24", label: "Compare" },
          { color: "#fb7185", label: "Swap" },
          { color: "#34d399", label: "Sorted" },
          { color: "#f59e0b", label: "Pivot" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: color }} />
            <span style={{ fontSize: "11px", color: "var(--text-3)" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Step message */}
      <div style={{
        background: "var(--bg-surface)", borderRadius: "10px", padding: "14px 20px", marginBottom: "20px",
        border: `1px solid ${algo.color}30`, textAlign: "center",
        fontSize: "14px", color: algo.color, fontWeight: 500, minHeight: "44px",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {currentStep.msg}
      </div>

      {/* Progress */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-3)", marginBottom: "6px" }}>
          <span>Step {stepIdx + 1} / {steps.length}</span>
          <span>{Math.round(((stepIdx + 1) / steps.length) * 100)}%</span>
        </div>
        <div style={{ background: "var(--bg-surface)", borderRadius: "4px", height: "4px", overflow: "hidden" }}>
          <div style={{ height: "100%", background: algo.color, width: `${((stepIdx + 1) / steps.length) * 100}%`, transition: "width 0.2s", borderRadius: "4px" }} />
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "20px" }}>
        <button onClick={() => setStepIdx(0)} style={btnStyle("var(--bg-elevated)", "#e2e8f0")}>⏮ Reset</button>
        <button onClick={() => setStepIdx(p => Math.max(0, p - 1))} style={btnStyle("var(--bg-elevated)", "#e2e8f0")}>◀ Prev</button>
        <button onClick={() => setPlaying(p => !p)} style={btnStyle(algo.color, "var(--bg-base)")}>
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
        <button onClick={() => setStepIdx(p => Math.min(steps.length - 1, p + 1))} style={btnStyle("var(--bg-elevated)", "#e2e8f0")}>Next ▶</button>
        <select value={speed} onChange={e => setSpeed(Number(e.target.value))} style={{ padding: "8px 12px", borderRadius: "8px", background: "var(--bg-surface)", color: "var(--text-2)", border: "1px solid var(--border)", cursor: "pointer" }}>
          <option value={800}>Slow</option>
          <option value={400}>Normal</option>
          <option value={150}>Fast</option>
          <option value={50}>Very Fast</option>
        </select>
      </div>

      {/* Custom input */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        <input value={customInput} onChange={e => setCustomInput(e.target.value)}
          placeholder="Enter numbers: 38,27,43,3,9,82"
          style={{ flex: 1, minWidth: "200px", padding: "8px 14px", borderRadius: "8px", background: "var(--bg-surface)", color: "var(--text-1)", border: "1px solid var(--border)", fontSize: "13px" }}
        />
        <button onClick={handleCustom} style={btnStyle(algo.color, "var(--bg-base)")}>Sort Karo</button>
        <button onClick={shuffle} style={btnStyle("var(--bg-elevated)", "#e2e8f0")}>🎲 Random</button>
      </div>
    </div>
  );
}

function btnStyle(bg, color) {
  return {
    padding: "8px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: 600,
    fontSize: "13px", background: bg, color, border: "none", transition: "opacity 0.2s",
  };
}
