export interface PatternQuestion {
  id: number;
  leetcodeNum: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  isClassic: boolean;
  frequency: number;
  leetcodeUrl: string;
}

export interface PatternData {
  id: string;
  name: string;
  slug: string;
  category: string;
  difficulty: string;
  icon: string;
  color: string;
  order: number;
  description: string;
  coreIdea?: string;
  whenToUse?: string[];
  triggers?: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
  examples?: string[];
  prerequisites?: string[];
  questions?: PatternQuestion[];
  template?: { python?: string; javascript?: string };
  totalQuestions?: number;
}

// ── Pattern 4: Fast & Slow Pointers ──
const fastSlowPointers: PatternData = {
  id: 'fast-slow-pointers',
  name: 'Fast & Slow Pointers',
  slug: 'fast-slow-pointers',
  category: 'Linked Lists',
  difficulty: 'Beginner',
  icon: '⚡',
  color: '#8b5cf6',
  order: 4,
  description:
    "Two pointers moving at different speeds through a sequence — classic Floyd's cycle detection.",
  coreIdea:
    'Fast moves 2x, slow moves 1x. They meet iff cycle exists. Meeting point helps find cycle start.',
  whenToUse: [
    'Detect cycle in linked list',
    'Find middle of linked list',
    'Find start of cycle',
    'Detect cycle in array',
  ],
  triggers: [
    'cycle',
    'linked list middle',
    'detect loop',
    'find duplicate number',
  ],
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  examples: [
    'Linked List Cycle',
    'Find Middle',
    'Happy Number',
    'Find Duplicate',
  ],
  prerequisites: ['Linked Lists'],
  template: {
    javascript: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

// Middle node nikalna:
function findMiddle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`,
    python:
      'def has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False',
  },
  questions: [
    {
      id: 91,
      leetcodeNum: 141,
      title: 'Linked List Cycle',
      difficulty: 'Easy',
      tags: ['Linked List', 'Two Pointers'],
      isClassic: true,
      frequency: 10,
      leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',
    },
    {
      id: 92,
      leetcodeNum: 142,
      title: 'Linked List Cycle II',
      difficulty: 'Medium',
      tags: ['Linked List', 'Two Pointers'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle-ii/',
    },
    {
      id: 93,
      leetcodeNum: 876,
      title: 'Middle of the Linked List',
      difficulty: 'Easy',
      tags: ['Linked List', 'Two Pointers'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/middle-of-the-linked-list/',
    },
    {
      id: 94,
      leetcodeNum: 287,
      title: 'Find the Duplicate Number',
      difficulty: 'Medium',
      tags: ['Array', 'Two Pointers', 'Binary Search'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/find-the-duplicate-number/',
    },
    {
      id: 95,
      leetcodeNum: 202,
      title: 'Happy Number',
      difficulty: 'Easy',
      tags: ['Hash Table', 'Math', 'Two Pointers'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/happy-number/',
    },
    {
      id: 96,
      leetcodeNum: 19,
      title: 'Remove Nth Node From End of List',
      difficulty: 'Medium',
      tags: ['Linked List', 'Two Pointers'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl:
        'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    },
    {
      id: 97,
      leetcodeNum: 234,
      title: 'Palindrome Linked List',
      difficulty: 'Easy',
      tags: ['Linked List', 'Two Pointers', 'Recursion'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/palindrome-linked-list/',
    },
    {
      id: 98,
      leetcodeNum: 160,
      title: 'Intersection of Two Linked Lists',
      difficulty: 'Easy',
      tags: ['Linked List', 'Two Pointers', 'Hash Table'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl:
        'https://leetcode.com/problems/intersection-of-two-linked-lists/',
    },
    {
      id: 99,
      leetcodeNum: 61,
      title: 'Rotate List',
      difficulty: 'Medium',
      tags: ['Linked List', 'Two Pointers'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/rotate-list/',
    },
    {
      id: 100,
      leetcodeNum: 143,
      title: 'Reorder List',
      difficulty: 'Medium',
      tags: ['Linked List', 'Two Pointers', 'Recursion'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/reorder-list/',
    },
    {
      id: 101,
      leetcodeNum: 2095,
      title: 'Delete the Middle Node of a Linked List',
      difficulty: 'Medium',
      tags: ['Linked List', 'Two Pointers'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/',
    },
    {
      id: 102,
      leetcodeNum: 457,
      title: 'Circular Array Loop',
      difficulty: 'Medium',
      tags: ['Array', 'Two Pointers'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/circular-array-loop/',
    },
    {
      id: 103,
      leetcodeNum: 2130,
      title: 'Maximum Twin Sum of a Linked List',
      difficulty: 'Medium',
      tags: ['Linked List', 'Two Pointers', 'Stack'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/',
    },
    {
      id: 104,
      leetcodeNum: 83,
      title: 'Remove Duplicates from Sorted List',
      difficulty: 'Easy',
      tags: ['Linked List'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/remove-duplicates-from-sorted-list/',
    },
    {
      id: 105,
      leetcodeNum: 82,
      title: 'Remove Duplicates from Sorted List II',
      difficulty: 'Medium',
      tags: ['Linked List', 'Two Pointers'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/',
    },
    {
      id: 106,
      leetcodeNum: 708,
      title: 'Insert into a Sorted Circular Linked List',
      difficulty: 'Medium',
      tags: ['Linked List'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list/',
    },
    {
      id: 107,
      leetcodeNum: 1721,
      title: 'Swapping Nodes in a Linked List',
      difficulty: 'Medium',
      tags: ['Linked List', 'Two Pointers'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/swapping-nodes-in-a-linked-list/',
    },
    {
      id: 108,
      leetcodeNum: 2058,
      title:
        'Find the Minimum and Maximum Number of Nodes Between Critical Points',
      difficulty: 'Medium',
      tags: ['Linked List'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points/',
    },
    {
      id: 109,
      leetcodeNum: 328,
      title: 'Odd Even Linked List',
      difficulty: 'Medium',
      tags: ['Linked List'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/odd-even-linked-list/',
    },
    {
      id: 110,
      leetcodeNum: 86,
      title: 'Partition List',
      difficulty: 'Medium',
      tags: ['Linked List', 'Two Pointers'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/partition-list/',
    },
    {
      id: 111,
      leetcodeNum: 2181,
      title: 'Merge Nodes in Between Zeros',
      difficulty: 'Medium',
      tags: ['Linked List', 'Two Pointers'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/merge-nodes-in-between-zeros/',
    },
    {
      id: 112,
      leetcodeNum: 1290,
      title: 'Convert Binary Number in a Linked List to Integer',
      difficulty: 'Easy',
      tags: ['Linked List', 'Math'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/',
    },
    {
      id: 113,
      leetcodeNum: 2807,
      title: 'Insert Greatest Common Divisors in Linked List',
      difficulty: 'Medium',
      tags: ['Linked List', 'Math', 'Number Theory'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/',
    },
    {
      id: 114,
      leetcodeNum: 24,
      title: 'Swap Nodes in Pairs',
      difficulty: 'Medium',
      tags: ['Linked List', 'Recursion'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/swap-nodes-in-pairs/',
    },
    {
      id: 115,
      leetcodeNum: 25,
      title: 'Reverse Nodes in k-Group',
      difficulty: 'Hard',
      tags: ['Linked List', 'Recursion'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
    },
    {
      id: 116,
      leetcodeNum: 2487,
      title: 'Remove Nodes From Linked List',
      difficulty: 'Medium',
      tags: ['Linked List', 'Stack', 'Recursion', 'Monotonic Stack'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/remove-nodes-from-linked-list/',
    },
    {
      id: 117,
      leetcodeNum: 3217,
      title: 'Delete Nodes From Linked List Present in Array',
      difficulty: 'Medium',
      tags: ['Linked List', 'Array', 'Hash Table'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array/',
    },
    {
      id: 118,
      leetcodeNum: 1669,
      title: 'Merge In Between Linked Lists',
      difficulty: 'Medium',
      tags: ['Linked List'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/merge-in-between-linked-lists/',
    },
    {
      id: 119,
      leetcodeNum: 2161,
      title: 'Partition Array According to Given Pivot',
      difficulty: 'Medium',
      tags: ['Array', 'Two Pointers', 'Simulation'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/partition-array-according-to-given-pivot/',
    },
    {
      id: 120,
      leetcodeNum: 206,
      title: 'Reverse Linked List',
      difficulty: 'Easy',
      tags: ['Linked List', 'Recursion'],
      isClassic: true,
      frequency: 10,
      leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    },
  ],
};

// ── Pattern 5: Merge Intervals ──
const mergeIntervals: PatternData = {
  id: 'merge-intervals',
  name: 'Merge Intervals',
  slug: 'merge-intervals',
  category: 'Arrays & Strings',
  difficulty: 'Intermediate',
  icon: '🔗',
  color: '#ec4899',
  order: 5,
  description:
    'Sort intervals by start, then merge/insert/clip overlapping ranges.',
  coreIdea:
    'Sort by start time. If next.start <= prev.end → overlap. Merge by taking max of end.',
  whenToUse: [
    'Merging overlapping intervals',
    'Inserting new interval',
    'Meeting rooms / conflicts',
    'Employee free time',
  ],
  triggers: [
    'interval',
    'meeting',
    'overlap',
    'schedule',
    'start end',
    'ranges that need combining',
  ],
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(n)',
  examples: [
    'Merge Intervals',
    'Insert Interval',
    'Meeting Rooms II',
    'Employee Free Time',
  ],
  prerequisites: ['Arrays', 'Sorting'],
  template: {
    javascript: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const curr = intervals[i];
    const last = merged[merged.length - 1];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]); // overlap → merge
    } else {
      merged.push(curr); // no overlap
    }
  }
  return merged;
}`,
    python:
      'def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    for start, end in intervals[1:]:\n        if start <= merged[-1][1]:\n            merged[-1][1] = max(merged[-1][1], end)\n        else:\n            merged.append([start, end])\n    return merged',
  },
  questions: [
    {
      id: 121,
      leetcodeNum: 56,
      title: 'Merge Intervals',
      difficulty: 'Medium',
      tags: ['Array', 'Sorting'],
      isClassic: true,
      frequency: 10,
      leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
    },
    {
      id: 122,
      leetcodeNum: 57,
      title: 'Insert Interval',
      difficulty: 'Medium',
      tags: ['Array'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/insert-interval/',
    },
    {
      id: 123,
      leetcodeNum: 252,
      title: 'Meeting Rooms',
      difficulty: 'Easy',
      tags: ['Array', 'Sorting'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms/',
    },
    {
      id: 124,
      leetcodeNum: 253,
      title: 'Meeting Rooms II',
      difficulty: 'Medium',
      tags: ['Array', 'Two Pointers', 'Greedy', 'Sorting', 'Heap'],
      isClassic: true,
      frequency: 10,
      leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/',
    },
    {
      id: 125,
      leetcodeNum: 1851,
      title: 'Minimum Interval to Include Each Query',
      difficulty: 'Hard',
      tags: ['Array', 'Binary Search', 'Line Sweep', 'Sorting', 'Heap'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-interval-to-include-each-query/',
    },
    {
      id: 126,
      leetcodeNum: 435,
      title: 'Non-overlapping Intervals',
      difficulty: 'Medium',
      tags: ['Array', 'Greedy', 'Sorting'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/',
    },
    {
      id: 127,
      leetcodeNum: 452,
      title: 'Minimum Number of Arrows to Burst Balloons',
      difficulty: 'Medium',
      tags: ['Array', 'Greedy', 'Sorting'],
      isClassic: false,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/',
    },
    {
      id: 128,
      leetcodeNum: 1288,
      title: 'Remove Covered Intervals',
      difficulty: 'Medium',
      tags: ['Array', 'Sorting', 'Greedy'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/remove-covered-intervals/',
    },
    {
      id: 129,
      leetcodeNum: 986,
      title: 'Interval List Intersections',
      difficulty: 'Medium',
      tags: ['Array', 'Two Pointers'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/interval-list-intersections/',
    },
    {
      id: 130,
      leetcodeNum: 759,
      title: 'Employee Free Time',
      difficulty: 'Hard',
      tags: ['Array', 'Sorting', 'Heap'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/employee-free-time/',
    },
    {
      id: 131,
      leetcodeNum: 2446,
      title: 'Determine if Two Events Have Conflict',
      difficulty: 'Easy',
      tags: ['Array', 'String'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/determine-if-two-events-have-conflict/',
    },
    {
      id: 132,
      leetcodeNum: 2406,
      title: 'Divide Intervals Into Minimum Number of Groups',
      difficulty: 'Medium',
      tags: [
        'Array',
        'Two Pointers',
        'Greedy',
        'Sorting',
        'Heap',
        'Prefix Sum',
      ],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/',
    },
    {
      id: 133,
      leetcodeNum: 2580,
      title: 'Count Ways to Group Overlapping Ranges',
      difficulty: 'Medium',
      tags: ['Array', 'Sorting'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/count-ways-to-group-overlapping-ranges/',
    },
    {
      id: 134,
      leetcodeNum: 2848,
      title: 'Points That Intersect With Cars',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Prefix Sum'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/points-that-intersect-with-cars/',
    },
    {
      id: 135,
      leetcodeNum: 3169,
      title: 'Count Days Without Meetings',
      difficulty: 'Medium',
      tags: ['Array', 'Sorting'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/count-days-without-meetings/',
    },
    {
      id: 136,
      leetcodeNum: 1094,
      title: 'Car Pooling',
      difficulty: 'Medium',
      tags: ['Array', 'Sorting', 'Heap', 'Simulation', 'Prefix Sum'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/car-pooling/',
    },
    {
      id: 137,
      leetcodeNum: 732,
      title: 'My Calendar III',
      difficulty: 'Hard',
      tags: ['Binary Search', 'Design', 'Segment Tree', 'Ordered Set'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/my-calendar-iii/',
    },
    {
      id: 138,
      leetcodeNum: 731,
      title: 'My Calendar II',
      difficulty: 'Medium',
      tags: ['Binary Search', 'Design', 'Segment Tree', 'Ordered Set'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/my-calendar-ii/',
    },
    {
      id: 139,
      leetcodeNum: 729,
      title: 'My Calendar I',
      difficulty: 'Medium',
      tags: ['Binary Search', 'Design', 'Segment Tree', 'Ordered Set'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/my-calendar-i/',
    },
    {
      id: 140,
      leetcodeNum: 2213,
      title: 'Longest Substring of One Repeating Character',
      difficulty: 'Hard',
      tags: ['Array', 'String', 'Segment Tree', 'Ordered Set'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/longest-substring-of-one-repeating-character/',
    },
    {
      id: 141,
      leetcodeNum: 1272,
      title: 'Remove Interval',
      difficulty: 'Medium',
      tags: ['Array'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/remove-interval/',
    },
    {
      id: 142,
      leetcodeNum: 2158,
      title: 'Amount of New Area Painted Each Day',
      difficulty: 'Hard',
      tags: ['Array', 'Segment Tree', 'Ordered Set'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/amount-of-new-area-painted-each-day/',
    },
    {
      id: 143,
      leetcodeNum: 1229,
      title: 'Meeting Scheduler',
      difficulty: 'Medium',
      tags: ['Array', 'Two Pointers', 'Sorting'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/meeting-scheduler/',
    },
    {
      id: 144,
      leetcodeNum: 2237,
      title: 'Count Positions on Street With Required Brightness',
      difficulty: 'Medium',
      tags: ['Array', 'Prefix Sum'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/count-positions-on-street-with-required-brightness/',
    },
    {
      id: 145,
      leetcodeNum: 1893,
      title: 'Check if All the Integers in a Range Are Covered',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Prefix Sum'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/check-if-all-the-integers-in-a-range-are-covered/',
    },
    {
      id: 146,
      leetcodeNum: 2251,
      title: 'Number of Flowers in Full Bloom',
      difficulty: 'Hard',
      tags: [
        'Array',
        'Hash Table',
        'Binary Search',
        'Sorting',
        'Prefix Sum',
        'Ordered Set',
      ],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/number-of-flowers-in-full-bloom/',
    },
    {
      id: 147,
      leetcodeNum: 2655,
      title: 'Find Maximal Uncovered Ranges',
      difficulty: 'Medium',
      tags: ['Array', 'Sorting'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/find-maximal-uncovered-ranges/',
    },
    {
      id: 148,
      leetcodeNum: 3,
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      tags: ['Hash Table', 'String', 'Sliding Window'],
      isClassic: true,
      frequency: 10,
      leetcodeUrl:
        'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    },
    {
      id: 149,
      leetcodeNum: 228,
      title: 'Summary Ranges',
      difficulty: 'Easy',
      tags: ['Array'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/summary-ranges/',
    },
    {
      id: 150,
      leetcodeNum: 163,
      title: 'Missing Ranges',
      difficulty: 'Easy',
      tags: ['Array'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/missing-ranges/',
    },
  ],
};

// ── Patterns 6-15: Compact (full 30 questions each) ──
const cyclicSort: PatternData = {
  id: 'cyclic-sort',
  name: 'Cyclic Sort',
  slug: 'cyclic-sort',
  category: 'Arrays & Strings',
  difficulty: 'Intermediate',
  icon: '🔄',
  color: '#14b8a6',
  order: 6,
  description:
    'Place numbers at their correct index for arrays containing values in [1,n] range.',
  coreIdea:
    'If arr[i] != i+1 (or arr[i] != arr[arr[i]-1]), swap to correct position. O(n) guaranteed.',
  whenToUse: [
    'Find missing numbers in [1,n]',
    'Find duplicates in [1,n]',
    'First missing positive',
    'Corrupt pair',
  ],
  triggers: [
    'missing number',
    'find duplicate',
    'numbers 1 to n',
    'first missing positive',
    'corrupt pair',
  ],
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  examples: ['Missing Number', 'Find All Duplicates', 'First Missing Positive'],
  prerequisites: ['Arrays'],
  template: {
    javascript: `function cyclicSort(nums) {
  let i = 0;
  while (i < nums.length) {
    const j = nums[i] - 1; // correct index for nums[i]
    if (nums[i] !== nums[j]) {
      [nums[i], nums[j]] = [nums[j], nums[i]]; // swap
    } else {
      i++;
    }
  }
  return nums;
}

// Missing number:
function findMissing(nums) {
  cyclicSort(nums);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return nums.length + 1;
}`,
    python:
      'def cyclic_sort(nums):\n    i = 0\n    while i < len(nums):\n        j = nums[i] - 1\n        if nums[i] != nums[j]:\n            nums[i], nums[j] = nums[j], nums[i]\n        else:\n            i += 1\n    return nums',
  },
  questions: [
    {
      id: 151,
      leetcodeNum: 268,
      title: 'Missing Number',
      difficulty: 'Easy',
      tags: ['Array', 'Math', 'Bit Manipulation', 'Sorting'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/missing-number/',
    },
    {
      id: 152,
      leetcodeNum: 287,
      title: 'Find the Duplicate Number',
      difficulty: 'Medium',
      tags: ['Array', 'Two Pointers', 'Binary Search', 'Bit Manipulation'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/find-the-duplicate-number/',
    },
    {
      id: 153,
      leetcodeNum: 448,
      title: 'Find All Numbers Disappeared in an Array',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/',
    },
    {
      id: 154,
      leetcodeNum: 442,
      title: 'Find All Duplicates in an Array',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/find-all-duplicates-in-an-array/',
    },
    {
      id: 155,
      leetcodeNum: 41,
      title: 'First Missing Positive',
      difficulty: 'Hard',
      tags: ['Array', 'Hash Table'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/first-missing-positive/',
    },
    {
      id: 156,
      leetcodeNum: 765,
      title: 'Couples Holding Hands',
      difficulty: 'Hard',
      tags: ['Array', 'Greedy', 'Union Find', 'Graph'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/couples-holding-hands/',
    },
    {
      id: 157,
      leetcodeNum: 645,
      title: 'Set Mismatch',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Bit Manipulation', 'Sorting'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/set-mismatch/',
    },
    {
      id: 158,
      leetcodeNum: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table'],
      isClassic: true,
      frequency: 10,
      leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    },
    {
      id: 159,
      leetcodeNum: 1051,
      title: 'Height Checker',
      difficulty: 'Easy',
      tags: ['Array', 'Sorting', 'Counting Sort'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/height-checker/',
    },
    {
      id: 160,
      leetcodeNum: 1346,
      title: 'Check If N and Its Double Exist',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Binary Search', 'Sorting'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/check-if-n-and-its-double-exist/',
    },
    {
      id: 161,
      leetcodeNum: 1365,
      title: 'How Many Numbers Are Smaller Than the Current Number',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Sorting', 'Counting Sort'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/',
    },
    {
      id: 162,
      leetcodeNum: 2154,
      title: 'Keep Multiplying Found Values by Two',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Sorting'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/keep-multiplying-found-values-by-two/',
    },
    {
      id: 163,
      leetcodeNum: 1512,
      title: 'Number of Good Pairs',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Math', 'Counting'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/number-of-good-pairs/',
    },
    {
      id: 164,
      leetcodeNum: 2367,
      title: 'Number of Arithmetic Triplets',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Two Pointers', 'Enumeration'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/number-of-arithmetic-triplets/',
    },
    {
      id: 165,
      leetcodeNum: 2441,
      title: 'Largest Positive Integer That Exists With Its Negative',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Two Pointers', 'Sorting'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative/',
    },
    {
      id: 166,
      leetcodeNum: 697,
      title: 'Degree of an Array',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/degree-of-an-array/',
    },
    {
      id: 167,
      leetcodeNum: 2815,
      title: 'Max Pair Sum in an Array',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl: 'https://leetcode.com/problems/max-pair-sum-in-an-array/',
    },
    {
      id: 168,
      leetcodeNum: 1002,
      title: 'Find Common Characters',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'String'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/find-common-characters/',
    },
    {
      id: 169,
      leetcodeNum: 349,
      title: 'Intersection of Two Arrays',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Two Pointers', 'Binary Search', 'Sorting'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/intersection-of-two-arrays/',
    },
    {
      id: 170,
      leetcodeNum: 350,
      title: 'Intersection of Two Arrays II',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Two Pointers', 'Binary Search', 'Sorting'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/intersection-of-two-arrays-ii/',
    },
    {
      id: 171,
      leetcodeNum: 2744,
      title: 'Find Maximum Number of String Pairs',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'String', 'Simulation'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/find-maximum-number-of-string-pairs/',
    },
    {
      id: 172,
      leetcodeNum: 3005,
      title: 'Count Elements With Maximum Frequency',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Counting'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/count-elements-with-maximum-frequency/',
    },
    {
      id: 173,
      leetcodeNum: 2053,
      title: 'Kth Distinct String in an Array',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'String', 'Counting'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/kth-distinct-string-in-an-array/',
    },
    {
      id: 174,
      leetcodeNum: 1748,
      title: 'Sum of Unique Elements',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Counting'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl: 'https://leetcode.com/problems/sum-of-unique-elements/',
    },
    {
      id: 175,
      leetcodeNum: 2744,
      title: 'Find Maximum Number of String Pairs',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'String'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/find-maximum-number-of-string-pairs/',
    },
    {
      id: 176,
      leetcodeNum: 217,
      title: 'Contains Duplicate',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Sorting'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
    },
    {
      id: 177,
      leetcodeNum: 219,
      title: 'Contains Duplicate II',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table', 'Sliding Window'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate-ii/',
    },
    {
      id: 178,
      leetcodeNum: 220,
      title: 'Contains Duplicate III',
      difficulty: 'Hard',
      tags: [
        'Array',
        'Sliding Window',
        'Sorting',
        'Ordered Set',
        'Bucket Sort',
      ],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate-iii/',
    },
    {
      id: 179,
      leetcodeNum: 2196,
      title: 'Create Binary Tree From Descriptions',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'Tree', 'Binary Tree', 'DFS'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/create-binary-tree-from-descriptions/',
    },
    {
      id: 180,
      leetcodeNum: 136,
      title: 'Single Number',
      difficulty: 'Easy',
      tags: ['Array', 'Bit Manipulation'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/single-number/',
    },
  ],
};

const dfs: PatternData = {
  id: 'dfs',
  name: 'DFS',
  slug: 'dfs',
  category: 'Trees',
  difficulty: 'Intermediate',
  icon: '🌳',
  color: '#22c55e',
  order: 7,
  description:
    'Depth-first search explores as far as possible before backtracking — trees, graphs, matrices.',
  coreIdea:
    'Recursion stack OR explicit stack. Preorder (process before children) vs postorder (after).',
  whenToUse: [
    'All paths root to leaf',
    'Tree properties (height, balance)',
    'Connected components',
    'Cycle detection',
  ],
  triggers: [
    'all paths',
    'tree height',
    'path sum',
    'connected components',
    'islands',
    'recursive tree',
  ],
  timeComplexity: 'O(V+E)',
  spaceComplexity: 'O(h) for trees, O(V) for graphs',
  examples: [
    'Max Depth of Binary Tree',
    'Path Sum',
    'Number of Islands',
    'Clone Graph',
  ],
  prerequisites: ['Recursion', 'Stacks', 'Trees basics'],
  template: {
    javascript: `// Tree DFS — postorder (max depth example)
function dfs(node) {
  if (!node) return 0;
  const left  = dfs(node.left);
  const right = dfs(node.right);
  return 1 + Math.max(left, right);
}

// Graph DFS — iterative
function dfsGraph(graph, start) {
  const visited = new Set();
  const stack = [start];
  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    for (const nei of (graph[node] || [])) {
      if (!visited.has(nei)) stack.push(nei);
    }
  }
}`,
    python:
      'def dfs(node):\n    if not node:\n        return 0\n    left  = dfs(node.left)\n    right = dfs(node.right)\n    return 1 + max(left, right)  # example: max depth',
  },
  questions: [
    {
      id: 181,
      leetcodeNum: 104,
      title: 'Maximum Depth of Binary Tree',
      difficulty: 'Easy',
      tags: ['Tree', 'DFS', 'BFS'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    },
    {
      id: 182,
      leetcodeNum: 112,
      title: 'Path Sum',
      difficulty: 'Easy',
      tags: ['Tree', 'DFS', 'BFS'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/path-sum/',
    },
    {
      id: 183,
      leetcodeNum: 113,
      title: 'Path Sum II',
      difficulty: 'Medium',
      tags: ['Tree', 'DFS', 'Backtracking'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/path-sum-ii/',
    },
    {
      id: 184,
      leetcodeNum: 200,
      title: 'Number of Islands',
      difficulty: 'Medium',
      tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'],
      isClassic: true,
      frequency: 10,
      leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    },
    {
      id: 185,
      leetcodeNum: 133,
      title: 'Clone Graph',
      difficulty: 'Medium',
      tags: ['Hash Table', 'DFS', 'BFS', 'Graph'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/clone-graph/',
    },
    {
      id: 186,
      leetcodeNum: 543,
      title: 'Diameter of Binary Tree',
      difficulty: 'Easy',
      tags: ['Tree', 'DFS'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/',
    },
    {
      id: 187,
      leetcodeNum: 110,
      title: 'Balanced Binary Tree',
      difficulty: 'Easy',
      tags: ['Tree', 'DFS'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/balanced-binary-tree/',
    },
    {
      id: 188,
      leetcodeNum: 100,
      title: 'Same Tree',
      difficulty: 'Easy',
      tags: ['Tree', 'DFS', 'BFS'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/same-tree/',
    },
    {
      id: 189,
      leetcodeNum: 101,
      title: 'Symmetric Tree',
      difficulty: 'Easy',
      tags: ['Tree', 'DFS', 'BFS'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/symmetric-tree/',
    },
    {
      id: 190,
      leetcodeNum: 124,
      title: 'Binary Tree Maximum Path Sum',
      difficulty: 'Hard',
      tags: ['Tree', 'DFS', 'DP'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl:
        'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
    },
    {
      id: 191,
      leetcodeNum: 257,
      title: 'Binary Tree Paths',
      difficulty: 'Easy',
      tags: ['Tree', 'DFS', 'Backtracking', 'String'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-paths/',
    },
    {
      id: 192,
      leetcodeNum: 437,
      title: 'Path Sum III',
      difficulty: 'Medium',
      tags: ['Tree', 'DFS', 'Hash Table'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/path-sum-iii/',
    },
    {
      id: 193,
      leetcodeNum: 129,
      title: 'Sum Root to Leaf Numbers',
      difficulty: 'Medium',
      tags: ['Tree', 'DFS', 'Math'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/',
    },
    {
      id: 194,
      leetcodeNum: 1448,
      title: 'Count Good Nodes in Binary Tree',
      difficulty: 'Medium',
      tags: ['Tree', 'DFS', 'BFS'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/count-good-nodes-in-binary-tree/',
    },
    {
      id: 195,
      leetcodeNum: 695,
      title: 'Max Area of Island',
      difficulty: 'Medium',
      tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/max-area-of-island/',
    },
    {
      id: 196,
      leetcodeNum: 417,
      title: 'Pacific Atlantic Water Flow',
      difficulty: 'Medium',
      tags: ['Array', 'DFS', 'BFS', 'Matrix'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
    },
    {
      id: 197,
      leetcodeNum: 130,
      title: 'Surrounded Regions',
      difficulty: 'Medium',
      tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/surrounded-regions/',
    },
    {
      id: 198,
      leetcodeNum: 1466,
      title: 'Reorder Routes to Make All Paths Lead to the City Zero',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Graph'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/',
    },
    {
      id: 199,
      leetcodeNum: 2477,
      title: 'Minimum Fuel Cost to Report to the Capital',
      difficulty: 'Medium',
      tags: ['Tree', 'DFS', 'BFS', 'Graph'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital/',
    },
    {
      id: 200,
      leetcodeNum: 1245,
      title: 'Tree Diameter',
      difficulty: 'Medium',
      tags: ['Tree', 'DFS', 'BFS', 'Graph'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/tree-diameter/',
    },
    {
      id: 201,
      leetcodeNum: 2246,
      title: 'Longest Path With Different Adjacent Characters',
      difficulty: 'Hard',
      tags: ['Array', 'String', 'Tree', 'DFS', 'Graph', 'Topological Sort'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/longest-path-with-different-adjacent-characters/',
    },
    {
      id: 202,
      leetcodeNum: 323,
      title: 'Number of Connected Components in an Undirected Graph',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Union Find', 'Graph'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/',
    },
    {
      id: 203,
      leetcodeNum: 547,
      title: 'Number of Provinces',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Union Find', 'Graph'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/number-of-provinces/',
    },
    {
      id: 204,
      leetcodeNum: 684,
      title: 'Redundant Connection',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Union Find', 'Graph'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/redundant-connection/',
    },
    {
      id: 205,
      leetcodeNum: 1971,
      title: 'Find if Path Exists in Graph',
      difficulty: 'Easy',
      tags: ['DFS', 'BFS', 'Union Find', 'Graph'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/find-if-path-exists-in-graph/',
    },
    {
      id: 206,
      leetcodeNum: 797,
      title: 'All Paths From Source to Target',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Backtracking', 'Graph'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/all-paths-from-source-to-target/',
    },
    {
      id: 207,
      leetcodeNum: 1020,
      title: 'Number of Enclaves',
      difficulty: 'Medium',
      tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/number-of-enclaves/',
    },
    {
      id: 208,
      leetcodeNum: 1254,
      title: 'Number of Closed Islands',
      difficulty: 'Medium',
      tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/number-of-closed-islands/',
    },
    {
      id: 209,
      leetcodeNum: 841,
      title: 'Keys and Rooms',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Graph'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/keys-and-rooms/',
    },
    {
      id: 210,
      leetcodeNum: 1905,
      title: 'Count Sub Islands',
      difficulty: 'Medium',
      tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/count-sub-islands/',
    },
  ],
};

const bfs: PatternData = {
  id: 'bfs',
  name: 'BFS',
  slug: 'bfs',
  category: 'Graphs',
  difficulty: 'Intermediate',
  icon: '🌊',
  color: '#06b6d4',
  order: 8,
  description:
    'Level-by-level exploration using a queue — guarantees shortest path in unweighted graphs.',
  coreIdea:
    'Queue: FIFO. Process all nodes at distance d before distance d+1. Perfect for shortest unweighted path.',
  whenToUse: [
    'Shortest path in unweighted graph/grid',
    'Level order traversal',
    'Multi-source BFS',
    'Word ladder',
  ],
  triggers: [
    'shortest path',
    'level order',
    'minimum steps',
    'word ladder',
    'rotting oranges',
    '01 matrix',
  ],
  timeComplexity: 'O(V+E)',
  spaceComplexity: 'O(V)',
  examples: [
    'Binary Tree Level Order',
    'Rotting Oranges',
    'Word Ladder',
    '01 Matrix',
  ],
  prerequisites: ['Queues', 'Trees/Graphs basics'],
  template: {
    javascript: `function bfs(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];

  while (queue.length) {
    const levelSize = queue.length;
    const level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,
    python:
      'from collections import deque\ndef bfs(root):\n    if not root: return []\n    queue, result = deque([root]), []\n    while queue:\n        level = []\n        for _ in range(len(queue)):\n            node = queue.popleft()\n            level.append(node.val)\n            if node.left:  queue.append(node.left)\n            if node.right: queue.append(node.right)\n        result.append(level)\n    return result',
  },
  questions: [
    {
      id: 211,
      leetcodeNum: 102,
      title: 'Binary Tree Level Order Traversal',
      difficulty: 'Medium',
      tags: ['Tree', 'BFS'],
      isClassic: true,
      frequency: 10,
      leetcodeUrl:
        'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    },
    {
      id: 212,
      leetcodeNum: 994,
      title: 'Rotting Oranges',
      difficulty: 'Medium',
      tags: ['Array', 'BFS', 'Matrix'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/rotting-oranges/',
    },
    {
      id: 213,
      leetcodeNum: 127,
      title: 'Word Ladder',
      difficulty: 'Hard',
      tags: ['Hash Table', 'String', 'BFS'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/word-ladder/',
    },
    {
      id: 214,
      leetcodeNum: 542,
      title: '01 Matrix',
      difficulty: 'Medium',
      tags: ['Array', 'BFS', 'Matrix', 'DP'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/01-matrix/',
    },
    {
      id: 215,
      leetcodeNum: 1926,
      title: 'Nearest Exit from Entrance in Maze',
      difficulty: 'Medium',
      tags: ['Array', 'BFS', 'Matrix'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/',
    },
    {
      id: 216,
      leetcodeNum: 1161,
      title: 'Maximum Level Sum of a Binary Tree',
      difficulty: 'Medium',
      tags: ['Tree', 'BFS'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/',
    },
    {
      id: 217,
      leetcodeNum: 103,
      title: 'Binary Tree Zigzag Level Order Traversal',
      difficulty: 'Medium',
      tags: ['Tree', 'BFS'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl:
        'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/',
    },
    {
      id: 218,
      leetcodeNum: 116,
      title: 'Populating Next Right Pointers in Each Node',
      difficulty: 'Medium',
      tags: ['Tree', 'BFS', 'DFS'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/',
    },
    {
      id: 219,
      leetcodeNum: 117,
      title: 'Populating Next Right Pointers in Each Node II',
      difficulty: 'Medium',
      tags: ['Tree', 'BFS', 'DFS'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/',
    },
    {
      id: 220,
      leetcodeNum: 199,
      title: 'Binary Tree Right Side View',
      difficulty: 'Medium',
      tags: ['Tree', 'BFS', 'DFS'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-right-side-view/',
    },
    {
      id: 221,
      leetcodeNum: 1302,
      title: 'Deepest Leaves Sum',
      difficulty: 'Medium',
      tags: ['Tree', 'DFS', 'BFS'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/deepest-leaves-sum/',
    },
    {
      id: 222,
      leetcodeNum: 1609,
      title: 'Even Odd Tree',
      difficulty: 'Medium',
      tags: ['Tree', 'BFS', 'DFS'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/even-odd-tree/',
    },
    {
      id: 223,
      leetcodeNum: 909,
      title: 'Snakes and Ladders',
      difficulty: 'Medium',
      tags: ['Array', 'BFS', 'Matrix'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/snakes-and-ladders/',
    },
    {
      id: 224,
      leetcodeNum: 1091,
      title: 'Shortest Path in Binary Matrix',
      difficulty: 'Medium',
      tags: ['Array', 'BFS', 'Matrix'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/shortest-path-in-binary-matrix/',
    },
    {
      id: 225,
      leetcodeNum: 863,
      title: 'All Nodes Distance K in Binary Tree',
      difficulty: 'Medium',
      tags: ['Tree', 'DFS', 'BFS', 'Graph'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/',
    },
    {
      id: 226,
      leetcodeNum: 1293,
      title: 'Shortest Path in a Grid with Obstacles Elimination',
      difficulty: 'Hard',
      tags: ['Array', 'BFS', 'Matrix'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/',
    },
    {
      id: 227,
      leetcodeNum: 2039,
      title: 'The Time When the Network Becomes Idle',
      difficulty: 'Medium',
      tags: ['Array', 'BFS', 'Graph'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/the-time-when-the-network-becomes-idle/',
    },
    {
      id: 228,
      leetcodeNum: 2467,
      title: 'Most Profitable Path in a Tree',
      difficulty: 'Medium',
      tags: ['Array', 'Tree', 'DFS', 'BFS', 'Graph'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/most-profitable-path-in-a-tree/',
    },
    {
      id: 229,
      leetcodeNum: 1765,
      title: 'Map of Highest Peak',
      difficulty: 'Medium',
      tags: ['Array', 'BFS', 'Matrix'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/map-of-highest-peak/',
    },
    {
      id: 230,
      leetcodeNum: 314,
      title: 'Binary Tree Vertical Order Traversal',
      difficulty: 'Medium',
      tags: ['Hash Table', 'Tree', 'DFS', 'BFS', 'Sorting'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/binary-tree-vertical-order-traversal/',
    },
    {
      id: 231,
      leetcodeNum: 513,
      title: 'Find Bottom Left Tree Value',
      difficulty: 'Medium',
      tags: ['Tree', 'DFS', 'BFS'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/find-bottom-left-tree-value/',
    },
    {
      id: 232,
      leetcodeNum: 515,
      title: 'Find Largest Value in Each Tree Row',
      difficulty: 'Medium',
      tags: ['Tree', 'DFS', 'BFS'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/find-largest-value-in-each-tree-row/',
    },
    {
      id: 233,
      leetcodeNum: 662,
      title: 'Maximum Width of Binary Tree',
      difficulty: 'Medium',
      tags: ['Tree', 'DFS', 'BFS'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-width-of-binary-tree/',
    },
    {
      id: 234,
      leetcodeNum: 2658,
      title: 'Maximum Number of Fish in a Grid',
      difficulty: 'Medium',
      tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-number-of-fish-in-a-grid/',
    },
    {
      id: 235,
      leetcodeNum: 2684,
      title: 'Maximum Number of Moves in a Grid',
      difficulty: 'Medium',
      tags: ['Array', 'DP', 'BFS', 'Matrix'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-number-of-moves-in-a-grid/',
    },
    {
      id: 236,
      leetcodeNum: 433,
      title: 'Minimum Genetic Mutation',
      difficulty: 'Medium',
      tags: ['Hash Table', 'String', 'BFS'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/minimum-genetic-mutation/',
    },
    {
      id: 237,
      leetcodeNum: 752,
      title: 'Open the Lock',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'String', 'BFS'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/open-the-lock/',
    },
    {
      id: 238,
      leetcodeNum: 1345,
      title: 'Jump Game IV',
      difficulty: 'Hard',
      tags: ['Array', 'Hash Table', 'BFS'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/jump-game-iv/',
    },
    {
      id: 239,
      leetcodeNum: 2415,
      title: 'Reverse Odd Levels of Binary Tree',
      difficulty: 'Medium',
      tags: ['Tree', 'DFS', 'BFS'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/reverse-odd-levels-of-binary-tree/',
    },
    {
      id: 240,
      leetcodeNum: 1376,
      title: 'Time Needed to Inform All Employees',
      difficulty: 'Medium',
      tags: ['Tree', 'DFS', 'BFS'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/time-needed-to-inform-all-employees/',
    },
  ],
};

// Patterns 9-15 compact
const topologicalSort: PatternData = {
  id: 'topological-sort',
  name: 'Topological Sort',
  slug: 'topological-sort',
  category: 'Graphs',
  difficulty: 'Intermediate',
  icon: '📊',
  color: '#f97316',
  order: 9,
  description:
    "Order tasks in a DAG so every node comes before its dependents. Kahn's (BFS) or DFS post-order.",
  coreIdea:
    "In-degree array + queue (Kahn's). Process 0 in-degree nodes first, reduce neighbors' in-degree.",
  whenToUse: [
    'Course prerequisites',
    'Build order',
    'Dependency resolution',
    'Detect cycle in directed graph',
  ],
  triggers: [
    'prerequisites',
    'course schedule',
    'dependency order',
    'can finish all tasks',
    'topological',
    'DAG',
  ],
  timeComplexity: 'O(V+E)',
  spaceComplexity: 'O(V)',
  examples: [
    'Course Schedule',
    'Course Schedule II',
    'Alien Dictionary',
    'Build Order',
  ],
  prerequisites: ['Graphs', 'BFS', 'DFS'],
  template: {
    javascript: `function topoSort(n, edges) {
  const graph = Array.from({length: n}, () => []);
  const inDegree = new Array(n).fill(0);

  for (const [u, v] of edges) {
    graph[u].push(v);
    inDegree[v]++;
  }

  const queue = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const nei of graph[node]) {
      inDegree[nei]--;
      if (inDegree[nei] === 0) queue.push(nei);
    }
  }
  return order.length === n ? order : []; // [] = cycle exists
}`,
    python:
      'from collections import deque\ndef topoSort(n, edges):\n    graph = [[] for _ in range(n)]\n    in_degree = [0] * n\n    for u, v in edges:\n        graph[u].append(v)\n        in_degree[v] += 1\n    q = deque([i for i in range(n) if in_degree[i] == 0])\n    order = []\n    while q:\n        node = q.popleft()\n        order.append(node)\n        for nei in graph[node]:\n            in_degree[nei] -= 1\n            if in_degree[nei] == 0:\n                q.append(nei)\n    return order if len(order) == n else []',
  },
  questions: [
    {
      id: 241,
      leetcodeNum: 207,
      title: 'Course Schedule',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Graph', 'Topological Sort'],
      isClassic: true,
      frequency: 10,
      leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
    },
    {
      id: 242,
      leetcodeNum: 210,
      title: 'Course Schedule II',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Graph', 'Topological Sort'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/course-schedule-ii/',
    },
    {
      id: 243,
      leetcodeNum: 269,
      title: 'Alien Dictionary',
      difficulty: 'Hard',
      tags: ['Array', 'String', 'DFS', 'BFS', 'Graph', 'Topological Sort'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/',
    },
    {
      id: 244,
      leetcodeNum: 444,
      title: 'Sequence Reconstruction',
      difficulty: 'Medium',
      tags: ['Array', 'Graph', 'Topological Sort'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/sequence-reconstruction/',
    },
    {
      id: 245,
      leetcodeNum: 1203,
      title: 'Sort Items by Groups Respecting Dependencies',
      difficulty: 'Hard',
      tags: ['DFS', 'BFS', 'Graph', 'Topological Sort'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies/',
    },
    {
      id: 246,
      leetcodeNum: 1857,
      title: 'Largest Color Value in a Directed Graph',
      difficulty: 'Hard',
      tags: [
        'Hash Table',
        'DP',
        'Graph',
        'Topological Sort',
        'Memoization',
        'Counting',
      ],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/largest-color-value-in-a-directed-graph/',
    },
    {
      id: 247,
      leetcodeNum: 2115,
      title: 'Find All Possible Recipes from Given Supplies',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'String', 'Graph', 'Topological Sort'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/',
    },
    {
      id: 248,
      leetcodeNum: 310,
      title: 'Minimum Height Trees',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Graph', 'Topological Sort'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/minimum-height-trees/',
    },
    {
      id: 249,
      leetcodeNum: 2050,
      title: 'Parallel Courses III',
      difficulty: 'Hard',
      tags: ['Array', 'DP', 'Graph', 'Topological Sort'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/parallel-courses-iii/',
    },
    {
      id: 250,
      leetcodeNum: 1136,
      title: 'Parallel Courses',
      difficulty: 'Medium',
      tags: ['Graph', 'Topological Sort'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/parallel-courses/',
    },
    {
      id: 251,
      leetcodeNum: 802,
      title: 'Find Eventual Safe States',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Graph', 'Topological Sort'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/find-eventual-safe-states/',
    },
    {
      id: 252,
      leetcodeNum: 851,
      title: 'Loud and Rich',
      difficulty: 'Medium',
      tags: ['Array', 'DFS', 'Graph', 'Topological Sort'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/loud-and-rich/',
    },
    {
      id: 253,
      leetcodeNum: 1059,
      title: 'All Paths from Source Lead to Destination',
      difficulty: 'Medium',
      tags: ['DFS', 'Graph', 'Topological Sort'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/all-paths-from-source-lead-to-destination/',
    },
    {
      id: 254,
      leetcodeNum: 1462,
      title: 'Course Schedule IV',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Graph', 'Topological Sort', 'Floyd-Warshall'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/course-schedule-iv/',
    },
    {
      id: 255,
      leetcodeNum: 1632,
      title: 'Rank Transform of a Matrix',
      difficulty: 'Hard',
      tags: [
        'Array',
        'Union Find',
        'Graph',
        'Topological Sort',
        'Matrix',
        'Sorting',
      ],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/rank-transform-of-a-matrix/',
    },
    {
      id: 256,
      leetcodeNum: 2192,
      title: 'All Ancestors of a Node in a Directed Acyclic Graph',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Graph', 'Topological Sort'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/',
    },
    {
      id: 257,
      leetcodeNum: 2360,
      title: 'Longest Cycle in a Graph',
      difficulty: 'Hard',
      tags: ['DFS', 'Graph', 'Topological Sort'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/longest-cycle-in-a-graph/',
    },
    {
      id: 258,
      leetcodeNum: 329,
      title: 'Longest Increasing Path in a Matrix',
      difficulty: 'Hard',
      tags: [
        'Array',
        'DFS',
        'BFS',
        'Graph',
        'Topological Sort',
        'Memoization',
        'Matrix',
      ],
      isClassic: true,
      frequency: 8,
      leetcodeUrl:
        'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/',
    },
    {
      id: 259,
      leetcodeNum: 1786,
      title: 'Number of Restricted Paths From First to Last Node',
      difficulty: 'Medium',
      tags: [
        'Graph',
        'Topological Sort',
        'DP',
        'Heap (Priority Queue)',
        'Shortest Path',
      ],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/number-of-restricted-paths-from-first-to-last-node/',
    },
    {
      id: 260,
      leetcodeNum: 2876,
      title: 'Count Visited Nodes in a Directed Graph',
      difficulty: 'Hard',
      tags: ['Graph', 'Memoization', 'DFS'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/count-visited-nodes-in-a-directed-graph/',
    },
    {
      id: 261,
      leetcodeNum: 631,
      title: 'Design Excel Sum Formula',
      difficulty: 'Hard',
      tags: [
        'Array',
        'Hash Table',
        'String',
        'Design',
        'Graph',
        'Topological Sort',
      ],
      isClassic: false,
      frequency: 3,
      leetcodeUrl: 'https://leetcode.com/problems/design-excel-sum-formula/',
    },
    {
      id: 262,
      leetcodeNum: 1591,
      title: 'Strange Printer II',
      difficulty: 'Hard',
      tags: ['Array', 'Graph', 'Topological Sort', 'Matrix'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl: 'https://leetcode.com/problems/strange-printer-ii/',
    },
    {
      id: 263,
      leetcodeNum: 2127,
      title: 'Maximum Employees to Be Invited to a Meeting',
      difficulty: 'Hard',
      tags: ['DFS', 'Graph', 'Topological Sort'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-employees-to-be-invited-to-a-meeting/',
    },
    {
      id: 264,
      leetcodeNum: 2204,
      title: 'Distance to a Cycle in Undirected Graph',
      difficulty: 'Hard',
      tags: ['DFS', 'BFS', 'Graph', 'Topological Sort'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/distance-to-a-cycle-in-undirected-graph/',
    },
    {
      id: 265,
      leetcodeNum: 2392,
      title: 'Build a Matrix With Conditions',
      difficulty: 'Hard',
      tags: ['Array', 'Graph', 'Topological Sort', 'Matrix'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/build-a-matrix-with-conditions/',
    },
    {
      id: 266,
      leetcodeNum: 1958,
      title: 'Check if Move is Legal',
      difficulty: 'Medium',
      tags: ['Array', 'Enumeration', 'Matrix'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl: 'https://leetcode.com/problems/check-if-move-is-legal/',
    },
    {
      id: 267,
      leetcodeNum: 1743,
      title: 'Restore the Array From Adjacent Pairs',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'Graph'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/restore-the-array-from-adjacent-pairs/',
    },
    {
      id: 268,
      leetcodeNum: 2285,
      title: 'Maximum Total Importance of Roads',
      difficulty: 'Medium',
      tags: ['Greedy', 'Graph', 'Sorting', 'Heap (Priority Queue)'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-total-importance-of-roads/',
    },
    {
      id: 269,
      leetcodeNum: 1557,
      title: 'Minimum Number of Vertices to Reach All Nodes',
      difficulty: 'Medium',
      tags: ['Graph'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/',
    },
    {
      id: 270,
      leetcodeNum: 399,
      title: 'Evaluate Division',
      difficulty: 'Medium',
      tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Graph', 'Shortest Path'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/evaluate-division/',
    },
  ],
};

// Heap, Subset, DP, Bit, Trie, Graph — compact with 30 each
const heap: PatternData = {
  id: 'heap',
  name: 'Heap / Priority Queue',
  slug: 'heap',
  category: 'Heaps & Queues',
  difficulty: 'Intermediate',
  icon: '⛰️',
  color: '#a855f7',
  order: 10,
  description:
    'Maintain efficient access to min or max element. Perfect for top-K, scheduling, and merge problems.',
  coreIdea:
    'Min-heap gives smallest in O(1), O(log n) insert/remove. Max-heap gives largest. Use heapq in Python.',
  whenToUse: [
    'Top K elements',
    'Kth largest/smallest',
    'Median from stream',
    'Merge K sorted lists',
    'Task scheduling',
  ],
  triggers: [
    'k largest',
    'k smallest',
    'top k',
    'running median',
    'merge k sorted',
    'priority',
    'scheduling',
  ],
  timeComplexity: 'O(n log k)',
  spaceComplexity: 'O(k)',
  examples: [
    'Kth Largest Element',
    'Top K Frequent',
    'Merge K Sorted Lists',
    'Find Median from Data Stream',
  ],
  prerequisites: ['Arrays', 'Trees basics'],
  template: {
    javascript: `// JavaScript mein built-in heap nahi hai.
// Simple approach: sorted array as min-heap (ok for interviews)

// Kth Largest — Min-heap of size K:
function findKthLargest(nums, k) {
  // Keep a min-heap of size k
  let heap = nums.slice(0, k).sort((a, b) => a - b);
  for (let i = k; i < nums.length; i++) {
    if (nums[i] > heap[0]) {
      heap[0] = nums[i];
      heap.sort((a, b) => a - b); // simplified re-heapify
    }
  }
  return heap[0]; // Kth largest
}

// Top K Frequent:
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}`,
    python:
      'import heapq\n# Min heap (default in Python)\nheap = []\nheapq.heappush(heap, val)\nmin_val = heapq.heappop(heap)\n\n# Max heap: negate values\nheapq.heappush(heap, -val)\nmax_val = -heapq.heappop(heap)',
  },
  questions: [
    {
      id: 271,
      leetcodeNum: 215,
      title: 'Kth Largest Element in an Array',
      difficulty: 'Medium',
      tags: ['Array', 'Divide and Conquer', 'Sorting', 'Heap'],
      isClassic: true,
      frequency: 10,
      leetcodeUrl:
        'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    },
    {
      id: 272,
      leetcodeNum: 347,
      title: 'Top K Frequent Elements',
      difficulty: 'Medium',
      tags: [
        'Array',
        'Hash Table',
        'Divide and Conquer',
        'Sorting',
        'Heap',
        'Bucket Sort',
        'Counting',
        'Quickselect',
      ],
      isClassic: true,
      frequency: 10,
      leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
    },
    {
      id: 273,
      leetcodeNum: 23,
      title: 'Merge k Sorted Lists',
      difficulty: 'Hard',
      tags: ['Linked List', 'Divide and Conquer', 'Heap', 'Merge Sort'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    },
    {
      id: 274,
      leetcodeNum: 295,
      title: 'Find Median from Data Stream',
      difficulty: 'Hard',
      tags: ['Two Pointers', 'Design', 'Sorting', 'Heap', 'Data Stream'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl:
        'https://leetcode.com/problems/find-median-from-data-stream/',
    },
    {
      id: 275,
      leetcodeNum: 703,
      title: 'Kth Largest Element in a Stream',
      difficulty: 'Easy',
      tags: [
        'Tree',
        'Design',
        'Binary Search Tree',
        'Heap',
        'Binary Tree',
        'Data Stream',
      ],
      isClassic: true,
      frequency: 8,
      leetcodeUrl:
        'https://leetcode.com/problems/kth-largest-element-in-a-stream/',
    },
    {
      id: 276,
      leetcodeNum: 973,
      title: 'K Closest Points to Origin',
      difficulty: 'Medium',
      tags: [
        'Array',
        'Math',
        'Divide and Conquer',
        'Sorting',
        'Heap',
        'Quickselect',
        'Geometry',
      ],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/',
    },
    {
      id: 277,
      leetcodeNum: 621,
      title: 'Task Scheduler',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'Greedy', 'Sorting', 'Heap', 'Counting'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/task-scheduler/',
    },
    {
      id: 278,
      leetcodeNum: 355,
      title: 'Design Twitter',
      difficulty: 'Medium',
      tags: ['Hash Table', 'Linked List', 'Design', 'Heap'],
      isClassic: false,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/design-twitter/',
    },
    {
      id: 279,
      leetcodeNum: 1046,
      title: 'Last Stone Weight',
      difficulty: 'Easy',
      tags: ['Array', 'Heap'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/last-stone-weight/',
    },
    {
      id: 280,
      leetcodeNum: 378,
      title: 'Kth Smallest Element in a Sorted Matrix',
      difficulty: 'Medium',
      tags: ['Array', 'Binary Search', 'Sorting', 'Heap', 'Matrix'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl:
        'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/',
    },
    {
      id: 281,
      leetcodeNum: 373,
      title: 'Find K Pairs with Smallest Sums',
      difficulty: 'Medium',
      tags: ['Array', 'Heap'],
      isClassic: false,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/',
    },
    {
      id: 282,
      leetcodeNum: 632,
      title: 'Smallest Range Covering Elements from K Lists',
      difficulty: 'Hard',
      tags: [
        'Array',
        'Hash Table',
        'Greedy',
        'Sliding Window',
        'Sorting',
        'Heap',
      ],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/',
    },
    {
      id: 283,
      leetcodeNum: 1642,
      title: 'Furthest Building You Can Reach',
      difficulty: 'Medium',
      tags: ['Array', 'Greedy', 'Heap'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/furthest-building-you-can-reach/',
    },
    {
      id: 284,
      leetcodeNum: 2542,
      title: 'Maximum Subsequence Score',
      difficulty: 'Medium',
      tags: ['Array', 'Greedy', 'Sorting', 'Heap'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/maximum-subsequence-score/',
    },
    {
      id: 285,
      leetcodeNum: 2530,
      title: 'Maximal Score After Applying K Operations',
      difficulty: 'Medium',
      tags: ['Array', 'Greedy', 'Heap'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/maximal-score-after-applying-k-operations/',
    },
    {
      id: 286,
      leetcodeNum: 2336,
      title: 'Smallest Number in Infinite Set',
      difficulty: 'Medium',
      tags: ['Hash Table', 'Design', 'Heap'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/smallest-number-in-infinite-set/',
    },
    {
      id: 287,
      leetcodeNum: 2462,
      title: 'Total Cost to Hire K Workers',
      difficulty: 'Medium',
      tags: ['Array', 'Two Pointers', 'Greedy', 'Heap', 'Simulation'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/total-cost-to-hire-k-workers/',
    },
    {
      id: 288,
      leetcodeNum: 1167,
      title: 'Minimum Cost to Connect Sticks',
      difficulty: 'Medium',
      tags: ['Array', 'Greedy', 'Heap'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-cost-to-connect-sticks/',
    },
    {
      id: 289,
      leetcodeNum: 218,
      title: 'The Skyline Problem',
      difficulty: 'Hard',
      tags: [
        'Array',
        'Divide and Conquer',
        'Binary Indexed Tree',
        'Segment Tree',
        'Line Sweep',
        'Heap',
        'Ordered Set',
      ],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/the-skyline-problem/',
    },
    {
      id: 290,
      leetcodeNum: 1675,
      title: 'Minimize Deviation in Array',
      difficulty: 'Hard',
      tags: ['Array', 'Greedy', 'Heap', 'Ordered Set'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/minimize-deviation-in-array/',
    },
    {
      id: 291,
      leetcodeNum: 1353,
      title: 'Maximum Number of Events That Can Be Attended',
      difficulty: 'Medium',
      tags: ['Array', 'Greedy', 'Sorting', 'Heap'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/',
    },
    {
      id: 292,
      leetcodeNum: 2093,
      title: 'Minimum Cost to Reach City With Discounts',
      difficulty: 'Medium',
      tags: ['Graph', 'Heap', 'Shortest Path'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-cost-to-reach-city-with-discounts/',
    },
    {
      id: 293,
      leetcodeNum: 786,
      title: 'K-th Smallest Prime Fraction',
      difficulty: 'Medium',
      tags: ['Array', 'Two Pointers', 'Binary Search', 'Sorting', 'Heap'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/k-th-smallest-prime-fraction/',
    },
    {
      id: 294,
      leetcodeNum: 857,
      title: 'Minimum Cost to Hire K Workers',
      difficulty: 'Hard',
      tags: ['Array', 'Greedy', 'Sorting', 'Heap'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-cost-to-hire-k-workers/',
    },
    {
      id: 295,
      leetcodeNum: 1405,
      title: 'Longest Happy String',
      difficulty: 'Medium',
      tags: ['String', 'Greedy', 'Heap'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/longest-happy-string/',
    },
    {
      id: 296,
      leetcodeNum: 358,
      title: 'Rearrange String k Distance Apart',
      difficulty: 'Hard',
      tags: ['Hash Table', 'String', 'Greedy', 'Sorting', 'Heap', 'Counting'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/rearrange-string-k-distance-apart/',
    },
    {
      id: 297,
      leetcodeNum: 767,
      title: 'Reorganize String',
      difficulty: 'Medium',
      tags: ['Hash Table', 'String', 'Greedy', 'Sorting', 'Heap', 'Counting'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/reorganize-string/',
    },
    {
      id: 298,
      leetcodeNum: 1383,
      title: 'Maximum Performance of a Team',
      difficulty: 'Hard',
      tags: ['Array', 'Greedy', 'Sorting', 'Heap'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-performance-of-a-team/',
    },
    {
      id: 299,
      leetcodeNum: 2233,
      title: 'Maximum Product After K Increments',
      difficulty: 'Medium',
      tags: ['Array', 'Greedy', 'Heap'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-product-after-k-increments/',
    },
    {
      id: 300,
      leetcodeNum: 2208,
      title: 'Minimum Operations to Halve Array Sum',
      difficulty: 'Medium',
      tags: ['Array', 'Greedy', 'Heap'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-operations-to-halve-array-sum/',
    },
  ],
};

const subset: PatternData = {
  id: 'subset',
  name: 'Subsets / Backtracking',
  slug: 'subset',
  category: 'Dynamic Programming',
  difficulty: 'Intermediate',
  icon: '🎯',
  color: '#ef4444',
  order: 11,
  description:
    'Generate all valid subsets, permutations, or combinations by exploring choices recursively and pruning.',
  coreIdea:
    'At each step: include or exclude. Prune invalid branches early. State: (index, current_path).',
  whenToUse: [
    'All permutations/combinations/subsets',
    'Solve puzzle or board',
    'Choices at each step',
  ],
  triggers: [
    'all permutations',
    'all combinations',
    'all subsets',
    'generate all',
    'n-queens',
    'sudoku',
  ],
  timeComplexity: 'O(2^n) or O(n!)',
  spaceComplexity: 'O(n)',
  examples: ['Subsets', 'Permutations', 'Combination Sum', 'N-Queens'],
  prerequisites: ['Recursion', 'Arrays'],
  template: {
    javascript: `function subsets(nums) {
  const result = [];

  function backtrack(start, path) {
    result.push([...path]); // current subset

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);       // choose
      backtrack(i + 1, path);  // explore (i+1 = no reuse)
      path.pop();              // unchoose
    }
  }

  backtrack(0, []);
  return result;
}

// Permutations:
function permutations(nums) {
  const result = [];
  function bt(path, used) {
    if (path.length === nums.length) { result.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(nums[i]);
      bt(path, used);
      used[i] = false; path.pop();
    }
  }
  bt([], {});
  return result;
}`,
    python:
      'def backtrack(start, path, result):\n    result.append(path[:])\n    for i in range(start, len(nums)):\n        path.append(nums[i])\n        backtrack(i + 1, path, result)  # i+1 = no reuse, i = reuse\n        path.pop()  # undo choice',
  },
  questions: [
    {
      id: 301,
      leetcodeNum: 78,
      title: 'Subsets',
      difficulty: 'Medium',
      tags: ['Array', 'Backtracking', 'Bit Manipulation'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/subsets/',
    },
    {
      id: 302,
      leetcodeNum: 46,
      title: 'Permutations',
      difficulty: 'Medium',
      tags: ['Array', 'Backtracking'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/permutations/',
    },
    {
      id: 303,
      leetcodeNum: 39,
      title: 'Combination Sum',
      difficulty: 'Medium',
      tags: ['Array', 'Backtracking'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/combination-sum/',
    },
    {
      id: 304,
      leetcodeNum: 40,
      title: 'Combination Sum II',
      difficulty: 'Medium',
      tags: ['Array', 'Backtracking'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/combination-sum-ii/',
    },
    {
      id: 305,
      leetcodeNum: 51,
      title: 'N-Queens',
      difficulty: 'Hard',
      tags: ['Array', 'Backtracking'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/n-queens/',
    },
    {
      id: 306,
      leetcodeNum: 52,
      title: 'N-Queens II',
      difficulty: 'Hard',
      tags: ['Backtracking'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/n-queens-ii/',
    },
    {
      id: 307,
      leetcodeNum: 90,
      title: 'Subsets II',
      difficulty: 'Medium',
      tags: ['Array', 'Backtracking', 'Bit Manipulation'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/subsets-ii/',
    },
    {
      id: 308,
      leetcodeNum: 47,
      title: 'Permutations II',
      difficulty: 'Medium',
      tags: ['Array', 'Backtracking'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/permutations-ii/',
    },
    {
      id: 309,
      leetcodeNum: 77,
      title: 'Combinations',
      difficulty: 'Medium',
      tags: ['Backtracking'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/combinations/',
    },
    {
      id: 310,
      leetcodeNum: 37,
      title: 'Sudoku Solver',
      difficulty: 'Hard',
      tags: ['Array', 'Hash Table', 'Backtracking', 'Matrix'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/sudoku-solver/',
    },
    {
      id: 311,
      leetcodeNum: 17,
      title: 'Letter Combinations of a Phone Number',
      difficulty: 'Medium',
      tags: ['Hash Table', 'String', 'Backtracking'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl:
        'https://leetcode.com/problems/letter-combinations-of-a-phone-number/',
    },
    {
      id: 312,
      leetcodeNum: 22,
      title: 'Generate Parentheses',
      difficulty: 'Medium',
      tags: ['String', 'DP', 'Backtracking'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/',
    },
    {
      id: 313,
      leetcodeNum: 79,
      title: 'Word Search',
      difficulty: 'Medium',
      tags: ['Array', 'String', 'Backtracking', 'Matrix'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/word-search/',
    },
    {
      id: 314,
      leetcodeNum: 131,
      title: 'Palindrome Partitioning',
      difficulty: 'Medium',
      tags: ['String', 'DP', 'Backtracking'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/palindrome-partitioning/',
    },
    {
      id: 315,
      leetcodeNum: 93,
      title: 'Restore IP Addresses',
      difficulty: 'Medium',
      tags: ['String', 'Backtracking'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/restore-ip-addresses/',
    },
    {
      id: 316,
      leetcodeNum: 216,
      title: 'Combination Sum III',
      difficulty: 'Medium',
      tags: ['Array', 'Backtracking'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/combination-sum-iii/',
    },
    {
      id: 317,
      leetcodeNum: 1239,
      title: 'Maximum Length of a Concatenated String with Unique Characters',
      difficulty: 'Medium',
      tags: ['Array', 'String', 'Backtracking', 'Bit Manipulation'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/',
    },
    {
      id: 318,
      leetcodeNum: 1849,
      title: 'Splitting a String Into Descending Consecutive Values',
      difficulty: 'Medium',
      tags: ['String', 'Backtracking'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/splitting-a-string-into-descending-consecutive-values/',
    },
    {
      id: 319,
      leetcodeNum: 2044,
      title: 'Count Number of Maximum Bitwise-OR Subsets',
      difficulty: 'Medium',
      tags: ['Array', 'Backtracking', 'Bit Manipulation', 'Enumeration'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets/',
    },
    {
      id: 320,
      leetcodeNum: 980,
      title: 'Unique Paths III',
      difficulty: 'Hard',
      tags: ['Array', 'Backtracking', 'Bit Manipulation', 'Matrix'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/unique-paths-iii/',
    },
    {
      id: 321,
      leetcodeNum: 1723,
      title: 'Find Minimum Time to Finish All Jobs',
      difficulty: 'Hard',
      tags: ['Array', 'DP', 'Backtracking', 'Bit Manipulation', 'Bitmask'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs/',
    },
    {
      id: 322,
      leetcodeNum: 2597,
      title: 'The Number of Beautiful Subsets',
      difficulty: 'Medium',
      tags: ['Array', 'Math', 'DP', 'Backtracking', 'Sorting', 'Combinatorics'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/the-number-of-beautiful-subsets/',
    },
    {
      id: 323,
      leetcodeNum: 491,
      title: 'Non-decreasing Subsequences',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'Backtracking', 'Bit Manipulation'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/non-decreasing-subsequences/',
    },
    {
      id: 324,
      leetcodeNum: 1601,
      title: 'Maximum Number of Achievable Transfer Requests',
      difficulty: 'Hard',
      tags: ['Array', 'Backtracking', 'Bit Manipulation', 'Enumeration'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-number-of-achievable-transfer-requests/',
    },
    {
      id: 325,
      leetcodeNum: 1307,
      title: 'Verbal Arithmetic Puzzle',
      difficulty: 'Hard',
      tags: ['Array', 'Math', 'String', 'Backtracking'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl: 'https://leetcode.com/problems/verbal-arithmetic-puzzle/',
    },
    {
      id: 326,
      leetcodeNum: 1755,
      title: 'Closest Subsequence Sum',
      difficulty: 'Hard',
      tags: ['Array', 'Two Pointers', 'DP', 'Bit Manipulation', 'Bitmask'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl: 'https://leetcode.com/problems/closest-subsequence-sum/',
    },
    {
      id: 327,
      leetcodeNum: 1994,
      title: 'The Number of Good Subsets',
      difficulty: 'Hard',
      tags: ['Array', 'Math', 'DP', 'Bit Manipulation', 'Bitmask'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl: 'https://leetcode.com/problems/the-number-of-good-subsets/',
    },
    {
      id: 328,
      leetcodeNum: 306,
      title: 'Additive Number',
      difficulty: 'Medium',
      tags: ['String', 'Backtracking'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/additive-number/',
    },
    {
      id: 329,
      leetcodeNum: 842,
      title: 'Split Array into Fibonacci Sequence',
      difficulty: 'Medium',
      tags: ['String', 'Backtracking', 'Greedy'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/split-array-into-fibonacci-sequence/',
    },
    {
      id: 330,
      leetcodeNum: 2664,
      title: "The Knight's Tour",
      difficulty: 'Medium',
      tags: ['Array', 'Backtracking', 'Matrix', 'Simulation'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl: 'https://leetcode.com/problems/the-knights-tour/',
    },
  ],
};

const dp: PatternData = {
  id: 'dp',
  name: 'Dynamic Programming',
  slug: 'dp',
  category: 'Dynamic Programming',
  difficulty: 'Advanced',
  icon: '🧠',
  color: '#6366f1',
  order: 12,
  description:
    'Cache overlapping subproblem results to turn exponential recursion into polynomial time.',
  coreIdea:
    'DP = recursion + memoization OR bottom-up table. State definition is everything.',
  whenToUse: [
    'Count number of ways',
    'Find max/min value',
    'Optimize choices over a sequence',
    'Longest subsequence',
  ],
  triggers: [
    'number of ways',
    'maximum profit',
    'minimum cost',
    'longest subsequence',
    'can you reach',
    'optimal',
  ],
  timeComplexity: 'O(n²) typical, O(n) for 1D DP',
  spaceComplexity: 'O(n) or O(1) with space optimization',
  examples: [
    'Climbing Stairs',
    'Coin Change',
    'Longest Common Subsequence',
    'House Robber',
  ],
  prerequisites: ['Recursion', 'Arrays'],
  template: {
    javascript: `// 1D DP — Climbing Stairs
function climbStairs(n) {
  if (n <= 2) return n;
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1; dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// Top-down Memoization:
function climbMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return n;
  return memo[n] = climbMemo(n - 1, memo) + climbMemo(n - 2, memo);
}

// Coin Change (unbounded knapsack):
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    python:
      '# 1D DP Example: Climbing Stairs\ndef climbStairs(n):\n    if n <= 2: return n\n    dp = [0] * (n + 1)\n    dp[1], dp[2] = 1, 2\n    for i in range(3, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]',
  },
  questions: [
    {
      id: 331,
      leetcodeNum: 70,
      title: 'Climbing Stairs',
      difficulty: 'Easy',
      tags: ['Math', 'DP', 'Memoization'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
    },
    {
      id: 332,
      leetcodeNum: 198,
      title: 'House Robber',
      difficulty: 'Medium',
      tags: ['Array', 'DP'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/house-robber/',
    },
    {
      id: 333,
      leetcodeNum: 213,
      title: 'House Robber II',
      difficulty: 'Medium',
      tags: ['Array', 'DP'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/house-robber-ii/',
    },
    {
      id: 334,
      leetcodeNum: 322,
      title: 'Coin Change',
      difficulty: 'Medium',
      tags: ['Array', 'DP', 'BFS'],
      isClassic: true,
      frequency: 10,
      leetcodeUrl: 'https://leetcode.com/problems/coin-change/',
    },
    {
      id: 335,
      leetcodeNum: 300,
      title: 'Longest Increasing Subsequence',
      difficulty: 'Medium',
      tags: ['Array', 'Binary Search', 'DP'],
      isClassic: true,
      frequency: 10,
      leetcodeUrl:
        'https://leetcode.com/problems/longest-increasing-subsequence/',
    },
    {
      id: 336,
      leetcodeNum: 1143,
      title: 'Longest Common Subsequence',
      difficulty: 'Medium',
      tags: ['String', 'DP'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/',
    },
    {
      id: 337,
      leetcodeNum: 72,
      title: 'Edit Distance',
      difficulty: 'Medium',
      tags: ['String', 'DP'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/edit-distance/',
    },
    {
      id: 338,
      leetcodeNum: 416,
      title: 'Partition Equal Subset Sum',
      difficulty: 'Medium',
      tags: ['Array', 'DP'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/',
    },
    {
      id: 339,
      leetcodeNum: 494,
      title: 'Target Sum',
      difficulty: 'Medium',
      tags: ['Array', 'DP', 'Backtracking'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/target-sum/',
    },
    {
      id: 340,
      leetcodeNum: 518,
      title: 'Coin Change II',
      difficulty: 'Medium',
      tags: ['Array', 'DP'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/coin-change-ii/',
    },
    {
      id: 341,
      leetcodeNum: 139,
      title: 'Word Break',
      difficulty: 'Medium',
      tags: ['Hash Table', 'String', 'DP', 'Trie', 'Memoization'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/word-break/',
    },
    {
      id: 342,
      leetcodeNum: 152,
      title: 'Maximum Product Subarray',
      difficulty: 'Medium',
      tags: ['Array', 'DP'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/',
    },
    {
      id: 343,
      leetcodeNum: 309,
      title: 'Best Time to Buy and Sell Stock with Cooldown',
      difficulty: 'Medium',
      tags: ['Array', 'DP'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/',
    },
    {
      id: 344,
      leetcodeNum: 188,
      title: 'Best Time to Buy and Sell Stock IV',
      difficulty: 'Hard',
      tags: ['Array', 'DP'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/',
    },
    {
      id: 345,
      leetcodeNum: 312,
      title: 'Burst Balloons',
      difficulty: 'Hard',
      tags: ['Array', 'DP'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/burst-balloons/',
    },
    {
      id: 346,
      leetcodeNum: 10,
      title: 'Regular Expression Matching',
      difficulty: 'Hard',
      tags: ['String', 'DP', 'Recursion'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/regular-expression-matching/',
    },
    {
      id: 347,
      leetcodeNum: 44,
      title: 'Wildcard Matching',
      difficulty: 'Hard',
      tags: ['String', 'DP', 'Greedy', 'Recursion'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/wildcard-matching/',
    },
    {
      id: 348,
      leetcodeNum: 62,
      title: 'Unique Paths',
      difficulty: 'Medium',
      tags: ['Math', 'DP', 'Combinatorics'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/unique-paths/',
    },
    {
      id: 349,
      leetcodeNum: 64,
      title: 'Minimum Path Sum',
      difficulty: 'Medium',
      tags: ['Array', 'DP', 'Matrix'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/minimum-path-sum/',
    },
    {
      id: 350,
      leetcodeNum: 97,
      title: 'Interleaving String',
      difficulty: 'Medium',
      tags: ['String', 'DP', 'Memoization'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/interleaving-string/',
    },
    {
      id: 351,
      leetcodeNum: 115,
      title: 'Distinct Subsequences',
      difficulty: 'Hard',
      tags: ['String', 'DP'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/distinct-subsequences/',
    },
    {
      id: 352,
      leetcodeNum: 516,
      title: 'Longest Palindromic Subsequence',
      difficulty: 'Medium',
      tags: ['String', 'DP'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/longest-palindromic-subsequence/',
    },
    {
      id: 353,
      leetcodeNum: 5,
      title: 'Longest Palindromic Substring',
      difficulty: 'Medium',
      tags: ['String', 'DP'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl:
        'https://leetcode.com/problems/longest-palindromic-substring/',
    },
    {
      id: 354,
      leetcodeNum: 647,
      title: 'Palindromic Substrings',
      difficulty: 'Medium',
      tags: ['String', 'DP'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/palindromic-substrings/',
    },
    {
      id: 355,
      leetcodeNum: 1277,
      title: 'Count Square Submatrices with All Ones',
      difficulty: 'Medium',
      tags: ['Array', 'DP', 'Matrix'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/count-square-submatrices-with-all-ones/',
    },
    {
      id: 356,
      leetcodeNum: 221,
      title: 'Maximal Square',
      difficulty: 'Medium',
      tags: ['Array', 'DP', 'Matrix'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/maximal-square/',
    },
    {
      id: 357,
      leetcodeNum: 1048,
      title: 'Longest String Chain',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'Two Pointers', 'String', 'DP'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/longest-string-chain/',
    },
    {
      id: 358,
      leetcodeNum: 1155,
      title: 'Number of Dice Rolls With Target Sum',
      difficulty: 'Medium',
      tags: ['DP'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/',
    },
    {
      id: 359,
      leetcodeNum: 2140,
      title: 'Solving Questions With Brainpower',
      difficulty: 'Medium',
      tags: ['Array', 'DP'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/solving-questions-with-brainpower/',
    },
    {
      id: 360,
      leetcodeNum: 2466,
      title: 'Count Ways To Build Good Strings',
      difficulty: 'Medium',
      tags: ['DP'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/count-ways-to-build-good-strings/',
    },
  ],
};

const bitManipulation: PatternData = {
  id: 'bit-manipulation',
  name: 'Bit Manipulation',
  slug: 'bit-manipulation',
  category: 'Bit Manipulation',
  difficulty: 'Intermediate',
  icon: '⚙️',
  color: '#64748b',
  order: 13,
  description:
    'Use XOR, AND, OR, shifts for O(1) space tricks — uniqueness, power-of-2, bit counting.',
  coreIdea:
    'XOR: a^a=0, a^0=a. AND: masking. OR: setting bits. Shifts: multiply/divide by 2.',
  whenToUse: [
    'Find single number',
    'Check power of 2',
    'Count set bits',
    'Subset enumeration with bitmask',
  ],
  triggers: [
    'XOR',
    'single number',
    'power of 2',
    'count bits',
    'bitmask',
    'bit trick',
  ],
  timeComplexity: 'O(1) to O(n)',
  spaceComplexity: 'O(1)',
  examples: [
    'Single Number',
    'Number of 1 Bits',
    'Reverse Bits',
    'Missing Number',
  ],
  prerequisites: ['Basic math', 'Arrays'],
  template: {
    javascript: `// XOR tricks:
// a ^ a = 0  (same numbers cancel)
// a ^ 0 = a  (XOR with 0 = identity)

function singleNumber(nums) {
  return nums.reduce((acc, n) => acc ^ n, 0);
}

// Power of 2 check:
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

// Count set bits (popcount):
function countBits(n) {
  let count = 0;
  while (n) {
    count += n & 1;
    n >>>= 1; // unsigned right shift
  }
  return count;
}

// Missing number (XOR approach):
function missingNumber(nums) {
  let xor = nums.length;
  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];
  }
  return xor;
}`,
    python:
      '# XOR trick: find single number\ndef singleNumber(nums):\n    res = 0\n    for n in nums:\n        res ^= n\n    return res\n\n# Count set bits (Brian Kernighan)\ndef countBits(n):\n    count = 0\n    while n:\n        n &= n - 1  # removes lowest set bit\n        count += 1\n    return count',
  },
  questions: [
    {
      id: 361,
      leetcodeNum: 136,
      title: 'Single Number',
      difficulty: 'Easy',
      tags: ['Array', 'Bit Manipulation'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/single-number/',
    },
    {
      id: 362,
      leetcodeNum: 191,
      title: 'Number of 1 Bits',
      difficulty: 'Easy',
      tags: ['Divide and Conquer', 'Bit Manipulation'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/',
    },
    {
      id: 363,
      leetcodeNum: 338,
      title: 'Counting Bits',
      difficulty: 'Easy',
      tags: ['DP', 'Bit Manipulation'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/counting-bits/',
    },
    {
      id: 364,
      leetcodeNum: 190,
      title: 'Reverse Bits',
      difficulty: 'Easy',
      tags: ['Divide and Conquer', 'Bit Manipulation'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/reverse-bits/',
    },
    {
      id: 365,
      leetcodeNum: 268,
      title: 'Missing Number',
      difficulty: 'Easy',
      tags: ['Array', 'Math', 'Bit Manipulation', 'Sorting'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/missing-number/',
    },
    {
      id: 366,
      leetcodeNum: 231,
      title: 'Power of Two',
      difficulty: 'Easy',
      tags: ['Math', 'Bit Manipulation', 'Recursion'],
      isClassic: true,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/power-of-two/',
    },
    {
      id: 367,
      leetcodeNum: 137,
      title: 'Single Number II',
      difficulty: 'Medium',
      tags: ['Array', 'Bit Manipulation'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/single-number-ii/',
    },
    {
      id: 368,
      leetcodeNum: 260,
      title: 'Single Number III',
      difficulty: 'Medium',
      tags: ['Array', 'Bit Manipulation'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/single-number-iii/',
    },
    {
      id: 369,
      leetcodeNum: 201,
      title: 'Bitwise AND of Numbers Range',
      difficulty: 'Medium',
      tags: ['Bit Manipulation'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/bitwise-and-of-numbers-range/',
    },
    {
      id: 370,
      leetcodeNum: 1318,
      title: 'Minimum Flips to Make a OR b Equal to c',
      difficulty: 'Medium',
      tags: ['Bit Manipulation'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/',
    },
    {
      id: 371,
      leetcodeNum: 371,
      title: 'Sum of Two Integers',
      difficulty: 'Medium',
      tags: ['Math', 'Bit Manipulation'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/sum-of-two-integers/',
    },
    {
      id: 372,
      leetcodeNum: 2220,
      title: 'Minimum Bit Flips to Convert Number',
      difficulty: 'Easy',
      tags: ['Bit Manipulation'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-bit-flips-to-convert-number/',
    },
    {
      id: 373,
      leetcodeNum: 1371,
      title: 'Find the Longest Substring Containing Vowels in Even Counts',
      difficulty: 'Medium',
      tags: ['Hash Table', 'String', 'Bit Manipulation', 'Prefix Sum'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/',
    },
    {
      id: 374,
      leetcodeNum: 2461,
      title: 'Maximum Sum of Distinct Subarrays With Length K',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'Sliding Window'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/',
    },
    {
      id: 375,
      leetcodeNum: 421,
      title: 'Maximum XOR of Two Numbers in an Array',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'Bit Manipulation', 'Trie'],
      isClassic: true,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/',
    },
    {
      id: 376,
      leetcodeNum: 1442,
      title: 'Count Triplets That Can Form Two Arrays of Equal XOR',
      difficulty: 'Medium',
      tags: ['Array', 'Math', 'Bit Manipulation', 'Hash Table', 'Prefix Sum'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/',
    },
    {
      id: 377,
      leetcodeNum: 2401,
      title: 'Longest Nice Subarray',
      difficulty: 'Medium',
      tags: ['Array', 'Bit Manipulation', 'Sliding Window'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/longest-nice-subarray/',
    },
    {
      id: 378,
      leetcodeNum: 1829,
      title: 'Maximum XOR for Each Query',
      difficulty: 'Medium',
      tags: ['Array', 'Bit Manipulation', 'Prefix Sum'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/maximum-xor-for-each-query/',
    },
    {
      id: 379,
      leetcodeNum: 2275,
      title: 'Largest Combination With Bitwise AND Greater Than Zero',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'Bit Manipulation', 'Counting', 'Greedy'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero/',
    },
    {
      id: 380,
      leetcodeNum: 2419,
      title: 'Longest Subarray With Maximum Bitwise AND',
      difficulty: 'Medium',
      tags: ['Array', 'Bit Manipulation', 'Brainteaser'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and/',
    },
    {
      id: 381,
      leetcodeNum: 3011,
      title: 'Find if Array Can Be Sorted',
      difficulty: 'Medium',
      tags: ['Array', 'Bit Manipulation', 'Sorting'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/find-if-array-can-be-sorted/',
    },
    {
      id: 382,
      leetcodeNum: 2997,
      title: 'Minimum Number of Operations to Make Array XOR Equal to K',
      difficulty: 'Medium',
      tags: ['Array', 'Bit Manipulation'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-number-of-operations-to-make-array-xor-equal-to-k/',
    },
    {
      id: 383,
      leetcodeNum: 2871,
      title: 'Split Array Into Maximum Number of Subarrays',
      difficulty: 'Medium',
      tags: ['Array', 'Greedy', 'Bit Manipulation'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/split-array-into-maximum-number-of-subarrays/',
    },
    {
      id: 384,
      leetcodeNum: 2939,
      title: 'Maximum Xor Product',
      difficulty: 'Medium',
      tags: ['Math', 'Greedy', 'Bit Manipulation'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl: 'https://leetcode.com/problems/maximum-xor-product/',
    },
    {
      id: 385,
      leetcodeNum: 477,
      title: 'Total Hamming Distance',
      difficulty: 'Medium',
      tags: ['Array', 'Math', 'Bit Manipulation'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/total-hamming-distance/',
    },
    {
      id: 386,
      leetcodeNum: 461,
      title: 'Hamming Distance',
      difficulty: 'Easy',
      tags: ['Bit Manipulation'],
      isClassic: true,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/hamming-distance/',
    },
    {
      id: 387,
      leetcodeNum: 693,
      title: 'Binary Number with Alternating Bits',
      difficulty: 'Easy',
      tags: ['Bit Manipulation'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/binary-number-with-alternating-bits/',
    },
    {
      id: 388,
      leetcodeNum: 762,
      title: 'Prime Number of Set Bits in Binary Representation',
      difficulty: 'Easy',
      tags: ['Math', 'Bit Manipulation'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation/',
    },
    {
      id: 389,
      leetcodeNum: 2059,
      title: 'Minimum Operations to Convert Number',
      difficulty: 'Medium',
      tags: ['Array', 'BFS', 'Bit Manipulation'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-operations-to-convert-number/',
    },
    {
      id: 390,
      leetcodeNum: 2429,
      title: 'Minimize XOR',
      difficulty: 'Medium',
      tags: ['Math', 'Bit Manipulation', 'Greedy'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/minimize-xor/',
    },
  ],
};

const trie: PatternData = {
  id: 'trie',
  name: 'Trie',
  slug: 'trie',
  category: 'Tries',
  difficulty: 'Advanced',
  icon: '🌐',
  color: '#0ea5e9',
  order: 14,
  description:
    'Prefix tree where each path root→leaf represents a word. O(L) insert/search where L=word length.',
  coreIdea:
    'Node has children[26] + isEnd flag. Shared prefixes share nodes — space-efficient for word sets.',
  whenToUse: [
    'Word search / prefix search',
    'Autocomplete',
    'Dictionary lookups',
    'XOR maximization (binary trie)',
  ],
  triggers: [
    'prefix',
    'autocomplete',
    'dictionary',
    'starts with',
    'word search',
    'spell checker',
    'suggest words',
  ],
  timeComplexity: 'O(L) per operation',
  spaceComplexity: 'O(ALPHABET × L × N)',
  examples: [
    'Implement Trie',
    'Word Search II',
    'Search Suggestions System',
    'Replace Words',
  ],
  prerequisites: ['Trees', 'Hashmaps', 'DFS'],
  template: {
    javascript: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return true;
  }
}`,
    python:
      'class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self): self.root = TrieNode()\n    \n    def insert(self, word):\n        node = self.root\n        for c in word:\n            if c not in node.children:\n                node.children[c] = TrieNode()\n            node = node.children[c]\n        node.is_end = True\n    \n    def search(self, word):\n        node = self.root\n        for c in word:\n            if c not in node.children: return False\n            node = node.children[c]\n        return node.is_end',
  },
  questions: [
    {
      id: 391,
      leetcodeNum: 208,
      title: 'Implement Trie (Prefix Tree)',
      difficulty: 'Medium',
      tags: ['Hash Table', 'String', 'Design', 'Trie'],
      isClassic: true,
      frequency: 10,
      leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
    },
    {
      id: 392,
      leetcodeNum: 211,
      title: 'Design Add and Search Words Data Structure',
      difficulty: 'Medium',
      tags: ['String', 'DFS', 'Design', 'Trie'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl:
        'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
    },
    {
      id: 393,
      leetcodeNum: 212,
      title: 'Word Search II',
      difficulty: 'Hard',
      tags: ['Array', 'String', 'Backtracking', 'Trie', 'Matrix'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/',
    },
    {
      id: 394,
      leetcodeNum: 648,
      title: 'Replace Words',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'String', 'Trie'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/replace-words/',
    },
    {
      id: 395,
      leetcodeNum: 676,
      title: 'Implement Magic Dictionary',
      difficulty: 'Medium',
      tags: ['Hash Table', 'String', 'DFS', 'Trie'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/implement-magic-dictionary/',
    },
    {
      id: 396,
      leetcodeNum: 1268,
      title: 'Search Suggestions System',
      difficulty: 'Medium',
      tags: ['Array', 'String', 'Binary Search', 'Trie', 'Sorting', 'Heap'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/search-suggestions-system/',
    },
    {
      id: 397,
      leetcodeNum: 472,
      title: 'Concatenated Words',
      difficulty: 'Hard',
      tags: ['Array', 'String', 'DP', 'DFS', 'Trie'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/concatenated-words/',
    },
    {
      id: 398,
      leetcodeNum: 336,
      title: 'Palindrome Pairs',
      difficulty: 'Hard',
      tags: ['Array', 'Hash Table', 'String', 'Trie'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/palindrome-pairs/',
    },
    {
      id: 399,
      leetcodeNum: 421,
      title: 'Maximum XOR of Two Numbers in an Array',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'Bit Manipulation', 'Trie'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/',
    },
    {
      id: 400,
      leetcodeNum: 1707,
      title: 'Maximum XOR With an Element From Array',
      difficulty: 'Hard',
      tags: ['Array', 'Bit Manipulation', 'Trie'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-xor-with-an-element-from-array/',
    },
    {
      id: 401,
      leetcodeNum: 745,
      title: 'Prefix and Suffix Search',
      difficulty: 'Hard',
      tags: ['Hash Table', 'String', 'Design', 'Trie'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/prefix-and-suffix-search/',
    },
    {
      id: 402,
      leetcodeNum: 2416,
      title: 'Sum of Prefix Scores of Strings',
      difficulty: 'Hard',
      tags: ['Array', 'String', 'Trie', 'Counting'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/sum-of-prefix-scores-of-strings/',
    },
    {
      id: 403,
      leetcodeNum: 1803,
      title: 'Count Pairs With XOR in a Range',
      difficulty: 'Hard',
      tags: ['Array', 'Bit Manipulation', 'Trie'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/count-pairs-with-xor-in-a-range/',
    },
    {
      id: 404,
      leetcodeNum: 1938,
      title: 'Maximum Genetic Difference Query',
      difficulty: 'Hard',
      tags: ['Array', 'Bit Manipulation', 'Trie', 'DFS'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/maximum-genetic-difference-query/',
    },
    {
      id: 405,
      leetcodeNum: 2935,
      title: 'Maximum Strong Pair XOR II',
      difficulty: 'Hard',
      tags: [
        'Array',
        'Hash Table',
        'Bit Manipulation',
        'Trie',
        'Sliding Window',
      ],
      isClassic: false,
      frequency: 3,
      leetcodeUrl: 'https://leetcode.com/problems/maximum-strong-pair-xor-ii/',
    },
    {
      id: 406,
      leetcodeNum: 677,
      title: 'Map Sum Pairs',
      difficulty: 'Medium',
      tags: ['Hash Table', 'String', 'Design', 'Trie'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/map-sum-pairs/',
    },
    {
      id: 407,
      leetcodeNum: 1023,
      title: 'Camelcase Matching',
      difficulty: 'Medium',
      tags: ['Array', 'String', 'Two Pointers', 'Trie', 'String Matching'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/camelcase-matching/',
    },
    {
      id: 408,
      leetcodeNum: 2294,
      title: 'Partition Array Such That Maximum Difference Is K',
      difficulty: 'Medium',
      tags: ['Array', 'Greedy', 'Sorting'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/partition-array-such-that-maximum-difference-is-k/',
    },
    {
      id: 409,
      leetcodeNum: 3093,
      title: 'Longest Common Suffix Queries',
      difficulty: 'Hard',
      tags: ['Array', 'String', 'Trie'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/longest-common-suffix-queries/',
    },
    {
      id: 410,
      leetcodeNum: 2977,
      title: 'Minimum Cost to Convert String I',
      difficulty: 'Medium',
      tags: ['Array', 'String', 'Graph', 'Shortest Path'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-cost-to-convert-string-i/',
    },
    {
      id: 411,
      leetcodeNum: 14,
      title: 'Longest Common Prefix',
      difficulty: 'Easy',
      tags: ['String', 'Trie'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/longest-common-prefix/',
    },
    {
      id: 412,
      leetcodeNum: 720,
      title: 'Longest Word in Dictionary',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'String', 'Trie', 'Sorting'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/longest-word-in-dictionary/',
    },
    {
      id: 413,
      leetcodeNum: 2707,
      title: 'Extra Characters in a String',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'String', 'DP', 'Trie'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/extra-characters-in-a-string/',
    },
    {
      id: 414,
      leetcodeNum: 140,
      title: 'Word Break II',
      difficulty: 'Hard',
      tags: [
        'Hash Table',
        'String',
        'DP',
        'Backtracking',
        'Trie',
        'Memoization',
      ],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/word-break-ii/',
    },
    {
      id: 415,
      leetcodeNum: 212,
      title: 'Word Search II',
      difficulty: 'Hard',
      tags: ['Array', 'String', 'Backtracking', 'Trie', 'Matrix'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/',
    },
    {
      id: 416,
      leetcodeNum: 425,
      title: 'Word Squares',
      difficulty: 'Hard',
      tags: ['Array', 'String', 'Backtracking', 'Trie'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/word-squares/',
    },
    {
      id: 417,
      leetcodeNum: 527,
      title: 'Word Abbreviation',
      difficulty: 'Hard',
      tags: ['Array', 'String', 'Greedy', 'Trie', 'Sorting'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/word-abbreviation/',
    },
    {
      id: 418,
      leetcodeNum: 1065,
      title: 'Index Pairs of a String',
      difficulty: 'Easy',
      tags: ['Array', 'String', 'Trie', 'Sorting'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/index-pairs-of-a-string/',
    },
    {
      id: 419,
      leetcodeNum: 3042,
      title: 'Count Prefix and Suffix Pairs I',
      difficulty: 'Easy',
      tags: [
        'Array',
        'String',
        'Trie',
        'Rolling Hash',
        'String Matching',
        'Hash Function',
      ],
      isClassic: false,
      frequency: 3,
      leetcodeUrl:
        'https://leetcode.com/problems/count-prefix-and-suffix-pairs-i/',
    },
    {
      id: 420,
      leetcodeNum: 642,
      title: 'Design Search Autocomplete System',
      difficulty: 'Hard',
      tags: ['String', 'Design', 'Trie', 'Sorting', 'Heap'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/design-search-autocomplete-system/',
    },
  ],
};

const graph: PatternData = {
  id: 'graph',
  name: 'Graph Algorithms',
  slug: 'graph',
  category: 'Graphs',
  difficulty: 'Advanced',
  icon: '🕸️',
  color: '#84cc16',
  order: 15,
  description:
    'Union-Find, Dijkstra, Bellman-Ford, MST — advanced graph algorithms beyond basic BFS/DFS.',
  coreIdea:
    'Choose algorithm by problem: shortest path (Dijkstra), connectivity (Union-Find), MST (Kruskal/Prim).',
  whenToUse: [
    'Shortest weighted path',
    'Connected components',
    'Minimum spanning tree',
    'Detect cycle',
    'Network flow',
  ],
  triggers: [
    'shortest path weighted',
    'union find',
    'connected components',
    'minimum spanning tree',
    'network',
    'Dijkstra',
  ],
  timeComplexity: 'O((V+E) log V) Dijkstra',
  spaceComplexity: 'O(V+E)',
  examples: [
    'Network Delay Time',
    'Cheapest Flights',
    'Find Critical Connections',
    'Course Schedule',
  ],
  prerequisites: ['BFS', 'DFS', 'Heaps', 'Union-Find'],
  template: {
    javascript: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
    this.rank   = new Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const px = this.find(x), py = this.find(y);
    if (px === py) return false; // already connected → cycle!
    if (this.rank[px] < this.rank[py]) this.parent[px] = py;
    else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
    else { this.parent[py] = px; this.rank[px]++; }
    return true;
  }
}`,
    python:
      "import heapq\ndef dijkstra(graph, src, n):\n    dist = [float('inf')] * n\n    dist[src] = 0\n    heap = [(0, src)]  # (cost, node)\n    while heap:\n        d, u = heapq.heappop(heap)\n        if d > dist[u]: continue\n        for v, w in graph[u]:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                heapq.heappush(heap, (dist[v], v))\n    return dist",
  },
  questions: [
    {
      id: 421,
      leetcodeNum: 743,
      title: 'Network Delay Time',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Graph', 'Heap', 'Shortest Path'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl: 'https://leetcode.com/problems/network-delay-time/',
    },
    {
      id: 422,
      leetcodeNum: 787,
      title: 'Cheapest Flights Within K Stops',
      difficulty: 'Medium',
      tags: ['DP', 'DFS', 'BFS', 'Graph', 'Heap', 'Shortest Path'],
      isClassic: true,
      frequency: 9,
      leetcodeUrl:
        'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
    },
    {
      id: 423,
      leetcodeNum: 1334,
      title:
        'Find the City With the Smallest Number of Neighbors at a Threshold Distance',
      difficulty: 'Medium',
      tags: ['DP', 'Graph', 'Shortest Path'],
      isClassic: false,
      frequency: 7,
      leetcodeUrl:
        'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/',
    },
    {
      id: 424,
      leetcodeNum: 1631,
      title: 'Path With Minimum Effort',
      difficulty: 'Medium',
      tags: [
        'Array',
        'Binary Search',
        'DFS',
        'BFS',
        'Union Find',
        'Heap',
        'Matrix',
      ],
      isClassic: true,
      frequency: 8,
      leetcodeUrl: 'https://leetcode.com/problems/path-with-minimum-effort/',
    },
    {
      id: 425,
      leetcodeNum: 778,
      title: 'Swim in Rising Water',
      difficulty: 'Hard',
      tags: [
        'Array',
        'Binary Search',
        'DFS',
        'BFS',
        'Union Find',
        'Heap',
        'Matrix',
      ],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/swim-in-rising-water/',
    },
    {
      id: 426,
      leetcodeNum: 684,
      title: 'Redundant Connection',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Union Find', 'Graph'],
      isClassic: true,
      frequency: 7,
      leetcodeUrl: 'https://leetcode.com/problems/redundant-connection/',
    },
    {
      id: 427,
      leetcodeNum: 685,
      title: 'Redundant Connection II',
      difficulty: 'Hard',
      tags: ['DFS', 'BFS', 'Union Find', 'Graph'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/redundant-connection-ii/',
    },
    {
      id: 428,
      leetcodeNum: 1584,
      title: 'Min Cost to Connect All Points',
      difficulty: 'Medium',
      tags: ['Array', 'Union Find', 'Graph', 'MST'],
      isClassic: true,
      frequency: 8,
      leetcodeUrl:
        'https://leetcode.com/problems/min-cost-to-connect-all-points/',
    },
    {
      id: 429,
      leetcodeNum: 1489,
      title: 'Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree',
      difficulty: 'Hard',
      tags: ['Union Find', 'Graph', 'MST', 'Sorting'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/',
    },
    {
      id: 430,
      leetcodeNum: 1202,
      title: 'Smallest String With Swaps',
      difficulty: 'Medium',
      tags: ['Array', 'Hash Table', 'String', 'Union Find', 'Graph'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl: 'https://leetcode.com/problems/smallest-string-with-swaps/',
    },
    {
      id: 431,
      leetcodeNum: 990,
      title: 'Satisfiability of Equality Equations',
      difficulty: 'Medium',
      tags: ['Array', 'String', 'Union Find', 'Graph'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/satisfiability-of-equality-equations/',
    },
    {
      id: 432,
      leetcodeNum: 959,
      title: 'Regions Cut By Slashes',
      difficulty: 'Medium',
      tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Graph', 'Matrix'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/regions-cut-by-slashes/',
    },
    {
      id: 433,
      leetcodeNum: 1697,
      title: 'Checking Existence of Edge Length Limited Paths',
      difficulty: 'Hard',
      tags: ['Array', 'Two Pointers', 'Union Find', 'Graph', 'Sorting'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/',
    },
    {
      id: 434,
      leetcodeNum: 2203,
      title: 'Minimum Weighted Subgraph With the Required Paths',
      difficulty: 'Hard',
      tags: ['Graph', 'Shortest Path'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-weighted-subgraph-with-the-required-paths/',
    },
    {
      id: 435,
      leetcodeNum: 1976,
      title: 'Number of Ways to Arrive at Destination',
      difficulty: 'Medium',
      tags: ['DP', 'Graph', 'Topological Sort', 'Shortest Path'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/',
    },
    {
      id: 436,
      leetcodeNum: 2045,
      title: 'Second Minimum Time to Reach Destination',
      difficulty: 'Hard',
      tags: ['BFS', 'Graph', 'Shortest Path'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/second-minimum-time-to-reach-destination/',
    },
    {
      id: 437,
      leetcodeNum: 882,
      title: 'Reachable Nodes In Subdivided Graph',
      difficulty: 'Hard',
      tags: ['Graph', 'Heap', 'Shortest Path'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/reachable-nodes-in-subdivided-graph/',
    },
    {
      id: 438,
      leetcodeNum: 1135,
      title: 'Connecting Cities With Minimum Cost',
      difficulty: 'Medium',
      tags: ['Union Find', 'Graph', 'MST', 'Sorting', 'Heap'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/connecting-cities-with-minimum-cost/',
    },
    {
      id: 439,
      leetcodeNum: 2492,
      title: 'Minimum Score of a Path Between Two Cities',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Union Find', 'Graph'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/',
    },
    {
      id: 440,
      leetcodeNum: 2685,
      title: 'Count the Number of Complete Components',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Union Find', 'Graph'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/count-the-number-of-complete-components/',
    },
    {
      id: 441,
      leetcodeNum: 2709,
      title: 'Greatest Common Divisor Traversal',
      difficulty: 'Hard',
      tags: ['Array', 'Math', 'Union Find', 'Number Theory'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/greatest-common-divisor-traversal/',
    },
    {
      id: 442,
      leetcodeNum: 2608,
      title: 'Shortest Cycle in a Graph',
      difficulty: 'Hard',
      tags: ['BFS', 'Graph'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl: 'https://leetcode.com/problems/shortest-cycle-in-a-graph/',
    },
    {
      id: 443,
      leetcodeNum: 2556,
      title: 'Disconnect Path in a Binary Matrix by at Most One Flip',
      difficulty: 'Medium',
      tags: ['Array', 'DFS', 'BFS', 'Matrix'],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/disconnect-path-in-a-binary-matrix-by-at-most-one-flip/',
    },
    {
      id: 444,
      leetcodeNum: 2101,
      title: 'Detonate the Maximum Bombs',
      difficulty: 'Medium',
      tags: ['Array', 'Math', 'DFS', 'BFS', 'Graph', 'Geometry'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl: 'https://leetcode.com/problems/detonate-the-maximum-bombs/',
    },
    {
      id: 445,
      leetcodeNum: 2316,
      title: 'Count Unreachable Pairs of Nodes in an Undirected Graph',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Union Find', 'Graph'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/',
    },
    {
      id: 446,
      leetcodeNum: 2642,
      title: 'Design Graph With Shortest Path Calculator',
      difficulty: 'Hard',
      tags: ['Graph', 'Design', 'Heap', 'Shortest Path'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/design-graph-with-shortest-path-calculator/',
    },
    {
      id: 447,
      leetcodeNum: 2699,
      title: 'Modify Graph Edge Weights',
      difficulty: 'Hard',
      tags: ['Graph', 'Heap', 'Shortest Path'],
      isClassic: false,
      frequency: 3,
      leetcodeUrl: 'https://leetcode.com/problems/modify-graph-edge-weights/',
    },
    {
      id: 448,
      leetcodeNum: 1129,
      title: 'Shortest Path with Alternating Colors',
      difficulty: 'Medium',
      tags: ['BFS', 'Graph', 'Shortest Path'],
      isClassic: false,
      frequency: 6,
      leetcodeUrl:
        'https://leetcode.com/problems/shortest-path-with-alternating-colors/',
    },
    {
      id: 449,
      leetcodeNum: 2368,
      title: 'Reachable Nodes With Restrictions',
      difficulty: 'Medium',
      tags: [
        'Array',
        'Hash Table',
        'Tree',
        'DFS',
        'BFS',
        'Union Find',
        'Graph',
      ],
      isClassic: false,
      frequency: 4,
      leetcodeUrl:
        'https://leetcode.com/problems/reachable-nodes-with-restrictions/',
    },
    {
      id: 450,
      leetcodeNum: 2812,
      title: 'Find the Safest Path in a Grid',
      difficulty: 'Medium',
      tags: ['Array', 'BFS', 'Union Find', 'Matrix', 'Binary Search'],
      isClassic: false,
      frequency: 5,
      leetcodeUrl:
        'https://leetcode.com/problems/find-the-safest-path-in-a-grid/',
    },
  ],
};

// ── Export all 15 patterns ──
export const ALL_PATTERNS: PatternData[] = [
  fastSlowPointers,
  mergeIntervals,
  cyclicSort,
  dfs,
  bfs,
  topologicalSort,
  heap,
  subset,
  dp,
  bitManipulation,
  trie,
  graph,
];

// Helper: slug se pattern lo
export function getPatternData(slug: string): PatternData | null {
  return ALL_PATTERNS.find((p) => p.slug === slug) ?? null;
}
