import React, { useState, useRef, useEffect } from 'react';
import { BOOK_DATA } from '../data/bookData';
import { getGen } from '../data/gens';

const SECTIONS = {
  ds:   { label: 'Data Structures', color: '#185FA5', bg: '#E6F1FB', bd: '#B5D4F4', badge: '📦 DS' },
  algo: { label: 'Algorithms',       color: '#0F6E56', bg: '#E1F5EE', bd: '#9FE1CB', badge: '⚙️ Algo' },
};

function cleanTitle(title) {
  return title.replace(/^CHAPTER \d+ — |^CHAPTER \d+ |^SECTION [A-Z] — /, '');
}

export default function BookPage({ setCurPat, setPage }) {
  const [curId, setCurId] = useState(BOOK_DATA[0]?.id);
  const [typeFilter, setTypeFilter] = useState('all');
  const [q, setQ] = useState('');
  const contentRef = useRef(null);

  const chapter = BOOK_DATA.find(c => c.id === curId);
  const idx = BOOK_DATA.indexOf(chapter);
  const prev = BOOK_DATA[idx - 1];
  const next = BOOK_DATA[idx + 1];

  const goChapter = (id) => {
    setCurId(id);
    contentRef.current?.scrollTo(0, 0);
  };

  const sec = chapter ? SECTIONS[chapter.type] : SECTIONS.ds;

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Book sidebar */}
      <aside className="w-[220px] flex-shrink-0 bg-white border-r border-[#e4e2db] flex flex-col overflow-hidden">
        {/* Search + filter */}
        <div className="p-2 border-b border-[#e4e2db] flex flex-col gap-1.5 flex-shrink-0">
          <input
            value={q}
            onChange={e => setQ(e.target.value.toLowerCase())}
            placeholder="chapter search..."
            className="w-full bg-[#f7f5f0] border border-[#e4e2db] rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-[#1c1b19] outline-none focus:border-[#d0cec7] placeholder-[#ccc]"
          />
          <div className="flex gap-1">
            {[['all','All'],['ds','📦 DS'],['algo','⚙️ Algo']].map(([val,label]) => (
              <button
                key={val}
                onClick={() => setTypeFilter(val)}
                className={`flex-1 text-center py-1 rounded-md text-[10px] font-semibold border transition-all
                  ${typeFilter === val ? 'bg-[#1c1b19] text-white border-[#1c1b19]' : 'bg-[#f7f5f0] text-[#7a7870] border-[#e4e2db] hover:bg-[#f2f0eb]'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Chapter list */}
        <div className="overflow-y-auto flex-1 p-1.5 pb-3">
          {['ds','algo'].map(type => {
            if (typeFilter !== 'all' && typeFilter !== type) return null;
            const filtered = BOOK_DATA.filter(c => c.type === type && (!q || c.title.toLowerCase().includes(q)));
            if (!filtered.length) return null;
            const s = SECTIONS[type];
            return (
              <div key={type}>
                <div className="flex items-center gap-1.5 px-1.5 pt-2.5 pb-1">
                  <span className="text-[10px]">{s.badge.split(' ')[0]}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-[#bbb]">{s.label}</span>
                  <div className="flex-1 h-px bg-[#e4e2db]" />
                </div>
                {filtered.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => goChapter(ch.id)}
                    className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md mb-px border text-left transition-all
                      ${ch.id === curId
                        ? `border-[#e4e2db] ${type === 'ds' ? 'bg-[#E6F1FB]' : 'bg-[#E1F5EE]'}`
                        : 'border-transparent hover:bg-[#f2f0eb]'}`}
                  >
                    <span
                      className="font-mono text-[9px] min-w-[18px] flex-shrink-0"
                      style={{ color: ch.id === curId ? s.color : '#ccc' }}
                    >
                      {ch.num}
                    </span>
                    <span className={`text-[11px] font-medium leading-tight line-clamp-2 text-left ${ch.id === curId ? 'text-[#1c1b19]' : 'text-[#999]'}`}>
                      {cleanTitle(ch.title)}
                    </span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto bg-[#f7f5f0]">
        {chapter && (
          <div className="max-w-[700px] mx-auto px-7 py-7 pb-16">
            {/* Chapter header */}
            <div className="mb-6 pb-5 border-b border-[#e4e2db]">
              <div
                className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-px rounded border mb-2.5"
                style={{ background: sec.bg, borderColor: sec.bd, color: sec.color }}
              >
                {sec.badge} {sec.label}
              </div>
              <h1 className="font-serif text-[28px] text-[#1c1b19] leading-tight mb-1">
                {cleanTitle(chapter.title)}
              </h1>
              <p className="text-[12px] text-[#aaa] font-mono">{chapter.title}</p>
            </div>

            {/* Book content */}
            <div
              className="book-prose"
              dangerouslySetInnerHTML={{ __html: chapter.html }}
            />

            {/* Related patterns */}
            {chapter.related?.length > 0 && (
              <div className="mt-8 p-4 rounded-xl bg-white border border-[#e4e2db]">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#aaa] mb-2.5">
                  🎯 Is chapter ke related patterns
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {chapter.related.map(p => {
                    const gen = getGen(p);
                    return (
                      <button
                        key={p}
                        onClick={() => { setCurPat(p); setPage('practice'); }}
                        className="px-3 py-1 rounded-full text-[11px] font-semibold border transition-all hover:-translate-y-px hover:shadow-sm"
                        style={{ background: gen.bg, borderColor: gen.bd, color: gen.color }}
                      >
                        {p} →
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Nav */}
            <div className="flex items-center gap-2 mt-6 pt-5 border-t border-[#e4e2db]">
              {prev
                ? <button onClick={() => goChapter(prev.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium text-[#7a7870] border border-[#e4e2db] bg-white hover:text-[#1c1b19] hover:border-[#d0cec7] transition-all">
                    ← {cleanTitle(prev.title).substring(0, 22)}
                  </button>
                : <div />}
              <div className="flex-1" />
              {next && (
                <button onClick={() => goChapter(next.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium text-[#7a7870] border border-[#e4e2db] bg-white hover:text-[#1c1b19] hover:border-[#d0cec7] transition-all">
                  {cleanTitle(next.title).substring(0, 22)} →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
