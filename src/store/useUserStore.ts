// ============================================
// User Store - User info aur settings
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';

interface UserState {
  user      : User;
  setName   : (name: string) => void;
  setLang   : (lang: string) => void;
  updateStreak : () => void;
  resetUser : () => void;
}

const defaultUser: User = {
  id             : 'local-user',
  name           : 'DSA Learner',
  joinedAt       : new Date().toISOString(),
  streak         : 0,
  longestStreak  : 0,
  totalSolved    : 0,
  lastActive     : new Date().toISOString(),
  preferredLanguage: 'python',
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: defaultUser,

      setName: (name) =>
        set((s) => ({ user: { ...s.user, name } })),

      setLang: (lang) =>
        set((s) => ({ user: { ...s.user, preferredLanguage: lang } })),

      // Har roz aane pe streak update karo
      updateStreak: () => {
        const { user } = get();
        const last  = new Date(user.lastActive);
        const today = new Date();
        last.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        const diff = Math.floor((today.getTime() - last.getTime()) / 86400000);

        if (diff === 0) return; // Aaj already update hua hai

        const newStreak = diff === 1 ? user.streak + 1 : 1;
        set((s) => ({
          user: {
            ...s.user,
            streak        : newStreak,
            longestStreak : Math.max(newStreak, s.user.longestStreak),
            lastActive    : new Date().toISOString(),
          },
        }));
      },

      resetUser: () => set({ user: defaultUser }),
    }),
    {
      name    : 'dsa-user-v1',
      version : 1,
    }
  )
);