// ============================================
// Home Page - DSA Mastery Landing Page
// Hero + Stats + Pattern Preview + Features
// ============================================

import Link from 'next/link';
import {
  ArrowRight, Brain, Code2, Zap, BarChart3,
  Timer, Bot, CheckCircle2, Layers, Activity,
  Target, TrendingUp, Sparkles,
} from 'lucide-react';
import { Button }       from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge }        from '@/components/ui/badge';
import { DSA_PATTERNS, TOTAL_QUESTIONS, TOTAL_PATTERNS } from '@/lib/constants';

// ── Stats row data ──
const STATS = [
  { label: 'DSA Patterns',        value: String(TOTAL_PATTERNS), Icon: Layers,    color: 'text-emerald-400', glow: 'bg-emerald-500/10' },
  { label: 'LeetCode Problems',   value: String(TOTAL_QUESTIONS), Icon: Code2,    color: 'text-blue-400',    glow: 'bg-blue-500/10'    },
  { label: 'Visualizers',         value: '8',                     Icon: Activity, color: 'text-purple-400',  glow: 'bg-purple-500/10'  },
  { label: 'AI-Powered Features', value: '∞',                     Icon: Bot,      color: 'text-amber-400',   glow: 'bg-amber-500/10'   },
];

// ── Feature cards ──
const FEATURES = [
  {
    Icon  : Brain,
    title : 'Pattern-Based Learning',
    desc  : '15 core DSA patterns that crack 90% of FAANG interviews. Master the pattern, solve any variation.',
    color : 'text-emerald-400',
    bg    : 'bg-emerald-500/8',
    border: 'border-emerald-500/15',
  },
  {
    Icon  : Activity,
    title : 'Algorithm Visualizers',
    desc  : 'Watch sorting, graphs, trees, and DP animate step-by-step. See the algorithm think.',
    color : 'text-purple-400',
    bg    : 'bg-purple-500/8',
    border: 'border-purple-500/15',
  },
  {
    Icon  : Bot,
    title : 'AI Tutor & Pattern Detector',
    desc  : "Paste any problem — AI identifies the pattern, gives hints, never spoils the answer.",
    color : 'text-blue-400',
    bg    : 'bg-blue-500/8',
    border: 'border-blue-500/15',
  },
  {
    Icon  : Code2,
    title : 'Monaco Code Editor',
    desc  : 'VS Code-quality editor in the browser. Write in Python, JS, Java, C++ with autocomplete.',
    color : 'text-amber-400',
    bg    : 'bg-amber-500/8',
    border: 'border-amber-500/15',
  },
  {
    Icon  : Timer,
    title : 'Interview Simulator',
    desc  : '45-minute mock interviews with random problems. Build the speed and stamina for real interviews.',
    color : 'text-red-400',
    bg    : 'bg-red-500/8',
    border: 'border-red-500/15',
  },
  {
    Icon  : BarChart3,
    title : 'Progress Dashboard',
    desc  : 'Streaks, heatmaps, completion rates, weak pattern analysis. Know exactly where you stand.',
    color : 'text-teal-400',
    bg    : 'bg-teal-500/8',
    border: 'border-teal-500/15',
  },
];

// ── 4-step flow ──
const HOW_STEPS = [
  { n: 1, Icon: Brain,    title: 'Learn the Pattern',  desc: 'Understand core idea, triggers, and complexity'   },
  { n: 2, Icon: Code2,    title: 'Solve 30 Problems',  desc: 'From easy → medium → hard with guided hints'      },
  { n: 3, Icon: Activity, title: 'Visualize It',        desc: 'Watch the algorithm animate to cement your grasp' },
  { n: 4, Icon: Timer,    title: 'Mock Interview',      desc: 'Timed 45-min sessions with AI evaluation'         },
];

export default function HomePage() {
  const previewPatterns = DSA_PATTERNS.slice(0, 6);

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ═══════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

        {/* Gradient orbs - decorative */}
        <div className="absolute top-16 left-1/4 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 right-1/4 w-[400px] h-[400px] bg-purple-500/8  rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 pt-16 pb-20 text-center">

          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/15 text-emerald-400 text-sm font-medium mb-8 animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5" />
            <span>450 Problems · 15 Patterns · AI-Powered</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up delay-100">
            <span className="text-[#e8e8f0]">Master DSA.</span>
            <br />
            <span className="gradient-text">Crack Any Interview.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-[#6b6b8a] max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            Stop grinding randomly. Learn the{' '}
            <span className="text-[#e8e8f0] font-medium">15 patterns</span> that solve
            90% of FAANG problems — with AI tutoring, step-by-step visualizers, and
            timed mock interviews.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up delay-300">
            <Link href="/patterns">
              <Button size="lg" className="px-8 gap-2">
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/visualizers">
              <Button size="lg" variant="outline" className="px-8 gap-2">
                <Activity className="w-5 h-5" />
                See Visualizers
              </Button>
            </Link>
          </div>

          {/* Pattern name chips */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up delay-400">
            {['Sliding Window', 'Two Pointers', 'BFS / DFS', 'Dynamic Programming', 'Heaps'].map((name) => (
              <span
                key={name}
                className="flex items-center gap-1.5 text-xs text-[#6b6b8a] px-3 py-1 rounded-full bg-[#111118] border border-[#2a2a3e]"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                {name}
              </span>
            ))}
            <span className="text-xs text-[#6b6b8a] px-3 py-1 rounded-full bg-[#111118] border border-[#2a2a3e]">
              + 10 more
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          STATS ROW
      ═══════════════════════════════════ */}
      <section className="border-y border-[#2a2a3e] bg-[#111118]/60">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ label, value, Icon, color, glow }) => (
              <div key={label} className="text-center group">
                <div className={`w-12 h-12 rounded-xl ${glow} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div className={`text-4xl font-black ${color} mb-1`}>{value}</div>
                <div className="text-sm text-[#6b6b8a]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          PATTERN PREVIEW
      ═══════════════════════════════════ */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <Badge variant="default" className="mb-4 text-sm px-4 py-1">
            15 Core Patterns
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e8e8f0] mb-4">
            One Pattern. Infinite Problems.
          </h2>
          <p className="text-[#6b6b8a] max-w-xl mx-auto">
            Each pattern includes 30 hand-picked problems, detailed explanations,
            trigger keywords, and complexity analysis.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {previewPatterns.map((pattern, i) => (
            <Link key={pattern.id} href={`/patterns/${pattern.slug}`}>
              <Card
                hover
                glow="green"
                className="h-full animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    {/* Icon with colored dot */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ backgroundColor: `${pattern.color}15`, border: `1px solid ${pattern.color}25` }}
                    >
                      {pattern.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[#e8e8f0] text-sm">{pattern.name}</h3>
                        <span
                          className="text-xs font-medium px-1.5 py-0.5 rounded"
                          style={{ color: pattern.color, backgroundColor: `${pattern.color}15` }}
                        >
                          #{pattern.order}
                        </span>
                      </div>
                      <p className="text-xs text-[#6b6b8a] line-clamp-2">{pattern.description}</p>
                      <div className="flex items-center gap-2 mt-2.5">
                        <Badge variant="outline" className="text-xs">30 problems</Badge>
                        <span className="text-xs text-[#6b6b8a]">{pattern.category}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/patterns">
            <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All 15 Patterns
            </Button>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FEATURES GRID
      ═══════════════════════════════════ */}
      <section className="bg-[#111118]/50 border-y border-[#2a2a3e]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
              Everything Included
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e8e8f0] mb-4">
              Built for Interview Success
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ Icon, title, desc, color, bg, border }, i) => (
              <div
                key={title}
                className={`p-6 rounded-xl bg-[#111118] border ${border} hover:-translate-y-1 hover:${bg} transition-all duration-300 animate-fade-in-up`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className={`w-11 h-11 rounded-xl ${bg} border ${border} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-semibold text-[#e8e8f0] mb-2">{title}</h3>
                <p className="text-sm text-[#6b6b8a] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════ */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e8e8f0] mb-3">
            How It Works
          </h2>
          <p className="text-[#6b6b8a]">4 steps from beginner to interview-ready</p>
        </div>

        {/* Step connector line (desktop) */}
        <div className="relative">
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#2a2a3e] to-transparent hidden lg:block" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_STEPS.map(({ n, Icon, title, desc }) => (
              <div key={n} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-[#111118] border border-[#2a2a3e] flex items-center justify-center mx-auto mb-4 relative hover:border-emerald-500/40 transition-colors">
                  <Icon className="w-7 h-7 text-emerald-400" />
                  {/* Step number badge */}
                  <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-emerald-500 text-black text-xs font-black flex items-center justify-center">
                    {n}
                  </span>
                </div>
                <h3 className="font-semibold text-[#e8e8f0] mb-2">{title}</h3>
                <p className="text-sm text-[#6b6b8a] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════ */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/8 via-[#111118] to-purple-500/8 p-12 text-center">
          {/* Top accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

          <Target className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e8e8f0] mb-4">
            Your FAANG Journey Starts Now
          </h2>
          <p className="text-[#6b6b8a] max-w-lg mx-auto mb-8 leading-relaxed">
            Join developers who cracked Google, Meta, Amazon and Microsoft by systematically
            mastering DSA patterns — not grinding 1000 random problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/patterns">
              <Button size="lg" className="px-10 gap-2">
                <Zap className="w-5 h-5" />
                Start with Pattern #1
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="px-10 gap-2">
                <TrendingUp className="w-5 h-5" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}