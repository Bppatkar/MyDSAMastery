'use client';
import { useState, useMemo } from 'react';
import {
  RECOGNITION_CHALLENGES, CHALLENGES_BY_PATTERN, PATTERN_META_MAP, ALL_PATTERN_IDS,
  type RecognitionChallenge,
} from '@/lib/recognitionData';
import { ALL_PATTERN_TYPES } from '@/lib/patternTypes';
import { DECISION_RULES, RULES_BY_PATTERN, type DecisionRule } from '@/lib/decisionMatrix';
import {
  CheckCircle2, XCircle, ChevronRight, ChevronLeft,
  Search, ExternalLink, Brain,
} from 'lucide-react';

// ─── Utilities ────────────────────────────────────────────────────
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
type Step = 0 | 1 | 2 | 3 | 4;

// ═══════════════════════════════════════════════════════════════
// TRAINER — LeetCode Split View
// ═══════════════════════════════════════════════════════════════
function TrainerTab() {
  const [filterPattern, setFilterPattern] = useState('all');
  const [qIdx, setQIdx] = useState(0);
  const [step, setStep] = useState<Step>(0);
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
  }, [q, qIdx]);

  const correctMeta = PATTERN_META_MAP[q?.correct_pattern ?? ''];
  const isCorrect = chosen === q?.correct_pattern;

  const handleAnswer = (pid: string) => {
    if (chosen !== null) return;
    setChosen(pid);
    setScore(s => ({ correct: s.correct + (pid === q.correct_pattern ? 1 : 0), total: s.total + 1 }));
    setStep(4);
  };

  const next = () => { setChosen(null); setStep(0); setQIdx(i => i + 1); };
  const reset = () => { setChosen(null); setStep(0); setQIdx(0); setScore({ correct: 0, total: 0 }); };

  if (!q) return null;

  // Step analysis cards
  const stepContent: Record<number, React.ReactNode> = {
    1: (
      <div>
        <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--tx-1)', marginBottom: 12 }}>
          🔢 Step 1: Constraints → Time Complexity decide karo
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {q.constraints.map((c, i) => (
            <span key={i} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: 'var(--bg-base)', border: '1px solid var(--accent-bdr)', color: 'var(--tx-1)', fontFamily: 'monospace', fontWeight: 700 }}>{c}</span>
          ))}
        </div>
        <div style={{ background: 'var(--bg-base)', borderRadius: 10, padding: 14, border: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 4 }}>n ki value</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx-1)' }}>{q.step1.n_value}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 4 }}>Needed Complexity</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>{q.step1.time_needed}</div>
            </div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {q.step1.eliminates.map((e, i) => <div key={i} style={{ fontSize: 13, color: '#ef4444', lineHeight: 1.5 }}>❌ {e}</div>)}
            {q.step1.allows.map((a, i) => <div key={i} style={{ fontSize: 13, color: '#10b981', lineHeight: 1.5 }}>✅ {a}</div>)}
          </div>
        </div>
      </div>
    ),
    2: (
      <div>
        <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--tx-1)', marginBottom: 12 }}>📥 Step 2: Input Format → Pattern narrow karo</div>
        <div style={{ background: 'var(--bg-base)', borderRadius: 10, padding: 14, border: '1px solid var(--border)' }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--accent)', marginBottom: 10 }}>{q.step2.input_type}</div>
          {q.step2.hints.map((h, i) => (
            <div key={i} style={{ fontSize: 13, color: 'var(--tx-2)', padding: '6px 0', borderBottom: i < q.step2.hints.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', gap: 8, lineHeight: 1.6 }}>
              <span style={{ color: '#f59e0b', flexShrink: 0 }}>→</span>{h}
            </div>
          ))}
        </div>
      </div>
    ),
    3: (
      <div>
        <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--tx-1)', marginBottom: 12 }}>📤 Step 3: Output Format → Approach decide karo</div>
        <div style={{ background: 'var(--bg-base)', borderRadius: 10, padding: 14, border: '1px solid var(--border)', marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#6366f1', marginBottom: 10 }}>{q.step3.output_type}</div>
          {q.step3.hints.map((h, i) => (
            <div key={i} style={{ fontSize: 13, color: 'var(--tx-2)', padding: '6px 0', borderBottom: i < q.step3.hints.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', gap: 8, lineHeight: 1.6 }}>
              <span style={{ color: '#6366f1', flexShrink: 0 }}>→</span>{h}
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--bg-base)', borderRadius: 8, padding: 12, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 7 }}>🔑 Step 4 mein in words ka dhyan rakhna:</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {q.step4_keywords.map((kw, i) => (
              <span key={i} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--accent-bdr)', fontFamily: 'monospace' }}>{kw}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  };


  return (
    <div style={{ display: 'flex', gap: 0, height: 'calc(100vh - 130px)', overflow: 'hidden' }}>
      {/* ── LEFT: Problem ── */}
      <div style={{ width: '46%', flexShrink: 0, borderRight: '1px solid var(--border)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Filter bar */}
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', flexShrink: 0 }}>
          <select value={filterPattern} onChange={e => { setFilterPattern(e.target.value); setQIdx(0); setChosen(null); setStep(0); setScore({ correct: 0, total: 0 }); }}
            style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 11 }}>
            <option value="all">All ({RECOGNITION_CHALLENGES.length})</option>
            {ALL_PATTERN_IDS.map(pid => {
              const m = PATTERN_META_MAP[pid]; const c = (CHALLENGES_BY_PATTERN[pid] ?? []).length;
              if (!c) return null;
              return <option key={pid} value={pid}>{m.icon} {m.name} ({c})</option>;
            })}
          </select>
          <span style={{ fontSize: 11, color: 'var(--tx-4)' }}>#{qIdx % pool.length + 1}/{pool.length}</span>
          {score.total > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: score.correct / score.total >= 0.7 ? '#10b981' : '#ef4444', marginLeft: 'auto' }}>{score.correct}/{score.total} ({Math.round(score.correct / score.total * 100)}%)</span>}
          <button onClick={reset} style={{ padding: '3px 9px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--tx-3)', cursor: 'pointer', fontSize: 10 }}>Reset</button>
        </div>
        {/* Problem */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--tx-1)' }}>{q.leetcode_num}. {q.title}</span>
            <a href={`https://leetcode.com/problems/${q.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`} target="_blank" rel="noopener" style={{ color: 'var(--tx-4)', display: 'flex' }}><ExternalLink size={12} /></a>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 12, background: `${DIFF_COLOR[q.difficulty]}20`, color: DIFF_COLOR[q.difficulty], border: `1px solid ${DIFF_COLOR[q.difficulty]}40` }}>{q.difficulty}</span>
        </div>
        <div style={{ padding: '18px 20px', overflowY: 'auto', flex: 1 }}>
          {/* Description — plain English, no boxes */}
          <p style={{ fontSize: 15, color: 'var(--tx-1)', lineHeight: 1.85, marginBottom: 20, fontWeight: 400 }}>{q.description}</p>

          {/* Constraints — inline, highlighted */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>⚡ Constraints</div>
            {q.constraints.map((c, i) => (
              <div key={i} style={{ fontSize: 14, color: 'var(--tx-1)', fontFamily: 'monospace', padding: '4px 0', display: 'flex', gap: 8, lineHeight: 1.7 }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>•</span>
                <span>{c}</span>
              </div>
            ))}
          </div>

          {/* Keywords — highlighted pills */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>🔑 Keywords</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {q.keywords.map((kw, i) => (
                <span key={i} style={{
                  fontSize: 12, padding: '4px 11px', borderRadius: 20, fontWeight: 600,
                  background: chosen !== null ? `${correctMeta?.color}18` : 'var(--accent-bg)',
                  border: `1px solid ${chosen !== null ? (correctMeta?.color ?? 'var(--accent)') + '50' : 'var(--accent-bdr)'}`,
                  color: chosen !== null ? correctMeta?.color : 'var(--accent)',
                }}>{kw}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: 4-Step + Answer ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Step bar */}
        <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)', flexShrink: 0, display: 'flex', gap: 8, alignItems: 'center' }}>
          {[1, 2, 3, 4].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div onClick={() => { if (step === 4 || s <= step + 1) setStep(s as Step); }}
                style={{ width: 26, height: 26, borderRadius: '50%', border: `2px solid ${step >= s ? 'var(--accent)' : 'var(--border)'}`, background: step >= s ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: step >= s ? '#fff' : 'var(--tx-3)', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}>{s}</div>
              {s < 4 && <div style={{ width: 20, height: 2, background: step > s ? 'var(--accent)' : 'var(--border)', borderRadius: 2 }} />}
            </div>
          ))}
          <span style={{ fontSize: 10, color: 'var(--tx-4)', marginLeft: 4 }}>
            {step === 0 ? 'Steps se pattern identify karo' : step === 4 ? 'Pattern choose karo' : `Step ${step}/3`}
          </span>
          {step > 0 && step < 4 && <button onClick={() => setStep(4)} style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>Skip →</button>}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
          {/* Step 0: Intro */}
          {step === 0 && (
            <div>
              <div style={{ textAlign: 'center', padding: '16px 0 14px' }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>🤔</div>
                <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--tx-1)', marginBottom: 4 }}>Yeh problem dekho — kaunsa pattern?</div>
                <div style={{ fontSize: 11, color: 'var(--tx-3)', marginBottom: 16 }}>4 steps se systematically identify karo</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                {[
                  { n: 1, icon: '🔢', t: 'Constraints', d: 'n ki value → time complexity' },
                  { n: 2, icon: '📥', t: 'Input Format', d: 'sorted? tree? graph? string?' },
                  { n: 3, icon: '📤', t: 'Output Format', d: 'list of all? single value? boolean?' },
                  { n: 4, icon: '🔑', t: 'Keywords', d: 'trigger words → pattern confirm' },
                ].map(s => (
                  <button key={s.n} onClick={() => setStep(s.n as Step)} style={{ padding: 12, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-elevated)', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 11, color: 'var(--tx-1)', marginBottom: 2 }}>Step {s.n}: {s.t}</div>
                    <div style={{ fontSize: 10, color: 'var(--tx-4)' }}>{s.d}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(4)} style={{ width: '100%', padding: 9, borderRadius: 9, border: '1px dashed var(--border)', background: 'transparent', color: 'var(--tx-3)', cursor: 'pointer', fontSize: 11 }}>
                Seedha pattern choose karo →
              </button>
            </div>
          )}

          {/* Steps 1-3 */}
          {(step === 1 || step === 2 || step === 3) && (
            <div>
              {stepContent[step]}
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                {step > 1 && (
                  <button onClick={() => setStep((step - 1) as Step)} style={{ flex: 1, padding: 9, borderRadius: 9, border: '1px solid var(--border)', background: 'transparent', color: 'var(--tx-2)', cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <ChevronLeft size={12} /> Back
                  </button>
                )}
                <button onClick={() => setStep((step < 3 ? step + 1 : 4) as Step)} style={{ flex: 2, padding: 9, borderRadius: 9, border: 'none', background: 'var(--accent)', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  {step < 3 ? 'Next' : 'Pattern Choose Karo! →'} <ChevronRight size={12} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Pattern choice + answer */}
          {step === 4 && (
            <div>
              {chosen === null ? (
                <div>
                  <div style={{ fontWeight: 800, fontSize: 12, color: 'var(--tx-1)', marginBottom: 10 }}>🎯 Kaunsa pattern use hoga?</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                    {options.map(pid => {
                      const m = PATTERN_META_MAP[pid];
                      return (
                        <button key={pid} onClick={() => handleAnswer(pid)} style={{ padding: '12px 13px', borderRadius: 10, border: '2px solid var(--border)', background: 'var(--bg-elevated)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 9 }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = m.color; (e.currentTarget as HTMLElement).style.background = `${m.color}10`; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'; }}>
                          <span style={{ fontSize: 20 }}>{m.icon}</span>
                          <div style={{ fontWeight: 700, fontSize: 11, color: 'var(--tx-1)' }}>{m.name}</div>
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={() => setStep(1)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--tx-3)', cursor: 'pointer', fontSize: 10 }}>← Steps dekho</button>
                </div>
              ) : (
                <div>
                  {/* Verdict */}
                  <div style={{ padding: '12px 14px', borderRadius: 10, background: isCorrect ? '#10b98115' : '#ef444415', border: `1px solid ${isCorrect ? '#10b98140' : '#ef444440'}`, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isCorrect ? <CheckCircle2 size={20} color="#10b981" /> : <XCircle size={20} color="#ef4444" />}
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 14, color: isCorrect ? '#10b981' : '#ef4444' }}>{isCorrect ? 'Bilkul Sahi! ✅' : 'Galat ❌'}</div>
                      {!isCorrect && <div style={{ fontSize: 13, color: 'var(--tx-2)', marginTop: 2 }}>Sahi jawab: {correctMeta?.icon} {correctMeta?.name}</div>}
                    </div>
                  </div>

                  {/* Full explanation */}
                  <div style={{ background: 'var(--bg-elevated)', borderRadius: 12, border: `1px solid ${correctMeta?.color}30`, padding: 14, marginBottom: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 8 }}>{correctMeta?.icon} Kyu {correctMeta?.name}?</div>
                    <p style={{ fontSize: 14, color: 'var(--tx-1)', lineHeight: 1.75, margin: '0 0 12px' }}>{q.why_pattern}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                      <div style={{ background: 'var(--bg-base)', borderRadius: 8, padding: 9, border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 3 }}>Pattern Type</div>
                        <div style={{ fontSize: 13, color: 'var(--tx-1)', fontWeight: 700 }}>{q.correct_type}</div>
                      </div>
                      <div style={{ background: 'var(--bg-base)', borderRadius: 8, padding: 9, border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 3 }}>Data Structure</div>
                        <div style={{ fontSize: 13, color: 'var(--tx-1)', fontWeight: 700 }}>{q.correct_ds}</div>
                      </div>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 6 }}>Trigger Words</div>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {q.step4_keywords.map((kw, i) => <span key={i} style={{ fontSize: 12, padding: '3px 9px', borderRadius: 5, background: `${correctMeta?.color}20`, color: correctMeta?.color, fontWeight: 700, border: `1px solid ${correctMeta?.color}40`, fontFamily: 'monospace' }}>{kw}</span>)}
                      </div>
                    </div>
                    <div style={{ background: 'var(--bg-base)', borderRadius: 8, padding: 9, border: '1px solid var(--border)', marginBottom: 6 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 4 }}>1-Line Approach</div>
                      <div style={{ fontSize: 12, color: 'var(--tx-1)', fontFamily: 'monospace', lineHeight: 1.7 }}>{q.approach_line}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <span style={{ fontSize: 12, color: 'var(--tx-3)' }}>Time: <strong style={{ color: correctMeta?.color }}>{q.time_complexity}</strong></span>
                      <span style={{ fontSize: 12, color: 'var(--tx-3)' }}>Space: <strong style={{ color: correctMeta?.color }}>{q.space_complexity}</strong></span>
                    </div>
                  </div>

                  <button onClick={next} style={{ width: '100%', padding: 11, borderRadius: 10, border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    Agla Question <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DEEP GUIDE — Full Decision Matrix
// ═══════════════════════════════════════════════════════════════
function DeepGuideTab() {
  const [search, setSearch] = useState('');
  const [selPattern, setSelPattern] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = DECISION_RULES.filter(r => {
    if (selPattern !== 'all' && r.pattern !== selPattern) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return r.keyword_signals.some(k => k.toLowerCase().includes(q))
      || r.input_signals.some(k => k.toLowerCase().includes(q))
      || r.pattern_type.toLowerCase().includes(q)
      || r.pattern.toLowerCase().includes(q);
  });

  const patterns = [...new Set(DECISION_RULES.map(r => r.pattern))];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '16px 16px' }}>
      {/* Header */}
      <div style={{ background: 'var(--accent-bg)', borderRadius: 12, border: '1px solid var(--accent-bdr)', padding: '12px 16px', marginBottom: 14 }}>
        <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--accent)', marginBottom: 4 }}>
          🧠 Pattern Decision Guide — Hinglish mein poori explanation
        </div>
        <div style={{ fontSize: 12, color: 'var(--tx-2)', lineHeight: 1.6 }}>
          Kisi bhi unknown question pe apply karo:<br />
          <strong>Input dekho</strong> → <strong>Constraint dekho</strong> → <strong>Keywords dekho</strong> → <strong>Output dekho</strong> → <strong>Pattern + DS decide karo</strong>
        </div>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={13} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--tx-4)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Keyword ya pattern type search karo..." style={{ width: '100%', padding: '7px 10px 7px 28px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 12, boxSizing: 'border-box' }} />
        </div>
        <select value={selPattern} onChange={e => setSelPattern(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 11 }}>
          <option value="all">All Patterns ({DECISION_RULES.length})</option>
          {patterns.map(p => <option key={p} value={p}>{p} ({(RULES_BY_PATTERN[p] ?? []).length})</option>)}
        </select>
      </div>

      {/* Rule cards */}
      {filtered.map(rule => {
        const isOpen = expandedId === rule.id;
        const patMeta = Object.values(PATTERN_META_MAP).find(m => m.name === rule.pattern) ?? { color: 'var(--accent)', icon: '📌' };

        return (
          <div key={rule.id} style={{ background: 'var(--bg-surface)', borderRadius: 14, border: `1px solid ${isOpen ? patMeta.color + '60' : 'var(--border)'}`, marginBottom: 8, overflow: 'hidden', transition: 'border-color 0.2s' }}>
            {/* Card header — always visible */}
            <button onClick={() => setExpandedId(isOpen ? null : rule.id)}
              style={{ width: '100%', padding: '13px 16px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'start' }}>
              <div>
                {/* Pattern + Type */}
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 5, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: `${patMeta.color}15`, color: patMeta.color, border: `1px solid ${patMeta.color}40` }}>
                    {patMeta.icon} {rule.pattern}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--tx-1)' }}>→ {rule.pattern_type}</span>
                </div>
                {/* IF condition summary */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, color: 'var(--tx-3)' }}>
                    IF: <span style={{ color: 'var(--tx-1)' }}>{rule.input_signals[0]}</span>
                    {rule.keyword_signals[0] && <> + <span style={{ color: 'var(--accent)' }}>{rule.keyword_signals[0]}</span></>}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--tx-4)', fontFamily: 'monospace' }}>{rule.constraint_signal}</span>
                </div>
                {/* Mental model */}
                <div style={{ fontSize: 11, color: patMeta.color, fontWeight: 600, marginTop: 3, fontStyle: 'italic' }}>💡 {rule.mental_model}</div>
              </div>
              <div style={{ fontSize: 16, color: 'var(--tx-4)', transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'none', marginTop: 4 }}>›</div>
            </button>

            {/* Expanded detail */}
            {isOpen && (
              <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${patMeta.color}25` }}>
                {/* IF → THEN summary */}
                <div style={{ background: `${patMeta.color}10`, borderRadius: 10, padding: 12, border: `1px solid ${patMeta.color}25`, marginBottom: 12, marginTop: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: patMeta.color, marginBottom: 8, textTransform: 'uppercase' }}>IF → THEN Decision</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 4 }}>Input Signals</div>
                      {rule.input_signals.map((s, i) => <div key={i} style={{ fontSize: 11, color: 'var(--tx-2)', padding: '2px 0', display: 'flex', gap: 5 }}><span style={{ color: patMeta.color }}>→</span>{s}</div>)}
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 4 }}>Output Signal</div>
                      <div style={{ fontSize: 11, color: 'var(--tx-1)', fontWeight: 600, padding: '2px 0' }}>{rule.output_signal}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx-3)', marginBottom: 4 }}>Keyword Triggers</div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {rule.keyword_signals.map((k, i) => <span key={i} style={{ fontSize: 12, padding: '3px 9px', borderRadius: 5, background: `${patMeta.color}20`, color: patMeta.color, fontFamily: 'monospace', fontWeight: 700 }}>{k}</span>)}
                    </div>
                  </div>
                </div>

                {/* DS explanation */}
                <div style={{ background: 'var(--bg-base)', borderRadius: 10, padding: 12, border: '1px solid var(--border)', marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--tx-1)', marginBottom: 4 }}>🗄️ Data Structure: <span style={{ color: patMeta.color }}>{rule.ds_used}</span></div>
                  <div style={{ fontSize: 12, color: 'var(--tx-2)', lineHeight: 1.7 }}>{rule.why_this_ds}</div>
                </div>

                {/* Approach code */}
                <div style={{ background: '#0f172a', borderRadius: 10, padding: 12, border: '1px solid #1e293b', marginBottom: 10 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 6 }}>Approach (Step by Step)</div>
                  <pre style={{ fontSize: 11, color: '#e2e8f0', lineHeight: 1.7, margin: 0, overflowX: 'auto', whiteSpace: 'pre-wrap' }}>{rule.approach}</pre>
                </div>

                {/* Wrong choice warning */}
                <div style={{ background: '#ef444410', borderRadius: 8, padding: 10, border: '1px solid #ef444430', marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', marginBottom: 3 }}>⚠️ Common Galti:</div>
                  <div style={{ fontSize: 11, color: 'var(--tx-2)' }}>{rule.wrong_choice}</div>
                </div>

                {/* Complexity + Examples */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div style={{ background: 'var(--bg-base)', borderRadius: 8, padding: 9, border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 3 }}>Complexity</div>
                    <div style={{ fontSize: 11, color: 'var(--tx-2)' }}>Time: <strong style={{ color: patMeta.color }}>{rule.time}</strong></div>
                    <div style={{ fontSize: 11, color: 'var(--tx-2)' }}>Space: <strong style={{ color: patMeta.color }}>{rule.space}</strong></div>
                  </div>
                  <div style={{ background: 'var(--bg-base)', borderRadius: 8, padding: 9, border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 3 }}>LeetCode Examples</div>
                    {rule.examples.map((e, i) => (
                      <div key={i} style={{ fontSize: 10, color: 'var(--accent)', padding: '1px 0' }}>• {e}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PATTERN TYPES TAB
// ═══════════════════════════════════════════════════════════════
function PatternTypesTab() {
  const [selP, setSelP] = useState(ALL_PATTERN_TYPES[0].id);
  const [selT, setSelT] = useState(0);
  const pw = ALL_PATTERN_TYPES.find(p => p.id === selP)!;
  const pt = pw.types[selT];

  return (
    <div style={{ display: 'flex', gap: 0, height: 'calc(100vh - 130px)', overflow: 'hidden' }}>
      <div style={{ width: 190, flexShrink: 0, borderRight: '1px solid var(--border)', overflowY: 'auto', padding: 8 }}>
        {ALL_PATTERN_TYPES.map(p => (
          <button key={p.id} onClick={() => { setSelP(p.id); setSelT(0); }}
            style={{ width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 9, marginBottom: 2, border: 'none', cursor: 'pointer', background: selP === p.id ? `${p.color}15` : 'transparent', color: selP === p.id ? p.color : 'var(--tx-2)', outline: selP === p.id ? `1px solid ${p.color}40` : 'none', display: 'flex', gap: 7, alignItems: 'center' }}>
            <span style={{ fontSize: 15 }}>{p.icon}</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontSize: 9, opacity: 0.7 }}>{p.types.length} types</div>
            </div>
          </button>
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '9px 14px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 5, flexWrap: 'wrap', flexShrink: 0 }}>
          {pw.types.map((t, i) => (
            <button key={i} onClick={() => setSelT(i)} style={{ padding: '5px 11px', borderRadius: 20, border: `1px solid ${selT === i ? pw.color : 'var(--border)'}`, background: selT === i ? `${pw.color}15` : 'transparent', color: selT === i ? pw.color : 'var(--tx-2)', fontWeight: selT === i ? 700 : 500, fontSize: 11, cursor: 'pointer' }}>
              {t.name}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
          <div style={{ background: `${pw.color}10`, borderRadius: 11, border: `1px solid ${pw.color}30`, padding: '12px 14px', marginBottom: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--tx-1)', marginBottom: 3 }}>{pt.name}</div>
            <p style={{ fontSize: 12, color: 'var(--tx-2)', lineHeight: 1.7, margin: 0 }}>{pt.description}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 10 }}>
            <div style={{ background: 'var(--bg-elevated)', borderRadius: 9, padding: 11, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 6 }}>🔑 Trigger Words</div>
              {pt.triggers.map((t, i) => (
                <div key={i} style={{ fontSize: 11, padding: '3px 0', color: 'var(--tx-2)', borderBottom: i < pt.triggers.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', gap: 5 }}>
                  <span style={{ color: pw.color }}>→</span>"{t}"
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--bg-elevated)', borderRadius: 9, padding: 11, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 5 }}>🗄️ Data Structure</div>
              <div style={{ fontSize: 12, color: 'var(--tx-1)', fontWeight: 700, marginBottom: 9 }}>{pt.dataStructure}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', marginBottom: 3 }}>Complexity</div>
              <div style={{ fontSize: 11, color: 'var(--tx-2)' }}>Time: <span style={{ color: pw.color, fontWeight: 700 }}>{pt.complexity.time}</span></div>
              <div style={{ fontSize: 11, color: 'var(--tx-2)' }}>Space: <span style={{ color: pw.color, fontWeight: 700 }}>{pt.complexity.space}</span></div>
            </div>
          </div>
          <div style={{ background: '#0f172a', borderRadius: 9, padding: 11, border: '1px solid #1e293b', marginBottom: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 5 }}>📐 Approach</div>
            <pre style={{ fontSize: 11, color: '#e2e8f0', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>{pt.approach}</pre>
          </div>
          <div style={{ background: `${pw.color}10`, borderRadius: 9, padding: 11, border: `1px solid ${pw.color}30` }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: pw.color, textTransform: 'uppercase', marginBottom: 4 }}>💡 Classic Example</div>
            <div style={{ fontSize: 12, color: 'var(--tx-1)', lineHeight: 1.7 }}>{pt.example}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function PatternRecognitionPage() {
  const [tab, setTab] = useState<Tab>('trainer');

  const TABS = [
    { id: 'trainer' as Tab,     label: '🎯 Pattern Trainer' },
    { id: 'deep-guide' as Tab,  label: '📖 Deep Decision Guide' },
    { id: 'pattern-types' as Tab, label: '🗂️ Pattern Types' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '0 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0 0' }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--accent-bg)', border: '1px solid var(--accent-bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>🧠</div>
          <div>
            <h1 style={{ fontSize: 15, fontWeight: 900, color: 'var(--tx-1)', margin: 0 }}>Pattern Recognition Training</h1>
            <p style={{ fontSize: 10, color: 'var(--tx-3)', margin: 0 }}>
              {RECOGNITION_CHALLENGES.length} LeetCode problems · {DECISION_RULES.length} decision rules — Hinglish mein
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, marginTop: 6 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '8px 14px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: tab === t.id ? 'var(--accent)' : 'var(--tx-3)', borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent' }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {tab === 'trainer'       && <TrainerTab />}
        {tab === 'deep-guide'    && <div style={{ height: 'calc(100vh - 130px)', overflowY: 'auto' }}><DeepGuideTab /></div>}
        {tab === 'pattern-types' && <PatternTypesTab />}
      </div>
    </div>
  );
}
