import { useState } from 'react';
import SpiritSummoningModal from './components/SpiritSummoningModal';

function App() {
  const [char, setChar] = useState({
    name: "KAGE",
    role: "STREET SAMURAI",
    bod: 3, agi: 3, rea: 3, str: 3,
    wil: 3, log: 3, int: 3, cha: 3, mag: 0,
    essence: 3,
    edge: 7,
    edgeCurrent: 4,
    physical: 3,
    stun: 2,
    drainStun: 0,
    minorActions: 1,
    minorActionSlots: 3,
  });

  const [showSpiritModal, setShowSpiritModal] = useState(false);

  const update = (key: string, value: number) => 
    setChar(p => ({ ...p, [key]: value }));

  return (
    <div className="min-h-screen bg-[#0a0c14] p-6 font-mono">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white tracking-widest">KAGE</h1>
          <p className="text-cyan-400 text-xl mt-1">STREET SAMURAI</p>
        </div>

        {/* Attributes */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-8">
          {[
            {l:'BOD', v:char.bod, k:'bod'}, {l:'AGI', v:char.agi, k:'agi'},
            {l:'REA', v:char.rea, k:'rea'}, {l:'STR', v:char.str, k:'str'},
            {l:'WIL', v:char.wil, k:'wil'}, {l:'LOG', v:char.log, k:'log'},
            {l:'INT', v:char.int, k:'int'}, {l:'CHA', v:char.cha, k:'cha'},
            {l:'MAGIC', v:char.mag, k:'mag'}, {l:'ESSENCE', v:char.essence, k:'essence'}
          ].map(s => (
            <div key={s.k} className="bg-[#1a1f2e] border border-[#334466] rounded-xl p-3 text-center hover:border-cyan-400 transition-all">
              <div className="text-cyan-400 text-xs tracking-widest mb-1">{s.l}</div>
              <div className="text-4xl font-bold text-white mb-3">{s.v}</div>
              <div className="flex justify-center gap-2">
                <button onClick={() => update(s.k, Math.max(0, s.v - 1))} className="bg-red-600 hover:bg-red-500 w-8 h-8 rounded-lg text-white font-bold">−</button>
                <button onClick={() => update(s.k, Math.min(9, s.v + 1))} className="bg-emerald-600 hover:bg-emerald-500 w-8 h-8 rounded-lg text-white font-bold">+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Edge + Minor Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* EDGE POOL */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#2a1f0f] to-[#1a1f2e] border border-amber-500/30 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-amber-400 font-bold">⭐ EDGE POOL</div>
                <div className="text-amber-300 text-2xl">{char.edgeCurrent} / {char.edge}</div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => update('edgeCurrent', Math.max(0, char.edgeCurrent - 1))} className="bg-amber-500 hover:bg-amber-400 text-black w-12 h-12 rounded-xl text-3xl font-bold">−</button>
                <button onClick={() => update('edgeCurrent', Math.min(char.edge, char.edgeCurrent + 1))} className="bg-amber-500 hover:bg-amber-400 text-black w-12 h-12 rounded-xl text-3xl font-bold">+</button>
              </div>
            </div>
            <div className="flex gap-4 flex-wrap">
              {Array.from({length: char.edge}).map((_, i) => (
                <div key={i} onClick={() => update('edgeCurrent', i + 1)}
                  className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-4xl cursor-pointer transition-all ${i < char.edgeCurrent ? 'bg-amber-400 text-black border-amber-400' : 'border-amber-400/30 bg-[#1a1f2e]'}`}>
                  ◆
                </div>
              ))}
            </div>
          </div>

          {/* MINOR ACTIONS */}
          <div className="lg:col-span-5 bg-[#1a1f2e] border border-cyan-400/30 rounded-2xl p-6">
            <div className="flex justify-between mb-4">
              <div className="text-cyan-400 tracking-widest">MINOR ACTIONS</div>
              <div className="flex gap-2">
                <button onClick={() => update('minorActionSlots', Math.max(1, char.minorActionSlots-1))} className="bg-cyan-500 text-black w-9 h-9 rounded-xl">−</button>
                <button onClick={() => update('minorActionSlots', Math.min(6, char.minorActionSlots+1))} className="bg-cyan-500 text-black w-9 h-9 rounded-xl">+</button>
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              {Array.from({length: char.minorActionSlots}).map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => update('minorActions', i + 1)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                    i < char.minorActions ? 'bg-cyan-400 border-cyan-400' : 'border-cyan-400/30'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => update('minorActions', Math.max(0, char.minorActions - 1))} className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-xl font-bold">Spend -1</button>
              <button onClick={() => update('minorActions', char.minorActionSlots)} className="flex-1 border border-cyan-400 text-cyan-400 py-3 rounded-xl font-bold hover:bg-cyan-400/10">Reset</button>
            </div>
          </div>
        </div>

        {/* MONITORS - PHYSICAL + STUN + DRAIN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Physical Monitor */}
          <div className="border border-red-500/30 bg-[#1a1f2e] rounded-2xl p-6">
            <div className="text-red-400 text-sm tracking-widest mb-4">PHYSICAL MONITOR</div>
            <div className="flex gap-2 flex-wrap mb-4">
              {Array.from({length: 10}).map((_, i) => (
                <div key={i} className={`w-10 h-10 border border-red-500/50 rounded-xl ${i < char.physical ? 'bg-red-600' : ''}`} />
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => update('physical', Math.max(0, char.physical-1))} className="bg-red-600 px-5 py-2 rounded-xl">−</button>
              <button onClick={() => update('physical', Math.min(10, char.physical+1))} className="bg-red-600 px-5 py-2 rounded-xl">+</button>
            </div>
          </div>

          {/* Stun + Drain Monitor */}
          <div className="border border-cyan-400/30 bg-[#1a1f2e] rounded-2xl p-6">
            <div className="text-cyan-400 text-sm tracking-widest mb-4">STUN MONITORS</div>
            
            {/* Total */}
            <div className="mb-6">
              <div className="text-xs text-cyan-400 mb-2">TOTAL</div>
              <div className="flex gap-2 flex-wrap">
                {Array.from({length: 10}).map((_, i) => (
                  <div key={i} className={`w-8 h-8 border border-cyan-400/50 rounded-lg ${i < (char.stun + char.drainStun) ? 'bg-cyan-500' : ''}`} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Normal Stun */}
              <div>
                <div className="text-xs text-cyan-400 mb-2">NORMAL STUN</div>
                <div className="flex gap-2 flex-wrap mb-3">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className={`w-8 h-8 border border-cyan-400/50 rounded-lg ${i < char.stun ? 'bg-cyan-500' : ''}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => update('stun', Math.max(0, char.stun-1))} className="bg-cyan-600 px-4 py-1 rounded">−</button>
                  <button onClick={() => update('stun', Math.min(10, char.stun+1))} className="bg-cyan-600 px-4 py-1 rounded">+</button>
                </div>
              </div>

              {/* Drain */}
              <div>
                <div className="text-xs text-purple-400 mb-2">DRAIN</div>
                <div className="flex gap-2 flex-wrap mb-3">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className={`w-8 h-8 border border-purple-400/50 rounded-lg ${i < char.drainStun ? 'bg-purple-600' : ''}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => update('drainStun', Math.max(0, char.drainStun-1))} className="bg-purple-600 px-4 py-1 rounded">−</button>
                  <button onClick={() => update('drainStun', Math.min(10, char.drainStun+1))} className="bg-purple-600 px-4 py-1 rounded">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setShowSpiritModal(true)} className="bg-[#1a1f2e] border border-emerald-500/30 hover:border-emerald-400 p-6 rounded-2xl flex items-center gap-5 text-left transition-all hover:scale-[1.02]">
            <span className="text-4xl">👻</span>
            <div className="font-bold text-lg">SPIRITS & SUMMONING</div>
          </button>

          <button className="bg-[#1a1f2e] border border-cyan-500/30 hover:border-cyan-400 p-6 rounded-2xl flex items-center gap-5 text-left transition-all hover:scale-[1.02]">
            <span className="text-4xl">✨</span>
            <div className="font-bold text-lg">SPELLS & ASTRAL COMBAT</div>
          </button>

          <button className="bg-[#1a1f2e] border border-rose-500/30 hover:border-rose-400 p-6 rounded-2xl flex items-center gap-5 text-left transition-all hover:scale-[1.02]">
            <span className="text-4xl">⚔️</span>
            <div className="font-bold text-lg">ATTACK & COMBAT</div>
          </button>

          <button className="bg-[#1a1f2e] border border-red-500/30 hover:border-red-400 p-6 rounded-2xl flex items-center gap-5 text-left transition-all hover:scale-[1.02]">
            <span className="text-4xl">❤️</span>
            <div className="font-bold text-lg">REST & RECOVERY</div>
          </button>
        </div>
      </div>

      {/* Spirit Modal */}
      <SpiritSummoningModal 
        isOpen={showSpiritModal} 
        onClose={() => setShowSpiritModal(false)} 
      />
    </div>
  );
}

export default App;