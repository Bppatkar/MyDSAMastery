'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Brain, CheckCircle2, XCircle, RotateCcw, ChevronRight, Zap, Trophy } from 'lucide-react';

const KEYWORD_TRIGGERS = [
  { pattern: 'Dynamic Programming',     color: '#ef4444', triggers: ['"Number of ways"', '"Max/Min sum"', '"Can you reach"', '"Longest/Shortest subsequence"', '"Optimal solution"'] },
  { pattern: 'Two Pointers',            color: '#10b981', triggers: ['"Palindrome"', '"Sorted array"', '"Target sum"', '"Remove duplicates"', '"Reverse in-place"'] },
  { pattern: 'Sliding Window',          color: '#3b82f6', triggers: ['"Longest substring"', '"Fixed/variable window"', '"Max/Min subarray"', '"No repeating chars"'] },
  { pattern: 'Heap / Priority Queue',   color: '#f59e0b', triggers: ['"K largest/smallest"', '"Top K elements"', '"Median"', '"Streaming data"'] },
  { pattern: 'Stack Patterns',          color: '#8b5cf6', triggers: ['"Parentheses/brackets"', '"Valid expression"', '"Nested structure"', '"Min stack"'] },
  { pattern: 'Monotonic Stack',         color: '#a855f7', triggers: ['"Next greater element"', '"Next smaller element"', '"Daily temperatures"', '"Histogram"'] },
  { pattern: 'HashMap / HashSet',       color: '#06b6d4', triggers: ['"Frequency count"', '"Find duplicates"', '"Anagram check"', '"Two Sum"'] },
  { pattern: 'Binary Search',           color: '#84cc16', triggers: ['"Kth element"', '"Search in sorted"', '"Minimize maximum"', '"First/last occurrence"'] },
  { pattern: 'BFS',                     color: '#22d3ee', triggers: ['"Shortest path"', '"Level order"', '"Minimum steps"', '"Multi-source spread"'] },
  { pattern: 'DFS / Backtracking',      color: '#f97316', triggers: ['"All combinations"', '"All permutations"', '"All subsets"', '"Word search"'] },
  { pattern: 'Union-Find',              color: '#ec4899', triggers: ['"Connected components"', '"Number of groups"', '"Network connectivity"'] },
  { pattern: 'Bit Manipulation',        color: '#eab308', triggers: ['"XOR trick"', '"Single number"', '"Power of 2"', '"Missing number"'] },
  { pattern: 'Prefix Sum',              color: '#14b8a6', triggers: ['"Subarray sum equals k"', '"Range sum"', '"Running total"'] },
  { pattern: 'Fast & Slow Pointers',    color: '#f43f5e', triggers: ['"Cycle detection"', '"Middle of list"', '"Floyd algorithm"'] },
  { pattern: 'Topological Sort',        color: '#6366f1', triggers: ['"Course schedule"', '"Task dependency"', '"Build order"', '"Prerequisites"'] },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    constraints: 'String input. Return length. No repeating chars allowed.',
    inputOutput: 'Input: "abcabcbb" → Output: 3 (abc)',
    keywords: ['longest', 'substring', 'no repeating'],
    options: ['Dynamic Programming', 'Sliding Window', 'Binary Search', 'Stack'],
    answer: 'Sliding Window',
    explanation: '"Longest substring" + "no repeating" — classic variable-size sliding window. Window expand karo right se, shrink karo jab duplicate aaye.',
  },
  {
    id: 2,
    title: 'Course Schedule',
    difficulty: 'Medium',
    constraints: 'n courses, prerequisites list. Can you finish all?',
    inputOutput: 'Input: n=2, [[1,0]] → Output: true (0 pehle, phir 1)',
    keywords: ['prerequisites', 'dependency', 'can you finish'],
    options: ['Dynamic Programming', 'Binary Search', 'Topological Sort', 'Two Pointers'],
    answer: 'Topological Sort',
    explanation: '"Prerequisites" + "can you finish" = dependency detection = cycle check in directed graph = Topological Sort.',
  },
  {
    id: 3,
    title: 'Kth Largest Element in Array',
    difficulty: 'Medium',
    constraints: 'Unsorted array, find Kth largest. Return single number.',
    inputOutput: 'Input: [3,2,1,5,6,4], k=2 → Output: 5',
    keywords: ['kth largest', 'top k', 'single value'],
    options: ['Sliding Window', 'Heap / Priority Queue', 'Topological Sort', 'Backtracking'],
    answer: 'Heap / Priority Queue',
    explanation: '"K largest" → Min-heap of size K maintain karo. End mein heap ka top = Kth largest.',
  },
  {
    id: 4,
    title: 'Number of Islands',
    difficulty: 'Medium',
    constraints: '2D grid of 1s and 0s. Count connected groups of 1s.',
    inputOutput: 'Input: grid with clusters of 1s → Output: count of islands',
    keywords: ['2D grid', 'connected groups', 'count islands'],
    options: ['Dynamic Programming', 'Binary Search', 'DFS / BFS', 'Prefix Sum'],
    answer: 'DFS / BFS',
    explanation: '"2D grid" + "connected groups" → classic DFS/BFS "island" pattern. Har unvisited 1 se DFS lagao, sab connected 1s ko mark karo.',
  },
  {
    id: 5,
    title: 'Coin Change',
    difficulty: 'Medium',
    constraints: 'Coins array, target amount. Min coins to make amount.',
    inputOutput: 'Input: coins=[1,5,6,9], amount=11 → Output: 2 (5+6)',
    keywords: ['minimum', 'number of ways', 'optimal solution'],
    options: ['Greedy', 'Dynamic Programming', 'Backtracking', 'Two Pointers'],
    answer: 'Dynamic Programming',
    explanation: '"Minimum coins" + "optimal solution" → DP. Greedy fail hota hai yahan. Overlapping subproblems hain → DP.',
  },
  {
    id: 6,
    title: 'Find All Subsets',
    difficulty: 'Medium',
    constraints: 'Array of unique integers. Return all possible subsets.',
    inputOutput: 'Input: [1,2,3] → Output: [[],[1],[2],[1,2],[3],...]',
    keywords: ['all subsets', 'all combinations', 'generate all'],
    options: ['Dynamic Programming', 'Sliding Window', 'Backtracking', 'Union-Find'],
    answer: 'Backtracking',
    explanation: '"All subsets" + "generate all" → Backtracking. Har element ke liye 2 choices: include karo ya skip karo.',
  },
  {
    id: 7,
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    constraints: 'Array of heights. How much water can be trapped between bars?',
    inputOutput: 'Input: [0,1,0,2,1,0,1,3,2,1,2,1] → Output: 6',
    keywords: ['trapped water', 'two boundaries', 'max height'],
    options: ['Two Pointers', 'Stack', 'Both work', 'Binary Search'],
    answer: 'Two Pointers',
    explanation: '"Trap water" → Two pointers: left_max aur right_max track karo, min(left_max, right_max) - height[i] = water at each position.',
  },
  {
    id: 8,
    title: 'Two Sum',
    difficulty: 'Easy',
    constraints: 'Array + target. Return indices of two numbers that add to target.',
    inputOutput: 'Input: [2,7,11,15], target=9 → Output: [0,1]',
    keywords: ['target sum', 'two numbers', 'find pair'],
    options: ['Two Pointers', 'HashMap', 'Binary Search', 'Sliding Window'],
    answer: 'HashMap',
    explanation: '"Two numbers that add to target" → HashMap. Har number ke liye complement (target - num) check karo HashMap mein. O(n) single pass.',
  },
];

const DIFF_STYLE: Record<string, { bg: string; text: string }> = {
  Easy:   { bg: 'rgba(16,185,129,0.12)', text: '#10b981' },
  Medium: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b' },
  Hard:   { bg: 'rgba(239,68,68,0.12)',  text: '#ef4444' },
};

export default function PatternRecognitionPage() {
  const [tab, setTab] = useState<'quiz' | 'keywords' | 'guide'>('quiz');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [wrongOnes, setWrongOnes] = useState<number[]>([]);

  const q = QUIZ_QUESTIONS[current];

  const handleSelect = (opt: string) => {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    if (opt === q.answer) setScore(s => s + 1);
    else setWrongOnes(w => [...w, current]);
  };

  const handleNext = () => {
    if (current < QUIZ_QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setDone(true);
    }
  };

  const handleReset = () => {
    setCurrent(0); setSelected(null); setAnswered(false);
    setScore(0); setDone(false); setWrongOnes([]);
  };

  return (
    <div className="min-h-screen bg-[#080810]">
      {/* Header */}
      <div className="border-b border-[#1e1e2e] bg-[#0c0c15]">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="text-2xl font-black text-white">Pattern Recognition</h1>
          </div>
          <p className="text-[#7a7a9a] text-sm mb-4">
            Problem dekhke pattern identify karna seekho — quiz, keyword triggers, aur 4-step decision guide.
          </p>
          <div className="flex gap-1 p-1 bg-[#080810] rounded-xl border border-[#1e1e2e] w-fit">
            {[
              { key: 'quiz',     label: '🧠 Pattern Quiz'    },
              { key: 'keywords', label: '🔑 Keyword Triggers' },
              { key: 'guide',    label: '📋 4-Step Guide'     },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as any)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: tab === t.key ? '#1a1a2e' : 'transparent',
                  color: tab === t.key ? '#e8e8f0' : '#5a5a7a',
                  border: tab === t.key ? '1px solid #2a2a3e' : '1px solid transparent',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* QUIZ TAB */}
        {tab === 'quiz' && (
          <div>
            {done ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">{score >= 7 ? '🏆' : score >= 5 ? '💪' : '📚'}</div>
                <h2 className="text-3xl font-black text-white mb-2">{score} / {QUIZ_QUESTIONS.length} Correct!</h2>
                <p className="text-[#7a7a9a] mb-8">
                  {score >= 7 ? 'Mast hai bhai! Pattern recognition strong hai 🔥'
                   : score >= 5 ? 'Achha hai! Thoda aur practice karo 💪'
                   : 'Koi baat nahi — keywords guide padho aur dubara try karo 📚'}
                </p>
                {wrongOnes.length > 0 && (
                  <div className="mb-8 p-5 rounded-2xl bg-[#0c0c15] border border-red-500/20 text-left max-w-md mx-auto">
                    <h3 className="text-sm font-bold text-red-400 mb-3">❌ Jo Galat Hue — Review Karo:</h3>
                    {wrongOnes.map(wi => (
                      <div key={wi} className="text-sm text-[#7a7a9a] mb-1">
                        • {QUIZ_QUESTIONS[wi].title} <span className="text-emerald-400">→ {QUIZ_QUESTIONS[wi].answer}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 justify-center flex-wrap">
                  <button onClick={handleReset} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all">
                    <RotateCcw className="w-4 h-4" /> Phir Se Try Karo
                  </button>
                  <button onClick={() => setTab('keywords')} className="px-6 py-3 rounded-xl border border-[#2a2a3e] text-[#7a7a9a] hover:text-white hover:bg-[#0f0f18] font-medium transition-all">
                    Keyword Guide Dekho →
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-[#5a5a7a]">Question {current + 1} / {QUIZ_QUESTIONS.length}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-40 h-1.5 bg-[#1a1a28] rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${(current / QUIZ_QUESTIONS.length) * 100}%` }} />
                    </div>
                    <span className="text-sm text-emerald-400 font-bold">{score} ✓</span>
                  </div>
                </div>

                <div className="bg-[#0c0c15] border border-[#1e1e2e] rounded-2xl p-6 mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: DIFF_STYLE[q.difficulty].bg, color: DIFF_STYLE[q.difficulty].text }}>
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-[#5a5a7a]">Kaunsa pattern use karoge?</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-4">{q.title}</h2>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#080810] border border-[#1e1e2e]">
                      <div className="text-xs text-[#5a5a7a] mb-1 font-semibold">📝 CONSTRAINTS</div>
                      <p className="text-xs text-[#8888a8] leading-relaxed">{q.constraints}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080810] border border-[#1e1e2e]">
                      <div className="text-xs text-[#5a5a7a] mb-1 font-semibold">⚡ EXAMPLE</div>
                      <p className="text-xs text-[#8888a8] font-mono leading-relaxed">{q.inputOutput}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs text-[#5a5a7a]">Keywords:</span>
                    {q.keywords.map(k => (
                      <span key={k} className="text-xs px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">"{k}"</span>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-5">
                  {q.options.map(opt => {
                    const isCorrect = opt === q.answer;
                    const isSelected = opt === selected;
                    let bg = '#0c0c15', border = '#1e1e2e', color = '#c8c8e8';
                    if (answered) {
                      if (isCorrect) { bg = 'rgba(16,185,129,0.12)'; border = '#10b981'; color = '#10b981'; }
                      else if (isSelected) { bg = 'rgba(239,68,68,0.12)'; border = '#ef4444'; color = '#ef4444'; }
                      else { bg = '#080810'; border = '#1a1a28'; color = '#3a3a4e'; }
                    }
                    return (
                      <button key={opt} onClick={() => handleSelect(opt)} disabled={answered}
                        className="flex items-center gap-3 p-4 rounded-xl border text-left transition-all"
                        style={{ backgroundColor: bg, borderColor: border, color }}
                      >
                        {answered && isCorrect && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
                        {answered && isSelected && !isCorrect && <XCircle className="w-4 h-4 flex-shrink-0" />}
                        {(!answered || (!isCorrect && !isSelected)) && <div className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: answered ? '#2a2a3e' : '#3a3a4e' }} />}
                        <span className="text-sm font-medium">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <div className="p-4 rounded-xl mb-5 border" style={{ backgroundColor: selected === q.answer ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderColor: selected === q.answer ? '#10b981' : '#ef4444' }}>
                    <div className="flex items-center gap-2 mb-2">
                      {selected === q.answer ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                      <span className="text-sm font-bold" style={{ color: selected === q.answer ? '#10b981' : '#ef4444' }}>
                        {selected === q.answer ? 'Sahi Jawab! 🎉' : `Galat — Answer hai: ${q.answer}`}
                      </span>
                    </div>
                    <p className="text-sm text-[#7a7a9a] leading-relaxed">{q.explanation}</p>
                  </div>
                )}

                {answered && (
                  <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500 text-white font-bold hover:bg-purple-400 transition-all">
                    {current < QUIZ_QUESTIONS.length - 1 ? 'Agla Question' : 'Result Dekho'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* KEYWORDS TAB */}
        {tab === 'keywords' && (
          <div>
            <p className="text-[#7a7a9a] text-sm mb-6">Problem mein ye words/phrases dikhein → turant pattern identify karo 🔑</p>
            <div className="space-y-3">
              {KEYWORD_TRIGGERS.map(({ pattern, color, triggers }) => (
                <div key={pattern} className="flex items-start gap-4 p-4 rounded-xl bg-[#0c0c15] border border-[#1e1e2e]">
                  <div className="text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0 min-w-[170px] text-center" style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}30` }}>
                    {pattern}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {triggers.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-[#0f0f18] border border-[#1e1e2e] text-[#7a7a9a] font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GUIDE TAB */}
        {tab === 'guide' && (
          <div className="space-y-6">
            <p className="text-[#7a7a9a] text-sm">Koi bhi problem mein ye 4 steps follow karo — pattern automatically clear ho jayega.</p>

            {[
              {
                num: '1', color: '#3b82f6', title: 'Constraints Check Karo', sub: 'n ki size se complexity decide hoti hai',
                content: (
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { range: 'n ≤ 20',    allow: 'O(2ⁿ) or O(n!)',    algos: 'Backtracking, Brute Force',  color: '#10b981' },
                      { range: '10³ – 10⁶', allow: 'O(n) or O(n log n)', algos: 'Two Pointers, DP, Heap',    color: '#f59e0b' },
                      { range: 'n ≥ 10⁷',   allow: 'O(log n) or O(1)',  algos: 'Binary Search, Math',       color: '#ef4444' },
                    ].map(c => (
                      <div key={c.range} className="p-4 rounded-xl bg-[#080810] border" style={{ borderColor: `${c.color}25` }}>
                        <div className="text-lg font-black mb-1" style={{ color: c.color }}>{c.range}</div>
                        <div className="text-xs text-[#5a5a7a] mb-2">Max: {c.allow}</div>
                        <div className="text-xs font-medium" style={{ color: c.color }}>→ {c.algos}</div>
                      </div>
                    ))}
                  </div>
                )
              },
              {
                num: '2', color: '#8b5cf6', title: 'Input Format Dekho', sub: 'Data structure type se pattern narrow hota hai',
                content: (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { icon: '🌳', type: 'Tree',        hint: 'DFS (paths), BFS (levels), BST (sorted)' },
                      { icon: '⬡', type: 'Graph',        hint: 'BFS (shortest), DFS (components), Topo (deps)' },
                      { icon: '▦', type: '2D Grid',      hint: 'DFS/BFS "island" pattern, 4-dir movement' },
                      { icon: '▤', type: 'Sorted Array', hint: 'Binary Search, Two Pointers' },
                      { icon: 'Aa',type: 'String',       hint: 'Sliding Window, Two Pointers, Trie' },
                      { icon: '⟳', type: 'Linked List',  hint: 'Fast/Slow pointers, Dummy node trick' },
                    ].map(inp => (
                      <div key={inp.type} className="flex items-start gap-3 p-3 rounded-xl bg-[#080810] border border-[#1e1e2e]">
                        <span className="text-xl flex-shrink-0">{inp.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-[#c8c8e8] mb-1">{inp.type}</div>
                          <div className="text-xs text-[#5a5a7a] leading-relaxed">{inp.hint}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              },
              {
                num: '3', color: '#f59e0b', title: 'Output Type Check Karo', sub: 'Return type se algorithm confirm hota hai',
                content: (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { type: 'List of Lists', eg: 'paths, subsets, combinations', pattern: 'Backtracking / DFS', color: '#f97316' },
                      { type: 'Single Value',  eg: 'max profit, min cost, #ways',  pattern: 'Dynamic Programming', color: '#ef4444' },
                      { type: 'Modified',      eg: 'in-place edits, reverse',       pattern: 'Two Pointers', color: '#10b981' },
                      { type: 'Ordered',       eg: 'sorted tasks, ranked items',    pattern: 'Heap / Topo Sort', color: '#f59e0b' },
                    ].map(out => (
                      <div key={out.type} className="p-4 rounded-xl bg-[#080810] border border-[#1e1e2e]">
                        <div className="font-bold text-white text-sm mb-0.5">{out.type}</div>
                        <div className="text-xs text-[#5a5a7a] mb-2 italic">{out.eg}</div>
                        <div className="text-xs font-bold" style={{ color: out.color }}>→ {out.pattern}</div>
                      </div>
                    ))}
                  </div>
                )
              },
              {
                num: '4', color: '#10b981', title: 'Keywords Scan Karo', sub: 'Magic words jo directly pattern point karte hain',
                content: (
                  <button onClick={() => setTab('keywords')} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium text-sm hover:bg-emerald-500/15 transition-all">
                    <Zap className="w-4 h-4" /> Full Keyword Table Dekho <ChevronRight className="w-4 h-4" />
                  </button>
                )
              },
            ].map(step => (
              <div key={step.num} className="bg-[#0c0c15] border border-[#1e1e2e] rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1e1e2e] bg-[#0f0f18]">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black" style={{ backgroundColor: `${step.color}15`, border: `1px solid ${step.color}30`, color: step.color }}>{step.num}</span>
                  <div>
                    <h3 className="font-bold text-white">{step.title}</h3>
                    <p className="text-xs text-[#5a5a7a]">{step.sub}</p>
                  </div>
                </div>
                <div className="p-5">{step.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}