import React from "react";
import { SPIRIT_STATS, SpiritType } from "../data/spirits";

interface Spirit {
  id: number;
  element: string;
  force: number;
  servicesRemaining: number;
  conditionDamage: number;
  invocationDate: string;
  solarPhase: "Jour" | "Nuit";
  solarTokens: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  spirit: Spirit | null;
}

export default function SpiritSheetModal({ isOpen, onClose, spirit }: Props) {
  if (!isOpen || !spirit) return null;

  const F = spirit.force;
  const spiritType = spirit.element.toLowerCase() as SpiritType;
  const stats = SPIRIT_STATS[spiritType] || SPIRIT_STATS.fire;

  // Calcul Attributs
  const attributes: Record<string, number> = {};
  Object.entries(stats.attributes).forEach(([key, formula]) => {
    let val = F;
    if (formula.includes('+')) val = F + Number(formula.split('+')[1]);
    if (formula.includes('-')) val = F - Number(formula.split('-')[1]);
    attributes[key] = Math.max(1, val);
  });

  // Defense Rating
  let defenseRating = F;
  if (stats.defenseRating.includes('+')) {
    defenseRating = F + Number(stats.defenseRating.split('+')[1]);
  } else if (stats.defenseRating.includes('-')) {
    defenseRating = F - Number(stats.defenseRating.split('-')[1]);
  }

  // Initiatives
  const initPhysBase = (F * 2) + stats.initiativePhysical.baseModifier;
  const initPhys = `${initPhysBase} + ${stats.initiativePhysical.dice}D6`;

  const initAstralBase = (F * 2) + stats.initiativeAstral.baseModifier;
  const initAstral = `${initAstralBase} + ${stats.initiativeAstral.dice}D6`;

  const movement = stats.movement.replace(/F/g, F.toString());

  // Calcul Attack Rating
  const calculateAR = (ar: string): string => {
    let result = ar.replace(/F/g, F.toString());
    result = result.replace(/\((\d+)×2\)\+(\d+)/g, (_, base, mod) => (Number(base) * 2 + Number(mod)).toString());
    result = result.replace(/\((\d+)×2\)/g, (_, base) => (Number(base) * 2).toString());
    return result;
  };

  return (
    <div style={{ 
      position: "fixed", 
      inset: 0, 
      background: "rgba(0,0,0,0.95)", 
      zIndex: 1100, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      <div style={{ 
        background: "#0f172a", 
        width: "94%", 
        maxWidth: "680px", 
        borderRadius: "16px", 
        padding: "20px", 
        border: "2px solid #c084fc", 
        maxHeight: "92vh", 
        overflow: "auto" 
      }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>FICHE ESPRIT — {spirit.element.toUpperCase()}</h2>
          <button onClick={onClose} style={{ fontSize: "1.8rem", background: "none", border: "none", color: "#94a3b8" }}>✕</button>
        </div>

        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "2.4rem", fontWeight: "bold", color: "#c084fc" }}>{spirit.element}</div>
          <div style={{ color: "#67e8f9", fontSize: "1.4rem" }}>Force {F}</div>
        </div>

        <div style={{ background: "#1e2937", padding: "14px", borderRadius: "10px", marginBottom: "24px" }}>
          <div>📅 {new Date(spirit.invocationDate).toLocaleDateString('fr-FR')} — {spirit.solarPhase}</div>
          <div>🔵 Tokens Solaires : <strong>{spirit.solarTokens}/2</strong></div>
          <div>🛡️ Services restants : <strong>{spirit.servicesRemaining}</strong></div>
        </div>

        {/* Attributs */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ color: "#c084fc", fontWeight: "bold", marginBottom: "12px" }}>ATTRIBUTS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
            {Object.entries(attributes).map(([name, value]) => (
              <div key={name} style={{ background: "#1e2937", padding: "10px 12px", borderRadius: "8px" }}>
                <span style={{ color: "#94a3b8" }}>{name}</span>
                <span style={{ float: "right", fontWeight: "bold", color: "#67e8f9" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistiques de Combat */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ color: "#c084fc", fontWeight: "bold", marginBottom: "12px" }}>STATISTIQUES DE COMBAT</div>
          <div style={{ background: "#1e2937", padding: "14px", borderRadius: "10px", lineHeight: "1.8" }}>
            <div><strong>Defense Rating :</strong> <strong style={{ color: "#f87171" }}>{defenseRating}</strong></div>
            <div><strong>Mouvement :</strong> {movement}</div>
            <div><strong>Initiative Physique :</strong> <strong style={{ color: "#67e8f9" }}>{initPhys}</strong></div>
            <div><strong>Initiative Astrale :</strong> <strong style={{ color: "#67e8f9" }}>{initAstral}</strong></div>
          </div>
        </div>

        {/* Attaques */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ color: "#c084fc", fontWeight: "bold", marginBottom: "12px" }}>ATTAQUES</div>
          {stats.attacks.map((attack, i) => (
            <div key={i} style={{ background: "#1e2937", padding: "12px", borderRadius: "10px", marginBottom: "10px" }}>
              <div style={{ fontWeight: "bold", color: "#f87171" }}>{attack.name}</div>
              <div><strong>DV :</strong> {attack.dv}</div>
              <div><strong>AR :</strong> {calculateAR(attack.attackRatings)}</div>
            </div>
          ))}
        </div>

        {/* Pouvoirs */}
        <div>
          <div style={{ color: "#c084fc", fontWeight: "bold", marginBottom: "10px" }}>POUVOIRS DE BASE</div>
          <div style={{ background: "#1e2937", padding: "14px", borderRadius: "10px", marginBottom: "16px" }}>
            {stats.powers.map((p, i) => <div key={i}>• {p}</div>)}
          </div>

          <div style={{ color: "#c084fc", fontWeight: "bold", marginBottom: "10px" }}>POUVOIRS OPTIONNELS</div>
          <div style={{ background: "#1e2937", padding: "14px", borderRadius: "10px" }}>
            {stats.optionalPowers.map((p, i) => <div key={i}>• {p}</div>)}
          </div>
        </div>

        <button 
          onClick={onClose} 
          style={{ 
            width: "100%", 
            padding: "14px", 
            marginTop: "24px", 
            background: "#64748b", 
            color: "white", 
            border: "none", 
            borderRadius: "8px", 
            cursor: "pointer", 
            fontWeight: "bold" 
          }}
        >
          Retour
        </button>
      </div>
    </div>
  );
}