"use client";
import { useState } from "react";

const sections = [
  {
    id: "searching", title: "🔎 Searching", color: "#22d3ee",
    chapters: [
      {
        id: "linear", title: "Linear Search", emoji: "🔦",
        complexity: { best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
        kyu: "Sabse simple — unsorted array mein ek ek karke check karo.",
        kaise: `Array: [5, 3, 8, 1, 9]  Target: 9

Step 1: arr[0]=5 ? No
Step 2: arr[1]=3 ? No
Step 3: arr[2]=8 ? No
Step 4: arr[3]=1 ? No
Step 5: arr[4]=9 ? YES ✅`,
        kab: ["Array unsorted ho", "Chhota array (n < 100)", "Saari occurrences chahiye"],
        kabNahi: ["Array sorted ho → Binary Search use karo", "Large n → Too slow"],
        next: "Binary Search",
        nextReason: "Sorted array pe pura scan waste hai — half karte jao",
      },
      {
        id: "binary", title: "Binary Search", emoji: "🎯",
        complexity: { best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
        kyu: "Sorted array mein har step pe search space HALF karo. n=10^6 → sirf 20 steps!",
        kaise: `Array: [1, 3, 5, 7, 9, 11, 13]  Target: 7

left=0, right=6
Step 1: mid=3, arr[3]=7 == target → Found! ✅

Target: 11
Step 1: mid=3, arr[3]=7, 11>7 → left=4
Step 2: mid=5, arr[5]=11 → Found! ✅`,
        templates: [
          { name: "Classic — Exact Value", code: `let l=0, r=arr.length-1;
while(l<=r){
  const mid = l+((r-l)>>1);
  if(arr[mid]===target) return mid;
  if(arr[mid]<target) l=mid+1;
  else r=mid-1;
}` },
          { name: "Leftmost / First Occurrence", code: `let result=-1;
while(l<=r){
  const mid=(l+r)>>1;
  if(arr[mid]===target){ result=mid; r=mid-1; }
  else if(arr[mid]<target) l=mid+1;
  else r=mid-1;
}` },
          { name: "Binary Search on Answer", code: `// "Minimize maximum" type problems
let l=minPossible, r=maxPossible;
while(l<r){
  const mid=(l+r)>>1;
  if(canAchieve(mid)) r=mid;   // feasible, try smaller
  else l=mid+1;                // need more
}
return l;` },
        ],
        kab: ["Array sorted ho", "Monotonic property ho", "'Minimize max' / 'Maximize min' problems"],
        subtypes: ["Classic exact search", "First/Last occurrence (boundary finding)", "Binary search on answer space"],
      },
    ],
  },
  {
    id: "sorting", title: "📊 Sorting", color: "#a78bfa",
    chapters: [
      {
        id: "bubble", title: "Bubble Sort", emoji: "🫧",
        complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
        stable: true,
        kyu: "Adjacent elements compare karo aur swap karo. Har pass mein sabse bada 'bubble up' karta hai.",
        kaise: `[5, 3, 8, 1]
Pass 1: 5>3?Swap→ 3<8→ 8>1?Swap → [3,5,1,8] ← 8 end pe
Pass 2: 3<5→ 5>1?Swap → [3,1,5,8] ← 5 sahi jagah
Pass 3: 3>1?Swap → [1,3,5,8] ✅`,
        kab: ["Learning purpose only", "Already sorted check (with early exit flag)"],
        note: "Best case O(n): Already sorted mein koi swap nahi — flag se early exit.",
      },
      {
        id: "selection", title: "Selection Sort", emoji: "🔍",
        complexity: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
        stable: false,
        kyu: "Minimum dhundho, ek swap karo. Bubble se kam swaps — jab memory write costly ho.",
        kaise: `[5, 3, 8, 1]
Pass 1: Min=1(idx3). Swap idx0↔idx3 → [1,3,8,5]
Pass 2: Min=3(idx1). Already at 1, no swap → [1,3,8,5]
Pass 3: Min=5(idx3). Swap idx2↔idx3 → [1,3,5,8] ✅`,
        kab: ["Memory writes costly hon (EEPROM/Flash)", "Simple implementation chahiye"],
        note: "Best case bhi O(n²): Sorted array pe bhi scan karna padta hai.",
      },
      {
        id: "insertion", title: "Insertion Sort", emoji: "🃏",
        complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
        stable: true,
        kyu: "Card sort karne jaisi — naya card sahi jagah insert karo. Best case O(n) — nearly sorted data ke liye best.",
        kaise: `[5, 3, 8, 1]
[5] → Insert 3: 3<5, shift → [3,5]
[3,5] → Insert 8: 8>5, no shift → [3,5,8]
[3,5,8] → Insert 1: shift all → [1,3,5,8] ✅`,
        kab: ["Nearly sorted data", "Small arrays (n<50)", "Online algorithm — ek ek element aata rahe"],
        note: "Best O(n): Sorted array mein sirf 1 comparison per element — no shifts.",
      },
      {
        id: "merge", title: "Merge Sort", emoji: "🔀",
        complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
        stable: true,
        kyu: "Divide & Conquer — Array half karo, recursively sort, merge. Guaranteed O(n log n) — worst case bhi.",
        kaise: `[5, 3, 8, 1]
Divide: [5,3] | [8,1]
Divide: [5][3] | [8][1]
Merge:  [3,5]  | [1,8]
Merge:  [1,3,5,8] ✅

O(n log n) kyun:
log n levels × n merge per level = O(n log n)`,
        kab: ["Guaranteed O(n log n) chahiye", "Stable sort chahiye", "Linked List sort", "External sort (large files)"],
        note: "O(n) extra space — merge step ke liye temp array chahiye.",
      },
      {
        id: "quick", title: "Quick Sort", emoji: "⚡",
        complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
        stable: false,
        kyu: "Merge Sort O(n) space leta tha. Quick Sort in-place. Pivot choose karo, partition karo, recurse. Practically fastest.",
        kaise: `[5, 3, 8, 1, 4]  pivot=4

Partition: smaller left, larger right
[3,1,4,5,8] ← 4 final position pe
  ↑ sort   ↑ sort

Worst case (sorted + bad pivot):
[1,2,3,4,5] pivot=5 → n-1 elements side
→ O(n²) — Isliye random pivot use karo!`,
        kab: ["General purpose sorting", "Cache efficiency important ho", "In-place chahiye"],
        note: "Worst O(n²) prevent: Random pivot ya Median of 3 use karo.",
      },
      {
        id: "heap", title: "Heap Sort", emoji: "🏔️",
        complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
        stable: false,
        kyu: "Quick Sort worst case O(n²) tha. Heap Sort: Guaranteed O(n log n) AND in-place. Best of both worlds.",
        kaise: `[5, 3, 8, 1, 4]
1. Build Max Heap: [8,5,3,1,4]
2. Extract max (8), put at end: [4,5,3,1|8]
3. Heapify: [5,4,3,1|8]
4. Extract 5: [1,4,3|5,8]
... repeat → [1,3,4,5,8] ✅`,
        kab: ["Guaranteed O(n log n) + O(1) space dono chahiye", "Real-time systems"],
        note: "Practically slower than Quick Sort — cache unfriendly (random memory access).",
      },
    ],
  },
  {
    id: "techniques", title: "🎯 Techniques / Patterns", color: "#34d399",
    chapters: [
      {
        id: "twopointers", title: "Two Pointers", emoji: "👆👆",
        complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
        kyu: "Nested loops O(n²) ko O(n) mein convert karo. Do pointers strategically move karo — combined movements ≤ n.",
        kaise: `O(n²) → O(n):
for i: for j → n²/2 pairs checked

Two Pointers:
left=0, right=n-1
while left<right: check, decide move
→ max n total moves → O(n)`,
        templates: [
          { name: "Opposite Ends (Sorted Array)", code: `let l=0, r=arr.length-1;
while(l<r){
  const sum=arr[l]+arr[r];
  if(sum===target) return [l,r];
  else if(sum<target) l++;  // bada chahiye
  else r--;                  // chhota chahiye
}` },
          { name: "Same Direction (In-place)", code: `let slow=0;
for(let fast=0;fast<arr.length;fast++){
  if(condition(arr[fast])){ // rakhna chahiye
    arr[slow++]=arr[fast];
  }
}
return slow; // new length` },
          { name: "Fast-Slow (Cycle Detection)", code: `let slow=head, fast=head;
while(fast && fast.next){
  slow=slow.next;
  fast=fast.next.next;
  if(slow===fast) return true; // cycle!
}
return false;` },
        ],
        subtypes: [
          "Opposite Ends: Sorted + pairs, palindrome, container with water",
          "Same Direction: In-place modify, remove duplicates, partition",
          "Fast-Slow: LL cycle, LL middle, duplicate in array",
          "Merge: Two sorted arrays merge karo",
        ],
        kab: ["Sorted array + pairs", "In-place modification", "Linked List cycle/middle"],
        keywords: ["palindrome", "sorted array + target sum", "remove duplicates", "cycle detection"],
      },
      {
        id: "sliding", title: "Sliding Window", emoji: "🪟",
        complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(k)" },
        kyu: "Continuous subarray/substring problems mein window maintain karo. O(n²) → O(n). Right kabhi left nahi jaata — total n moves.",
        kaise: `"Longest substring no repeat"
s = "abcba"

right=0: [a] ✅ max=1
right=1: [ab] ✅ max=2
right=2: [abc] ✅ max=3
right=3: [abcb] ← 'b' repeat!
  shrink: left++, [bcb] still repeat
  shrink: left++, [cb] ✅ max=3
right=4: [cba] ✅ max still 3`,
        templates: [
          { name: "Fixed Size Window", code: `for(let i=0;i<arr.length;i++){
  windowSum += arr[i];        // add new
  if(i>=k) windowSum-=arr[i-k]; // remove old
  if(i>=k-1) result=Math.max(result,windowSum);
}` },
          { name: "Variable Window (Expand-Shrink)", code: `let left=0, result=0;
for(let right=0;right<s.length;right++){
  // EXPAND: right element add karo
  addToWindow(s[right]);
  
  // SHRINK: jab constraint toote
  while(violated()){
    removeFromWindow(s[left]);
    left++;
  }
  
  // RECORD: valid window
  result=Math.max(result, right-left+1);
}` },
        ],
        subtypes: [
          "Fixed Window: Sum/max of exactly k consecutive elements",
          "Variable Window: Longest/shortest subarray with constraint",
          "Count-based: exactly(k) = at_most(k) - at_most(k-1) trick",
        ],
        kab: ["Continuous subarray/substring", "Longest/shortest with constraint", "Fixed size window"],
        keywords: ["substring", "subarray", "window", "continuous", "longest", "shortest"],
      },
      {
        id: "dp", title: "Dynamic Programming", emoji: "🔄",
        complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n×W)", space: "O(n)" },
        mentalModel: "Ek simple sawaal: 'Kya maine yeh subproblem pehle solve kiya?' Agar haan — table mein dekho, return karo. Nahi — solve karo, table mein rakho. Fibonacci bina DP: fib(5) → fib(4)+fib(3) → ... fib(3) BAAR BAAR calculate hota hai → O(2^n). DP ke saath: ek baar calculate, table mein store → O(n). Real-world analogy: Pehle solve ki hui problem dobara mat solve karo — copy karo notes se.",
        kyu: "Recursion mein same subproblems baar baar solve hote hain → O(2^n). DP: ek baar solve karo, store karo → O(n) ya O(n²).",
        kaise: `Fibonacci naive: O(2^n)
fib(5) calls fib(3) TWICE, fib(2) THRICE...

DP (Memoization):
memo={5:5, 4:3, 3:2, 2:1, 1:1, 0:0}
fib(5) → memo check → return 5 ✅ O(n)

DP (Tabulation):
dp=[0,1,1,2,3,5] → dp[n] ✅ O(n) time O(1) space`,
        subtypes: [
          "1D DP: dp[i] depends on dp[i-1], dp[i-2] (Fibonacci, Climbing Stairs, House Robber)",
          "2D DP: dp[i][j] depends on neighbors (Unique Paths, LCS, Edit Distance)",
          "0/1 Knapsack: Include ya exclude each item (ek baar)",
          "Unbounded Knapsack: Item unlimited baar use karo (Coin Change)",
        ],
        kab: ["Overlapping subproblems", "'Number of ways'", "'Min/Max cost/sum'", "'Can you reach'"],
        keywords: ["number of ways", "minimum/maximum", "can you reach", "optimal", "longest/shortest subsequence"],
        note: "Greedy vs DP: Greedy local optimal = global optimal? Yes → Greedy. No → DP.",
      },
      {
        id: "backtracking", title: "Backtracking", emoji: "🔙",
        complexity: { best: "O(2^n)", avg: "O(2^n)", worst: "O(n!)", space: "O(n)" },
        mentalModel: "Sochlo outfits try karna — shirt A pehni, pants B try kari, nahi chali → pants B utaro (BACKTRACK), pants C try karo. CHOOSE → EXPLORE → UNCHOOSE. Yahi backtracking hai. Pruning = socho pehle: 'Kya is branch mein koi valid solution ho sakta hai?' Nahi → jaao hi mat. Yeh O(n!) ko practically bahut chhota bana deta hai.",
        kyu: "Saari possibilities explore karo — but smart: invalid branch mein jaao hi mat (pruning). O(n!) → practically much better.",
        kaise: `Universal Template:
function bt(path, options){
  if(done(path)) { result.push([...path]); return; }
  for(let i=0; i<options.length; i++){
    if(skip(options[i])) continue; // PRUNING
    path.push(options[i]);          // CHOOSE
    bt(path, nextOptions);          // EXPLORE
    path.pop();                     // UNCHOOSE
  }
}

Subsets vs Permutations:
- Subsets: start index aage badhao (no repeat)
- Permutations: used[] array track karo`,
        subtypes: [
          "Subsets: Include/exclude har element (2^n)",
          "Combinations: K elements choose karo (order matter nahi)",
          "Permutations: Saari arrangements (n!)",
          "Constraint-based: N-Queens, Sudoku (pruning = key)",
        ],
        kab: ["Output = List of Lists (all subsets/combos/permutations)", "n ≤ 20"],
        keywords: ["all possible", "generate all", "find all combinations", "permutations"],
      },
      {
        id: "bfs-dfs", title: "BFS & DFS (Graph)", emoji: "🌐",
        complexity: { best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)", space: "O(V)" },
        kyu: "Graph traversal ke do fundamental approaches. BFS = level-by-level (Queue). DFS = deep first (Stack/Recursion).",
        kaise: `BFS (Queue use karo):
Queue: [A] → dequeue A, enqueue neighbors B,C
Queue: [B,C] → dequeue B, enqueue D
Level 0=A, Level 1=B,C, Level 2=D
→ Shortest path = level = distance ✅

DFS (Stack/Recursion):
Stack: [A] → pop A, push C,B
Stack: [C,B] → pop B, push D
Order: A,B,D,C (depth first)
→ All paths, cycles, components ✅`,
        subtypes: [
          "BFS: Shortest path (unweighted), Level order, Multi-source BFS",
          "DFS: Connected components, Cycle detection, Topological sort",
          "Dijkstra: Weighted shortest path (BFS + Min Heap)",
          "Topological Sort: Kahn's BFS (in-degree) ya DFS + reverse",
        ],
        kab: ["BFS: Shortest path, Level traversal", "DFS: All paths, Cycle detection, Topo sort", "Dijkstra: Weighted + positive edges"],
        keywords: ["shortest path", "connected components", "islands", "dependencies", "cycle"],
      },
      {
        id: "greedy", title: "Greedy", emoji: "💰",
        complexity: { best: "O(n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
        kyu: "Locally optimal choice hamesha globally optimal ho toh greedy use karo — faster than DP but works only in specific cases.",
        kaise: `Activity Selection:
Sort by end time → hamesha earliest ending pick karo

Why greedy works:
Earliest end = maximum future flexibility → proven optimal

Where greedy FAILS:
0/1 Knapsack: [w=5,v=10], [w=3,v=6], [w=4,v=7], W=7
Greedy: Pick (5,10) → remaining 2 → Total: 10
Optimal: (3,6)+(4,7) = 13 ← Greedy ne miss kiya!
→ DP chahiye`,
        kab: ["Greedy choice property provable ho", "Activity selection, Scheduling", "Fractional Knapsack (not 0/1)", "Interval merging"],
        keywords: ["minimum operations", "activity selection", "scheduling", "fractional"],
        note: "Greedy works: Activity Selection, Huffman, Fractional Knapsack. Fails: 0/1 Knapsack, Coin Change (arbitrary).",
      },
    ],
  },
];

function ComplexBadge({ val, good }) {
  const isGood = good !== false && (val.includes("1)") || val.includes("log") || val.includes("n)"));
  return (
    <code style={{
      padding: "2px 8px", borderRadius: "6px", fontSize: "12px",
      fontFamily: "'Fira Code', monospace",
      background: isGood ? "rgba(52,211,153,0.1)" : "rgba(251,113,133,0.1)",
      color: isGood ? "#34d399" : "#fb7185",
    }}>{val}</code>
  );
}

export default function Algorithms() {
  const [activeSection, setActiveSection] = useState("searching");
  const [activeChapter, setActiveChapter] = useState("linear");
  const [templateIdx, setTemplateIdx] = useState(0);

  const section = sections.find(s => s.id === activeSection);
  const chapter = section?.chapters.find(c => c.id === activeChapter);

  return (
    <div style={{ display: "flex", maxWidth: "1300px", margin: "0 auto", padding: "32px 24px", gap: "28px", minHeight: "calc(100vh-64px)" }}>

      {/* Sidebar */}
      <div style={{ width: "260px", flexShrink: 0 }}>
        <div style={{ position: "sticky", top: "88px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {sections.map(sec => (
            <div key={sec.id}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: sec.color, marginBottom: "8px", padding: "0 4px" }}>
                {sec.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {sec.chapters.map(ch => {
                  const isActive = activeChapter === ch.id;
                  return (
                    <button key={ch.id} onClick={() => { setActiveSection(sec.id); setActiveChapter(ch.id); setTemplateIdx(0); }} style={{
                      padding: "10px 14px", borderRadius: "10px", cursor: "pointer", textAlign: "left",
                      background: isActive ? `${sec.color}12` : "transparent",
                      border: `1px solid ${isActive ? sec.color : "transparent"}`,
                      color: isActive ? sec.color : "#64748b",
                      fontSize: "13px", fontWeight: isActive ? 600 : 400,
                      transition: "all 0.15s",
                    }}>
                      {ch.emoji} {ch.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      {chapter && (
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: "var(--bg-card)", borderRadius: "20px", padding: "36px", border: `1px solid ${section.color}25` }}>

            {/* Header */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "12px", color: "var(--text-3)", marginBottom: "8px" }}>{section.title}</div>
              <h1 style={{ fontSize: "30px", fontWeight: 800, color: section.color, display: "flex", alignItems: "center", gap: "12px" }}>
                <span>{chapter.emoji}</span> {chapter.title}
              </h1>
            </div>

            {/* Mental Model — shown before complexity */}
            {chapter.mentalModel && (
              <div style={{ background: `${section.color}08`, borderRadius: "12px", padding: "18px 20px", marginBottom: "24px", border: `1px solid ${section.color}25` }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: section.color, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>💡 Mental Model — Aise Sochte Hain</div>
                <p style={{ fontSize: "13.5px", color: "var(--text-2)", lineHeight: 1.75 }}>{chapter.mentalModel}</p>
              </div>
            )}

            {/* Complexity badges */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px", background: "var(--bg-surface)", padding: "18px", borderRadius: "12px" }}>
              {[
                { label: "Best", val: chapter.complexity.best },
                { label: "Average", val: chapter.complexity.avg },
                { label: "Worst", val: chapter.complexity.worst },
                { label: "Space", val: chapter.complexity.space },
                ...(chapter.stable !== undefined ? [{ label: "Stable", val: chapter.stable ? "✅ Yes" : "❌ No" }] : []),
              ].map(({ label, val }) => (
                <div key={label}>
                  <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
                  <ComplexBadge val={val} />
                </div>
              ))}
            </div>

            {/* Why */}
            <section style={{ marginBottom: "28px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: section.color, marginBottom: "10px" }}>❓ Kyu Use Karte Hain?</h2>
              <div style={{ background: "var(--bg-surface)", borderRadius: "10px", padding: "18px", color: "var(--text-2)", fontSize: "14px", lineHeight: 1.7 }}>
                {chapter.kyu}
              </div>
            </section>

            {/* How */}
            <section style={{ marginBottom: "28px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: section.color, marginBottom: "10px" }}>🧠 Kaise Kaam Karta Hai?</h2>
              <pre style={{
                background: "var(--bg-base)", borderRadius: "10px", padding: "20px",
                border: `1px solid ${section.color}20`, fontSize: "12px", color: "var(--text-2)",
                overflowX: "auto", lineHeight: 1.8, whiteSpace: "pre-wrap",
                fontFamily: "'Fira Code', monospace",
              }}>{chapter.kaise}</pre>
            </section>

            {/* Templates */}
            {chapter.templates && (
              <section style={{ marginBottom: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: section.color, marginBottom: "10px" }}>📋 Code Templates</h2>
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                  {chapter.templates.map((t, i) => (
                    <button key={i} onClick={() => setTemplateIdx(i)} style={{
                      padding: "6px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "12px",
                      background: templateIdx === i ? `${section.color}15` : "transparent",
                      border: `1px solid ${templateIdx === i ? section.color : "#334155"}`,
                      color: templateIdx === i ? section.color : "#64748b",
                    }}>{t.name}</button>
                  ))}
                </div>
                <pre style={{
                  background: "var(--bg-base)", borderRadius: "10px", padding: "20px",
                  border: `1px solid ${section.color}20`, fontSize: "12px", color: "var(--text-2)",
                  overflowX: "auto", lineHeight: 1.8, fontFamily: "'Fira Code', monospace",
                }}>{chapter.templates[templateIdx].code}</pre>
              </section>
            )}

            {/* Subtypes */}
            {chapter.subtypes && (
              <section style={{ marginBottom: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: section.color, marginBottom: "10px" }}>🔀 Subtypes</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {chapter.subtypes.map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "12px 16px", background: "#0f172a", borderRadius: "8px", border: `1px solid ${section.color}15` }}>
                      <span style={{ color: section.color, fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>{i + 1}.</span>
                      <span style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.6 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* When to use */}
            {chapter.kab && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
                <div style={{ background: "rgba(52,211,153,0.06)", borderRadius: "10px", padding: "16px", border: "1px solid rgba(52,211,153,0.15)" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#34d399", marginBottom: "10px" }}>✅ Kab Use Karein</div>
                  {chapter.kab.map((k, i) => (
                    <div key={i} style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "6px", paddingLeft: "12px", borderLeft: "2px solid #34d39940" }}>{k}</div>
                  ))}
                </div>
                {chapter.kabNahi && (
                  <div style={{ background: "rgba(251,113,133,0.06)", borderRadius: "10px", padding: "16px", border: "1px solid rgba(251,113,133,0.15)" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#fb7185", marginBottom: "10px" }}>❌ Kab Mat Use Karein</div>
                    {chapter.kabNahi.map((k, i) => (
                      <div key={i} style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "6px", paddingLeft: "12px", borderLeft: "2px solid #fb718540" }}>{k}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Keywords */}
            {chapter.keywords && (
              <section style={{ marginBottom: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: section.color, marginBottom: "10px" }}>🔑 Keywords Jo Problem Mein Dikhein</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {chapter.keywords.map(k => (
                    <span key={k} style={{
                      padding: "5px 14px", borderRadius: "8px", fontSize: "12px",
                      background: `${section.color}12`, color: section.color,
                      border: `1px solid ${section.color}25`, fontStyle: "italic",
                    }}>"{k}"</span>
                  ))}
                </div>
              </section>
            )}

            {/* Note */}
            {chapter.note && (
              <div style={{ background: `${section.color}08`, borderRadius: "10px", padding: "16px", border: `1px solid ${section.color}20` }}>
                <span style={{ fontSize: "13px", color: section.color }}>💡 <strong style={{color:"var(--text-1)"}}>Note:</strong> {chapter.note}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
