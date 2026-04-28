// src/components/SpiritSheetModal.tsx
import React, { useState, useEffect, useRef } from "react";
import { SPIRIT_STATS, SpiritType, POWER_DESCRIPTIONS } from "../data/spirits";
import { useCharacterContext } from "../contexts/CharacterContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  spirit: any;
}

export default function SpiritSheetModal({ isOpen, onClose, spirit }: Props) {
  const { updateSpirit } = useCharacterContext();

  const [selectedOptionalPowers, setSelectedOptionalPowers] = useState<Set<string>>(new Set());
  const [expandedPowers, setExpandedPowers] = useState<Set<string>>(new Set());
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (spirit?.optionalPowers) {
      setSelectedOptionalPowers(new Set(spirit.optionalPowers));
    }
  }, [spirit]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (spirit?.id) {
      updateSpirit(spirit.id, { optionalPowers: Array.from(selectedOptionalPowers) });
    }
  }, [selectedOptionalPowers, spirit?.id, updateSpirit]);

  if (!isOpen || !spirit || !spirit.element) return null;

  const F = spirit.force || 1;
  const spiritType = spirit.element.toLowerCase() as SpiritType;
  const stats = SPIRIT_STATS[spiritType] || SPIRIT_STATS.fire;

  const getAttribute = (attr: string): number => {
    const modifier = stats.attributes[attr] ?? 0;
    return F + modifier;
  };

  // ====================== RESOLVE AR (corrigé) ======================
  const resolveAR = (arString: string): string => {
    if (!arString) return "—";

    return arString.split('/').map(part => {
      const p = part.trim();
      if (p === "-" || p === "") return "-";
      if (p === "0") return (F * 2).toString();           // Base = Force × 2

      // Modificateurs (+1, -2, *3, etc.)
      if (p.startsWith("+")) return (F * 2 + parseInt(p)).toString();
      if (p.startsWith("-")) return (F * 2 + parseInt(p)).toString();
      if (p.startsWith("*")) return (F * parseInt(p.substring(1))).toString();

      return p; // valeur brute
    }).join('/');
  };

  const resolve = (text: string): string => {
    if (!text) return "—";
    return text
      .replace(/\{F\}/g, F.toString())
      .replace(/\{F\+2\}/g, (F + 2).toString())
      .replace(/\{F\/2 \+ 1\}/g, (Math.floor(F / 2) + 1).toString());
  };

  const toggleOptionalPower = (power: string) => {
    const newSet = new Set(selectedOptionalPowers);
    newSet.has(power) ? newSet.delete(power) : newSet.add(power);
    setSelectedOptionalPowers(newSet);
  };

  const toggleDescription = (power: string) => {
    const newSet = new Set(expandedPowers);
    newSet.has(power) ? newSet.delete(power) : newSet.add(power);
    setExpandedPowers(newSet);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 2000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "10px"
    }}>
      <div style={{
        background: "#0f172a", width: "100%", maxWidth: "800px", borderRadius: "16px",
        border: "2px solid #c084fc", maxHeight: "94vh", overflow: "auto", padding: "24px"
      }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ color: "#c084fc", margin: 0, fontSize: "2rem" }}>
            {spirit.element.toUpperCase()} — Force {F}
          </h2>
          <button onClick={onClose} style={{ fontSize: "2.4rem", background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>✕</button>
        </div>

        {/* ATTRIBUTES */}
        <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "16px" }}>ATTRIBUTES</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "16px" }}>
            {Object.entries(stats.attributes).map(([key]) => (
              <div key={key} style={{ textAlign: "center" }}>
                <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{key}</div>
                <div style={{ color: "#f1f5f9", fontSize: "1.85rem", fontWeight: "bold" }}>
                  {getAttribute(key)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ATTACKS */}
        <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "16px" }}>ATTACKS</h3>
          {stats.attacks.map((attack, i) => (
            <div key={i} style={{ background: "#0f172a", padding: "16px", borderRadius: "10px", marginBottom: "12px" }}>
              <strong style={{ color: "#e0f2fe" }}>{attack.name}</strong><br />
              <span style={{ color: "#f87171" }}>DV: {resolve(attack.dv)}</span><br />
              <span style={{ color: "#67e8f9" }}>AR: {resolveAR(attack.ar)}</span>
            </div>
          ))}
        </div>

        {/* COMBAT STATISTICS */}
        <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "16px" }}>COMBAT STATISTICS</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", lineHeight: "1.8" }}>
            <div><strong>Defense Rating:</strong> {F + stats.defenseRating}</div>
            <div><strong>Movement:</strong> {stats.movement}</div>
            <div><strong>Init Physical:</strong> {F + stats.initiativePhysical.baseModifier} + {stats.initiativePhysical.dice}D6</div>
            <div><strong>Init Astral:</strong> {F + stats.initiativeAstral.baseModifier} + {stats.initiativeAstral.dice}D6</div>
          </div>
        </div>

        {/* BASE POWERS */}
        <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "16px" }}>BASE POWERS</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {stats.powers.map((p, i) => (
              <div key={i} onClick={() => toggleDescription(p)}
                style={{ background: "#334155", padding: "8px 14px", borderRadius: "9999px", fontSize: "0.95rem", color: "#e0f2fe", cursor: "pointer" }}>
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* OPTIONAL POWERS */}
        <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "16px" }}>OPTIONAL POWERS</h3>
          {stats.optionalPowers.map((p, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={selectedOptionalPowers.has(p)}
                  onChange={() => toggleOptionalPower(p)}
                  style={{ marginRight: "12px", accentColor: "#67e8f9", transform: "scale(1.3)" }}
                />
                <span style={{ color: "#67e8f9", flex: 1 }} onClick={() => toggleDescription(p)}>{p}</span>
              </label>
              {expandedPowers.has(p) && POWER_DESCRIPTIONS[p] && (
                <div style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "8px", paddingLeft: "36px", lineHeight: "1.5" }}>
                  {POWER_DESCRIPTIONS[p]}
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={onClose} style={{ width: "100%", padding: "18px", marginTop: "30px", background: "#334155", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold" }}>
          Fermer la Fiche
        </button>
      </div>
    </div>
  );
}