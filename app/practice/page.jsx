"use client";
import { useState } from "react";

// ── 4-Step Framework for any problem ────────────────────────
const step4Framework = [
  {
    step: 1, title: "n ki Value Dekho (Constraints)",
    color: "#22d3ee", emoji: "📏",
    desc: "Sabse pehle constraints mein n ki value dekho — yahi batata hai kaunsi complexity allowed hai.",
    rules: [
      { n: "n ≤ 20", complexity: "O(2^n) ya O(n!)", reason: "Har element pe 2 choices → 2^n branches. Positions fill karo → n×(n-1)×... = n!", pattern: "Backtracking, Brute Force, Permutations" },
      { n: "n ≤ 300", complexity: "O(n³)", reason: "3 nested loops possible", pattern: "Floyd-Warshall, 3D DP" },
      { n: "n ≤ 10,000", complexity: "O(n²)", reason: "2 nested loops", pattern: "Bubble Sort, Nested DP" },
      { n: "n ≤ 10⁶", complexity: "O(n log n)", reason: "Single pass + sorted structure. Sorting info theory: n! arrangements → log₂(n!) ≈ n log n bits", pattern: "Merge Sort, Heap, Binary Search in loop" },
      { n: "n ≤ 10⁷", complexity: "O(n)", reason: "Two Pointers: combined n moves. Sliding Window: right kabhi left nahi jaata", pattern: "Two Pointers, Sliding Window, HashMap, Linear" },
      { n: "n ≥ 10⁷", complexity: "O(log n) ya O(1)", reason: "Binary Search: har step pe half eliminate. Math/XOR: direct formula", pattern: "Binary Search, Math Formula, Bit Magic" },
    ],
  },
  {
    step: 2, title: "Input Format Dekho",
    color: "#a78bfa", emoji: "📥",
    desc: "Data ka structure batata hai kaunsi relationship hai elements ke beech.",
    rules: [
      { input: "Sorted Array", why: "Order guaranteed → Binary Search ya Two Pointers", pattern: "Binary Search, Two Pointers, Greedy (sort first)" },
      { input: "Unsorted Array + pairs", why: "Sort karo → Two Pointers. Ya HashMap complement pattern", pattern: "Two Pointers (sort first) ya HashMap" },
      { input: "String", why: "Substring → Sliding Window. Palindrome → Two Pointers/Expand. Prefix → Trie. Brackets → Stack", pattern: "Context pe depend" },
      { input: "Linked List", why: "Cycle → Fast/Slow. Middle → Fast/Slow. Reverse → prev/curr/next", pattern: "Fast-Slow Pointers" },
      { input: "Tree (Binary/BST)", why: "DFS: all paths, recursion. BFS: level-order, shortest in tree", pattern: "DFS (recursion) ya BFS (queue)" },
      { input: "Graph (nodes + edges)", why: "BFS: shortest unweighted. DFS: components/cycles. Weighted: Dijkstra. Dependencies: Topo Sort", pattern: "BFS/DFS/Dijkstra/Topo" },
      { input: "2D Grid/Matrix", why: "Islands → DFS/BFS with 4-dir. Path counting → DP. Shortest path → BFS", pattern: "DFS/BFS/DP" },
    ],
  },
  {
    step: 3, title: "Output Format Dekho",
    color: "#34d399", emoji: "📤",
    desc: "Kya return karna hai — yeh batata hai kitni possibilities explore karni hain.",
    rules: [
      { output: "List of Lists (all subsets/combinations/paths)", why: "Saari possibilities enumerate karo", pattern: "→ Backtracking (almost always)" },
      { output: "Single Number (max/min/count)", why: "Ek optimal answer chahiye", pattern: "→ DP (overlapping) ya Greedy (local=global)" },
      { output: "Boolean (possible/not)", why: "Existence check", pattern: "→ DP, BFS, DFS" },
      { output: "Modified Array/String (in-place)", why: "Extra space avoid karo", pattern: "→ Two Pointers" },
      { output: "Ordered List (sorted tasks)", why: "Order maintain karo", pattern: "→ Topological Sort ya Heap" },
      { output: "Kth Element", why: "Partial order chahiye", pattern: "→ Heap ya QuickSelect" },
    ],
  },
  {
    step: 4, title: "Keywords Scan Karo",
    color: "#fbbf24", emoji: "🔑",
    desc: "Problem statement mein kuch magic words hote hain jo directly pattern batate hain.",
    rules: [
      { keyword: '"Substring" / "Subarray" + condition', pattern: "Sliding Window" },
      { keyword: '"Sorted" + pairs ya target sum', pattern: "Two Pointers" },
      { keyword: '"Palindrome"', pattern: "Two Pointers ya Expand Around Center" },
      { keyword: '"K largest" / "Top K" / "Kth smallest"', pattern: "Heap (Min-heap of size K)" },
      { keyword: '"Median" / "Stream"', pattern: "Two Heaps" },
      { keyword: '"Parentheses" / "Brackets" / "Nested"', pattern: "Stack" },
      { keyword: '"Next greater element"', pattern: "Monotonic Stack" },
      { keyword: '"Anagram" / "Frequency" / "Duplicates"', pattern: "HashMap" },
      { keyword: '"Prefix" / "Autocomplete" / "Starts with"', pattern: "Trie" },
      { keyword: '"Connected components" / "Groups"', pattern: "Union-Find ya DFS" },
      { keyword: '"Dependencies" / "Prerequisites"', pattern: "Topological Sort" },
      { keyword: '"Cycle" in linked list/graph', pattern: "Fast-Slow Pointers ya DFS" },
      { keyword: '"Minimize maximum" / "Maximize minimum"', pattern: "Binary Search on Answer" },
      { keyword: '"Number of ways" / "How many"', pattern: "DP (count)" },
      { keyword: '"XOR" / "Single number" / "Power of 2"', pattern: "Bit Manipulation" },
    ],
  },
];

// ── Practice Problems ────────────────────────────────────────
const problems = [
  {
    id: 1, title: "Two Sum", difficulty: "Easy", leetcode: 1,
    statement: "Unsorted array mein 2 numbers dhundho jin ka sum = target. Indices return karo.",
    hints: ["Step 1: n = up to 10^4. O(n) possible.", "Step 2: Unsorted array — Two Pointers nahi (sorted chahiye). Kya O(1) lookup deta hai?", "Step 3: Single number (indices)", "Step 4: 'duplicates' ya 'find two numbers'"],
    pattern: "HashMap (Complement Pattern)",
    subtype: "Complement: target - nums[i] ko HashMap mein dhundho",
    why: "Sort karna O(n log n) tha aur indices maintain karna mushkil. HashMap mein complement store karo → O(n) O(n).",
    code: `const seen = new Map();
for(let i=0; i<nums.length; i++){
  const need = target - nums[i];
  if(seen.has(need)) return [seen.get(need), i];
  seen.set(nums[i], i);
}`,
  },
  {
    id: 2, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", leetcode: 3,
    statement: "String mein longest substring dhundho jismein koi character repeat na ho.",
    hints: ["Step 1: n up to 5×10^4. O(n) needed.", "Step 2: String input.", "Step 3: Single number (length).", "Step 4: 'substring' + 'no repeat'"],
    pattern: "Sliding Window (Variable)",
    subtype: "Variable Window: right expand, left shrink jab duplicate aaye",
    why: "Continuous substring + constraint (no repeat) = classic sliding window. Right badhao, duplicate aaya toh left badhao. O(n).",
    code: `const seen = new Set();
let left=0, maxLen=0;
for(let r=0; r<s.length; r++){
  while(seen.has(s[r])) seen.delete(s[left++]);
  seen.add(s[r]);
  maxLen = Math.max(maxLen, r-left+1);
}`,
  },
  {
    id: 3, title: "Kth Largest Element in Array", difficulty: "Medium", leetcode: 215,
    statement: "Array mein Kth largest element dhundho (sorted order mein).",
    hints: ["Step 1: n up to 10^5. O(n log k) acceptable.", "Step 2: Unsorted array.", "Step 3: Single number.", "Step 4: 'K largest' keyword"],
    pattern: "Heap (Min-Heap of size K)",
    subtype: "Top-K: Min-heap of size K maintain karo → heap[0] = Kth largest",
    why: "Sort karna O(n log n) — but we only need Kth. Min-heap of K: push karo, agar size > K toh smallest pop karo. heap[0] = Kth largest. O(n log k).",
    code: `// Min-heap of size K maintain karo
const heap = new MinHeap();
for(const x of nums){
  heap.push(x);
  if(heap.size() > k) heap.pop();
}
return heap.peek(); // Kth largest`,
  },
  {
    id: 4, title: "Valid Parentheses", difficulty: "Easy", leetcode: 20,
    statement: "String mein brackets valid hain? — '(', ')', '{', '}', '[', ']'",
    hints: ["Step 1: Small n.", "Step 2: String, brackets.", "Step 3: Boolean.", "Step 4: 'parentheses' / 'brackets' / 'nested'"],
    pattern: "Stack",
    subtype: "LIFO matching: opening → push, closing → pop aur match karo",
    why: "Jo last khula woh pehle bandh hona chahiye — LIFO = Stack. Opening bracket push, closing bracket pe pop karke match karo.",
    code: `const map = {')':'(', '}':'{', ']':'['};
const stack = [];
for(const c of s){
  if('({['.includes(c)) stack.push(c);
  else if(stack.pop()!==map[c]) return false;
}
return stack.length===0;`,
  },
  {
    id: 5, title: "Climbing Stairs", difficulty: "Easy", leetcode: 70,
    statement: "N steps tak pahunchne ke kitne ways hain agar 1 ya 2 steps at a time le sako?",
    hints: ["Step 1: n up to 45. O(n) fine.", "Step 2: No input array — pure math/optimization.", "Step 3: Single number (count of ways).", "Step 4: 'number of ways'"],
    pattern: "Dynamic Programming (1D)",
    subtype: "1D DP: dp[i] = dp[i-1] + dp[i-2] (Fibonacci pattern)",
    why: "i-th step pe pahunchne ke ways = (i-1 se) + (i-2 se). Overlapping subproblems → DP. fib(n) jaisa pattern.",
    code: `// dp[i] = ways to reach step i
let prev2=1, prev1=2;
for(let i=3;i<=n;i++){
  [prev2,prev1] = [prev1, prev1+prev2];
}
return n<=2 ? n : prev1;`,
  },
  {
    id: 6, title: "Number of Islands", difficulty: "Medium", leetcode: 200,
    statement: "2D grid mein '1' (land) aur '0' (water) hain. Islands count karo.",
    hints: ["Step 1: m×n up to 300×300. O(mn) needed.", "Step 2: 2D grid.", "Step 3: Single number (count).", "Step 4: 'islands' / 'connected regions'"],
    pattern: "DFS / BFS on Grid",
    subtype: "DFS: har unvisited '1' se start, connected land mark as visited",
    why: "Islands = connected components in 2D grid. Har unvisited '1' se DFS/BFS karo — saare connected land visit karo (count 1 island). O(mn).",
    code: `function dfs(i,j){
  if(i<0||i>=grid.length||j<0||j>=grid[0].length||grid[i][j]!='1') return;
  grid[i][j]='0'; // mark visited
  dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
}
let count=0;
for(let i=0;i<grid.length;i++)
  for(let j=0;j<grid[0].length;j++)
    if(grid[i][j]==='1'){dfs(i,j);count++;}`,
  },
  {
    id: 7, title: "Coin Change", difficulty: "Medium", leetcode: 322,
    statement: "Minimum coins dhundho jo given amount banate hain. Coins unlimited use kar sakte ho.",
    hints: ["Step 1: amount up to 10^4. O(n×amount) fine.", "Step 2: Array of coins.", "Step 3: Single number (minimum).", "Step 4: 'minimum' + 'ways to make'"],
    pattern: "Dynamic Programming (Unbounded Knapsack)",
    subtype: "Unbounded: coins unlimited use. dp[x] = min coins for amount x",
    why: "Greedy fail karta hai (arbitrary coins). Overlapping subproblems: dp[7] = 1 + min(dp[6], dp[5], dp[2]...). Unbounded because same coin baar baar use kar sakte hain.",
    code: `const dp = Array(amount+1).fill(Infinity);
dp[0]=0;
for(let x=1;x<=amount;x++)
  for(const c of coins)
    if(c<=x) dp[x]=Math.min(dp[x], dp[x-c]+1);
return dp[amount]===Infinity ? -1 : dp[amount];`,
  },
  {
    id: 8, title: "Koko Eating Bananas", difficulty: "Medium", leetcode: 875,
    statement: "N piles hain. H hours mein saari khaao. Minimum speed k (bananas/hour) kya ho?",
    hints: ["Step 1: n aur piles up to 10^9. O(n log max) needed.", "Step 2: Array of pile sizes.", "Step 3: Single number (minimum speed).", "Step 4: 'minimize' — suspicious. Answer ek range mein hai [1, max(piles)]"],
    pattern: "Binary Search on Answer",
    subtype: "Answer space pe binary search. canFinish(speed) check function banao.",
    why: "'Minimum speed' — answer range mein hai [1, max_pile]. Speed badhao toh zyada feasible — monotonic! Binary search on answer space. canFinish(speed) check O(n) → total O(n log max).",
    code: `function canFinish(piles, h, speed){
  return piles.reduce((s,p)=>s+Math.ceil(p/speed),0) <= h;
}
let l=1, r=Math.max(...piles);
while(l<r){
  const mid=(l+r)>>1;
  if(canFinish(piles,h,mid)) r=mid;
  else l=mid+1;
}
return l;`,
  },
];

export default function Practice() {
  const [activeSection, setActiveSection] = useState("framework");
  const [activeStep, setActiveStep] = useState(0);
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedSolution, setRevealedSolution] = useState({});

  const revealHint = (pid, idx) => {
    setRevealedHints(prev => ({ ...prev, [`${pid}-${idx}`]: true }));
  };

  const toggleSolution = (pid) => {
    setRevealedSolution(prev => ({ ...prev, [pid]: !prev[pid] }));
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "36px 24px" }}>

      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontSize: "clamp(26px,5vw,40px)", fontWeight: 900, marginBottom: "8px", color: "var(--text-1)" }}>
          🧩 Pattern Identify Karo
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: 1.7, maxWidth: "640px" }}>
          Koi bhi naya question dekho — yeh 4 steps follow karo. Pehle pattern identify karna seekho, 
          code baad mein aayega. <strong style={{ color: "var(--text-1)" }}>Kyun?</strong> — yeh jaanna code likhne se zyada important hai.
        </p>
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
        {[
          ["framework", "🎯 4-Step Framework"],
          ["practice", "🏋️ Practice Problems"],
        ].map(([id, label]) => (
          <button key={id} onClick={() => setActiveSection(id)} style={{
            padding: "10px 22px", borderRadius: "9px", cursor: "pointer",
            background: activeSection === id ? "var(--accent-orange)" : "var(--bg-elevated)",
            color: activeSection === id ? "#fff" : "var(--text-2)",
            border: "none", fontWeight: activeSection === id ? 700 : 400, fontSize: "14px",
          }}>{label}</button>
        ))}
      </div>

      {/* ── 4-Step Framework ── */}
      {activeSection === "framework" && (
        <div>
          {/* Step selector */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
            {step4Framework.map((s, i) => (
              <button key={i} onClick={() => setActiveStep(i)} style={{
                padding: "10px 18px", borderRadius: "9px", cursor: "pointer",
                background: activeStep === i ? `${s.color}18` : "var(--bg-elevated)",
                border: `1px solid ${activeStep === i ? s.color : "var(--border)"}`,
                color: activeStep === i ? s.color : "var(--text-2)",
                fontWeight: activeStep === i ? 700 : 400, fontSize: "13px",
              }}>
                {s.emoji} Step {s.step}: {s.title.split("(")[0].trim()}
              </button>
            ))}
          </div>

          {/* Active step detail */}
          {step4Framework.map((step, i) => i !== activeStep ? null : (
            <div key={i} style={{ background: "var(--bg-card)", borderRadius: "16px", padding: "32px", border: `1px solid ${step.color}30` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "36px" }}>{step.emoji}</span>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Step {step.step}</div>
                  <h2 style={{ fontSize: "22px", fontWeight: 800, color: step.color }}>{step.title}</h2>
                </div>
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-2)", marginBottom: "24px", lineHeight: 1.7 }}>{step.desc}</p>

              {step.step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {step.rules.map(r => (
                    <div key={r.n} style={{ display: "grid", gridTemplateColumns: "120px 160px 1fr 1fr", gap: "12px", alignItems: "start", background: "var(--bg-surface)", borderRadius: "10px", padding: "14px 16px", border: "1px solid var(--border)" }}>
                      <code style={{ fontSize: "13px", fontWeight: 800, color: step.color, fontFamily: "'Fira Code', monospace" }}>{r.n}</code>
                      <code style={{ fontSize: "12px", color: "var(--accent-amber)", background: "rgba(251,191,36,0.08)", padding: "3px 8px", borderRadius: "5px", fontFamily: "'Fira Code', monospace" }}>{r.complexity}</code>
                      <span style={{ fontSize: "12px", color: "var(--text-3)", lineHeight: 1.5 }}>{r.reason}</span>
                      <span style={{ fontSize: "12px", color: step.color }}>{r.pattern}</span>
                    </div>
                  ))}
                </div>
              )}

              {step.step === 2 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: "10px" }}>
                  {step.rules.map(r => (
                    <div key={r.input} style={{ background: "var(--bg-surface)", borderRadius: "10px", padding: "14px", border: "1px solid var(--border)" }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: step.color, marginBottom: "5px" }}>{r.input}</div>
                      <div style={{ fontSize: "12px", color: "var(--text-3)", marginBottom: "5px" }}>{r.why}</div>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-1)" }}>→ {r.pattern}</div>
                    </div>
                  ))}
                </div>
              )}

              {step.step === 3 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: "10px" }}>
                  {step.rules.map(r => (
                    <div key={r.output} style={{ background: "var(--bg-surface)", borderRadius: "10px", padding: "14px", border: "1px solid var(--border)" }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: step.color, marginBottom: "5px" }}>{r.output}</div>
                      <div style={{ fontSize: "12px", color: "var(--text-3)", marginBottom: "5px" }}>{r.why}</div>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-green)" }}>{r.pattern}</div>
                    </div>
                  ))}
                </div>
              )}

              {step.step === 4 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: "8px" }}>
                  {step.rules.map(r => (
                    <div key={r.keyword} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", background: "var(--bg-surface)", borderRadius: "8px", padding: "11px 14px", border: "1px solid var(--border)" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-2)", fontStyle: "italic" }}>{r.keyword}</span>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: step.color, flexShrink: 0 }}>→ {r.pattern}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                {i > 0 && <button onClick={() => setActiveStep(i-1)} style={{ padding: "9px 20px", borderRadius: "8px", background: "var(--bg-elevated)", color: "var(--text-2)", border: "1px solid var(--border)", cursor: "pointer" }}>← Prev Step</button>}
                {i < step4Framework.length-1 && <button onClick={() => setActiveStep(i+1)} style={{ padding: "9px 20px", borderRadius: "8px", background: step.color, color: "#0a0f1e", border: "none", cursor: "pointer", fontWeight: 700 }}>Next Step →</button>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Practice Problems ── */}
      {activeSection === "practice" && (
        <div>
          <div style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "10px", padding: "14px 18px", marginBottom: "24px", fontSize: "13px", color: "var(--text-2)" }}>
            💡 <strong style={{ color: "var(--accent-amber)" }}>Approach:</strong> Problem padho → 4 steps mentally apply karo → phir hints reveal karo ek ek karke → solution last mein.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {problems.map(p => (
              <div key={p.id} style={{ background: "var(--bg-card)", borderRadius: "16px", padding: "28px", border: "1px solid var(--border)" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-1)" }}>{p.id}. {p.title}</span>
                  <span style={{ padding: "3px 12px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, background: p.difficulty==="Easy" ? "rgba(52,211,153,0.12)" : "rgba(251,191,36,0.12)", color: p.difficulty==="Easy" ? "#34d399" : "#fbbf24" }}>{p.difficulty}</span>
                  <a href={`https://leetcode.com/problems/${p.title.toLowerCase().replace(/\s+/g,"-")}/`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", color: "var(--text-3)", textDecoration: "none", marginLeft: "auto" }}>LeetCode #{p.leetcode} ↗</a>
                </div>

                {/* Statement */}
                <div style={{ background: "var(--bg-surface)", borderRadius: "10px", padding: "14px 16px", marginBottom: "18px", fontSize: "14px", color: "var(--text-1)", lineHeight: 1.7, border: "1px solid var(--border)" }}>
                  {p.statement}
                </div>

                {/* Hints */}
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-3)", marginBottom: "10px" }}>🎯 4-Step Hints (ek ek karo reveal)</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                    {p.hints.map((hint, idx) => {
                      const key = `${p.id}-${idx}`;
                      const shown = revealedHints[key] || (idx > 0 && revealedHints[`${p.id}-${idx-1}`]);
                      return (
                        <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                          <span style={{ fontSize: "11px", color: ["var(--accent-cyan)","var(--accent-violet)","var(--accent-green)","var(--accent-amber)"][idx], fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>Step {idx+1}</span>
                          {shown ? (
                            <span style={{ fontSize: "13px", color: "var(--text-2)" }}>{hint}</span>
                          ) : (
                            <button onClick={() => revealHint(p.id, idx)} style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", background: "var(--bg-elevated)", color: "var(--text-3)", border: "1px solid var(--border)", cursor: "pointer" }}>Hint reveal karo 👁️</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Solution */}
                {!revealedSolution[p.id] ? (
                  <button onClick={() => toggleSolution(p.id)} style={{ padding: "10px 22px", borderRadius: "9px", background: "var(--bg-elevated)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.3)", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}>
                    ✅ Solution dekhao
                  </button>
                ) : (
                  <div style={{ background: "rgba(52,211,153,0.05)", borderRadius: "12px", padding: "20px", border: "1px solid rgba(52,211,153,0.2)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#34d399", marginBottom: "5px" }}>✅ Pattern</div>
                        <div style={{ fontSize: "14px", color: "var(--text-1)", fontWeight: 600 }}>{p.pattern}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-cyan)", marginBottom: "5px" }}>🔀 Subtype</div>
                        <div style={{ fontSize: "13px", color: "var(--text-2)" }}>{p.subtype}</div>
                      </div>
                    </div>
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-amber)", marginBottom: "5px" }}>🧠 Kyun yeh pattern?</div>
                      <div style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.7 }}>{p.why}</div>
                    </div>
                    <pre style={{ background: "var(--bg-base)", borderRadius: "8px", padding: "16px", fontSize: "12px", color: "var(--text-2)", overflowX: "auto", border: "1px solid var(--border)", fontFamily: "'Fira Code', monospace", lineHeight: 1.8 }}>
                      {p.code}
                    </pre>
                    <button onClick={() => toggleSolution(p.id)} style={{ marginTop: "10px", fontSize: "11px", color: "var(--text-3)", background: "none", border: "none", cursor: "pointer" }}>▲ Solution chhupao</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
