import Link from 'next/link';
import {
  ArrowRight,
  Zap,
  Brain,
  Eye,
  Code2,
  Clock,
  BarChart2,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { DSA_PATTERNS, TOTAL_PATTERNS, TOTAL_QUESTIONS } from '@/lib/constants';

export default function HomePage() {
  const previewPatterns = DSA_PATTERNS.slice(0, 6);

  return (
    <div className="min-h-screen w-full">
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative overflow-hidden w-full px-8 sm:px-12 lg:px-16 py-20 lg:py-28 text-center">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px]" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 text-emerald-400 text-sm mb-8">
            <Zap className="w-3.5 h-3.5" />
            <span>
              {TOTAL_QUESTIONS} Problems · {TOTAL_PATTERNS} Patterns ·
              AI-Powered
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="text-white">Master DSA.</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Crack Any Interview.
            </span>
          </h1>

          <p className="text-lg text-[#7a7a9a] max-w-xl mx-auto mb-10 leading-relaxed">
            Stop grinding randomly. Learn the{' '}
            <span className="text-white font-semibold">15 patterns</span> that
            solve 90% of FAANG problems — with AI tutoring, step-by-step
            visualizers, and timed mock interviews.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-4 mb-10 flex-wrap">
            <Link
              href="/patterns"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base transition-all hover:scale-105 shadow-lg shadow-emerald-500/25"
            >
              Start Learning Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/visualizers"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl border border-[#2a2a3e] hover:border-[#3a3a5e] text-[#c8c8e8] hover:text-white font-semibold text-base transition-all hover:bg-[#0f0f18]"
            >
              See Visualizers
            </Link>
          </div>

          {/* Pattern chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {DSA_PATTERNS.slice(0, 7).map((p) => (
              <Link
                key={p.id}
                href={`/patterns/${p.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-[#1e1e2e] hover:border-[#2a2a3e] text-[#5a5a7a] hover:text-[#c8c8e8] bg-[#0c0c15] hover:bg-[#0f0f18] transition-all"
              >
                <span>{p.icon}</span>
                {p.name}
              </Link>
            ))}
            <span className="flex items-center px-3 py-1.5 text-xs text-[#5a5a7a]">
              + {TOTAL_PATTERNS - 7} more
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          STATS BAR
      ══════════════════════════════ */}
      <section className="border-y border-[#1e1e2e] bg-[#0c0c15] w-full">
        <div className="max-w-4xl mx-auto px-8 sm:px-12 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                value: '15',
                label: 'DSA Patterns',
                color: 'text-emerald-400',
                icon: Layers,
              },
              {
                value: '450',
                label: 'LeetCode Problems',
                color: 'text-blue-400',
                icon: Code2,
              },
              {
                value: '8',
                label: 'Visualizers',
                color: 'text-purple-400',
                icon: Eye,
              },
              {
                value: '∞',
                label: 'AI-Powered Features',
                color: 'text-amber-400',
                icon: Brain,
              },
            ].map(({ value, label, color, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className={`w-5 h-5 ${color} opacity-70`} />
                <div className={`text-4xl font-black ${color}`}>{value}</div>
                <div className="text-xs text-[#5a5a7a]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PATTERN PREVIEW
      ══════════════════════════════ */}
      <section className="w-full px-8 sm:px-12 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-emerald-400 text-sm font-semibold mb-2">
              15 Core Patterns
            </p>
            <h2 className="text-3xl font-black text-white">
              One Pattern. Infinite Problems.
            </h2>
            <p className="text-[#7a7a9a] mt-3 max-w-lg mx-auto">
              Each pattern includes 30 hand-picked problems, detailed
              explanations, trigger keywords, and complexity analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {previewPatterns.map((p) => (
              <Link
                key={p.id}
                href={`/patterns/${p.slug}`}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-[#0c0c15] border border-[#1e1e2e] hover:border-[#2a2a3e] hover:bg-[#0f0f18] transition-all hover:-translate-y-0.5"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${p.color}20, ${p.color}08)`,
                    border: `1px solid ${p.color}25`,
                  }}
                >
                  {p.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[#e8e8f0] group-hover:text-white truncate">
                      {p.name}
                    </h3>
                    <span
                      className="text-[11px] font-bold flex-shrink-0"
                      style={{ color: p.color }}
                    >
                      #{p.order}
                    </span>
                  </div>
                  <p className="text-xs text-[#5a5a7a] line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                  <p className="text-[11px] text-[#3a3a4e] mt-2">
                    30 problems · {p.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/patterns"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2a2a3e] hover:border-emerald-500/30 text-[#7a7a9a] hover:text-emerald-400 font-medium transition-all text-sm"
            >
              View All 15 Patterns <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FEATURES
      ══════════════════════════════ */}
     <section className="w-full px-8 sm:px-12 lg:px-16 py-16 bg-[#0c0c15] border-y border-[#1e1e2e]">
  <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-purple-400 text-sm font-semibold mb-2">
              Everything Included
            </p>
            <h2 className="text-3xl font-black text-white">
              Built for Interview Success
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <Layers className="w-5 h-5 text-emerald-400" />,
                color: 'emerald',
                title: 'Pattern Library',
                desc: '15 patterns with theory, templates, and trigger keywords',
              },
              {
                icon: <Code2 className="w-5 h-5 text-blue-400" />,
                color: 'blue',
                title: 'Practice Problems',
                desc: '450 LeetCode problems organized by pattern and difficulty',
              },
              {
                icon: <Eye className="w-5 h-5 text-purple-400" />,
                color: 'purple',
                title: 'Algorithm Visualizers',
                desc: '8 interactive visualizers — sorting, trees, graphs, and more',
              },
              {
                icon: <Brain className="w-5 h-5 text-pink-400" />,
                color: 'pink',
                title: 'AI Tutor',
                desc: 'Get hints, explanations, and pattern detection help',
              },
              {
                icon: <Clock className="w-5 h-5 text-amber-400" />,
                color: 'amber',
                title: 'Interview Simulator',
                desc: '45-minute timed sessions with real-time feedback',
              },
              {
                icon: <BarChart2 className="w-5 h-5 text-teal-400" />,
                color: 'teal',
                title: 'Progress Dashboard',
                desc: 'Track solved problems, streaks, and weak patterns',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl bg-[#080810] border border-[#1e1e2e] hover:border-[#2a2a3e] transition-all"
              >
                <div className="mb-4">{icon}</div>
                <h3 className="font-bold text-[#e8e8f0] mb-2">{title}</h3>
                <p className="text-sm text-[#5a5a7a] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          HOW IT WORKS
      ══════════════════════════════ */}
      <section className="w-full px-8 sm:px-12 lg:px-16 py-16">
  <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white">How It Works</h2>
          <p className="text-[#7a7a9a] mt-3">
            From zero to interview-ready in 4 steps
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Pick a Pattern',
              desc: 'Start with Sliding Window, follow the order',
            },
            {
              step: '02',
              title: 'Study the Theory',
              desc: 'Learn core idea, template, and when to use',
            },
            {
              step: '03',
              title: 'Solve Problems',
              desc: 'Practice 30 problems from easy to hard',
            },
            {
              step: '04',
              title: 'Simulate Interview',
              desc: 'Test under real timed conditions',
            },
          ].map(({ step, title, desc }) => (
            <div
              key={step}
              className="text-center p-6 rounded-2xl bg-[#0c0c15] border border-[#1e1e2e]"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-400 font-black text-sm">
                  {step}
                </span>
              </div>
              <h3 className="font-bold text-[#e8e8f0] mb-2 text-sm">{title}</h3>
              <p className="text-xs text-[#5a5a7a] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}
     <section className="w-full px-8 sm:px-12 lg:px-16 py-16 text-center bg-[#0c0c15] border-t border-[#1e1e2e]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to Master DSA?
          </h2>
          <p className="text-[#7a7a9a] mb-8">
            Join thousands of developers who cracked FAANG interviews using
            these 15 patterns.
          </p>
          <Link
            href="/patterns"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base transition-all hover:scale-105 shadow-xl shadow-emerald-500/20"
          >
            Start Free — No Signup <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
