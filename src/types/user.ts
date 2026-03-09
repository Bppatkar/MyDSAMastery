// ============================================
// User Types - User related sab kuch
// ============================================

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  joinedAt: string;          // ISO date
  streak: number;            // Current streak days
  longestStreak: number;
  totalSolved: number;
  lastActive: string;        // ISO date
  preferredLanguage?: string;
  goal?: string;             // User ka interview goal
}

export interface UserStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  currentStreak: number;
  longestStreak: number;
  totalTimeSpent: number;    // minutes mein
  patternsStarted: number;
  patternsCompleted: number;
  lastActive: string;
  weeklyActivity: DailyActivity[];
}

export interface DailyActivity {
  date: string;              // YYYY-MM-DD format
  problemsSolved: number;
  timeSpent: number;         // minutes
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}