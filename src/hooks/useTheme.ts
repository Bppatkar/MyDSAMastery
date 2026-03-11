'use client';
import { useState, useEffect } from 'react';

export function useTheme() {
  // next-themes adds 'dark' class on <html> for dark mode
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return {
    isDark,
    bgBase:     isDark ? 'var(--bg-base)'  : '#f4f4f8',
    bgSurface:  isDark ? 'var(--bg-surface)'  : '#ffffff',
    bgElevated: isDark ? 'var(--bg-elevated)'  : '#f0f0f5',
    bgCard:     isDark ? 'var(--bg-card)'  : '#ffffff',
    bgHover:    isDark ? 'var(--bg-hover)'  : 'var(--tx-1)',
    bgInput:    isDark ? '#0a0a12'  : '#f0f0f8',
    border:     isDark ? 'var(--border)'  : '#dddde8',
    borderStr:  isDark ? 'var(--border-strong)'  : '#c8c8d8',
    tx1:        isDark ? 'var(--tx-1)'  : '#0d0d1a',
    tx2:        isDark ? 'var(--tx-2)'  : '#3a3a60',
    tx3:        isDark ? 'var(--tx-3)'  : '#6a6a90',
    tx4:        isDark ? 'var(--tx-4)'  : 'var(--tx-2)',
    accent:     isDark ? '#10b981'  : '#059669',
    accentBg:   isDark ? 'rgba(16,185,129,0.12)' : 'rgba(5,150,105,0.09)',
    accentBdr:  isDark ? 'rgba(16,185,129,0.25)' : 'rgba(5,150,105,0.22)',
    easy:   '#22c55e',
    medium: '#f59e0b',
    hard:   '#ef4444',
  };
}
