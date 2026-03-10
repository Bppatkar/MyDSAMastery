'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, Circle, ExternalLink, ChevronDown, ChevronUp,
  Zap, Trophy, Target, BookOpen, Brain, Star, Clock, TrendingUp,
} from 'lucide-react';

// ═══════════════════════════════════════════════
// DATA — 7 Day Plan + MIMP Questions
// ═══════════════════════════════════════════════

const WEEK_PLAN = [
  {
    day: 1,
    title: 'Arrays, Two Pointers & Sliding Window',
    color: '#10b981',
    emoji: '🪟',
    focus: 'Linear data structure pe mastery — sabse zyada poocha jaata hai',
    patterns: ['Sliding Window', 'Two Pointers', 'Prefix Sum'],
    theory: [
      'Sliding window — fixed vs variable window ka difference',
      'Two pointers — same direction vs opposite direction',
      'Prefix sum — O(1) range queries ke liye',
      'When to use HashMap saath mein',
    ],
    questions: [
      { id: 1, num: 1,    title: 'Two Sum',                              diff: 'Easy',   freq: 10, tag: 'HashMap',        url: 'https://leetcode.com/problems/two-sum/',                              companies: ['Google','Amazon','Meta'] },
      { id: 2, num: 121,  title: 'Best Time to Buy and Sell Stock',      diff: 'Easy',   freq: 10, tag: 'Sliding Window', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',      companies: ['Amazon','Microsoft'] },
      { id: 3, num: 3,    title: 'Longest Substring Without Repeating',  diff: 'Medium', freq: 10, tag: 'Sliding Window', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', companies: ['Amazon','Google','Meta'] },
      { id: 4, num: 11,   title: 'Container With Most Water',            diff: 'Medium', freq: 9,  tag: 'Two Pointers',  url: 'https://leetcode.com/problems/container-with-most-water/',            companies: ['Amazon','Google'] },
      { id: 5, num: 15,   title: 'Three Sum',                            diff: 'Medium', freq: 9,  tag: 'Two Pointers',  url: 'https://leetcode.com/problems/3sum/',                                 companies: ['Amazon','Microsoft','Adobe'] },
      { id: 6, num: 76,   title: 'Minimum Window Substring',             diff: 'Hard',   freq: 9,  tag: 'Sliding Window', url: 'https://leetcode.com/problems/minimum-window-substring/',            companies: ['Meta','Google'] },
      { id: 7, num: 53,   title: 'Maximum Subarray (Kadane)',            diff: 'Medium', freq: 10, tag: 'Kadane\'s',      url: 'https://leetcode.com/problems/maximum-subarray/',                     companies: ['Amazon','Microsoft','Cisco'] },
      { id: 8, num: 238,  title: 'Product of Array Except Self',         diff: 'Medium', freq: 9,  tag: 'Prefix Sum',    url: 'https://leetcode.com/problems/product-of-array-except-self/',        companies: ['Amazon','Microsoft','Apple'] },
    ],
  },
  {
    day: 2,
    title: 'Binary Search & Linked Lists',
    color: '#3b82f6',
    emoji: '🔍',
    focus: 'Sorted array → Binary Search. Pointer tricks → Linked List',
    patterns: ['Binary Search', 'Fast & Slow Pointers'],
    theory: [
      'Binary search — lo/hi/mid pattern, off-by-one errors',
      'Search on answer — "minimize maximum" type problems',
      'Fast/Slow pointer — cycle detection, middle node',
      'Dummy node trick — edge case simplification',
    ],
    questions: [
      { id: 9,  num: 704, title: 'Binary Search',                    diff: 'Easy',   freq: 8,  tag: 'Binary Search',     url: 'https://leetcode.com/problems/binary-search/',                      companies: ['Microsoft','Amazon'] },
      { id: 10, num: 33,  title: 'Search in Rotated Sorted Array',   diff: 'Medium', freq: 10, tag: 'Binary Search',     url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',     companies: ['Amazon','Google','Meta'] },
      { id: 11, num: 153, title: 'Find Minimum in Rotated Array',    diff: 'Medium', freq: 9,  tag: 'Binary Search',     url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', companies: ['Microsoft','Adobe'] },
      { id: 12, num: 141, title: 'Linked List Cycle',                diff: 'Easy',   freq: 9,  tag: 'Fast/Slow',         url: 'https://leetcode.com/problems/linked-list-cycle/',                  companies: ['Amazon','Microsoft'] },
      { id: 13, num: 206, title: 'Reverse Linked List',              diff: 'Easy',   freq: 10, tag: 'Linked List',       url: 'https://leetcode.com/problems/reverse-linked-list/',                companies: ['Amazon','Google','Adobe'] },
      { id: 14, num: 21,  title: 'Merge Two Sorted Lists',           diff: 'Easy',   freq: 9,  tag: 'Linked List',       url: 'https://leetcode.com/problems/merge-two-sorted-lists/',             companies: ['Amazon','Microsoft'] },
      { id: 15, num: 19,  title: 'Remove Nth Node From End',         diff: 'Medium', freq: 8,  tag: 'Two Pointers',      url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',  companies: ['Amazon','Google'] },
      { id: 16, num: 23,  title: 'Merge K Sorted Lists',             diff: 'Hard',   freq: 9,  tag: 'Heap',              url: 'https://leetcode.com/problems/merge-k-sorted-lists/',               companies: ['Amazon','Google','Meta'] },
    ],
  },
  {
    day: 3,
    title: 'Trees — DFS & BFS',
    color: '#8b5cf6',
    emoji: '🌳',
    focus: 'Tree problems — har interview mein aata hai. DFS + BFS dono seekho',
    patterns: ['DFS', 'BFS'],
    theory: [
      'DFS — preorder/inorder/postorder recursion pattern',
      'BFS — level-order using queue',
      'BST property — left < root < right',
      'LCA — Lowest Common Ancestor trick',
    ],
    questions: [
      { id: 17, num: 104, title: 'Maximum Depth of Binary Tree',         diff: 'Easy',   freq: 9,  tag: 'DFS',    url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',         companies: ['Amazon','Google'] },
      { id: 18, num: 226, title: 'Invert Binary Tree',                   diff: 'Easy',   freq: 8,  tag: 'DFS',    url: 'https://leetcode.com/problems/invert-binary-tree/',                   companies: ['Google','Apple'] },
      { id: 19, num: 102, title: 'Binary Tree Level Order Traversal',    diff: 'Medium', freq: 10, tag: 'BFS',    url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',    companies: ['Amazon','Microsoft','Google'] },
      { id: 20, num: 98,  title: 'Validate Binary Search Tree',          diff: 'Medium', freq: 9,  tag: 'DFS',    url: 'https://leetcode.com/problems/validate-binary-search-tree/',          companies: ['Amazon','Google','Meta'] },
      { id: 21, num: 235, title: 'LCA of Binary Search Tree',            diff: 'Medium', freq: 9,  tag: 'DFS',    url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', companies: ['Amazon','Microsoft'] },
      { id: 22, num: 124, title: 'Binary Tree Maximum Path Sum',         diff: 'Hard',   freq: 9,  tag: 'DFS',    url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',         companies: ['Amazon','Meta'] },
      { id: 23, num: 297, title: 'Serialize and Deserialize Binary Tree',diff: 'Hard',   freq: 8,  tag: 'BFS/DFS',url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', companies: ['Amazon','Google','Meta'] },
      { id: 24, num: 543, title: 'Diameter of Binary Tree',              diff: 'Easy',   freq: 8,  tag: 'DFS',    url: 'https://leetcode.com/problems/diameter-of-binary-tree/',              companies: ['Amazon','Google'] },
    ],
  },
  {
    day: 4,
    title: 'Graphs — BFS, DFS, Topo Sort',
    color: '#f59e0b',
    emoji: '⬡',
    focus: 'Graph problems — connected components, shortest path, dependencies',
    patterns: ['BFS', 'DFS', 'Topological Sort', 'Union-Find'],
    theory: [
      'Adjacency list vs matrix — kab kaunsa use karein',
      'BFS → shortest path in unweighted graph',
      'DFS → cycle detection, connected components',
      'Topological sort — Kahn\'s BFS algorithm',
    ],
    questions: [
      { id: 25, num: 200, title: 'Number of Islands',                diff: 'Medium', freq: 10, tag: 'DFS/BFS',    url: 'https://leetcode.com/problems/number-of-islands/',                companies: ['Amazon','Google','Microsoft'] },
      { id: 26, num: 207, title: 'Course Schedule',                  diff: 'Medium', freq: 10, tag: 'Topo Sort',  url: 'https://leetcode.com/problems/course-schedule/',                  companies: ['Amazon','Google'] },
      { id: 27, num: 133, title: 'Clone Graph',                      diff: 'Medium', freq: 8,  tag: 'BFS/DFS',   url: 'https://leetcode.com/problems/clone-graph/',                      companies: ['Amazon','Meta'] },
      { id: 28, num: 994, title: 'Rotting Oranges',                  diff: 'Medium', freq: 9,  tag: 'BFS',       url: 'https://leetcode.com/problems/rotting-oranges/',                  companies: ['Amazon','Google'] },
      { id: 29, num: 417, title: 'Pacific Atlantic Water Flow',      diff: 'Medium', freq: 8,  tag: 'DFS',       url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',      companies: ['Google','Amazon'] },
      { id: 30, num: 127, title: 'Word Ladder',                      diff: 'Hard',   freq: 9,  tag: 'BFS',       url: 'https://leetcode.com/problems/word-ladder/',                      companies: ['Amazon','Microsoft'] },
      { id: 31, num: 684, title: 'Redundant Connection',             diff: 'Medium', freq: 8,  tag: 'Union-Find',url: 'https://leetcode.com/problems/redundant-connection/',             companies: ['Amazon','Google'] },
      { id: 32, num: 210, title: 'Course Schedule II',               diff: 'Medium', freq: 9,  tag: 'Topo Sort', url: 'https://leetcode.com/problems/course-schedule-ii/',               companies: ['Google','Meta'] },
    ],
  },
  {
    day: 5,
    title: 'Dynamic Programming',
    color: '#ef4444',
    emoji: '🧩',
    focus: 'DP — sabse tricky pattern. 1D se 2D tak, overlapping subproblems',
    patterns: ['Dynamic Programming'],
    theory: [
      'DP ki pehchaan — overlapping subproblems + optimal substructure',
      'Top-down (memoization) vs Bottom-up (tabulation)',
      '1D DP — Fibonacci, House Robber pattern',
      '2D DP — Grid paths, Edit Distance, LCS',
    ],
    questions: [
      { id: 33, num: 70,  title: 'Climbing Stairs',                  diff: 'Easy',   freq: 9,  tag: '1D DP',  url: 'https://leetcode.com/problems/climbing-stairs/',                  companies: ['Amazon','Microsoft'] },
      { id: 34, num: 198, title: 'House Robber',                     diff: 'Medium', freq: 9,  tag: '1D DP',  url: 'https://leetcode.com/problems/house-robber/',                     companies: ['Amazon','Google'] },
      { id: 35, num: 322, title: 'Coin Change',                      diff: 'Medium', freq: 10, tag: '1D DP',  url: 'https://leetcode.com/problems/coin-change/',                      companies: ['Amazon','Microsoft','Flipkart'] },
      { id: 36, num: 300, title: 'Longest Increasing Subsequence',   diff: 'Medium', freq: 9,  tag: '1D DP',  url: 'https://leetcode.com/problems/longest-increasing-subsequence/',   companies: ['Amazon','Google'] },
      { id: 37, num: 1143,title: 'Longest Common Subsequence',       diff: 'Medium', freq: 9,  tag: '2D DP',  url: 'https://leetcode.com/problems/longest-common-subsequence/',       companies: ['Microsoft','Google','Amazon'] },
      { id: 38, num: 416, title: 'Partition Equal Subset Sum',       diff: 'Medium', freq: 9,  tag: 'Knapsack',url:'https://leetcode.com/problems/partition-equal-subset-sum/',       companies: ['Amazon','Meta'] },
      { id: 39, num: 72,  title: 'Edit Distance',                    diff: 'Hard',   freq: 8,  tag: '2D DP',  url: 'https://leetcode.com/problems/edit-distance/',                    companies: ['Google','Microsoft'] },
      { id: 40, num: 152, title: 'Maximum Product Subarray',         diff: 'Medium', freq: 9,  tag: '1D DP',  url: 'https://leetcode.com/problems/maximum-product-subarray/',         companies: ['Amazon','Google','Wipro'] },
    ],
  },
  {
    day: 6,
    title: 'Heap, Backtracking & Greedy',
    color: '#ec4899',
    emoji: '🎯',
    focus: 'Top-K problems → Heap. All possibilities → Backtracking. Local optimal → Greedy',
    patterns: ['Heap / Priority Queue', 'Subsets / Backtracking'],
    theory: [
      'Min heap vs Max heap — kab kaunsa use karein',
      'Top K elements — heap size K maintain karo',
      'Backtracking template — choose, explore, unchoose',
      'Greedy — har step mein locally optimal choice',
    ],
    questions: [
      { id: 41, num: 215, title: 'Kth Largest Element in Array',        diff: 'Medium', freq: 10, tag: 'Heap',         url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',      companies: ['Amazon','Microsoft','Google'] },
      { id: 42, num: 347, title: 'Top K Frequent Elements',             diff: 'Medium', freq: 10, tag: 'Heap/HashMap', url: 'https://leetcode.com/problems/top-k-frequent-elements/',             companies: ['Amazon','Google','Meta'] },
      { id: 43, num: 295, title: 'Find Median from Data Stream',        diff: 'Hard',   freq: 9,  tag: 'Two Heaps',    url: 'https://leetcode.com/problems/find-median-from-data-stream/',        companies: ['Google','Amazon'] },
      { id: 44, num: 78,  title: 'Subsets',                             diff: 'Medium', freq: 9,  tag: 'Backtracking', url: 'https://leetcode.com/problems/subsets/',                             companies: ['Amazon','Google'] },
      { id: 45, num: 46,  title: 'Permutations',                        diff: 'Medium', freq: 9,  tag: 'Backtracking', url: 'https://leetcode.com/problems/permutations/',                        companies: ['Amazon','Microsoft'] },
      { id: 46, num: 51,  title: 'N-Queens',                            diff: 'Hard',   freq: 8,  tag: 'Backtracking', url: 'https://leetcode.com/problems/n-queens/',                            companies: ['Amazon','Google'] },
      { id: 47, num: 55,  title: 'Jump Game',                           diff: 'Medium', freq: 9,  tag: 'Greedy',       url: 'https://leetcode.com/problems/jump-game/',                           companies: ['Amazon','Microsoft'] },
      { id: 48, num: 435, title: 'Non-overlapping Intervals',           diff: 'Medium', freq: 8,  tag: 'Greedy',       url: 'https://leetcode.com/problems/non-overlapping-intervals/',           companies: ['Google','Amazon'] },
    ],
  },
  {
    day: 7,
    title: 'Bit Manipulation, Tries & Mock',
    color: '#06b6d4',
    emoji: '🏁',
    focus: 'Last day — tricky patterns + mock interview simulation',
    patterns: ['Bit Manipulation', 'Trie'],
    theory: [
      'XOR tricks — single number, missing number',
      'Bit masking — subsets with bits',
      'Trie — prefix tree insert/search in O(k)',
      'Stack patterns — monotonic stack for NGE',
    ],
    questions: [
      { id: 49, num: 136, title: 'Single Number',                        diff: 'Easy',   freq: 8,  tag: 'Bit XOR',  url: 'https://leetcode.com/problems/single-number/',                        companies: ['Amazon','Google'] },
      { id: 50, num: 268, title: 'Missing Number',                       diff: 'Easy',   freq: 8,  tag: 'Bit XOR',  url: 'https://leetcode.com/problems/missing-number/',                       companies: ['Amazon','Microsoft'] },
      { id: 51, num: 208, title: 'Implement Trie',                       diff: 'Medium', freq: 9,  tag: 'Trie',     url: 'https://leetcode.com/problems/implement-trie-prefix-tree/',           companies: ['Google','Amazon','Microsoft'] },
      { id: 52, num: 212, title: 'Word Search II',                       diff: 'Hard',   freq: 8,  tag: 'Trie+DFS', url: 'https://leetcode.com/problems/word-search-ii/',                       companies: ['Amazon','Google'] },
      { id: 53, num: 84,  title: 'Largest Rectangle in Histogram',       diff: 'Hard',   freq: 9,  tag: 'Stack',    url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',       companies: ['Amazon','Google'] },
      { id: 54, num: 42,  title: 'Trapping Rain Water',                  diff: 'Hard',   freq: 9,  tag: 'Stack/TP', url: 'https://leetcode.com/problems/trapping-rain-water/',                  companies: ['Amazon','Google','Microsoft'] },
      { id: 55, num: 146, title: 'LRU Cache',                            diff: 'Medium', freq: 10, tag: 'Design',   url: 'https://leetcode.com/problems/lru-cache/',                            companies: ['Amazon','Google','Meta','Microsoft'] },
      { id: 56, num: 41,  title: 'First Missing Positive',               diff: 'Hard',   freq: 8,  tag: 'Cyclic Sort',url:'https://leetcode.com/problems/first-missing-positive/',              companies: ['Amazon','Google'] },
    ],
  },
];

const DIFF_STYLE: Record<string, { bg: string; text: string }> = {
  Easy:   { bg: 'rgba(16,185,129,0.12)', text: '#10b981' },
  Medium: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b' },
  Hard:   { bg: 'rgba(239,68,68,0.12)',  text: '#ef4444' },
};

// ═══════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════

export default function RevisionPage() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<Set<number>>(new Set([1]));

  const toggle = (id: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleDay = (day: number) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(day) ? next.delete(day) : next.add(day);
      return next;
    });
  };

  const totalQ = WEEK_PLAN.reduce((s, d) => s + d.questions.length, 0);
  const doneQ  = WEEK_PLAN.reduce((s, d) => s + d.questions.filter(q => checked.has(q.id)).length, 0);
  const pct    = Math.round((doneQ / totalQ) * 100);

  return (
    <div className="min-h-screen bg-[#080810]">

      {/* ── Header ── */}
      <div className="border-b border-[#1e1e2e] bg-[#0c0c15]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25">
                  📅 7-DAY PLAN
                </span>
                <span className="text-xs text-[#5a5a7a]">56 MIMP Questions</span>
              </div>
              <h1 className="text-3xl font-black text-white mb-2">
                DSA Mastery — 1 Week Revision
              </h1>
              <p className="text-[#7a7a9a] text-sm max-w-lg">
                Sabse zyada poocha gaya questions — Product-based (FAANG) + Service-based dono ke liye.
                Har din 8 questions, theory + practice.
              </p>
            </div>

            {/* Overall progress */}
            <div className="flex flex-col items-end gap-2 min-w-[160px]">
              <div className="text-4xl font-black text-emerald-400">{pct}%</div>
              <div className="w-40 h-2 bg-[#1a1a28] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-[#5a5a7a]">{doneQ} / {totalQ} completed</p>
            </div>
          </div>

          {/* Day progress pills */}
          <div className="flex gap-2 mt-6 flex-wrap">
            {WEEK_PLAN.map(d => {
              const done = d.questions.filter(q => checked.has(q.id)).length;
              const complete = done === d.questions.length;
              return (
                <button
                  key={d.day}
                  onClick={() => {
                    setExpanded(prev => new Set([...prev, d.day]));
                    document.getElementById(`day-${d.day}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
                  style={{
                    backgroundColor: complete ? `${d.color}20` : 'transparent',
                    borderColor: complete ? d.color : '#1e1e2e',
                    color: complete ? d.color : '#5a5a7a',
                  }}
                >
                  {complete ? '✓' : `Day ${d.day}`} {d.emoji}
                  <span className="opacity-70">{done}/{d.questions.length}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Days ── */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-4">
        {WEEK_PLAN.map(day => {
          const done     = day.questions.filter(q => checked.has(q.id)).length;
          const isOpen   = expanded.has(day.day);
          const complete = done === day.questions.length;

          return (
            <div
              key={day.day}
              id={`day-${day.day}`}
              className="rounded-2xl border overflow-hidden transition-all"
              style={{ borderColor: isOpen ? `${day.color}30` : '#1e1e2e', backgroundColor: '#0c0c15' }}
            >
              {/* Day header */}
              <button
                onClick={() => toggleDay(day.day)}
                className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-[#0f0f18] transition-colors"
              >
                {/* Day number */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ backgroundColor: `${day.color}15`, border: `1.5px solid ${day.color}30`, color: day.color }}
                >
                  {complete ? '✓' : day.day}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{day.emoji}</span>
                    <h2 className="font-bold text-white text-base">{day.title}</h2>
                  </div>
                  <p className="text-xs text-[#5a5a7a] truncate">{day.focus}</p>
                </div>

                {/* Progress + toggle */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ color: day.color }}>{done}/{day.questions.length}</div>
                    <div className="w-20 h-1.5 bg-[#1a1a28] rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${(done / day.questions.length) * 100}%`, backgroundColor: day.color }}
                      />
                    </div>
                  </div>
                  {isOpen
                    ? <ChevronUp className="w-4 h-4 text-[#5a5a7a]" />
                    : <ChevronDown className="w-4 h-4 text-[#5a5a7a]" />
                  }
                </div>
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="border-t border-[#1a1a28]">

                  {/* Theory */}
                  <div className="px-6 py-4 bg-[#080810]">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: day.color }}>
                          📚 Aaj Kya Padhna Hai
                        </h3>
                        <ul className="space-y-1.5">
                          {day.theory.map((t, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-[#7a7a9a]">
                              <span className="text-[8px] mt-1.5 flex-shrink-0" style={{ color: day.color }}>●</span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-[#5a5a7a]">
                          🎯 Patterns Covered
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {day.patterns.map(p => (
                            <Link
                              key={p}
                              href={`/patterns/${p.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                              className="text-xs px-2.5 py-1 rounded-lg border transition-all hover:opacity-80"
                              style={{ backgroundColor: `${day.color}12`, borderColor: `${day.color}25`, color: day.color }}
                            >
                              {p}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="divide-y divide-[#1a1a28]">
                    {day.questions.map((q, i) => {
                      const done = checked.has(q.id);
                      return (
                        <div
                          key={q.id}
                          className="flex items-center gap-3 px-6 py-3.5 hover:bg-[#0f0f18] transition-colors"
                          style={{ opacity: done ? 0.6 : 1 }}
                        >
                          {/* Checkbox */}
                          <button onClick={() => toggle(q.id)} className="flex-shrink-0">
                            {done
                              ? <CheckCircle2 className="w-5 h-5" style={{ color: day.color }} />
                              : <Circle className="w-5 h-5 text-[#2a2a3e] hover:text-[#5a5a7a]" />
                            }
                          </button>

                          {/* Num */}
                          <span className="text-xs font-mono text-[#3a3a4e] w-6 flex-shrink-0">{i + 1}</span>

                          {/* Problem info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs text-[#4a4a6a] font-mono">#{q.num}</span>
                              <span className={`text-sm font-medium ${done ? 'line-through text-[#4a4a6a]' : 'text-[#c8c8e8]'}`}>
                                {q.title}
                              </span>
                              <span
                                className="text-[11px] px-2 py-0.5 rounded-md font-semibold flex-shrink-0"
                                style={DIFF_STYLE[q.diff]}
                              >
                                {q.diff}
                              </span>
                              <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#0f0f18] border border-[#1e1e2e] text-[#5a5a7a]">
                                {q.tag}
                              </span>
                            </div>
                            {/* Companies */}
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {q.companies.map(c => (
                                <span key={c} className="text-[10px] text-[#3a3a4e] bg-[#0a0a12] px-1.5 py-0.5 rounded border border-[#1a1a28]">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Frequency dots */}
                          <div className="hidden sm:flex gap-0.5 flex-shrink-0">
                            {Array.from({ length: 5 }).map((_, fi) => (
                              <div
                                key={fi}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: fi < Math.ceil(q.freq / 2) ? day.color : '#1e1e2e' }}
                              />
                            ))}
                          </div>

                          {/* LeetCode link */}
                          <a
                            href={q.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-[#3a3a4e] hover:text-emerald-400 hover:bg-emerald-500/8 transition-all flex-shrink-0"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/patterns" className="flex items-center gap-3 p-5 rounded-2xl bg-[#0c0c15] border border-[#1e1e2e] hover:border-emerald-500/30 transition-all">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-sm font-bold text-white">Pattern Library</div>
              <div className="text-xs text-[#5a5a7a]">Theory padho</div>
            </div>
          </Link>
          <Link href="/practice" className="flex items-center gap-3 p-5 rounded-2xl bg-[#0c0c15] border border-[#1e1e2e] hover:border-blue-500/30 transition-all">
            <Target className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-sm font-bold text-white">Practice Mode</div>
              <div className="text-xs text-[#5a5a7a]">450 problems solve karo</div>
            </div>
          </Link>
          <Link href="/pattern-recognition" className="flex items-center gap-3 p-5 rounded-2xl bg-[#0c0c15] border border-[#1e1e2e] hover:border-purple-500/30 transition-all">
            <Brain className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-sm font-bold text-white">Pattern Recognition</div>
              <div className="text-xs text-[#5a5a7a]">Quiz + guide</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}