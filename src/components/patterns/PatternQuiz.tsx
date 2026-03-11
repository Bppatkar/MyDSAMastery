'use client';
import { useState, useCallback } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { QUIZ_QUESTIONS, getQuizByPattern, shuffleQuestions, type QuizQuestion } from '@/app/data/questions';
import { DSA_PATTERNS } from '@/lib/constants';

type Mode = 'home' | 'quiz' | 'result';
const STORAGE_KEY = 'dsa-quiz-v1';

interface Stats { total: number; correct: number; byPattern: Record<string, {t:number;c:number}>; }
const EMPTY: Stats = { total:0, correct:0, byPattern:{} };
const load = (): Stats => { try { const r = typeof window==='undefined'?null:localStorage.getItem(STORAGE_KEY); return r?JSON.parse(r):EMPTY; } catch { return EMPTY; } };
const save = (s:Stats) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {} };

export default function PatternQuiz() {
  const th = useTheme();
  const [stats, setStats] = useState<Stats>(load);
  const [mode, setMode] = useState<Mode>('home');
  const [filter, setFilter] = useState('all');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string|null>(null);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<{q:QuizQuestion;chosen:string}[]>([]);

  const correct = (q:QuizQuestion) => q.options[q.correctAnswer];

  const record = useCallback((pid:string, ok:boolean) => {
    setStats(prev => {
      const bp = {...prev.byPattern};
      const old = bp[pid]??{t:0,c:0};
      bp[pid] = {t:old.t+1, c:old.c+(ok?1:0)};
      const next = {total:prev.total+1, correct:prev.correct+(ok?1:0), byPattern:bp};
      save(next); return next;
    });
  }, []);

  const start = useCallback((f:string) => {
    const pool = f==='all' ? QUIZ_QUESTIONS : getQuizByPattern(f);
    const shuffled = shuffleQuestions(pool).slice(0, Math.min(15, pool.length));
    setQuestions(shuffled); setIdx(0); setSelected(null); setScore(0); setWrong([]);
    setFilter(f); setMode('quiz');
  }, []);

  const answer = (opt:string) => {
    if (selected) return;
    setSelected(opt);
    const q = questions[idx];
    const ok = opt === correct(q);
    if (ok) setScore(s=>s+1); else setWrong(w=>[...w,{q,chosen:opt}]);
    record(q.patternId, ok);
  };

  const next = () => { if (idx < questions.length-1) { setIdx(i=>i+1); setSelected(null); } else setMode('result'); };
  const q = questions[idx];

  /* ── HOME ── */
  if (mode === 'home') {
    const acc = stats.total>0 ? Math.round((stats.correct/stats.total)*100) : 0;
    return (
      <div>
        {stats.total > 0 && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:20, padding:16, borderRadius:14, background:'var(--bg-elevated)', border:'1px solid var(--border)' }}>
            {([['Attempted',stats.total,'var(--tx-1)'],['Correct',stats.correct,'var(--accent)'],['Accuracy',`${acc}%`, acc>=70?'var(--accent)':acc>=50?'#f59e0b':'#ef4444']] as [string,string|number,string][]).map(([l,v,c])=>(
              <div key={l} style={{ textAlign:'center' }}>
                <div style={{ fontSize:22, fontWeight:900, color:c }}>{v}</div>
                <div style={{ fontSize:11, color:'var(--tx-3)', marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        )}
        <button onClick={()=>start('all')} style={{ width:'100%', padding:14, borderRadius:12, fontSize:14, fontWeight:800, cursor:'pointer', border:'none', background:'var(--accent)', color:'#fff', marginBottom:16 }}>
          🎯 Random Mix — Saare Patterns ({QUIZ_QUESTIONS.length} Questions)
        </button>
        <p style={{ fontSize:11, fontWeight:700, color:'var(--tx-3)', textTransform:'uppercase', letterSpacing:'0.08em', margin:'0 0 10px' }}>Pattern-wise Practice:</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:7 }}>
          {DSA_PATTERNS.map(p => {
            const st = stats.byPattern[p.id];
            const a = st&&st.t>0 ? Math.round((st.c/st.t)*100) : null;
            const c = a===null?'var(--tx-3)':a>=70?'var(--accent)':a>=50?'#f59e0b':'#ef4444';
            const qs = getQuizByPattern(p.id).length;
            return (
              <button key={p.id} onClick={()=>start(p.id)} style={{ padding:'11px 13px', borderRadius:10, fontSize:12, fontWeight:600, cursor:'pointer', background:'var(--bg-elevated)', border:'1px solid var(--border)', color:'var(--tx-1)', textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=th.accent+'55'; e.currentTarget.style.background=th.accentBg;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-elevated)';}}>
                <div>
                  <div style={{ color:'var(--tx-1)', marginBottom:2 }}>{p.icon} {p.name}</div>
                  <div style={{ fontSize:10, color:'var(--tx-3)' }}>{qs} questions</div>
                </div>
                {a!==null && <span style={{ fontSize:11, fontWeight:700, color:c, background:c+'18', padding:'2px 7px', borderRadius:20, flexShrink:0 }}>{a}%</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── RESULT ── */
  if (mode === 'result') {
    const pct = Math.round((score/questions.length)*100);
    const emoji = pct>=80?'🏆':pct>=60?'🎯':pct>=40?'💪':'📚';
    const msg = pct>=80?'Ekdum solid! Pattern recognition mast hai!':pct>=60?'Acha! Thoda aur practice karo.':'Ek baar dobara concepts padho.';
    return (
      <div>
        <div style={{ textAlign:'center', padding:'28px 24px', background:'var(--bg-elevated)', borderRadius:16, border:'1px solid var(--border)', marginBottom:24 }}>
          <div style={{ fontSize:48 }}>{emoji}</div>
          <div style={{ fontSize:32, fontWeight:900, color:'var(--accent)', margin:'10px 0 4px' }}>{score}/{questions.length}</div>
          <div style={{ fontSize:18, fontWeight:700, color:'var(--tx-1)' }}>{pct}% Correct</div>
          <p style={{ fontSize:13, color:'var(--tx-2)', marginTop:6 }}>{msg}</p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', marginTop:18, flexWrap:'wrap' }}>
            <button onClick={()=>start(filter)} style={{ padding:'10px 22px', borderRadius:10, fontSize:13, fontWeight:700, cursor:'pointer', border:'none', background:'var(--accent)', color:'#fff' }}>🔄 Dobara Try</button>
            <button onClick={()=>setMode('home')} style={{ padding:'10px 22px', borderRadius:10, fontSize:13, fontWeight:700, cursor:'pointer', border:'1px solid var(--border)', background:'transparent', color:'var(--tx-1)' }}>🏠 Home</button>
          </div>
        </div>
        {wrong.length>0 && (
          <div>
            <h3 style={{ fontSize:14, fontWeight:800, color:'var(--tx-1)', marginBottom:14 }}>❌ Galat Jawab — Review Karo ({wrong.length})</h3>
            {wrong.map(({q:wq,chosen},i)=>(
              <div key={i} style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderLeft:'4px solid #ef4444', borderRadius:13, padding:'16px 18px', marginBottom:12 }}>
                <p style={{ fontSize:13, fontWeight:600, color:'var(--tx-1)', marginBottom:10 }}>{wq.question}</p>
                <div style={{ display:'flex', gap:8, marginBottom:10, flexWrap:'wrap' }}>
                  <span style={{ fontSize:12, padding:'4px 10px', borderRadius:8, background:'rgba(239,68,68,0.1)', color:'#ef4444', border:'1px solid rgba(239,68,68,0.25)', fontWeight:600 }}>✗ {chosen}</span>
                  <span style={{ fontSize:12, padding:'4px 10px', borderRadius:8, background:th.accentBg, color:th.accent, border:`1px solid ${th.accentBdr}`, fontWeight:600 }}>✓ {correct(wq)}</span>
                </div>
                <div style={{ padding:'11px 13px', borderRadius:10, background:'var(--bg-elevated)', border:'1px solid var(--border)', fontSize:12.5, color:'var(--tx-2)', lineHeight:1.65 }}>
                  <strong style={{ color:'var(--accent)' }}>💡 Explanation: </strong>{wq.explanation}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ── QUIZ ── */
  if (!q) return null;
  const ans = correct(q);
  const isOk = selected === ans;
  const pm = DSA_PATTERNS.find(p=>p.id===q.patternId);

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <span style={{ fontSize:12, color:'var(--tx-3)' }}>
          {filter!=='all' && <span style={{ color:'var(--accent)', fontWeight:700 }}>{DSA_PATTERNS.find(p=>p.id===filter)?.name} — </span>}
          {idx+1} / {questions.length}
        </span>
        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
          <span style={{ fontSize:12, color:'var(--accent)', fontWeight:700 }}>✓ {score}</span>
          <span style={{ fontSize:12, color:'#ef4444', fontWeight:700 }}>✗ {wrong.length}</span>
          <button onClick={()=>setMode('home')} style={{ fontSize:12, color:'var(--tx-3)', background:'none', border:'none', cursor:'pointer' }}>✕</button>
        </div>
      </div>
      <div style={{ height:5, background:'var(--border)', borderRadius:3, marginBottom:20 }}>
        <div style={{ height:'100%', width:`${(idx/questions.length)*100}%`, background:'var(--accent)', borderRadius:3, transition:'width 0.3s' }} />
      </div>

      <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:18, overflow:'hidden' }}>
        <div style={{ padding:'18px 22px 14px', borderBottom:'1px solid var(--border)', background:'var(--bg-elevated)' }}>
          <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:10 }}>
            <span style={{ fontSize:11, padding:'2px 8px', borderRadius:6, fontWeight:700,
              background:q.difficulty==='easy'?'rgba(34,197,94,0.12)':q.difficulty==='medium'?'rgba(245,158,11,0.12)':'rgba(239,68,68,0.12)',
              color:q.difficulty==='easy'?'#22c55e':q.difficulty==='medium'?'#f59e0b':'#ef4444' }}>
              {q.difficulty[0].toUpperCase()+q.difficulty.slice(1)}
            </span>
            {pm && <span style={{ fontSize:11, color:'var(--accent)', fontWeight:600 }}>{pm.icon} {pm.name}</span>}
          </div>
          <p style={{ fontSize:14, fontWeight:700, color:'var(--tx-1)', margin:0, lineHeight:1.65 }}>🧠 {q.question}</p>
        </div>

        <div style={{ padding:'16px 22px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:8 }}>
            {q.options.map((opt,i)=>{
              let bg='var(--bg-elevated)', bdr='var(--border)', clr='var(--tx-1)', icon=String.fromCharCode(65+i);
              if (selected) {
                if (opt===ans)       { bg='rgba(16,185,129,0.12)'; bdr='#10b981'; clr='#10b981'; icon='✓'; }
                else if (opt===selected) { bg='rgba(239,68,68,0.1)'; bdr='#ef4444'; clr='#ef4444'; icon='✗'; }
                else { clr='var(--tx-3)'; }
              }
              return (
                <button key={opt} onClick={()=>answer(opt)} disabled={!!selected}
                  style={{ padding:'11px 15px', borderRadius:10, fontSize:13, fontWeight:600, cursor:selected?'default':'pointer', background:bg, border:`1.5px solid ${bdr}`, color:clr, textAlign:'left', display:'flex', alignItems:'center', gap:9 }}
                  onMouseEnter={e=>{ if(!selected){e.currentTarget.style.borderColor=th.accent; e.currentTarget.style.background=th.accentBg;} }}
                  onMouseLeave={e=>{ if(!selected){e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-elevated)';} }}>
                  <span style={{ width:22, height:22, borderRadius:5, background:bdr+'20', border:`1px solid ${bdr}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, flexShrink:0, color:clr }}>{icon}</span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {selected && (
          <div style={{ borderTop:'1px solid var(--border)', padding:'18px 22px' }}>
            <div style={{ fontSize:15, fontWeight:800, color:isOk?'var(--accent)':'#ef4444', marginBottom:14 }}>
              {isOk ? '✅ Bilkul Sahi!' : `❌ Galat! Sahi: ${ans}`}
            </div>
            <div style={{ background:'var(--bg-elevated)', borderRadius:11, padding:'13px 15px', marginBottom:16, border:'1px solid var(--border)' }}>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--accent)', marginBottom:7, textTransform:'uppercase', letterSpacing:'0.06em' }}>💡 Explanation</div>
              <p style={{ fontSize:13, color:'var(--tx-1)', lineHeight:1.7, margin:0 }}>{q.explanation}</p>
            </div>
            <button onClick={next} style={{ width:'100%', padding:13, borderRadius:11, fontSize:14, fontWeight:800, cursor:'pointer', border:'none', background:'var(--accent)', color:'#fff' }}>
              {idx<questions.length-1 ? 'Agla Question →' : '🏁 Result Dekho'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
