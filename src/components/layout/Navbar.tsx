// ============================================
// Navbar - Fixed top navigation bar
// Glass morphism effect, mobile responsive
// Progress counter dikhata hai
// ============================================

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Zap,
  Layers,
  Code2,
  Activity,
  Terminal,
  Bot,
  Timer,
  BarChart3,
  Menu,
  X,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProgressStore } from '@/store/useProgressStore';

const NAV = [
  { href: '/patterns', label: 'Patterns', Icon: Layers },
  { href: '/practice', label: 'Practice', Icon: Code2 },
  { href: '/visualizers', label: 'Visualize', Icon: Activity },
  { href: '/editor', label: 'Editor', Icon: Terminal },
  { href: '/ai', label: 'AI Tutor', Icon: Bot },
  { href: '/interview', label: 'Interview', Icon: Timer },
  { href: '/dashboard', label: 'Dashboard', Icon: BarChart3 },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { totalSolved } = useProgressStore();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <nav className="pt-16 top-0 inset-x-0 z-50 glass-effect border-b border-[#2a2a3e] h-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center glow-green group-hover:scale-110 transition-transform duration-200">
              <Zap className="w-4.5 h-4.5 text-black" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[17px] tracking-tight">
              <span className="text-[#e8e8f0]">DSA</span>
              <span className="text-emerald-400"> Mastery</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium',
                  'transition-all duration-200',
                  isActive(href)
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-[#6b6b8a] hover:text-[#e8e8f0] hover:bg-[#1c1c2e]'
                )}
              >
                <Icon className="w-4 h-4" strokeWidth={1.75} />
                {label}
              </Link>
            ))}
          </div>

          {/* ── Right: Progress + Mobile toggle ── */}
          <div className="flex items-center gap-3">
            {/* Solved counter */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1c1c2e] border border-[#2a2a3e]">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-sm font-medium">
                <span className="text-emerald-400">{totalSolved}</span>
                <span className="text-[#6b6b8a]">/450</span>
              </span>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg text-[#6b6b8a] hover:text-[#e8e8f0] hover:bg-[#1c1c2e] transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Nav Dropdown ── */}
        {open && (
          <div className="lg:hidden border-t border-[#2a2a3e] bg-[#0a0a0f] animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {NAV.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium',
                    'transition-all duration-200',
                    isActive(href)
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-[#6b6b8a] hover:text-[#e8e8f0] hover:bg-[#1c1c2e]'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              {/* Mobile solved counter */}
              <div className="flex items-center gap-2 px-3 py-2.5 text-sm">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-medium">
                  {totalSolved}
                </span>
                <span className="text-[#6b6b8a]">/ 450 solved</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer so content doesn't go behind fixed navbar */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
