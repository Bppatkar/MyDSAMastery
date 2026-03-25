"use client";
import { useState } from "react";

// ─── Deep Reasoning Chains ───────────────────────────────────
// Each rule: trigger → pattern chain → WHY each piece
const ruleBook = [
  {
    id: "sw-max-min",
    category: "Sliding Window",
    catColor: "#22d3ee",
    trigger: "Array + window + max/min chahiye",
    keywords: ["sliding window maximum", "max in window", "min in window", "deque window"],
    example: "LeetCode 239: Sliding Window Maximum — window of size k mein har position pe max nikalo.",
    chain: [
      {
        step: 1,
        piece: "Sliding Window",
        color: "#22d3ee",
        why: "Continuous subarray (window) hai aur window move karti hai — ek baar pura scan O(n). Nested loop O(n²) avoid karo.",
        detail: "Right pointer badhta jaata hai (window expand). Jab window size > k, left pointer badhta hai (shrink). Yeh combination ek O(n) pass deta hai.",
        notThis: "Sirf simple variable max = Math.max(max, arr[right]) se kaam nahi chalega — jab left se element nikalta hai, hum nahi jaante naya max kya hai bina O(k) rescan ke.",
      },
      {
        step: 2,
        piece: "Deque (Double-Ended Queue)",
        color: "#a78bfa",
        why: "Window mein current max/min O(1) mein chahiye. Normal variable se nahi milta. Deque se front = current window ka max/min milta hai.",
        detail: "Deque mein indices store karte hain. Front = window ka max index. Jab window left se shrink ho, front index valid na rahe toh remove. Jab right se expand ho, back se chhote/bade elements remove karo.",
        notThis: "Min-Heap bhi use kar sakte, lekin O(log k) per operation. Deque O(1) amortized — har element sirf ek baar add aur ek baar remove hota hai.",
      },
      {
        step: 3,
        piece: "Deque DECREASING order (max ke liye)",
        color: "#34d399",
        why: "Max chahiye toh deque mein bade se chhote ki taraf maintain karo. Jab naya element aaye, back se saare chhote elements pop karo — woh kabhi future ka max nahi ban sakte jab tak naya element window mein hai.",
        detail: "Kyun chhote ko pop karein? Agar arr = [3, 1, 2] aur naya element 2 aaya. 1 kabhi max nahi banega jab tak 2 window mein hai aur 2 baad mein aaya. Toh 1 useless hai — pop karo. Deque: [3, 2]. Front = 3 (current max).",
        notThis: "Increasing order maintain karne se front chhota element hoga — min ke liye useful, max ke liye nahi.",
        code: `// Sliding Window Maximum — Decreasing Deque
function maxSlidingWindow(nums, k) {
  const dq = [];   // indices store karo, values decreasing
  const result = [];
  
  for (let r = 0; r < nums.length; r++) {
    // Window se bahar gaye indices remove karo (front se)
    while (dq.length && dq[0] < r - k + 1) dq.shift();
    
    // Back se saare chhote elements pop karo (woh kabhi max nahi banenege)
    while (dq.length && nums[dq[dq.length-1]] < nums[r]) dq.pop();
    
    dq.push(r);
    
    // Window ban gayi (r >= k-1)
    if (r >= k - 1) result.push(nums[dq[0]]);  // front = max
  }
  return result;
}

// Trace: nums=[3,1,3,1,2,3], k=3
// r=0: dq=[0]
// r=1: 1<3, dq=[0,1]  
// r=2: 3>=1,3>=3 pop; dq=[2], result=[3]
// r=3: 1<3, dq=[2,3], result=[3,3]
// r=4: 2>1 pop; dq=[2,4], result=[3,3,3]
// r=5: 3>=2,3>=3 pop; dq=[5], result=[3,3,3,3]`,
      },
    ],
    timeSpace: "Time: O(n) | Space: O(k)",
    leetcode: [239, 1438, 862],
  },
  {
    id: "sw-sum",
    category: "Sliding Window",
    catColor: "#22d3ee",
    trigger: "Array + subarray + sum = target",
    keywords: ["subarray sum equals k", "range sum", "prefix sum", "contiguous sum"],
    example: "LeetCode 560: Subarray Sum Equals K — kitne subarrays ka sum = k hai?",
    chain: [
      {
        step: 1,
        piece: "Prefix Sum",
        color: "#fb923c",
        why: "Range sum [l..r] = prefixSum[r+1] - prefixSum[l]. O(n) preprocessing mein har range ka sum O(1) mein milta hai.",
        detail: "prefixSum[i] = arr[0]+arr[1]+...+arr[i-1]. Toh arr[l..r] sum = prefixSum[r+1] - prefixSum[l].",
        notThis: "Sliding Window (expand/shrink) tab kaam karta hai jab sab elements positive hon — negative elements se window shrink karne ka decision galat ho jaata hai.",
      },
      {
        step: 2,
        piece: "HashMap (prefix → count)",
        color: "#fbbf24",
        why: "prefixSum[j] - prefixSum[i] = k means prefixSum[i] = prefixSum[j] - k. Toh pichli prefix sums ka complement check karo.",
        detail: "Har index j pe: need = prefixSum[j] - k. Agar need HashMap mein hai → kitne subarrays end at j with sum k. HashMap mein current prefix count store karo.",
        notThis: "Sorted array + binary search se bhi kar sakte lekin negative numbers pe kaam nahi karta as-is.",
        code: `// Subarray Sum Equals K — Prefix Sum + HashMap
function subarraySum(nums, k) {
  const prefixCount = new Map([[0, 1]]);  // sum=0 ek baar already hua
  let sum = 0, count = 0;
  
  for (const num of nums) {
    sum += num;
    
    // sum - k pehle kab aaya? woh subarray valid hai
    const need = sum - k;
    count += prefixCount.get(need) || 0;
    
    prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
  }
  return count;
}

// Why Map([[0,1]])? 
// Agar sum khud hi k ho (pura prefix valid) → need = 0 → 1 baar milna chahiye`,
      },
    ],
    timeSpace: "Time: O(n) | Space: O(n)",
    leetcode: [560, 525, 974],
  },
  {
    id: "sw-no-repeat",
    category: "Sliding Window",
    catColor: "#22d3ee",
    trigger: "String/Array + longest subarray/substring + constraint (no repeat, at most K)",
    keywords: ["longest substring without repeating", "at most k distinct", "no duplicate", "longest no repeat"],
    example: "LeetCode 3: Longest Substring Without Repeating Characters.",
    chain: [
      {
        step: 1,
        piece: "Variable Sliding Window",
        color: "#22d3ee",
        why: "Longest cheez chahiye + constraint + continuous = variable window. Right expand karo, constraint toote toh left badhao.",
        detail: "left = window start. right = explorer. Har valid window pe result update karo. right kabhi peeche nahi jaata + left kabhi right se aage nahi — total 2n moves → O(n).",
        notThis: "Fixed window nahi kyunki size pehle se pata nahi.",
      },
      {
        step: 2,
        piece: "HashMap / Set (window state track)",
        color: "#fbbf24",
        why: "Current window mein koi char hai ya nahi — O(1) check chahiye. Set/HashMap window ke current state ko O(1) mein maintain karta hai.",
        detail: "Char add karo jab right expand karo. Char remove karo jab left shrink karo. Set.has() = O(1) duplicate check.",
        notThis: "Array of 26 bhi use kar sakte for lowercase English — O(1) space instead of O(n).",
        code: `// Longest Substring Without Repeating — Variable Window + Set
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0, maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    // Shrink: jab tak s[right] duplicate hai
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    
    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

// Trace: s = "abcba"
// r=0: add 'a', window=[a], max=1
// r=1: add 'b', window=[a,b], max=2  
// r=2: add 'c', window=[a,b,c], max=3
// r=3: 'b' repeat! shrink: remove 'a', remove 'b', add 'b'. window=[c,b], max=3
// r=4: 'a' not in set, add. window=[c,b,a], max=3 ✅`,
      },
    ],
    timeSpace: "Time: O(n) | Space: O(min(n, charset))",
    leetcode: [3, 159, 340],
  },
  {
    id: "mono-stack-next-greater",
    category: "Monotonic Stack",
    catColor: "#fb923c",
    trigger: "Array + next greater element / next smaller / previous greater",
    keywords: ["next greater element", "next smaller", "daily temperatures", "previous greater"],
    example: "LeetCode 739: Daily Temperatures — kitne days baad temperature warm hoga?",
    chain: [
      {
        step: 1,
        piece: "Stack (LIFO)",
        color: "#818cf8",
        why: "Pichle unresolved elements yaad rakhne hain — jo elements ka answer abhi nahi mila. Jab answer milta hai (current element bada/chhota), stack se pop karo.",
        detail: "Indices stack mein daalo. Jab current element > stack ka top element → top ka 'next greater' mil gaya = current. Pop karo, result update karo.",
        notThis: "Brute force: har element ke liye aage scan karo — O(n²). Stack se O(n) — har element sirf ek baar push aur ek baar pop.",
      },
      {
        step: 2,
        piece: "DECREASING Monotonic Stack (next greater ke liye)",
        color: "#fb923c",
        why: "Stack mein hamesha decreasing order maintain karo. Jab naya bada element aaye, sab chhote pop ho jaate hain — unka next greater = naya element.",
        detail: "Kyun decreasing? Kyunki agar stack mein [5, 3, 1] hai aur naya element 4 aaya — 1 ka next greater = 4 (pop). 3 ka next greater = 4 (pop). 5 > 4 toh 5 abhi bhi unresolved (raho stack mein). Stack: [5, 4].",
        notThis: "Increasing stack next SMALLER ke liye hota — chhote pop hote hain jab aur chhota aaye.",
        code: `// Daily Temperatures — Decreasing Monotonic Stack
function dailyTemperatures(temps) {
  const result = new Array(temps.length).fill(0);
  const stack = [];  // indices, temperatures decreasing
  
  for (let i = 0; i < temps.length; i++) {
    // Jab current temp > stack top temp → top ka answer mila
    while (stack.length && temps[i] > temps[stack[stack.length-1]]) {
      const idx = stack.pop();
      result[idx] = i - idx;  // kitne din baad
    }
    stack.push(i);
  }
  // Stack mein jo bache = koi warmer day nahi → result[idx] = 0 (default)
  return result;
}

// Trace: temps = [73, 74, 75, 71, 72, 76]
// i=0: stack=[0(73)]
// i=1: 74>73, pop 0 → result[0]=1. stack=[1(74)]
// i=2: 75>74, pop 1 → result[1]=1. stack=[2(75)]
// i=3: 71<75. stack=[2(75),3(71)]
// i=4: 72>71, pop 3 → result[3]=1. 72<75. stack=[2(75),4(72)]
// i=5: 76>72 pop 4→result[4]=1. 76>75 pop 2→result[2]=3. stack=[5]`,
      },
    ],
    timeSpace: "Time: O(n) | Space: O(n)",
    leetcode: [739, 496, 503, 84, 85],
  },
  {
    id: "mono-stack-histogram",
    category: "Monotonic Stack",
    catColor: "#fb923c",
    trigger: "Array + largest rectangle / maximum area",
    keywords: ["largest rectangle histogram", "maximal rectangle", "trapping rain water"],
    example: "LeetCode 84: Largest Rectangle in Histogram.",
    chain: [
      {
        step: 1,
        piece: "INCREASING Monotonic Stack",
        color: "#fb923c",
        why: "Rectangle extend ho sakti hai jab tak bars ek hi height ya usse bade hon. Jab chhota bar aaye (barrier) — pichle bade bars ki rectangles khatam hoti hain. Unka area calculate karo.",
        detail: "Stack mein increasing heights ke indices rakho. Jab heights[i] < heights[stack.top] → stack pop karo, area nikalo: width = i - stack.new_top - 1, height = popped bar ki height.",
        notThis: "Decreasing stack se min track karte — is problem mein hum max area chahte hain jo barrier se bounded ho.",
        code: `// Largest Rectangle in Histogram — Increasing Stack
function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  heights = [...heights, 0];  // sentinel: end pe 0 daalo, sab flush ho jaayein
  
  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[i] < heights[stack[stack.length-1]]) {
      const h = heights[stack.pop()];
      const w = stack.length ? i - stack[stack.length-1] - 1 : i;
      maxArea = Math.max(maxArea, h * w);
    }
    stack.push(i);
  }
  return maxArea;
}

// Why sentinel (0 at end)?
// Bina sentinel: stack mein kuch elements reh jaate hain unprocessed
// 0 daalo toh sab elements pop ho jaate hain at i=n`,
      },
    ],
    timeSpace: "Time: O(n) | Space: O(n)",
    leetcode: [84, 85, 42],
  },
  {
    id: "two-ptr-sorted",
    category: "Two Pointers",
    catColor: "#38bdf8",
    trigger: "Sorted array + pairs ka sum/difference find karo",
    keywords: ["two sum sorted", "pair with target sum", "3sum", "sorted pairs"],
    example: "LeetCode 167: Two Sum II — Sorted array mein pair dhundho.",
    chain: [
      {
        step: 1,
        piece: "Opposite Ends Two Pointers",
        color: "#38bdf8",
        why: "Array sorted hai — bada element right pe, chhota left pe. Sum bada → right pointer left shift (chhota element). Sum chhota → left pointer right shift (bada element). Ek decision mein ek pointer move → O(n).",
        detail: "left=0, right=n-1. Combined pointer movements ≤ n (dono kabhi ek doosre se aage nahi jaate) → O(n).",
        notThis: "HashMap bhi O(n) hai lekin O(n) extra space. Sorted array ka faida uthaao — O(1) space.",
        code: `// Two Sum II — Opposite Ends
function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target)       return [left+1, right+1];
    else if (sum < target)    left++;   // sum chhota → left badhao (bada chahiye)
    else                      right--;  // sum bada → right ghataao (chhota chahiye)
  }
}

// Why works?
// Agar sum < target: right fix rakhke left badhana hi ek option — 
//   right ghataane se sum aur chhota hoga (sorted array!)
// Agar sum > target: left fix rakhke right ghataana — 
//   left badhane se sum aur bada hoga`,
      },
    ],
    timeSpace: "Time: O(n) | Space: O(1)",
    leetcode: [167, 15, 16, 18],
  },
  {
    id: "fast-slow-cycle",
    category: "Two Pointers (Fast-Slow)",
    catColor: "#818cf8",
    trigger: "Linked List + cycle detect / middle find",
    keywords: ["linked list cycle", "detect cycle", "middle of linked list", "floyd's algorithm"],
    example: "LeetCode 141/142: Detect cycle, LeetCode 876: Middle of Linked List.",
    chain: [
      {
        step: 1,
        piece: "Fast-Slow Pointers (Floyd's Algorithm)",
        color: "#818cf8",
        why: "Cycle hai toh fast (2 steps) aur slow (1 step) zaroor milenge — jaise circular track pe ek tez runner aur ek dheera, tez wala eventually pakad leta hai. No cycle → fast end pe pahunchega.",
        detail: "Fast = 2 steps, Slow = 1 step. Agar cycle length = C, slow cycle mein enter karne ke baad fast C steps mein slow ko pakad leta hai.",
        notThis: "HashSet se visited nodes track karo — O(n) space. Floyd's O(1) space.",
        code: `// Cycle Detection — Floyd's Algorithm
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;        // 1 step
    fast = fast.next.next;   // 2 steps
    if (slow === fast) return true;  // cycle mein mile!
  }
  return false;  // fast null pe pahuncha = no cycle
}

// Cycle Entry Point find karo (LC 142):
// Phase 1: slow-fast milne tak chalao
// Phase 2: ek pointer head pe, ek meeting point pe — dono 1 step. 
//          Jahan milein = cycle entry!

// Middle of LL:
// Fast end pe → Slow middle pe hoga
function findMiddle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;  // even length: second middle; odd: exact middle
}`,
      },
    ],
    timeSpace: "Time: O(n) | Space: O(1)",
    leetcode: [141, 142, 876, 287],
  },
  {
    id: "binary-search-answer",
    category: "Binary Search",
    catColor: "#a78bfa",
    trigger: "'Minimize maximum' ya 'maximize minimum' type problem",
    keywords: ["minimize maximum", "maximize minimum", "minimum speed", "capacity", "koko bananas"],
    example: "LeetCode 875: Koko Eating Bananas — minimum speed kya ho?",
    chain: [
      {
        step: 1,
        piece: "Binary Search on Answer Space",
        color: "#a78bfa",
        why: "Answer ek range [lo, hi] mein hai. 'Kya answer = X possible hai?' check function monotonic hai — X badhao toh 'possible' reliably true ya false hota hai. Isliye answer pe binary search karo.",
        detail: "Koko problem: speed badhao toh time ghatata hai (monotonic). Speed X mein kaafi time? → try smaller. Nahi? → need bigger speed. Answer space [1, max_pile] pe binary search → O(n log max).",
        notThis: "Linear scan answer space pe = O(n × max_pile). Binary search = O(n log max_pile).",
      },
      {
        step: 2,
        piece: "Feasibility Check Function",
        color: "#34d399",
        why: "canAchieve(X) function banao jo check kare — 'Kya answer X ho sakta hai?' Yeh function O(n) mein run karo, binary search O(log max) baar call karta hai.",
        detail: "Function monotonic hona chahiye: agar X feasible hai, toh X+1 bhi feasible. Agar X nahi, toh X-1 bhi nahi.",
        code: `// Binary Search on Answer — Template
function minEatingSpeed(piles, h) {
  // Answer range: [1, max(piles)]
  let lo = 1, hi = Math.max(...piles);
  
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    
    // Feasibility check: kya speed=mid se h hours mein sab kha sakte?
    if (canFinish(piles, h, mid)) {
      hi = mid;      // possible hai, try smaller speed
    } else {
      lo = mid + 1;  // possible nahi, need bigger speed
    }
  }
  return lo;
}

function canFinish(piles, h, speed) {
  return piles.reduce((total, pile) => total + Math.ceil(pile / speed), 0) <= h;
}

// Why lo < r (not lo <= r)?
// Hum exact value dhundh rahe hain, lo==hi pe answer milta hai
// lo <= r infinite loop bana sakta hai agar hi=mid nahi kiya

// Pattern identify kaise karein?
// "Minimum X such that condition(X) is true"
// "Maximum X such that condition(X) is true"  
// → Binary Search on Answer`,
      },
    ],
    timeSpace: "Time: O(n log max) | Space: O(1)",
    leetcode: [875, 1011, 410, 1482],
  },
  {
    id: "dp-knapsack-01",
    category: "Dynamic Programming",
    catColor: "#fbbf24",
    trigger: "Array + include/exclude each item + optimize value/count",
    keywords: ["knapsack", "subset sum", "partition equal", "0/1 include exclude"],
    example: "LeetCode 416: Partition Equal Subset Sum.",
    chain: [
      {
        step: 1,
        piece: "0/1 Knapsack DP",
        color: "#fbbf24",
        why: "Har item ek baar ya zero baar. State: dp[i][w] = i items dekh ke, w capacity mein max value. Choice: item i lo (dp[i-1][w-wi]+vi) ya mat lo (dp[i-1][w]).",
        detail: "dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i]). O(n×W) time aur space.",
        notThis: "Greedy (highest value/weight ratio) fail karta hai — heavy item lo, valuable chhota item miss ho.",
      },
      {
        step: 2,
        piece: "Traverse Weight BACKWARDS (reuse prevent)",
        color: "#fb923c",
        why: "1D dp array mein agar forward traverse karein, same item dobara use ho jaata hai (Unbounded Knapsack). 0/1 mein ek baar use — isliye W se 0 tak traverse karo.",
        detail: "dp[w] = dp[w-weight[i]] use karta hai left side se. Agar forward jaayein, dp[w-weight[i]] already current item include kar chuka hoga (same item dobara). Backward jaane se pichli state (item i se pehle) use hoti hai.",
        code: `// 0/1 Knapsack — 1D DP, Backward Traverse
function canPartition(nums) {
  const sum = nums.reduce((a,b) => a+b, 0);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;
  
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;  // 0 sum hamesha possible (koi item mat lo)
  
  for (const num of nums) {
    // BACKWARD traverse — same item dobara use na ho
    for (let w = target; w >= num; w--) {
      dp[w] = dp[w] || dp[w - num];
      //        ^ mat lo  ^ lo (w-num se possible tha?)
    }
  }
  return dp[target];
}

// Why backward?
// Agar forward: w=3 update hoga num=3 se, phir w=6 bhi num=3 se
//   dp[6] = dp[3] which was ALREADY updated with num=3 → same item TWICE
// Backward: w=6 update hota num=3 se, dp[3] abhi purani state mein → safe`,
      },
    ],
    timeSpace: "Time: O(n×W) | Space: O(W)",
    leetcode: [416, 494, 1049, 474],
  },
  {
    id: "bfs-multi-source",
    category: "BFS",
    catColor: "#34d399",
    trigger: "Grid + multiple starting points + shortest distance",
    keywords: ["multi-source bfs", "rotting oranges", "01 matrix", "nearest zero"],
    example: "LeetCode 994: Rotting Oranges — minimum time mein saare orange rot hon.",
    chain: [
      {
        step: 1,
        piece: "Multi-Source BFS",
        color: "#34d399",
        why: "Multiple sources hain (saari rotten oranges). Ek ek se BFS karna O(n² × m²) hoga. Multi-source: SARI sources ek saath queue mein daalo, ek hi BFS. Level = time steps.",
        detail: "Sab starting sources (rotten oranges) ek saath level 0 pe queue mein. Level 1 = unke neighbors. Level 2 = level 1 ke neighbors. Minimum time = total BFS levels.",
        notThis: "DFS yahan kaam nahi — shortest distance nahi deta. Single-source BFS har rotten orange se separate — O(R × n × m) where R = rotten count.",
        code: `// Rotting Oranges — Multi-Source BFS
function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  const queue = [];
  let fresh = 0;
  
  // Step 1: Sab rotten oranges ek saath queue mein daalo
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) queue.push([i, j, 0]);  // [row, col, time]
      if (grid[i][j] === 1) fresh++;
    }
  
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let maxTime = 0;
  
  // Step 2: BFS — level by level propagate
  while (queue.length) {
    const [r, c, time] = queue.shift();
    
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= m || nc < 0 || nc >= n || grid[nr][nc] !== 1) continue;
      
      grid[nr][nc] = 2;  // rot ho gaya
      fresh--;
      maxTime = Math.max(maxTime, time + 1);
      queue.push([nr, nc, time + 1]);
    }
  }
  
  return fresh === 0 ? maxTime : -1;
}

// Why time saath track karte hain?
// Alternatively: BFS levels count karo — har level = 1 minute`,
      },
    ],
    timeSpace: "Time: O(m×n) | Space: O(m×n)",
    leetcode: [994, 542, 1162],
  },
  {
    id: "topo-sort-deps",
    category: "Topological Sort",
    catColor: "#e879f9",
    trigger: "Directed graph + dependencies + ordering / cycle detect",
    keywords: ["course schedule", "prerequisites", "task ordering", "dependency", "topological"],
    example: "LeetCode 207: Course Schedule — saare courses complete ho sakte hain?",
    chain: [
      {
        step: 1,
        piece: "In-degree Array",
        color: "#e879f9",
        why: "Kaunse nodes pe koi dependency nahi (in-degree = 0)? Wahi pehle process ho sakte hain. Jab ek node process ho, uske neighbors ka in-degree ghataao.",
        detail: "in-degree[i] = kitne edges i pe aate hain. In-degree 0 = koi prerequisite nahi = seedha start karo. Jab process karein, neighbors ka in-degree-- → agar 0 ho jaaye → woh bhi ready.",
        notThis: "DFS bhi kaam karta (reverse postorder), lekin Kahn's (BFS) mein cycle detection easy — processed nodes ≠ total nodes → cycle hai.",
      },
      {
        step: 2,
        piece: "Queue (BFS Kahn's Algorithm)",
        color: "#34d399",
        why: "In-degree 0 wale nodes queue mein. Process karo, neighbors update karo, naye in-degree-0 nodes queue mein. FIFO order valid topo order deta hai.",
        detail: "Queue = current batch of doable tasks. Jab sab process ho jaayein, count check karo — count < n → cycle tha → impossible.",
        code: `// Course Schedule — Kahn's BFS Topological Sort
function canFinish(n, prerequisites) {
  const inDeg = new Array(n).fill(0);
  const graph = Array.from({length: n}, () => []);
  
  // Graph banao + in-degree count
  for (const [course, pre] of prerequisites) {
    graph[pre].push(course);  // pre → course
    inDeg[course]++;
  }
  
  // Queue mein sab in-degree=0 nodes
  const queue = [];
  for (let i = 0; i < n; i++)
    if (inDeg[i] === 0) queue.push(i);
  
  let processed = 0;
  while (queue.length) {
    const node = queue.shift();
    processed++;
    
    for (const next of graph[node]) {
      inDeg[next]--;
      if (inDeg[next] === 0) queue.push(next);  // ab yeh bhi ready
    }
  }
  
  // Agar cycle tha → kuch nodes in-degree kabhi 0 nahi hue → processed < n
  return processed === n;
}

// Cycle detect kaise?
// Cycle mein nodes ka in-degree kabhi 0 nahi hota (circular dependency)
// Isliye wo queue mein kabhi nahi aate → processed < n`,
      },
    ],
    timeSpace: "Time: O(V+E) | Space: O(V+E)",
    leetcode: [207, 210, 310, 269],
  },
  {
    id: "union-find",
    category: "Union-Find (DSU)",
    catColor: "#4ade80",
    trigger: "Graph + connected components / cycle / grouping",
    keywords: ["connected components", "number of islands union", "redundant connection", "accounts merge"],
    example: "LeetCode 684: Redundant Connection — extra edge dhundho.",
    chain: [
      {
        step: 1,
        piece: "Union-Find with Path Compression",
        color: "#4ade80",
        why: "Components track karna + union efficiently. find(x) = root dhundho (path compress karo). union(x,y) = dono ke roots connect karo.",
        detail: "Path Compression: find(x) mein har node ko directly root pe point karo — future finds O(1) near-constant. Union by Rank: chhote tree ko bade ke neeche lagao — tree flat rehta hai.",
        notThis: "DFS/BFS se bhi components dhundh sakte — but Union-Find dynamic edges ke liye better. Har union O(α(n)) ≈ O(1).",
        code: `// Union-Find with Path Compression + Rank
class UnionFind {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.count = n;  // components count
  }
  
  find(x) {
    // Path Compression: x ko directly root pe point karo
    if (this.parent[x] !== x)
      this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  
  union(x, y) {
    const px = this.find(x), py = this.find(y);
    if (px === py) return false;  // already same component — CYCLE!
    
    // Union by Rank: chhota tree bade ke neeche
    if (this.rank[px] < this.rank[py]) this.parent[px] = py;
    else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
    else { this.parent[py] = px; this.rank[px]++; }
    
    this.count--;
    return true;
  }
}

// Redundant Connection
function findRedundantConnection(edges) {
  const uf = new UnionFind(edges.length + 1);
  
  for (const [u, v] of edges) {
    if (!uf.union(u, v)) return [u, v];  // already connected = redundant!
  }
}`,
      },
    ],
    timeSpace: "Time: O(α(n)) per op ≈ O(1) | Space: O(n)",
    leetcode: [684, 547, 721, 990],
  },
];

// ── Category grouping ──────────────────────────────────────
const categories = [...new Set(ruleBook.map(r => r.category))];
const catColors = {};
ruleBook.forEach(r => { catColors[r.category] = r.catColor; });

function ReasonChain({ chain }) {
  const [expanded, setExpanded] = useState({});

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      {chain.map((step, i) => {
        const isOpen = expanded[i] !== false; // default open
        return (
          <div key={i}>
            {/* Connector line */}
            {i > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 0 4px 20px" }}>
                <div style={{ width: "2px", height: "28px", background: `${step.color}40`, marginLeft: "9px" }} />
                <span style={{ fontSize: "11px", color: "var(--text-3)", fontStyle: "italic" }}>
                  isliye chahiye ↓
                </span>
              </div>
            )}

            {/* Step card */}
            <div style={{ border: `1px solid ${step.color}30`, borderRadius: "12px", overflow: "hidden", background: "var(--bg-surface)" }}>
              {/* Step header */}
              <button onClick={() => setExpanded(p => ({ ...p, [i]: !isOpen }))} style={{
                width: "100%", padding: "14px 18px", background: `${step.color}08`,
                border: "none", cursor: "pointer", display: "flex", alignItems: "center",
                gap: "12px", textAlign: "left",
              }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "8px", background: step.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: "#04081a", flexShrink: 0 }}>
                  {step.step}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: step.color }}>{step.piece}</span>
                </div>
                <span style={{ fontSize: "14px", color: "var(--text-3)", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
              </button>

              {/* Step body */}
              {isOpen && (
                <div style={{ padding: "16px 18px", borderTop: `1px solid ${step.color}20` }}>
                  {/* Why */}
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: step.color, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>✅ Kyu Yeh?</div>
                    <p style={{ fontSize: "13px", color: "var(--text-1)", lineHeight: 1.7, fontWeight: 500 }}>{step.why}</p>
                  </div>

                  {/* Detail */}
                  <div style={{ marginBottom: step.notThis || step.code ? "12px" : 0 }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>🧠 Deep Detail</div>
                    <p style={{ fontSize: "12.5px", color: "var(--text-2)", lineHeight: 1.7 }}>{step.detail}</p>
                  </div>

                  {/* Not This */}
                  {step.notThis && (
                    <div style={{ background: "rgba(251,113,133,0.06)", borderRadius: "8px", padding: "10px 14px", marginBottom: step.code ? "12px" : 0, border: "1px solid rgba(251,113,133,0.15)" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#fb7185" }}>❌ Yeh Kyun Nahi? </span>
                      <span style={{ fontSize: "12px", color: "var(--text-2)" }}>{step.notThis}</span>
                    </div>
                  )}

                  {/* Code */}
                  {step.code && (
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>💻 Code + Trace</div>
                      <pre style={{
                        background: "var(--bg-base)", borderRadius: "10px", padding: "16px",
                        fontSize: "11.5px", color: "var(--text-2)", overflowX: "auto",
                        lineHeight: 1.75, border: `1px solid ${step.color}20`,
                        fontFamily: "'Fira Code', monospace",
                      }}>{step.code}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RuleCard({ rule }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ background: "var(--bg-card)", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)" }}>
      {/* Card header — always visible */}
      <button onClick={() => setOpen(p => !p)} style={{
        width: "100%", padding: "20px 24px", background: "transparent",
        border: "none", cursor: "pointer", textAlign: "left",
        display: "flex", alignItems: "flex-start", gap: "16px",
      }}>
        {/* Category badge */}
        <span style={{
          padding: "4px 12px", borderRadius: "8px", fontSize: "11px", fontWeight: 700,
          background: `${rule.catColor}15`, color: rule.catColor,
          border: `1px solid ${rule.catColor}25`, flexShrink: 0, marginTop: "2px",
        }}>{rule.category}</span>

        <div style={{ flex: 1 }}>
          {/* Trigger */}
          <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-1)", marginBottom: "6px" }}>
            {rule.trigger}
          </div>
          {/* Keywords */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {rule.keywords.map(k => (
              <span key={k} style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "5px", background: "var(--bg-elevated)", color: "var(--text-3)", fontStyle: "italic" }}>"{k}"</span>
            ))}
          </div>
        </div>

        {/* Expand icon */}
        <div style={{ flexShrink: 0, width: "30px", height: "30px", borderRadius: "8px", background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", color: "var(--text-3)" }}>▾</div>
      </button>

      {/* Expandable content */}
      {open && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "20px 24px" }}>
          {/* Example */}
          <div style={{ background: `${rule.catColor}08`, borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", border: `1px solid ${rule.catColor}20` }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: rule.catColor }}>📌 Example: </span>
            <span style={{ fontSize: "13px", color: "var(--text-2)" }}>{rule.example}</span>
          </div>

          {/* Reasoning Chain */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "14px" }}>
              🔗 Reasoning Chain — Kyu kya choose kiya
            </div>
            <ReasonChain chain={rule.chain} />
          </div>

          {/* Complexity + LC */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
            <code style={{ fontSize: "12px", padding: "5px 12px", borderRadius: "7px", background: `${rule.catColor}10`, color: rule.catColor, fontFamily: "'Fira Code', monospace" }}>
              {rule.timeSpace}
            </code>
            {rule.leetcode.map(n => (
              <a key={n} href={`https://leetcode.com/problems/`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", padding: "5px 12px", borderRadius: "7px", background: "var(--bg-elevated)", color: "var(--text-3)", border: "1px solid var(--border)", textDecoration: "none" }}>
                LC #{n}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Quick Reference Table ──────────────────────────────────
const quickRef = [
  { trigger: "Array + window + max/min", pattern: "Sliding Window", ds: "Deque (decreasing/increasing)", why: "O(1) window max — deque front = answer" },
  { trigger: "Array + window + sum = k", pattern: "Sliding Window / Prefix Sum", ds: "HashMap", why: "prefixSum[j] - k = complement, O(1) lookup" },
  { trigger: "String + longest no-repeat", pattern: "Sliding Window (variable)", ds: "Set / HashMap", why: "Duplicate O(1) check, window state" },
  { trigger: "Array + next greater/smaller", pattern: "Monotonic Stack", ds: "Stack (decreasing/increasing)", why: "LIFO — jab bada aaye, saare chhote pop" },
  { trigger: "Array + largest rectangle", pattern: "Monotonic Stack (increasing)", ds: "Stack (indices)", why: "Barrier pe area calculate, O(n)" },
  { trigger: "Sorted array + pair sum", pattern: "Two Pointers (opposite ends)", ds: "No extra DS", why: "Sort guarantee — smart pointer movement" },
  { trigger: "LL + cycle / middle", pattern: "Fast-Slow Pointers", ds: "No extra DS", why: "Floyd's — cycle mein dono milenge" },
  { trigger: "'Minimize max' / 'Maximize min'", pattern: "Binary Search on Answer", ds: "No extra DS", why: "Answer range monotonic — binary search" },
  { trigger: "Include/exclude + optimize", pattern: "0/1 Knapsack DP", ds: "1D/2D array", why: "Backward traverse prevents item reuse" },
  { trigger: "Grid + multiple sources + shortest", pattern: "Multi-Source BFS", ds: "Queue", why: "Sab sources queue mein — ek BFS, O(mn)" },
  { trigger: "Graph + dependencies + order", pattern: "Topological Sort (Kahn's)", ds: "Queue + in-degree array", why: "In-degree 0 = ready. Cycle → count < n" },
  { trigger: "Graph + components / cycle detect", pattern: "Union-Find (DSU)", ds: "Parent + rank arrays", why: "Path compression → O(α(n)) ≈ O(1)" },
];

export default function PatternsPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("detailed"); // "detailed" | "quick"

  const filtered = ruleBook.filter(r => {
    const matchCat = activeCat === "All" || r.category === activeCat;
    const matchSearch = !search || r.trigger.toLowerCase().includes(search.toLowerCase()) ||
      r.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "36px 24px" }}>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "clamp(24px,5vw,38px)", fontWeight: 900, marginBottom: "8px", color: "var(--text-1)" }}>
          📖 Pattern Rule Book
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-2)", maxWidth: "640px", lineHeight: 1.7 }}>
          Problem dekha → trigger identify karo → reasoning chain follow karo → <strong style={{ color: "var(--text-1)" }}>samjho kyun</strong> har piece is combination mein hai.
          Sirf "kya use karo" nahi — <strong style={{ color: "var(--text-1)" }}>kyun use karo</strong> aur <strong style={{ color: "var(--text-1)" }}>kyun woh specific order/variant</strong>.
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
        {/* View toggle */}
        <div style={{ display: "flex", gap: "4px", background: "var(--bg-elevated)", borderRadius: "9px", padding: "3px" }}>
          {[["detailed", "🔗 Deep Reasoning"], ["quick", "⚡ Quick Reference"]].map(([id, label]) => (
            <button key={id} onClick={() => setView(id)} style={{
              padding: "7px 16px", borderRadius: "7px", cursor: "pointer", fontSize: "12.5px", fontWeight: view===id ? 700 : 400,
              background: view===id ? "var(--bg-card)" : "transparent",
              color: view===id ? "var(--text-1)" : "var(--text-3)",
              border: view===id ? "1px solid var(--border)" : "1px solid transparent",
            }}>{label}</button>
          ))}
        </div>

        {/* Search */}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search trigger or keyword..."
          style={{ flex: 1, minWidth: "200px", padding: "8px 14px", borderRadius: "8px", background: "var(--bg-elevated)", color: "var(--text-1)", border: "1px solid var(--border)", fontSize: "13px" }} />

        {/* Category filter */}
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {["All", ...categories].map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} style={{
              padding: "6px 13px", borderRadius: "7px", cursor: "pointer", fontSize: "11.5px", fontWeight: activeCat===cat ? 700 : 400,
              background: activeCat===cat ? (catColors[cat] ? `${catColors[cat]}15` : "var(--bg-card)") : "var(--bg-elevated)",
              border: `1px solid ${activeCat===cat ? (catColors[cat]||"var(--accent-cyan)") : "transparent"}`,
              color: activeCat===cat ? (catColors[cat]||"var(--accent-cyan)") : "var(--text-3)",
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Quick Reference Table */}
      {view === "quick" && (
        <div style={{ background: "var(--bg-card)", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 200px 1fr", background: "var(--bg-surface)", padding: "12px 20px", borderBottom: "1px solid var(--border)" }}>
            {["Problem Trigger", "Pattern", "Data Structure", "Kyun?"].map(h => (
              <div key={h} style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</div>
            ))}
          </div>
          {quickRef.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 180px 200px 1fr", padding: "13px 20px", alignItems: "center", background: i%2===0 ? "var(--bg-card)" : "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: "12.5px", color: "var(--text-1)", paddingRight: "12px" }}>{r.trigger}</span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent-cyan)" }}>{r.pattern}</span>
              <code style={{ fontSize: "11.5px", color: "var(--accent-violet)", fontFamily: "'Fira Code', monospace" }}>{r.ds}</code>
              <span style={{ fontSize: "11.5px", color: "var(--text-3)", lineHeight: 1.5 }}>{r.why}</span>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Reasoning Cards */}
      {view === "detailed" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontSize: "12px", color: "var(--text-3)", marginBottom: "4px" }}>
            {filtered.length} patterns • Card pe click karo to expand reasoning chain
          </div>
          {filtered.map(rule => <RuleCard key={rule.id} rule={rule} />)}
        </div>
      )}
    </div>
  );
}
