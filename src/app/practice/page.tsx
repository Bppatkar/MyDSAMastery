'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { useProgressStore } from '@/store/useProgressStore';
import { PATTERN_META } from '@/lib/constants';

import { CheckCircle2, Circle, Clock, ExternalLink, Search, ChevronDown, X } from 'lucide-react';
import { ALL_QUESTION_STUBS, type QuestionStub } from '../data/questions';

type Diff = 'Easy' | 'Medium' | 'Hard';
type StatusFilter = 'all' | 'Todo' | 'Attempted' | 'Solved';

const DIFF_STYLE = {
  Easy:   { bg: 'rgba(34,197,94,0.12)',  text: '#22c55e', border: 'rgba(34,197,94,0.25)' },
  Medium: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
  Hard:   { bg: 'rgba(239,68,68,0.12)',  text: '#ef4444', border: 'rgba(239,68,68,0.25)' },
};

export default function PracticePage() {
  const th = useTheme();
  const { totalSolved, easySolved, mediumSolved, hardSolved, solvedQuestions, attemptedQuestions, markSolved, unmark } = useProgressStore();

  const [search, setSearch]             = useState('');
  const [patternFilter, setPattern]     = useState('all');
  const [diffFilter, setDiff]           = useState<'all' | Diff>('all');
  const [statusFilter, setStatus]       = useState<StatusFilter>('all');
  const [groupByPattern, setGrouped]    = useState(false);

  const getStatus = (id: number) => {
    if (solvedQuestions.includes(id))   return 'Solved';
    if (attemptedQuestions.includes(id)) return 'Attempted';
    return 'Todo';
  };

  const filtered = useMemo(() => {
    return ALL_QUESTION_STUBS.filter(q => {
      if (patternFilter !== 'all' && q.patternId !== patternFilter) return false;
      if (diffFilter !== 'all' && q.difficulty !== diffFilter) return false;
      const s = getStatus(q.id);
      if (statusFilter !== 'all' && s !== statusFilter) return false;
      if (search) {
        const lo = search.toLowerCase();
        if (!q.title.toLowerCase().includes(lo) && !q.tags.some(t => t.toLowerCase().includes(lo))) return false;
      }
      return true;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, patternFilter, diffFilter, statusFilter, solvedQuestions, attemptedQuestions]);

  const total    = ALL_QUESTION_STUBS.length;
  const pct      = Math.round((totalSolved / total) * 100);

  const grouped = useMemo(() => {
    if (!groupByPattern) return null;
    const map: Record<string, typeof filtered> = {};
    for (const q of filtered) {
      if (!map[q.patternName]) map[q.patternName] = [];
      map[q.patternName].push(q);
    }
    return map;
  }, [filtered, groupByPattern]);

  const handleMark = (q: QuestionStub) => {
    if (getStatus(q.id) === 'Solved') {
      unmark(q.id, q.patternId); // ← UNTICK
    } else {
      markSolved(q.id, q.difficulty, q.patternId);
    }
  };

  const QuestionRow = ({ q, idx }: { q: QuestionStub; idx: number }) => {
    const status = getStatus(q.id);
    const dc = DIFF_STYLE[q.difficulty];
    const solved = status === 'Solved';

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '38px 32px 1fr 130px 120px 80px 28px',
        alignItems: 'center',
        padding: '10px 16px',
        borderBottom: `1px solid ${th.border}`,
        background: 'transparent',
        opacity: solved ? 0.6 : 1,
        transition: 'background 0.1s',
        gap: 4,
      }}
        onMouseEnter={e => (e.currentTarget.style.background = th.bgHover)}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>

        {/* Row number */}
        <div style={{ fontSize: 11, color: th.tx4, fontFamily: 'monospace', textAlign: 'right' }}>
          {idx + 1}
        </div>

        {/* ✅ Tick button */}
        <button
          onClick={() => handleMark(q)}
          title={solved ? 'Click to unmark' : 'Mark as solved'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {solved
            ? <CheckCircle2 style={{ width: 18, height: 18, color: th.accent }} />
            : status === 'Attempted'
              ? <Clock style={{ width: 18, height: 18, color: '#f59e0b' }} />
              : <Circle style={{ width: 18, height: 18, color: th.borderStr }} />}
        </button>

        {/* Title + tags */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: 3 }}>
            <span style={{ fontSize: 11, color: th.tx4, fontFamily: 'monospace' }}>#{q.id}</span>
            <Link
              href={`/practice/${q.id}`}
              prefetch={false}
              style={{
                fontSize: 13, fontWeight: 600,
                color: solved ? th.tx3 : th.tx1,
                textDecoration: solved ? 'line-through' : 'none',
              }}>
              {q.title}
            </Link>
            <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 4, fontWeight: 700, background: dc.bg, color: dc.text, border: `1px solid ${dc.border}` }}>
              {q.difficulty}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {q.tags.slice(0, 3).map(t => (
              <span key={t} style={{ fontSize: 10, color: th.tx4, background: th.bgElevated, padding: '1px 6px', borderRadius: 4, border: `1px solid ${th.border}` }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Pattern badge */}
        <div style={{ fontSize: 10, fontWeight: 600, color: th.accent, background: th.accentBg, padding: '3px 8px', borderRadius: 20, border: `1px solid ${th.accentBdr}`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {q.patternName}
        </div>

        {/* Companies */}
        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {(q.companies ?? []).slice(0, 2).map(c => (
            <span key={c} style={{ fontSize: 10, color: th.tx4, background: th.bgElevated, padding: '1px 5px', borderRadius: 4, border: `1px solid ${th.border}` }}>{c}</span>
          ))}
        </div>

        {/* Frequency dots */}
        <div style={{ display: 'flex', gap: 2 }}>
          {[1,2,3,4,5].map(d => (
            <div key={d} style={{ width: 5, height: 5, borderRadius: '50%', background: d <= Math.ceil(q.frequency / 2) ? th.accent : th.border }} />
          ))}
        </div>

        {/* LC link */}
        <a href={q.leetcodeUrl} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{ color: th.tx4, display: 'flex', padding: 3, borderRadius: 4 }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = th.accent)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = th.tx4)}>
          <ExternalLink style={{ width: 12, height: 12 }} />
        </a>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: th.bgBase }}>

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div style={{ background: th.bgSurface, borderBottom: `1px solid ${th.border}`, padding: '20px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Title + Stats row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14, marginBottom: 16 }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 900, color: th.tx1, margin: '0 0 3px' }}>
                <span style={{ color: th.accent }}>&lt;/&gt;</span> Practice Problems
              </h1>
              <p style={{ fontSize: 12, color: th.tx3, margin: 0 }}>450 questions — 15 patterns master karo, phir har question solve ho jaata hai</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { l: 'Solved',  v: totalSolved, t: total, c: th.accent },
                { l: 'Easy',    v: easySolved,  t: null,  c: '#22c55e' },
                { l: 'Medium',  v: mediumSolved,t: null,  c: '#f59e0b' },
                { l: 'Hard',    v: hardSolved,  t: null,  c: '#ef4444' },
              ].map(({ l, v, t, c }) => (
                <div key={l} style={{ textAlign: 'center', padding: '7px 14px', borderRadius: 9, background: th.bgCard, border: `1px solid ${th.border}` }}>
                  <div style={{ fontSize: 17, fontWeight: 900, color: c }}>{v}{t ? `/${t}` : ''}</div>
                  <div style={{ fontSize: 10, color: th.tx3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: th.tx3 }}>{totalSolved} / {total} problems solved</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: th.accent }}>{pct}%</span>
            </div>
            <div style={{ height: 5, background: th.border, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${th.accent}, #6366f1)`, borderRadius: 3, transition: 'width 0.5s ease' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTERS ─────────────────────────────────────────────── */}
      <div style={{ background: th.bgSurface, borderBottom: `1px solid ${th.border}`, padding: '12px 28px', position: 'sticky', top: 64, zIndex: 30 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>

          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 180 }}>
            <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 13, height: 13, color: th.tx4 }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search problems or tags..."
              style={{ width: '100%', padding: '7px 28px 7px 30px', borderRadius: 8, fontSize: 12, border: `1px solid ${th.border}`, outline: 'none', boxSizing: 'border-box' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: th.tx4 }}>
                <X style={{ width: 11, height: 11 }} />
              </button>
            )}
          </div>

          {/* Pattern dropdown */}
          <div style={{ position: 'relative' }}>
            <select value={patternFilter} onChange={e => setPattern(e.target.value)}
              style={{ padding: '7px 28px 7px 10px', borderRadius: 8, fontSize: 12, border: `1px solid ${th.border}`, cursor: 'pointer', outline: 'none', appearance: 'none', minWidth: 130 }}>
              <option value="all">All Patterns</option>
              {PATTERN_META.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <ChevronDown style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 12, height: 12, color: th.tx3, pointerEvents: 'none' }} />
          </div>

          {/* Difficulty pills */}
          {(['all', 'Easy', 'Medium', 'Hard'] as const).map(d => (
            <button key={d} onClick={() => setDiff(d)} style={{
              padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 0.1s',
              border: `1px solid ${diffFilter === d
                ? (d === 'Easy' ? '#22c55e' : d === 'Medium' ? '#f59e0b' : d === 'Hard' ? '#ef4444' : th.accent)
                : th.border}`,
              background: diffFilter === d
                ? (d === 'Easy' ? 'rgba(34,197,94,0.12)' : d === 'Medium' ? 'rgba(245,158,11,0.12)' : d === 'Hard' ? 'rgba(239,68,68,0.12)' : th.accentBg)
                : 'transparent',
              color: diffFilter === d
                ? (d === 'Easy' ? '#22c55e' : d === 'Medium' ? '#f59e0b' : d === 'Hard' ? '#ef4444' : th.accent)
                : th.tx3,
            }}>{d === 'all' ? 'All' : d}</button>
          ))}

          {/* Status dropdown */}
          <div style={{ position: 'relative' }}>
            <select value={statusFilter} onChange={e => setStatus(e.target.value as StatusFilter)}
              style={{ padding: '7px 28px 7px 10px', borderRadius: 8, fontSize: 12, border: `1px solid ${th.border}`, cursor: 'pointer', outline: 'none', appearance: 'none' }}>
              <option value="all">All Status</option>
              <option value="Todo">⬜ Todo</option>
              <option value="Attempted">🕐 Attempted</option>
              <option value="Solved">✅ Solved</option>
            </select>
            <ChevronDown style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 12, height: 12, color: th.tx3, pointerEvents: 'none' }} />
          </div>

          {/* Group toggle */}
          <button onClick={() => setGrouped(g => !g)} style={{
            padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: 'pointer',
            border: `1px solid ${groupByPattern ? th.accent : th.border}`,
            background: groupByPattern ? th.accentBg : 'transparent',
            color: groupByPattern ? th.accent : th.tx3,
          }}>
            {groupByPattern ? '⊞ By Pattern' : '≡ By Pattern'}
          </button>

          <span style={{ fontSize: 11, color: th.tx4, marginLeft: 'auto' }}>{filtered.length} problems</span>
        </div>
      </div>

      {/* ── QUESTION LIST ────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 20px' }}>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: th.tx3, fontSize: 14, background: th.bgCard, borderRadius: 14, border: `1px solid ${th.border}` }}>
            No problems found. Filters change karo.
          </div>
        ) : (
          <div style={{ background: th.bgCard, border: `1px solid ${th.border}`, borderRadius: 14, overflow: 'hidden' }}>

            {/* Column headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '38px 32px 1fr 130px 120px 80px 28px', padding: '8px 16px', borderBottom: `1px solid ${th.border}`, background: th.bgElevated, gap: 4 }}>
              {['#', '', 'Title', 'Pattern', 'Companies', 'Freq', ''].map((h, i) => (
                <div key={i} style={{ fontSize: 10, fontWeight: 700, color: th.tx4, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</div>
              ))}
            </div>

            {/* Rows — grouped or flat */}
            {grouped
              ? Object.entries(grouped).map(([patName, qs]) => (
                  <div key={patName}>
                    <div style={{ padding: '10px 16px', background: th.bgElevated, borderBottom: `1px solid ${th.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: th.accent }}>{patName}</span>
                      <span style={{ fontSize: 11, color: th.tx4 }}>{qs.filter(q => getStatus(q.id) === 'Solved').length}/{qs.length} solved</span>
                    </div>
                    {qs.map((q, i) => <QuestionRow key={q.id} q={q} idx={i} />)}
                  </div>
                ))
              : filtered.map((q, i) => <QuestionRow key={q.id} q={q} idx={i} />)
            }
          </div>
        )}

        {/* Note about full data */}
        <div style={{ marginTop: 16, padding: '10px 14px', borderRadius: 9, background: th.bgElevated, border: `1px solid ${th.border}`, fontSize: 12, color: th.tx3 }}>
          💡 <strong style={{ color: th.tx2 }}>Tick = Solved mark karo.</strong> Question title click karo → full LeetCode-style description + Monaco editor.
          Initially 10 questions mein full detail hai, baaki direct LeetCode redirect karenge.
        </div>
      </div>
    </div>
  );
}