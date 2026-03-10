'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Layers, Code2, Activity, Terminal, Bot, Clock,
  BarChart2, Menu, X, BookOpen, Sun, Moon, Calendar, Brain,
} from 'lucide-react';
import { useProgressStore } from '@/store/useProgressStore';

const NAV = [
  { href: '/patterns',            label: 'Patterns',   icon: Layers    },
  { href: '/practice',            label: 'Practice',   icon: Code2     },
  { href: '/revision',            label: 'Revision',   icon: Calendar  },
  { href: '/pattern-recognition', label: 'Quiz',       icon: Brain     },
  { href: '/visualizers',         label: 'Visualize',  icon: Activity  },
  { href: '/editor',              label: 'Editor',     icon: Terminal  },
  { href: '/ai',                  label: 'AI Tutor',   icon: Bot       },
  { href: '/interview',           label: 'Interview',  icon: Clock     },
  { href: '/dashboard',           label: 'Dashboard',  icon: BarChart2 },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalSolved } = useProgressStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true); // default dark

  // ── On mount: read saved preference ──
  useEffect(() => {
    const saved = localStorage.getItem('dsa-theme');
    const prefersDark = saved ? saved === 'dark' : true;
    applyTheme(prefersDark);
    setDark(prefersDark);
  }, []);

  const applyTheme = (isDark: boolean) => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('light');
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
    localStorage.setItem('dsa-theme', isDark ? 'dark' : 'light');
  };

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    applyTheme(next);
  };

  // Dynamic colors based on theme
  const navBg     = dark ? 'rgba(8,8,16,0.92)'    : 'rgba(255,255,255,0.92)';
  const navBorder = dark ? '#1e1e2e'               : '#e2e2f0';
  const linkColor = dark ? '#7a7a9a'               : '#5a5a7a';
  const activeBg  = dark ? 'rgba(16,185,129,0.12)' : 'rgba(5,150,105,0.10)';
  const pillBg    = dark ? '#0f0f18'               : '#f4f4fa';
  const pillBrd   = dark ? '#1e1e2e'               : '#e2e2f0';
  const toggleBg  = dark ? '#0f0f18'               : '#f0f0fc';
  const logoColor = dark ? '#ffffff'               : '#0a0a18';

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: '64px',
        backgroundColor: navBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${navBorder}`,
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
      }}
    >
      <div style={{
        height: '100%', maxWidth: '1400px', margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 20px', gap: '12px',
      }}>

        {/* ── Logo ── */}
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          textDecoration: 'none', flexShrink: 0,
        }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '9px',
            backgroundColor: 'rgba(16,185,129,0.15)',
            border: '1.5px solid rgba(16,185,129,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <BookOpen style={{ width: '16px', height: '16px', color: '#10b981' }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '15px', color: logoColor, letterSpacing: '-0.3px' }}>
            <span style={{ color: '#10b981' }}>DSA</span> Mastery
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1px', flex: 1, justifyContent: 'center' }}
             className="hidden lg:flex">
          {NAV.slice(0, 7).map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link key={href} href={href} style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '6px 11px', borderRadius: '8px', fontSize: '13px',
                fontWeight: active ? 600 : 400,
                textDecoration: 'none',
                backgroundColor: active ? activeBg : 'transparent',
                color: active ? '#10b981' : linkColor,
                border: active ? '1px solid rgba(16,185,129,0.18)' : '1px solid transparent',
                transition: 'all 0.15s ease',
              }}>
                <Icon style={{ width: '13px', height: '13px', flexShrink: 0 }} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ── Right side ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>

          {/* Solved counter */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '5px 12px', borderRadius: '20px',
            backgroundColor: pillBg,
            border: `1px solid ${pillBrd}`,
          }} className="hidden sm:flex">
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>{totalSolved}</span>
            <span style={{ fontSize: '11px', color: linkColor }}>/450</span>
          </div>

          {/* ── Dark / Light Toggle ── */}
          <button
            onClick={toggleTheme}
            title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '10px',
              backgroundColor: toggleBg,
              border: `1px solid ${navBorder}`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
          >
            {dark
              ? <Sun  style={{ width: '16px', height: '16px', color: '#f59e0b' }} />
              : <Moon style={{ width: '16px', height: '16px', color: '#6366f1' }} />
            }
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
            style={{
              padding: '8px', borderRadius: '8px',
              backgroundColor: 'transparent',
              border: `1px solid ${navBorder}`,
              cursor: 'pointer',
              color: linkColor,
            }}
          >
            {mobileOpen
              ? <X    style={{ width: '18px', height: '18px' }} />
              : <Menu style={{ width: '18px', height: '18px' }} />
            }
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown ── */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: '64px', left: 0, right: 0,
          backgroundColor: dark ? '#0c0c15' : '#ffffff',
          borderBottom: `1px solid ${navBorder}`,
          padding: '12px 16px 16px',
          boxShadow: dark
            ? '0 8px 32px rgba(0,0,0,0.5)'
            : '0 8px 32px rgba(0,0,0,0.1)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 12px', borderRadius: '10px', fontSize: '13px',
                    fontWeight: active ? 600 : 400,
                    textDecoration: 'none',
                    backgroundColor: active ? activeBg : (dark ? '#0f0f18' : '#f4f4fa'),
                    color: active ? '#10b981' : linkColor,
                    border: `1px solid ${active ? 'rgba(16,185,129,0.2)' : navBorder}`,
                  }}
                >
                  <Icon style={{ width: '14px', height: '14px' }} />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}