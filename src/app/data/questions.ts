// // src/data/questions.ts
// // Full question data — LeetCode style with keyword highlights
// // Each question has: description, examples, constraints, hints, starter code

// export type Difficulty = 'Easy' | 'Medium' | 'Hard';
// export type Language = 'javascript' | 'python' | 'java' | 'cpp';

// export interface Example {
//   input: string;
//   output: string;
//   explanation?: string;
// }

// export interface FullQuestion {
//   id: number;
//   slug: string;
//   title: string;
//   difficulty: Difficulty;
//   patternId: string;
//   patternName: string;
//   tags: string[];
//   companies: string[];
//   frequency: number;
//   url: string;
//   description: string;             // Markdown-ish problem statement
//   examples: Example[];
//   constraints: string[];           // Each constraint line
//   keywords: string[];              // Keywords to highlight in description
//   hints: string[];
//   timeComplexity: string;
//   spaceComplexity: string;
//   approach: string;                // Brief pattern approach
//   starterCode: Record<Language, string>;
// }

// export const QUESTIONS: FullQuestion[] = [
//   // ─────────────────────────────────────────────────────────────────────
//   //  SLIDING WINDOW
//   // ─────────────────────────────────────────────────────────────────────
//   {
//     id: 643,
//     slug: 'maximum-average-subarray-i',
//     title: 'Maximum Average Subarray I',
//     difficulty: 'Easy',
//     patternId: 'sliding-window',
//     patternName: 'Sliding Window',
//     tags: ['Array', 'Sliding Window'],
//     companies: ['Apple', 'Google'],
//     frequency: 7,
//     url: 'https://leetcode.com/problems/maximum-average-subarray-i/',
//     description: `You are given an integer array \`nums\` consisting of \`n\` elements, and an integer \`k\`.

// Find a **contiguous subarray** whose **length is equal to** \`k\` that has the **maximum average** value and return this value.`,
//     examples: [
//       { input: 'nums = [1,12,-5,-6,50,3], k = 4', output: '12.75000', explanation: 'Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75' },
//       { input: 'nums = [5], k = 1', output: '5.00000' },
//     ],
//     constraints: [
//       'n == nums.length',
//       '1 <= k <= n <= 10⁵',
//       '-10⁴ <= nums[i] <= 10⁴',
//     ],
//     keywords: ['contiguous subarray', 'length is equal to', 'maximum average', 'fixed size'],
//     hints: [
//       'Think of a window of size k that slides from left to right.',
//       'Instead of recalculating the sum each time, add the new element and remove the old one.',
//     ],
//     timeComplexity: 'O(n)',
//     spaceComplexity: 'O(1)',
//     approach: 'Fixed Sliding Window — maintain running sum of k elements, slide right by adding new element and removing leftmost.',
//     starterCode: {
//       javascript: `/**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number}
//  */
// var findMaxAverage = function(nums, k) {
//     // TODO: Fixed sliding window
//     // 1. Calculate sum of first k elements
//     // 2. Slide window: add nums[i], remove nums[i-k]
//     // 3. Track maximum sum
// };`,
//       python: `class Solution:
//     def findMaxAverage(self, nums: List[int], k: int) -> float:
//         # TODO: Fixed sliding window
//         # 1. Calculate sum of first k elements
//         # 2. Slide window: add nums[i], remove nums[i-k]
//         # 3. Track maximum sum
//         pass`,
//       java: `class Solution {
//     public double findMaxAverage(int[] nums, int k) {
//         // TODO: Fixed sliding window
//         return 0.0;
//     }
// }`,
//       cpp: `class Solution {
// public:
//     double findMaxAverage(vector<int>& nums, int k) {
//         // TODO: Fixed sliding window
//         return 0.0;
//     }
// };`,
//     },
//   },
//   {
//     id: 3,
//     slug: 'longest-substring-without-repeating-characters',
//     title: 'Longest Substring Without Repeating Characters',
//     difficulty: 'Medium',
//     patternId: 'sliding-window',
//     patternName: 'Sliding Window',
//     tags: ['Hash Table', 'String', 'Sliding Window'],
//     companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
//     frequency: 10,
//     url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
//     description: `Given a string \`s\`, find the **length** of the **longest substring** without **repeating characters**.`,
//     examples: [
//       { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
//       { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
//       { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' },
//     ],
//     constraints: [
//       '0 <= s.length <= 5 × 10⁴',
//       's consists of English letters, digits, symbols and spaces',
//     ],
//     keywords: ['longest substring', 'without repeating', 'contiguous', 'no duplicate'],
//     hints: [
//       'Use a sliding window with a HashSet to track characters in current window.',
//       'When you find a duplicate, shrink the window from left until duplicate is removed.',
//       'Window size = right - left + 1. Track maximum.',
//     ],
//     timeComplexity: 'O(n)',
//     spaceComplexity: 'O(min(n, m)) where m = charset size',
//     approach: 'Variable Sliding Window — expand right, shrink left when duplicate found using HashMap<char, lastIndex>.',
//     starterCode: {
//       javascript: `/**
//  * @param {string} s
//  * @return {number}
//  */
// var lengthOfLongestSubstring = function(s) {
//     // Variable Sliding Window + HashMap
//     let left = 0, maxLen = 0;
//     const map = new Map(); // char → last seen index
    
//     for (let right = 0; right < s.length; right++) {
//         // TODO: if s[right] in map and index >= left, move left
//         // Update map with current position
//         // Update maxLen
//     }
//     return maxLen;
// };`,
//       python: `class Solution:
//     def lengthOfLongestSubstring(self, s: str) -> int:
//         # Variable Sliding Window + HashMap
//         left = 0
//         max_len = 0
//         char_map = {}  # char → last seen index
        
//         for right, char in enumerate(s):
//             # TODO: if char in map and map[char] >= left, move left
//             # Update map and max_len
//             pass
//         return max_len`,
//       java: `class Solution {
//     public int lengthOfLongestSubstring(String s) {
//         Map<Character, Integer> map = new HashMap<>();
//         int left = 0, maxLen = 0;
//         for (int right = 0; right < s.length(); right++) {
//             // TODO
//         }
//         return maxLen;
//     }
// }`,
//       cpp: `class Solution {
// public:
//     int lengthOfLongestSubstring(string s) {
//         unordered_map<char, int> map;
//         int left = 0, maxLen = 0;
//         for (int right = 0; right < s.size(); right++) {
//             // TODO
//         }
//         return maxLen;
//     }
// };`,
//     },
//   },
//   {
//     id: 76,
//     slug: 'minimum-window-substring',
//     title: 'Minimum Window Substring',
//     difficulty: 'Hard',
//     patternId: 'sliding-window',
//     patternName: 'Sliding Window',
//     tags: ['Hash Table', 'String', 'Sliding Window'],
//     companies: ['Meta', 'Google', 'Amazon', 'LinkedIn', 'Uber'],
//     frequency: 9,
//     url: 'https://leetcode.com/problems/minimum-window-substring/',
//     description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the **minimum window substring** of \`s\` such that every character in \`t\` (including duplicates) is included in the window.

// If there is no such substring, return the **empty string** \`""\`.`,
//     examples: [
//       { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: 'The minimum window substring "BANC" includes "A", "B", and "C" from string t.' },
//       { input: 's = "a", t = "a"', output: '"a"', explanation: 'The entire string s is the minimum window.' },
//       { input: 's = "a", t = "aa"', output: '""', explanation: 'Both \'a\'s from t must be included in the window. Since the largest window of s only has one \'a\', return empty string.' },
//     ],
//     constraints: [
//       'm == s.length',
//       'n == t.length',
//       '1 <= m, n <= 10⁵',
//       's and t consist of uppercase and lowercase English letters',
//     ],
//     keywords: ['minimum window', 'contains all', 'minimum length', 'every character', 'including duplicates'],
//     hints: [
//       'Use two frequency maps: one for t, one for current window.',
//       'Track how many characters are "satisfied" (window freq >= t freq).',
//       'When all satisfied, try shrinking window from left.',
//     ],
//     timeComplexity: 'O(m + n)',
//     spaceComplexity: 'O(m + n)',
//     approach: 'Shrinkable Sliding Window — expand right until window contains all of t, then shrink left to find minimum.',
//     starterCode: {
//       javascript: `/**
//  * @param {string} s
//  * @param {string} t
//  * @return {string}
//  */
// var minWindow = function(s, t) {
//     if (!t || !s) return "";
    
//     const need = new Map();
//     for (const c of t) need.set(c, (need.get(c) || 0) + 1);
    
//     let left = 0, formed = 0, required = need.size;
//     let minLen = Infinity, minLeft = 0;
//     const window = new Map();
    
//     for (let right = 0; right < s.length; right++) {
//         // TODO: expand window, track formed count
//         // When formed === required: try shrinking, update answer
//     }
//     return minLen === Infinity ? "" : s.slice(minLeft, minLeft + minLen);
// };`,
//       python: `class Solution:
//     def minWindow(self, s: str, t: str) -> str:
//         from collections import Counter, defaultdict
        
//         if not t or not s:
//             return ""
        
//         need = Counter(t)
//         required = len(need)
//         left = formed = 0
//         window = defaultdict(int)
//         ans = float('inf'), 0, 0
        
//         for right, char in enumerate(s):
//             # TODO: expand, track formed
//             # When formed == required: shrink, update ans
//             pass
        
//         return "" if ans[0] == float('inf') else s[ans[1]:ans[2]+1]`,
//       java: `class Solution {
//     public String minWindow(String s, String t) {
//         // TODO
//         return "";
//     }
// }`,
//       cpp: `class Solution {
// public:
//     string minWindow(string s, string t) {
//         // TODO
//         return "";
//     }
// };`,
//     },
//   },

//   // ─────────────────────────────────────────────────────────────────────
//   //  TWO POINTERS
//   // ─────────────────────────────────────────────────────────────────────
//   {
//     id: 167,
//     slug: 'two-sum-ii-input-array-is-sorted',
//     title: 'Two Sum II - Input Array Is Sorted',
//     difficulty: 'Medium',
//     patternId: 'two-pointers',
//     patternName: 'Two Pointers',
//     tags: ['Array', 'Two Pointers', 'Binary Search'],
//     companies: ['Amazon', 'Apple', 'Microsoft'],
//     frequency: 8,
//     url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
//     description: `Given a **1-indexed** array of integers \`numbers\` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific \`target\` number.

// Return the **indices** of the two numbers, \`index1\` and \`index2\`, added by one as an integer array \`[index1, index2]\` of length 2.

// The tests are generated such that there is **exactly one solution**.`,
//     examples: [
//       { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]', explanation: 'The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2.' },
//       { input: 'numbers = [2,3,4], target = 6', output: '[1,3]', explanation: 'The sum of 2 and 4 is 6. Therefore, index1 = 1, index2 = 3.' },
//       { input: 'numbers = [-1,0], target = -1', output: '[1,2]', explanation: 'The sum of -1 and 0 is -1. Therefore, index1 = 1, index2 = 2.' },
//     ],
//     constraints: [
//       '2 <= numbers.length <= 3 × 10⁴',
//       '-1000 <= numbers[i] <= 1000',
//       'numbers is sorted in non-decreasing order',
//       '-1000 <= target <= 1000',
//       'Exactly one solution exists',
//     ],
//     keywords: ['sorted', 'two numbers', 'add up to target', 'pair', 'non-decreasing'],
//     hints: [
//       'Array is sorted — use left and right pointers at both ends.',
//       'If sum too large → move right pointer left. If sum too small → move left pointer right.',
//     ],
//     timeComplexity: 'O(n)',
//     spaceComplexity: 'O(1)',
//     approach: 'Two Pointers at opposite ends — sorted array allows O(1) decision at each step.',
//     starterCode: {
//       javascript: `/**
//  * @param {number[]} numbers
//  * @param {number} target
//  * @return {number[]}
//  */
// var twoSum = function(numbers, target) {
//     let left = 0, right = numbers.length - 1;
    
//     while (left < right) {
//         const sum = numbers[left] + numbers[right];
//         // TODO: compare sum with target, move pointers
//     }
//     return [-1, -1];
// };`,
//       python: `class Solution:
//     def twoSum(self, numbers: List[int], target: int) -> List[int]:
//         left, right = 0, len(numbers) - 1
        
//         while left < right:
//             curr_sum = numbers[left] + numbers[right]
//             # TODO: compare and move pointers
//             pass
//         return [-1, -1]`,
//       java: `class Solution {
//     public int[] twoSum(int[] numbers, int target) {
//         int left = 0, right = numbers.length - 1;
//         while (left < right) {
//             int sum = numbers[left] + numbers[right];
//             // TODO
//         }
//         return new int[]{-1, -1};
//     }
// }`,
//       cpp: `class Solution {
// public:
//     vector<int> twoSum(vector<int>& numbers, int target) {
//         int left = 0, right = numbers.size() - 1;
//         while (left < right) {
//             int sum = numbers[left] + numbers[right];
//             // TODO
//         }
//         return {-1, -1};
//     }
// };`,
//     },
//   },
//   {
//     id: 15,
//     slug: '3sum',
//     title: '3Sum',
//     difficulty: 'Medium',
//     patternId: 'two-pointers',
//     patternName: 'Two Pointers',
//     tags: ['Array', 'Two Pointers', 'Sorting'],
//     companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
//     frequency: 10,
//     url: 'https://leetcode.com/problems/3sum/',
//     description: `Given an integer array \`nums\`, return all the **triplets** \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

// The solution set **must not contain duplicate triplets**.`,
//     examples: [
//       { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]', explanation: 'nums[0] + nums[1] + nums[2] = -1 + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. nums[0] + nums[3] + nums[4] = -1 + 2 + (-1) = 0. The distinct triplets are [-1,0,1] and [-1,-1,2].' },
//       { input: 'nums = [0,1,1]', output: '[]', explanation: 'The only possible triplet does not sum up to 0.' },
//       { input: 'nums = [0,0,0]', output: '[[0,0,0]]' },
//     ],
//     constraints: [
//       '3 <= nums.length <= 3000',
//       '-10⁵ <= nums[i] <= 10⁵',
//     ],
//     keywords: ['triplets', 'sum equals zero', 'no duplicates', 'three numbers', 'all combinations'],
//     hints: [
//       'Sort the array first. This allows skipping duplicates easily.',
//       'Fix nums[i], then apply Two Pointers on the remaining subarray.',
//       'Skip duplicate values of nums[i], left, and right to avoid duplicate triplets.',
//     ],
//     timeComplexity: 'O(n²)',
//     spaceComplexity: 'O(1) excluding output',
//     approach: 'Sort + Fix one element + Two Pointers on remaining. Skip duplicates at each level.',
//     starterCode: {
//       javascript: `/**
//  * @param {number[]} nums
//  * @return {number[][]}
//  */
// var threeSum = function(nums) {
//     nums.sort((a, b) => a - b);
//     const result = [];
    
//     for (let i = 0; i < nums.length - 2; i++) {
//         if (i > 0 && nums[i] === nums[i-1]) continue; // skip duplicate i
        
//         let left = i + 1, right = nums.length - 1;
//         while (left < right) {
//             const sum = nums[i] + nums[left] + nums[right];
//             // TODO: handle sum === 0, > 0, < 0 cases
//             // Remember to skip duplicates for left and right
//         }
//     }
//     return result;
// };`,
//       python: `class Solution:
//     def threeSum(self, nums: List[int]) -> List[List[int]]:
//         nums.sort()
//         result = []
        
//         for i in range(len(nums) - 2):
//             if i > 0 and nums[i] == nums[i-1]:
//                 continue  # skip duplicate i
            
//             left, right = i + 1, len(nums) - 1
//             while left < right:
//                 total = nums[i] + nums[left] + nums[right]
//                 # TODO: handle cases
//                 pass
//         return result`,
//       java: `class Solution {
//     public List<List<Integer>> threeSum(int[] nums) {
//         Arrays.sort(nums);
//         List<List<Integer>> result = new ArrayList<>();
//         // TODO
//         return result;
//     }
// }`,
//       cpp: `class Solution {
// public:
//     vector<vector<int>> threeSum(vector<int>& nums) {
//         sort(nums.begin(), nums.end());
//         vector<vector<int>> result;
//         // TODO
//         return result;
//     }
// };`,
//     },
//   },
//   {
//     id: 42,
//     slug: 'trapping-rain-water',
//     title: 'Trapping Rain Water',
//     difficulty: 'Hard',
//     patternId: 'two-pointers',
//     patternName: 'Two Pointers',
//     tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack', 'Monotonic Stack'],
//     companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Goldman Sachs'],
//     frequency: 10,
//     url: 'https://leetcode.com/problems/trapping-rain-water/',
//     description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
//     examples: [
//       { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: 'The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are trapped.' },
//       { input: 'height = [4,2,0,3,2,5]', output: '9' },
//     ],
//     constraints: [
//       'n == height.length',
//       '1 <= n <= 2 × 10⁴',
//       '0 <= height[i] <= 10⁵',
//     ],
//     keywords: ['elevation map', 'trap', 'water', 'left max', 'right max', 'minimum of two walls'],
//     hints: [
//       'Water trapped at position i = min(maxLeft, maxRight) - height[i].',
//       'Two Pointers: process the side with smaller maxHeight first.',
//       'If leftMax < rightMax: water at left = leftMax - height[left].',
//     ],
//     timeComplexity: 'O(n)',
//     spaceComplexity: 'O(1)',
//     approach: 'Two Pointers — maintain leftMax and rightMax, process smaller side. Water = min(leftMax, rightMax) - height[i].',
//     starterCode: {
//       javascript: `/**
//  * @param {number[]} height
//  * @return {number}
//  */
// var trap = function(height) {
//     let left = 0, right = height.length - 1;
//     let leftMax = 0, rightMax = 0;
//     let water = 0;
    
//     while (left < right) {
//         if (height[left] < height[right]) {
//             // TODO: process left side
//             // water += leftMax - height[left] OR update leftMax
//         } else {
//             // TODO: process right side
//         }
//     }
//     return water;
// };`,
//       python: `class Solution:
//     def trap(self, height: List[int]) -> int:
//         left, right = 0, len(height) - 1
//         left_max = right_max = 0
//         water = 0
        
//         while left < right:
//             if height[left] < height[right]:
//                 # TODO: process left
//                 pass
//             else:
//                 # TODO: process right
//                 pass
//         return water`,
//       java: `class Solution {
//     public int trap(int[] height) {
//         // TODO
//         return 0;
//     }
// }`,
//       cpp: `class Solution {
// public:
//     int trap(vector<int>& height) {
//         // TODO
//         return 0;
//     }
// };`,
//     },
//   },

//   // ─────────────────────────────────────────────────────────────────────
//   //  BINARY SEARCH
//   // ─────────────────────────────────────────────────────────────────────
//   {
//     id: 704,
//     slug: 'binary-search',
//     title: 'Binary Search',
//     difficulty: 'Easy',
//     patternId: 'binary-search',
//     patternName: 'Binary Search',
//     tags: ['Array', 'Binary Search'],
//     companies: ['Amazon', 'Google', 'Microsoft'],
//     frequency: 8,
//     url: 'https://leetcode.com/problems/binary-search/',
//     description: `Given an array of integers \`nums\` which is **sorted in ascending order**, and an integer \`target\`, write a function to search \`target\` in \`nums\`.

// If \`target\` exists, then return its **index**. Otherwise, return \`-1\`.

// You must write an algorithm with **O(log n)** runtime complexity.`,
//     examples: [
//       { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4.' },
//       { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1.' },
//     ],
//     constraints: [
//       '1 <= nums.length <= 10⁴',
//       '-10⁴ < nums[i], target < 10⁴',
//       'All the integers in nums are unique',
//       'nums is sorted in ascending order',
//     ],
//     keywords: ['sorted', 'ascending order', 'O(log n)', 'search target', 'binary'],
//     hints: [
//       'Set left = 0, right = nums.length - 1.',
//       'Calculate mid = left + (right - left) / 2.',
//       'If nums[mid] === target → return mid. If too big → right = mid - 1. If too small → left = mid + 1.',
//     ],
//     timeComplexity: 'O(log n)',
//     spaceComplexity: 'O(1)',
//     approach: 'Classic Binary Search — halve search space each iteration.',
//     starterCode: {
//       javascript: `/**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number}
//  */
// var search = function(nums, target) {
//     let left = 0, right = nums.length - 1;
    
//     while (left <= right) {
//         const mid = left + Math.floor((right - left) / 2);
//         // TODO: compare nums[mid] with target
//     }
//     return -1;
// };`,
//       python: `class Solution:
//     def search(self, nums: List[int], target: int) -> int:
//         left, right = 0, len(nums) - 1
        
//         while left <= right:
//             mid = left + (right - left) // 2
//             # TODO: compare nums[mid] with target
//             pass
//         return -1`,
//       java: `class Solution {
//     public int search(int[] nums, int target) {
//         int left = 0, right = nums.length - 1;
//         while (left <= right) {
//             int mid = left + (right - left) / 2;
//             // TODO
//         }
//         return -1;
//     }
// }`,
//       cpp: `class Solution {
// public:
//     int search(vector<int>& nums, int target) {
//         int left = 0, right = nums.size() - 1;
//         while (left <= right) {
//             int mid = left + (right - left) / 2;
//             // TODO
//         }
//         return -1;
//     }
// };`,
//     },
//   },
//   {
//     id: 33,
//     slug: 'search-in-rotated-sorted-array',
//     title: 'Search in Rotated Sorted Array',
//     difficulty: 'Medium',
//     patternId: 'binary-search',
//     patternName: 'Binary Search',
//     tags: ['Array', 'Binary Search'],
//     companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'LinkedIn'],
//     frequency: 10,
//     url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
//     description: `There is an integer array \`nums\` sorted in ascending order (with **distinct** values).

// Prior to being passed to your function, \`nums\` is **possibly rotated** at an unknown pivot index \`k\`.

// Given the array \`nums\` after the possible rotation and an integer \`target\`, return the **index** of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.

// You must write an algorithm with **O(log n)** runtime complexity.`,
//     examples: [
//       { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
//       { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
//       { input: 'nums = [1], target = 0', output: '-1' },
//     ],
//     constraints: [
//       '1 <= nums.length <= 5000',
//       '-10⁴ <= nums[i] <= 10⁴',
//       'All values of nums are unique',
//       'nums is an ascending array that is possibly rotated',
//       '-10⁴ <= target <= 10⁴',
//     ],
//     keywords: ['rotated', 'sorted', 'distinct', 'O(log n)', 'pivot', 'ascending'],
//     hints: [
//       'Even after rotation, one half is always sorted.',
//       'Check if nums[left] <= nums[mid] → left half is sorted.',
//       'If target is in the sorted half, search there. Else search the other half.',
//     ],
//     timeComplexity: 'O(log n)',
//     spaceComplexity: 'O(1)',
//     approach: 'Modified Binary Search — determine which half is sorted, check if target is in that half.',
//     starterCode: {
//       javascript: `/**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number}
//  */
// var search = function(nums, target) {
//     let left = 0, right = nums.length - 1;
    
//     while (left <= right) {
//         const mid = left + Math.floor((right - left) / 2);
//         if (nums[mid] === target) return mid;
        
//         // TODO: Check which half is sorted
//         // If left half sorted: nums[left] <= nums[mid]
//         //   If target in [nums[left], nums[mid]) → right = mid - 1
//         //   Else → left = mid + 1
//         // Else (right half sorted):
//         //   If target in (nums[mid], nums[right]] → left = mid + 1
//         //   Else → right = mid - 1
//     }
//     return -1;
// };`,
//       python: `class Solution:
//     def search(self, nums: List[int], target: int) -> int:
//         left, right = 0, len(nums) - 1
        
//         while left <= right:
//             mid = left + (right - left) // 2
//             if nums[mid] == target:
//                 return mid
            
//             # TODO: determine which half is sorted
//             pass
//         return -1`,
//       java: `class Solution {
//     public int search(int[] nums, int target) {
//         // TODO
//         return -1;
//     }
// }`,
//       cpp: `class Solution {
// public:
//     int search(vector<int>& nums, int target) {
//         // TODO
//         return -1;
//     }
// };`,
//     },
//   },
//   {
//     id: 875,
//     slug: 'koko-eating-bananas',
//     title: 'Koko Eating Bananas',
//     difficulty: 'Medium',
//     patternId: 'binary-search',
//     patternName: 'Binary Search',
//     tags: ['Array', 'Binary Search'],
//     companies: ['Google', 'Amazon', 'Airbnb'],
//     frequency: 8,
//     url: 'https://leetcode.com/problems/koko-eating-bananas/',
//     description: `Koko loves to eat bananas. There are \`n\` piles of bananas, the \`i\`th pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours.

// Koko can decide her bananas-per-hour eating speed \`k\`. Each hour, she chooses a pile and eats \`k\` bananas from it. She can eat less than \`k\` from a pile, but she cannot eat from more than one pile per hour.

// Return the **minimum integer** \`k\` such that she can eat all the bananas within \`h\` hours.`,
//     examples: [
//       { input: 'piles = [3,6,7,11], h = 8', output: '4' },
//       { input: 'piles = [30,11,23,4,20], h = 5', output: '30' },
//       { input: 'piles = [30,11,23,4,20], h = 6', output: '23' },
//     ],
//     constraints: [
//       '1 <= piles.length <= 10⁴',
//       'piles.length <= h <= 10⁹',
//       '1 <= piles[i] <= 10⁹',
//     ],
//     keywords: ['minimum', 'eating speed', 'h hours', 'feasibility', 'monotonic', 'binary search on answer'],
//     hints: [
//       'Speed k is feasible if sum(ceil(pile/k)) <= h.',
//       'As k increases, time needed decreases — monotonic relationship → Binary Search!',
//       'Search space: k ∈ [1, max(piles)].',
//     ],
//     timeComplexity: 'O(n log m) where m = max(piles)',
//     spaceComplexity: 'O(1)',
//     approach: 'Binary Search on Answer — search space is speed [1, max(piles)]. Check feasibility in O(n).',
//     starterCode: {
//       javascript: `/**
//  * @param {number[]} piles
//  * @param {number} h
//  * @return {number}
//  */
// var minEatingSpeed = function(piles, h) {
//     const canFinish = (speed) => {
//         let hours = 0;
//         for (const pile of piles) {
//             hours += Math.ceil(pile / speed);
//         }
//         return hours <= h;
//     };
    
//     let left = 1, right = Math.max(...piles);
    
//     while (left < right) {
//         const mid = left + Math.floor((right - left) / 2);
//         // TODO: if canFinish(mid), try smaller speed
//         // else need larger speed
//     }
//     return left;
// };`,
//       python: `import math

// class Solution:
//     def minEatingSpeed(self, piles: List[int], h: int) -> int:
//         def can_finish(speed):
//             return sum(math.ceil(p / speed) for p in piles) <= h
        
//         left, right = 1, max(piles)
        
//         while left < right:
//             mid = left + (right - left) // 2
//             # TODO: binary search
//             pass
//         return left`,
//       java: `class Solution {
//     public int minEatingSpeed(int[] piles, int h) {
//         // TODO
//         return 0;
//     }
// }`,
//       cpp: `class Solution {
// public:
//     int minEatingSpeed(vector<int>& piles, int h) {
//         // TODO
//         return 0;
//     }
// };`,
//     },
//   },

//   // ─────────────────────────────────────────────────────────────────────
//   //  FAST & SLOW POINTERS
//   // ─────────────────────────────────────────────────────────────────────
//   {
//     id: 141,
//     slug: 'linked-list-cycle',
//     title: 'Linked List Cycle',
//     difficulty: 'Easy',
//     patternId: 'fast-slow-pointers',
//     patternName: 'Fast & Slow Pointers',
//     tags: ['Hash Table', 'Linked List', 'Two Pointers'],
//     companies: ['Amazon', 'Microsoft', 'Apple', 'Google'],
//     frequency: 9,
//     url: 'https://leetcode.com/problems/linked-list-cycle/',
//     description: `Given \`head\`, the head of a linked list, determine if the linked list has a **cycle** in it.

// There is a cycle if there is some node in the list that can be reached again by continuously following the \`next\` pointer.

// Return \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.

// You must use **O(1)** memory.`,
//     examples: [
//       { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).' },
//       { input: 'head = [1,2], pos = 0', output: 'true', explanation: 'There is a cycle in the linked list, where the tail connects to the 0th node.' },
//       { input: 'head = [1], pos = -1', output: 'false', explanation: 'There is no cycle in the linked list.' },
//     ],
//     constraints: [
//       'The number of nodes in the list is in the range [0, 10⁴]',
//       '-10⁵ <= Node.val <= 10⁵',
//       'pos is -1 or a valid index in the linked list',
//     ],
//     keywords: ['cycle', 'linked list', 'O(1) memory', 'detect loop', 'slow and fast'],
//     hints: [
//       'Floyd\'s cycle detection: slow moves 1 step, fast moves 2 steps.',
//       'If they meet → cycle exists. If fast reaches null → no cycle.',
//     ],
//     timeComplexity: 'O(n)',
//     spaceComplexity: 'O(1)',
//     approach: 'Fast & Slow Pointers (Floyd\'s) — if fast ever meets slow, cycle exists.',
//     starterCode: {
//       javascript: `/**
//  * @param {ListNode} head
//  * @return {boolean}
//  */
// var hasCycle = function(head) {
//     let slow = head, fast = head;
    
//     while (fast && fast.next) {
//         slow = slow.next;
//         fast = fast.next.next;
//         if (slow === fast) return true; // cycle detected!
//     }
//     return false;
// };`,
//       python: `class Solution:
//     def hasCycle(self, head: Optional[ListNode]) -> bool:
//         slow = fast = head
        
//         while fast and fast.next:
//             slow = slow.next
//             fast = fast.next.next
//             if slow is fast:
//                 return True
//         return False`,
//       java: `public class Solution {
//     public boolean hasCycle(ListNode head) {
//         ListNode slow = head, fast = head;
//         while (fast != null && fast.next != null) {
//             slow = slow.next;
//             fast = fast.next.next;
//             if (slow == fast) return true;
//         }
//         return false;
//     }
// }`,
//       cpp: `class Solution {
// public:
//     bool hasCycle(ListNode *head) {
//         ListNode *slow = head, *fast = head;
//         while (fast && fast->next) {
//             slow = slow->next;
//             fast = fast->next->next;
//             if (slow == fast) return true;
//         }
//         return false;
//     }
// };`,
//     },
//   },
//   {
//     id: 41,
//     slug: 'first-missing-positive',
//     title: 'First Missing Positive',
//     difficulty: 'Hard',
//     patternId: 'cyclic-sort',
//     patternName: 'Cyclic Sort',
//     tags: ['Array', 'Hash Table'],
//     companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Apple'],
//     frequency: 9,
//     url: 'https://leetcode.com/problems/first-missing-positive/',
//     description: `Given an unsorted integer array \`nums\`. Return the **smallest positive integer** that is **not present** in \`nums\`.

// You must implement an algorithm that runs in **O(n)** time and uses **O(1)** auxiliary space.`,
//     examples: [
//       { input: 'nums = [1,2,0]', output: '3', explanation: 'The numbers in the range [1,2] are all in the array.' },
//       { input: 'nums = [3,4,-1,1]', output: '2', explanation: '1 is in the array but 2 is missing.' },
//       { input: 'nums = [7,8,9,11,12]', output: '1', explanation: 'The smallest positive integer 1 is missing.' },
//     ],
//     constraints: [
//       '1 <= nums.length <= 10⁵',
//       '-2³¹ <= nums[i] <= 2³¹ - 1',
//     ],
//     keywords: ['smallest positive', 'O(n) time', 'O(1) space', 'not present', 'missing', 'in-place', '1 to n+1 range'],
//     hints: [
//       'The answer must be in range [1, n+1]. So values outside this range are irrelevant.',
//       'Place each number nums[i] at index nums[i]-1 (Cyclic Sort).',
//       'After sorting, scan: first index i where nums[i] != i+1 → answer is i+1.',
//     ],
//     timeComplexity: 'O(n)',
//     spaceComplexity: 'O(1)',
//     approach: 'Cyclic Sort — place nums[i] at correct index (nums[i]-1). Scan for first mismatch.',
//     starterCode: {
//       javascript: `/**
//  * @param {number[]} nums
//  * @return {number}
//  */
// var firstMissingPositive = function(nums) {
//     const n = nums.length;
    
//     // Phase 1: Cyclic Sort — place each num at nums[num-1]
//     let i = 0;
//     while (i < n) {
//         const correct = nums[i] - 1;
//         if (nums[i] > 0 && nums[i] <= n && nums[i] !== nums[correct]) {
//             [nums[i], nums[correct]] = [nums[correct], nums[i]];
//         } else {
//             i++;
//         }
//     }
    
//     // Phase 2: Scan — first index where nums[i] !== i+1
//     for (let i = 0; i < n; i++) {
//         if (nums[i] !== i + 1) return i + 1;
//     }
//     return n + 1;
// };`,
//       python: `class Solution:
//     def firstMissingPositive(self, nums: List[int]) -> int:
//         n = len(nums)
        
//         # Phase 1: Cyclic sort
//         i = 0
//         while i < n:
//             correct = nums[i] - 1
//             if 1 <= nums[i] <= n and nums[i] != nums[correct]:
//                 nums[i], nums[correct] = nums[correct], nums[i]
//             else:
//                 i += 1
        
//         # Phase 2: Find first mismatch
//         for i in range(n):
//             if nums[i] != i + 1:
//                 return i + 1
//         return n + 1`,
//       java: `class Solution {
//     public int firstMissingPositive(int[] nums) {
//         int n = nums.length;
//         // Cyclic sort then scan
//         // TODO
//         return -1;
//     }
// }`,
//       cpp: `class Solution {
// public:
//     int firstMissingPositive(vector<int>& nums) {
//         int n = nums.size();
//         // TODO
//         return -1;
//     }
// };`,
//     },
//   },
// ];

// // ── Lookup helpers ───────────────────────────────────────────────────────────

// export function getQuestionById(id: number): FullQuestion | undefined {
//   return QUESTIONS.find(q => q.id === id);
// }

// export function getQuestionsByPattern(patternId: string): FullQuestion[] {
//   return QUESTIONS.filter(q => q.patternId === patternId);
// }

// // ── All 450 question stubs (for practice list) ───────────────────────────────
// // These have all list-view data. Detail page fetches full data from QUESTIONS[].
// export interface QuestionStub {
//   id: number;
//   title: string;
//   difficulty: Difficulty;
//   patternId: string;
//   patternName: string;
//   tags: string[];
//   companies: string[];
//   frequency: number;
//   url: string;
//   hasFullData: boolean; // true if in QUESTIONS[]
// }

// export const ALL_QUESTION_STUBS: QuestionStub[] = [
//   // ── SLIDING WINDOW ──────────────────────────────────────────────────────
//   { id:643,  title:'Maximum Average Subarray I',                      difficulty:'Easy',   patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Apple','Google'],         frequency:7, url:'https://leetcode.com/problems/maximum-average-subarray-i/', hasFullData:true },
//   { id:3,    title:'Longest Substring Without Repeating Characters',  difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['String','Sliding Window'],          companies:['Amazon','Google','Meta'], frequency:10, url:'https://leetcode.com/problems/longest-substring-without-repeating-characters/', hasFullData:true },
//   { id:567,  title:'Permutation in String',                           difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['String','Sliding Window'],          companies:['Microsoft','Amazon'],     frequency:8, url:'https://leetcode.com/problems/permutation-in-string/', hasFullData:false },
//   { id:438,  title:'Find All Anagrams in a String',                   difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['String','Sliding Window'],          companies:['Amazon','Google'],        frequency:8, url:'https://leetcode.com/problems/find-all-anagrams-in-a-string/', hasFullData:false },
//   { id:76,   title:'Minimum Window Substring',                        difficulty:'Hard',   patternId:'sliding-window',     patternName:'Sliding Window',      tags:['String','Sliding Window'],          companies:['Meta','Google','Amazon'], frequency:9, url:'https://leetcode.com/problems/minimum-window-substring/', hasFullData:true },
//   { id:209,  title:'Minimum Size Subarray Sum',                       difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Amazon','Google'],        frequency:8, url:'https://leetcode.com/problems/minimum-size-subarray-sum/', hasFullData:false },
//   { id:424,  title:'Longest Repeating Character Replacement',         difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['String','Sliding Window'],          companies:['Google','Meta'],          frequency:8, url:'https://leetcode.com/problems/longest-repeating-character-replacement/', hasFullData:false },
//   { id:1004, title:'Max Consecutive Ones III',                        difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google','Amazon'],        frequency:7, url:'https://leetcode.com/problems/max-consecutive-ones-iii/', hasFullData:false },
//   { id:904,  title:'Fruit Into Baskets',                              difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google'],                 frequency:7, url:'https://leetcode.com/problems/fruit-into-baskets/', hasFullData:false },
//   { id:1456, title:'Maximum Number of Vowels in Substring',           difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['String','Sliding Window'],          companies:['Goldman Sachs'],          frequency:6, url:'https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/', hasFullData:false },
//   { id:239,  title:'Sliding Window Maximum',                          difficulty:'Hard',   patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Deque'],                    companies:['Amazon','Google'],        frequency:9, url:'https://leetcode.com/problems/sliding-window-maximum/', hasFullData:false },
//   { id:2461, title:'Maximum Sum of Distinct Subarrays With Length K', difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Meta'],                   frequency:6, url:'https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/', hasFullData:false },
//   { id:1695, title:'Maximum Erasure Value',                           difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/maximum-erasure-value/', hasFullData:false },
//   { id:2024, title:'Maximize the Confusion of an Exam',               difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['String','Sliding Window'],          companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/maximize-the-confusion-of-an-exam/', hasFullData:false },
//   { id:1423, title:'Maximum Points You Can Obtain from Cards',        difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google','Amazon'],        frequency:7, url:'https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/', hasFullData:false },
//   { id:2379, title:'Minimum Recolors to Get K Consecutive Black Blocks', difficulty:'Easy', patternId:'sliding-window',  patternName:'Sliding Window',      tags:['String','Sliding Window'],          companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/minimum-recolors-to-get-k-consecutive-black-blocks/', hasFullData:false },
//   { id:1343, title:'Number of Sub-arrays of Size K and Average',      difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Amazon'],                 frequency:5, url:'https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/', hasFullData:false },
//   { id:1838, title:'Frequency of the Most Frequent Element',          difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/frequency-of-the-most-frequent-element/', hasFullData:false },
//   { id:1052, title:'Grumpy Bookstore Owner',                          difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Amazon'],                 frequency:5, url:'https://leetcode.com/problems/grumpy-bookstore-owner/', hasFullData:false },
//   { id:2134, title:'Minimum Swaps to Group All 1s Together II',       difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii/', hasFullData:false },
//   { id:30,   title:'Substring with Concatenation of All Words',       difficulty:'Hard',   patternId:'sliding-window',     patternName:'Sliding Window',      tags:['String','Sliding Window'],          companies:['Amazon'],                 frequency:5, url:'https://leetcode.com/problems/substring-with-concatenation-of-all-words/', hasFullData:false },
//   { id:480,  title:'Sliding Window Median',                           difficulty:'Hard',   patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/sliding-window-median/', hasFullData:false },
//   { id:1208, title:'Get Equal Substrings Within Budget',              difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['String','Sliding Window'],          companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/get-equal-substrings-within-budget/', hasFullData:false },
//   { id:2444, title:'Count Subarrays With Fixed Bounds',               difficulty:'Hard',   patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/count-subarrays-with-fixed-bounds/', hasFullData:false },
//   { id:2302, title:'Count Subarrays With Score Less Than K',          difficulty:'Hard',   patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/count-subarrays-with-score-less-than-k/', hasFullData:false },
//   { id:1610, title:'Maximum Number of Visible Points',                difficulty:'Hard',   patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/maximum-number-of-visible-points/', hasFullData:false },
//   { id:2106, title:'Maximum Fruits Harvested After at Most K Steps',  difficulty:'Hard',   patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/maximum-fruits-harvested-after-at-most-k-steps/', hasFullData:false },
//   { id:2747, title:'Count Zero Request Servers',                      difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/count-zero-request-servers/', hasFullData:false },
//   { id:1040, title:'Moving Stones Until Consecutive II',              difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/moving-stones-until-consecutive-ii/', hasFullData:false },
//   { id:2653, title:'Sliding Subarray Beauty',                         difficulty:'Medium', patternId:'sliding-window',     patternName:'Sliding Window',      tags:['Array','Sliding Window'],           companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/sliding-subarray-beauty/', hasFullData:false },

//   // ── TWO POINTERS ──────────────────────────────────────────────────────────
//   { id:167,  title:'Two Sum II - Input Array Is Sorted',              difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Amazon','Apple'],         frequency:8, url:'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', hasFullData:true },
//   { id:15,   title:'3Sum',                                            difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers','Sorting'],   companies:['Amazon','Google','Meta'], frequency:10, url:'https://leetcode.com/problems/3sum/', hasFullData:true },
//   { id:11,   title:'Container With Most Water',                       difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Amazon','Google'],        frequency:9, url:'https://leetcode.com/problems/container-with-most-water/', hasFullData:false },
//   { id:42,   title:'Trapping Rain Water',                             difficulty:'Hard',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Amazon','Google','Meta'], frequency:10, url:'https://leetcode.com/problems/trapping-rain-water/', hasFullData:true },
//   { id:125,  title:'Valid Palindrome',                                difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['String','Two Pointers'],            companies:['Meta','Microsoft'],       frequency:8, url:'https://leetcode.com/problems/valid-palindrome/', hasFullData:false },
//   { id:977,  title:'Squares of a Sorted Array',                       difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Google','Amazon'],        frequency:7, url:'https://leetcode.com/problems/squares-of-a-sorted-array/', hasFullData:false },
//   { id:283,  title:'Move Zeroes',                                     difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Facebook','Apple'],       frequency:8, url:'https://leetcode.com/problems/move-zeroes/', hasFullData:false },
//   { id:18,   title:'4Sum',                                            difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Amazon'],                 frequency:7, url:'https://leetcode.com/problems/4sum/', hasFullData:false },
//   { id:16,   title:'3Sum Closest',                                    difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Amazon'],                 frequency:7, url:'https://leetcode.com/problems/3sum-closest/', hasFullData:false },
//   { id:26,   title:'Remove Duplicates from Sorted Array',             difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Microsoft','Amazon'],     frequency:7, url:'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', hasFullData:false },
//   { id:75,   title:'Sort Colors',                                     difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Amazon','Google'],        frequency:8, url:'https://leetcode.com/problems/sort-colors/', hasFullData:false },
//   { id:881,  title:'Boats to Save People',                            difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers','Greedy'],    companies:['Amazon'],                 frequency:7, url:'https://leetcode.com/problems/boats-to-save-people/', hasFullData:false },
//   { id:844,  title:'Backspace String Compare',                        difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['String','Two Pointers'],            companies:['Amazon','Google'],        frequency:7, url:'https://leetcode.com/problems/backspace-string-compare/', hasFullData:false },
//   { id:88,   title:'Merge Sorted Array',                              difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Google','Amazon'],        frequency:8, url:'https://leetcode.com/problems/merge-sorted-array/', hasFullData:false },
//   { id:986,  title:'Interval List Intersections',                     difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Google','Facebook'],      frequency:7, url:'https://leetcode.com/problems/interval-list-intersections/', hasFullData:false },
//   { id:1498, title:'Number of Subsequences That Satisfy the Given Sum', difficulty:'Medium', patternId:'two-pointers',    patternName:'Two Pointers',        tags:['Array','Two Pointers','Sorting'],   companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/', hasFullData:false },
//   { id:2,    title:'Add Two Numbers',                                 difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Linked List','Math'],               companies:['Amazon','Microsoft'],     frequency:8, url:'https://leetcode.com/problems/add-two-numbers/', hasFullData:false },
//   { id:349,  title:'Intersection of Two Arrays',                      difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/intersection-of-two-arrays/', hasFullData:false },
//   { id:2149, title:'Rearrange Array Elements by Sign',                difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Amazon'],                 frequency:6, url:'https://leetcode.com/problems/rearrange-array-elements-by-sign/', hasFullData:false },
//   { id:27,   title:'Remove Element',                                  difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Apple'],                  frequency:6, url:'https://leetcode.com/problems/remove-element/', hasFullData:false },
//   { id:80,   title:'Remove Duplicates from Sorted Array II',          difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/', hasFullData:false },
//   { id:1,    title:'Two Sum',                                         difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Hash Table'],               companies:['Google','Amazon','Meta'], frequency:10, url:'https://leetcode.com/problems/two-sum/', hasFullData:false },
//   { id:923,  title:'3Sum With Multiplicity',                          difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/3sum-with-multiplicity/', hasFullData:false },
//   { id:259,  title:'3Sum Smaller',                                    difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/3sum-smaller/', hasFullData:false },
//   { id:360,  title:'Sort Transformed Array',                          difficulty:'Medium', patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers','Math'],      companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/sort-transformed-array/', hasFullData:false },
//   { id:2540, title:'Minimum Common Value',                            difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/minimum-common-value/', hasFullData:false },
//   { id:2824, title:'Count Pairs Whose Sum is Less than Target',       difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/count-pairs-whose-sum-is-less-than-target/', hasFullData:false },
//   { id:1213, title:'Intersection of Three Sorted Arrays',             difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/intersection-of-three-sorted-arrays/', hasFullData:false },
//   { id:2367, title:'Number of Arithmetic Triplets',                   difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/number-of-arithmetic-triplets/', hasFullData:false },
//   { id:350,  title:'Intersection of Two Arrays II',                   difficulty:'Easy',   patternId:'two-pointers',       patternName:'Two Pointers',        tags:['Array','Two Pointers'],             companies:['Google','Facebook'],      frequency:5, url:'https://leetcode.com/problems/intersection-of-two-arrays-ii/', hasFullData:false },

//   // ── BINARY SEARCH ─────────────────────────────────────────────────────────
//   { id:704,  title:'Binary Search',                                   difficulty:'Easy',   patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Amazon','Microsoft'],     frequency:8, url:'https://leetcode.com/problems/binary-search/', hasFullData:true },
//   { id:33,   title:'Search in Rotated Sorted Array',                  difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Amazon','Google','Meta'], frequency:10, url:'https://leetcode.com/problems/search-in-rotated-sorted-array/', hasFullData:true },
//   { id:153,  title:'Find Minimum in Rotated Sorted Array',            difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Microsoft','Adobe'],      frequency:9, url:'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', hasFullData:false },
//   { id:34,   title:'Find First and Last Position of Element',         difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Amazon','Google'],        frequency:9, url:'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', hasFullData:false },
//   { id:74,   title:'Search a 2D Matrix',                              difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search','Matrix'],   companies:['Amazon','Google'],        frequency:8, url:'https://leetcode.com/problems/search-a-2d-matrix/', hasFullData:false },
//   { id:875,  title:'Koko Eating Bananas',                             difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Google','Amazon'],        frequency:8, url:'https://leetcode.com/problems/koko-eating-bananas/', hasFullData:true },
//   { id:1011, title:'Capacity To Ship Packages Within D Days',         difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Amazon'],                 frequency:8, url:'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', hasFullData:false },
//   { id:410,  title:'Split Array Largest Sum',                         difficulty:'Hard',   patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search','DP'],       companies:['Google','Amazon'],        frequency:8, url:'https://leetcode.com/problems/split-array-largest-sum/', hasFullData:false },
//   { id:981,  title:'Time Based Key-Value Store',                      difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Binary Search','Design'],           companies:['Google','Amazon'],        frequency:8, url:'https://leetcode.com/problems/time-based-key-value-store/', hasFullData:false },
//   { id:4,    title:'Median of Two Sorted Arrays',                     difficulty:'Hard',   patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Google','Amazon','Meta'], frequency:9, url:'https://leetcode.com/problems/median-of-two-sorted-arrays/', hasFullData:false },
//   { id:162,  title:'Find Peak Element',                               difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Google','Amazon'],        frequency:8, url:'https://leetcode.com/problems/find-peak-element/', hasFullData:false },
//   { id:35,   title:'Search Insert Position',                          difficulty:'Easy',   patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Amazon'],                 frequency:7, url:'https://leetcode.com/problems/search-insert-position/', hasFullData:false },
//   { id:278,  title:'First Bad Version',                               difficulty:'Easy',   patternId:'binary-search',      patternName:'Binary Search',       tags:['Binary Search','Interactive'],      companies:['Google','Amazon'],        frequency:7, url:'https://leetcode.com/problems/first-bad-version/', hasFullData:false },
//   { id:540,  title:'Single Element in a Sorted Array',                difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Amazon'],                 frequency:7, url:'https://leetcode.com/problems/single-element-in-a-sorted-array/', hasFullData:false },
//   { id:658,  title:'Find K Closest Elements',                         difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Google'],                 frequency:7, url:'https://leetcode.com/problems/find-k-closest-elements/', hasFullData:false },
//   { id:1283, title:'Find the Smallest Divisor Given a Threshold',     difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/', hasFullData:false },
//   { id:1482, title:'Minimum Number of Days to Make m Bouquets',       difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/', hasFullData:false },
//   { id:2300, title:'Successful Pairs of Spells and Potions',          difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search','Sorting'],  companies:['Amazon'],                 frequency:6, url:'https://leetcode.com/problems/successful-pairs-of-spells-and-potions/', hasFullData:false },
//   { id:374,  title:'Guess Number Higher or Lower',                    difficulty:'Easy',   patternId:'binary-search',      patternName:'Binary Search',       tags:['Binary Search','Interactive'],      companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/guess-number-higher-or-lower/', hasFullData:false },
//   { id:2560, title:'House Robber IV',                                 difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/house-robber-iv/', hasFullData:false },
//   { id:1760, title:'Minimum Limit of Balls in a Bag',                 difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/', hasFullData:false },
//   { id:2187, title:'Minimum Time to Complete Trips',                  difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/minimum-time-to-complete-trips/', hasFullData:false },
//   { id:1552, title:'Magnetic Force Between Two Balls',                difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search','Sorting'],  companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/magnetic-force-between-two-balls/', hasFullData:false },
//   { id:719,  title:'Find K-th Smallest Pair Distance',                difficulty:'Hard',   patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search','Sorting'],  companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/find-k-th-smallest-pair-distance/', hasFullData:false },
//   { id:774,  title:'Minimize Max Distance to Gas Station',            difficulty:'Hard',   patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/minimize-max-distance-to-gas-station/', hasFullData:false },
//   { id:1231, title:'Divide Chocolate',                                difficulty:'Hard',   patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/divide-chocolate/', hasFullData:false },
//   { id:1898, title:'Maximum Number of Removable Characters',          difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search','String'],   companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/maximum-number-of-removable-characters/', hasFullData:false },
//   { id:2064, title:'Minimized Maximum of Products Distributed',       difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/', hasFullData:false },
//   { id:2817, title:'Minimum Absolute Difference Between Elements',    difficulty:'Medium', patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search'],            companies:['Google'],                 frequency:3, url:'https://leetcode.com/problems/minimum-absolute-difference-between-elements-with-constraint/', hasFullData:false },
//   { id:2258, title:'Escape the Spreading Fire',                       difficulty:'Hard',   patternId:'binary-search',      patternName:'Binary Search',       tags:['Array','Binary Search','BFS'],      companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/escape-the-spreading-fire/', hasFullData:false },

//   // ── FAST & SLOW POINTERS ──────────────────────────────────────────────────
//   { id:141,  title:'Linked List Cycle',                               difficulty:'Easy',   patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Two Pointers'],       companies:['Amazon','Microsoft'],     frequency:9, url:'https://leetcode.com/problems/linked-list-cycle/', hasFullData:true },
//   { id:142,  title:'Linked List Cycle II',                            difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Two Pointers'],       companies:['Amazon','Google'],        frequency:9, url:'https://leetcode.com/problems/linked-list-cycle-ii/', hasFullData:false },
//   { id:876,  title:'Middle of the Linked List',                       difficulty:'Easy',   patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Two Pointers'],       companies:['Amazon','Google'],        frequency:8, url:'https://leetcode.com/problems/middle-of-the-linked-list/', hasFullData:false },
//   { id:202,  title:'Happy Number',                                    difficulty:'Easy',   patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Hash Table','Math'],                companies:['Amazon'],                 frequency:7, url:'https://leetcode.com/problems/happy-number/', hasFullData:false },
//   { id:287,  title:'Find the Duplicate Number',                       difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Array','Two Pointers'],             companies:['Amazon','Google'],        frequency:9, url:'https://leetcode.com/problems/find-the-duplicate-number/', hasFullData:false },
//   { id:143,  title:'Reorder List',                                    difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Two Pointers'],       companies:['Amazon','Google'],        frequency:8, url:'https://leetcode.com/problems/reorder-list/', hasFullData:false },
//   { id:234,  title:'Palindrome Linked List',                          difficulty:'Easy',   patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Two Pointers'],       companies:['Amazon','Meta'],          frequency:8, url:'https://leetcode.com/problems/palindrome-linked-list/', hasFullData:false },
//   { id:19,   title:'Remove Nth Node From End of List',                difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Two Pointers'],       companies:['Amazon','Google'],        frequency:8, url:'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', hasFullData:false },
//   { id:206,  title:'Reverse Linked List',                             difficulty:'Easy',   patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Recursion'],          companies:['Amazon','Google','Adobe'],frequency:9, url:'https://leetcode.com/problems/reverse-linked-list/', hasFullData:false },
//   { id:21,   title:'Merge Two Sorted Lists',                          difficulty:'Easy',   patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Recursion'],          companies:['Amazon','Microsoft'],     frequency:9, url:'https://leetcode.com/problems/merge-two-sorted-lists/', hasFullData:false },
//   { id:160,  title:'Intersection of Two Linked Lists',                difficulty:'Easy',   patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Two Pointers'],       companies:['Amazon','Meta'],          frequency:8, url:'https://leetcode.com/problems/intersection-of-two-linked-lists/', hasFullData:false },
//   { id:92,   title:'Reverse Linked List II',                          difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List'],                      companies:['Amazon','Google'],        frequency:7, url:'https://leetcode.com/problems/reverse-linked-list-ii/', hasFullData:false },
//   { id:328,  title:'Odd Even Linked List',                            difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List'],                      companies:['Amazon','Google'],        frequency:7, url:'https://leetcode.com/problems/odd-even-linked-list/', hasFullData:false },
//   { id:148,  title:'Sort List',                                       difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Divide & Conquer'],   companies:['Amazon'],                 frequency:7, url:'https://leetcode.com/problems/sort-list/', hasFullData:false },
//   { id:24,   title:'Swap Nodes in Pairs',                             difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Recursion'],          companies:['Amazon'],                 frequency:6, url:'https://leetcode.com/problems/swap-nodes-in-pairs/', hasFullData:false },
//   { id:25,   title:'Reverse Nodes in k-Group',                        difficulty:'Hard',   patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Recursion'],          companies:['Amazon','Google'],        frequency:7, url:'https://leetcode.com/problems/reverse-nodes-in-k-group/', hasFullData:false },
//   { id:23,   title:'Merge k Sorted Lists',                            difficulty:'Hard',   patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Divide & Conquer'],   companies:['Amazon','Google','Meta'], frequency:9, url:'https://leetcode.com/problems/merge-k-sorted-lists/', hasFullData:false },
//   { id:86,   title:'Partition List',                                  difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Two Pointers'],       companies:['Amazon'],                 frequency:6, url:'https://leetcode.com/problems/partition-list/', hasFullData:false },
//   { id:138,  title:'Copy List with Random Pointer',                   difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Hash Table'],         companies:['Amazon','Meta'],          frequency:8, url:'https://leetcode.com/problems/copy-list-with-random-pointer/', hasFullData:false },
//   { id:2095, title:'Delete the Middle Node of a Linked List',         difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Two Pointers'],       companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/', hasFullData:false },
//   { id:2130, title:'Maximum Twin Sum of a Linked List',               difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Two Pointers'],       companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/', hasFullData:false },
//   { id:1721, title:'Swapping Nodes in a Linked List',                 difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Two Pointers'],       companies:['Amazon'],                 frequency:5, url:'https://leetcode.com/problems/swapping-nodes-in-a-linked-list/', hasFullData:false },
//   { id:1290, title:'Convert Binary Number in Linked List to Integer', difficulty:'Easy',   patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Math'],               companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/', hasFullData:false },
//   { id:457,  title:'Circular Array Loop',                             difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Array','Two Pointers'],             companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/circular-array-loop/', hasFullData:false },
//   { id:61,   title:'Rotate List',                                     difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Two Pointers'],       companies:['Amazon'],                 frequency:5, url:'https://leetcode.com/problems/rotate-list/', hasFullData:false },
//   { id:82,   title:'Remove Duplicates from Sorted List II',           difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Two Pointers'],       companies:['Amazon'],                 frequency:6, url:'https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/', hasFullData:false },
//   { id:83,   title:'Remove Duplicates from Sorted List',              difficulty:'Easy',   patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List'],                      companies:['Amazon'],                 frequency:5, url:'https://leetcode.com/problems/remove-duplicates-from-sorted-list/', hasFullData:false },
//   { id:2058, title:'Find Min and Max Between Critical Points',        difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List'],                      companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points/', hasFullData:false },
//   { id:1836, title:'Remove Duplicates From Unsorted Linked List',     difficulty:'Medium', patternId:'fast-slow-pointers', patternName:'Fast & Slow Pointers',tags:['Linked List','Hash Table'],         companies:['Amazon'],                 frequency:4, url:'https://leetcode.com/problems/remove-duplicates-from-an-unsorted-linked-list/', hasFullData:false },

//   // ── CYCLIC SORT (includes first missing positive) ─────────────────────────
//   { id:41,   title:'First Missing Positive',                          difficulty:'Hard',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Hash Table'],               companies:['Amazon','Microsoft','Google'], frequency:9, url:'https://leetcode.com/problems/first-missing-positive/', hasFullData:true },
//   { id:268,  title:'Missing Number',                                  difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Math','Bit Manipulation'],   companies:['Microsoft','Amazon'],     frequency:8, url:'https://leetcode.com/problems/missing-number/', hasFullData:false },
//   { id:448,  title:'Find All Numbers Disappeared in an Array',        difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Hash Table'],               companies:['Google','Amazon'],        frequency:8, url:'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/', hasFullData:false },
//   { id:442,  title:'Find All Duplicates in an Array',                 difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Hash Table'],               companies:['Amazon','Google'],        frequency:8, url:'https://leetcode.com/problems/find-all-duplicates-in-an-array/', hasFullData:false },
//   { id:645,  title:'Set Mismatch',                                    difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Hash Table','Sorting'],     companies:['Amazon'],                 frequency:6, url:'https://leetcode.com/problems/set-mismatch/', hasFullData:false },
//   { id:287,  title:'Find the Duplicate Number (Cyclic)',              difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Two Pointers'],             companies:['Amazon','Google'],        frequency:9, url:'https://leetcode.com/problems/find-the-duplicate-number/', hasFullData:false },
//   { id:189,  title:'Rotate Array',                                    difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Math','Two Pointers'],      companies:['Amazon','Microsoft'],     frequency:7, url:'https://leetcode.com/problems/rotate-array/', hasFullData:false },
//   { id:54,   title:'Spiral Matrix',                                   difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Matrix','Simulation'],      companies:['Amazon','Microsoft','Google'], frequency:8, url:'https://leetcode.com/problems/spiral-matrix/', hasFullData:false },
//   { id:48,   title:'Rotate Image',                                    difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Math','Matrix'],            companies:['Amazon','Microsoft','Google'], frequency:8, url:'https://leetcode.com/problems/rotate-image/', hasFullData:false },
//   { id:347,  title:'Top K Frequent Elements',                         difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Hash Table','Bucket Sort'], companies:['Amazon','Google','Meta'], frequency:9, url:'https://leetcode.com/problems/top-k-frequent-elements/', hasFullData:false },
//   { id:1539, title:'Kth Missing Positive Number',                     difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Binary Search'],            companies:['Amazon'],                 frequency:6, url:'https://leetcode.com/problems/kth-missing-positive-number/', hasFullData:false },
//   { id:765,  title:'Couples Holding Hands',                           difficulty:'Hard',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Greedy','BFS','Union Find'],        companies:['Google'],                 frequency:5, url:'https://leetcode.com/problems/couples-holding-hands/', hasFullData:false },
//   { id:274,  title:'H-Index',                                         difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Counting Sort'],            companies:['Google'],                 frequency:6, url:'https://leetcode.com/problems/h-index/', hasFullData:false },
//   { id:912,  title:'Sort an Array',                                   difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Sorting'],                  companies:['Amazon'],                 frequency:5, url:'https://leetcode.com/problems/sort-an-array/', hasFullData:false },
//   { id:969,  title:'Pancake Sorting',                                 difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Two Pointers','Greedy'],    companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/pancake-sorting/', hasFullData:false },
//   { id:1122, title:'Relative Sort Array',                             difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Hash Table','Sorting'],     companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/relative-sort-array/', hasFullData:false },
//   { id:1365, title:'How Many Numbers Are Smaller Than Current',       difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Hash Table','Counting'],    companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/', hasFullData:false },
//   { id:1356, title:'Sort Integers by The Number of 1 Bits',           difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Bit Manipulation','Sorting'],companies:['Google'],                frequency:3, url:'https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits/', hasFullData:false },
//   { id:280,  title:'Wiggle Sort',                                     difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Greedy','Sorting'],         companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/wiggle-sort/', hasFullData:false },
//   { id:2231, title:'Largest Number After Digit Swaps by Parity',      difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Sorting'],                          companies:['Google'],                 frequency:3, url:'https://leetcode.com/problems/largest-number-after-digit-swaps-by-parity/', hasFullData:false },
//   { id:2154, title:'Keep Multiplying Found Values by Two',            difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Hash Table','Sorting'],     companies:['Google'],                 frequency:3, url:'https://leetcode.com/problems/keep-multiplying-found-values-by-two/', hasFullData:false },
//   { id:2418, title:'Sort the People',                                 difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','String','Sorting'],         companies:['Google'],                 frequency:3, url:'https://leetcode.com/problems/sort-the-people/', hasFullData:false },
//   { id:2191, title:'Sort the Jumbled Numbers',                        difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Sorting'],                  companies:['Google'],                 frequency:3, url:'https://leetcode.com/problems/sort-the-jumbled-numbers/', hasFullData:false },
//   { id:2233, title:'Maximum Product After K Increments',              difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Greedy','Heap'],            companies:['Google'],                 frequency:3, url:'https://leetcode.com/problems/maximum-product-after-k-increments/', hasFullData:false },
//   { id:1051, title:'Height Checker',                                  difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Counting Sort'],            companies:['Google'],                 frequency:4, url:'https://leetcode.com/problems/height-checker/', hasFullData:false },
//   { id:2037, title:'Minimum Number of Moves to Seat Everyone',        difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Greedy','Sorting'],         companies:['Google'],                 frequency:3, url:'https://leetcode.com/problems/minimum-number-of-moves-to-seat-everyone/', hasFullData:false },
//   { id:1637, title:'Widest Vertical Area Between Two Points',         difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Sorting'],                  companies:['Google'],                 frequency:3, url:'https://leetcode.com/problems/widest-vertical-area-between-two-points-containing-no-points/', hasFullData:false },
//   { id:59,   title:'Spiral Matrix II',                                difficulty:'Medium', patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Matrix','Simulation'],      companies:['Amazon'],                 frequency:5, url:'https://leetcode.com/problems/spiral-matrix-ii/', hasFullData:false },
//   { id:1346, title:'Check If N and Its Double Exist',                 difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['Array','Hash Table'],               companies:['Google'],                 frequency:3, url:'https://leetcode.com/problems/check-if-n-and-its-double-exist/', hasFullData:false },
//   { id:2259, title:'Remove Digit From Number to Maximize Result',     difficulty:'Easy',   patternId:'cyclic-sort',        patternName:'Cyclic Sort',         tags:['String','Greedy'],                  companies:['Google'],                 frequency:3, url:'https://leetcode.com/problems/remove-digit-from-number-to-maximize-result/', hasFullData:false },
// ];


// ============================================
// app/data/questions.ts
// Central data hub for questions + quiz data
// ============================================

import { DSA_PATTERNS } from '@/lib/constants';
import type { Question, Difficulty } from '@/types/question';
import { ALL_PATTERNS as PATTERN_DATA_LIST, type PatternData } from '@/lib/patternData';

// ── JSON data for patterns 1-3 ────────────────────────────────────
import slidingWindowData from '@/data/patterns/sliding-window.json';
import twoPointersData   from '@/data/patterns/two-pointers.json';
import binarySearchData  from '@/data/patterns/binary-search.json';

// Re-export Language so [id]/page.tsx can import it from here
export type { Language } from '@/types/question';

// ── FullQuestion = Question (alias for backward compat) ───────────
export type FullQuestion = Question & {
  keywords?: string[];
  companies?: string[];
  url?: string;
};

// ── QuestionStub — lightweight type for the practice list ─────────
export interface QuestionStub {
  id         : number;
  title      : string;
  slug       : string;
  difficulty : Difficulty;
  patternId  : string;
  patternName: string;
  tags       : string[];
  companies  : string[];
  frequency  : number;
  leetcodeUrl: string;
}

// ── Build ALL_QUESTION_STUBS from pattern data ────────────────────
// Patterns 1-3 from JSON files, patterns 4-15 from patternData.ts
const JSON_PATTERN_DATA = [
  slidingWindowData,
  twoPointersData,
  binarySearchData,
] as PatternData[];

const ALL_PATTERN_DATA = [...JSON_PATTERN_DATA, ...PATTERN_DATA_LIST];

export const ALL_QUESTION_STUBS: QuestionStub[] = ALL_PATTERN_DATA.flatMap((pattern) =>
  (pattern.questions ?? []).map((q) => ({
    id         : q.id,
    title      : q.title,
    slug       : q.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    difficulty : q.difficulty as Difficulty,
    patternId  : pattern.id,
    patternName: pattern.name,
    tags       : q.tags ?? [],
    companies  : [],           // not in pattern JSON — shown as empty
    frequency  : q.frequency ?? 5,
    leetcodeUrl: q.leetcodeUrl ?? `https://leetcode.com/problems/${q.title.toLowerCase().replace(/\s+/g, '-')}/`,
  }))
);

// ── Full questions (from easy/medium/hard JSON when populated) ────
export const ALL_QUESTIONS: Question[] = [];   // empty until JSONs are filled

// Lookup by ID — export as a REGULAR FUNCTION (not type import)
export function getQuestionById(id: number): FullQuestion | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id) as FullQuestion | undefined;
}

export function getQuestionBySlug(slug: string): FullQuestion | undefined {
  return ALL_QUESTIONS.find((q) => q.slug === slug) as FullQuestion | undefined;
}

export function getQuestionsByPattern(patternId: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.patternId === patternId);
}

// ── ALL_PATTERNS — array of pattern IDs (for PatternQuiz etc.) ────
// Re-export from constants so other files can import from here
export const ALL_PATTERNS: string[] = DSA_PATTERNS.map((p) => p.id);

// ── QuizQuestion type + data ──────────────────────────────────────
export interface QuizQuestion {
  id            : string;
  question      : string;
  options       : string[];
  correctAnswer : number;   // index into options[]
  patternId     : string;
  explanation   : string;
  difficulty    : 'easy' | 'medium' | 'hard';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ── Sliding Window ─────────────────────────────────────────────
  {
    id: 'sw-1', patternId: 'sliding-window', difficulty: 'easy',
    question: 'Which pattern is best for finding the maximum sum subarray of size k?',
    options: ['Two Pointers', 'Sliding Window', 'Binary Search', 'DFS'],
    correctAnswer: 1,
    explanation: 'Sliding Window maintains a fixed-size window and slides it across the array, making it ideal for fixed-length subarray problems.',
  },
  {
    id: 'sw-2', patternId: 'sliding-window', difficulty: 'medium',
    question: 'You need to find the longest substring without repeating characters. Which pattern applies?',
    options: ['Cyclic Sort', 'BFS', 'Sliding Window', 'Topological Sort'],
    correctAnswer: 2,
    explanation: 'Variable-size Sliding Window with a hash set to track characters is the optimal approach here.',
  },
  {
    id: 'sw-3', patternId: 'sliding-window', difficulty: 'hard',
    question: 'Finding minimum window substring containing all characters of a target uses:',
    options: ['Dynamic Programming', 'Sliding Window', 'Merge Intervals', 'Fast & Slow Pointers'],
    correctAnswer: 1,
    explanation: 'Use a sliding window with two pointers and a frequency map to track required characters.',
  },

  // ── Two Pointers ────────────────────────────────────────────────
  {
    id: 'tp-1', patternId: 'two-pointers', difficulty: 'easy',
    question: 'Which pattern efficiently checks if an array has a pair of elements summing to a target (sorted array)?',
    options: ['Two Pointers', 'BFS', 'Heap', 'Cyclic Sort'],
    correctAnswer: 0,
    explanation: 'Place one pointer at start, one at end. Move them inward based on whether sum is too high or low.',
  },
  {
    id: 'tp-2', patternId: 'two-pointers', difficulty: 'medium',
    question: 'Squaring a sorted array and returning it sorted — which is most efficient?',
    options: ['Merge Sort', 'Two Pointers', 'Binary Search', 'Sliding Window'],
    correctAnswer: 1,
    explanation: 'Use two pointers at both ends, compare absolute values, fill result array from back.',
  },

  // ── Binary Search ───────────────────────────────────────────────
  {
    id: 'bs-1', patternId: 'binary-search', difficulty: 'easy',
    question: 'What is the time complexity of Binary Search?',
    options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
    correctAnswer: 2,
    explanation: 'Binary Search halves the search space each iteration, giving O(log n) time.',
  },
  {
    id: 'bs-2', patternId: 'binary-search', difficulty: 'medium',
    question: 'Finding the peak element in an unsorted array can be solved in O(log n) using:',
    options: ['Two Pointers', 'Binary Search', 'DFS', 'Sliding Window'],
    correctAnswer: 1,
    explanation: 'Binary search on the slope: if mid > mid+1 the peak is on the left; otherwise on the right.',
  },

  // ── Fast & Slow Pointers ────────────────────────────────────────
  {
    id: 'fs-1', patternId: 'fast-slow-pointers', difficulty: 'easy',
    question: 'Detecting a cycle in a linked list is classically solved by:',
    options: ['Merge Intervals', 'Hash Set only', 'Fast & Slow Pointers', 'BFS'],
    correctAnswer: 2,
    explanation: "Floyd's cycle detection: slow moves 1 step, fast moves 2. They meet iff a cycle exists.",
  },

  // ── Merge Intervals ─────────────────────────────────────────────
  {
    id: 'mi-1', patternId: 'merge-intervals', difficulty: 'easy',
    question: 'You have overlapping meeting time intervals and want to find free slots. Which pattern?',
    options: ['Cyclic Sort', 'Merge Intervals', 'Topological Sort', 'BFS'],
    correctAnswer: 1,
    explanation: 'Sort by start time, merge overlapping intervals, then gaps in merged list are free slots.',
  },

  // ── DFS ─────────────────────────────────────────────────────────
  {
    id: 'dfs-1', patternId: 'dfs', difficulty: 'easy',
    question: 'Which traversal explores as deep as possible before backtracking?',
    options: ['BFS', 'DFS', 'Topological Sort', 'Dijkstra'],
    correctAnswer: 1,
    explanation: 'DFS uses a stack (or recursion) to go as deep as possible before backtracking.',
  },
  {
    id: 'dfs-2', patternId: 'dfs', difficulty: 'medium',
    question: 'Counting connected components in a graph is best done with:',
    options: ['Heap', 'Binary Search', 'DFS / BFS', 'Merge Intervals'],
    correctAnswer: 2,
    explanation: 'Run DFS/BFS from each unvisited node; each traversal discovers one connected component.',
  },

  // ── BFS ─────────────────────────────────────────────────────────
  {
    id: 'bfs-1', patternId: 'bfs', difficulty: 'easy',
    question: 'Finding the shortest path in an unweighted graph is best solved by:',
    options: ['DFS', 'Dynamic Programming', 'BFS', 'Topological Sort'],
    correctAnswer: 2,
    explanation: 'BFS explores level by level, guaranteeing the shortest (fewest edges) path is found first.',
  },

  // ── Topological Sort ────────────────────────────────────────────
  {
    id: 'ts-1', patternId: 'topological-sort', difficulty: 'medium',
    question: 'Course scheduling with prerequisites requires:',
    options: ['DFS only', 'Binary Search', 'Topological Sort', 'Sliding Window'],
    correctAnswer: 2,
    explanation: 'Model courses as nodes and prerequisites as edges in a DAG, then topologically sort.',
  },

  // ── Heap ────────────────────────────────────────────────────────
  {
    id: 'hp-1', patternId: 'heap-priority-queue', difficulty: 'medium',
    question: 'Finding the K largest elements in a stream — most efficient approach?',
    options: ['Sort entire array', 'Min-Heap of size K', 'Max-Heap of size K', 'Binary Search'],
    correctAnswer: 1,
    explanation: 'Maintain a min-heap of size K. When new element > heap top, replace top. O(n log k).',
  },

  // ── Backtracking ────────────────────────────────────────────────
  {
    id: 'bt-1', patternId: 'subsets-backtracking', difficulty: 'medium',
    question: 'Generating all permutations of a string uses which technique?',
    options: ['Dynamic Programming', 'BFS', 'Subsets / Backtracking', 'Greedy'],
    correctAnswer: 2,
    explanation: 'Backtracking builds partial solutions and backtracks when a path cannot lead to valid output.',
  },

  // ── Dynamic Programming ─────────────────────────────────────────
  {
    id: 'dp-1', patternId: 'dynamic-programming', difficulty: 'medium',
    question: 'The 0/1 Knapsack problem is solved optimally by:',
    options: ['Greedy', 'BFS', 'Dynamic Programming', 'Two Pointers'],
    correctAnswer: 2,
    explanation: 'DP fills a 2D table [items][capacity] reusing overlapping subproblem results.',
  },
  {
    id: 'dp-2', patternId: 'dynamic-programming', difficulty: 'easy',
    question: 'Fibonacci sequence computed without recursion overhead uses:',
    options: ['Backtracking', 'Memoization / DP', 'Binary Search', 'Cyclic Sort'],
    correctAnswer: 1,
    explanation: 'Bottom-up DP (or top-down with memoization) avoids exponential recursive calls.',
  },

  // ── Bit Manipulation ────────────────────────────────────────────
  {
    id: 'bm-1', patternId: 'bit-manipulation', difficulty: 'easy',
    question: 'Finding the single non-duplicate in an array where all others appear twice is solved by:',
    options: ['Hash Map', 'XOR (Bit Manipulation)', 'Sorting', 'Two Pointers'],
    correctAnswer: 1,
    explanation: 'XOR of all elements cancels out duplicates (a ^ a = 0), leaving the single element.',
  },

  // ── Trie ─────────────────────────────────────────────────────────
  {
    id: 'tr-1', patternId: 'trie', difficulty: 'medium',
    question: 'Autocomplete / word prefix search is most efficiently handled by:',
    options: ['Hash Map', 'Binary Search', 'Trie', 'BFS'],
    correctAnswer: 2,
    explanation: 'Trie stores characters at each node; prefix queries are O(m) where m = prefix length.',
  },

  // ── Graph Algorithms ────────────────────────────────────────────
  {
    id: 'ga-1', patternId: 'graph-algorithms', difficulty: 'hard',
    question: 'Shortest path in a weighted graph (non-negative weights) uses:',
    options: ['BFS', 'DFS', "Dijkstra's Algorithm", 'Topological Sort'],
    correctAnswer: 2,
    explanation: "Dijkstra's uses a min-heap to greedily pick the nearest unvisited node, giving O((V+E) log V).",
  },
  {
    id: 'ga-2', patternId: 'graph-algorithms', difficulty: 'medium',
    question: 'Detecting if N nodes form a valid tree (no cycles, connected) uses:',
    options: ['Merge Intervals', 'Union-Find / DFS', 'Topological Sort', 'Binary Search'],
    correctAnswer: 1,
    explanation: 'Union-Find can detect cycles in O(α(n)). DFS also works: a tree has exactly N-1 edges.',
  },

  // ── Cyclic Sort ─────────────────────────────────────────────────
  {
    id: 'cs-1', patternId: 'cyclic-sort', difficulty: 'easy',
    question: 'Find the missing number in array [1..n]. Most space-efficient approach?',
    options: ['Hash Set', 'Cyclic Sort', 'XOR', 'Sorting'],
    correctAnswer: 1,
    explanation: 'Cyclic sort places each number at index num-1 in O(n). Missing = index where nums[i] ≠ i+1.',
  },
];

// ── Utility: shuffle array ─────────────────────────────────────────
export function shuffleQuestions<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function getQuizByPattern(patternId: string): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter((q) => q.patternId === patternId);
}

export function getRandomQuiz(count = 10): QuizQuestion[] {
  return shuffleQuestions(QUIZ_QUESTIONS).slice(0, count);
}