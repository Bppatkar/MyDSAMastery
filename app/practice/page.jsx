"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PROBLEMS, TOPICS } from "@/lib/data";

const DIFF_COLOR = { easy: "#34d399", medium: "#fbbf24", hard: "#fb7185" };

function ThinkingFlow({ problem, topic }) {
  const [stepIdx,    setStepIdx]    = useState(0);
  const [answers,    setAnswers]    = useState({});
  const [submitted,  setSubmitted]  = useState({});
  const [showSol,    setShowSol]    = useState(false);

  const steps = problem.thinkingSteps;
  const current = steps[stepIdx];
  const allStepsDone = Object.keys(submitted).length === steps.length;

  const handleSubmit = (idx) => {
    const ans = (answers[idx] || "").trim().toLowerCase();
    if (!ans) return;
    setSubmitted(p => ({ ...p, [idx]: true }));
    if (idx < steps.length - 1) {
      setTimeout(() => setStepIdx(idx + 1), 600);
    }
  };

  const goodEnough = (idx) => {
    const ans = (answers[idx] || "").trim().toLowerCase();
    const kw  = steps[idx].expectedKw.toLowerCase();
    return ans.includes(kw) || ans.length > 15;
  };

  return (
    <div>
      {steps.map((step, idx) => {
        const isActive  = idx === stepIdx;
        const isDone    = submitted[idx];
        const isLocked  = idx > stepIdx;

        return (
          <div
            key={idx}
            style={{
              marginBottom: "14px",
              opacity: isLocked ? 0.35 : 1,
              transition: "opacity 0.3s",
            }}
          >
            {/* Step header */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <div style={{
                width: "24px", height: "24px",
                borderRadius: "50%",
                background: isDone ? "var(--green)" : isActive ? topic.color : "var(--bg-raised)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: 800, color: "#04081a", flexShrink: 0,
              }}>
                {isDone ? "✓" : idx + 1}
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: isActive ? "var(--text-1)" : "var(--text-2)" }}>
                {step.prompt}
              </span>
            </div>

            {/* Input */}
            {!isDone && isActive && (
              <div style={{ paddingLeft: "32px" }}>
                <textarea
                  value={answers[idx] || ""}
                  onChange={e => setAnswers(p => ({ ...p, [idx]: e.target.value }))}
                  placeholder="Apna jawab/approach likho — code nahi, sirf thinking..."
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background: "var(--bg-surface)",
                    border: `1px solid ${isActive ? topic.color + "50" : "var(--border)"}`,
                    color: "var(--text-1)",
                    fontSize: "13px",
                    resize: "vertical",
                    outline: "none",
                    lineHeight: 1.6,
                  }}
                />
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button
                    onClick={() => handleSubmit(idx)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "7px",
                      background: topic.color,
                      color: "#04081a",
                      fontWeight: 700,
                      fontSize: "12px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => {
                      setAnswers(p => ({ ...p, [idx]: (p[idx] || "") + "\nHint: " + step.hint }));
                    }}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "7px",
                      background: "var(--bg-raised)",
                      color: "var(--text-3)",
                      border: "1px solid var(--border)",
                      cursor: "pointer",
                      fontSize: "11px",
                    }}
                  >
                    💡 Hint
                  </button>
                </div>
              </div>
            )}

            {/* Answered */}
            {isDone && (
              <div style={{ paddingLeft: "32px" }}>
                <div style={{ fontSize: "12px", color: "var(--text-3)", marginBottom: "4px", fontStyle: "italic" }}>
                  Tumhara jawab: {answers[idx]}
                </div>
                {!goodEnough(idx) && (
                  <div style={{
                    fontSize: "12px",
                    color: "var(--amber)",
                    background: "rgba(251,191,36,0.08)",
                    borderRadius: "6px",
                    padding: "8px 10px",
                    border: "1px solid rgba(251,191,36,0.2)",
                  }}>
                    💬 {step.guide}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* All steps done — show solution */}
      {allStepsDone && !showSol && (
        <div style={{
          marginTop: "24px",
          padding: "16px",
          borderRadius: "10px",
          background: "rgba(52,211,153,0.06)",
          border: "1px solid rgba(52,211,153,0.2)",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "13px", color: "var(--text-2)", marginBottom: "12px" }}>
            Sab steps soch liye! Ab solution dekho aur verify karo.
          </p>
          <button
            onClick={() => setShowSol(true)}
            style={{
              padding: "10px 22px",
              borderRadius: "8px",
              background: "var(--green)",
              color: "#04081a",
              fontWeight: 700,
              fontSize: "13px",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✅ Solution Dekho
          </button>
        </div>
      )}

      {showSol && (
        <div style={{
          marginTop: "20px",
          background: "var(--bg-card)",
          borderRadius: "12px",
          padding: "20px",
          border: `1px solid ${topic.color}25`,
        }}>
          <div style={{ marginBottom: "14px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Pattern
            </span>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-1)", marginTop: "4px" }}>
              {problem.pattern}
            </div>
          </div>
          <div style={{ marginBottom: "14px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Kyun yeh pattern?
            </span>
            <p style={{ fontSize: "13px", color: "var(--text-2)", marginTop: "4px", lineHeight: 1.6 }}>
              {problem.patternWhy}
            </p>
          </div>
          <code style={{
            fontSize: "11px",
            color: topic.color,
            background: `${topic.color}10`,
            padding: "4px 10px",
            borderRadius: "5px",
            fontFamily: "'Fira Code', monospace",
          }}>
            {problem.timeSpace}
          </code>
        </div>
      )}
    </div>
  );
}

function PracticeInner() {
  const searchParams    = useSearchParams();
  const topicFilter     = searchParams.get("topic");
  const [selected,      setSelected]  = useState(null);
  const [filter,        setFilter]    = useState(topicFilter || "all");

  useEffect(() => {
    if (topicFilter) setFilter(topicFilter);
  }, [topicFilter]);

  const filtered = filter === "all"
    ? PROBLEMS
    : PROBLEMS.filter(p => p.topicId === filter);

  const topic = selected
    ? TOPICS.find(t => t.id === selected.topicId)
    : null;

  const uniqueTopics = [...new Set(PROBLEMS.map(p => p.topicId))];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 20px" }}>

      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 900, color: "var(--text-1)", marginBottom: "8px" }}>
          🏋️ Practice
        </h1>
        <div style={{
          background: "rgba(34,211,238,0.06)",
          border: "1px solid rgba(34,211,238,0.15)",
          borderRadius: "8px",
          padding: "10px 14px",
          fontSize: "12.5px",
          color: "var(--text-2)",
        }}>
          💡 Rule: Pehle sochna padega — seedha solution nahi milega.
          Har step mein apna thinking likho, tab aage badho.
        </div>
      </div>

      {/* Topic filter */}
      {!selected && (
        <div style={{ display: "flex", gap: "6px", marginBottom: "20px", flexWrap: "wrap" }}>
          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "5px 14px",
              borderRadius: "6px",
              background: filter === "all" ? "var(--cyan)" : "var(--bg-raised)",
              color: filter === "all" ? "#04081a" : "var(--text-3)",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: filter === "all" ? 700 : 400,
            }}
          >
            All
          </button>
          {uniqueTopics.map(tid => {
            const t = TOPICS.find(x => x.id === tid);
            return (
              <button
                key={tid}
                onClick={() => setFilter(tid)}
                style={{
                  padding: "5px 14px",
                  borderRadius: "6px",
                  background: filter === tid ? `${t?.color}20` : "var(--bg-raised)",
                  color: filter === tid ? t?.color : "var(--text-3)",
                  border: `1px solid ${filter === tid ? `${t?.color}40` : "transparent"}`,
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: filter === tid ? 700 : 400,
                }}
              >
                {t?.emoji} {t?.title}
              </button>
            );
          })}
        </div>
      )}

      {/* Problem list */}
      {!selected && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map(prob => {
            const t = TOPICS.find(x => x.id === prob.topicId);
            return (
              <button
                key={prob.id}
                onClick={() => setSelected(prob)}
                style={{
                  background: "var(--bg-card)",
                  borderRadius: "12px",
                  padding: "18px 20px",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color 0.15s, transform 0.15s",
                  width: "100%",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t?.color || "var(--cyan)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = ""; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-1)" }}>
                    #{prob.number} {prob.title}
                  </span>
                  <span style={{
                    padding: "2px 9px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 700,
                    background: `${DIFF_COLOR[prob.difficulty]}15`,
                    color: DIFF_COLOR[prob.difficulty],
                    textTransform: "capitalize",
                  }}>
                    {prob.difficulty}
                  </span>
                  <span style={{ marginLeft: "auto", fontSize: "11px", color: t?.color, fontWeight: 600 }}>
                    {t?.emoji} {t?.title}
                  </span>
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-3)", marginTop: "6px", lineHeight: 1.5 }}>
                  {prob.statement}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {/* Problem solving view */}
      {selected && topic && (
        <div>
          {/* Header */}
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={() => setSelected(null)}
              style={{ fontSize: "12px", color: "var(--text-3)", background: "none", border: "none", cursor: "pointer", marginBottom: "10px", padding: 0 }}
            >
              ← Wapas
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-1)" }}>
                #{selected.number} {selected.title}
              </h2>
              <span style={{
                padding: "3px 10px",
                borderRadius: "99px",
                fontSize: "11px",
                fontWeight: 700,
                background: `${DIFF_COLOR[selected.difficulty]}15`,
                color: DIFF_COLOR[selected.difficulty],
                textTransform: "capitalize",
              }}>
                {selected.difficulty}
              </span>
            </div>
          </div>

          {/* Problem statement */}
          <div style={{
            background: "var(--bg-card)",
            borderRadius: "10px",
            padding: "16px",
            border: "1px solid var(--border)",
            marginBottom: "20px",
          }}>
            <p style={{ fontSize: "13px", color: "var(--text-1)", lineHeight: 1.7, marginBottom: "12px" }}>
              {selected.statement}
            </p>
            {selected.examples.map((ex, i) => (
              <div key={i} style={{ fontSize: "12px" }}>
                <span style={{ color: "var(--text-3)" }}>Input: </span>
                <code style={{ color: "var(--cyan)", fontFamily: "'Fira Code', monospace" }}>{ex.input}</code>
                <span style={{ color: "var(--text-3)", marginLeft: "10px" }}>Output: </span>
                <code style={{ color: "var(--green)", fontFamily: "'Fira Code', monospace" }}>{ex.output}</code>
                {ex.why && <span style={{ color: "var(--text-3)", marginLeft: "6px", fontStyle: "italic" }}>({ex.why})</span>}
              </div>
            ))}
          </div>

          {/* Thinking flow */}
          <ThinkingFlow problem={selected} topic={topic} />
        </div>
      )}
    </div>
  );
}

export default function Practice() {
  return (
    <Suspense fallback={<div style={{padding:"40px",textAlign:"center",color:"var(--text-3)"}}>Loading...</div>}>
      <PracticeInner />
    </Suspense>
  );
}
