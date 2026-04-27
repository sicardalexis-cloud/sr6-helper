import React from "react";

interface ActiveSpirit {
  id: number;
  element: string;
  force: number;
  servicesRemaining: number;
  conditionDamage: number;
  invocationDate: string;
  solarPhase: "Jour" | "Nuit";
  solarTokens: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeSpirits: ActiveSpirit[];
  setActiveSpirits: (spirits: ActiveSpirit[]) => void;
  onViewSpirit: (spirit: ActiveSpirit) => void;
}

export default function SpiritsModal({ isOpen, onClose, activeSpirits, setActiveSpirits, onViewSpirit }: Props) {
  if (!isOpen) return null;

  const updateSpirit = (id: number, updater: (s: ActiveSpirit) => ActiveSpirit) => {
    setActiveSpirits(activeSpirits.map(s => s.id === id ? updater(s) : s));
  };

  const changeServices = (id: number, delta: number) => {
    updateSpirit(id, s => ({
      ...s,
      servicesRemaining: Math.max(0, Math.min(12, s.servicesRemaining + delta))
    }));
  };

  const changeCondition = (id: number, newDamage: number) => {
    updateSpirit(id, s => ({ ...s, conditionDamage: newDamage }));
  };

  const advanceSolarPhase = () => {
    const updated = activeSpirits
      .map(s => ({ ...s, solarTokens: Math.max(0, s.solarTokens - 1) }))
      .filter(s => s.solarTokens > 0);
    setActiveSpirits(updated);
  };

  return (
    <div style={{ 
      position: "fixed", 
      inset: 0, 
      background: "rgba(0,0,0,0.95)", 
      zIndex: 1000, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      <div style={{ 
        background: "#0f172a", 
        width: "94%", 
        maxWidth: "720px", 
        borderRadius: "16px", 
        padding: "20px", 
        border: "2px solid #c084fc", 
        maxHeight: "90vh", 
        overflow: "auto" 
      }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>ESPRITS ACTIFS ({activeSpirits.length})</h2>
          <button onClick={onClose} style={{ fontSize: "1.8rem", background: "none", border: "none", color: "#94a3b8" }}>✕</button>
        </div>

        {activeSpirits.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#94a3b8", fontSize: "1.1rem" }}>
            Aucun esprit actif pour le moment.<br/>
            Invoquez des esprits via le menu Summoning !
          </div>
        ) : (
          <>
            {/* Bouton Avancer Phase Solaire */}
            <button 
              onClick={advanceSolarPhase}
              style={{ 
                width: "100%", 
                padding: "14px", 
                marginBottom: "20px", 
                background: "#7c3aed", 
                color: "white", 
                border: "none", 
                borderRadius: "8px", 
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer"
              }}
            >
              🌞 Avancer Phase Solaire (Retire 1 token à tous les esprits)
            </button>

            {activeSpirits.map((spirit) => {
              const maxCM = 8 + Math.ceil(spirit.force / 2);
              return (
                <div key={spirit.id} style={{ 
                  background: "#1e2937", 
                  padding: "18px", 
                  borderRadius: "12px", 
                  marginBottom: "16px" 
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div>
                      <strong style={{ color: "#c084fc", fontSize: "1.35rem" }}>{spirit.element}</strong>{" "}
                      <span style={{ color: "#67e8f9" }}>Force {spirit.force}</span>
                    </div>
                    <button 
                      onClick={() => onViewSpirit(spirit)}
                      style={{ 
                        padding: "8px 16px", 
                        background: "#4f46e5", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "6px", 
                        cursor: "pointer",
                        fontWeight: "bold"
                      }}
                    >
                      Voir la Fiche
                    </button>
                  </div>

                  {/* Services Restants */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "12px 0" }}>
                    <span style={{ minWidth: "150px" }}>🛡️ Services restants :</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button 
                        onClick={() => changeServices(spirit.id, -1)}
                        style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#334155", color: "white", fontSize: "1.3rem" }}
                      >−</button>
                      <strong style={{ fontSize: "1.6rem", minWidth: "50px", textAlign: "center" }}>
                        {spirit.servicesRemaining}
                      </strong>
                      <button 
                        onClick={() => changeServices(spirit.id, 1)}
                        style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#334155", color: "white", fontSize: "1.3rem" }}
                      >+</button>
                    </div>
                  </div>

                  {/* Condition Monitor */}
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{ marginBottom: "6px", color: "#94a3b8" }}>Condition Monitor</div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {Array.from({ length: maxCM }).map((_, i) => (
                        <div
                          key={i}
                          onClick={() => changeCondition(spirit.id, i + 1 === spirit.conditionDamage ? Math.max(0, spirit.conditionDamage - 1) : i + 1)}
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "2px solid #475569",
                            borderRadius: "6px",
                            background: i < spirit.conditionDamage ? "#ef4444" : "#1e2937",
                            cursor: "pointer"
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                    Tokens Solaires : <strong>{spirit.solarTokens}/2</strong>
                  </div>
                </div>
              );
            })}
          </>
        )}

        <button 
          onClick={onClose} 
          style={{ 
            width: "100%", 
            padding: "14px", 
            marginTop: "10px", 
            background: "#64748b", 
            color: "white", 
            border: "none", 
            borderRadius: "8px", 
            cursor: "pointer", 
            fontWeight: "bold" 
          }}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}