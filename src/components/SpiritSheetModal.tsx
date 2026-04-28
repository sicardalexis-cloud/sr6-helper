// src/components/SpiritSheetModal.tsx
import React, { useState, useEffect } from "react";
import { SPIRIT_STATS, SpiritType, POWER_DESCRIPTIONS } from "../data/spirits";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  spirit: any;
}

export default function SpiritSheetModal({ isOpen, onClose, spirit }: Props) {

  // ==================== HOOKS ====================
  const [selectedOptionalPowers, setSelectedOptionalPowers] = useState<Set<string>>(
    new Set(spirit?.optionalPowers || [])
  );
  const [expandedPowers, setExpandedPowers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !spirit) return null;

  const F = spirit.force || 1;
  const spiritType = spirit.element.toLowerCase() as SpiritType;
  const stats = SPIRIT_STATS[spiritType] || SPIRIT_STATS.fire;

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

  const getAttribute = (attr: string): number => {
    const modifier = stats.attributes?.[attr] ?? 0;
    return F + modifier;
  };

  const resolve = (text: string): string => {
    if (!text) return "—";
    return text
      .replace(/\{F\}/g, F.toString())
      .replace(/\{F\+2\}/g, (F + 2).toString())
      .replace(/\{F\/2\}/g, Math.floor(F / 2).toString());
  };

  const resolveAR = (arString: string): string => {
    if (!arString) return "—";
    return arString.split('/').map(part => {
      const p = part.trim();
      if (p === "-" || p === "") return "-";
      if (p === "0") return (F * 2).toString();
      if (p.startsWith("+")) return (F * 2 + parseInt(p)).toString();
      if (p.startsWith("-")) return (F * 2 + parseInt(p)).toString();
      return p;
    }).join('/');
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "10px"
    }}>
      <div style={{
        background: "#0f172a", width: "100%", maxWidth: "860px", borderRadius: "16px",
        border: "2px solid #67e8f9", padding: "24px", maxHeight: "92vh", overflow: "auto"
      }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ color: "#67e8f9", margin: 0 }}>
            {spirit.element} — Force {F}
          </h2>
          <button onClick={onClose} style={{ fontSize: "2rem", background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>✕</button>
        </div>

        {/* ATTRIBUTES - SANS FORMULES */}
        <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "16px" }}>ATTRIBUTES</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "16px" }}>
            {Object.keys(stats.attributes || {}).map(attr => {
              const value = getAttribute(attr);
              return (
                <div key={attr} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#67e8f9", lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: "1rem", color: "#94a3b8", marginTop: "4px" }}>{attr}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ATTACKS */}
        {stats.attacks?.length > 0 && (
          <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
            <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>ATTACKS</h3>
            {stats.attacks.map((attack: any, i: number) => (
              <div key={i} style={{ marginBottom: "14px", padding: "14px", background: "#0f172a", borderRadius: "8px" }}>
                <strong style={{ color: "#c084fc" }}>{attack.name}</strong><br />
                <span style={{ color: "#f87171" }}>DV: {resolve(attack.dv)}</span><br />
                <span style={{ color: "#94a3b8" }}>AR: {resolveAR(attack.ar)}</span>
              </div>
            ))}
          </div>
        )}

        {/* BASE POWERS */}
        <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>BASE POWERS</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {stats.powers?.map((p: string, i: number) => (
              <div key={i} style={{ background: "#334155", color: "#e0f2fe", padding: "8px 16px", borderRadius: "9999px", fontSize: "0.9rem" }}>
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* OPTIONAL POWERS */}
        <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "16px" }}>OPTIONAL POWERS</h3>
          {stats.optionalPowers?.map((p: string, i: number) => (
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
                <div style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "8px", paddingLeft: "36px", lineHeight: "1.45" }}>
                  {POWER_DESCRIPTIONS[p]}
                </div>
              )}
            </div>
          ))}
        </div>

        <button 
          onClick={onClose} 
          style={{ width: "100%", padding: "18px", marginTop: "30px", background: "#334155", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold" }}
        >
          Fermer la fiche
        </button>
      </div>
    </div>
  );
}