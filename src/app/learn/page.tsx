'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  CORE_QUESTIONS, CORE_BY_PATTERN, CORE_BY_TYPE,
  TYPE_ORDER, TYPE_NAMES, type CoreQuestion,
} from '@/lib/coreQuestions';
import { ChevronRight, ExternalLink, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

// ─── Pattern config ──────────────────────────────────────────────
const P: Record<string, { icon: string; color: string; name: string; desc: string }> = {
  'sliding-window': { icon: '🪟', color: '#10b981', name: 'Sliding Window', desc: 'Array/string mein moving window track karo' },
  'two-pointers':   { icon: '👆', color: '#f59e0b', name: 'Two Pointers',   desc: 'Do pointers se search space reduce karo' },
  'binary-search':  { icon: '🔍', color: '#6366f1', name: 'Binary Search',  desc: 'Har step mein search space half karo' },
};
const DIFF_C: Record<string, string> = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };
const patternIds = Object.keys(CORE_BY_PATTERN);

// ─── Universal Framework ─────────────────────────────────────────
const FRAMEWORK = [
  { num:1, color:'#6366f1', title:'Question padhte waqt', body:'Pura ek baar padho. Keywords underline karo. Examples manually trace karo (pen se).' },
  { num:2, color:'#f59e0b', title:'Constraint dekho', body:'n ki value → allowed complexity decide hoti hai. n≤10⁵ = O(n). n≤10³ = O(n²). n≤20 = O(2ⁿ).' },
  { num:3, color:'#10b981', title:'n ki value → pattern socho', body:'Constraint se pattern narrow karo PEHLE kuch aur socho. n bada = fast algo. n chhota = slow algo ok.' },
  { num:4, color:'#8b5cf6', title:'Input type dekho', body:'Sorted? → BS ya TP. Array/String? → SW. Linked List? → Fast-Slow. Graph/Grid? → BFS/DFS.' },
  { num:5, color:'#ec4899', title:'Keywords dhundho (question mein)', body:'Actual problem text mein words: "longest","minimum","exactly k","sorted","permutation","cycle". Ye words pattern confirm karte hain.' },
  { num:6, color:'#06b6d4', title:'Output type dekho', body:'Single value = aggregate/DP. Boolean = validation. List of elements = collect. Indices = track start/end.' },
  { num:7, color:'#ef4444', title:'Brute force socho', body:'Naivest approach kya hoga? Nested loops? Sab combinations try karo? Ye socho taki improvement measure ho sake.' },
  { num:8, color:'#f97316', title:'Optimize karo', body:'Brute force ki redundancy kya hai? Kya kuch baar baar calculate ho raha hai? Pattern use karo → O(n²) → O(n).' },
];

// ─── Question methodology tab component ──────────────────────────
function QuestionDetail({ q, color }: { q: CoreQuestion; color: string }) {
  const [tab, setTab] = useState(0);

  const TABS = [
    { label: '📖 Kaise Padhein', id: 0 },
    { label: '🎯 Pattern Kyu', id: 1 },
    { label: '⚡ Solve Karo', id: 2 },
    { label: '💻 Code', id: 3 },
  ];

  return (
    <div style={{ background: 'var(--bg-surface)', borderRadius: 16, border: `1px solid ${color}30`, overflow: 'hidden' }}>
      {/* Question header */}
      <div style={{ padding: '16px 22px', background: color + '08', borderBottom: `1px solid ${color}20` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20, background: (DIFF_C[q.difficulty] ?? '#10b981') + '20', color: DIFF_C[q.difficulty] ?? '#10b981' }}>{q.difficulty}</span>
          <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: color + '18', color, border: `1px solid ${color}35`, fontWeight: 700 }}>{q.typeName}</span>
          <a href={q.lcUrl} target="_blank" rel="noopener" style={{ marginLeft: 'auto', fontSize: 11, color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
            <ExternalLink size={11} /> #{q.lcNum} LeetCode ↗
          </a>
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 900, color: 'var(--tx-1)', margin: 0 }}>#{q.lcNum}. {q.title}</h3>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg-elevated)' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '9px 4px', background: 'transparent', border: 'none', cursor: 'pointer',
            fontSize: 11, fontWeight: 700,
            color: tab === t.id ? color : 'var(--tx-4)',
            borderBottom: tab === t.id ? `2px solid ${color}` : '2px solid transparent',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: '18px 22px' }}>

        {/* ── TAB 0: How to Read ── */}
        {tab === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Block color="#6366f1" title="Step 1 — Question mein kya dhundho" content={
              <div>
                <p style={{ margin: '0 0 10px', color: 'var(--tx-2)', lineHeight: 1.8 }}>{q.howToRead}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {q.keywords.map((kw, i) => (
                    <span key={i} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 6, background: '#6366f112', color: '#6366f1', border: '1px solid #6366f130', fontStyle: 'italic', fontWeight: 700 }}>"{kw}"</span>
                  ))}
                </div>
                <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 8, fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7 }}>
                  💬 <strong>Ye keywords dikh jaayein to kya sochein:</strong> {q.keywordKyu}
                </div>
              </div>
            } />
            <Block color="#f59e0b" title="Step 2 — Constraint dekho" content={
              <div>
                <div style={{ fontFamily: 'monospace', fontWeight: 900, color: '#f59e0b', fontSize: 15, marginBottom: 8 }}>{q.constraintAnalysis}</div>
                <p style={{ margin: 0, color: 'var(--tx-2)', lineHeight: 1.8 }}>{q.constraintKyu}</p>
              </div>
            } />
            <Block color="#10b981" title="Step 3 — Input / Output samjho" content={
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ padding: '12px 14px', background: '#10b98110', borderRadius: 10, border: '1px solid #10b98125' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#10b981', marginBottom: 6 }}>📥 INPUT</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx-1)', marginBottom: 4 }}>{q.inputSignal}</div>
                  <div style={{ fontSize: 12, color: 'var(--tx-3)', lineHeight: 1.6 }}>{q.inputKyu}</div>
                </div>
                <div style={{ padding: '12px 14px', background: '#6366f110', borderRadius: 10, border: '1px solid #6366f125' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#6366f1', marginBottom: 6 }}>📤 OUTPUT</div>
                  <div style={{ fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.6 }}>{q.outputSignal}</div>
                </div>
              </div>
            } />
          </div>
        )}

        {/* ── TAB 1: Pattern Kyu ── */}
        {tab === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Block color="#f59e0b" title="Constraint → Pattern socho" content={
              <div>
                <div style={{ fontFamily: 'monospace', fontWeight: 900, color: '#f59e0b', fontSize: 15, marginBottom: 8 }}>{q.constraintAnalysis}</div>
                <p style={{ margin: 0, color: 'var(--tx-2)', lineHeight: 1.8 }}>{q.constraintKyu}</p>
              </div>
            } />
            <Block color="#8b5cf6" title="Input → Pattern narrow karo" content={
              <div>
                <div style={{ fontWeight: 800, color: 'var(--tx-1)', marginBottom: 6, fontSize: 14 }}>{q.inputSignal}</div>
                <p style={{ margin: 0, color: 'var(--tx-2)', lineHeight: 1.8 }}>{q.inputKyu}</p>
              </div>
            } />
            <Block color="#6366f1" title="Keywords → Pattern confirm karo" content={
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {q.keywords.map((kw, i) => <span key={i} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 6, background: '#6366f112', color: '#6366f1', border: '1px solid #6366f130', fontStyle: 'italic' }}>"{kw}"</span>)}
                </div>
                <p style={{ margin: 0, color: 'var(--tx-2)', lineHeight: 1.8 }}>{q.keywordKyu}</p>
              </div>
            } />
            <div style={{ padding: '16px 18px', background: color + '12', borderRadius: 14, border: `2px solid ${color}40` }}>
              <div style={{ fontSize: 15, fontWeight: 900, color, marginBottom: 8 }}>✅ Final: {q.patternName} — {q.typeName}</div>
              <p style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7 }}><strong>Pattern kyu:</strong> {q.whyThisPattern}</p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7 }}><strong>Type kyu:</strong> {q.whyThisType}</p>
              <div style={{ fontSize: 12, color, marginTop: 8, fontFamily: 'monospace', fontWeight: 700 }}>T: {q.timeComplexity} | S: {q.spaceComplexity} | DS: {q.dataStructure}</div>
            </div>
          </div>
        )}

        {/* ── TAB 2: Solve ── */}
        {tab === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Brute Force */}
            <div style={{ padding: '14px 18px', background: '#ef444410', borderRadius: 12, border: '1px solid #ef444430' }}>
              <div style={{ fontSize: 13, fontWeight: 900, color: '#ef4444', marginBottom: 8 }}>🐢 Brute Force — ye mat karo!</div>
              <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7 }}>{q.bruteForce}</p>
              <div style={{ fontSize: 13, color: '#ef4444', marginBottom: 10, fontFamily: 'monospace' }}>Complexity: {q.bruteForceComplexity} — {q.bruteForceKyu}</div>
            </div>

            {/* Optimal Steps */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 900, color, marginBottom: 12 }}>⚡ Optimal — Step by Step</div>
              {q.optimalSteps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: color + '20', border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color, flexShrink: 0 }}>{i+1}</div>
                  <div style={{ fontSize: 13, color: 'var(--tx-1)', lineHeight: 1.7, paddingTop: 3, fontFamily: step.includes('→') || step.includes('===') ? "'JetBrains Mono', monospace" : 'inherit' }}>{step}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 3: Code ── */}
        {tab === 3 && (
          <div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap', fontSize: 12, color: 'var(--tx-4)', fontFamily: 'monospace' }}>
              <span style={{ color, fontWeight: 700 }}>{q.timeComplexity}</span> | <span>{q.spaceComplexity}</span> | <span>{q.dataStructure}</span>
            </div>
            <pre style={{ margin: '0 0 14px', padding: '16px 20px', background: 'var(--bg-base)', borderRadius: 12, border: '1px solid var(--border)', fontSize: 13, color: 'var(--tx-1)', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap', lineHeight: 1.8, overflowX: 'auto' }}>
              {q.optimalCode}
            </pre>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a href={q.lcUrl} target="_blank" rel="noopener" style={{ padding: '9px 18px', borderRadius: 10, background: '#f59e0b', color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
                <ExternalLink size={13} /> LeetCode pe Solve Karo
              </a>
              <Link href={`/patterns/${q.patternId}`} style={{ padding: '9px 18px', borderRadius: 10, background: color + '18', color, border: `1px solid ${color}35`, textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
                {q.patternName} — Aur Questions →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Block({ color, title, content }: { color: string; title: string; content: React.ReactNode }) {
  return (
    <div style={{ padding: '14px 18px', borderRadius: 12, background: color + '08', border: `1px solid ${color}25` }}>
      <div style={{ fontSize: 13, fontWeight: 800, color, marginBottom: 10 }}>{title}</div>
      {content}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function LearnPage() {
  const [activePat, setActivePat] = useState(patternIds[0] ?? 'sliding-window');
  const [activeType, setActiveType] = useState<string | null>(null);
  const [showFramework, setShowFramework] = useState(false);
  const [activeQ, setActiveQ] = useState<number | null>(null);

  const pm = P[activePat] ?? { icon: '📌', color: '#64748b', name: activePat, desc: '' };
  const types = TYPE_ORDER[activePat] ?? [...new Set((CORE_BY_PATTERN[activePat] ?? []).map(q => q.typeId))];
  const currentType = activeType ?? types[0] ?? '';
  const questions = CORE_BY_TYPE[currentType] ?? [];

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)', overflow: 'hidden', background: 'var(--bg-base)' }}>

      {/* ── SIDEBAR 1: Patterns (Book Chapters) ── */}
      <div style={{ width: 200, flexShrink: 0, background: 'var(--bg-surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={16} color="var(--accent)" />
            <span style={{ fontSize: 13, fontWeight: 900, color: 'var(--tx-1)' }}>Patterns</span>
          </div>
          <div style={{ fontSize: 10, color: 'var(--tx-4)', marginTop: 2 }}>Ek pattern roz master karo</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {patternIds.map((pid, i) => {
            const meta = P[pid] ?? { icon: '📌', color: '#64748b', name: pid, desc: '' };
            const qs = CORE_BY_PATTERN[pid] ?? [];
            const isActive = activePat === pid;
            return (
              <button key={pid} onClick={() => { setActivePat(pid); setActiveType(null); setActiveQ(null); }} style={{
                width: '100%', padding: '12px 14px', border: 'none', cursor: 'pointer', textAlign: 'left',
                background: isActive ? meta.color + '15' : 'transparent',
                borderLeft: `3px solid ${isActive ? meta.color : 'transparent'}`,
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{meta.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: isActive ? meta.color : 'var(--tx-2)' }}>{meta.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--tx-4)', marginTop: 1 }}>{qs.length} questions</div>
                  </div>
                </div>
              </button>
            );
          })}
          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: 10, color: 'var(--tx-4)', lineHeight: 1.6, marginBottom: 6 }}>Patterns 4-15 coming soon</div>
            <Link href="/practice" style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>All 450 Questions →</Link>
          </div>
        </div>
      </div>

      {/* ── SIDEBAR 2: Types (Sub-chapters) ── */}
      <div style={{ width: 190, flexShrink: 0, background: 'var(--bg-elevated)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: pm.color }}>{pm.icon} {pm.name}</div>
          <div style={{ fontSize: 10, color: 'var(--tx-4)', marginTop: 2 }}>{pm.desc}</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {types.map((tid, i) => {
            const qs = CORE_BY_TYPE[tid] ?? [];
            const isActive = currentType === tid;
            return (
              <button key={tid} onClick={() => { setActiveType(tid); setActiveQ(null); }} style={{
                width: '100%', padding: '12px 14px', border: 'none', cursor: 'pointer', textAlign: 'left',
                background: isActive ? pm.color + '12' : 'transparent',
                borderLeft: `3px solid ${isActive ? pm.color : 'transparent'}`,
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: isActive ? pm.color : 'var(--tx-2)', lineHeight: 1.4, marginBottom: 2 }}>{TYPE_NAMES[tid] ?? tid}</div>
                <div style={{ fontSize: 10, color: 'var(--tx-4)' }}>{qs.length} questions</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN: Questions + Methodology ── */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Top bar */}
        <div style={{ padding: '14px 24px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--tx-4)' }}>{pm.name}</span>
            <ChevronRight size={12} color="var(--tx-4)" />
            <span style={{ fontSize: 12, fontWeight: 800, color: pm.color }}>{TYPE_NAMES[currentType] ?? currentType}</span>
            <span style={{ fontSize: 11, color: 'var(--tx-4)', marginLeft: 4 }}>— {questions.length} curated questions</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              <Link href={`/patterns/${activePat}`} style={{ fontSize: 11, padding: '5px 12px', borderRadius: 8, background: pm.color + '15', color: pm.color, border: `1px solid ${pm.color}30`, textDecoration: 'none', fontWeight: 700 }}>
                Sab {pm.name} Qs →
              </Link>
              <Link href="/cheatsheet" style={{ fontSize: 11, padding: '5px 12px', borderRadius: 8, background: 'var(--bg-elevated)', color: 'var(--tx-3)', border: '1px solid var(--border)', textDecoration: 'none' }}>
                ⚡ Cheatsheet
              </Link>
            </div>
          </div>

          {/* 8-step framework toggle */}
          <button onClick={() => setShowFramework(!showFramework)} style={{
            width: '100%', padding: '9px 16px', borderRadius: 10, border: '1px solid var(--accent-bdr)',
            background: showFramework ? 'var(--accent-bg)' : 'var(--bg-elevated)',
            cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>
              🧠 Universal 8-Step Framework — har pattern ke liye same approach
            </span>
            {showFramework ? <ChevronUp size={14} color="var(--accent)" /> : <ChevronDown size={14} color="var(--accent)" />}
          </button>
          {showFramework && (
            <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {FRAMEWORK.map(f => (
                <div key={f.num} style={{ padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: 10, border: `1px solid ${f.color}25`, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: f.color, color: '#fff', fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{f.num}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: f.color, marginBottom: 2 }}>{f.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--tx-3)', lineHeight: 1.5 }}>{f.body}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Questions */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {questions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--tx-4)', fontSize: 14 }}>
              Is type ke questions abhi add nahi hue. <Link href="/practice" style={{ color: 'var(--accent)' }}>Practice page pe jaao →</Link>
            </div>
          ) : questions.map(q => (
            <QuestionDetail key={q.id} q={q} color={pm.color} />
          ))}
        </div>
      </div>
    </div>
  );
}
