import React, { useState } from 'react';
import { getGen } from '../data/gens';

const CONSTRAINTS = [
  { num:1,  range:'N ≤ 20',       color:'#22c55e', bg:'#052011', bd:'#0d3320',
    bullets:['Brute force kaam karega','Backtracking strong clue hai','Bitmask DP feasible hai','Subsets / permutations sab try karo'],
    note:'Decision tree banao — choose/skip. 2²⁰ ≈ 1 million, manageable.',
    pats:['Backtracking','Subsets','Dynamic Programming'] },
  { num:2,  range:'N ≤ 100',      color:'#f59e0b', bg:'#1a1000', bd:'#3a2400',
    bullets:['O(n³) bhi chal sakta hai','Triple loops ok hain','Small state spaces manageable','Direct simulation try karo pehle'],
    note:'3 nested loops = O(n³) = 10⁶ ops for n=100. Fine.',
    pats:['Dynamic Programming','Backtracking','Two Pointers'] },
  { num:3,  range:'N ≤ 1,000',    color:'#f59e0b', bg:'#1a1000', bd:'#3a2400',
    bullets:['O(n²) often fine hai','DP tables realistic ho jaate hain','BFS / DFS usually safe','Compare pairs if needed'],
    note:'O(n²) = 10⁶ ops. 2D DP table = 1000×1000, fits in memory.',
    pats:['Dynamic Programming','Two Pointers','Tree Breadth-First Search'] },
  { num:4,  range:'N ≤ 10⁵',      color:'#ef4444', bg:'#1a0505', bd:'#3a0d0d',
    bullets:['O(n log n) ya O(n) aim karo','Sorting, heaps, hashmaps use karo','Prefix sum kaam aata hai','Quadratic scans avoid karo'],
    note:'O(n²) = 10¹⁰ → TLE. O(n log n) = ~1.7M ops.',
    pats:['Binary Search','Heaps','Top K Elements','HashMaps','Prefix Sum','Sliding Window'] },
  { num:5,  range:'N ≤ 10⁶',      color:'#ef4444', bg:'#1a0505', bd:'#3a0d0d',
    bullets:['O(n) mostly','One-pass scans ideal hain','Watch time aur memory','Counting / prefix prefer karo'],
    note:'Single loop = 10⁶ ops ≈ 1ms. Extra loop = TLE.',
    pats:['Two Pointers','Sliding Window','Prefix Sum','Cyclic Sort','HashMaps'] },
  { num:6,  range:'Sorted Input',  color:'#818cf8', bg:'#0e0e1a', bd:'#22224a',
    bullets:['Binary Search sochna shuru karo','Two Pointers common hai','Order already help kar raha hai','left, mid, right use karo'],
    note:'Sorted = order se info milti hai. Eliminate half each step.',
    pats:['Binary Search','Two Pointers','K-way merge'] },
  { num:7,  range:'Many Queries',  color:'#818cf8', bg:'#0e0e1a', bd:'#22224a',
    bullets:['Prefix sum for static ranges','Segment tree for updates','Fenwick tree lighter hai','Precompute instead of recomputing'],
    note:'Q queries × O(n) = TLE. Precompute O(n) → answer O(1).',
    pats:['Prefix Sum','Segment Trees'] },
  { num:8,  range:'Tree with N Nodes', color:'#22c55e', bg:'#052011', bd:'#0d3320',
    bullets:['DFS / BFS se start karo','Subtrees pe recurse karo','Parent-child relation clue hai','Tree DP if children matter'],
    note:'Tree = connected acyclic graph. DFS = deep. BFS = levels.',
    pats:['Tree Depth-First Search','Tree Breadth-First Search','Dynamic Programming'] },
  { num:9,  range:'Weighted Graph', color:'#22c55e', bg:'#052011', bd:'#0d3320',
    bullets:['Dijkstra sochna shuru karo','Distances matter karte hain','Adjacency list + min heap','Plain BFS enough nahi'],
    note:'Weighted = edges ka cost alag. BFS only for unweighted.',
    pats:['Graphs','Heaps'] },
  { num:10, range:'Unweighted Shortest', color:'#22c55e', bg:'#052011', bd:'#0d3320',
    bullets:['BFS default choice hai','Level by level solve karo','First reach = shortest path','Queue + visited enough'],
    note:'Unweighted = sab edges equal. BFS level = distance.',
    pats:['Tree Breadth-First Search','Graphs'] },
  { num:11, range:'Need Top K',    color:'#f59e0b', bg:'#1a1000', bd:'#3a2400',
    bullets:['Heap use karo','Min heap for top K largest','Max heap for repeated extracts','Quickselect for just the Kth'],
    note:'Size K ka min-heap maintain karo. O(n log k).',
    pats:['Top K Elements','Heaps','K-way merge'] },
  { num:12, range:'Need Frequency', color:'#f59e0b', bg:'#1a1000', bd:'#3a2400',
    bullets:['HashMap use karo','Count first, answer later','Duplicates aur majority great','Key → frequency pattern'],
    note:'element → count. O(1) insert + lookup.',
    pats:['HashMaps','Sliding Window','Top K Elements'] },
  { num:13, range:'All Possibilities', color:'#818cf8', bg:'#0e0e1a', bd:'#22224a',
    bullets:['Backtracking clue hai','Choose, explore, undo','Subsets / permutations generate','Decision trees mein sochna'],
    note:'Har choice pe 2 options. Undo (backtrack) when stuck.',
    pats:['Backtracking','Subsets','Dynamic Programming'] },
  { num:14, range:'Min/Max Over Choices', color:'#ef4444', bg:'#1a0505', bd:'#3a0d0d',
    bullets:['Strong DP signal','State, transition, base case define karo','Overlapping subproblems dhundho','Memoization ya tabulation'],
    note:'f(i) = min/max of f(i-1), f(i-2)... = DP.',
    pats:['Dynamic Programming','Greedy Programming'] },
];

const QUIZ = [
  { constraint:'n ≤ 10⁵', keywords:'contiguous subarray with max sum', hint:'n bada — O(n) chahiye. Contiguous = consecutive elements.',
    answer:'Kadane\'s / Sliding Window', explanation:'n = 10⁵ → O(n). Subarray = consecutive. Kadane\'s = ek pass.', pats:['Dynamic Programming','Sliding Window'] },
  { constraint:'n ≤ 10⁶', keywords:'find if duplicate exists', hint:'n bahut bada — O(n) only. Frequency count.',
    answer:'HashMap / HashSet', explanation:'10⁶ elements. Set mein O(1) check.', pats:['HashMaps'] },
  { constraint:'n ≤ 18', keywords:'minimum cost to visit all cities', hint:'n ≤ 20 → exponential chalega. Sab cities visit.',
    answer:'Bitmask DP', explanation:'2¹⁸ = 262,144 states. O(n² × 2ⁿ).', pats:['Dynamic Programming','Backtracking'] },
  { constraint:'n ≤ 10⁵, sorted', keywords:'find target in sorted array', hint:'Sorted + better than O(n) possible.',
    answer:'Binary Search', explanation:'Sorted → middle → eliminate half. O(log n). 17 steps max!', pats:['Binary Search'] },
  { constraint:'k queries, n array', keywords:'sum between index L and R', hint:'Per query O(n) = TLE. Precompute karo.',
    answer:'Prefix Sum', explanation:'O(n) precompute. O(1) per query.', pats:['Prefix Sum'] },
];

export default function ConstraintsPage({ setCurPat, setPage }) {
  const [tab, setTab] = useState('learn');
  const [revealed, setRevealed] = useState({});

  const jumpTo = (p) => { setCurPat(p); setPage('practice'); };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Sub-nav */}
      <div className="flex border-b border-[#e4e2db] bg-white flex-shrink-0 px-4">
        {[['learn','📖 Pehle Seekho'],['ref','⚡ Cheat Sheet']].map(([val,label]) => (
          <button
            key={val}
            onClick={() => setTab(val)}
            className={`h-10 px-4 text-[12px] font-medium border-b-2 transition-colors
              ${tab === val ? 'text-[#1c1b19] border-[#1c1b19]' : 'text-[#aaa] border-transparent hover:text-[#1c1b19]'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* ── LEARN TAB ── */}
        {tab === 'learn' && (
          <div className="max-w-[700px] mx-auto px-6 py-6 pb-16 space-y-5">

            {/* Intro */}
            <div>
              <h1 className="font-serif text-2xl text-[#1c1b19] mb-1">Constraints Padhna Seekho</h1>
              <p className="text-[13px] text-[#7a7870]">Pehle constraints dekho — solution space narrow ho jaata hai code se pehle.</p>
            </div>

            {/* Step 1 */}
            <div className="bg-white rounded-xl border border-[#e4e2db] p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-1">Step 1</div>
              <h2 className="text-[15px] font-semibold text-[#1c1b19] mb-3">Constraint hota kya hai?</h2>
              <p className="text-[13px] text-[#7a7870] leading-7 mb-3">
                Har LeetCode problem mein <strong className="text-[#1c1b19]">Constraints box</strong> hota hai — yeh numbers batate hain ki input kitna bada ho sakta hai.
              </p>
              <div className="bg-[#1c1b19] rounded-xl p-4 mb-3 font-mono text-[12px] leading-7">
                <span className="text-[#555]">Example problem constraints:</span>{'\n'}
                <span className="text-[#9FE1CB]">• 2 ≤ </span><strong className="text-white">n ≤ 10⁵</strong>
                <span className="text-[#555]">    ← yeh hai constraint</span>{'\n'}
                <span className="text-[#9FE1CB]">• -10⁹ ≤ nums[i] ≤ 10⁹</span>{'\n'}
                <span className="text-[#9FE1CB]">• -10⁹ ≤ target ≤ 10⁹</span>
              </div>
              <div className="bg-[#E6F1FB] border border-[#B5D4F4] rounded-lg p-3 text-[12px] text-[#1c1b19] leading-relaxed">
                💡 <code className="font-mono bg-white px-1 rounded border border-[#B5D4F4]">n ≤ 10⁵</code> matlab maximum 1,00,000 elements. Isse decide hota hai kaunsa algorithm chalega.
              </div>
            </div>

            {/* Step 2 — Ops table */}
            <div className="bg-white rounded-xl border border-[#e4e2db] p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-1">Step 2</div>
              <h2 className="text-[15px] font-semibold text-[#1c1b19] mb-3">Kyun padhte hain?</h2>
              <p className="text-[13px] text-[#7a7870] mb-3">Computer ek second mein ~<strong className="text-[#1c1b19]">10⁸ operations</strong> kar sakta hai.</p>
              <div className="overflow-x-auto rounded-xl border border-[#e4e2db]">
                <table className="w-full text-[12px] border-collapse">
                  <thead className="bg-[#f2f0eb]">
                    <tr>
                      {['n (input size)','Max complexity','Reason'].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-[#7a7870]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['n ≤ 20',    'O(2ⁿ) ya O(n!)','2²⁰ = 1M — ok','green'],
                      ['n ≤ 1,000', 'O(n²)',          '10⁶ ops — ok','green'],
                      ['n ≤ 10⁵',  'O(n log n)',      '1.7M ops — ok, O(n²)=TLE','yellow'],
                      ['n ≤ 10⁶',  'O(n) only',       'O(n log n) bhi slow','red'],
                      ['n ≤ 10⁸',  'O(log n) ya O(1)','Loop bhi nahi chalta','red'],
                    ].map(([n,cx,reason,color]) => (
                      <tr key={n} className={`hover:bg-[#f7f5f0] transition-colors border-b border-[#e4e2db] last:border-0
                        ${color==='green'?'bg-white':''}
                        ${color==='yellow'?'bg-[#FAEEDA]/20':''}
                        ${color==='red'?'bg-[#FCEBEB]/20':''}`}>
                        <td className="px-3 py-2 font-mono font-bold text-[#1c1b19]">{n}</td>
                        <td className={`px-3 py-2 font-mono font-bold
                          ${color==='green'?'text-[#0F6E56]':color==='yellow'?'text-[#854F0B]':'text-[#A32D2D]'}`}>{cx}</td>
                        <td className="px-3 py-2 text-[#7a7870]">{reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Step 3 — Process */}
            <div className="bg-white rounded-xl border border-[#e4e2db] p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-1">Step 3</div>
              <h2 className="text-[15px] font-semibold text-[#1c1b19] mb-3">Sochne ka process</h2>
              <div className="space-y-2">
                {[
                  ['#185FA5','1','n ki value dekho','Constraints box mein n ≤ ??? dhundho.'],
                  ['#0F6E56','2','Max complexity decide','n=10⁵ → O(n log n) tak. n=10⁶ → O(n) only.'],
                  ['#854F0B','3','Keywords dekho','"subarray" → Sliding Window. "sorted" → BS. "all possibilities" → Backtracking.'],
                  ['#534AB7','4','Pattern narrow karo','n=10⁵ + "subarray" = Sliding Window. Dono clues milao.'],
                ].map(([color, num, title, desc]) => (
                  <div key={num} className="flex items-start gap-3 p-3 rounded-xl bg-[#f7f5f0] border border-[#e4e2db]">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[13px] font-black flex-shrink-0"
                      style={{ background: color }}>{num}</div>
                    <div>
                      <div className="text-[13px] font-semibold text-[#1c1b19] mb-0.5">{title}</div>
                      <div className="text-[12px] text-[#7a7870]">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4 — Quiz */}
            <div className="bg-white rounded-xl border border-[#e4e2db] p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-1">Practice</div>
              <h2 className="text-[15px] font-semibold text-[#1c1b19] mb-3">Pattern guess karo</h2>
              <div className="space-y-3">
                {QUIZ.map((q, i) => (
                  <div key={i} className="border border-[#e4e2db] rounded-xl overflow-hidden">
                    <div className="p-3">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded bg-[#f2f0eb] border border-[#e4e2db] flex items-center justify-center text-[10px] font-bold text-[#7a7870] flex-shrink-0">{i+1}</div>
                        <div className="flex-1">
                          <div className="text-[10px] text-[#aaa] mb-0.5">Constraint:</div>
                          <div className="font-mono text-[13px] font-bold text-[#1c1b19] mb-1.5">{q.constraint}</div>
                          <div className="text-[12px] text-[#aaa] mb-1">Problem:</div>
                          <div className="text-[13px] text-[#1c1b19] mb-2">"{q.keywords}"</div>
                          <div className="text-[11px] text-[#aaa] italic px-2.5 py-2 bg-[#f7f5f0] rounded-lg border-l-2 border-[#d0cec7]">Hint: {q.hint}</div>
                        </div>
                      </div>
                    </div>
                    {!revealed[i]
                      ? <button onClick={() => setRevealed(r => ({...r,[i]:true}))}
                          className="w-full py-2 text-[12px] font-medium text-[#7a7870] border-t border-[#e4e2db] hover:bg-[#f7f5f0] transition-colors">
                          Reveal Answer →
                        </button>
                      : <div className="p-3 bg-[#052011] border-t border-[#0d3320]">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#22c55e] mb-1">✓ Answer</div>
                          <div className="text-[13px] font-semibold text-[#e2e0d8] mb-1.5">{q.answer}</div>
                          <div className="text-[12px] text-[#888] mb-2.5 leading-relaxed">{q.explanation}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {q.pats.map(p => { const g = getGen(p); return (
                              <button key={p} onClick={() => jumpTo(p)}
                                className="px-2.5 py-1 rounded-full text-[10px] font-semibold border"
                                style={{ background: g.bg, borderColor: g.bd, color: g.color }}>
                                {p} →
                              </button>
                            );})}
                          </div>
                        </div>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CHEAT SHEET TAB ── */}
        {tab === 'ref' && (
          <div className="max-w-[900px] mx-auto px-5 py-5 pb-16">
            <div className="text-center mb-5">
              <h1 className="font-serif text-2xl text-[#1c1b19] mb-1">How To <em className="italic text-[#185FA5]">Read Constraints</em></h1>
              <p className="text-[13px] text-[#aaa]">Constraint dekho → Pattern pehchaano → Code karo</p>
            </div>
            <div className="p-3 bg-[#E6F1FB] border border-[#B5D4F4] rounded-xl text-[12px] text-[#1c1b19] mb-5 leading-relaxed">
              💡 <strong>Rule #1:</strong> Constraints pehle dekho — solution space narrow ho jaata hai. Pattern pe click karo → Practice mein jump.
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))' }}>
              {CONSTRAINTS.map(c => (
                <div key={c.num}
                  className="rounded-xl p-4 border transition-transform hover:-translate-y-0.5"
                  style={{ background: c.bg, borderColor: c.bd }}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-[26px] h-[26px] rounded-lg flex items-center justify-center text-[12px] font-black text-black flex-shrink-0"
                      style={{ background: c.color }}>{c.num}</div>
                    <div className="font-mono text-[15px] font-bold" style={{ color: c.color }}>{c.range}</div>
                  </div>
                  <div className="space-y-1.5 mb-3">
                    {c.bullets.map((b,i) => (
                      <div key={i} className="flex items-start gap-2 text-[12px] text-[#d4d2ca] leading-relaxed">
                        <span style={{ color: c.color }} className="flex-shrink-0 mt-0.5">→</span>{b}
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] text-[#888] italic px-2 py-1.5 bg-white/5 rounded-lg mb-3 leading-relaxed">{c.note}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1.5">Patterns to consider</div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.pats.map(p => { const g = getGen(p); return (
                      <button key={p} onClick={() => jumpTo(p)}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-all hover:brightness-90"
                        style={{ background: g.bg, borderColor: g.bd, color: g.color }}>{p}</button>
                    );})}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
