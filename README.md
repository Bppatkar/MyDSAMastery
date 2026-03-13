# DSA Mastery Platform 🧠

Ek focused training platform — **LeetCode questions dekho, pattern aur data structure identify karna seekho.**

> **Main Goal:** Input, Output, Keywords aur Constraints dekh kar — sirf pattern aur konsa data structure lagega ye pata karna seekhna hai. Individual pattern ke jitne bhi types hote hain, unhe seekhna hai.

---

## Core Philosophy 

```
Step 1: Constraints dekho → Time Complexity decide karo
Step 2: Input Format dekho → Pattern narrow karo  
Step 3: Output Format dekho → Approach hint milti hai
Step 4: Keywords dekho → Final pattern confirm karo
```

---

## Features

### ✅ Day 1-2: Foundation + Patterns
- 15 DSA patterns, 450 questions
- Pattern detail pages, quiz, progress tracking

### ✅ Day 3: Practice System
- 450 LeetCode-style questions
- ✅ **Tick AND Untick** — solved mark karo, phir se click karo toh unmark ho jayega

### ✅ Day 4: Visualizers (8)
- Sorting, Binary Search, Two Pointers, Sliding Window
- Linked List, BST, Graph BFS/DFS, Stack & Queue

### ✅ Day 5: Pattern Recognition Trainer ⭐ MAIN FEATURE

**Tab 1: 🎯 Pattern Trainer (LeetCode Split-View)**
- Left side = LeetCode-style problem (description, input, output, constraints, keywords)
- Right side = 4-step guided analysis:
  - Step 1: Constraints → n ki value → time complexity decide
  - Step 2: Input format → sorted/unsorted/tree/graph/string?
  - Step 3: Output format → list of all / single number / boolean?
  - Step 4: Keywords → trigger words se pattern confirm
- 30 real LeetCode problems across 18 patterns
- Score tracking + weak pattern identification

**Tab 2: 🗂️ Pattern Types**
- 18 patterns × 3-4 subtypes each (Stack, HashMap, Greedy bhi included)
- Har subtype: trigger words, data structure, approach, example, complexity

**Tab 3: 📋 Recognition Guide**
- Constraint Guide: n ≤ 20 → Backtracking, n ≤ 10^6 → O(n log n), etc.
- Input Format Guide: sorted array → Binary Search/Two Pointers, etc.
- Output Format Guide: List of Lists → Backtracking, Single Value → DP/Greedy

---

## Setup

```bash
unzip -o dsa-mastery-fixed.zip -d .
cp -r dsa-final/* .
rm -rf dsa-final/
npm install
npm run dev
```

Open http://localhost:3000

---

## Stack
Next.js 15 | React 19 | TypeScript | Tailwind v4 | Zustand | Lucide Icons
