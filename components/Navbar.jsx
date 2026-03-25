"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/data-structures", label: "📦 DS" },
  { href: "/algorithms", label: "⚙️ Algorithms" },
  { href: "/visualizations", label: "🎮 Visualize" },
  { href: "/cheatsheet", label: "📋 Cheat Sheet" },
  { href: "/revision", label: "🔁 Revision" },
  { href: "/practice", label: "🧩 Practice" },
  { href: "/patterns", label: "📖 Rule Book" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:100,
      background:"var(--bg-card)",borderBottom:"1px solid var(--border)",
      backdropFilter:"blur(16px)",height:"60px",display:"flex",alignItems:"center",
    }}>
      <div style={{
        maxWidth:"1300px",margin:"0 auto",width:"100%",
        padding:"0 20px",display:"flex",alignItems:"center",
        justifyContent:"space-between",gap:"12px",
      }}>
        <Link href="/" style={{textDecoration:"none",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <div style={{
              width:"30px",height:"30px",borderRadius:"8px",
              background:"linear-gradient(135deg,var(--accent-cyan),var(--accent-violet))",
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px",
            }}>🧠</div>
            <span style={{
              fontSize:"17px",fontWeight:800,letterSpacing:"-0.3px",
              background:"linear-gradient(135deg,var(--accent-cyan),var(--accent-violet))",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            }}>AlgoMitra</span>
          </div>
        </Link>

        <div style={{display:"flex",gap:"2px",overflow:"auto",flexShrink:1,minWidth:0}}>
          {navLinks.map(({href,label})=>{
            const active=pathname===href||(href!=="/"&&pathname.startsWith(href));
            return(
              <Link key={href} href={href} style={{
                padding:"6px 12px",borderRadius:"7px",textDecoration:"none",
                fontSize:"12.5px",fontWeight:active?600:400,whiteSpace:"nowrap",
                background:active?"rgba(34,211,238,0.1)":"transparent",
                color:active?"var(--accent-cyan)":"var(--text-2)",
                border:`1px solid ${active?"rgba(34,211,238,0.25)":"transparent"}`,
                transition:"all 0.15s",
              }}>{label}</Link>
            );
          })}
        </div>

        <button onClick={toggle} style={{
          flexShrink:0,width:"36px",height:"36px",borderRadius:"8px",cursor:"pointer",
          background:"var(--bg-elevated)",border:"1px solid var(--border)",
          color:"var(--text-2)",display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:"16px",
        }}>
          {theme==="dark"?"☀️":"🌙"}
        </button>
      </div>
    </nav>
  );
}
// already exported above — this file is complete
