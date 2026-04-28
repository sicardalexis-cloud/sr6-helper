// src/components/SummoningModal.tsx
import React, { useState, useEffect } from "react";
import { SPIRIT_TYPES } from "../data/spirits";

interface SummoningResult {
  netHits: number;
  drainTotal: number;
  attempts: number;
  lastInvocationRolls: number[];
  lastSpiritRolls: number[];
  lastDrainRolls: number[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addSpirit: (spirit: any) => void;
  update: (fn: (draft: any) => void) => void;
}

const DiceDisplay = ({ dice, label }: { dice: number[]; label: string }) => {
  const hits = dice.filter(d => d >= 5).length;
  return (
    <div style={{ marginBottom: "16px", background: "#1e2937", padding: "12px", borderRadius: "10px" }}>
      <div style={{ color: "#94a3b8", marginBottom: "8px", fontWeight: "500" }}>{label}</div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "6px" }}>
        {dice.map((d, i) => (
          <div key={i} style={{
            width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
            background: d >= 5 ? "#22c55e" : "#475569",
            color: d >= 5 ? "#000" : "#fff",
            borderRadius: "8px", fontWeight: "bold", border: "2px solid #334155"
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
  const [selectedSpiritType, setSelectedSpiritType] = useState<string>("fire");
  const [force, setForce] = useState(4);
  const [conjuringPool, setConjuringPool] = useState(8);
  const [drainResistancePool, setDrainResistancePool] = useState(6);

  const [autoRetry, setAutoRetry] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState(3);
  const [drainThreshold, setDrainThreshold] = useState(6);

  const [result, setResult] = useState<SummoningResult | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  const rollDice = (pool: number): number[] => 
    Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);

  const calculateHits = (rolls: number[]) => rolls.filter(d => d >= 5).length;

  const performSummoning = async () => {
    setIsRolling(true);
    setResult(null);

    let totalDrain = 0;
    let bestNetHits = 0;
    let attemptsDone = 0;
    let lastInvocation: number[] = [];
    let lastSpirit: number[] = [];
    let lastDrain: number[] = [];

    const attemptsToDo = autoRetry ? maxAttempts : 1;

    for (let i = 0; i < attemptsToDo; i++) {
      attemptsDone++;
      const inv = rollDice(conjuringPool);
      const spi = rollDice(force * 2);
      const dra = rollDice(drainResistancePool);

      const invHits = calculateHits(inv);
      const spiHits = calculateHits(spi);
      const netHits = Math.max(0, invHits - spiHits);
      const drainThis = Math.max(0, spiHits - calculateHits(dra));

      totalDrain += drainThis;
      if (netHits > bestNetHits) bestNetHits = netHits;

      // On garde seulement le dernier essai pour l'affichage détaillé
      lastInvocation = inv;
      lastSpirit = spi;
      lastDrain = dra;

      if (autoRetry && totalDrain >= drainThreshold) break;

      await new Promise(r => setTimeout(r, 400));
    }

    setResult({
      netHits: bestNetHits,
      drainTotal: totalDrain,
      attempts: attemptsDone,
      lastInvocationRolls: lastInvocation,
      lastSpiritRolls: lastSpirit,
      lastDrainRolls: lastDrain,
    });
    setIsRolling(false);
  };

  const confirmSummoning = () => {
    if (!result) return;

    if (result.drainTotal > 0) {
      update((draft: any) => {
        draft.drainStun = (draft.drainStun || 0) + result.drainTotal;
      });
    }

    if (result.netHits >= 1) {
      const invocationDate = new Date().toLocaleDateString('fr-FR');
      const solarPhase = new Date().getHours() >= 6 && new Date().getHours() < 18 ? "Day" : "Night";

      addSpirit({
        element: selectedSpiritType,
        force: force,
        servicesRemaining: result.netHits,
        conditionDamage: 0,
        invocationDate,
        solarPhase,
        solarTokens: 2,
      });
    }

    setResult(null);
    onClose();
  };

  return (
    <div style={{ 
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 3000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "10px",
      overflow: "hidden"
    }}>
      <div style={{ 
        background: "#0f172a", width: "100%", maxWidth: "660px", borderRadius: "16px",
        border: "2px solid #c084fc", padding: "24px", maxHeight: "92vh", overflowY: "auto"
      }}>
        
        <h2 style={{ color: "#c084fc", textAlign: "center", marginBottom: "20px" }}>INVOCATION D'ESPRIT</h2>

        {/* Choix du type */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))", gap: "12px", marginBottom: "24px" }}>
          {SPIRIT_TYPES.map((spirit) => (
            <div key={spirit.type} onClick={() => setSelectedSpiritType(spirit.type)} style={{
              padding: "12px", borderRadius: "10px", textAlign: "center", cursor: "pointer",
              background: selectedSpiritType === spirit.type ? "#1e2937" : "#0f172a",
              border: selectedSpiritType === spirit.type ? "2px solid #c084fc" : "1px solid #334155"
            }}>
              <div style={{ fontSize: "2rem" }}>{spirit.emoji}</div>
              <div style={{ color: spirit.color, fontWeight: "bold" }}>{spirit.label}</div>
            </div>
          ))}
        </div>

        {/* Sliders */}
        <div style={{ marginBottom: "20px" }}>
          <label>Force : <strong>{force}</strong></label>
          <input type="range" min={1} max={8} value={force} onChange={e => setForce(Number(e.target.value))} style={{ width: "100%" }} />

          <label style={{ marginTop: "12px", display: "block" }}>Conjuring Pool : <strong>{conjuringPool}</strong></label>
          <input type="range" min={2} max={15} value={conjuringPool} onChange={e => setConjuringPool(Number(e.target.value))} style={{ width: "100%" }} />

          <label style={{ marginTop: "12px", display: "block" }}>Drain Resistance : <strong>{drainResistancePool}</strong></label>
          <input type="range" min={2} max={12} value={drainResistancePool} onChange={e => setDrainResistancePool(Number(e.target.value))} style={{ width: "100%" }} />
        </div>

        {/* Retry Automatique */}
        <div style={{ background: "#1e2937", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", marginBottom: "12px" }}>
            <input type="checkbox" checked={autoRetry} onChange={e => setAutoRetry(e.target.checked)} style={{ accentColor: "#67e8f9", transform: "scale(1.4)" }} />
            <span style={{ color: "#67e8f9", fontWeight: "bold" }}>Retry Automatique</span>
          </label>

          {autoRetry && (
            <div style={{ marginTop: "12px" }}>
              <label>Nombre max d'essais : <strong>{maxAttempts}</strong></label>
              <input type="range" min={2} max={6} value={maxAttempts} onChange={e => setMaxAttempts(Number(e.target.value))} style={{ width: "100%" }} />

              <label style={{ marginTop: "12px", display: "block" }}>Arrêter si drain ≥ <strong>{drainThreshold}</strong></label>
              <input type="range" min={2} max={15} value={drainThreshold} onChange={e => setDrainThreshold(Number(e.target.value))} style={{ width: "100%" }} />
            </div>
          )}
        </div>

        <button 
          onClick={performSummoning} 
          disabled={isRolling}
          style={{ width: "100%", padding: "14px", background: "#22c55e", color: "black", border: "none", borderRadius: "10px", fontWeight: "bold", marginBottom: "12px" }}
        >
          {isRolling ? "Invocation en cours..." : autoRetry ? `Lancer ${maxAttempts} essais` : "Lancer Invocation"}
        </button>

        {result && (
          <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px", marginTop: "16px" }}>
            <h3 style={{ textAlign: "center", color: "#67e8f9" }}>
              {result.attempts} Essai{result.attempts > 1 ? 's' : ''}
            </h3>

            <div style={{ textAlign: "center", margin: "16px 0", fontSize: "1.5rem" }}>
              Services : <strong style={{ color: "#22c55e" }}>{result.netHits}</strong>
            </div>
            <div style={{ textAlign: "center", color: "#f87171", marginBottom: "16px" }}>
              Drain total : <strong>{result.drainTotal}</strong>
            </div>

            {/* Jets détaillés du dernier essai */}
            <DiceDisplay dice={result.lastInvocationRolls} label="🎲 Invocation Roll (dernier essai)" />
            <DiceDisplay dice={result.lastSpiritRolls} label="🛡️ Spirit Resistance (dernier essai)" />
            <DiceDisplay dice={result.lastDrainRolls} label="🛡️ Drain Resistance (dernier essai)" />

            <button onClick={confirmSummoning} style={{ width: "100%", padding: "14px", background: "#c084fc", color: "black", border: "none", borderRadius: "10px", fontWeight: "bold", marginTop: "16px" }}>
              CONFIRMER L'INVOCATION
            </button>
          </div>
        )}

        <button onClick={onClose} style={{ width: "100%", padding: "14px", marginTop: "16px", background: "#64748b", color: "white", border: "none", borderRadius: "10px" }}>
          Fermer
        </button>
      </div>
    </div>
  );
}