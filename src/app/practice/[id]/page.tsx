'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useTheme } from '@/hooks/useTheme';
import { useProgressStore } from '@/store/useProgressStore';
import { FullQuestion, getQuestionById, type Language } from '@/app/data/questions';
import { CheckCircle2, Circle, Clock, ExternalLink, ArrowLeft, Play, RotateCcw, Lightbulb, ChevronDown } from 'lucide-react';

// ── Monaco — dynamic import (no SSR) ─────────────────────────────────────────
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--tx-3)', fontSize: 13 }}>
      Loading editor...
    </div>
  ),
});

// ── Highlight keywords in text ─────────────────────────────────────────────
function HighlightText({ text, keywords }: { text: string; keywords: string[] }) {
  if (!keywords.length) return <span>{text}</span>;

  const pattern = new RegExp(`(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) => {
        const isKw = keywords.some(k => k.toLowerCase() === part.toLowerCase());
        return isKw
          ? <mark key={i} style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b', borderRadius: 3, padding: '0 2px', border: '1px solid rgba(245,158,11,0.3)', fontWeight: 600 }}>{part}</mark>
          : <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ── Render description (basic markdown-ish) ────────────────────────────────
function ProblemDescription({ text, keywords }: { text: string; keywords: string[] }) {
  const th = useTheme();
  const lines = text.split('\n');

  return (
    <div style={{ fontSize: 13.5, color: 'var(--tx-2)', lineHeight: 1.75 }}>
      {lines.map((line, i) => {
        // Inline code: `code`
        const rendered = line.split(/`([^`]+)`/g).map((part, j) =>
          j % 2 === 1
            ? <code key={j} style={{ background: th.bgElevated, color: th.accent, padding: '1px 6px', borderRadius: 4, fontSize: 12, fontFamily: 'monospace', border: `1px solid ${th.border}` }}>{part}</code>
            : <HighlightText key={j} text={part} keywords={keywords} />
        );

        // Bold: **text**
        // Empty line → spacer
        if (!line.trim()) return <div key={i} style={{ height: 10 }} />;
        return <p key={i} style={{ margin: '0 0 6px' }}>{rendered}</p>;
      })}
    </div>
  );
}

// ── Mock test runner ───────────────────────────────────────────────────────
function runMockTest(q: FullQuestion, code: string, lang: Language): { passed: boolean; output: string; expected: string }[] {
  return q.examples.map(ex => ({
    passed: Math.random() > 0.3, // mock — replace with real runner
    output: ex.output + (Math.random() > 0.5 ? '' : ' (wrong)'),
    expected: ex.output,
  }));
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function QuestionPage() {
  const { id } = useParams<{ id: string }>();
  const th = useTheme();
  const { solvedQuestions, attemptedQuestions, markSolved, markAttempted } = useProgressStore();

  const q = getQuestionById(Number(id));

  const [lang, setLang]               = useState<Language>('javascript');
  const [code, setCode]               = useState('');
  const [activeTab, setActiveTab]     = useState<'description' | 'hints' | 'approach'>('description');
  const [testResults, setTestResults] = useState<ReturnType<typeof runMockTest> | null>(null);
  const [showHints, setShowHints]     = useState(false);
  const [hintIdx, setHintIdx]         = useState(0);
  const [isRunning, setIsRunning]     = useState(false);
  const [panelH, setPanelH]           = useState(220); // bottom panel height
  const splitRef = useRef<HTMLDivElement>(null);

  const status = q
    ? solvedQuestions.includes(q.id) ? 'Solved' : attemptedQuestions.includes(q.id) ? 'Attempted' : 'Todo'
    : 'Todo';

  // Load starter code when question or language changes
  useEffect(() => {
    if (q) setCode(q.starterCode[lang] || '');
  }, [q?.id, lang]);

  if (!q) {
    // Question doesn't have full data — redirect to LeetCode
    return (
      <div style={{ minHeight: '100vh', background: th.bgBase, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ fontSize: 48 }}>🔗</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: th.tx1, margin: 0 }}>Question #{id}</h2>
        <p style={{ fontSize: 14, color: th.tx3, textAlign: 'center', maxWidth: 400 }}>
          Is question ka full data abhi add nahi hua. Tum directly LeetCode pe solve kar sakte ho aur wapas aa ke tick mark kar sakte ho.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href={`https://leetcode.com/problems/${id}/`} target="_blank" rel="noopener noreferrer"
            style={{ padding: '10px 22px', borderRadius: 10, fontSize: 13, fontWeight: 700, background: '#f59e0b', color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ExternalLink style={{ width: 14, height: 14 }} /> Open on LeetCode
          </a>
          <Link href="/practice" style={{ padding: '10px 22px', borderRadius: 10, fontSize: 13, fontWeight: 700, border: `1px solid ${th.border}`, color: th.tx1, textDecoration: 'none', background: 'transparent', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Practice
          </Link>
        </div>
      </div>
    );
  }

  const dc = {
    Easy:   { bg: 'rgba(34,197,94,0.12)',  text: '#22c55e', border: 'rgba(34,197,94,0.3)' },
    Medium: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
    Hard:   { bg: 'rgba(239,68,68,0.12)',  text: '#ef4444', border: 'rgba(239,68,68,0.3)' },
  }[q.difficulty];

  const handleRun = async () => {
    setIsRunning(true);
    markAttempted(q.id, q.patternId);
    await new Promise(r => setTimeout(r, 800));
    setTestResults(runMockTest(q, code, lang));
    setIsRunning(false);
  };

  const handleMarkSolved = () => {
    markSolved(q.id, q.difficulty, q.patternId);
  };

  const handleReset = () => {
    setCode(q.starterCode[lang] || '');
    setTestResults(null);
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', background: th.bgBase, overflow: 'hidden' }}>

      {/* ── TOP BAR ──────────────────────────────────────────────── */}
      <div style={{ background: th.bgSurface, borderBottom: `1px solid ${th.border}`, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, flexWrap: 'wrap' }}>
        <Link href="/practice" prefetch={false}
          style={{ color: th.tx3, display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, textDecoration: 'none', padding: '4px 8px', borderRadius: 6, border: `1px solid ${th.border}` }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = th.tx1)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = th.tx3)}>
          <ArrowLeft style={{ width: 13, height: 13 }} />
          Practice
        </Link>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: th.tx1 }}>{q.id}. {q.title}</span>
          <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 5, fontWeight: 700, background: dc.bg, color: dc.text, border: `1px solid ${dc.border}` }}>{q.difficulty}</span>
          {status !== 'Todo' && (
            <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, color: status === 'Solved' ? th.accent : '#f59e0b' }}>
              {status === 'Solved' ? <CheckCircle2 style={{ width: 13, height: 13 }} /> : <Clock style={{ width: 13, height: 13 }} />}
              {status}
            </span>
          )}
        </div>

        <a href={q.leetcodeUrl ?? q.url} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 11, color: th.tx3, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none', padding: '4px 8px', borderRadius: 6, border: `1px solid ${th.border}` }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = th.accent)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = th.tx3)}>
          <ExternalLink style={{ width: 12, height: 12 }} />LeetCode
        </a>
      </div>

      {/* ── SPLIT LAYOUT ─────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* ── LEFT: PROBLEM DESCRIPTION ────────────────────────── */}
        <div style={{ width: '45%', minWidth: 320, borderRight: `1px solid ${th.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${th.border}`, padding: '0 16px', background: th.bgSurface, flexShrink: 0 }}>
            {(['description', 'hints', 'approach'] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                padding: '10px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: 'none', border: 'none',
                color: activeTab === t ? th.accent : th.tx3,
                borderBottom: `2px solid ${activeTab === t ? th.accent : 'transparent'}`,
                marginBottom: -1, textTransform: 'capitalize',
              }}>{t}</button>
            ))}
          </div>

          {/* Tab content — scrollable */}
          <div style={{ flex: 1, overflow: 'auto', padding: '20px 20px' }}>

            {activeTab === 'description' && (
              <>
                {/* Title + badges */}
                <div style={{ marginBottom: 18 }}>
                  <h1 style={{ fontSize: 19, fontWeight: 900, color: th.tx1, margin: '0 0 10px' }}>
                    {q.id}. {q.title}
                  </h1>
                  <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 6, fontWeight: 700, background: dc.bg, color: dc.text, border: `1px solid ${dc.border}` }}>{q.difficulty}</span>
                    {/* Topics */}
                    <button style={{ fontSize: 11, color: th.tx3, background: th.bgElevated, border: `1px solid ${th.border}`, borderRadius: 6, padding: '3px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                      🏷️ Topics
                    </button>
                    <button style={{ fontSize: 11, color: th.tx3, background: th.bgElevated, border: `1px solid ${th.border}`, borderRadius: 6, padding: '3px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                      🏢 Companies
                    </button>
                  </div>
                </div>

                {/* Problem statement */}
                <ProblemDescription text={q.description} keywords={q.keywords ?? []} />

                {/* Pattern hint */}
                <div style={{ marginTop: 16, padding: '10px 14px', borderRadius: 9, background: th.accentBg, border: `1px solid ${th.accentBdr}`, fontSize: 12 }}>
                  <span style={{ color: th.tx3 }}>Pattern: </span>
                  <Link href={`/patterns/${q.patternId}`} prefetch={false}
                    style={{ color: th.accent, fontWeight: 700, textDecoration: 'none' }}>
                    {q.patternName} →
                  </Link>
                </div>

                {/* Tags */}
                <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {q.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, padding: '2px 9px', borderRadius: 20, background: th.bgElevated, color: th.tx3, border: `1px solid ${th.border}` }}>{t}</span>
                  ))}
                </div>

                {/* Examples */}
                <div style={{ marginTop: 22 }}>
                  {q.examples.map((ex, i) => (
                    <div key={i} style={{ marginBottom: 18 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: th.tx1, margin: '0 0 8px' }}>Example {i + 1}:</p>
                      <div style={{ background: th.bgElevated, borderRadius: 9, padding: '12px 14px', border: `1px solid ${th.border}`, fontFamily: 'monospace', fontSize: 12.5 }}>
                        <div style={{ marginBottom: 4 }}>
                          <span style={{ fontWeight: 700, color: th.tx1 }}>Input: </span>
                          <HighlightText text={ex.input} keywords={q.keywords ?? []} />
                        </div>
                        <div style={{ marginBottom: ex.explanation ? 4 : 0 }}>
                          <span style={{ fontWeight: 700, color: th.tx1 }}>Output: </span>
                          <span style={{ color: th.accent }}>{ex.output}</span>
                        </div>
                        {ex.explanation && (
                          <div style={{ marginTop: 4, color: th.tx3, fontFamily: 'inherit', fontStyle: 'italic' }}>
                            <span style={{ fontWeight: 700, color: th.tx2, fontStyle: 'normal' }}>Explanation: </span>
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div style={{ marginTop: 6 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: th.tx1, margin: '0 0 8px' }}>Constraints:</p>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {q.constraints.map((c, i) => (
                      <li key={i} style={{ marginBottom: 5 }}>
                        <code style={{ fontSize: 12, background: th.bgElevated, color: th.tx1, padding: '2px 7px', borderRadius: 5, border: `1px solid ${th.border}`, fontFamily: 'monospace' }}>
                          <HighlightText text={c} keywords={['10⁴', '10⁵', '10⁶', '10⁷', '10⁹', 'O(n)', 'O(1)', 'O(log n)', 'sorted', 'distinct', 'unique']} />
                        </code>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Complexity */}
                <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
                  {[
                    { l: 'Time', v: q.timeComplexity,  color: '#6366f1' },
                    { l: 'Space', v: q.spaceComplexity, color: '#f59e0b' },
                  ].map(({ l, v, color }) => (
                    <div key={l} style={{ padding: '7px 12px', borderRadius: 8, background: color + '12', border: `1px solid ${color}30`, fontSize: 12 }}>
                      <span style={{ color: th.tx3 }}>{l}: </span>
                      <code style={{ color, fontWeight: 700, fontFamily: 'monospace' }}>{v}</code>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'hints' && (
              <div>
                <p style={{ fontSize: 13, color: th.tx2, marginBottom: 18 }}>
                  Hints progressively reveal karte hain. Pehle khud socho, phir dekho.
                </p>
                {q.hints.slice(0, hintIdx + 1).map((hint, i) => (
                  <div key={i} style={{ padding: '13px 15px', borderRadius: 10, background: `rgba(99,102,241,0.07)`, border: `1px solid rgba(99,102,241,0.2)`, marginBottom: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Hint {i + 1}</div>
                    <p style={{ fontSize: 13, color: th.tx2, margin: 0, lineHeight: 1.65 }}>{hint}</p>
                  </div>
                ))}
                {hintIdx < q.hints.length - 1 && (
                  <button onClick={() => setHintIdx(h => h + 1)} style={{
                    padding: '9px 18px', borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#6366f1',
                  }}>
                    <Lightbulb style={{ width: 13, height: 13, display: 'inline', marginRight: 5 }} />
                    Next Hint
                  </button>
                )}
                {hintIdx >= q.hints.length - 1 && (
                  <p style={{ fontSize: 12, color: th.tx3, fontStyle: 'italic' }}>Saare hints dekh liye. Approach tab mein solution approach dekho.</p>
                )}
              </div>
            )}

            {activeTab === 'approach' && (
              <div>
                <div style={{ padding: '16px', borderRadius: 11, background: th.accentBg, border: `1px solid ${th.accentBdr}`, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: th.accent, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>✅ Pattern: {q.patternName}</div>
                  <p style={{ fontSize: 13, color: th.tx1, margin: 0, lineHeight: 1.7 }}>{q.approach}</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, padding: '12px', borderRadius: 9, background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', marginBottom: 5 }}>Time</div>
                    <code style={{ fontSize: 13, fontWeight: 700, color: '#6366f1', fontFamily: 'monospace' }}>{q.timeComplexity}</code>
                  </div>
                  <div style={{ flex: 1, padding: '12px', borderRadius: 9, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', marginBottom: 5 }}>Space</div>
                    <code style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', fontFamily: 'monospace' }}>{q.spaceComplexity}</code>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: EDITOR + TESTS ────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

          {/* Editor top bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderBottom: `1px solid ${th.border}`, background: th.bgSurface, flexShrink: 0 }}>
            {/* Language selector */}
            <div style={{ position: 'relative' }}>
              <select value={lang} onChange={e => setLang(e.target.value as Language)}
                style={{ padding: '5px 24px 5px 9px', borderRadius: 7, fontSize: 12, border: `1px solid ${th.border}`, cursor: 'pointer', outline: 'none', appearance: 'none', fontWeight: 600 }}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python 3</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
              <ChevronDown style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', width: 11, height: 11, color: th.tx3, pointerEvents: 'none' }} />
            </div>

            <div style={{ flex: 1 }} />

            {/* Reset */}
            <button onClick={handleReset}
              style={{ padding: '5px 12px', borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: 'pointer', background: 'transparent', border: `1px solid ${th.border}`, color: th.tx3, display: 'flex', alignItems: 'center', gap: 5 }}>
              <RotateCcw style={{ width: 11, height: 11 }} /> Reset
            </button>

            {/* Run */}
            <button onClick={handleRun} disabled={isRunning}
              style={{ padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: isRunning ? 'wait' : 'pointer', background: '#22c55e', border: 'none', color: '#000', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Play style={{ width: 12, height: 12 }} />
              {isRunning ? 'Running...' : 'Run'}
            </button>

            {/* Submit / Mark Solved */}
            <button onClick={handleMarkSolved} disabled={status === 'Solved'}
              style={{
                padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: status === 'Solved' ? 'default' : 'pointer',
                background: status === 'Solved' ? th.accentBg : th.accent,
                border: `1px solid ${th.accentBdr}`,
                color: status === 'Solved' ? th.accent : '#fff',
                display: 'flex', alignItems: 'center', gap: 5,
              }}>
              {status === 'Solved' ? <CheckCircle2 style={{ width: 12, height: 12 }} /> : <Circle style={{ width: 12, height: 12 }} />}
              {status === 'Solved' ? 'Solved ✓' : 'Mark Solved'}
            </button>
          </div>

          {/* Monaco Editor */}
          <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
            <MonacoEditor
              height="100%"
              language={lang === 'cpp' ? 'cpp' : lang === 'java' ? 'java' : lang === 'python' ? 'python' : 'javascript'}
              value={code}
              onChange={v => setCode(v || '')}
              theme={th.isDark ? 'vs-dark' : 'light'}
              options={{
                fontSize: 13,
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 14, bottom: 14 },
                lineNumbers: 'on',
                renderLineHighlight: 'line',
                bracketPairColorization: { enabled: true },
                suggest: { showKeywords: true },
                quickSuggestions: { strings: false, comments: false, other: true },
                wordWrap: 'off',
                smoothScrolling: true,
              }}
            />
          </div>

          {/* ── TEST CASES PANEL ──────────────────────────────── */}
          <div style={{ height: panelH, borderTop: `1px solid ${th.border}`, display: 'flex', flexDirection: 'column', background: th.bgSurface, flexShrink: 0, overflow: 'hidden' }}>

            {/* Panel drag handle + header */}
            <div
              style={{ height: 6, background: th.border, cursor: 'ns-resize', flexShrink: 0 }}
              onMouseDown={e => {
                e.preventDefault();
                const startY = e.clientY, startH = panelH;
                const onMove = (ev: MouseEvent) => setPanelH(Math.max(60, Math.min(400, startH - (ev.clientY - startY))));
                const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 14px', borderBottom: `1px solid ${th.border}`, flexShrink: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: th.tx2 }}>Test Cases</span>
              {testResults && (
                <span style={{ fontSize: 11, color: testResults.every(r => r.passed) ? th.accent : '#ef4444', fontWeight: 600 }}>
                  {testResults.filter(r => r.passed).length}/{testResults.length} passed
                </span>
              )}
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '10px 14px' }}>
              {!testResults ? (
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {q.examples.map((ex, i) => (
                    <div key={i} style={{ background: th.bgCard, border: `1px solid ${th.border}`, borderRadius: 9, padding: '10px 13px', minWidth: 200, flex: '1 1 200px' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: th.tx3, marginBottom: 6, textTransform: 'uppercase' }}>Case {i + 1}</div>
                      <div style={{ fontSize: 12, fontFamily: 'monospace', color: th.tx2, marginBottom: 3 }}>
                        <span style={{ color: th.tx3 }}>Input: </span>{ex.input}
                      </div>
                      <div style={{ fontSize: 12, fontFamily: 'monospace', color: th.accent }}>
                        <span style={{ color: th.tx3 }}>Expected: </span>{ex.output}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {testResults.map((r, i) => (
                    <div key={i} style={{
                      background: th.bgCard, borderRadius: 9, padding: '10px 13px', minWidth: 200, flex: '1 1 200px',
                      border: `1px solid ${r.passed ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                      borderLeft: `3px solid ${r.passed ? '#22c55e' : '#ef4444'}`,
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: r.passed ? '#22c55e' : '#ef4444', marginBottom: 6 }}>
                        {r.passed ? '✅ Passed' : '❌ Failed'} — Case {i + 1}
                      </div>
                      <div style={{ fontSize: 11, fontFamily: 'monospace', color: th.tx3, marginBottom: 2 }}>Input: {q.examples[i].input}</div>
                      <div style={{ fontSize: 11, fontFamily: 'monospace', color: r.passed ? th.accent : '#ef4444', marginBottom: 2 }}>Output: {r.output}</div>
                      {!r.passed && <div style={{ fontSize: 11, fontFamily: 'monospace', color: th.tx3 }}>Expected: {r.expected}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}