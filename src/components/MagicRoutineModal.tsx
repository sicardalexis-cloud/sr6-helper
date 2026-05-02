// src/components/MagicRoutineModal.tsx
import React, { useState } from "react";
import { ALL_SPELLS } from "../data/spells";
import { SPIRIT_TYPES } from "../data/spirits";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  char: any;
  update: (fn: (draft: any) => void) => void;
  addSpirit: (spirit: any) => void;
}

// Modal de configuration d'étape
function StepConfigModal({ isOpen, onClose, step, index, onSave }: any) {
  const [localStep, setLocalStep] = useState(step);

  const updateSummon = (updates: any) => {
    setLocalStep((prev: any) => ({
      ...prev,
      summon: { ...prev.summon, ...updates }
    }));
  };

  const handleSave = () => {
    onSave(localStep);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 2600, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f172a", width: "90%", maxWidth: "700px", borderRadius: "16px", border: "2px solid #c084fc", padding: "24px" }}>
        <h2 style={{ color: "#c084fc", marginBottom: "20px" }}>Configure Step {index + 1}</h2>

        {localStep.type === "summon" && localStep.summon && (
          <div>
            <h3 style={{ color: "#67e8f9", marginBottom: "16px" }}>Summoning Configuration</h3>

            <div style={{ marginBottom: "16px" }}>
              <label>Spirit Type</label>
              <select value={localStep.summon.spiritType} onChange={e => updateSummon({ spiritType: e.target.value })} style={{ width: "100%", padding: "10px", background: "#0f172a", color: "white" }}>
                {SPIRIT_TYPES.map(s => <option key={s.type} value={s.type}>{s.label}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label>Force : <strong>{localStep.summon.force}</strong></label>
              <input type="range" min="1" max="8" value={localStep.summon.force} onChange={e => updateSummon({ force: Number(e.target.value) })} style={{ width: "100%" }} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label>Conjuring Pool : <strong>{localStep.summon.conjuringPool}</strong></label>
              <input type="range" min="2" max="18" value={localStep.summon.conjuringPool} onChange={e => updateSummon({ conjuringPool: Number(e.target.value) })} style={{ width: "100%" }} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label>Minimum Services to accept : <strong>{localStep.summon.minServices || 1}</strong></label>
              <input type="range" min="1" max="6" value={localStep.summon.minServices || 1} onChange={e => updateSummon({ minServices: Number(e.target.value) })} style={{ width: "100%" }} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={localStep.summon.autoRetry || false} onChange={e => updateSummon({ autoRetry: e.target.checked })} />
                <span>Auto Retry</span>
              </label>
            </div>
          </div>
        )}

        <div style={{ marginTop: "30px", display: "flex", gap: "12px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "14px", background: "#334155", color: "white", borderRadius: "10px" }}>Cancel</button>
          <button onClick={handleSave} style={{ flex: 1, padding: "14px", background: "#22c55e", color: "#000", fontWeight: "bold", borderRadius: "10px" }}>Save Step</button>
        </div>
      </div>
    </div>
  );
}

export default function MagicRoutineModal({ isOpen, onClose, char, update, addSpirit }: Props) {
  const [steps, setSteps] = useState<any[]>([]);
  const [totalDrain, setTotalDrain] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [tempSpirits, setTempSpirits] = useState<any[]>([]);
  const [stepResults, setStepResults] = useState<any[]>([]);

  const [routineWIL, setRoutineWIL] = useState<number>(char.attributes?.WIL ?? 3);
  const [routineTDA, setRoutineTDA] = useState<number>(6);
  const [maxDrainThreshold, setMaxDrainThreshold] = useState<number>(12);

  const [editingAttr, setEditingAttr] = useState<string | null>(null);
  const [editingStepIndex, setEditingStepIndex] = useState<number | null>(null);

  const addSummonStep = () => {
    setSteps(prev => [...prev, { 
      type: "summon", 
      summon: { 
        spiritType: "fire", 
        force: 4, 
        conjuringPool: 8, 
        minServices: 1, 
        autoRetry: true 
      } 
    }]);
  };

  const addCastStep = () => {
    setSteps(prev => [...prev, { type: "cast", cast: { spellId: "", caster: "mage" } }]);
  };

  const removeStep = (index: number) => {
    setSteps(prev => prev.filter((_, i) => i !== index));
  };

  const openStepConfig = (index: number) => setEditingStepIndex(index);

  const resetProgress = () => {
    setTempSpirits([]);
    setStepResults([]);
    setTotalDrain(0);
    setIsRunning(false);
  };

  const runRoutine = async () => {
    if (steps.length === 0) return;
    setIsRunning(true);
    let drain = 0;
    const results = [];
    const generated = [];

    const drainResistancePool = routineWIL + routineTDA;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      if (drain >= maxDrainThreshold) break;

      if (step.type === "summon" && step.summon) {
        let attempts = 0;
        let stepDrain = 0;
        let services = 0;
        const autoRetry = step.summon.autoRetry || false;
        const minServices = step.summon.minServices || 1;

        do {
          attempts++;

          const invocationRolls = Array.from({ length: step.summon.conjuringPool }, () => Math.floor(Math.random() * 6) + 1);
          const spiritRolls = Array.from({ length: step.summon.force * 2 }, () => Math.floor(Math.random() * 6) + 1);
          const drainRolls = Array.from({ length: drainResistancePool }, () => Math.floor(Math.random() * 6) + 1);

          const invocationHits = invocationRolls.filter(d => d >= 5).length;
          const spiritHits = spiritRolls.filter(d => d >= 5).length;
          const drainHits = drainRolls.filter(d => d >= 5).length;

          services = Math.max(0, invocationHits - spiritHits);
          stepDrain = Math.max(0, spiritHits - drainHits);
          drain += stepDrain;

          if (services >= minServices || !autoRetry || drain >= maxDrainThreshold) {
            break;
          }
        } while (true);

        results.push({ stepNumber: i + 1, services, drain: stepDrain, glitch: "none", attempts });

        if (services > 0) {
          generated.push({
            element: step.summon.spiritType,
            force: step.summon.force,
            servicesRemaining: services,
            conditionDamage: 0,
            invocationDate: new Date().toLocaleDateString("en-US"),
          });
        }
      }
    }

    setTempSpirits(generated);
    setTotalDrain(drain);
    setStepResults(results);
    setIsRunning(false);
  };

  const confirmRoutine = () => {
    tempSpirits.forEach(spirit => addSpirit(spirit));
    resetProgress();
    alert(`Routine confirmed! ${tempSpirits.length} spirits added.`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 2500,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#0f172a", width: "95%", maxWidth: "1100px", height: "90vh",
        borderRadius: "16px", border: "2px solid #c084fc", overflow: "hidden",
        display: "flex", flexDirection: "column"
      }}>
        <div style={{ padding: "16px 24px", background: "#1e2937", display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ color: "#c084fc" }}>🔄 Magic Daily Routine</h2>
          <button onClick={onClose} style={{ color: "#f87171", fontSize: "1.8rem" }}>✕</button>
        </div>

        <div style={{ padding: "14px 24px", background: "#1e2937", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span>Accumulated Drain : <strong style={{ color: "#f87171" }}>{totalDrain}</strong></span>
            <button onClick={runRoutine} disabled={isRunning || steps.length === 0} style={{ padding: "8px 20px", background: "#22d3ee", color: "#000", fontWeight: "bold", borderRadius: "8px" }}>
              {isRunning ? "Running..." : "▶ Run Routine"}
            </button>

            {tempSpirits.length > 0 && (
              <>
                <button onClick={confirmRoutine} style={{ padding: "8px 20px", background: "#22c55e", color: "#000", fontWeight: "bold", borderRadius: "8px" }}>
                  ✅ Confirm Routine
                </button>
                <button onClick={resetProgress} style={{ padding: "8px 20px", background: "#ef4444", color: "white", fontWeight: "bold", borderRadius: "8px" }}>
                  ❌ Cancel
                </button>
              </>
            )}
          </div>

          {/* Attributs - Correction du bug */}
          <div style={{ display: "flex", gap: "16px" }}>
            <div 
              onClick={() => setEditingAttr(editingAttr === "WIL" ? null : "WIL")} 
              style={{ background: "#0f172a", padding: "8px 14px", borderRadius: "8px", border: editingAttr === "WIL" ? "2px solid #67e8f9" : "1px solid #334155", minWidth: "90px", textAlign: "center", cursor: "pointer" }}
            >
              <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>WIL</div>
              <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#67e8f9" }}>{routineWIL}</div>
              {editingAttr === "WIL" && (
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setRoutineWIL(prev => Math.max(1, prev - 1)); }} 
                    style={{ background: "#ef4444", width: "28px", height: "28px", borderRadius: "50%" }}
                  >-</button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setRoutineWIL(prev => prev + 1); }} 
                    style={{ background: "#22c55e", width: "28px", height: "28px", borderRadius: "50%" }}
                  >+</button>
                </div>
              )}
            </div>

            <div 
              onClick={() => setEditingAttr(editingAttr === "TDA" ? null : "TDA")} 
              style={{ background: "#0f172a", padding: "8px 14px", borderRadius: "8px", border: editingAttr === "TDA" ? "2px solid #67e8f9" : "1px solid #334155", minWidth: "90px", textAlign: "center", cursor: "pointer" }}
            >
              <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>TDA</div>
              <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#67e8f9" }}>{routineTDA}</div>
              {editingAttr === "TDA" && (
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setRoutineTDA(prev => Math.max(1, prev - 1)); }} 
                    style={{ background: "#ef4444", width: "28px", height: "28px", borderRadius: "50%" }}
                  >-</button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setRoutineTDA(prev => prev + 1); }} 
                    style={{ background: "#22c55e", width: "28px", height: "28px", borderRadius: "50%" }}
                  >+</button>
                </div>
              )}
            </div>

            <div 
              onClick={() => setEditingAttr(editingAttr === "MAXDRAIN" ? null : "MAXDRAIN")} 
              style={{ background: "#0f172a", padding: "8px 14px", borderRadius: "8px", border: editingAttr === "MAXDRAIN" ? "2px solid #f87171" : "1px solid #334155", minWidth: "110px", textAlign: "center", cursor: "pointer" }}
            >
              <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>Max Drain</div>
              <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#f87171" }}>{maxDrainThreshold}</div>
              {editingAttr === "MAXDRAIN" && (
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setMaxDrainThreshold(prev => Math.max(1, prev - 1)); }} 
                    style={{ background: "#ef4444", width: "28px", height: "28px", borderRadius: "50%" }}
                  >-</button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setMaxDrainThreshold(prev => prev + 1); }} 
                    style={{ background: "#22c55e", width: "28px", height: "28px", borderRadius: "50%" }}
                  >+</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ padding: "20px", flex: 1, overflowY: "auto" }}>
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            <button onClick={addSummonStep} style={{ flex: 1, padding: "16px", background: "#22c55e", color: "#000", fontWeight: "bold", borderRadius: "10px" }}>
              ➕ Add Summoning
            </button>
            <button onClick={addCastStep} style={{ flex: 1, padding: "16px", background: "#c084fc", color: "#000", fontWeight: "bold", borderRadius: "10px" }}>
              ➕ Add Spellcasting
            </button>
          </div>

          {steps.length === 0 && <p style={{ color: "#64748b", textAlign: "center", marginTop: "80px" }}>Add steps using the buttons above...</p>}

          {steps.map((step, i) => {
            const result = stepResults.find(r => r.stepNumber === i + 1);
            return (
              <div key={i} style={{ background: "#1e2937", padding: "16px", marginBottom: "12px", borderRadius: "12px", border: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div onClick={() => openStepConfig(i)} style={{ cursor: "pointer", flex: 1 }}>
                  <strong>Step {i+1} — {step.type.toUpperCase()}</strong>
                </div>
                {result && (
                  <div style={{ fontSize: "0.9rem" }}>
                    Services: <strong style={{color:"#22c55e"}}>{result.services}</strong> | 
                    Drain: <strong style={{color:"#f87171"}}>{result.drain}</strong>
                  </div>
                )}
                <button onClick={() => removeStep(i)} style={{ color: "#f87171", marginLeft: "12px" }}>✕</button>
              </div>
            );
          })}
        </div>
      </div>

      {editingStepIndex !== null && (
        <StepConfigModal
          isOpen={true}
          onClose={() => setEditingStepIndex(null)}
          step={steps[editingStepIndex]}
          index={editingStepIndex}
          onSave={(updatedStep: any) => {
            const newSteps = [...steps];
            newSteps[editingStepIndex] = updatedStep;
            setSteps(newSteps);
            setEditingStepIndex(null);
          }}
        />
      )}
    </div>
  );
}