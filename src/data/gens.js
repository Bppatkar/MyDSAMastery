export const GENS = [
  { id:'g1', label:'Gen 1 — Array', short:'Array', color:'#185FA5', bg:'#E6F1FB', bd:'#B5D4F4',
    patterns:['Two Pointers','Sliding Window','Prefix Sum'] },
  { id:'g2', label:'Gen 2 — HashMap & BS', short:'HashMap', color:'#0F6E56', bg:'#E1F5EE', bd:'#9FE1CB',
    patterns:['HashMaps','Binary Search'] },
  { id:'g3', label:'Gen 3 — Stack & LL', short:'Stack/LL', color:'#854F0B', bg:'#FAEEDA', bd:'#FAC775',
    patterns:['Stacks','Fast and Slow Pointers','Linked List: In-Place Manipulation','Cyclic Sort'] },
  { id:'g4', label:'Gen 4 — Tree & Heap', short:'Tree', color:'#534AB7', bg:'#EEEDFE', bd:'#CECBF6',
    patterns:['Tree Breadth-First Search','Tree Depth-First Search','Heaps','Top K Elements','K-way merge','Intervals'] },
  { id:'g5', label:'Gen 5 — Graph', short:'Graph', color:'#993556', bg:'#FBEAF0', bd:'#F4C0D1',
    patterns:['Graphs','Topological Sort','Union Find','Matrices'] },
  { id:'g6', label:'Gen 6 — DP', short:'DP', color:'#A32D2D', bg:'#FCEBEB', bd:'#F7C1C1',
    patterns:['Dynamic Programming','Backtracking','Subsets','Greedy Programming'] },
  { id:'g7', label:'Advanced', short:'Advanced', color:'#5f5e5a', bg:'#f2f0eb', bd:'#d0cec7',
    patterns:['Sort and Search','Trie','Bitwise Manipulation','Math & Geometry','Custom Data Structures','Segment Trees','Extra Problems'] },
];

export const PAT_ORDER = GENS.flatMap(g => g.patterns);

export const getGen = (p) => GENS.find(g => g.patterns.includes(p)) || GENS[6];

export const LV_LABELS = { Easy:'Easy', Medium:'Medium', Hard:'Hard', NO:'Premium' };
export const LV_ORDER  = ['Easy','Medium','Hard','NO'];
export const LV_COLORS = {
  Easy:   { text:'#3B6D11', bg:'#eaf3de', border:'#c0dd97' },
  Medium: { text:'#633806', bg:'#FAEEDA', border:'#FAC775' },
  Hard:   { text:'#791F1F', bg:'#FCEBEB', border:'#F7C1C1' },
  NO:     { text:'#3C3489', bg:'#EEEDFE', border:'#CECBF6' },
};
export const LV_DOT = { Easy:'#3B6D11', Medium:'#f59e0b', Hard:'#ef4444', NO:'#818cf8' };
