import React, { useState } from "react";
import { SPIRIT_TYPES } from "../data/spirits";

interface SummoningResult {
  netHits: number;
  drainFinal: number;
  drainTotal: number;           // Drain cumulé pendant cette série d'essais
  attempts: number;
  invocationRolls: number[];
  spiritRolls: number[];
  drainRolls: number[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addSpirit: (spirit: any) => void;
  update: (fn: (draft: any) => void) => void;
}

// Dice Display Component
const DiceDisplay = ({ dice, label }: { dice: number[]; label: string }) => {
  const hits = dice.filter(d => d >= 5).length;
  return (
    <div style={{ marginBottom: "16px", background: "#1e2937", padding: "12px", borderRadius: "10px" }}>
      <div style={{ color: "#94a3b8", marginBottom: "8px", fontWeight: "500" }}>{label}</div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "6px" }}>
        {dice.map((d, i) => (
          <div key={i} style={{
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: d >= 5 ? "#22c55e" : "#475569",
            color: d >= 5 ? "#000" : "#fff",
            borderRadius: "8px",
            fontWeight: "bold",
            border: "2px solid #334155"
          }}>
            {d}
          </div>
        ))}
      </div>
      <small style={{ color: "#67e8f9" }}>{hits} hits</small>
    </div>
  );
};

export default function SummoningModal({ isOpen, onClose, addSpirit, update }: Props) {
  const [selectedSpiritType, setSelectedSpiritType] = useState("fire");
  const [force, setForce] = useState(4);
  const [conjuringPool, setConjuringPool] = useState(8);
  const [drainResistancePool, setDrainResistancePool] = useState(6);

  const [useRetry, setUseRetry] = useState(true);
  const [maxAttempts, setMaxAttempts] = useState(5);
  const [maxDrain, setMaxDrain] = useState(6);

  const [result, setResult] = useState<SummoningResult | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [totalDrainAccumulated, setTotalDrainAccumulated] = useState(0);

  const [invocationDate, setInvocationDate] = useState(new Date().toISOString().split('T')[0]);
  const [solarPhase, setSolarPhase] = useState<"Day" | "Night">("Day");

  const rollDice = (pool: number) => Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);
  const countHits = (dice: number[]) => dice.filter(d => d >= 5).length;

  const performSummon = (currentAccumulated: number) => {
    const invocationRolls = rollDice(conjuringPool);
    const spiritRolls = rollDice(force * 2);
    const drainRolls = rollDice(drainResistancePool);

    const invHits = countHits(invocationRolls);
    const spiritHits = countHits(spiritRolls);
    const drainHits = countHits(drainRolls);

    // Correction : drain = spiritHits - drainHits (selon tes règles)
    const drainFinalThisAttempt = Math.max(0, spiritHits - drainHits);

    return {
      netHits: Math.max(0, invHits - spiritHits),
      drainFinal: drainFinalThisAttempt,
      drainTotal: currentAccumulated + drainFinalThisAttempt,
      attempts: 1,
      invocationRolls,
      spiritRolls,
      drainRolls
    };
  };

  const handleSummon = async () => {
    // RESET DU DRAIN À CHAQUE NOUVEAU LANCER
    setResult(null);
    setTotalDrainAccumulated(0);
    setIsRolling(true);

    let attempts = 0;
    let accumulated = 0;
    let finalResult: SummoningResult | null = null;

    while (attempts < maxAttempts) {
      attempts++;
      
      const roll = performSummon(accumulated);
      accumulated = roll.drainTotal;
      finalResult = { ...roll, attempts };

      setResult(finalResult);
      setTotalDrainAccumulated(accumulated);

      if (roll.netHits >= 1 || !useRetry || accumulated >= maxDrain) {
        break;
      }

      await new Promise(r => setTimeout(r, 600));
    }

    setIsRolling(false);
  };

  const validateSummoning = () => {
    if (!result) return;

    // Appliquer le drain cumulé
    if (result.drainTotal > 0) {
      update((draft: any) => {
        draft.stun = (draft.stun || 0) + result.drainTotal;
      });
    }

    // Ajouter l'esprit seulement en cas de succès
    if (result.netHits >= 1) {
      addSpirit({
        element: selectedSpiritType,
        force: force,
        servicesRemaining: result.netHits,
        conditionDamage: 0,
        invocationDate: invocationDate,
        solarPhase: solarPhase,
        solarTokens: 2,
      });
    }

    // Reset après validation
    setResult(null);
    setTotalDrainAccumulated(0);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f172a", width: "94%", maxWidth: "680px", borderRadius: "16px", padding: "24px", border: "2px solid #c084fc", maxHeight: "92vh", overflow: "auto" }}>
        
        <h2 style={{ color: "#c084fc", textAlign: "center", marginBottom: "24px" }}>🎯 SPIRIT SUMMONING</h2>

        {/* Spirit Type */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ marginBottom: "10px", color: "#94a3b8", fontWeight: "bold" }}>Spirit Type</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(78px, 1fr))", gap: "12px" }}>
            {SPIRIT_TYPES.map(s => (
              <button
                key={s.type}
                onClick={() => setSelectedSpiritType(s.type)}
                style={{
                  padding: "14px 8px",
                  background: selectedSpiritType === s.type ? s.color : "#1e2937",
                  color: selectedSpiritType === s.type ? "#000" : "#e2e8f0",
                  border: selectedSpiritType === s.type ? "3px solid #fff" : "2px solid transparent",
                  borderRadius: "12px",
                  fontSize: "1.8rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  minHeight: "94px",
                  transition: "all 0.2s",
                  cursor: "pointer"
                }}
              >
                <span style={{ fontSize: "2.4rem" }}>{s.emoji}</span>
                <span style={{ fontSize: "0.78rem", fontWeight: "500" }}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div style={{ display: "grid", gap: "18px", marginBottom: "24px" }}>
          <div>
            <label>Force: <strong>{force}</strong></label>
            <input type="range" min="1" max="8" value={force} onChange={e => setForce(Number(e.target.value))} style={{ width: "100%" }} />
          </div>
          <div>
            <label>Conjuring Pool: <strong>{conjuringPool}</strong></label>
            <input type="range" min="4" max="20" value={conjuringPool} onChange={e => setConjuringPool(Number(e.target.value))} style={{ width: "100%" }} />
          </div>
          <div>
            <label>Drain Resistance Pool: <strong>{drainResistancePool}</strong></label>
            <input type="range" min="4" max="20" value={drainResistancePool} onChange={e => setDrainResistancePool(Number(e.target.value))} style={{ width: "100%" }} />
          </div>
        </div>

        {/* Retry Options */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <input type="checkbox" checked={useRetry} onChange={e => setUseRetry(e.target.checked)} />
            Enable Multiple Attempts
          </label>

          {useRetry && (
            <div style={{ padding: "14px", background: "#1e2937", borderRadius: "10px", marginBottom: "16px" }}>
              <div>Max Attempts: {maxAttempts} 
                <input type="range" min="1" max="10" value={maxAttempts} onChange={e => setMaxAttempts(Number(e.target.value))} style={{ width: "100%" }} />
              </div>
              <div>Max Cumulative Drain: {maxDrain} 
                <input type="range" min="1" max="15" value={maxDrain} onChange={e => setMaxDrain(Number(e.target.value))} style={{ width: "100%" }} />
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <label>Date</label>
              <input type="date" value={invocationDate} onChange={e => setInvocationDate(e.target.value)} style={{ width: "100%", padding: "10px", background: "#1e2937", color: "white", borderRadius: "8px" }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Solar Phase</label>
              <select value={solarPhase} onChange={e => setSolarPhase(e.target.value as "Day" | "Night")} style={{ width: "100%", padding: "10px", background: "#1e2937", color: "white", borderRadius: "8px" }}>
                <option value="Day">Day</option>
                <option value="Night">Night</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <button 
            onClick={handleSummon} 
            disabled={isRolling} 
            style={{ flex: 1, padding: "16px", background: "#22d3ee", color: "#000", border: "none", borderRadius: "10px", fontWeight: "bold", fontSize: "1.1rem" }}
          >
            {isRolling ? "Summoning..." : "Roll Summoning"}
          </button>

          {result && (
            <button 
              onClick={validateSummoning} 
              style={{ flex: 1, padding: "16px", background: "#22c55e", color: "#000", border: "none", borderRadius: "10px", fontWeight: "bold", fontSize: "1.1rem" }}
            >
              Confirm Summoning ({result.netHits} Services)
            </button>
          )}
        </div>

        {/* Results Area */}
        {result && (
          <div style={{ marginTop: "24px", padding: "20px", background: "#1e2937", borderRadius: "12px" }}>
            <h3 style={{ color: "#67e8f9", textAlign: "center", marginBottom: "16px" }}>
              {result.attempts} Total Attempt{result.attempts > 1 ? 's' : ''}
            </h3>
            
            <DiceDisplay dice={result.invocationRolls} label="🎲 Invocation Roll" />
            <DiceDisplay dice={result.spiritRolls} label="🛡️ Spirit Resistance" />
            <DiceDisplay dice={result.drainRolls} label="🛡️ Drain Resistance" />

            <div style={{ marginTop: "20px", padding: "16px", background: "#0f172a", borderRadius: "10px", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>
                Services Gained: <strong style={{ color: "#22c55e" }}>{result.netHits}</strong>
              </div>
              <div style={{ fontSize: "1.1rem" }}>
                Total Drain Taken: <strong style={{ color: "#f87171" }}>{result.drainTotal}</strong>
              </div>
            </div>
          </div>
        )}

        <button onClick={onClose} style={{ width: "100%", marginTop: "20px", padding: "14px", background: "#64748b", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold" }}>
          Close
        </button>
      </div>
    </div>
  );
}