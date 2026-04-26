import React from "react";

interface Spirit {
  id: number;
  element: string;
  force: number;
  servicesRemaining: number;
  conditionDamage: number;
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

  const renderConditionMonitor = (spirit: Spirit) => {
    const maxBoxes = 8 + Math.ceil(spirit.force / 2);

    const handleBoxClick = (index: number) => {
      const current = spirit.conditionDamage;
      
      if (index + 1 === current) {
        // Clique sur une case pleine → la vide (et celles après)
        updateSpirit(spirit.id, { conditionDamage: index });
      } else {
        // Clique sur une case vide ou avant → remplit jusqu'à cette case
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
              width: "28px",
              height: "28px",
              background: i < spirit.conditionDamage ? "#f87171" : "#1e2937",
              border: "2px solid #64748b",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: i < spirit.conditionDamage ? "0 0 8px #f87171" : "none"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.95)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#0f172a",
        width: "94%",
        maxWidth: "560px",
        borderRadius: "16px",
        padding: "20px",
        border: "2px solid #a855f7",
        maxHeight: "90vh",
        overflow: "auto"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>ACTIVE SPIRITS</h2>
          <button onClick={onClose} style={{ fontSize: "1.8rem", background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>✕</button>
        </div>

        {activeSpirits.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#94a3b8", fontSize: "1.1rem" }}>
            Aucun esprit actif pour le moment.<br/>
            Invoquez des esprits via le menu Summoning !
          </div>
        ) : (
          activeSpirits.map((spirit) => (
            <div key={spirit.id} style={{
              background: "#1e2937",
              padding: "18px",
              borderRadius: "12px",
              marginBottom: "16px",
              borderLeft: "5px solid #c084fc"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: "bold", color: "#c084fc", fontSize: "1.2rem" }}>
                    {spirit.element} (Force {spirit.force})
                  </div>
                  <div style={{ color: "#94a3b8", marginTop: "4px" }}>
                    Services restants
                  </div>
                </div>

                {/* Services +/- */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button 
                    onClick={() => updateSpirit(spirit.id, { servicesRemaining: Math.max(0, spirit.servicesRemaining - 1) })}
                    style={{ width: "36px", height: "36px", background: "#334155", color: "white", border: "none", borderRadius: "50%", fontSize: "1.4rem", cursor: "pointer" }}
                  >−</button>
                  <span style={{ fontSize: "1.4rem", fontWeight: "bold", minWidth: "36px", textAlign: "center" }}>
                    {spirit.servicesRemaining}
                  </span>
                  <button 
                    onClick={() => updateSpirit(spirit.id, { servicesRemaining: spirit.servicesRemaining + 1 })}
                    style={{ width: "36px", height: "36px", background: "#334155", color: "white", border: "none", borderRadius: "50%", fontSize: "1.4rem", cursor: "pointer" }}
                  >+</button>
                </div>
              </div>

              {/* Condition Monitor */}
              <div style={{ marginTop: "16px" }}>
                <div style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "8px" }}>Condition Monitor</div>
                {renderConditionMonitor(spirit)}
              </div>

              {/* Bouton supprimer */}
              <button 
                onClick={() => removeSpirit(spirit.id)}
                style={{ 
                  marginTop: "16px", 
                  width: "100%", 
                  padding: "10px", 
                  background: "#ef4444", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "8px", 
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Dismiss Spirit
              </button>
            </div>
          ))
        )}

        <button 
          onClick={onClose} 
          style={{ 
            width: "100%", 
            padding: "14px", 
            marginTop: "20px", 
            background: "transparent", 
            border: "2px solid #64748b", 
            color: "#94a3b8", 
            borderRadius: "8px", 
            cursor: "pointer" 
          }}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}