import React, { useState, useEffect } from "react";
import { ALL_SPELLS, Spell } from "../../data/spells";
import { SPIRIT_TYPES } from "../../data/spirits";            // Chemin corrigé

interface StepConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: any;
  index: number;
  onSave: (updatedStep: any) => void;
  knownSpells: string[];           // ← Correct (IDs)
}

export default function StepConfigModal({ 
  isOpen, 
  onClose, 
  step, 
  index, 
  onSave, 
  knownSpells 
}: StepConfigModalProps) {
  
  const [localStep, setLocalStep] = useState(step);

  useEffect(() => {
    if (step) setLocalStep(step);
  }, [step]);

  const updateSummon = (updates: any) => {
    setLocalStep((prev: any) => ({
      ...prev,
      summon: { ...prev.summon, ...updates }
    }));
  };

  const updateCast = (updates: any) => {
    setLocalStep((prev: any) => ({
      ...prev,
      cast: { ...prev.cast, ...updates }
    }));
  };

  const handleSave = () => {
    onSave(localStep);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{ 
      position: "fixed", 
      inset: 0, 
      background: "rgba(0,0,0,0.95)", 
      zIndex: 2600, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      <div style={{ 
        background: "#0f172a", 
        width: "90%", 
        maxWidth: "760px", 
        borderRadius: "16px", 
        border: "2px solid #c084fc", 
        padding: "24px",
        maxHeight: "90vh",
        overflowY: "auto"
      }}>
        <h3 style={{ color: "#c084fc", marginBottom: "20px" }}>
          Configure Step {index + 1} — {localStep?.type?.toUpperCase() || ""}
        </h3>

        {/* ==================== SUMMON ==================== */}
        {localStep?.type === "summon" && localStep.summon && (
          <div>
            <h4 style={{ color: "#67e8f9", marginBottom: "16px" }}>Summoning Configuration</h4>
            
            <div style={{ marginBottom: "16px" }}>
              <label>Spirit Type</label>
              <select 
                value={localStep.summon.spiritType || "fire"} 
                onChange={e => updateSummon({ spiritType: e.target.value })} 
                style={{ width: "100%", padding: "10px", background: "#1e2937", color: "white", borderRadius: "6px" }}
              >
                {SPIRIT_TYPES.map(s => (
                  <option key={s.type} value={s.type}>{s.label}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label>Force : <strong>{localStep.summon.force || 4}</strong></label>
              <input 
                type="range" 
                min="1" 
                max="12" 
                value={localStep.summon.force || 4} 
                onChange={e => updateSummon({ force: Number(e.target.value) })} 
                style={{ width: "100%" }} 
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label>Conjuring Pool : <strong>{localStep.summon.conjuringPool || 8}</strong></label>
              <input 
                type="range" 
                min="2" 
                max="20" 
                value={localStep.summon.conjuringPool || 8} 
                onChange={e => updateSummon({ conjuringPool: Number(e.target.value) })} 
                style={{ width: "100%" }} 
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label>Minimum Services : <strong>{localStep.summon.minServices || 1}</strong></label>
              <input 
                type="range" 
                min="1" 
                max="6" 
                value={localStep.summon.minServices || 1} 
                onChange={e => updateSummon({ minServices: Number(e.target.value) })} 
                style={{ width: "100%" }} 
              />
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input 
                type="checkbox" 
                checked={!!localStep.summon.autoRetry} 
                onChange={e => updateSummon({ autoRetry: e.target.checked })} 
              />
              <span>Auto Retry (continue until min services)</span>
            </label>
          </div>
        )}

                        {/* ==================== CAST ==================== */}
        {localStep?.type === "cast" && localStep.cast && (
          <div>
            <h4 style={{ color: "#67e8f9", marginBottom: "16px" }}>Spellcasting Configuration</h4>

            {/* Caster */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", color: "#cbd5e1" }}>
                Caster
              </label>
              <select 
                value={localStep.cast.caster || "mage"} 
                onChange={e => updateCast({ caster: e.target.value })} 
                style={{ width: "100%", padding: "10px 12px", background: "#1e2937", color: "white", borderRadius: "6px" }}
              >
                <option value="mage">Mage (Self)</option>
                <option value="spirit">Spirit</option>
              </select>
            </div>

            {/* Spell Selection */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", color: "#cbd5e1" }}>
                Select Known Spell
              </label>
              <select 
                value={localStep.cast.spellId || ""} 
                onChange={e => updateCast({ spellId: e.target.value })} 
                style={{ width: "100%", padding: "10px 12px", background: "#1e2937", color: "white", borderRadius: "6px" }}
              >
                <option value="">-- Choose a known spell --</option>
                {knownSpells && knownSpells.length > 0 ? (
                  knownSpells
                    .map(id => ALL_SPELLS.find(s => s.id === id))
                    .filter((spell): spell is Spell => spell !== undefined)
                    .map(spell => (
                      <option key={spell.id} value={spell.id}>
                        {spell.name} {spell.frenchName ? `(${spell.frenchName})` : ""} — Base Drain: {spell.drain}
                      </option>
                    ))
                ) : (
                  <option value="" disabled>No known spells</option>
                )}
              </select>
            </div>

            {/* Increase Attribute Option */}
            <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <input 
                type="checkbox" 
                checked={localStep.cast.increaseAttribute || false} 
                onChange={e => updateCast({ increaseAttribute: e.target.checked })} 
              />
              <span>Increase Attribute (Boost)</span>
            </label>

            {localStep.cast.increaseAttribute && (
  <div style={{ marginBottom: "16px", padding: "12px", background: "#1e2937", borderRadius: "8px" }}>
    <label style={{ display: "block", marginBottom: "8px", color: "#67e8f9" }}>
      Attribute to Boost
    </label>
    <select 
      value={localStep.cast.boostAttribute || "WIL"} 
      onChange={e => updateCast({ boostAttribute: e.target.value })} 
      style={{ width: "100%", padding: "10px", background: "#0f172a", color: "white", borderRadius: "6px", marginBottom: "12px" }}
    >
      <option value="WIL">Willpower (WIL)</option>
      <option value="TDA">Tradition Attribute (TDA)</option>
      <option value="BOD">Body (BOD)</option>
    </select>

    {/* NOUVEAU SLIDER */}
    <div>
      <label>Essence de la cible : <strong>{localStep.cast.essenceThreshold || 6}</strong></label>
      <input 
        type="range" 
        min="1" 
        max="12" 
        value={localStep.cast.essenceThreshold || 6} 
        onChange={e => updateCast({ essenceThreshold: Number(e.target.value) })} 
        style={{ width: "100%" }} 
      />
      <small style={{ color: "#94a3b8", display: "block", marginTop: "4px" }}>
        Net Hits = Essence - 5 + Hits du sort<br />
        Drain supplémentaire = (Net Hits - 1)
      </small>
    </div>
  </div>
)}

            {/* Casting Pool */}
            <div style={{ marginBottom: "16px" }}>
              <label>Casting Pool : <strong>{localStep.cast.castingPool || 10}</strong></label>
              <input 
                type="range" 
                min="2" 
                max="20" 
                value={localStep.cast.castingPool || 10} 
                onChange={e => updateCast({ castingPool: Number(e.target.value) })} 
                style={{ width: "100%" }} 
              />
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <input 
                type="checkbox" 
                checked={localStep.cast.autoRetry || false} 
                onChange={e => updateCast({ autoRetry: e.target.checked })} 
              />
              <span>Auto Retry</span>
            </label>

            {localStep.cast.autoRetry && (
              <div style={{ marginBottom: "16px" }}>
                <label>Minimum Hits : <strong>{localStep.cast.minHits || 2}</strong></label>
                <input 
                  type="range" 
                  min="1" 
                  max="8" 
                  value={localStep.cast.minHits || 2} 
                  onChange={e => updateCast({ minHits: Number(e.target.value) })} 
                  style={{ width: "100%" }} 
                />
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "30px", display: "flex", gap: "12px" }}>
          <button 
            onClick={onClose} 
            style={{ flex: 1, padding: "14px", background: "#334155", color: "white", borderRadius: "10px" }}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            style={{ flex: 1, padding: "14px", background: "#22c55e", color: "#000", fontWeight: "bold", borderRadius: "10px" }}
          >
            Save Step
          </button>
        </div>
      </div>
    </div>
  );
}