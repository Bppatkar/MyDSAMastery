// Most frequently asked interview questions with detailed solving steps (Hinglish)
export const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    question: "Two Sum - Find two numbers that add up to target",
    difficulty: "Easy",
    pattern: "Two Pointers / HashMaps",
    steps: [
      "Understand: Array mein do numbers dhundo jo target sum banayen",
      "Approach 1 (Brute Force): Dono loops chala ke saari pairs check karo - O(n²)",
      "Approach 2 (HashMaps): Pehli iteration mein saare numbers ko HashMap mein store karo",
      "Dusri iteration mein check karo (target - current_number) HashMap mein exist karta hai",
      "Agar exist karta hai toh indices return karo"
    ],
    interviewTip: "Interviewer chahega ki tum brute force se shuru karo fir optimize karo (space-time trade-off explain karte hue)"
  },
  {
    id: 2,
    question: "Valid Palindrome - Check if string is palindrome (ignore spaces & case)",
    difficulty: "Easy",
    pattern: "Two Pointers",
    steps: [
      "Understand: Sirf alphanumeric characters consider karna, spaces/symbols ignore karo",
      "Par string ko modify mat karo (in-place socho)",
      "Dono ends se pointers shuru karo - left = 0, right = length-1",
      "Left pointer ko age badha jab tak alphanumeric na mile",
      "Right pointer ko peeche badha jab tak alphanumeric na mile",
      "Agar dono characters different hain toh false return karo (case-insensitive comparison karte hue)",
      "Agar middle pahunch gaye toh true return karo"
    ],
    interviewTip: "Do pointers ka classic example hai - space complexity O(1) maintain karte hue"
  },
  {
    id: 3,
    question: "3Sum - Find all unique triplets that sum to zero",
    difficulty: "Medium",
    pattern: "Two Pointers (with sorting)",
    steps: [
      "Understand: Unique triplets chahiye jo sum = 0 banaye",
      "Pehle array ko sort karo - ye duplicate avoid karne mein help dega",
      "Outer loop chala - har element ko ek number mano",
      "Baki array par two sum karo (target = -current_number)",
      "Left pointer = i+1, right pointer = end rakho",
      "Agar sum < target toh left++ karo, agar sum > target toh right-- karo",
      "Agar sum == target mila toh triplet store karo",
      "Duplicates se bachne ke liye: outer aur inner loop dono mein while loops use karo consecutive duplicates skip karne ke liye"
    ],
    interviewTip: "Sorting + Two Pointers combination - pehle brute force (3 loops) explain karo fir yeh optimize kara"
  },
  {
    id: 4,
    question: "Container With Most Water - Find two lines that hold max water",
    difficulty: "Medium",
    pattern: "Two Pointers / Greedy",
    steps: [
      "Understand: Do vertical lines se maximum area banana hai",
      "Area = width × min(height_left, height_right)",
      "Greedy soch: Sabse jyada width se shuru karo (left = 0, right = n-1)",
      "Left se right jao, calculate karo area",
      "Ab jis side ki height kam hai usi side ko move karo (kyunki width already ghat raha hai, kam height side se better nahi ho sakta)",
      "Maximum area track karte hue continue karo"
    ],
    interviewTip: "Greedy approach ka achcha example - why shorter side ko move karte ho yeh explain karna important hai"
  },
  {
    id: 5,
    question: "Best Time to Buy and Sell Stock - Max profit with single transaction",
    difficulty: "Easy",
    pattern: "Two Pointers / Linear Scan",
    steps: [
      "Understand: Ek baar buy karo, ek baar sell karo - maximum profit nikalo",
      "Important: Buy karne ke baad hi sell kar sakte ho (age ka hi price use ho)",
      "Approach: Ek pass mein karo - track karo minimum price tak",
      "Jab bhi naya price mile, calculate karo (current_price - min_price)",
      "Maximum profit track karo",
      "Edge case: Agar prices decreasing hain toh profit = 0"
    ],
    interviewTip: "Simple problem lagta hai par edge cases (all decreasing, single element) important hain"
  },
  {
    id: 6,
    question: "Merge Two Sorted Arrays - Merge in-place from right",
    difficulty: "Easy",
    pattern: "Two Pointers",
    steps: [
      "Understand: Dono arrays sorted hain, pehla array mein space hai dusre ko fit karne ke liye",
      "Important: Left se shuru karne se overwrite ho jayega - daye (right) se shuru karo!",
      "Teen pointers: p1 = m-1 (array1 ka last), p2 = n-1 (array2 ka last), p = m+n-1 (end)",
      "Compare karo p1 aur p2 ke elements",
      "Bada element p position par rakho aur uska pointer ghatao",
      "Jab array1 khatm ho jaye toh baki array2 elements chodh do (wo already sahi jagah hain)",
      "Jab array2 khatm ho jaye toh array1 elements pehle se hi sahi jagah par hain"
    ],
    interviewTip: "Right se shuru karna crucial hai - yeh in-place constraint ke saath kaam karne ka trick hai"
  },
  {
    id: 7,
    question: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    pattern: "Sliding Window + HashMap",
    steps: [
      "Understand: Substring (continuous) jisme koi bhi character dobara na aaye",
      "Sliding window use karo - left aur right pointers",
      "HashMap maintain karo jisme character ki last seen index ho",
      "Right pointer ko ek-ek karke badhate ja",
      "Agar character already window mein hai toh left pointer ko update karo (duplicate ke age rakho)",
      "Har step par window length track karo",
      "Maximum length return karo",
      "Key insight: Left ko kabhi peeche mat karo, sirf age badha"
    ],
    interviewTip: "Sliding window pattern pehli baar seekhna hai toh yeh perfect problem hai"
  },
  {
    id: 8,
    question: "Minimum Window Substring - Find minimum window containing all chars",
    difficulty: "Hard",
    pattern: "Sliding Window + HashMap",
    steps: [
      "Understand: Bade string mein choti substring dhundo jo target ke saare characters contain kare",
      "Pehle target ke saare characters ka frequency map banao",
      "Sliding window: left aur right pointers",
      "Right ko badhate jao jab tak saare required characters na mil jayen",
      "Ek baar valid window mila toh left ko badhate hue shrink karo - minimum window track karo",
      "Jab valid condition toot jaye toh fir se right ko badao",
      "Ant mein minimum length ka window return karo"
    ],
    interviewTip: "Hard problem lagta hai par sliding window ke saath kaafi smooth hai"
  },
  {
    id: 9,
    question: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    pattern: "Two Pointers (Slow + Fast)",
    steps: [
      "Understand: In-place duplicates remove karna, unique elements ko age rakhna hai",
      "Slow pointer = 0 (jahan unique elements place honge)",
      "Fast pointer = 1 (jahan se search karenge)",
      "Agar fast element pichle element se different hai toh slow++ karke woh element rakho",
      "Fast ko hamesha age badhate raho",
      "Ant mein slow+1 hi unique element ki count hai"
    ],
    interviewTip: "In-place modification ki fundamentals - multiple variations mein use hoti hai"
  },
  {
    id: 10,
    question: "Reverse a Linked List",
    difficulty: "Easy",
    pattern: "Linked List Traversal",
    steps: [
      "Understand: Linked list ko reverse karna - connections ko flip karna",
      "Teen pointers maintain karo: prev (initially null), current (head), next (temporary)",
      "Loop chalaate hue saare nodes ko visit karo:",
      "  1. Pehle current.next ko save karo next variable mein (nahi toh link khoo jayegi)",
      "  2. Current.next ko prev ki oar point kara do (reverse karne ke liye)",
      "  3. Prev ko current tak advance karo",
      "  4. Current ko next tak advance karo",
      "Jab current null ho jaye toh prev hi naya head hai"
    ],
    interviewTip: "Linked list ka sabse basic problem - saare linked list problems ke liye foundation"
  },
  {
    id: 11,
    question: "Merge K Sorted Lists",
    difficulty: "Hard",
    pattern: "Min Heap / Priority Queue",
    steps: [
      "Understand: K sorted linked lists ko ek mein merge karna hai",
      "Approach 1 (Brute): Saare values nikalo, sort karo, new list banao - O(n log n) space waste",
      "Approach 2 (Min Heap): Pratyek list ka pehla node ko min heap mein dalo",
      "Har iteration mein smallest node ko pop karo, result mein add karo",
      "Agar uss node ka agle node hai toh heap mein dalo",
      "Continue karo jab tak heap khali na ho jaye",
      "Time: O(nk log k) where n = total nodes, k = lists"
    ],
    interviewTip: "Heap/Priority Queue ki practical application - multiple lists handle karne ki strategy"
  },
  {
    id: 12,
    question: "Binary Search on Sorted Array",
    difficulty: "Easy",
    pattern: "Binary Search",
    steps: [
      "Understand: Sorted array mein target ko O(log n) mein dhundna hai",
      "left = 0, right = n-1",
      "Jab tak left <= right:",
      "  1. mid = (left + right) / 2 calculate karo",
      "  2. Agar arr[mid] == target toh return mid",
      "  3. Agar arr[mid] < target toh left = mid + 1 (daye jao)",
      "  4. Agar arr[mid] > target toh right = mid - 1 (baye jao)",
      "Agar element na mile toh -1 return karo",
      "Important: Integer overflow se bachne ke liye left + (right - left)/2 use karo"
    ],
    interviewTip: "Infinite variations hain (rotated array, first/last occurrence) - yeh base understand karo"
  },
  {
    id: 13,
    question: "Valid Parentheses - Check if brackets are properly nested",
    difficulty: "Easy",
    pattern: "Stack",
    steps: [
      "Understand: Brackets properly open aur close hone chahiye - nesting valid honi chahiye",
      "Stack use karo",
      "Saare characters ko iterate karo:",
      "  1. Agar opening bracket hai toh stack mein push karo",
      "  2. Agar closing bracket hai:",
      "     - Stack empty hai toh false (koi matching opening nahi)",
      "     - Stack top se pop karo aur check karo ki yeh matching opening hai",
      "     - Agar match nahi toh false return karo",
      "Loop khatm hone ke baad, stack empty hona chahiye (saare brackets closed hon)"
    ],
    interviewTip: "Stack ka classic application - 'LIFO' concept ko solidify karta hai"
  },
  {
    id: 14,
    question: "Longest Common Subsequence (LCS)",
    difficulty: "Medium",
    pattern: "Dynamic Programming",
    steps: [
      "Understand: Dono strings mein sabse lambi subsequence (not necessarily continuous) nikalni hai",
      "2D DP array banao: dp[i][j] = LCS(s1[0..i-1], s2[0..j-1])",
      "Base case: dp[0][j] = 0 aur dp[i][0] = 0 (empty string ka LCS = 0)",
      "Recurrence relation:",
      "  Agar s1[i-1] == s2[j-1] toh dp[i][j] = dp[i-1][j-1] + 1 (character match)",
      "  Agar s1[i-1] != s2[j-1] toh dp[i][j] = max(dp[i-1][j], dp[i][j-1]) (skip karte hue max lo)",
      "Ant mein dp[m][n] answer hai (m = len(s1), n = len(s2))"
    ],
    interviewTip: "DP ka classic problem - subsequence vs substring ka difference samjh lo"
  },
  {
    id: 15,
    question: "Number of Islands - Count islands in 2D grid (DFS/BFS)",
    difficulty: "Medium",
    pattern: "DFS/BFS on Grid",
    steps: [
      "Understand: Grid mein 1s ko islands mano, connected 1s = ek island (4-direction connected)",
      "Approach: Har unvisited '1' ke liye ek island count karo",
      "Island counting ke liye DFS ya BFS karo - saare connected 1s ko visited mark karo",
      "DFS approach:",
      "  1. Current cell ko visited mark karo",
      "  2. Charon directions mein recursively jao (agar valid aur '1' hai)",
      "  3. Return karo (backtracking automatic hai recursive structure mein)",
      "Kisi bhi unvisited '1' ko paye toh island_count++ karo aur DFS shuru karo"
    ],
    interviewTip: "Grid par DFS/BFS - multiple variations mein mahatvpurn (flood fill, surrounded regions)"
  }
];
