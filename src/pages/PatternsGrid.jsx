import React, { useState } from 'react';
import { GENS, getGen, LV_COLORS } from '../data/gens';
import { RAW, PTYPES, LINFO } from '../data/patterns';

const DS_ICONS  = { Linear: '📏', 'Non-Linear': '🌲', Both: '🔀' };
const DS_COLORS = { Linear: '#185FA5', 'Non-Linear': '#534AB7', Both: '#0F6E56' };
const DS_BGS    = { Linear: '#EFF6FD', 'Non-Linear': '#F3F2FE', Both: '#EDF8F3' };
const DS_BDS    = { Linear: '#B5D4F4', 'Non-Linear': '#CECBF6', Both: '#9FE1CB' };

export default function PatternsGrid({ setCurPat, setPage, patDone }) {
  const [dsFilter, setDsFilter] = useState('all');
  let idx = 1;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Filter bar */}
      <div className="px-5 py-2.5 border-b border-[#e4e2db] bg-white flex items-center gap-2 flex-shrink-0">
        <span className="text-[11px] text-[#aaa] flex-shrink-0">DS type:</span>
        {[
          ['all',        'All'],
          ['Linear',     '📏 Linear'],
          ['Non-Linear', '🌲 Non-Linear'],
          ['Both',       '🔀 Both'],
        ].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setDsFilter(val)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all
              ${dsFilter === val
                ? 'bg-[#1c1b19] text-white border-[#1c1b19]'
                : 'bg-[#f7f5f0] text-[#7a7870] border-[#e4e2db] hover:bg-[#f2f0eb]'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="overflow-y-auto flex-1 p-4">
        <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))' }}>
          {GENS.flatMap(gen =>
            gen.patterns.map(p => {
              const mi = idx++;
              if (!RAW[p]) return null;
              const li = LINFO[p] || { ds: 'Both' };
              if (dsFilter !== 'all' && li.ds !== dsFilter) return null;
              const probs = RAW[p];
              const dc = patDone(p);
              const pct = probs.length ? Math.round(dc / probs.length * 100) : 0;
              const counts = { Easy: 0, Medium: 0, Hard: 0, NO: 0 };
              probs.forEach(pr => counts[pr.level] = (counts[pr.level] || 0) + 1);
              const types = PTYPES[p] || [];
              const typePreview = types.slice(0, 2).map(t => t.type).join(', ') + (types.length > 2 ? ` +${types.length - 2}` : '');

              return (
                <div
                  key={p}
                  className={`bg-white rounded-xl border p-3 transition-all cursor-default group
                    ${pct === 100 ? '' : 'border-[#e4e2db]'} hover:-translate-y-0.5 hover:shadow-sm`}
                  style={pct === 100 ? { borderColor: gen.color } : {}}
                >
                  {/* Head */}
                  <div className="flex items-start gap-1.5 mb-2">
                    <span className="font-mono text-[10px] text-[#ccc] mt-0.5 flex-shrink-0">
                      {String(mi).padStart(2, '0')}
                    </span>
                    <span className="text-[12px] font-semibold text-[#1c1b19] flex-1 leading-tight">{p}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1.5 mb-2 flex-wrap">
                    <span
                      className="text-[10px] font-medium px-1.5 py-px rounded border"
                      style={{ background: gen.bg, borderColor: gen.bd, color: gen.color }}
                    >
                      {gen.short}
                    </span>
                    <span
                      className="text-[10px] font-semibold px-1.5 py-px rounded border"
                      style={{ background: DS_BGS[li.ds], borderColor: DS_BDS[li.ds], color: DS_COLORS[li.ds] }}
                    >
                      {DS_ICONS[li.ds]} {li.ds}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mb-2">
                    <div className="h-[3px] bg-[#e4e2db] rounded-full overflow-hidden mb-1">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: gen.color }} />
                    </div>
                    <div className="flex justify-between font-mono text-[10px] text-[#aaa]">
                      <span>{dc}/{probs.length} done</span>
                      <span>{pct}%</span>
                    </div>
                  </div>

                  {/* Types preview */}
                  {types.length > 0 && (
                    <div className="text-[11px] text-[#aaa] mb-2 leading-snug">
                      {types.length} types: {typePreview}
                    </div>
                  )}

                  {/* Difficulty chips */}
                  <div className="flex gap-1 flex-wrap mb-2">
                    {(['Easy','Medium','Hard','NO']).map(lv => counts[lv] ? (
                      <span
                        key={lv}
                        className="text-[10px] font-semibold px-1.5 py-px rounded border"
                        style={{
                          color: LV_COLORS[lv].text,
                          background: LV_COLORS[lv].bg,
                          borderColor: LV_COLORS[lv].border
                        }}
                      >
                        {lv === 'NO' ? 'P' : lv[0]}:{counts[lv]}
                      </span>
                    ) : null)}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => { setCurPat(p); setPage('practice'); }}
                    className="w-full py-1.5 rounded-lg text-[11px] font-medium text-[#7a7870] border border-[#e4e2db] bg-[#f7f5f0] hover:bg-[#f2f0eb] hover:text-[#1c1b19] hover:border-[#d0cec7] transition-all"
                  >
                    ✅ Practice →
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
