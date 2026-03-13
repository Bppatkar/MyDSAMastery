'use client';
import { useState, useRef, useCallback } from 'react';

type Problem = 'climbing' | 'coinchange' | 'lcs' | 'knapsack';

const PROBLEMS: Record<Problem, { name: string; desc: string; color: string }> = {
  climbing:  { name: 'Climbing Stairs',      desc: 'dp[i] = dp[i-1] + dp[i-2]',          color: '#10b981' },
  coinchange: { name: 'Coin Change',          desc: 'dp[j] = min(dp[j], dp[j-coin]+1)',    color: '#6366f1' },
  lcs:       { name: 'Longest Common Subseq', desc: 'dp[i][j] = match or max(up, left)',   color: '#f59e0b' },
  knapsack:  { name: '0/1 Knapsack',          desc: 'dp[j] = max(dp[j], dp[j-w]+val)',     color: '#ef4444' },
};

// ── Climbing Stairs ──────────────────────────────────────────
function ClimbingStairs({ color }: { color: string }) {
  const [n, setN] = useState(8);
  const [dp, setDp] = useState<number[]>([]);
  const [current, setCurrent] = useState(-1);
  const [running, setRunning] = useState(false);
  const speed = useRef(500);

  const sleep = () => new Promise(r => setTimeout(r, speed.current));

  const run = async () => {
    setRunning(true);
    const arr = new Array(n + 1).fill(0);
    arr[0] = 1; arr[1] = 1;
    setDp([...arr]);
    setCurrent(1);
    await sleep();
    for (let i = 2; i <= n; i++) {
      arr[i] = arr[i-1] + arr[i-2];
      setCurrent(i);
      setDp([...arr]);
      await sleep();
    }
    setCurrent(-1);
    setRunning(false);
  };

  const reset = () => { setDp([]); setCurrent(-1); setRunning(false); };

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        <label style={{ fontSize: 13, color: 'var(--tx-2)' }}>n =
          <input type="number" min={2} max={15} value={n}
            onChange={e => { reset(); setN(+e.target.value); }}
            style={{ width: 60, marginLeft: 8, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 13 }} />
        </label>
        <input type="range" min={100} max={1000} defaultValue={500}
          onChange={e => speed.current = 1100 - +e.target.value}
          style={{ width: 100 }} />
        <span style={{ fontSize: 11, color: 'var(--tx-4)' }}>Speed</span>
        <button onClick={run} disabled={running}
          style={{ padding: '7px 18px', borderRadius: 8, border: 'none', background: color, color: '#fff', fontWeight: 700, cursor: running ? 'not-allowed' : 'pointer', fontSize: 13 }}>
          {running ? 'Running...' : '▶ Visualize'}
        </button>
        <button onClick={reset} style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--tx-3)', cursor: 'pointer', fontSize: 13 }}>Reset</button>
      </div>

      {/* Recurrence */}
      <div style={{ padding: '10px 16px', background: color + '12', borderRadius: 10, border: `1px solid ${color}30`, marginBottom: 20, fontSize: 13, color: 'var(--tx-1)', fontFamily: 'monospace' }}>
        <strong style={{ color }}>Recurrence:</strong> dp[i] = dp[i-1] + dp[i-2]
        &nbsp;&nbsp;|&nbsp;&nbsp;<strong style={{ color }}>Base:</strong> dp[0]=1, dp[1]=1
      </div>

      {/* DP Table */}
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 6, minWidth: 'fit-content' }}>
          {Array.from({ length: n + 1 }, (_, i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: 52 }}>
              <div style={{ fontSize: 11, color: 'var(--tx-4)', marginBottom: 4 }}>i={i}</div>
              <div style={{
                width: 52, height: 52, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2px solid ${current === i ? color : 'var(--border)'}`,
                background: current === i ? color + '25' : dp[i] !== undefined ? color + '10' : 'var(--bg-elevated)',
                fontSize: 16, fontWeight: 800,
                color: current === i ? color : dp[i] !== undefined ? 'var(--tx-1)' : 'var(--tx-4)',
                transition: 'all 0.3s',
              }}>
                {dp[i] ?? '?'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow explanation */}
      {dp.length > 2 && (
        <div style={{ marginTop: 20, padding: '12px 16px', background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border)', fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.8 }}>
          💡 <strong>Kaise kaam karta hai:</strong> Har cell = pichle 2 cells ka sum.
          dp[{n}] = <strong style={{ color }}>{dp[n] ?? '?'}</strong> ways to reach stair {n}.
          {dp[n] && <span> n=8 ke liye answer = <strong style={{ color }}>{dp[n]}</strong></span>}
        </div>
      )}
    </div>
  );
}

// ── Coin Change ──────────────────────────────────────────────
function CoinChange({ color }: { color: string }) {
  const [coins] = useState([1, 3, 4]);
  const [amount, setAmount] = useState(7);
  const [dp, setDp] = useState<(number | null)[]>([]);
  const [current, setCurrent] = useState(-1);
  const [currentCoin, setCurrentCoin] = useState(-1);
  const [running, setRunning] = useState(false);
  const speed = useRef(400);

  const sleep = () => new Promise(r => setTimeout(r, speed.current));

  const run = async () => {
    setRunning(true);
    const INF = 1e9;
    const arr: number[] = new Array(amount + 1).fill(INF);
    arr[0] = 0;
    setDp([...arr]);
    await sleep();

    for (const coin of coins) {
      setCurrentCoin(coin);
      for (let j = coin; j <= amount; j++) {
        setCurrent(j);
        if (arr[j - coin] + 1 < arr[j]) {
          arr[j] = arr[j - coin] + 1;
          setDp([...arr]);
        }
        await sleep();
      }
    }
    setCurrentCoin(-1);
    setCurrent(-1);
    setRunning(false);
  };

  const reset = () => { setDp([]); setCurrent(-1); setCurrentCoin(-1); setRunning(false); };
  const INF = 1e9;

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        <label style={{ fontSize: 13, color: 'var(--tx-2)' }}>Amount =
          <input type="number" min={1} max={20} value={amount}
            onChange={e => { reset(); setAmount(+e.target.value); }}
            style={{ width: 60, marginLeft: 8, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 13 }} />
        </label>
        <div style={{ fontSize: 13, color: 'var(--tx-2)' }}>
          Coins: {coins.map(c => <span key={c} style={{ marginLeft: 6, padding: '2px 8px', borderRadius: 6, background: color + '20', color, fontWeight: 700, fontFamily: 'monospace' }}>{c}</span>)}
        </div>
        <input type="range" min={100} max={900} defaultValue={400}
          onChange={e => speed.current = 1000 - +e.target.value} style={{ width: 80 }} />
        <button onClick={run} disabled={running}
          style={{ padding: '7px 18px', borderRadius: 8, border: 'none', background: color, color: '#fff', fontWeight: 700, cursor: running ? 'not-allowed' : 'pointer', fontSize: 13 }}>
          {running ? 'Running...' : '▶ Visualize'}
        </button>
        <button onClick={reset} style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--tx-3)', cursor: 'pointer', fontSize: 13 }}>Reset</button>
      </div>

      {currentCoin > 0 && (
        <div style={{ padding: '8px 14px', background: color + '15', borderRadius: 8, border: `1px solid ${color}30`, marginBottom: 16, fontSize: 13, color }}>
          🪙 Processing coin = <strong>{currentCoin}</strong>
        </div>
      )}

      <div style={{ padding: '10px 16px', background: color + '12', borderRadius: 10, border: `1px solid ${color}30`, marginBottom: 20, fontSize: 13, color: 'var(--tx-1)', fontFamily: 'monospace' }}>
        <strong style={{ color }}>Recurrence:</strong> dp[j] = min(dp[j], dp[j-coin] + 1)
        &nbsp;&nbsp;|&nbsp;&nbsp;<strong style={{ color }}>Base:</strong> dp[0]=0, rest=∞
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 6, minWidth: 'fit-content' }}>
          {Array.from({ length: amount + 1 }, (_, i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: 52 }}>
              <div style={{ fontSize: 11, color: 'var(--tx-4)', marginBottom: 4 }}>j={i}</div>
              <div style={{
                width: 52, height: 52, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2px solid ${current === i ? color : 'var(--border)'}`,
                background: current === i ? color + '25' : dp[i] !== undefined && dp[i] < INF ? color + '10' : 'var(--bg-elevated)',
                fontSize: dp[i] === INF ? 11 : 16, fontWeight: 800,
                color: current === i ? color : dp[i] !== undefined && dp[i] < INF ? 'var(--tx-1)' : 'var(--tx-4)',
                transition: 'all 0.3s',
              }}>
                {dp[i] === undefined ? '?' : dp[i] >= INF ? '∞' : dp[i]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {dp.length > 0 && dp[amount] < INF && (
        <div style={{ marginTop: 20, padding: '12px 16px', background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border)', fontSize: 13, color: 'var(--tx-2)' }}>
          ✅ Amount {amount} ke liye minimum coins = <strong style={{ color, fontSize: 16 }}>{dp[amount]}</strong>
        </div>
      )}
    </div>
  );
}

// ── LCS Visualizer ───────────────────────────────────────────
function LCSViz({ color }: { color: string }) {
  const [s1, setS1] = useState('ABCBDAB');
  const [s2, setS2] = useState('BDCABA');
  const [table, setTable] = useState<number[][]>([]);
  const [cur, setCur] = useState<[number, number] | null>(null);
  const [running, setRunning] = useState(false);
  const speed = useRef(200);
  const sleep = () => new Promise(r => setTimeout(r, speed.current));

  const run = async () => {
    setRunning(true);
    const m = s1.length, n = s2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    setTable(dp.map(r => [...r]));
    await sleep();
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        setCur([i, j]);
        if (s1[i-1] === s2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
        else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        setTable(dp.map(r => [...r]));
        await sleep();
      }
    }
    setCur(null);
    setRunning(false);
  };

  const reset = () => { setTable([]); setCur(null); setRunning(false); };

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
        {['s1','s2'].map((label, idx) => (
          <label key={label} style={{ fontSize: 13, color: 'var(--tx-2)' }}>
            {label} =
            <input value={idx === 0 ? s1 : s2}
              onChange={e => { reset(); idx === 0 ? setS1(e.target.value.toUpperCase()) : setS2(e.target.value.toUpperCase()); }}
              style={{ marginLeft: 8, padding: '4px 8px', width: 120, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--tx-1)', fontSize: 13, fontFamily: 'monospace' }} />
          </label>
        ))}
        <input type="range" min={50} max={800} defaultValue={200} onChange={e => speed.current = 850 - +e.target.value} style={{ width: 80 }} />
        <button onClick={run} disabled={running}
          style={{ padding: '7px 18px', borderRadius: 8, border: 'none', background: color, color: '#fff', fontWeight: 700, cursor: running ? 'not-allowed' : 'pointer', fontSize: 13 }}>
          {running ? 'Running...' : '▶ Visualize'}
        </button>
        <button onClick={reset} style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--tx-3)', cursor: 'pointer', fontSize: 13 }}>Reset</button>
      </div>

      <div style={{ padding: '10px 16px', background: color + '12', borderRadius: 10, border: `1px solid ${color}30`, marginBottom: 16, fontSize: 13, fontFamily: 'monospace' }}>
        <strong style={{ color }}>Match:</strong> dp[i][j] = dp[i-1][j-1] + 1
        &nbsp;&nbsp;<strong style={{ color }}>No match:</strong> dp[i][j] = max(dp[i-1][j], dp[i][j-1])
      </div>

      {table.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <td style={{ width: 36, height: 36 }} />
                <td style={{ width: 36, height: 36, fontSize: 13, fontWeight: 700, color: 'var(--tx-4)', textAlign: 'center' }}>ε</td>
                {s2.split('').map((c, j) => <td key={j} style={{ width: 36, height: 36, textAlign: 'center', fontSize: 14, fontWeight: 700, color, fontFamily: 'monospace' }}>{c}</td>)}
              </tr>
            </thead>
            <tbody>
              {table.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontSize: 14, fontWeight: 700, color, fontFamily: 'monospace', paddingRight: 6, textAlign: 'right' }}>
                    {i === 0 ? 'ε' : s1[i-1]}
                  </td>
                  {row.map((val, j) => {
                    const isMatch = i > 0 && j > 0 && s1[i-1] === s2[j-1];
                    const isCur = cur && cur[0] === i && cur[1] === j;
                    return (
                      <td key={j} style={{
                        width: 36, height: 36, textAlign: 'center', borderRadius: 6,
                        border: `1.5px solid ${isCur ? color : 'var(--border)'}`,
                        background: isCur ? color + '30' : isMatch && val > 0 ? color + '15' : 'transparent',
                        fontSize: 13, fontWeight: isCur ? 800 : 600,
                        color: isCur ? color : isMatch && val > 0 ? color : 'var(--tx-2)',
                        transition: 'all 0.2s',
                      }}>{val}</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {table.length > 0 && !running && (
        <div style={{ marginTop: 14, fontSize: 13, color: 'var(--tx-2)', padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}>
          LCS length = <strong style={{ color, fontSize: 15 }}>{table[s1.length]?.[s2.length] ?? 0}</strong>
          &nbsp;(bottom-right cell)
        </div>
      )}
    </div>
  );
}

// ── Main ────────────────────────────────────────────────────
export default function DPVisualizer() {
  const [problem, setProblem] = useState<Problem>('climbing');
  const color = PROBLEMS[problem].color;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--tx-1)', marginBottom: 8 }}>🧩 Dynamic Programming Visualizer</h2>
        <p style={{ fontSize: 13, color: 'var(--tx-3)', marginBottom: 16 }}>DP table kaise fill hota hai — step by step dekho</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(Object.entries(PROBLEMS) as [Problem, typeof PROBLEMS[Problem]][]).map(([k, v]) => (
            <button key={k} onClick={() => setProblem(k)} style={{
              padding: '7px 16px', borderRadius: 10, border: `1.5px solid ${problem === k ? v.color : 'var(--border)'}`,
              background: problem === k ? v.color + '18' : 'transparent',
              color: problem === k ? v.color : 'var(--tx-3)',
              fontWeight: 700, cursor: 'pointer', fontSize: 13,
            }}>{v.name}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '8px 14px', background: color + '12', borderRadius: 8, border: `1px solid ${color}30`, marginBottom: 20, fontSize: 13, color: 'var(--tx-2)' }}>
        <strong style={{ color }}>Formula:</strong> {PROBLEMS[problem].desc}
      </div>

      {problem === 'climbing' && <ClimbingStairs color={color} />}
      {problem === 'coinchange' && <CoinChange color={color} />}
      {problem === 'lcs' && <LCSViz color={color} />}
      {problem === 'knapsack' && (
        <div style={{ padding: 24, textAlign: 'center', color: 'var(--tx-3)', fontSize: 14 }}>
          🏗️ 0/1 Knapsack visualizer — use "Coin Change" for similar DP table pattern.<br/>
          Key difference: REVERSE inner loop (j from W to weight) instead of FORWARD.
        </div>
      )}
    </div>
  );
}
