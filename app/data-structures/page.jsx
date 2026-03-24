"use client";
import { useState } from "react";

const chapters = [
  {
    id: 1, emoji: "🧱", title: "Array",
    color: "#22d3ee", border: "rgba(34,211,238,0.2)",
    prev: null, next: "Linked List",
    kyu: "Same type ke multiple items ko ek naam se store karo — index se directly access karo.",
    memory: `RAM mein Array ek continuous block occupy karta hai.

arr[i] ka address = base_address + (i × element_size)
arr[2] = 1000 + (2 × 4) = 1008  ✅ (int = 4 bytes)

Isliye O(1) access: CPU directly calculate karta hai address — koi loop nahi, koi search nahi.`,
    diagram: [
      { label: "arr[0]", val: "10", addr: "1000" },
      { label: "arr[1]", val: "20", addr: "1004" },
      { label: "arr[2]", val: "30", addr: "1008" },
      { label: "arr[3]", val: "40", addr: "1012" },
    ],
    ops: [
      { op: "Access arr[i]", time: "O(1)", fast: true, why: "Address directly calculate hota hai" },
      { op: "Search (unsorted)", time: "O(n)", fast: false, why: "Worst case saara array scan" },
      { op: "Search (sorted)", time: "O(log n)", fast: true, why: "Binary search possible" },
      { op: "Insert (end)", time: "O(1)", fast: true, why: "Bas last pe daalo" },
      { op: "Insert (middle)", time: "O(n)", fast: false, why: "Saare elements right shift karne padte hain" },
      { op: "Delete (middle)", time: "O(n)", fast: false, why: "Gap fill karne ke liye left shift karo" },
    ],
    problems: [
      "Fixed size — pehle se declare karna padta hai, overflow ya waste possible",
      "Contiguous memory — bade arrays ke liye ek saath itni RAM milna mushkil",
      "Insert/Delete costly — middle mein kuch karo toh O(n) shift",
    ],
    tip: "Array ka best use: Fast random access. Worst use: Frequent insert/delete.",
  },
  {
    id: 2, emoji: "🔗", title: "Linked List",
    color: "#38bdf8", border: "rgba(56,189,248,0.2)",
    prev: "Array", next: "Stack",
    kyu: "Array fixed size tha aur insert/delete costly. Linked List: Dynamic size + O(1) insert at head — koi shift nahi.",
    memory: `Array (Continuous):
[1000] [1004] [1008] elements ek saath

Linked List (Scattered):
Node at 1000: [data=10 | next→2500]
Node at 2500: [data=20 | next→1300]  
Node at 1300: [data=30 | next=NULL]

Har node kahi bhi RAM mein ho sakta hai.
Sirf HEAD pointer yaad rakhna hai.`,
    ops: [
      { op: "Access i-th element", time: "O(n)", fast: false, why: "Head se chalte hain — direct jump nahi" },
      { op: "Search", time: "O(n)", fast: false, why: "Linear scan, koi index nahi" },
      { op: "Insert at Head", time: "O(1)", fast: true, why: "Sirf head pointer update — size matter nahi" },
      { op: "Insert at Tail (with tail ptr)", time: "O(1)", fast: true, why: "Tail pointer directly update" },
      { op: "Insert at Middle", time: "O(n)", fast: false, why: "Pehle position tak traverse karo" },
      { op: "Delete at Head", time: "O(1)", fast: true, why: "Head ko aage badhao" },
      { op: "Delete at Middle", time: "O(n)", fast: false, why: "Previous node dhundna padta hai" },
    ],
    problems: [
      "No random access — arr[5] jaisa direct jump nahi, O(n) traverse",
      "Cache unfriendly — nodes scattered hain, CPU cache miss",
      "Extra memory — har node mein pointer overhead (8 bytes extra)",
      "Reverse traverse impossible (Singly LL)",
    ],
    tip: "Types: Singly (1 pointer), Doubly (2 pointers, reverse possible), Circular (last→head).",
  },
  {
    id: 3, emoji: "📚", title: "Stack",
    color: "#818cf8", border: "rgba(129,140,248,0.2)",
    prev: "Linked List", next: "Queue",
    kyu: "LIFO (Last In, First Out) pattern — jo last aaya woh pehle nikle. Browser back, Undo, Function calls, Parentheses matching.",
    memory: `Stack = Array ya LL pe LIFO restriction

        TOP → [30]   ← sirf yahan se add/remove
              [20]
              [10]

push(10) → [10]
push(20) → [10, 20]
push(30) → [10, 20, 30]
pop()    → 30 wapas, [10, 20]`,
    ops: [
      { op: "push(x)", time: "O(1)", fast: true, why: "Top pe add — bas ek operation" },
      { op: "pop()", time: "O(1)", fast: true, why: "Top se remove — bas ek operation" },
      { op: "peek()", time: "O(1)", fast: true, why: "Top dekho, remove mat karo" },
      { op: "isEmpty()", time: "O(1)", fast: true, why: "Top pointer check karo" },
      { op: "Search", time: "O(n)", fast: false, why: "Anti-pattern — stack pe search nahi karte" },
    ],
    problems: [
      "Sirf TOP se access — middle mein kuch nahi dekh sakte directly",
      "LIFO only — FIFO chahiye toh Queue use karo",
    ],
    tip: "Real uses: Parentheses matching, DFS iterative, Function call stack, Undo/Redo, Monotonic Stack.",
  },
  {
    id: 4, emoji: "🚶", title: "Queue",
    color: "#a78bfa", border: "rgba(167,139,250,0.2)",
    prev: "Stack", next: "Hash Table",
    kyu: "Stack LIFO tha. Queue FIFO (First In, First Out) — jo pehle aaya woh pehle nikle. CPU scheduling, BFS, Print queue.",
    memory: `FRONT → [10] [20] [30] [40] ← REAR

enqueue(50) → REAR pe add:
FRONT → [10] [20] [30] [40] [50] ← REAR

dequeue() → FRONT se remove:
FRONT → [20] [30] [40] [50] ← REAR  (10 return hua)

Types:
- Simple Queue: Array ya LL
- Circular Queue: REAR wraparound → no wasted space
- Deque: Dono ends se insert/delete
- Priority Queue: Highest priority pehle (Heap use karta hai)`,
    ops: [
      { op: "enqueue (add)", time: "O(1)", fast: true, why: "REAR pe add — direct" },
      { op: "dequeue (remove)", time: "O(1)", fast: true, why: "FRONT se remove — direct" },
      { op: "peek (front)", time: "O(1)", fast: true, why: "FRONT dekho" },
      { op: "Search", time: "O(n)", fast: false, why: "Pura scan karna padta hai" },
    ],
    problems: [
      "No direct access — sirf FRONT se dequeue, REAR se enqueue",
      "Key-based instant lookup nahi — O(1) search chahiye toh Hash Table",
    ],
    tip: "BFS mein Queue use hoti hai — level-by-level explore karo.",
  },
  {
    id: 5, emoji: "🗂️", title: "Hash Table",
    color: "#f59e0b", border: "rgba(245,158,11,0.2)",
    prev: "Queue", next: "Binary Tree",
    kyu: "Array mein integer index se O(1) tha. Hash Table mein koi bhi key (string, number) → Hash Function → Integer index → O(1) access.",
    memory: `hash("name") → 3 → arr[3] = "Rahul"
hash("age")  → 7 → arr[7] = 21

Hash Function properties:
- Same key → hamesha same index (deterministic)
- Fast compute: O(1)
- Uniform distribution

COLLISION: Do alag keys same index pe?
Solution 1 - Chaining: arr[5] → [("abc", v1)] → [("xyz", v2)]
Solution 2 - Open Addressing: Next empty slot dhundho

Load Factor = n/m (elements/buckets)
> 0.7 toh resize karo (double buckets)`,
    ops: [
      { op: "Insert", time: "O(1) avg", fast: true, why: "Hash compute + direct store" },
      { op: "Search", time: "O(1) avg", fast: true, why: "Hash compute + direct access" },
      { op: "Delete", time: "O(1) avg", fast: true, why: "Hash compute + remove" },
      { op: "Insert (worst)", time: "O(n)", fast: false, why: "Sab ek bucket mein — LL traverse" },
      { op: "Search (worst)", time: "O(n)", fast: false, why: "Poor hash function ya max collisions" },
    ],
    problems: [
      "No ordering — keys sorted order mein nahi milti",
      "Range queries impossible — '25 se 30 age wale' dhundna slow",
      "Worst case O(n) — poor hash function pe",
      "Hierarchical data represent nahi hota",
    ],
    tip: "HashMap = key→value, HashSet = existence only (less memory).",
  },
  {
    id: 6, emoji: "🌲", title: "Binary Search Tree (BST)",
    color: "#34d399", border: "rgba(52,211,153,0.2)",
    prev: "Hash Table", next: "AVL Tree",
    kyu: "Hash Table ordering nahi deta tha. BST rule: Left < Root < Right — sorted order maintain + O(log n) search.",
    memory: `BST Rule: Left < Node < Right (har node pe)

        10
       /    \\
      5      15
     / \\    /  \\
    3   7  12   20

5 < 10 ✅  15 > 10 ✅  7 > 5 ✅

Search 7:
Root(10)? 7<10 → LEFT
Node(5)? 7>5 → RIGHT  
Node(7)? Found! ✅ (sirf 3 steps for 7 elements)

Inorder traversal = Sorted output: 3,5,7,10,12,15,20`,
    ops: [
      { op: "Search", time: "O(log n) avg", fast: true, why: "Har step pe half elements eliminate" },
      { op: "Insert", time: "O(log n) avg", fast: true, why: "Correct position tak traverse + insert" },
      { op: "Delete", time: "O(log n) avg", fast: true, why: "3 cases: leaf, 1 child, 2 children" },
      { op: "Min/Max", time: "O(log n)", fast: true, why: "Leftmost/Rightmost node" },
      { op: "Search (worst)", time: "O(n)", fast: false, why: "Sorted input → skewed tree → linked list" },
    ],
    problems: [
      "Unbalanced ho sakta hai — sorted insert karo toh O(n) worst case",
      "No guarantee — average O(log n) but worst O(n)",
    ],
    tip: "Sorted order mein kabhi insert mat karo BST mein — skewed tree banta hai!",
  },
  {
    id: 7, emoji: "⚖️", title: "AVL Tree",
    color: "#10b981", border: "rgba(16,185,129,0.2)",
    prev: "BST", next: "Heap",
    kyu: "BST worst case O(n) tha (sorted input). AVL: Self-balancing — rotations se Balance Factor = |height(left) - height(right)| ≤ 1 guarantee.",
    memory: `Balance Factor = height(left) - height(right)
Valid: -1, 0, +1

Agar BF = 2 ya -2 → Rotation karo:

LL Rotation (Right rotate):
    30              20
   /       →       /  \\
  20               10   30
 /
10

RR, LR, RL — 4 types of rotations`,
    ops: [
      { op: "Search", time: "O(log n)", fast: true, why: "GUARANTEED — tree always balanced" },
      { op: "Insert", time: "O(log n)", fast: true, why: "BST insert + rotation O(1)" },
      { op: "Delete", time: "O(log n)", fast: true, why: "BST delete + rotation" },
    ],
    problems: [
      "Rotations aur height tracking — implementation complex",
      "Frequent insert/delete pe rotation overhead",
      "Red-Black Tree (Java TreeMap, C++ map) — less rotations, practical faster",
    ],
    tip: "AVL = strict balance (AVL ≤ 1). Red-Black = relaxed balance, faster writes.",
  },
  {
    id: 8, emoji: "🏔️", title: "Heap",
    color: "#fb923c", border: "rgba(251,146,60,0.2)",
    prev: "AVL Tree", next: "Graph",
    kyu: "BST mein Max/Min → O(log n) traverse. Heap mein Root HAMESHA Max (ya Min) hai → O(1) peek. Priority Queue implement karna.",
    memory: `Max Heap: Parent ≥ Children (har level pe)

         50
        /    \\
       30      40
      / \\    /
     10  20  35

Array: [50, 30, 40, 10, 20, 35]
Index:   0   1   2   3   4   5

Parent of i = (i-1)/2
Left child  = 2i+1
Right child = 2i+2

INSERT 45:
1. End mein daalo → [50,30,40,10,20,35,45]
2. Heapify Up: 45>40? Swap → [50,30,45,10,20,35,40]
3. 45<50? Stop. ✅ → O(log n)`,
    ops: [
      { op: "Peek Max/Min", time: "O(1)", fast: true, why: "Root dekho — hamesha answer" },
      { op: "Insert", time: "O(log n)", fast: true, why: "Heapify up — tree height = log n" },
      { op: "Delete Max/Min", time: "O(log n)", fast: true, why: "Heapify down" },
      { op: "Build Heap", time: "O(n)", fast: true, why: "Bottom-up heapify" },
      { op: "Search any", time: "O(n)", fast: false, why: "No ordering beyond parent>child" },
    ],
    problems: [
      "Search slow O(n) — arbitrary element dhundna",
      "No complete sorting — sirf max/min guaranteed at root",
      "Relationships represent nahi hota",
    ],
    tip: "Top-K problems: Min-heap of size K maintain karo → heap[0] = Kth largest.",
  },
  {
    id: 9, emoji: "🕸️", title: "Graph",
    color: "#e879f9", border: "rgba(232,121,249,0.2)",
    prev: "Heap", next: "Trie",
    kyu: "Tree hierarchical tha — ek root, no cycles. Graph = No restrictions. Koi bhi node kisi bhi node se connected. Roads, social networks, internet.",
    memory: `Adjacency List (Sparse graphs ke liye):
A → [B, C]
B → [A, D]
Space: O(V+E) ✅

Adjacency Matrix (Dense graphs):
   A  B  C  D
A [0, 1, 1, 0]
B [1, 0, 0, 1]
Space: O(V²) — 1000 nodes = 10 lakh cells

Types:
- Undirected: A—B (dono direction)
- Directed: A→B (ek direction)
- Weighted: A—5—B (cost hai)
- Cyclic vs Acyclic (DAG)`,
    ops: [
      { op: "Add Edge (List)", time: "O(1)", fast: true, why: "List mein append" },
      { op: "Check Edge (Matrix)", time: "O(1)", fast: true, why: "Direct index access" },
      { op: "Check Edge (List)", time: "O(degree)", fast: false, why: "List traverse" },
      { op: "BFS/DFS (List)", time: "O(V+E)", fast: true, why: "Har node aur edge ek baar" },
      { op: "BFS/DFS (Matrix)", time: "O(V²)", fast: false, why: "Har node pe V checks" },
    ],
    problems: [
      "String prefix search slow",
      "Representation choice critical — List ya Matrix",
    ],
    tip: "Sparse graph (few edges) → Adjacency List. Dense graph (many edges) → Matrix.",
  },
  {
    id: 10, emoji: "🔤", title: "Trie (Prefix Tree)",
    color: "#f43f5e", border: "rgba(244,63,94,0.2)",
    prev: "Graph", next: null,
    kyu: "String prefix search HashMap mein O(n × L) tha. Trie mein prefix path follow karo → O(L) — word count pe depend hi nahi karta.",
    memory: `Words: "cat", "car", "card"

         root
          |
          c
          |
          a
         / \\
        t   r
        *   |
            d
            *

* = word end (isEnd = true)

"car" aur "card" mein "car" prefix ek baar store hua.
Yahi space efficiency hai.

Search "card":
root → c → a → r → d (isEnd=true) ✅ Found!
4 steps = O(L) = O(4)`,
    ops: [
      { op: "Insert", time: "O(L)", fast: true, why: "L = word length, char by char add" },
      { op: "Search", time: "O(L)", fast: true, why: "Path follow karo char by char" },
      { op: "startsWith (prefix)", time: "O(L)", fast: true, why: "Path exist karta hai?" },
      { op: "getAllWithPrefix (DFS)", time: "O(L + output)", fast: true, why: "Prefix tak + DFS" },
    ],
    problems: [
      "Memory heavy — har node mein 26 pointers (English alphabet)",
      "26 × 8 bytes = 208 bytes per node — 10,000 words = ~2MB",
      "Practical fix: HashMap children — only existing chars store karo",
    ],
    tip: "Keywords: 'prefix', 'autocomplete', 'starts with', 'dictionary', 'spell check'.",
  },
];

function ComplexityBadge({ time, fast }) {
  return (
    <span style={{
      padding: "3px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 600,
      fontFamily: "'Fira Code', monospace",
      background: fast ? "rgba(52,211,153,0.12)" : "rgba(251,113,133,0.12)",
      color: fast ? "#34d399" : "#fb7185",
      border: `1px solid ${fast ? "rgba(52,211,153,0.25)" : "rgba(251,113,133,0.25)"}`,
    }}>{time}</span>
  );
}

function DSCard({ ch, isActive, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: isActive ? `${ch.color}10` : "#111827",
      border: `1px solid ${isActive ? ch.color : ch.border}`,
      borderRadius: "16px", padding: "20px 24px", cursor: "pointer",
      transition: "all 0.2s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "28px" }}>{ch.emoji}</span>
        <div>
          <div style={{ fontWeight: 700, color: isActive ? ch.color : "#e2e8f0", fontSize: "16px" }}>
            Ch {ch.id}. {ch.title}
          </div>
          {ch.prev && <div style={{ fontSize: "11px", color: "var(--text-3)" }}>← {ch.prev} ki problem fix</div>}
        </div>
      </div>
    </div>
  );
}

export default function DataStructures() {
  const [active, setActive] = useState(0);
  const ch = chapters[active];

  return (
    <div style={{ display: "flex", maxWidth: "1300px", margin: "0 auto", padding: "32px 24px", gap: "28px", minHeight: "calc(100vh - 64px)" }}>

      {/* Sidebar */}
      <div style={{ width: "280px", flexShrink: 0 }}>
        <div style={{ position: "sticky", top: "88px" }}>
          <div style={{ marginBottom: "16px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#22d3ee", marginBottom: "4px" }}>📦 Data Structures</h2>
            <p style={{ fontSize: "12px", color: "var(--text-3)" }}>10 chapters • Evolution story</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {chapters.map((c, i) => (
              <DSCard key={c.id} ch={c} isActive={i === active} onClick={() => setActive(i)} />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ background: "var(--bg-card)", borderRadius: "20px", padding: "40px", border: `1px solid ${ch.border}`, boxShadow: `0 0 40px ${ch.color}12` }}>

          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
              <span style={{ fontSize: "48px" }}>{ch.emoji}</span>
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-3)", marginBottom: "4px" }}>Chapter {ch.id} of {chapters.length}</div>
                <h1 style={{ fontSize: "36px", fontWeight: 800, color: ch.color }}>{ch.title}</h1>
                {ch.prev && (
                  <div style={{ fontSize: "13px", color: "var(--text-3)", marginTop: "4px" }}>
                    ← {ch.prev} ki problem solve karta hai → {ch.next ? `${ch.next} ki zaroorat` : "End of DS evolution"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Why */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: ch.color, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              ❓ Kyu Use Karte Hain?
            </h2>
            <div style={{ background: "var(--bg-surface)", borderRadius: "12px", padding: "20px", border: "1px solid var(--border)", fontSize: "15px", color: "var(--text-2)", lineHeight: 1.7 }}>
              {ch.kyu}
            </div>
          </section>

          {/* Memory */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: ch.color, marginBottom: "12px" }}>
              🧠 Memory Mein Kaise Store Hota Hai?
            </h2>
            <pre style={{
              background: "var(--bg-base)", borderRadius: "12px", padding: "20px",
              border: `1px solid ${ch.color}20`, fontSize: "13px", color: "var(--text-2)",
              overflowX: "auto", lineHeight: 1.8, whiteSpace: "pre-wrap",
              fontFamily: "'Fira Code', monospace",
            }}>{ch.memory}</pre>

            {/* Visual diagram for array */}
            {ch.diagram && (
              <div style={{ marginTop: "16px", display: "flex", gap: "4px" }}>
                {ch.diagram.map(({ label, val, addr }) => (
                  <div key={label} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "var(--text-3)", marginBottom: "4px" }}>{addr}</div>
                    <div style={{
                      background: `${ch.color}15`, border: `2px solid ${ch.color}40`,
                      borderRadius: "8px", padding: "12px 4px",
                      fontSize: "18px", fontWeight: 700, color: ch.color,
                    }}>{val}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-3)", marginTop: "4px" }}>{label}</div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Operations */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: ch.color, marginBottom: "12px" }}>
              ⚡ Operations aur Complexity
            </h2>
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--bg-surface)" }}>
                    {["Operation", "Time", "Speed", "Kyu?"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ch.ops.map((op, i) => (
                    <tr key={i} style={{ borderTop: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "#0f172a10" }}>
                      <td style={{ padding: "14px 16px", fontFamily: "'Fira Code', monospace", fontSize: "13px", color: "var(--text-1)" }}>{op.op}</td>
                      <td style={{ padding: "14px 16px" }}><ComplexityBadge time={op.time} fast={op.fast} /></td>
                      <td style={{ padding: "14px 16px", fontSize: "18px" }}>{op.fast ? "✅" : "❌"}</td>
                      <td style={{ padding: "14px 16px", fontSize: "13px", color: "var(--text-2)" }}>{op.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Problems */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#fb7185", marginBottom: "12px" }}>
              🚨 Problems (Isliye Agla Aaya)
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {ch.problems.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "rgba(251,113,133,0.06)", borderRadius: "10px", padding: "14px 16px", border: "1px solid rgba(251,113,133,0.12)" }}>
                  <span style={{ color: "#fb7185", fontSize: "16px", flexShrink: 0 }}>⚠️</span>
                  <span style={{ color: "var(--text-2)", fontSize: "14px", lineHeight: 1.6 }}>{p}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tip */}
          <div style={{ background: `${ch.color}08`, borderRadius: "12px", padding: "20px", border: `1px solid ${ch.color}20` }}>
            <span style={{ fontSize: "14px", color: ch.color }}>💡 <strong>Pro tip:</strong> {ch.tip}</span>
          </div>

          {/* Next Chapter */}
          {ch.next && (
            <div style={{ marginTop: "32px", textAlign: "center" }}>
              <button onClick={() => setActive(active + 1)} style={{
                padding: "14px 32px", borderRadius: "12px", cursor: "pointer",
                background: ch.color, color: "#0a0f1e", fontWeight: 700, fontSize: "15px", border: "none",
              }}>
                Next: {ch.next} →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
