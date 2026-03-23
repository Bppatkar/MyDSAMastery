"use client";
import { useState } from "react";

// ─── Data from all 3 images ────────────────────────────────────

// Image 1: Pattern → Real-Life Analogy → Solves
const patternTable = [
  {
    pattern: "Sliding Window", emoji: "🪟", color: "#22d3ee",
    analogy: "\"Peeking through a moving window\"",
    useWhen: "Need to examine a contiguous subset of data",
    solves: ["Longest Substring", "Max Sum Subarray", "Anagrams"],
    keywords: ["substring", "subarray", "window", "continuous", "longest no-repeat"],
  },
  {
    pattern: "Two Pointers", emoji: "👆👆", color: "#38bdf8",
    analogy: "\"2 fingers walking toward each other\"",
    useWhen: "Need to search pairs or manage elements from both ends",
    solves: ["2Sum", "Reverse Vowels", "Sorted Square", "Palindrome Check"],
    keywords: ["palindrome", "sorted + pairs", "target sum", "remove duplicates"],
  },
  {
    pattern: "Fast & Slow Pointers", emoji: "🐇🐢", color: "#818cf8",
    analogy: "\"Tom & Jerry: one fast, one slow\"",
    useWhen: "Need to find cycles or the middle of a structure",
    solves: ["Linked List Cycle", "Happy Number", "Find Duplicate"],
    keywords: ["cycle detection", "middle of linked list", "duplicate number"],
  },
  {
    pattern: "Binary Search", emoji: "🎯", color: "#a78bfa",
    analogy: "\"Guess the number in 7 tries or less\"",
    useWhen: "Need to efficiently search a sorted element range",
    solves: ["Rotated Array", "First/Last Position", "Koko Eating Bananas"],
    keywords: ["sorted array", "kth element", "minimize maximum", "first/last occurrence"],
  },
  {
    pattern: "DFS / BFS", emoji: "🌐", color: "#34d399",
    analogy: "\"DFS: Go deep, BFS: Go wide\"",
    useWhen: "Need to traverse a tree/graph (BFS: level-by-level, DFS: specific path)",
    solves: ["Graph Traversal", "Flood Fill", "Shortest Path"],
    keywords: ["shortest path", "connected components", "islands", "level order"],
  },
  {
    pattern: "Backtracking", emoji: "🔙", color: "#10b981",
    analogy: "\"Trying all outfits before choosing one\"",
    useWhen: "Need to explore all possible options and solutions",
    solves: ["Sudoku", "N-Queens", "Word Search", "Permutations"],
    keywords: ["all combinations", "generate all", "permutations", "subsets"],
  },
  {
    pattern: "Dynamic Programming", emoji: "🔄", color: "#fbbf24",
    analogy: "\"Why re-solve what you've already solved?\"",
    useWhen: "Need to solve complex problems by breaking into overlapping subproblems",
    solves: ["Knapsack", "House Robber", "LIS", "Edit Distance"],
    keywords: ["number of ways", "min/max cost", "can you reach", "longest subsequence"],
  },
  {
    pattern: "Greedy", emoji: "💰", color: "#fb923c",
    analogy: "\"Always pick what seems best right now\"",
    useWhen: "Locally optimal choice leads to global optimum",
    solves: ["Activity Selection", "Jump Game", "Gas Station"],
    keywords: ["minimum operations", "activity selection", "scheduling", "always best"],
  },
  {
    pattern: "Union-Find (DSU)", emoji: "🤝", color: "#f59e0b",
    analogy: "\"Friend circles detection\"",
    useWhen: "Need to group elements and check connectivity",
    solves: ["Number of Provinces", "Kruskal's MST", "Connected Components"],
    keywords: ["connected components", "number of groups", "cycle in undirected", "union"],
  },
  {
    pattern: "Topological Sort", emoji: "📋", color: "#e879f9",
    analogy: "\"Finish A before B\"",
    useWhen: "Need to order tasks with dependencies (DAG)",
    solves: ["Course Schedule", "Task Scheduling", "Build Order"],
    keywords: ["dependencies", "prerequisites", "course schedule", "build order"],
  },
  {
    pattern: "Prefix Sum", emoji: "📊", color: "#f43f5e",
    analogy: "\"Running totals like bank statements\"",
    useWhen: "Need range sum queries in O(1) after O(n) preprocessing",
    solves: ["Range Sum", "Subarray Sum Equal K", "Rainwater Trapping"],
    keywords: ["range sum", "subarray sum equals k", "prefix", "cumulative"],
  },
  {
    pattern: "Monotonic Stack / Queue", emoji: "🥞", color: "#94a3b8",
    analogy: "\"Stacking plates: tallest first\"",
    useWhen: "Need next greater/smaller element efficiently",
    solves: ["Next Greater Element", "Daily Temperatures", "Largest Rectangle"],
    keywords: ["next greater element", "next smaller", "daily temperatures", "monotonic"],
  },
  {
    pattern: "Bit Manipulation", emoji: "💡", color: "#67e8f9",
    analogy: "\"Flip switches to solve puzzles\"",
    useWhen: "Need XOR tricks or bit-level operations",
    solves: ["Single Number", "Count Bits", "Subsets", "XOR Problems"],
    keywords: ["XOR", "single number", "power of 2", "count bits"],
  },
  {
    pattern: "Trie (Prefix Tree)", emoji: "🔤", color: "#4ade80",
    analogy: "\"Autocomplete dictionary\"",
    useWhen: "Need fast prefix matching or word search",
    solves: ["Word Search", "Autocomplete", "Starts With"],
    keywords: ["prefix", "autocomplete", "starts with", "dictionary", "word search"],
  },
  {
    pattern: "Heap / Priority Queue", emoji: "🏔️", color: "#fb7185",
    analogy: "\"Serve most urgent first\"",
    useWhen: "Need to handle dynamic priority-based data, Top K elements",
    solves: ["Top K Elements", "Merge K Lists", "Median Stream"],
    keywords: ["k largest", "k smallest", "top k", "median", "merge k lists"],
  },
  {
    pattern: "Cyclic Sort", emoji: "🔁", color: "#c084fc",
    analogy: "\"Every number knows its home\"",
    useWhen: "Need to sort numbers when they're all in a known range",
    solves: ["Find Missing Number", "Find Duplicate", "First K Missing"],
    keywords: ["missing number", "numbers in range 1-n", "duplicate in array"],
  },
  {
    pattern: "Merge Intervals", emoji: "📏", color: "#6ee7b7",
    analogy: "\"Merging overlapping calendar events\"",
    useWhen: "Need to work with overlapping intervals",
    solves: ["Merge Overlapping Intervals", "Meeting Rooms", "Insert Interval"],
    keywords: ["overlapping intervals", "merge intervals", "meeting rooms", "insert interval"],
  },
  {
    pattern: "Segment Tree / Fenwick", emoji: "🌲", color: "#7dd3fc",
    analogy: "\"Range Sum/Min/Max — fast updates\"",
    useWhen: "Need range queries with updates in O(log n)",
    solves: ["Range Sum", "Range Min/Max", "Updates on Array"],
    keywords: ["range query with updates", "segment tree", "fenwick tree", "BIT"],
  },
];

// Image 2: Array & String Patterns
const arrayStringPatterns = [
  {
    title: "Two Pointer", color: "#22d3ee", border: "#22d3ee40", bg: "#22d3ee08",
    subtitle: "Left & Right Pointers",
    examples: ["Two Sum (sorted)", "Valid Palindrome"],
    tip: "Sorted array pe dono ends se aao — O(n)",
  },
  {
    title: "Sliding Window", color: "#a78bfa", border: "#a78bfa40", bg: "#a78bfa08",
    subtitle: "Variable Subarrays",
    examples: ["Longest Substring w/o Repeating", "Max Sum Subarray of Size K"],
    tip: "Window expand karo, constraint toote toh shrink karo",
  },
  {
    title: "Prefix Sum", color: "#34d399", border: "#34d39940", bg: "#34d39908",
    subtitle: "Cumulative Sums",
    examples: ["Subarray Sum Equals K", "Range Sum Query"],
    tip: "prefixSum[r] - prefixSum[l-1] = range sum O(1)",
  },
  {
    title: "Hashing", color: "#fbbf24", border: "#fbbf2440", bg: "#fbbf2408",
    subtitle: "HashMap / HashSet",
    examples: ["Two Sum", "Group Anagrams"],
    tip: "O(1) lookup — complement ya frequency store karo",
  },
  {
    title: "Kadane's Algorithm", color: "#fb923c", border: "#fb923c40", bg: "#fb923c08",
    subtitle: "Max Subarray Sum",
    examples: ["Maximum Subarray", "Max Circular Subarray"],
    tip: "dp[i] = max(nums[i], dp[i-1] + nums[i]) — O(n)",
  },
  {
    title: "Fast & Slow Pointer", color: "#818cf8", border: "#81 8cf840", bg: "#818cf808",
    subtitle: "Cycle Detection",
    examples: ["Find Duplicate Number", "Happy Number"],
    tip: "Cycle mein fast aur slow milte hain — Floyd's algorithm",
  },
  {
    title: "Binary Search", color: "#38bdf8", border: "#38bdf840", bg: "#38bdf808",
    subtitle: "Search on Answers",
    examples: ["Koko Eating Bananas", "Capacity Ship Packages"],
    tip: "'Minimize max' type? → Binary search on answer space",
  },
  {
    title: "Sorting + Greedy", color: "#f59e0b", border: "#f59e0b40", bg: "#f59e0b08",
    subtitle: "Sort & Choose Best",
    examples: ["Merge Intervals", "Meeting Rooms"],
    tip: "Sort first, phir greedy choice karo",
  },
  {
    title: "Frequency Counter", color: "#4ade80", border: "#4ade8040", bg: "#4ade8008",
    subtitle: "Count Characters",
    examples: ["Valid Anagram", "Find Anagrams in String"],
    tip: "Char frequency map — anagram = same frequency",
  },
  {
    title: "Matrix Traversal", color: "#e879f9", border: "#e879f940", bg: "#e879f908",
    subtitle: "2D Array Tricks",
    examples: ["Spiral Matrix", "Set Matrix Zeroes"],
    tip: "dx/dy arrays se 4-dir ya 8-dir movement",
  },
  {
    title: "Expand Around Center", color: "#fb7185", border: "#fb718540", bg: "#fb718508",
    subtitle: "Find Palindromes",
    examples: ["Longest Palindromic Substring", "Count Palindromic Substrings"],
    tip: "Har index se odd aur even expand karo — O(n²)",
  },
  {
    title: "Stack", color: "#94a3b8", border: "#94a3b840", bg: "#94a3b808",
    subtitle: "String Validation",
    examples: ["Valid Parentheses", "Decode String"],
    tip: "LIFO — matching pairs, nested structures, undo",
  },
  {
    title: "Suffix Array", color: "#67e8f9", border: "#67e8f940", bg: "#67e8f908",
    subtitle: "Suffixes of String",
    examples: ["Longest Repeating Substring", "Search Suggestions"],
    tip: "Complex string problems — suffix sorting",
  },
  {
    title: "Diagonal Traversal", color: "#c084fc", border: "#c084fc40", bg: "#c084fc08",
    subtitle: "Upper / Lower Diagonal",
    examples: ["Signal Matrix", "Anti-Diagonal Sum"],
    tip: "Diagonal: i+j = constant (anti), i-j = constant (main)",
  },
  {
    title: "Remove Around Center", color: "#6ee7b7", border: "#6ee7b740", bg: "#6ee7b708",
    subtitle: "String Duplicates",
    examples: ["Valid Parentheses variant", "Decode String variant"],
    tip: "Stack-based removal from center outward",
  },
  {
    title: "Trie", color: "#f43f5e", border: "#f43f5e40", bg: "#f43f5e08",
    subtitle: "Prefix Tree Build",
    examples: ["Word Search III", "Autocomplete System"],
    tip: "char by char insert/search — O(L) per operation",
  },
];

// Image 3: Top DSA Patterns for Interview with "Use When"
const interviewPatterns = [
  {
    title: "SLIDING WINDOW", color: "#3b82f6", emoji: "🪟",
    example: "Find Longest Substring Without Repeating Characters",
    useWhen: "Need to examine a contiguous subset of data",
    detail: "Right badhao → constraint toote toh left badhao → O(n)",
  },
  {
    title: "TWO POINTERS", color: "#22c55e", emoji: "👆👆",
    example: "Pair With Target Sum",
    useWhen: "Need to search pairs or manage elements from both ends",
    detail: "Sorted array — sum zyada? right--, sum chhota? left++",
  },
  {
    title: "FAST & SLOW POINTERS", color: "#f97316", emoji: "🐇🐢",
    example: "Detect Cycle in Linked List",
    useWhen: "Need to find cycles or the middle of a structure",
    detail: "Slow = 1 step, Fast = 2 steps. Cycle mein milte hain.",
  },
  {
    title: "CYCLIC SORT", color: "#eab308", emoji: "🔁",
    example: "Find Missing Number",
    useWhen: "Need to sort numbers when they're all in a known range [1..n]",
    detail: "nums[i] ko index nums[i]-1 pe place karo — O(n) in-place",
  },
  {
    title: "IN-PLACE REVERSAL", color: "#8b5cf6", emoji: "↩️",
    example: "Reverse Linked List / Sublist",
    useWhen: "Need to reverse elements of a structure in place",
    detail: "prev, curr, next pointers use karo — O(n) O(1) space",
  },
  {
    title: "MERGE INTERVALS", color: "#6366f1", emoji: "📏",
    example: "Merge Overlapping Intervals",
    useWhen: "Need to work with overlapping intervals",
    detail: "Sort by start, then check overlap with last merged",
  },
  {
    title: "TREE BFS", color: "#0ea5e9", emoji: "🌊",
    example: "Binary Tree Level Order Traversal",
    useWhen: "Need to traverse a tree level by level",
    detail: "Queue use karo — har level mein queue.length nodes",
  },
  {
    title: "TREE DFS", color: "#10b981", emoji: "🌿",
    example: "Path Sum in Binary Tree",
    useWhen: "Need to traverse a tree along a specific path",
    detail: "Recursion — preorder/inorder/postorder as needed",
  },
  {
    title: "BINARY SEARCH", color: "#f43f5e", emoji: "🎯",
    example: "Search in Rotated Sorted Array",
    useWhen: "Need to efficiently search a sorted element range",
    detail: "One half hamesha sorted — target us half mein hai?",
  },
  {
    title: "BACKTRACKING", color: "#a855f7", emoji: "🔙",
    example: "Solve N-Queens Problem",
    useWhen: "Need to explore all possible options and solutions",
    detail: "Choose → Explore → Unchoose (backtrack). Pruning = key.",
  },
  {
    title: "HEAP / PRIORITY QUEUE", color: "#f59e0b", emoji: "🏔️",
    example: "Find Kth Largest Element",
    useWhen: "Need to handle dynamic priority-based data",
    detail: "Min-heap of size K → heap[0] = Kth largest. O(n log k)",
  },
  {
    title: "TOP K ELEMENTS", color: "#ec4899", emoji: "🔝",
    example: "Find Top K Frequent Numbers",
    useWhen: "Need to process the top K elements of a dataset",
    detail: "Min-heap of size K ya QuickSelect O(n) average",
  },
  {
    title: "K-WAY MERGE", color: "#06b6d4", emoji: "🔀",
    example: "Merge K Sorted Lists",
    useWhen: "Need to merge multiple sorted lists or arrays",
    detail: "Min-heap mein har list ka head daalo — O(n log k)",
  },
  {
    title: "DYNAMIC PROGRAMMING", color: "#84cc16", emoji: "🔄",
    example: "Longest Palindromic Subsequence",
    useWhen: "Need to solve complex problems by breaking into subproblems",
    detail: "Overlapping subproblems? DP. Greedy choice? Greedy.",
  },
];

// ─── Sub-page: Pattern Table (Image 1) ───────────────────────
function PatternTableView({ searchQuery }) {
  const filtered = patternTable.filter(p =>
    p.pattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
    p.solves.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#e2e8f0", marginBottom: "6px" }}>
          🎯 Pattern → Real-Life Analogy → Kya Solve Karta Hai
        </h2>
        <p style={{ fontSize: "13px", color: "#64748b" }}>
          {filtered.length} patterns • Analogy se pattern yaad karo — interview mein click karega
        </p>
      </div>

      <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #1e293b" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 1fr 1fr", background: "#0f172a", padding: "14px 20px", borderBottom: "1px solid #1e293b" }}>
          {["🎯 Pattern", "💡 Real-Life Analogy", "⏰ Kab Use Karein", "✅ Kya Solve Karta Hai"].map(h => (
            <div key={h} style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((p, i) => (
          <div key={p.pattern} style={{
            display: "grid", gridTemplateColumns: "220px 1fr 1fr 1fr",
            padding: "16px 20px", alignItems: "center",
            background: i % 2 === 0 ? "#111827" : "#0f172a",
            borderBottom: "1px solid #1e293b",
            transition: "background 0.15s",
          }}>
            {/* Pattern name */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>{p.emoji}</span>
              <span style={{ fontSize: "14px", fontWeight: 700, color: p.color }}>{p.pattern}</span>
            </div>

            {/* Analogy */}
            <div style={{ fontSize: "13px", color: "#94a3b8", fontStyle: "italic", paddingRight: "16px" }}>
              {p.analogy}
            </div>

            {/* Use When */}
            <div style={{ fontSize: "12px", color: "#64748b", paddingRight: "16px", lineHeight: 1.5 }}>
              {p.useWhen}
            </div>

            {/* Solves */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {p.solves.map(s => (
                <span key={s} style={{
                  padding: "3px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 500,
                  background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25`,
                }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Keywords reference */}
      <div style={{ marginTop: "24px", background: "#0f172a", borderRadius: "16px", padding: "24px", border: "1px solid #1e293b" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#e2e8f0", marginBottom: "20px" }}>
          🔑 Problem mein keyword dikhe → Pattern choose karo
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          {filtered.map(p => (
            <div key={p.pattern} style={{ background: "#111827", borderRadius: "10px", padding: "14px", border: `1px solid ${p.color}20` }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: p.color, marginBottom: "8px" }}>
                {p.emoji} {p.pattern}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {p.keywords.map(k => (
                  <span key={k} style={{ padding: "2px 8px", borderRadius: "5px", fontSize: "10px", background: "#0f172a", color: "#94a3b8", border: "1px solid #334155", fontStyle: "italic" }}>
                    "{k}"
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-page: Array & String Grid (Image 2) ─────────────────
function ArrayStringView({ searchQuery }) {
  const filtered = arrayStringPatterns.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.examples.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#e2e8f0", marginBottom: "6px" }}>
          📝 Top 16 Array & String Patterns
        </h2>
        <p style={{ fontSize: "13px", color: "#64748b" }}>
          Array aur String problems ke liye most important patterns — har ek pe classic examples
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
        {filtered.map(p => (
          <div key={p.title} style={{
            background: p.bg, borderRadius: "14px", padding: "20px",
            border: `2px solid ${p.border}`,
            transition: "transform 0.15s, box-shadow 0.15s",
            cursor: "default",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${p.border}`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>

            <div style={{ fontSize: "16px", fontWeight: 800, color: p.color, marginBottom: "4px" }}>{p.title}</div>
            <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "14px", fontStyle: "italic" }}>{p.subtitle}</div>

            <div style={{ marginBottom: "12px" }}>
              {p.examples.map(e => (
                <div key={e} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ color: p.color, fontSize: "12px", flexShrink: 0, marginTop: "1px" }}>●</span>
                  <span style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.4 }}>{e}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#0f172a", borderRadius: "8px", padding: "10px 12px", borderLeft: `3px solid ${p.color}` }}>
              <span style={{ fontSize: "11px", color: "#64748b" }}>💡 </span>
              <span style={{ fontSize: "11px", color: "#94a3b8" }}>{p.tip}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sub-page: Interview Patterns (Image 3) ──────────────────
function InterviewView({ searchQuery }) {
  const filtered = interviewPatterns.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.example.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.useWhen.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#e2e8f0", marginBottom: "6px" }}>
          🚀 Top DSA Patterns for Interview
        </h2>
        <p style={{ fontSize: "13px", color: "#64748b" }}>
          {filtered.length} patterns — "Use When" criteria ke saath. Interview mein yeh sochkar pattern choose karo.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
        {filtered.map(p => (
          <div key={p.title} style={{
            background: "#111827", borderRadius: "16px", padding: "24px",
            border: `1px solid ${p.color}30`,
            boxShadow: `0 0 20px ${p.color}08`,
            transition: "transform 0.15s, border-color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = `${p.color}60`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = `${p.color}30`; }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "24px" }}>{p.emoji}</span>
              <span style={{ fontSize: "15px", fontWeight: 800, color: p.color, letterSpacing: "0.5px" }}>{p.title}</span>
            </div>

            {/* Example */}
            <div style={{ background: `${p.color}10`, borderRadius: "8px", padding: "12px", marginBottom: "14px", border: `1px solid ${p.color}20` }}>
              <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Example</div>
              <div style={{ fontSize: "13px", color: "#e2e8f0", fontWeight: 600 }}>{p.example}</div>
            </div>

            {/* Use When */}
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                ⏰ Kab Use Karein
              </div>
              <div style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.6, paddingLeft: "8px", borderLeft: `2px solid ${p.color}50` }}>
                {p.useWhen}
              </div>
            </div>

            {/* How */}
            <div style={{ background: "#0f172a", borderRadius: "8px", padding: "10px 12px" }}>
              <span style={{ fontSize: "11px", color: p.color }}>🧠 </span>
              <span style={{ fontSize: "11px", color: "#64748b" }}>{p.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Quick Reference: Complexity Table ───────────────────────
function QuickRefView() {
  const complexityData = [
    { pattern: "Array Access", time: "O(1)", space: "O(1)", color: "#34d399" },
    { pattern: "Hash Lookup", time: "O(1) avg", space: "O(n)", color: "#34d399" },
    { pattern: "Binary Search", time: "O(log n)", space: "O(1)", color: "#34d399" },
    { pattern: "Two Pointers", time: "O(n)", space: "O(1)", color: "#22d3ee" },
    { pattern: "Sliding Window", time: "O(n)", space: "O(k)", color: "#22d3ee" },
    { pattern: "Linear Search", time: "O(n)", space: "O(1)", color: "#22d3ee" },
    { pattern: "Prefix Sum Build", time: "O(n)", space: "O(n)", color: "#22d3ee" },
    { pattern: "Merge Sort", time: "O(n log n)", space: "O(n)", color: "#fbbf24" },
    { pattern: "Quick Sort avg", time: "O(n log n)", space: "O(log n)", color: "#fbbf24" },
    { pattern: "Heap Sort", time: "O(n log n)", space: "O(1)", color: "#fbbf24" },
    { pattern: "Heap Insert/Delete", time: "O(log n)", space: "O(1)", color: "#fbbf24" },
    { pattern: "BFS / DFS", time: "O(V+E)", space: "O(V)", color: "#a78bfa" },
    { pattern: "Dijkstra", time: "O((V+E) log V)", space: "O(V)", color: "#a78bfa" },
    { pattern: "Trie Operations", time: "O(L)", space: "O(NL)", color: "#a78bfa" },
    { pattern: "DP (1D)", time: "O(n)", space: "O(n)", color: "#fb923c" },
    { pattern: "DP (2D Grid)", time: "O(mn)", space: "O(mn)", color: "#fb923c" },
    { pattern: "0/1 Knapsack", time: "O(n×W)", space: "O(W)", color: "#fb923c" },
    { pattern: "Backtracking", time: "O(2^n)", space: "O(n)", color: "#fb7185" },
    { pattern: "Permutations", time: "O(n!)", space: "O(n)", color: "#fb7185" },
    { pattern: "Union-Find", time: "O(α(n))≈O(1)", space: "O(n)", color: "#34d399" },
    { pattern: "Bubble/Select Sort", time: "O(n²)", space: "O(1)", color: "#fb7185" },
    { pattern: "Insertion Sort best", time: "O(n)", space: "O(1)", color: "#34d399" },
  ];

  const constraints = [
    { n: "n ≤ 20", ok: "O(2^n), O(n!)", patterns: "Backtracking, Brute force, Permutations", color: "#34d399" },
    { n: "n ≤ 300", ok: "O(n³)", patterns: "Floyd-Warshall, 3D DP", color: "#22d3ee" },
    { n: "n ≤ 10,000", ok: "O(n²)", patterns: "Bubble/Selection Sort, Nested loops DP", color: "#fbbf24" },
    { n: "n ≤ 10⁶", ok: "O(n log n)", patterns: "Merge Sort, Heap Sort, Binary Search loop", color: "#fb923c" },
    { n: "n ≤ 10⁷", ok: "O(n)", patterns: "Two Pointers, Sliding Window, Hash, Linear", color: "#a78bfa" },
    { n: "n ≥ 10⁷", ok: "O(log n), O(1)", patterns: "Binary Search, Math Formula, Bit Tricks", color: "#fb7185" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Constraint → Pattern mapping */}
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#e2e8f0", marginBottom: "6px" }}>
          📏 n ki Value → Kaunsa Pattern?
        </h2>
        <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>
          Constraints dekho → max allowed complexity → pattern decide karo
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {constraints.map(c => (
            <div key={c.n} style={{
              display: "grid", gridTemplateColumns: "140px 160px 1fr",
              alignItems: "center", gap: "16px",
              background: "#111827", borderRadius: "12px", padding: "16px 20px",
              border: `1px solid ${c.color}25`,
            }}>
              <code style={{ fontSize: "14px", fontWeight: 800, color: c.color, fontFamily: "'Fira Code', monospace" }}>{c.n}</code>
              <code style={{ fontSize: "13px", color: "#fbbf24", fontFamily: "'Fira Code', monospace", background: "#fbbf2410", padding: "4px 10px", borderRadius: "6px" }}>{c.ok}</code>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>{c.patterns}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Complexity table */}
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#e2e8f0", marginBottom: "20px" }}>
          ⚡ Pattern Complexity Quick Reference
        </h2>
        <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #1e293b" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 140px", background: "#0f172a", padding: "12px 20px", borderBottom: "1px solid #1e293b" }}>
            {["Pattern / Operation", "Time", "Space"].map(h => (
              <div key={h} style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</div>
            ))}
          </div>
          {complexityData.map((row, i) => (
            <div key={row.pattern} style={{
              display: "grid", gridTemplateColumns: "1fr 160px 140px",
              padding: "12px 20px", alignItems: "center",
              background: i % 2 === 0 ? "#111827" : "#0f172a",
              borderBottom: "1px solid #0f172a",
            }}>
              <span style={{ fontSize: "13px", color: "#e2e8f0" }}>{row.pattern}</span>
              <code style={{ fontSize: "12px", color: row.color, fontFamily: "'Fira Code', monospace", background: `${row.color}10`, padding: "3px 10px", borderRadius: "6px", width: "fit-content" }}>{row.time}</code>
              <code style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "'Fira Code', monospace" }}>{row.space}</code>
            </div>
          ))}
        </div>
      </div>

      {/* Interview day checklist */}
      <div style={{ background: "#0f172a", borderRadius: "16px", padding: "28px", border: "1px solid #1e293b" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#e2e8f0", marginBottom: "20px" }}>
          📋 Interview Day — 60-Second Pattern Recognition
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          {[
            { q: "Output = List of lists?", a: "→ Backtracking", color: "#fb7185" },
            { q: "Single max/min/count?", a: "→ DP ya Greedy", color: "#fbbf24" },
            { q: "Sorted + pairs?", a: "→ Two Pointers", color: "#22d3ee" },
            { q: "Substring/Subarray?", a: "→ Sliding Window", color: "#a78bfa" },
            { q: "Sorted search?", a: "→ Binary Search", color: "#34d399" },
            { q: "Frequency/Anagram?", a: "→ HashMap", color: "#fb923c" },
            { q: "Top K elements?", a: "→ Heap (Min of size K)", color: "#818cf8" },
            { q: "Connected/Groups?", a: "→ Union-Find ya DFS", color: "#4ade80" },
            { q: "Prefix 'autocomplete'?", a: "→ Trie", color: "#f43f5e" },
            { q: "Cycle in LL?", a: "→ Fast & Slow Pointers", color: "#e879f9" },
            { q: "Overlapping intervals?", a: "→ Sort by start + merge", color: "#6ee7b7" },
            { q: "n ≤ 20 + 'all'?", a: "→ Backtracking brute force ok", color: "#94a3b8" },
          ].map(({ q, a, color }) => (
            <div key={q} style={{ background: "#111827", borderRadius: "10px", padding: "14px 16px", border: `1px solid ${color}20`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>{q}</span>
              <span style={{ fontSize: "13px", fontWeight: 700, color, flexShrink: 0 }}>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Cheat Sheet Page ────────────────────────────────────
const tabs = [
  { id: "pattern-table", label: "🎯 Pattern Recognition", desc: "Analogy + Solves" },
  { id: "array-string", label: "📝 Array & String", desc: "16 Patterns" },
  { id: "interview", label: "🚀 Interview Patterns", desc: "Use When" },
  { id: "quick-ref", label: "⚡ Quick Reference", desc: "Complexity" },
];

export default function CheatSheet() {
  const [activeTab, setActiveTab] = useState("pattern-table");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "32px 24px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ display: "inline-block", padding: "6px 20px", borderRadius: "999px", background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)", marginBottom: "16px" }}>
          <span style={{ fontSize: "13px", color: "#fb923c", fontWeight: 500 }}>📋 Interview-ready reference</span>
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, marginBottom: "12px" }}>
          <span style={{ background: "linear-gradient(135deg, #fbbf24, #fb923c, #f43f5e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            DSA Cheat Sheet
          </span>
        </h1>
        <p style={{ color: "#64748b", fontSize: "15px" }}>
          Pattern Analogy • Array & String Patterns • Interview "Use When" Guide • Complexity Table
        </p>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "28px", maxWidth: "500px", margin: "0 auto 28px" }}>
        <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b", fontSize: "16px" }}>🔍</div>
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Pattern, keyword, ya problem name likho..."
          style={{
            width: "100%", padding: "12px 16px 12px 44px",
            borderRadius: "12px", background: "#111827",
            color: "#e2e8f0", border: "1px solid #334155",
            fontSize: "14px", outline: "none",
          }}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "16px" }}>✕</button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap", justifyContent: "center" }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "10px 22px", borderRadius: "10px", cursor: "pointer",
              background: isActive ? "#fbbf2415" : "transparent",
              border: `1px solid ${isActive ? "#fbbf24" : "#334155"}`,
              color: isActive ? "#fbbf24" : "#64748b",
              fontSize: "13px", fontWeight: isActive ? 700 : 400,
              transition: "all 0.15s",
            }}>
              {tab.label}
              <span style={{ fontSize: "10px", color: isActive ? "#f59e0b" : "#374151", display: "block", marginTop: "1px" }}>{tab.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {activeTab === "pattern-table" && <PatternTableView searchQuery={searchQuery} />}
        {activeTab === "array-string" && <ArrayStringView searchQuery={searchQuery} />}
        {activeTab === "interview" && <InterviewView searchQuery={searchQuery} />}
        {activeTab === "quick-ref" && <QuickRefView />}
      </div>
    </div>
  );
}
