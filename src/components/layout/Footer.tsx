import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#1e1e2e] bg-[#080810] px-6 py-8 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="font-bold text-sm text-white">
            <span className="text-emerald-400">DSA</span> Mastery
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs text-[#5a5a7a]">
          {['/patterns', '/practice', '/visualizers', '/dashboard'].map((href) => (
            <Link key={href} href={href} className="hover:text-emerald-400 transition-colors capitalize">
              {href.replace('/', '')}
            </Link>
          ))}
        </div>

        <p className="text-xs text-[#3a3a4e]">
          Made for Interview Success ❤️
        </p>
      </div>
    </footer>
  );
}