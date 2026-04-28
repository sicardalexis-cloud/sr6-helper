// src/components/SummoningModal.tsx
import React, { useState } from "react";
import { SPIRIT_TYPES } from "../data/spirits";

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

  const [result, setResult] = useState<any>(null);
  const [confirmed, setConfirmed] = useState(false);

  const rollDice = (pool: number) => Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);

  const performSummoning = () => {
    let totalDrain = 0;
    let attemptsDone = 0;

    const trySummon = () => {
      attemptsDone++;

      const invocationHits = rollDice(conjuringPool).filter(d => d >= 5).length;
      const spiritHits = rollDice(force * 2).filter(d => d >= 5).length;
      const drainHits = rollDice(drainResistancePool).filter(d => d >= 5).length;

      const netHits = Math.max(0, invocationHits - spiritHits);
      const drainDamage = Math.max(0, spiritHits - drainHits);
      totalDrain += drainDamage;

      const current = { netHits, drainTotal: totalDrain, attempts: attemptsDone };

      if (netHits >= 1 || attemptsDone >= maxAttempts || totalDrain >= drainThreshold) {
        setResult(current);
        return;
      }

      if (autoRetry) {
        setTimeout(trySummon, 420);
      } else {
        setResult(current);
      }
    };

    trySummon();
  };

  const confirmSummoning = () => {
    if (!result || confirmed) return;
    setConfirmed(true);

    // Mise à jour des données
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

        {/* Choix esprit simplifié */}
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

        <button 
          onClick={performSummoning}
          style={{ width: "100%", padding: "16px", background: "#22c55e", color: "#000", fontWeight: "bold", border: "none", borderRadius: "10px", marginBottom: "20px" }}
        >
          Lancer l'invocation
        </button>

        {result && (
          <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px", textAlign: "center", marginBottom: "20px" }}>
            <h3 style={{ color: "#67e8f9" }}>Invocation terminée</h3>
            <p style={{ fontSize: "1.5rem", margin: "12px 0" }}>
              Services : <strong style={{ color: "#22c55e" }}>{result.netHits}</strong>
            </p>
            <p style={{ fontSize: "1.3rem", color: "#f87171" }}>
              Drain total : <strong>{result.drainTotal}</strong>
            </p>
          </div>
        )}

        {result && !confirmed && (
          <button 
            onClick={confirmSummoning}
            style={{ width: "100%", padding: "16px", marginBottom: "12px", background: "#c084fc", color: "#000", fontWeight: "bold", border: "none", borderRadius: "10px" }}
          >
            ✅ Confirmer l'invocation
          </button>
        )}

        {confirmed && (
          <div style={{ width: "100%", padding: "16px", background: "#22c55e", color: "#000", fontWeight: "bold", borderRadius: "10px", textAlign: "center", marginBottom: "12px" }}>
            Esprit ajouté avec succès !
          </div>
        )}

        <button 
          onClick={onClose} 
          style={{ width: "100%", padding: "14px", background: "#334155", color: "white", border: "none", borderRadius: "10px" }}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}