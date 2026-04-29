import React, { useState } from 'react';
import { GENS } from '../data/gens';
import { RAW } from '../data/patterns';

const DS_ICONS = { Linear: '📏', 'Non-Linear': '🌲', Both: '🔀' };

export default function PatternSidebar({ curPat, setCurPat, patDone, linfo }) {
  const [q, setQ] = useState('');
  let idx = 1;

  return (
    <aside className="w-[210px] flex-shrink-0 bg-white border-r border-[#e4e2db] flex flex-col overflow-hidden">
      {/* Search */}
      <div className="p-2 border-b border-[#e4e2db] flex-shrink-0">
        <input
          value={q}
          onChange={e => setQ(e.target.value.toLowerCase())}
          placeholder="pattern search..."
          className="w-full bg-[#f7f5f0] border border-[#e4e2db] rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-[#1c1b19] outline-none focus:border-[#d0cec7] placeholder-[#ccc]"
        />
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-1 p-1.5 pb-3">
        {GENS.map(gen => {
          const vis = gen.patterns.filter(p => RAW[p] && (!q || p.toLowerCase().includes(q)));
          if (!vis.length) { idx += gen.patterns.length; return null; }

          return (
            <div key={gen.id}>
              {/* Gen header */}
              {!q && (
                <div className="flex items-center gap-1.5 px-1.5 pt-2.5 pb-1">
                  <span style={{ color: gen.color }} className="text-[9px]">●</span>
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-[#bbb]">{gen.label}</span>
                  <div className="flex-1 h-px bg-[#e4e2db]" />
                </div>
              )}

              {gen.patterns.map(p => {
                const mi = idx++;
                if (!RAW[p]) return null;
                if (q && !p.toLowerCase().includes(q)) return null;
                const probs = RAW[p];
                const dc = patDone(p);
                const pct = probs.length ? Math.round(dc / probs.length * 100) : 0;
                const li = linfo[p] || { ds: 'Both' };
                const isActive = p === curPat;

                return (
                  <button
                    key={p}
                    onClick={() => setCurPat(p)}
                    className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md mb-px border text-left transition-all
                      ${isActive
                        ? 'border-[#e4e2db]'
                        : 'border-transparent hover:bg-[#f2f0eb]'}`}
                    style={isActive ? { background: gen.bg } : {}}
                  >
                    <span
                      className="font-mono text-[9px] min-w-[16px] flex-shrink-0"
                      style={{ color: isActive ? gen.color : '#ccc' }}
                    >
                      {String(mi).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-[11px] font-medium flex-1 leading-tight text-left line-clamp-2
                        ${isActive ? 'text-[#1c1b19]' : 'text-[#999]'}`}
                    >
                      {p}
                    </span>
                    {/* DS badge */}
                    <span className="text-[10px] flex-shrink-0">{DS_ICONS[li.ds]}</span>
                    {/* Mini progress */}
                    <div className="w-5 h-[3px] bg-[#e4e2db] rounded-full overflow-hidden flex-shrink-0">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: gen.color }}
                      />
                    </div>
                    <span className="font-mono text-[9px] text-[#ccc] flex-shrink-0 min-w-[22px] text-right">
                      {dc}/{probs.length}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
