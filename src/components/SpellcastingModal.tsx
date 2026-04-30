// src/components/SpellcastingModal.tsx
import React, { useState } from "react";
import { ALL_SPELLS, Spell } from "../data/spells";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function SpellcastingModal({ isOpen, onClose, char, update }: Props) {
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [castingPool, setCastingPool] = useState(8);
  const [drainResistance, setDrainResistance] = useState(6);
  const [spellDrain, setSpellDrain] = useState(3);
  const [lastResult, setLastResult] = useState<any>(null);

  const knownSpells = char?.knownSpells
    ? char.knownSpells
        .map((id: string) => ALL_SPELLS.find((s) => s.id === id))
        .filter(Boolean) as Spell[]
    : [];

  const rollDice = (pool: number) =>
    Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);

  const countHits = (rolls: number[]) => rolls.filter((d) => d >= 5).length;

  const castSpell = () => {
    if (!selectedSpell) return;

    const spellPool = castingPool;
    const resistancePool = drainResistance;
    const baseDrain = parseInt(selectedSpell.drain.replace("F", "0")) || 3;

    const spellRolls = rollDice(spellPool);
    const resistanceRolls = rollDice(resistancePool);

    const hits = countHits(spellRolls);
    const resisted = countHits(resistanceRolls);
    const netHits = Math.max(0, hits - resisted);
    const totalDrain = Math.max(1, baseDrain + netHits - resisted);

    setLastResult({
      netHits,
      totalDrain,
      spellRolls,
      resistanceRolls,
    });
  };

  const confirmCast = () => {
    if (!lastResult || !selectedSpell) return;

    update((draft: any) => {
      draft.drainStun = (draft.drainStun || 0) + lastResult.totalDrain;
    });

    setLastResult(null);
    // Le sort reste sélectionné (comme demandé précédemment)
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 2000,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#0f172a", width: "95%", maxWidth: "1000px", height: "90vh",
        borderRadius: "16px", border: "2px solid #c084fc", overflow: "hidden",
        display: "flex", flexDirection: "column"
      }}>
        
        {/* HEADER */}
        <div style={{ padding: "16px 24px", background: "#1e2937", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>⚡ Spellcasting</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#f87171", fontSize: "1.8rem", cursor: "pointer" }}>
            ✕
          </button>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          
          {/* LISTE DES SORTS CONNUS (Pills) */}
          <div style={{ width: "280px", borderRight: "1px solid #334155", overflowY: "auto", padding: "16px", background: "#1a2338" }}>
            <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>Sorts Connus</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {knownSpells.map((spell) => (
                <div
                  key={spell.id}
                  onClick={() => setSelectedSpell(spell)}
                  style={{
                    padding: "12px 14px",
                    background: selectedSpell?.id === spell.id ? "#334155" : "#1e2937",
                    border: selectedSpell?.id === spell.id ? "2px solid #c084fc" : "1px solid #475569",
                    borderRadius: "10px",
                    cursor: "pointer",
                    color: "#e0f2fe",
                    fontWeight: selectedSpell?.id === spell.id ? "bold" : "normal",
                  }}
                >
                  {spell.frenchName}
                </div>
              ))}
            </div>
          </div>

          {/* ZONE DE CONFIGURATION + DESCRIPTION */}
          <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
            
            {selectedSpell ? (
              <>
                <h2 style={{ color: "#c084fc", marginBottom: "8px" }}>{selectedSpell.frenchName}</h2>
                
                {/* Infos techniques */}
                <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
                  <div><strong>Type :</strong> {selectedSpell.type}</div>
                  <div><strong>Portée :</strong> {selectedSpell.range}</div>
                  <div><strong>Durée :</strong> {selectedSpell.duration}</div>
                  <div><strong>Drain :</strong> {selectedSpell.drain}</div>
                </div>

                {/* DESCRIPTION */}
                {selectedSpell.description && selectedSpell.description.length > 0 ? (
                  <div style={{
                    background: "#1e2937",
                    padding: "18px",
                    borderRadius: "10px",
                    border: "1px solid #67e8f9",
                    marginBottom: "24px",
                    lineHeight: "1.6",
                    color: "#cbd5e1"
                  }}>
                    {selectedSpell.description}
                  </div>
                ) : (
                  <div style={{ color: "#64748b", fontStyle: "italic", marginBottom: "24px" }}>
                    Aucune description disponible pour ce sort.
                  </div>
                )}

                {/* SLIDERS */}
                <h3 style={{ color: "#67e8f9", margin: "20px 0 12px" }}>Paramètres de Lancement</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                  <div>
                    <label>Casting Pool : <strong>{castingPool}</strong></label>
                    <input type="range" min="1" max="20" value={castingPool} onChange={(e) => setCastingPool(+e.target.value)} style={{ width: "100%" }} />
                  </div>
                  <div>
                    <label>Résistance Drain : <strong>{drainResistance}</strong></label>
                    <input type="range" min="1" max="20" value={drainResistance} onChange={(e) => setDrainResistance(+e.target.value)} style={{ width: "100%" }} />
                  </div>
                  <div>
                    <label>Drain de base : <strong>{spellDrain}</strong></label>
                    <input type="range" min="0" max="12" value={spellDrain} onChange={(e) => setSpellDrain(+e.target.value)} style={{ width: "100%" }} />
                  </div>
                </div>

                {/* BOUTONS */}
                <div style={{ marginTop: "30px", display: "flex", gap: "12px" }}>
                  <button onClick={castSpell} style={{ flex: 1, padding: "14px", background: "#22d3ee", color: "#000", fontWeight: "bold", border: "none", borderRadius: "10px" }}>
                    🎲 Lancer le sort
                  </button>
                  {lastResult && (
                    <button onClick={confirmCast} style={{ flex: 1, padding: "14px", background: "#c084fc", color: "#000", fontWeight: "bold", border: "none", borderRadius: "10px" }}>
                      ✅ Confirmer ({lastResult.totalDrain} Drain)
                    </button>
                  )}
                </div>

                {/* RÉSULTAT */}
                {lastResult && (
                  <div style={{ marginTop: "20px", padding: "16px", background: "#1e2937", borderRadius: "10px", border: "1px solid #67e8f9" }}>
                    <strong>Succès nets :</strong> {lastResult.netHits}<br />
                    <strong>Drain total :</strong> <span style={{ color: "#f87171" }}>{lastResult.totalDrain}</span>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center", color: "#64748b", marginTop: "80px" }}>
                Sélectionne un sort à gauche pour lancer
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}