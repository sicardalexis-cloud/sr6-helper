import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  char: any;
  update: (fn: (draft: any) => void) => void;
  addSpirit: (spirit: any) => void;
}

export default function SummoningModal({ isOpen, onClose, char, update, addSpirit }: Props) {
  const [element, setElement] = useState("Fire");
  const [force, setForce] = useState(4);
  const [conjuringPool, setConjuringPool] = useState(8);
  const [drainResistancePool, setDrainResistancePool] = useState(8);

  const [useRetry, setUseRetry] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState(10);     // ← Modifié à 10
  const [maxDrain, setMaxDrain] = useState(3);

  const [result, setResult] = useState<any>(null);
  const [rolling, setRolling] = useState(false);

  if (!isOpen) return null;

  const elements = ["Air", "Water", "Fire", "Earth", "Man", "Beasts", "Plant", "Guardian", "Guidance", "Task"];

  const rollDice = (count: number) => Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);

  const performSummon = (attempt: number) => {
    const invocationRolls = rollDice(conjuringPool);
    const spiritResistanceRolls = rollDice(force * 2);
    const drainResistanceRolls = rollDice(drainResistancePool);

    const invocationHits = invocationRolls.filter(d => d >= 5).length;
    const spiritHits = spiritResistanceRolls.filter(d => d >= 5).length;
    const drainHits = drainResistanceRolls.filter(d => d >= 5).length;

    const netHits = Math.max(0, invocationHits - spiritHits);
    const drainFinal = Math.max(0, spiritHits - drainHits);

    return {
      element, force,
      invocationHits, invocationRolls,
      spiritHits, spiritResistanceRolls,
      drainHits, drainResistanceRolls,
      netHits, drainFinal,
      attempt,
      status: netHits >= 1 ? "Succès" : "Échec"
    };
  };

  const handleSummon = async () => {
    setRolling(true);
    setResult(null);

    let totalDrain = 0;
    let finalResult: any = null;
    let attempt = 1;
    const maxTries = useRetry ? maxAttempts : 1;

    for (let i = 1; i <= maxTries; i++) {
      attempt = i;
      const rollResult = performSummon(attempt);
      totalDrain += rollResult.drainFinal;
      finalResult = rollResult;

      setResult({
        ...rollResult,
        attempts: attempt,
        totalDrain
      });

      if (rollResult.netHits >= 1 || !useRetry || totalDrain >= maxDrain) {
        break;
      }

      await new Promise(r => setTimeout(r, 600));
    }

    setRolling(false);
  };

  const validateSummoning = () => {
    if (!result) return;

    addSpirit({
      element: result.element,
      force: result.force,
      services: result.netHits,
      drain: result.totalDrain,
      timestamp: new Date().toLocaleTimeString()
    });

    update((draft: any) => {
      draft.drainStun = (draft.drainStun || 0) + result.totalDrain;
    });

    setResult(null);
    onClose();
  };

  const DiceDisplay = ({ rolls, label, color }: { rolls: number[], label: string, color: string }) => (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ color: "#94a3b8", marginBottom: "8px", fontWeight: "bold" }}>{label}</div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {rolls.map((die, i) => (
          <div key={i} style={{
            width: "34px", height: "34px",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: die >= 5 ? color : "#1e2937",
            border: "2px solid #475569",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: die >= 5 ? "#111" : "#e2e8f0"
          }}>
            {die}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "right", marginTop: "4px", color: "#94a3b8" }}>
        Hits : <strong>{rolls.filter(d => d >= 5).length}</strong>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f172a", width: "94%", maxWidth: "620px", borderRadius: "16px", padding: "20px", border: "2px solid #22d3ee", maxHeight: "94vh", overflow: "auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ color: "#67e8f9", margin: 0 }}>SUMMONING</h2>
          <button onClick={onClose} style={{ fontSize: "1.8rem", background: "none", border: "none", color: "#94a3b8" }}>✕</button>
        </div>

        {/* Spirit Type */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ color: "#94a3b8", marginBottom: "8px" }}>Spirit Type</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {elements.map(el => (
              <button key={el} onClick={() => setElement(el)}
                style={{ padding: "10px 16px", background: element === el ? "#7c3aed" : "#1e2937", color: element === el ? "white" : "#e2e8f0", borderRadius: "8px", border: "none" }}>
                {el}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span>Conjuring + Magic</span>
            <span style={{ color: "#4ade80", fontWeight: "bold" }}>{conjuringPool}</span>
          </div>
          <input type="range" min="0" max="16" value={conjuringPool} onChange={e => setConjuringPool(Number(e.target.value))} style={{ width: "100%" }} />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span>Spirit Force</span>
            <span style={{ color: "#eab308", fontWeight: "bold" }}>{force}</span>
          </div>
          <input type="range" min="1" max="8" value={force} onChange={e => setForce(Number(e.target.value))} style={{ width: "100%" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span>Drain Resistance</span>
            <span style={{ color: "#a855f7", fontWeight: "bold" }}>{drainResistancePool}</span>
          </div>
          <input type="range" min="1" max="16" value={drainResistancePool} onChange={e => setDrainResistancePool(Number(e.target.value))} style={{ width: "100%" }} />
        </div>

        {/* Retry Options */}
        <div style={{ background: "#1e2937", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input type="checkbox" checked={useRetry} onChange={e => setUseRetry(e.target.checked)} />
            <span>Activer Auto-Retry</span>
          </label>

          {useRetry && (
            <>
              <div style={{ marginTop: "12px" }}>Max essais : <strong>{maxAttempts}</strong></div>
              <input type="range" min="1" max="10" value={maxAttempts} onChange={e => setMaxAttempts(Number(e.target.value))} style={{ width: "100%" }} />
              <div style={{ marginTop: "12px" }}>Drain max accepté : <strong>{maxDrain}</strong></div>
              <input type="range" min="1" max="6" value={maxDrain} onChange={e => setMaxDrain(Number(e.target.value))} style={{ width: "100%" }} />
            </>
          )}
        </div>

        <button 
          onClick={handleSummon}
          disabled={rolling}
          style={{ width: "100%", padding: "16px", fontSize: "1.2rem", fontWeight: "bold", background: "linear-gradient(90deg, #7c3aed, #ec4899)", border: "none", borderRadius: "12px", color: "white", marginBottom: "20px" }}
        >
          {rolling ? `Invocation en cours...` : `🔥 Summon ${element} Spirit`}
        </button>

        {result && (
          <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ color: result.netHits >= 1 ? "#4ade80" : "#f87171", textAlign: "center" }}>
              {result.status} après {result.attempts} tentative(s)
            </h3>

            <div style={{ textAlign: "center", margin: "16px 0", fontSize: "1.4rem" }}>
              Net Hits : <strong>{result.netHits}</strong> | Drain total : <strong style={{ color: "#f87171" }}>{result.totalDrain}</strong>
            </div>

            <DiceDisplay rolls={result.invocationRolls} label="🔮 Jet d'Invocation" color="#4ade80" />
            <DiceDisplay rolls={result.spiritResistanceRolls} label="🛡️ Résistance de l'Esprit (Force × 2)" color="#f87171" />
            <DiceDisplay rolls={result.drainResistanceRolls} label="🛡️ Résistance au Drain" color="#a855f7" />

            <button 
              onClick={validateSummoning}
              style={{ width: "100%", padding: "16px", background: "#22c55e", color: "#111", border: "none", borderRadius: "12px", fontWeight: "bold", marginTop: "20px" }}
            >
              ✅ Validate Summoning
            </button>
          </div>
        )}

        <button onClick={onClose} style={{ width: "100%", padding: "14px", marginTop: "12px", background: "transparent", border: "2px solid #64748b", color: "#94a3b8", borderRadius: "8px" }}>
          Fermer
        </button>
      </div>
    </div>
  );
}