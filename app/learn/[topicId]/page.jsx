"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { TOPICS, LEARN_CONTENT } from "@/lib/data";

// ── Section renderers ─────────────────────────────────────────

function HookSection({ section }) {
  return (
    <div>
      <pre style={{
        background: "var(--bg-raised)",
        borderRadius: "10px",
        padding: "20px",
        fontSize: "13px",
        color: "var(--text-1)",
        lineHeight: 1.9,
        whiteSpace: "pre-wrap",
        fontFamily: "inherit",
        border: "1px solid var(--border-2)",
      }}>
        {section.content}
      </pre>
    </div>
  );
}

function AnalogySection({ section }) {
  return (
    <div>
      <div style={{
        background: "rgba(167,139,250,0.06)",
        borderRadius: "10px",
        padding: "20px",
        border: "1px solid rgba(167,139,250,0.2)",
        marginBottom: "16px",
      }}>
        <pre style={{
          fontSize: "13px",
          color: "var(--text-1)",
          lineHeight: 1.9,
          whiteSpace: "pre-wrap",
          fontFamily: "inherit",
        }}>
          {section.content}
        </pre>
      </div>
    </div>
  );
}

function ConceptSection({ section }) {
  return (
    <div>
      <pre style={{
        background: "var(--bg-surface)",
        borderRadius: "10px",
        padding: "20px",
        fontSize: "13px",
        color: "var(--text-1)",
        lineHeight: 1.9,
        whiteSpace: "pre-wrap",
        fontFamily: "inherit",
        border: "1px solid var(--border)",
      }}>
        {section.content}
      </pre>
    </div>
  );
}

function ConnectionSection({ section }) {
  return (
    <div style={{
      background: "rgba(34,211,238,0.05)",
      borderRadius: "10px",
      padding: "20px",
      border: "1px solid rgba(34,211,238,0.15)",
    }}>
      <pre style={{
        fontSize: "13px",
        color: "var(--text-1)",
        lineHeight: 1.9,
        whiteSpace: "pre-wrap",
        fontFamily: "inherit",
      }}>
        {section.content}
      </pre>
    </div>
  );
}

function IntuitionSection({ section }) {
  return (
    <div style={{
      background: "rgba(251,191,36,0.05)",
      borderRadius: "10px",
      padding: "20px",
      border: "1px solid rgba(251,191,36,0.15)",
    }}>
      <pre style={{
        fontSize: "13px",
        color: "var(--text-1)",
        lineHeight: 1.9,
        whiteSpace: "pre-wrap",
        fontFamily: "inherit",
      }}>
        {section.content}
      </pre>
    </div>
  );
}

// ── Question block — must answer before proceeding ────────────

function QuestionBlock({ question, topicColor, onAnswered }) {
  const [selected,    setSelected]    = useState(null);
  const [inputVal,    setInputVal]    = useState("");
  const [submitted,   setSubmitted]   = useState(false);
  const [showHint,    setShowHint]    = useState(false);

  const isCorrect = () => {
    if (question.type === "choice") return selected === question.correct;
    if (question.type === "input") {
      return inputVal.trim().toLowerCase().includes(
        question.answer.toLowerCase()
      );
    }
    return false;
  };

  const handleSubmit = () => {
    if (question.type === "choice" && selected === null) return;
    if (question.type === "input" && !inputVal.trim()) return;
    setSubmitted(true);
  };

  const correct = submitted && isCorrect();
  const wrong   = submitted && !isCorrect();

  return (
    <div style={{
      background: "var(--bg-card)",
      borderRadius: "12px",
      padding: "20px",
      border: `1px solid ${submitted ? (correct ? "rgba(52,211,153,0.4)" : "rgba(251,113,133,0.4)") : "var(--border-2)"}`,
      marginTop: "20px",
    }}>
      {/* Question header */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        <div style={{
          width: "22px", height: "22px",
          borderRadius: "50%",
          background: topicColor,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "11px", fontWeight: 800, color: "#04081a", flexShrink: 0,
        }}>
          ?
        </div>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-1)" }}>
          {question.text}
        </span>
      </div>

      {/* Choices */}
      {question.type === "choice" && !submitted && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                background: selected === i ? `${topicColor}12` : "var(--bg-surface)",
                border: `1px solid ${selected === i ? topicColor : "var(--border)"}`,
                color: selected === i ? "var(--text-1)" : "var(--text-2)",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "13px",
                transition: "all 0.15s",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      {question.type === "input" && !submitted && (
        <div style={{ marginBottom: "14px" }}>
          {showHint && (
            <div style={{ fontSize: "12px", color: "var(--amber)", marginBottom: "8px", fontStyle: "italic" }}>
              💡 Hint: {question.hint}
            </div>
          )}
          <input
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="Apna jawab likho..."
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-2)",
              color: "var(--text-1)",
              fontSize: "13px",
              outline: "none",
            }}
          />
          <button
            onClick={() => setShowHint(true)}
            style={{ fontSize: "11px", color: "var(--text-3)", background: "none", border: "none", cursor: "pointer", marginTop: "6px" }}
          >
            Hint chahiye? 💡
          </button>
        </div>
      )}

      {/* Result */}
      {submitted && (
        <div style={{
          padding: "14px",
          borderRadius: "8px",
          background: correct ? "rgba(52,211,153,0.08)" : "rgba(251,113,133,0.08)",
          border: `1px solid ${correct ? "rgba(52,211,153,0.3)" : "rgba(251,113,133,0.3)"}`,
          marginBottom: "14px",
        }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: correct ? "var(--green)" : "var(--rose)", marginBottom: "6px" }}>
            {correct ? "✅ Sahi!" : "❌ Galat — lekin yahi seekhna tha"}
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.6 }}>
            {question.explanation}
          </div>
        </div>
      )}

      {/* Buttons */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          style={{
            padding: "9px 20px",
            borderRadius: "8px",
            background: topicColor,
            color: "#04081a",
            fontWeight: 700,
            fontSize: "13px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      ) : (
        <button
          onClick={onAnswered}
          style={{
            padding: "9px 20px",
            borderRadius: "8px",
            background: "var(--green)",
            color: "#04081a",
            fontWeight: 700,
            fontSize: "13px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Aage badho →
        </button>
      )}
    </div>
  );
}

// ── Section type label ────────────────────────────────────────
const TYPE_CONFIG = {
  hook:       { label: "Shuru karte hain",   color: "var(--text-3)",  bg: "var(--bg-raised)"   },
  analogy:    { label: "Real Life Analogy",   color: "var(--violet)",  bg: "rgba(167,139,250,0.1)" },
  concept:    { label: "Concept",             color: "var(--cyan)",    bg: "rgba(34,211,238,0.1)"  },
  problem:    { label: "Problems & Gaps",     color: "var(--rose)",    bg: "rgba(251,113,133,0.1)" },
  intuition:  { label: "Interview Intuition", color: "var(--amber)",   bg: "rgba(251,191,36,0.1)"  },
  connection: { label: "Dots Connect",        color: "var(--green)",   bg: "rgba(52,211,153,0.1)"  },
};

// ── Main Learn page ───────────────────────────────────────────
export default function LearnTopic() {
  const { topicId }       = useParams();
  const topic             = TOPICS.find(t => t.id === topicId);
  const content           = LEARN_CONTENT[topicId];
  const [currentSection,  setCurrentSection]  = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [sectionComplete,  setSectionComplete]  = useState(false);

  useEffect(() => {
    setCurrentSection(0);
    setQuestionAnswered(false);
    setSectionComplete(false);
  }, [topicId]);

  if (!topic) {
    return (
      <div style={{ maxWidth: "700px", margin: "60px auto", padding: "20px", textAlign: "center" }}>
        <p style={{ color: "var(--text-2)", marginBottom: "16px" }}>
          Is topic ka content abhi ban raha hai. 🏗️
        </p>
        <Link href="/roadmap" style={{ color: "var(--cyan)", textDecoration: "none" }}>
          ← Roadmap pe wapas jao
        </Link>
      </div>
    );
  }

  if (!content) {
    return (
      <div style={{ maxWidth: "700px", margin: "60px auto", padding: "20px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>{topic.emoji}</div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: topic.color, marginBottom: "10px" }}>
          {topic.title}
        </h2>
        <p style={{ color: "var(--text-2)", marginBottom: "6px", fontStyle: "italic" }}>{topic.tagline}</p>
        <p style={{ color: "var(--text-3)", fontSize: "13px", marginBottom: "24px" }}>
          Yeh topic ka detailed content jald aa raha hai.
          Abhi{" "}
          <Link href="/practice" style={{ color: "var(--cyan)" }}>Practice</Link>
          {" "}ya{" "}
          <Link href="/recall" style={{ color: "var(--cyan)" }}>Recall</Link>
          {" "}dekho.
        </p>
        <Link href="/roadmap" style={{ color: "var(--cyan)", textDecoration: "none", fontSize: "13px" }}>
          ← Roadmap
        </Link>
      </div>
    );
  }

  const sections = content.sections;
  const section  = sections[currentSection];
  const tc       = TYPE_CONFIG[section.type] || TYPE_CONFIG.concept;
  const hasQ     = !!section.question;
  const canNext  = !hasQ || questionAnswered;

  const goNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(s => s + 1);
      setQuestionAnswered(false);
      setSectionComplete(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSectionComplete(true);
    }
  };

  return (
    <div style={{ maxWidth: "740px", margin: "0 auto", padding: "32px 20px" }}>

      {/* Topic header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <Link href="/roadmap" style={{ color: "var(--text-3)", textDecoration: "none", fontSize: "12px" }}>
          ← Roadmap
        </Link>
        <span style={{ color: "var(--border-2)" }}>|</span>
        <span style={{ fontSize: "18px" }}>{topic.emoji}</span>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: topic.color }}>
          {topic.title}
        </h1>
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "28px" }}>
        {sections.map((_, i) => (
          <div
            key={i}
            style={{
              height: "4px",
              flex: 1,
              borderRadius: "2px",
              background: i < currentSection
                ? topic.color
                : i === currentSection
                ? `${topic.color}60`
                : "var(--bg-raised)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>

      {/* Section label */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 12px",
        borderRadius: "6px",
        background: tc.bg,
        marginBottom: "12px",
      }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: tc.color, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {tc.label}
        </span>
      </div>

      {/* Section title */}
      <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-1)", marginBottom: "18px" }}>
        {section.title}
      </h2>

      {/* Content by type */}
      <div className="fade-up">
        {section.type === "hook"       && <HookSection section={section} />}
        {section.type === "analogy"    && <AnalogySection section={section} />}
        {section.type === "concept"    && <ConceptSection section={section} />}
        {section.type === "problem"    && <ConceptSection section={section} />}
        {section.type === "intuition"  && <IntuitionSection section={section} />}
        {section.type === "connection" && <ConnectionSection section={section} />}
      </div>

      {/* Question — must answer */}
      {hasQ && !questionAnswered && (
        <QuestionBlock
          question={section.question}
          topicColor={topic.color}
          onAnswered={() => setQuestionAnswered(true)}
        />
      )}

      {/* Next button — only shows after question answered (or no question) */}
      {canNext && !sectionComplete && (
        <div style={{ marginTop: "28px", display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={goNext}
            style={{
              padding: "11px 28px",
              borderRadius: "9px",
              background: topic.color,
              color: "#04081a",
              fontWeight: 700,
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {currentSection < sections.length - 1 ? "Aage →" : "Topic Complete ✅"}
          </button>
        </div>
      )}

      {/* Topic complete screen */}
      {sectionComplete && (
        <div style={{
          marginTop: "32px",
          background: `${topic.color}08`,
          borderRadius: "16px",
          padding: "28px",
          border: `1px solid ${topic.color}25`,
          textAlign: "center",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>🎉</div>
          <h3 style={{ fontSize: "20px", fontWeight: 800, color: topic.color, marginBottom: "6px" }}>
            {topic.title} khatam!
          </h3>
          <p style={{ fontSize: "13px", color: "var(--text-2)", marginBottom: "20px" }}>
            Ab Practice mein is topic ke problems try karo.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href={`/practice?topic=${topicId}`}
              style={{
                padding: "10px 22px",
                borderRadius: "9px",
                background: topic.color,
                color: "#04081a",
                fontWeight: 700,
                fontSize: "13px",
                textDecoration: "none",
              }}
            >
              🏋️ Practice Problems
            </Link>
            <Link
              href={`/recall?topic=${topicId}`}
              style={{
                padding: "10px 22px",
                borderRadius: "9px",
                background: "var(--bg-raised)",
                color: "var(--text-2)",
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none",
                border: "1px solid var(--border)",
              }}
            >
              🔁 Flashcards
            </Link>
            <Link
              href="/roadmap"
              style={{
                padding: "10px 22px",
                borderRadius: "9px",
                background: "var(--bg-raised)",
                color: "var(--text-2)",
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none",
                border: "1px solid var(--border)",
              }}
            >
              🗺️ Roadmap
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
