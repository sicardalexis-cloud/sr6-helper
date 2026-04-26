import React from "react";

interface Spirit {
  id: number;
  element: string;
  force: number;
  servicesRemaining: number;
  conditionDamage: number;
  invocationDate: string;
  solarPhase: "Jour" | "Nuit";
  solarTokens: number;        // ← Nouveau
  timestamp?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeSpirits: Spirit[];
  setActiveSpirits: React.Dispatch<React.SetStateAction<Spirit[]>>;
}

export default function SpiritsModal({ isOpen, onClose, activeSpirits, setActiveSpirits }: Props) {
  if (!isOpen) return null;

  const updateSpirit = (id: number, changes: Partial<Spirit>) => {
    setActiveSpirits(prev =>
      prev.map(spirit =>
        spirit.id === id ? { ...spirit, ...changes } : spirit
      )
    );
  };

  const removeSpirit = (id: number) => {
    setActiveSpirits(prev => prev.filter(spirit => spirit.id !== id));
  };

  // Bouton global : Avancer la phase solaire
  const advanceSolarPhase = () => {
    setActiveSpirits(prev => {
      return prev
        .map(spirit => ({
          ...spirit,
          solarTokens: Math.max(0, spirit.solarTokens - 1)
        }))
        .filter(spirit => spirit.solarTokens > 0); // Auto-dismiss si 0 tokens
    });
  };

  const renderConditionMonitor = (spirit: Spirit) => {
    const maxBoxes = 8 + Math.ceil(spirit.force / 2);

    const handleBoxClick = (index: number) => {
      const current = spirit.conditionDamage;
      if (index + 1 === current) {
        updateSpirit(spirit.id, { conditionDamage: index });
      } else {
        updateSpirit(spirit.id, { conditionDamage: index + 1 });
      }
    };

    return (
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center", marginTop: "12px" }}>
        {Array.from({ length: maxBoxes }).map((_, i) => (
          <div
            key={i}
            onClick={() => handleBoxClick(i)}
            style={{
              width: "28px", height: "28px",
              background: i < spirit.conditionDamage ? "#f87171" : "#1e2937",
              border: "2px solid #64748b",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#0f172a", width: "94%", maxWidth: "580px", borderRadius: "16px",
        padding: "20px", border: "2px solid #a855f7", maxHeight: "90vh", overflow: "auto"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>ACTIVE SPIRITS</h2>
          <button onClick={onClose} style={{ fontSize: "1.8rem", background: "none", border: "none", color: "#94a3b8" }}>✕</button>
        </div>

        {/* Bouton global Phase Solaire */}
        <button 
          onClick={advanceSolarPhase}
          style={{ 
            width: "100%", padding: "12px", marginBottom: "20px",
            background: "#6366f1", color: "white", border: "none", 
            borderRadius: "8px", fontWeight: "bold", cursor: "pointer"
          }}
        >
          🌗 Avancer Phase Solaire (-1 token à tous les esprits)
        </button>

        {activeSpirits.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#94a3b8" }}>
            Aucun esprit actif pour le moment.
          </div>
        ) : (
          activeSpirits.map((spirit) => (
            <div key={spirit.id} style={{
              background: "#1e2937", padding: "18px", borderRadius: "12px",
              marginBottom: "16px", borderLeft: "5px solid #c084fc"
            }}>
              <div style={{ fontWeight: "bold", color: "#c084fc", fontSize: "1.2rem" }}>
                {spirit.element} (Force {spirit.force})
              </div>

              <div style={{ color: "#94a3b8", fontSize: "0.95rem", margin: "8px 0" }}>
                📅 {new Date(spirit.invocationDate).toLocaleDateString('fr-FR')} • {spirit.solarPhase}
              </div>

              {/* Tokens Phase Solaire */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "12px 0" }}>
                <span style={{ color: "#94a3b8" }}>Tokens Phase Solaire :</span>
                <span style={{ fontSize: "1.4rem", fontWeight: "bold", color: spirit.solarTokens > 1 ? "#a5b4fc" : "#f87171" }}>
                  {spirit.solarTokens} / 2
                </span>
              </div>

              {/* Services */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                <div style={{ color: "#94a3b8" }}>Services restants</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button onClick={() => updateSpirit(spirit.id, { servicesRemaining: Math.max(0, spirit.servicesRemaining - 1) })}
                    style={{ width: "36px", height: "36px", background: "#334155", color: "white", border: "none", borderRadius: "50%", fontSize: "1.4rem" }}>−</button>
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold", minWidth: "40px", textAlign: "center" }}>
                    {spirit.servicesRemaining}
                  </span>
                  <button onClick={() => updateSpirit(spirit.id, { servicesRemaining: spirit.servicesRemaining + 1 })}
                    style={{ width: "36px", height: "36px", background: "#334155", color: "white", border: "none", borderRadius: "50%", fontSize: "1.4rem" }}>+</button>
                </div>
              </div>

              {/* Condition Monitor */}
              <div style={{ marginTop: "16px" }}>
                <div style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "8px" }}>Condition Monitor</div>
                {renderConditionMonitor(spirit)}
              </div>

              <button onClick={() => removeSpirit(spirit.id)}
                style={{ marginTop: "16px", width: "100%", padding: "12px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                Dismiss Spirit
              </button>
            </div>
          ))
        )}

        <button onClick={onClose} style={{ width: "100%", padding: "14px", marginTop: "20px", background: "transparent", border: "2px solid #64748b", color: "#94a3b8", borderRadius: "8px" }}>
          Fermer
        </button>
      </div>
    </div>
  );
}