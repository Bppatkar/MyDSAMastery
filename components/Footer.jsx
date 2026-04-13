"use client";
export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-card)",
      borderTop: "1px solid var(--border)",
      padding: "14px 24px",
      marginTop: "60px",
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "10px",
      }}>
        <span style={{ fontSize: "13px", color: "var(--text-3)" }}>
          Bhanu Pratap Patkar — MERN Stack Developer
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          {[
            { href:"mailto:bhanupratappatkar777@gmail.com", label:"✉️" },
            { href:"https://github.com/Bppatkar",           label:"⌨️ GitHub" },
            { href:"https://www.linkedin.com/in/bhanu-pratap-patkar/", label:"💼 LinkedIn" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                color: "var(--text-3)",
                textDecoration: "none",
                border: "1px solid var(--border)",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "var(--cyan)";
                e.currentTarget.style.borderColor = "var(--cyan)";
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
