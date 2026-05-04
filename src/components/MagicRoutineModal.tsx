// src/components/MagicRoutineModal.tsx
import React, { useState, useEffect } from "react";
import { ALL_SPELLS, Spell } from "../data/spells";
import { SPIRIT_TYPES } from "../data/spirits";

const ROUTINE_KEY = 'magic-routine-state';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  char: any;
  update: (fn: (draft: any) => void) => void;
  addSpirit: (spirit: any) => void;
}

// Modal de configuration d'étape
function StepConfigModal({ isOpen, onClose, step, index, onSave, knownSpells }: any) {
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
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 2600, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f172a", width: "90%", maxWidth: "740px", borderRadius: "16px", border: "2px solid #c084fc", padding: "24px" }}>
        
        {/* SUMMON */}
        {localStep.type === "summon" && localStep.summon && (
          <div>
            <h3 style={{ color: "#67e8f9", marginBottom: "16px" }}>Summoning Configuration</h3>
            
            <div style={{ marginBottom: "16px" }}>
              <label>Spirit Type</label>
              <select 
                value={localStep.summon.spiritType || "fire"} 
                onChange={e => updateSummon({ spiritType: e.target.value })} 
                style={{ width: "100%", padding: "10px", background: "#0f172a", color: "white" }}
              >
                {SPIRIT_TYPES.map(s => <option key={s.type} value={s.type}>{s.label}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label>Force : <strong>{localStep.summon.force || 4}</strong></label>
              <input type="range" min="1" max="8" value={localStep.summon.force || 4} onChange={e => updateSummon({ force: Number(e.target.value) })} style={{ width: "100%" }} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label>Conjuring Pool : <strong>{localStep.summon.conjuringPool || 8}</strong></label>
              <input type="range" min="2" max="18" value={localStep.summon.conjuringPool || 8} onChange={e => updateSummon({ conjuringPool: Number(e.target.value) })} style={{ width: "100%" }} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label>Minimum Services to accept : <strong>{localStep.summon.minServices || 1}</strong></label>
              <input type="range" min="1" max="6" value={localStep.summon.minServices || 1} onChange={e => updateSummon({ minServices: Number(e.target.value) })} style={{ width: "100%" }} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={!!localStep.summon.autoRetry} onChange={e => updateSummon({ autoRetry: e.target.checked })} />
                <span>Auto Retry</span>
              </label>
            </div>
          </div>
        )}

        {/* CAST */}
        {localStep.type === "cast" && localStep.cast && (
          <div>
            <div style={{ marginBottom: "16px" }}>
              <label>Select Known Spell</label>
              <select value={localStep.cast.spellId || ""} onChange={e => updateCast({ spellId: e.target.value })} style={{ width: "100%", padding: "10px", background: "#0f172a", color: "white" }}>
                <option value="">-- Choose a known spell --</option>
                {knownSpells.map((s: Spell) => (
                  <option key={s.id} value={s.id}>{s.name} ({s.frenchName})</option>
                ))}
              </select>
            </div>

            {localStep.cast.spellId && (
              <div style={{ background: "#1e2937", padding: "14px", borderRadius: "10px", marginBottom: "16px", border: "1px solid #334155" }}>
                {(() => {
                  const spell = ALL_SPELLS.find(s => s.id === localStep.cast.spellId);
                  return spell ? (
                    <div>
                      <span style={{ color: "#f87171", fontWeight: "bold" }}>Base Drain: {spell.drain}</span><br />
                      <small style={{ color: "#94a3b8" }}>{spell.description?.substring(0, 200)}...</small>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <label>Casting Pool : <strong>{localStep.cast.castingPool || 10}</strong></label>
              <input type="range" min="2" max="20" value={localStep.cast.castingPool || 10} onChange={e => updateCast({ castingPool: Number(e.target.value) })} style={{ width: "100%" }} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={localStep.cast.autoRetry || false} onChange={e => updateCast({ autoRetry: e.target.checked })} />
                <span>Auto Retry</span>
              </label>
            </div>

            {localStep.cast.autoRetry && (
              <div style={{ marginBottom: "16px" }}>
                <label>Minimum Hits to accept : <strong>{localStep.cast.minHits || 2}</strong></label>
                <input type="range" min="1" max="8" value={localStep.cast.minHits || 2} onChange={e => updateCast({ minHits: Number(e.target.value) })} style={{ width: "100%" }} />
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={localStep.cast.hitsIncreaseDrain || false} onChange={e => updateCast({ hitsIncreaseDrain: e.target.checked })} />
                <span>Hits increase Drain (this step only)</span>
              </label>
            </div>

            <div style={{ marginBottom: "16px", display: "flex", gap: "20px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", flex: 1 }}>
                <input type="checkbox" checked={localStep.cast.increaseWIL || false} onChange={e => updateCast({ increaseWIL: e.target.checked })} />
                <span>Augmente le WIL du nombre de hits (persistant)</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", flex: 1 }}>
                <input type="checkbox" checked={localStep.cast.increaseTDA || false} onChange={e => updateCast({ increaseTDA: e.target.checked })} />
                <span>Augmente le TDA du nombre de hits (persistant)</span>
              </label>
            </div>

            {localStep.cast.hitsIncreaseDrain && (
              <>
                <div style={{ marginBottom: "16px" }}>
                  <label>Hit Threshold (no extra drain below) : <strong>{localStep.cast.hitThreshold || 2}</strong></label>
                  <input type="range" min="0" max="10" value={localStep.cast.hitThreshold || 2} onChange={e => updateCast({ hitThreshold: Number(e.target.value) })} style={{ width: "100%" }} />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label>Max Hits : <strong>{localStep.cast.maxHits || 8}</strong></label>
                  <input type="range" min="2" max="15" value={localStep.cast.maxHits || 8} onChange={e => updateCast({ maxHits: Number(e.target.value) })} style={{ width: "100%" }} />
                </div>
              </>
            )}

            <div>
              <label>Caster</label>
              <select value={localStep.cast.caster || "mage"} onChange={e => updateCast({ caster: e.target.value })} style={{ width: "100%", padding: "10px", background: "#0f172a", color: "white" }}>
                <option value="mage">Mage (himself)</option>
                <option value="spirit">Spirit (last summoned)</option>
              </select>
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
  const [routineTradition, setRoutineTradition] = useState<"hermetic" | "shamanic">("hermetic");

  const [routineWIL, setRoutineWIL] = useState<number>(char.attributes?.WIL ?? 3);
  const [routineTDA, setRoutineTDA] = useState<number>(6);
  const [maxDrainThreshold, setMaxDrainThreshold] = useState<number>(12);
  const [maxSpiritDrain, setMaxSpiritDrain] = useState<number>(8);

  const [editingAttr, setEditingAttr] = useState<string | null>(null);
  const [editingStepIndex, setEditingStepIndex] = useState<number | null>(null);

  const knownSpells = char?.knownSpells
    ? char.knownSpells.map((id: string) => ALL_SPELLS.find((s: Spell) => s.id === id)).filter(Boolean)
    : [];

  // Persistance
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(ROUTINE_KEY);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          setSteps(data.steps || []);
          setRoutineWIL(data.routineWIL ?? char.attributes?.WIL ?? 3);
          setRoutineTDA(data.routineTDA ?? 6);
          setMaxDrainThreshold(data.maxDrainThreshold ?? 12);
          setMaxSpiritDrain(data.maxSpiritDrain ?? 8);
          setRoutineTradition(data.routineTradition || "hermetic");
        } catch (e) {}
      }
    }
  }, [isOpen, char]);

  useEffect(() => {
    if (isOpen) {
      const dataToSave = { steps, routineWIL, routineTDA, maxDrainThreshold, maxSpiritDrain, routineTradition };
      localStorage.setItem(ROUTINE_KEY, JSON.stringify(dataToSave));
    }
  }, [steps, routineWIL, routineTDA, maxDrainThreshold, maxSpiritDrain, routineTradition, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTempSpirits([]);
      setStepResults([]);
      setTotalDrain(0);
      setIsRunning(false);
      setEditingStepIndex(null);
      setEditingAttr(null);

      // Réinitialisation selon la tradition
      setRoutineWIL(char.attributes?.WIL ?? 3);
      if (routineTradition === "shamanic") {
        setRoutineTDA(char.attributes?.CHA ?? 3);
      } else {
        setRoutineTDA(char.attributes?.LOG ?? 3);
      }
    }
  }, [isOpen, char, routineTradition]);

  const addSummonStep = () => {
    setSteps(prev => [...prev, { 
      type: "summon", 
      summon: { spiritType: "fire", force: 4, conjuringPool: 8, minServices: 1, autoRetry: true } 
    }]);
  };

  const addCastStep = () => {
    setSteps(prev => [...prev, { type: "cast", cast: { spellId: "", caster: "mage", castingPool: 10, minHits: 2, autoRetry: false } }]);
  };

  const removeStep = (index: number) => {
    setSteps(prev => prev.filter((_, i) => i !== index));
  };

  const openStepConfig = (index: number) => {
    setEditingStepIndex(index);
  };

  const resetProgress = () => {
    setTempSpirits([]);
    setStepResults([]);
    setTotalDrain(0);
    setIsRunning(false);

    setRoutineWIL(char.attributes?.WIL ?? 3);
    if (routineTradition === "shamanic") {
      setRoutineTDA(char.attributes?.CHA ?? 3);
    } else {
      setRoutineTDA(char.attributes?.LOG ?? 3);
    }
  };

  const rollDice = (pool: number) => Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);
  const countHits = (rolls: number[]) => rolls.filter(d => d >= 5).length;

      const runRoutine = async () => {
    if (steps.length === 0) return;

    // Réinitialisation aux valeurs de base
    let currentWIL = char.attributes?.WIL ?? 3;
    let currentTDA = routineTradition === "shamanic" 
      ? (char.attributes?.CHA ?? 3) 
      : (char.attributes?.LOG ?? 3);

    setRoutineWIL(currentWIL);
    setRoutineTDA(currentTDA);

    setIsRunning(true);
    let drain = 0;
    const results: any[] = [];
    const generated: any[] = [];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      if (drain >= maxDrainThreshold) break;

      let penalty = Math.floor(drain / 3);
      const baseDrainResistancePool = currentWIL + currentTDA;

      if (step.type === "cast" && step.cast?.caster === "spirit" && generated.length > 0) {
        const lastSpirit = generated[generated.length - 1];
        if (lastSpirit.conditionDamage !== undefined) {
          penalty = Math.floor(lastSpirit.conditionDamage / 3);
        }
      }

      if (step.type === "summon" && step.summon) {
        let attempts = 0;
        let stepDrain = 0;
        let services = 0;
        const allAttempts: any[] = [];

        const autoRetry = step.summon.autoRetry || false;
        const minServices = step.summon.minServices || 1;
        const currentConjuringPool = Math.max(1, step.summon.conjuringPool - penalty);
        const currentDrainResistancePool = Math.max(1, baseDrainResistancePool - penalty);

        do {
          attempts++;
          const invocationRolls = rollDice(currentConjuringPool);
          const spiritRolls = rollDice(step.summon.force * 2);
          const drainRolls = rollDice(currentDrainResistancePool);

          const invocationHits = countHits(invocationRolls);
          const spiritHits = countHits(spiritRolls);
          const drainHits = countHits(drainRolls);

          services = Math.max(0, invocationHits - spiritHits);
          stepDrain = Math.max(0, spiritHits - drainHits);

          allAttempts.push({ invocationRolls, spiritRolls, drainRolls });

          if (services >= minServices || !autoRetry || drain + stepDrain >= maxDrainThreshold) break;
        } while (true);

        drain += stepDrain;

        results.push({ 
          stepNumber: i + 1, 
          type: "summon", 
          services, 
          drain: stepDrain, 
          attempts, 
          penalty,
          allAttempts 
        });

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
      else if (step.type === "cast" && step.cast && step.cast.spellId) {
        const spell = ALL_SPELLS.find(s => s.id === step.cast.spellId);
        if (!spell) continue;

        let attempts = 0;
        let stepDrain = 0;
        let spellHits = 0;
        const allAttempts: any[] = [];

        const autoRetry = step.cast.autoRetry || false;
        const minHits = step.cast.minHits || 2;
        let currentCastingPool = Math.max(1, (step.cast.castingPool || 10) - penalty);
        let currentDrainResistancePool = Math.max(1, baseDrainResistancePool - penalty);

        if (step.cast.caster === "spirit" && generated.length > 0) {
          const lastSpirit = generated[generated.length - 1];
          if (lastSpirit.force) currentDrainResistancePool = lastSpirit.force * 2;
        }

        do {
          attempts++;

          const spellRolls = rollDice(currentCastingPool);
          const drainRolls = rollDice(currentDrainResistancePool);

          spellHits = countHits(spellRolls);
          const drainHits = countHits(drainRolls);

          let effectiveHits = spellHits;
          if (step.cast.hitsIncreaseDrain) {
            const threshold = step.cast.hitThreshold || 2;
            const maxHits = step.cast.maxHits || 8;
            effectiveHits = Math.min(spellHits, maxHits);
            const extraHits = Math.max(0, effectiveHits - threshold);
            stepDrain = Math.max(0, parseInt(spell.drain) || 3) + extraHits;
          } else {
            stepDrain = Math.max(0, (parseInt(spell.drain) || 3) - drainHits);
          }

          allAttempts.push({ spellRolls, drainRolls });

          if (spellHits >= minHits || !autoRetry || drain >= maxDrainThreshold) break;
        } while (true);

        // === BONUS PERSISTANTS WIL / TDA ===
        let bonusHits = spellHits;

        if (step.cast.hitsIncreaseDrain) {
          const threshold = step.cast.hitThreshold || 2;
          const maxHits = step.cast.maxHits || 8;
          const effectiveHits = Math.min(spellHits, maxHits);
          bonusHits = effectiveHits;   // ← On utilise les hits limités pour le bonus
        }

        if (step.cast.increaseWIL) {
          currentWIL += bonusHits;
          setRoutineWIL(currentWIL);
        }
        if (step.cast.increaseTDA) {
          currentTDA += bonusHits;
          setRoutineTDA(currentTDA);
        }

        const isSpiritCasting = step.cast.caster === "spirit" && generated.length > 0;

        if (!isSpiritCasting) {
          drain += stepDrain;
        }

        if (isSpiritCasting) {
          const lastSpirit = generated[generated.length - 1];
          if (lastSpirit.servicesRemaining !== undefined) {
            lastSpirit.servicesRemaining = Math.max(0, lastSpirit.servicesRemaining - 1);
          }
          if (lastSpirit.conditionDamage !== undefined) {
            lastSpirit.conditionDamage = (lastSpirit.conditionDamage || 0) + stepDrain;
          }
        }

        results.push({ 
          stepNumber: i + 1, 
          type: "cast", 
          spellName: spell.name, 
          spellHits, 
          drain: stepDrain, 
          attempts, 
          penalty,
          allAttempts,
          caster: step.cast.caster 
        });
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
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 2500, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f172a", width: "95%", maxWidth: "1100px", height: "90vh", borderRadius: "16px", border: "2px solid #c084fc", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px 24px", background: "#1e2937", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>🔄 Magic Daily Routine</h2>
          
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ color: "#94a3b8", fontWeight: "500" }}>Tradition :</span>
            
            <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", color: "#e0f2fe" }}>
              <input 
                type="radio" 
                name="tradition" 
                checked={routineTradition === "hermetic"} 
                onChange={() => setRoutineTradition("hermetic")} 
              />
              Hermetic
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", color: "#e0f2fe" }}>
              <input 
                type="radio" 
                name="tradition" 
                checked={routineTradition === "shamanic"} 
                onChange={() => setRoutineTradition("shamanic")} 
              />
              Shamanic
            </label>
          </div>

          <button onClick={onClose} style={{ color: "#f87171", fontSize: "1.8rem", background: "none", border: "none", cursor: "pointer" }}>✕</button>
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

          {/* Attributs */}
          <div style={{ display: "flex", gap: "16px" }}>
            <div onClick={() => setEditingAttr(editingAttr === "WIL" ? null : "WIL")} style={{ background: "#0f172a", padding: "8px 14px", borderRadius: "8px", border: editingAttr === "WIL" ? "2px solid #67e8f9" : "1px solid #334155", minWidth: "90px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>WIL</div>
              <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#67e8f9" }}>{routineWIL}</div>
              {editingAttr === "WIL" && (
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
                  <button onClick={(e) => { e.stopPropagation(); setRoutineWIL(prev => Math.max(1, prev - 1)); }} style={{ background: "#ef4444", width: "28px", height: "28px", borderRadius: "50%" }}>-</button>
                  <button onClick={(e) => { e.stopPropagation(); setRoutineWIL(prev => prev + 1); }} style={{ background: "#22c55e", width: "28px", height: "28px", borderRadius: "50%" }}>+</button>
                </div>
              )}
            </div>

            <div onClick={() => setEditingAttr(editingAttr === "TDA" ? null : "TDA")} style={{ background: "#0f172a", padding: "8px 14px", borderRadius: "8px", border: editingAttr === "TDA" ? "2px solid #67e8f9" : "1px solid #334155", minWidth: "90px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>TDA</div>
              <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#67e8f9" }}>{routineTDA}</div>
              {editingAttr === "TDA" && (
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
                  <button onClick={(e) => { e.stopPropagation(); setRoutineTDA(prev => Math.max(1, prev - 1)); }} style={{ background: "#ef4444", width: "28px", height: "28px", borderRadius: "50%" }}>-</button>
                  <button onClick={(e) => { e.stopPropagation(); setRoutineTDA(prev => prev + 1); }} style={{ background: "#22c55e", width: "28px", height: "28px", borderRadius: "50%" }}>+</button>
                </div>
              )}
            </div>

            <div onClick={() => setEditingAttr(editingAttr === "MAXDRAIN" ? null : "MAXDRAIN")} style={{ background: "#0f172a", padding: "8px 14px", borderRadius: "8px", border: editingAttr === "MAXDRAIN" ? "2px solid #f87171" : "1px solid #334155", minWidth: "110px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>Max Drain</div>
              <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#f87171" }}>{maxDrainThreshold}</div>
              {editingAttr === "MAXDRAIN" && (
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
                  <button onClick={(e) => { e.stopPropagation(); setMaxDrainThreshold(prev => Math.max(1, prev - 1)); }} style={{ background: "#ef4444", width: "28px", height: "28px", borderRadius: "50%" }}>-</button>
                  <button onClick={(e) => { e.stopPropagation(); setMaxDrainThreshold(prev => prev + 1); }} style={{ background: "#22c55e", width: "28px", height: "28px", borderRadius: "50%" }}>+</button>
                </div>
              )}
            </div>
            <div onClick={() => setEditingAttr(editingAttr === "MAXSPIRITDRAIN" ? null : "MAXSPIRITDRAIN")} style={{ background: "#0f172a", padding: "8px 14px", borderRadius: "8px", border: editingAttr === "MAXSPIRITDRAIN" ? "2px solid #f87171" : "1px solid #334155", minWidth: "130px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>Max Drain Esprit</div>
              <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#f87171" }}>{maxSpiritDrain}</div>
              {editingAttr === "MAXSPIRITDRAIN" && (
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
                  <button onClick={(e) => { e.stopPropagation(); setMaxSpiritDrain(prev => Math.max(1, prev - 1)); }} style={{ background: "#ef4444", width: "28px", height: "28px", borderRadius: "50%" }}>-</button>
                  <button onClick={(e) => { e.stopPropagation(); setMaxSpiritDrain(prev => prev + 1); }} style={{ background: "#22c55e", width: "28px", height: "28px", borderRadius: "50%" }}>+</button>
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
              ⚡ Add Spellcasting
            </button>
          </div>

          {steps.length === 0 && <p style={{ color: "#64748b", textAlign: "center", marginTop: "80px" }}>Add steps using the buttons above...</p>}

          {steps.map((step, i) => {
            const result = stepResults.find(r => r.stepNumber === i + 1);
            return (
              <div key={i} style={{ background: "#1e2937", padding: "16px", marginBottom: "12px", borderRadius: "12px", border: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div onClick={() => openStepConfig(i)} style={{ cursor: "pointer", flex: 1 }}>
                  <strong>Step {i+1} — {step.type.toUpperCase()}</strong>
                  {step.type === "cast" && step.cast?.spellId && (
                    <span> → {ALL_SPELLS.find(s => s.id === step.cast.spellId)?.name}</span>
                  )}
                </div>

                {result && (
                  <div style={{ fontSize: "0.82rem", flex: 1, paddingLeft: "20px", borderLeft: "2px solid #334155" }}>
                    {result.type === "summon" ? (
                      <>
                        <div style={{ display: "flex", gap: "12px" }}>
                          <div>Services: <strong style={{ color: "#22c55e" }}>{result.services}</strong></div>
                          <div>Drain : <strong style={{ color: "#f87171" }}>{result.drain}</strong></div>
                          <div>Essais : <strong>{result.attempts}</strong></div>
                        </div>

                        {result.allAttempts && result.allAttempts.length > 0 && (
                          <div style={{ marginTop: "8px" }}>
                            <small style={{ color: "#94a3b8" }}>Jets détaillés :</small>
                            {result.allAttempts.map((a: any, idx: number) => (
                              <div key={idx} style={{ marginTop: "4px", fontSize: "0.78rem", lineHeight: "1.4" }}>
                                Essai {idx+1}: 
                                Inv: <span style={{ color: "#67e8f9" }}>{a.invocationRolls.join(",")}</span> | 
                                Esp: <span style={{ color: "#a5b4fc" }}>{a.spiritRolls.join(",")}</span> | 
                                Dr: <span style={{ color: "#f87171" }}>{a.drainRolls.join(",")}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div>Hits : <strong style={{ color: "#22c55e" }}>{result.spellHits}</strong></div>
                        <div>Drain étape : <strong style={{ color: "#f87171" }}>{result.drain}</strong></div>
                        <div>Essais : <strong>{result.attempts}</strong></div>

                        {result.allAttempts && result.allAttempts.length > 0 && (
                          <div style={{ marginTop: "8px" }}>
                            <small style={{ color: "#94a3b8" }}>Jets détaillés :</small>
                            {result.allAttempts.map((a: any, idx: number) => (
                              <div key={idx} style={{ marginTop: "4px", fontSize: "0.78rem", lineHeight: "1.4" }}>
                                Essai {idx+1}: 
                                Sort: <span style={{ color: "#67e8f9" }}>{a.spellRolls.join(",")}</span> | 
                                Dr: <span style={{ color: "#f87171" }}>{a.drainRolls.join(",")}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
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
          knownSpells={knownSpells}
        />
      )}
    </div>
  );
}