"use client";
import { useState } from "react";

// ─── STACK VIZ ────────────────────────────────────────────────
export function StackViz() {
  const [stack, setStack] = useState([10, 20, 30]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("Stack ready hai — push ya pop karo");
  const [highlight, setHighlight] = useState(null);
  const [animOut, setAnimOut] = useState(false);

  const push = () => {
    const val = Number(input) || Math.floor(Math.random() * 90 + 10);
    setInput("");
    setHighlight("push");
    setStack(prev => [...prev, val]);
    setMsg(`push(${val}) ✅ — ${val} TOP pe add hua, O(1)`);
    setTimeout(() => setHighlight(null), 800);
  };

  const pop = () => {
    if (!stack.length) { setMsg("Stack empty hai! Underflow ❌"); return; }
    const val = stack[stack.length - 1];
    setAnimOut(true);
    setTimeout(() => {
      setStack(prev => prev.slice(0, -1));
      setAnimOut(false);
      setMsg(`pop() → ${val} nikla ✅, O(1)`);
      setHighlight("pop");
      setTimeout(() => setHighlight(null), 600);
    }, 300);
  };

  return (
    <div>
      <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px", lineHeight: 1.6 }}>
        LIFO — Last In, First Out. Sirf TOP se push aur pop. O(1) dono operations. 📚
      </p>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-end", justifyContent: "center", marginBottom: "24px" }}>
        {/* Stack visual */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", minWidth: "120px" }}>
          <div style={{ fontSize: "11px", color: "#818cf8", fontWeight: 700, marginBottom: "4px" }}>↑ TOP (push/pop here)</div>
          {stack.length === 0 ? (
            <div style={{ padding: "20px 40px", borderRadius: "8px", border: "2px dashed #334155", color: "#374151", fontSize: "13px" }}>Empty</div>
          ) : [...stack].reverse().map((val, i) => {
            const isTop = i === 0;
            return (
              <div key={`${val}-${stack.length - 1 - i}`} style={{
                width: "120px", padding: "12px 0", textAlign: "center",
                background: isTop ? "#818cf820" : "#1e293b",
                border: `2px solid ${isTop ? "#818cf8" : "#334155"}`,
                borderRadius: "8px", fontSize: "20px", fontWeight: 700,
                color: isTop ? "#818cf8" : "#94a3b8",
                transition: "all 0.3s",
                opacity: isTop && animOut ? 0 : 1,
                transform: isTop && animOut ? "translateY(-20px)" : "none",
              }}>{val}</div>
            );
          })}
          <div style={{ width: "120px", height: "4px", background: "#334155", borderRadius: "2px" }} />
          <div style={{ fontSize: "11px", color: "#64748b" }}>BOTTOM</div>
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ background: "#0f172a", borderRadius: "10px", padding: "12px 16px", border: "1px solid #1e293b" }}>
            <div style={{ fontSize: "11px", color: "#64748b" }}>Size</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#818cf8" }}>{stack.length}</div>
          </div>
          <div style={{ background: "#0f172a", borderRadius: "10px", padding: "12px 16px", border: "1px solid #1e293b" }}>
            <div style={{ fontSize: "11px", color: "#64748b" }}>Top</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#34d399" }}>{stack.length ? stack[stack.length - 1] : "—"}</div>
          </div>
        </div>
      </div>

      <div style={{ background: "#0f172a", borderRadius: "8px", padding: "12px", marginBottom: "16px", textAlign: "center", fontSize: "13px", color: "#818cf8", border: "1px solid #818cf830", minHeight: "38px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {msg}
      </div>

      <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && push()}
          placeholder="Value..." style={{ width: "100px", padding: "7px 12px", borderRadius: "7px", background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155", fontSize: "13px" }} />
        <button onClick={push} style={{ padding: "7px 16px", borderRadius: "7px", background: "#818cf8", color: "#0a0f1e", fontWeight: 700, border: "none", cursor: "pointer" }}>Push ↑</button>
        <button onClick={pop} style={{ padding: "7px 16px", borderRadius: "7px", background: "#0f172a", color: "#fb7185", fontWeight: 700, border: "1px solid #fb718550", cursor: "pointer" }}>Pop ↓</button>
      </div>
    </div>
  );
}

// ─── QUEUE VIZ ────────────────────────────────────────────────
export function QueueViz() {
  const [queue, setQueue] = useState([10, 20, 30]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("Queue ready hai — enqueue ya dequeue karo");

  const enqueue = () => {
    const val = Number(input) || Math.floor(Math.random() * 90 + 10);
    setInput("");
    setQueue(prev => [...prev, val]);
    setMsg(`enqueue(${val}) ✅ — ${val} REAR pe add hua, O(1)`);
  };

  const dequeue = () => {
    if (!queue.length) { setMsg("Queue empty! ❌"); return; }
    const val = queue[0];
    setQueue(prev => prev.slice(1));
    setMsg(`dequeue() → ${val} nikla ✅ FRONT se, O(1)`);
  };

  return (
    <div>
      <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px", lineHeight: 1.6 }}>
        FIFO — First In, First Out. REAR se add, FRONT se remove. BFS mein use hoti hai. O(1) dono operations. 🚶
      </p>

      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2px", justifyContent: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "11px", color: "#22d3ee", fontWeight: 700, marginRight: "6px" }}>FRONT (dequeue) →</div>
          {queue.length === 0 ? (
            <div style={{ padding: "16px 32px", borderRadius: "8px", border: "2px dashed #334155", color: "#374151", fontSize: "13px" }}>Empty</div>
          ) : queue.map((val, i) => (
            <div key={`${val}-${i}`} style={{
              width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center",
              background: i === 0 ? "#22d3ee20" : i === queue.length - 1 ? "#a78bfa20" : "#1e293b",
              border: `2px solid ${i === 0 ? "#22d3ee" : i === queue.length - 1 ? "#a78bfa" : "#334155"}`,
              borderRadius: "8px", fontSize: "18px", fontWeight: 700,
              color: i === 0 ? "#22d3ee" : i === queue.length - 1 ? "#a78bfa" : "#94a3b8",
              transition: "all 0.3s",
            }}>{val}</div>
          ))}
          <div style={{ fontSize: "11px", color: "#a78bfa", fontWeight: 700, marginLeft: "6px" }}>← REAR (enqueue)</div>
        </div>
        <div style={{ textAlign: "center", fontSize: "11px", color: "#64748b" }}>Queue size: {queue.length}</div>
      </div>

      <div style={{ background: "#0f172a", borderRadius: "8px", padding: "12px", marginBottom: "16px", textAlign: "center", fontSize: "13px", color: "#22d3ee", border: "1px solid #22d3ee30", minHeight: "38px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {msg}
      </div>

      <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && enqueue()}
          placeholder="Value..." style={{ width: "100px", padding: "7px 12px", borderRadius: "7px", background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155", fontSize: "13px" }} />
        <button onClick={enqueue} style={{ padding: "7px 16px", borderRadius: "7px", background: "#a78bfa", color: "#0a0f1e", fontWeight: 700, border: "none", cursor: "pointer" }}>Enqueue →</button>
        <button onClick={dequeue} style={{ padding: "7px 16px", borderRadius: "7px", background: "#0f172a", color: "#22d3ee", fontWeight: 700, border: "1px solid #22d3ee50", cursor: "pointer" }}>← Dequeue</button>
      </div>
    </div>
  );
}

// ─── BST VIZ ──────────────────────────────────────────────────
function BSTNode({ val, x, y, highlight, left, right, allNodes }) {
  const isHighlight = highlight === val;
  const r = 26;
  const leftNode = allNodes?.find(n => n.val === left);
  const rightNode = allNodes?.find(n => n.val === right);

  return (
    <g>
      {leftNode && <line x1={x} y1={y} x2={leftNode.x} y2={leftNode.y} stroke="#334155" strokeWidth="2" />}
      {rightNode && <line x1={x} y1={y} x2={rightNode.x} y2={rightNode.y} stroke="#334155" strokeWidth="2" />}
      <circle cx={x} cy={y} r={r}
        fill={isHighlight ? "#fb923c20" : "#1e293b"}
        stroke={isHighlight ? "#fb923c" : "#334155"}
        strokeWidth={isHighlight ? 3 : 2}
      />
      <text x={x} y={y + 5} textAnchor="middle" fill={isHighlight ? "#fb923c" : "#94a3b8"} fontSize="14" fontWeight="700">{val}</text>
    </g>
  );
}

function buildBST(values) {
  const nodes = [];
  const nodeMap = {};
  
  function insert(val, parentVal, side) {
    if (!nodeMap[val]) nodeMap[val] = { val, left: null, right: null, parent: parentVal, side };
  }

  for (const val of values) {
    if (!nodeMap[10] && values.length > 0) {
      insert(val, null, null);
      let cur = values[0];
      for (let i = 1; i <= values.indexOf(val); i++) {
        const v = values[i];
        let node = nodeMap[values[0]];
        let prev = null, s = null;
        while (node) {
          prev = node; s = v < node.val ? "left" : "right";
          node = nodeMap[node[s]];
        }
        if (prev) { prev[s] = v; insert(v, prev.val, s); }
        else insert(v, null, null);
      }
      break;
    }
  }

  return nodeMap;
}

export function BSTViz() {
  const [values, setValues] = useState([50, 30, 70, 20, 40, 60, 80]);
  const [inputVal, setInputVal] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [path, setPath] = useState([]);
  const [found, setFound] = useState(null);
  const [msg, setMsg] = useState("BST ready — insert ya search karo");

  // Simple BST state
  const [treeData, setTreeData] = useState(() => computeTree([50, 30, 70, 20, 40, 60, 80]));

  function computeTree(vals) {
    if (!vals.length) return { nodes: [], positions: [] };
    
    // Build tree structure
    const tree = {};
    for (const v of vals) {
      let node = tree;
      if (!tree.val) { tree.val = v; tree.left = null; tree.right = null; }
      else {
        let cur = tree;
        while (true) {
          if (v < cur.val) { if (!cur.left) { cur.left = { val: v, left: null, right: null }; break; } else cur = cur.left; }
          else { if (!cur.right) { cur.right = { val: v, left: null, right: null }; break; } else cur = cur.right; }
        }
      }
    }

    // Compute positions
    const positions = [];
    function traverse(node, x, y, spread) {
      if (!node) return;
      positions.push({ val: node.val, x, y, left: node.left?.val, right: node.right?.val });
      traverse(node.left, x - spread, y + 70, spread / 2);
      traverse(node.right, x + spread, y + 70, spread / 2);
    }
    traverse(tree, 200, 40, 100);
    return { positions };
  }

  const insertVal = () => {
    const v = Number(inputVal);
    if (isNaN(v) || values.includes(v)) { setMsg(`${v} already hai ya invalid`); return; }
    const newVals = [...values, v];
    setValues(newVals);
    setTreeData(computeTree(newVals));
    setInputVal("");
    setMsg(`insert(${v}) ✅ — BST rule follow karke sahi jagah daala`);
    setPath([v]);
    setTimeout(() => setPath([]), 1500);
  };

  const searchNode = () => {
    const v = Number(searchVal);
    const searchPath = [];
    const { positions } = treeData;
    if (!positions.length) return;
    
    // Simulate BST search
    let current = positions.find(p => !positions.some(q => q.left === p.val || q.right === p.val));
    // Find root (node with no parent)
    const allVals = new Set(positions.map(p => p.val));
    const childVals = new Set(positions.flatMap(p => [p.left, p.right].filter(Boolean)));
    const root = positions.find(p => !childVals.has(p.val));
    
    let cur = root;
    while (cur) {
      searchPath.push(cur.val);
      if (cur.val === v) { setFound(v); setPath(searchPath); setMsg(`✅ Found ${v}! Path: ${searchPath.join(" → ")}`); return; }
      const next = v < cur.val ? cur.left : cur.right;
      cur = positions.find(p => p.val === next);
    }
    setFound(null);
    setPath(searchPath);
    setMsg(`❌ ${v} nahi mila. Search path: ${searchPath.join(" → ")}`);
  };

  const { positions } = treeData;
  const svgWidth = 400, svgHeight = 280;

  return (
    <div>
      <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "16px", lineHeight: 1.6 }}>
        BST Rule: Left &lt; Node &lt; Right. Insert ya search karo aur path dekho. O(log n) average. 🌳
      </p>

      <svg width="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ background: "#0a0f1e", borderRadius: "12px", marginBottom: "16px", border: "1px solid #1e293b", maxHeight: "280px" }}>
        {positions.map(n => {
          const isPath = path.includes(n.val);
          const isFound = found === n.val;
          const leftPos = positions.find(p => p.val === n.left);
          const rightPos = positions.find(p => p.val === n.right);
          return (
            <g key={n.val}>
              {leftPos && <line x1={n.x} y1={n.y} x2={leftPos.x} y2={leftPos.y} stroke={isPath && path.includes(leftPos.val) ? "#fb923c" : "#1e293b"} strokeWidth="2" />}
              {rightPos && <line x1={n.x} y1={n.y} x2={rightPos.x} y2={rightPos.y} stroke={isPath && path.includes(rightPos.val) ? "#fb923c" : "#1e293b"} strokeWidth="2" />}
              <circle cx={n.x} cy={n.y} r={22}
                fill={isFound ? "#34d39915" : isPath ? "#fb923c15" : "#1e293b"}
                stroke={isFound ? "#34d399" : isPath ? "#fb923c" : "#334155"}
                strokeWidth={isPath ? 3 : 2} />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fill={isFound ? "#34d399" : isPath ? "#fb923c" : "#94a3b8"} fontSize="13" fontWeight="700">{n.val}</text>
            </g>
          );
        })}
      </svg>

      <div style={{ background: "#0f172a", borderRadius: "8px", padding: "12px", marginBottom: "16px", textAlign: "center", fontSize: "13px", color: "#fb923c", border: "1px solid #fb923c30", minHeight: "38px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {msg}
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <input value={inputVal} onChange={e => setInputVal(e.target.value)} onKeyDown={e => e.key === "Enter" && insertVal()}
            placeholder="Insert..." style={{ width: "90px", padding: "6px 10px", borderRadius: "6px", background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155", fontSize: "12px" }} />
          <button onClick={insertVal} style={{ padding: "6px 12px", borderRadius: "6px", background: "#fb923c", color: "#0a0f1e", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "12px" }}>Insert</button>
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <input value={searchVal} onChange={e => setSearchVal(e.target.value)} onKeyDown={e => e.key === "Enter" && searchNode()}
            placeholder="Search..." style={{ width: "90px", padding: "6px 10px", borderRadius: "6px", background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155", fontSize: "12px" }} />
          <button onClick={searchNode} style={{ padding: "6px 12px", borderRadius: "6px", background: "#34d399", color: "#0a0f1e", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "12px" }}>Search</button>
        </div>
        <button onClick={() => { setValues([50, 30, 70, 20, 40, 60, 80]); setTreeData(computeTree([50, 30, 70, 20, 40, 60, 80])); setPath([]); setFound(null); setMsg("Reset!"); }} style={{ padding: "6px 12px", borderRadius: "6px", background: "#1e293b", color: "#94a3b8", border: "1px solid #334155", cursor: "pointer", fontSize: "12px" }}>🔄 Reset</button>
      </div>
    </div>
  );
}

// ─── GRAPH BFS/DFS VIZ ────────────────────────────────────────
const GRAPH_NODES = [
  { id: "A", x: 200, y: 60 },
  { id: "B", x: 100, y: 150 },
  { id: "C", x: 300, y: 150 },
  { id: "D", x: 50, y: 250 },
  { id: "E", x: 160, y: 250 },
  { id: "F", x: 260, y: 250 },
  { id: "G", x: 350, y: 250 },
];
const GRAPH_EDGES = [
  ["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "F"], ["C", "G"],
];
const GRAPH_ADJ = {
  A: ["B", "C"], B: ["A", "D", "E"], C: ["A", "F", "G"],
  D: ["B"], E: ["B"], F: ["C"], G: ["C"],
};

function bfsOrder(start) {
  const visited = new Set(), queue = [start], order = [];
  visited.add(start);
  while (queue.length) {
    const node = queue.shift(); order.push(node);
    for (const n of GRAPH_ADJ[node] || []) {
      if (!visited.has(n)) { visited.add(n); queue.push(n); }
    }
  }
  return order;
}

function dfsOrder(start) {
  const visited = new Set(), order = [];
  function dfs(n) { if (visited.has(n)) return; visited.add(n); order.push(n); for (const nb of GRAPH_ADJ[n] || []) dfs(nb); }
  dfs(start);
  return order;
}

export function GraphViz() {
  const [mode, setMode] = useState("bfs");
  const [start, setStart] = useState("A");
  const [revealCount, setRevealCount] = useState(0);
  const [msg, setMsg] = useState("BFS ya DFS choose karo, phir play karo");

  const order = mode === "bfs" ? bfsOrder(start) : dfsOrder(start);
  const revealed = new Set(order.slice(0, revealCount));

  const play = () => {
    setRevealCount(0);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setRevealCount(count);
      const node = order[count - 1];
      const modeDesc = mode === "bfs" ? "Queue se" : "Stack se";
      setMsg(`${modeDesc} ${node} visit kiya — Level ${mode === "bfs" ? Math.floor(count > 1 ? 1 : 0) : count}`);
      if (count >= order.length) { clearInterval(interval); setMsg(`✅ Complete! Order: ${order.join(" → ")}`); }
    }, 700);
  };

  const nodePos = Object.fromEntries(GRAPH_NODES.map(n => [n.id, { x: n.x, y: n.y }]));

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {["bfs", "dfs"].map(m => (
          <button key={m} onClick={() => { setMode(m); setRevealCount(0); setMsg("Start dabao"); }} style={{
            padding: "7px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "13px",
            background: mode === m ? (m === "bfs" ? "#22d3ee15" : "#a78bfa15") : "transparent",
            border: `1px solid ${mode === m ? (m === "bfs" ? "#22d3ee" : "#a78bfa") : "#334155"}`,
            color: mode === m ? (m === "bfs" ? "#22d3ee" : "#a78bfa") : "#64748b",
          }}>{m.toUpperCase()} {m === "bfs" ? "(Queue)" : "(Stack/Recursion)"}</button>
        ))}
        <select value={start} onChange={e => { setStart(e.target.value); setRevealCount(0); }} style={{ padding: "6px 10px", borderRadius: "7px", background: "#0f172a", color: "#94a3b8", border: "1px solid #334155", cursor: "pointer" }}>
          {GRAPH_NODES.map(n => <option key={n.id}>{n.id}</option>)}
        </select>
        <button onClick={play} style={{ padding: "7px 16px", borderRadius: "8px", background: mode === "bfs" ? "#22d3ee" : "#a78bfa", color: "#0a0f1e", fontWeight: 700, border: "none", cursor: "pointer" }}>▶ Play</button>
        <button onClick={() => { setRevealCount(0); setMsg("Reset"); }} style={{ padding: "7px 12px", borderRadius: "8px", background: "#1e293b", color: "#94a3b8", border: "1px solid #334155", cursor: "pointer" }}>🔄</button>
      </div>

      <svg viewBox="0 0 400 310" style={{ width: "100%", background: "#0a0f1e", borderRadius: "12px", marginBottom: "12px", border: "1px solid #1e293b", maxHeight: "280px" }}>
        {GRAPH_EDGES.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={nodePos[a].x} y1={nodePos[a].y} x2={nodePos[b].x} y2={nodePos[b].y} stroke={revealed.has(a) && revealed.has(b) ? (mode === "bfs" ? "#22d3ee50" : "#a78bfa50") : "#1e293b"} strokeWidth="2" />
        ))}
        {GRAPH_NODES.map(n => {
          const idx = order.indexOf(n.id);
          const isVisited = revealed.has(n.id);
          const isCurrent = order[revealCount - 1] === n.id;
          const isStart = n.id === start;
          const color = mode === "bfs" ? "#22d3ee" : "#a78bfa";
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={28}
                fill={isCurrent ? `${color}30` : isVisited ? `${color}12` : isStart ? "#1e293b" : "#111827"}
                stroke={isCurrent ? color : isVisited ? `${color}80` : isStart ? "#fbbf24" : "#334155"}
                strokeWidth={isCurrent ? 3 : 2} />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fill={isCurrent ? color : isVisited ? `${color}cc` : "#94a3b8"} fontSize="15" fontWeight="700">{n.id}</text>
              {isVisited && <text x={n.x + 20} y={n.y - 18} fill={color} fontSize="11" fontWeight="700">{idx + 1}</text>}
            </g>
          );
        })}
      </svg>

      <div style={{ background: "#0f172a", borderRadius: "8px", padding: "12px", marginBottom: "12px", textAlign: "center", fontSize: "13px", color: mode === "bfs" ? "#22d3ee" : "#a78bfa", border: `1px solid ${mode === "bfs" ? "#22d3ee" : "#a78bfa"}30`, minHeight: "38px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {msg}
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "11px" }}>
        <span style={{ color: "#64748b" }}>Visit order: </span>
        {order.map((n, i) => (
          <span key={n} style={{ color: i < revealCount ? (mode === "bfs" ? "#22d3ee" : "#a78bfa") : "#374151", fontWeight: i < revealCount ? 700 : 400 }}>{n}{i < order.length - 1 && <span style={{ color: "#374151" }}>→</span>}</span>
        ))}
      </div>
    </div>
  );
}
