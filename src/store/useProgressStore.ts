// ============================================
// Progress Store (Zustand + persist)
// User ki saari DSA progress yahan store hogi
// LocalStorage mein persist hogi automatically
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuestionProgress, Status, Language } from '@/types/question';
import type { PatternProgress } from '@/types/pattern';

interface ProgressState {
  // === State ===
  questionProgress : Record<number, QuestionProgress>;
  patternProgress  : Record<string, PatternProgress>;
  totalSolved      : number;
  easySolved       : number;
  mediumSolved     : number;
  hardSolved       : number;

  // === Actions ===
  markSolved     : (questionId: number, patternId: string, difficulty: string) => void;
  markAttempted  : (questionId: number, language?: Language) => void;
  saveCode       : (questionId: number, code: string, language: Language) => void;
  getStatus      : (questionId: number) => Status;
  getPatternProg : (patternId: string) => PatternProgress;
  resetAll       : () => void;
}

const DEFAULT_PATTERN_PROG = (patternId: string): PatternProgress => ({
  patternId,
  completed  : 0,
  total      : 30,
  percentage : 0,
});

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      questionProgress : {},
      patternProgress  : {},
      totalSolved      : 0,
      easySolved       : 0,
      mediumSolved     : 0,
      hardSolved       : 0,

      // Problem solve ho gayi - mark karo aur counters update karo
      markSolved: (questionId, patternId, difficulty) => {
        const { questionProgress, patternProgress } = get();
        const existing = questionProgress[questionId];

        // Pehle se solved hai toh skip
        if (existing?.status === 'Solved') return;

        const newQProg: QuestionProgress = {
          questionId,
          status    : 'Solved',
          language  : existing?.language ?? 'python',
          code      : existing?.code,
          solvedAt  : new Date().toISOString(),
          attempts  : (existing?.attempts ?? 0) + 1,
        };

        const prevPat   = patternProgress[patternId] ?? DEFAULT_PATTERN_PROG(patternId);
        const newCount  = prevPat.completed + 1;
        const newPatProg: PatternProgress = {
          ...prevPat,
          completed  : newCount,
          percentage : Math.round((newCount / 30) * 100),
          lastSolved : new Date().toISOString(),
        };

        set((s) => ({
          questionProgress : { ...s.questionProgress, [questionId]: newQProg },
          patternProgress  : { ...s.patternProgress, [patternId]: newPatProg },
          totalSolved      : s.totalSolved + 1,
          easySolved       : difficulty === 'Easy'   ? s.easySolved   + 1 : s.easySolved,
          mediumSolved     : difficulty === 'Medium' ? s.mediumSolved + 1 : s.mediumSolved,
          hardSolved       : difficulty === 'Hard'   ? s.hardSolved   + 1 : s.hardSolved,
        }));
      },

      // Problem try kiya but solve nahi hua
      markAttempted: (questionId, language = 'python') => {
        set((s) => ({
          questionProgress: {
            ...s.questionProgress,
            [questionId]: {
              ...s.questionProgress[questionId],
              questionId,
              status   : s.questionProgress[questionId]?.status === 'Solved' ? 'Solved' : 'Attempted',
              language : s.questionProgress[questionId]?.language ?? language,
              attempts : (s.questionProgress[questionId]?.attempts ?? 0) + 1,
            },
          },
        }));
      },

      // Code editor mein likha code save karo
      saveCode: (questionId, code, language) => {
        set((s) => ({
          questionProgress: {
            ...s.questionProgress,
            [questionId]: {
              questionId,
              status   : s.questionProgress[questionId]?.status ?? 'Attempted',
              language,
              code,
              attempts : s.questionProgress[questionId]?.attempts ?? 1,
            },
          },
        }));
      },

      getStatus: (questionId) =>
        get().questionProgress[questionId]?.status ?? 'Not Started',

      getPatternProg: (patternId) =>
        get().patternProgress[patternId] ?? DEFAULT_PATTERN_PROG(patternId),

      resetAll: () =>
        set({
          questionProgress : {},
          patternProgress  : {},
          totalSolved      : 0,
          easySolved       : 0,
          mediumSolved     : 0,
          hardSolved       : 0,
        }),
    }),
    {
      name    : 'dsa-progress-v1',   // localStorage mein key
      version : 1,
    }
  )
);