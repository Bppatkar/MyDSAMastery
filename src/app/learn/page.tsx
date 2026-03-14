'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CORE_QUESTIONS, CORE_BY_PATTERN, type CoreQuestion } from '@/lib/coreQuestions';
import { BookOpen, Brain, Code2, ChevronDown, ChevronUp, ExternalLink, Lightbulb } from 'lucide-react';

const PATTERN_META: Record<string, { icon: string; color: string; name: string }> = {
  'sliding-window':  { icon: '🪟', color: '#10b981', name: 'Sliding Window' },
  'two-pointers':    { icon: '👆', color: '#f59e0b', name: 'Two Pointers' },
  'binary-search':   { icon: '🔍', color: '#6366f1', name: 'Binary Search' },
};

const DIFF_C: Record<string, string> = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };

// Step Component
function StepBox({ num, title, content, color }: { num: number; title: string; content: React.ReactNode; color: string }) {
  return (
    <div style={{ padding: '14px 18px', borderRadius: 10, background: color + '10', border: `1px solid ${color}30`, marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, flexShrink: 0 }}>{num}</div>
        <div style={{ fontSize: 14, fontWeight: 800, color }}>{title}</div>
      </div>
      <div style={{ fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.8, paddingLeft: 38 }}>{content}</div>
    </div>
  );
}

// Question Card — full methodology
function QuestionCard({ q, patternColor }: { q: CoreQuestion; patternColor: string }) {
  const [tab, setTab] = useState<'read' | 'identify' | 'solve' | 'code'>('read');

  return (
    <div style={{ background: 'var(--bg-surface)', borderRadius: 14, border: `1px solid ${patternColor}30`, marginBottom: 18, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', background: patternColor + '08', borderBottom: `1px solid ${patternColor}20` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 800, padding: '3px 10px', borderRadius: 20, background: (DIFF_C[q.difficulty]??'#10b981') + '20', color: DIFF_C[q.difficulty]??'#10b981' }}>{q.difficulty}</span>
          <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: patternColor + '15', color: patternColor, fontWeight: 700, border: `1px solid ${patternColor}30` }}>{q.typeName}</span>
          <a href={q.lcUrl} target="_blank" rel="noopener" style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none', marginLeft: 'auto' }}>
            <ExternalLink size={12} /> #{q.lcNum} on LeetCode
          </a>
        </div>
        <div style={{ fontSize: 17, fontWeight: 900, color: 'var(--tx-1)' }}>#{q.lcNum}. {q.title}</div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg-elevated)' }}>
        {([
          { id: 'read', label: '📖 Question Kaise Padhein' },
          { id: 'identify', label: '🎯 Pattern Kaise Pehchaanein' },
          { id: 'solve', label: '⚡ Solve Kaise Karein' },
          { id: 'code', label: '💻 Code' },
        ] as const).map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} style={{
            flex: 1, padding: '10px 4px', background: 'transparent', border: 'none', cursor: 'pointer',
            fontSize: 11, fontWeight: 600,
            color: tab === t.id ? patternColor : 'var(--tx-4)',
            borderBottom: tab === t.id ? `2px solid ${patternColor}` : '2px solid transparent',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: '18px 20px' }}>

        {/* ─── HOW TO READ ─── */}
        {tab === 'read' && (
          <div>
            <StepBox num={1} title="Question Mein Ye Dhundho" color="#6366f1"
              content={<div>
                <div style={{ marginBottom: 10 }}>{q.howToRead}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {q.questionKeywords.map((kw, i) => (
                    <span key={i} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: '#6366f115', color: '#6366f1', border: '1px solid #6366f130', fontStyle: 'italic', fontWeight: 700 }}>"{kw}"</span>
                  ))}
                </div>
                <div style={{ marginTop: 10, fontSize: 13, color: 'var(--tx-3)', lineHeight: 1.7, padding: '8px 12px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
                  💬 <strong>Ye keywords dekhne ke baad kya sochein?</strong> {q.keywordKyu}
                </div>
              </div>}
            />
            <StepBox num={2} title="Constraint Kya Bol Raha Hai?" color="#f59e0b"
              content={<div>
                <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#f59e0b', fontSize: 14, marginBottom: 8 }}>{q.constraint}</div>
                <div>{q.constraintKyu}</div>
              </div>}
            />
            <StepBox num={3} title="Input Output Samjho" color="#10b981"
              content={<div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div style={{ padding: '10px 14px', background: '#10b98110', borderRadius: 8, border: '1px solid #10b98130' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#10b981', marginBottom: 4 }}>INPUT</div>
                    <div style={{ fontSize: 13, color: 'var(--tx-1)', fontWeight: 700, marginBottom: 4 }}>{q.inputType}</div>
                    <div style={{ fontSize: 12, color: 'var(--tx-3)', lineHeight: 1.6 }}>{q.inputKyu}</div>
                  </div>
                  <div style={{ padding: '10px 14px', background: '#6366f110', borderRadius: 8, border: '1px solid #6366f130' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#6366f1', marginBottom: 4 }}>OUTPUT</div>
                    <div style={{ fontSize: 13, color: 'var(--tx-1)', fontWeight: 700, marginBottom: 4 }}>{q.outputType}</div>
                    <div style={{ fontSize: 12, color: 'var(--tx-3)', lineHeight: 1.6 }}>{q.outputKyu}</div>
                  </div>
                </div>
              </div>}
            />
          </div>
        )}

        {/* ─── HOW TO IDENTIFY PATTERN ─── */}
        {tab === 'identify' && (
          <div>
            <StepBox num={1} title="Constraint se Pattern Socho" color="#f59e0b"
              content={<div>
                <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#f59e0b', fontSize: 14, marginBottom: 6 }}>{q.constraint}</div>
                <div>{q.constraintKyu}</div>
              </div>}
            />
            <StepBox num={2} title="Input Type se Pattern Narrow Karo" color="#10b981"
              content={<div>
                <div style={{ fontWeight: 800, color: 'var(--tx-1)', marginBottom: 6 }}>Input: {q.inputType}</div>
                <div>{q.inputKyu}</div>
              </div>}
            />
            <StepBox num={3} title="Keywords se Confirm Karo" color="#8b5cf6"
              content={<div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {q.questionKeywords.map((kw, i) => (
                    <span key={i} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: '#8b5cf615', color: '#8b5cf6', border: '1px solid #8b5cf630', fontStyle: 'italic' }}>"{kw}"</span>
                  ))}
                </div>
                <div>{q.keywordKyu}</div>
              </div>}
            />
            <div style={{ padding: '14px 18px', background: patternColor + '12', borderRadius: 12, border: `2px solid ${patternColor}40`, marginTop: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 900, color: patternColor, marginBottom: 8 }}>✅ Final Decision: {q.patternName} — {q.typeName}</div>
              <div style={{ fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7 }}><strong>Kyu ye pattern?</strong> {q.whyThisPattern}</div>
              <div style={{ fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7, marginTop: 6 }}><strong>Kyu ye type?</strong> {q.whyThisType}</div>
              <div style={{ fontSize: 12, color: patternColor, marginTop: 8 }}>
                Data Structure: <strong>{q.dataStructure}</strong> | T: {q.timeComplexity} | S: {q.spaceComplexity}
              </div>
            </div>
          </div>
        )}

        {/* ─── HOW TO SOLVE ─── */}
        {tab === 'solve' && (
          <div>
            {/* Brute Force */}
            <div style={{ padding: '14px 16px', background: '#ef444410', borderRadius: 10, border: '1px solid #ef444430', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#ef4444', marginBottom: 6 }}>🐢 Brute Force — Ye mat karo!</div>
              <div style={{ fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7, marginBottom: 10 }}>{q.bruteForce}</div>
              <div style={{ fontSize: 13, color: '#ef4444', marginBottom: 10 }}>❌ Kyu nahi chalega: {q.bruteForceWhy}</div>
              <pre style={{ margin: 0, padding: '10px 14px', background: 'var(--bg-base)', borderRadius: 8, fontSize: 12, color: 'var(--tx-2)', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap', overflow: 'auto', lineHeight: 1.7 }}>
                {q.bruteForceCode}
              </pre>
            </div>

            {/* Optimal Steps */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: patternColor, marginBottom: 10 }}>⚡ Optimal Approach — Step by Step</div>
              {q.approach.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 8, alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: patternColor + '20', border: `1.5px solid ${patternColor}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: patternColor, flexShrink: 0 }}>{i+1}</div>
                  <div style={{ fontSize: 13, color: 'var(--tx-1)', lineHeight: 1.7, fontFamily: step.includes('→') ? "'JetBrains Mono', monospace" : 'inherit', paddingTop: 2 }}>{step}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── CODE ─── */}
        {tab === 'code' && (
          <div>
            <div style={{ marginBottom: 10, fontSize: 12, fontWeight: 700, color: 'var(--tx-3)' }}>
              JavaScript — {q.timeComplexity} | {q.spaceComplexity} | DS: {q.dataStructure}
            </div>
            <pre style={{ margin: 0, padding: '16px 20px', background: 'var(--bg-base)', borderRadius: 10, border: '1px solid var(--border)', fontSize: 13, color: 'var(--tx-1)', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap', overflow: 'auto', lineHeight: 1.8 }}>
              {q.optimalCode}
            </pre>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <a href={q.lcUrl} target="_blank" rel="noopener" style={{ padding: '8px 18px', borderRadius: 8, background: '#f59e0b', color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
                LeetCode pe Submit karo →
              </a>
              <Link href={`/patterns/${q.patternId}`} style={{ padding: '8px 18px', borderRadius: 8, background: patternColor + '15', color: patternColor, border: `1px solid ${patternColor}30`, textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
                {q.patternName} aur questions →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LearnPage() {
  const [selectedPattern, setSelectedPattern] = useState<string>('sliding-window');
  const [showFramework, setShowFramework] = useState(false);

  const patternIds = [...new Set(CORE_QUESTIONS.map(q => q.patternId))];
  const currentMeta = PATTERN_META[selectedPattern] ?? { icon: '📌', color: '#64748b', name: selectedPattern };
  const currentQuestions = CORE_BY_PATTERN[selectedPattern] ?? [];

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>

      {/* ─── LEFT SIDEBAR: Pattern Navigator ─── */}
      <div style={{ width: 220, flexShrink: 0, background: 'var(--bg-surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--tx-1)' }}>📚 Systematic Learn</div>
          <div style={{ fontSize: 11, color: 'var(--tx-4)', marginTop: 2 }}>Pattern → Types → 3 Questions</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 8px' }}>
          {patternIds.map(pid => {
            const meta = PATTERN_META[pid] ?? { icon: '📌', color: '#64748b', name: pid };
            const qs = CORE_BY_PATTERN[pid] ?? [];
            const isActive = selectedPattern === pid;
            return (
              <button key={pid} onClick={() => setSelectedPattern(pid)} style={{
                width: '100%', padding: '10px 12px', borderRadius: 10, border: `1px solid ${isActive ? meta.color + '50' : 'transparent'}`,
                background: isActive ? meta.color + '15' : 'transparent', cursor: 'pointer', textAlign: 'left', marginBottom: 4,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{meta.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: isActive ? meta.color : 'var(--tx-2)' }}>{meta.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--tx-4)', marginTop: 1 }}>{qs.length} questions</div>
                  </div>
                </div>
              </button>
            );
          })}
          <div style={{ padding: '10px 12px', fontSize: 11, color: 'var(--tx-4)', textAlign: 'center', marginTop: 8, lineHeight: 1.6 }}>
            More patterns coming soon...<br/>
            <Link href="/practice" style={{ color: 'var(--accent)' }}>Practice 450 questions →</Link>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Pattern Header */}
        <div style={{ padding: '16px 24px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 28 }}>{currentMeta.icon}</span>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 900, color: currentMeta.color, margin: 0 }}>{currentMeta.name}</h2>
              <div style={{ fontSize: 12, color: 'var(--tx-4)' }}>{currentQuestions.length} questions — har ek mein full methodology</div>
            </div>
            <Link href={`/patterns/${selectedPattern}`} style={{ marginLeft: 'auto', fontSize: 12, padding: '6px 14px', borderRadius: 8, background: currentMeta.color + '15', color: currentMeta.color, border: `1px solid ${currentMeta.color}30`, textDecoration: 'none', fontWeight: 700 }}>
              Sab Practice Questions →
            </Link>
          </div>

          {/* Framework toggle */}
          <button onClick={() => setShowFramework(!showFramework)} style={{ width: '100%', padding: '10px 16px', borderRadius: 10, border: '1px solid var(--border)', background: showFramework ? 'var(--accent-bg)' : 'var(--bg-elevated)', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>🧠 Universal Solving Framework — Har pattern ke liye same 8 steps</span>
            {showFramework ? <ChevronUp size={16} color="var(--accent)" /> : <ChevronDown size={16} color="var(--accent)" />}
          </button>

          {showFramework && (
            <div style={{ marginTop: 10, padding: '16px', background: 'var(--accent-bg)', borderRadius: 10, border: '1px solid var(--accent-bdr)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
              {[
                ['1', '📖 Question padhte waqt', 'Ek baar pura padho, keywords underline karo, examples trace karo'],
                ['2', '⏱️ Constraint dekho', 'n ki value → allowed complexity → pattern narrow karo'],
                ['3', '📥 Input type dekho', 'Sorted/array/string/graph? → pattern family decide'],
                ['4', '📤 Output type dekho', 'Single value/boolean/list/indices? → approach decide'],
                ['5', '🔑 Keywords dhundho', 'Question text mein magic words → pattern confirm'],
                ['6', '🐢 Brute force socho', 'Naivest approach kya hai? Kyu slow hai?'],
                ['7', '⚡ Optimize karo', 'Kaunsa pattern brute force improve karta hai? Kyu?'],
                ['8', '✅ Code + Verify', 'Template follow karo, edge cases check karo'],
              ].map(([num, title, desc]) => (
                <div key={num} style={{ padding: '8px 12px', background: 'var(--bg-surface)', borderRadius: 8, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent)', marginBottom: 2 }}>{title}</div>
                  <div style={{ color: 'var(--tx-3)', lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Questions */}
        <div style={{ padding: '20px 24px' }}>
          {currentQuestions.map(q => (
            <QuestionCard key={q.id} q={q} patternColor={currentMeta.color} />
          ))}
        </div>
      </div>
    </div>
  );
}
