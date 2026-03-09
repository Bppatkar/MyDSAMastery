// ============================================
// Pattern Detail Page - Full UI Fix
// JavaScript template + proper layout
// ============================================

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Database,
  BookOpen,
  Lightbulb,
  Code2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Zap,
  Star,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { DSA_PATTERNS } from '@/lib/constants';
import { ALL_PATTERNS } from '@/lib/patternData';
import slidingWindowData from '@/data/patterns/sliding-window.json';
import twoPointersData from '@/data/patterns/two-pointers.json';
import binarySearchData from '@/data/patterns/binary-search.json';

const ALL_DATA = [
  slidingWindowData as any,
  twoPointersData as any,
  binarySearchData as any,
  ...ALL_PATTERNS,
];

interface Props {
  params: Promise<{ pattern: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pattern: slug } = await params;
  const p = ALL_DATA.find((x: any) => x.slug === slug);
  if (!p) return { title: 'Pattern Not Found' };
  return { title: `${p.name} — DSA Pattern`, description: p.description };
}

export async function generateStaticParams() {
  return DSA_PATTERNS.map((p) => ({ pattern: p.slug }));
}

const DIFF_COLOR: Record<string, string> = {
  Easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  Medium: 'text-amber-400   bg-amber-500/10   border-amber-500/25',
  Hard: 'text-red-400     bg-red-500/10     border-red-500/25',
};

const DIFF_DOT: Record<string, string> = {
  Easy: 'bg-emerald-400',
  Medium: 'bg-amber-400',
  Hard: 'bg-red-400',
};

export default async function PatternDetailPage({ params }: Props) {
  const { pattern: slug } = await params;
  const pattern = ALL_DATA.find((p: any) => p.slug === slug);
  if (!pattern) notFound();

  const prevPat = DSA_PATTERNS.find((p) => p.order === pattern.order - 1);
  const nextPat = DSA_PATTERNS.find((p) => p.order === pattern.order + 1);

  const easy = (pattern.questions ?? []).filter(
    (q: any) => q.difficulty === 'Easy'
  );
  const medium = (pattern.questions ?? []).filter(
    (q: any) => q.difficulty === 'Medium'
  );
  const hard = (pattern.questions ?? []).filter(
    (q: any) => q.difficulty === 'Hard'
  );
  const total = pattern.questions?.length ?? 30;

  // Use JS template if available, else Python
  const codeTemplate =
    pattern.template?.javascript ?? pattern.template?.python ?? '';
  const templateLang = pattern.template?.javascript ? 'JavaScript' : 'Python';

  return (
    <div className="min-h-screen bg-[#080810]">
      {/* ══════════════════════════════════
          HEADER BANNER
      ══════════════════════════════════ */}
      <div
        className="border-b border-[#1e1e2e]"
        style={{
          background: `linear-gradient(135deg, ${pattern.color}0a 0%, #080810 60%)`,
        }}
      >
        <div className="px-8 sm:px-12 py-8 max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link
              href="/patterns"
              className="flex items-center gap-1.5 text-[#5a5a7a] hover:text-emerald-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              All Patterns
            </Link>
            <span className="text-[#2a2a3e]">/</span>
            <span className="text-[#8888a8]">{pattern.name}</span>
          </div>

          {/* Title Row */}
          <div className="flex items-start gap-5">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${pattern.color}25, ${pattern.color}10)`,
                border: `1.5px solid ${pattern.color}35`,
                boxShadow: `0 8px 32px ${pattern.color}20`,
              }}
            >
              {pattern.icon}
            </div>

            <div className="flex-1 min-w-0">
              {/* Name + badges */}
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="text-3xl font-black text-white tracking-tight">
                  {pattern.name}
                </h1>
                <span
                  className="text-sm font-bold px-2.5 py-1 rounded-lg"
                  style={{
                    color: pattern.color,
                    backgroundColor: `${pattern.color}20`,
                  }}
                >
                  Pattern #{pattern.order}
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                    pattern.difficulty === 'Beginner'
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25'
                      : pattern.difficulty === 'Intermediate'
                        ? 'text-amber-400   bg-amber-500/10   border-amber-500/25'
                        : 'text-red-400 bg-red-500/10 border-red-500/25'
                  }`}
                >
                  {pattern.difficulty}
                </span>
              </div>

              <p className="text-[#7a7a9a] text-base leading-relaxed max-w-2xl">
                {pattern.description}
              </p>

              {/* Complexity row */}
              <div className="flex flex-wrap gap-3 mt-4">
                <MetaPill
                  icon={<Clock className="w-3.5 h-3.5 text-amber-400" />}
                  label="Time"
                  value={pattern.timeComplexity ?? 'O(n)'}
                  valueColor="text-amber-400"
                />
                <MetaPill
                  icon={<Database className="w-3.5 h-3.5 text-blue-400" />}
                  label="Space"
                  value={pattern.spaceComplexity ?? 'O(1)'}
                  valueColor="text-blue-400"
                />
                <MetaPill
                  icon={<BookOpen className="w-3.5 h-3.5 text-emerald-400" />}
                  label="Problems"
                  value={String(total)}
                  valueColor="text-emerald-400"
                />
                <MetaPill
                  icon={<span className="text-[10px]">{pattern.icon}</span>}
                  label="Category"
                  value={pattern.category}
                  valueColor="text-[#8888a8]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════ */}
      <div className="px-8 sm:px-12 py-8 max-w-6xl mx-auto">
        <div className="grid xl:grid-cols-[1fr_380px] gap-8">
          {/* ───────────────────────────
              LEFT — Questions
          ─────────────────────────── */}
          <div className="min-w-0">
            {/* Section header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                Practice Problems
                <span className="text-sm font-normal text-[#5a5a7a]">
                  ({total})
                </span>
              </h2>

              {/* Difficulty summary */}
              <div className="hidden sm:flex items-center gap-3 text-xs text-[#5a5a7a]">
                <DiffCount
                  count={easy.length}
                  label="Easy"
                  dot="bg-emerald-400"
                />
                <DiffCount
                  count={medium.length}
                  label="Medium"
                  dot="bg-amber-400"
                />
                <DiffCount count={hard.length} label="Hard" dot="bg-red-400" />
              </div>
            </div>

            {/* Question groups */}
            <div className="space-y-8">
              {easy.length > 0 && (
                <QuestionGroup
                  title="Easy"
                  questions={easy}
                  headerClass="text-emerald-400"
                  barColor="bg-emerald-500"
                />
              )}
              {medium.length > 0 && (
                <QuestionGroup
                  title="Medium"
                  questions={medium}
                  headerClass="text-amber-400"
                  barColor="bg-amber-500"
                />
              )}
              {hard.length > 0 && (
                <QuestionGroup
                  title="Hard"
                  questions={hard}
                  headerClass="text-red-400"
                  barColor="bg-red-500"
                />
              )}
            </div>

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#1e1e2e]">
              {prevPat ? (
                <Link
                  href={`/patterns/${prevPat.slug}`}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-[#1e1e2e] hover:border-[#2a2a3e] hover:bg-[#0f0f18] transition-all"
                >
                  <ArrowLeft className="w-4 h-4 text-[#5a5a7a] group-hover:text-emerald-400 transition-colors" />
                  <div>
                    <div className="text-[11px] text-[#5a5a7a] uppercase tracking-wider mb-0.5">
                      Previous
                    </div>
                    <div className="text-sm font-medium text-[#8888a8] group-hover:text-white transition-colors">
                      {prevPat.icon} {prevPat.name}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextPat && (
                <Link
                  href={`/patterns/${nextPat.slug}`}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-[#1e1e2e] hover:border-[#2a2a3e] hover:bg-[#0f0f18] transition-all text-right"
                >
                  <div>
                    <div className="text-[11px] text-[#5a5a7a] uppercase tracking-wider mb-0.5">
                      Next
                    </div>
                    <div className="text-sm font-medium text-[#8888a8] group-hover:text-white transition-colors">
                      {nextPat.icon} {nextPat.name}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#5a5a7a] group-hover:text-emerald-400 transition-colors" />
                </Link>
              )}
            </div>
          </div>

          {/* ───────────────────────────
              RIGHT — Theory Sidebar
          ─────────────────────────── */}
          <div className="space-y-4">
            {/* Core Idea */}
            <SideCard
              icon={<Lightbulb className="w-4 h-4 text-amber-400" />}
              title="Core Idea"
              accent="#f59e0b"
            >
              <p className="text-sm text-[#7a7a9a] leading-relaxed italic">
                "{pattern.coreIdea}"
              </p>
            </SideCard>

            {/* When to Use */}
            {(pattern.whenToUse ?? []).length > 0 && (
              <SideCard
                icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                title="When to Use"
                accent="#10b981"
              >
                <ul className="space-y-2.5">
                  {(pattern.whenToUse ?? []).map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[#7a7a9a]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SideCard>
            )}

            {/* Trigger Keywords */}
            {(pattern.triggers ?? []).length > 0 && (
              <SideCard
                icon={<AlertCircle className="w-4 h-4 text-blue-400" />}
                title="Spot It — Keywords"
                accent="#3b82f6"
              >
                <div className="flex flex-wrap gap-2">
                  {(pattern.triggers ?? []).map((t: string) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </SideCard>
            )}

            {/* JS Code Template */}
            {codeTemplate && (
              <SideCard
                icon={<Code2 className="w-4 h-4 text-purple-400" />}
                title={`${templateLang} Template`}
                accent="#8b5cf6"
                noPadContent
              >
                <div className="relative">
                  {/* Language label */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/20 font-mono uppercase tracking-wider">
                      {templateLang}
                    </span>
                  </div>
                  {/* Line numbers + code */}
                  <pre className="text-xs bg-[#060609] rounded-b-xl p-5 overflow-x-auto text-[#9a9ab8] leading-6 font-mono scrollbar-thin">
                    <code>{codeTemplate}</code>
                  </pre>
                </div>
              </SideCard>
            )}

            {/* Prerequisites */}
            {(pattern.prerequisites ?? []).length > 0 && (
              <SideCard
                icon={<BookOpen className="w-4 h-4 text-[#5a5a7a]" />}
                title="Prerequisites"
                accent="#5a5a7a"
              >
                <div className="flex flex-wrap gap-2">
                  {(pattern.prerequisites ?? []).map((p: string) => (
                    <span
                      key={p}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[#0f0f18] text-[#7a7a9a] border border-[#2a2a3e]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </SideCard>
            )}

            {/* Must-Know Problems */}
            {(pattern.examples ?? []).length > 0 && (
              <SideCard
                icon={<Zap className="w-4 h-4 text-emerald-400" />}
                title="Must-Know Problems"
                accent="#10b981"
              >
                <ul className="space-y-2">
                  {(pattern.examples ?? []).map((ex: string) => (
                    <li
                      key={ex}
                      className="flex items-center gap-2.5 text-sm text-[#7a7a9a]"
                    >
                      <Star className="w-3 h-3 text-amber-500 flex-shrink-0 fill-amber-500/50" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </SideCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   SUB-COMPONENTS (Server-safe — no onClick)
══════════════════════════════════ */

// MetaPill — small info pill in header
function MetaPill({
  icon,
  label,
  value,
  valueColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor: string;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0f0f18] border border-[#1e1e2e] text-sm">
      {icon}
      <span className="text-[#5a5a7a]">{label}:</span>
      <code className={`font-mono font-semibold ${valueColor}`}>{value}</code>
    </div>
  );
}

// DiffCount — difficulty summary count
function DiffCount({
  count,
  label,
  dot,
}: {
  count: number;
  label: string;
  dot: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-full ${dot}`} />
      <span>
        {count} {label}
      </span>
    </div>
  );
}

// SideCard — theory sidebar card
function SideCard({
  icon,
  title,
  accent,
  children,
  noPadContent = false,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
  children: React.ReactNode;
  noPadContent?: boolean;
}) {
  return (
    <div className="bg-[#0c0c15] border border-[#1e1e2e] rounded-2xl overflow-hidden">
      {/* Card header */}
      <div
        className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[#1e1e2e]"
        style={{
          background: `linear-gradient(90deg, ${accent}08, transparent)`,
        }}
      >
        {icon}
        <h3 className="text-sm font-semibold text-[#c8c8e8]">{title}</h3>
      </div>
      {/* Card body */}
      <div className={noPadContent ? '' : 'px-5 py-4'}>{children}</div>
    </div>
  );
}

// QuestionGroup — Easy / Medium / Hard section
function QuestionGroup({
  title,
  questions,
  headerClass,
  barColor,
}: {
  title: string;
  questions: any[];
  headerClass: string;
  barColor: string;
}) {
  return (
    <div>
      {/* Group header */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-2 h-2 rounded-full ${barColor}`} />
        <h3
          className={`text-sm font-bold uppercase tracking-wider ${headerClass}`}
        >
          {title}
        </h3>
        <div className="flex-1 h-px bg-[#1e1e2e]" />
        <span className="text-xs text-[#5a5a7a] bg-[#0f0f18] border border-[#1e1e2e] px-2 py-0.5 rounded-full">
          {questions.length} problems
        </span>
      </div>

      {/* Question rows */}
      <div className="bg-[#0c0c15] border border-[#1e1e2e] rounded-2xl overflow-hidden">
        {questions.map((q: any, i: number) => (
          <QuestionRow
            key={q.id}
            q={q}
            index={i}
            isLast={i === questions.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

// QuestionRow — individual problem row (NO onClick - server component safe)
function QuestionRow({
  q,
  index,
  isLast,
}: {
  q: any;
  index: number;
  isLast: boolean;
}) {
  return (
    <div
      className={`
      flex items-center gap-4 px-5 py-3.5
      hover:bg-[#0f0f1a] transition-colors group
      ${!isLast ? 'border-b border-[#1a1a28]' : ''}
    `}
    >
      {/* Index number */}
      <span className="text-xs font-mono text-[#3a3a4e] w-6 text-right flex-shrink-0">
        {index + 1}
      </span>

      {/* Classic star */}
      <div className="w-4 flex-shrink-0">
        {q.isClassic && (
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
        )}
      </div>

      {/* Problem info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* LeetCode number */}
          <span className="text-xs font-mono text-[#4a4a6a] flex-shrink-0">
            #{q.leetcodeNum}
          </span>
          {/* Title */}
          <span className="text-sm font-medium text-[#c8c8e8] group-hover:text-white transition-colors truncate">
            {q.title}
          </span>
          {/* Difficulty badge */}
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border flex-shrink-0 ${
              DIFF_COLOR[q.difficulty] ?? DIFF_COLOR.Medium
            }`}
          >
            {q.difficulty}
          </span>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 mt-1.5 flex-wrap">
          {q.tags.slice(0, 4).map((tag: string) => (
            <span
              key={tag}
              className="text-[11px] text-[#4a4a6a] bg-[#0a0a12] px-1.5 py-0.5 rounded border border-[#1a1a28]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right side: frequency + link */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Frequency dots */}
        <div
          className="hidden sm:flex items-center gap-0.5"
          title={`Frequency: ${q.frequency}/10`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i < Math.ceil(q.frequency / 2)
                  ? 'bg-emerald-500'
                  : 'bg-[#1e1e2e]'
              }`}
            />
          ))}
        </div>

        {/* LeetCode external link — NO onClick (server component) */}
        <a
          href={q.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-[#3a3a4e] hover:text-emerald-400 hover:bg-emerald-500/8 border border-transparent hover:border-emerald-500/20 transition-all"
          title={`Open "${q.title}" on LeetCode`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
