"use client";
import Link from "next/link";
import { TOPICS } from "@/lib/data";

export default function LearnIndex() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 20px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 900, color: "var(--text-1)", marginBottom: "8px" }}>
        📖 Learn
      </h1>
      <p style={{ fontSize: "13px", color: "var(--text-3)", marginBottom: "28px" }}>
        Roadmap se koi topic choose karo — ya yahan se directly.
        Teaching flow mein padhoge — sirf notes nahi.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
        {TOPICS.map(t => (
          <Link
            key={t.id}
            href={`/learn/${t.id}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "var(--bg-card)",
                borderRadius: "12px",
                padding: "18px",
                border: "1px solid var(--border)",
                transition: "border-color 0.15s, transform 0.15s",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = t.color;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "";
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{t.emoji}</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: t.color, marginBottom: "4px" }}>
                {t.title}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-3)", lineHeight: 1.4 }}>
                {t.tagline}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
