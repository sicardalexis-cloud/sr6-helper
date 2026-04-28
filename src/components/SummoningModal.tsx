// src/components/SummoningModal.tsx
import React, { useState } from "react";
import { SPIRIT_TYPES } from "../data/spirits";

interface SummoningResult {
  netHits: number;
  drainTotal: number;
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

export default function SummoningModal({ isOpen, onClose, addSpirit, update }: Props) {
  const [selectedSpiritType, setSelectedSpiritType] = useState("fire");
  const [force, setForce] = useState(4);
  const [conjuringPool, setConjuringPool] = useState(8);
  const [drainResistancePool, setDrainResistancePool] = useState(6);

  const [autoRetry, setAutoRetry] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState(3);
  const [drainThreshold, setDrainThreshold] = useState(8);

  const [result, setResult] = useState<SummoningResult | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = (pool: number): number[] => 
    Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);

  const performSummoning = () => {
    setIsRolling(true);
    let totalDrain = 0;
    let attemptsDone = 0;
    let finalResult: SummoningResult | null = null;

    const trySummon = () => {
      attemptsDone++;

      const invocationRoll = rollDice(conjuringPool);
      const spiritRoll = rollDice(force * 2);
      const drainRoll = rollDice(drainResistancePool);

      const invocationHits = invocationRoll.filter(d => d >= 5).length;
      const spiritHits = spiritRoll.filter(d => d >= 5).length;
      const netHits = Math.max(0, invocationHits - spiritHits);

      const drainDamage = Math.max(0, spiritHits - drainRoll.filter(d => d >= 5).length);
      totalDrain += drainDamage;

      const currentResult: SummoningResult = {
        netHits,
        drainTotal: totalDrain,
        attempts: attemptsDone,
        invocationRolls: invocationRoll,
        spiritRolls: spiritRoll,
        drainRolls: drainRoll,
      };

      // === ARRÊT IMMÉDIAT DÈS QUE ÇA RÉUSSIT ===
      if (netHits >= 1 || attemptsDone >= maxAttempts || totalDrain >= drainThreshold) {
        finalResult = currentResult;
        setResult(currentResult);
        setIsRolling(false);
        return;
      }

      // Sinon on continue uniquement si autoRetry est activé
      if (autoRetry) {
        setTimeout(trySummon, 420);
      } else {
        setResult(currentResult);
        setIsRolling(false);
      }
    };

    trySummon();
  };

  const confirmSummoning = () => {
    if (!result) return;

    // Appliquer le drain cumulé
    if (result.drainTotal > 0) {
      update((draft: any) => {
        draft.drainStun = (draft.drainStun || 0) + result.drainTotal;
      });
    }

    // Ajouter l'esprit seulement en cas de succès
    if (result.netHits >= 1) {
      addSpirit({
        element: selectedSpiritType,
        force: force,
        servicesRemaining: result.netHits,
        conditionDamage: 0,
        invocationDate: new Date().toLocaleDateString("fr-FR"),
        solarPhase: "Day",
        solarTokens: 2,
      });
    }

    // Reset
    setResult(null);
  };

  const DiceDisplay = ({ dice, label }: { dice: number[]; label: string }) => {
    const hits = dice.filter(d => d >= 5).length;
    return (
      <div style={{ marginBottom: "16px", background: "#1e2937", padding: "12px", borderRadius: "10px" }}>
        <div style={{ color: "#94a3b8", marginBottom: "8px", fontWeight: "500" }}>{label}</div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "6px" }}>
          {dice.map((d, i) => (
            <div key={i} style={{
              width: "36px", height: "36px", display: "flex", alignItems: "center",
              justifyContent: "center", background: d >= 5 ? "#22c55e" : "#475569",
              color: d >= 5 ? "#000" : "#fff", borderRadius: "8px", fontWeight: "bold",
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

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
      <div style={{ background: "#0f172a", width: "100%", maxWidth: "720px", borderRadius: "16px", border: "2px solid #c084fc", padding: "20px", maxHeight: "92vh", overflow: "auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>INVOCATION D'ESPRIT</h2>
          <button onClick={onClose} style={{ fontSize: "1.8rem", background: "none", border: "none", color: "#94a3b8" }}>✕</button>
        </div>

        {/* Choix du type d'esprit */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))", gap: "10px", marginBottom: "20px" }}>
          {SPIRIT_TYPES.map((spirit) => (
            <div
              key={spirit.type}
              onClick={() => setSelectedSpiritType(spirit.type)}
              style={{
                padding: "12px 8px",
                border: selectedSpiritType === spirit.type ? `3px solid ${spirit.color}` : "2px solid #334155",
                borderRadius: "10px",
                textAlign: "center",
                cursor: "pointer",
                background: selectedSpiritType === spirit.type ? "#1e2937" : "transparent"
              }}
            >
              <div style={{ fontSize: "2rem" }}>{spirit.emoji}</div>
              <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>{spirit.label}</div>
            </div>
          ))}
        </div>

        {/* Sliders */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label>Force de l'esprit : <strong>{force}</strong></label>
            <input type="range" min="1" max="8" value={force} onChange={e => setForce(Number(e.target.value))} style={{ width: "100%" }} />
          </div>
          <div>
            <label>Pool d'Invocation : <strong>{conjuringPool}</strong></label>
            <input type="range" min="2" max="18" value={conjuringPool} onChange={e => setConjuringPool(Number(e.target.value))} style={{ width: "100%" }} />
          </div>
          <div>
            <label>Pool de Résistance au Drain : <strong>{drainResistancePool}</strong></label>
            <input type="range" min="2" max="18" value={drainResistancePool} onChange={e => setDrainResistancePool(Number(e.target.value))} style={{ width: "100%" }} />
          </div>
        </div>

        {/* Auto Retry */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <input type="checkbox" checked={autoRetry} onChange={e => setAutoRetry(e.target.checked)} />
            <span>Activer le retry automatique</span>
          </label>
        </div>

        {autoRetry && (
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <label>Essais max : <strong>{maxAttempts}</strong></label>
              <input type="range" min="2" max="8" value={maxAttempts} onChange={e => setMaxAttempts(Number(e.target.value))} style={{ width: "100%" }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Seuil de drain max : <strong>{drainThreshold}</strong></label>
              <input type="range" min="2" max="12" value={drainThreshold} onChange={e => setDrainThreshold(Number(e.target.value))} style={{ width: "100%" }} />
            </div>
          </div>
        )}

        <button 
          onClick={performSummoning}
          disabled={isRolling}
          style={{ width: "100%", padding: "16px", background: "#22c55e", color: "#000", fontWeight: "bold", border: "none", borderRadius: "10px", marginBottom: "20px" }}
        >
          {isRolling ? "Invocation en cours..." : "Lancer l'invocation"}
        </button>

        {/* Résultats */}
        {result && (
          <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ color: "#67e8f9", textAlign: "center", marginBottom: "16px" }}>
              {result.attempts} tentative{result.attempts > 1 ? "s" : ""}
            </h3>
            <DiceDisplay dice={result.invocationRolls} label="🎲 Invocation" />
            <DiceDisplay dice={result.spiritRolls} label="🛡️ Résistance Esprit" />
            <DiceDisplay dice={result.drainRolls} label="🛡️ Résistance Drain" />

            <div style={{ marginTop: "20px", textAlign: "center", padding: "16px", background: "#0f172a", borderRadius: "10px" }}>
              <div style={{ fontSize: "1.6rem" }}>
                Services : <strong style={{ color: "#22c55e" }}>{result.netHits}</strong>
              </div>
              <div style={{ fontSize: "1.2rem", color: "#f87171" }}>
                Drain total : <strong>{result.drainTotal}</strong>
              </div>
            </div>
          </div>
        )}

        {result && (
          <button 
            onClick={confirmSummoning}
            style={{ width: "100%", padding: "16px", marginTop: "20px", background: "#c084fc", color: "#000", fontWeight: "bold", border: "none", borderRadius: "10px" }}
          >
            Confirmer l'invocation ({result.netHits} services)
          </button>
        )}

        <button onClick={onClose} style={{ width: "100%", padding: "14px", marginTop: "12px", background: "#64748b", color: "white", border: "none", borderRadius: "10px" }}>
          Fermer
        </button>
      </div>
    </div>
  );
}