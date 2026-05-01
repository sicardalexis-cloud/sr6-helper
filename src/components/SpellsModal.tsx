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
  const [knownSpellIds, setKnownSpellIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);

  // Charger les sorts connus
  useEffect(() => {
    if (char?.knownSpells) {
      setKnownSpellIds(char.knownSpells);
    }
  }, [char?.knownSpells]);

  const toggleSpell = (spell: Spell) => {
    const isKnown = knownSpellIds.includes(spell.id);

    update((draft: any) => {
      if (!draft.knownSpells) draft.knownSpells = [];
      
      if (isKnown) {
        // Retirer
        draft.knownSpells = draft.knownSpells.filter((id: string) => id !== spell.id);
      } else {
        // Ajouter
        if (!draft.knownSpells.includes(spell.id)) {
          draft.knownSpells.push(spell.id);
        }
      }
    });

    setSelectedSpell(spell);
  };

  const filteredSpells = ALL_SPELLS
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
          <h2 style={{ color: "#67e8f9", margin: 0 }}>📜 Spell Grimoire</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#f87171", fontSize: "1.8rem", cursor: "pointer" }}>
            ✕
          </button>
        </div>

        <div style={{ padding: "12px", background: "#1e2937" }}>
          <input
            type="text"
            placeholder="Search spells..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%", padding: "12px 16px", background: "#334155", border: "none",
              borderRadius: "8px", color: "white", fontSize: "1rem"
            }}
          />
        </div>

        {/* GRILLE UNIQUE */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "16px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "10px"
        }}>
          {filteredSpells.map(spell => {
            const isKnown = knownSpellIds.includes(spell.id);
            return (
              <div
                key={spell.id}
                onClick={() => toggleSpell(spell)}
                style={{
                  background: isKnown ? "#1e3a2f" : "#1e2937",
                  padding: "16px 10px",
                  borderRadius: "10px",
                  border: isKnown ? "2px solid #22c55e" : "1px solid #334155",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  minHeight: "100px",
                  position: "relative"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = isKnown ? "#22c55e" : "#67e8f9";
                  e.currentTarget.style.backgroundColor = isKnown ? "#1e3a2f" : "#25344a";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = isKnown ? "#22c55e" : "#334155";
                  e.currentTarget.style.backgroundColor = isKnown ? "#1e3a2f" : "#1e2937";
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>
                  {isKnown ? "✅" : "📖"}
                </div>
                <div style={{ 
                  color: isKnown ? "#86efac" : "#e0f2fe", 
                  fontWeight: "600",
                  fontSize: "0.95rem"
                }}>
                  {spell.name}
                </div>
                <small style={{ color: "#94a3b8", marginTop: "4px" }}>{spell.frenchName}</small>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}