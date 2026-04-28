// src/components/SpiritsModal.tsx
import React from "react";

interface ActiveSpirit {
  id: string;
  element: string;
  force: number;
  servicesRemaining: number;
  conditionDamage: number;
  invocationDate: string;
  solarPhase: "Day" | "Night";
  solarTokens: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeSpirits?: ActiveSpirit[];
  update: (fn: (draft: any) => void) => void;
  onViewSpirit: (spirit: ActiveSpirit) => void;
}

export default function SpiritsModal({ 
  isOpen, 
  onClose, 
  activeSpirits: rawSpirits = [], 
  update, 
  onViewSpirit 
}: Props) {

  const activeSpirits = Array.isArray(rawSpirits) ? rawSpirits : [];

  if (!isOpen) return null;

  const updateSpirit = (id: string, updates: Partial<ActiveSpirit>) => {
    update((draft: any) => {
      if (!draft.activeSpirits) return;
      const index = draft.activeSpirits.findIndex((s: ActiveSpirit) => s.id === id);
      if (index !== -1) {
        draft.activeSpirits[index] = { ...draft.activeSpirits[index], ...updates };
      }
    });
  };

  const deleteSpirit = (id: string) => {
    if (confirm("Supprimer cet esprit ?")) {
      update((draft: any) => {
        if (!draft.activeSpirits) return;
        draft.activeSpirits = draft.activeSpirits.filter((s: ActiveSpirit) => s.id !== id);
      });
    }
  };

  const advanceSolarPhase = () => {
    update((draft: any) => {
      if (!draft.activeSpirits || !Array.isArray(draft.activeSpirits)) return;

      draft.activeSpirits = draft.activeSpirits
        .map((spirit: ActiveSpirit) => ({           // ← corrigé
          ...spirit,
          solarTokens: Math.max(0, spirit.solarTokens - 1)
        }))
        .filter((spirit: ActiveSpirit) => spirit.solarTokens > 0);  // ← corrigé
    });
  };

  return (
    <div style={{ 
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "10px"
    }}>
      <div style={{ 
        background: "#0f172a", width: "100%", maxWidth: "720px", borderRadius: "16px",
        border: "2px solid #c084fc", padding: "20px", maxHeight: "90vh", overflow: "auto"
      }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>ACTIVE SPIRITS ({activeSpirits.length})</h2>
          <button onClick={onClose} style={{ fontSize: "1.8rem", background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>✕</button>
        </div>

        {activeSpirits.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 20px", color: "#94a3b8" }}>Aucun esprit invoqué pour le moment</div>
        ) : (
          activeSpirits.map((spirit) => {
            const maxCM = 8 + Math.ceil(spirit.force / 2);
            return (
              <div key={spirit.id} style={{ background: "#1e2937", padding: "16px", borderRadius: "12px", marginBottom: "12px", border: "1px solid #334155" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <strong style={{ color: "#c084fc", fontSize: "1.4rem" }}>{spirit.element}</strong>{" "}
                    <span style={{ color: "#67e8f9" }}>Force {spirit.force}</span>
                  </div>
                  <button onClick={() => onViewSpirit(spirit)} style={{ padding: "8px 16px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
                    Fiche Détail
                  </button>
                </div>

                <div style={{ display: "flex", gap: "20px", marginBottom: "12px", color: "#94a3b8" }}>
                  <div>Services : <strong>{spirit.servicesRemaining}</strong></div>
                  <div>Solar Tokens : <strong>{spirit.solarTokens}/2</strong></div>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <div style={{ color: "#94a3b8", marginBottom: "6px" }}>Condition Monitor</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {Array.from({ length: maxCM }).map((_, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          const newDamage = i + 1 === spirit.conditionDamage ? Math.max(0, spirit.conditionDamage - 1) : i + 1;
                          updateSpirit(spirit.id, { conditionDamage: newDamage });
                        }}
                        style={{
                          width: "28px", height: "28px", border: "2px solid #475569",
                          borderRadius: "6px", background: i < spirit.conditionDamage ? "#ef4444" : "#1e2937",
                          cursor: "pointer"
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => updateSpirit(spirit.id, { servicesRemaining: Math.max(0, spirit.servicesRemaining - 1) })} style={{ flex: 1, padding: "8px", background: "#334155", border: "none", borderRadius: "6px", color: "white", cursor: "pointer" }}>− Service</button>
                  <button onClick={() => updateSpirit(spirit.id, { servicesRemaining: Math.min(12, spirit.servicesRemaining + 1) })} style={{ flex: 1, padding: "8px", background: "#334155", border: "none", borderRadius: "6px", color: "white", cursor: "pointer" }}>+ Service</button>
                  <button onClick={() => deleteSpirit(spirit.id)} style={{ padding: "8px 16px", background: "#ef4444", border: "none", borderRadius: "6px", color: "white", cursor: "pointer" }}>Supprimer</button>
                </div>
              </div>
            );
          })
        )}

        {activeSpirits.length > 0 && (
          <button 
            onClick={advanceSolarPhase}
            style={{ width: "100%", padding: "14px", marginTop: "16px", background: "#334155", color: "#94a3b8", border: "none", borderRadius: "8px", fontWeight: "bold" }}
          >
            Avancer Phase Solaire
          </button>
        )}

        <button onClick={onClose} style={{ width: "100%", padding: "14px", marginTop: "12px", background: "#64748b", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold" }}>
          Fermer
        </button>
      </div>
    </div>
  );
}