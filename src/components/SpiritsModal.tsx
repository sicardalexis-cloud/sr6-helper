import React from "react";
import { useCharacterContext, SummonedSpirit } from "../contexts/CharacterContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onViewSpirit: (spiritId: string) => void;
}

export default function SpiritsModal({ isOpen, onClose, onViewSpirit }: Props) {
  const { char, updateSpirit, removeSpirit, advanceSolarPhase } = useCharacterContext();
  const activeSpirits: SummonedSpirit[] = char.activeSpirits || [];

  if (!isOpen) return null;

  const changeServices = (id: string, delta: number) => {
    updateSpirit(id, {
      servicesRemaining: Math.max(0, Math.min(12, 
        (activeSpirits.find(s => s.id === id)?.servicesRemaining || 0) + delta
      ))
    });
  };

  const changeCondition = (id: string, newDamage: number) => {
    updateSpirit(id, { 
      conditionDamage: Math.max(0, Math.min(20, newDamage)) 
    });
  };

  const deleteSpirit = (id: string) => {
    if (confirm("Supprimer cet esprit ?")) {
      removeSpirit(id);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f172a", width: "94%", maxWidth: "720px", borderRadius: "16px", padding: "20px", border: "2px solid #c084fc", maxHeight: "90vh", overflow: "auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>
            ACTIVE SPIRITS ({activeSpirits.length})
          </h2>
          <button onClick={onClose} style={{ fontSize: "1.8rem", background: "none", border: "none", color: "#94a3b8" }}>✕</button>
        </div>

        {activeSpirits.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#94a3b8" }}>
            Aucun esprit invoqué pour le moment.
          </div>
        ) : (
          activeSpirits.map((spirit) => {
            const maxCM = 8 + Math.ceil(spirit.force / 2);

            return (
              <div key={spirit.id} style={{ background: "#1e2937", padding: "18px", borderRadius: "12px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <strong style={{ color: "#c084fc", fontSize: "1.35rem" }}>{spirit.element}</strong>{" "}
                    <span style={{ color: "#67e8f9" }}>Force {spirit.force}</span>
                  </div>
                  <button 
                    onClick={() => onViewSpirit(spirit.id)}
                    style={{ padding: "8px 16px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
                  >
                    Fiche Détail
                  </button>
                </div>

                <div style={{ color: "#94a3b8", marginBottom: "12px" }}>
                  Services: <strong>{spirit.servicesRemaining}</strong> | 
                  Solar Tokens: <strong>{spirit.solarTokens}/2</strong>
                </div>

                {/* Condition Monitor */}
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ color: "#94a3b8", marginBottom: "6px" }}>Condition Monitor</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {Array.from({ length: maxCM }).map((_, i) => (
                      <div
                        key={i}
                        onClick={() => changeCondition(spirit.id, i + 1 === spirit.conditionDamage ? 0 : i + 1)}
                        style={{
                          width: "32px",
                          height: "32px",
                          border: "2px solid #475569",
                          borderRadius: "6px",
                          background: i < (spirit.conditionDamage || 0) ? "#ef4444" : "#1e2937",
                          cursor: "pointer"
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Boutons d'action */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button onClick={() => changeServices(spirit.id, 1)} style={{ flex: 1, padding: "10px", background: "#22c55e", color: "#000", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
                    + Service
                  </button>
                  <button onClick={() => changeServices(spirit.id, -1)} style={{ flex: 1, padding: "10px", background: "#eab308", color: "#000", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
                    - Service
                  </button>
                  <button onClick={() => deleteSpirit(spirit.id)} style={{ padding: "10px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                    Supprimer
                  </button>
                </div>
              </div>
            );
          })
        )}

        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
          <button 
            onClick={advanceSolarPhase} 
            style={{ flex: 1, padding: "14px", background: "#8b5cf6", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold" }}
          >
            Avancer Phase Solaire
          </button>
          <button onClick={onClose} style={{ flex: 1, padding: "14px", background: "#64748b", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold" }}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}