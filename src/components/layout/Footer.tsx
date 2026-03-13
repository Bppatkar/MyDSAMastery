'use client';
import Link from 'next/link';
import { Github, Linkedin, Mail, BookOpen } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-surface)',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10,
    }}>
      {/* Left: Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BookOpen style={{ width: 11, height: 11, color: '#fff' }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--tx-1)' }}>
          <span style={{ color: 'var(--accent)' }}>DSA</span> Mastery
        </span>
        <span style={{ fontSize: 12, color: 'var(--tx-4)' }}>·</span>
        <span style={{ fontSize: 12, color: 'var(--tx-4)' }}>© {year} Bhanu Pratap Patkar</span>
      </div>

      {/* Center: Links */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {[
          ['/patterns', '📚 Patterns'],
          ['/practice', '💻 Practice'],
          ['/pattern-recognition', '🧠 Trainer'],
          ['/visualizers', '📊 Visualize'],
          ['/algorithms', '⚡ Algorithms'],
        ].map(([href, label]) => (
          <Link key={href} href={href} style={{ fontSize: 12, color: 'var(--tx-3)', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--tx-3)'}>
            {label}
          </Link>
        ))}
      </div>

      {/* Right: Dev links */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--tx-4)' }}>Bhanu Pratap Patkar</span>
        <a href="mailto:bhanupratappatkar777@gmail.com" style={{ color: 'var(--tx-4)' }} title="Email">
          <Mail size={14} />
        </a>
        <a href="https://github.com/Bppatkar" target="_blank" rel="noopener" style={{ color: 'var(--tx-4)' }} title="GitHub">
          <Github size={14} />
        </a>
        <a href="https://linkedin.com/in/bhanu-pratap-patkar" target="_blank" rel="noopener" style={{ color: 'var(--tx-4)' }} title="LinkedIn">
          <Linkedin size={14} />
        </a>
        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: '#00000090', color: '#fff', fontWeight: 700 }}>Next.js</span>
        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: '#3178c6', color: '#fff', fontWeight: 700 }}>TypeScript</span>
      </div>
    </footer>
  );
}
