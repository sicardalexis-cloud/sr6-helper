// src/components/SpiritSheetModal.tsx
import React, { useState, useEffect } from "react";
import { SPIRIT_STATS, SpiritType, POWER_DESCRIPTIONS } from "../data/spirits";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  spirit: any;
}

export default function SpiritSheetModal({ isOpen, onClose, spirit }: Props) {

  // ==================== STATES ====================
  const [selectedOptionalPowers, setSelectedOptionalPowers] = useState<Set<string>>(
    new Set(spirit?.optionalPowers || [])
  );
  const [selectedPower, setSelectedPower] = useState<string | null>(null);
  const [editedAttributes, setEditedAttributes] = useState<Record<string, number>>({});
  const [editingAttr, setEditingAttr] = useState<string | null>(null);

  // ==================== EFFECTS ====================
  useEffect(() => {
    if (!isOpen) {
      setSelectedPower(null);
    }
  }, [isOpen]);

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

  const showPowerDescription = (power: string) => {
    setSelectedPower(power);
  };

  const getAttribute = (attr: string): number => {
    const modifier = stats.attributes?.[attr] ?? 0;
    const base = F + modifier;
    return editedAttributes[attr] !== undefined ? editedAttributes[attr] : base;
  };

  const modifyAttribute = (attr: string, delta: number) => {
    setEditedAttributes(prev => ({
      ...prev,
      [attr]: (prev[attr] ?? getAttribute(attr)) + delta
    }));
  };

  const resolve = (text: string): string => {
    if (!text) return "—";
    return text
      .replace(/\{F\}/g, F.toString())
      .replace(/\{F\+2\}/g, (F + 2).toString())
      .replace(/\{F\/2\}/g, Math.floor(F / 2).toString());
  };

  const resolveAR = (arString: string, attackName: string = ""): string => {
    if (!arString) return "—";
    const isEngulf = attackName.toLowerCase().includes("engulf");
    const base = isEngulf ? F * 3 : F * 2;

    return arString.split('/').map(part => {
      const p = part.trim();
      if (p === "-" || p === "") return "-";
      if (p === "0") return base.toString();
      if (p.startsWith("+") || p.startsWith("-")) return (base + parseInt(p)).toString();
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
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#67e8f9", margin: 0 }}>
            {spirit.element} — Force {F}
          </h2>
          <button 
            onClick={onClose} 
            style={{ fontSize: "2rem", background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        {/* ATTRIBUTES */}
        <div style={{ background: "#1e2937", padding: "18px", borderRadius: "12px", marginBottom: "16px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "14px" }}>ATTRIBUTES</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(78px, 1fr))", gap: "14px" }}>
            {Object.keys(stats.attributes || {}).map(attr => {
              const value = getAttribute(attr);
              const isEditing = editingAttr === attr;

              return (
                <div key={attr} style={{ textAlign: "center" }}>
                  <div
                    onClick={() => setEditingAttr(isEditing ? null : attr)}
                    style={{
                      fontSize: "2.1rem",
                      fontWeight: "bold",
                      color: "#67e8f9",
                      lineHeight: 1,
                      cursor: "pointer",
                      padding: "4px 8px",
                      borderRadius: "8px",
                      transition: "all 0.2s",
                      background: isEditing ? "#334155" : "transparent",
                    }}
                  >
                    {value}
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "#94a3b8", marginTop: "2px" }}>{attr}</div>

                  {isEditing && (
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "8px" }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); modifyAttribute(attr, -1); }}
                        style={{
                          background: "#f87171",
                          color: "white",
                          border: "none",
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          fontSize: "1.1rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        −
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); modifyAttribute(attr, +1); }}
                        style={{
                          background: "#4ade80",
                          color: "white",
                          border: "none",
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          fontSize: "1.1rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SKILLS */}
        {stats.skills?.length > 0 && (
          <div style={{ background: "#1e2937", padding: "18px", borderRadius: "12px", marginBottom: "16px" }}>
            <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>SKILLS</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {stats.skills.map((skill: string, i: number) => (
                <div
                  key={i}
                  style={{
                    background: "#334155",
                    color: "#e0f2fe",
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    fontSize: "0.88rem",
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATTACKS - VERSION SIMPLIFIÉE */}
        {stats.attacks?.length > 0 && (
          <div style={{ background: "#1e2937", padding: "18px", borderRadius: "12px", marginBottom: "16px" }}>
            <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>ATTACKS</h3>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {stats.attacks.map((attack: any, i: number) => {
                const agiFinal = getAttribute("AGI");
                const skillPool = F + agiFinal;

                let skillName = "Close Combat";
                if (attack.name.toLowerCase().includes("elemental") || 
                    attack.name.toLowerCase().includes("ranged") || 
                    attack.name.toLowerCase().includes("breath") || 
                    attack.name.toLowerCase().includes("aura")) {
                  skillName = "Exotic Ranged Weapon";
                }

                return (
                  <div 
                    key={i} 
                    style={{ 
                      flex: "1 1 300px",
                      minWidth: "280px",
                      padding: "14px", 
                      background: "#0f172a", 
                      borderRadius: "8px",
                    }}
                  >
                    <strong style={{ color: "#c084fc" }}>{attack.name}</strong><br />

                    {/* LIGNE SIMPLIFIÉE (comme demandé) */}
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "6px", 
                      fontSize: "0.92rem", 
                      color: "#94a3b8",
                      margin: "8px 0"
                    }}>
                      <span style={{ color: "#67e8f9" }}>Skill :</span>
                      <strong>{skillName}</strong>
                      <span style={{ color: "#22c55e", fontWeight: "bold" }}>→ {skillPool}</span>
                    </div>

                    <span style={{ color: "#f87171" }}>DV: {resolve(attack.dv)}</span><br />
                    <span style={{ color: "#94a3b8" }}>
                      AR: {resolveAR(attack.ar, attack.name)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* POWERS */}
        <div style={{ background: "#1e2937", padding: "18px", borderRadius: "12px", marginBottom: "16px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "16px" }}>POWERS</h3>
          
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {/* BASE POWERS */}
            <div style={{ flex: "1", minWidth: "280px" }}>
              <h4 style={{ color: "#a5b4fc", marginBottom: "10px", fontSize: "1rem" }}>BASE POWERS</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {stats.powers?.map((p: string, i: number) => (
                  <div
                    key={i}
                    onClick={() => showPowerDescription(p)}
                    style={{
                      background: "#334155",
                      color: "#e0f2fe",
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      border: "1px solid transparent",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = "#67e8f9"; e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* OPTIONAL POWERS */}
            <div style={{ flex: "1", minWidth: "280px" }}>
              <h4 style={{ color: "#a5b4fc", marginBottom: "10px", fontSize: "1rem" }}>OPTIONAL POWERS</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {stats.optionalPowers?.map((p: string) => {
                  const isChecked = selectedOptionalPowers.has(p);
                  return (
                    <label key={p} style={{ display: "flex", alignItems: "center", cursor: "pointer", margin: 0 }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleOptionalPower(p)}
                        style={{ marginRight: "10px", accentColor: "#67e8f9", transform: "scale(1.25)" }}
                      />
                      <span 
                        style={{ color: "#67e8f9", flex: 1 }} 
                        onClick={(e) => { e.stopPropagation(); showPowerDescription(p); }}
                      >
                        {p}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION TEMPORAIRE */}
        {selectedPower && POWER_DESCRIPTIONS[selectedPower] && (
          <div style={{
            marginTop: "24px",
            padding: "20px",
            backgroundColor: "#111827",
            border: "2px solid #22d3ee",
            borderRadius: "8px",
            position: "relative",
            boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)",
          }}>
            <button
              onClick={() => setSelectedPower(null)}
              style={{
                position: "absolute", top: "12px", right: "12px",
                background: "none", border: "none", color: "#f87171",
                fontSize: "1.5rem", cursor: "pointer"
              }}
            >
              ✕
            </button>
            <h4 style={{ color: "#67e8f9", marginBottom: "12px" }}>{selectedPower}</h4>
            <p style={{ color: "#e0f2fe", lineHeight: "1.6", fontSize: "0.95rem" }}>
              {POWER_DESCRIPTIONS[selectedPower]}
            </p>
          </div>
        )}

        {/* BOUTON FERMER */}
        <button 
          onClick={onClose} 
          style={{ 
            width: "100%", padding: "18px", marginTop: "24px", 
            background: "#334155", color: "white", border: "none", 
            borderRadius: "10px", fontWeight: "bold", fontSize: "1.1rem"
          }}
        >
          Fermer la fiche
        </button>
      </div>
    </div>
  );
}