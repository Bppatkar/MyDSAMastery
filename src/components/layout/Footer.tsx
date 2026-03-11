import Link from 'next/link';
import { BookOpen } from 'lucide-react';
export function Footer() {
  return (
    <footer style={{ borderTop:'1px solid var(--border)', background:'var(--bg-surface)', padding:'24px 32px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <BookOpen style={{ width:13, height:13, color:'#fff' }} />
          </div>
          <span style={{ fontSize:13, fontWeight:800, color:'var(--tx-1)' }}><span style={{ color:'var(--accent)' }}>DSA</span> Mastery</span>
        </div>
        <div style={{ display:'flex', gap:20 }}>
          {[['Patterns','/patterns'],['Practice','/practice'],['Visualizers','/visualizers'],['Dashboard','/dashboard']].map(([l,h])=>(
            <Link key={h} href={h} style={{ fontSize:12, color:'var(--tx-3)', textDecoration:'none' }}>{l}</Link>
          ))}
        </div>
        <span style={{ fontSize:12, color:'var(--tx-4)' }}>Made for Interview Success ❤️</span>
      </div>
    </footer>
  );
}
