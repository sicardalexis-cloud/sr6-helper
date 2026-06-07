// src/components/ActiveSpellsModal.tsx
import React from "react";

interface ActiveSpell {
  id: string;
  name: string;
  frenchName?: string;
  type: string;
  drain: number;
  sustained: boolean;
  duration?: string;
  hits?: number;           // ← Ajouté pour afficher les succès
  castBySpirit?: boolean;  // ← Ajouté pour les sorts lancés par esprit via la routine magique
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeSpells: ActiveSpell[];
  update: (fn: (draft: any) => void) => void;
}

export default function ActiveSpellsModal({ 
  isOpen, 
  onClose, 
  activeSpells = [], 
  update 
}: Props) {

  if (!isOpen) return null;

  const dropSpell = (id: string) => {
    update((draft: any) => {
      if (!draft.activeSpells) draft.activeSpells = [];
      draft.activeSpells = draft.activeSpells.filter((s: any) => s.id !== id);
    });
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 2000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "10px"
    }}>
      <div style={{
        background: "#0f172a", width: "100%", maxWidth: "720px", borderRadius: "16px",
        border: "2px solid #c084fc", padding: "24px", maxHeight: "90vh", overflow: "auto"
      }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>ACTIVE SPELLS ({activeSpells.length})</h2>
          <button onClick={onClose} style={{ fontSize: "1.8rem", background: "none", border: "none", color: "#94a3b8" }}>✕</button>
        </div>

        {activeSpells.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8", fontStyle: "italic" }}>
            No sustained spells active
          </div>
        ) : (
          activeSpells.map((spell) => (
            <div key={spell.id} style={{
              background: "#1e2937",
              padding: "16px",
              borderRadius: "12px",
              marginBottom: "12px",
              border: "1px solid #334155"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ color: "#c084fc", fontSize: "1.25rem" }}>{spell.name}</strong>
                  {spell.frenchName && <div style={{ color: "#94a3b8" }}>{spell.frenchName}</div>}
                  
                  {/* Affichage des succès */}
                  {spell.hits !== undefined && (
                    <div style={{ marginTop: "8px", color: "#22c55e", fontWeight: "bold", fontSize: "1.1rem" }}>
                      🎯 {spell.hits} succès
                    </div>
                  )}

                  {/* Info si le sort a été lancé par un esprit pendant la routine */}
                  {spell.castBySpirit && (
                    <div style={{ marginTop: "4px", color: "#eab308", fontSize: "0.85rem" }}>
                      🌟 Lancé / maintenu par un esprit
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => dropSpell(spell.id)}
                  style={{ 
                    padding: "8px 16px", 
                    background: "#ef4444", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "6px", 
                    cursor: "pointer" 
                  }}
                >
                  Drop Spell
                </button>
              </div>
            </div>
          ))
        )}

        <button onClick={onClose} style={{ width: "100%", padding: "16px", marginTop: "20px", background: "#64748b", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold" }}>
          Close
        </button>
      </div>
    </div>
  );
}