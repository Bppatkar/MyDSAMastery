"use client";
import { useState } from "react";
import Link from "next/link";
import { SEQUENCE, THINKING_CUES } from "@/lib/data";

// ── Constraint map (Step 1) ──────────────────────────────────
const CONSTRAINT_MAP = [
  {
    n: "n ≤ 20",
    complexity: "O(2^n) ya O(n!)",
    color: "#34d399",
    reason: "2^n: har element pe 2 choices → 2^n branches. n!: positions fill karo → n×(n-1)×...×1",
    patterns: ["Backtracking", "Permutations", "Brute Force"],
  },
  {
    n: "n ≤ 10,000",
    complexity: "O(n²)",
    color: "#22d3ee",
    reason: "Nested loops. 10^4 × 10^4 = 10^8 — border pe.",
    patterns: ["Bubble/Insertion Sort", "Nested DP", "Floyd-Warshall (V²)"],
  },
  {
    n: "n ≤ 10⁶",
    complexity: "O(n log n)",
    color: "#a78bfa",
    reason: "Sorting lower bound: log₂(n!) ≈ n log n comparisons minimum. Heap: n inserts × log n each.",
    patterns: ["Merge/Quick/Heap Sort", "Dijkstra", "Binary Search in loop"],
  },
  {
    n: "n ≤ 10⁷",
    complexity: "O(n)",
    color: "#fbbf24",
    reason: "Two Pointers: combined n moves total. Sliding Window: right kabhi peeche nahi jaata.",
    patterns: ["Two Pointers", "Sliding Window", "HashMap", "Prefix Sum"],
  },
  {
    n: "n ≥ 10⁷",
    complexity: "O(log n) ya O(1)",
    color: "#fb923c",
    reason: "Binary Search: har step pe half eliminate. n=10^6 → sirf 20 steps. O(1): direct formula/bit trick.",
    patterns: ["Binary Search", "Math Formula", "Bit Manipulation"],
  },
];

// ── Input → pattern (Step 2) ─────────────────────────────────
const INPUT_MAP = [
  {
    input: "Sorted Array",
    patterns: ["Binary Search", "Two Pointers"],
    why: "Order guaranteed → half karo ya dono ends se aao.",
  },
  {
    input: "String + substring/continuous",
    patterns: ["Sliding Window", "HashMap"],
    why: "Continuous = window. Chars = frequency map.",
  },
  {
    input: "Linked List",
    patterns: ["Fast-Slow Pointers"],
    why: "Cycle/Middle → two speeds.",
  },
  {
    input: "Tree (Binary)",
    patterns: ["DFS (recursion)", "BFS (queue, level-order)"],
    why: "DFS = all paths, subtrees. BFS = level, shortest.",
  },
  {
    input: "Graph + edges",
    patterns: ["BFS (shortest unweighted)", "DFS (components/cycles)", "Dijkstra (weighted +ve)", "Topo Sort (DAG)"],
    why: "BFS = ripple. DFS = deep. Dijkstra = BFS + priority.",
  },
  {
    input: "2D Grid",
    patterns: ["DFS/BFS (4-dir)", "DP (path count)"],
    why: "Grid = graph with fixed 4 neighbors.",
  },
  {
    input: "Intervals",
    patterns: ["Sort by start + Merge", "Heap (meeting rooms)"],
    why: "Sort pehle, phir overlap check.",
  },
];

// ── Output → algorithm family (Step 3) ───────────────────────
const OUTPUT_MAP = [
  {
    output: "List of Lists (all subsets/combos/paths)",
    family: "Backtracking",
    why: "Saari possibilities enumerate → CHOOSE-EXPLORE-UNCHOOSE.",
  },
  {
    output: "Single Number (max/min/count/ways)",
    family: "DP or Greedy",
    why: "Overlapping subproblems → DP. Local=Global → Greedy.",
    note: "'Count of ways' = DP not backtracking.",
  },
  {
    output: "Boolean (possible/not possible)",
    family: "DP / BFS / DFS",
    why: "Reachability ya existence check.",
  },
  {
    output: "Modified Array in-place",
    family: "Two Pointers",
    why: "Slow/fast — no extra space.",
  },
  {
    output: "Ordered / Dependency order",
    family: "Topological Sort",
    why: "DAG → Kahn's BFS.",
  },
  {
    output: "Kth element",
    family: "Heap (min-heap size K)",
    why: "Top-K → don't sort everything.",
  },
];

// ── Keywords (Step 4) ────────────────────────────────────────
const KEYWORD_MAP = [
  { kw: '"substring" / "subarray" + condition', pattern: "Sliding Window", color: "#a78bfa" },
  { kw: '"sorted" + pairs/target sum', pattern: "Two Pointers", color: "#22d3ee" },
  { kw: '"palindrome"', pattern: "Two Pointers / Expand Around Center", color: "#22d3ee" },
  { kw: '"k largest" / "top k" / "kth"', pattern: "Heap (min-heap size K)", color: "#e879f9" },
  { kw: '"median" / "stream"', pattern: "Two Heaps", color: "#fb923c" },
  { kw: '"parentheses" / "brackets" / "nested"', pattern: "Stack", color: "#818cf8" },
  { kw: '"next greater element"', pattern: "Monotonic Stack (decreasing)", color: "#fb923c" },
  { kw: '"anagram" / "frequency" / "count"', pattern: "HashMap", color: "#fbbf24" },
  { kw: '"prefix" / "autocomplete" / "starts with"', pattern: "Trie", color: "#f43f5e" },
  { kw: '"connected components" / "groups"', pattern: "Union-Find / DFS", color: "#4ade80" },
  { kw: '"dependencies" / "prerequisites"', pattern: "Topological Sort", color: "#67e8f9" },
  { kw: '"minimize maximum" / "maximize minimum"', pattern: "Binary Search on Answer", color: "#34d399" },
  { kw: '"number of ways" / "how many"', pattern: "DP (count, not backtrack)", color: "#fbbf24" },
  { kw: '"xor" / "single number" / "power of 2"', pattern: "Bit Manipulation", color: "#67e8f9" },
  { kw: '"in-place" / "without extra space"', pattern: "Two Pointers / Bit", color: "#22d3ee" },
  { kw: '"cycle" in list/graph', pattern: "Fast-Slow (LL) / DFS / Union-Find", color: "#818cf8" },
];

const STEPS = [
  { num: 1, label: "n → Complexity", color: "#22d3ee" },
  { num: 2, label: "Input Format", color: "#a78bfa" },
  { num: 3, label: "Output Format", color: "#34d399" },
  { num: 4, label: "Keywords", color: "#fbbf24" },
];

export default function CheatSheet() {
  const [activeStep, setActiveStep] = useState(1);
  const [search, setSearch] = useState("");

  const filteredCues = THINKING_CUES.filter(c =>
    !search ||
    c.cue.toLowerCase().includes(search.toLowerCase()) ||
    c.mindShouldSay.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{
          fontSize: "clamp(24px,5vw,36px)",
          fontWeight: 900,
          color: "var(--text-1)",
          marginBottom: "8px",
        }}>
          📋 Cheat Sheet
        </h1>
        <p style={{ fontSize: "13px", color: "var(--text-3)" }}>
          4-Step Framework → Pattern identify karo.{" "}
          Deep reasoning ke liye{" "}
          <Link href="/patterns" style={{ color: "var(--accent-cyan)", textDecoration: "none" }}>
            Pattern Rule Book →
          </Link>
        </p>
      </div>

      {/* ── Section 1: 4-Step Framework ── */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "var(--text-3)",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: "14px",
        }}>
          🎯 4-Step Framework
        </div>

        {/* Step selector */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
          {STEPS.map(s => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              style={{
                padding: "8px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                background: activeStep === s.num
                  ? `${s.color}12`
                  : "var(--bg-elevated)",
                border: `1px solid ${activeStep === s.num ? s.color : "var(--border)"}`,
                color: activeStep === s.num ? s.color : "var(--text-3)",
                fontWeight: activeStep === s.num ? 700 : 400,
                fontSize: "13px",
              }}
            >
              Step {s.num}: {s.label}
            </button>
          ))}
        </div>

        {/* Step 1 */}
        {activeStep === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {CONSTRAINT_MAP.map(r => (
              <div
                key={r.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "110px 180px 1fr 1fr",
                  gap: "12px",
                  alignItems: "start",
                  background: "var(--bg-card)",
                  borderRadius: "10px",
                  padding: "13px 16px",
                  border: `1px solid ${r.color}18`,
                }}
              >
                <code style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: r.color,
                  fontFamily: "'Fira Code', monospace",
                }}>
                  {r.n}
                </code>

                <code style={{
                  fontSize: "11px",
                  color: "var(--accent-amber)",
                  background: "rgba(251,191,36,0.08)",
                  padding: "3px 8px",
                  borderRadius: "5px",
                  fontFamily: "'Fira Code', monospace",
                  width: "fit-content",
                }}>
                  {r.complexity}
                </code>

                <span style={{ fontSize: "11.5px", color: "var(--text-3)", lineHeight: 1.5 }}>
                  {r.reason}
                </span>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {r.patterns.map(p => (
                    <span
                      key={p}
                      style={{
                        fontSize: "11px",
                        padding: "2px 8px",
                        borderRadius: "5px",
                        background: `${r.color}10`,
                        color: r.color,
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 2 */}
        {activeStep === 2 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "10px",
          }}>
            {INPUT_MAP.map(r => (
              <div
                key={r.input}
                style={{
                  background: "var(--bg-card)",
                  borderRadius: "10px",
                  padding: "14px",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#a78bfa",
                  marginBottom: "5px",
                }}>
                  {r.input}
                </div>
                <p style={{
                  fontSize: "11.5px",
                  color: "var(--text-3)",
                  marginBottom: "8px",
                  lineHeight: 1.5,
                }}>
                  {r.why}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {r.patterns.map(p => (
                    <span
                      key={p}
                      style={{
                        fontSize: "11px",
                        padding: "2px 9px",
                        borderRadius: "5px",
                        background: "rgba(167,139,250,0.1)",
                        color: "#a78bfa",
                        border: "1px solid rgba(167,139,250,0.2)",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 3 */}
        {activeStep === 3 && (
          <div>
            <div style={{
              background: "rgba(251,191,36,0.06)",
              border: "1px solid rgba(251,191,36,0.15)",
              borderRadius: "9px",
              padding: "12px 16px",
              marginBottom: "14px",
              fontSize: "13px",
              color: "var(--text-2)",
            }}>
              💡 Key: <strong style={{ color: "var(--accent-amber)" }}>
                "Kitne ways?" → DP (sirf count).
                "Saare ways batao?" → Backtracking (enumerate).
              </strong>{" "}
              Same problem, alag output → alag family.
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "10px",
            }}>
              {OUTPUT_MAP.map(r => (
                <div
                  key={r.output}
                  style={{
                    background: "var(--bg-card)",
                    borderRadius: "10px",
                    padding: "14px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#34d399",
                    marginBottom: "5px",
                  }}>
                    {r.output}
                  </div>
                  <p style={{
                    fontSize: "11.5px",
                    color: "var(--text-3)",
                    marginBottom: "6px",
                    lineHeight: 1.5,
                  }}>
                    {r.why}
                  </p>
                  {r.note && (
                    <p style={{
                      fontSize: "11px",
                      color: "var(--accent-amber)",
                      fontStyle: "italic",
                      marginBottom: "6px",
                    }}>
                      {r.note}
                    </p>
                  )}
                  <span style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text-1)",
                  }}>
                    → {r.family}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 */}
        {activeStep === 4 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "7px",
          }}>
            {KEYWORD_MAP.map(r => (
              <div
                key={r.kw}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  background: "var(--bg-card)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  border: `1px solid ${r.color}15`,
                }}
              >
                <span style={{
                  fontSize: "12px",
                  color: "var(--text-2)",
                  fontStyle: "italic",
                }}>
                  {r.kw}
                </span>
                <span style={{
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: r.color,
                  flexShrink: 0,
                }}>
                  → {r.pattern}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Section 2: Thinking Cues ── */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "14px",
          flexWrap: "wrap",
          gap: "10px",
        }}>
          <div style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--text-3)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}>
            🧠 Question Padh Ke Kya Yaad Aana Chahiye
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search cue..."
            style={{
              padding: "7px 12px",
              borderRadius: "7px",
              background: "var(--bg-elevated)",
              color: "var(--text-1)",
              border: "1px solid var(--border)",
              fontSize: "12px",
              width: "180px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filteredCues.map((c, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-card)",
                borderRadius: "10px",
                padding: "14px 16px",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{
                fontSize: "12px",
                fontStyle: "italic",
                color: "var(--text-3)",
                marginBottom: "6px",
              }}>
                Problem mein: {c.cue}
              </div>
              <div style={{
                fontSize: "13px",
                color: "var(--text-1)",
                lineHeight: 1.6,
                marginBottom: c.followup ? "6px" : 0,
                paddingLeft: "10px",
                borderLeft: "2px solid var(--accent-cyan)",
              }}>
                {c.mindShouldSay}
              </div>
              {c.followup && (
                <div style={{
                  fontSize: "11.5px",
                  color: "var(--text-3)",
                  paddingLeft: "10px",
                  fontStyle: "italic",
                }}>
                  💬 {c.followup}
                </div>
              )}
              {c.patternId && (
                <Link
                  href="/patterns"
                  style={{
                    display: "inline-block",
                    marginTop: "6px",
                    fontSize: "11px",
                    color: "var(--accent-cyan)",
                    textDecoration: "none",
                    paddingLeft: "10px",
                  }}
                >
                  Deep reasoning → Rule Book ↗
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Link to patterns ── */}
      <div style={{
        background: "rgba(34,211,238,0.06)",
        border: "1px solid rgba(34,211,238,0.2)",
        borderRadius: "12px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        flexWrap: "wrap",
      }}>
        <div>
          <div style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--accent-cyan)",
            marginBottom: "4px",
          }}>
            📖 Pattern Rule Book
          </div>
          <p style={{ fontSize: "12px", color: "var(--text-3)" }}>
            Sliding Window + Deque kyun? Monotonic Stack decreasing kyun?
            Har combination ka WHY — reasoning chain ke saath.
          </p>
        </div>
        <Link
          href="/patterns"
          style={{
            padding: "10px 22px",
            borderRadius: "9px",
            background: "var(--accent-cyan)",
            color: "#04081a",
            fontWeight: 700,
            fontSize: "13px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          Rule Book →
        </Link>
      </div>

    </div>
  );
}
