import React, { useState } from 'react';
import Topbar from './components/Topbar';
import PatternSidebar from './components/PatternSidebar';
import PracticePanel from './components/PracticePanel';
import PatternsGrid from './pages/PatternsGrid';
import ChainPage from './pages/ChainPage';
import BookPage from './pages/BookPage';
import ConstraintsPage from './pages/ConstraintsPage';
import { useProgress } from './hooks/useProgress';
import { PAT_ORDER } from './data/gens';
import { LINFO } from './data/patterns';

const SIDEBAR_PAGES = ['patterns', 'practice'];

export default function App() {
  const [page, setPage]     = useState('chain');
  const [curPat, setCurPat] = useState(PAT_ORDER[0]);
  const { isDone, toggle, patDone, total, totalDone, pct } = useProgress();

  const handleSetCurPat = (p) => { setCurPat(p); setPage('practice'); };

  return (
    <div className="flex flex-col h-screen bg-[#f7f5f0] overflow-hidden">
      <Topbar active={page} setActive={setPage} totalDone={totalDone} total={total} pct={pct} />
      <div className="flex flex-1 overflow-hidden">
        {SIDEBAR_PAGES.includes(page) && (
          <PatternSidebar curPat={curPat} setCurPat={handleSetCurPat} patDone={patDone} linfo={LINFO} />
        )}
        <main className="flex-1 flex overflow-hidden">
          {page === 'chain'       && <ChainPage />}
          {page === 'patterns'    && <PatternsGrid setCurPat={setCurPat} setPage={setPage} patDone={patDone} />}
          {page === 'practice'    && <PracticePanel curPat={curPat} setCurPat={setCurPat} isDone={isDone} toggle={toggle} patDone={patDone} setPage={setPage} />}
          {page === 'book'        && <BookPage setCurPat={setCurPat} setPage={setPage} />}
          {page === 'constraints' && <ConstraintsPage setCurPat={setCurPat} setPage={setPage} />}
        </main>
      </div>
    </div>
  );
}
