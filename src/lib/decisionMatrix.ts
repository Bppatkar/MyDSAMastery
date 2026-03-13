// ================================================================
// MASTER DECISION MATRIX
// "Ye input + ye keywords + ye constraint diya → ye output chahiye → YE PATTERN use karo"
// Itna detail ki koi bhi unknown question dekh ke pattern identify ho jaye
// ================================================================

export interface DecisionRule {
  id          : string;
  // Conditions (sab milake decide karo)
  input_signals  : string[];  // input mein kya dikh raha hai
  keyword_signals: string[];  // problem mein kaunse words hain
  constraint_signal: string;  // n ki range
  output_signal  : string;    // kya return karna hai
  // Why 
  pattern     : string;
  pattern_type: string;
  ds_used     : string;
  why_this_ds : string;       // ye DS kyu, koi aur kyu nahi
  mental_model: string;       // "main point — 1 line mein socho"
  approach    : string;       // step by step
  wrong_choice: string;       // log galti se kya sochte hain aur kyu galat hai
  time        : string;
  space       : string;
  examples    : string[];     // LeetCode problem names
}

export const DECISION_RULES: DecisionRule[] = [

  // ═══════════════════════════════════════════════════════════════
  // SLIDING WINDOW — 4 subtypes
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'sw-fixed',
    input_signals: ['array ya string', 'ek fixed size k diya hai'],
    keyword_signals: ['"subarray of size k"', '"window of size k"', '"k consecutive"', '"k-length"'],
    constraint_signal: 'n ≤ 10^5',
    output_signal: 'max/min/average ek single window ka',
    pattern: 'Sliding Window', pattern_type: 'Fixed-Size Window',
    ds_used: 'Array + ek running variable (sum/product/count)',
    why_this_ds: 'Window size fix hai isliye HashMap/Set ki zaroorat nahi. Sirf ek variable rakho jo window ka result track kare. Sliding karte waqt: naya element add karo, pehla element hatao.',
    mental_model: '"Fixed k window slide karo" — O(n) mein O(nk) ka kaam.',
    approach: '1. Pehli k elements ka result nikalo (e.g., sum)\n2. i = k se n-1 tak:\n   result += arr[i] — arr[i-k]   (naya add, purana hatao)\n   max_result = max(max_result, result)\n3. Return max_result',
    wrong_choice: 'Galti: HashMap use karte hain — zaroorat nahi, window fixed hai, O(1) space me ho jaata hai.',
    time: 'O(n)', space: 'O(1)',
    examples: ['643. Maximum Average Subarray I', '1004. Max Consecutive Ones III', '567. Permutation in String'],
  },
  {
    id: 'sw-variable-atmost',
    input_signals: ['string ya array', 'window size variable hai (given nahi)'],
    keyword_signals: ['"longest substring"', '"maximum length subarray"', '"at most k distinct"', '"without repeating"', '"no duplicate"'],
    constraint_signal: 'n ≤ 10^5',
    output_signal: 'maximum length of valid window',
    pattern: 'Sliding Window', pattern_type: 'Variable Window — At Most K (Expand/Shrink)',
    ds_used: 'HashMap (char/element → count) + do pointers l=0, r=0',
    why_this_ds: 'Window valid hai ya nahi track karna hai. HashMap O(1) mein batata hai kitni baar element aaya. Jab window invalid ho (duplicate ya >k distinct) → l badhao aur HashMap se count hatao.',
    mental_model: '"r expand karo freely, l shrink karo jab constraint toote" — yahi variable window ka core idea hai.',
    approach: '1. l=0, map={}, result=0\n2. r 0 se n-1 tak:\n   map[arr[r]]++  (r add karo)\n   while window invalid (map.size>k ya duplicate):\n     map[arr[l]]--\n     if map[arr[l]]==0: delete map[arr[l]]\n     l++\n   result = max(result, r-l+1)\n3. Return result',
    wrong_choice: 'Galti: Two Pointers se sochte hain (array sorted nahi). Ya nested loop O(n²) try karte hain — TLE.',
    time: 'O(n)', space: 'O(k) — at most k entries in map',
    examples: ['3. Longest Substring Without Repeating', '159. Longest Substring with At Most Two Distinct', '340. Longest Substring with At Most K Distinct'],
  },
  {
    id: 'sw-variable-exactly',
    input_signals: ['array of integers', 'sum ya count exact value chahiye'],
    keyword_signals: ['"exactly k"', '"count subarrays with sum k"', '"number of subarrays equal to"', '"count ways sum equals"'],
    constraint_signal: 'n ≤ 10^5',
    output_signal: 'count of subarrays (ek number)',
    pattern: 'Sliding Window', pattern_type: 'Exactly K — AtMost(k) - AtMost(k-1) Trick',
    ds_used: 'Two calls to atMost() function ya HashMap (prefix sum)',
    why_this_ds: 'Exactly k directly window se nahi hota (shrink kab karein?). Trick: f(exactly k) = f(atMost k) - f(atMost k-1). Har atMost O(n) hai.',
    mental_model: '"Exactly k" = "atMost k" minus "atMost k-1" — direct nahi, indirect approach use karo.',
    approach: 'def atMost(k):\n  l=0, count=0, curr=0\n  for r in range(n):\n    curr += arr[r]\n    while curr > k: curr -= arr[l]; l++\n    count += r-l+1\n  return count\n\nreturn atMost(k) - atMost(k-1)',
    wrong_choice: 'Galti: Direct window try karte hain "sum == k" ke liye — shrink condition unclear ho jaati hai. atMost trick use karo.',
    time: 'O(n)', space: 'O(1)',
    examples: ['930. Binary Subarrays With Sum', '992. Subarrays with K Different Integers', '1248. Count Number of Nice Subarrays'],
  },
  {
    id: 'sw-deque',
    input_signals: ['array', 'har window position ke liye max/min chahiye'],
    keyword_signals: ['"maximum in each window"', '"minimum in each window"', '"sliding window maximum"', '"all windows"'],
    constraint_signal: 'n ≤ 10^5, k diya hai',
    output_signal: 'array of max/min values (har window ke liye ek)',
    pattern: 'Sliding Window', pattern_type: 'Monotonic Deque (Window Max/Min)',
    ds_used: 'Deque (double-ended queue) — indices store karta hai, monotonically decreasing values ke liye',
    why_this_ds: 'Har window ka max O(1) mein chahiye. Simple sorted set O(log k) dega. Deque O(1) amortized deta hai. Front = current window ka max. Back se chhote elements remove karo.',
    mental_model: '"Deque ka front = window ka max" — monotonic decreasing order maintain karo.',
    approach: '1. dq = deque() (indices store karega)\n2. result = []\n3. i 0 se n-1 tak:\n   while dq aur dq.front < i-k+1: dq.popFront()  // out of window\n   while dq aur arr[dq.back] <= arr[i]: dq.popBack()  // chhote kaam ke nahi\n   dq.pushBack(i)\n   if i >= k-1: result.append(arr[dq.front])\n4. Return result',
    wrong_choice: 'Galti: Max-heap use karte hain — O(n log k), acceptable but Deque O(n) better. Ya naive O(nk) — TLE.',
    time: 'O(n)', space: 'O(k)',
    examples: ['239. Sliding Window Maximum', '1438. Longest Continuous Subarray With Absolute Diff ≤ Limit'],
  },

  // ═══════════════════════════════════════════════════════════════
  // TWO POINTERS — 4 subtypes
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tp-opposite',
    input_signals: ['SORTED array ya string', 'do elements dhundne hain'],
    keyword_signals: ['"sorted array"', '"pair sum = target"', '"container water"', '"palindrome verify"', '"two numbers that sum"'],
    constraint_signal: 'n ≤ 10^5, O(1) space often required',
    output_signal: 'pair ka index ya value, ya max area/length',
    pattern: 'Two Pointers', pattern_type: 'Opposite Ends — Converging',
    ds_used: 'l=0, r=n-1 pointers, sorted array (no extra DS)',
    why_this_ds: 'Array sorted hai → greedy kaam karta hai. Sum chhota? Left badhao (bada milega). Sum bada? Right ghatao. HashMap ki zaroorat nahi (woh unsorted ke liye).',
    mental_model: '"Sorted array + pair" = l aur r se aao andar. Sorted hone se har move meaningful hai.',
    approach: 'l=0, r=n-1\nwhile l < r:\n  sum = arr[l] + arr[r]\n  if sum == target: return [l, r]\n  elif sum < target: l++  // chhota sum → left badhao\n  else: r--  // bada sum → right ghatao',
    wrong_choice: 'Galti: HashMap use karte hain — O(n) space. Sorted array pe Two Pointers O(1) space se ho jaata hai. Agar unsorted hota toh HashMap sahi hota.',
    time: 'O(n)', space: 'O(1)',
    examples: ['167. Two Sum II', '11. Container With Most Water', '125. Valid Palindrome', '977. Squares of Sorted Array'],
  },
  {
    id: 'tp-same-dir',
    input_signals: ['array (sorted ya unsorted)', 'in-place modify karna hai'],
    keyword_signals: ['"in-place"', '"remove duplicates"', '"remove element"', '"move zeros"', '"partition"', '"modify without extra space"'],
    constraint_signal: 'n ≤ 10^5, O(1) space required',
    output_signal: 'modified array (in-place) + length count',
    pattern: 'Two Pointers', pattern_type: 'Same Direction — Slow-Fast (Read-Write)',
    ds_used: 'slow pointer (write head) + fast pointer (read head), same array',
    why_this_ds: 'slow = valid elements likhta jaata hai. fast = array padhta jaata hai. slow bass tabhi badhta hai jab valid element mile. Koi extra array nahi.',
    mental_model: '"Slow = write karo, Fast = padho" — two speeds, ek array.',
    approach: 'slow = 0  // ya 1, problem pe depend karta\nfor fast in range(1, n):\n  if arr[fast] != arr[fast-1]:  // ya koi aur condition\n    arr[slow] = arr[fast]\n    slow++\nreturn slow  // ye hai naya length',
    wrong_choice: 'Galti: Naya array banate hain — O(n) space unnecessarily. In-place possible hai slow-fast se.',
    time: 'O(n)', space: 'O(1)',
    examples: ['26. Remove Duplicates from Sorted Array', '27. Remove Element', '283. Move Zeros', '80. Remove Duplicates II'],
  },
  {
    id: 'tp-fast-slow',
    input_signals: ['Linked List', 'sequence with possible cycle'],
    keyword_signals: ['"cycle detection"', '"middle of linked list"', '"happy number"', '"detect loop"', '"find cycle start"'],
    constraint_signal: 'n ≤ 10^4, O(1) space (HashSet nahi!)',
    output_signal: 'boolean (cycle hai?), ya middle node, ya cycle start node',
    pattern: 'Two Pointers', pattern_type: 'Fast-Slow Pointers — Floyd\'s Algorithm',
    ds_used: 'slow = node (1 step), fast = node (2 steps) — koi extra DS nahi',
    why_this_ds: 'Cycle hai toh fast kabhi na kabhi slow ko overtake karta hai (circular track pe). HashSet O(n) space lega. Floyd\'s algorithm O(1) space mein cycle detect karta hai.',
    mental_model: '"Cycle mein fast = slow milte hain. No cycle = fast null reach karta hai."',
    approach: 'slow = fast = head\nwhile fast and fast.next:\n  slow = slow.next\n  fast = fast.next.next\n  if slow == fast: return True  // cycle!\nreturn False  // no cycle\n\nMiddle ke liye: slow jab ruke, woh middle par hoga',
    wrong_choice: 'Galti: HashSet use karte hain visited nodes ke liye — O(n) space, O(1) possible hai.',
    time: 'O(n)', space: 'O(1)',
    examples: ['141. Linked List Cycle', '142. Linked List Cycle II', '876. Middle of Linked List', '202. Happy Number'],
  },
  {
    id: 'tp-3sum',
    input_signals: ['array (unsorted)', 'teen elements dhundne hain jo sum = target'],
    keyword_signals: ['"triplets"', '"three numbers that sum"', '"3sum"', '"find all triplets"', '"closest sum of three"'],
    constraint_signal: 'n ≤ 3000 — O(n²) acceptable',
    output_signal: 'list of unique triplets',
    pattern: 'Two Pointers', pattern_type: 'Sort + Fix One + Two Pointer (3Sum Pattern)',
    ds_used: 'Sort + outer loop + inner l/r converging pointers',
    why_this_ds: 'Brute force O(n³) TLE. Ek element fix karo (i), baaki do ke liye Two Pointers O(n). Total O(n²). HashMap bhi possible but duplicate handling mushkil.',
    mental_model: '"Sort karo. Ek fix karo. Baaki do ke liye Two Pointers."',
    approach: 'sort(arr)\nfor i in range(n-2):\n  if i>0 and arr[i]==arr[i-1]: continue  // skip duplicates\n  l, r = i+1, n-1\n  while l < r:\n    s = arr[i]+arr[l]+arr[r]\n    if s==0: result.add([arr[i],arr[l],arr[r]]); l++; r--\n    elif s<0: l++\n    else: r--\n    // skip duplicates for l and r too',
    wrong_choice: 'Galti: Set mein store karte hain without sorting — duplicates handle karna mushkil. Sort pehle, phir pointer approach.',
    time: 'O(n²)', space: 'O(1) ignoring output',
    examples: ['15. 3Sum', '16. 3Sum Closest', '18. 4Sum', '923. 3Sum With Multiplicity'],
  },

  // ═══════════════════════════════════════════════════════════════
  // BINARY SEARCH — 4 subtypes
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'bs-classic',
    input_signals: ['SORTED array'],
    keyword_signals: ['"search in sorted"', '"find target"', '"find index"', '"O(log n) required"'],
    constraint_signal: 'n ≤ 10^8 — O(log n) required explicitly',
    output_signal: 'index ya -1',
    pattern: 'Binary Search', pattern_type: 'Classic — Sorted Array Search',
    ds_used: 'lo=0, hi=n-1 pointers, no extra DS',
    why_this_ds: 'Sorted array mein har step mein aadha hissa eliminate karo. O(log n) guaranteed.',
    mental_model: '"Sorted array mein target dhundo — har step aadha eliminate"',
    approach: 'lo=0, hi=n-1\nwhile lo <= hi:\n  mid = lo + (hi-lo)//2  // overflow-safe\n  if arr[mid] == target: return mid\n  elif arr[mid] < target: lo = mid+1\n  else: hi = mid-1\nreturn -1',
    wrong_choice: 'Galti: Linear search use karte hain O(n) — jab O(log n) explicitly demand kiya ho toh Binary Search hi dena.',
    time: 'O(log n)', space: 'O(1)',
    examples: ['704. Binary Search', '33. Search in Rotated Sorted Array', '153. Find Minimum in Rotated Sorted Array'],
  },
  {
    id: 'bs-answer-space',
    input_signals: ['array of values', 'koi ek variable k optimize karna hai'],
    keyword_signals: ['"minimize the maximum"', '"maximize the minimum"', '"minimum speed"', '"minimum days"', '"at least k", "feasibility"'],
    constraint_signal: 'n ≤ 10^5, answer range bada hai (1..10^9)',
    output_signal: 'optimal single value k',
    pattern: 'Binary Search', pattern_type: 'Binary Search on Answer Space',
    ds_used: 'Custom canDo(k) check function + lo=min_ans, hi=max_ans',
    why_this_ds: 'Array mein nahi dhund rahe — ANSWER mein dhund rahe hain. Answer range badi hai (1..10^9) → linear scan impossible. canDo(k) monotonic hai (k badhao → condition easier hoti ya harder).',
    mental_model: '"Minimum k dhundo jahan canDo(k) = true" — answer pe binary search, array pe nahi.',
    approach: '// canDo(k): check karo kya k se kaam ho sakta hai\ndef canDo(k):\n  // problem-specific logic\n  return total_cost(k) <= limit\n\nlo=1, hi=max_possible\nwhile lo < hi:\n  mid = (lo+hi)//2\n  if canDo(mid): hi = mid  // smaller might work\n  else: lo = mid+1\nreturn lo',
    wrong_choice: 'Galti: DP ya Greedy try karte hain. Yahan answer space monotonic hai — Binary Search simplest hai.',
    time: 'O(n log(max_value))', space: 'O(1)',
    examples: ['875. Koko Eating Bananas', '1011. Capacity To Ship Packages', '410. Split Array Largest Sum', '1482. Minimum Number of Days to Make m Bouquets'],
  },
  {
    id: 'bs-boundaries',
    input_signals: ['sorted array with duplicates'],
    keyword_signals: ['"first occurrence"', '"last occurrence"', '"leftmost position"', '"rightmost position"', '"search range"', '"count occurrences"'],
    constraint_signal: 'n ≤ 10^5, duplicates possible',
    output_signal: '[first_index, last_index] ya count',
    pattern: 'Binary Search', pattern_type: 'Find Left/Right Boundary',
    ds_used: 'Do separate binary searches (leftBS aur rightBS)',
    why_this_ds: 'Ek binary search mein first aur last dono nahi milte. Left boundary: target mila → hi=mid-1 karo (aur left dhundo). Right boundary: target mila → lo=mid+1 karo (aur right dhundo).',
    mental_model: '"First dhundho: found ke baad bhi left jaao. Last dhundho: found ke baad bhi right jaao."',
    approach: 'def leftBound():\n  lo,hi=0,n-1; res=-1\n  while lo<=hi:\n    mid=(lo+hi)//2\n    if arr[mid]==target: res=mid; hi=mid-1  // left jaao\n    elif arr[mid]<target: lo=mid+1\n    else: hi=mid-1\n  return res\n\ndef rightBound():\n  lo,hi=0,n-1; res=-1\n  while lo<=hi:\n    mid=(lo+hi)//2\n    if arr[mid]==target: res=mid; lo=mid+1  // right jaao\n    elif arr[mid]<target: lo=mid+1\n    else: hi=mid-1\n  return res',
    wrong_choice: 'Galti: Ek binary search se dono boundary nikalne ki koshish — nahi hoga. Do separate searches lagenge.',
    time: 'O(log n)', space: 'O(1)',
    examples: ['34. Find First and Last Position of Element', '35. Search Insert Position', '278. First Bad Version'],
  },

  // ═══════════════════════════════════════════════════════════════
  // HASHMAP — 3 subtypes
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'hm-complement',
    input_signals: ['UNSORTED array', 'pair ya subset dhundna hai'],
    keyword_signals: ['"two sum"', '"find pair"', '"sum to target"', '"pair with difference"', '"find two numbers"'],
    constraint_signal: 'n ≤ 10^5',
    output_signal: 'indices ya values of pair',
    pattern: 'HashMap', pattern_type: 'Complement Lookup (O(1) search)',
    ds_used: 'HashMap {value → index} ya {value → count}',
    why_this_ds: 'Array UNSORTED hai — Two Pointers nahi chalega (need sorted). HashMap O(1) mein "kya ye value exist karti hai?" check karta hai. complement = target - current.',
    mental_model: '"Complement dekho map mein. Nahi mila? Current ko map mein daalo."',
    approach: 'map = {}\nfor i, num in enumerate(arr):\n  complement = target - num\n  if complement in map:\n    return [map[complement], i]\n  map[num] = i\nreturn []',
    wrong_choice: 'Galti: Sort karke Two Pointers — indices change ho jaate hain! Agar original indices chahiye toh HashMap use karo.',
    time: 'O(n)', space: 'O(n)',
    examples: ['1. Two Sum', '454. 4Sum II', '560. Subarray Sum Equals K (prefix sum)'],
  },
  {
    id: 'hm-frequency',
    input_signals: ['array ya string', 'grouping ya counting chahiye'],
    keyword_signals: ['"frequency"', '"count occurrences"', '"most frequent"', '"anagram"', '"group"', '"find duplicates"'],
    constraint_signal: 'n ≤ 10^5',
    output_signal: 'groups, most frequent element, ya boolean',
    pattern: 'HashMap', pattern_type: 'Frequency Count / Grouping',
    ds_used: 'HashMap {element → count} ya {key → list_of_elements}',
    why_this_ds: 'Har element kitni baar aaya → O(1) mein count update karo. Grouping ke liye → same key wale ek saath. Sort nahi karna (O(n log n) avoid).',
    mental_model: '"Har element count karo / group karo → HashMap key-value se"',
    approach: '// Frequency:\nmap = {}\nfor x in arr:\n  map[x] = map.get(x, 0) + 1\n\n// Grouping (Anagrams):\nmap = {}\nfor word in words:\n  key = tuple(sorted(word))  // ya sorted string\n  map[key].append(word)\nreturn map.values()',
    wrong_choice: 'Galti: Sort karke count karte hain — O(n log n). HashMap O(n) mein kaam kar deta hai.',
    time: 'O(n)', space: 'O(n)',
    examples: ['49. Group Anagrams', '347. Top K Frequent Elements', '242. Valid Anagram', '383. Ransom Note'],
  },
  {
    id: 'hm-prefix-sum',
    input_signals: ['array of integers', 'contiguous subarray ka sum exact value chahiye'],
    keyword_signals: ['"subarray sum equals k"', '"count subarrays with sum"', '"prefix sum"', '"subarray summing to"'],
    constraint_signal: 'n ≤ 10^5, negative numbers bhi ho sakte hain',
    output_signal: 'count ya length (single number)',
    pattern: 'HashMap', pattern_type: 'Prefix Sum + HashMap',
    ds_used: 'prefixSum variable + HashMap {prefixSum → count}',
    why_this_ds: 'Negative numbers ki wajah se Sliding Window nahi chalega (shrink condition unclear). Prefix sum se: subarray[i..j] ka sum = prefixSum[j] - prefixSum[i-1]. Agar prefixSum[j] - k map mein hai → subarray with sum k mila!',
    mental_model: '"prefixSum[j] - prefixSum[i] = k" matlab "prefixSum[j] - k = prefixSum[i] map mein dhundo"',
    approach: 'map = {0: 1}  // empty subarray ka prefix sum = 0\nprefix = 0; count = 0\nfor num in arr:\n  prefix += num\n  if (prefix - k) in map:\n    count += map[prefix - k]\n  map[prefix] = map.get(prefix, 0) + 1\nreturn count',
    wrong_choice: 'Galti: Sliding Window use karte hain — negative numbers se window shrink/expand unclear hota hai. Prefix sum sahi approach hai.',
    time: 'O(n)', space: 'O(n)',
    examples: ['560. Subarray Sum Equals K', '525. Contiguous Array', '974. Subarray Sums Divisible by K'],
  },

  // ═══════════════════════════════════════════════════════════════
  // STACK — 3 subtypes
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'stack-bracket',
    input_signals: ['string with brackets/parentheses'],
    keyword_signals: ['"valid parentheses"', '"balanced brackets"', '"valid expression"', '"nested structure"', '"undo operations"'],
    constraint_signal: 'n ≤ 10^5',
    output_signal: 'boolean (valid ya nahi)',
    pattern: 'Stack', pattern_type: 'Bracket Matching (LIFO)',
    ds_used: 'Stack (array ya list as stack)',
    why_this_ds: 'Brackets LIFO pattern follow karte hain — jo last open hua, wo pehle close hoga. Exactly Stack ka use case.',
    mental_model: '"Opening push karo, closing pop karke match karo" — LIFO = Stack',
    approach: 'stack = []\nmatching = {")":"(", "}":"{", "]":"["}\nfor ch in s:\n  if ch in "({[": stack.append(ch)\n  else:  // closing bracket\n    if not stack or stack[-1] != matching[ch]: return False\n    stack.pop()\nreturn len(stack) == 0',
    wrong_choice: 'Galti: Count-based approach (open aur close count karo) — nested structure handle nahi hoga e.g. "(]" galat hai.',
    time: 'O(n)', space: 'O(n)',
    examples: ['20. Valid Parentheses', '32. Longest Valid Parentheses', '856. Score of Parentheses'],
  },
  {
    id: 'stack-mono-dec',
    input_signals: ['array of values'],
    keyword_signals: ['"next greater element"', '"next warmer day"', '"next taller building"', '"how many days until"', '"next larger"'],
    constraint_signal: 'n ≤ 10^5',
    output_signal: 'array where each element = "next greater" ka index/distance',
    pattern: 'Stack', pattern_type: 'Monotonic Decreasing Stack (Next Greater)',
    ds_used: 'Stack of indices (values decreasing from bottom to top)',
    why_this_ds: 'Har element ke liye next greater O(n²) brute force. Monotonic stack: jab bada element milta hai, stack ke chhote elements pop hote hain aur unka "next greater" mil jaata hai.',
    mental_model: '"Bada element aaya → stack se chhote nikalo (unka next greater yahi hai)"',
    approach: 'stack = []  // indices\nresult = [0] * n\nfor i in range(n):\n  while stack and arr[i] > arr[stack[-1]]:\n    j = stack.pop()\n    result[j] = i - j  // ya arr[i] depending on problem\n  stack.append(i)\nreturn result',
    wrong_choice: 'Galti: Nested loop O(n²) — TLE for n=10^5. Monotonic stack O(n) mein sab pop/push exactly ek baar hote hain.',
    time: 'O(n)', space: 'O(n)',
    examples: ['739. Daily Temperatures', '496. Next Greater Element I', '503. Next Greater Element II'],
  },
  {
    id: 'stack-mono-inc',
    input_signals: ['array of values (heights, prices, etc.)'],
    keyword_signals: ['"largest rectangle"', '"trap rainwater"', '"maximum area"', '"histogram"', '"stock span"'],
    constraint_signal: 'n ≤ 10^5',
    output_signal: 'single number (maximum area/water)',
    pattern: 'Stack', pattern_type: 'Monotonic Increasing Stack (Area Calculation)',
    ds_used: 'Stack of indices (values increasing from bottom to top)',
    why_this_ds: 'Har bar/element ke liye left aur right boundary chahiye. Jab chhota element milta hai, stack se bade elements pop hote hain aur unka area calculate hota hai.',
    mental_model: '"Chhota element aaya → stack ke bade nikalo, unka area calculate karo"',
    approach: 'stack = []\nmax_area = 0\narr = [0] + arr + [0]  // sentinels\nfor i in range(len(arr)):\n  while stack and arr[i] < arr[stack[-1]]:\n    h = arr[stack.pop()]\n    w = i - stack[-1] - 1\n    max_area = max(max_area, h*w)\n  stack.append(i)\nreturn max_area',
    wrong_choice: 'Galti: Left boundary right boundary separately O(n) nikalo — Two pass approach bhi O(n) but code complex. Stack se ek pass mein ho jaata hai.',
    time: 'O(n)', space: 'O(n)',
    examples: ['84. Largest Rectangle in Histogram', '42. Trapping Rain Water', '85. Maximal Rectangle'],
  },

  // ═══════════════════════════════════════════════════════════════
  // DFS — 4 subtypes
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'dfs-tree-path',
    input_signals: ['binary tree ya general tree'],
    keyword_signals: ['"root to leaf"', '"path sum"', '"all paths"', '"path equals target"', '"find path"'],
    constraint_signal: 'n ≤ 5000 nodes',
    output_signal: 'boolean ya list of paths',
    pattern: 'DFS', pattern_type: 'Tree DFS — Root to Leaf Path',
    ds_used: 'Recursion stack + current path array ya running sum',
    why_this_ds: 'Root se leaf tak jaana = recursive DFS. Current path track karo, leaf pe check karo. BFS bhi ho sakta but DFS path maintain karna easier.',
    mental_model: '"Root se leaf tak — DFS mein remaining sum pass karo, leaf pe 0 == found"',
    approach: 'def dfs(node, remaining, path=[]):\n  if not node: return\n  path.append(node.val)\n  remaining -= node.val\n  if not node.left and not node.right:  // leaf\n    if remaining == 0: result.append(path[:])\n  dfs(node.left, remaining, path)\n  dfs(node.right, remaining, path)\n  path.pop()  // backtrack!',
    wrong_choice: 'Galti: BFS use karte hain — path store karna mushkil hota hai BFS mein (har node ke saath poora path store karna padta).',
    time: 'O(n)', space: 'O(h) h=height',
    examples: ['112. Path Sum', '113. Path Sum II', '257. Binary Tree Paths', '437. Path Sum III'],
  },
  {
    id: 'dfs-graph-flood',
    input_signals: ['2D grid ya adjacency list graph'],
    keyword_signals: ['"number of islands"', '"connected components"', '"flood fill"', '"count regions"', '"connected groups"'],
    constraint_signal: 'n×m ≤ 10^6',
    output_signal: 'count of regions/components (integer)',
    pattern: 'DFS', pattern_type: 'Graph DFS — Flood Fill / Component Count',
    ds_used: 'Grid/graph + visited marking (in-place ya visited set/array)',
    why_this_ds: 'Har connected region ek baar DFS se cover ho jaata hai. visited mark karo taaki dobara na jaao. DFS call count = components count.',
    mental_model: '"Har unvisited cell pe DFS, poore component ko mark karo, count badhao"',
    approach: 'count = 0\nfor i in range(rows):\n  for j in range(cols):\n    if grid[i][j] == "1":  // unvisited land\n      dfs(i, j)  // mark whole island\n      count++\n\ndef dfs(i, j):\n  if out_of_bounds or grid[i][j]!="1": return\n  grid[i][j] = "0"  // visited mark\n  for di,dj in [(0,1),(0,-1),(1,0),(-1,0)]:\n    dfs(i+di, j+dj)',
    wrong_choice: 'Galti: BFS bhi sahi hai — dono O(n×m). DFS thoda simple code. Union-Find bhi alternative hai.',
    time: 'O(m×n)', space: 'O(m×n) recursion stack',
    examples: ['200. Number of Islands', '733. Flood Fill', '695. Max Area of Island', '130. Surrounded Regions'],
  },
  {
    id: 'dfs-backtrack',
    input_signals: ['small n (≤ 20)', 'generate ALL possibilities chahiye'],
    keyword_signals: ['"all permutations"', '"all subsets"', '"all combinations"', '"generate all"', '"find all paths"', '"every possible"'],
    constraint_signal: 'n ≤ 20 (small!) — O(2^n) ya O(n!) acceptable',
    output_signal: 'list of lists (all valid answers)',
    pattern: 'DFS', pattern_type: 'Backtracking — Generate All',
    ds_used: 'Recursion + current path (mutable array) + undo (backtrack)',
    why_this_ds: 'Subsets/permutations = exponential. Backtracking prune karta hai invalid paths early. "Make choice → Recurse → Undo choice" — yahi backtracking hai.',
    mental_model: '"Choose → Explore → Unchoose" — yahi backtracking ka template hai. Small n mein exponential acceptable.',
    approach: '// Template (subsets ke liye):\ndef backtrack(start, current):\n  result.append(current[:])  // ya leaf pe add karo\n  for i in range(start, n):\n    current.append(arr[i])  // choose\n    backtrack(i+1, current) // explore\n    current.pop()           // unchoose (backtrack!)\n\n// Permutations ke liye: used[] array rakho\n// Combinations ke liye: start index pass karo',
    wrong_choice: 'Galti: DP use karne ki koshish — DP count karta hai, all possibilities nahi deta. "All" chahiye = Backtracking.',
    time: 'O(2^n × n) for subsets, O(n! × n) for perms', space: 'O(n)',
    examples: ['46. Permutations', '78. Subsets', '39. Combination Sum', '22. Generate Parentheses', '51. N-Queens'],
  },
  {
    id: 'dfs-memo',
    input_signals: ['string ya array', 'count ya feasibility chahiye', 'overlapping subproblems obvious hain'],
    keyword_signals: ['"word break"', '"decode ways"', '"count ways top-down"', '"can partition"', '"is it possible"'],
    constraint_signal: 'n ≤ 300',
    output_signal: 'boolean ya count (single value)',
    pattern: 'DFS', pattern_type: 'DFS + Memoization (Top-Down DP)',
    ds_used: 'Recursion + memo dictionary/array (state → result)',
    why_this_ds: 'Pure DFS → same subproblems bar bar solve hote hain (exponential). Memo add karo → har state ek baar solve hoti hai (polynomial).',
    mental_model: '"DFS likhna aasaan hai, memo add karo speed ke liye" — top-down DP ka simplest form.',
    approach: 'memo = {}\ndef dfs(index):\n  if index == n: return True  // ya 1 count ke liye\n  if index in memo: return memo[index]\n  result = False  // ya 0\n  for each choice:\n    if valid(index, choice):\n      result = result or dfs(next_index)\n  memo[index] = result\n  return result\n\nreturn dfs(0)',
    wrong_choice: 'Galti: Bottom-up DP directly likhne ki koshish — harder to visualize. Top-down DFS + memo ziyada intuitive hai.',
    time: 'O(n × choices)', space: 'O(n) memo',
    examples: ['139. Word Break', '91. Decode Ways', '97. Interleaving String', '329. Longest Increasing Path in Matrix'],
  },

  // ═══════════════════════════════════════════════════════════════
  // BFS — 3 subtypes
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'bfs-level',
    input_signals: ['binary tree'],
    keyword_signals: ['"level order"', '"level by level"', '"each level"', '"right side view"', '"zigzag"', '"depth"'],
    constraint_signal: 'n ≤ 10^4',
    output_signal: 'list of lists (per level) ya values at specific level',
    pattern: 'BFS', pattern_type: 'Level-Order BFS',
    ds_used: 'Queue (deque) — FIFO for level-by-level processing',
    why_this_ds: 'Level by level jaana = BFS. Queue mein ek level ke sab nodes hote hain. level_size = queue.length → us level ke nodes process karo.',
    mental_model: '"Queue mein root daalo, har level ke nodes process karo, unke children add karo"',
    approach: 'from collections import deque\nqueue = deque([root])\nresult = []\nwhile queue:\n  level_size = len(queue)\n  level = []\n  for _ in range(level_size):\n    node = queue.popleft()\n    level.append(node.val)\n    if node.left: queue.append(node.left)\n    if node.right: queue.append(node.right)\n  result.append(level)\nreturn result',
    wrong_choice: 'Galti: DFS se level order — level tracking ke liye extra parameter pass karna padta hai, BFS natural hai.',
    time: 'O(n)', space: 'O(w) w=max width',
    examples: ['102. Binary Tree Level Order Traversal', '107. Level Order II', '199. Right Side View', '103. Zigzag Level Order'],
  },
  {
    id: 'bfs-shortest',
    input_signals: ['unweighted graph ya grid', 'source se destination'],
    keyword_signals: ['"shortest path"', '"minimum steps"', '"minimum moves"', '"minimum transformations"', '"word ladder"', '"minimum distance"'],
    constraint_signal: 'n ≤ 10^5 nodes/cells',
    output_signal: 'integer (minimum steps/distance)',
    pattern: 'BFS', pattern_type: 'Shortest Path BFS (Unweighted)',
    ds_used: 'Queue + visited set',
    why_this_ds: 'Unweighted graph mein BFS = shortest path guaranteed. Har level = 1 step. Weighted ke liye Dijkstra use karte hain (heap). BFS simpler O(V+E).',
    mental_model: '"BFS levels = distance. Jo pehle milega woh shortest path pe hai"',
    approach: 'queue = deque([(start, 0)])  // (node, distance)\nvisited = {start}\nwhile queue:\n  node, dist = queue.popleft()\n  if node == target: return dist\n  for neighbor in graph[node]:\n    if neighbor not in visited:\n      visited.add(neighbor)\n      queue.append((neighbor, dist+1))\nreturn -1  // not reachable',
    wrong_choice: 'Galti: DFS use karte hain — DFS shortest path guarantee nahi karta. BFS level-by-level = shortest.',
    time: 'O(V+E)', space: 'O(V)',
    examples: ['127. Word Ladder', '752. Open the Lock', '1091. Shortest Path in Binary Matrix', '286. Walls and Gates'],
  },
  {
    id: 'bfs-multisource',
    input_signals: ['2D grid', 'multiple starting points hain jo simultaneously spread karte hain'],
    keyword_signals: ['"rotting oranges"', '"nearest zero"', '"distance to nearest source"', '"simultaneously"', '"all sources at once"'],
    constraint_signal: 'n×m ≤ 10^6',
    output_signal: 'integer (minimum time/distance to complete spread)',
    pattern: 'BFS', pattern_type: 'Multi-Source BFS',
    ds_used: 'Queue pre-loaded with ALL sources simultaneously',
    why_this_ds: 'Single-source BFS galat hoga (ek ek source se karte toh time count wrong hota). Sabhi sources ek saath queue mein → BFS naturally simultaneous spread simulate karta hai.',
    mental_model: '"Sabhi rotten/sources ek saath queue mein daalo, phir BFS — simultaneous spread naturally handle hoti hai"',
    approach: 'queue = deque()\nfor each cell in grid:\n  if cell == source: queue.append((i,j,0))\n\nwhile queue:\n  i,j,time = queue.popleft()\n  for di,dj in 4_directions:\n    ni,nj = i+di,j+dj\n    if valid and grid[ni][nj] == fresh:\n      grid[ni][nj] = rotten\n      max_time = max(max_time, time+1)\n      queue.append((ni,nj,time+1))\n\nreturn max_time if no_fresh_left else -1',
    wrong_choice: 'Galti: Each source se alag BFS karte hain aur max lete hain — galat! Simultaneous spread capture nahi hogi.',
    time: 'O(m×n)', space: 'O(m×n)',
    examples: ['994. Rotting Oranges', '542. 01 Matrix', '1162. As Far from Land as Possible'],
  },

  // ═══════════════════════════════════════════════════════════════
  // DYNAMIC PROGRAMMING — 5 subtypes
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'dp-1d',
    input_signals: ['1D array ya single integer', 'choices at each step'],
    keyword_signals: ['"number of ways"', '"count distinct"', '"minimum cost"', '"maximum profit"', '"house robber"', '"climb stairs"'],
    constraint_signal: 'n ≤ 10^4',
    output_signal: 'single optimized value',
    pattern: 'Dynamic Programming', pattern_type: '1D DP (Linear State)',
    ds_used: 'dp[] array ya sirf 2-3 variables',
    why_this_ds: 'dp[i] = best answer for first i elements. Previous values se current decide. Often optimize to O(1) space (sirf last 1-2 values chahiye).',
    mental_model: '"dp[i] = f(dp[i-1], dp[i-2]...) — previous state se current banao"',
    approach: '// House Robber pattern:\ndp[0] = arr[0]\ndp[1] = max(arr[0], arr[1])\nfor i in range(2, n):\n  dp[i] = max(dp[i-1], dp[i-2] + arr[i])\nreturn dp[n-1]\n\n// Space optimize:\na, b = arr[0], max(arr[0], arr[1])\nfor i in range(2, n):\n  a, b = b, max(b, a + arr[i])\nreturn b',
    wrong_choice: 'Galti: Greedy try karte hain — e.g. House Robber mein greedy har baar max nahi deta. DP correct hai.',
    time: 'O(n)', space: 'O(1) optimized',
    examples: ['70. Climbing Stairs', '198. House Robber', '300. LIS', '322. Coin Change', '53. Maximum Subarray (Kadane)'],
  },
  {
    id: 'dp-2d',
    input_signals: ['do strings ya 2D grid', 'match ya path problem'],
    keyword_signals: ['"longest common subsequence"', '"edit distance"', '"unique paths"', '"minimum path sum"', '"two sequences compare"'],
    constraint_signal: 'n,m ≤ 1000',
    output_signal: 'single optimized value',
    pattern: 'Dynamic Programming', pattern_type: '2D DP (Two Sequences / Grid)',
    ds_used: 'dp[m+1][n+1] 2D array (ya rolling array for space optimization)',
    why_this_ds: 'dp[i][j] = best answer using s1[0..i] aur s2[0..j]. Char match hone pe diagonal se. Nahi hone pe left ya top se.',
    mental_model: '"dp[i][j] = s1 ke pehle i aur s2 ke pehle j mein best answer"',
    approach: '// LCS:\ndp = [[0]*(n+1) for _ in range(m+1)]\nfor i in range(1,m+1):\n  for j in range(1,n+1):\n    if s1[i-1]==s2[j-1]:\n      dp[i][j] = dp[i-1][j-1] + 1\n    else:\n      dp[i][j] = max(dp[i-1][j], dp[i][j-1])\nreturn dp[m][n]',
    wrong_choice: 'Galti: Recursion without memo O(2^n) — TLE. 2D DP tabulation O(mn) sahi hai.',
    time: 'O(m×n)', space: 'O(m×n) ya O(n) rolling',
    examples: ['1143. LCS', '72. Edit Distance', '62. Unique Paths', '64. Minimum Path Sum', '10. Regular Expression Matching'],
  },
  {
    id: 'dp-0-1-knapsack',
    input_signals: ['items with weights/values', 'har item ek baar use'],
    keyword_signals: ['"subset sum"', '"partition equal subset"', '"target sum"', '"0/1 knapsack"', '"pick or not pick"'],
    constraint_signal: 'n ≤ 200, sum/capacity ≤ 10^4',
    output_signal: 'boolean (possible?) ya maximum value',
    pattern: 'Dynamic Programming', pattern_type: '0/1 Knapsack — Each Item Once',
    ds_used: 'dp[capacity+1] boolean/value array — 1D (inner loop reverse se)',
    why_this_ds: 'Har item ek baar use hota hai. Inner loop right-to-left jaao — purane values se update karo (reuse prevent).',
    mental_model: '"dp[j] = kya sum j possible hai?" — inner loop REVERSE taaki item baar baar use na ho.',
    approach: 'target = sum(nums) // 2\ndp = [False] * (target+1)\ndp[0] = True\nfor num in nums:\n  for j in range(target, num-1, -1):  // REVERSE!\n    dp[j] = dp[j] or dp[j-num]\nreturn dp[target]',
    wrong_choice: 'Galti: Inner loop forward karte hain — item reuse ho jaata hai (unbounded knapsack ban jaata). 0/1 ke liye REVERSE loop zaroor.',
    time: 'O(n × sum)', space: 'O(sum)',
    examples: ['416. Partition Equal Subset Sum', '494. Target Sum', '1049. Last Stone Weight II', '474. Ones and Zeroes'],
  },
  {
    id: 'dp-unbounded',
    input_signals: ['items without limit', 'target amount/capacity'],
    keyword_signals: ['"unlimited coins"', '"unbounded"', '"coin change"', '"complete knapsack"', '"repetition allowed"', '"any number of times"'],
    constraint_signal: 'amount ≤ 10^4',
    output_signal: 'minimum count ya total ways',
    pattern: 'Dynamic Programming', pattern_type: 'Unbounded Knapsack — Unlimited Reuse',
    ds_used: 'dp[amount+1] array — 1D (inner loop FORWARD)',
    why_this_ds: 'Item unlimited baar use ho sakta hai. Inner loop left-to-right: updated value reuse allow karta hai (item dobara use hone deta hai).',
    mental_model: '"dp[j] = minimum coins for amount j" — inner loop FORWARD for reuse.',
    approach: 'dp = [float("inf")] * (amount+1)\ndp[0] = 0\nfor coin in coins:\n  for j in range(coin, amount+1):  // FORWARD!\n    dp[j] = min(dp[j], dp[j-coin] + 1)\nreturn dp[amount] if dp[amount] != inf else -1',
    wrong_choice: 'Galti: Greedy use karte hain (bade coin pehle) — coins=[1,3,4], amount=6: Greedy 4+1+1=3 coins, DP 3+3=2 coins. DP sahi hai.',
    time: 'O(n × amount)', space: 'O(amount)',
    examples: ['322. Coin Change', '518. Coin Change II', '279. Perfect Squares', '377. Combination Sum IV'],
  },

  // ═══════════════════════════════════════════════════════════════
  // HEAP — 3 subtypes
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'heap-top-k',
    input_signals: ['unsorted array ya stream'],
    keyword_signals: ['"k largest"', '"k smallest"', '"top k"', '"kth largest"', '"kth element"', '"k most frequent"'],
    constraint_signal: 'n ≤ 10^5',
    output_signal: 'k elements ya kth value',
    pattern: 'Heap', pattern_type: 'Top-K Elements (Maintain Heap of Size k)',
    ds_used: 'Min-Heap of size k (for k largest)',
    why_this_ds: 'Sort = O(n log n) — slow. Min-heap of size k: naya element > heap.top? → pop min, push new. Heap mein hamesha k largest. O(n log k) overall.',
    mental_model: '"K largest chahiye → min-heap of size k rakho. Heap top = kth largest"',
    approach: '// K Largest:\nimport heapq\nheap = []\nfor num in nums:\n  heapq.heappush(heap, num)\n  if len(heap) > k:\n    heapq.heappop(heap)\nreturn heap  // these are k largest\nreturn heap[0]  // kth largest specifically',
    wrong_choice: 'Galti: Sort karte hain O(n log n) — unnecessary. Heap O(n log k) faster jab k << n.',
    time: 'O(n log k)', space: 'O(k)',
    examples: ['215. Kth Largest Element', '347. Top K Frequent Elements', '373. Find K Pairs with Smallest Sums', '692. Top K Frequent Words'],
  },
  {
    id: 'heap-median',
    input_signals: ['dynamic stream of numbers'],
    keyword_signals: ['"running median"', '"median of stream"', '"find median dynamically"', '"median after each insert"'],
    constraint_signal: 'up to 5×10^4 operations',
    output_signal: 'median value after each insert',
    pattern: 'Heap', pattern_type: 'Two Heaps — Running Median',
    ds_used: 'Max-Heap (lower half) + Min-Heap (upper half)',
    why_this_ds: 'Median = middle element. Sort after each insert O(n) too slow. Two heaps: lower half ka largest (max-heap), upper half ka smallest (min-heap). Rebalance to maintain sizes.',
    mental_model: '"Left half max-heap, right half min-heap. Tops milke median dete hain"',
    approach: 'lower = []  // max-heap (negate for Python)\nupper = []  // min-heap\n\ndef addNum(num):\n  heappush(lower, -num)  // max-heap\n  heappush(upper, -heappop(lower))  // balance\n  if len(lower) < len(upper):\n    heappush(lower, -heappop(upper))\n\ndef findMedian():\n  if len(lower) > len(upper):\n    return -lower[0]\n  return (-lower[0] + upper[0]) / 2.0',
    wrong_choice: 'Galti: Sorted list maintain karte hain — O(n) insert. Two heaps O(log n) insert, O(1) median.',
    time: 'O(log n) per add, O(1) per query', space: 'O(n)',
    examples: ['295. Find Median from Data Stream', '480. Sliding Window Median'],
  },
  {
    id: 'heap-kway',
    input_signals: ['k sorted lists/arrays'],
    keyword_signals: ['"merge k sorted lists"', '"k sorted arrays"', '"k-way merge"', '"kth smallest in matrix"'],
    constraint_signal: 'n total elements, k lists',
    output_signal: 'single merged sorted list ya kth smallest',
    pattern: 'Heap', pattern_type: 'K-Way Merge (Min-Heap)',
    ds_used: 'Min-Heap storing (value, list_index, element_index)',
    why_this_ds: 'K lists mein se global minimum O(k) brute force. Heap O(log k) mein global minimum deta hai. Pop min → push next from same list.',
    mental_model: '"Heap mein har list ka current smallest rakho, pop karo, same list se next push karo"',
    approach: 'heap = []\nfor i, lst in enumerate(lists):\n  if lst: heappush(heap, (lst[0], i, 0))\n\nresult = []\nwhile heap:\n  val, i, j = heappop(heap)\n  result.append(val)\n  if j+1 < len(lists[i]):\n    heappush(heap, (lists[i][j+1], i, j+1))\nreturn result',
    wrong_choice: 'Galti: List by list merge karte hain O(nk) — slow. Heap O(n log k) efficient.',
    time: 'O(n log k)', space: 'O(k)',
    examples: ['23. Merge K Sorted Lists', '378. Kth Smallest in Matrix', '786. K-th Smallest Prime Fraction'],
  },

  // ═══════════════════════════════════════════════════════════════
  // TOPOLOGICAL SORT — 2 subtypes
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'topo-kahn',
    input_signals: ['directed graph with dependencies'],
    keyword_signals: ['"prerequisites"', '"can finish"', '"course schedule"', '"task order"', '"dependency"', '"valid ordering possible"'],
    constraint_signal: 'n ≤ 2000 nodes',
    output_signal: 'boolean (possible ya nahi) ya valid order array',
    pattern: 'Topological Sort', pattern_type: 'Kahn\'s Algorithm (BFS-based)',
    ds_used: 'In-degree array + Queue + Adjacency list',
    why_this_ds: 'Dependencies = directed edges. Cycle hai toh topological order impossible. In-degree 0 nodes pehle process hote hain (koi prerequisite nahi). Processed count < n → cycle!',
    mental_model: '"In-degree 0 = koi dependency nahi, pehle process karo. Sab process ho gaye? No cycle!"',
    approach: 'in_degree = [0] * n\ngraph = defaultdict(list)\nfor a,b in prerequisites:\n  graph[b].append(a); in_degree[a]++\n\nqueue = deque([i for i in range(n) if in_degree[i]==0])\ncount = 0\nwhile queue:\n  node = queue.popleft(); count++\n  for neighbor in graph[node]:\n    in_degree[neighbor]--\n    if in_degree[neighbor]==0: queue.append(neighbor)\n\nreturn count == n  // True = no cycle',
    wrong_choice: 'Galti: DFS se bhi topo sort hota hai — but Kahn\'s cycle detection zyada clear hai. DFS approach mein color (white/gray/black) track karna padta.',
    time: 'O(V+E)', space: 'O(V+E)',
    examples: ['207. Course Schedule', '210. Course Schedule II', '310. Minimum Height Trees', '269. Alien Dictionary'],
  },

  // ═══════════════════════════════════════════════════════════════
  // CYCLIC SORT — 2 subtypes
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'cyclic-missing',
    input_signals: ['array with values in range [0..n] ya [1..n]'],
    keyword_signals: ['"missing number"', '"first missing positive"', '"values from 1 to n"', '"range 0 to n"'],
    constraint_signal: 'n ≤ 10^5, O(1) space preferred',
    output_signal: 'missing number(s)',
    pattern: 'Cyclic Sort', pattern_type: 'Find Missing (Cyclic Sort ya XOR/Math)',
    ds_used: 'In-place array modification ya XOR variable',
    why_this_ds: 'Values in [1..n] → value i ko index i-1 par rakho (cyclic sort). Phir scan: arr[i] ≠ i+1 → i+1 missing. XOR trick bhi O(1) space: XOR(0..n) XOR all_elements = missing.',
    mental_model: '"Har value apne sahi index par jaani chahiye → galat index = missing number"',
    approach: '// XOR approach (fastest):\nresult = n\nfor i, num in enumerate(nums):\n  result ^= i ^ num\nreturn result\n\n// Math: return n*(n+1)//2 - sum(nums)',
    wrong_choice: 'Galti: HashSet use karte hain — O(n) space. XOR/Math O(1) space better.',
    time: 'O(n)', space: 'O(1)',
    examples: ['268. Missing Number', '41. First Missing Positive', '287. Find the Duplicate Number'],
  },

  // ═══════════════════════════════════════════════════════════════
  // UNION-FIND — 1 subtype
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'uf-components',
    input_signals: ['undirected graph', 'connectivity ya grouping check karna hai'],
    keyword_signals: ['"connected components"', '"same group"', '"number of groups"', '"union find"', '"accounts merge"', '"redundant connection"'],
    constraint_signal: 'n ≤ 10^5 nodes, up to n queries',
    output_signal: 'count of components ya boolean (same group?)',
    pattern: 'Graph / Union-Find', pattern_type: 'Union-Find (Disjoint Set Union)',
    ds_used: 'parent[] array + rank[] array (path compression + union by rank)',
    why_this_ds: 'Dynamic connectivity queries: "kya x aur y connected hain?" O(α(n)) per query. DFS/BFS O(n+m) per query — slow for many queries. Union-Find near O(1).',
    mental_model: '"Same root = same component. Union = roots milao, Find = root dhundo (path compress)"',
    approach: 'parent = list(range(n))\nrank = [0] * n\n\ndef find(x):\n  if parent[x] != x:\n    parent[x] = find(parent[x])  // path compression\n  return parent[x]\n\ndef union(x, y):\n  px, py = find(x), find(y)\n  if px == py: return False  // already connected\n  if rank[px] < rank[py]: px, py = py, px\n  parent[py] = px\n  if rank[px] == rank[py]: rank[px]++\n  return True\n\n// Count components:\ncomponents = n\nfor u,v in edges:\n  if union(u,v): components--\nreturn components',
    wrong_choice: 'Galti: DFS har query pe — O(n+m) per query slow. Ya BFS — same issue. Union-Find O(α(n)) amortized.',
    time: 'O(n α(n)) ≈ O(n)', space: 'O(n)',
    examples: ['547. Number of Provinces', '684. Redundant Connection', '721. Accounts Merge', '1202. Smallest String With Swaps'],
  },

  // ═══════════════════════════════════════════════════════════════
  // GREEDY — 2 subtypes
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'greedy-reach',
    input_signals: ['array of jump lengths ya reach values'],
    keyword_signals: ['"can reach"', '"jump game"', '"minimum jumps"', '"farthest reachable"', '"maximum coverage"'],
    constraint_signal: 'n ≤ 10^5',
    output_signal: 'boolean ya minimum jumps',
    pattern: 'Greedy', pattern_type: 'Track Maximum Reach',
    ds_used: 'Single maxReach variable',
    why_this_ds: 'DP O(n²) — overkill. Greedy: hamesha farthest possible reach track karo. i > maxReach → stuck. Otherwise maxReach update karo.',
    mental_model: '"Greedy works here: local best (farthest reach) = global best"',
    approach: '// Can jump:\nmaxReach = 0\nfor i in range(n):\n  if i > maxReach: return False\n  maxReach = max(maxReach, i + nums[i])\nreturn True\n\n// Minimum jumps:\njumps=0; curEnd=0; farthest=0\nfor i in range(n-1):\n  farthest = max(farthest, i+nums[i])\n  if i == curEnd: jumps++; curEnd = farthest\nreturn jumps',
    wrong_choice: 'Galti: DP O(n²) — correct but slow. Greedy O(n) sufficient kyunki "farthest reach" locally optimal = globally optimal.',
    time: 'O(n)', space: 'O(1)',
    examples: ['55. Jump Game', '45. Jump Game II', '134. Gas Station'],
  },
  {
    id: 'greedy-interval',
    input_signals: ['array of intervals'],
    keyword_signals: ['"minimum removal"', '"maximum non-overlapping"', '"activity selection"', '"non-overlapping intervals"'],
    constraint_signal: 'n ≤ 10^5',
    output_signal: 'minimum count ya maximum count',
    pattern: 'Greedy', pattern_type: 'Interval Scheduling (Sort by End Time)',
    ds_used: 'Sorted intervals (by end time) + prevEnd variable',
    why_this_ds: 'Earliest ending interval select karo → maximum "room" bacha ke rakhta hai. Exchange argument se prove hota hai: sort by end always optimal hai.',
    mental_model: '"Jo pehle khatam ho, usse rakho — yahi greedy choice maximum non-overlapping intervals deti hai"',
    approach: 'intervals.sort(key=lambda x: x[1])  // sort by END\nprevEnd = -inf; count = 0\nfor start, end in intervals:\n  if start >= prevEnd:  // no overlap\n    count++; prevEnd = end  // keep this interval\n  // else: remove this interval (count++ for removals)\nreturn n - count  // removals = total - kept',
    wrong_choice: 'Galti: Sort by start karte hain — suboptimal. Sort by END = correct greedy choice.',
    time: 'O(n log n)', space: 'O(1)',
    examples: ['435. Non-overlapping Intervals', '452. Minimum Number of Arrows', '646. Maximum Length of Pair Chain'],
  },

  // ═══════════════════════════════════════════════════════════════
  // TRIE — 2 subtypes
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'trie-basic',
    input_signals: ['multiple strings', 'prefix-based operations'],
    keyword_signals: ['"starts with"', '"autocomplete"', '"prefix search"', '"word exists in dictionary"', '"suggest words"', '"spell check"'],
    constraint_signal: 'word length ≤ 2000, up to 3×10^4 operations',
    output_signal: 'boolean per query ya list of suggestions',
    pattern: 'Trie', pattern_type: 'Basic Trie (Insert / Search / StartsWith)',
    ds_used: 'TrieNode { children: dict/array[26], isEnd: bool }',
    why_this_ds: 'Prefix search: HashMap approach = O(n×m) to check all words. Trie = O(m) per query regardless of dictionary size.',
    mental_model: '"Har character ek node. Path = word ya prefix. isEnd = word ka end"',
    approach: 'class TrieNode:\n  def __init__(self):\n    self.children = {}\n    self.isEnd = False\n\nclass Trie:\n  def insert(self, word):\n    node = root\n    for c in word:\n      if c not in node.children:\n        node.children[c] = TrieNode()\n      node = node.children[c]\n    node.isEnd = True\n\n  def search(self, word):\n    node = self._walk(word)\n    return node is not None and node.isEnd\n\n  def startsWith(self, prefix):\n    return self._walk(prefix) is not None',
    wrong_choice: 'Galti: HashMap use karte hain prefix ke liye — O(n×m) slow. Trie O(m) per operation.',
    time: 'O(m) per op (m=word length)', space: 'O(n×m) total',
    examples: ['208. Implement Trie', '211. Design Add and Search Words', '648. Replace Words', '1268. Search Suggestions System'],
  },
];

// ─── Helper: get rules by pattern ─────────────────────────────────
export const RULES_BY_PATTERN = DECISION_RULES.reduce((acc, r) => {
  if (!acc[r.pattern]) acc[r.pattern] = [];
  acc[r.pattern].push(r);
  return acc;
}, {} as Record<string, DecisionRule[]>);

// ─── Quick keyword lookup ──────────────────────────────────────────
export function findRuleByKeyword(keyword: string): DecisionRule[] {
  const kw = keyword.toLowerCase();
  return DECISION_RULES.filter(r =>
    r.keyword_signals.some(k => k.toLowerCase().includes(kw)) ||
    r.input_signals.some(i => i.toLowerCase().includes(kw))
  );
}
