import React from "react";
import { useCharacterContext } from "../contexts/CharacterContext";
import { SummonedSpirit } from "../hooks/useCharacter";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onViewSpirit: (spirit: SummonedSpirit) => void;
}

export default function SpiritsModal({ isOpen, onClose, onViewSpirit }: Props) {
  const { char, updateSpirit, removeSpirit, advanceSolarPhase } = useCharacterContext();
  const activeSpirits = char.activeSpirits || [];

  if (!isOpen) return null;

  const changeServices = (id: string, delta: number) => {
    updateSpirit(id, {
      servicesRemaining: Math.max(0, Math.min(12, 
        (activeSpirits.find(s => s.id === id)?.servicesRemaining || 0) + delta
      ))
    });
  };

  const changeCondition = (id: string, newDamage: number) => {
    updateSpirit(id, { conditionDamage: Math.max(0, Math.min(20, newDamage)) });
  };

  const deleteSpirit = (id: string) => {
    if (confirm("Supprimer cet esprit ?")) {
      removeSpirit(id);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f172a", width: "94%", maxWidth: "780px", borderRadius: "16px", padding: "20px", border: "2px solid #c084fc", maxHeight: "92vh", overflow: "auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>
            ACTIVE SPIRITS ({activeSpirits.length})
          </h2>
          <button onClick={onClose} style={{ fontSize: "1.8rem", background: "none", border: "none", color: "#94a3b8" }}>✕</button>
        </div>

        {activeSpirits.length > 0 && (
          <button 
            onClick={advanceSolarPhase}
            style={{ width: "100%", padding: "14px", marginBottom: "20px", background: "#7c3aed", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold" }}
          >
            🌞 Avancer Phase Solaire
          </button>
        )}

        {activeSpirits.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 20px", color: "#94a3b8" }}>
            Aucun esprit actif.
          </div>
        ) : (
          activeSpirits.map((spirit: SummonedSpirit) => {
            const maxCM = 8 + Math.ceil(spirit.force / 2);

            return (
              <div key={spirit.id} style={{ background: "#1e2937", padding: "18px", borderRadius: "12px", marginBottom: "16px" }}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <strong style={{ color: "#c084fc", fontSize: "1.4rem" }}>{spirit.element}</strong>{" "}
                    <span style={{ color: "#67e8f9" }}>Force {spirit.force}</span>
                  </div>
                  
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button 
                      onClick={() => onViewSpirit(spirit)}
                      style={{ padding: "8px 16px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
                    >
                      📋 Fiche Détail
                    </button>
                    <button 
                      onClick={() => deleteSpirit(spirit.id)}
                      style={{ padding: "8px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
                    >
                      🗑
                    </button>
                  </div>
                </div>

                {/* Services */}
                <div style={{ background: "#334155", padding: "12px", borderRadius: "8px", marginBottom: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span>🛡️ Services</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <button onClick={() => changeServices(spirit.id, -1)} style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#1e2937" }}>-</button>
                      <strong style={{ fontSize: "2rem", color: "#67e8f9" }}>{spirit.servicesRemaining}</strong>
                      <button onClick={() => changeServices(spirit.id, 1)} style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#1e2937" }}>+</button>
                    </div>
                  </div>
                </div>

                {/* Condition Monitor */}
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ marginBottom: "6px", color: "#94a3b8" }}>Condition Monitor</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {Array.from({ length: maxCM }).map((_, i) => (
                      <div
                        key={i}
                        onClick={() => changeCondition(spirit.id, i + 1 === spirit.conditionDamage ? Math.max(0, spirit.conditionDamage - 1) : i + 1)}
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

                <div>Solar Tokens: <strong>{spirit.solarTokens}/2</strong></div>
              </div>
            );
          })
        )}

        <button onClick={onClose} style={{ width: "100%", padding: "14px", marginTop: "20px", background: "#64748b", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold" }}>
          Close
        </button>
      </div>
    </div>
  );
}