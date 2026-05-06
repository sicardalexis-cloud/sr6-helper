import React from "react";
import { ALL_SPELLS } from "../../data/spells";

export default function RoutineResults({ 
  steps, 
  stepResults, 
  onEditStep, 
  onRemoveStep,
  totalDrain,
  tempSpirits = [],           // Valeur par défaut
  setTempSpirits              // Pour supprimer
}: any) {

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px", background: "#0f172a" }}>
      
      <div style={{ marginBottom: "20px", padding: "14px", background: "#1e2937", borderRadius: "10px", textAlign: "center", fontSize: "1.2rem" }}>
        Accumulated Drain : <strong style={{ color: totalDrain >= 12 ? "#f87171" : "#67e8f9" }}>{totalDrain}</strong>
      </div>

      {steps.map((step: any, i: number) => {
        const stepResultsHere = stepResults.filter((r: any) => r.stepNumber === i + 1);
        const main = stepResultsHere.find((r: any) => !r.isAutoRest);
        const rests = stepResultsHere.filter((r: any) => r.isAutoRest);

        let stepTitle = step.type?.toUpperCase() || "ÉTAPE";
        if (step.type === "summon" && step.summon?.spiritType) {
          stepTitle = `SUMMON ${step.summon.spiritType.toUpperCase()}`;
        }
        if (step.type === "cast" && step.cast?.spellId) {
          const spell = ALL_SPELLS.find(s => s.id === step.cast.spellId);
          stepTitle = spell 
            ? `CAST ${spell.name || spell.frenchName || "UNKNOWN"}` 
            : "CAST SPELL";
        }

        return (
          <div 
            key={i} 
            onClick={() => onEditStep(i)}
            style={{
              marginBottom: "20px",
              padding: "18px",
              background: "#1e2937",
              borderRadius: "12px",
              border: main?.interruptedByDrain ? "2px solid #f87171" : "1px solid #334155",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#25344a"}
            onMouseOut={(e) => e.currentTarget.style.background = "#1e2937"}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <strong style={{ color: "#c084fc", fontSize: "1.15rem" }}>
                Étape {i + 1} — {stepTitle}
              </strong>
              <button 
                onClick={(e) => { e.stopPropagation(); onRemoveStep(i); }} 
                style={{ color: "#f87171", fontSize: "1.3rem", background: "none", border: "none", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            {/* JETS PRINCIPAUX */}
            {main && main.allAttempts?.length > 0 ? (
              <div style={{ marginBottom: "16px" }}>
                {main.allAttempts.map((att: any, idx: number) => (
                  <div key={idx} style={{ 
                    background: "#111827", 
                    padding: "14px", 
                    marginBottom: "10px", 
                    borderRadius: "8px",
                    borderLeft: "5px solid #67e8f9"
                  }}>
                    <strong>Tentative {idx + 1}</strong><br />

                    {main.type === "summon" ? (
                      <>
                        Inv: <span style={{color: "#67e8f9"}}>{att.invocationRolls?.join(", ") || "—"}</span><br />
                        Esp: <span style={{color: "#a5b4fc"}}>{att.spiritRolls?.join(", ") || "—"}</span><br />
                        Dr:  <span style={{color: "#f87171"}}>{att.drainRolls?.join(", ") || "—"}</span><br />
                        <strong style={{ color: "#f87171" }}>Drain causé = {att.drainThisAttempt ?? "—"}</strong>
                      </>
                    ) : (
                      <>
                        Sort: <span style={{color: "#67e8f9"}}>{att.spellRolls?.join(", ") || "—"}</span><br />
                        Dr:   <span style={{color: "#f87171"}}>{att.drainRolls?.join(", ") || "—"}</span><br />
                        <strong style={{ color: "#f87171" }}>Drain causé = {att.drainThisAttempt ?? "—"}</strong>
                      </>
                    )}
                  </div>
                ))}

                <div style={{ marginTop: "12px", fontSize: "1.1rem" }}>
                  Services / Hits : <strong style={{color: "#22c55e"}}>{main.services || 0}</strong> | 
                  Drain final : <strong style={{color: "#f87171"}}>{main.drain || 0}</strong>
                </div>
              </div>
            ) : (
              <div style={{ color: "#64748b", fontStyle: "italic", marginBottom: "12px" }}>
                Aucun jet enregistré pour cette étape
              </div>
            )}

            {/* AUTO RESTS */}
            {rests.length > 0 && (
              <div style={{ 
                padding: "12px", 
                background: "#1a252f", 
                border: "1px dashed #eab308", 
                borderRadius: "8px",
                marginTop: "12px"
              }}>
                <div style={{ color: "#eab308", fontWeight: "bold", marginBottom: "10px" }}>🔄 Auto Rests</div>
                {rests.map((r: any, idx: number) => (
                  <div key={idx} style={{ marginBottom: "10px", color: "#cbd5e1" }}>
                    <strong>Rest #{r.autoRestNumber}</strong> (tentative {r.triggeredByAttempt || "?"})<br />
                    Jets : <span style={{ color: "#67e8f9" }}>{r.rolls?.join(", ") || "—"}</span><br />
                    Hits : <strong>{r.hits}</strong> • Drain récupéré : <strong style={{color: "#22c55e"}}>-{r.drainHealed}</strong>
                  </div>
                ))}
              </div>
            )}

            {/* === ESPRITS TEMPORAIRES === */}
            {tempSpirits && tempSpirits.length > 0 && (
              <div style={{ 
                marginTop: "20px", 
                padding: "14px", 
                background: "#1a252f", 
                border: "2px solid #eab308", 
                borderRadius: "10px" 
              }}>
                <div style={{ color: "#eab308", fontWeight: "bold", marginBottom: "12px" }}>
                  ⚔️ Esprits Temporaires Invoqués ({tempSpirits.length})
                </div>
                
                {tempSpirits.map((spirit: any, idx: number) => (
                  <div key={spirit.id || idx} style={{
                    background: "#111827",
                    padding: "12px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <strong>{spirit.name}</strong><br />
                      Force : <strong>{spirit.force}</strong> | 
                      Services : <strong style={{color: "#22c55e"}}>{spirit.services}</strong>
                    </div>
                    <button 
                      onClick={() => setTempSpirits((prev: any[]) => prev.filter((_, i) => i !== idx))}
                      style={{ 
                        background: "#f87171", 
                        color: "white", 
                        border: "none", 
                        padding: "4px 10px", 
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.9rem"
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}