// ═══════════════════════════════════════════════════════════════════
// CORE QUESTIONS — Curated: 3 per pattern type, FREE LeetCode only
// 8-Point Methodology per question
// ═══════════════════════════════════════════════════════════════════

export interface CoreQuestion {
  id: number;
  lcNum: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  patternId: string;
  patternName: string;
  typeId: string;
  typeName: string;
  // ── 8 Methodology Points ────────────────────────────────────────
  howToRead: string;
  constraintAnalysis: string;
  constraintKyu: string;
  inputSignal: string;
  inputKyu: string;
  keywords: string[];
  keywordKyu: string;
  outputSignal: string;
  // ── Solution ────────────────────────────────────────────────────
  whyThisPattern: string;
  whyThisType: string;
  bruteForce: string;
  bruteForceComplexity: string;
  bruteForceKyu: string;
  optimalSteps: string[];
  optimalCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  dataStructure: string;
  lcUrl: string;
}

export const CORE_QUESTIONS: CoreQuestion[] = [

  // ═══════════════════════════════════
  // SLIDING WINDOW — Fixed Window (3)
  // ═══════════════════════════════════
  {
    id:1, lcNum:643, title:'Maximum Average Subarray I', difficulty:'Easy',
    patternId:'sliding-window', patternName:'Sliding Window', typeId:'sw-fixed', typeName:'Fixed-Size Window',
    howToRead:'"Subarray of length k" aur "maximum average" dikha. Window size k = FIXED. Ek hi pass mein ho jaata hai.',
    constraintAnalysis:'n ≤ 10⁵, k ≤ n',
    constraintKyu:'n=10⁵ → O(n) chahiye. Har window ka sum alag nikalo = O(n×k) = 10¹⁰ ops = TLE. Slide karo = O(1) per step = O(n) total.',
    inputSignal:'Integer array + fixed size k',
    inputKyu:'Fixed k + contiguous + maximize = Fixed Window. Variable window tabhi jab k nahi diya ya condition pe shrink karna ho.',
    keywords:['subarray', 'length k', 'maximum average', 'contiguous'],
    keywordKyu:'"subarray of length k" → window fixed. "maximum" → max track karo slide karte waqt. Ye 2 words = Fixed Window immediately.',
    outputSignal:'Single decimal. Single value = aggregate (sum) track karo, max update karo.',
    whyThisPattern:'Fixed k + maximize aggregate = Sliding Window Fixed type.',
    whyThisType:'k diya hai isliye Fixed. Variable tabhi jab condition pe shrink karo.',
    bruteForce:'Har starting index i pe sum(arr[i..i+k-1]) alag se nikalo.',
    bruteForceComplexity:'O(n×k)',
    bruteForceKyu:'Har window O(k) kaam. Total O(n×k). k=10⁴, n=10⁵ = 10⁹ = TLE.',
    optimalSteps:['Pehle k elements ka sum nikalo','i=k se: sum += nums[i] - nums[i-k] (right add, left remove)','maxSum update karo har step mein','Return maxSum/k'],
    optimalCode:`let sum=nums.slice(0,k).reduce((a,b)=>a+b,0),max=sum;
for(let i=k;i<n;i++){
  sum+=nums[i]-nums[i-k]; // O(1) update!
  max=Math.max(max,sum);
}
return max/k;`,
    timeComplexity:'O(n)', spaceComplexity:'O(1)', dataStructure:'Running sum variable',
    lcUrl:'https://leetcode.com/problems/maximum-average-subarray-i/'
  },
  {
    id:2, lcNum:567, title:'Permutation in String', difficulty:'Medium',
    patternId:'sliding-window', patternName:'Sliding Window', typeId:'sw-fixed', typeName:'Fixed-Size Window',
    howToRead:'"Permutation of s1 is substring of s2" = s1 ki length ka window s2 mein dhundho jahan character frequency same ho. Window size = s1.length = FIXED.',
    constraintAnalysis:'n ≤ 10⁴ (s1), m ≤ 10⁴ (s2)',
    constraintKyu:'O(n). Frequency array of 26 = O(1) compare per step.',
    inputSignal:'Two strings s1, s2',
    inputKyu:'s1.length = window size (fixed!). Anagram check = frequency compare = Fixed Window.',
    keywords:["permutation", "one of s1's permutations", "substring of s2"],
    keywordKyu:'"permutation" = anagram = same character frequency. Dekhte hi: fixed window (s1.length) + frequency compare.',
    outputSignal:'Boolean. Ek bhi valid window = true.',
    whyThisPattern:'Fixed window s2 mein slide karo, frequency compare karo.',
    whyThisType:'Window size fixed = s1.length.',
    bruteForce:'Har window sort karo, s1 sort se compare karo.',
    bruteForceComplexity:'O(n × k log k)',
    bruteForceKyu:'Sorting har window pe = wasteful.',
    optimalSteps:['s1 ki frequency array banao (f1)','s2 pe initial window frequency banao (f2)','f1===f2? return true','Slide: right add, left remove from f2','Compare karo har step'],
    optimalCode:`const a="a".charCodeAt(0);
const f1=new Array(26).fill(0),f2=new Array(26).fill(0);
for(const c of s1) f1[c.charCodeAt(0)-a]++;
for(let i=0;i<s1.length;i++) f2[s2[i].charCodeAt(0)-a]++;
if(f1.toString()===f2.toString()) return true;
for(let i=s1.length;i<s2.length;i++){
  f2[s2[i].charCodeAt(0)-a]++;
  f2[s2[i-s1.length].charCodeAt(0)-a]--;
  if(f1.toString()===f2.toString()) return true;
}
return false;`,
    timeComplexity:'O(n)', spaceComplexity:'O(26)=O(1)', dataStructure:'Two frequency arrays[26]',
    lcUrl:'https://leetcode.com/problems/permutation-in-string/'
  },
  {
    id:3, lcNum:1343, title:'Number of Sub-arrays of Size K and Average ≥ Threshold', difficulty:'Medium',
    patternId:'sliding-window', patternName:'Sliding Window', typeId:'sw-fixed', typeName:'Fixed-Size Window',
    howToRead:'"Number of sub-arrays" = count. "Size K" = fixed window. "Average ≥ threshold" = condition check karo har window pe. Count valid ones.',
    constraintAnalysis:'n ≤ 10⁵, 1 ≤ k ≤ n',
    constraintKyu:'O(n). Fixed window slide = O(1) per step.',
    inputSignal:'Integer array + k + threshold',
    inputKyu:'Fixed k + count valid windows = Fixed Window. Condition simple (avg ≥ t) = check after sliding.',
    keywords:['number of sub-arrays', 'size k', 'average greater than or equal', 'threshold'],
    keywordKyu:'"number of sub-arrays" = count. "size k" = fixed window. Direct Fixed Window.',
    outputSignal:'Integer count. window valid hai to count++.',
    whyThisPattern:'Fixed k window, condition check, count = Fixed Window.',
    whyThisType:'k fixed, threshold check = Fixed Window standard.',
    bruteForce:'Har i pe length-k sum nikalo, avg check karo.',
    bruteForceComplexity:'O(n×k)',
    bruteForceKyu:'O(n×k). n=10⁵, k=10⁴ = 10⁹ = TLE.',
    optimalSteps:['Initial k window ka sum','Slide: sum += arr[i] - arr[i-k]','sum/k >= threshold? count++','Return count'],
    optimalCode:`let sum=arr.slice(0,k).reduce((a,b)=>a+b,0),count=sum/k>=t?1:0;
for(let i=k;i<n;i++){
  sum+=arr[i]-arr[i-k];
  if(sum/k>=t) count++;
}
return count;`,
    timeComplexity:'O(n)', spaceComplexity:'O(1)', dataStructure:'Running sum + count',
    lcUrl:'https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/'
  },

  // ═══════════════════════════════════
  // SLIDING WINDOW — Variable Window (3)
  // ═══════════════════════════════════
  {
    id:4, lcNum:3, title:'Longest Substring Without Repeating Characters', difficulty:'Medium',
    patternId:'sliding-window', patternName:'Sliding Window', typeId:'sw-variable', typeName:'Variable-Size Window',
    howToRead:'"Longest" = maximize window. "Without repeating" = condition on window. Condition violate ho (duplicate) → left shrink karo.',
    constraintAnalysis:'s.length ≤ 5×10⁴',
    constraintKyu:'O(n). Har char max 2 baar visit hoga (add + remove) = O(n) total.',
    inputSignal:'String',
    inputKyu:'String + unique condition + maximize = Variable Window. Duplicate mila → left badhao.',
    keywords:['longest', 'substring', 'without repeating characters'],
    keywordKyu:'"longest" + "condition on window" = Variable Window Maximize. "without repeating" = HashMap se duplicate check.',
    outputSignal:'Integer (max length). right-left+1 maximize karo.',
    whyThisPattern:'Maximize window under condition = Variable Window.',
    whyThisType:'Variable (not fixed) kyunki condition pe shrink karna hai.',
    bruteForce:'Har (i,j) pair uniqueness check karo.',
    bruteForceComplexity:'O(n²)',
    bruteForceKyu:'O(n²). n=5×10⁴ = 25×10⁸ = TLE.',
    optimalSteps:['map={char→last_index}, left=0','right expand: char in window? left=max(left, map[char]+1)','map[char]=right update','maxLen = max(maxLen, right-left+1)'],
    optimalCode:`const map={};let l=0,max=0;
for(let r=0;r<s.length;r++){
  if(map[s[r]]>=l) l=map[s[r]]+1;
  map[s[r]]=r;
  max=Math.max(max,r-l+1);
}
return max;`,
    timeComplexity:'O(n)', spaceComplexity:'O(min(n,26))', dataStructure:'HashMap {char→last index}',
    lcUrl:'https://leetcode.com/problems/longest-substring-without-repeating-characters/'
  },
  {
    id:5, lcNum:76, title:'Minimum Window Substring', difficulty:'Hard',
    patternId:'sliding-window', patternName:'Sliding Window', typeId:'sw-variable', typeName:'Variable-Size Window',
    howToRead:'"Minimum window" = minimize. "Contains all characters of t" = condition. Expand jab invalid, shrink jab valid. Minimum save karo.',
    constraintAnalysis:'n ≤ 10⁵',
    constraintKyu:'O(n). Left aur right dono max n tak jaayenge = O(n) total.',
    inputSignal:'Two strings s, t',
    inputKyu:'t ke sab chars chahiye window mein. have/need counter = Variable Window Minimize.',
    keywords:['minimum window', 'substring', 'contains all characters of t'],
    keywordKyu:'"minimum window" + "contains all" → expand until valid, then shrink. have/need pattern use karo.',
    outputSignal:'String (minimum valid window). start+end indices track karo.',
    whyThisPattern:'Variable window: expand until valid, shrink to minimize.',
    whyThisType:'Variable window minimize.',
    bruteForce:'Har (i,j) substring check karo.',
    bruteForceComplexity:'O(n²×|t|)',
    bruteForceKyu:'Exponential. TLE.',
    optimalSteps:['need=freq(t), have=0, req=unique chars in t','right: win[c]++; freq match? have++','have===req? shrink: min update, win[c]--, drop? have--; l++','Return min window'],
    optimalCode:`const need={},win={};
for(const c of t) need[c]=(need[c]??0)+1;
let have=0,req=Object.keys(need).length,l=0,res=[-1,0,0];
for(let r=0;r<s.length;r++){
  win[s[r]]=(win[s[r]]??0)+1;
  if(need[s[r]]&&win[s[r]]===need[s[r]]) have++;
  while(have===req){
    if(res[0]===-1||r-l+1<res[0]) res=[r-l+1,l,r];
    win[s[l]]--; if(need[s[l]]&&win[s[l]]<need[s[l]]) have--;
    l++;
  }
}
return res[0]===-1?'':s.slice(res[1],res[2]+1);`,
    timeComplexity:'O(n)', spaceComplexity:'O(|t|)', dataStructure:'Two HashMaps (need + window)',
    lcUrl:'https://leetcode.com/problems/minimum-window-substring/'
  },
  {
    id:6, lcNum:1004, title:'Max Consecutive Ones III', difficulty:'Medium',
    patternId:'sliding-window', patternName:'Sliding Window', typeId:'sw-variable', typeName:'Variable-Size Window',
    howToRead:'"At most k zeros flip" = window mein ≤ k zeros allowed. "Maximum consecutive ones" = maximize window length. zeros>k → left shrink.',
    constraintAnalysis:'n ≤ 10⁵',
    constraintKyu:'O(n). Har element max 2x visit = O(n).',
    inputSignal:'Binary array + k',
    inputKyu:'Binary array + at-most-k condition + maximize = Variable Window.',
    keywords:['flip at most k zeros', 'maximum consecutive ones', 'binary array'],
    keywordKyu:'"at most k" → window constraint. "consecutive" → subarray. "maximum" → maximize. Teen words = Variable Window At-Most-K.',
    outputSignal:'Integer (max length). r-l+1 maximize.',
    whyThisPattern:'Condition: zeros ≤ k. Maximize window length.',
    whyThisType:'At-most-k = Variable Window standard.',
    bruteForce:'Har subarray: zeros ≤ k? length track.',
    bruteForceComplexity:'O(n²)',
    bruteForceKyu:'TLE.',
    optimalSteps:['zeros=0, left=0','right: nums[r]===0? zeros++','zeros>k? shrink: nums[l]===0? zeros--; l++','max=max(max, r-l+1)'],
    optimalCode:`let l=0,zeros=0,max=0;
for(let r=0;r<nums.length;r++){
  if(nums[r]===0) zeros++;
  while(zeros>k){ if(nums[l++]===0) zeros--; }
  max=Math.max(max,r-l+1);
}
return max;`,
    timeComplexity:'O(n)', spaceComplexity:'O(1)', dataStructure:'Zero counter + two pointers',
    lcUrl:'https://leetcode.com/problems/max-consecutive-ones-iii/'
  },

  // ═══════════════════════════════════
  // SLIDING WINDOW — Exactly K (3)
  // ═══════════════════════════════════
  {
    id:7, lcNum:930, title:'Binary Subarrays With Sum', difficulty:'Medium',
    patternId:'sliding-window', patternName:'Sliding Window', typeId:'sw-exact', typeName:'Exactly K (atMost Trick)',
    howToRead:'"Sum equals goal" exact condition. Trick: exactly(k) = atMost(k) - atMost(k-1). Direct exact sliding mushkil hai.',
    constraintAnalysis:'n ≤ 3×10⁴',
    constraintKyu:'O(n). atMost O(n) × 2 calls = O(n).',
    inputSignal:'Binary array + goal',
    inputKyu:'Exact sum condition = atMost trick.',
    keywords:['number of subarrays', 'sum equals', 'goal'],
    keywordKyu:'"sum equals" (exact) → atMost trick. exactly(k) = atMost(k) - atMost(k-1).',
    outputSignal:'Integer count.',
    whyThisPattern:'Exactly K = atMost(K) - atMost(K-1).',
    whyThisType:'Exactly K window.',
    bruteForce:'Har (i,j) sum===goal? count++.',
    bruteForceComplexity:'O(n²)',
    bruteForceKyu:'9×10⁸ = TLE.',
    optimalSteps:['atMost(k): sum≤k, cnt+=r-l+1','Return atMost(goal)-atMost(goal-1)'],
    optimalCode:`function atMost(k){
  let l=0,sum=0,cnt=0;
  for(let r=0;r<nums.length;r++){
    sum+=nums[r];
    while(sum>k) sum-=nums[l++];
    cnt+=r-l+1;
  }
  return cnt;
}
return atMost(goal)-atMost(goal-1);`,
    timeComplexity:'O(n)', spaceComplexity:'O(1)', dataStructure:'Two pointers + running sum',
    lcUrl:'https://leetcode.com/problems/binary-subarrays-with-sum/'
  },
  {
    id:8, lcNum:992, title:'Subarrays with K Different Integers', difficulty:'Hard',
    patternId:'sliding-window', patternName:'Sliding Window', typeId:'sw-exact', typeName:'Exactly K (atMost Trick)',
    howToRead:'"Exactly k different integers". Same atMost trick: exactly(k)=atMost(k)-atMost(k-1). HashMap se distinct track.',
    constraintAnalysis:'n ≤ 2×10⁴',
    constraintKyu:'O(n). atMost O(n) × 2 = O(n).',
    inputSignal:'Integer array + k',
    inputKyu:'Exactly K distinct = atMost trick.',
    keywords:['exactly k different', 'good subarrays', 'k different integers'],
    keywordKyu:'"exactly k different" → atMost trick. Har "exactly" wala window problem.',
    outputSignal:'Integer count.',
    whyThisPattern:'Exactly K distinct = atMost(K)-atMost(K-1).',
    whyThisType:'Exactly K with HashMap.',
    bruteForce:'Har subarray distinct count check.',
    bruteForceComplexity:'O(n²)',
    bruteForceKyu:'TLE.',
    optimalSteps:['atMost(k): distinct≤k, cnt+=r-l+1','Return atMost(k)-atMost(k-1)'],
    optimalCode:`function atMost(k){
  const map={}; let l=0,cnt=0,dist=0;
  for(let r=0;r<nums.length;r++){
    if(!map[nums[r]]) dist++;
    map[nums[r]]=(map[nums[r]]??0)+1;
    while(dist>k){ map[nums[l]]--; if(!map[nums[l]]) dist--; l++; }
    cnt+=r-l+1;
  }
  return cnt;
}
return atMost(k)-atMost(k-1);`,
    timeComplexity:'O(n)', spaceComplexity:'O(k)', dataStructure:'HashMap {value→count}',
    lcUrl:'https://leetcode.com/problems/subarrays-with-k-different-integers/'
  },
  {
    id:9, lcNum:209, title:'Minimum Size Subarray Sum', difficulty:'Medium',
    patternId:'sliding-window', patternName:'Sliding Window', typeId:'sw-exact', typeName:'Variable Window — Minimize',
    howToRead:'"Minimal length" = minimize. "Sum ≥ target" = condition. Expand right, jab sum≥target shrink left.',
    constraintAnalysis:'n ≤ 10⁵, positive integers',
    constraintKyu:'Positive numbers important — negative hote to sum shrink nahi hota. Positive = window valid condition monotonic = Two Pointers chalega.',
    inputSignal:'Positive integer array + target',
    inputKyu:'Positive + sum condition + minimize = Variable Window Minimize.',
    keywords:['minimal length', 'sum greater than or equal to target', 'subarray', 'positive integers'],
    keywordKyu:'"minimal length" + "sum ≥" → minimize window. "positive integers" → variable window applicable.',
    outputSignal:'Integer (min length, 0 if none).',
    whyThisPattern:'Variable window minimize: expand until valid, shrink.',
    whyThisType:'Minimize window.',
    bruteForce:'Har subarray sum≥target? min length.',
    bruteForceComplexity:'O(n²)',
    bruteForceKyu:'TLE.',
    optimalSteps:['sum=0, l=0, min=Inf','right: sum+=nums[r]','sum>=target? min=min(min,r-l+1); sum-=nums[l]; l++','Return min'],
    optimalCode:`let sum=0,l=0,min=Infinity;
for(let r=0;r<n;r++){
  sum+=nums[r];
  while(sum>=target){ min=Math.min(min,r-l+1); sum-=nums[l++]; }
}
return min===Infinity?0:min;`,
    timeComplexity:'O(n)', spaceComplexity:'O(1)', dataStructure:'Running sum + two pointers',
    lcUrl:'https://leetcode.com/problems/minimum-size-subarray-sum/'
  },

  // ═══════════════════════════════════
  // TWO POINTERS — Opposite Ends (3)
  // ═══════════════════════════════════
  {
    id:10, lcNum:167, title:'Two Sum II - Input Array Is Sorted', difficulty:'Medium',
    patternId:'two-pointers', patternName:'Two Pointers', typeId:'tp-opposite', typeName:'Opposite Ends (Converging)',
    howToRead:'"Sorted array" + "two numbers add up to target" + "O(1) space" = Two Pointers Opposite Ends.',
    constraintAnalysis:'n ≤ 3×10⁴, sorted, O(1) extra space',
    constraintKyu:'"O(1) extra space" directly likha. HashMap O(n) space = nahi chalega. Two Pointers = O(n) time + O(1) space.',
    inputSignal:'SORTED integer array + target',
    inputKyu:'SORTED + pair find = Two Pointers signal #1. Left badhao sum chhota, right ghatao sum bada.',
    keywords:['sorted', 'two numbers', 'add up to', 'O(1) extra space'],
    keywordKyu:'"sorted" → Two Pointers immediately. "O(1) space" → HashMap nahi, Two Pointers.',
    outputSignal:'Two 1-indexed integers.',
    whyThisPattern:'Sorted + O(1) space + pair = Two Pointers Opposite Ends.',
    whyThisType:'sum chhota → left++; sum bada → right--.',
    bruteForce:'Har pair (i,j) check.',
    bruteForceComplexity:'O(n²)',
    bruteForceKyu:'O(n²). n=3×10⁴ → TLE.',
    optimalSteps:['l=0, r=n-1','sum=nums[l]+nums[r]','sum<target → l++','sum>target → r--','sum===target → return [l+1,r+1]'],
    optimalCode:`let l=0,r=nums.length-1;
while(l<r){
  const s=nums[l]+nums[r];
  if(s===target) return [l+1,r+1];
  s<target ? l++ : r--;
}
return [];`,
    timeComplexity:'O(n)', spaceComplexity:'O(1)', dataStructure:'Two index variables',
    lcUrl:'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/'
  },
  {
    id:11, lcNum:11, title:'Container With Most Water', difficulty:'Medium',
    patternId:'two-pointers', patternName:'Two Pointers', typeId:'tp-opposite', typeName:'Opposite Ends (Converging)',
    howToRead:'Area = min(h[l],h[r])×(r-l). Maximize karo. Chhoti height pointer move karo — greedy insight.',
    constraintAnalysis:'n ≤ 10⁵',
    constraintKyu:'O(n). Two Pointers = ek pass. O(n²) brute = TLE.',
    inputSignal:'Integer array (heights)',
    inputKyu:'Maximize between two boundaries = Two Pointers + greedy move.',
    keywords:['container', 'most water', 'vertical lines', 'maximum amount'],
    keywordKyu:'"most water" = area between two boundaries = Two Pointers. Chhoti height move karo.',
    outputSignal:'Integer (max area). Max track karo converging.',
    whyThisPattern:'Two boundaries, maximize = Two Pointers + greedy.',
    whyThisType:'Opposite ends, chhoti side move.',
    bruteForce:'Har pair (i,j) area.',
    bruteForceComplexity:'O(n²)',
    bruteForceKyu:'n=10⁵ → TLE.',
    optimalSteps:['l=0, r=n-1, max=0','area=min(h[l],h[r])×(r-l), max update','h[l]<h[r] → l++ else r--'],
    optimalCode:`let l=0,r=h.length-1,max=0;
while(l<r){
  max=Math.max(max,Math.min(h[l],h[r])*(r-l));
  h[l]<h[r] ? l++ : r--;
}
return max;`,
    timeComplexity:'O(n)', spaceComplexity:'O(1)', dataStructure:'Two pointers only',
    lcUrl:'https://leetcode.com/problems/container-with-most-water/'
  },
  {
    id:12, lcNum:15, title:'3Sum', difficulty:'Medium',
    patternId:'two-pointers', patternName:'Two Pointers', typeId:'tp-opposite', typeName:'Fix One + Two Pointers',
    howToRead:'"Triplet sum = 0" = Fix ek (outer loop), baaki 2 ke liye Two Pointers. Sort pehle.',
    constraintAnalysis:'n ≤ 3×10³',
    constraintKyu:'O(n²) chalega. Sort O(n log n) + nested Two Pointers O(n²) = O(n²).',
    inputSignal:'Integer array (unsorted)',
    inputKyu:'Sort karo. Har i ke liye Two Pointers [i+1, n-1]. Duplicates skip.',
    keywords:['three numbers', 'sum to zero', 'all unique triplets', 'no duplicate triplets'],
    keywordKyu:'"triplets" = 3 elements = Fix+Two Pointers. "no duplicate" = dup skip logic.',
    outputSignal:'List of unique triplets.',
    whyThisPattern:'Fix one + Two Pointers for remaining = 3Sum classic.',
    whyThisType:'Fix One + Opposite Ends.',
    bruteForce:'Har 3 elements combo.',
    bruteForceComplexity:'O(n³)',
    bruteForceKyu:'n=3000 → TLE.',
    optimalSteps:['Sort nums','Har i: nums[i]>0 break; dup skip','l=i+1,r=n-1','sum===0 push+skip dups, sum<0 l++, sum>0 r--'],
    optimalCode:`nums.sort((a,b)=>a-b);const res=[];
for(let i=0;i<n-2;i++){
  if(nums[i]>0) break;
  if(i>0&&nums[i]===nums[i-1]) continue;
  let l=i+1,r=n-1;
  while(l<r){
    const s=nums[i]+nums[l]+nums[r];
    if(s===0){
      res.push([nums[i],nums[l],nums[r]]);
      while(l<r&&nums[l]===nums[l+1])l++;
      while(l<r&&nums[r]===nums[r-1])r--;
      l++;r--;
    } else s<0?l++:r--;
  }
}
return res;`,
    timeComplexity:'O(n²)', spaceComplexity:'O(1)', dataStructure:'Sorted array + indices',
    lcUrl:'https://leetcode.com/problems/3sum/'
  },

  // ═══════════════════════════════════
  // TWO POINTERS — Same Direction (3)
  // ═══════════════════════════════════
  {
    id:13, lcNum:283, title:'Move Zeroes', difficulty:'Easy',
    patternId:'two-pointers', patternName:'Two Pointers', typeId:'tp-samedirection', typeName:'Same Direction (Slow-Fast Read/Write)',
    howToRead:'"Move all zeroes to end" + "in-place" = Slow writer + Fast reader. Slow writes non-zero, Fast scans all.',
    constraintAnalysis:'n ≤ 10⁴, in-place required',
    constraintKyu:'In-place = O(1) space. Slow-fast = O(n) one pass.',
    inputSignal:'Integer array, in-place',
    inputKyu:'In-place partition = same direction Two Pointers. Slow = write position.',
    keywords:['move all zeroes', 'to the end', 'in-place', 'maintain relative order'],
    keywordKyu:'"in-place" + "move elements" → same direction Two Pointers. Slow writer technique.',
    outputSignal:'Void (in-place). Modify array directly.',
    whyThisPattern:'Read-write two pointers = classic in-place.',
    whyThisType:'Same direction: slow writes, fast reads.',
    bruteForce:'Non-zeros collect, zeros append.',
    bruteForceComplexity:'O(n) extra space',
    bruteForceKyu:'Extra array = O(n) space. In-place required.',
    optimalSteps:['slow=0 (write pointer)','fast scan: nums[fast]!==0 → nums[slow++]=nums[fast]','Fill remaining with 0'],
    optimalCode:`let slow=0;
for(let fast=0;fast<nums.length;fast++)
  if(nums[fast]!==0) nums[slow++]=nums[fast];
while(slow<nums.length) nums[slow++]=0;`,
    timeComplexity:'O(n)', spaceComplexity:'O(1)', dataStructure:'Two index variables',
    lcUrl:'https://leetcode.com/problems/move-zeroes/'
  },
  {
    id:14, lcNum:26, title:'Remove Duplicates from Sorted Array', difficulty:'Easy',
    patternId:'two-pointers', patternName:'Two Pointers', typeId:'tp-samedirection', typeName:'Same Direction (Slow-Fast Read/Write)',
    howToRead:'"Sorted" + "remove duplicates in-place" = Slow writer + Fast reader. Sorted = consecutive duplicates easy check.',
    constraintAnalysis:'n ≤ 3×10⁴, sorted, in-place',
    constraintKyu:'O(n) + O(1) space. Slow-fast = O(n) one pass.',
    inputSignal:'Sorted array, in-place',
    inputKyu:'Sorted + in-place + remove duplicates = Same Direction Two Pointers.',
    keywords:['sorted array', 'remove duplicates', 'in-place', 'relative order'],
    keywordKyu:'"sorted" + "in-place" + "remove duplicates" → slow/fast. Sorted = consecutive dups easy.',
    outputSignal:'Integer (new length k). slow pointer = k.',
    whyThisPattern:'Sorted in-place = slow-fast classic.',
    whyThisType:'Same direction read/write.',
    bruteForce:'Set mein unique track, array mein bharo.',
    bruteForceComplexity:'O(n) extra space',
    bruteForceKyu:'Extra space. In-place required.',
    optimalSteps:['slow=1','fast=1: nums[fast]!==nums[fast-1] → nums[slow++]=nums[fast]','Return slow'],
    optimalCode:`if(!nums.length) return 0;
let slow=1;
for(let fast=1;fast<nums.length;fast++)
  if(nums[fast]!==nums[fast-1]) nums[slow++]=nums[fast];
return slow;`,
    timeComplexity:'O(n)', spaceComplexity:'O(1)', dataStructure:'Two index variables',
    lcUrl:'https://leetcode.com/problems/remove-duplicates-from-sorted-array/'
  },
  {
    id:15, lcNum:977, title:'Squares of a Sorted Array', difficulty:'Easy',
    patternId:'two-pointers', patternName:'Two Pointers', typeId:'tp-samedirection', typeName:'Opposite Ends — Fill from Back',
    howToRead:'"Sorted array with negatives" + "squares sorted" = biggest squares at both ends. Fill result from back.',
    constraintAnalysis:'n ≤ 10⁴, sorted (neg to pos)',
    constraintKyu:'O(n). Two Pointers = O(n) vs Sort after squaring = O(n log n).',
    inputSignal:'Sorted array (neg to pos)',
    inputKyu:'Sorted with negatives → biggest squares at extremes. Fill result[] from largest.',
    keywords:['sorted array', 'squares', 'non-decreasing order', 'negative numbers'],
    keywordKyu:'"squares" + "sorted input with negatives" → biggest at both ends. Two Pointers fill from back.',
    outputSignal:'Sorted array of squares. Fill pos=n-1 to 0.',
    whyThisPattern:'Two extremes have largest values = Two Pointers.',
    whyThisType:'Fill from back variant.',
    bruteForce:'Square all, then sort.',
    bruteForceComplexity:'O(n log n)',
    bruteForceKyu:'Sorting > Two Pointers O(n).',
    optimalSteps:['l=0, r=n-1, pos=n-1','Math.abs(nums[l])>Math.abs(nums[r])? res[pos--]=l² l++','else res[pos--]=r² r--'],
    optimalCode:`const res=new Array(n);let l=0,r=n-1,pos=n-1;
while(l<=r){
  if(Math.abs(nums[l])>Math.abs(nums[r])) res[pos--]=nums[l]*nums[l++];
  else res[pos--]=nums[r]*nums[r--];
}
return res;`,
    timeComplexity:'O(n)', spaceComplexity:'O(n)', dataStructure:'Result array + two pointers',
    lcUrl:'https://leetcode.com/problems/squares-of-a-sorted-array/'
  },

  // ═══════════════════════════════════
  // BINARY SEARCH — Classic (3)
  // ═══════════════════════════════════
  {
    id:16, lcNum:704, title:'Binary Search', difficulty:'Easy',
    patternId:'binary-search', patternName:'Binary Search', typeId:'bs-classic', typeName:'Classic Search in Sorted Array',
    howToRead:'"Sorted array" + "find target" + "O(log n)" = Classic Binary Search. lo/hi/mid template.',
    constraintAnalysis:'n ≤ 10⁴, sorted, O(log n)',
    constraintKyu:'"O(log n)" directly likha. n=10⁴ → linear = 10K steps. BS = 14 steps. 700× faster!',
    inputSignal:'Sorted integer array + target',
    inputKyu:'SORTED + SEARCH = BS. Har step search space half karo.',
    keywords:['sorted array', 'target', 'return index', 'O(log n)'],
    keywordKyu:'"sorted" + "search" = Binary Search. "O(log n)" confirm karta hai.',
    outputSignal:'Index (-1 if not found).',
    whyThisPattern:'Sorted → BS. Every step eliminates half.',
    whyThisType:'Classic exact search.',
    bruteForce:'Linear scan.',
    bruteForceComplexity:'O(n)',
    bruteForceKyu:'O(n) vs O(log n). n=10⁹ → TLE.',
    optimalSteps:['lo=0, hi=n-1','mid=(lo+hi)>>1','nums[mid]===t → return mid','<t → lo=mid+1','>t → hi=mid-1','End → -1'],
    optimalCode:`let lo=0,hi=nums.length-1;
while(lo<=hi){
  const m=(lo+hi)>>1;
  if(nums[m]===t) return m;
  nums[m]<t ? lo=m+1 : hi=m-1;
}
return -1;`,
    timeComplexity:'O(log n)', spaceComplexity:'O(1)', dataStructure:'lo, hi, mid integers',
    lcUrl:'https://leetcode.com/problems/binary-search/'
  },
  {
    id:17, lcNum:35, title:'Search Insert Position', difficulty:'Easy',
    patternId:'binary-search', patternName:'Binary Search', typeId:'bs-classic', typeName:'Classic Search + Insertion Point',
    howToRead:'"Where would target be inserted?" = left boundary BS. Loop end pe lo = insertion point.',
    constraintAnalysis:'n ≤ 10⁴, sorted, distinct',
    constraintKyu:'O(log n). lo at loop end = insertion position.',
    inputSignal:'Sorted distinct array + target',
    inputKyu:'Sorted + insert position = BS. lo at end = correct position.',
    keywords:['search', 'if found return its index', 'if not found where it would be inserted'],
    keywordKyu:'"where it would be inserted" → lo at loop end = answer.',
    outputSignal:'Index (found or insert position).',
    whyThisPattern:'Sorted = BS. lo at end = insertion point.',
    whyThisType:'Classic BS + insertion insight.',
    bruteForce:'Linear scan first position ≥ target.',
    bruteForceComplexity:'O(n)',
    bruteForceKyu:'O(log n) better.',
    optimalSteps:['Same as BS','Return lo at loop end (insertion point)'],
    optimalCode:`let lo=0,hi=nums.length-1;
while(lo<=hi){
  const m=(lo+hi)>>1;
  if(nums[m]===t) return m;
  nums[m]<t ? lo=m+1 : hi=m-1;
}
return lo; // insertion point`,
    timeComplexity:'O(log n)', spaceComplexity:'O(1)', dataStructure:'lo, hi pointers',
    lcUrl:'https://leetcode.com/problems/search-insert-position/'
  },
  {
    id:18, lcNum:34, title:'Find First and Last Position of Element in Sorted Array', difficulty:'Medium',
    patternId:'binary-search', patternName:'Binary Search', typeId:'bs-classic', typeName:'Left/Right Boundary BS',
    howToRead:'"First and last position" = left boundary BS + right boundary BS. Do alag functions.',
    constraintAnalysis:'n ≤ 10⁵, O(log n) required',
    constraintKyu:'"O(log n)" = BS. Ek search nahi, left + right alag dhundho.',
    inputSignal:'Sorted array with duplicates + target',
    inputKyu:'Sorted + duplicates + boundaries = Two Binary Searches.',
    keywords:['first position', 'last position', 'sorted array', 'O(log n)'],
    keywordKyu:'"first and last" = leftBS + rightBS. Left: found→hi=mid-1. Right: found→lo=mid+1.',
    outputSignal:'[leftIdx, rightIdx] or [-1,-1].',
    whyThisPattern:'Boundaries in sorted = BS variation.',
    whyThisType:'Left + Right Boundary BS.',
    bruteForce:'Linear scan dono ends.',
    bruteForceComplexity:'O(n)',
    bruteForceKyu:'O(log n) required.',
    optimalSteps:['leftBS: found→res=mid, hi=mid-1 (go left)','rightBS: found→res=mid, lo=mid+1 (go right)','Return [left, right]'],
    optimalCode:`function bs(goLeft){
  let lo=0,hi=nums.length-1,res=-1;
  while(lo<=hi){
    const m=(lo+hi)>>1;
    if(nums[m]===t){ res=m; goLeft?hi=m-1:lo=m+1; }
    else nums[m]<t ? lo=m+1 : hi=m-1;
  }
  return res;
}
return [bs(true), bs(false)];`,
    timeComplexity:'O(log n)', spaceComplexity:'O(1)', dataStructure:'lo, hi, res variables',
    lcUrl:'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/'
  },

  // ═══════════════════════════════════
  // BINARY SEARCH — Answer Space (3)
  // ═══════════════════════════════════
  {
    id:19, lcNum:875, title:'Koko Eating Bananas', difficulty:'Medium',
    patternId:'binary-search', patternName:'Binary Search', typeId:'bs-answerspace', typeName:'Binary Search on Answer Space',
    howToRead:'"Minimum speed" = minimize a value. Speed range [1, max(piles)]. canFinish(speed) = O(n) check. Monotonic function = BS on answer space.',
    constraintAnalysis:'piles ≤ 10⁴, h ≤ 10⁹',
    constraintKyu:'Answer range [1, max]. BS on range = O(n log max). Direct try = O(max×n) = TLE.',
    inputSignal:'Array (piles) + h',
    inputKyu:'"Minimum k such that condition" = BS on answer space. canDo(k) monotonic = BS.',
    keywords:['minimum speed', 'finish all bananas', 'within h hours', 'eating speed k'],
    keywordKyu:'"minimum ... such that" = BS on answer. canFinish monotonic (faster k → always finishes).',
    outputSignal:'Integer (minimum speed). lo at loop end.',
    whyThisPattern:'canFinish monotonic on speed → BS on answer range.',
    whyThisType:'Answer space BS (not array index).',
    bruteForce:'1 se max(piles) tak try.',
    bruteForceComplexity:'O(max × n)',
    bruteForceKyu:'max=10⁹ = TLE.',
    optimalSteps:['lo=1, hi=max(piles)','canFinish(k): sum(ceil(p/k))<=h','canFinish(mid)? hi=mid else lo=mid+1','Return lo'],
    optimalCode:`const can=k=>piles.reduce((s,p)=>s+Math.ceil(p/k),0)<=h;
let lo=1,hi=Math.max(...piles);
while(lo<hi){
  const m=(lo+hi)>>1;
  can(m) ? hi=m : lo=m+1;
}
return lo;`,
    timeComplexity:'O(n log m)', spaceComplexity:'O(1)', dataStructure:'lo, hi on answer space',
    lcUrl:'https://leetcode.com/problems/koko-eating-bananas/'
  },
  {
    id:20, lcNum:1011, title:'Capacity To Ship Packages Within D Days', difficulty:'Medium',
    patternId:'binary-search', patternName:'Binary Search', typeId:'bs-answerspace', typeName:'Binary Search on Answer Space',
    howToRead:'"Minimum weight capacity" = minimize. Capacity range [max(w), sum(w)]. canShip(cap) = greedy check.',
    constraintAnalysis:'n ≤ 5×10⁴',
    constraintKyu:'O(n log sum). canShip O(n) × log(sum) = acceptable.',
    inputSignal:'Weights array + d',
    inputKyu:'"Minimum capacity such that" = BS on [max,sum].',
    keywords:['minimum weight capacity', 'ship within d days', 'capacity of ship'],
    keywordKyu:'"minimum capacity" → BS on answer. Koko jaisa pattern.',
    outputSignal:'Integer (minimum capacity).',
    whyThisPattern:'Same as Koko — minimize answer, monotonic check.',
    whyThisType:'Answer space BS.',
    bruteForce:'max(w) se sum(w) tak try.',
    bruteForceComplexity:'O(sum × n)',
    bruteForceKyu:'sum bahut bada = TLE.',
    optimalSteps:['lo=max(w), hi=sum(w)','canShip(cap): greedy days<=d','canShip(mid)? hi=mid else lo=mid+1','Return lo'],
    optimalCode:`const can=c=>{let d=1,cur=0;for(const w of weights){if(cur+w>c){d++;cur=0;}cur+=w;}return d<=days;};
let lo=Math.max(...weights),hi=weights.reduce((a,b)=>a+b,0);
while(lo<hi){const m=(lo+hi)>>1;can(m)?hi=m:lo=m+1;}
return lo;`,
    timeComplexity:'O(n log sum)', spaceComplexity:'O(1)', dataStructure:'lo, hi on capacity range',
    lcUrl:'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/'
  },
  {
    id:21, lcNum:33, title:'Search in Rotated Sorted Array', difficulty:'Medium',
    patternId:'binary-search', patternName:'Binary Search', typeId:'bs-rotated', typeName:'Modified BS — Rotated Array',
    howToRead:'"Rotated sorted" + "O(log n)" = Modified BS. Ek half hamesha sorted. Sorted half se decide karo target kidhar.',
    constraintAnalysis:'n ≤ 5000, O(log n) required',
    constraintKyu:'"O(log n)" explicitly = BS. Rotation = extra condition.',
    inputSignal:'Rotated sorted array + target',
    inputKyu:'Rotated = modified BS. Check sorted half, narrow search.',
    keywords:['rotated', 'sorted array', 'O(log n)', 'search'],
    keywordKyu:'"rotated" + "O(log n)" = Modified BS. Ek half sorted hoga hamesha.',
    outputSignal:'Index (-1 if not found).',
    whyThisPattern:'Modified BS — rotation creates two sorted halves.',
    whyThisType:'Rotated array BS.',
    bruteForce:'Linear scan.',
    bruteForceComplexity:'O(n)',
    bruteForceKyu:'O(log n) required.',
    optimalSteps:['lo=0,hi=n-1','Left sorted? nums[lo]<=nums[m]','Target in left range? hi=m-1 else lo=m+1','Right sorted: target in right? lo=m+1 else hi=m-1'],
    optimalCode:`let lo=0,hi=nums.length-1;
while(lo<=hi){
  const m=(lo+hi)>>1;
  if(nums[m]===t) return m;
  if(nums[lo]<=nums[m]){
    t>=nums[lo]&&t<nums[m] ? hi=m-1 : lo=m+1;
  } else {
    t>nums[m]&&t<=nums[hi] ? lo=m+1 : hi=m-1;
  }
}
return -1;`,
    timeComplexity:'O(log n)', spaceComplexity:'O(1)', dataStructure:'lo, hi pointers',
    lcUrl:'https://leetcode.com/problems/search-in-rotated-sorted-array/'
  },
];

// ─── Derived lookups ────────────────────────────────────────────
export const CORE_BY_PATTERN: Record<string, CoreQuestion[]> = {};
export const CORE_BY_TYPE: Record<string, CoreQuestion[]> = {};
export const TYPE_ORDER: Record<string, string[]> = {
  'sliding-window': ['sw-fixed','sw-variable','sw-exact'],
  'two-pointers':   ['tp-opposite','tp-samedirection'],
  'binary-search':  ['bs-classic','bs-answerspace','bs-rotated'],
};
export const TYPE_NAMES: Record<string, string> = {
  'sw-fixed':'Fixed-Size Window','sw-variable':'Variable-Size Window','sw-exact':'Exactly K / Minimize',
  'tp-opposite':'Opposite Ends (Converging)','tp-samedirection':'Same Direction (Fast-Slow)',
  'bs-classic':'Classic Search','bs-answerspace':'Answer Space BS','bs-rotated':'Modified BS',
};

for (const q of CORE_QUESTIONS) {
  if (!CORE_BY_PATTERN[q.patternId]) CORE_BY_PATTERN[q.patternId] = [];
  CORE_BY_PATTERN[q.patternId].push(q);
  if (!CORE_BY_TYPE[q.typeId]) CORE_BY_TYPE[q.typeId] = [];
  CORE_BY_TYPE[q.typeId].push(q);
}
