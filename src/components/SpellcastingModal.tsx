// src/components/SpellcastingModal.tsx
import React, { useState } from "react";
import { ALL_SPELLS, Spell } from "../data/spells";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  char: any;
  update: (fn: (draft: any) => void) => void;
}

const DiceDisplay = ({ dice, label }: { dice: number[]; label: string }) => {
  const hits = dice.filter((d) => d >= 5).length;
  return (
    <div style={{ 
      marginBottom: "16px", 
      background: "#1e2937", 
      padding: "14px", 
      borderRadius: "10px",
      width: "100%"
    }}>
      <div style={{ color: "#94a3b8", marginBottom: "10px", fontWeight: "500" }}>{label}</div>
      <div style={{ 
        display: "flex", 
        gap: "6px", 
        flexWrap: "wrap", 
        marginBottom: "8px",
        justifyContent: "center"
      }}>
        {dice.map((d, i) => (
          <div
            key={i}
            style={{
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: d >= 5 ? "#22c55e" : "#475569",
              color: d >= 5 ? "#000" : "#fff",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1.05rem",
              border: "2px solid #334155",
            }}
          >
            {d}
          </div>
        ))}
      </div>
      <small style={{ color: "#67e8f9" }}>{hits} hits</small>
    </div>
  );
};

export default function SpellcastingModal({ isOpen, onClose, char, update }: Props) {
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [castingPool, setCastingPool] = useState(10);
  const [drainResistance, setDrainResistance] = useState(6);
  const [baseDrain, setBaseDrain] = useState(3);
  const [lastResult, setLastResult] = useState<any>(null);

  const knownSpells = char?.knownSpells
    ? char.knownSpells
        .map((id: string) => ALL_SPELLS.find((s) => s.id === id))
        .filter(Boolean) as Spell[]
    : [];

  const rollDice = (pool: number): number[] =>
    Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);

  const countHits = (rolls: number[]) => rolls.filter((d) => d >= 5).length;

  const castSpell = () => {
    if (!selectedSpell) return;

    const spellRolls = rollDice(castingPool);
    const drainRolls = rollDice(drainResistance);

    const spellHits = countHits(spellRolls);
    const drainHits = countHits(drainRolls);

    const finalDrain = Math.max(0, baseDrain - drainHits);

    let message = "";
    if (spellHits >= 4) message = "Outstanding success! The spell is extremely powerful.";
    else if (spellHits >= 3) message = "Strong success.";
    else if (spellHits >= 2) message = "Good success.";
    else if (spellHits === 1) message = "Partial success.";
    else message = "The spell failed or had minimal effect.";

    setLastResult({
      spellHits,
      drainHits,
      finalDrain,
      spellRolls,
      drainRolls,
      message,
    });
  };

  const confirmCast = () => {
    if (!lastResult || !selectedSpell) return;

    update((draft: any) => {
      draft.drainStun = (draft.drainStun || 0) + lastResult.finalDrain;
    });

    setLastResult(null);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 2000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "8px"
    }}>
      <div style={{
        background: "#0f172a", width: "100%", maxWidth: "1100px", height: "94vh",
        borderRadius: "16px", border: "2px solid #c084fc", overflow: "hidden",
        display: "flex", flexDirection: "column"
      }}>
        
        {/* HEADER */}
        <div style={{ padding: "14px 20px", background: "#1e2937", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: "#c084fc", margin: 0, fontSize: "1.35rem" }}>⚡ Spellcasting</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#f87171", fontSize: "1.8rem", cursor: "pointer" }}>
            ✕
          </button>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden", flexDirection: window.innerWidth < 768 ? "column" : "row" }}>
          
          {/* KNOWN SPELLS - Responsive */}
          <div style={{ 
            width: window.innerWidth < 768 ? "100%" : "260px", 
            borderRight: window.innerWidth < 768 ? "none" : "1px solid #334155", 
            borderBottom: window.innerWidth < 768 ? "1px solid #334155" : "none",
            overflowY: "auto", 
            padding: "16px", 
            background: "#1a2338",
            maxHeight: window.innerWidth < 768 ? "35vh" : "none"
          }}>
            <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>Known Spells</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {knownSpells.map((spell) => (
                <div
                  key={spell.id}
                  onClick={() => { 
                    setSelectedSpell(spell); 
                    setBaseDrain(parseInt(spell.drain) || 3);
                    setLastResult(null); 
                  }}
                  style={{
                    padding: "12px 14px",
                    background: selectedSpell?.id === spell.id ? "#334155" : "#1e2937",
                    border: selectedSpell?.id === spell.id ? "2px solid #c084fc" : "1px solid #475569",
                    borderRadius: "10px",
                    cursor: "pointer",
                    color: "#e0f2fe",
                  }}
                >
                  {spell.name}
                </div>
              ))}
            </div>
          </div>

          {/* MAIN CASTING AREA */}
          <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
            {selectedSpell ? (
              <>
                <h2 style={{ color: "#c084fc", marginBottom: "6px" }}>{selectedSpell.name}</h2>
                <p style={{ color: "#94a3b8", marginBottom: "18px" }}>{selectedSpell.frenchName}</p>

                {/* Spell Info */}
                <div style={{ 
                  display: "flex", 
                  gap: "16px", 
                  marginBottom: "20px", 
                  flexWrap: "wrap", 
                  color: "#cbd5e1",
                  background: "#1e2937",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid #334155",
                  fontSize: "0.95rem"
                }}>
                  <div><strong>Type:</strong> {selectedSpell.type}</div>
                  <div><strong>Range:</strong> {selectedSpell.range}</div>
                  <div><strong>Duration:</strong> {selectedSpell.duration}</div>
                  <div><strong>Base Drain:</strong> <span style={{ color: "#f87171", fontWeight: "bold" }}>{baseDrain}</span></div>
                </div>

                {/* Description */}
                <div style={{
                  background: "#1e2937",
                  padding: "18px",
                  borderRadius: "10px",
                  border: "1px solid #67e8f9",
                  marginBottom: "24px",
                  lineHeight: "1.6",
                  color: "#e2e8f0",
                  maxHeight: "28vh",
                  overflowY: "auto"
                }}>
                  {selectedSpell.description || "No detailed description available."}
                </div>

                {/* Sliders */}
                <h3 style={{ color: "#67e8f9", margin: "20px 0 12px" }}>Casting Parameters</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                  <div>
                    <label>Casting Pool: <strong>{castingPool}</strong></label>
                    <input type="range" min="1" max="20" value={castingPool} onChange={(e) => setCastingPool(+e.target.value)} style={{ width: "100%" }} />
                  </div>
                  <div>
                    <label>Drain Resistance: <strong>{drainResistance}</strong></label>
                    <input type="range" min="1" max="20" value={drainResistance} onChange={(e) => setDrainResistance(+e.target.value)} style={{ width: "100%" }} />
                  </div>
                  <div>
                    <label>Base Drain: <strong>{baseDrain}</strong></label>
                    <input type="range" min="1" max="12" value={baseDrain} onChange={(e) => setBaseDrain(+e.target.value)} style={{ width: "100%" }} />
                  </div>
                </div>

                <button 
                  onClick={castSpell}
                  style={{
                    width: "100%",
                    marginTop: "24px",
                    padding: "16px",
                    background: "#22d3ee",
                    color: "#0f172a",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer"
                  }}
                >
                  🎲 Cast Spell
                </button>

                {/* Results */}
                {lastResult && (
                  <div style={{ marginTop: "24px", padding: "20px", background: "#1e2937", borderRadius: "12px", border: "2px solid #67e8f9" }}>
                    <h4 style={{ color: "#67e8f9", marginBottom: "16px" }}>Casting Result</h4>
                    
                    <DiceDisplay dice={lastResult.spellRolls} label="🎲 Spellcasting Roll" />
                    <DiceDisplay dice={lastResult.drainRolls} label="🛡️ Drain Resistance Roll" />

                    <div style={{ marginTop: "20px", textAlign: "center", padding: "16px", background: "#0f172a", borderRadius: "10px" }}>
                      <div style={{ fontSize: "1.7rem" }}>
                        Hits: <strong style={{ color: "#22c55e" }}>{lastResult.spellHits}</strong>
                      </div>
                      <div style={{ fontSize: "1.3rem", color: "#f87171", marginTop: "8px" }}>
                        Final Drain: <strong>{lastResult.finalDrain}</strong>
                      </div>
                    </div>

                    <button 
                      onClick={confirmCast}
                      style={{
                        marginTop: "20px",
                        width: "100%",
                        padding: "16px",
                        background: "#c084fc",
                        color: "#0f172a",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer"
                      }}
                    >
                      Confirm Cast — Take {lastResult.finalDrain} Drain
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center", color: "#64748b", marginTop: "80px" }}>
                Select a spell on the left to cast
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}