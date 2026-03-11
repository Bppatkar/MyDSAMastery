'use client';
import Link from 'next/link';
import { ArrowRight, Zap, Brain, Eye, Code2, Clock, BarChart2, Layers } from 'lucide-react';
import { DSA_PATTERNS, TOTAL_PATTERNS, TOTAL_QUESTIONS } from '@/lib/constants';

export default function HomePage() {
  const preview = DSA_PATTERNS.slice(0, 6);
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-base)', color:'var(--tx-1)' }}>

      {/* ── HERO ── */}
      <section style={{ padding:'80px 32px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ maxWidth:800, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:99, border:'1px solid var(--accent-bdr)', background:'var(--accent-bg)', color:'var(--accent)', fontSize:13, marginBottom:28 }}>
            <Zap style={{ width:13, height:13 }} />
            {TOTAL_QUESTIONS} Problems · {TOTAL_PATTERNS} Patterns · AI-Powered
          </div>
          <h1 style={{ fontSize:'clamp(36px,6vw,68px)', fontWeight:900, lineHeight:1.1, margin:'0 0 20px', color:'var(--tx-1)' }}>
            Master DSA.<br />
            <span style={{ background:'linear-gradient(135deg,#10b981,#6366f1)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Crack Any Interview.
            </span>
          </h1>
          <p style={{ fontSize:17, color:'var(--tx-2)', maxWidth:520, margin:'0 auto 32px', lineHeight:1.7 }}>
            Stop grinding randomly. Learn the <strong style={{ color:'var(--tx-1)' }}>15 patterns</strong> that solve 90% of FAANG problems — in Hinglish, with real examples.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:36 }}>
            <Link href="/patterns" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 28px', borderRadius:12, background:'var(--accent)', color:'#fff', fontWeight:800, fontSize:15, textDecoration:'none', boxShadow:'0 4px 20px var(--accent-bg)' }}>
              Start Learning Free <ArrowRight style={{ width:16, height:16 }} />
            </Link>
            <Link href="/practice" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 28px', borderRadius:12, border:'1px solid var(--border)', color:'var(--tx-2)', fontWeight:600, fontSize:15, textDecoration:'none', background:'var(--bg-surface)' }}>
              Practice Problems
            </Link>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8 }}>
            {DSA_PATTERNS.slice(0,7).map(p=>(
              <Link key={p.id} href={`/patterns/${p.slug}`} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:99, fontSize:12, border:'1px solid var(--border)', color:'var(--tx-3)', background:'var(--bg-surface)', textDecoration:'none' }}>
                {p.icon} {p.name}
              </Link>
            ))}
            <span style={{ padding:'5px 12px', fontSize:12, color:'var(--tx-4)' }}>+ {TOTAL_PATTERNS-7} more</span>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', background:'var(--bg-surface)', padding:'24px 32px' }}>
        <div style={{ maxWidth:800, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, textAlign:'center' }}>
          {[
            { v:'15', l:'DSA Patterns', c:'#10b981', I:Layers },
            { v:'450', l:'LeetCode Problems', c:'#6366f1', I:Code2 },
            { v:'8', l:'Visualizers', c:'#a855f7', I:Eye },
            { v:'∞', l:'AI Features', c:'#f59e0b', I:Brain },
          ].map(({v,l,c,I})=>(
            <div key={l} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <I style={{ width:18, height:18, color:c, opacity:0.8 }} />
              <div style={{ fontSize:36, fontWeight:900, color:c }}>{v}</div>
              <div style={{ fontSize:11, color:'var(--tx-3)' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PATTERN PREVIEW ── */}
      <section style={{ padding:'60px 32px', background:'var(--bg-base)' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <p style={{ color:'var(--accent)', fontSize:13, fontWeight:700, marginBottom:8 }}>15 Core Patterns</p>
            <h2 style={{ fontSize:28, fontWeight:900, color:'var(--tx-1)', margin:0 }}>One Pattern. Infinite Problems.</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:14, marginBottom:28 }}>
            {preview.map(p=>(
              <Link key={p.id} href={`/patterns/${p.slug}`} style={{ display:'flex', gap:14, padding:18, borderRadius:16, background:'var(--bg-surface)', border:'1px solid var(--border)', textDecoration:'none', transition:'all 0.15s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--border-strong)'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--border)'; (e.currentTarget as HTMLElement).style.transform='none';}}>
                <div style={{ width:44, height:44, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0, background:`${p.color}15`, border:`1px solid ${p.color}25` }}>{p.icon}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:800, color:'var(--tx-1)' }}>{p.name}</span>
                    <span style={{ fontSize:11, fontWeight:700, color:p.color }}>#{p.order}</span>
                  </div>
                  <p style={{ fontSize:12, color:'var(--tx-3)', margin:0, lineHeight:1.5, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as const }}>{p.description}</p>
                  <p style={{ fontSize:11, color:'var(--tx-4)', margin:'6px 0 0' }}>30 problems · {p.category}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign:'center' }}>
            <Link href="/patterns" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 24px', borderRadius:10, border:'1px solid var(--border)', color:'var(--tx-2)', fontSize:13, fontWeight:600, textDecoration:'none', background:'var(--bg-surface)' }}>
              View All 15 Patterns <ArrowRight style={{ width:14, height:14 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding:'60px 32px', background:'var(--bg-surface)', borderTop:'1px solid var(--border)' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <p style={{ color:'#a855f7', fontSize:13, fontWeight:700, marginBottom:8 }}>Everything Included</p>
            <h2 style={{ fontSize:28, fontWeight:900, color:'var(--tx-1)', margin:0 }}>Built for Interview Success</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:14 }}>
            {[
              { I:Layers, c:'#10b981', t:'Pattern Library', d:'15 patterns with theory, templates, and keyword triggers' },
              { I:Code2, c:'#6366f1', t:'Practice Problems', d:'450 LeetCode problems organized by pattern and difficulty' },
              { I:Eye, c:'#a855f7', t:'Algorithm Visualizers', d:'8 interactive visualizers — sorting, trees, graphs, and more' },
              { I:Brain, c:'#ec4899', t:'AI Tutor', d:'Hints, explanations, and pattern detection help' },
              { I:Clock, c:'#f59e0b', t:'Interview Simulator', d:'45-minute timed sessions with real-time feedback' },
              { I:BarChart2, c:'#14b8a6', t:'Progress Dashboard', d:'Track solved problems, streaks, and weak patterns' },
            ].map(({I,c,t,d})=>(
              <div key={t} style={{ padding:22, borderRadius:16, background:'var(--bg-elevated)', border:'1px solid var(--border)' }}>
                <I style={{ width:20, height:20, color:c, marginBottom:14 }} />
                <h3 style={{ fontSize:14, fontWeight:800, color:'var(--tx-1)', margin:'0 0 8px' }}>{t}</h3>
                <p style={{ fontSize:13, color:'var(--tx-3)', lineHeight:1.55, margin:0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding:'60px 32px', background:'var(--bg-base)', borderTop:'1px solid var(--border)' }}>
        <div style={{ maxWidth:800, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <h2 style={{ fontSize:28, fontWeight:900, color:'var(--tx-1)', margin:'0 0 8px' }}>How It Works</h2>
            <p style={{ color:'var(--tx-3)', margin:0 }}>Zero se interview-ready in 4 steps</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:16 }}>
            {[['01','Pick a Pattern','Sliding Window se shuru karo'],['02','Study Theory','Core idea, template, keywords'],['03','Solve Problems','Easy se Hard — 30 per pattern'],['04','Mock Interview','Real timed conditions mein test karo']].map(([n,t,d])=>(
              <div key={n} style={{ textAlign:'center', padding:24, borderRadius:16, background:'var(--bg-surface)', border:'1px solid var(--border)' }}>
                <div style={{ width:44, height:44, borderRadius:12, background:'var(--accent-bg)', border:'1px solid var(--accent-bdr)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px', color:'var(--accent)', fontWeight:900, fontSize:13 }}>{n}</div>
                <h3 style={{ fontSize:13, fontWeight:800, color:'var(--tx-1)', margin:'0 0 6px' }}>{t}</h3>
                <p style={{ fontSize:12, color:'var(--tx-3)', lineHeight:1.5, margin:0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'60px 32px', textAlign:'center', background:'var(--bg-surface)', borderTop:'1px solid var(--border)' }}>
        <div style={{ maxWidth:500, margin:'0 auto' }}>
          <h2 style={{ fontSize:28, fontWeight:900, color:'var(--tx-1)', margin:'0 0 12px' }}>Ready to Master DSA?</h2>
          <p style={{ color:'var(--tx-3)', marginBottom:28 }}>Join thousands of developers who cracked FAANG using these 15 patterns.</p>
          <Link href="/patterns" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 36px', borderRadius:12, background:'var(--accent)', color:'#fff', fontWeight:800, fontSize:15, textDecoration:'none' }}>
            Start Free — No Signup <ArrowRight style={{ width:16, height:16 }} />
          </Link>
        </div>
      </section>
    </div>
  );
}
