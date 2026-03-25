"use client";
import { useState } from "react";
import Link from "next/link";
import { SEQUENCE, THINKING_CUES } from "@/lib/data";

// ── Small animated DS illustrations ─────────────────────────
function StackAnim() {
  const [items, setItems] = useState([10, 20, 30]);
  const [msg, setMsg] = useState("");

  const push = () => {
    const v = Math.floor(Math.random() * 90 + 10);
    setItems(p => [...p, v]);
    setMsg(`push(${v}) → top pe add, O(1)`);
  };
  const pop = () => {
    if (!items.length) return;
    const v = items[items.length - 1];
    setItems(p => p.slice(0, -1));
    setMsg(`pop() → ${v} nikla, O(1)`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        display: "inline-flex",
        flexDirection: "column-reverse",
        gap: "3px",
        minHeight: "100px",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: "10px",
      }}>
        {items.length === 0 && (
          <div style={{ fontSize: "11px", color: "var(--text-3)", padding: "8px" }}>
            Empty
          </div>
        )}
        {items.map((v, i) => (
          <div
            key={`${v}-${i}`}
            style={{
              width: "64px",
              padding: "7px 0",
              textAlign: "center",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 700,
              background: i === items.length - 1
                ? "rgba(129,140,248,0.2)"
                : "var(--bg-elevated)",
              border: `1px solid ${
                i === items.length - 1 ? "#818cf8" : "var(--border)"
              }`,
              color: i === items.length - 1 ? "#818cf8" : "var(--text-2)",
              transition: "all 0.2s",
            }}
          >
            {v}
          </div>
        ))}
      </div>

      {msg && (
        <div style={{
          fontSize: "11px",
          color: "var(--text-3)",
          marginBottom: "8px",
          fontStyle: "italic",
        }}>
          {msg}
        </div>
      )}

      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
        <button
          onClick={push}
          style={{
            padding: "5px 12px",
            borderRadius: "6px",
            background: "rgba(129,140,248,0.15)",
            border: "1px solid #818cf880",
            color: "#818cf8",
            fontSize: "11px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          push ↑
        </button>
        <button
          onClick={pop}
          style={{
            padding: "5px 12px",
            borderRadius: "6px",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            color: "var(--text-3)",
            fontSize: "11px",
            cursor: "pointer",
          }}
        >
          pop ↓
        </button>
      </div>
    </div>
  );
}

function QueueAnim() {
  const [items, setItems] = useState([10, 20, 30]);
  const [msg, setMsg] = useState("");

  const enqueue = () => {
    const v = Math.floor(Math.random() * 90 + 10);
    setItems(p => [...p, v]);
    setMsg(`enqueue(${v}) → REAR pe, O(1)`);
  };
  const dequeue = () => {
    if (!items.length) return;
    const v = items[0];
    setItems(p => p.slice(1));
    setMsg(`dequeue() → ${v} FRONT se, O(1)`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        display: "flex",
        gap: "3px",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "52px",
        marginBottom: "8px",
        flexWrap: "wrap",
      }}>
        {items.length === 0 && (
          <span style={{ fontSize: "11px", color: "var(--text-3)" }}>Empty</span>
        )}
        {items.map((v, i) => (
          <div
            key={`${v}-${i}`}
            style={{
              width: "44px",
              padding: "8px 0",
              textAlign: "center",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 700,
              background: i === 0
                ? "rgba(34,211,238,0.15)"
                : i === items.length - 1
                ? "rgba(167,139,250,0.15)"
                : "var(--bg-elevated)",
              border: `1px solid ${
                i === 0 ? "#22d3ee"
                : i === items.length - 1 ? "#a78bfa"
                : "var(--border)"
              }`,
              color: i === 0
                ? "#22d3ee"
                : i === items.length - 1 ? "#a78bfa"
                : "var(--text-2)",
            }}
          >
            {v}
          </div>
        ))}
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "10px",
        color: "var(--text-3)",
        marginBottom: "8px",
        padding: "0 4px",
      }}>
        <span style={{ color: "#22d3ee" }}>← FRONT (dequeue)</span>
        <span style={{ color: "#a78bfa" }}>REAR (enqueue) →</span>
      </div>

      {msg && (
        <div style={{
          fontSize: "11px",
          color: "var(--text-3)",
          marginBottom: "8px",
          fontStyle: "italic",
        }}>
          {msg}
        </div>
      )}

      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
        <button
          onClick={enqueue}
          style={{
            padding: "5px 12px",
            borderRadius: "6px",
            background: "rgba(167,139,250,0.15)",
            border: "1px solid #a78bfa80",
            color: "#a78bfa",
            fontSize: "11px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          enqueue →
        </button>
        <button
          onClick={dequeue}
          style={{
            padding: "5px 12px",
            borderRadius: "6px",
            background: "rgba(34,211,238,0.1)",
            border: "1px solid #22d3ee80",
            color: "#22d3ee",
            fontSize: "11px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← dequeue
        </button>
      </div>
    </div>
  );
}

function ArrayAnim() {
  const [arr] = useState([10, 20, 30, 40, 50]);
  const [hi, setHi] = useState(null);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        display: "flex",
        gap: "3px",
        justifyContent: "center",
        marginBottom: "8px",
      }}>
        {arr.map((v, i) => (
          <div
            key={i}
            onMouseEnter={() => setHi(i)}
            onMouseLeave={() => setHi(null)}
            style={{
              width: "44px",
              padding: "10px 0",
              textAlign: "center",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 700,
              background: hi === i
                ? "rgba(34,211,238,0.2)"
                : "var(--bg-elevated)",
              border: `1px solid ${hi === i ? "#22d3ee" : "var(--border)"}`,
              color: hi === i ? "#22d3ee" : "var(--text-2)",
              cursor: "default",
              transition: "all 0.15s",
            }}
          >
            {v}
          </div>
        ))}
      </div>

      <div style={{
        display: "flex",
        gap: "3px",
        justifyContent: "center",
        marginBottom: "6px",
      }}>
        {arr.map((_, i) => (
          <div
            key={i}
            style={{
              width: "44px",
              textAlign: "center",
              fontSize: "10px",
              color: "var(--text-3)",
            }}
          >
            [{i}]
          </div>
        ))}
      </div>

      <div style={{ fontSize: "11px", color: "var(--text-3)", fontStyle: "italic" }}>
        {hi !== null
          ? `arr[${hi}] = ${arr[hi]}  →  addr = base + ${hi} × 4`
          : "Hover karo → address formula dekho"}
      </div>
    </div>
  );
}

// Map: topicId → mini animation component
const ANIM_MAP = {
  "array": ArrayAnim,
  "stack": StackAnim,
  "queue": QueueAnim,
};

// ── Revision content per topic ───────────────────────────────
const REVISION_CONTENT = {
  "array": {
    operations: [
      { op: "Access arr[i]", t: "O(1)", why: "base + i×size — direct address" },
      { op: "Search (unsorted)", t: "O(n)", why: "Worst case saara scan" },
      { op: "Insert/Delete middle", t: "O(n)", why: "Shift karna padta hai" },
      { op: "Insert at end", t: "O(1) amort", why: "Resize rare — average O(1)" },
    ],
    keepInMind: [
      "Contiguous memory — badi arrays ke liye ek saath itni RAM chahiye",
      "Sorted array → Binary Search applicable (O(log n))",
      "Two Pointers aur Sliding Window sab array ke upar hi build hote hain",
    ],
    memorize: [
      "Access O(1) — kyunki direct address formula",
      "Insert/Delete middle O(n) — kyunki shift",
      "Fixed size — overflow ya waste dono possible",
    ],
  },
  "stack": {
    operations: [
      { op: "push(x)", t: "O(1)", why: "Top pe add" },
      { op: "pop()", t: "O(1)", why: "Top se remove" },
      { op: "peek()", t: "O(1)", why: "Top dekho only" },
      { op: "Search", t: "O(n)", why: "Anti-pattern — avoid" },
    ],
    keepInMind: [
      "LIFO — last aaya pehle nikla",
      "Browser back, Ctrl+Z, function calls — sab LIFO",
      "Monotonic Stack: next greater/smaller ke liye",
      "DFS iterative bhi Stack use karta hai",
    ],
    memorize: [
      "Push, Pop, Peek — O(1)",
      "Parentheses matching: open → push, close → pop + match",
    ],
  },
  "queue": {
    operations: [
      { op: "enqueue", t: "O(1)", why: "REAR pe add" },
      { op: "dequeue", t: "O(1)", why: "FRONT se remove" },
      { op: "peek", t: "O(1)", why: "FRONT dekho" },
      { op: "Search", t: "O(n)", why: "Scan karna padta hai" },
    ],
    keepInMind: [
      "FIFO — pehle aaya pehle nikla",
      "BFS ka backbone — level-by-level = Queue",
      "Circular Queue: wasted space fix",
      "Priority Queue: internally Heap",
    ],
    memorize: [
      "BFS = Queue, DFS = Stack",
      "Enqueue rear se, Dequeue front se",
    ],
  },
  "linked-list": {
    operations: [
      { op: "Insert at Head", t: "O(1)", why: "Head pointer update" },
      { op: "Access i-th", t: "O(n)", why: "Head se traverse" },
      { op: "Search", t: "O(n)", why: "Linear scan" },
      { op: "Delete at Head", t: "O(1)", why: "Head aage badhao" },
    ],
    keepInMind: [
      "No random access — O(n) for any index",
      "Insert at head O(1) — agar pointer pata ho O(1) anywhere",
      "Cache unfriendly — nodes scattered",
      "Singly: sirf aage. Doubly: dono taraf.",
    ],
    memorize: [
      "Insert at head O(1), access i-th O(n)",
      "Cycle → Fast-Slow. Middle → Fast-Slow.",
    ],
  },
  "two-pointers": {
    operations: [
      { op: "Opposite ends (sorted)", t: "O(n)", why: "Combined n moves" },
      { op: "Same direction (in-place)", t: "O(n)", why: "slow/fast n moves each" },
      { op: "Fast-Slow (cycle)", t: "O(n)", why: "Floyd's — circular track" },
    ],
    keepInMind: [
      "Dono pointers kabhi ek doosre se aage nahi jaate → O(n)",
      "Sorted hona chahiye for opposite ends",
      "In-place modify ke liye same direction",
    ],
    memorize: [
      "Sorted + pairs → opposite ends",
      "In-place → same direction (slow = valid zone end)",
      "Cycle → fast-slow (Floyd's)",
    ],
  },
  "sliding-window": {
    operations: [
      { op: "Fixed window", t: "O(n)", why: "Add right, remove left-k" },
      { op: "Variable window", t: "O(n)", why: "right ++ / left ++ only" },
    ],
    keepInMind: [
      "Window real mein exist nahi — sirf left aur right indices",
      "right kabhi peeche nahi jaata + left kabhi right se aage nahi → O(n)",
      "Variable: expand right, shrink left jab constraint toote",
      "Max/min in window → Deque bhi chahiye",
    ],
    memorize: [
      "Continuous subarray + constraint → Sliding Window",
      "at_most(k) - at_most(k-1) = exactly(k) trick",
      "Negative numbers wale sum → Prefix Sum (not SW)",
    ],
  },
  "hashmap": {
    operations: [
      { op: "Insert/Search/Delete", t: "O(1) avg", why: "Hash compute + direct" },
      { op: "Worst case", t: "O(n)", why: "All keys same bucket" },
    ],
    keepInMind: [
      "No ordering — keys random order mein iterate",
      "Complement pattern: need = target - current",
      "Prefix sum + HashMap = range sum / subarray sum",
      "Load factor > 0.7 → resize",
    ],
    memorize: [
      "O(1) average, O(n) worst",
      "Two Sum = HashMap complement",
      "Anagram = same frequency → HashMap",
    ],
  },
  "binary-search": {
    operations: [
      { op: "Classic search", t: "O(log n)", why: "Har step half eliminate" },
      { op: "Answer space", t: "O(n log max)", why: "n feasibility × log max" },
    ],
    keepInMind: [
      "SORTED ya monotonic hona zaroori",
      "'Minimize max' / 'Maximize min' → Binary Search on Answer",
      "mid = lo + (hi-lo)/2 — overflow safe",
      "lo<hi vs lo<=hi: exact value → lo<=hi, boundary/answer → lo<hi",
    ],
    memorize: [
      "O(log n) — n=10^6 → 20 steps",
      "Answer space: canAchieve(X) monotonic → binary search",
      "Leftmost occurrence: if found, r=mid-1 (keep going left)",
    ],
  },
  "heap": {
    operations: [
      { op: "Peek max/min", t: "O(1)", why: "Root hamesha answer" },
      { op: "Insert (heapify up)", t: "O(log n)", why: "Height = log n levels" },
      { op: "Delete max/min (heapify down)", t: "O(log n)", why: "Bubble down log n" },
      { op: "Build heap", t: "O(n)", why: "Bottom-up heapify — linear!" },
    ],
    keepInMind: [
      "Array pe implement: parent=(i-1)/2, left=2i+1, right=2i+2",
      "Top-K = min-heap of size K → heap[0] = Kth largest",
      "Median stream = two heaps (max lower + min upper)",
      "Build heap O(n) not O(n log n) — important!",
    ],
    memorize: [
      "Peek O(1), Insert/Delete O(log n)",
      "Top-K: min-heap size K, heap[0] = answer",
      "Build heap O(n) (not n log n)",
    ],
  },
  "monotonic-stack": {
    operations: [
      { op: "Next greater (decreasing stack)", t: "O(n)", why: "Har element ek push, ek pop" },
      { op: "Next smaller (increasing stack)", t: "O(n)", why: "Same — linear total" },
    ],
    keepInMind: [
      "Decreasing stack → next GREATER (bada aaya → saare chhote pop)",
      "Increasing stack → next SMALLER (chhota aaya → saare bade pop)",
      "Stack mein indices store karo (values bhi chahiye toh arr[idx])",
      "Histogram: increasing stack, barrier pe area calculate",
    ],
    memorize: [
      "Decreasing = next greater. Increasing = next smaller.",
      "Sentinel value daalo end pe — sab flush ho jaayein",
      "Har element O(1) amortized → total O(n)",
    ],
  },
  "graph": {
    operations: [
      { op: "BFS (Adj List)", t: "O(V+E)", why: "Har node aur edge ek baar" },
      { op: "DFS (Adj List)", t: "O(V+E)", why: "Har node aur edge ek baar" },
      { op: "Dijkstra", t: "O((V+E)log V)", why: "BFS + Min Heap" },
    ],
    keepInMind: [
      "BFS = Queue = level-by-level = shortest unweighted path",
      "DFS = Stack/Recursion = deep dive = all paths, cycles",
      "Multi-source BFS: sab sources ek saath queue mein",
      "Adj List O(V+E) space — sparse. Matrix O(V²) — dense.",
    ],
    memorize: [
      "BFS shortest path unweighted. DFS all paths, cycles.",
      "Dijkstra = weighted positive edges. Bellman-Ford = negative.",
      "Multi-source: sab sources level 0 pe queue mein",
    ],
  },
  "topo-sort": {
    operations: [
      { op: "Kahn's BFS", t: "O(V+E)", why: "Process V nodes, visit E edges" },
    ],
    keepInMind: [
      "DAG only (Directed Acyclic Graph). Cycle → impossible.",
      "In-degree 0 → ready to process",
      "Cycle detect: processed < n at end",
      "Multiple valid orderings possible",
    ],
    memorize: [
      "In-degree 0 = no prerequisites = start karo",
      "processed < n → cycle tha",
      "Kahn's = BFS. DFS version = reverse postorder.",
    ],
  },
  "union-find": {
    operations: [
      { op: "find(x)", t: "O(α(n))≈O(1)", why: "Path compression" },
      { op: "union(x,y)", t: "O(α(n))≈O(1)", why: "Rank + path compression" },
    ],
    keepInMind: [
      "Path compression: find mein har node seedha root pe",
      "Union by rank: chhota tree bade ke neeche",
      "find return karta hai — same root? → already connected → cycle!",
      "Dynamic edges (ek ek aate hain) → UF. Static → BFS/DFS.",
    ],
    memorize: [
      "O(α(n)) ≈ O(1) practically",
      "union returns false → already connected → CYCLE",
      "count-- jab successful union → component count track",
    ],
  },
  "dp-1d": {
    operations: [
      { op: "Build dp table", t: "O(n)", why: "Linear scan with O(1) per step" },
    ],
    keepInMind: [
      "dp[i] = optimal for input size i. Define kya represent karta hai pehle.",
      "Base cases galat → poora DP galat",
      "Recurrence = heart of DP. Ek recurrence likh diya → code easy.",
      "Space optimize: sirf prev 1-2 values chahiye? → O(1) space possible",
    ],
    memorize: [
      "dp[i] = max(dp[i-1], dp[i-2] + nums[i]) — House Robber",
      "dp[n] = dp[n-1] + dp[n-2] — Climbing Stairs",
      "Coin Change: dp[x] = 1 + min(dp[x-coin]) for each coin",
    ],
  },
  "dp-2d": {
    operations: [
      { op: "Build 2D dp table", t: "O(n×m)", why: "Fill each cell once" },
      { op: "0/1 Knapsack (1D opt)", t: "O(n×W)", why: "1D dp, backward traverse" },
    ],
    keepInMind: [
      "0/1 Knapsack: backward traverse → same item baar baar use nahi",
      "Unbounded Knapsack: forward traverse → item reuse allowed",
      "LCS: dp[i][j] = match? dp[i-1][j-1]+1 : max(dp[i-1][j], dp[i][j-1])",
      "2D reduce to 1D: agar sirf prev row chahiye",
    ],
    memorize: [
      "0/1 = backward traverse. Unbounded = forward.",
      "dp[i][j] define carefully — misdefine → wrong recurrence",
    ],
  },
  "backtracking": {
    operations: [
      { op: "Subsets O(2^n)", t: "O(2^n × n)", why: "2^n subsets, each length n" },
      { op: "Permutations O(n!)", t: "O(n! × n)", why: "n! arrangements" },
    ],
    keepInMind: [
      "CHOOSE → EXPLORE → UNCHOOSE (backtrack) — 3 lines",
      "Pruning = invalid branch early exit = huge speedup",
      "Output = list of lists → always backtracking",
      "n ≤ 20 confirm karo before choosing backtracking",
    ],
    memorize: [
      "Subsets: start index aage badhao (no reuse). Permutations: used[] array.",
      "Pruning zaroori — bina pruning N-Queens impractical",
    ],
  },
  "bst": {
    operations: [
      { op: "Search/Insert/Delete", t: "O(log n) avg", why: "Balanced tree height = log n" },
      { op: "Inorder traversal", t: "O(n)", why: "Sorted output" },
      { op: "Worst case all", t: "O(n)", why: "Sorted insert → skewed" },
    ],
    keepInMind: [
      "BST Rule: Left < Node < Right — HAR node pe",
      "Inorder (L→N→R) = sorted sequence",
      "Sorted order mein insert → skewed → O(n) worst",
      "AVL/Red-Black: guaranteed O(log n)",
    ],
    memorize: [
      "Inorder = sorted output",
      "Worst case: sorted input → linked list shape → O(n)",
    ],
  },
  "prefix-sum": {
    operations: [
      { op: "Build prefix array", t: "O(n)", why: "Single pass" },
      { op: "Range sum query", t: "O(1)", why: "prefixSum[r] - prefixSum[l-1]" },
    ],
    keepInMind: [
      "prefixSum[i] = arr[0]+...+arr[i-1]. Range [l,r] = prefixSum[r+1] - prefixSum[l]",
      "Negative numbers ke saath bhi kaam karta (unlike sliding window)",
      "Prefix + HashMap = subarray sum = k problem",
    ],
    memorize: [
      "Range sum = O(1) after O(n) build",
      "Negative numbers → Prefix Sum, not Sliding Window",
      "Map({0:1}) initialize karo — pura prefix valid ho toh",
    ],
  },
  "fast-slow": {
    operations: [
      { op: "Cycle detect", t: "O(n)", why: "Floyd's — O(1) space" },
      { op: "Find middle", t: "O(n)", why: "Fast = 2x, slow = 1x" },
    ],
    keepInMind: [
      "Fast = 2 steps, slow = 1 step. Cycle mein dono zaroor milenge.",
      "Cycle length C: slow enters cycle, fast catches in C steps.",
      "Cycle entry: Phase 1 (find meeting), Phase 2 (head + meeting → entry)",
    ],
    memorize: [
      "Cycle: fast.next.next, slow.next. Meet → cycle.",
      "Middle: fast ends → slow at middle.",
    ],
  },
  "trie": {
    operations: [
      { op: "Insert/Search/startsWith", t: "O(L)", why: "L = word length, char by char" },
    ],
    keepInMind: [
      "TrieNode: children (Map ya array[26]) + isEnd boolean",
      "Common prefix ek baar store — space efficient",
      "Memory heavy: 26 pointers per node → HashMap children better",
    ],
    memorize: [
      "All ops O(L) — word count pe nahi",
      "Keywords: prefix, autocomplete, starts with",
    ],
  },
};

// ── Main Component ───────────────────────────────────────────
export default function Revision() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const topic = selectedTopic
    ? SEQUENCE.find(s => s.id === selectedTopic)
    : null;
  const content = selectedTopic
    ? REVISION_CONTENT[selectedTopic]
    : null;
  const AnimComp = selectedTopic
    ? ANIM_MAP[selectedTopic]
    : null;

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{
          fontSize: "clamp(24px,5vw,36px)",
          fontWeight: 900,
          color: "var(--text-1)",
          marginBottom: "10px",
        }}>
          🔁 Revision Hub
        </h1>

        {/* Active recall banner */}
        <div style={{
          background: "rgba(251,113,133,0.07)",
          border: "1px solid rgba(251,113,133,0.2)",
          borderRadius: "10px",
          padding: "12px 16px",
          fontSize: "13px",
          color: "var(--text-2)",
          display: "flex",
          gap: "10px",
          alignItems: "flex-start",
          maxWidth: "680px",
        }}>
          <span style={{ fontSize: "16px", flexShrink: 0 }}>💡</span>
          <div>
            <strong style={{ color: "#fb7185" }}>Revision = Active Recall</strong>
            {" "}— Pehle yaad karo, phir check karo.
            Topic select karo → mentally saari operations aur complexities socho →
            phir dekho kitna match hua.
          </div>
        </div>
      </div>

      {/* Topic not selected: show picker */}
      {!selectedTopic && (
        <div>
          <p style={{
            fontSize: "15px",
            color: "var(--text-2)",
            marginBottom: "20px",
          }}>
            Aaj kya revise karna hai?
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "10px",
          }}>
            {SEQUENCE.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedTopic(s.id)}
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color 0.15s, transform 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = s.color;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "";
                }}
              >
                <div style={{ fontSize: "22px", marginBottom: "6px" }}>
                  {s.emoji}
                </div>
                <div style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: s.color,
                  marginBottom: "4px",
                }}>
                  {s.title}
                </div>
                {s.prereqs.length > 0 && (
                  <div style={{ fontSize: "10px", color: "var(--text-3)" }}>
                    Prereq: {s.prereqs.join(", ")}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Topic selected: show revision */}
      {selectedTopic && topic && (
        <div>
          {/* Back + title */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}>
            <button
              onClick={() => setSelectedTopic(null)}
              style={{
                padding: "7px 14px",
                borderRadius: "8px",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                color: "var(--text-2)",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              ← Back
            </button>

            <div>
              <span style={{ fontSize: "22px" }}>{topic.emoji}</span>
              {" "}
              <span style={{
                fontSize: "22px",
                fontWeight: 800,
                color: topic.color,
              }}>
                {topic.title}
              </span>
            </div>
          </div>

          {/* Note */}
          {topic.note && (
            <div style={{
              background: `${topic.color}08`,
              border: `1px solid ${topic.color}25`,
              borderRadius: "10px",
              padding: "12px 16px",
              fontSize: "13px",
              color: "var(--text-2)",
              marginBottom: "20px",
              fontStyle: "italic",
            }}>
              💬 {topic.note}
            </div>
          )}

          {/* Main grid: animation + operations + memorize */}
          <div style={{
            display: "grid",
            gridTemplateColumns: AnimComp ? "220px 1fr" : "1fr",
            gap: "16px",
            marginBottom: "16px",
            alignItems: "start",
          }}>

            {/* Animation (only for DS with anim) */}
            {AnimComp && (
              <div style={{
                background: "var(--bg-card)",
                border: `1px solid ${topic.color}25`,
                borderRadius: "12px",
                padding: "20px",
              }}>
                <div style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "14px",
                }}>
                  Interactive
                </div>
                <AnimComp />
              </div>
            )}

            {/* Operations + Keep in mind */}
            {content && (
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}>

                {/* Operations table */}
                <div style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}>
                  <div style={{
                    padding: "10px 16px",
                    background: "var(--bg-surface)",
                    borderBottom: "1px solid var(--border)",
                    display: "grid",
                    gridTemplateColumns: "1fr 100px 1fr",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}>
                    <span>Operation</span>
                    <span>Time</span>
                    <span>Kyun</span>
                  </div>

                  {content.operations.map((op, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "10px 16px",
                        display: "grid",
                        gridTemplateColumns: "1fr 100px 1fr",
                        alignItems: "center",
                        borderBottom: i < content.operations.length - 1
                          ? "1px solid var(--border)"
                          : "none",
                        gap: "8px",
                      }}
                    >
                      <code style={{
                        fontSize: "12px",
                        color: "var(--text-1)",
                        fontFamily: "'Fira Code', monospace",
                      }}>
                        {op.op}
                      </code>
                      <code style={{
                        fontSize: "11px",
                        color: topic.color,
                        background: `${topic.color}10`,
                        padding: "2px 8px",
                        borderRadius: "5px",
                        fontFamily: "'Fira Code', monospace",
                        width: "fit-content",
                      }}>
                        {op.t}
                      </code>
                      <span style={{
                        fontSize: "12px",
                        color: "var(--text-3)",
                      }}>
                        {op.why}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Keep in mind */}
                <div style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                }}>
                  <div style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "10px",
                  }}>
                    🧠 Yeh Dhyan Mein Rakho
                  </div>

                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}>
                    {content.keepInMind.map((k, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: "12.5px",
                          color: "var(--text-2)",
                          paddingLeft: "10px",
                          borderLeft: `2px solid ${topic.color}40`,
                          lineHeight: 1.5,
                        }}
                      >
                        {k}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Memorize section */}
          {content && (
            <div style={{
              background: `${topic.color}06`,
              border: `1px solid ${topic.color}20`,
              borderRadius: "12px",
              padding: "16px 18px",
              marginBottom: "16px",
            }}>
              <div style={{
                fontSize: "12px",
                fontWeight: 700,
                color: topic.color,
                marginBottom: "10px",
              }}>
                📌 Yeh Zaroor Memorize Karo
              </div>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}>
                {content.memorize.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "8px",
                      fontSize: "12.5px",
                      color: "var(--text-2)",
                    }}
                  >
                    <span style={{ color: topic.color, flexShrink: 0 }}>✓</span>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Learning sequence suggestion */}
          {(topic.algoLinks.length > 0 || topic.nextTopics.length > 0) && (
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "16px 18px",
              marginBottom: "16px",
            }}>
              <div style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "12px",
              }}>
                📚 Is Topic Ke Saath Yeh Padho
              </div>

              <div style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}>
                {topic.algoLinks.map(al => (
                  <Link
                    key={al}
                    href={`/patterns`}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      background: "rgba(34,211,238,0.1)",
                      border: "1px solid rgba(34,211,238,0.25)",
                      color: "var(--accent-cyan)",
                      fontSize: "12px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    ⚙️ Pattern: {al}
                  </Link>
                ))}

                {topic.nextTopics.map(nt => {
                  const t = SEQUENCE.find(s => s.id === nt);
                  return t ? (
                    <button
                      key={nt}
                      onClick={() => setSelectedTopic(nt)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "8px",
                        background: `${t.color}10`,
                        border: `1px solid ${t.color}30`,
                        color: t.color,
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {t.emoji} Next: {t.title}
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Practice problems */}
          {topic.lcProblems && (
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "16px 18px",
            }}>
              <div style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "12px",
              }}>
                🏋️ Practice — Inhe Solve Karo
              </div>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}>
                {topic.lcProblems.map(p => (
                  <a
                    key={p.num}
                    href={`https://leetcode.com/problems/${p.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "9px 12px",
                      borderRadius: "8px",
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      textDecoration: "none",
                      transition: "border-color 0.15s",
                    }}
                    onMouseEnter={e =>
                      (e.currentTarget.style.borderColor = topic.color)
                    }
                    onMouseLeave={e =>
                      (e.currentTarget.style.borderColor = "var(--border)")
                    }
                  >
                    <code style={{
                      fontSize: "11px",
                      color: topic.color,
                      background: `${topic.color}10`,
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontFamily: "'Fira Code', monospace",
                      flexShrink: 0,
                    }}>
                      #{p.num}
                    </code>
                    <span style={{
                      fontSize: "13px",
                      color: "var(--text-1)",
                      fontWeight: 500,
                    }}>
                      {p.title}
                    </span>
                    <span style={{
                      marginLeft: "auto",
                      fontSize: "11px",
                      color: "var(--text-3)",
                    }}>
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
