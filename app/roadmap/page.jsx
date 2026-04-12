"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { TOPICS } from "@/lib/data";

function getProgress() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("algomitra-progress") || "{}");
  } catch {
    return {};
  }
}

function TopicNode({ topic, progress, allProgress, onClick }) {
  const done   = progress === "done";
  const active = progress === "active";
  const locked = topic.prereqs.some(p => allProgress[p] !== "done");

  return (
    <div
      onClick={() => !locked && onClick(topic)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: locked ? "not-allowed" : "pointer",
        userSelect: "none",
      }}
    >
      {/* Circle */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: locked ? "var(--bg-raised)" : done ? `${topic.color}25` : active ? `${topic.color}15` : "var(--bg-card)",
          border: `2px solid ${locked ? "var(--border)" : done ? topic.color : active ? `${topic.color}80` : "var(--border-2)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          filter: locked ? "grayscale(1) opacity(0.4)" : "none",
          transition: "all 0.2s",
          boxShadow: done ? `0 0 16px ${topic.color}30` : "none",
        }}
        title={locked ? `Prereqs: ${topic.prereqs.join(", ")}` : topic.title}
      >
        {done ? "✅" : locked ? "🔒" : topic.emoji}
      </div>

      {/* Label */}
      <div style={{
        marginTop: "6px",
        fontSize: "10px",
        fontWeight: done || active ? 700 : 400,
        color: locked ? "var(--text-3)" : done ? topic.color : active ? "var(--text-1)" : "var(--text-2)",
        textAlign: "center",
        maxWidth: "70px",
        lineHeight: 1.3,
      }}>
        {topic.title}
      </div>
    </div>
  );
}

export default function Roadmap() {
  const [progress, setProgress] = useState({});
  const [selected, setSelected]  = useState(null);

  useEffect(() => {
    const p = getProgress();
    if (!Object.keys(p).length) {
      p["array"] = "active";
      localStorage.setItem("algomitra-progress", JSON.stringify(p));
    }
    setProgress(p);
  }, []);

  const markDone = (id) => {
    const p = { ...progress, [id]: "done" };
    // Unlock next topics
    TOPICS.forEach(t => {
      if (t.prereqs.every(pr => p[pr] === "done") && !p[t.id]) {
        p[t.id] = "active";
      }
    });
    localStorage.setItem("algomitra-progress", JSON.stringify(p));
    setProgress(p);
    setSelected(null);
  };

  const reset = () => {
    const p = { array: "active" };
    localStorage.setItem("algomitra-progress", JSON.stringify(p));
    setProgress(p);
    setSelected(null);
  };

  // Group by row
  const rows = {};
  TOPICS.forEach(t => {
    if (!rows[t.row]) rows[t.row] = [];
    rows[t.row].push(t);
  });
  const maxRow = Math.max(...Object.keys(rows).map(Number));

  const done  = TOPICS.filter(t => progress[t.id] === "done").length;
  const total = TOPICS.length;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 20px" }}>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{
          fontSize: "clamp(22px,4vw,32px)",
          fontWeight: 900,
          color: "var(--text-1)",
          marginBottom: "6px",
        }}>
          🗺️ Learning Roadmap
        </h1>
        <p style={{ fontSize: "13px", color: "var(--text-3)", marginBottom: "14px" }}>
          Ek topic ek baar — prereqs pehle. Click karo padho, done karo, aage badho.
        </p>

        {/* Progress bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            flex: 1,
            height: "6px",
            background: "var(--bg-raised)",
            borderRadius: "3px",
            overflow: "hidden",
            maxWidth: "300px",
          }}>
            <div style={{
              height: "100%",
              width: `${(done / total) * 100}%`,
              background: "linear-gradient(90deg, var(--cyan), var(--violet))",
              borderRadius: "3px",
              transition: "width 0.4s ease",
            }} />
          </div>
          <span style={{ fontSize: "12px", color: "var(--text-3)" }}>
            {done}/{total} done
          </span>
          <button
            onClick={reset}
            style={{
              fontSize: "11px",
              color: "var(--text-3)",
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "5px",
              padding: "3px 9px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Graph */}
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {Array.from({ length: maxRow + 1 }, (_, r) => {
          const rowTopics = (rows[r] || []).sort((a, b) => a.col - b.col);
          return (
            <div
              key={r}
              style={{
                display: "flex",
                gap: "24px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {rowTopics.map(topic => (
                <TopicNode
                  key={topic.id}
                  topic={topic}
                  progress={progress[topic.id]}
                  allProgress={progress}
                  onClick={setSelected}
                />
              ))}
            </div>
          );
        })}
      </div>

      {/* Side panel — selected topic */}
      {selected && (
        <div
          style={{
            position: "fixed",
            top: 0, right: 0, bottom: 0,
            width: "340px",
            background: "var(--bg-card)",
            borderLeft: "1px solid var(--border)",
            padding: "24px",
            overflowY: "auto",
            zIndex: 50,
            animation: "slideIn 0.2s ease",
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{
              position: "absolute",
              top: "16px", right: "16px",
              background: "none",
              border: "none",
              color: "var(--text-3)",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ×
          </button>

          <div style={{ fontSize: "32px", marginBottom: "8px" }}>{selected.emoji}</div>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: selected.color, marginBottom: "4px" }}>
            {selected.title}
          </h2>
          <p style={{ fontSize: "12px", color: "var(--text-3)", marginBottom: "20px", fontStyle: "italic" }}>
            {selected.tagline}
          </p>

          {selected.prereqs.length > 0 && (
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                Prereqs
              </div>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {selected.prereqs.map(pr => {
                  const t = TOPICS.find(x => x.id === pr);
                  return (
                    <span
                      key={pr}
                      style={{
                        padding: "3px 10px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        background: progress[pr] === "done" ? `${t?.color}15` : "var(--bg-raised)",
                        color: progress[pr] === "done" ? t?.color : "var(--text-3)",
                        border: `1px solid ${progress[pr] === "done" ? `${t?.color}30` : "var(--border)"}`,
                      }}
                    >
                      {progress[pr] === "done" ? "✅" : "🔒"} {t?.title}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {selected.unlocks.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                Khatam karne pe unlock hoga
              </div>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {selected.unlocks.map(u => {
                  const t = TOPICS.find(x => x.id === u);
                  return (
                    <span key={u} style={{ padding: "3px 10px", borderRadius: "6px", fontSize: "11px", background: "var(--bg-raised)", color: "var(--text-2)", border: "1px solid var(--border)" }}>
                      {t?.emoji} {t?.title}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link
              href={`/learn/${selected.id}`}
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: selected.color,
                color: "#04081a",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                textAlign: "center",
                display: "block",
              }}
            >
              📖 Sikhna shuru karo
            </Link>

            {progress[selected.id] !== "done" && (
              <button
                onClick={() => markDone(selected.id)}
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  background: "var(--bg-raised)",
                  color: "var(--green)",
                  fontWeight: 600,
                  fontSize: "13px",
                  border: "1px solid rgba(52,211,153,0.3)",
                  cursor: "pointer",
                }}
              >
                ✅ Mark as Done
              </button>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{ display: "flex", gap: "16px", marginTop: "32px", justifyContent: "center", flexWrap: "wrap" }}>
        {[
          { icon: "✅", label: "Done", color: "var(--green)" },
          { icon: "📖", label: "Available", color: "var(--text-2)" },
          { icon: "🔒", label: "Locked (prereq needed)", color: "var(--text-3)" },
        ].map(({ icon, label, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color }}>
            <span>{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
