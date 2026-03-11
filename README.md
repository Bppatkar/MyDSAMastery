# DSA Mastery Platform

A focused training platform to master Data Structures & Algorithms — specifically designed to help you **identify patterns from problem descriptions** so you can tackle unseen LeetCode questions confidently.

## Core Mission

> "Given a problem's input, output, constraints, and keywords → instantly know which pattern and data structure to use."

## Features

### ✅ Day 1 — Foundation
- Home page, layout, navigation, dark/light mode
- Zustand stores (progress, editor, user)

### ✅ Day 2 — Pattern System
- 15 DSA patterns with 30 questions each (450 total)
- Pattern detail pages with code templates, complexity, examples
- Pattern Quiz, Decision Flowchart, Pattern Progress tracking

### ✅ Day 3 — Practice System
- 450-question practice list with filters (difficulty, pattern, status)
- Full question view with Monaco editor and progress auto-save
- **Tick AND untick** solved questions

### ✅ Day 4 — Visualizers (8 total)
- Sorting (Bubble, Selection, Insertion, Merge, Quick)
- Binary Search, Two Pointers, Sliding Window
- Linked List (insert, delete, reverse, find middle with slow/fast)
- BST (insert, search, inorder/preorder/postorder)
- Graph BFS/DFS (animated traversal)
- Stack & Queue (LIFO/FIFO operations)

### ✅ Day 5 — Pattern Recognition Trainer ⭐ MAIN FEATURE
- **Pattern Trainer**: See input/output/constraints → identify correct pattern
- **Pattern Types**: Each of 15 patterns broken into 3-5 subtypes with triggers, DS, approach, example
- **Keyword Triggers**: Reference card of words that reveal each pattern
- **Decision Guide**: Step-by-step questions to narrow down the pattern

## Pattern Recognition System

The app teaches you to recognize patterns by:

1. **Showing problem context** (not solution) — input type, output type, constraints, keywords
2. **You guess the pattern** from 4 options
3. **Immediate feedback** — why this pattern, which trigger words gave it away, which data structure, 1-line approach
4. **Pattern Types** — not just "Sliding Window" but "Fixed Window vs Variable Window vs Monotonic Deque"

### Pattern Types Breakdown

| Pattern | Types |
|---------|-------|
| Sliding Window | Fixed Size, Variable (At Most K), Variable (Exactly K), Deque (Min/Max) |
| Two Pointers | Opposite Ends, Same Direction, Fast-Slow, Three Pointers |
| Binary Search | Classic, Answer Space, First/Last Occurrence, 2D Matrix |
| DFS | Tree Path, Graph Islands, Backtracking, Memoized DFS |
| BFS | Level-Order, Shortest Path, Multi-Source |
| Dynamic Programming | 1D Linear, 2D Grid/Sequences, 0/1 Knapsack, Unbounded Knapsack, Interval DP |
| ... and more |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Stack

- **Next.js 15** + React 19 + TypeScript
- **Tailwind v4** + CSS custom properties (dark/light mode)
- **Zustand** for progress state
- **Lucide React** icons
