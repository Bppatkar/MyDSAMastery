"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FLASHCARDS, TOPICS } from "@/lib/data";

function RecallInner() {
  const searchParams = useSearchParams();
  const topicParam   = searchParams.get("topic");

  const [topicId,  setTopicId]  = useState(topicParam || "array");
  const [cardIdx,  setCardIdx]  = useState(0);
  const [flipped,  setFlipped]  = useState(false);
  const [scores,   setScores]   = useState({});   // {cardKey: true/false}

  useEffect(() => {
    if (topicParam) setTopicId(topicParam);
  }, [topicParam]);

  useEffect(() => {
    setCardIdx(0);
    setFlipped(false);
  }, [topicId]);

  const topic    = TOPICS.find(t => t.id === topicId);
  const cards    = FLASHCARDS[topicId] || [];
  const card     = cards[cardIdx];
  const cardKey  = `${topicId}-${cardIdx}`;
  const answered = scores[cardKey] !== undefined;

  const mark = (knew) => {
    setScores(p => ({ ...p, [cardKey]: knew }));
  };

  const next = () => {
    setCardIdx(i => (i + 1) % cards.length);
    setFlipped(false);
  };

  const prev = () => {
    setCardIdx(i => (i - 1 + cards.length) % cards.length);
    setFlipped(false);
  };

  const topicsWithCards = Object.keys(FLASHCARDS).filter(k => FLASHCARDS[k].length > 0);

  const topicScore = (tid) => {
    const tc = FLASHCARDS[tid] || [];
    const knew = tc.filter((_, i) => scores[`${tid}-${i}`] === true).length;
    return { knew, total: tc.length };
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 20px" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 900, color: "var(--text-1)", marginBottom: "6px" }}>
          🔁 Recall
        </h1>
        <div style={{
          background: "rgba(251,113,133,0.06)",
          border: "1px solid rgba(251,113,133,0.15)",
          borderRadius: "8px",
          padding: "10px 14px",
          fontSize: "12.5px",
          color: "var(--text-2)",
        }}>
          💡 Active Recall: Pehle khud sochna — phir card palatna.
          Agar yaad nahi aaya toh woh concept ek baar aur padho.
        </div>
      </div>

      {/* Topic selector */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "24px", flexWrap: "wrap" }}>
        {topicsWithCards.map(tid => {
          const t  = TOPICS.find(x => x.id === tid);
          const sc = topicScore(tid);
          return (
            <button
              key={tid}
              onClick={() => setTopicId(tid)}
              style={{
                padding: "6px 14px",
                borderRadius: "7px",
                background: topicId === tid ? `${t?.color}15` : "var(--bg-raised)",
                border: `1px solid ${topicId === tid ? `${t?.color}40` : "var(--border)"}`,
                color: topicId === tid ? t?.color : "var(--text-3)",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: topicId === tid ? 700 : 400,
              }}
            >
              {t?.emoji} {t?.title}
              {sc.knew > 0 && (
                <span style={{ marginLeft: "5px", fontSize: "10px", opacity: 0.7 }}>
                  {sc.knew}/{sc.total}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Card counter */}
      {card && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-3)" }}>
              Card {cardIdx + 1} of {cards.length}
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              {cards.map((_, i) => (
                <div
                  key={i}
                  onClick={() => { setCardIdx(i); setFlipped(false); }}
                  style={{
                    width: "8px", height: "8px",
                    borderRadius: "50%",
                    background: i === cardIdx ? (topic?.color || "var(--cyan)") : scores[`${topicId}-${i}`] === true ? "var(--green)" : scores[`${topicId}-${i}`] === false ? "var(--rose)" : "var(--bg-raised)",
                    cursor: "pointer",
                    border: `1px solid ${i === cardIdx ? (topic?.color || "var(--cyan)") : "transparent"}`,
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Flashcard */}
          <div
            onClick={() => setFlipped(f => !f)}
            style={{
              background: "var(--bg-card)",
              borderRadius: "16px",
              padding: "40px 32px",
              border: `1px solid ${flipped ? `${topic?.color}30` : "var(--border)"}`,
              cursor: "pointer",
              minHeight: "180px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "border-color 0.2s, background 0.2s",
              marginBottom: "16px",
              position: "relative",
            }}
          >
            {/* Front/Back label */}
            <div style={{
              position: "absolute",
              top: "14px", right: "14px",
              fontSize: "10px",
              fontWeight: 700,
              color: flipped ? topic?.color : "var(--text-3)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}>
              {flipped ? "Answer" : "Question — click to flip"}
            </div>

            {!flipped ? (
              <p style={{ fontSize: "16px", color: "var(--text-1)", lineHeight: 1.6, textAlign: "center" }}>
                {card.q}
              </p>
            ) : (
              <p style={{
                fontSize: "14px",
                color: "var(--text-1)",
                lineHeight: 1.75,
                textAlign: "center",
                paddingTop: "10px",
              }}>
                {card.a}
              </p>
            )}
          </div>

          {/* Rating buttons — show after flip */}
          {flipped && (
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px", className: "fade-in" }}>
              <button
                onClick={() => { mark(false); next(); }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "9px",
                  background: "rgba(251,113,133,0.08)",
                  border: "1px solid rgba(251,113,133,0.3)",
                  color: "var(--rose)",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                ❌ Yaad nahi tha
              </button>
              <button
                onClick={() => { mark(true); next(); }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "9px",
                  background: "rgba(52,211,153,0.08)",
                  border: "1px solid rgba(52,211,153,0.3)",
                  color: "var(--green)",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                ✅ Yaad tha
              </button>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={prev}
              style={{ padding: "8px 18px", borderRadius: "7px", background: "var(--bg-raised)", color: "var(--text-3)", border: "1px solid var(--border)", cursor: "pointer", fontSize: "12px" }}
            >
              ← Prev
            </button>
            <button
              onClick={next}
              style={{ padding: "8px 18px", borderRadius: "7px", background: "var(--bg-raised)", color: "var(--text-3)", border: "1px solid var(--border)", cursor: "pointer", fontSize: "12px", marginLeft: "auto" }}
            >
              Next →
            </button>
          </div>

          {/* Session score */}
          {Object.keys(scores).filter(k => k.startsWith(topicId)).length > 0 && (
            <div style={{
              marginTop: "20px",
              background: "var(--bg-card)",
              borderRadius: "10px",
              padding: "14px 16px",
              border: "1px solid var(--border)",
            }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-3)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Session Score
              </div>
              <div style={{ display: "flex", gap: "14px" }}>
                <span style={{ fontSize: "13px", color: "var(--green)" }}>
                  ✅ {topicScore(topicId).knew} yaad the
                </span>
                <span style={{ fontSize: "13px", color: "var(--rose)" }}>
                  ❌ {topicScore(topicId).total - topicScore(topicId).knew - (cards.length - Object.keys(scores).filter(k => k.startsWith(topicId)).length)} yaad nahi the
                </span>
              </div>
              {topicScore(topicId).knew < topicScore(topicId).total && (
                <Link
                  href={`/learn/${topicId}`}
                  style={{ fontSize: "11px", color: "var(--cyan)", textDecoration: "none", marginTop: "6px", display: "block" }}
                >
                  📖 Dobara padho →
                </Link>
              )}
            </div>
          )}
        </>
      )}

      {!card && (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-3)" }}>
          Is topic ke flashcards abhi ban rahe hain.
        </div>
      )}
    </div>
  );
}

export default function Recall() {
  return (
    <Suspense fallback={<div style={{padding:"40px",textAlign:"center",color:"var(--text-3)"}}>Loading...</div>}>
      <RecallInner />
    </Suspense>
  );
}
