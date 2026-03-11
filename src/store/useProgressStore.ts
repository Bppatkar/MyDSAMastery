// ============================================
// Progress Store — question & pattern progress
// Tracks solved/attempted questions + saved code
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PatternProg {
  completed : number;   // solved questions count
  attempted : number;   // attempted (not solved) count
  total     : number;   // always 30
}

export interface ProgressState {
  // ── Question tracking ──────────────────────────────────────────
  solvedQuestions   : number[];                    // question IDs solved
  attemptedQuestions: number[];                    // question IDs attempted
  questionCodes     : Record<number, string>;      // saved code per question
  questionNotes     : Record<number, string>;      // user notes per question
  questionLanguage  : Record<number, string>;      // chosen lang per question

  // ── Difficulty tracking ────────────────────────────────────────
  questionDifficulty: Record<number, string>;      // questionId → difficulty

  // ── Derived / computed ─────────────────────────────────────────
  totalSolved  : number;
  easySolved   : number;
  mediumSolved : number;
  hardSolved   : number;

  // ── Actions ────────────────────────────────────────────────────
  markSolved    : (questionId: number, difficulty: string, patternId: string) => void;
  markAttempted : (questionId: number, patternId?: string) => void;
  unmark        : (questionId: number, patternId: string) => void;
  saveCode      : (questionId: number, code: string) => void;
  saveNote      : (questionId: number, note: string) => void;
  setLanguage   : (questionId: number, lang: string) => void;

  getQuestionStatus : (questionId: number) => 'Solved' | 'Attempted' | 'Not Started';
  getPatternProg    : (patternId: string) => PatternProg;
  getSavedCode      : (questionId: number) => string | null;
  resetProgress     : () => void;
}

interface PatternStats {
  solved  : number;
  attempted: number;
}

const defaultState = {
  solvedQuestions   : [] as number[],
  attemptedQuestions: [] as number[],
  questionCodes     : {} as Record<number, string>,
  questionNotes     : {} as Record<number, string>,
  questionLanguage  : {} as Record<number, string>,
  questionDifficulty: {} as Record<number, string>,
  patternStats      : {} as Record<string, PatternStats>,
  totalSolved       : 0,
  easySolved        : 0,
  mediumSolved      : 0,
  hardSolved        : 0,
};

// Helper to recompute difficulty counts from arrays + difficulty map
function computeDifficultyCounts(
  solvedIds: number[],
  diffMap: Record<number, string>
) {
  let easy = 0, medium = 0, hard = 0;
  for (const id of solvedIds) {
    const d = (diffMap[id] ?? '').toLowerCase();
    if (d === 'easy')   easy++;
    else if (d === 'medium') medium++;
    else if (d === 'hard')   hard++;
  }
  return { easySolved: easy, mediumSolved: medium, hardSolved: hard };
}

export const useProgressStore = create<
  ProgressState & { patternStats: Record<string, PatternStats> }
>()(
  persist(
    (set, get) => ({
      ...defaultState,

      // ── Mark question as solved ──────────────────────────────────
      markSolved: (questionId, difficulty, patternId) => {
        const { solvedQuestions, attemptedQuestions, patternStats, questionDifficulty } = get();
        const alreadySolved = solvedQuestions.includes(questionId);
        if (alreadySolved) return;

        const wasAttempted  = attemptedQuestions.includes(questionId);
        const newAttempted  = wasAttempted
          ? attemptedQuestions.filter((id) => id !== questionId)
          : attemptedQuestions;

        const prev    = patternStats[patternId] ?? { solved: 0, attempted: 0 };
        const newStat = {
          solved  : prev.solved + 1,
          attempted: wasAttempted ? Math.max(0, prev.attempted - 1) : prev.attempted,
        };

        const newSolvedIds  = [...solvedQuestions, questionId];
        const newDiffMap    = { ...questionDifficulty, [questionId]: difficulty };
        const diffCounts    = computeDifficultyCounts(newSolvedIds, newDiffMap);

        set({
          solvedQuestions   : newSolvedIds,
          attemptedQuestions: newAttempted,
          patternStats      : { ...patternStats, [patternId]: newStat },
          questionDifficulty: newDiffMap,
          totalSolved       : newSolvedIds.length,
          ...diffCounts,
        });
      },

      // ── Mark question as attempted ───────────────────────────────
      markAttempted: (questionId, patternId?) => {
        const { solvedQuestions, attemptedQuestions, patternStats } = get();
        if (solvedQuestions.includes(questionId)) return; // already solved
        if (attemptedQuestions.includes(questionId)) return;

        const newState: Partial<typeof defaultState & { patternStats: Record<string, PatternStats> }> = {
          attemptedQuestions: [...attemptedQuestions, questionId],
        };

        if (patternId) {
          const prev    = patternStats[patternId] ?? { solved: 0, attempted: 0 };
          const newStat = { ...prev, attempted: prev.attempted + 1 };
          newState.patternStats = { ...patternStats, [patternId]: newStat };
        }

        set(newState);
      },

      // ── Unmark (reset to Not Started) ───────────────────────────
      unmark: (questionId, patternId) => {
        const { solvedQuestions, attemptedQuestions, patternStats, questionDifficulty } = get();
        const wasSolved    = solvedQuestions.includes(questionId);
        const wasAttempted = attemptedQuestions.includes(questionId);

        const prev    = patternStats[patternId] ?? { solved: 0, attempted: 0 };
        const newStat = {
          solved   : wasSolved    ? Math.max(0, prev.solved - 1)    : prev.solved,
          attempted: wasAttempted ? Math.max(0, prev.attempted - 1) : prev.attempted,
        };

        const newSolvedIds = solvedQuestions.filter((id) => id !== questionId);
        const diffCounts   = computeDifficultyCounts(newSolvedIds, questionDifficulty);

        set({
          solvedQuestions   : newSolvedIds,
          attemptedQuestions: attemptedQuestions.filter((id) => id !== questionId),
          patternStats      : { ...patternStats, [patternId]: newStat },
          totalSolved       : newSolvedIds.length,
          ...diffCounts,
        });
      },

      // ── Save code ───────────────────────────────────────────────
      saveCode: (questionId, code) =>
        set((s) => ({ questionCodes: { ...s.questionCodes, [questionId]: code } })),

      // ── Save note ───────────────────────────────────────────────
      saveNote: (questionId, note) =>
        set((s) => ({ questionNotes: { ...s.questionNotes, [questionId]: note } })),

      // ── Set language ────────────────────────────────────────────
      setLanguage: (questionId, lang) =>
        set((s) => ({ questionLanguage: { ...s.questionLanguage, [questionId]: lang } })),

      // ── Get question status ─────────────────────────────────────
      getQuestionStatus: (questionId) => {
        const { solvedQuestions, attemptedQuestions } = get();
        if (solvedQuestions.includes(questionId))    return 'Solved';
        if (attemptedQuestions.includes(questionId)) return 'Attempted';
        return 'Not Started';
      },

      // ── Get pattern progress ─────────────────────────────────────
      getPatternProg: (patternId) => {
        const { patternStats } = get();
        const stat = patternStats[patternId] ?? { solved: 0, attempted: 0 };
        return {
          completed : stat.solved,
          attempted : stat.attempted,
          total     : 30,
        };
      },

      // ── Get saved code ───────────────────────────────────────────
      getSavedCode: (questionId) => {
        return get().questionCodes[questionId] ?? null;
      },

      // ── Reset all progress ───────────────────────────────────────
      resetProgress: () => set({ ...defaultState }),
    }),
    {
      name   : 'dsa-progress-v3',
      version: 3,
    }
  )
);