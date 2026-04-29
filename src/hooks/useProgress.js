import { useState, useCallback, useMemo } from 'react';
import { RAW } from '../data/patterns';

const KEY = 'dsa_universe_v4';

export function useProgress() {
  const [done, setDone] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch { return []; }
  });

  const pid = (p, n) => `${p}||${n}`;

  const isDone = useCallback((p, n) => done.includes(pid(p, n)), [done]);

  const toggle = useCallback((p, n) => {
    setDone(prev => {
      const k = pid(p, n);
      const next = prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const patDone = useCallback((p) => {
    return (RAW[p] || []).filter(pr => done.includes(pid(p, pr.no))).length;
  }, [done]);

  const total = useMemo(() => Object.values(RAW).reduce((s, a) => s + a.length, 0), []);
  const totalDone = done.length;
  const pct = Math.round(totalDone / total * 100);

  return { isDone, toggle, patDone, total, totalDone, pct };
}
