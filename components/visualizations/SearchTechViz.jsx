"use client";
import { useState, useRef, useEffect } from "react";

// ─── BINARY SEARCH ────────────────────────────────────────────
function* binarySearchSteps(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    yield { arr, l, r, mid, target, msg: `left=${l}, right=${r}, mid=${mid} → arr[${mid}]=${arr[mid]}` };
    if (arr[mid] === target) {
      yield { arr, l, r, mid, found: mid, target, msg: `🎉 Found! arr[${mid}]=${arr[mid]} — target mila!` };
      return;
    } else if (arr[mid] < target) {
      yield { arr, l, r, mid, eliminate: "left", target, msg: `${arr[mid]} < ${target} → Left half eliminate, left = ${mid+1}` };
      l = mid + 1;
    } else {
      yield { arr, l, r, mid, eliminate: "right", target, msg: `${arr[mid]} > ${target} → Right half eliminate, right = ${mid-1}` };
      r = mid - 1;
    }
  }
  yield { arr, l, r, notFound: true, target, msg: `❌ ${target} array mein nahi hai` };
}

// ─── TWO POINTERS ─────────────────────────────────────────────
function* twoPointerSteps(arr, target) {
  let l = 0, r = arr.length - 1;
  yield { arr, l, r, target, msg: `Two Pointers: left=0(${arr[0]}), right=${arr.length-1}(${arr[arr.length-1]})` };
  while (l < r) {
    const sum = arr[l] + arr[r];
    yield { arr, l, r, sum, target, msg: `arr[${l}]=${arr[l]} + arr[${r}]=${arr[r]} = ${sum}` };
    if (sum === target) {
      yield { arr, l, r, found: true, target, msg: `✅ Found! indices [${l}, ${r}] → ${arr[l]}+${arr[r]}=${target}` };
      return;
    } else if (sum < target) {
      yield { arr, l, r, move: "left", target, msg: `${sum} < ${target} → sum chhota hai, left++ (bada element chahiye)` };
      l++;
    } else {
      yield { arr, l, r, move: "right", target, msg: `${sum} > ${target} → sum bada hai, right-- (chhota element chahiye)` };
      r--;
    }
  }
  yield { arr, l, r, notFound: true, target, msg: `❌ No pair found with sum ${target}` };
}

// ─── SLIDING WINDOW ───────────────────────────────────────────
function* slidingWindowSteps(s) {
  const seen = new Map();
  let l = 0, maxLen = 0, maxWindow = { l: 0, r: -1 };
  for (let r = 0; r < s.length; r++) {
    yield { s, l, r, seen: new Map(seen), maxLen, msg: `Expand: right=${r}, char='${s[r]}'` };
    while (seen.has(s[r])) {
      seen.delete(s[l]);
      yield { s, l, r, seen: new Map(seen), maxLen, shrinking: true, msg: `'${s[r]}' duplicate! Shrink: remove '${s[l]}' (left++)` };
      l++;
    }
    seen.set(s[r], r);
    const len = r - l + 1;
    if (len > maxLen) { maxLen = len; maxWindow = { l, r }; }
    yield { s, l, r, seen: new Map(seen), maxLen, maxWindow: { ...maxWindow }, msg: `Window [${l}..${r}] = "${s.slice(l, r+1)}" length=${len}, max=${maxLen}` };
  }
  yield { s, l, r: s.length - 1, seen, maxLen, maxWindow, done: true, msg: `✅ Longest substring without repeat: "${s.slice(maxWindow.l, maxWindow.r+1)}" (length ${maxLen})` };
}

const SORTED_DEFAULT = [2, 7, 11, 15, 18, 23, 27, 31, 35, 40];

function BinarySearchViz() {
  const [arr] = useState(SORTED_DEFAULT);
  const [target, setTarget] = useState(23);
  const [inputTarget, setInputTarget] = useState("23");
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const run = (t) => {
    const s = [...binarySearchSteps(arr, t)];
    setSteps(s); setStepIdx(0); setPlaying(false);
  };

  useEffect(() => { run(target); }, []);

  useEffect(() => {
    if (!playing) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setStepIdx(prev => { if (prev >= steps.length - 1) { setPlaying(false); return prev; } return prev + 1; });
    }, 700);
    return () => clearInterval(timerRef.current);
  }, [playing, steps]);

  const step = steps[stepIdx] || {};

  return (
    <div>
      <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "16px", lineHeight: 1.6 }}>
        Sorted array mein har step pe search space HALF karo. n=10^6 → sirf 20 steps! 🎯
      </p>

      {/* Array boxes */}
      <div style={{ display: "flex", gap: "4px", justifyContent: "center", flexWrap: "wrap", marginBottom: "12px" }}>
        {arr.map((val, i) => {
          const isLeft = i < (step.l ?? 0);
          const isRight = i > (step.r ?? arr.length - 1);
          const isMid = i === step.mid;
          const isFound = i === step.found;
          const eliminated = isLeft || isRight;
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div style={{ fontSize: "9px", color: isMid ? "#fbbf24" : i === step.l ? "#22d3ee" : i === step.r ? "#a78bfa" : "#64748b" }}>
                {isMid ? "mid" : i === step.l ? "L" : i === step.r ? "R" : ""}
              </div>
              <div style={{
                width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "8px", fontSize: "14px", fontWeight: 700, fontFamily: "'Fira Code', monospace",
                background: isFound ? "#34d39920" : isMid ? "#fbbf2420" : eliminated ? "#0f172a" : "#1e293b",
                border: `2px solid ${isFound ? "#34d399" : isMid ? "#fbbf24" : i === step.l ? "#22d3ee" : i === step.r ? "#a78bfa" : eliminated ? "#0f172a" : "#334155"}`,
                color: isFound ? "#34d399" : isMid ? "#fbbf24" : eliminated ? "#374151" : "#e2e8f0",
                transition: "all 0.3s", textDecoration: eliminated ? "line-through" : "none",
              }}>{val}</div>
              <div style={{ fontSize: "9px", color: "#374151" }}>{i}</div>
            </div>
          );
        })}
      </div>

      <div style={{ background: "#0f172a", borderRadius: "8px", padding: "12px 16px", marginBottom: "16px", textAlign: "center", fontSize: "13px", color: "#22d3ee", border: "1px solid #22d3ee30", minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {step.msg || "Start karo"}
      </div>

      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "12px" }}>
        <span style={{ fontSize: "12px", color: "#64748b" }}>Target:</span>
        <input value={inputTarget} onChange={e => setInputTarget(e.target.value)} style={{ width: "80px", padding: "6px 10px", borderRadius: "6px", background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155", fontSize: "13px" }} />
        <button onClick={() => { const t = Number(inputTarget); setTarget(t); run(t); }} style={btn("#22d3ee", "#0a0f1e")}>Search</button>
        <button onClick={() => setStepIdx(p => Math.max(0, p - 1))} style={btn("#334155", "#e2e8f0")}>◀</button>
        <button onClick={() => setPlaying(p => !p)} style={btn("#22d3ee", "#0a0f1e")}>{playing ? "⏸" : "▶"}</button>
        <button onClick={() => setStepIdx(p => Math.min(steps.length - 1, p + 1))} style={btn("#334155", "#e2e8f0")}>▶</button>
        <span style={{ fontSize: "11px", color: "#64748b" }}>Step {stepIdx + 1}/{steps.length}</span>
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", fontSize: "11px" }}>
        {[["#1e293b", "Normal"], ["#fbbf24", "Mid"], ["#22d3ee", "Left"], ["#a78bfa", "Right"], ["#34d399", "Found"]].map(([c, l]) => (
          <span key={l} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: "block", border: `1px solid ${c}` }} />
            <span style={{ color: "#64748b" }}>{l}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function TwoPointerViz() {
  const defaultArr = [1, 3, 6, 8, 11, 15, 18, 22, 26, 30];
  const [arr] = useState(defaultArr);
  const [target, setTarget] = useState(26);
  const [inputTarget, setInputTarget] = useState("26");
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const run = (t) => { const s = [...twoPointerSteps(arr, t)]; setSteps(s); setStepIdx(0); setPlaying(false); };
  useEffect(() => { run(target); }, []);
  useEffect(() => {
    if (!playing) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setStepIdx(prev => { if (prev >= steps.length - 1) { setPlaying(false); return prev; } return prev + 1; });
    }, 800);
    return () => clearInterval(timerRef.current);
  }, [playing, steps]);

  const step = steps[stepIdx] || {};

  return (
    <div>
      <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "16px", lineHeight: 1.6 }}>
        Sorted array mein do pointers opposite ends se aate hain. Sum zyada → right--, Sum chhota → left++. O(n) ✅
      </p>

      <div style={{ display: "flex", gap: "4px", justifyContent: "center", flexWrap: "wrap", marginBottom: "16px" }}>
        {arr.map((val, i) => {
          const isL = i === step.l, isR = i === step.r;
          const isFound = step.found && (i === step.l || i === step.r);
          const between = step.l !== undefined && i > step.l && i < step.r;
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div style={{ fontSize: "9px", fontWeight: 700, color: isL ? "#22d3ee" : isR ? "#a78bfa" : "transparent", minHeight: "14px" }}>
                {isL ? "L" : isR ? "R" : ""}
              </div>
              <div style={{
                width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "8px", fontSize: "13px", fontWeight: 700,
                background: isFound ? "#34d39920" : isL ? "#22d3ee20" : isR ? "#a78bfa20" : "#1e293b",
                border: `2px solid ${isFound ? "#34d399" : isL ? "#22d3ee" : isR ? "#a78bfa" : "#334155"}`,
                color: isFound ? "#34d399" : isL ? "#22d3ee" : isR ? "#a78bfa" : between ? "#94a3b8" : "#64748b",
                transition: "all 0.3s",
              }}>{val}</div>
            </div>
          );
        })}
      </div>

      {step.sum !== undefined && (
        <div style={{ textAlign: "center", marginBottom: "12px", fontSize: "16px", fontWeight: 700 }}>
          <span style={{ color: "#22d3ee" }}>{arr[step.l]}</span>
          <span style={{ color: "#64748b" }}> + </span>
          <span style={{ color: "#a78bfa" }}>{arr[step.r]}</span>
          <span style={{ color: "#64748b" }}> = </span>
          <span style={{ color: step.sum === step.target ? "#34d399" : step.sum < step.target ? "#fb7185" : "#fbbf24" }}>{step.sum}</span>
          <span style={{ color: "#64748b" }}> (target: {step.target})</span>
        </div>
      )}

      <div style={{ background: "#0f172a", borderRadius: "8px", padding: "12px", marginBottom: "16px", textAlign: "center", fontSize: "13px", color: "#a78bfa", border: "1px solid #a78bfa30", minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {step.msg || "Start karo"}
      </div>

      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: "12px", color: "#64748b" }}>Target Sum:</span>
        <input value={inputTarget} onChange={e => setInputTarget(e.target.value)} style={{ width: "80px", padding: "6px 10px", borderRadius: "6px", background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155", fontSize: "13px" }} />
        <button onClick={() => { const t = Number(inputTarget); setTarget(t); run(t); }} style={btn("#a78bfa", "#0a0f1e")}>Find</button>
        <button onClick={() => setStepIdx(p => Math.max(0, p - 1))} style={btn("#334155", "#e2e8f0")}>◀</button>
        <button onClick={() => setPlaying(p => !p)} style={btn("#a78bfa", "#0a0f1e")}>{playing ? "⏸" : "▶"}</button>
        <button onClick={() => setStepIdx(p => Math.min(steps.length - 1, p + 1))} style={btn("#334155", "#e2e8f0")}>▶</button>
        <span style={{ fontSize: "11px", color: "#64748b" }}>Step {stepIdx + 1}/{steps.length}</span>
      </div>
    </div>
  );
}

function SlidingWindowViz() {
  const [str, setStr] = useState("abcabcbb");
  const [inputStr, setInputStr] = useState("abcabcbb");
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const run = (s) => { const steps = [...slidingWindowSteps(s)]; setSteps(steps); setStepIdx(0); setPlaying(false); };
  useEffect(() => { run(str); }, []);
  useEffect(() => {
    if (!playing) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setStepIdx(prev => { if (prev >= steps.length - 1) { setPlaying(false); return prev; } return prev + 1; });
    }, 700);
    return () => clearInterval(timerRef.current);
  }, [playing, steps]);

  const step = steps[stepIdx] || { l: 0, r: -1, s: str };
  const s = step.s || str;

  return (
    <div>
      <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "16px", lineHeight: 1.6 }}>
        Window expand karo (right++), jab duplicate aaye toh shrink karo (left++). Longest substring without repeat. O(n) ✅
      </p>

      <div style={{ display: "flex", gap: "4px", justifyContent: "center", marginBottom: "8px" }}>
        {s.split("").map((char, i) => {
          const inWindow = i >= step.l && i <= step.r;
          const isBest = step.maxWindow && i >= step.maxWindow.l && i <= step.maxWindow.r && step.done;
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div style={{
                width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "8px", fontSize: "18px", fontWeight: 700, fontFamily: "'Fira Code', monospace",
                background: isBest ? "#34d39920" : inWindow ? (step.shrinking ? "#fb718520" : "#34d39920") : "#1e293b",
                border: `2px solid ${isBest ? "#34d399" : inWindow ? (step.shrinking ? "#fb7185" : "#34d399") : i === step.l ? "#22d3ee" : "#334155"}`,
                color: isBest ? "#34d399" : inWindow ? (step.shrinking ? "#fb7185" : "#34d399") : "#64748b",
                transition: "all 0.25s",
              }}>{char}</div>
              <div style={{ fontSize: "9px", color: "#475569" }}>{i}</div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "13px", color: "#64748b" }}>Current window: </span>
        <span style={{ fontSize: "13px", color: "#34d399", fontWeight: 700, fontFamily: "'Fira Code', monospace" }}>
          "{step.l !== undefined && step.r !== undefined && step.r >= step.l ? s.slice(step.l, step.r + 1) : ""}"
        </span>
        <span style={{ fontSize: "13px", color: "#64748b" }}> | Max length: </span>
        <span style={{ fontSize: "13px", color: "#fbbf24", fontWeight: 700 }}>{step.maxLen || 0}</span>
      </div>

      <div style={{ background: "#0f172a", borderRadius: "8px", padding: "12px", marginBottom: "16px", textAlign: "center", fontSize: "13px", color: "#34d399", border: "1px solid #34d39930", minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {step.msg || "Start karo"}
      </div>

      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        <input value={inputStr} onChange={e => setInputStr(e.target.value)} placeholder="String likhو..."
          style={{ flex: 1, minWidth: "140px", padding: "7px 12px", borderRadius: "7px", background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155", fontSize: "13px" }} />
        <button onClick={() => { setStr(inputStr); run(inputStr); }} style={btn("#34d399", "#0a0f1e")}>Run</button>
        <button onClick={() => setStepIdx(p => Math.max(0, p - 1))} style={btn("#334155", "#e2e8f0")}>◀</button>
        <button onClick={() => setPlaying(p => !p)} style={btn("#34d399", "#0a0f1e")}>{playing ? "⏸" : "▶"}</button>
        <button onClick={() => setStepIdx(p => Math.min(steps.length - 1, p + 1))} style={btn("#334155", "#e2e8f0")}>▶</button>
        <span style={{ fontSize: "11px", color: "#64748b" }}>Step {stepIdx + 1}/{steps.length}</span>
      </div>
    </div>
  );
}

const btn = (bg, color) => ({
  padding: "7px 14px", borderRadius: "7px", cursor: "pointer", fontWeight: 600,
  fontSize: "12px", background: bg, color, border: "none",
});

export { BinarySearchViz, TwoPointerViz, SlidingWindowViz };
