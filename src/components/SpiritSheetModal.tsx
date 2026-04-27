import React, { useState } from "react";
import { SPIRIT_STATS, SpiritType, POWER_DESCRIPTIONS } from "../data/spirits";

interface Spirit {
  id: number;
  element: string;
  force: number;
  servicesRemaining: number;
  conditionDamage: number;
  invocationDate: string;
  solarPhase: "Day" | "Night";
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

  // État pour les pouvoirs optionnels cochés
  const [selectedOptionalPowers, setSelectedOptionalPowers] = useState<Set<string>>(new Set());

  const toggleOptionalPower = (power: string) => {
    const newSet = new Set(selectedOptionalPowers);
    if (newSet.has(power)) {
      newSet.delete(power);
    } else {
      newSet.add(power);
    }
    setSelectedOptionalPowers(newSet);
  };

  const [expandedPowers, setExpandedPowers] = useState<Set<string>>(new Set());

  const toggleDescription = (power: string) => {
    const newSet = new Set(expandedPowers);
    if (newSet.has(power)) newSet.delete(power);
    else newSet.add(power);
    setExpandedPowers(newSet);
  };

  // Calculs (identiques)
  const attributes: Record<string, number> = {};
  Object.entries(stats?.attributes || {}).forEach(([key, formula]) => {
    let val = F;
    if (typeof formula === "string") {
      if (formula.includes('+')) val = F + Number(formula.split('+')[1] || 0);
      if (formula.includes('-')) val = F - Number(formula.split('-')[1] || 0);
    }
    attributes[key] = Math.max(1, val);
  });

  let defenseRating = F;
  const dr = stats?.defenseRating || "F";
  if (dr.includes('+')) defenseRating = F + Number(dr.split('+')[1] || 0);
  else if (dr.includes('-')) defenseRating = F - Number(dr.split('-')[1] || 0);

  const initPhys = `${(F * 2) + (stats?.initiativePhysical?.baseModifier || 0)} + ${stats?.initiativePhysical?.dice || 2}D6`;
  const initAstral = `${(F * 2) + (stats?.initiativeAstral?.baseModifier || 0)} + ${stats?.initiativeAstral?.dice || 3}D6`;

  const movement = (stats?.movement || "10/15/+1").replace(/F/g, F.toString());

  const calculateAR = (ar: string): string => {
    if (!ar) return "-";
    let result = ar.replace(/F/g, F.toString());
    result = result.replace(/\((\d+)×2\)\+(\d+)/g, (_, b, m) => (Number(b) * 2 + Number(m)).toString());
    result = result.replace(/\((\d+)×2\)/g, (_, b) => (Number(b) * 2).toString());
    return result;
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f172a", width: "94%", maxWidth: "720px", borderRadius: "16px", padding: "24px", border: "2px solid #c084fc", maxHeight: "92vh", overflow: "auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>SPIRIT SHEET — {spirit.element.toUpperCase()}</h2>
          <button onClick={onClose} style={{ fontSize: "2.2rem", background: "none", border: "none", color: "#94a3b8" }}>✕</button>
        </div>

        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "2.8rem", fontWeight: "bold", color: "#c084fc" }}>{spirit.element}</div>
          <div style={{ color: "#67e8f9", fontSize: "1.5rem" }}>Force {F}</div>
        </div>

        <div style={{ background: "#1e2937", padding: "16px", borderRadius: "12px", marginBottom: "28px", textAlign: "center" }}>
          📅 {new Date(spirit.invocationDate).toLocaleDateString('en-US')} — {spirit.solarPhase} | 
          🔵 Solar Tokens: <strong>{spirit.solarTokens}/2</strong> | 
          🛡️ Services: <strong>{spirit.servicesRemaining}</strong>
        </div>

        {/* ATTRIBUTES */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ color: "#c084fc", fontWeight: "bold", marginBottom: "12px" }}>ATTRIBUTES</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
            {Object.entries(attributes).map(([name, value]) => (
              <div key={name} style={{ background: "#1e2937", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                <div style={{ color: "#94a3b8" }}>{name}</div>
                <div style={{ fontSize: "1.7rem", fontWeight: "bold", color: "#67e8f9" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ color: "#c084fc", fontWeight: "bold", marginBottom: "12px" }}>SKILLS</div>
          <div style={{ background: "#1e2937", padding: "16px", borderRadius: "12px" }}>
            {stats?.skills?.length ? stats.skills.map((s, i) => <div key={i}>• {s}</div>) : <div>No skills listed.</div>}
          </div>
        </div>

        {/* COMBAT STATISTICS */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ color: "#c084fc", fontWeight: "bold", marginBottom: "12px" }}>COMBAT STATISTICS</div>
          <div style={{ background: "#1e2937", padding: "16px", borderRadius: "12px" }}>
            <div><strong>Defense Rating:</strong> <strong style={{ color: "#f87171" }}>{defenseRating}</strong></div>
            <div><strong>Movement:</strong> {movement}</div>
            <div><strong>Physical Initiative:</strong> <strong style={{ color: "#67e8f9" }}>{initPhys}</strong></div>
            <div><strong>Astral Initiative:</strong> <strong style={{ color: "#67e8f9" }}>{initAstral}</strong></div>
          </div>
        </div>

        {/* ATTACKS */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ color: "#c084fc", fontWeight: "bold", marginBottom: "12px" }}>ATTACKS</div>
          {stats?.attacks?.length ? stats.attacks.map((a, i) => (
            <div key={i} style={{ background: "#1e2937", padding: "16px", borderRadius: "12px", marginBottom: "10px" }}>
              <strong style={{ color: "#f87171" }}>{a.name}</strong> — DV: {a.dv} | AR: {calculateAR(a.attackRatings)}
            </div>
          )) : <div>No attacks defined.</div>}
        </div>

        {/* BASE POWERS (cliquable pour description) */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ color: "#c084fc", fontWeight: "bold", marginBottom: "12px" }}>BASE POWERS</div>
          <div style={{ background: "#1e2937", padding: "16px", borderRadius: "12px" }}>
            {stats?.powers?.map((p, i) => (
              <div key={i} style={{ marginBottom: "12px", cursor: "pointer" }} onClick={() => toggleDescription(p)}>
                <div style={{ display: "flex", alignItems: "center", color: "#67e8f9" }}>
                  <span style={{ marginRight: "8px" }}>▶</span>
                  <strong>{p}</strong>
                </div>
                {expandedPowers.has(p) && POWER_DESCRIPTIONS[p] && (
                  <div style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "8px", paddingLeft: "28px", lineHeight: "1.45" }}>
                    {POWER_DESCRIPTIONS[p]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* OPTIONAL POWERS avec cases à cocher */}
        <div>
          <div style={{ color: "#c084fc", fontWeight: "bold", marginBottom: "12px" }}>OPTIONAL POWERS</div>
          <div style={{ background: "#1e2937", padding: "16px", borderRadius: "12px" }}>
            {stats?.optionalPowers?.map((p, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={selectedOptionalPowers.has(p)}
                    onChange={() => toggleOptionalPower(p)}
                    style={{ marginRight: "10px", accentColor: "#67e8f9", transform: "scale(1.2)" }}
                  />
                  <span 
                    style={{ color: "#67e8f9", fontWeight: "500", flex: 1 }} 
                    onClick={() => toggleDescription(p)}
                  >
                    {p}
                  </span>
                </label>

                {expandedPowers.has(p) && POWER_DESCRIPTIONS[p] && (
                  <div style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "6px", paddingLeft: "32px", lineHeight: "1.45" }}>
                    {POWER_DESCRIPTIONS[p]}
                  </div>
                )}
              </div>
            )) || <div>No optional powers available.</div>}
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{ width: "100%", padding: "16px", marginTop: "30px", background: "#334155", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold" }}
        >
          Close
        </button>
      </div>
    </div>
  );
}