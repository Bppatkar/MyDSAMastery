// ═══════════════════════════════════════════════════════════════════
// CORE QUESTIONS — 3 per pattern type, FREE LeetCode only
// Deep methodology: HOW to read, identify, and solve each
// ═══════════════════════════════════════════════════════════════════

export interface CoreQuestion {
  id: number;           // our internal ID
  lcNum: number;        // LeetCode problem number  
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  patternId: string;
  patternName: string;
  typeId: string;       // which sub-type of this pattern
  typeName: string;

  // ─── Deep Methodology ───────────────────────────────────────────
  // 1. Kaise padhte hain question ko
  howToRead: string;     // "Ye keywords notice karo question mein..."

  // 2. Constraint dekh kar kya sochte hain
  constraint: string;    // "n ≤ 10⁵ — isliye..."
  constraintKyu: string; // "Kyunki n=10⁵ mein O(n²) = 10¹⁰ ops = TLE..."

  // 3. Input dekh kar konsa pattern
  inputType: string;     // "Sorted array of integers"
  inputKyu: string;      // "Sorted array + pair = Two Pointers signal..."

  // 4. Keywords in actual question text (not tags)
  questionKeywords: string[];  // words TO LOOK FOR in problem statement
  keywordKyu: string;          // "In words dikhe to immediately sochna..."

  // 5. Output type → approach
  outputType: string;    // "Single integer (max sum)"
  outputKyu: string;     // "Single value return = aggregate over window..."

  // 6. Pattern + Type identification
  whyThisPattern: string;   // Full reasoning chain
  whyThisType: string;      // Why this specific sub-type

  // 7. Brute Force
  bruteForce: string;        // Simple English, what naive solution is
  bruteForceWhy: string;     // Why it's slow
  bruteForceCode: string;    // JS pseudocode

  // 8. Optimal approach
  approach: string[];        // Step by step Hinglish
  optimalCode: string;       // JS pseudocode

  // Time/Space
  timeComplexity: string;
  spaceComplexity: string;
  dataStructure: string;

  // LeetCode link
  lcUrl: string;
  tags: string[];
  companies: string[];
}

// ═══════════════════════════════════════════════════════════════════
// PATTERN 1: SLIDING WINDOW
// ═══════════════════════════════════════════════════════════════════

const slidingWindowQuestions: CoreQuestion[] = [
  // Type 1: Fixed-Size Window
  {
    id: 1, lcNum: 643, title: 'Maximum Average Subarray I',
    difficulty: 'Easy', patternId: 'sliding-window', patternName: 'Sliding Window',
    typeId: 'fixed-window', typeName: 'Fixed-Size Window',
    howToRead: 'Question mein "subarray of length k" aur "maximum average" likha hai. Ye fix size hai kyunki k directly given hai. "Contiguous" matlab continuous elements.',
    constraint: 'n ≤ 10⁵, k ≤ n', constraintKyu: 'n=10⁵ mein O(n) chahiye. Agar O(n×k) kiya (brute) = 10⁵×10⁵ = 10¹⁰ ops = TLE. Window slide karo = O(n).',
    inputType: 'Integer array + fixed size k', inputKyu: 'Fixed size k diya + contiguous subarray = Fixed Window signal. Variable nahi, isliye shrink nahi karna.',
    questionKeywords: ['subarray', 'length k', 'maximum', 'average', 'contiguous'],
    keywordKyu: '"subarray of length k" → Fixed window. "maximum" → track max while sliding. Ye 3 words ek saath = seedha Fixed Window.',
    outputType: 'Single decimal (maximum average)', outputKyu: 'Ek value return = aggregate track karo sliding karte waqt. Running sum update karo.',
    whyThisPattern: 'Fixed k size window + max aggregate = Sliding Window Fixed type. O(n) mein possible kyunki har step mein sirf ek add + ek remove.',
    whyThisType: 'k fixed hai isliye Fixed Window. Variable window mein condition pe shrink karte hain — yahan koi condition nahi, just slide.',
    bruteForce: 'Har possible starting index i pe length-k subarray ka sum nikalo, max track karo.',
    bruteForceWhy: 'n × k iterations = O(n×k). k bada ho to TLE. Ek ek bar sum se calculate karo = wasteful.',
    bruteForceCode: 'let maxSum = -Inf;\nfor (let i = 0; i <= n-k; i++) {\n  let sum = 0;\n  for (let j = i; j < i+k; j++) sum += nums[j]; // ye inner loop wasteful hai\n  maxSum = Math.max(maxSum, sum);\n}\nreturn maxSum / k;',
    approach: ['Pehle k elements ka sum nikalo (initial window)', 'i=k se start: sum += nums[i] - nums[i-k] (right add, left remove)', 'Har step mein maxSum update karo', 'Return maxSum/k'],
    optimalCode: 'let sum = nums.slice(0,k).reduce((a,b)=>a+b,0);\nlet max = sum;\nfor (let i=k; i<n; i++) {\n  sum += nums[i] - nums[i-k]; // O(1) update!\n  max = Math.max(max, sum);\n}\nreturn max/k;',
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    dataStructure: 'Running sum variable only',
    lcUrl: 'https://leetcode.com/problems/maximum-average-subarray-i/', tags: ['Array', 'Sliding Window'], companies: ['Apple', 'Google'],
  },
  {
    id: 2, lcNum: 1343, title: 'Number of Sub-arrays of Size K and Average ≥ Threshold',
    difficulty: 'Medium', patternId: 'sliding-window', patternName: 'Sliding Window',
    typeId: 'fixed-window', typeName: 'Fixed-Size Window',
    howToRead: '"Number of sub-arrays" = count karo. "Size K" = fixed window. "Average ≥ threshold" = condition check karo har window pe.',
    constraint: 'n ≤ 10⁵, 1 ≤ k ≤ n', constraintKyu: 'n=10⁵ → O(n) chahiye. Count chahiye, not just one answer — isliye pure array traverse karo.',
    inputType: 'Integer array + k + threshold', inputKyu: 'Fixed k + count valid windows = Fixed Window. Condition simple hai (avg ≥ threshold), direct check karo.',
    questionKeywords: ['number of sub-arrays', 'size k', 'average', 'greater than or equal'],
    keywordKyu: '"number of sub-arrays" = sliding + count. "size k" = fixed window size. Direct Fixed Window.',
    outputType: 'Integer count', outputKyu: 'Count chahiye — window valid hai to count++ karo.',
    whyThisPattern: 'Fixed k window slide karo, har window ka avg check karo. O(n) possible.',
    whyThisType: 'k fixed, simple threshold check = Fixed Window (Variable window sirf jab shrink karna ho).',
    bruteForce: 'Har i pe length-k sum nikalo, avg check karo.',
    bruteForceWhy: 'O(n×k) — n=10⁵, k=10⁴ = 10⁹ ops = TLE.',
    bruteForceCode: 'let count = 0;\nfor (let i=0; i<=n-k; i++) {\n  let sum = 0;\n  for (let j=i; j<i+k; j++) sum += arr[j];\n  if (sum/k >= threshold) count++;\n}\nreturn count;',
    approach: ['Initial window sum nikalo', 'Slide: sum += arr[i] - arr[i-k]', 'sum/k >= threshold? count++', 'Return count'],
    optimalCode: 'let sum = arr.slice(0,k).reduce((a,b)=>a+b,0), count = sum/k>=t?1:0;\nfor (let i=k; i<n; i++) {\n  sum += arr[i]-arr[i-k];\n  if (sum/k >= t) count++;\n}\nreturn count;',
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    dataStructure: 'Running sum + count variable',
    lcUrl: 'https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/', tags: ['Array', 'Sliding Window'], companies: ['Amazon'],
  },
  {
    id: 3, lcNum: 567, title: 'Permutation in String',
    difficulty: 'Medium', patternId: 'sliding-window', patternName: 'Sliding Window',
    typeId: 'fixed-window', typeName: 'Fixed-Size Window',
    howToRead: '"Permutation" = same characters, any order. "s1\'s permutation in s2" = s1 ki length ka window s2 mein dhundho jahan same char frequencies hon.',
    constraint: 'n ≤ 10⁴', constraintKyu: 'n=10⁴ → O(n) ya O(n×26) OK. 26 characters fix hain — frequency array use karo.',
    inputType: 'Two strings s1, s2', inputKyu: 's1 ki length = window size (fixed!). Frequency match check = Fixed Window with frequency comparison.',
    questionKeywords: ['permutation', 'one of s1\'s permutations', 'substring of s2', 'contains'],
    keywordKyu: '"permutation" = anagram = same char frequency. Ye dekhte hi: fixed window + frequency compare. s1.length = window size.',
    outputType: 'Boolean', outputKyu: 'True/false = ek bhi valid window mile to true.',
    whyThisPattern: 's1.length ka fixed window s2 mein slide karo. Har window ki frequency s1 se match karo.',
    whyThisType: 'Window size fix (s1.length) = Fixed Window. Frequency array O(26) compare.',
    bruteForce: 'Har window sort karo, s1 sort se compare karo.',
    bruteForceWhy: 'O(n × k log k) — sorting har window pe.',
    bruteForceCode: 'const s1Sorted = s1.split("").sort().join("");\nfor (let i=0; i<=s2.length-s1.length; i++) {\n  if (s2.slice(i,i+s1.length).split("").sort().join("") === s1Sorted) return true;\n}\nreturn false;',
    approach: ['s1 ki frequency count karo (freq1[])', 'Size s1.length ka window s2 mein banao', 'Slide: right char add, left char remove from window freq', 'freq1 === freq2? return true', 'Return false'],
    optimalCode: 'const f1=new Array(26).fill(0), f2=new Array(26).fill(0);\nconst a="a".charCodeAt(0);\nfor(let c of s1) f1[c.charCodeAt(0)-a]++;\nfor(let i=0;i<s1.length;i++) f2[s2[i].charCodeAt(0)-a]++;\nif(f1.join()===f2.join()) return true;\nfor(let i=s1.length;i<s2.length;i++){\n  f2[s2[i].charCodeAt(0)-a]++;\n  f2[s2[i-s1.length].charCodeAt(0)-a]--;\n  if(f1.join()===f2.join()) return true;\n}\nreturn false;',
    timeComplexity: 'O(n)', spaceComplexity: 'O(26) = O(1)',
    dataStructure: 'Two frequency arrays of size 26',
    lcUrl: 'https://leetcode.com/problems/permutation-in-string/', tags: ['String', 'Sliding Window', 'HashMap'], companies: ['Microsoft', 'Amazon'],
  },

  // Type 2: Variable Window
  {
    id: 4, lcNum: 3, title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium', patternId: 'sliding-window', patternName: 'Sliding Window',
    typeId: 'variable-window', typeName: 'Variable-Size Window',
    howToRead: '"Longest" = maximize. "Without repeating" = condition on window. Window badhta hai jab condition OK, shrink karo jab condition violate ho.',
    constraint: 'n ≤ 5×10⁴', constraintKyu: 'n=50000 → O(n) chahiye. Each char max 2 baar visit hoga (add + remove) = O(n) total.',
    inputType: 'String', inputKyu: 'String + "no repeating" condition + maximize = Variable Window. Condition violate? Left shrink karo.',
    questionKeywords: ['longest', 'substring', 'without repeating', 'repeating characters'],
    keywordKyu: '"longest" + "condition on window" = Variable Window. "without repeating" = HashMap mein char exist karo, duplicate nikla to left badhao.',
    outputType: 'Integer (max length)', outputKyu: 'Maximize window length = right - left + 1 track karo.',
    whyThisPattern: 'Window condition = no duplicate. Condition violate? Shrink. Maximize window size.',
    whyThisType: 'Variable window — size k nahi diya, condition-based shrinking.',
    bruteForce: 'Har (i,j) pair check karo uniqueness ke liye.',
    bruteForceWhy: 'O(n²) pairs × O(n) unique check = O(n³) ya O(n²). n=50000 → TLE.',
    bruteForceCode: 'let max = 0;\nfor (let i=0; i<n; i++) {\n  const seen = new Set();\n  for (let j=i; j<n; j++) {\n    if (seen.has(s[j])) break; // ye break O(n) waste karta hai\n    seen.add(s[j]);\n    max = Math.max(max, j-i+1);\n  }\n}\nreturn max;',
    approach: ['map = {}, left = 0, maxLen = 0', 'right expand: map[s[right]] already exists?', 'left = max(left, map[s[right]]+1) — jump past duplicate', 'map[s[right]] = right update', 'maxLen = max(maxLen, right-left+1)'],
    optimalCode: 'const map = {};\nlet left=0, max=0;\nfor(let r=0;r<s.length;r++){\n  if(map[s[r]] >= left) left = map[s[r]]+1; // duplicate found, shrink\n  map[s[r]] = r;\n  max = Math.max(max, r-left+1);\n}\nreturn max;',
    timeComplexity: 'O(n)', spaceComplexity: 'O(min(n,26))',
    dataStructure: 'HashMap {char → last seen index}',
    lcUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', tags: ['String', 'Sliding Window', 'HashMap'], companies: ['Amazon', 'Microsoft', 'Google'],
  },
  {
    id: 5, lcNum: 76, title: 'Minimum Window Substring',
    difficulty: 'Hard', patternId: 'sliding-window', patternName: 'Sliding Window',
    typeId: 'variable-window', typeName: 'Variable-Size Window',
    howToRead: '"Minimum window" = minimize. "Contains all chars of t" = condition. Ye shrinking window problem hai — pehle expand (valid banao), phir shrink (minimize karo).',
    constraint: 'n ≤ 10⁵', constraintKyu: 'O(n) chahiye. Dono pointers max n tak jayenge (O(n) each) = O(n) total.',
    inputType: 'Two strings s, t', inputKyu: 't ke sab chars chahiye s ke window mein. Frequency count karo. Valid window mila to shrink karo minimum ke liye.',
    questionKeywords: ['minimum window', 'substring', 'contains all characters', 'minimum length'],
    keywordKyu: '"minimum window" = variable window minimize karo. "contains all characters" = frequency match karo. have/need counter se optimize.',
    outputType: 'String (minimum window)', outputKyu: 'Minimum window return karo — start+end track karo.',
    whyThisPattern: 'Variable window: expand jab invalid, shrink jab valid. Minimum track karo.',
    whyThisType: 'Variable window + minimize + frequency condition = classic Variable Window Minimize.',
    bruteForce: 'Har (i,j) substring check karo t ke sab chars hain ya nahi.',
    bruteForceWhy: 'O(n²) substrings × O(|t|) check = O(n²×|t|). n=10⁵ → TLE.',
    bruteForceCode: 'let minLen = Inf, minStr = "";\nfor(let i=0;i<n;i++) for(let j=i;j<n;j++) {\n  if (contains(s.slice(i,j+1), t)) { // O(|t|) check\n    if(j-i+1 < minLen) { minLen=j-i+1; minStr=s.slice(i,j+1); }\n  }\n}\nreturn minStr;',
    approach: ['need = freq(t), have = 0, required = unique chars in t', 'right expand: char in need? freq match? have++', 'have === required? valid window mila → shrink left', 'Shrink: left char remove. freq drop below need? have--', 'Minimum window track karo while valid'],
    optimalCode: 'const need={}, win={};\nfor(const c of t) need[c]=(need[c]??0)+1;\nlet have=0, req=Object.keys(need).length, l=0, res=[-1,0,0];\nfor(let r=0;r<s.length;r++){\n  win[s[r]]=(win[s[r]]??0)+1;\n  if(need[s[r]] && win[s[r]]===need[s[r]]) have++;\n  while(have===req){\n    if(res[0]===-1||r-l+1<res[0]) res=[r-l+1,l,r];\n    win[s[l]]--;\n    if(need[s[l]]&&win[s[l]]<need[s[l]]) have--;\n    l++;\n  }\n}\nreturn res[0]===-1?"":s.slice(res[1],res[2]+1);',
    timeComplexity: 'O(n)', spaceComplexity: 'O(|t|)',
    dataStructure: 'Two HashMaps (need + window frequency)',
    lcUrl: 'https://leetcode.com/problems/minimum-window-substring/', tags: ['String', 'Sliding Window', 'HashMap'], companies: ['Facebook', 'Amazon', 'Google'],
  },
  {
    id: 6, lcNum: 1004, title: 'Max Consecutive Ones III',
    difficulty: 'Medium', patternId: 'sliding-window', patternName: 'Sliding Window',
    typeId: 'variable-window', typeName: 'Variable-Size Window',
    howToRead: '"Flip at most k zeros" = zeros allowed in window ≤ k. "Maximum consecutive ones" = maximize window length under this condition.',
    constraint: 'n ≤ 10⁵', constraintKyu: 'O(n) chahiye. Window expand + shrink = each element max 2x visit = O(n).',
    inputType: 'Binary array + k', inputKyu: 'Binary array + "at most k" condition + maximize = Variable Window. Zeros count ≤ k maintain karo.',
    questionKeywords: ['flip at most k', 'consecutive ones', 'maximum', 'binary array'],
    keywordKyu: '"at most k" = window constraint. "consecutive" = window/subarray. "maximum" = maximize window. Direct Variable Window.',
    outputType: 'Integer (max length)', outputKyu: 'Maximum window size = right - left + 1 track karo.',
    whyThisPattern: 'Condition: zeros in window ≤ k. Maximize window. Variable window — shrink when zeros > k.',
    whyThisType: 'Variable window with at-most-k constraint = standard Variable Window.',
    bruteForce: 'Har subarray check karo: zeros ≤ k? Length track karo.',
    bruteForceWhy: 'O(n²) — n=10⁵ = 10¹⁰ ops = TLE.',
    bruteForceCode: 'let max=0;\nfor(let i=0;i<n;i++){\n  let zeros=0;\n  for(let j=i;j<n;j++){\n    if(nums[j]===0) zeros++;\n    if(zeros>k) break;\n    max=Math.max(max,j-i+1);\n  }\n}\nreturn max;',
    approach: ['zeros = 0, left = 0', 'right expand: nums[right]===0? zeros++', 'zeros > k? shrink: nums[left]===0? zeros--; left++', 'maxLen = max(maxLen, right-left+1)'],
    optimalCode: 'let left=0,zeros=0,max=0;\nfor(let r=0;r<nums.length;r++){\n  if(nums[r]===0) zeros++;\n  while(zeros>k){ if(nums[left++]===0) zeros--; }\n  max=Math.max(max,r-left+1);\n}\nreturn max;',
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    dataStructure: 'Zero counter + two pointers',
    lcUrl: 'https://leetcode.com/problems/max-consecutive-ones-iii/', tags: ['Array', 'Sliding Window', 'Binary Array'], companies: ['Facebook', 'Google'],
  },

  // Type 3: Exactly K (atMost trick)
  {
    id: 7, lcNum: 930, title: 'Binary Subarrays With Sum',
    difficulty: 'Medium', patternId: 'sliding-window', patternName: 'Sliding Window',
    typeId: 'exactly-k', typeName: 'Exactly K (atMost Trick)',
    howToRead: '"Number of subarrays" = count. "Sum equals goal" = exact sum condition. Direct sliding window se "exactly" condition hard hai — atMost trick use karo.',
    constraint: 'n ≤ 3×10⁴', constraintKyu: 'O(n) chahiye. atMost(k) function O(n) mein — call 2 baar karo.',
    inputType: 'Binary array + goal', inputKyu: 'Binary array + exact sum = Prefix Sum bhi chalega, ya atMost trick: exactly(k) = atMost(k) - atMost(k-1).',
    questionKeywords: ['number of subarrays', 'sum equals', 'goal', 'binary array'],
    keywordKyu: '"exactly equals" wali condition → atMost trick. exactly(k) = atMost(k) - atMost(k-1). Ye mathematical insight yaad karo!',
    outputType: 'Integer count', outputKyu: 'Count of valid subarrays = atMost(goal) - atMost(goal-1).',
    whyThisPattern: 'Exactly = atMost(k) - atMost(k-1). Ye sliding window ki ek important variation hai.',
    whyThisType: 'Exactly K window — direct sliding window se nahi, atMost subtraction se.',
    bruteForce: 'Har (i,j) subarray ka sum check karo = goal?',
    bruteForceWhy: 'O(n²) = 9×10⁸ ops. TLE.',
    bruteForceCode: 'let count=0;\nfor(let i=0;i<n;i++) {\n  let sum=0;\n  for(let j=i;j<n;j++) {\n    sum+=nums[j];\n    if(sum===goal) count++;\n  }\n}\nreturn count;',
    approach: ['atMost(k): window mein sum ≤ k. count += right-left+1', 'Exactly(k) = atMost(k) - atMost(k-1)', 'Return atMost(goal) - atMost(goal-1)'],
    optimalCode: 'function atMost(k) {\n  let l=0, sum=0, cnt=0;\n  for(let r=0;r<nums.length;r++){\n    sum+=nums[r];\n    while(sum>k) sum-=nums[l++];\n    cnt+=r-l+1; // all subarrays ending at r with sum<=k\n  }\n  return cnt;\n}\nreturn atMost(goal) - atMost(goal-1);',
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    dataStructure: 'Two pointers + running sum',
    lcUrl: 'https://leetcode.com/problems/binary-subarrays-with-sum/', tags: ['Array', 'Sliding Window', 'Prefix Sum'], companies: ['Google'],
  },
  {
    id: 8, lcNum: 992, title: 'Subarrays with K Different Integers',
    difficulty: 'Hard', patternId: 'sliding-window', patternName: 'Sliding Window',
    typeId: 'exactly-k', typeName: 'Exactly K (atMost Trick)',
    howToRead: '"Exactly k different integers" = exactly k distinct. Direct window hard hai — atMost trick! exactly(k) = atMost(k) - atMost(k-1).',
    constraint: 'n ≤ 2×10⁴', constraintKyu: 'O(n) chahiye. atMost function O(n) = final O(n).',
    inputType: 'Integer array + k', inputKyu: 'Distinct count condition + exactly = atMost trick. HashMap se distinct count track karo.',
    questionKeywords: ['exactly k different', 'subarrays', 'k different integers'],
    keywordKyu: '"exactly k different" → immediately atMost trick socho. exactly(k) = atMost(k) - atMost(k-1). HashMap distinct track.',
    outputType: 'Integer count', outputKyu: 'Count of valid subarrays.',
    whyThisPattern: 'Exactly K distinct = classic atMost subtraction trick.',
    whyThisType: 'Exactly K window with HashMap for distinct count.',
    bruteForce: 'O(n²) subarray distinct check.',
    bruteForceWhy: 'O(n²) = TLE for n=2×10⁴.',
    bruteForceCode: 'let count=0;\nfor(let i=0;i<n;i++){\n  const set=new Set();\n  for(let j=i;j<n;j++){\n    set.add(nums[j]);\n    if(set.size===k) count++;\n    if(set.size>k) break;\n  }\n}\nreturn count;',
    approach: ['atMost(k): window distinct ≤ k, count += r-l+1', 'Return atMost(k) - atMost(k-1)'],
    optimalCode: 'function atMost(k){\n  const map={}; let l=0,cnt=0,dist=0;\n  for(let r=0;r<nums.length;r++){\n    if(!map[nums[r]]) dist++;\n    map[nums[r]]=(map[nums[r]]??0)+1;\n    while(dist>k){ map[nums[l]]--; if(!map[nums[l]]) dist--; l++; }\n    cnt+=r-l+1;\n  }\n  return cnt;\n}\nreturn atMost(k)-atMost(k-1);',
    timeComplexity: 'O(n)', spaceComplexity: 'O(k)',
    dataStructure: 'HashMap {value → count} for distinct tracking',
    lcUrl: 'https://leetcode.com/problems/subarrays-with-k-different-integers/', tags: ['Array', 'Sliding Window', 'HashMap'], companies: ['Google', 'Amazon'],
  },
  {
    id: 9, lcNum: 209, title: 'Minimum Size Subarray Sum',
    difficulty: 'Medium', patternId: 'sliding-window', patternName: 'Sliding Window',
    typeId: 'exactly-k', typeName: 'Variable Window — Minimize',
    howToRead: '"Minimal length" = minimize window. "Sum ≥ target" = condition. Expand jab sum chhota, shrink jab sum ≥ target.',
    constraint: 'n ≤ 10⁵', constraintKyu: 'O(n log n) bhi chalega (binary search approach), par O(n) sliding window better.',
    inputType: 'Positive integer array + target', inputKyu: 'Positive numbers + sum condition + minimize = Variable Window. Positive numbers = window valid rehta hai jab sum badhta hai.',
    questionKeywords: ['minimal length', 'subarray', 'sum greater than or equal', 'target'],
    keywordKyu: '"minimal length" + "sum ≥ target" = Variable Window minimize. Positive numbers important — negative hote to condition complex hoti.',
    outputType: 'Integer (min length)', outputKyu: 'Minimum window length — shrink karo jab valid.',
    whyThisPattern: 'Variable window minimize: expand right, shrink left when sum ≥ target, track minimum.',
    whyThisType: 'Variable window minimize (vs maximize in longest problems).',
    bruteForce: 'O(n²) subarray sum check.',
    bruteForceWhy: 'O(n²) = TLE.',
    bruteForceCode: 'let min=Inf;\nfor(let i=0;i<n;i++){\n  let sum=0;\n  for(let j=i;j<n;j++){\n    sum+=nums[j];\n    if(sum>=target){min=Math.min(min,j-i+1);break;}\n  }\n}\nreturn min===Inf?0:min;',
    approach: ['sum=0, left=0, minLen=Inf', 'right expand: sum += nums[right]', 'sum >= target? minLen = min(minLen, right-left+1); sum -= nums[left]; left++', 'Return minLen'],
    optimalCode: 'let sum=0,l=0,min=Inf;\nfor(let r=0;r<n;r++){\n  sum+=nums[r];\n  while(sum>=target){\n    min=Math.min(min,r-l+1);\n    sum-=nums[l++];\n  }\n}\nreturn min===Inf?0:min;',
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    dataStructure: 'Running sum + two pointers',
    lcUrl: 'https://leetcode.com/problems/minimum-size-subarray-sum/', tags: ['Array', 'Sliding Window', 'Binary Search'], companies: ['Facebook', 'Amazon'],
  },
];

// ═══════════════════════════════════════════════════════════════════
// PATTERN 2: TWO POINTERS
// ═══════════════════════════════════════════════════════════════════

const twoPointerQuestions: CoreQuestion[] = [
  // Type 1: Opposite Ends (Converging)
  {
    id: 10, lcNum: 167, title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Medium', patternId: 'two-pointers', patternName: 'Two Pointers',
    typeId: 'opposite-ends', typeName: 'Opposite Ends (Converging)',
    howToRead: '"Sorted array" + "two numbers that add up to target" = Two Pointers. Sorted = left/right se start karo, converge karo.',
    constraint: 'n ≤ 3×10⁴, sorted array', constraintKyu: 'Sorted + O(1) space required → Two Pointers. HashMap bhi O(n) but O(n) space. Two Pointers O(n) time + O(1) space.',
    inputType: 'Sorted integer array + target', inputKyu: 'SORTED + pair dhundna = Two Pointers signal #1. Sorted array ka yahi fayda hai — left/right se start karo.',
    questionKeywords: ['sorted', 'two numbers', 'add up to target', 'one-based index'],
    keywordKyu: '"sorted" word directly = Two Pointers sochna shuru karo. "Two numbers" = pair = left+right pointers.',
    outputType: 'Two indices (1-indexed)', outputKyu: 'Indices return karo — while loop mein track karo.',
    whyThisPattern: 'Sorted array + pair = Two Pointers classic. O(1) space, O(n) time.',
    whyThisType: 'Opposite ends: left=0, right=n-1. Sum chhota → left++. Sum bada → right--.',
    bruteForce: 'Har pair (i,j) check karo.',
    bruteForceWhy: 'O(n²) pairs. n=3×10⁴ → 9×10⁸ = TLE.',
    bruteForceCode: 'for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) if(nums[i]+nums[j]===t) return [i+1,j+1];',
    approach: ['left = 0, right = n-1', 'sum = nums[left] + nums[right]', 'sum < target → left++ (bada chahiye)', 'sum > target → right-- (chhota chahiye)', 'sum === target → return [left+1, right+1]'],
    optimalCode: 'let l=0, r=nums.length-1;\nwhile(l<r){\n  const sum=nums[l]+nums[r];\n  if(sum===target) return [l+1,r+1];\n  sum<target ? l++ : r--;\n}\nreturn [];',
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    dataStructure: 'Two index variables (no extra space)',
    lcUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', tags: ['Array', 'Two Pointers', 'Binary Search'], companies: ['Amazon', 'Microsoft'],
  },
  {
    id: 11, lcNum: 11, title: 'Container With Most Water',
    difficulty: 'Medium', patternId: 'two-pointers', patternName: 'Two Pointers',
    typeId: 'opposite-ends', typeName: 'Opposite Ends (Converging)',
    howToRead: '"Maximum amount of water" = maximize area. Area = min(h[l], h[r]) × (r-l). Maximize karne ke liye: shorter side ko move karo.',
    constraint: 'n ≤ 10⁵', constraintKyu: 'O(n) chahiye. Two Pointers: ek pass mein solution. O(n²) brute = TLE.',
    inputType: 'Integer array (heights)', inputKyu: 'Maximize value between two elements = Two Pointers opposite ends. Shorter height move karo — longer height ko move karna waste hai (area sirf chhota hoga).',
    questionKeywords: ['container', 'most water', 'vertical lines', 'maximum'],
    keywordKyu: '"most water" + "two vertical lines" = area between two indices = Two Pointers. Greedy insight: chhoti height move karo.',
    outputType: 'Integer (max water)', outputKyu: 'Maximize area = min(h[l],h[r]) × (r-l). Track max while converging.',
    whyThisPattern: 'Two boundaries, maximize value = Two Pointers Opposite Ends with greedy move.',
    whyThisType: 'Opposite ends converging — shorter height pointer move karo (greedy proof).',
    bruteForce: 'Har pair (i,j) ka area calculate karo.',
    bruteForceWhy: 'O(n²). n=10⁵ → 10¹⁰ = TLE.',
    bruteForceCode: 'let max=0;\nfor(let i=0;i<n;i++) for(let j=i+1;j<n;j++)\n  max=Math.max(max, Math.min(h[i],h[j])*(j-i));\nreturn max;',
    approach: ['l=0, r=n-1, maxWater=0', 'area = min(h[l],h[r]) × (r-l)', 'maxWater = max(maxWater, area)', 'h[l] < h[r]? l++ : r-- (chhoti height move karo)', 'Return maxWater'],
    optimalCode: 'let l=0,r=h.length-1,max=0;\nwhile(l<r){\n  max=Math.max(max, Math.min(h[l],h[r])*(r-l));\n  h[l]<h[r] ? l++ : r--; // chhota move karo\n}\nreturn max;',
    timeComplexity: 'O(n)', spaceComplexity: 'O(1)',
    dataStructure: 'Two pointers only',
    lcUrl: 'https://leetcode.com/problems/container-with-most-water/', tags: ['Array', 'Two Pointers', 'Greedy'], companies: ['Amazon', 'Facebook', 'Google'],
  },
  {
    id: 12, lcNum: 15, title: '3Sum',
    difficulty: 'Medium', patternId: 'two-pointers', patternName: 'Two Pointers',
    typeId: 'opposite-ends', typeName: 'Opposite Ends — Fix One + Two Pointers',
    howToRead: '"Triplet that sums to zero" = 3 numbers. Fix ek number, baaki 2 ke liye Two Pointers. Sort pehle karo.',
    constraint: 'n ≤ 3×10³', constraintKyu: 'O(n²) chalega. Sort O(n log n) + Two Pointers O(n²) = O(n²) total.',
    inputType: 'Integer array (unsorted)', inputKyu: 'Sort karo pehle. Phir har i ke liye Two Pointers [i+1, n-1]. Duplicates skip karo carefully.',
    questionKeywords: ['three numbers', 'sum to zero', 'triplets', 'does not contain duplicate triplets'],
    keywordKyu: '"triplets" = three elements = Fix+Two Pointers. "no duplicate triplets" = duplicate skip logic add karo.',
    outputType: 'List of triplets', outputKyu: 'All valid triplets collect karo — duplicates avoid karo.',
    whyThisPattern: 'n=3 numbers: Fix ek, Two Pointers baaki ke liye. Sort enables Two Pointers.',
    whyThisType: 'Fix One + Two Pointers = classic 3Sum approach.',
    bruteForce: 'Har 3 elements ka combination check karo.',
    bruteForceWhy: 'O(n³). n=3000 → 27×10⁹ = TLE.',
    bruteForceCode: 'const res=[];\nfor(let i=0;i<n;i++) for(let j=i+1;j<n;j++) for(let k=j+1;k<n;k++)\n  if(nums[i]+nums[j]+nums[k]===0) res.push([nums[i],nums[j],nums[k]]);\nreturn [...new Set(res.map(t=>t.sort()))]; // dedup bhi complex hai',
    approach: ['Sort nums', 'Har i: agar nums[i]>0 break (sorted, sum kabhi 0 nahi hoga)', 'Duplicate i skip karo', 'l=i+1, r=n-1: Two Pointers', 'sum<0→l++, sum>0→r--, sum===0→add, l/r duplicates skip'],
    optimalCode: 'nums.sort((a,b)=>a-b);\nconst res=[];\nfor(let i=0;i<n-2;i++){\n  if(nums[i]>0) break;\n  if(i>0 && nums[i]===nums[i-1]) continue;\n  let l=i+1,r=n-1;\n  while(l<r){\n    const s=nums[i]+nums[l]+nums[r];\n    if(s===0){res.push([nums[i],nums[l],nums[r]]);while(l<r&&nums[l]===nums[l+1])l++;while(l<r&&nums[r]===nums[r-1])r--;l++;r--;}\n    else s<0?l++:r--;\n  }\n}\nreturn res;',
    timeComplexity: 'O(n²)', spaceComplexity: 'O(1)',
    dataStructure: 'Sorted array + index variables',
    lcUrl: 'https://leetcode.com/problems/3sum/', tags: ['Array', 'Two Pointers', 'Sorting'], companies: ['Facebook', 'Amazon', 'Microsoft'],
  },
];

// ═══════════════════════════════════════════════════════════════════
// PATTERN 3: BINARY SEARCH
// ═══════════════════════════════════════════════════════════════════

const binarySearchQuestions: CoreQuestion[] = [
  {
    id: 13, lcNum: 704, title: 'Binary Search',
    difficulty: 'Easy', patternId: 'binary-search', patternName: 'Binary Search',
    typeId: 'classic-bs', typeName: 'Classic Search in Sorted Array',
    howToRead: '"Sorted array" + "find target" + O(log n) = Classic Binary Search. Direct template.',
    constraint: 'n ≤ 10⁴, sorted', constraintKyu: 'Sorted = Binary Search possible. O(log n) ≈ 14 steps for n=10⁴.',
    inputType: 'Sorted integer array + target', inputKyu: 'Sorted + search = Binary Search. Left/right narrow karo.',
    questionKeywords: ['sorted array', 'search', 'target', 'return index', 'O(log n)'],
    keywordKyu: '"sorted" + "O(log n)" = Binary Search direct. Classic template: lo=0, hi=n-1, mid check.',
    outputType: 'Index (-1 if not found)', outputKyu: '-1 return for not found = loop ends bina match ke.',
    whyThisPattern: 'Sorted array → Binary Search. Every step search space half hota hai.',
    whyThisType: 'Classic exact search. (vs Answer Space BS jo unsorted pe hota hai)',
    bruteForce: 'Linear scan ek ek check karo.',
    bruteForceWhy: 'O(n). n=10⁴ = 10K ops. BS = 14 ops. 700× faster!',
    bruteForceCode: 'for(let i=0;i<n;i++) if(nums[i]===target) return i;\nreturn -1;',
    approach: ['lo=0, hi=n-1', 'mid = Math.floor((lo+hi)/2)', 'nums[mid]===target? return mid', 'nums[mid]<target? lo=mid+1 (right half)', 'nums[mid]>target? hi=mid-1 (left half)', 'Loop end → return -1'],
    optimalCode: 'let lo=0,hi=nums.length-1;\nwhile(lo<=hi){\n  const mid=(lo+hi)>>1;\n  if(nums[mid]===t) return mid;\n  nums[mid]<t ? lo=mid+1 : hi=mid-1;\n}\nreturn -1;',
    timeComplexity: 'O(log n)', spaceComplexity: 'O(1)',
    dataStructure: 'lo, hi, mid integer variables',
    lcUrl: 'https://leetcode.com/problems/binary-search/', tags: ['Array', 'Binary Search'], companies: ['Microsoft', 'Apple'],
  },
  {
    id: 14, lcNum: 875, title: 'Koko Eating Bananas',
    difficulty: 'Medium', patternId: 'binary-search', patternName: 'Binary Search',
    typeId: 'bs-answer-space', typeName: 'Binary Search on Answer Space',
    howToRead: '"Minimum eating speed" = answer space pe Binary Search karo (speed range: 1 to max(piles)). canFinish(speed) function O(n) mein check karo.',
    constraint: 'piles ≤ 10⁴, h ≤ 10⁹', constraintKyu: 'Answer range = [1, max(piles)]. BS on answer = O(max × log(max)) ≈ O(n log n).',
    inputType: 'Integer array (piles) + h', inputKyu: 'Minimize/maximize a value = BS on Answer Space. canDo(k) monotonic function = BS applicable.',
    questionKeywords: ['minimum speed', 'finish within h hours', 'eating speed k'],
    keywordKyu: '"minimum speed such that..." = BS on answer space. canFinish(k): sorted answers mein faster k = easier to finish. Monotonic!',
    outputType: 'Integer (minimum speed)', outputKyu: 'Minimum valid answer = left boundary binary search.',
    whyThisPattern: 'Answer range pe BS. canFinish monotonic (agar k chalega, k+1 bhi chalega).',
    whyThisType: 'BS on Answer Space — array sorted nahi but answer range monotonic.',
    bruteForce: '1 se max(piles) tak har speed try karo.',
    bruteForceWhy: 'O(max × n). max=10⁹ = TLE.',
    bruteForceCode: 'for(let k=1;k<=Math.max(...piles);k++){\n  let hours=0;\n  for(const p of piles) hours+=Math.ceil(p/k);\n  if(hours<=h) return k; // ye O(max×n) = TLE\n}',
    approach: ['lo=1, hi=max(piles)', 'canFinish(k): sum of ceil(p/k) ≤ h?', 'BS: canFinish(mid)? hi=mid (smaller might work) : lo=mid+1', 'Return lo'],
    optimalCode: 'const canFinish=(k)=>piles.reduce((s,p)=>s+Math.ceil(p/k),0)<=h;\nlet lo=1,hi=Math.max(...piles);\nwhile(lo<hi){\n  const mid=(lo+hi)>>1;\n  canFinish(mid) ? hi=mid : lo=mid+1;\n}\nreturn lo;',
    timeComplexity: 'O(n log m)', spaceComplexity: 'O(1)',
    dataStructure: 'lo, hi on answer space',
    lcUrl: 'https://leetcode.com/problems/koko-eating-bananas/', tags: ['Array', 'Binary Search'], companies: ['Facebook', 'Amazon', 'Google'],
  },
  {
    id: 15, lcNum: 33, title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium', patternId: 'binary-search', patternName: 'Binary Search',
    typeId: 'rotated-bs', typeName: 'Binary Search in Rotated Array',
    howToRead: '"Rotated sorted array" = ek half hamesha sorted. Determine karo konsa half sorted hai, phir target us mein hai ya nahi.',
    constraint: 'n ≤ 5000, O(log n) required', constraintKyu: 'O(log n) explicitly required = Binary Search. Rotated = ek twist — sorted half identify karo.',
    inputType: 'Rotated sorted integer array + target', inputKyu: 'Rotated sorted = modified BS. Ek half sorted hoga hamesha — check karo konsa, phir decide karo.',
    questionKeywords: ['rotated', 'sorted array', 'O(log n)', 'search target'],
    keywordKyu: '"rotated sorted" + "O(log n)" = special BS. Key insight: ek half always sorted.',
    outputType: 'Index (-1 if not found)', outputKyu: '-1 if not found — same as classic BS.',
    whyThisPattern: 'Modified Binary Search on rotated array. Ek half sorted = use that to narrow.',
    whyThisType: 'Rotated Array BS — ek additional condition check karo each step.',
    bruteForce: 'Linear scan.',
    bruteForceWhy: 'O(n). O(log n) required explicitly.',
    bruteForceCode: 'return nums.indexOf(target);',
    approach: ['lo=0, hi=n-1', 'mid = (lo+hi)>>1', 'nums[mid]===target? return mid', 'Left half sorted? (nums[lo]<=nums[mid])', '  target in [lo..mid]? hi=mid-1 else lo=mid+1', 'Right half sorted: target in [mid..hi]? lo=mid+1 else hi=mid-1'],
    optimalCode: 'let lo=0,hi=nums.length-1;\nwhile(lo<=hi){\n  const m=(lo+hi)>>1;\n  if(nums[m]===t) return m;\n  if(nums[lo]<=nums[m]){ // left half sorted\n    t>=nums[lo]&&t<nums[m] ? hi=m-1 : lo=m+1;\n  } else { // right half sorted\n    t>nums[m]&&t<=nums[hi] ? lo=m+1 : hi=m-1;\n  }\n}\nreturn -1;',
    timeComplexity: 'O(log n)', spaceComplexity: 'O(1)',
    dataStructure: 'lo, hi pointers',
    lcUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', tags: ['Array', 'Binary Search'], companies: ['Facebook', 'Amazon', 'Microsoft'],
  },
];

// ─── Export all together ─────────────────────────────────────────
export const CORE_QUESTIONS: CoreQuestion[] = [
  ...slidingWindowQuestions,
  ...twoPointerQuestions,
  ...binarySearchQuestions,
];

export const CORE_BY_PATTERN: Record<string, CoreQuestion[]> = {};
export const CORE_BY_TYPE: Record<string, CoreQuestion[]> = {};

for (const q of CORE_QUESTIONS) {
  if (!CORE_BY_PATTERN[q.patternId]) CORE_BY_PATTERN[q.patternId] = [];
  CORE_BY_PATTERN[q.patternId].push(q);
  if (!CORE_BY_TYPE[q.typeId]) CORE_BY_TYPE[q.typeId] = [];
  CORE_BY_TYPE[q.typeId].push(q);
}

export const PATTERN_QUESTION_COUNT: Record<string, number> = Object.fromEntries(
  Object.entries(CORE_BY_PATTERN).map(([k, v]) => [k, v.length])
);
