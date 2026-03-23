"use client";
import Link from "next/link";

const stats = [
  { label: "Data Structures", value: "11", color: "#22d3ee" },
  { label: "Cheat Sheets", value: "4", color: "#fbbf24" },
  { label: "Algorithm Patterns", value: "15+", color: "#a78bfa" },
  { label: "Visualizations", value: "20+", color: "#34d399" },
  { label: "LeetCode Problems", value: "150+", color: "#fb923c" },
];

const sections = [
  {
    href: "/data-structures",
    emoji: "📦",
    title: "Data Structures",
    subtitle: "Array se Trie tak — Poori Evolution",
    desc: "Samjho ki har data structure kyun banaya gaya, pehle wale ki kya dikkat thi, aur har operation ki complexity kya hai aur kyun.",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.15)",
    border: "rgba(34,211,238,0.25)",
    topics: ["Array", "Linked List", "Stack & Queue", "Hash Table", "BST & AVL", "Heap", "Graph", "Trie"],
  },
  {
    href: "/algorithms",
    emoji: "⚙️",
    title: "Algorithms",
    subtitle: "Patterns, Templates aur LeetCode Problems",
    desc: "Linear Search se Binary Search tak, Bubble Sort se Quick Sort tak — har algorithm ki origin samjho aur usse kab, kyu use karein.",
    color: "#a78bfa",
    glow: "rgba(139,92,246,0.15)",
    border: "rgba(139,92,246,0.25)",
    topics: ["Two Pointers", "Sliding Window", "Binary Search", "Sorting Algorithms", "Dynamic Programming", "Backtracking", "Graph BFS/DFS", "Greedy"],
  },
  {
    href: "/visualizations",
    emoji: "🎮",
    title: "Visualizations",
    subtitle: "Dekho, Samjho, Khelo",
    desc: "Step-by-step interactive visualizations — array bars sort hote dekhna, two pointers move karte dekhna, BST mein nodes insert hote dekhna.",
    color: "#34d399",
    glow: "rgba(52,211,153,0.15)",
    border: "rgba(52,211,153,0.25)",
    topics: ["Bubble/Selection/Insertion Sort", "Merge Sort / Quick Sort", "Binary Search", "Two Pointers", "Sliding Window", "Stack & Queue", "BST Insert/Search", "BFS & DFS Graph"],
  },
  {
    href: '/cheatsheet',
    emoji: '📋',
    title: 'Cheat Sheet',
    subtitle: 'Pattern Analogy + Interview Reference + Complexity Table',
    desc: 'Teeno images ka content — Pattern ki Real-Life Analogy, Array/String patterns, Interview Use-When guide, aur full complexity reference table.',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.15)',
    border: 'rgba(251,191,36,0.25)',
    topics: ['Pattern → Analogy → Solves', '16 Array/String Patterns', 'Interview Use When Guide', 'Complexity Quick Ref', 'n → Pattern Map', '60-sec Recognition'],
  },
];

export default function Home() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>

      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <div style={{ display: "inline-block", padding: "6px 20px", borderRadius: "999px", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", marginBottom: "24px" }}>
          <span style={{ fontSize: "13px", color: "#22d3ee", fontWeight: 500 }}>✨ Beginner se SDE-2 tak ka safar</span>
        </div>

        <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "24px" }}>
          <span style={{ background: "linear-gradient(135deg, #22d3ee, #a78bfa, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            DSA Master Guide
          </span>
          <br />
          <span style={{ color: "#e2e8f0" }}>Hinglish Mein 🧠</span>
        </h1>

        <p style={{ fontSize: "18px", color: "#94a3b8", maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          Koi ratta nahi — <strong style={{ color: "#e2e8f0" }}>roots samjho</strong>. Har data structure kyun bana, 
          har algorithm kaise kaam karta hai, aur interview mein pattern kaise pehchano.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/data-structures" style={{
            padding: "14px 32px", borderRadius: "12px", textDecoration: "none",
            background: "linear-gradient(135deg, #06b6d4, #22d3ee)", color: "#0a0f1e",
            fontWeight: 700, fontSize: "15px", transition: "all 0.2s",
          }}>
            📦 Data Structures Padho
          </Link>
          <Link href="/visualizations" style={{
            padding: "14px 32px", borderRadius: "12px", textDecoration: "none",
            background: "rgba(52,211,153,0.12)", color: "#34d399",
            fontWeight: 700, fontSize: "15px",
            border: "1px solid rgba(52,211,153,0.3)",
          }}>
            🎮 Visualizations Dekho
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "80px" }}>
        {stats.map(({ label, value, color }) => (
          <div key={label} style={{
            background: "#111827", borderRadius: "16px", padding: "28px 20px",
            border: `1px solid ${color}22`, textAlign: "center",
          }}>
            <div style={{ fontSize: "42px", fontWeight: 800, color }}>{value}</div>
            <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Section Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {sections.map(({ href, emoji, title, subtitle, desc, color, glow, border, topics }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div style={{
              background: "#111827", borderRadius: "20px", padding: "36px",
              border: `1px solid ${border}`,
              boxShadow: `0 0 40px ${glow}`,
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
              
              <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "280px" }}>
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>{emoji}</div>
                  <h2 style={{ fontSize: "28px", fontWeight: 700, color, marginBottom: "6px" }}>{title}</h2>
                  <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "16px" }}>{subtitle}</p>
                  <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: 1.7 }}>{desc}</p>
                  <div style={{ marginTop: "20px", display: "inline-flex", alignItems: "center", gap: "8px", color }}>
                    <span style={{ fontWeight: 600, fontSize: "14px" }}>Padhna shuru karo</span>
                    <span>→</span>
                  </div>
                </div>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxWidth: "320px" }}>
                  {topics.map(t => (
                    <span key={t} style={{
                      padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 500,
                      background: `${color}12`, color, border: `1px solid ${color}25`,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <div style={{ textAlign: "center", marginTop: "80px", color: "#374151", fontSize: "13px" }}>
        <p>Koi bhi data structure "best" nahi hota — problem dekho, sahi tool choose karo. 🎯</p>
      </div>
    </div>
  );
}
