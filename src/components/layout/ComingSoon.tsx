'use client';
import Link from 'next/link';

interface Props { title: string; subtitle: string; day: number; icon?: string; }

export function ComingSoon({ title, subtitle, day, icon='🚧' }: Props) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'60vh', padding:40, textAlign:'center' }}>
      <div style={{ width:72, height:72, borderRadius:20, background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, marginBottom:20 }}>
        {icon}
      </div>
      <h2 style={{ fontSize:24, fontWeight:900, color:'var(--tx-1)', margin:'0 0 8px' }}>{title}</h2>
      <p style={{ fontSize:14, color:'var(--tx-3)', marginBottom:12 }}>{subtitle}</p>
      <span style={{ fontSize:13, color:'#f59e0b', fontWeight:700 }}>🗓️ Coming in Day {day} of development</span>
      <Link href="/" style={{ marginTop:24, padding:'10px 24px', borderRadius:10, border:'1px solid var(--border)', color:'var(--tx-2)', fontSize:13, textDecoration:'none', background:'var(--bg-surface)' }}>
        ← Back to Home
      </Link>
    </div>
  );
}
