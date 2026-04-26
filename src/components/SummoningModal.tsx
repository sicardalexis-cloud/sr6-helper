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
  const [result, setResult] = useState<any>(null);
  const [rolling, setRolling] = useState(false);

  if (!isOpen) return null;

  const elements = ["Air", "Water", "Fire", "Earth", "Man", "Beasts", "Plant", "Guardian", "Guidance", "Task"];

  const rollDice = (count: number) => Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);

  const handleSummon = () => {
    setRolling(true);
    setResult(null);

    setTimeout(() => {
      const invocationRolls = rollDice(conjuringPool);
      const spiritResistanceRolls = rollDice(force * 2);
      const drainResistanceRolls = rollDice(drainResistancePool);

      const invocationHits = invocationRolls.filter(d => d >= 5).length;
      const spiritHits = spiritResistanceRolls.filter(d => d >= 5).length;
      const drainHits = drainResistanceRolls.filter(d => d >= 5).length;

      const netHits = Math.max(0, invocationHits - spiritHits);
      const drainBrut = spiritHits;
      const drainFinal = Math.max(0, drainBrut - drainHits);

      setResult({
        element,
        force,
        invocationHits,
        invocationRolls,
        spiritHits,
        spiritResistanceRolls,
        drainHits,
        drainResistanceRolls,
        netHits,
        drainBrut,
        drainFinal,
        status: netHits >= 1 ? "Succès" : "Échec"
      });
      setRolling(false);
    }, 800);
  };

  const validateSummoning = () => {
    if (!result) return;

    // Ajoute l'esprit aux Active Spirits
    addSpirit({
      element: result.element,
      force: result.force,
      services: result.netHits,
      drain: result.drainFinal,
      timestamp: new Date().toLocaleTimeString()
    });

    // Ajoute le drain dans Drain Stun
    update((draft: any) => {
      draft.drainStun = (draft.drainStun || 0) + result.drainFinal;
    });

    alert(`✅ ${result.element} Spirit invoqué avec succès !\n${result.drainFinal} drain ajouté à Drain Stun.`);

    setResult(null);
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f172a", width: "94%", maxWidth: "560px", borderRadius: "16px", padding: "20px", border: "2px solid #22d3ee", maxHeight: "94vh", overflow: "auto" }}>
        
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

        {/* Conjuring Pool */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span>Conjuring + Magic (dice pool)</span>
            <span style={{ color: "#4ade80", fontWeight: "bold" }}>{conjuringPool}</span>
          </div>
          <input type="range" min="0" max="16" value={conjuringPool} onChange={e => setConjuringPool(Number(e.target.value))} style={{ width: "100%" }} />
        </div>

        {/* Spirit Force */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span>Spirit Force</span>
            <span style={{ color: "#eab308", fontWeight: "bold" }}>{force}</span>
          </div>
          <input type="range" min="1" max="8" value={force} onChange={e => setForce(Number(e.target.value))} style={{ width: "100%" }} />
        </div>

        {/* Drain Resistance */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span>Drain Resistance (Will+Cha)</span>
            <span style={{ color: "#a855f7", fontWeight: "bold" }}>{drainResistancePool}</span>
          </div>
          <input type="range" min="1" max="16" value={drainResistancePool} onChange={e => setDrainResistancePool(Number(e.target.value))} style={{ width: "100%" }} />
        </div>

        <button 
          onClick={handleSummon}
          disabled={rolling}
          style={{ width: "100%", padding: "16px", fontSize: "1.2rem", fontWeight: "bold", background: "linear-gradient(90deg, #7c3aed, #ec4899)", border: "none", borderRadius: "12px", color: "white", marginBottom: "20px" }}
        >
          {rolling ? "Lancement des dés..." : `🔥 Summon ${element} Spirit`}
        </button>

        {result && (
          <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ color: result.status === "Succès" ? "#4ade80" : "#f87171", textAlign: "center" }}>
              {result.status} !
            </h3>

            <div style={{ margin: "16px 0", textAlign: "center", fontSize: "1.3rem", fontWeight: "bold" }}>
              Net Hits : <span style={{ color: "#4ade80" }}>{result.netHits}</span>
            </div>

            <div style={{ background: "#1e2937", padding: "14px", borderRadius: "8px", textAlign: "center", marginBottom: "16px" }}>
              Drain final : <strong style={{ color: "#f87171" }}>{result.drainFinal}</strong> dégâts étourdissants
            </div>

            <button 
              onClick={validateSummoning}
              style={{ width: "100%", padding: "16px", background: "#22c55e", color: "#111", border: "none", borderRadius: "12px", fontWeight: "bold" }}
            >
              ✅ Validate Summoning — Add Drain
            </button>
          </div>
        )}

        <button onClick={onClose} style={{ width: "100%", padding: "14px", marginTop: "16px", background: "transparent", border: "2px solid #64748b", color: "#94a3b8", borderRadius: "8px" }}>
          Fermer
        </button>
      </div>
    </div>
  );
}