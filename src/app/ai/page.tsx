'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Code2, Lightbulb, Brain } from 'lucide-react';

interface Message { role: 'user' | 'assistant'; content: string; }

const STARTERS = [
  { icon: '🔍', text: 'Explain sliding window pattern', q: 'Explain the sliding window pattern with a simple example' },
  { icon: '⚡', text: 'When to use BFS vs DFS?', q: 'When should I use BFS vs DFS? Give me a clear decision rule' },
  { icon: '🧠', text: 'Dynamic programming approach', q: 'How do I identify if a problem needs dynamic programming? What are the signs?' },
  { icon: '🎯', text: 'Two pointers technique', q: 'Explain the two pointers technique and when it can replace brute force O(n²) → O(n)' },
];

const SYSTEM = `You are an expert DSA (Data Structures and Algorithms) tutor. You help students master coding interview patterns.

Your style:
- Give clear, concise explanations with examples
- Use code snippets when helpful (JavaScript/Python)
- Point out the KEY insight that makes a pattern work
- Mention time/space complexity
- Be encouraging but direct
- Keep responses focused (not too long)

Format code blocks with triple backticks and language name.`;

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages(p => [...p, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM,
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.map((c: any) => c.text || '').join('') || 'Error getting response';
      setMessages(p => [...p, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(p => [...p, { role: 'assistant', content: '⚠️ API error. Please check your connection.' }]);
    }
    setLoading(false);
  };

  const renderContent = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);
    return parts.map((part, i) => {
      if (part.startsWith('```')) {
        const lines = part.slice(3, -3).split('\n');
        const lang = lines[0];
        const code = lines.slice(1).join('\n');
        return (
          <pre key={i} style={{ background:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:8, padding:'12px 14px', margin:'8px 0', overflowX:'auto', fontSize:12, lineHeight:1.6 }}>
            {lang && <div style={{ fontSize:10, color:'var(--accent)', marginBottom:6, fontFamily:'monospace' }}>{lang}</div>}
            <code style={{ color:'var(--tx-1)', fontFamily:'monospace' }}>{code}</code>
          </pre>
        );
      }
      return <span key={i} style={{ whiteSpace:'pre-wrap' }}>{part}</span>;
    });
  };

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-base)', display:'flex', flexDirection:'column' }}>
      {/* Header */}
      <div style={{ borderBottom:'1px solid var(--border)', background:'var(--bg-surface)', padding:'16px 24px', display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:'var(--accent-bg)', border:'1px solid var(--accent-bdr)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Brain size={18} color="var(--accent)" />
        </div>
        <div>
          <h1 style={{ fontSize:16, fontWeight:900, color:'var(--tx-1)', margin:0 }}>AI DSA Tutor</h1>
          <p style={{ fontSize:11, color:'var(--tx-3)', margin:0 }}>Powered by Claude · Ask anything about DSA patterns</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:24, maxWidth:800, margin:'0 auto', width:'100%' }}>
        {messages.length === 0 ? (
          <div style={{ textAlign:'center', paddingTop:40 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🤖</div>
            <h2 style={{ color:'var(--tx-1)', fontSize:20, fontWeight:800, marginBottom:8 }}>DSA Tutor ready!</h2>
            <p style={{ color:'var(--tx-3)', fontSize:13, marginBottom:32 }}>Ask me anything about algorithms, patterns, or complexity</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, maxWidth:480, margin:'0 auto' }}>
              {STARTERS.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s.q)} style={{
                  padding:'12px 14px', borderRadius:10, background:'var(--bg-surface)', border:'1px solid var(--border)',
                  color:'var(--tx-2)', cursor:'pointer', textAlign:'left', fontSize:12, transition:'all 0.15s',
                  display:'flex', alignItems:'center', gap:8,
                }}>
                  <span style={{ fontSize:18 }}>{s.icon}</span>
                  <span>{s.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display:'flex', gap:10, justifyContent: m.role==='user' ? 'flex-end' : 'flex-start' }}>
                {m.role === 'assistant' && (
                  <div style={{ width:32, height:32, borderRadius:8, background:'var(--accent-bg)', border:'1px solid var(--accent-bdr)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:4 }}>
                    <Bot size={16} color="var(--accent)" />
                  </div>
                )}
                <div style={{
                  maxWidth:'75%', padding:'12px 16px', borderRadius:12, fontSize:13, lineHeight:1.7,
                  background: m.role==='user' ? 'var(--accent)' : 'var(--bg-surface)',
                  color: m.role==='user' ? '#fff' : 'var(--tx-1)',
                  border: m.role==='assistant' ? '1px solid var(--border)' : 'none',
                  borderRadius: m.role==='user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                }}>
                  {renderContent(m.content)}
                </div>
                {m.role === 'user' && (
                  <div style={{ width:32, height:32, borderRadius:8, background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:4 }}>
                    <User size={16} color="#fff" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display:'flex', gap:10 }}>
                <div style={{ width:32, height:32, borderRadius:8, background:'var(--accent-bg)', border:'1px solid var(--accent-bdr)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Bot size={16} color="var(--accent)" />
                </div>
                <div style={{ padding:'12px 16px', borderRadius:'12px 12px 12px 4px', background:'var(--bg-surface)', border:'1px solid var(--border)', display:'flex', alignItems:'center', gap:8, color:'var(--tx-3)', fontSize:13 }}>
                  <Loader2 size={14} style={{ animation:'spin 1s linear infinite' }} />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ borderTop:'1px solid var(--border)', background:'var(--bg-surface)', padding:'16px 24px' }}>
        <div style={{ maxWidth:800, margin:'0 auto', display:'flex', gap:10 }}>
          <input
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key==='Enter' && !e.shiftKey && sendMessage(input)}
            placeholder="Ask about any DSA pattern, algorithm, or problem..."
            disabled={loading}
            style={{ flex:1, padding:'10px 14px', borderRadius:8, border:'1px solid var(--border)', background:'var(--bg-base)', color:'var(--tx-1)', fontSize:13, outline:'none' }}
          />
          <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} style={{
            padding:'10px 16px', borderRadius:8, background:'var(--accent)', color:'#fff', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:6,
            opacity: (!input.trim() || loading) ? 0.5 : 1,
          }}>
            <Send size={16} />
          </button>
        </div>
        <div style={{ textAlign:'center', fontSize:10, color:'var(--tx-3)', marginTop:6 }}>
          Press Enter to send · AI responses may vary
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
