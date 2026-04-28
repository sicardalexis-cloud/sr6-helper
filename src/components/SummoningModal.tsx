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
  const [confirmed, setConfirmed] = useState(false);

  const rollDice = (pool: number): number[] => 
    Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);

  const performSummoning = () => {
    setIsRolling(true);
    let totalDrain = 0;
    let attemptsDone = 0;

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

      if (netHits >= 1 || attemptsDone >= maxAttempts || totalDrain >= drainThreshold) {
        setResult(currentResult);
        setIsRolling(false);
        return;
      }

      if (autoRetry) {
        setTimeout(trySummon, 420);
      } else {
        setResult(currentResult);
        setIsRolling(false);
      }
    };

    trySummon();
  };

  // ==================== FIX PIXEL 8 ====================
  const confirmSummoning = () => {
    if (!result || confirmed) return;
    setConfirmed(true);

    // FERMETURE IMMÉDIATE (ce qui marche sur ton Pixel 8)
    onClose();

    // Mises à jour APRÈS la fermeture du modal
    setTimeout(() => {
      if (result.drainTotal > 0) {
        update((draft: any) => {
          draft.drainStun = (draft.drainStun || 0) + result.drainTotal;
        });
      }

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
    }, 50);
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
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "10px",
      touchAction: "manipulation"
    }}>
      <div style={{
        background: "#0f172a",
        width: "100%",
        maxWidth: "720px",
        borderRadius: "16px",
        border: "2px solid #c084fc",
        padding: "24px",
        maxHeight: "100svh",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        overscrollBehavior: "contain",
      }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>INVOCATION D'ESPRIT</h2>
          <button onClick={onClose} style={{ fontSize: "1.8rem", background: "none", border: "none", color: "#94a3b8" }}>✕</button>
        </div>

        {/* Choix du type d'esprit */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))", gap: "10px", marginBottom: "24px" }}>
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

        {/* Sliders + Auto Retry + Bouton Lancer (identique à avant) */}
        {/* ... (garde tout le reste de ton code précédent pour les sliders et auto-retry) ... */}

        <button 
          onClick={performSummoning}
          disabled={isRolling}
          style={{ width: "100%", padding: "16px", background: "#22c55e", color: "#000", fontWeight: "bold", border: "none", borderRadius: "10px", marginBottom: "20px" }}
        >
          {isRolling ? "Invocation en cours..." : "Lancer l'invocation"}
        </button>

        {/* Résultats */}
        {result && (
          <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
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

        {result && !confirmed && (
          <button 
            onClick={confirmSummoning}
            style={{ width: "100%", padding: "16px", marginBottom: "12px", background: "#c084fc", color: "#000", fontWeight: "bold", border: "none", borderRadius: "10px" }}
          >
            Confirmer l'invocation ({result.netHits} services)
          </button>
        )}

        {confirmed && (
          <div style={{ width: "100%", padding: "16px", background: "#22c55e", color: "#000", fontWeight: "bold", borderRadius: "10px", textAlign: "center" }}>
            ✅ Esprit ajouté avec succès !
          </div>
        )}

        <button onClick={onClose} style={{ width: "100%", padding: "14px", background: "#334155", color: "white", border: "none", borderRadius: "10px" }}>
          Fermer
        </button>
      </div>
    </div>
  );
}