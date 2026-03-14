'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { useProgressStore } from '@/store/useProgressStore';
import { ALL_QUESTION_STUBS } from '@/app/data/questions';
import { BarChart2, RotateCcw, ChevronRight } from 'lucide-react';

const PATTERN_META: Record<string, { icon: string; color: string; name: string }> = {
  'sliding-window':      { icon: '🪟', color: '#10b981', name: 'Sliding Window' },
  'two-pointers':        { icon: '👆', color: '#f59e0b', name: 'Two Pointers' },
  'binary-search':       { icon: '🔍', color: '#6366f1', name: 'Binary Search' },
  'fast-slow-pointers':  { icon: '⚡', color: '#ec4899', name: 'Fast & Slow Pointers' },
  'merge-intervals':     { icon: '📅', color: '#14b8a6', name: 'Merge Intervals' },
  'cyclic-sort':         { icon: '🔄', color: '#f97316', name: 'Cyclic Sort' },
  'dfs':                 { icon: '🌲', color: '#22c55e', name: 'DFS' },
  'bfs':                 { icon: '🌊', color: '#3b82f6', name: 'BFS' },
  'topological-sort':    { icon: '📊', color: '#8b5cf6', name: 'Topological Sort' },
  'heap':                { icon: '⛰️', color: '#ef4444', name: 'Heap / Priority Queue' },
  'subsets':             { icon: '🌿', color: '#06b6d4', name: 'Subsets / Backtracking' },
  'dynamic-programming': { icon: '🧠', color: '#a855f7', name: 'Dynamic Programming' },
  'bit-manipulation':    { icon: '🔢', color: '#64748b', name: 'Bit Manipulation' },
  'trie':                { icon: '🔤', color: '#0ea5e9', name: 'Trie' },
  'graph':               { icon: '🕸️', color: '#d946ef', name: 'Graph Algorithms' },
};

const MOTIVATIONAL = [
  { min: 0,   msg: 'Shuru kar diya! 🌱 Ek ek question mein power hai.', color: '#64748b' },
  { min: 10,  msg: 'Achha chal rahe ho! 💪 Pattern samajh aa raha hai?', color: '#10b981' },
  { min: 30,  msg: 'Solid progress! 🔥 Ab patterns automatic dikh rahe honge.', color: '#f59e0b' },
  { min: 75,  msg: 'Bahut acha! 🚀 Tum top 20% mein ho.', color: '#6366f1' },
  { min: 150, msg: 'Outstanding! ⭐ LeetCode master banne ki raah pe ho.', color: '#8b5cf6' },
  { min: 300, msg: 'Legendary! 🏆 450 ka target nazdik aa raha hai!', color: '#ef4444' },
];

const DIFF_C: Record<string, string> = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };

export default function DashboardPage() {
  const { totalSolved, easySolved, mediumSolved, hardSolved, solvedQuestions, attemptedQuestions, patternStats, resetProgress } = useProgressStore();

  const totalAttempted = attemptedQuestions.length;
  const totalQ = ALL_QUESTION_STUBS.length;

  const motivMsg = [...MOTIVATIONAL].reverse().find(m => totalSolved >= m.min) ?? MOTIVATIONAL[0];

  const patternBreakdown = useMemo(() => {
    // Build from ALL_QUESTION_STUBS — covers all 15 patterns
    const patternMap: Record<string, { id:string; count:number }> = {};
    for (const q of ALL_QUESTION_STUBS) {
      if (!patternMap[q.patternId]) patternMap[q.patternId] = { id: q.patternId, count: 0 };
      patternMap[q.patternId].count++;
    }
    return Object.values(patternMap).map(p => {
      const meta = PATTERN_META[p.id] ?? { icon: '📌', color: '#64748b', name: p.id };
      const stats = patternStats[p.id] ?? { solved: 0, attempted: 0 };
      return { ...meta, id: p.id, total: p.count, solved: stats.solved, attempted: stats.attempted };
    }).sort((a, b) => b.solved - a.solved);
  }, [patternStats]);

  const recentSolved = useMemo(() => [...solvedQuestions].reverse().slice(0, 5).map(id => ALL_QUESTION_STUBS.find(q => q.id === id)).filter(Boolean), [solvedQuestions]);

  const recommended = useMemo(() => {
    const s = new Set(solvedQuestions);
    return ALL_QUESTION_STUBS.filter(q => !s.has(q.id))
      .sort((a, b) => { const o = { Easy: 0, Medium: 1, Hard: 2 }; return (o[a.difficulty as keyof typeof o] ?? 1) - (o[b.difficulty as keyof typeof o] ?? 1); })
      .slice(0, 6);
  }, [solvedQuestions]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Header */}
      <div style={{ padding: '20px 28px 16px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-bg)', border: '1px solid var(--accent-bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart2 size={20} color="var(--accent)" />
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: 'var(--tx-1)', margin: 0 }}>📊 My Progress Dashboard</h1>
            <p style={{ fontSize: 13, color: 'var(--tx-3)', margin: 0 }}>Tumhara real DSA journey — solved, attempted, patterns covered</p>
          </div>
        </div>
        <button onClick={resetProgress} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #ef444440', background: '#ef444410', color: '#ef4444', cursor: 'pointer', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
          <RotateCcw size={13} /> Reset Progress
        </button>
      </div>

      <div style={{ padding: '24px 28px', maxWidth: 1100, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Motivational banner */}
        <div style={{ padding: '14px 20px', background: motivMsg.color + '15', borderRadius: 12, border: `1px solid ${motivMsg.color}40`, fontSize: 15, fontWeight: 700, color: motivMsg.color }}>
          {motivMsg.msg}
          {totalSolved === 0 && <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--tx-2)', marginLeft: 8 }}>— <Link href="/practice" style={{ color: 'var(--accent)' }}>Practice pe jaao aur shuru karo! 💪</Link></span>}
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
          {[
            { label: 'Total Solved', val: totalSolved, total: totalQ, color: '#10b981', icon: '✅' },
            { label: 'Attempted', val: totalAttempted, total: totalQ, color: '#f59e0b', icon: '🔄' },
            { label: 'Easy', val: easySolved, total: 150, color: '#10b981', icon: '🟢' },
            { label: 'Medium', val: mediumSolved, total: 225, color: '#f59e0b', icon: '🟡' },
            { label: 'Hard', val: hardSolved, total: 75, color: '#ef4444', icon: '🔴' },
            { label: 'Completion', val: Math.round((totalSolved / totalQ) * 100), total: 100, color: '#8b5cf6', icon: '📈', pct: true },
          ].map((s, i) => (
            <div key={i} style={{ padding: '14px 16px', background: 'var(--bg-surface)', borderRadius: 14, border: `1px solid ${s.color}30` }}>
              <div style={{ fontSize: 20 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.color, lineHeight: 1.2, marginTop: 4 }}>{s.val}{s.pct ? '%' : ''}</div>
              <div style={{ fontSize: 11, color: 'var(--tx-3)', marginTop: 2, fontWeight: 600 }}>{s.label}{!s.pct ? ` / ${s.total}` : ''}</div>
              <div style={{ marginTop: 8, height: 3, borderRadius: 2, background: 'var(--bg-elevated)', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 2, background: s.color, width: `${Math.min(100, Math.round((s.val / s.total) * 100))}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Overall bar */}
        <div style={{ padding: '18px 22px', background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14, fontWeight: 800, color: 'var(--tx-1)' }}>
            <span>🎯 Overall: {totalSolved} / {totalQ} questions solved</span>
            <span style={{ color: 'var(--tx-3)', fontWeight: 400, fontSize: 13 }}>{totalQ - totalSolved} baaki</span>
          </div>
          <div style={{ height: 18, borderRadius: 9, background: 'var(--bg-elevated)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${Math.min(100, ((totalSolved + totalAttempted) / totalQ) * 100)}%`, background: '#f59e0b30', borderRadius: 9 }} />
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${Math.min(100, (totalSolved / totalQ) * 100)}%`, background: 'linear-gradient(90deg, #10b981, #06b6d4)', borderRadius: 9, transition: 'width 0.5s' }} />
          </div>
          <div style={{ display: 'flex', gap: 18, marginTop: 8, fontSize: 12 }}>
            {[['#10b981', `Solved (${totalSolved})`], ['#f59e0b', `Attempted (${totalAttempted})`], ['var(--border)', `Not Started (${totalQ - totalSolved - totalAttempted})`]].map(([c, l]) => (
              <span key={l} style={{ color: 'var(--tx-3)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: 'inline-block', border: c === 'var(--border)' ? '1px solid var(--border)' : 'none' }} />{l}
              </span>
            ))}
          </div>
        </div>

        {/* Pattern breakdown */}
        <div style={{ padding: '18px 22px', background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--tx-1)', marginBottom: 16 }}>🗂️ Pattern-wise Progress</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {patternBreakdown.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Link href={`/patterns/${p.id}`} style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 210, textDecoration: 'none' }}>
                  <span style={{ fontSize: 16 }}>{p.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: p.color }}>{p.name}</span>
                </Link>
                <div style={{ flex: 1, height: 10, borderRadius: 5, background: 'var(--bg-elevated)', overflow: 'hidden', position: 'relative' }}>
                  {p.attempted > 0 && <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${Math.min(100, ((p.solved + p.attempted) / p.total) * 100)}%`, background: '#f59e0b30', borderRadius: 5 }} />}
                  <div style={{ height: '100%', borderRadius: 5, background: p.color, width: `${(p.solved / p.total) * 100}%`, transition: 'width 0.5s' }} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--tx-3)', minWidth: 60, textAlign: 'right', fontFamily: 'monospace' }}>
                  <span style={{ color: p.color, fontWeight: 700 }}>{p.solved}</span>/{p.total}
                </div>
                <Link href={`/patterns/${p.id}`} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 8, background: p.color + '15', color: p.color, border: `1px solid ${p.color}30`, textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>Practice →</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent + Next */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ padding: '18px 20px', background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--tx-1)', marginBottom: 14 }}>✅ Recent Solved ({totalSolved})</div>
            {recentSolved.length === 0
              ? <div style={{ fontSize: 13, color: 'var(--tx-4)', textAlign: 'center', padding: '20px 0' }}>Abhi koi solve nahi hua. <Link href="/practice" style={{ color: 'var(--accent)' }}>Shuru karo →</Link></div>
              : recentSolved.map((q, i) => q && (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < recentSolved.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: (DIFF_C[q.difficulty] ?? '#10b981') + '20', color: DIFF_C[q.difficulty] ?? '#10b981', fontWeight: 700, flexShrink: 0 }}>{q.difficulty}</span>
                  <Link href={`/practice/${q.id}`} style={{ fontSize: 13, color: 'var(--tx-1)', textDecoration: 'none', flex: 1, fontWeight: 600 }}>#{q.id} {q.title}</Link>
                  <span style={{ fontSize: 14 }}>{PATTERN_META[q.patternId]?.icon}</span>
                </div>
              ))}
          </div>
          <div style={{ padding: '18px 20px', background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--tx-1)', marginBottom: 14 }}>🎯 Aage Karo — Next Questions</div>
            {recommended.length === 0
              ? <div style={{ fontSize: 14, color: '#10b981', fontWeight: 700, textAlign: 'center', padding: '20px 0' }}>🎉 Sab 450 solve! Legend!</div>
              : recommended.map((q, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < recommended.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: (DIFF_C[q.difficulty] ?? '#10b981') + '20', color: DIFF_C[q.difficulty] ?? '#10b981', fontWeight: 700, flexShrink: 0 }}>{q.difficulty}</span>
                  <Link href={`/practice/${q.id}`} style={{ fontSize: 13, color: 'var(--tx-1)', textDecoration: 'none', flex: 1, fontWeight: 600 }}>#{q.id} {q.title}</Link>
                  <span style={{ fontSize: 10, color: PATTERN_META[q.patternId]?.color ?? 'var(--tx-4)', background: (PATTERN_META[q.patternId]?.color ?? '#64748b') + '18', padding: '2px 6px', borderRadius: 5, fontWeight: 700, flexShrink: 0 }}>{PATTERN_META[q.patternId]?.icon}</span>
                  <ChevronRight size={12} color="var(--tx-4)" />
                </div>
              ))}
            <Link href="/practice" style={{ display: 'block', textAlign: 'center', marginTop: 12, fontSize: 12, color: 'var(--accent)', fontWeight: 700, textDecoration: 'none', padding: '7px', borderRadius: 8, background: 'var(--accent-bg)', border: '1px solid var(--accent-bdr)' }}>→ Sab 450 questions</Link>
          </div>
        </div>

        {/* Quick nav */}
        <div style={{ padding: '16px 20px', background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--tx-1)', marginBottom: 12 }}>🔗 Quick Navigate</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[['💻 Practice', '/practice', '#10b981'], ['🧠 Trainer', '/pattern-recognition', '#8b5cf6'], ['⚡ Cheat Sheet', '/cheatsheet', '#f59e0b'], ['📖 Algorithms', '/algorithms', '#6366f1'], ['🎯 Interview', '/interview', '#ef4444'], ['📊 Visualize', '/visualizers', '#06b6d4']].map(([l, h, c]) => (
              <Link key={h} href={h} style={{ padding: '9px 16px', borderRadius: 10, background: c + '15', border: `1px solid ${c}30`, color: c, textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
