'use client';
import Link from 'next/link';
import { BookOpen, Mail, Github, Linkedin, MapPin } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
      {/* Top section */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 28px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen style={{ width: 14, height: 14, color: '#fff' }} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 900, color: 'var(--tx-1)' }}>
              <span style={{ color: 'var(--accent)' }}>DSA</span> Mastery
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--tx-3)', lineHeight: 1.7, margin: '0 0 12px' }}>
            LeetCode patterns master karne ka sabse systematic tarika. Pattern pehchano → Algorithm decide karo → Solve karo.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--tx-4)' }}>
            <MapPin size={12} />
            Jabalpur, Madhya Pradesh, India
          </div>
        </div>

        {/* Quick links */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
            Quick Links
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['/patterns', '📚 Patterns'],
              ['/practice', '💻 Practice'],
              ['/pattern-recognition', '🧠 Trainer'],
              ['/algorithms', '⚡ Algorithms'],
              ['/visualizers', '📊 Visualize'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: 13, color: 'var(--tx-3)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--tx-3)'}
              >{label}</Link>
            ))}
          </div>
        </div>

        {/* Developer */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--tx-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
            Developer
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--tx-1)', marginBottom: 4 }}>
            Bhanu Pratap Patkar
          </div>
          <div style={{ fontSize: 13, color: 'var(--tx-3)', marginBottom: 16 }}>
            MERN Stack Developer & Software Engineer
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="mailto:bhanupratappatkar777@gmail.com"
              style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--tx-3)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--tx-3)'}>
              <Mail size={14} /> bhanupratappatkar777@gmail.com
            </a>
            <a href="https://github.com/Bppatkar" target="_blank" rel="noopener"
              style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--tx-3)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--tx-3)'}>
              <Github size={14} /> github.com/Bppatkar
            </a>
            <a href="https://linkedin.com/in/bhanu-pratap-patkar" target="_blank" rel="noopener"
              style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--tx-3)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--tx-3)'}>
              <Linkedin size={14} /> in/bhanu-pratap-patkar
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <span style={{ fontSize: 12, color: 'var(--tx-4)' }}>
          © {year} Bhanu Pratap Patkar. All intellectual property rights reserved.
        </span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: 'Next.js', bg: '#000', color: '#fff' },
            { label: 'TypeScript', bg: '#3178c6', color: '#fff' },
            { label: 'React.js', bg: '#61dafb22', color: '#61dafb' },
            { label: 'Tailwind CSS', bg: '#06b6d420', color: '#06b6d4' },
            { label: 'Zustand', bg: '#ff6b3520', color: '#ff6b35' },
          ].map(t => (
            <span key={t.label} style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: t.bg, color: t.color, border: `1px solid ${t.color}40` }}>
              {t.label}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12, color: 'var(--tx-4)' }}>
          <span>🟢 Open to opportunities</span>
          <span>·</span>
          <span>Built with Next.js & TypeScript</span>
        </div>
      </div>
    </footer>
  );
}
