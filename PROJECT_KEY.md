# 🔑 DSA MASTERY — PROJECT RESTORE KEY

**Paste this in a new chat to restore full context:**

---

## PROJECT: DSA Mastery Platform
**Stack:** Next.js 15 | React 19 | TypeScript | Tailwind v4 | Zustand  
**Developer:** Bhanu Pratap Patkar (bhanupratappatkar777@gmail.com)  
**Location:** `/tmp/dsa-final/` (in container) | Output: `/mnt/user-data/outputs/`  
**Status:** Day 10 Complete — Production Ready

## KEY FILES
```
src/app/
├── learn/page.tsx          ← NEW: Systematic learning, 3Q per type, 8-step methodology
├── cheatsheet/page.tsx     ← NEW: Keywords→Patterns, DS Complexity, Time Guide
├── dashboard/page.tsx      ← NEW: Real progress tracking
├── interview/page.tsx      ← NEW: Mock interview mode
├── pattern-recognition/page.tsx ← Main trainer, 450Q
├── algorithms/page.tsx     ← Algorithm reference, brute force vs optimal
├── practice/[id]/page.tsx  ← Question detail, pattern analysis
├── patterns/[pattern]/page.tsx ← Pattern detail pages
├── visualizers/page.tsx    ← 11 visualizers

src/lib/
├── coreQuestions.ts        ← NEW: 3Q per type, deep methodology (SW+TP+BS complete)
├── recognitionData.ts      ← 112 recognition challenges
├── patternData.ts          ← 360Q for patterns 4-15
├── patternTypes.ts         ← 18 patterns × types
├── decisionMatrix.ts       ← 38 decision rules

src/data/patterns/
├── sliding-window.json     ← 30Q
├── two-pointers.json       ← 30Q
├── binary-search.json      ← 30Q

src/store/useProgressStore.ts ← Zustand persist store
src/components/layout/Navbar.tsx ← 7 nav items
```

## PATTERNS COVERED
1. Sliding Window | 2. Two Pointers | 3. Binary Search | 4. Fast & Slow Pointers
5. Merge Intervals | 6. Cyclic Sort | 7. DFS | 8. BFS | 9. Topological Sort
10. Heap/PQ | 11. Subsets/Backtracking | 12. Dynamic Programming
13. Bit Manipulation | 14. Trie | 15. Graph/Union-Find

## IMPORTANT PATTERNS (CSS Variables)
`--bg-base`, `--bg-surface`, `--bg-elevated`, `--bg-hover`  
`--border`, `--accent`, `--accent-bg`, `--accent-bdr`  
`--tx-1` through `--tx-4` (text colors)  
Dark mode via `html.dark` class (next-themes)

## PENDING WORK
1. `coreQuestions.ts` — add patterns 4-15 (currently only SW+TP+BS)
2. Premium questions — filter/mark in practice page
3. Mobile responsive polish
4. Vercel deploy

## ARCHITECTURE NOTES
- `ALL_QUESTION_STUBS` = flatMap of ALL_PATTERN_DATA (450 total)
- `ALL_PATTERNS` = patternData.ts export (patterns 4-15 only!)
- `CORE_QUESTIONS` = coreQuestions.ts (3 per type, deep methodology)
- Progress store: `markSolved(questionId, difficulty, patternId)`, `unmark(questionId, patternId)`
- Font: JetBrains Mono for code blocks
- No Monaco editor (removed Day 8)
- All content in Hinglish (except actual LeetCode question text)

## LAST BUILT
Day 10 — March 2025
