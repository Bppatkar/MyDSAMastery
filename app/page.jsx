"use client";
import Link from "next/link";

const pages = [
  { href:"/data-structures", emoji:"📦", title:"Data Structures", color:"var(--accent-cyan)", desc:"Array se Trie tak — har structure kyun bana, kya problem solve karta hai, aur operations ki complexity roots ke saath.", topics:["Array → Linked List → Stack → Queue","Hash Table → BST → AVL → Heap","Graph → Trie"] },
  { href:"/algorithms", emoji:"⚙️", title:"Algorithms & Patterns", color:"var(--accent-violet)", desc:"Two Pointers, Sliding Window, DP, Backtracking — har pattern ki mental model. Sliding window real mein hoti nahi — hum sirf assume karte hain.", topics:["Two Pointers (4 subtypes)","Sliding Window (3 subtypes)","Binary Search on Answer","DP vs Greedy decision"] },
  { href:"/visualizations", emoji:"🎮", title:"Interactive Visualizations", color:"var(--accent-green)", desc:"Dekho — array bars sort hote, two pointers move karte, BST mein nodes insert hote. Step karo, pause karo, samjho.", topics:["Sorting Algorithms animated","Binary Search","BST Insert & Search","BFS & DFS Graph"] },
  { href:"/cheatsheet", emoji:"📋", title:"Cheat Sheet", color:"var(--accent-amber)", desc:"60 seconds mein pattern pehchano. Real-life analogies, 16 Array/String patterns, 4-Step constraint-to-code framework.", topics:["Pattern → Analogy → Keywords","n → Complexity → Pattern map","4-Step Interview Framework"] },
  { href:"/revision", emoji:"🔁", title:"Revision Hub", color:"var(--accent-rose)", desc:"Active recall — yaad karo ki padha kya tha. Har DS aur algorithm ka summary, memorize list, aur revision ke time dhyan rakhne wali baatein.", topics:["DS quick summaries + operations","Algorithm pattern recap","Kya memorize karna hai vs samajhna"] },
  { href:"/patterns", emoji:"📖", title:"Pattern Rule Book", color:"var(--accent-green)", desc:"Sliding Window to kyun Deque? Monotonic Stack decreasing kyun? Har combination ka deep WHY — reasoning chain ke saath, code trace ke saath.", topics:["SW + Deque (max/min)","Mono Stack (increasing/decreasing)","Binary Search on Answer","0/1 Knapsack backward traverse","Multi-Source BFS","Union-Find path compression"] },
  { href:"/practice", emoji:"🧩", title:"Pattern Identify Karo", color:"var(--accent-orange)", desc:"Naya question dekha — kaunsa pattern lagega? Kyun? Step by step sochna seekho. Beginner se confident tak ka systematic roadmap.", topics:["Problem → Pattern (4 steps)","Subtype identify karna","Practice problems with hints"] },
];

export default function Home(){
  return(
    <div style={{maxWidth:"1100px",margin:"0 auto",padding:"60px 24px 40px"}}>
      <div style={{textAlign:"center",marginBottom:"64px"}}>
        <h1 style={{fontSize:"clamp(34px,6vw,64px)",fontWeight:900,lineHeight:1.08,marginBottom:"18px",letterSpacing:"-1px"}}>
          <span style={{background:"linear-gradient(135deg,var(--accent-cyan),var(--accent-violet),var(--accent-green))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>AlgoMitra</span>
          <br/>
          <span style={{color:"var(--text-1)",fontSize:"0.62em",fontWeight:700}}>DSA ko Samjho — Ratto Nahi</span>
        </h1>
        <p style={{fontSize:"15px",color:"var(--text-2)",maxWidth:"540px",margin:"0 auto 32px",lineHeight:1.8}}>
          Har data structure aur algorithm ki <strong style={{color:"var(--text-1)"}}>roots samjho</strong> — kyu bana, kya problem solve karta hai, aur interview mein pattern kaise pehchano. Hinglish mein.
        </p>
        <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
          <Link href="/data-structures" style={{padding:"12px 26px",borderRadius:"10px",textDecoration:"none",background:"linear-gradient(135deg,var(--accent-cyan),#06b6d4)",color:"#04081a",fontWeight:700,fontSize:"14px"}}>📦 Data Structures se Shuru</Link>
          <Link href="/practice" style={{padding:"12px 26px",borderRadius:"10px",textDecoration:"none",background:"var(--bg-elevated)",color:"var(--accent-orange)",fontWeight:700,fontSize:"14px",border:"1px solid var(--border)"}}>🧩 Pattern Identify Karo</Link>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"16px"}}>
        {pages.map(p=>(
          <Link key={p.href} href={p.href} style={{textDecoration:"none"}}>
            <div style={{background:"var(--bg-card)",borderRadius:"16px",padding:"26px",border:"1px solid var(--border)",transition:"transform .2s,border-color .2s,box-shadow .2s",height:"100%"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.borderColor=p.color;e.currentTarget.style.boxShadow=`0 8px 30px ${p.color}18`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.boxShadow=""}}>
              <div style={{fontSize:"30px",marginBottom:"10px"}}>{p.emoji}</div>
              <div style={{fontSize:"17px",fontWeight:700,color:p.color,marginBottom:"9px"}}>{p.title}</div>
              <p style={{fontSize:"13px",color:"var(--text-2)",lineHeight:1.7,marginBottom:"14px"}}>{p.desc}</p>
              <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
                {p.topics.map(t=>(
                  <div key={t} style={{fontSize:"11.5px",color:"var(--text-3)",paddingLeft:"10px",borderLeft:`2px solid ${p.color}40`}}>{t}</div>
                ))}
              </div>
              <div style={{marginTop:"18px",fontSize:"12px",color:p.color,fontWeight:600}}>Padhna shuru karo →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
