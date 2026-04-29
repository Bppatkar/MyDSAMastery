import React, { useState, useMemo } from 'react';
import { getGen, LV_LABELS, LV_ORDER, LV_COLORS, LV_DOT } from '../data/gens';
import { RAW, PTYPES, LINFO } from '../data/patterns';

const DS_ICONS = { Linear: '📏', 'Non-Linear': '🌲', Both: '🔀' };
const DS_COLORS = { Linear: '#185FA5', 'Non-Linear': '#534AB7', Both: '#0F6E56' };
const DS_BGS    = { Linear: '#EFF6FD', 'Non-Linear': '#F3F2FE', Both: '#EDF8F3' };
const DS_BDS    = { Linear: '#B5D4F4', 'Non-Linear': '#CECBF6', Both: '#9FE1CB' };

function LvBadge({ level }) {
  const c = LV_COLORS[level] || LV_COLORS.NO;
  return (
    <span
      className="text-[10px] font-semibold px-1.5 py-px rounded flex-shrink-0 border"
      style={{ color: c.text, background: c.bg, borderColor: c.border }}
    >
      {LV_LABELS[level]}
    </span>
  );
}

function ProbRow({ prob, pat, isDone, toggle }) {
  const done = isDone(pat, prob.no);
  return (
    <div
      onClick={() => toggle(pat, prob.no)}
      className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border cursor-pointer transition-all mb-1
        ${done ? 'opacity-40 border-[#e4e2db] bg-white' : 'border-[#e4e2db] bg-white hover:bg-[#f7f5f0] hover:border-[#d0cec7]'}`}
    >
      {/* Checkbox */}
      <div className={`w-[15px] h-[15px] rounded-[3px] flex-shrink-0 flex items-center justify-center border-[1.5px] transition-all
        ${done ? 'bg-[#1D9E75] border-[#1D9E75]' : 'border-[#d0cec7]'}`}>
        {done && <span className="text-white text-[8px] font-black">✓</span>}
      </div>
      <span className="font-mono text-[10px] text-[#ccc] min-w-[18px] flex-shrink-0">
        {String(prob.no).padStart(2, '0')}
      </span>
      <span className={`text-[12px] flex-1 leading-tight ${done ? 'line-through text-[#bbb]' : 'text-[#3d3d3a]'}`}>
        {prob.title}
      </span>
      <LvBadge level={prob.level} />
      <a
        href={prob.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className="w-6 h-6 flex items-center justify-center rounded bg-[#f7f5f0] border border-[#e4e2db] text-[#bbb] text-[11px] flex-shrink-0 hover:text-[#1c1b19] hover:border-[#d0cec7] transition-all"
      >
        ↗
      </a>
    </div>
  );
}

export default function PracticePanel({ curPat, setCurPat, isDone, toggle, patDone, setPage }) {
  const [lvFilter, setLvFilter] = useState('all');
  const [search, setSearch] = useState('');

  const gen = getGen(curPat);
  const li  = LINFO[curPat] || { ds: 'Both', note: '' };
  const probs = RAW[curPat] || [];
  const types = PTYPES[curPat] || [];

  const dc  = patDone(curPat);
  const pct = probs.length ? Math.round(dc / probs.length * 100) : 0;

  const counts = useMemo(() => {
    const c = { Easy: 0, Medium: 0, Hard: 0, NO: 0 };
    probs.forEach(p => c[p.level] = (c[p.level] || 0) + 1);
    return c;
  }, [curPat]);

  const filtered = useMemo(() => probs.filter(p => {
    const lm = lvFilter === 'all' || p.level === lvFilter;
    const sm = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return lm && sm;
  }), [probs, lvFilter, search]);

  const renderProblems = () => {
    if (!filtered.length) return (
      <div className="text-center py-10 text-[12px] text-[#ccc] font-mono">koi problem nahi mila 🤔</div>
    );

    // Type-grouped view (only when no filter/search active)
    if (types.length && lvFilter === 'all' && !search) {
      const assigned = new Set();
      const sections = types.map((t, i) => {
        const typeProbs = t.nos?.length
          ? t.nos.map(n => probs.find(p => p.no === n)).filter(Boolean)
          : [];
        typeProbs.forEach(p => assigned.add(p.no));
        return { t, i, typeProbs };
      });

      const unassigned = filtered.filter(p => !assigned.has(p.no));

      return (
        <>
          {sections.map(({ t, i, typeProbs }) => (
            <div key={i} className="mb-5">
              {/* Type header */}
              <div
                className="flex items-start gap-2.5 p-3 rounded-xl mb-2 border"
                style={{ background: gen.bg, borderColor: gen.bd }}
              >
                <span className="font-mono text-[10px] font-bold mt-0.5" style={{ color: gen.color }}>
                  Type {i + 1}
                </span>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-[#1c1b19] mb-0.5">{t.type}</div>
                  <div className="text-[12px] text-[#7a7870] leading-relaxed">{t.hint}</div>
                </div>
              </div>
              {typeProbs.length > 0
                ? typeProbs.map(p => <ProbRow key={p.no} prob={p} pat={curPat} isDone={isDone} toggle={toggle} />)
                : <p className="text-[11px] text-[#bbb] italic px-2 py-1.5">Difficulty filter use karo ya search karo.</p>
              }
            </div>
          ))}

          {unassigned.length > 0 && (
            <div className="mb-5">
              <div className="flex items-start gap-2.5 p-3 rounded-xl mb-2 border border-[#e4e2db] bg-[#f7f5f0]">
                <span className="font-mono text-[10px] font-bold text-[#7a7870] mt-0.5">+{unassigned.length}</span>
                <div>
                  <div className="text-[13px] font-semibold text-[#7a7870]">Remaining Problems</div>
                  <div className="text-[12px] text-[#aaa]">Multiple types ka combination — depth practice ke liye</div>
                </div>
              </div>
              {LV_ORDER.map(lv => {
                const g = unassigned.filter(p => p.level === lv);
                if (!g.length) return null;
                return (
                  <div key={lv}>
                    <div className="flex items-center gap-1.5 py-1.5 border-b border-[#e4e2db] mb-1.5">
                      <div className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: LV_DOT[lv] }} />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#bbb]">{LV_LABELS[lv]}</span>
                    </div>
                    {g.map(p => <ProbRow key={p.no} prob={p} pat={curPat} isDone={isDone} toggle={toggle} />)}
                  </div>
                );
              })}
            </div>
          )}
        </>
      );
    }

    // Fallback: difficulty grouped
    return LV_ORDER.map(lv => {
      const g = filtered.filter(p => p.level === lv);
      if (!g.length) return null;
      return (
        <div key={lv} className="mb-4">
          <div className="flex items-center gap-1.5 py-1.5 border-b border-[#e4e2db] mb-1.5">
            <div className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: LV_DOT[lv] }} />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#bbb]">
              {LV_LABELS[lv]} — {g.length}
            </span>
          </div>
          {g.map(p => <ProbRow key={p.no} prob={p} pat={curPat} isDone={isDone} toggle={toggle} />)}
        </div>
      );
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-3 pb-2.5 border-b border-[#e4e2db] bg-white flex-shrink-0">
        <div className="flex items-start gap-2.5 mb-2">
          <div className="flex-1">
            {/* Tags */}
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span
                className="text-[9px] font-semibold uppercase tracking-wider px-2 py-px rounded border"
                style={{ background: gen.bg, borderColor: gen.bd, color: gen.color }}
              >
                {gen.label}
              </span>
              <span
                className="text-[9px] font-semibold px-2 py-px rounded border"
                style={{ background: DS_BGS[li.ds], borderColor: DS_BDS[li.ds], color: DS_COLORS[li.ds] }}
              >
                {DS_ICONS[li.ds]} {li.ds}
              </span>
            </div>
            <h2 className="font-serif text-[20px] text-[#1c1b19] leading-tight">{curPat}</h2>
            {li.note && <p className="text-[11px] text-[#aaa] mt-0.5">{li.note}</p>}
          </div>
          <button
            onClick={() => setPage('patterns')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-[#7a7870] border border-[#e4e2db] bg-[#f7f5f0] hover:text-[#1c1b19] hover:border-[#d0cec7] transition-all flex-shrink-0"
          >
            ← Patterns
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-[16px] font-semibold leading-none" style={{ color: gen.color }}>
            {dc}<span className="text-[11px] text-[#aaa] font-normal ml-0.5">/{probs.length}</span>
          </span>
          <div className="flex-1 h-[3px] bg-[#e4e2db] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: gen.color }} />
          </div>
          <span className="text-[11px] font-bold" style={{ color: gen.color }}>{pct}%</span>
        </div>

        {/* Filter chips */}
        <div className="flex gap-1.5 flex-wrap">
          {[['all', 'All', counts.Easy + counts.Medium + counts.Hard + counts.NO, '#888', '#f2f0eb', '#d0cec7'],
            ['Easy', 'Easy', counts.Easy, '#3B6D11', '#eaf3de', '#c0dd97'],
            ['Medium', 'Medium', counts.Medium, '#633806', '#FAEEDA', '#FAC775'],
            ['Hard', 'Hard', counts.Hard, '#791F1F', '#FCEBEB', '#F7C1C1'],
            ['NO', 'Premium', counts.NO, '#3C3489', '#EEEDFE', '#CECBF6'],
          ].map(([val, label, cnt, tc, bg, bd]) => (
            <button
              key={val}
              onClick={() => setLvFilter(val)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all
                ${lvFilter === val ? 'font-bold' : ''}`}
              style={{
                color: tc, background: bg, borderColor: bd,
                filter: lvFilter === val ? 'brightness(.88)' : 'none',
              }}
            >
              <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: tc }} />
              {label} {cnt}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-5 py-2 border-b border-[#e4e2db] bg-[#f7f5f0] flex-shrink-0">
        <span className="text-[10px] text-[#bbb] flex-shrink-0 font-mono">search:</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="problem dhundo..."
          className="flex-1 bg-white border border-[#e4e2db] rounded-lg px-2.5 py-1.5 text-[12px] text-[#1c1b19] outline-none focus:border-[#d0cec7] placeholder-[#ccc] font-sans"
        />
      </div>

      {/* Problems */}
      <div className="overflow-y-auto flex-1 px-5 py-3">
        {renderProblems()}
      </div>
    </div>
  );
}
