import React from 'react';
import { useTheme } from '../context/ThemeContext';

const TABS = [
  { id: 'chain', icon: '🔗', label: 'DS Chain' },
  { id: 'interview', icon: '🎤', label: 'Interview' },
  { id: 'patterns', icon: '🎯', label: '30 Patterns' },
  { id: 'practice', icon: '✅', label: 'Practice' },
  { id: 'book', icon: '📚', label: 'Book' },
  { id: 'constraints', icon: '🔍', label: 'Constraints' },
];

export default function Topbar({ active, setActive, totalDone, total, pct }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="h-[50px] flex-shrink-0 flex items-center bg-white dark:bg-[#2a2a2a] border-b border-[#e4e2db] dark:border-[#444] px-3 md:px-4 gap-0 z-20 transition-colors">
      {/* Brand */}
      <div className="font-serif text-sm md:text-base text-[#1c1b19] dark:text-[#f0f0f0] mr-3 md:mr-5 flex-shrink-0 select-none">
        DSA{' '}
        <em className="italic text-[#185FA5] dark:text-[#64b5f6] not-italic font-serif">
          Universe
        </em>
      </div>

      {/* Tabs - Hide on very small screens */}
      <nav className="hidden sm:flex h-full gap-0">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`flex items-center gap-1.5 px-2 md:px-3 h-full text-[11px] md:text-[12px] font-medium border-b-2 transition-colors select-none whitespace-nowrap
              ${
                active === t.id
                  ? 'text-[#1c1b19] dark:text-[#64b5f6] border-[#1c1b19] dark:border-[#64b5f6]'
                  : 'text-[#aaa] dark:text-[#999] border-transparent hover:text-[#1c1b19] dark:hover:text-[#ddd]'
              }`}
          >
            <span className="text-[12px] md:text-[13px]">{t.icon}</span>
            <span className="hidden md:inline">{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile nav - Show only icons */}
      <nav className="flex sm:hidden h-full gap-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`flex items-center justify-center w-10 h-full border-b-2 transition-colors
              ${
                active === t.id
                  ? 'border-[#1c1b19] dark:border-[#64b5f6]'
                  : 'border-transparent'
              }`}
            title={t.label}
          >
            <span className="text-sm">{t.icon}</span>
          </button>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Overall progress - Hide on small screens */}
      <div className="hidden sm:flex items-center gap-2 md:gap-2.5 flex-shrink-0">
        <span className="text-[10px] md:text-[11px] text-[#aaa] dark:text-[#888] font-mono">
          {pct}%
        </span>
        <div className="w-16 md:w-[90px] h-[4px] bg-[#e4e2db] dark:bg-[#444] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg,#185FA5,#0F6E56)',
            }}
          />
        </div>
        <span className="font-mono text-[10px] md:text-[11px] font-medium text-[#1c1b19] dark:text-[#f0f0f0]">
          {totalDone}
          <span className="text-[#aaa] dark:text-[#888] font-normal">
            /{total}
          </span>
        </span>
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={toggleTheme}
        className="ml-3 flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#e4e2db] dark:hover:bg-[#444] transition-colors flex-shrink-0"
        title="Toggle dark mode"
      >
        {isDark ? (
          <span className="text-base">☀️</span>
        ) : (
          <span className="text-base">🌙</span>
        )}
      </button>
    </header>
  );
}
