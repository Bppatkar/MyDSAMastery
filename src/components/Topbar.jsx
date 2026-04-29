import React from 'react';

const TABS = [
  { id: 'chain',       icon: '🔗', label: 'DS Chain'    },
  { id: 'patterns',    icon: '🎯', label: '30 Patterns'  },
  { id: 'practice',    icon: '✅', label: 'Practice'     },
  { id: 'book',        icon: '📚', label: 'Book'         },
  { id: 'constraints', icon: '🔍', label: 'Constraints'  },
];

export default function Topbar({ active, setActive, totalDone, total, pct }) {
  return (
    <header className="h-[50px] flex-shrink-0 flex items-center bg-white border-b border-[#e4e2db] px-4 gap-0 z-20">
      {/* Brand */}
      <div className="font-serif text-[16px] text-[#1c1b19] mr-5 flex-shrink-0 select-none">
        DSA <em className="italic text-[#185FA5] not-italic font-serif">Universe</em>
      </div>

      {/* Tabs */}
      <nav className="flex h-full gap-0">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`flex items-center gap-1.5 px-3 h-full text-[12px] font-medium border-b-2 transition-colors select-none whitespace-nowrap
              ${active === t.id
                ? 'text-[#1c1b19] border-[#1c1b19]'
                : 'text-[#aaa] border-transparent hover:text-[#1c1b19]'}`}
          >
            <span className="text-[13px]">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Overall progress */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <span className="text-[11px] text-[#aaa] font-mono">{pct}%</span>
        <div className="w-[90px] h-[4px] bg-[#e4e2db] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#185FA5,#0F6E56)' }}
          />
        </div>
        <span className="font-mono text-[11px] font-medium text-[#1c1b19]">
          {totalDone}<span className="text-[#aaa] font-normal">/{total}</span>
        </span>
      </div>
    </header>
  );
}
