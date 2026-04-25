import { useState } from 'react';

export interface SummonedSpirit {
  type: string;
  force: number;
  services: number;
  timestamp: string;
}

interface SpiritSummoningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpiritValidated: (spirit: SummonedSpirit, drainThisSummon: number) => void;
}

export default function SpiritSummoningModal({ isOpen, onClose, onSpiritValidated }: SpiritSummoningModalProps) {
  const [selectedSpirit, setSelectedSpirit] = useState("Man");
  const [conjuringPool, setConjuringPool] = useState(8);
  const [spiritForce, setSpiritForce] = useState(4);
  const [drainResistPool, setDrainResistPool] = useState(8);

  const [autoRetry, setAutoRetry] = useState(true);
  const [maxDrainTolerance, setMaxDrainTolerance] = useState(2);
  const [maxAttempts, setMaxAttempts] = useState(5);
  const [attemptCount, setAttemptCount] = useState(0);

  const [conjuringDice, setConjuringDice] = useState<number[]>([]);
  const [spiritDice, setSpiritDice] = useState<number[]>([]);
  const [drainDice, setDrainDice] = useState<number[]>([]);
  const [totalDrainThisSummon, setTotalDrainThisSummon] = useState(0);
  const [services, setServices] = useState(0);

  const [resultMessage, setResultMessage] = useState("");
  const [isSummoning, setIsSummoning] = useState(false);
  const [summonedSpirits, setSummonedSpirits] = useState<SummonedSpirit[]>([]);

  const spiritTypes = [
    { name: "Air", icon: "🌬️" }, { name: "Water", icon: "💧" },
    { name: "Fire", icon: "🔥" }, { name: "Earth", icon: "🌍" },
    { name: "Man", icon: "🧍" }, { name: "Beasts", icon: "🐺" },
    { name: "Plant", icon: "🌿" }, { name: "Guardian", icon: "🛡️" },
  ];

  const rollDice = (pool: number): { dice: number[], hits: number } => {
    const dice: number[] = [];
    let hits = 0;
    for (let i = 0; i < pool; i++) {
      const result = Math.floor(Math.random() * 6) + 1;
      dice.push(result);
      if (result >= 5) hits++;
    }
    return { dice: dice.sort((a, b) => b - a), hits };
  };

  const performSummoning = async (isAuto = false) => {
    if (!isAuto) {
      setIsSummoning(true);
      setAttemptCount(0);
      setTotalDrainThisSummon(0);
    }

    const newAttempt = attemptCount + 1;
    setAttemptCount(newAttempt);

    const conj = rollDice(conjuringPool);
    const spirit = rollDice(spiritForce * 2);
    const drain = rollDice(drainResistPool);

    const netHits = Math.max(0, conj.hits - spirit.hits);
    const drainDamage = Math.max(0, spirit.hits - drain.hits);
    const newTotalDrain = totalDrainThisSummon + drainDamage;

    setConjuringDice(conj.dice);
    setSpiritDice(spirit.dice);
    setDrainDice(drain.dice);
    setTotalDrainThisSummon(newTotalDrain);
    setServices(netHits);

    let message = netHits > 0
      ? `✅ Invocation réussie ! ${netHits} service${netHits > 1 ? 's' : ''} après ${newAttempt} essai${newAttempt > 1 ? 's' : ''}`
      : `❌ Échec (${newAttempt}/${maxAttempts})`;

    message += `\n💥 Drain ce round : ${drainDamage} | Total cumulé : ${newTotalDrain}`;

    const shouldStop = newTotalDrain >= maxDrainTolerance || newAttempt >= maxAttempts;

    if (shouldStop || netHits > 0) {
      setResultMessage(message);
      setIsSummoning(false);
    } else if (autoRetry) {
      message += `\n\n🔄 Auto-retry ${newAttempt + 1}/${maxAttempts}...`;
      setResultMessage(message);
      setTimeout(() => performSummoning(true), 900);
    } else {
      setResultMessage(message);
      setIsSummoning(false);
    }
  };

  const validateSummon = () => {
    const newSpirit: SummonedSpirit = {
      type: selectedSpirit,
      force: spiritForce,
      services: services,
      timestamp: new Date().toLocaleTimeString()
    };

    onSpiritValidated(newSpirit, totalDrainThisSummon);

    alert(`✅ ${selectedSpirit} Spirit validé !\nServices: ${services} | Drain: ${totalDrainThisSummon}`);
    resetAll();
  };

  const resetAll = () => {
    setConjuringDice([]);
    setSpiritDice([]);
    setDrainDice([]);
    setTotalDrainThisSummon(0);
    setServices(0);
    setAttemptCount(0);
    setResultMessage("");
    setIsSummoning(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] border border-[#334466] rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        
        <div className="flex justify-between items-center border-b border-[#334466] p-6 sticky top-0 bg-[#111827]">
          <div>
            <h2 className="text-3xl font-bold text-white">👻 Spirit Summoning</h2>
            <p className="text-cyan-400">Shadowrun 6E Conjuring Roller</p>
          </div>
          <button onClick={() => { onClose(); resetAll(); }} className="text-4xl text-gray-400 hover:text-white">×</button>
        </div>

        <div className="p-6 space-y-8">
          {/* Spirit Type */}
          <div>
            <div className="text-sm text-gray-400 mb-3">SPIRIT TYPE</div>
            <div className="grid grid-cols-4 gap-3">
              {spiritTypes.map(sp => (
                <button key={sp.name} onClick={() => setSelectedSpirit(sp.name)}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${selectedSpirit === sp.name ? 'border-purple-500 bg-purple-900/40' : 'border-gray-700 hover:border-gray-500'}`}>
                  <span className="text-4xl">{sp.icon}</span>
                  <span>{sp.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Conjuring + Magic</label>
              <input type="range" min="0" max="20" value={conjuringPool} onChange={e => setConjuringPool(+e.target.value)} className="w-full accent-purple-500" />
              <div className="text-center text-3xl font-bold mt-1">{conjuringPool}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Spirit Force</label>
              <input type="range" min="1" max="12" value={spiritForce} onChange={e => setSpiritForce(+e.target.value)} className="w-full accent-purple-500" />
              <div className="text-center text-3xl font-bold mt-1">{spiritForce}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Drain Resistance</label>
              <input type="range" min="0" max="20" value={drainResistPool} onChange={e => setDrainResistPool(+e.target.value)} className="w-full accent-purple-500" />
              <div className="text-center text-3xl font-bold mt-1">{drainResistPool}</div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-[#1a2338] p-5 rounded-2xl space-y-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={autoRetry} onChange={e => setAutoRetry(e.target.checked)} className="w-5 h-5 accent-purple-500" />
              <span>Auto-Retry on Failure</span>
            </label>

            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-28">Drain max :</span>
              {[1,2,3].map(n => (
                <button key={n} onClick={() => setMaxDrainTolerance(n)}
                  className={`px-5 py-1.5 rounded-xl text-sm font-bold ${maxDrainTolerance === n ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                  {n}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-28">Essais max :</span>
              <div className="flex items-center gap-3 bg-[#111827] px-4 py-2 rounded-xl">
                <button onClick={() => setMaxAttempts(Math.max(1, maxAttempts - 1))} className="bg-red-600 hover:bg-red-500 w-9 h-9 rounded-lg text-white font-bold">−</button>
                <span className="text-2xl font-bold w-12 text-center">{maxAttempts}</span>
                <button onClick={() => setMaxAttempts(Math.min(20, maxAttempts + 1))} className="bg-emerald-600 hover:bg-emerald-500 w-9 h-9 rounded-lg text-white font-bold">+</button>
              </div>
            </div>
          </div>

          <button 
            onClick={() => { resetAll(); performSummoning(); }}
            disabled={isSummoning}
            className="w-full py-6 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl text-xl font-bold hover:brightness-110 disabled:opacity-70"
          >
            {isSummoning ? "Invocation en cours..." : "🎲 LANCER L'INVOCATION"}
          </button>

          {/* Résultats avec dés */}
          {conjuringDice.length > 0 && (
            <div className="bg-[#1a2338] border border-purple-500/30 rounded-2xl p-6 space-y-8">
              <div>
                <div className="text-purple-400 font-bold mb-3">CONJURING ROLL — {conjuringDice.filter(d => d >= 5).length} hits</div>
                <div className="flex flex-wrap gap-3">
                  {conjuringDice.map((die, i) => (
                    <div key={i} className={`w-14 h-14 flex items-center justify-center text-3xl font-bold rounded-2xl border-2 ${die >= 5 ? 'bg-green-600 border-green-400' : 'bg-gray-700 border-gray-600'}`}>
                      {die}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-red-400 font-bold mb-3">SPIRIT RESISTANCE — {spiritDice.filter(d => d >= 5).length} hits</div>
                <div className="flex flex-wrap gap-3">
                  {spiritDice.map((die, i) => (
                    <div key={i} className={`w-14 h-14 flex items-center justify-center text-3xl font-bold rounded-2xl border-2 ${die >= 5 ? 'bg-red-600 border-red-400' : 'bg-gray-700 border-gray-600'}`}>
                      {die}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-cyan-400 font-bold mb-3">DRAIN RESISTANCE — {drainDice.filter(d => d >= 5).length} hits</div>
                <div className="flex flex-wrap gap-3">
                  {drainDice.map((die, i) => (
                    <div key={i} className={`w-14 h-14 flex items-center justify-center text-3xl font-bold rounded-2xl border-2 ${die >= 5 ? 'bg-cyan-600 border-cyan-400' : 'bg-gray-700 border-gray-600'}`}>
                      {die}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-700 text-center text-xl font-bold whitespace-pre-line">
                {resultMessage}
              </div>

              <button 
                onClick={validateSummon}
                className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-xl font-bold hover:brightness-110"
              >
                ✅ Valider l'invocation ({services} services - {totalDrainThisSummon} drain)
              </button>
            </div>
          )}

          {/* Liste des esprits invoqués */}
          {summonedSpirits.length > 0 && (
            <div className="bg-[#1a2338] border border-cyan-500/30 rounded-2xl p-6">
              <div className="text-cyan-400 font-bold mb-4">Esprits invoqués cette session ({summonedSpirits.length})</div>
              <div className="space-y-3">
                {summonedSpirits.map((spirit, i) => (
                  <div key={i} className="bg-black/40 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-lg">{spirit.type} Spirit</span>
                      <span className="ml-4 text-cyan-400">Force {spirit.force}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold">{spirit.services} services</div>
                      <div className="text-xs text-gray-500">{spirit.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}