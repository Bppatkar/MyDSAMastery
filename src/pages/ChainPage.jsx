import React, { useEffect, useRef } from 'react';
import { CHAIN_HTML } from '../data/chainData';
import { useTheme } from '../context/ThemeContext';

export default function ChainPage() {
  const { isDark } = useTheme();
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    // Re-attach chain toggle functions
    window.chainTog = (h) => {
      const b = h.nextElementSibling;
      const o = b.classList.contains('show');
      b.classList.toggle('show', !o);
      h.classList.toggle('open', !o);
    };
    window.chainToggleAll = () => {
      const bodies = ref.current.querySelectorAll('.ch-ds-body');
      const anyOpen = [...bodies].some((b) => b.classList.contains('show'));
      bodies.forEach((b) => b.classList.toggle('show', !anyOpen));
      ref.current
        .querySelectorAll('.ch-ds-header')
        .forEach((h) => h.classList.toggle('open', !anyOpen));
    };
  }, []);

  return (
    <div
      className={`flex-1 overflow-y-auto transition-colors ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f7f5f0]'}`}
    >
      {/* Inject chain CSS with dark mode support */}
      <style>{`
        .ch-expand-btn{font-size:11px;color:${isDark ? '#aaa' : '#7a7870'};cursor:pointer;padding:5px 12px;border:0.5px solid ${isDark ? '#444' : '#d0cec7'};border-radius:4px;background:${isDark ? '#2a2a2a' : '#f2f0eb'};margin-bottom:14px}
        .ch-expand-btn:hover{background:${isDark ? '#333' : '#e4e2db'}}
        .ch-legend{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;padding:10px 12px;border-radius:10px;background:${isDark ? '#2a2a2a' : '#f2f0eb'};border:0.5px solid ${isDark ? '#444' : '#d0cec7'}}
        .ch-leg{display:flex;align-items:center;gap:6px;font-size:11px;color:${isDark ? '#999' : '#5f5e5a'}}
        .ch-leg-dot{width:10px;height:10px;border-radius:2px;flex-shrink:0}
        .d-g1{background:#185FA5}.d-g2{background:#0F6E56}.d-g3{background:#854F0B}.d-g4{background:#534AB7}.d-g5{background:#993556}.d-g6{background:#A32D2D}
        .ch-block{margin-bottom:7px}
        .ch-ds-header{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;cursor:pointer;user-select:none;border:0.5px solid transparent;transition:opacity .15s}
        .ch-ds-header:hover{opacity:.88}
        .ch-ds-name{font-size:14px;font-weight:500;flex:1}
        .ch-ds-born{font-size:10px;font-weight:500;padding:2px 8px;border-radius:4px;flex-shrink:0;max-width:240px;text-align:right;line-height:1.4}
        .ch-chevron{font-size:11px;flex-shrink:0;transition:transform .2s;color:${isDark ? '#666' : '#888'}}
        .ch-ds-header.open .ch-chevron{transform:rotate(90deg)}
        .ch-ds-body{display:none;padding:2px 0 8px 16px}
        .ch-ds-body.show{display:block}
        .ch-birth-box{margin:8px 0;padding:9px 12px;border-radius:6px;font-size:12px;line-height:1.7;border-left:3px solid}
        .ch-birth-box strong{font-weight:600}
        .ch-birth-box code{font-family:'JetBrains Mono',monospace;font-size:11px;padding:1px 4px;border-radius:3px;background:${isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.06)'}}
        .ch-patterns-label{font-size:10px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:${isDark ? '#666' : '#888'};margin:10px 0 5px 2px}
        .ch-prow{display:flex;gap:8px;align-items:flex-start;padding:7px 10px;margin-bottom:4px;border-radius:6px;border:0.5px solid ${isDark ? '#444' : '#e0ddd5'};background:${isDark ? '#2a2a2a' : '#fff'};cursor:pointer}
        .ch-prow:hover{background:${isDark ? '#333' : '#f7f5f0'};border-color:${isDark ? '#555' : '#d0cec7'}}
        .ch-pnum{font-size:11px;font-weight:600;min-width:18px;margin-top:1px;color:${isDark ? '#666' : '#aaa'}}
        .ch-pname{font-size:13px;font-weight:500;color:${isDark ? '#f0f0f0' : '#1c1b19'}}
        .ch-pprobs{font-size:12px;color:${isDark ? '#999' : '#666'};margin-top:2px;line-height:1.4}
        .ch-gives-birth{margin:10px 0 4px;padding:8px 10px;border-radius:6px;background:${isDark ? '#2a2a2a' : '#f2f0eb'};font-size:12px;color:${isDark ? '#999' : '#666'};border:0.5px solid ${isDark ? '#444' : '#e4e2db'}}
        .ch-gives-birth strong{color:${isDark ? '#f0f0f0' : '#1c1b19'};font-weight:600}
        .ch-child-chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}
        .ch-chip{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:500;border:0.5px solid;cursor:pointer;transition:all .13s}
        .ch-chip:hover{filter:brightness(${isDark ? 1.2 : 0.94});transform:translateY(-1px)}
        .ch-gen-label{font-size:10px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;padding:5px 0 6px 2px;color:${isDark ? '#666' : '#888'};margin-top:20px;border-bottom:0.5px solid ${isDark ? '#444' : '#d0cec7'};margin-bottom:8px}
        .ch-bottom-note{margin-top:18px;padding:11px 14px;border-radius:8px;border:0.5px solid ${isDark ? '#444' : '#d0cec7'};font-size:12px;color:${isDark ? '#999' : '#666'};line-height:1.7;background:${isDark ? '#2a2a2a' : '#f2f0eb'}}
        .ch-bottom-note strong{color:${isDark ? '#f0f0f0' : '#1c1b19'}}
        .g1 .ch-ds-header{background:${isDark ? '#1a3a5c' : '#E6F1FB'};border-color:${isDark ? '#185FA5' : '#B5D4F4'}}.g1 .ch-ds-name{color:${isDark ? '#64b5f6' : '#042C53'}}
        .g1 .ch-ds-born{background:${isDark ? '#185FA5' : '#B5D4F4'};color:${isDark ? '#fff' : '#0C447C'}}.g1 .ch-birth-box{background:${isDark ? '#1a3a5c' : '#E6F1FB'};border-color:${isDark ? '#378ADD' : '#378ADD'};color:${isDark ? '#64b5f6' : '#042C53'}}
        .g2 .ch-ds-header{background:${isDark ? '#1a4a3a' : '#E1F5EE'};border-color:${isDark ? '#0F6E56' : '#9FE1CB'}}.g2 .ch-ds-name{color:${isDark ? '#4db8a0' : '#04342C'}}
        .g2 .ch-ds-born{background:${isDark ? '#0F6E56' : '#9FE1CB'};color:${isDark ? '#fff' : '#085041'}}.g2 .ch-birth-box{background:${isDark ? '#1a4a3a' : '#E1F5EE'};border-color:${isDark ? '#1D9E75' : '#1D9E75'};color:${isDark ? '#4db8a0' : '#04342C'}}
        .g3 .ch-ds-header{background:${isDark ? '#4a3a1a' : '#FAEEDA'};border-color:${isDark ? '#854F0B' : '#FAC775'}}.g3 .ch-ds-name{color:${isDark ? '#f5c97f' : '#412402'}}
        .g3 .ch-ds-born{background:${isDark ? '#854F0B' : '#FAC775'};color:${isDark ? '#fff' : '#633806'}}.g3 .ch-birth-box{background:${isDark ? '#4a3a1a' : '#FAEEDA'};border-color:${isDark ? '#BA7517' : '#BA7517'};color:${isDark ? '#f5c97f' : '#412402'}}
        .g4 .ch-ds-header{background:${isDark ? '#2a254a' : '#EEEDFE'};border-color:${isDark ? '#534AB7' : '#CECBF6'}}.g4 .ch-ds-name{color:${isDark ? '#b0a8f0' : '#26215C'}}
        .g4 .ch-ds-born{background:${isDark ? '#534AB7' : '#CECBF6'};color:${isDark ? '#fff' : '#3C3489'}}.g4 .ch-birth-box{background:${isDark ? '#2a254a' : '#EEEDFE'};border-color:${isDark ? '#7F77DD' : '#7F77DD'};color:${isDark ? '#b0a8f0' : '#26215C'}}
        .g5 .ch-ds-header{background:${isDark ? '#4a2a4a' : '#FBEAF0'};border-color:${isDark ? '#993556' : '#F4C0D1'}}.g5 .ch-ds-name{color:${isDark ? '#f0a8d0' : '#4B1528'}}
        .g5 .ch-ds-born{background:${isDark ? '#993556' : '#F4C0D1'};color:${isDark ? '#fff' : '#72243E'}}.g5 .ch-birth-box{background:${isDark ? '#4a2a4a' : '#FBEAF0'};border-color:${isDark ? '#D4537E' : '#D4537E'};color:${isDark ? '#f0a8d0' : '#4B1528'}}
        .g6 .ch-ds-header{background:${isDark ? '#4a2a2a' : '#FCEBEB'};border-color:${isDark ? '#A32D2D' : '#F7C1C1'}}.g6 .ch-ds-name{color:${isDark ? '#f0a0a0' : '#501313'}}
        .g6 .ch-ds-born{background:${isDark ? '#A32D2D' : '#F7C1C1'};color:${isDark ? '#fff' : '#791F1F'}}.g6 .ch-birth-box{background:${isDark ? '#4a2a2a' : '#FCEBEB'};border-color:${isDark ? '#E24B4A' : '#E24B4A'};color:${isDark ? '#f0a0a0' : '#501313'}}
        .chip-g1{background:${isDark ? '#1a3a5c' : '#E6F1FB'};border-color:${isDark ? '#378ADD' : '#378ADD'};color:${isDark ? '#64b5f6' : '#0C447C'}}
        .chip-g2{background:${isDark ? '#1a4a3a' : '#E1F5EE'};border-color:${isDark ? '#1D9E75' : '#1D9E75'};color:${isDark ? '#4db8a0' : '#085041'}}
        .chip-g3{background:${isDark ? '#4a3a1a' : '#FAEEDA'};border-color:${isDark ? '#BA7517' : '#BA7517'};color:${isDark ? '#f5c97f' : '#633806'}}
        .chip-g4{background:${isDark ? '#2a254a' : '#EEEDFE'};border-color:${isDark ? '#7F77DD' : '#7F77DD'};color:${isDark ? '#b0a8f0' : '#3C3489'}}
        .chip-g5{background:${isDark ? '#4a2a4a' : '#FBEAF0'};border-color:${isDark ? '#D4537E' : '#D4537E'};color:${isDark ? '#f0a8d0' : '#72243E'}}
        .chip-g6{background:${isDark ? '#4a2a2a' : '#FCEBEB'};border-color:${isDark ? '#E24B4A' : '#E24B4A'};color:${isDark ? '#f0a0a0' : '#791F1F'}}
      `}</style>
      <div
        ref={ref}
        className="max-w-[700px] mx-auto px-4 md:px-7 py-6"
        dangerouslySetInnerHTML={{ __html: CHAIN_HTML }}
      />
    </div>
  );
}
