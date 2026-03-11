'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme as useNextTheme } from 'next-themes';
import { useProgressStore } from '@/store/useProgressStore';
import { BookOpen, Code2, RotateCcw, Brain, BarChart, FileCode2, Bot, Sun, Moon } from 'lucide-react';

const NAV = [
  { href:'/patterns',    label:'Patterns',  icon:BookOpen },
  { href:'/practice',    label:'Practice',  icon:Code2 },
  { href:'/revision',    label:'Revision',  icon:RotateCcw },
  { href:'/pattern-recognition', label:'Quiz', icon:Brain },
  { href:'/visualizers', label:'Visualize', icon:BarChart },
  { href:'/editor',      label:'Editor',    icon:FileCode2 },
  { href:'/ai',          label:'AI Tutor',  icon:Bot },
];

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useNextTheme();
  const { totalSolved } = useProgressStore();
  const isDark = resolvedTheme === 'dark';

  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, height:64, zIndex:50, background:'var(--bg-surface)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', padding:'0 20px', gap:16 }}>
      <Link href="/" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none', marginRight:8 }}>
        <div style={{ width:32, height:32, borderRadius:10, background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <BookOpen style={{ width:16, height:16, color:'#fff' }} />
        </div>
        <span style={{ fontSize:15, fontWeight:900, color:'var(--tx-1)' }}>
          <span style={{ color:'var(--accent)' }}>DSA</span> Mastery
        </span>
      </Link>

      <nav style={{ display:'flex', alignItems:'center', gap:2, flex:1 }}>
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href+'/');
          return (
            <Link key={href} href={href} style={{
              display:'flex', alignItems:'center', gap:6, padding:'6px 12px', borderRadius:9, fontSize:13, fontWeight:600, textDecoration:'none', transition:'all 0.15s',
              background: active ? 'var(--accent-bg)' : 'transparent',
              color: active ? 'var(--accent)' : 'var(--tx-3)',
            }}
            onMouseEnter={e=>{ if(!active)(e.currentTarget as HTMLElement).style.color='var(--accent)'; }}
            onMouseLeave={e=>{ if(!active)(e.currentTarget as HTMLElement).style.color='var(--tx-3)'; }}
            >
              <Icon style={{ width:14, height:14, flexShrink:0 }} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ display:'flex', alignItems:'center', gap:10, marginLeft:'auto' }}>
        {/* Progress pill */}
        <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:99, background:'var(--accent-bg)', border:'1px solid var(--accent-bdr)' }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--accent)', display:'inline-block' }} />
          <span style={{ fontSize:12, fontWeight:700, color:'var(--accent)' }}>{totalSolved}</span>
          <span style={{ fontSize:11, color:'var(--tx-3)' }}>/450</span>
        </div>

        {/* Theme toggle */}
        <button onClick={()=>setTheme(isDark?'light':'dark')} style={{ width:36, height:36, borderRadius:10, background:'var(--bg-elevated)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'var(--tx-2)' }}>
          {isDark ? <Sun style={{ width:15, height:15 }} /> : <Moon style={{ width:15, height:15 }} />}
        </button>
      </div>
    </header>
  );
}
