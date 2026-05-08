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
    <div style={{ marginBottom: "16px", background: "#1e2937", padding: "14px", borderRadius: "10px" }}>
      <div style={{ color: "#94a3b8", marginBottom: "10px", fontWeight: "500" }}>{label}</div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
        {dice.map((d, i) => (
          <div
            key={i}
            style={{
              width: "42px",
              height: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: d >= 5 ? "#22c55e" : "#475569",
              color: d >= 5 ? "#000" : "#fff",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1.1rem",
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
  const [showSpellList, setShowSpellList] = useState(true);

  const [castingPool, setCastingPool] = useState(10);
  const [drainResistance, setDrainResistance] = useState(6);
  const [manualDrain, setManualDrain] = useState(3);

  // ==================== AUTO-RETRY + GLITCH ====================
  const [desiredHits, setDesiredHits] = useState(3);
  const [autoRetry, setAutoRetry] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState(5);
  const [isRolling, setIsRolling] = useState(false);

  const [lastResult, setLastResult] = useState<any>(null);

  const knownSpells = char?.knownSpells
    ? char.knownSpells
        .map((id: string) => ALL_SPELLS.find((s) => s.id === id))
        .filter(Boolean) as Spell[]
    : [];

  const rollDice = (pool: number): number[] => 
    Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);

  const detectGlitch = (rolls: number[], hits: number) => {
    const ones = rolls.filter(d => d === 1).length;
    const total = rolls.length;
    return {
      glitch: ones >= Math.ceil(total / 2) && hits === 0,
      criticalGlitch: ones > total / 2,
    };
  };

  const countHits = (rolls: number[]) => rolls.filter((d) => d >= 5).length;

  const castSpell = () => {
    if (!selectedSpell) return;

    setIsRolling(true);
    let attemptsDone = 0;

    const tryCast = () => {
      attemptsDone++;

      const spellRolls = rollDice(castingPool);
      const drainRolls = rollDice(drainResistance);

      const spellHits = countHits(spellRolls);
      const drainHits = countHits(drainRolls);
      const glitchInfo = detectGlitch(spellRolls, spellHits);

      const finalDrain = Math.max(0, manualDrain - drainHits);

      const currentResult = {
        spellHits,
        finalDrain,
        attempts: attemptsDone,
        spellRolls,
        drainRolls,
        glitch: glitchInfo.glitch,
        criticalGlitch: glitchInfo.criticalGlitch,
      };

      if (glitchInfo.criticalGlitch || spellHits >= desiredHits || attemptsDone >= maxAttempts) {
        setLastResult(currentResult);
        setIsRolling(false);
        return;
      }

      if (autoRetry) {
        setTimeout(tryCast, 420);
      } else {
        setLastResult(currentResult);
        setIsRolling(false);
      }
    };

    tryCast();
  };

    const confirmCast = () => {
    if (!lastResult || !selectedSpell) return;

    update((draft: any) => {
      // 1. Appliquer le drain
      draft.drainStun = (draft.drainStun || 0) + lastResult.finalDrain;

      // 2. Ajouter le sort aux sorts actifs
      if (!draft.activeSpells) draft.activeSpells = [];

      const newActiveSpell = {
        id: `spell_${Date.now()}`,
        name: selectedSpell.name,
        frenchName: selectedSpell.frenchName,
        type: selectedSpell.type,
        drain: parseInt(selectedSpell.drain) || 3,
        sustained: true,
        duration: selectedSpell.duration || "Sustained",
        hits: lastResult.spellHits,           // ← Nombre de succès enregistré
      };

      draft.activeSpells.push(newActiveSpell);
    });

    // Reset l'interface après confirmation
    setLastResult(null);
    // setSelectedSpell(null);   // Décommente si tu veux revenir automatiquement à la liste des sorts
  };

  const toggleSpellList = () => {
    if (selectedSpell) setShowSpellList(!showSpellList);
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

        <div style={{ display: "flex", flex: 1, overflow: "hidden", flexDirection: "column" }}>
          
          {/* LISTE DES SORTS */}
          {showSpellList && (
            <div style={{ borderBottom: "1px solid #334155", overflowY: "auto", padding: "16px", background: "#1a2338", maxHeight: "38vh" }}>
              <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>Known Spells</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {knownSpells.map((spell) => (
                  <div
                    key={spell.id}
                    onClick={() => { 
                      setSelectedSpell(spell); 
                      setManualDrain(parseInt(spell.drain) || 3);
                      setLastResult(null); 
                      if (selectedSpell?.id === spell.id) setShowSpellList(false);
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
          )}

          {/* ZONE DE CASTING */}
          <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
            {selectedSpell ? (
              <>
                <div onClick={toggleSpellList} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <h2 style={{ color: "#c084fc", margin: 0 }}>{selectedSpell.name}</h2>
                  <span style={{ color: "#67e8f9", fontSize: "1.4rem" }}>{showSpellList ? "▲" : "▼"}</span>
                </div>

                <p style={{ color: "#94a3b8", marginBottom: "20px" }}>{selectedSpell.frenchName}</p>

                {/* Spell Info */}
                <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap", color: "#cbd5e1", background: "#1e2937", padding: "12px 18px", borderRadius: "10px", border: "1px solid #334155" }}>
                  <div><strong>Type:</strong> {selectedSpell.type}</div>
                  <div><strong>Range:</strong> {selectedSpell.range}</div>
                  <div><strong>Duration:</strong> {selectedSpell.duration}</div>
                  <div><strong>Spell Drain:</strong> <span style={{ color: "#f87171", fontWeight: "bold" }}>{parseInt(selectedSpell.drain) || 3}</span></div>
                </div>

                {/* Description */}
                <div style={{ background: "#1e2937", padding: "20px", borderRadius: "10px", border: "1px solid #67e8f9", marginBottom: "24px", lineHeight: "1.65", color: "#e2e8f0", maxHeight: "32vh", overflowY: "auto" }}>
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
                    <input type="range" min="0" max="20" value={drainResistance} onChange={(e) => setDrainResistance(+e.target.value)} style={{ width: "100%" }} />
                  </div>
                  <div>
                    <label>Drain: <strong>{manualDrain}</strong></label>
                    <input type="range" min="0" max="12" value={manualDrain} onChange={(e) => setManualDrain(+e.target.value)} style={{ width: "100%" }} />
                  </div>
                </div>

                {/* Auto-retry section */}
                <div style={{ marginTop: "16px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                    <input type="checkbox" checked={autoRetry} onChange={(e) => setAutoRetry(e.target.checked)} />
                    <span>Enable Auto-retry</span>
                  </label>
                </div>

                {autoRetry && (
                  <>
                    <div style={{ marginTop: "12px" }}>
                      <label>Desired Hits: <strong>{desiredHits}</strong></label>
                      <input type="range" min="1" max="10" value={desiredHits} onChange={(e) => setDesiredHits(+e.target.value)} style={{ width: "100%" }} />
                    </div>
                    <div style={{ marginTop: "12px" }}>
                      <label>Maximum Attempts: <strong>{maxAttempts}</strong></label>
                      <input type="range" min="1" max="10" value={maxAttempts} onChange={(e) => setMaxAttempts(+e.target.value)} style={{ width: "100%" }} />
                    </div>
                  </>
                )}

                <button 
                  onClick={castSpell}
                  disabled={isRolling || !selectedSpell}
                  style={{
                    width: "100%",
                    marginTop: "28px",
                    padding: "16px",
                    background: isRolling ? "#64748b" : "#22d3ee",
                    color: "#0f172a",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    border: "none",
                    borderRadius: "10px",
                    cursor: isRolling ? "not-allowed" : "pointer"
                  }}
                >
                  {isRolling ? "🎲 Casting in progress..." : "🎲 Cast Spell"}
                </button>

                {/* Dice + Results */}
                {lastResult && (
                  <>
                    <DiceDisplay dice={lastResult.spellRolls} label="🎲 Spell Roll" />
                    <DiceDisplay dice={lastResult.drainRolls} label="🛡️ Drain Resistance" />
                  </>
                )}

                {lastResult && (
                  <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px", marginTop: "20px" }}>
                    <h3 style={{ textAlign: "center", color: "#67e8f9" }}>
                      {lastResult.attempts} attempt{lastResult.attempts > 1 ? "s" : ""}
                    </h3>

                    {lastResult.criticalGlitch && (
                      <div style={{ background: "#7f1d1d", color: "#fca5a5", padding: "18px", borderRadius: "10px", textAlign: "center", fontWeight: "bold", margin: "16px 0", border: "2px solid #ef4444" }}>
                        ⚠️ CRITICAL GLITCH ⚠️<br />The spell went wrong!
                      </div>
                    )}

                    {lastResult.glitch && !lastResult.criticalGlitch && (
                      <div style={{ background: "#78350f", color: "#fbbf24", padding: "12px", borderRadius: "10px", textAlign: "center", margin: "12px 0" }}>
                        ⚠️ Glitch detected on the roll
                      </div>
                    )}

                    <div style={{ textAlign: "center", fontSize: "1.6rem", margin: "20px 0" }}>
                      Hits : <strong style={{ color: "#22c55e" }}>{lastResult.spellHits}</strong> / {desiredHits}
                    </div>
                    <div style={{ textAlign: "center", color: "#f87171", fontSize: "1.2rem" }}>
                      Final Drain : <strong>{lastResult.finalDrain}</strong>
                    </div>
                  </div>
                )}

                {lastResult && (
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
                    Confirm Cast — Take <strong>{lastResult.finalDrain}</strong> Drain
                  </button>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center", color: "#64748b", marginTop: "100px" }}>
                Select a spell to cast
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}