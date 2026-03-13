'use client';
import { useState, useMemo } from 'react';
import {
  RECOGNITION_CHALLENGES, CHALLENGES_BY_PATTERN, PATTERN_META_MAP, ALL_PATTERN_IDS,
  type RecognitionChallenge,
} from '@/lib/recognitionData';
import { PATTERN_TYPES, EXTRA_PATTERN_TYPES } from '@/lib/patternTypes';
import { DECISION_RULES, RULES_BY_PATTERN, type DecisionRule } from '@/lib/decisionMatrix';
import { CheckCircle2, XCircle, ChevronRight, ExternalLink, Brain, Search, BookOpen, ChevronDown, ChevronUp, Target } from 'lucide-react';

const ALL_PATTERN_TYPES_DATA = [...PATTERN_TYPES, ...EXTRA_PATTERN_TYPES];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const DIFF_COLOR: Record<string, string> = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };
type Tab = 'trainer' | 'deep-guide' | 'pattern-types';

// ═══════════════════════════════════════════════════════════════
// STEP CARD — Accordion (no overflow:hidden on outer, just body)
// ═══════════════════════════════════════════════════════════════
function StepCard({
  stepNum, revealed, onReveal, title, subtitle, icon, color, children,
}: {
  stepNum: number; revealed: boolean; onReveal: () => void;
  title: string; subtitle: string; icon: string; color: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      borderRadius: 12,
      border: `1px solid ${revealed ? color + '50' : 'var(--border)'}`,
      background: 'var(--bg-surface)',
      transition: 'border-color 0.3s',
      // NO overflow:hidden — that was causing the collapse bug
    }}>
      {/* Header */}
      <button
        onClick={revealed ? undefined : onReveal}
        style={{
          width: '100%', padding: '14px 16px', background: 'transparent', border: 'none',
          cursor: revealed ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
          borderRadius: revealed ? '12px 12px 0 0' : 12,
        }}
      >
        <div style={{
          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
          background: revealed ? color : 'var(--bg-elevated)',
          border: `2px solid ${revealed ? color : 'var(--border)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, transition: 'all 0.3s',
        }}>
          {revealed ? icon : <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--tx-3)' }}>{stepNum}</span>}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: revealed ? color : 'var(--tx-2)' }}>{title}</div>
          <div style={{ fontSize: 12, color: 'var(--tx-4)', marginTop: 2 }}>{subtitle}</div>
        </div>
        {!revealed && (
          <div style={{
            padding: '5px 14px', borderRadius: 20, background: color + '20',
            color, fontSize: 12, fontWeight: 700, border: `1px solid ${color}40`, whiteSpace: 'nowrap',
          }}>
            Dekho →
          </div>
        )}
      </button>

      {/* Body — conditionally rendered, NOT hidden */}
      {revealed && (
        <div style={{
          padding: '4px 16px 16px',
          borderTop: `1px solid ${color}25`,
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TRAINER TAB
// ═══════════════════════════════════════════════════════════════
function TrainerTab() {
  const [filterPattern, setFilterPattern] = useState('all');
  const [qIdx, setQIdx] = useState(0);
  const [revealedSteps, setRevealedSteps] = useState<Set<number>>(new Set());
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const pool = useMemo(() => {
    if (filterPattern === 'all') return shuffle([...RECOGNITION_CHALLENGES]);
    return shuffle(CHALLENGES_BY_PATTERN[filterPattern] ?? []);
  }, [filterPattern]);

  const q = pool[qIdx % Math.max(pool.length, 1)] as RecognitionChallenge;
  const options = useMemo(() => {
    if (!q) return [];
    const others = ALL_PATTERN_IDS.filter(p => p !== q.correct_pattern);
    return shuffle([q.correct_pattern, ...shuffle(others).slice(0, 3)]);
  }, [q]);

  const correctMeta = PATTERN_META_MAP[q?.correct_pattern ?? ''];
  const isCorrect = chosen === q?.correct_pattern;
  const revealStep = (n: number) => setRevealedSteps(prev => new Set([...prev, n]));

  const next = () => {
    setQIdx(i => i + 1);
    setRevealedSteps(new Set());
    setChosen(null);
  };
  const reset = () => {
    setQIdx(0); setRevealedSteps(new Set()); setChosen(null);
    setScore({ correct: 0, total: 0 });
  };
  const handleChoose = (p: string) => {
    if (chosen) return;
    setChosen(p);
    setScore(s => ({ correct: s.correct + (p === q.correct_pattern ? 1 : 0), total: s.total + 1 }));
  };

  if (!q) return null;
  const lcUrl = `https://leetcode.com/problems/${q.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`;

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 130px)', overflow: 'hidden' }}>

      {/* ══ LEFT: Problem Statement (English) ══ */}
      <div style={{
        width: '44%', flexShrink: 0, borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {/* Filter */}
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)', display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <select value={filterPattern} onChange={e => { setFilterPattern(e.target.value); setQIdx(0); setRevealedSteps(new Set()); setChosen(null); }}
            style={{ flex: 1, padding: '5px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 12 }}>
            <option value="all">All ({RECOGNITION_CHALLENGES.length})</option>
            {Object.entries(PATTERN_META_MAP).map(([k, v]) => (
              <option key={k} value={k}>{v.icon} {v.name}</option>
            ))}
          </select>
          <span style={{ fontSize: 12, color: 'var(--tx-4)', whiteSpace: 'nowrap' }}>
            #{qIdx % pool.length + 1}/{pool.length}
          </span>
          {score.total > 0 && (
            <span style={{ fontSize: 12, fontWeight: 700, color: score.correct / score.total >= 0.7 ? '#10b981' : '#ef4444' }}>
              {score.correct}/{score.total}
            </span>
          )}
          <button onClick={reset} style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--tx-3)', cursor: 'pointer', fontSize: 11 }}>Reset</button>
        </div>

        {/* Problem header */}
        <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid var(--border)', flexShrink: 0, background: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--tx-1)' }}>
              #{q.leetcode_num}. {q.title}
            </span>
            <a href={lcUrl} target="_blank" rel="noopener" style={{ color: 'var(--tx-4)', display: 'flex' }}>
              <ExternalLink size={13} />
            </a>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: `${DIFF_COLOR[q.difficulty]}20`, color: DIFF_COLOR[q.difficulty], border: `1px solid ${DIFF_COLOR[q.difficulty]}40` }}>
              {q.difficulty}
            </span>
            <a href={lcUrl} target="_blank" rel="noopener"
              style={{ fontSize: 12, padding: '3px 12px', borderRadius: 12, background: '#f59e0b20', color: '#f59e0b', border: '1px solid #f59e0b40', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
              <ExternalLink size={11} /> LeetCode pe Padho
            </a>
          </div>
        </div>

        {/* Problem body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px' }}>
          <p style={{ fontSize: 14, color: 'var(--tx-1)', lineHeight: 1.9, marginBottom: 20 }}>
            {q.description}
          </p>

          {/* Constraints */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              ⚡ Constraints
            </div>
            <div style={{ background: 'var(--bg-base)', borderRadius: 8, padding: '10px 14px', border: '1px solid var(--border)' }}>
              {q.constraints.map((c, i) => (
                <div key={i} style={{ fontSize: 13, color: 'var(--tx-1)', fontFamily: 'monospace', padding: '3px 0', display: 'flex', gap: 8, lineHeight: 1.7 }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>•</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              🔑 Keywords to Notice
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {q.keywords.map((kw, i) => (
                <span key={i} style={{
                  fontSize: 12, padding: '5px 12px', borderRadius: 20, fontWeight: 600,
                  background: chosen ? correctMeta?.color + '15' : 'var(--accent-bg)',
                  border: `1px solid ${chosen ? (correctMeta?.color ?? 'var(--accent)') + '40' : 'var(--accent-bdr)'}`,
                  color: chosen ? correctMeta?.color : 'var(--accent)',
                  transition: 'all 0.3s',
                }}>{kw}</span>
              ))}
            </div>
          </div>

          {/* Tip: open on LeetCode */}
          <div style={{ padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)', fontSize: 12, color: 'var(--tx-3)', lineHeight: 1.6 }}>
            💡 Agar problem zyada complex lage — <a href={lcUrl} target="_blank" rel="noopener" style={{ color: 'var(--accent)', fontWeight: 700 }}>LeetCode pe full examples dekho</a>, phir wapas aao aur pattern identify karo.
          </div>
        </div>
      </div>

      {/* ══ RIGHT: 4-Step Analysis (Hinglish) ══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-base)' }}>

        {/* Step progress */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
          {[1, 2, 3, 4].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? 1 : 'none' }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${revealedSteps.has(s) ? 'var(--accent)' : 'var(--border)'}`,
                background: revealedSteps.has(s) ? 'var(--accent)' : 'var(--bg-elevated)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800,
                color: revealedSteps.has(s) ? '#fff' : 'var(--tx-3)',
                transition: 'all 0.3s',
              }}>{s}</div>
              {i < 3 && <div style={{ flex: 1, height: 2, background: revealedSteps.has(s + 1) ? 'var(--accent)' : 'var(--border)', margin: '0 6px', transition: 'all 0.3s' }} />}
            </div>
          ))}
          <span style={{ fontSize: 11, color: 'var(--tx-4)', marginLeft: 12, whiteSpace: 'nowrap' }}>
            {revealedSteps.size === 0 ? 'Step 1 se shuru karo' : `${revealedSteps.size}/4 revealed`}
          </span>
        </div>

        {/* Scrollable steps area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* STEP 1 */}
          <StepCard stepNum={1} revealed={revealedSteps.has(1)} onReveal={() => revealStep(1)}
            title="Constraints dekho — kitna time milega?" subtitle="n ki value → time complexity decide hoti hai" icon="🔢" color="#6366f1">
            <div style={{ fontSize: 15, fontWeight: 800, color: '#6366f1', margin: '12px 0 8px', fontFamily: 'monospace' }}>
              n = {q.step1.n_value}
            </div>
            <div style={{ fontSize: 14, color: 'var(--tx-1)', padding: '10px 14px', background: '#6366f115', borderRadius: 8, border: '1px solid #6366f130', marginBottom: 10, lineHeight: 1.7 }}>
              ✅ Isliye time complexity chahiye: <strong style={{ color: '#6366f1' }}>{q.step1.time_needed}</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {q.step1.eliminates.map((e, i) => (
                <div key={i} style={{ fontSize: 13, color: '#ef4444', display: 'flex', gap: 8, lineHeight: 1.6 }}>
                  <span style={{ flexShrink: 0 }}>❌</span>
                  <span><strong>Nahi chalega:</strong> {e}</span>
                </div>
              ))}
              {q.step1.allows.map((a, i) => (
                <div key={i} style={{ fontSize: 13, color: '#10b981', display: 'flex', gap: 8, lineHeight: 1.6 }}>
                  <span style={{ flexShrink: 0 }}>✅</span>
                  <span><strong>Consider karo:</strong> {a}</span>
                </div>
              ))}
            </div>
          </StepCard>

          {/* STEP 2 */}
          <StepCard stepNum={2} revealed={revealedSteps.has(2)} onReveal={() => revealStep(2)}
            title="Input dekho — kaunsa pattern fit hoga?" subtitle="Input format → pattern narrow ho jaata hai" icon="📥" color="#f59e0b">
            <div style={{ fontSize: 16, fontWeight: 800, color: '#f59e0b', margin: '12px 0 10px' }}>
              Input: {q.step2.input_type}
            </div>
            {q.step2.hints.map((h, i) => (
              <div key={i} style={{ fontSize: 14, color: 'var(--tx-1)', padding: '10px 14px', marginBottom: 8, background: '#f59e0b10', borderRadius: 8, border: '1px solid #f59e0b25', display: 'flex', gap: 10, lineHeight: 1.7 }}>
                <span style={{ color: '#f59e0b', flexShrink: 0 }}>💡</span>
                <span>{h}</span>
              </div>
            ))}
          </StepCard>

          {/* STEP 3 */}
          <StepCard stepNum={3} revealed={revealedSteps.has(3)} onReveal={() => revealStep(3)}
            title="Output dekho — kya return karna hai?" subtitle="Output type → approach decide hoti hai" icon="📤" color="#10b981">
            <div style={{ fontSize: 16, fontWeight: 800, color: '#10b981', margin: '12px 0 10px' }}>
              Output: {q.step3.output_type}
            </div>
            {q.step3.hints.map((h, i) => (
              <div key={i} style={{ fontSize: 14, color: 'var(--tx-1)', padding: '10px 14px', marginBottom: 8, background: '#10b98110', borderRadius: 8, border: '1px solid #10b98125', display: 'flex', gap: 10, lineHeight: 1.7 }}>
                <span style={{ color: '#10b981', flexShrink: 0 }}>→</span>
                <span>{h}</span>
              </div>
            ))}
            {/* Step 4 preview keywords */}
            <div style={{ padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)', marginTop: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 6 }}>Inme se koi keyword dikhta hai? → Pattern confirm!</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {q.step4_keywords.map((kw, i) => (
                  <span key={i} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 5, background: 'var(--accent-bg)', color: 'var(--accent)', fontFamily: 'monospace', fontWeight: 600, border: '1px solid var(--accent-bdr)' }}>{kw}</span>
                ))}
              </div>
            </div>
          </StepCard>

          {/* STEP 4 */}
          <StepCard stepNum={4} revealed={revealedSteps.has(4)} onReveal={() => revealStep(4)}
            title="Pattern + Algorithm — final decision!" subtitle="Kaunsa type, kaunsa DS, aur kyu?" icon="🎯" color="#ec4899">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '12px 0 12px' }}>
              <span style={{ fontSize: 24 }}>{correctMeta?.icon}</span>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: correctMeta?.color }}>{correctMeta?.name}</div>
                <div style={{ fontSize: 13, color: 'var(--tx-3)' }}>{q.correct_type}</div>
              </div>
            </div>

            <div style={{ fontSize: 14, color: 'var(--tx-1)', lineHeight: 1.8, marginBottom: 12, padding: '12px 16px', background: `${correctMeta?.color ?? '#10b981'}10`, borderRadius: 10, border: `1px solid ${correctMeta?.color ?? '#10b981'}30` }}>
              <strong>Kyu ye pattern?</strong> {q.why_pattern}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
              <div style={{ padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 4 }}>DATA STRUCTURE</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx-1)' }}>{q.correct_ds}</div>
              </div>
              <div style={{ padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 4 }}>COMPLEXITY</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  <span style={{ color: correctMeta?.color }}>T: {q.time_complexity}</span>
                  <span style={{ color: 'var(--tx-4)', margin: '0 5px' }}>|</span>
                  <span style={{ color: 'var(--tx-2)' }}>S: {q.space_complexity}</span>
                </div>
              </div>
            </div>

            {/* Approach — multi-line code block */}
            <div style={{ padding: '12px 14px', background: 'var(--bg-base)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 8 }}>APPROACH:</div>
              <pre style={{
                margin: 0, fontSize: 12, color: 'var(--tx-1)', lineHeight: 1.8,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              }}>
                {q.approach_line}
              </pre>
            </div>
          </StepCard>

          {/* Pattern Guess */}
          <div style={{ padding: '16px', background: 'var(--bg-surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--tx-1)', marginBottom: 12, textAlign: 'center' }}>
              {chosen
                ? (isCorrect ? '🎉 Sahi jawab!' : '❌ Galat — sahi jawab ye hai:')
                : '🤔 Ab batao — kaunsa pattern hai?'}
            </div>

            {!chosen ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {options.map(p => {
                  const m = PATTERN_META_MAP[p];
                  return (
                    <button key={p} onClick={() => handleChoose(p)} style={{
                      padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border)',
                      background: 'var(--bg-base)', cursor: 'pointer', textAlign: 'left',
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontSize: 13, color: 'var(--tx-1)', fontWeight: 600, transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.border = `1px solid ${m?.color ?? 'var(--accent)'}60`;
                        el.style.background = `${m?.color ?? '#10b981'}10`;
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.border = '1px solid var(--border)';
                        el.style.background = 'var(--bg-base)';
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{m?.icon}</span>
                      <span>{m?.name}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div>
                <div style={{ padding: '12px 16px', borderRadius: 10, background: isCorrect ? '#10b98115' : '#ef444415', border: `1px solid ${isCorrect ? '#10b98140' : '#ef444440'}`, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                  {isCorrect ? <CheckCircle2 size={22} color="#10b981" /> : <XCircle size={22} color="#ef4444" />}
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: isCorrect ? '#10b981' : '#ef4444' }}>
                      {isCorrect ? 'Bilkul sahi! ✅' : 'Galat ❌'}
                    </div>
                    {!isCorrect && (
                      <div style={{ fontSize: 13, color: 'var(--tx-2)', marginTop: 2 }}>
                        Sahi: {correctMeta?.icon} <strong>{correctMeta?.name}</strong> — {q.why_pattern.substring(0, 80)}...
                      </div>
                    )}
                  </div>
                </div>
                <button onClick={next} style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  Agla Question <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DEEP GUIDE TAB
// ═══════════════════════════════════════════════════════════════
function DeepGuideTab() {
  const [search, setSearch] = useState('');
  const [selPattern, setSelPattern] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let rules = DECISION_RULES as DecisionRule[];
    if (selPattern !== 'all') rules = rules.filter(r => r.pattern === selPattern);
    if (search.trim()) {
      const q = search.toLowerCase();
      rules = rules.filter(r =>
        r.input_signals.join(' ').toLowerCase().includes(q) ||
        r.keyword_signals.join(' ').toLowerCase().includes(q) ||
        r.pattern.toLowerCase().includes(q) ||
        r.mental_model.toLowerCase().includes(q)
      );
    }
    return rules;
  }, [search, selPattern]);

  const patternOptions = [...new Set(DECISION_RULES.map((r: DecisionRule) => r.pattern))];

  return (
    <div style={{ padding: '20px 24px', overflowY: 'auto', height: 'calc(100vh - 170px)' }}>
      <div style={{ background: 'var(--accent-bg)', borderRadius: 12, border: '1px solid var(--accent-bdr)', padding: '12px 18px', marginBottom: 20 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--accent)', marginBottom: 4 }}>📊 Deep Decision Guide — {DECISION_RULES.length} Rules</div>
        <div style={{ fontSize: 13, color: 'var(--tx-2)' }}>Har rule: kab lagao, kyu lagao, kya galti mat karo — Hinglish mein</div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--tx-4)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search pattern, keyword, signal..."
            style={{ width: '100%', padding: '8px 10px 8px 32px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 13, boxSizing: 'border-box' }} />
        </div>
        <select value={selPattern} onChange={e => setSelPattern(e.target.value)}
          style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 12 }}>
          <option value="all">All Patterns</option>
          {patternOptions.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((rule: DecisionRule) => {
          const meta = PATTERN_META_MAP[rule.pattern] ?? { color: '#10b981', icon: '🔹', name: rule.pattern };
          const isOpen = expanded === rule.id;
          return (
            <div key={rule.id} style={{ borderRadius: 12, border: `1px solid ${isOpen ? meta.color + '40' : 'var(--border)'}`, background: 'var(--bg-surface)', transition: 'border-color 0.2s' }}>
              <button onClick={() => setExpanded(isOpen ? null : rule.id)}
                style={{ width: '100%', padding: '14px 18px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{meta.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--tx-1)' }}>{rule.mental_model}</div>
                  <div style={{ fontSize: 12, color: meta.color, fontWeight: 600, marginTop: 2 }}>{meta.name} → {rule.pattern_type}</div>
                </div>
                {isOpen ? <ChevronUp size={16} color="var(--tx-3)" /> : <ChevronDown size={16} color="var(--tx-3)" />}
              </button>
              {isOpen && (
                <div style={{ padding: '0 18px 18px', borderTop: `1px solid ${meta.color}20` }}>
                  <div style={{ paddingTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 8 }}>📡 INPUT SIGNALS</div>
                      {rule.input_signals.map((s: string, i: number) => (
                        <div key={i} style={{ fontSize: 13, color: 'var(--tx-1)', padding: '3px 0', display: 'flex', gap: 6, lineHeight: 1.5 }}>
                          <span style={{ color: meta.color }}>•</span>{s}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 8 }}>🔑 KEYWORDS</div>
                      {rule.keyword_signals.map((s: string, i: number) => (
                        <div key={i} style={{ fontSize: 13, color: 'var(--tx-1)', padding: '3px 0', fontFamily: 'monospace', display: 'flex', gap: 6, lineHeight: 1.5 }}>
                          <span style={{ color: meta.color }}>•</span>{s}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: '10px 14px', background: meta.color + '10', borderRadius: 8, border: `1px solid ${meta.color}25`, marginBottom: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 4 }}>🧠 APPROACH</div>
                    <pre style={{ margin: 0, fontSize: 13, color: 'var(--tx-1)', lineHeight: 1.8, fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{rule.approach}</pre>
                  </div>
                  <div style={{ padding: '10px 14px', background: '#ef444410', borderRadius: 8, border: '1px solid #ef444425' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', marginBottom: 4 }}>⚠️ COMMON MISTAKE</div>
                    <div style={{ fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.6 }}>{rule.wrong_choice}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PATTERN TYPES TAB — Fixed: uses 'types' not 'subtypes'
// ═══════════════════════════════════════════════════════════════
function PatternTypesTab() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ padding: '20px 24px', overflowY: 'auto', height: 'calc(100vh - 170px)' }}>
      <div style={{ background: 'var(--accent-bg)', borderRadius: 12, border: '1px solid var(--accent-bdr)', padding: '12px 18px', marginBottom: 20 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--accent)', marginBottom: 4 }}>
          🗂️ Pattern Types — {ALL_PATTERN_TYPES_DATA.length} Patterns
        </div>
        <div style={{ fontSize: 13, color: 'var(--tx-2)' }}>
          Har pattern ke subtypes — triggers dekho, DS choose karo, approach samjho
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ALL_PATTERN_TYPES_DATA.map(pat => {
          const meta = PATTERN_META_MAP[pat.id] ?? { color: pat.color ?? 'var(--accent)', icon: pat.icon ?? '🔹', name: pat.name };
          const isOpen = expanded === pat.id;
          const types = pat.types ?? [];

          return (
            <div key={pat.id} style={{ borderRadius: 12, border: `1px solid ${isOpen ? meta.color + '40' : 'var(--border)'}`, background: 'var(--bg-surface)', transition: 'border-color 0.2s' }}>
              <button onClick={() => setExpanded(isOpen ? null : pat.id)}
                style={{ width: '100%', padding: '14px 18px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                <span style={{ fontSize: 24 }}>{meta.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--tx-1)' }}>{meta.name}</div>
                  <div style={{ fontSize: 12, color: meta.color, marginTop: 2, fontWeight: 600 }}>{types.length} types</div>
                </div>
                {isOpen ? <ChevronUp size={16} color="var(--tx-3)" /> : <ChevronDown size={16} color="var(--tx-3)" />}
              </button>

              {isOpen && (
                <div style={{ padding: '0 18px 18px', borderTop: `1px solid ${meta.color}20` }}>
                  <div style={{ paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {types.length === 0 ? (
                      <div style={{ fontSize: 13, color: 'var(--tx-4)', padding: '10px 0' }}>No subtypes defined yet.</div>
                    ) : types.map((sub, si) => (
                      <div key={si} style={{ padding: '14px 16px', background: meta.color + '08', borderRadius: 10, border: `1px solid ${meta.color}25` }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: meta.color, marginBottom: 8 }}>{sub.name}</div>
                        {sub.description && (
                          <div style={{ fontSize: 13, color: 'var(--tx-2)', marginBottom: 8, lineHeight: 1.6 }}>{sub.description}</div>
                        )}
                        {sub.triggers && sub.triggers.length > 0 && (
                          <div style={{ marginBottom: 8 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)' }}>🎯 TRIGGERS: </span>
                            <span style={{ fontSize: 12, color: 'var(--tx-2)' }}>{Array.isArray(sub.triggers) ? sub.triggers.join(', ') : sub.triggers}</span>
                          </div>
                        )}
                        {sub.dataStructure && (
                          <div style={{ marginBottom: 8 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)' }}>🗂️ DS: </span>
                            <span style={{ fontSize: 12, color: 'var(--tx-2)', fontWeight: 600 }}>{sub.dataStructure}</span>
                          </div>
                        )}
                        {sub.approach && (
                          <div style={{ background: 'var(--bg-base)', borderRadius: 8, padding: '8px 12px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 4 }}>APPROACH:</div>
                            <div style={{ fontSize: 12, color: 'var(--tx-1)', fontFamily: 'monospace', lineHeight: 1.7 }}>{sub.approach}</div>
                          </div>
                        )}
                        <div style={{ fontSize: 11, color: 'var(--tx-4)', marginTop: 8, fontFamily: 'monospace' }}>
                          T: {sub.complexity?.time} | S: {sub.complexity?.space}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function PatternRecognitionPage() {
  const [tab, setTab] = useState<Tab>('trainer');

  const tabs = [
    { id: 'trainer' as Tab, label: '🎯 Pattern Trainer' },
    { id: 'deep-guide' as Tab, label: '📖 Decision Guide' },
    { id: 'pattern-types' as Tab, label: '🗂️ Pattern Types' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '14px 24px 0', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--accent-bg)', border: '1px solid var(--accent-bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={20} color="var(--accent)" />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--tx-1)' }}>Pattern Recognition Training</div>
            <div style={{ fontSize: 12, color: 'var(--tx-3)' }}>
              {RECOGNITION_CHALLENGES.length} LeetCode problems · {DECISION_RULES.length} decision rules · Hinglish mein
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--border)', marginLeft: -24, marginRight: -24, paddingLeft: 24 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '10px 18px', background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 600,
              color: tab === t.id ? 'var(--accent)' : 'var(--tx-3)',
              borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent',
              transition: 'all 0.2s',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {tab === 'trainer' && <TrainerTab />}
        {tab === 'deep-guide' && <DeepGuideTab />}
        {tab === 'pattern-types' && <PatternTypesTab />}
      </div>
    </div>
  );
}
