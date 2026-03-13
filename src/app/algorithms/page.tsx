'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// MASTER ALGORITHMS DATA
// Pattern → Algorithm → Types → LeetCode Questions
// ═══════════════════════════════════════════════════════════════
const ALGO_DATA = [
  {
    id: 'sliding-window',
    pattern: 'Sliding Window',
    icon: '🪟',
    color: '#10b981',
    description: 'Array/string mein moving window track karo',
    when: ['Contiguous subarray/substring', 'Fixed ya variable size window', 'Optimize O(n²) → O(n)'],
    input_signals: ['Array ya String diya ho', 'Subarray/substring ki baat ho', '"Contiguous" ya "consecutive" likha ho'],
    output_signals: ['Single max/min value', 'Count of valid windows', 'Longest/shortest length'],
    constraint_clue: 'n ≤ 10⁵ ya 10⁶ → O(n) chahiye',
    algorithms: [
      {
        name: 'Fixed Size Window',
        complexity: { time: 'O(n)', space: 'O(1)' },
        when: 'Window size k diya ho — fixed rahta hai',
        how: 'Pehle k elements ka sum/count nikalo. Phir slide: right add karo, left remove karo. O(1) update.',
        ds: 'Running sum variable',
        questions: [
          { num: 643, title: 'Maximum Average Subarray I' },
          { num: 1343, title: 'Number of Sub-arrays of Size K and Average ≥ Threshold' },
          { num: 567, title: 'Permutation in String' },
          { num: 438, title: 'Find All Anagrams in a String' },
        ],
      },
      {
        name: 'Variable Window — Expand + Shrink',
        complexity: { time: 'O(n)', space: 'O(k)' },
        when: '"Longest" substring with condition — window dynamically badhta/ghatata hai',
        how: 'Right pointer freely badhao. Condition violate ho → left shrink karo jab tak valid ho.',
        ds: 'HashMap ya frequency array',
        questions: [
          { num: 3, title: 'Longest Substring Without Repeating Characters' },
          { num: 76, title: 'Minimum Window Substring' },
          { num: 904, title: 'Fruit Into Baskets' },
          { num: 1004, title: 'Max Consecutive Ones III' },
          { num: 209, title: 'Minimum Size Subarray Sum' },
        ],
      },
      {
        name: 'Exactly K = atMost(k) − atMost(k−1)',
        complexity: { time: 'O(n)', space: 'O(k)' },
        when: '"Exactly k distinct/sum" — direct window se tricky hota hai',
        how: 'exactly(k) = atMost(k) − atMost(k−1). atMost helper function mein variable window use karo.',
        ds: 'atMost(k) function + HashMap',
        questions: [
          { num: 930, title: 'Binary Subarrays With Sum' },
          { num: 992, title: 'Subarrays with K Different Integers' },
        ],
      },
      {
        name: 'Monotonic Deque Window',
        complexity: { time: 'O(n)', space: 'O(k)' },
        when: '"Maximum/minimum of every window" — deque maintains sorted order',
        how: 'Deque mein indices rakho. Naya element aaya: back se chhote pop karo. Front = current window max.',
        ds: 'Deque (double-ended queue)',
        questions: [
          { num: 239, title: 'Sliding Window Maximum' },
        ],
      },
    ],
  },
  {
    id: 'two-pointers',
    pattern: 'Two Pointers',
    icon: '👆',
    color: '#f59e0b',
    description: 'Do pointers se search space aadha aadha karo',
    when: ['Sorted array mein pair dhundna', 'In-place modification', 'O(1) space requirement'],
    input_signals: ['Sorted array', 'In-place chahiye', 'Pair/triplet dhundna'],
    output_signals: ['Pair ya triplet indices', 'Boolean', 'In-place modified array'],
    constraint_clue: 'Sorted + O(1) space = Two Pointers',
    algorithms: [
      {
        name: 'Opposite Ends (Converging)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        when: 'Sorted array mein pair sum → l=0, r=n-1 se andar aao',
        how: 'sum chhota → l badhao (bada chahiye). sum bada → r ghatao. Equal → answer.',
        ds: 'l=0, r=n-1 — koi extra space nahi',
        questions: [
          { num: 167, title: 'Two Sum II' },
          { num: 11, title: 'Container With Most Water' },
          { num: 125, title: 'Valid Palindrome' },
          { num: 977, title: 'Squares of a Sorted Array' },
        ],
      },
      {
        name: 'Fix One + Two Pointers (3Sum)',
        complexity: { time: 'O(n²)', space: 'O(1)' },
        when: 'Triplet sum — sort karo, ek fix karo, baaki do pe Two Pointers',
        how: 'Sort. Outer loop i. Inner: l=i+1, r=n-1. Duplicate skip karo carefully.',
        ds: 'Sorted array + nested pointers',
        questions: [
          { num: 15, title: '3Sum' },
          { num: 18, title: '4Sum' },
        ],
      },
      {
        name: 'Same Direction — Slow-Fast (In-Place)',
        complexity: { time: 'O(n)', space: 'O(1)' },
        when: 'In-place partition ya remove → slow = writer, fast = reader',
        how: 'slow writes valid elements. fast scans all. When valid: nums[slow++] = nums[fast].',
        ds: 'slow + fast pointers — same array',
        questions: [
          { num: 26, title: 'Remove Duplicates from Sorted Array' },
          { num: 283, title: 'Move Zeroes' },
          { num: 27, title: 'Remove Element' },
        ],
      },
    ],
  },
  {
    id: 'binary-search',
    pattern: 'Binary Search',
    icon: '🔍',
    color: '#6366f1',
    description: 'Search space ko har step mein aadha karo',
    when: ['Sorted array mein search', 'O(log n) required', 'Monotonic function pe optimize'],
    input_signals: ['Sorted array', 'O(log n) explicitly likha ho', 'Large range mein minimize/maximize'],
    output_signals: ['Index ya value', 'Boolean', 'Minimum/maximum satisfying condition'],
    constraint_clue: 'O(log n) explicitly likha = Binary Search',
    algorithms: [
      {
        name: 'Classic Binary Search',
        complexity: { time: 'O(log n)', space: 'O(1)' },
        when: 'Sorted array mein exact element dhundna',
        how: 'lo=0, hi=n-1. mid=(lo+hi)//2. arr[mid]<target→lo=mid+1. arr[mid]>target→hi=mid-1.',
        ds: 'lo, hi pointers only',
        questions: [
          { num: 704, title: 'Binary Search' },
          { num: 278, title: 'First Bad Version' },
        ],
      },
      {
        name: 'Left/Right Boundary Search',
        complexity: { time: 'O(log n)', space: 'O(1)' },
        when: 'First ya last occurrence dhundna (duplicates mein)',
        how: 'Left: found→hi=mid (keep going left). Right: found→lo=mid+1 (keep going right).',
        ds: 'lo, hi + result variable',
        questions: [
          { num: 34, title: 'Find First and Last Position' },
          { num: 278, title: 'First Bad Version' },
        ],
      },
      {
        name: 'Binary Search on Rotated Array',
        complexity: { time: 'O(log n)', space: 'O(1)' },
        when: 'Sorted array ko rotate kiya gaya ho',
        how: 'Ek half hamesha sorted hota hai. Check karo: target sorted half mein hai ya nahi.',
        ds: 'lo, hi + rotation condition',
        questions: [
          { num: 153, title: 'Find Minimum in Rotated Sorted Array' },
          { num: 33, title: 'Search in Rotated Sorted Array' },
        ],
      },
      {
        name: 'Binary Search on Answer Space',
        complexity: { time: 'O(n log max)', space: 'O(1)' },
        when: '"Minimize k where condition(k) is true" — answer range badi ho',
        how: 'canDo(mid) check karo O(n) mein. Binary search on answer, NOT on array.',
        ds: 'canDo(x) helper + lo=min_possible, hi=max_possible',
        questions: [
          { num: 875, title: 'Koko Eating Bananas' },
          { num: 1011, title: 'Capacity To Ship Packages' },
          { num: 410, title: 'Split Array Largest Sum' },
          { num: 74, title: 'Search a 2D Matrix' },
        ],
      },
    ],
  },
  {
    id: 'dfs-bfs',
    pattern: 'DFS / BFS',
    icon: '🌊',
    color: '#3b82f6',
    description: 'Graph aur tree traversal — depth ya breadth first',
    when: ['Tree ya graph traversal', 'Connected components', 'Shortest path (BFS)', 'All paths (DFS)'],
    input_signals: ['Binary tree diya', '2D grid diya', 'Graph edges diye', '"Shortest path" likha'],
    output_signals: ['Path ya path count', 'Min distance', 'All combinations', 'Boolean reachability'],
    constraint_clue: '"Shortest" = BFS. "All paths" ya "explore" = DFS',
    algorithms: [
      {
        name: 'BFS — Level Order / Shortest Path',
        complexity: { time: 'O(V+E)', space: 'O(V)' },
        when: 'Shortest path (unweighted) ya level-by-level traversal',
        how: 'Queue mein shuru ke nodes daalo. Level by level process karo. Visited mark karo.',
        ds: 'Queue (deque)',
        questions: [
          { num: 102, title: 'Binary Tree Level Order Traversal' },
          { num: 127, title: 'Word Ladder' },
          { num: 994, title: 'Rotting Oranges' },
          { num: 542, title: '01 Matrix' },
          { num: 286, title: 'Walls and Gates' },
        ],
      },
      {
        name: 'Multi-Source BFS',
        complexity: { time: 'O(V+E)', space: 'O(V)' },
        when: '"Simultaneous spread from multiple sources"',
        how: 'Sab sources ek saath queue mein daalo. BFS normally. Level = distance.',
        ds: 'Queue pre-loaded with ALL sources',
        questions: [
          { num: 994, title: 'Rotting Oranges' },
          { num: 542, title: '01 Matrix' },
          { num: 286, title: 'Walls and Gates' },
        ],
      },
      {
        name: 'DFS — Grid Flood Fill',
        complexity: { time: 'O(m×n)', space: 'O(m×n)' },
        when: 'Grid mein connected region count/mark karna',
        how: 'Unvisited cell mila → DFS se poora region mark karo → count++.',
        ds: 'Recursion + in-place marking',
        questions: [
          { num: 200, title: 'Number of Islands' },
          { num: 695, title: 'Max Area of Island' },
          { num: 130, title: 'Surrounded Regions' },
          { num: 417, title: 'Pacific Atlantic Water Flow' },
        ],
      },
      {
        name: 'DFS — Tree Paths',
        complexity: { time: 'O(n)', space: 'O(h)' },
        when: 'Root-to-leaf paths, tree properties',
        how: 'Recursive DFS — parameter mein running value pass karo. Leaf pe check karo.',
        ds: 'Recursion + path variable',
        questions: [
          { num: 112, title: 'Path Sum' },
          { num: 257, title: 'Binary Tree Paths' },
          { num: 124, title: 'Binary Tree Maximum Path Sum' },
        ],
      },
    ],
  },
  {
    id: 'dynamic-programming',
    pattern: 'Dynamic Programming',
    icon: '🧩',
    color: '#8b5cf6',
    description: 'Subproblems ke answers store karo, reuse karo',
    when: ['Overlapping subproblems', '"Count ways" ya "maximize/minimize"', 'Recursion → TLE'],
    input_signals: ['Count karo kitne ways', 'Maximum ya minimum value', 'String subsequence', 'Knapsack-type'],
    output_signals: ['Single count/value', 'Boolean', 'Length of sequence'],
    constraint_clue: 'n ≤ 10³ ya 10⁴ — suggests O(n²) DP',
    algorithms: [
      {
        name: '1D DP — Linear',
        complexity: { time: 'O(n)', space: 'O(1)' },
        when: 'dp[i] sirf dp[i-1] ya dp[i-2] pe depend karta hai',
        how: 'dp[i] = f(dp[i-1], dp[i-2]). Often do variables se kaam chalta hai.',
        ds: 'dp[] array ya sirf 2 variables',
        questions: [
          { num: 70, title: 'Climbing Stairs' },
          { num: 198, title: 'House Robber' },
          { num: 53, title: 'Maximum Subarray (Kadane)' },
          { num: 152, title: 'Maximum Product Subarray' },
        ],
      },
      {
        name: '2D DP — Two Sequences',
        complexity: { time: 'O(m×n)', space: 'O(m×n)' },
        when: 'Do strings ya sequences ka comparison',
        how: 'dp[i][j] = answer for text1[0..i] aur text2[0..j].',
        ds: 'dp[m+1][n+1] 2D array',
        questions: [
          { num: 1143, title: 'Longest Common Subsequence' },
          { num: 72, title: 'Edit Distance' },
          { num: 62, title: 'Unique Paths' },
        ],
      },
      {
        name: '0/1 Knapsack',
        complexity: { time: 'O(n×W)', space: 'O(W)' },
        when: 'Har item sirf ek baar use hota hai. Inner loop REVERSE!',
        how: 'dp[j] |= dp[j-weight]. REVERSE loop = each item once.',
        ds: 'dp[W+1] 1D — REVERSE inner loop',
        questions: [
          { num: 416, title: 'Partition Equal Subset Sum' },
          { num: 494, title: 'Target Sum' },
          { num: 474, title: 'Ones and Zeroes' },
        ],
      },
      {
        name: 'Unbounded Knapsack',
        complexity: { time: 'O(n×W)', space: 'O(W)' },
        when: 'Same item unlimited times use hota hai. Inner loop FORWARD!',
        how: 'dp[j] = min(dp[j], dp[j-coin]+1). FORWARD loop = reuse allowed.',
        ds: 'dp[W+1] 1D — FORWARD inner loop',
        questions: [
          { num: 322, title: 'Coin Change' },
          { num: 518, title: 'Coin Change 2' },
          { num: 377, title: 'Combination Sum IV' },
        ],
      },
      {
        name: 'LIS — Longest Increasing Subsequence',
        complexity: { time: 'O(n²) ya O(n log n)', space: 'O(n)' },
        when: '"Longest subsequence" with some condition',
        how: 'dp[i]=LIS ending at i. For j<i: if arr[j]<arr[i]: dp[i]=max(dp[i],dp[j]+1).',
        ds: 'dp[n] array',
        questions: [
          { num: 300, title: 'Longest Increasing Subsequence' },
          { num: 354, title: 'Russian Doll Envelopes' },
          { num: 646, title: 'Maximum Length of Pair Chain' },
        ],
      },
    ],
  },
  {
    id: 'backtracking',
    pattern: 'Backtracking',
    icon: '🎯',
    color: '#ef4444',
    description: 'Sab possible solutions explore karo, invalid prune karo',
    when: ['"All" combinations/permutations/subsets', 'Small n (≤ 20)', 'Constraint satisfaction'],
    input_signals: ['Generate all...', 'Find all valid...', 'Small n explicitly'],
    output_signals: ['List of Lists', 'List of strings', 'All valid configurations'],
    constraint_clue: 'n ≤ 10 ya 20 — O(2^n) ya O(n!) acceptable',
    algorithms: [
      {
        name: 'Subsets — Take or Not Take',
        complexity: { time: 'O(2^n × n)', space: 'O(n)' },
        when: '"All subsets" / "power set"',
        how: 'dfs(start, path): result.add(copy). for i=start..n: add, dfs(i+1), pop.',
        ds: 'Recursion + start index',
        questions: [
          { num: 78, title: 'Subsets' },
          { num: 90, title: 'Subsets II (with duplicates)' },
        ],
      },
      {
        name: 'Permutations — Choose-Explore-Unchoose',
        complexity: { time: 'O(n! × n)', space: 'O(n)' },
        when: '"All permutations" / "every ordering"',
        how: 'used[] array. for i: if !used[i]: used[i]=T, add, recurse, pop, used[i]=F.',
        ds: 'Recursion + used[] boolean array',
        questions: [
          { num: 46, title: 'Permutations' },
          { num: 47, title: 'Permutations II' },
        ],
      },
      {
        name: 'Combination Sum — With/Without Reuse',
        complexity: { time: 'O(N^(T/M))', space: 'O(T/M)' },
        when: '"Combinations summing to target"',
        how: 'Reuse allowed → dfs(i, ...). No reuse → dfs(i+1, ...). Sort first for pruning.',
        ds: 'Recursion + remaining target',
        questions: [
          { num: 39, title: 'Combination Sum' },
          { num: 40, title: 'Combination Sum II' },
          { num: 216, title: 'Combination Sum III' },
        ],
      },
      {
        name: 'Constrained Generation',
        complexity: { time: 'O(Catalan)', space: 'O(n)' },
        when: '"Generate all valid X" with rules',
        how: 'Build incrementally. Violates rule → don\'t recurse (prune). Reaches end → add result.',
        ds: 'Recursion + constraint variables',
        questions: [
          { num: 22, title: 'Generate Parentheses' },
          { num: 51, title: 'N-Queens' },
          { num: 37, title: 'Sudoku Solver' },
        ],
      },
    ],
  },
  {
    id: 'heap',
    pattern: 'Heap / Priority Queue',
    icon: '🏔️',
    color: '#a855f7',
    description: 'Efficiently track maximum ya minimum dynamically',
    when: ['"K largest/smallest"', 'Running median', 'Scheduled tasks', 'Merge k sorted'],
    input_signals: ['K largest/smallest chahiye', 'Dynamic stream of numbers', 'Multiple sorted lists'],
    output_signals: ['K elements', 'Single running value', 'Merged sorted list'],
    constraint_clue: 'K se related + O(n log k) needed',
    algorithms: [
      {
        name: 'Top K — Min-Heap of Size k',
        complexity: { time: 'O(n log k)', space: 'O(k)' },
        when: '"K largest elements" — min-heap size k maintain karo',
        how: 'Heap mein push. size > k → pop. Heap top = kth largest. O(n log k) < sort O(n log n).',
        ds: 'Min-Heap of size k',
        questions: [
          { num: 215, title: 'Kth Largest Element' },
          { num: 347, title: 'Top K Frequent Elements' },
          { num: 973, title: 'K Closest Points to Origin' },
          { num: 1046, title: 'Last Stone Weight' },
        ],
      },
      {
        name: 'Two Heaps — Running Median',
        complexity: { time: 'O(log n) insert', space: 'O(n)' },
        when: '"Median of stream" — dynamic median chahiye',
        how: 'Lower half max-heap + Upper half min-heap. Balance sizes. Tops se median.',
        ds: 'Max-Heap (lower) + Min-Heap (upper)',
        questions: [
          { num: 295, title: 'Find Median from Data Stream' },
          { num: 480, title: 'Sliding Window Median' },
        ],
      },
      {
        name: 'K-Way Merge',
        complexity: { time: 'O(n log k)', space: 'O(k)' },
        when: '"Merge k sorted lists/arrays"',
        how: 'Sab lists ke first elements heap mein daalo. Pop global min, next push karo.',
        ds: 'Min-Heap with (val, list_idx, node_ptr)',
        questions: [
          { num: 23, title: 'Merge K Sorted Lists' },
          { num: 378, title: 'Kth Smallest Element in Matrix' },
        ],
      },
    ],
  },
  {
    id: 'graph-advanced',
    pattern: 'Graph Algorithms',
    icon: '🕸️',
    color: '#84cc16',
    description: 'Shortest path, MST, cycle detection, components',
    when: ['Weighted graph', 'Minimum spanning tree', 'Strongly connected', 'Union-Find for components'],
    input_signals: ['Weighted edges diye', 'Connect all points', 'Detect cycle', 'Group into components'],
    output_signals: ['Shortest distances', 'Minimum total cost', 'Boolean cycle', 'Component count'],
    constraint_clue: '"Weighted" = Dijkstra. "Unweighted shortest" = BFS. "Components" = Union-Find.',
    algorithms: [
      {
        name: 'Dijkstra — Shortest Path (Weighted)',
        complexity: { time: 'O((V+E) log V)', space: 'O(V+E)' },
        when: '"Shortest path in WEIGHTED graph" — BFS nahi chalega!',
        how: 'dist[] = INF. Min-Heap se process. Neighbor: dist+w < dist[v] → update, enqueue.',
        ds: 'Min-Heap + dist[] array',
        questions: [
          { num: 743, title: 'Network Delay Time' },
          { num: 1631, title: 'Path With Minimum Effort' },
          { num: 1514, title: 'Path with Maximum Probability' },
        ],
      },
      {
        name: "Prim's / Kruskal's — Minimum Spanning Tree",
        complexity: { time: 'O(E log E)', space: 'O(V)' },
        when: '"Minimum cost to connect ALL nodes"',
        how: "Prim's: greedy, hamesha cheapest unvisited node lo. Kruskal's: edges sort, Union-Find.",
        ds: 'Min-Heap ya sorted edges + Union-Find',
        questions: [
          { num: 1584, title: 'Min Cost to Connect All Points' },
        ],
      },
      {
        name: 'Union-Find — Components & Cycle Detection',
        complexity: { time: 'O(n α(n))', space: 'O(n)' },
        when: '"Count components" ya "cycle detect" ya "same group?"',
        how: 'parent[] initialize. find() with path compression. union() with rank. find(u)==find(v) before union → cycle!',
        ds: 'parent[] + rank[] arrays',
        questions: [
          { num: 547, title: 'Number of Provinces' },
          { num: 684, title: 'Redundant Connection' },
          { num: 323, title: 'Number of Connected Components' },
          { num: 1584, title: 'Min Cost to Connect All Points' },
        ],
      },
      {
        name: "Topological Sort — Kahn's Algorithm",
        complexity: { time: 'O(V+E)', space: 'O(V+E)' },
        when: 'Dependencies ke saath ordering chahiye ya cycle detect karna hai',
        how: 'in_degree[]. queue = in_degree==0. Process: neighbor in_degree--. If 0: enqueue. processed == n → no cycle.',
        ds: 'in-degree array + Queue + adjacency list',
        questions: [
          { num: 207, title: 'Course Schedule' },
          { num: 210, title: 'Course Schedule II' },
          { num: 269, title: 'Alien Dictionary' },
          { num: 310, title: 'Minimum Height Trees' },
        ],
      },
    ],
  },
  {
    id: 'sorting-algorithms',
    pattern: 'Sorting Algorithms',
    icon: '📊',
    color: '#06b6d4',
    description: 'Array elements ko order mein arrange karo',
    when: ['Array arrange karna ho', 'Problems jo sorted input assume karte hain', 'Comparison-based ordering'],
    input_signals: ['Unsorted array diya', '"Sort the array" likha', 'Ordering by some key'],
    output_signals: ['Sorted array', 'Sorted indices'],
    constraint_clue: 'General n ≤ 10⁵ → O(n log n) sorting',
    algorithms: [
      {
        name: 'Merge Sort — Divide & Conquer',
        complexity: { time: 'O(n log n)', space: 'O(n)' },
        when: 'Stable sort chahiye. External sort. Count inversions.',
        how: 'Array aadha aadha divide karo. Dono halves sort karo. Merge karo.',
        ds: 'Auxiliary array for merge',
        questions: [
          { num: 912, title: 'Sort an Array' },
          { num: 315, title: 'Count of Smaller Numbers After Self' },
        ],
      },
      {
        name: 'Quick Sort — Partition',
        complexity: { time: 'O(n log n) avg', space: 'O(log n)' },
        when: 'In-place fast sort. Average best performance.',
        how: 'Pivot choose karo. Partition: pivot se chhote left, bade right. Recursively sort.',
        ds: 'In-place partition — O(1) extra',
        questions: [
          { num: 912, title: 'Sort an Array' },
          { num: 215, title: 'Kth Largest (QuickSelect)' },
        ],
      },
      {
        name: 'Heap Sort',
        complexity: { time: 'O(n log n)', space: 'O(1)' },
        when: 'O(1) space + O(n log n) guaranteed (no worst case like Quick)',
        how: 'Max-heap banao O(n). Root = max. Swap root with last. Heapify remaining. Repeat.',
        ds: 'In-place max-heap on array',
        questions: [
          { num: 912, title: 'Sort an Array' },
        ],
      },
      {
        name: 'Counting Sort / Radix Sort',
        complexity: { time: 'O(n + k)', space: 'O(k)' },
        when: 'Values bounded range mein hain (e.g., 0–100). O(n) possible.',
        how: 'Har value ki count rakho. Cumulative count se position nikalo. Stable output.',
        ds: 'Count array size k',
        questions: [
          { num: 75, title: 'Sort Colors (Dutch Flag)' },
          { num: 164, title: 'Maximum Gap' },
        ],
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function AlgorithmsPage() {
  const [activePattern, setActivePattern] = useState<string | null>(null);
  const [expandedAlgo, setExpandedAlgo] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const filtered = ALGO_DATA.filter(p =>
    !filter || p.pattern.toLowerCase().includes(filter.toLowerCase()) ||
    p.algorithms.some(a => a.name.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Header */}
      <div style={{ padding: '20px 28px 0', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--tx-1)', margin: '0 0 6px' }}>
          ⚡ Algorithms Master Reference
        </h1>
        <p style={{ fontSize: 13, color: 'var(--tx-3)', margin: '0 0 16px' }}>
          Pattern → Algorithm Type → LeetCode Questions — sirf yahi yaad rakho, LeetCode master ho jao
        </p>

        {/* Key insight box */}
        <div style={{ padding: '12px 16px', background: 'var(--accent-bg)', borderRadius: 10, border: '1px solid var(--accent-bdr)', marginBottom: 16, fontSize: 13, color: 'var(--tx-1)', lineHeight: 1.7 }}>
          💡 <strong>The Key:</strong> LeetCode pe 2000+ problems hain par sirf ~8 patterns hain. Pattern pehchano → sahi algorithm lagao → question solve ho jata hai.
          Input/Output/Constraints dekho → Pattern decide karo → Type identify karo → Question solve!
        </div>

        {/* Search */}
        <input value={filter} onChange={e => setFilter(e.target.value)}
          placeholder="Search pattern ya algorithm..."
          style={{ marginBottom: 16, padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 13, width: 300 }} />
      </div>

      <div style={{ padding: '20px 28px', maxWidth: 1100 }}>
        {filtered.map(pat => (
          <PatternBlock key={pat.id} pat={pat} expandedAlgo={expandedAlgo} setExpandedAlgo={setExpandedAlgo} />
        ))}
      </div>
    </div>
  );
}

function PatternBlock({ pat, expandedAlgo, setExpandedAlgo }: {
  pat: typeof ALGO_DATA[0];
  expandedAlgo: string | null;
  setExpandedAlgo: (k: string | null) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ marginBottom: 24, borderRadius: 16, border: `1px solid ${pat.color}40`, overflow: 'hidden', background: 'var(--bg-surface)' }}>
      {/* Pattern Header */}
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', padding: '18px 22px', background: `${pat.color}10`, border: 'none',
        cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 16, textAlign: 'left',
      }}>
        <span style={{ fontSize: 32, flexShrink: 0 }}>{pat.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 19, fontWeight: 900, color: pat.color }}>{pat.pattern}</span>
            <span style={{ fontSize: 12, padding: '2px 10px', borderRadius: 12, background: pat.color + '20', color: pat.color, border: `1px solid ${pat.color}40`, fontWeight: 700 }}>
              {pat.algorithms.length} types
            </span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--tx-2)', marginBottom: 8 }}>{pat.description}</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 12, color: 'var(--tx-3)' }}>
              <strong style={{ color: pat.color }}>Kab lagao:</strong> {pat.when.join(' | ')}
            </div>
          </div>
        </div>
        {open ? <ChevronUp size={18} color={pat.color} /> : <ChevronDown size={18} color={pat.color} />}
      </button>

      {/* Signals Row */}
      {open && (
        <div style={{ padding: '12px 22px', background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-4)', marginBottom: 6 }}>📥 INPUT SIGNALS</div>
            {pat.input_signals.map((s, i) => (
              <div key={i} style={{ fontSize: 12, color: 'var(--tx-2)', display: 'flex', gap: 6, marginBottom: 3 }}>
                <span style={{ color: pat.color }}>•</span>{s}
              </div>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-4)', marginBottom: 6 }}>📤 OUTPUT SIGNALS</div>
            {pat.output_signals.map((s, i) => (
              <div key={i} style={{ fontSize: 12, color: 'var(--tx-2)', display: 'flex', gap: 6, marginBottom: 3 }}>
                <span style={{ color: pat.color }}>•</span>{s}
              </div>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-4)', marginBottom: 6 }}>⚡ CONSTRAINT CLUE</div>
            <div style={{ fontSize: 12, color: pat.color, fontWeight: 600, fontFamily: 'monospace', lineHeight: 1.5 }}>{pat.constraint_clue}</div>
          </div>
        </div>
      )}

      {/* Algorithm Types */}
      {open && (
        <div style={{ padding: '14px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {pat.algorithms.map((algo, ai) => {
            const key = `${pat.id}-${ai}`;
            const isOpen = expandedAlgo === key;
            return (
              <div key={ai} style={{ borderRadius: 12, border: `1px solid ${isOpen ? pat.color + '50' : 'var(--border)'}`, overflow: 'hidden', transition: 'border-color 0.2s', background: 'var(--bg-base)' }}>
                <button onClick={() => setExpandedAlgo(isOpen ? null : key)} style={{
                  width: '100%', padding: '12px 16px', background: isOpen ? `${pat.color}08` : 'transparent',
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: pat.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--tx-1)' }}>{algo.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--tx-3)', marginTop: 2 }}>{algo.when}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontFamily: 'monospace', color: pat.color, fontWeight: 700, padding: '2px 8px', background: pat.color + '15', borderRadius: 6, border: `1px solid ${pat.color}30` }}>
                      T:{algo.complexity.time}
                    </span>
                    <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--tx-3)', padding: '2px 8px', background: 'var(--bg-elevated)', borderRadius: 6, border: '1px solid var(--border)' }}>
                      S:{algo.complexity.space}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--tx-4)', padding: '2px 8px', background: 'var(--bg-elevated)', borderRadius: 6, border: '1px solid var(--border)', whiteSpace: 'nowrap' }}>
                      {algo.questions.length} questions
                    </span>
                    {isOpen ? <ChevronUp size={14} color="var(--tx-3)" /> : <ChevronDown size={14} color="var(--tx-3)" />}
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ height: 1, background: `${pat.color}25`, margin: '0 0 14px' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                      <div style={{ padding: '10px 14px', background: `${pat.color}08`, borderRadius: 10, border: `1px solid ${pat.color}25` }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 6 }}>🧠 KAISE KARO</div>
                        <div style={{ fontSize: 13, color: 'var(--tx-1)', lineHeight: 1.7 }}>{algo.how}</div>
                      </div>
                      <div style={{ padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 6 }}>🗂️ DATA STRUCTURE</div>
                        <div style={{ fontSize: 13, color: 'var(--tx-1)', fontWeight: 600, lineHeight: 1.6 }}>{algo.ds}</div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 8 }}>📋 LEETCODE QUESTIONS</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {algo.questions.map((q, qi) => (
                          <a key={qi}
                            href={`https://leetcode.com/problems/${q.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`}
                            target="_blank" rel="noopener"
                            style={{
                              padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                              background: pat.color + '12', color: pat.color,
                              border: `1px solid ${pat.color}35`, textDecoration: 'none',
                              display: 'inline-flex', gap: 6, alignItems: 'center',
                              transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = pat.color + '25'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = pat.color + '12'; }}
                          >
                            <span style={{ fontSize: 11, opacity: 0.7 }}>#{q.num}</span>
                            {q.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
