// ============================================
// Utility Functions - Puri app mein use honge
// Hinglish comments ke saath
// ============================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Tailwind classes merge karne ke liye (main utility)
// Usage: cn('text-red-500', condition && 'font-bold', className)
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Difficulty ke hisaab se color class return karo
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':   return 'text-emerald-400';
    case 'medium': return 'text-amber-400';
    case 'hard':   return 'text-red-400';
    default:       return 'text-gray-400';
  }
}

// Difficulty background color
export function getDifficultyBg(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':   return 'bg-emerald-500/10 border-emerald-500/20';
    case 'medium': return 'bg-amber-500/10 border-amber-500/20';
    case 'hard':   return 'bg-red-500/10 border-red-500/20';
    default:       return 'bg-gray-500/10 border-gray-500/20';
  }
}

// Percentage calculate karo (safe division)
export function calcPercent(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

// Seconds ko mm:ss format mein convert karo
// 125 -> "02:05"
export function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Minutes ko readable format mein
// 65 -> "1h 5m"
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

// Date string format karo (Indian style)
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Relative time (2 din pehle, abhi, etc.)
export function timeAgo(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours   = Math.floor(diff / 3600000);
  const days    = Math.floor(diff / 86400000);

  if (minutes < 1)  return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24)   return `${hours}h ago`;
  if (days < 7)     return `${days}d ago`;
  return formatDate(dateString);
}

// Title se URL slug banao
// "Two Pointers" -> "two-pointers"
export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

// LocalStorage se data lo (SSR-safe)
export function getStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

// LocalStorage mein data save karo
export function setStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('[Storage Error]', err);
  }
}

// Array se random element nikalo
export function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Number compact karo (1500 -> 1.5k)
export function compactNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

// Array shuffle karo (Fisher-Yates)
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Check karo aaj koi solve kiya?
export function isSolvedToday(lastSolvedDate?: string): boolean {
  if (!lastSolvedDate) return false;
  const last  = new Date(lastSolvedDate).toDateString();
  const today = new Date().toDateString();
  return last === today;
}