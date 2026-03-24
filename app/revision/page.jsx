"use client";
import { useState } from "react";

// ── DS Revision Cards ────────────────────────────────────────
const dsCards = [
  {
    title: "Array", emoji: "🧱", color: "#22d3ee",
    oneliner: "Contiguous memory mein same type ke elements — index se O(1) direct access.",
    operations: [
      { op: "Access arr[i]", time: "O(1)", why: "base + i×size formula — direct RAM address" },
      { op: "Search (unsorted)", time: "O(n)", why: "Worst case saara scan" },
      { op: "Insert/Delete middle", time: "O(n)", why: "Shift karna padta hai — contiguous rakho" },
      { op: "Insert at end", time: "O(1) amort", why: "Bas daalo — resize rare hai" },
    ],
    keepInMind: [
      "arr[i] ka address = base + i × element_size — isliye O(1)",
      "Fixed size declare hoti hai — overflow ya waste dono possible",
      "Sorted array pe Binary Search → O(log n)",
      "Insert/Delete middle mein shift hoti hai — O(n)",
    ],
    memorize: [
      "Access O(1) — kyunki direct address calculate",
      "Insert/Delete middle O(n) — kyunki shift",
      "Sorted array → Binary Search applicable",
    ],
    summary: "Array tab best hai jab random access zyada ho aur insert/delete kam. Fixed size limitation hai.",
    problem: "Fixed size + contiguous memory requirement → Linked List ki need",
  },
  {
    title: "Linked List", emoji: "🔗", color: "#38bdf8",
    oneliner: "Scattered nodes — har node mein data + next pointer. No fixed size, no contiguous memory.",
    operations: [
      { op: "Access i-th element", time: "O(n)", why: "Head se traverse — direct jump impossible" },
      { op: "Insert at Head", time: "O(1)", why: "Sirf head pointer update — size matter nahi" },
      { op: "Insert at Tail (with ptr)", time: "O(1)", why: "Tail pointer directly update" },
      { op: "Insert at Middle", time: "O(n)", why: "Pehle traverse, phir pointer update" },
      { op: "Delete at Head", time: "O(1)", why: "Head ko aage badhao" },
      { op: "Search", time: "O(n)", why: "Linear scan — no index" },
    ],
    keepInMind: [
      "Array se ulta — no random access, no index",
      "Singly: sirf aage. Doubly: aage + peeche. Circular: last → head",
      "Extra memory: har node mein pointer overhead (8 bytes)",
      "Cache unfriendly — nodes scattered in RAM",
      "Sirf agar pointer pata ho toh insert O(1) — otherwise traverse O(n)",
    ],
    memorize: [
      "Head insert O(1), middle insert O(n) (traverse required)",
      "No random access — O(n) for i-th element",
      "Doubly LL: delete at tail O(1) (prev pointer available)",
    ],
    summary: "Dynamic size + cheap insert at head. Cache unfriendly aur no random access weakness hai.",
    problem: "LIFO ya FIFO specifically chahiye → Stack ya Queue",
  },
  {
    title: "Stack", emoji: "📚", color: "#818cf8",
    oneliner: "LIFO — Last In, First Out. Sirf TOP se push aur pop. Linked List pe LIFO restriction.",
    operations: [
      { op: "push(x)", time: "O(1)", why: "Top pe add — ek operation" },
      { op: "pop()", time: "O(1)", why: "Top se remove — ek operation" },
      { op: "peek()", time: "O(1)", why: "Top dekho, remove mat karo" },
      { op: "Search", time: "O(n)", why: "Anti-pattern — stack pe search nahi karte" },
    ],
    keepInMind: [
      "Browser back, Ctrl+Z (undo), function call stack — sab LIFO",
      "Parentheses matching: open → push, close → pop aur match",
      "DFS iteratively bhi stack use karta hai",
      "Monotonic Stack: next greater/smaller element problems",
    ],
    memorize: [
      "Push, Pop, Peek — sab O(1)",
      "LIFO — last aaya woh pehle nikla",
      "Parentheses matching + DFS iterative = Stack",
    ],
    summary: "Whenever 'last used first' pattern aaye — Stack. Function calls, undo, bracket matching.",
    problem: "FIFO chahiye (first aaya pehle nikle) → Queue",
  },
  {
    title: "Queue", emoji: "🚶", color: "#a78bfa",
    onelined: "FIFO — First In, First Out. REAR se add, FRONT se remove.",
    operations: [
      { op: "enqueue (add)", time: "O(1)", why: "REAR pe add" },
      { op: "dequeue (remove)", time: "O(1)", why: "FRONT se remove" },
      { op: "peek / front", time: "O(1)", why: "FRONT dekho" },
      { op: "Search", time: "O(n)", why: "Scan karna padta hai" },
    ],
    keepInMind: [
      "Circular Queue: wasted space fix — REAR wraparound (REAR+1) % size",
      "Deque: dono ends se insert/delete — sliding window max ke liye",
      "Priority Queue: priority ke hisaab se nikle — internally Heap",
      "BFS mein Queue use hoti hai — level-by-level explore",
    ],
    memorize: [
      "Enqueue, Dequeue — O(1)",
      "FIFO — pehle aaya pehle nikla",
      "BFS = Queue, DFS = Stack",
    ],
    summary: "BFS, CPU scheduling, print queue — jab real-world 'line' pattern ho.",
    problem: "Key se O(1) search chahiye → Hash Table",
  },
  {
    title: "Hash Table", emoji: "🗂️", color: "#f59e0b",
    onelined: "Key → Hash Function → Array Index. O(1) average lookup for any key type.",
    operations: [
      { op: "Insert", time: "O(1) avg", why: "Hash compute + direct store" },
      { op: "Search", time: "O(1) avg", why: "Hash compute + direct access" },
      { op: "Delete", time: "O(1) avg", why: "Hash compute + remove" },
      { op: "Worst case all", time: "O(n)", why: "Sab ek bucket mein — poor hash" },
    ],
    keepInMind: [
      "Collision: same index pe do keys — Chaining (LL) ya Open Addressing",
      "Load Factor = n/m > 0.7 → resize karo (double buckets, rehash all)",
      "No ordering — keys random order mein iterate",
      "Range queries impossible — '25 se 30 age wale' slow",
    ],
    memorize: [
      "Average O(1) insert/search/delete",
      "No ordering — sorted data ke liye BST better",
      "Collision: Chaining (LL at index) ya Linear Probing",
    ],
    summary: "Fast key-value lookup. Ordering ya range queries chahiye toh BST use karo.",
    problem: "Ordered + hierarchical data chahiye → Binary Search Tree",
  },
  {
    title: "BST (Binary Search Tree)", emoji: "🌳", color: "#34d399",
    onelined: "Rule: Left < Node < Right. Sorted order maintain karta hai dynamically.",
    operations: [
      { op: "Search", time: "O(log n) avg", why: "Har step pe half eliminate" },
      { op: "Insert", time: "O(log n) avg", why: "Correct position tak traverse" },
      { op: "Delete", time: "O(log n) avg", why: "3 cases: leaf, 1 child, 2 children" },
      { op: "Worst case", time: "O(n)", why: "Sorted input → skewed tree → linked list" },
      { op: "Inorder traversal", time: "O(n)", why: "Sorted output nikalta hai" },
    ],
    keepInMind: [
      "Inorder (Left→Node→Right) = Sorted output — BST ka superpower",
      "Sorted order mein insert karo → skewed tree → O(n) worst case",
      "3 delete cases: leaf → simply remove; 1 child → bypass; 2 children → inorder successor",
    ],
    memorize: [
      "BST Rule: Left < Node < Right — HAR node pe",
      "Inorder traversal = sorted sequence",
      "Worst case O(n) — sorted input se avoid karo",
    ],
    summary: "Sorted data dynamically maintain karna + O(log n) operations average. Unbalanced hone ka risk.",
    problem: "O(n) worst case → AVL Tree (guaranteed balance)",
  },
  {
    title: "AVL Tree", emoji: "⚖️", color: "#10b981",
    onelined: "Self-balancing BST — Balance Factor |h(L)-h(R)| ≤ 1 always.",
    operations: [
      { op: "Search/Insert/Delete", time: "O(log n)", why: "GUARANTEED — tree always balanced" },
    ],
    keepInMind: [
      "Balance Factor = height(left) - height(right) — valid: -1, 0, +1",
      "4 rotation types: LL (Right rotate), RR (Left), LR (Left-Right), RL (Right-Left)",
      "Red-Black Tree: less strict balance, fewer rotations → Java TreeMap, C++ map",
    ],
    memorize: [
      "AVL: strict balance → O(log n) guaranteed",
      "4 rotations: LL, RR, LR, RL",
      "Red-Black = AVL ka relaxed version, faster writes",
    ],
    summary: "Guaranteed O(log n) — sorted input pe bhi. Rotation overhead hai.",
    problem: "Streaming max/min fast chahiye → Heap",
  },
  {
    title: "Heap", emoji: "🏔️", color: "#fb923c",
    onelined: "Max/Min hamesha root pe. Array se implement hota hai internally.",
    operations: [
      { op: "Peek Max/Min", time: "O(1)", why: "Root is always answer" },
      { op: "Insert (heapify up)", time: "O(log n)", why: "Tree height = log n levels" },
      { op: "Delete Max/Min (heapify down)", time: "O(log n)", why: "Bubble down log n levels" },
      { op: "Build Heap", time: "O(n)", why: "Bottom-up heapify — linear!" },
      { op: "Search any element", time: "O(n)", why: "No ordering except parent>child" },
    ],
    keepInMind: [
      "Array indices: Parent = (i-1)/2, Left = 2i+1, Right = 2i+2",
      "Top-K pattern: Min-heap of size K → heap[0] = Kth largest",
      "Two Heaps trick: median of stream (max-heap lower half, min-heap upper half)",
      "Heap Sort: Build heap O(n) + n×extract O(log n) = O(n log n) in-place",
    ],
    memorize: [
      "Peek O(1), Insert/Delete O(log n)",
      "Array formula: parent=(i-1)/2, left=2i+1, right=2i+2",
      "Top-K = Min-heap of size K",
    ],
    summary: "Jab max ya min baar baar chahiye — Heap. BST se better O(1) peek.",
    problem: "Connections/relationships → Graph",
  },
  {
    title: "Graph", emoji: "🕸️", color: "#e879f9",
    onelined: "Nodes + Edges — koi bhi node kisi bhi node se connected ho sakta hai. No hierarchy restriction.",
    operations: [
      { op: "BFS/DFS (Adj List)", time: "O(V+E)", why: "Har node aur edge ek baar visit" },
      { op: "BFS/DFS (Adj Matrix)", time: "O(V²)", why: "Har node pe V checks" },
      { op: "Add Edge (List)", time: "O(1)", why: "List mein append" },
      { op: "Check Edge (Matrix)", time: "O(1)", why: "Direct index" },
    ],
    keepInMind: [
      "Adj List O(V+E) space → sparse graphs. Adj Matrix O(V²) → dense graphs",
      "BFS → shortest path (unweighted). Dijkstra → weighted positive",
      "DFS → cycles, connected components, topological sort",
      "Topological sort sirf DAG (no cycles) pe kaam karta hai",
    ],
    memorize: [
      "BFS = Queue, shortest unweighted. DFS = Stack/Recursion, all paths",
      "Adj List: sparse. Adj Matrix: dense. Space matters.",
      "Cycle detection: DFS color (white/gray/black) ya Union-Find",
    ],
    summary: "Real-world connections — roads, social networks, internet. BFS ya DFS choose karo based on problem.",
    problem: "String prefix search → Trie",
  },
  {
    title: "Trie (Prefix Tree)", emoji: "🔤", color: "#f43f5e",
    onelined: "Char-by-char tree — common prefix ek baar store. O(L) operations where L = word length.",
    operations: [
      { op: "Insert", time: "O(L)", why: "L = word length, char by char" },
      { op: "Search", time: "O(L)", why: "Path follow karo char by char" },
      { op: "startsWith prefix", time: "O(L)", why: "Path exist karta hai?" },
      { op: "getAllWithPrefix (DFS)", time: "O(L + output)", why: "Prefix path + DFS subtree" },
    ],
    keepInMind: [
      "TrieNode: children map + isEnd boolean",
      "Memory heavy: 26 pointers per node (English) — HashMap children use karo",
      "Keywords: 'prefix', 'autocomplete', 'starts with', 'spell check'",
    ],
    memorize: [
      "All operations O(L) — word count pe depend nahi",
      "isEnd = true matlab yahan koi word khatam hota hai",
      "Common prefix ek baar store — space efficient for prefix-heavy data",
    ],
    summary: "String prefix problems ke liye specialized. Autocomplete engines mein use hota hai.",
    problem: "Trie = last DS in evolution chain.",
  },
];

// ── Algorithm Pattern Revision Cards ───────────────────────
const algoCards = [
  {
    title: "Two Pointers", emoji: "👆👆", color: "#22d3ee",
    onelined: "O(n²) nested loops → O(n). Do variables jo smart tarike se move karte hain.",
    mentalModel: "Sochlo 2 fingers ek sorted array pe — ek left se, ek right se. Sum bada → right finger peeche, sum chhota → left finger aage.",
    subtypes: ["Opposite Ends: sorted + pairs (Two Sum, 3Sum, Palindrome)", "Same Direction: in-place modify (Remove Duplicates, Move Zeroes)", "Fast-Slow: cycle detection, LL middle (Floyd's algorithm)", "Merge: two sorted arrays combine karo"],
    keywords: ["palindrome", "sorted + target sum", "remove duplicates", "cycle detection", "in-place modify"],
    complexity: "Time: O(n) | Space: O(1)",
    memorize: ["Left kabhi right se aage nahi jaata — combined n moves → O(n)", "Sorted array pe opposite ends", "Fast-Slow: cycle = dono milenge"],
  },
  {
    title: "Sliding Window", emoji: "🪟", color: "#a78bfa",
    onelined: "Continuous subarray/substring mein O(n²) → O(n). Window expand/shrink karo.",
    mentalModel: "Yeh window real mein exist nahi karti. Bas do variables: i (left boundary) aur j (right pointer). Jab j aage badhta hai — window expand. Jab constraint violate ho, i aage badhata hai — shrink. Dimag mein ek rubber band window imagine karo jo expand aur contract karti hai.",
    subtypes: ["Fixed Size: exactly k elements (sum, max, frequency)", "Variable Window: longest/shortest with constraint (no-repeat, at most K)", "Count-based: exactly(k) = at_most(k) - at_most(k-1) trick"],
    keywords: ["substring", "subarray", "continuous", "window", "longest no-repeat", "max sum of k"],
    complexity: "Time: O(n) | Space: O(k)",
    memorize: ["right kabhi left nahi jaata + left kabhi right se aage nahi → total 2n moves → O(n)", "Variable window: expand right → shrink left jab constraint toote", "at_most trick for 'exactly k' problems"],
  },
  {
    title: "Binary Search", emoji: "🎯", color: "#38bdf8",
    onelined: "Sorted ya monotonic data pe O(n) → O(log n). Har step pe search space HALF.",
    mentalModel: "Sochlo phone book mein name dhundna — middle pe jaao, compare karo, half eliminate karo. n=1,000,000 → sirf 20 steps. Key insight: har step pe ek decision leke HALF problem eliminate ho jaaye.",
    subtypes: ["Classic: exact value dhundho", "Boundary: first/last occurrence (left boundary find)", "Binary Search on Answer: 'minimize maximum' type — answer range pe search karo"],
    keywords: ["sorted array search", "kth element", "minimize maximum", "maximize minimum", "first/last occurrence"],
    complexity: "Time: O(log n) | Space: O(1)",
    memorize: ["Condition: sorted ya monotonic property", "mid = left + (right-left)/2 (overflow safe)", "'Minimize max' = binary search on answer space"],
  },
  {
    title: "Dynamic Programming", emoji: "🔄", color: "#fbbf24",
    onelined: "Overlapping subproblems → store karo, dobara calculate mat karo. O(2^n) → O(n) ya O(n²).",
    mentalModel: "Ek simple question: 'Kya maine yeh subproblem pehle solve kiya?' Agar haan — direct return. Nahi — solve karo aur memo mein daalo. Fibonacci example: fib(5) = fib(4)+fib(3). fib(3) baar baar calculate nahi karna — ek baar karo, table mein rakho.",
    subtypes: ["1D DP: dp[i] depends on dp[i-1] (Climbing Stairs, House Robber, Coin Change)", "2D DP: dp[i][j] depends on neighbors (Unique Paths, LCS, Edit Distance)", "0/1 Knapsack: include/exclude each item once", "Unbounded Knapsack: item unlimited use (Coin Change)"],
    keywords: ["number of ways", "minimum/maximum cost", "can you reach", "longest subsequence", "optimal"],
    complexity: "Time: O(n) to O(n²) | Space: O(n) to O(n²)",
    memorize: ["2 conditions: overlapping subproblems + optimal substructure", "Top-down = Memoization (recursion + cache)", "Bottom-up = Tabulation (iterative, fill table)", "0/1 Knapsack: traverse weight backwards (prevent reuse)"],
  },
  {
    title: "Backtracking", emoji: "🔙", color: "#34d399",
    onelined: "Saari possibilities explore karo — invalid path mein jaao hi mat (pruning). Output = list of lists.",
    mentalModel: "Sochlo outfits try karna — shirt A pehni, pants B pehni, nahi chali → pants B utaro (backtrack), pants C try karo. CHOOSE → EXPLORE → UNCHOOSE. Pruning se invalid branches early cut hoti hain.",
    subtypes: ["Subsets: include/exclude har element (2^n)", "Combinations: k size ke groups, order matter nahi", "Permutations: saari arrangements (n!)", "Constraint-based: N-Queens, Sudoku (pruning = game changer)"],
    keywords: ["all possible", "generate all", "combinations", "permutations", "find all subsets"],
    complexity: "Time: O(2^n) to O(n!) | Space: O(n)",
    memorize: ["Template: choose → explore → unchoose", "Output = list of lists → almost always backtracking", "n ≤ 20 → backtracking ok", "Pruning: invalid branch early exit = huge speedup"],
  },
  {
    title: "Graph — BFS & DFS", emoji: "🌐", color: "#e879f9",
    onelined: "BFS: Queue, level-by-level, shortest path. DFS: Stack/Recursion, deep first, all paths.",
    mentalModel: "BFS = ripple in water — ek stone daalo, waves circle mein phelti hain. Level 1 = adjacent, Level 2 = neighbors' neighbors. DFS = ek chor raste mein ghus jaata hai jahantak jaata hai, phir bahar aata hai.",
    subtypes: ["BFS: Shortest path unweighted, level order, multi-source", "DFS: Connected components, cycle detection, topological sort", "Dijkstra: BFS + Min Heap → weighted shortest path (positive)", "Topological Sort: Kahn's BFS (in-degree) — dependency order"],
    keywords: ["shortest path", "connected components", "islands", "level order", "cycle detection", "dependencies"],
    complexity: "BFS/DFS: O(V+E) | Dijkstra: O((V+E)log V)",
    memorize: ["BFS = Queue, DFS = Stack/Recursion", "BFS = shortest unweighted path", "Topo sort = valid only on DAG (no cycles)", "Multi-source BFS: sab sources ek saath queue mein"],
  },
  {
    title: "Greedy", emoji: "💰", color: "#fb923c",
    onelined: "Har step pe locally best choice lo — agar globally optimal ho toh. DP se faster.",
    mentalModel: "Greedy doctor ki tarah sochta hai — abhi jo best lagta hai woh lo, future ki chinta mat karo. Works kab: agar locally best choice future choice ko restrict nahi karti (greedy choice property). Fails kab: 0/1 Knapsack — heavy item lo, valuable chhota item miss ho sakta hai.",
    subtypes: ["Activity Selection: earliest ending pehle (proven optimal)", "Fractional Knapsack: value/weight ratio sort karo", "Interval Scheduling: sort by end time", "Jump Game: max reachable track karo"],
    keywords: ["minimum operations", "activity selection", "earliest deadline", "interval", "always best local"],
    complexity: "Time: O(n) to O(n log n) | Space: O(1)",
    memorize: ["Greedy works: Activity Selection, Fractional Knapsack, Huffman", "Greedy FAILS: 0/1 Knapsack, Coin Change (arbitrary)", "Test: greedy choice → future options restrict hoti hain? → DP use karo"],
  },
  {
    title: "Heap / Priority Queue", emoji: "🏔️", color: "#f43f5e",
    onelined: "Dynamic max/min access. Top-K pattern ka king.",
    mentalModel: "Hospital emergency queue — jo zyada urgent patient hai, woh pehle jaayega, bhale hi baad mein aaya ho. Heap internally array hai, tree ki tarah behave karta hai.",
    subtypes: ["Top-K: Min-heap of size K → K largest find karo O(n log k)", "Merge K Sorted: har list ka head heap mein daalo", "Median Stream: two heaps — lower half max-heap, upper half min-heap", "Sliding Window Max: Deque (monotonic)"],
    keywords: ["k largest", "k smallest", "top k frequent", "median", "merge k lists"],
    complexity: "Insert/Delete: O(log n) | Peek: O(1)",
    memorize: ["Top-K = Min-heap of size K (heap[0] = Kth largest)", "Median = Two heaps balanced", "Build heap = O(n) (not O(n log n))"],
  },
];

function DSRevCard({ card }) {
  const [showAll, setShowAll] = useState(false);
  const c = card.color;
  return (
    <div style={{ background: "var(--bg-card)", borderRadius: "16px", border: `1px solid var(--border)`, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "20px 24px", background: `${c}08`, borderBottom: `1px solid ${c}20` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <span style={{ fontSize: "24px" }}>{card.emoji}</span>
          <span style={{ fontSize: "18px", fontWeight: 800, color: c }}>{card.title}</span>
        </div>
        <p style={{ fontSize: "13px", color: "var(--text-2)", fontStyle: "italic" }}>{card.onelined || card.oneliner}</p>
      </div>

      <div style={{ padding: "20px 24px" }}>
        {/* Operations */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>⚡ Operations</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {card.operations.slice(0, showAll ? 99 : 3).map(op => (
              <div key={op.op} style={{ display: "grid", gridTemplateColumns: "160px 100px 1fr", gap: "8px", alignItems: "center", fontSize: "12px" }}>
                <code style={{ color: "var(--text-1)", fontFamily: "'Fira Code', monospace" }}>{op.op}</code>
                <code style={{ color: c, background: `${c}12`, padding: "2px 8px", borderRadius: "5px", fontFamily: "'Fira Code', monospace" }}>{op.time}</code>
                <span style={{ color: "var(--text-3)" }}>{op.why}</span>
              </div>
            ))}
            {card.operations.length > 3 && (
              <button onClick={() => setShowAll(!showAll)} style={{ fontSize: "11px", color: c, background: "none", border: "none", cursor: "pointer", textAlign: "left", marginTop: "2px" }}>
                {showAll ? "▲ kam dikhaao" : `▼ +${card.operations.length - 3} aur operations`}
              </button>
            )}
          </div>
        </div>

        {/* Keep in mind */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>🧠 Yeh Dhyan Mein Rakho</div>
          {card.keepInMind.map((k, i) => (
            <div key={i} style={{ fontSize: "12px", color: "var(--text-2)", marginBottom: "5px", paddingLeft: "10px", borderLeft: `2px solid ${c}40`, lineHeight: 1.5 }}>{k}</div>
          ))}
        </div>

        {/* Memorize */}
        <div style={{ background: `${c}08`, borderRadius: "10px", padding: "14px", marginBottom: "14px", border: `1px solid ${c}20` }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: c, marginBottom: "8px" }}>📌 Yeh Memorize Karo (Revision ke time)</div>
          {card.memorize.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: "7px", fontSize: "12px", color: "var(--text-2)", marginBottom: "4px" }}>
              <span style={{ color: c, flexShrink: 0 }}>✓</span><span>{m}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ fontSize: "12px", color: "var(--text-2)", padding: "10px 12px", background: "var(--bg-surface)", borderRadius: "8px", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--text-1)" }}>Summary:</strong> {card.summary}
        </div>
        {card.problem && (
          <div style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "8px", fontStyle: "italic" }}>
            👉 Problem jo agla structure solve karta hai: {card.problem}
          </div>
        )}
      </div>
    </div>
  );
}

function AlgoRevCard({ card }) {
  const c = card.color;
  return (
    <div style={{ background: "var(--bg-card)", borderRadius: "16px", border: `1px solid var(--border)`, overflow: "hidden" }}>
      <div style={{ padding: "18px 22px", background: `${c}08`, borderBottom: `1px solid ${c}20` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
          <span style={{ fontSize: "22px" }}>{card.emoji}</span>
          <span style={{ fontSize: "17px", fontWeight: 800, color: c }}>{card.title}</span>
          <code style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "5px", background: `${c}15`, color: c, marginLeft: "auto" }}>{card.complexity}</code>
        </div>
        <p style={{ fontSize: "12px", color: "var(--text-2)", fontStyle: "italic" }}>{card.onelined}</p>
      </div>

      <div style={{ padding: "18px 22px" }}>
        {/* Mental Model */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "7px" }}>💡 Mental Model (Yaad karne ki trick)</div>
          <div style={{ fontSize: "12.5px", color: "var(--text-2)", lineHeight: 1.7, padding: "12px", background: "var(--bg-surface)", borderRadius: "8px", borderLeft: `3px solid ${c}` }}>
            {card.mentalModel}
          </div>
        </div>

        {/* Subtypes */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "7px" }}>🔀 Subtypes</div>
          {card.subtypes.map((s, i) => (
            <div key={i} style={{ fontSize: "12px", color: "var(--text-2)", marginBottom: "5px", paddingLeft: "10px", borderLeft: `2px solid ${c}40` }}>{s}</div>
          ))}
        </div>

        {/* Keywords */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "7px" }}>🔑 Keywords jo problem mein dikhein</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {card.keywords.map(k => (
              <span key={k} style={{ padding: "3px 10px", borderRadius: "6px", fontSize: "11px", background: `${c}10`, color: c, border: `1px solid ${c}25`, fontStyle: "italic" }}>"{k}"</span>
            ))}
          </div>
        </div>

        {/* Memorize */}
        <div style={{ background: `${c}08`, borderRadius: "10px", padding: "12px", border: `1px solid ${c}20` }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: c, marginBottom: "7px" }}>📌 Yeh Memorize Karo</div>
          {card.memorize.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: "7px", fontSize: "12px", color: "var(--text-2)", marginBottom: "4px" }}>
              <span style={{ color: c, flexShrink: 0 }}>✓</span><span>{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Revision() {
  const [tab, setTab] = useState("ds");
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState({});

  const filteredDS = dsCards.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
  const filteredAlgo = algoCards.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.keywords?.some(k => k.includes(search.toLowerCase())));

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "36px 24px" }}>

      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontSize: "clamp(26px,5vw,40px)", fontWeight: 900, marginBottom: "8px", color: "var(--text-1)" }}>
          🔁 Revision Hub
        </h1>
        <div style={{ background: "rgba(251,113,133,0.08)", border: "1px solid rgba(251,113,133,0.2)", borderRadius: "10px", padding: "14px 18px", display: "inline-flex", gap: "10px", alignItems: "flex-start", maxWidth: "700px" }}>
          <span style={{ fontSize: "18px" }}>💡</span>
          <div>
            <strong style={{ color: "#fb7185", fontSize: "13px" }}>Revision = Active Recall</strong>
            <p style={{ fontSize: "12px", color: "var(--text-2)", marginTop: "4px", lineHeight: 1.6 }}>
              Sirf padhna revision nahi hai. Pehle <em>yaad karo ki padha kya tha</em> — phir dekho. 
              Har card pe pehle mentally answer socho, phir verify karo. Yahi brain mein concepts fix hote hain.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs + Search */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[["ds", "📦 Data Structures"], ["algo", "⚙️ Algorithm Patterns"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              padding: "9px 20px", borderRadius: "8px", cursor: "pointer",
              background: tab === id ? "var(--accent-rose)" : "var(--bg-elevated)",
              color: tab === id ? "#fff" : "var(--text-2)",
              border: "none", fontWeight: tab === id ? 700 : 400, fontSize: "13px",
            }}>{label}</button>
          ))}
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
          style={{ padding: "9px 14px", borderRadius: "8px", background: "var(--bg-elevated)", color: "var(--text-1)", border: "1px solid var(--border)", fontSize: "13px", width: "200px" }} />
      </div>

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: "18px" }}>
        {tab === "ds"
          ? filteredDS.map(c => <DSRevCard key={c.title} card={c} />)
          : filteredAlgo.map(c => <AlgoRevCard key={c.title} card={c} />)
        }
      </div>
    </div>
  );
}
