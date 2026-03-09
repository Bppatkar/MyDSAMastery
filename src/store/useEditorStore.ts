// ============================================
// Editor Store - Monaco editor settings
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '@/types/question';

interface EditorState {
  language    : Language;
  fontSize    : number;
  theme       : 'vs-dark' | 'hc-black';
  wordWrap    : boolean;
  minimap     : boolean;
  setLanguage : (lang: Language) => void;
  setFontSize : (size: number) => void;
  setTheme    : (theme: 'vs-dark' | 'hc-black') => void;
  toggleWordWrap : () => void;
  toggleMinimap  : () => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      language : 'python',
      fontSize : 14,
      theme    : 'vs-dark',
      wordWrap : true,
      minimap  : false,

      setLanguage    : (language)   => set({ language }),
      setFontSize    : (fontSize)   => set({ fontSize }),
      setTheme       : (theme)      => set({ theme }),
      toggleWordWrap : ()           => set((s) => ({ wordWrap: !s.wordWrap })),
      toggleMinimap  : ()           => set((s) => ({ minimap: !s.minimap })),
    }),
    { name: 'dsa-editor-v1' }
  )
);