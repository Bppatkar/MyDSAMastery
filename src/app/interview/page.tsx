'use client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ALL_QUESTION_STUBS } from '@/app/data/questions';
import { useProgressStore } from '@/store/useProgressStore';
import { Timer, Shuffle, ChevronRight, RotateCcw, CheckCircle2, XCircle, ExternalLink, Trophy } from 'lucide-react';

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

const MODES = [
  { id: '30', label: '⚡ Speed Round', time: 30, qs: 5, desc: '5 questions, 30 seconds each — pattern identify karo!', color: '#f59e0b' },
  { id: '45', label: '🎯 Standard', time: 45, qs: 10, desc: '10 questions, 45 seconds each — sochkar batao', color: '#10b981' },
  { id: '90', label: '🏋️ Deep Dive', time: 90, qs: 8, desc: '8 questions, 90 seconds each — full approach batao', color: '#6366f1' },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

const DIFF_C: Record<string, string> = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };

type Phase = 'setup' | 'active' | 'results';

export default function InterviewPage() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [selectedMode, setSelectedMode] = useState(MODES[1]);
  const [diffFilter, setDiffFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  // Session state
  const [questions, setQuestions] = useState<typeof ALL_QUESTION_STUBS>([]);
  const [qIdx, setQIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState<Array<{ chosen: string; correct: boolean; skipped: boolean }>>([]);
  const [chosen, setChosen] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { markSolved } = useProgressStore();

  const currentQ = questions[qIdx];
  const meta = currentQ ? PATTERN_META[currentQ.patternId] : null;

  // Timer countdown
  useEffect(() => {
    if (phase !== 'active' || showAnswer) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); handleTimeUp(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, qIdx, showAnswer]);

  // Session timer
  useEffect(() => {
    if (phase !== 'active') { if (sessionTimerRef.current) clearInterval(sessionTimerRef.current); return; }
    sessionTimerRef.current = setInterval(() => setSessionTime(t => t + 1), 1000);
    return () => { if (sessionTimerRef.current) clearInterval(sessionTimerRef.current); };
  }, [phase]);

  const handleTimeUp = useCallback(() => {
    if (!currentQ) return;
    setShowAnswer(true);
    setAnswers(prev => [...prev, { chosen: '', correct: false, skipped: true }]);
  }, [currentQ]);

  const startSession = () => {
    let pool = ALL_QUESTION_STUBS;
    if (diffFilter !== 'All') pool = pool.filter(q => q.difficulty === diffFilter);
    const picked = shuffle(pool).slice(0, selectedMode.qs);
    setQuestions(picked);
    setQIdx(0);
    setAnswers([]);
    setChosen(null);
    setShowAnswer(false);
    setTimeLeft(selectedMode.time);
    setSessionTime(0);
    setPhase('active');
  };

  // 4 pattern choices
  const options = useMemo(() => {
    if (!currentQ) return [];
    const correct = currentQ.patternId;
    const others = Object.keys(PATTERN_META).filter(p => p !== correct);
    return shuffle([correct, ...shuffle(others).slice(0, 3)]);
  }, [currentQ]);

  const handleChoose = (patternId: string) => {
    if (chosen || showAnswer) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setChosen(patternId);
    const correct = patternId === currentQ.patternId;
    setShowAnswer(true);
    setAnswers(prev => [...prev, { chosen: patternId, correct, skipped: false }]);
  };

  const handleSkip = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setChosen('');
    setShowAnswer(true);
    setAnswers(prev => [...prev, { chosen: '', correct: false, skipped: true }]);
  };

  const handleNext = () => {
    if (qIdx >= questions.length - 1) { setPhase('results'); return; }
    setQIdx(i => i + 1);
    setChosen(null);
    setShowAnswer(false);
    setTimeLeft(selectedMode.time);
  };

  const correctCount = answers.filter(a => a.correct).length;
  const score = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;
  const timerPct = (timeLeft / selectedMode.time) * 100;
  const timerColor = timerPct > 50 ? '#10b981' : timerPct > 25 ? '#f59e0b' : '#ef4444';

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // ─── SETUP ───
  if (phase === 'setup') return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <div style={{ width: '100%', maxWidth: 600 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎯</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: 'var(--tx-1)', margin: '0 0 8px' }}>Mock Interview Mode</h1>
          <p style={{ fontSize: 14, color: 'var(--tx-3)', margin: 0, lineHeight: 1.7 }}>
            Random questions aayenge — pattern identify karo bina hints ke.<br/>
            Real interview practice — timer on, sochkar batao!
          </p>
        </div>

        {/* Mode selection */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx-2)', marginBottom: 10 }}>Mode choose karo:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {MODES.map(mode => (
              <button key={mode.id} onClick={() => setSelectedMode(mode)} style={{
                padding: '14px 18px', borderRadius: 12, border: `2px solid ${selectedMode.id === mode.id ? mode.color : 'var(--border)'}`,
                background: selectedMode.id === mode.id ? mode.color + '12' : 'var(--bg-surface)',
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: selectedMode.id === mode.id ? mode.color : 'var(--tx-1)' }}>{mode.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--tx-4)' }}>{mode.qs} Qs · {mode.time}s each</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--tx-3)', marginTop: 4 }}>{mode.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty filter */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx-2)', marginBottom: 10 }}>Difficulty filter:</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map(d => {
              const c = d === 'Easy' ? '#10b981' : d === 'Medium' ? '#f59e0b' : d === 'Hard' ? '#ef4444' : 'var(--accent)';
              return (
                <button key={d} onClick={() => setDiffFilter(d)} style={{
                  flex: 1, padding: '9px', borderRadius: 8, border: `2px solid ${diffFilter === d ? c : 'var(--border)'}`,
                  background: diffFilter === d ? c + '18' : 'var(--bg-surface)',
                  color: diffFilter === d ? c : 'var(--tx-3)', cursor: 'pointer', fontSize: 13, fontWeight: 700,
                }}>{d}</button>
              );
            })}
          </div>
        </div>

        <button onClick={startSession} style={{
          width: '100%', padding: '16px', borderRadius: 14, border: 'none',
          background: selectedMode.color, color: '#fff', cursor: 'pointer',
          fontSize: 16, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Timer size={20} /> Interview Shuru Karo!
        </button>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link href="/practice" style={{ fontSize: 13, color: 'var(--tx-4)', textDecoration: 'none' }}>← Wapas Practice pe</Link>
        </div>
      </div>
    </div>
  );

  // ─── RESULTS ───
  if (phase === 'results') {
    const grade = score >= 80 ? { label: 'Excellent! 🏆', color: '#10b981' } : score >= 60 ? { label: 'Good job! 👍', color: '#f59e0b' } : { label: 'Practice aur karo! 💪', color: '#ef4444' };
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ width: '100%', maxWidth: 600 }}>
          {/* Score */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 56, fontWeight: 900, color: grade.color, lineHeight: 1 }}>{score}%</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: grade.color, marginTop: 8 }}>{grade.label}</div>
            <div style={{ fontSize: 13, color: 'var(--tx-3)', marginTop: 6 }}>
              {correctCount} / {answers.length} correct · Time: {fmt(sessionTime)}
            </div>
          </div>

          {/* Per-question breakdown */}
          <div style={{ background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border)', padding: '18px 20px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--tx-1)', marginBottom: 14 }}>📋 Question Review</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {questions.map((q, i) => {
                const ans = answers[i];
                const qMeta = PATTERN_META[q.patternId];
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: !ans ? 'var(--bg-elevated)' : ans.correct ? '#10b98110' : ans.skipped ? 'var(--bg-elevated)' : '#ef444410', border: `1px solid ${!ans ? 'var(--border)' : ans.correct ? '#10b98130' : ans.skipped ? 'var(--border)' : '#ef444430'}` }}>
                    {!ans ? <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--border)' }} /> : ans.correct ? <CheckCircle2 size={18} color="#10b981" /> : ans.skipped ? <XCircle size={18} color="var(--tx-4)" /> : <XCircle size={18} color="#ef4444" />}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx-1)' }}>#{q.id} {q.title}</div>
                      <div style={{ fontSize: 12, color: qMeta?.color ?? 'var(--tx-4)', marginTop: 2 }}>{qMeta?.icon} {qMeta?.name}</div>
                    </div>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: (DIFF_C[q.difficulty] ?? '#10b981') + '20', color: DIFF_C[q.difficulty] ?? '#10b981', fontWeight: 700 }}>{q.difficulty}</span>
                    <a href={q.leetcodeUrl} target="_blank" rel="noopener" style={{ color: 'var(--tx-4)' }}><ExternalLink size={13} /></a>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => { setPhase('setup'); }} style={{ flex: 1, padding: '12px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--tx-1)', cursor: 'pointer', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <RotateCcw size={16} /> New Session
            </button>
            <Link href="/practice" style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              💻 Practice Questions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── ACTIVE SESSION ───
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <div style={{ padding: '14px 24px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--tx-1)' }}>
          Question {qIdx + 1} / {questions.length}
        </div>
        <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--bg-elevated)', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 3, background: 'var(--accent)', width: `${((qIdx + (showAnswer ? 1 : 0)) / questions.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        {/* Timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 80, height: 6, borderRadius: 3, background: 'var(--bg-elevated)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 3, background: timerColor, width: `${timerPct}%`, transition: 'width 1s linear' }} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: timerColor, fontFamily: 'monospace', minWidth: 36 }}>{timeLeft}s</div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--tx-3)', fontFamily: 'monospace' }}>
          ✅ {correctCount} / {qIdx + (showAnswer ? 1 : 0)}
        </div>
        <div style={{ fontSize: 13, color: 'var(--tx-4)' }}>🕐 {fmt(sessionTime)}</div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ width: '100%', maxWidth: 680 }}>

          {/* Question card */}
          <div style={{ padding: '24px 28px', background: 'var(--bg-surface)', borderRadius: 16, border: '1px solid var(--border)', marginBottom: 20 }}>
            <div style={{ display: 'flex', align: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, padding: '4px 12px', borderRadius: 20, background: (DIFF_C[currentQ?.difficulty] ?? '#10b981') + '20', color: DIFF_C[currentQ?.difficulty] ?? '#10b981', fontWeight: 800 }}>{currentQ?.difficulty}</span>
              <a href={currentQ?.leetcodeUrl} target="_blank" rel="noopener" style={{ fontSize: 11, padding: '4px 12px', borderRadius: 20, background: '#f59e0b20', color: '#f59e0b', fontWeight: 700, textDecoration: 'none', border: '1px solid #f59e0b40', display: 'flex', alignItems: 'center', gap: 4 }}>
                <ExternalLink size={11} /> LeetCode pe dekho
              </a>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: 'var(--tx-1)', margin: '0 0 12px' }}>#{currentQ?.id}. {currentQ?.title}</h2>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {currentQ?.tags.slice(0, 4).map((t, i) => (
                <span key={i} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 8, background: 'var(--bg-elevated)', color: 'var(--tx-3)', border: '1px solid var(--border)' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Pattern choices */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx-2)', marginBottom: 12, textAlign: 'center' }}>
              🤔 Kaunsa pattern use karoge?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {options.map((p, i) => {
                const m = PATTERN_META[p];
                const isChosen = chosen === p;
                const isCorrect = p === currentQ?.patternId;
                const showResult = showAnswer;
                const btnColor = !showResult ? 'var(--border)' : isCorrect ? '#10b98150' : isChosen && !isCorrect ? '#ef444450' : 'var(--border)';
                const textColor = !showResult ? 'var(--tx-1)' : isCorrect ? '#10b981' : isChosen && !isCorrect ? '#ef4444' : 'var(--tx-3)';
                const bg = !showResult ? 'var(--bg-surface)' : isCorrect ? '#10b98112' : isChosen && !isCorrect ? '#ef444412' : 'var(--bg-surface)';
                return (
                  <button key={i} onClick={() => handleChoose(p)} disabled={!!showResult} style={{
                    padding: '14px 18px', borderRadius: 12, border: `2px solid ${btnColor}`,
                    background: bg, cursor: showResult ? 'default' : 'pointer', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { if (!showResult) { const el = e.currentTarget as HTMLElement; el.style.border = `2px solid ${m?.color}50`; el.style.background = m?.color + '10'; } }}
                    onMouseLeave={e => { if (!showResult) { const el = e.currentTarget as HTMLElement; el.style.border = '2px solid var(--border)'; el.style.background = 'var(--bg-surface)'; } }}>
                    <span style={{ fontSize: 22 }}>{m?.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: textColor }}>{m?.name}</span>
                    {showResult && isCorrect && <CheckCircle2 size={16} color="#10b981" style={{ marginLeft: 'auto' }} />}
                    {showResult && isChosen && !isCorrect && <XCircle size={16} color="#ef4444" style={{ marginLeft: 'auto' }} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Answer reveal */}
          {showAnswer && (
            <div style={{ padding: '16px 20px', borderRadius: 12, border: `1px solid ${meta?.color}40`, background: meta?.color + '10', marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: meta?.color, marginBottom: 8 }}>
                {meta?.icon} Answer: {meta?.name}
              </div>
              <div style={{ fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--tx-1)' }}>Pattern kyu?</strong> Tags dekho: <em>{currentQ?.tags.slice(0, 3).join(', ')}</em> — ye {meta?.name} ka clear signal hai.
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <Link href={`/patterns/${currentQ?.patternId}`} style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: meta?.color + '20', color: meta?.color, border: `1px solid ${meta?.color}40`, textDecoration: 'none', fontWeight: 700 }}>
                  📚 {meta?.name} pattern →
                </Link>
                <Link href={`/practice/${currentQ?.id}`} style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'var(--bg-elevated)', color: 'var(--tx-2)', border: '1px solid var(--border)', textDecoration: 'none', fontWeight: 600 }}>
                  💻 Full analysis →
                </Link>
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            {!showAnswer && (
              <button onClick={handleSkip} style={{ flex: 1, padding: '12px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--tx-3)', cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>
                Skip →
              </button>
            )}
            {showAnswer && (
              <button onClick={handleNext} style={{ flex: 1, padding: '14px', borderRadius: 12, border: 'none', background: 'var(--accent)', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                {qIdx >= questions.length - 1 ? <><Trophy size={16} /> Results dekho!</> : <>Agla Question <ChevronRight size={16} /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
