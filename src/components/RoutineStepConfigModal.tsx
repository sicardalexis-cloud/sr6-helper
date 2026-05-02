// src/components/RoutineStepConfigModal.tsx
import React, { useState, useEffect } from "react";
import { ALL_SPELLS } from "../data/spells";
import { SPIRIT_TYPES } from "../data/spirits";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  step: any;
  index: number;
  onSave: (updatedStep: any) => void;
}

export default function RoutineStepConfigModal({ isOpen, onClose, step, index, onSave }: Props) {
  const [localStep, setLocalStep] = useState(step);

  useEffect(() => {
    setLocalStep(step);
  }, [step]);

  const updateSummon = (updates: any) => {
    setLocalStep({
      ...localStep,
      summon: { ...localStep.summon, ...updates }
    });
  };

  const updateCast = (updates: any) => {
    setLocalStep({
      ...localStep,
      cast: { ...localStep.cast, ...updates }
    });
  };

  const handleSave = () => {
    onSave(localStep);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 2600,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#0f172a", width: "90%", maxWidth: "700px", borderRadius: "16px",
        border: "2px solid #c084fc", padding: "24px"
      }}>
        <h2 style={{ color: "#c084fc", marginBottom: "20px" }}>
          Configure Step {index + 1}
        </h2>

        {localStep.type === "summon" && localStep.summon && (
          <div>
            <h3 style={{ color: "#67e8f9", marginBottom: "16px" }}>Summoning Configuration</h3>

            <div style={{ marginBottom: "16px" }}>
              <label>Spirit Type</label>
              <select 
                value={localStep.summon.spiritType} 
                onChange={e => updateSummon({ spiritType: e.target.value })}
                style={{ width: "100%", padding: "10px", background: "#0f172a", color: "white", border: "1px solid #334155" }}
              >
                {SPIRIT_TYPES.map(s => (
                  <option key={s.type} value={s.type}>{s.label}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label>Force : <strong>{localStep.summon.force}</strong></label>
              <input 
                type="range" 
                min="1" 
                max="8" 
                value={localStep.summon.force} 
                onChange={e => updateSummon({ force: Number(e.target.value) })} 
                style={{ width: "100%" }} 
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label>Conjuring Pool : <strong>{localStep.summon.conjuringPool}</strong></label>
              <input 
                type="range" 
                min="2" 
                max="18" 
                value={localStep.summon.conjuringPool} 
                onChange={e => updateSummon({ conjuringPool: Number(e.target.value) })} 
                style={{ width: "100%" }} 
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label>Drain Resistance Pool : <strong>{localStep.summon.drainResistancePool}</strong></label>
              <input 
                type="range" 
                min="2" 
                max="18" 
                value={localStep.summon.drainResistancePool} 
                onChange={e => updateSummon({ drainResistancePool: Number(e.target.value) })} 
                style={{ width: "100%" }} 
              />
            </div>

            <div>
              <label>Maximum Drain before stopping : <strong>{localStep.summon.drainThreshold}</strong></label>
              <input 
                type="range" 
                min="2" 
                max="20" 
                value={localStep.summon.drainThreshold} 
                onChange={e => updateSummon({ drainThreshold: Number(e.target.value) })} 
                style={{ width: "100%" }} 
              />
            </div>
          </div>
        )}

        {localStep.type === "cast" && localStep.cast && (
          <div>
            <h3 style={{ color: "#c084fc" }}>Spellcasting Configuration</h3>
            <p style={{ color: "#94a3b8" }}>Configuration des sorts à venir...</p>
          </div>
        )}

        <div style={{ marginTop: "30px", display: "flex", gap: "12px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "14px", background: "#334155", color: "white", borderRadius: "10px" }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{ flex: 1, padding: "14px", background: "#22c55e", color: "#000", fontWeight: "bold", borderRadius: "10px" }}>
            Save Step
          </button>
        </div>
      </div>
    </div>
  );
}