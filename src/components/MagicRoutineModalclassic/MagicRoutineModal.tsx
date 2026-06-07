// src/components/MagicRoutineModal/MagicRoutineModal.tsx
import React, { useState, useEffect } from "react";
import StepConfigModal from "./StepConfigModal";
import RoutineResults from "./RoutineResults";
import { useMagicRoutine } from "./useMagicRoutine";
import { ALL_SPELLS } from "../../data/spells";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  char: any;
  update: (fn: (draft: any) => void) => void;
  addSpirit: (spirit: any) => void;
}

export default function MagicRoutineModal({ 
  isOpen, 
  onClose, 
  char, 
  update, 
  addSpirit 
}: Props) {
  
  const {
    steps,
    setSteps,
    stepResults,
    totalDrain,
    isRunning,
    maxDrainThreshold,
    setMaxDrainThreshold,
    maxAutoRests,
    setMaxAutoRests,
    routineTradition,
    setRoutineTradition,
    routineWIL,
    routineTDA,
    routineBOD,
    runRoutine,
    resetProgress,
    addSummonStep,
    addCastStep,
    removeStep,
    tempSpirits,           // ← AJOUTE ÇA
    setTempSpirits         // ← AJOUTE ÇA (optionnel si tu veux supprimer depuis ici)

  } = useMagicRoutine({ char, isOpen });

  const [editingMax, setEditingMax] = useState<"drain" | "autorests" | null>(null);
  const [editingStepIndex, setEditingStepIndex] = useState<number | null>(null);
  const [isRoutineConfirmed, setIsRoutineConfirmed] = useState(false);
  useEffect(() => {
    if (stepResults.length > 0) {
      setIsRoutineConfirmed(false);   // ← Repasse en vert quand il y a de nouveaux résultats
    }
  }, [stepResults.length]);

  if (!isOpen) return null;

  return (
    <div style={{ 
      position: "fixed", 
      inset: 0, 
      background: "rgba(0,0,0,0.95)", 
      zIndex: 2500, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      <div style={{ 
        background: "#0f172a", 
        width: "95%", 
        maxWidth: "1180px", 
        height: "92vh", 
        borderRadius: "16px", 
        border: "2px solid #c084fc", 
        overflow: "hidden", 
        display: "flex", 
        flexDirection: "column" 
      }}>
        
        {/* HEADER */}
        <div style={{ 
          padding: "16px 20px", 
          borderBottom: "2px solid #334155", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          background: "#1e2937"
        }}>
          <h2 style={{ margin: 0, color: "#c084fc" }}>
            🧙 Routine Magique Journalière
            <span style={{ fontSize: '10px', color: '#64748b', marginLeft: 8, fontWeight: 'normal' }}>
              (spirit-cast fix)
            </span>
          </h2>
          <button onClick={onClose} style={{ background: "#334155", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}>
            ✕ Fermer
          </button>
        </div>

        {/* TOOLBAR */}
        <div style={{ 
          padding: "12px 20px", 
          background: "#1e2937", 
          borderBottom: "1px solid #334155",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center"
        }}>
          
                    {/* Bouton Principal Lancer / Reset */}
                    {/* Bouton Principal Lancer / Reset */}
          <button 
            onClick={() => {
              if (isRunning) {
                resetProgress();
              } else if (stepResults.length > 0) {
                resetProgress();           // Reset si une routine a déjà été lancée
              } else {
                runRoutine();              // Lancer si rien n'a été fait
              }
            }}
            disabled={steps.length === 0 && stepResults.length === 0}
            style={{ 
              padding: "14px 28px", 
              fontSize: "1.1rem",
              fontWeight: "bold", 
              border: "none", 
              borderRadius: "10px",
              background: isRunning 
                ? "#ef4444" 
                : (stepResults.length > 0 ? "#f59e0b" : "#22c55e"), 
              color: (isRunning || stepResults.length > 0) ? "white" : "#000",
              cursor: steps.length === 0 ? "not-allowed" : "pointer",
              minWidth: "220px"
            }}
          >
            {isRunning 
              ? "⏳ En cours..." 
              : stepResults.length > 0 
                ? "🔄 Reset Routine" 
                : "▶️ Lancer la Routine"
            }
          </button>

                      {/* Bouton CONFIRMER - Petit bouton */}
          <button 
            onClick={() => {
              if (stepResults.length === 0 || isRoutineConfirmed) return;

              console.groupCollapsed("%c[ROUTINE CONFIRM] Starting spell transfer", "color:#c084fc;font-weight:bold");
              console.log("steps (configs):", steps);
              console.log("stepResults (all):", stepResults);
              console.log("tempSpirits at confirm:", tempSpirits);

              // Appliquer le drain total + les sorts castés avec succès (sustained spells de la routine)
              update((draft: any) => {
                draft.drainStun = (draft.drainStun || 0) + totalDrain;

                if (!draft.activeSpells) draft.activeSpells = [];

                let addedCount = 0;

                // Build set of stepNumbers that are "boost sim" casts.
                // We only skip them for persisting if they were NOT actually cast by a spirit.
                // Reason: user may use "Increase Attribute (Boost)" + Caster=Spirit to have a spirit
                // cast a real spell while also getting the prep boost effect. In that case we still
                // want the spell in activeSpells.
                const boostStepNums = new Set<number>();
                steps.forEach((step: any, idx: number) => {
                  if (step.type === "cast" && step.cast?.increaseAttribute && step.cast?.spellId) {
                    boostStepNums.add(idx + 1);
                  }
                });

                // Drive from the actual results recorded during the run.
                // Every spell that was *cast* (by mage or by spirit) during the routine
                // gets transferred, unless it was a pure mage boost-sim step.
                const castResults = stepResults.filter((r: any) => r.type === "cast" && r.spellId);
                console.log("castResults found in stepResults:", castResults);

                castResults.forEach((res: any) => {
                  const stepNum = res.stepNumber;
                  const wasActuallySpiritCast = !!res.isSpiritCasting;

                  if (boostStepNums.has(stepNum) && !wasActuallySpiritCast) {
                    console.log(`Step ${stepNum}: skipped (increaseAttribute boost sim result - mage cast)`);
                    return;
                  }

                  // Find the original step config (for spellId confirmation + caster info)
                  const stepIdx = steps.findIndex((s: any, i: number) => (i + 1) === stepNum);
                  const step = stepIdx !== -1 ? steps[stepIdx] : null;

                  const spellIdToUse = (step && step.cast?.spellId) || res.spellId;

                  const spell = ALL_SPELLS.find(s => s.id === spellIdToUse);
                  if (!spell) {
                    console.warn(`Step ${stepNum}: spell not found in ALL_SPELLS for id`, spellIdToUse);
                    return;
                  }

                  const achieved = res.services || 0;
                  const casterFromConfig = step?.cast?.caster || "mage";
                  const isSpiritCast = casterFromConfig === "spirit" || wasActuallySpiritCast;

                  console.log(`Step ${stepNum} [${casterFromConfig}]: result present, achieved=${achieved}, isSpiritCasting=${res.isSpiritCasting}, spellId=${spellIdToUse}`);

                  const newActiveSpell = {
                    id: `spell_routine_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
                    name: spell.name,
                    frenchName: spell.frenchName,
                    type: spell.type,
                    drain: parseInt(String(spell.drain)) || 3,
                    sustained: true,
                    duration: spell.duration || "Sustained",
                    hits: achieved,
                    castBySpirit: isSpiritCast,
                  };
                  draft.activeSpells.push(newActiveSpell);
                  addedCount++;
                  console.log(`  -> ADDED to activeSpells:`, newActiveSpell);
                });

                console.log(`Total spells added in this confirm: ${addedCount}`);
                console.log("draft.activeSpells after pushes:", draft.activeSpells);
              });

              console.groupEnd();

              // Ajouter tous les esprits temporaires
              tempSpirits.forEach((spirit: any) => {
                addSpirit(spirit);
              });

              setIsRoutineConfirmed(true);
            }}
            disabled={stepResults.length === 0 || isRoutineConfirmed}
            style={{ 
              padding: "12px 24px", 
              background: isRoutineConfirmed 
                ? "#334155" 
                : (stepResults.length > 0 ? "#22c55e" : "#334155"), 
              color: "white", 
              border: "none", 
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: (stepResults.length > 0 && !isRoutineConfirmed) ? "pointer" : "not-allowed",
              opacity: (stepResults.length > 0 && !isRoutineConfirmed) ? "1" : "0.6"
            }}
          >
            {isRoutineConfirmed 
              ? "✅ Confirmé" 
              : "✅ Confirmer"}
          </button>

          {/* Tradition */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>Tradition :</span>
            <select 
              value={routineTradition} 
              onChange={(e) => setRoutineTradition(e.target.value as "hermetic" | "shamanic")}
              style={{ padding: "8px", background: "#1e2937", color: "white", border: "1px solid #64748b", borderRadius: "6px" }}
            >
              <option value="hermetic">Hermétique (LOG)</option>
              <option value="shamanic">Chamanique (CHA)</option>
            </select>
          </div>

          {/* Attributs */}
          <div style={{ display: "flex", gap: "16px", color: "#e0f2fe" }}>
            <div>WIL: <strong>{routineWIL}</strong></div>
            <div>TDA: <strong>{routineTDA}</strong></div>
            <div>BOD: <strong>{routineBOD}</strong></div>
          </div>

          {/* Max Drain - Camouflé */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>Max Drain :</span>
            <div 
              onClick={() => setEditingMax(editingMax === "drain" ? null : "drain")}
              style={{ 
                background: "#0f172a", 
                padding: "6px 12px", 
                borderRadius: "8px", 
                minWidth: "50px", 
                textAlign: "center", 
                cursor: "pointer",
                border: editingMax === "drain" ? "2px solid #22ff88" : "1px solid #334155"
              }}
            >
              <strong>{maxDrainThreshold}</strong>
            </div>
            {editingMax === "drain" && (
              <div style={{ display: "flex", gap: "4px" }}>
                <button onClick={() => setMaxDrainThreshold(Math.max(0, maxDrainThreshold - 1))} style={{width:28,height:28,borderRadius:"50%"}}>-</button>
                <button onClick={() => setMaxDrainThreshold(Math.min(15, maxDrainThreshold + 1))} style={{width:28,height:28,borderRadius:"50%"}}>+</button>
              </div>
            )}
          </div>

          {/* Max Auto-Rest - Camouflé */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>Max Auto-Rest :</span>
            <div 
              onClick={() => setEditingMax(editingMax === "autorests" ? null : "autorests")}
              style={{ 
                background: "#0f172a", 
                padding: "6px 12px", 
                borderRadius: "8px", 
                minWidth: "50px", 
                textAlign: "center", 
                cursor: "pointer",
                border: editingMax === "autorests" ? "2px solid #22ff88" : "1px solid #334155"
              }}
            >
              <strong>{maxAutoRests}</strong>
            </div>
            {editingMax === "autorests" && (
              <div style={{ display: "flex", gap: "4px" }}>
                <button onClick={() => setMaxAutoRests(Math.max(1, maxAutoRests - 1))} style={{width:28,height:28,borderRadius:"50%"}}>-</button>
                <button onClick={() => setMaxAutoRests(maxAutoRests + 1)} style={{width:28,height:28,borderRadius:"50%"}}>+</button>
              </div>
            )}
          </div>

          {/* Accumulated Drain */}
          <div style={{ 
            marginLeft: "auto", 
            padding: "10px 20px", 
            background: totalDrain >= maxDrainThreshold ? "#7f1d1d" : "#1e2937", 
            border: `2px solid ${totalDrain >= maxDrainThreshold ? "#f87171" : "#67e8f9"}`,
            borderRadius: "10px",
            fontSize: "1.15rem",
            fontWeight: "bold"
          }}>
            Accumulated Drain : <span style={{ color: totalDrain >= maxDrainThreshold ? "#f87171" : "#67e8f9" }}>{totalDrain}</span>
          </div>
        </div>

        {/* ADD BUTTONS */}
        <div style={{ 
          padding: "12px 20px", 
          background: "#1e2937", 
          borderBottom: "2px solid #334155",
          display: "flex",
          gap: "12px"
        }}>
          <button onClick={addSummonStep} style={{ flex: 1, padding: "14px", background: "#22c55e", color: "#000", fontWeight: "bold", borderRadius: "10px" }}>
            ➕ Add Summoning
          </button>
          <button onClick={addCastStep} style={{ flex: 1, padding: "14px", background: "#c084fc", color: "#000", fontWeight: "bold", borderRadius: "10px" }}>
            ⚡ Add Spellcasting
          </button>
        </div>

        {/* RÉSULTATS */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <RoutineResults 
            steps={steps}
            stepResults={stepResults}
            onEditStep={setEditingStepIndex}
            onRemoveStep={removeStep}
            totalDrain={totalDrain}
            tempSpirits={tempSpirits}           // ← AJOUTE ÇA
            setTempSpirits={setTempSpirits}  
          />
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
          knownSpells={char.knownSpells || []}
        />
      )}
    </div>
  );
}