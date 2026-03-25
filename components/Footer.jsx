"use client";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-card)",
      borderTop: "1px solid var(--border)",
      padding: "20px 24px",
      marginTop: "60px",
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}>

        <span style={{
          fontSize: "14px",
          fontWeight: 700,
          background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          🧠 AlgoMitra
        </span>

        <div style={{ display: "flex", gap: "4px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: "12px", color: "var(--text-3)", marginRight: "8px" }}>
            Bhanu Pratap Patkar
          </span>

          {[
            { href: "mailto:bhanupratappatkar777@gmail.com", label: "✉️ Email" },
            { href: "https://github.com/Bppatkar", label: "⌨️ GitHub" },
            { href: "https://www.linkedin.com/in/bhanu-pratap-patkar/", label: "💼 LinkedIn" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "5px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                color: "var(--text-3)",
                textDecoration: "none",
                border: "1px solid var(--border)",
                background: "var(--bg-elevated)",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "var(--accent-cyan)";
                e.currentTarget.style.borderColor = "var(--accent-cyan)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--text-3)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
