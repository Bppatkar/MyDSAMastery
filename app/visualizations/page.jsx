"use client";
import { useState, Suspense, lazy } from "react";
import SortingViz from "@/components/visualizations/SortingViz";
import { BinarySearchViz, TwoPointerViz, SlidingWindowViz } from "@/components/visualizations/SearchTechViz";
import { StackViz, QueueViz, BSTViz, GraphViz } from "@/components/visualizations/StructuresViz";

const categories = [
  {
    id: "sorting", label: "📊 Sorting", color: "#a78bfa",
    vizs: [
      { id: "sort-all", label: "Sorting Algorithms", emoji: "📊", component: SortingViz,
        desc: "Bubble, Selection, Insertion, Merge, Quick Sort — step-by-step bars animation" },
    ],
  },
  {
    id: "searching", label: "🔎 Searching", color: "#22d3ee",
    vizs: [
      { id: "binary", label: "Binary Search", emoji: "🎯", component: BinarySearchViz,
        desc: "Sorted array mein half-half karte hue target dhundho" },
    ],
  },
  {
    id: "techniques", label: "🎯 Techniques", color: "#34d399",
    vizs: [
      { id: "twoptr", label: "Two Pointers", emoji: "👆👆", component: TwoPointerViz,
        desc: "Sorted array mein opposite ends se pair dhundho" },
      { id: "sliding", label: "Sliding Window", emoji: "🪟", component: SlidingWindowViz,
        desc: "Longest substring without repeat — window expand/shrink" },
    ],
  },
  {
    id: "structures", label: "📦 Data Structures", color: "#fb923c",
    vizs: [
      { id: "stack", label: "Stack", emoji: "📚", component: StackViz,
        desc: "LIFO — push aur pop dekho live" },
      { id: "queue", label: "Queue", emoji: "🚶", component: QueueViz,
        desc: "FIFO — enqueue REAR se, dequeue FRONT se" },
      { id: "bst", label: "BST", emoji: "🌳", component: BSTViz,
        desc: "Binary Search Tree — insert karo aur search path dekho" },
      { id: "graph", label: "BFS & DFS", emoji: "🕸️", component: GraphViz,
        desc: "Graph traversal — level-by-level vs depth-first" },
    ],
  },
];

const allVizs = categories.flatMap(c => c.vizs.map(v => ({ ...v, catColor: c.color })));

export default function Visualizations() {
  const [activeViz, setActiveViz] = useState("sort-all");
  const current = allVizs.find(v => v.id === activeViz);
  const ActiveComponent = current?.component;

  return (
    <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "32px 24px", display: "flex", gap: "28px", minHeight: "calc(100vh - 64px)" }}>

      {/* Sidebar */}
      <div style={{ width: "260px", flexShrink: 0 }}>
        <div style={{ position: "sticky", top: "88px", display: "flex", flexDirection: "column", gap: "24px" }}>

          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px", background: "linear-gradient(135deg, #22d3ee, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              🎮 Visualizations
            </h2>
            <p style={{ fontSize: "12px", color: "#64748b" }}>Interactive — dekho aur samjho</p>
          </div>

          {categories.map(cat => (
            <div key={cat.id}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: cat.color, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {cat.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {cat.vizs.map(viz => {
                  const isActive = activeViz === viz.id;
                  return (
                    <button key={viz.id} onClick={() => setActiveViz(viz.id)} style={{
                      padding: "10px 14px", borderRadius: "10px", cursor: "pointer", textAlign: "left",
                      background: isActive ? `${cat.color}12` : "transparent",
                      border: `1px solid ${isActive ? cat.color : "transparent"}`,
                      color: isActive ? cat.color : "#64748b",
                      fontSize: "13px", fontWeight: isActive ? 600 : 400,
                      transition: "all 0.15s",
                    }}>
                      {viz.emoji} {viz.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick reference */}
          <div style={{ background: "#0f172a", borderRadius: "12px", padding: "16px", border: "1px solid #1e293b" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", marginBottom: "12px" }}>Color Legend</div>
            {[
              { color: "#334155", label: "Normal / Unsorted" },
              { color: "#fbbf24", label: "Comparing" },
              { color: "#fb7185", label: "Swapping" },
              { color: "#34d399", label: "Sorted / Found" },
              { color: "#22d3ee", label: "Left Pointer" },
              { color: "#a78bfa", label: "Right Pointer" },
              { color: "#f59e0b", label: "Pivot" },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: color, flexShrink: 0 }} />
                <span style={{ fontSize: "11px", color: "#64748b" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {current && (
          <div style={{ background: "#111827", borderRadius: "20px", padding: "36px", border: `1px solid ${current.catColor}20`, boxShadow: `0 0 40px ${current.catColor}08` }}>

            {/* Header */}
            <div style={{ marginBottom: "28px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: 800, color: current.catColor, display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span>{current.emoji}</span> {current.label}
              </h1>
              <p style={{ fontSize: "14px", color: "#64748b" }}>{current.desc}</p>
            </div>

            {/* Visualization */}
            <Suspense fallback={
              <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
                Loading...
              </div>
            }>
              {ActiveComponent && <ActiveComponent />}
            </Suspense>
          </div>
        )}

        {/* All viz grid at bottom */}
        <div style={{ marginTop: "28px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#94a3b8", marginBottom: "16px" }}>Saare Visualizations</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
            {allVizs.map(viz => (
              <button key={viz.id} onClick={() => { setActiveViz(viz.id); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{
                padding: "16px", borderRadius: "12px", cursor: "pointer", textAlign: "left",
                background: activeViz === viz.id ? `${viz.catColor}12` : "#0f172a",
                border: `1px solid ${activeViz === viz.id ? viz.catColor : "#1e293b"}`,
                transition: "all 0.15s",
              }}>
                <div style={{ fontSize: "24px", marginBottom: "6px" }}>{viz.emoji}</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: activeViz === viz.id ? viz.catColor : "#e2e8f0" }}>{viz.label}</div>
                <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", lineHeight: 1.4 }}>{viz.desc.split("—")[0]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
