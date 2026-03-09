'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Layers, Code2, Activity, Terminal,
  Bot, Clock, BarChart2, Menu, X, BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProgressStore } from '@/store/useProgressStore';

const NAV = [
  { href: '/patterns',    label: 'Patterns',   icon: Layers    },
  { href: '/practice',    label: 'Practice',   icon: Code2     },
  { href: '/visualizers', label: 'Visualize',  icon: Activity  },
  { href: '/editor',      label: 'Editor',     icon: Terminal  },
  { href: '/ai',          label: 'AI Tutor',   icon: Bot       },
  { href: '/interview',   label: 'Interview',  icon: Clock     },
  { href: '/dashboard',   label: 'Dashboard',  icon: BarChart2 },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalSolved } = useProgressStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#080810]/95 backdrop-blur-md border-b border-[#1e1e2e]">
      <div className="h-full flex items-center justify-between px-4 lg:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-bold text-white">
            <span className="text-emerald-400">DSA</span> Mastery
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all',
                  active
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'text-[#7a7a9a] hover:text-white hover:bg-[#1a1a28]'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right: solved counter + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0f0f18] border border-[#1e1e2e]">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-bold text-emerald-400">{totalSolved}</span>
            <span className="text-xs text-[#5a5a7a]">/450</span>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[#7a7a9a] hover:text-white hover:bg-[#1a1a28]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#080810] border-b border-[#1e1e2e] p-4">
          <nav className="grid grid-cols-2 gap-2">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-[#7a7a9a] hover:text-white hover:bg-[#1a1a28] transition-all"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}