"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "🏠 Home" },
  { href: "/data-structures", label: "📦 Data Structures" },
  { href: "/algorithms", label: "⚙️ Algorithms" },
  { href: "/visualizations", label: "🎮 Visualizations" },
  { href: "/cheatsheet", label: "📋 Cheat Sheet" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(10, 15, 30, 0.85)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      height: "64px",
      display: "flex", alignItems: "center",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "18px", fontWeight: 700, background: "linear-gradient(135deg, #22d3ee, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            DSA Guide 🧠
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", gap: "4px" }}>
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} style={{
                padding: "8px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                transition: "all 0.2s",
                background: active ? "rgba(34,211,238,0.12)" : "transparent",
                color: active ? "#22d3ee" : "#94a3b8",
                border: active ? "1px solid rgba(34,211,238,0.3)" : "1px solid transparent",
              }}>
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
