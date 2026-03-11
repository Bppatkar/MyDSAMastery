'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, Circle, ExternalLink, ChevronDown, ChevronUp,
  Zap, Trophy, Target, BookOpen, Brain, Star, Clock, TrendingUp,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

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
  const th = useTheme();
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<Set<number>>(new Set([1]));

  const toggle = (id: number) => {
    setChecked(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };
  const toggleDay = (day: number) => {
    setExpanded(prev => { const next = new Set(prev); next.has(day) ? next.delete(day) : next.add(day); return next; });
  };

  const totalQ = WEEK_PLAN.reduce((s, d) => s + d.questions.length, 0);
  const doneQ  = WEEK_PLAN.reduce((s, d) => s + d.questions.filter(q => checked.has(q.id)).length, 0);
  const pct    = Math.round((doneQ / totalQ) * 100);

  return (
    <div style={{ minHeight: '100vh', background: th.bgBase }}>

      {/* ── Header ── */}
      <div style={{ background: th.bgSurface, borderBottom: `1px solid ${th.border}` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)' }}>
                  📅 7-DAY PLAN
                </span>
                <span style={{ fontSize: 12, color: th.tx3 }}>56 MIMP Questions</span>
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: th.tx1, margin: '0 0 8px' }}>
                DSA Mastery — 1 Week Revision
              </h1>
              <p style={{ fontSize: 13, color: th.tx2, maxWidth: 480, lineHeight: 1.6, margin: 0 }}>
                Sabse zyada poocha gaya questions — Product-based (FAANG) + Service-based dono ke liye.
                Har din 8 questions, theory + practice.
              </p>
            </div>

            {/* Overall progress */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, minWidth: 160 }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: th.accent }}>{pct}%</div>
              <div style={{ width: 160, height: 8, background: th.border, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 4, background: th.accent, width: `${pct}%`, transition: 'width 0.5s' }} />
              </div>
              <p style={{ fontSize: 12, color: th.tx3, margin: 0 }}>{doneQ} / {totalQ} completed</p>
            </div>
          </div>

          {/* Day pills */}
          <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
            {WEEK_PLAN.map(d => {
              const dayDone = d.questions.filter(q => checked.has(q.id)).length;
              const complete = dayDone === d.questions.length;
              return (
                <button key={d.day} onClick={() => { setExpanded(prev => new Set([...prev, d.day])); document.getElementById(`day-${d.day}`)?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: complete ? `${d.color}15` : 'transparent', borderColor: complete ? d.color : th.border, borderWidth: 1, borderStyle: 'solid', color: complete ? d.color : th.tx3 }}>
                  {complete ? '✓' : `Day ${d.day}`} {d.emoji}
                  <span style={{ opacity: 0.7 }}>{dayDone}/{d.questions.length}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Days ── */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {WEEK_PLAN.map(day => {
          const dayDone  = day.questions.filter(q => checked.has(q.id)).length;
          const isOpen   = expanded.has(day.day);
          const complete = dayDone === day.questions.length;

          return (
            <div key={day.day} id={`day-${day.day}`}
              style={{ borderRadius: 18, border: `1px solid ${isOpen ? day.color + '35' : th.border}`, background: th.bgCard, overflow: 'hidden' }}>

              {/* Day header button */}
              <button onClick={() => toggleDay(day.day)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', textAlign: 'left', cursor: 'pointer', background: 'transparent', border: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.background = th.bgHover)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>

                {/* Day number badge */}
                <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, flexShrink: 0, background: `${day.color}15`, border: `1.5px solid ${day.color}30`, color: day.color }}>
                  {complete ? '✓' : day.day}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 18 }}>{day.emoji}</span>
                    <h2 style={{ fontWeight: 800, fontSize: 15, color: th.tx1, margin: 0 }}>{day.title}</h2>
                  </div>
                  <p style={{ fontSize: 12, color: th.tx3, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{day.focus}</p>
                </div>

                {/* Progress */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: day.color }}>{dayDone}/{day.questions.length}</div>
                    <div style={{ width: 80, height: 5, background: th.border, borderRadius: 3, marginTop: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 3, background: day.color, width: `${(dayDone / day.questions.length) * 100}%`, transition: 'width 0.3s' }} />
                    </div>
                  </div>
                  {isOpen
                    ? <ChevronUp style={{ width: 16, height: 16, color: th.tx3, flexShrink: 0 }} />
                    : <ChevronDown style={{ width: 16, height: 16, color: th.tx3, flexShrink: 0 }} />}
                </div>
              </button>

              {/* Expanded */}
              {isOpen && (
                <div style={{ borderTop: `1px solid ${th.border}` }}>

                  {/* Theory section */}
                  <div style={{ padding: '16px 24px', background: th.bgElevated }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                      <div>
                        <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, color: day.color }}>
                          📚 Aaj Kya Padhna Hai
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                          {day.theory.map((t, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: th.tx2, lineHeight: 1.55 }}>
                              <span style={{ color: day.color, fontSize: 8, marginTop: 4, flexShrink: 0 }}>●</span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, color: th.tx3 }}>
                          🎯 Patterns Covered
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {day.patterns.map(p => (
                            <Link key={p} href={`/patterns/${p.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                              style={{ fontSize: 12, padding: '4px 11px', borderRadius: 8, background: `${day.color}12`, borderColor: `${day.color}25`, borderWidth: 1, borderStyle: 'solid', color: day.color, textDecoration: 'none', fontWeight: 600 }}>
                              {p}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Questions list */}
                  <div>
                    {day.questions.map((q, i) => {
                      const isDone = checked.has(q.id);
                      return (
                        <div key={q.id}
                          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', opacity: isDone ? 0.55 : 1, borderTop: i > 0 ? `1px solid ${th.border}` : 'none' }}
                          onMouseEnter={e => (e.currentTarget.style.background = th.bgHover)}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>

                          {/* Checkbox */}
                          <button onClick={() => toggle(q.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, padding: 0 }}>
                            {isDone
                              ? <CheckCircle2 style={{ width: 20, height: 20, color: day.color }} />
                              : <Circle style={{ width: 20, height: 20, color: th.borderStr }} />}
                          </button>

                          {/* Number */}
                          <span style={{ fontSize: 11, fontFamily: 'monospace', color: th.tx4, width: 20, flexShrink: 0 }}>{i + 1}</span>

                          {/* Problem info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                              <span style={{ fontSize: 11, fontFamily: 'monospace', color: th.tx3 }}>#{q.num}</span>
                              <span style={{ fontSize: 13, fontWeight: 600, color: isDone ? th.tx3 : th.tx1, textDecoration: isDone ? 'line-through' : 'none' }}>
                                {q.title}
                              </span>
                              <span style={{ fontSize: 11, padding: '2px 7px', borderRadius: 5, fontWeight: 700, flexShrink: 0, ...DIFF_STYLE[q.diff] }}>
                                {q.diff}
                              </span>
                              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: th.bgElevated, border: `1px solid ${th.border}`, color: th.tx3 }}>
                                {q.tag}
                              </span>
                            </div>
                            {/* Company tags */}
                            <div style={{ display: 'flex', gap: 5, marginTop: 5, flexWrap: 'wrap' }}>
                              {q.companies.map(c => (
                                <span key={c} style={{ fontSize: 10, color: th.tx4, background: th.bgInput, padding: '2px 7px', borderRadius: 5, border: `1px solid ${th.border}` }}>
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Frequency dots */}
                          <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                            {Array.from({ length: 5 }).map((_, fi) => (
                              <div key={fi} style={{ width: 6, height: 6, borderRadius: '50%', background: fi < Math.ceil(q.freq / 2) ? day.color : th.border }} />
                            ))}
                          </div>

                          {/* LeetCode link */}
                          <a href={q.url} target="_blank" rel="noopener noreferrer"
                            style={{ padding: 8, borderRadius: 8, color: th.tx3, display: 'flex', flexShrink: 0, transition: 'color 0.15s' }}
                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = th.accent)}
                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = th.tx3)}>
                            <ExternalLink style={{ width: 14, height: 14 }} />
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
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { href: '/patterns',            icon: <BookOpen style={{ width: 18, height: 18, color: th.accent }} />,         title: 'Pattern Library',     sub: 'Theory padho',              hvrBdr: th.accent },
            { href: '/practice',            icon: <Target   style={{ width: 18, height: 18, color: '#3b82f6' }} />,         title: 'Practice Mode',       sub: '450 problems solve karo',  hvrBdr: '#3b82f6' },
            { href: '/pattern-recognition', icon: <Brain    style={{ width: 18, height: 18, color: '#a855f7' }} />,         title: 'Pattern Recognition', sub: 'Quiz + Decision Tree',     hvrBdr: '#a855f7' },
          ].map(({ href, icon, title, sub, hvrBdr }) => (
            <Link key={href} href={href}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderRadius: 14, background: th.bgCard, border: `1px solid ${th.border}`, textDecoration: 'none', transition: 'border-color 0.15s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = hvrBdr + '50')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = th.border)}>
              {icon}
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: th.tx1 }}>{title}</div>
                <div style={{ fontSize: 11, color: th.tx3 }}>{sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}