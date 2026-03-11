import type { Metadata } from 'next';
import { Layers } from 'lucide-react';
import { PatternList } from '@/components/patterns/PatternList';
import { TOTAL_PATTERNS, TOTAL_QUESTIONS } from '@/lib/constants';

export const metadata: Metadata = { title: 'DSA Patterns', description: '15 core DSA patterns' };

export default function PatternsPage() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-base)' }}>
      <div style={{ borderBottom:'1px solid var(--border)', background:'var(--bg-surface)', padding:'28px 32px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:20 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
              <div style={{ width:38, height:38, borderRadius:12, background:'var(--accent-bg)', border:'1px solid var(--accent-bdr)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Layers style={{ width:18, height:18, color:'var(--accent)' }} />
              </div>
              <h1 style={{ fontSize:22, fontWeight:900, color:'var(--tx-1)', margin:0 }}>DSA Patterns</h1>
            </div>
            <p style={{ color:'var(--tx-3)', fontSize:13, margin:0, maxWidth:480 }}>
              Master {TOTAL_PATTERNS} patterns that solve 90% of FAANG interview questions. {TOTAL_QUESTIONS} problems — easy to hard.
            </p>
          </div>
          <div style={{ display:'flex', gap:20 }}>
            {[['15','Patterns','var(--accent)'],['450','Problems','#6366f1'],['30','Per Pattern','#f59e0b']].map(([v,l,c])=>(
              <div key={l} style={{ textAlign:'center' }}>
                <div style={{ fontSize:26, fontWeight:900, color:c as string }}>{v}</div>
                <div style={{ fontSize:11, color:'var(--tx-3)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding:'24px 32px', maxWidth:1100, margin:'0 auto' }}>
        <PatternList />
      </div>
    </div>
  );
}
