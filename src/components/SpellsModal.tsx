// src/components/SpellsModal.tsx
import React, { useState, useEffect } from "react";
import { ALL_SPELLS, Spell } from "../data/spells";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function SpellsModal({ isOpen, onClose, char, update }: Props) {
  const [knownSpells, setKnownSpells] = useState<Spell[]>([]);
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);

  useEffect(() => {
    if (char?.knownSpells) {
      const loaded = char.knownSpells
        .map((id: string) => ALL_SPELLS.find(s => s.id === id))
        .filter(Boolean) as Spell[];
      setKnownSpells(loaded);
    }
  }, [char?.knownSpells]);

  const addSpell = (spell: Spell) => {
    if (knownSpells.some(s => s.id === spell.id)) return;

    update((draft: any) => {
      if (!draft.knownSpells) draft.knownSpells = [];
      draft.knownSpells.push(spell.id);
    });

    setKnownSpells(prev => [...prev, spell]);
    setSelectedSpell(spell);
  };

  const removeSpell = (id: string) => {
    update((draft: any) => {
      if (draft.knownSpells) {
        draft.knownSpells = draft.knownSpells.filter((sId: string) => sId !== id);
      }
    });
    setKnownSpells(prev => prev.filter(s => s.id !== id));
    if (selectedSpell?.id === id) setSelectedSpell(null);
  };

  const availableSpells = ALL_SPELLS
    .filter(spell => !knownSpells.some(s => s.id === spell.id));

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.92)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#111827", border: "2px solid #c084fc",
        borderRadius: "16px", width: "94%", maxWidth: "1350px",
        height: "90vh", overflow: "hidden", display: "flex", flexDirection: "column"
      }}>
        {/* HEADER minimal */}
        <div style={{ padding: "10px 24px", borderBottom: "1px solid #334155", display: "flex", justifyContent: "flex-end" }}>
          <button 
            onClick={onClose} 
            style={{ background: "none", border: "none", color: "#f87171", fontSize: "2rem", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* GAUCHE : SORTS CONNUS */}
          <div style={{ width: "25%", padding: "20px", borderRight: "1px solid #334155", overflowY: "auto" }}>
            <h3 style={{ color: "#67e8f9", marginBottom: "16px" }}>
              📜 Sorts Connus ({knownSpells.length})
            </h3>

            {knownSpells.length === 0 ? (
              <p style={{ color: "#94a3b8", textAlign: "center", padding: "60px 20px", fontStyle: "italic" }}>
                Aucun sort appris pour le moment.
              </p>
            ) : (
              knownSpells.map(spell => (
                <div
                  key={spell.id}
                  onClick={() => setSelectedSpell(spell)}
                  style={{
                    padding: "12px 16px",
                    background: selectedSpell?.id === spell.id ? "#1e2937" : "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <strong>{spell.frenchName}</strong>
                    <div style={{ fontSize: "0.82rem", color: "#94a3b8" }}>{spell.name}</div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeSpell(spell.id); }}
                    style={{ color: "#f87171", background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer" }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {/* DROITE : SORTS DISPONIBLES (6 colonnes ultra-compactes) */}
          <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(6, 1fr)", 
              gap: "8px" 
            }}>
              {availableSpells.map(spell => (
                <div
                  key={spell.id}
                  onClick={() => addSpell(spell)}
                  style={{
                    padding: "8px 10px",           // largeur et hauteur très réduites
                    background: "#1e2937",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    minHeight: "52px",             // -30% environ
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = "#67e8f9"}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = "#334155"}
                >
                  <strong style={{ 
                    color: "#e0f2fe", 
                    fontSize: "0.92rem", 
                    lineHeight: "1.2",
                    display: "block"
                  }}>
                    {spell.frenchName}
                  </strong>
                  <div style={{ 
                    fontSize: "0.74rem", 
                    color: "#94a3b8", 
                    marginTop: "1px"
                  }}>
                    {spell.drain}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}