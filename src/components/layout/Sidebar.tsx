'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgressStore } from '@/store/useProgressStore';
import { DSA_PATTERNS } from '@/lib/constants';

export function Sidebar() {
  const pathname = usePathname();
  const { totalSolved, getPatternProg } = useProgressStore();
  const show = pathname.startsWith('/patterns') || pathname.startsWith('/practice');
  if (!show) return null;
  const pct = Math.round((totalSolved / 450) * 100);

  return (
    <aside className="hidden lg:flex flex-col flex-shrink-0" style={{
      width:220, position:'sticky', top:64, height:'calc(100vh - 64px)',
      overflowY:'auto', borderRight:'1px solid var(--border)', background:'var(--bg-base)',
    }}>
      <div style={{ padding:14, borderBottom:'1px solid var(--border)' }}>
        <div style={{ padding:13, borderRadius:12, background:'var(--bg-elevated)', border:'1px solid var(--border)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <span style={{ fontSize:10, fontWeight:700, color:'var(--tx-3)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Progress</span>
            <span style={{ fontSize:12, fontWeight:800, color:'var(--accent)' }}>{pct}%</span>
          </div>
          <div style={{ height:5, borderRadius:3, background:'var(--bg-hover)', overflow:'hidden', marginBottom:6 }}>
            <div style={{ height:'100%', width:`${pct}%`, background:'var(--accent)', borderRadius:3 }} />
          </div>
          <p style={{ fontSize:11, color:'var(--tx-3)', margin:0 }}>
            <span style={{ color:'var(--accent)', fontWeight:700 }}>{totalSolved}</span> / 450 solved
          </p>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'10px 8px' }}>
        <p style={{ fontSize:10, fontWeight:700, color:'var(--tx-3)', textTransform:'uppercase', letterSpacing:'0.08em', margin:'0 6px 10px' }}>15 Patterns</p>
        <nav style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {DSA_PATTERNS.map((p) => {
            const prog = getPatternProg(p.id);
            const active = pathname.includes(p.slug);
            const pp = Math.round((prog.completed / 30) * 100);
            return (
              <Link key={p.id} href={`/patterns/${p.slug}`} style={{
                display:'flex', alignItems:'center', gap:9, padding:'8px 9px', borderRadius:10,
                textDecoration:'none', transition:'all 0.15s',
                background: active ? 'var(--accent-bg)' : 'transparent',
                border: active ? '1px solid var(--accent-bdr)' : '1px solid transparent',
                color: active ? 'var(--accent)' : 'var(--tx-3)',
              }}
              onMouseEnter={e=>{ if(!active){ (e.currentTarget as HTMLElement).style.background='var(--bg-elevated)'; (e.currentTarget as HTMLElement).style.color='var(--tx-1)'; } }}
              onMouseLeave={e=>{ if(!active){ (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='var(--tx-3)'; } }}
              >
                <span style={{ fontSize:14, flexShrink:0 }}>{p.icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: pp>0?3:0 }}>
                    <span style={{ fontSize:11, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</span>
                    {prog.completed>=30 ? <span style={{ fontSize:10, color:'var(--accent)', flexShrink:0 }}>✓</span>
                     : prog.completed>0 ? <span style={{ fontSize:10, color:'var(--tx-4)', flexShrink:0 }}>{prog.completed}/30</span>
                     : null}
                  </div>
                  {pp>0 && (
                    <div style={{ height:3, borderRadius:2, background:'var(--bg-hover)', overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${pp}%`, background: prog.completed>=30 ? 'var(--accent)' : p.color, borderRadius:2 }} />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
