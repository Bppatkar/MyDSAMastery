import React, { useState } from 'react';
import Topbar from './components/Topbar';
import PatternSidebar from './components/PatternSidebar';
import PracticePanel from './components/PracticePanel';
import Footer from './components/Footer';
import PatternsGrid from './pages/PatternsGrid';
import ChainPage from './pages/ChainPage';
import BookPage from './pages/BookPage';
import ConstraintsPage from './pages/ConstraintsPage';
import InterviewQuestionsPage from './pages/InterviewQuestionsPage';
import { useProgress } from './hooks/useProgress';
import { PAT_ORDER } from './data/gens';
import { LINFO } from './data/patterns';
import { ThemeProvider } from './context/ThemeContext';

const SIDEBAR_PAGES = ['patterns', 'practice'];

function AppContent() {
  const [page, setPage] = useState('chain');
  const [curPat, setCurPat] = useState(PAT_ORDER[0]);
  const { isDone, toggle, patDone, total, totalDone, pct } = useProgress();

  const handleSetCurPat = (p) => {
    setCurPat(p);
    setPage('practice');
  };

  return (
    <div className="flex flex-col h-screen dark:bg-[#1a1a1a] bg-[#f7f5f0] overflow-hidden">
      <Topbar
        active={page}
        setActive={setPage}
        totalDone={totalDone}
        total={total}
        pct={pct}
      />
      <div className="flex flex-1 overflow-hidden">
        {SIDEBAR_PAGES.includes(page) && (
          <PatternSidebar
            curPat={curPat}
            setCurPat={handleSetCurPat}
            patDone={patDone}
            linfo={LINFO}
          />
        )}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            {page === 'chain' && <ChainPage />}
            {page === 'interview' && <InterviewQuestionsPage />}
            {page === 'patterns' && (
              <PatternsGrid
                setCurPat={setCurPat}
                setPage={setPage}
                patDone={patDone}
              />
            )}
            {page === 'practice' && (
              <PracticePanel
                curPat={curPat}
                setCurPat={setCurPat}
                isDone={isDone}
                toggle={toggle}
                patDone={patDone}
                setPage={setPage}
              />
            )}
            {page === 'book' && (
              <BookPage setCurPat={setCurPat} setPage={setPage} />
            )}
            {page === 'constraints' && (
              <ConstraintsPage setCurPat={setCurPat} setPage={setPage} />
            )}
          </div>
          {page === 'interview' && <Footer />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
