# 🚀 DSA Mastery Platform

> **Master Data Structures & Algorithms the smart way.**  
> 15 Patterns · 450 Problems · AI Tutor · Visualizers · Interview Simulator

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

---

## 🎯 What Is This?

DSA Mastery is a full-stack learning platform for developers preparing for  
FAANG / product company interviews. Instead of grinding 1000 random problems,  
you learn **15 core patterns** that cover 90% of all interview questions.

---

## 🏗️ Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Framework   | Next.js 15 (App Router)              |
| Language    | TypeScript                           |
| Styling     | Tailwind CSS v4 + Custom CSS         |
| UI Library  | ShadCN (manual) + Custom Components  |
| State       | Zustand (persisted)                  |
| Animations  | CSS Keyframes + Framer Motion        |
| Visualizers | D3.js + React Flow                   |
| Editor      | Monaco Editor (@monaco-editor/react) |
| AI          | OpenAI GPT-4 API                     |
| Charts      | Recharts                             |

---

## 📁 Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout (Navbar + Sidebar + Footer)
│   ├── page.tsx      # Home page
│   ├── patterns/     # Pattern list + detail pages
│   ├── practice/     # Problem list + solver
│   ├── visualizers/  # Algorithm animations
│   ├── editor/       # Standalone code editor
│   ├── ai/           # AI tutor chat
│   ├── interview/    # Mock interview mode
│   └── dashboard/    # Progress analytics
│
├── components/
│   ├── ui/           # Button, Card, Badge, Progress, etc.
│   ├── layout/       # Navbar, Sidebar, Footer
│   ├── patterns/     # PatternCard, PatternList
│   ├── practice/     # QuestionCard, SubmissionPanel
│   ├── visualizers/  # Algorithm visualizer components
│   ├── editor/       # Monaco editor wrapper
│   ├── ai/           # AI chat panel
│   └── dashboard/    # Charts and stats
│
├── data/
│   ├── patterns/     # 15 JSON files (30 questions each)
│   └── questions/    # Problem data by difficulty
│
├── lib/
│   ├── utils.ts      # cn(), formatTime(), etc.
│   ├── constants.ts  # APP constants, pattern list
│   └── helpers.ts    # Business logic helpers
│
├── hooks/            # Custom React hooks
├── store/            # Zustand stores (progress, user, editor)
├── types/            # TypeScript interfaces
└── styles/
    └── globals.css   # Tailwind v4 + custom CSS variables
```

---

## 🧩 15 DSA Patterns

| # | Pattern              | Category         | Questions |
|---|----------------------|------------------|-----------|
| 1 | Sliding Window       | Arrays & Strings | 30        |
| 2 | Two Pointers         | Arrays & Strings | 30        |
| 3 | Binary Search        | Arrays & Strings | 30        |
| 4 | Fast & Slow Pointers | Linked Lists     | 30        |
| 5 | Merge Intervals      | Arrays & Strings | 30        |
| 6 | Cyclic Sort          | Arrays & Strings | 30        |
| 7 | DFS                  | Trees            | 30        |
| 8 | BFS                  | Graphs           | 30        |
| 9 | Topological Sort     | Graphs           | 30        |
|10 | Heap/Priority Queue  | Heaps & Queues   | 30        |
|11 | Subsets/Backtracking | DP               | 30        |
|12 | Dynamic Programming  | DP               | 30        |
|13 | Bit Manipulation     | Bit Ops          | 30        |
|14 | Trie                 | Tries            | 30        |
|15 | Graph Algorithms     | Graphs           | 30        |
|   | **TOTAL**            |                  | **450**   |

---

## 🚀 Getting Started
```bash
# 1. Clone / navigate to project
cd my_dsa_mastery

# 2. Install dependencies (already done)
npm install

# 3. Run development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

---

## 🔑 Environment Variables

Create `.env.local` for AI features:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

---

## 📅 Development Roadmap

| Day | Features                                        | Status      |
|-----|-------------------------------------------------|-------------|
| 1   | Setup, Foundation, Layout, Home Page            | ✅ Complete  |
| 2   | Pattern System (data + listing + detail pages)  | 🔄 Next      |
| 3   | Practice System (450 questions + problem solver)| ⏳ Pending   |
| 4   | Algorithm Visualizers (8 types)                 | ⏳ Pending   |
| 5   | Monaco Editor + AI Tutor + Pattern Detector     | ⏳ Pending   |
| 6   | Interview Simulator + Progress Dashboard        | ⏳ Pending   |
| 7   | Polish, Testing, Performance, Deploy            | ⏳ Pending   |

---

## 🤝 Contributing

This is a personal learning project. Feel free to fork and customize!

---

*Built with ❤️ for DSA learners preparing for FAANG interviews.*