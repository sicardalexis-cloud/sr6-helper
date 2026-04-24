import { useState } from 'react';

function App() {
  const [char, setChar] = useState({
    name: "KAGE",
    role: "STREET SAMURAI",
    bod: 3, agi: 3, rea: 3, str: 3,
    wil: 3, log: 3, int: 3, cha: 3, mag: 0,
    edge: 7,
    edgeCurrent: 4,
    physical: 3,
    stun: 2,
    drainStun: 0,
  });

  const update = (key: string, value: number) => setChar(p => ({ ...p, [key]: value }));

  return (
    <div className="min-h-screen bg-[#02040a] p-4 md:p-8 font-mono">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-widest">SHADOWRUN 6E</h1>
          <p className="text-[#00ffcc]">NEUROMANCER TERMINAL V2.2</p>
        </div>

        <div className="bg-[#0f1626] border border-[#1e3a5f] rounded-3xl p-6 md:p-8 shadow-2xl">

          {/* Header */}
          <div className="flex justify-between mb-8 border-b border-[#334466] pb-6">
            <div>
              <input type="text" value={char.name} onChange={e => setChar(p => ({...p, name: e.target.value.toUpperCase()}))} 
                className="bg-transparent text-3xl md:text-4xl font-bold text-white focus:outline-none" />
              <input type="text" value={char.role} onChange={e => setChar(p => ({...p, role: e.target.value}))} 
                className="bg-transparent text-[#00ccff] text-lg md:text-xl focus:outline-none block mt-1" />
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400">ESSENCE</div>
              <div className="text-3xl md:text-4xl text-[#ff3366] font-bold">2.87</div>
            </div>
          </div>

          {/* Attributes */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3 mb-8">
            {[
              {l:'BOD', v:char.bod, k:'bod'}, {l:'AGI', v:char.agi, k:'agi'},
              {l:'REA', v:char.rea, k:'rea'}, {l:'STR', v:char.str, k:'str'},
              {l:'WIL', v:char.wil, k:'wil'}, {l:'LOG', v:char.log, k:'log'},
              {l:'INT', v:char.int, k:'int'}, {l:'CHA', v:char.cha, k:'cha'},
              {l:'MAGIC', v:char.mag, k:'mag'}
            ].map(s => (
              <div key={s.k} className="bg-[#1a2338] border border-[#334466] rounded-2xl p-3 text-center hover:border-[#00ff9f] transition-all">
                <div className="text-[#00aaff] text-xs tracking-widest">{s.l}</div>
                <div className="text-3xl md:text-4xl font-bold text-white my-1">{s.v}</div>
                <div className="flex justify-center gap-2 mt-2">
                  <button onClick={() => update(s.k, Math.max(1, s.v - 1))} className="bg-red-500 text-white px-3 py-1 rounded font-bold">-</button>
                  <button onClick={() => update(s.k, Math.min(8, s.v + 1))} className="bg-green-500 text-white px-3 py-1 rounded font-bold">+</button>
                </div>
              </div>
            ))}
          </div>

          {/* Edge Pool + Combat Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-7 bg-gradient-to-br from-amber-950 to-[#1a2338] border border-amber-400/40 rounded-2xl p-6">
              <div className="flex justify-between mb-4">
                <div className="text-amber-400 font-bold">⭐ EDGE POOL</div>
                <div className="text-amber-400">{char.edgeCurrent} / {char.edge}</div>
              </div>
              <div className="flex gap-3 flex-wrap">
                {Array.from({length: char.edge}).map((_, i) => (
                  <div key={i} onClick={() => setChar(p => ({...p, edgeCurrent: Math.max(0, p.edgeCurrent-1)}))}
                    className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center text-2xl cursor-pointer transition-all ${i < char.edgeCurrent ? 'bg-amber-400 text-black border-amber-400' : 'border-amber-400/40'}`}>
                    ◆
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#1a2338] border border-[#00ccff]/40 rounded-2xl p-6">
              <div className="text-[#00ccff] text-sm tracking-widest">MINOR ACTIONS</div>
              <div className="text-6xl font-bold text-white">1</div>
              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-[#00ccff] text-black py-3 rounded-xl font-bold hover:bg-white">Spend -1</button>
                <button className="flex-1 border border-[#00ccff] py-3 rounded-xl text-[#00ccff]">Reset</button>
              </div>
            </div>
          </div>

          {/* Monitors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="border border-red-500/40 rounded-2xl p-6">
              <div className="text-red-400 text-sm tracking-widest mb-3">PHYSICAL MONITOR</div>
              <div className="flex gap-2 flex-wrap">
                {Array.from({length: 10}).map((_, i) => (
                  <div key={i} className={`w-8 h-8 border border-red-500/60 rounded ${i < char.physical ? 'bg-red-600' : ''}`} />
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => update('physical', Math.max(0, char.physical - 1))} className="bg-red-500 text-white px-3 py-1 rounded font-bold">-</button>
                <button onClick={() => update('physical', Math.min(10, char.physical + 1))} className="bg-red-500 text-white px-3 py-1 rounded font-bold">+</button>
              </div>
            </div>

            <div className="border border-cyan-400/40 rounded-2xl p-6">
              <div className="text-cyan-400 text-sm tracking-widest mb-3">STUN MONITORS</div>
              <div className="mb-4">
                <div className="text-cyan-400 text-xs mb-2">TOTAL</div>
                <div className="flex gap-1 flex-wrap">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={`total-${i}`} className={`w-6 h-6 border border-cyan-400/60 rounded ${i < Math.min(10, char.stun + char.drainStun) ? 'bg-cyan-500' : ''}`} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-cyan-400 text-xs mb-2">NORMAL</div>
                  <div className="flex gap-1 flex-wrap mb-2">
                    {Array.from({length: 10}).map((_, i) => (
                      <div key={`normal-${i}`} className={`w-6 h-6 border border-cyan-400/60 rounded ${i < char.stun ? 'bg-cyan-500' : ''}`} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => update('stun', Math.max(0, char.stun - 1))} className="bg-cyan-500 text-white px-2 py-1 rounded font-bold text-xs">-</button>
                    <button onClick={() => update('stun', Math.min(10, char.stun + 1))} className="bg-cyan-500 text-white px-2 py-1 rounded font-bold text-xs">+</button>
                  </div>
                </div>
                <div>
                  <div className="text-purple-400 text-xs mb-2">DRAIN</div>
                  <div className="flex gap-1 flex-wrap mb-2">
                    {Array.from({length: 10}).map((_, i) => (
                      <div key={`drain-${i}`} className={`w-6 h-6 border border-purple-400/60 rounded ${i < char.drainStun ? 'bg-purple-500' : ''}`} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => update('drainStun', Math.max(0, char.drainStun - 1))} className="bg-purple-500 text-white px-2 py-1 rounded font-bold text-xs">-</button>
                    <button onClick={() => update('drainStun', Math.min(10, char.drainStun + 1))} className="bg-purple-500 text-white px-2 py-1 rounded font-bold text-xs">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons - Onglets */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "👻", label: "SPIRITS & SUMMONING", color: "purple" },
              { icon: "✨", label: "SPELLS & ASTRAL COMBAT", color: "cyan" },
              { icon: "⚔️", label: "ATTACK & COMBAT", color: "red" },
              { icon: "❤️", label: "REST & RECOVERY", color: "emerald" },
            ].map((btn, i) => (
              <button
                key={i}
                className={`bg-gradient-to-r from-${btn.color}-950 to-black border border-${btn.color}-500/50 hover:border-${btn.color}-400 p-5 md:p-6 rounded-2xl text-left flex items-center gap-4 transition-all hover:scale-105`}
              >
                <span className="text-3xl md:text-4xl">{btn.icon}</span>
                <div className="font-bold text-sm md:text-base">{btn.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;