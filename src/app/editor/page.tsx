'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Play, RotateCcw, Copy, Check, ChevronDown, Loader2 } from 'lucide-react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false, loading: () => (
  <div style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg-base)', color:'var(--tx-3)' }}>
    <Loader2 size={20} style={{ animation:'spin 1s linear infinite' }} /> Loading editor...
  </div>
)});

const PROBLEMS = [
  {
    id: 1, title: 'Two Sum', difficulty: 'Easy', pattern: 'Hash Table',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 9' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    ],
    starterJS: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your solution here
    
};`,
    starterPY: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Your solution here
    pass`,
    testCases: [
      { fn: 'twoSum([2,7,11,15], 9)', expected: '[0,1]' },
      { fn: 'twoSum([3,2,4], 6)', expected: '[1,2]' },
      { fn: 'twoSum([3,3], 6)', expected: '[0,1]' },
    ],
    solutionJS: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) return [map.get(complement), i];
        map.set(nums[i], i);
    }
};`,
  },
  {
    id: 2, title: 'Maximum Subarray', difficulty: 'Medium', pattern: 'Kadane\'s Algorithm',
    description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1] has sum 6' },
    ],
    starterJS: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
    // Your solution here
    
};`,
    starterPY: `def max_sub_array(nums: list[int]) -> int:
    # Your solution here
    pass`,
    testCases: [
      { fn: 'maxSubArray([-2,1,-3,4,-1,2,1,-5,4])', expected: '6' },
      { fn: 'maxSubArray([1])', expected: '1' },
      { fn: 'maxSubArray([5,4,-1,7,8])', expected: '23' },
    ],
    solutionJS: `function maxSubArray(nums) {
    let maxSum = nums[0], curSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        curSum = Math.max(nums[i], curSum + nums[i]);
        maxSum = Math.max(maxSum, curSum);
    }
    return maxSum;
};`,
  },
  {
    id: 3, title: 'Valid Palindrome', difficulty: 'Easy', pattern: 'Two Pointers',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true' },
      { input: 's = "race a car"', output: 'false' },
    ],
    starterJS: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
    // Your solution here
    
};`,
    starterPY: `def is_palindrome(s: str) -> bool:
    # Your solution here
    pass`,
    testCases: [
      { fn: 'isPalindrome("A man, a plan, a canal: Panama")', expected: 'true' },
      { fn: 'isPalindrome("race a car")', expected: 'false' },
      { fn: 'isPalindrome(" ")', expected: 'true' },
    ],
    solutionJS: `function isPalindrome(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let l = 0, r = cleaned.length - 1;
    while (l < r) {
        if (cleaned[l] !== cleaned[r]) return false;
        l++; r--;
    }
    return true;
};`,
  },
];

const LANG_OPTIONS = ['javascript', 'python'];

export default function EditorPage() {
  const [problem, setProblem] = useState(PROBLEMS[0]);
  const [lang, setLang] = useState('javascript');
  const [code, setCode] = useState(PROBLEMS[0].starterJS);
  const [output, setOutput] = useState<{ type: 'idle'|'running'|'pass'|'fail'|'error'; lines: string[] }>({ type: 'idle', lines: [] });
  const [copied, setCopied] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const selectProblem = (p: typeof PROBLEMS[0]) => {
    setProblem(p); setCode(lang === 'javascript' ? p.starterJS : p.starterPY);
    setOutput({ type: 'idle', lines: [] }); setShowSolution(false);
  };

  const changeLang = (l: string) => {
    setLang(l); setCode(l === 'javascript' ? problem.starterJS : problem.starterPY);
    setOutput({ type: 'idle', lines: [] });
  };

  const runCode = () => {
    if (lang !== 'javascript') {
      setOutput({ type: 'error', lines: ['⚠️ Live execution only available for JavaScript. Python coming soon!'] });
      return;
    }
    setOutput({ type: 'running', lines: ['Running test cases...'] });
    setTimeout(() => {
      const lines: string[] = [];
      let allPassed = true;
      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function(`${code}; return typeof twoSum !== 'undefined' ? twoSum : typeof maxSubArray !== 'undefined' ? maxSubArray : typeof isPalindrome !== 'undefined' ? isPalindrome : null;`)();
        if (!fn) throw new Error('Function not found. Make sure function name matches.');
        for (const tc of problem.testCases) {
          const result = String(fn(...JSON.parse(`[${tc.fn.replace(/^.*?\(/, '').replace(/\)$/, '')}]`)));
          const passed = result === tc.expected;
          if (!passed) allPassed = false;
          lines.push(`${passed ? '✓' : '✗'} ${tc.fn} → ${result} ${passed ? '' : `(expected ${tc.expected})`}`);
        }
        setOutput({ type: allPassed ? 'pass' : 'fail', lines });
      } catch (e: any) {
        setOutput({ type: 'error', lines: [`Error: ${e.message}`] });
      }
    }, 400);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const diffColor = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-base)', display:'flex', flexDirection:'column' }}>
      {/* Header */}
      <div style={{ borderBottom:'1px solid var(--border)', background:'var(--bg-surface)', padding:'10px 20px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
        <div style={{ fontWeight:900, fontSize:15, color:'var(--tx-1)' }}>⌨️ Code Editor</div>
        <div style={{ display:'flex', gap:6, flex:1, flexWrap:'wrap' }}>
          {PROBLEMS.map(p => (
            <button key={p.id} onClick={() => selectProblem(p)} style={{
              padding:'4px 12px', borderRadius:6, fontSize:12, fontWeight:600, cursor:'pointer', border:'1px solid var(--border)',
              background: problem.id===p.id ? 'var(--accent-bg)' : 'var(--bg-base)',
              color: problem.id===p.id ? 'var(--accent)' : 'var(--tx-3)',
              outline: problem.id===p.id ? '1px solid var(--accent-bdr)' : 'none',
            }}>
              #{p.id} {p.title}
            </button>
          ))}
        </div>
        <div style={{ display:'flex', gap:4 }}>
          {LANG_OPTIONS.map(l => (
            <button key={l} onClick={() => changeLang(l)} style={{
              padding:'4px 12px', borderRadius:6, fontSize:12, cursor:'pointer', border:'1px solid var(--border)',
              background: lang===l ? 'var(--accent)' : 'var(--bg-base)',
              color: lang===l ? '#fff' : 'var(--tx-3)',
            }}>{l === 'javascript' ? 'JS' : 'PY'}</button>
          ))}
        </div>
      </div>

      {/* Main split */}
      <div style={{ flex:1, display:'flex', minHeight:0 }}>
        {/* Left: problem */}
        <div style={{ width:340, flexShrink:0, borderRight:'1px solid var(--border)', overflowY:'auto', padding:20 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <h2 style={{ fontSize:16, fontWeight:800, color:'var(--tx-1)', margin:0 }}>{problem.title}</h2>
            <span style={{ fontSize:11, padding:'2px 8px', borderRadius:10, fontWeight:700, color: diffColor[problem.difficulty as keyof typeof diffColor], background: diffColor[problem.difficulty as keyof typeof diffColor]+'20' }}>{problem.difficulty}</span>
          </div>
          <div style={{ fontSize:11, color:'var(--accent)', background:'var(--accent-bg)', borderRadius:6, padding:'3px 8px', display:'inline-block', marginBottom:12 }}>Pattern: {problem.pattern}</div>

          <p style={{ fontSize:13, color:'var(--tx-2)', lineHeight:1.6, marginBottom:16 }}>{problem.description}</p>

          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'var(--tx-3)', marginBottom:8 }}>EXAMPLES</div>
            {problem.examples.map((ex, i) => (
              <div key={i} style={{ background:'var(--bg-surface)', borderRadius:8, padding:'10px 12px', border:'1px solid var(--border)', marginBottom:8, fontSize:12 }}>
                <div style={{ color:'var(--tx-3)' }}>Input: <span style={{ color:'var(--tx-1)', fontFamily:'monospace' }}>{ex.input}</span></div>
                <div style={{ color:'var(--tx-3)' }}>Output: <span style={{ color:'var(--accent)', fontFamily:'monospace' }}>{ex.output}</span></div>
                {ex.explanation && <div style={{ color:'var(--tx-3)', marginTop:4, fontSize:11 }}>{ex.explanation}</div>}
              </div>
            ))}
          </div>

          <button onClick={() => setShowSolution(!showSolution)} style={{ padding:'6px 12px', borderRadius:6, background:'var(--bg-surface)', border:'1px solid var(--border)', color:'var(--tx-2)', cursor:'pointer', fontSize:12, display:'flex', alignItems:'center', gap:6, width:'100%', justifyContent:'center' }}>
            <ChevronDown size={14} style={{ transform: showSolution ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }} />
            {showSolution ? 'Hide' : 'Show'} Solution
          </button>
          {showSolution && (
            <pre style={{ background:'var(--bg-base)', border:'1px solid var(--border)', borderRadius:8, padding:12, marginTop:10, fontSize:11, overflowX:'auto', color:'var(--tx-2)', lineHeight:1.6 }}>
              {problem.solutionJS}
            </pre>
          )}
        </div>

        {/* Right: editor + output */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', minHeight:0 }}>
          {/* Editor toolbar */}
          <div style={{ borderBottom:'1px solid var(--border)', padding:'6px 14px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'var(--bg-surface)' }}>
            <span style={{ fontSize:12, color:'var(--tx-3)', fontFamily:'monospace' }}>{problem.title.toLowerCase().replace(/ /g,'_')}.{lang==='javascript'?'js':'py'}</span>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={copyCode} style={{ padding:'4px 10px', borderRadius:6, background:'var(--bg-base)', border:'1px solid var(--border)', cursor:'pointer', color:'var(--tx-2)', fontSize:11, display:'flex', alignItems:'center', gap:4 }}>
                {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={() => setCode(lang==='javascript' ? problem.starterJS : problem.starterPY)} style={{ padding:'4px 10px', borderRadius:6, background:'var(--bg-base)', border:'1px solid var(--border)', cursor:'pointer', color:'var(--tx-2)', fontSize:11, display:'flex', alignItems:'center', gap:4 }}>
                <RotateCcw size={12} /> Reset
              </button>
              <button onClick={runCode} style={{ padding:'4px 14px', borderRadius:6, background:'var(--accent)', border:'none', cursor:'pointer', color:'#fff', fontSize:12, fontWeight:700, display:'flex', alignItems:'center', gap:6 }}>
                <Play size={12} /> Run
              </button>
            </div>
          </div>

          {/* Monaco */}
          <div style={{ flex:1, minHeight:0 }}>
            <MonacoEditor
              height="100%"
              language={lang === 'javascript' ? 'javascript' : 'python'}
              theme={isDark ? 'vs-dark' : 'light'}
              value={code}
              onChange={v => setCode(v ?? '')}
              options={{ fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false, lineNumbers: 'on', wordWrap: 'on', padding: { top: 12 } }}
            />
          </div>

          {/* Output */}
          <div style={{ height:140, borderTop:'1px solid var(--border)', background:'var(--bg-base)', padding:'10px 14px', overflowY:'auto', fontFamily:'monospace', fontSize:12 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'var(--tx-3)', marginBottom:6 }}>OUTPUT</div>
            {output.type === 'idle' && <div style={{ color:'var(--tx-3)' }}>Click "Run" to test your solution</div>}
            {output.type === 'running' && <div style={{ color:'var(--tx-3)', display:'flex', alignItems:'center', gap:6 }}><Loader2 size={12} style={{ animation:'spin 1s linear infinite' }} /> Running...</div>}
            {output.lines.map((l, i) => (
              <div key={i} style={{ color: l.startsWith('✓') ? '#10b981' : l.startsWith('✗') ? '#ef4444' : l.startsWith('Error') ? '#ef4444' : 'var(--tx-2)', marginBottom:3 }}>{l}</div>
            ))}
            {output.type === 'pass' && <div style={{ color:'#10b981', fontWeight:700, marginTop:6 }}>All test cases passed! 🎉</div>}
            {output.type === 'fail' && <div style={{ color:'#f59e0b', fontWeight:700, marginTop:6 }}>Some test cases failed. Keep going!</div>}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
