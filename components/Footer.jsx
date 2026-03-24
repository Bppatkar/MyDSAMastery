"use client";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-card)",
      borderTop: "1px solid var(--border)",
      padding: "48px 24px 32px",
      marginTop: "80px",
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>

        {/* Brand */}
        <div style={{ marginBottom: "8px" }}>
          <span style={{
            fontSize: "22px", fontWeight: 800,
            background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>🧠 AlgoMitra</span>
        </div>
        <p style={{ fontSize: "13px", color: "var(--text-3)", marginBottom: "32px" }}>
          DSA ko samjho — ratto nahi. Hinglish mein.
        </p>

        {/* Creator */}
        <div style={{
          background: "var(--bg-surface)", borderRadius: "16px",
          padding: "28px 32px", border: "1px solid var(--border)",
          display: "inline-block", marginBottom: "32px", minWidth: "320px",
        }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-1)", marginBottom: "4px" }}>
            Bhanu Pratap Patkar
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-3)", marginBottom: "20px" }}>
            MERN Stack Developer & Software Engineer
          </div>

          <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>

            {/* Email */}
            <a href="mailto:bhanupratappatkar777@gmail.com" style={{
              display: "flex", alignItems: "center", gap: "8px",
              textDecoration: "none", color: "var(--text-2)", fontSize: "13px",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent-cyan)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-2)"}>
              <span style={{
                width: "32px", height: "32px", borderRadius: "8px", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: "14px",
                background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)",
              }}>✉️</span>
              <span>bhanupratappatkar777@gmail.com</span>
            </a>

            {/* GitHub */}
            <a href="https://github.com/Bppatkar" target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: "8px",
              textDecoration: "none", color: "var(--text-2)", fontSize: "13px",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text-1)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-2)"}>
              <span style={{
                width: "32px", height: "32px", borderRadius: "8px", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: "14px",
                background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)",
              }}>⌨️</span>
              <span>github.com/Bppatkar</span>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/bhanu-pratap-patkar/" target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: "8px",
              textDecoration: "none", color: "var(--text-2)", fontSize: "13px",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent-violet)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-2)"}>
              <span style={{
                width: "32px", height: "32px", borderRadius: "8px", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: "14px",
                background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)",
              }}>💼</span>
              <span>in/bhanu-pratap-patkar</span>
            </a>

          </div>
        </div>

        <div style={{ fontSize: "12px", color: "var(--text-3)" }}>
          Koi bhi data structure "best" nahi hota — problem dekho, sahi tool choose karo. 🎯
        </div>
      </div>
    </footer>
  );
}
