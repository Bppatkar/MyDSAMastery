// Footer - Simple, clean footer
import Link from 'next/link';
import { Zap, Heart, Github } from 'lucide-react';

const links = [
  { href: '/patterns',    label: 'Patterns'    },
  { href: '/practice',    label: 'Practice'    },
  { href: '/visualizers', label: 'Visualizers' },
  { href: '/dashboard',   label: 'Dashboard'   },
];

export function Footer() {
  return (
    <footer className="border-t border-[#2a2a3e] bg-[#0a0a0f]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-sm text-[#e8e8f0]">
              DSA <span className="text-emerald-400">Mastery</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-5">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-[#6b6b8a] hover:text-emerald-400 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Made with love */}
          <p className="text-xs text-[#6b6b8a] flex items-center gap-1">
            Made with{' '}
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />{' '}
            for DSA learners
          </p>
        </div>
      </div>
    </footer>
  );
}