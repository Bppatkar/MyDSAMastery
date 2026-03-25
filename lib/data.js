// ─────────────────────────────────────────────────────────────
//  lib/data.js  — Single source of truth for ALL content
//  Every page imports from here. No duplication.
// ─────────────────────────────────────────────────────────────

// ── 1. Learning Sequence ─────────────────────────────────────
// Sequence matters. Prerequisites defined here.
export const SEQUENCE = [
  {
    id: "array",
    title: "Array",
    emoji: "🧱",
    color: "#22d3ee",
    prereqs: [],
    nextTopics: ["linked-list", "two-pointers", "sliding-window"],
    algoLinks: ["two-pointers", "binary-search", "prefix-sum"],
    note: "Yahan se shuru — sab kuch array pe hi build hota hai.",
    lcProblems: [
      { num: 1, title: "Two Sum" },
      { num: 26, title: "Remove Duplicates from Sorted Array" },
      { num: 53, title: "Maximum Subarray" },
      { num: 121, title: "Best Time to Buy and Sell Stock" },
      { num: 217, title: "Contains Duplicate" },
    ],
  },
  {
    id: "two-pointers",
    title: "Two Pointers",
    emoji: "👆👆",
    color: "#38bdf8",
    prereqs: ["array"],
    nextTopics: ["sliding-window", "fast-slow"],
    algoLinks: ["binary-search"],
    note: "Array sorted ho toh Two Pointers. Unsorted ho toh sort karo pehle ya HashMap.",
    lcProblems: [
      { num: 167, title: "Two Sum II - Input Array Is Sorted" },
      { num: 15, title: "3Sum" },
      { num: 11, title: "Container With Most Water" },
      { num: 125, title: "Valid Palindrome" },
      { num: 283, title: "Move Zeroes" },
    ],
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    emoji: "🪟",
    color: "#a78bfa",
    prereqs: ["array", "two-pointers"],
    nextTopics: ["hashmap", "prefix-sum"],
    algoLinks: ["deque-monotonic"],
    note: "Yeh window exist nahi karti — sirf left aur right indices hain. Two Pointers ka specialized version.",
    lcProblems: [
      { num: 3, title: "Longest Substring Without Repeating Characters" },
      { num: 76, title: "Minimum Window Substring" },
      { num: 239, title: "Sliding Window Maximum" },
      { num: 424, title: "Longest Repeating Character Replacement" },
      { num: 1004, title: "Max Consecutive Ones III" },
    ],
  },
  {
    id: "linked-list",
    title: "Linked List",
    emoji: "🔗",
    color: "#fb923c",
    prereqs: ["array"],
    nextTopics: ["stack", "fast-slow"],
    algoLinks: ["fast-slow"],
    note: "Array ka dynamic alternative. Random access nahi — pointer follow karo.",
    lcProblems: [
      { num: 206, title: "Reverse Linked List" },
      { num: 21, title: "Merge Two Sorted Lists" },
      { num: 19, title: "Remove Nth Node From End of List" },
      { num: 141, title: "Linked List Cycle" },
      { num: 143, title: "Reorder List" },
    ],
  },
  {
    id: "fast-slow",
    title: "Fast & Slow Pointers",
    emoji: "🐇🐢",
    color: "#818cf8",
    prereqs: ["linked-list", "two-pointers"],
    nextTopics: ["binary-search"],
    algoLinks: [],
    note: "Floyd's cycle detection. Circular track analogy — tez wala slow ko pakad leta hai.",
    lcProblems: [
      { num: 141, title: "Linked List Cycle" },
      { num: 142, title: "Linked List Cycle II" },
      { num: 876, title: "Middle of the Linked List" },
      { num: 287, title: "Find the Duplicate Number" },
      { num: 234, title: "Palindrome Linked List" },
    ],
  },
  {
    id: "stack",
    title: "Stack",
    emoji: "📚",
    color: "#6ee7b7",
    prereqs: ["array", "linked-list"],
    nextTopics: ["monotonic-stack", "queue"],
    algoLinks: ["monotonic-stack"],
    note: "LIFO. Browser back, undo, call stack — sab LIFO hain.",
    lcProblems: [
      { num: 20, title: "Valid Parentheses" },
      { num: 155, title: "Min Stack" },
      { num: 150, title: "Evaluate Reverse Polish Notation" },
      { num: 394, title: "Decode String" },
      { num: 739, title: "Daily Temperatures" },
    ],
  },
  {
    id: "queue",
    title: "Queue",
    emoji: "🚶",
    color: "#f43f5e",
    prereqs: ["array", "linked-list"],
    nextTopics: ["bfs"],
    algoLinks: ["bfs", "topo-sort"],
    note: "FIFO. BFS ka backbone. Level-by-level traverse = Queue.",
    lcProblems: [
      { num: 232, title: "Implement Queue using Stacks" },
      { num: 225, title: "Implement Stack using Queues" },
      { num: 622, title: "Design Circular Queue" },
      { num: 933, title: "Number of Recent Calls" },
    ],
  },
  {
    id: "hashmap",
    title: "Hash Table",
    emoji: "🗂️",
    color: "#fbbf24",
    prereqs: ["array"],
    nextTopics: ["prefix-sum", "trie"],
    algoLinks: ["prefix-sum"],
    note: "O(1) lookup. Complement pattern (Two Sum), frequency count, grouping.",
    lcProblems: [
      { num: 1, title: "Two Sum" },
      { num: 49, title: "Group Anagrams" },
      { num: 347, title: "Top K Frequent Elements" },
      { num: 128, title: "Longest Consecutive Sequence" },
      { num: 242, title: "Valid Anagram" },
    ],
  },
  {
    id: "prefix-sum",
    title: "Prefix Sum",
    emoji: "📊",
    color: "#fb7185",
    prereqs: ["array", "hashmap"],
    nextTopics: ["dp-1d"],
    algoLinks: [],
    note: "Range sum O(1) mein. prefixSum[r] - prefixSum[l-1]. Negative numbers ke saath bhi kaam karta hai.",
    lcProblems: [
      { num: 303, title: "Range Sum Query - Immutable" },
      { num: 560, title: "Subarray Sum Equals K" },
      { num: 525, title: "Contiguous Array" },
      { num: 974, title: "Subarray Sums Divisible by K" },
      { num: 1480, title: "Running Sum of 1d Array" },
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    emoji: "🎯",
    color: "#34d399",
    prereqs: ["array"],
    nextTopics: ["dp-1d", "heap"],
    algoLinks: [],
    note: "Sorted ya monotonic → half karo. O(n) → O(log n). 'Minimize max' type = answer pe binary search.",
    lcProblems: [
      { num: 704, title: "Binary Search" },
      { num: 33, title: "Search in Rotated Sorted Array" },
      { num: 34, title: "Find First and Last Position of Element" },
      { num: 875, title: "Koko Eating Bananas" },
      { num: 1011, title: "Capacity To Ship Packages Within D Days" },
    ],
  },
  {
    id: "monotonic-stack",
    title: "Monotonic Stack",
    emoji: "🥞",
    color: "#fb923c",
    prereqs: ["stack", "array"],
    nextTopics: ["dp-1d"],
    algoLinks: ["deque-monotonic"],
    note: "Next greater/smaller = decreasing/increasing stack. Stack mein unresolved elements wait karte hain.",
    lcProblems: [
      { num: 739, title: "Daily Temperatures" },
      { num: 496, title: "Next Greater Element I" },
      { num: 84, title: "Largest Rectangle in Histogram" },
      { num: 42, title: "Trapping Rain Water" },
      { num: 907, title: "Sum of Subarray Minimums" },
    ],
  },
  {
    id: "bst",
    title: "BST / AVL Tree",
    emoji: "🌳",
    color: "#10b981",
    prereqs: ["array", "hashmap"],
    nextTopics: ["heap", "dp-2d"],
    algoLinks: ["dfs"],
    note: "Sorted + dynamic. Inorder = sorted output. Unbalanced worst case O(n) → AVL fixes it.",
    lcProblems: [
      { num: 98, title: "Validate Binary Search Tree" },
      { num: 235, title: "Lowest Common Ancestor of BST" },
      { num: 108, title: "Convert Sorted Array to BST" },
      { num: 450, title: "Delete Node in a BST" },
      { num: 230, title: "Kth Smallest Element in a BST" },
    ],
  },
  {
    id: "heap",
    title: "Heap / Priority Queue",
    emoji: "🏔️",
    color: "#e879f9",
    prereqs: ["array", "binary-search"],
    nextTopics: ["dp-1d", "graph"],
    algoLinks: ["dijkstra"],
    note: "Root = always max/min. Top-K = min-heap size K. Two heaps = median. O(1) peek.",
    lcProblems: [
      { num: 215, title: "Kth Largest Element in an Array" },
      { num: 347, title: "Top K Frequent Elements" },
      { num: 295, title: "Find Median from Data Stream" },
      { num: 23, title: "Merge k Sorted Lists" },
      { num: 621, title: "Task Scheduler" },
    ],
  },
  {
    id: "graph",
    title: "Graph + BFS/DFS",
    emoji: "🕸️",
    color: "#c084fc",
    prereqs: ["queue", "stack", "hashmap"],
    nextTopics: ["topo-sort", "union-find"],
    algoLinks: ["bfs", "dfs", "dijkstra"],
    note: "BFS = ripple (shortest unweighted). DFS = deep dive. Multi-source BFS = sab sources ek saath.",
    lcProblems: [
      { num: 200, title: "Number of Islands" },
      { num: 994, title: "Rotting Oranges" },
      { num: 133, title: "Clone Graph" },
      { num: 417, title: "Pacific Atlantic Water Flow" },
      { num: 127, title: "Word Ladder" },
    ],
  },
  {
    id: "topo-sort",
    title: "Topological Sort",
    emoji: "📋",
    color: "#67e8f9",
    prereqs: ["graph", "queue"],
    nextTopics: ["dp-2d"],
    algoLinks: ["topo-sort"],
    note: "DAG only. In-degree 0 = ready. Cycle → processed < n.",
    lcProblems: [
      { num: 207, title: "Course Schedule" },
      { num: 210, title: "Course Schedule II" },
      { num: 310, title: "Minimum Height Trees" },
      { num: 269, title: "Alien Dictionary" },
      { num: 444, title: "Sequence Reconstruction" },
    ],
  },
  {
    id: "union-find",
    title: "Union-Find (DSU)",
    emoji: "🤝",
    color: "#4ade80",
    prereqs: ["graph"],
    nextTopics: [],
    algoLinks: [],
    note: "Components + connectivity. Path compression + rank = O(α(n)) ≈ O(1).",
    lcProblems: [
      { num: 684, title: "Redundant Connection" },
      { num: 547, title: "Number of Provinces" },
      { num: 721, title: "Accounts Merge" },
      { num: 130, title: "Surrounded Regions" },
      { num: 990, title: "Satisfiability of Equality Equations" },
    ],
  },
  {
    id: "dp-1d",
    title: "DP — 1D",
    emoji: "🔄",
    color: "#fbbf24",
    prereqs: ["array", "hashmap"],
    nextTopics: ["dp-2d", "backtracking"],
    algoLinks: [],
    note: "dp[i] depends on dp[i-1] ya dp[i-2]. Fibonacci, House Robber, Climbing Stairs pattern.",
    lcProblems: [
      { num: 70, title: "Climbing Stairs" },
      { num: 198, title: "House Robber" },
      { num: 322, title: "Coin Change" },
      { num: 300, title: "Longest Increasing Subsequence" },
      { num: 139, title: "Word Break" },
    ],
  },
  {
    id: "dp-2d",
    title: "DP — 2D / Knapsack",
    emoji: "🔲",
    color: "#f59e0b",
    prereqs: ["dp-1d"],
    nextTopics: ["backtracking"],
    algoLinks: [],
    note: "dp[i][j] = neighbors se. 0/1 Knapsack: backward traverse. Unbounded: forward.",
    lcProblems: [
      { num: 62, title: "Unique Paths" },
      { num: 1143, title: "Longest Common Subsequence" },
      { num: 416, title: "Partition Equal Subset Sum" },
      { num: 72, title: "Edit Distance" },
      { num: 518, title: "Coin Change II" },
    ],
  },
  {
    id: "backtracking",
    title: "Backtracking",
    emoji: "🔙",
    color: "#fb7185",
    prereqs: ["dp-1d"],
    nextTopics: [],
    algoLinks: [],
    note: "CHOOSE → EXPLORE → UNCHOOSE. Output = list of lists → backtracking. n ≤ 20.",
    lcProblems: [
      { num: 78, title: "Subsets" },
      { num: 46, title: "Permutations" },
      { num: 39, title: "Combination Sum" },
      { num: 79, title: "Word Search" },
      { num: 51, title: "N-Queens" },
    ],
  },
  {
    id: "trie",
    title: "Trie (Prefix Tree)",
    emoji: "🔤",
    color: "#f43f5e",
    prereqs: ["hashmap", "dfs"],
    nextTopics: [],
    algoLinks: ["dfs"],
    note: "char-by-char tree. O(L) operations. Keywords: prefix, autocomplete, starts with.",
    lcProblems: [
      { num: 208, title: "Implement Trie (Prefix Tree)" },
      { num: 211, title: "Design Add and Search Words Data Structure" },
      { num: 212, title: "Word Search II" },
      { num: 648, title: "Replace Words" },
      { num: 1268, title: "Search Suggestions System" },
    ],
  },
];

// ── 2. Pattern Rules (reasoning chains) ─────────────────────
// Imported by /patterns page ONLY. Other pages link to /patterns.
export const PATTERN_RULES = [
  {
    id: "sw-deque-max",
    topicId: "sliding-window",
    trigger: "Array + window + max/min chahiye",
    keywords: ["sliding window maximum", "max in window", "min in window"],
    example: "LC 239: Sliding Window Maximum",
    catColor: "#22d3ee",
    chain: [
      {
        piece: "Sliding Window",
        color: "#22d3ee",
        why: "Continuous subarray (window) move karti hai. Nested loop O(n²) → window O(n).",
        detail: "right badhao = expand. window size > k toh left badhao = shrink. Dono combined n moves.",
        notThis: "Simple max variable nahi chalega — jab left se element nikle, naya max unknown without O(k) rescan.",
      },
      {
        piece: "Deque (Double-Ended Queue)",
        color: "#a78bfa",
        why: "Window ka current max O(1) chahiye. Front = hamesha current window ka max index.",
        detail: "Indices store karo. Left se shrink → front ka index window se bahar? Remove. Right se expand → back se chhote pop karo.",
        notThis: "Min-Heap O(log k) per op. Deque O(1) amortized — har element sirf ek baar add, ek baar remove.",
      },
      {
        piece: "Deque DECREASING (max ke liye)",
        color: "#34d399",
        why: "Max chahiye → back se saare chhote pop karo. Woh kabhi future ka max nahi ban sakte jab naya bada element window mein hai.",
        detail: "arr=[3,1,2]: 2 aaya → 1 pop karo (1 < 2, aur 2 baad mein aaya). Deque: [3,2]. Front=3 (max).",
        notThis: "Increasing → front chhota = min track. Max ke liye decreasing zaroori.",
        code: `function maxSlidingWindow(nums, k) {
  const dq = [];      // indices, values decreasing order mein
  const result = [];

  for (let r = 0; r < nums.length; r++) {

    // 1. Stale front remove karo (window se bahar gaya)
    while (dq.length && dq[0] < r - k + 1) {
      dq.shift();
    }

    // 2. Back se chhote pop karo (woh kabhi max nahi banenge)
    while (dq.length && nums[dq[dq.length - 1]] < nums[r]) {
      dq.pop();
    }

    dq.push(r);

    // 3. Window complete hone ke baad result record karo
    if (r >= k - 1) {
      result.push(nums[dq[0]]);   // front = current window max
    }
  }

  return result;
}

// Trace: nums = [3, 1, 3, 1, 2, 3], k = 3
// r=0: dq=[0(3)]
// r=1: 1<3, dq=[0,1]
// r=2: 3>=1 pop, 3>=3 pop, dq=[2(3)], result=[3]
// r=3: 1<3, dq=[2,3], result=[3,3]
// r=4: 2>1 pop, dq=[2,4], result=[3,3,3]
// r=5: 3>=2 pop, 3>=3 pop, dq=[5(3)], result=[3,3,3,3]`,
      },
    ],
    timeSpace: "O(n) time | O(k) space",
    relatedLc: [239, 1438, 862, 480],
  },
  {
    id: "sw-sum-hashmap",
    topicId: "prefix-sum",
    trigger: "Array + subarray sum = k (negative numbers bhi)",
    keywords: ["subarray sum equals k", "count subarrays", "prefix sum hashmap"],
    example: "LC 560: Subarray Sum Equals K",
    catColor: "#fb923c",
    chain: [
      {
        piece: "Prefix Sum",
        color: "#fb923c",
        why: "Range sum [l..r] = prefixSum[r+1] - prefixSum[l]. O(n) build, O(1) query.",
        detail: "sum[l..r] = k means prefixSum[j] - prefixSum[i] = k, i.e. prefixSum[i] = prefixSum[j] - k.",
        notThis: "Variable sliding window nahi — negative numbers se shrink decision galat ho jaata hai.",
      },
      {
        piece: "HashMap (prefix → count)",
        color: "#fbbf24",
        why: "Har j pe: need = currentSum - k. HashMap mein pehle wale prefix counts hain → O(1) check.",
        detail: "Map mein {prefixSum: count} store. need mila → count += map[need]. Initialize {0:1} → pura prefix valid ho toh.",
        notThis: "Sorted array + binary search: negative numbers ke saath monotonic nahi.",
        code: `function subarraySum(nums, k) {
  const prefixCount = new Map([[0, 1]]);
  // {0:1} kyun? Agar sum khud hi k ho → need=0 → 1 baar milna chahiye

  let sum = 0, count = 0;

  for (const num of nums) {
    sum += num;

    const need = sum - k;
    count += prefixCount.get(need) || 0;

    prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
  }

  return count;
}`,
      },
    ],
    timeSpace: "O(n) time | O(n) space",
    relatedLc: [560, 525, 974, 1248],
  },
  {
    id: "mono-stack-next-greater",
    topicId: "monotonic-stack",
    trigger: "Array + next greater/smaller element",
    keywords: ["next greater element", "next smaller", "daily temperatures", "previous greater"],
    example: "LC 739: Daily Temperatures",
    catColor: "#fb923c",
    chain: [
      {
        piece: "Stack (LIFO)",
        color: "#818cf8",
        why: "Pichle unresolved elements wait karte hain. Jab answer milta hai (bada element aaya) → pop karo.",
        detail: "Stack mein indices. Current > stack top → pop, result[top] = current - top (distance).",
        notThis: "Brute force: har element ke liye aage scan O(n²). Stack O(n) — har element ek push, ek pop.",
      },
      {
        piece: "DECREASING Monotonic Stack",
        color: "#fb923c",
        why: "Next GREATER ke liye: stack decreasing rakho. Naya bada aaya → saare chhote ka answer mil gaya.",
        detail: "[5,3,1] stack mein, 4 aaya: 1<4 pop (ans=4), 3<4 pop (ans=4), 5>4 ruko. Stack: [5,4].",
        notThis: "Increasing stack → next SMALLER ke liye. Max/min problem ke hisaab se order choose karo.",
        code: `function dailyTemperatures(temps) {
  const result = new Array(temps.length).fill(0);
  const stack = [];    // indices, temperatures decreasing order mein

  for (let i = 0; i < temps.length; i++) {

    // Jab current > top → top ka 'next warmer day' mil gaya
    while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = i - idx;
    }

    stack.push(i);
  }

  // Stack mein jo bache = koi warmer day nahi → result = 0 (default)
  return result;
}

// Trace: temps = [73, 74, 75, 71, 72, 76]
// i=0: stack=[0(73)]
// i=1: 74>73 → pop 0, result[0]=1. stack=[1(74)]
// i=2: 75>74 → pop 1, result[1]=1. stack=[2(75)]
// i=3: 71<75. stack=[2,3]
// i=4: 72>71 → pop 3, result[3]=1. 72<75. stack=[2,4]
// i=5: 76>72 → pop 4, result[4]=1. 76>75 → pop 2, result[2]=3.`,
      },
    ],
    timeSpace: "O(n) time | O(n) space",
    relatedLc: [739, 496, 503, 84, 85],
  },
  {
    id: "mono-stack-histogram",
    topicId: "monotonic-stack",
    trigger: "Array + largest rectangle / maximum area in histogram",
    keywords: ["largest rectangle histogram", "maximal rectangle", "max area"],
    example: "LC 84: Largest Rectangle in Histogram",
    catColor: "#fb923c",
    chain: [
      {
        piece: "INCREASING Monotonic Stack",
        color: "#fb923c",
        why: "Rectangle tab tak extend ho sakti hai jab bars same ya bade hon. Chhota bar (barrier) aaya → pichle bade bars ki rectangles khatam. Area calculate karo.",
        detail: "Stack mein increasing heights ke indices. heights[i] < stack.top → pop, area = h × width.",
        notThis: "Decreasing → min track karta. Is problem mein max area chahiye jo barrier se bounded ho.",
        code: `function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;

  // Sentinel 0 daalo — end pe sab flush ho jaayein
  const h = [...heights, 0];

  for (let i = 0; i < h.length; i++) {

    while (stack.length && h[i] < h[stack[stack.length - 1]]) {
      const height = h[stack.pop()];
      const width  = stack.length
        ? i - stack[stack.length - 1] - 1
        : i;
      maxArea = Math.max(maxArea, height * width);
    }

    stack.push(i);
  }

  return maxArea;
}

// Sentinel 0 kyun?
// Bina sentinel: kuch elements stack mein reh jaate unprocessed
// 0 daalo → sab heights > 0 hain → sab pop ho jaate hain`,
      },
    ],
    timeSpace: "O(n) time | O(n) space",
    relatedLc: [84, 85, 42],
  },
  {
    id: "binary-search-answer",
    topicId: "binary-search",
    trigger: "'Minimize maximum' ya 'maximize minimum' type",
    keywords: ["minimize maximum", "maximize minimum", "minimum speed", "capacity"],
    example: "LC 875: Koko Eating Bananas",
    catColor: "#34d399",
    chain: [
      {
        piece: "Binary Search on Answer Space",
        color: "#34d399",
        why: "Answer ek range [lo, hi] mein hai. canAchieve(X) monotonic hai — X badhao toh reliably true/false shift. Toh answer pe binary search karo.",
        detail: "Koko: speed badhao → time ghatata (monotonic). Answer space [1, max_pile]. O(n log max) vs linear O(n × max).",
        notThis: "Direct answer calculate karna hard. Range enumerate karna slow. Binary search = O(log) factor.",
      },
      {
        piece: "Feasibility Check Function",
        color: "#22d3ee",
        why: "canAchieve(X) banao — O(n). Binary search isko O(log max) baar call karta hai.",
        detail: "Function MONOTONIC hona chahiye: X feasible → X+1 bhi feasible. Template: if feasible → hi=mid (try smaller). else → lo=mid+1.",
        code: `function minEatingSpeed(piles, h) {
  let lo = 1;
  let hi = Math.max(...piles);    // answer range: [1, max pile]

  while (lo < hi) {
    const mid = (lo + hi) >> 1;

    if (canFinish(piles, h, mid)) {
      hi = mid;          // possible hai, try even smaller
    } else {
      lo = mid + 1;      // nahi ho sakta, need bigger speed
    }
  }

  return lo;
}

function canFinish(piles, h, speed) {
  return piles.reduce(
    (total, pile) => total + Math.ceil(pile / speed),
    0
  ) <= h;
}

// lo < hi (not lo <= hi) kyun?
// Exact answer dhundh rahe hain — lo===hi pe converge
// lo <= hi se infinite loop possible agar hi = mid set na karein`,
      },
    ],
    timeSpace: "O(n log max) time | O(1) space",
    relatedLc: [875, 1011, 410, 1482, 2064],
  },
  {
    id: "dp-knapsack-01",
    topicId: "dp-2d",
    trigger: "Items include/exclude each once + optimize",
    keywords: ["0/1 knapsack", "subset sum", "partition equal", "include exclude once"],
    example: "LC 416: Partition Equal Subset Sum",
    catColor: "#fbbf24",
    chain: [
      {
        piece: "0/1 Knapsack DP",
        color: "#fbbf24",
        why: "Har item ek baar ya zero baar. dp[w] = capacity w mein possible hai ya nahi. Choice: lo ya mat lo.",
        detail: "dp[w] = dp[w] (mat lo) OR dp[w-num] (lo, agar w >= num). Greedy fail karta — heavy item lo, valuable chhota miss.",
        notThis: "Unbounded Knapsack (same item multiple times) = forward traverse. 0/1 = backward.",
      },
      {
        piece: "BACKWARD traverse (reuse prevent)",
        color: "#fb923c",
        why: "1D array mein forward jaane se same item dobara use ho jaata (dp[w-num] already current item include kar chuka). Backward = pichli state use hoti.",
        detail: "Forward: dp[3] update, phir dp[6] bhi same item se → reuse. Backward: dp[6] update karte waqt dp[3] abhi purani state mein.",
        code: `function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;

  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;    // 0 sum hamesha possible (koi item mat lo)

  for (const num of nums) {

    // BACKWARD — same item dobara use na ho
    for (let w = target; w >= num; w--) {
      dp[w] = dp[w] || dp[w - num];
      //       ↑ mat lo    ↑ lo (kya w-num se possible tha?)
    }
  }

  return dp[target];
}

// Forward kyun galat?
// num=3, dp[3]=true. Phir w=6: dp[6] = dp[3] (already updated) → num=3 TWICE
// Backward: w=6 pehle, dp[3] abhi old state mein → safe`,
      },
    ],
    timeSpace: "O(n×W) time | O(W) space",
    relatedLc: [416, 494, 1049, 474, 518],
  },
  {
    id: "multi-source-bfs",
    topicId: "graph",
    trigger: "Grid + multiple starting points + shortest distance from any source",
    keywords: ["multi-source bfs", "rotting oranges", "01 matrix", "nearest cell"],
    example: "LC 994: Rotting Oranges",
    catColor: "#c084fc",
    chain: [
      {
        piece: "Multi-Source BFS",
        color: "#34d399",
        why: "Multiple sources hain. Ek ek se BFS = O(sources × grid). Sab sources ek saath queue mein = ek BFS = O(grid).",
        detail: "Level 0 = sab sources. Level 1 = unke neighbors. Level N = N steps mein reachable. Min time = total levels.",
        notThis: "DFS shortest distance nahi deta. Single-source BFS har source se alag = slow.",
        code: `function orangesRotting(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const queue = [];
  let fresh = 0;

  // Step 1: Sab rotten sources ek saath queue mein
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) queue.push([i, j, 0]);
      if (grid[i][j] === 1) fresh++;
    }
  }

  const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
  let maxTime = 0;

  // Step 2: BFS — level by level propagate
  while (queue.length) {
    const [r, c, time] = queue.shift();

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
      if (grid[nr][nc] !== 1) continue;

      grid[nr][nc] = 2;
      fresh--;
      maxTime = Math.max(maxTime, time + 1);
      queue.push([nr, nc, time + 1]);
    }
  }

  return fresh === 0 ? maxTime : -1;
}`,
      },
    ],
    timeSpace: "O(m×n) time | O(m×n) space",
    relatedLc: [994, 542, 1162, 1765],
  },
  {
    id: "topo-kahn",
    topicId: "topo-sort",
    trigger: "Directed graph + dependencies + ordering / cycle detect",
    keywords: ["course schedule", "prerequisites", "task order", "topological"],
    example: "LC 207: Course Schedule",
    catColor: "#67e8f9",
    chain: [
      {
        piece: "In-degree Array",
        color: "#67e8f9",
        why: "in-degree[i] = kitni dependencies hain. in-degree=0 → koi prerequisite nahi → pehle process karo.",
        detail: "Process hone ke baad neighbors ka in-degree--. Agar 0 → woh bhi ready.",
        notThis: "DFS bhi kaam karta (reverse postorder) but cycle detection Kahn's mein easier.",
      },
      {
        piece: "Queue (BFS Kahn's)",
        color: "#34d399",
        why: "in-degree=0 wale → queue mein. Process → neighbors update → naye ready nodes queue mein. Count track karo.",
        detail: "processed < n at end → cycle tha (kuch nodes in-degree kabhi 0 nahi hue = circular dependency).",
        code: `function canFinish(n, prerequisites) {
  const inDeg  = new Array(n).fill(0);
  const graph  = Array.from({ length: n }, () => []);

  for (const [course, pre] of prerequisites) {
    graph[pre].push(course);
    inDeg[course]++;
  }

  // Queue: sab in-degree=0 nodes (no prerequisites)
  const queue = [];
  for (let i = 0; i < n; i++) {
    if (inDeg[i] === 0) queue.push(i);
  }

  let processed = 0;

  while (queue.length) {
    const node = queue.shift();
    processed++;

    for (const next of graph[node]) {
      inDeg[next]--;
      if (inDeg[next] === 0) queue.push(next);
    }
  }

  // Agar cycle tha → kuch nodes queue mein kabhi nahi aaye
  return processed === n;
}`,
      },
    ],
    timeSpace: "O(V+E) time | O(V+E) space",
    relatedLc: [207, 210, 310, 269, 444],
  },
  {
    id: "union-find-dsu",
    topicId: "union-find",
    trigger: "Dynamic connectivity / components / cycle in undirected graph",
    keywords: ["connected components", "redundant connection", "accounts merge", "grouping"],
    example: "LC 684: Redundant Connection",
    catColor: "#4ade80",
    chain: [
      {
        piece: "Union-Find with Path Compression",
        color: "#4ade80",
        why: "Dynamic edges pe connectivity track karna. find(x) = root. union(x,y) = connect roots. Path compression = future finds O(1).",
        detail: "Path compression: find(x) mein har node ko directly root pe point karo. Union by rank: chhota tree bade ke neeche.",
        notThis: "DFS/BFS static graph ke liye. Dynamic edges (ek ek aate hain) ke liye UF better. O(α(n)) ≈ O(1).",
        code: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank   = new Array(n).fill(0);
    this.count  = n;
  }

  find(x) {
    // Path compression: x ko seedha root pe point karo
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const px = this.find(x);
    const py = this.find(y);

    if (px === py) return false;    // already connected → CYCLE!

    // Union by rank: chhota tree bade ke neeche
    if      (this.rank[px] < this.rank[py]) this.parent[px] = py;
    else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
    else    { this.parent[py] = px; this.rank[px]++; }

    this.count--;
    return true;
  }
}

function findRedundantConnection(edges) {
  const uf = new UnionFind(edges.length + 1);

  for (const [u, v] of edges) {
    if (!uf.union(u, v)) return [u, v];  // already connected = redundant!
  }
}`,
      },
    ],
    timeSpace: "O(α(n)) ≈ O(1) per op | O(n) space",
    relatedLc: [684, 547, 721, 130, 990],
  },
];

// ── 3. Algorithm Components ──────────────────────────────────
// What pieces does each algorithm need and WHY
export const ALGO_COMPONENTS = {
  "two-pointers": {
    title: "Two Pointers",
    components: [
      {
        name: "2 index variables (left, right)",
        why: "Movement track karne ke liye. Sirf variables — no extra DS.",
        variant: "Opposite ends (sorted) | Same direction (in-place) | Fast-Slow (cycle)",
      },
      {
        name: "Movement logic (sorted array pe)",
        why: "sum < target → left++ (bada chahiye). sum > target → right-- (chhota chahiye). Sorted property guarantee karta ki yeh decision sahi hai.",
        variant: "Always: dono kabhi ek doosre se aage nahi jaate → O(n) guaranteed",
      },
    ],
  },
  "sliding-window": {
    title: "Sliding Window",
    components: [
      {
        name: "left pointer (window start)",
        why: "Window ki left boundary. Constraint toote toh aage badhao.",
        variant: "Kabhi right se aage nahi jaata",
      },
      {
        name: "right pointer (explorer)",
        why: "Window expand karta hai. Har element exactly ek baar add hota hai.",
        variant: "Kabhi peeche nahi jaata",
      },
      {
        name: "Window state tracker (Set/Map/Counter)",
        why: "Current window mein kya hai — O(1) check. Duplicate? Frequency? Distinct count?",
        variant: "Set → existence | Map → frequency | Array[26] → char freq",
      },
    ],
  },
  "binary-search": {
    title: "Binary Search",
    components: [
      {
        name: "lo, hi (search boundaries)",
        why: "Current search space. lo=0, hi=n-1 (value search) ya lo=minAns, hi=maxAns (answer search).",
        variant: "Exact: lo<=hi. Boundary/Answer: lo<hi",
      },
      {
        name: "mid = lo + (hi-lo)/2",
        why: "(lo+hi)/2 overflow deta hai jab lo,hi bade hoon. Right shift >>1 faster.",
        variant: "Hamesha overflow-safe formula use karo",
      },
      {
        name: "Feasibility check (answer search mein)",
        why: "canAchieve(mid) — O(n) check. Monotonic hona chahiye.",
        variant: "Feasible → hi=mid. Not feasible → lo=mid+1",
      },
    ],
  },
  "bfs": {
    title: "BFS",
    components: [
      {
        name: "Queue",
        why: "FIFO = level-by-level. First level ke sab nodes process, phir second level. Shortest path guaranteed.",
        variant: "Array as queue (shift) ya proper deque",
      },
      {
        name: "Visited Set / Visited Grid",
        why: "Cycle avoid karo. Same node baar baar process na ho.",
        variant: "Set (graph) | Grid cell ko modify karo (in-place visited mark)",
      },
      {
        name: "Level counter (jab distance chahiye)",
        why: "BFS mein ek 'round' = ek level = ek step distance. Level count = minimum distance.",
        variant: "Queue.length at start of each level = us level ke nodes",
      },
    ],
  },
  "dfs": {
    title: "DFS",
    components: [
      {
        name: "Recursion stack (ya explicit Stack)",
        why: "Deep jaana hai — recursion natural DFS karta hai. Iterative: explicit Stack use karo.",
        variant: "Recursion → O(n) call stack. Iterative → O(n) space stack",
      },
      {
        name: "Visited tracking",
        why: "Graph mein cycle avoid. Tree mein usually needed nahi (parent se wapas nahi jaate).",
        variant: "Boolean array | Set | Color array (white/gray/black for cycle)",
      },
    ],
  },
  "dp": {
    title: "Dynamic Programming",
    components: [
      {
        name: "dp table (1D ya 2D array)",
        why: "Subproblem results store karo. dp[i] = optimal solution for input of size i.",
        variant: "1D: dp[i] prev states pe. 2D: dp[i][j] 2 variables pe.",
      },
      {
        name: "Base cases",
        why: "Recursion ka ruk ne ka condition. dp[0], dp[1] manually set karo.",
        variant: "Galat base case → poora DP galat",
      },
      {
        name: "Recurrence relation",
        why: "dp[i] kaise nikalta hai dp[i-1] se? Yeh hi algorithm ka core hai.",
        variant: "dp[i] = max(dp[i-1], dp[i-2]+nums[i]) (House Robber)",
      },
      {
        name: "Traversal direction",
        why: "0/1 Knapsack: backward (reuse prevent). Unbounded: forward. Standard 1D: forward.",
        variant: "Galat direction → item reuse ya missing cases",
      },
    ],
  },
};

// ── 4. Question → Pattern thinking cues ─────────────────────
// What should COME TO MIND when you read a problem
export const THINKING_CUES = [
  {
    cue: "\"subarray\" + \"continuous\" + constraint",
    mindShouldSay: "Sliding window. Continuous = window. Constraint = shrink condition. Expand right, shrink left.",
    followup: "Max/min in window? → Deque bhi chahiye.",
    patternId: "sw-deque-max",
  },
  {
    cue: "\"sorted array\" + pairs/triplets",
    mindShouldSay: "Two Pointers. Sorted → left se chhota, right se bada. Sum adjust karo by moving pointers.",
    followup: "Unsorted hai? Pehle sort karo — O(n log n) acceptable hai?",
    patternId: null,
  },
  {
    cue: "\"next greater\" / \"next smaller\" / \"previous\"",
    mindShouldSay: "Monotonic Stack. Unresolved elements stack mein wait karte hain. Next greater → decreasing stack.",
    followup: "Decreasing = next greater. Increasing = next smaller.",
    patternId: "mono-stack-next-greater",
  },
  {
    cue: "\"k largest\" / \"top k\" / \"kth element\"",
    mindShouldSay: "Heap. Min-heap of size K. Heap[0] = Kth largest. O(n log k) — much better than sort O(n log n) when k << n.",
    followup: "Median? → Two heaps (max-heap lower half, min-heap upper half).",
    patternId: null,
  },
  {
    cue: "\"all subsets\" / \"all combinations\" / \"all permutations\"",
    mindShouldSay: "Output = list of lists → Backtracking. CHOOSE-EXPLORE-UNCHOOSE. n ≤ 20 confirm karo.",
    followup: "Count of ways? → DP better (no enumerate needed).",
    patternId: null,
  },
  {
    cue: "\"minimize maximum\" / \"maximize minimum\"",
    mindShouldSay: "Binary Search on Answer. Answer range [lo, hi]. canAchieve(X) monotonic hai? → Binary search.",
    followup: "Feasibility check O(n). Total: O(n log range).",
    patternId: "binary-search-answer",
  },
  {
    cue: "\"cycle\" in linked list / graph",
    mindShouldSay: "Fast-Slow (Floyd's) for LL. DFS with color for directed graph. Union-Find for undirected.",
    followup: "Cycle entry point? → Phase 2 of Floyd's.",
    patternId: "union-find-dsu",
  },
  {
    cue: "\"dependencies\" / \"prerequisites\" / \"order of tasks\"",
    mindShouldSay: "Topological Sort (Kahn's BFS). In-degree=0 → ready. Cycle → impossible.",
    followup: "Directed graph only. Undirected cycle → Union-Find.",
    patternId: "topo-kahn",
  },
  {
    cue: "\"number of ways\" / \"count paths\" / \"how many\"",
    mindShouldSay: "DP (counting). Same recursion as optimization but count instead of max/min.",
    followup: "Don't enumerate (backtracking O(2^n)). DP = O(n) or O(n²).",
    patternId: null,
  },
  {
    cue: "\"connected components\" / \"groups\" / \"union\"",
    mindShouldSay: "Union-Find (dynamic edges) ya DFS/BFS (static graph). UF = O(α(n)) per query.",
    followup: "Dynamic edges aate ja rahe hain? → UF. Static graph? → BFS/DFS simpler.",
    patternId: "union-find-dsu",
  },
];
