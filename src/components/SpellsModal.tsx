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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);

  // Charger les sorts connus
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
      if (!draft.knownSpells.includes(spell.id)) {
        draft.knownSpells.push(spell.id);
      }
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
    .filter(spell => !knownSpells.some(s => s.id === spell.id))
    .filter(spell =>
      spell.frenchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spell.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#0f172a", width: "95%", maxWidth: "1100px", height: "92vh",
        borderRadius: "16px", border: "2px solid #67e8f9", overflow: "hidden",
        display: "flex", flexDirection: "column"
      }}>
        
        {/* HEADER */}
        <div style={{ padding: "16px 24px", background: "#1e2937", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: "#67e8f9", margin: 0 }}>📜 Sorts & Grimoire</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#f87171", fontSize: "1.8rem", cursor: "pointer" }}>
            ✕
          </button>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          
          {/* SORTS CONNUS */}
          <div style={{ width: "28%", borderRight: "1px solid #334155", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "12px", background: "#1e2937", textAlign: "center", fontWeight: "bold", color: "#c084fc" }}>
              Sorts Connus ({knownSpells.length})
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {knownSpells.map(spell => (
                <div key={spell.id} style={{
                  background: "#1e2937", padding: "12px", borderRadius: "8px",
                  border: "1px solid #c084fc", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center"
                }}
                  onClick={() => setSelectedSpell(spell)}
                >
                  <span style={{ color: "#e0f2fe" }}>{spell.frenchName}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeSpell(spell.id); }}
                    style={{ background: "none", border: "none", color: "#f87171", fontSize: "1.3rem", cursor: "pointer" }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {knownSpells.length === 0 && (
                <div style={{ color: "#64748b", textAlign: "center", padding: "40px 20px" }}>
                  Aucun sort appris
                </div>
              )}
            </div>
          </div>

          {/* SORTS DISPONIBLES - ultra minimal */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "12px", background: "#1e2937" }}>
              <input
                type="text"
                placeholder="Rechercher un sort..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px", background: "#334155", border: "none",
                  borderRadius: "8px", color: "white", fontSize: "1rem"
                }}
              />
            </div>

            <div style={{
              flex: 1, overflowY: "auto", padding: "12px",
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "6px"
            }}>
              {availableSpells.map(spell => (
                <div
                  key={spell.id}
                  onClick={() => addSpell(spell)}
                  style={{
                    background: "#1e2937",
                    padding: "14px 8px",
                    borderRadius: "8px",
                    border: "1px solid #334155",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    minHeight: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontSize: "0.85rem",
                    color: "#e0f2fe",
                    fontWeight: "500"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "#67e8f9";
                    e.currentTarget.style.backgroundColor = "#25344a";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "#334155";
                    e.currentTarget.style.backgroundColor = "#1e2937";
                  }}
                >
                  {spell.frenchName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}