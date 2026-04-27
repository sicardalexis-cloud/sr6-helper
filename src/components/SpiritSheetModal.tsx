import React, { useState } from "react";
import { SPIRIT_STATS, SpiritType, POWER_DESCRIPTIONS } from "../data/spirits";
import { useCharacterContext } from "../contexts/CharacterContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  spirit: any;
}

export default function SpiritSheetModal({ isOpen, onClose, spirit }: Props) {
  const { updateSpirit } = useCharacterContext();

  // ==================== TOUS LES HOOKS EN PREMIER ====================
  const [selectedOptionalPowers, setSelectedOptionalPowers] = useState<Set<string>>(
    new Set(spirit?.optionalPowers || [])
  );
  const [expandedPowers, setExpandedPowers] = useState<Set<string>>(new Set());

  // Early return APRÈS les hooks
  if (!isOpen || !spirit || !spirit.element) return null;

  const F = spirit.force || 1;
  const spiritType = spirit.element.toLowerCase() as SpiritType;
  const stats = SPIRIT_STATS[spiritType] || SPIRIT_STATS.fire;

  const toggleOptionalPower = (power: string) => {
    const newSet = new Set(selectedOptionalPowers);
    newSet.has(power) ? newSet.delete(power) : newSet.add(power);
    setSelectedOptionalPowers(newSet);
    updateSpirit(spirit.id, { optionalPowers: Array.from(newSet) });
  };

  const toggleDescription = (power: string) => {
    const newSet = new Set(expandedPowers);
    newSet.has(power) ? newSet.delete(power) : newSet.add(power);
    setExpandedPowers(newSet);
  };

  const resolve = (text: string): string => {
    if (!text) return "—";
    return text
      .replace(/\{F\}/g, F.toString())
      .replace(/\{F\+2\}/g, (F + 2).toString())
      .replace(/\{F\*2 \+ 1\}/g, (F * 2 + 1).toString())
      .replace(/\{F\*2\}/g, (F * 2).toString())
      .replace(/\{F\*2-2\}/g, (F * 2 - 2).toString())
      .replace(/\{F\*2-8\}/g, (F * 2 - 8).toString())
      .replace(/\{F\*2-10\}/g, (F * 2 - 10).toString())
      .replace(/\{F\*3\}/g, (F * 3).toString())
      .replace(/\{F\/2 \+ 1\}/g, (Math.floor(F / 2) + 1).toString())
      .replace(/\{F\/2\}/g, Math.floor(F / 2).toString());
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f172a", width: "94%", maxWidth: "760px", borderRadius: "16px", padding: "24px", border: "2px solid #c084fc", maxHeight: "94vh", overflow: "auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>
            {spirit.element.toUpperCase()} — Force {F}
          </h2>
          <button onClick={onClose} style={{ fontSize: "1.8rem", background: "none", border: "none", color: "#94a3b8" }}>✕</button>
        </div>

        {/* Header */}
        <div style={{ background: "#1e2937", padding: "12px", borderRadius: "10px", marginBottom: "20px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div>📅 {spirit.invocationDate || "—"} — {spirit.solarPhase}</div>
          <div>🔵 Solar Tokens: <strong>{spirit.solarTokens}/2</strong></div>
          <div>❤️ Services: <strong>{spirit.servicesRemaining}</strong></div>
        </div>

        {/* Attacks */}
        <div style={{ background: "#1e2937", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>ATTACKS</h3>
          {stats.attacks?.length > 0 ? (
            stats.attacks.map((attack: any, i: number) => (
              <div key={i} style={{ background: "#0f172a", padding: "14px", borderRadius: "8px", marginBottom: "12px" }}>
                <strong style={{ color: "#f87171" }}>{attack.name}</strong><br/>
                <div style={{ marginTop: "6px" }}>
                  <span style={{ color: "#94a3b8" }}>DV: </span>
                  <span style={{ color: "#f87171", fontWeight: "bold" }}>{resolve(attack.dv)}</span>
                </div>
                <div>
                  <span style={{ color: "#94a3b8" }}>AR: </span>
                  <span style={{ color: "#67e8f9", fontWeight: "bold" }}>{resolve(attack.ar)}</span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: "#64748b" }}>Aucune attaque spécifique.</div>
          )}
        </div>

        {/* Attributs */}
        <div style={{ background: "#1e2937", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>ATTRIBUTES</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "12px" }}>
            {Object.keys(stats.attributes || {}).map(key => (
              <div key={key} style={{ background: "#0f172a", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{key}</div>
                <strong style={{ fontSize: "1.6rem", color: "#67e8f9" }}>{F}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Combat Statistics */}
        <div style={{ background: "#1e2937", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>COMBAT STATISTICS</h3>
          <div style={{ lineHeight: "1.8rem" }}>
            <strong>Defense Rating:</strong> {F + 2}<br/>
            <strong>Movement:</strong> {stats.movement}<br/>
            <strong>Physical Initiative:</strong> {F + 8} + 2D6<br/>
            <strong>Astral Initiative:</strong> {F + 8} + 3D6
          </div>
        </div>

        {/* Skills */}
        <div style={{ background: "#1e2937", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>SKILLS</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {stats.skills?.map((skill: string, i: number) => (
              <div key={i} style={{ background: "#0f172a", padding: "8px 14px", borderRadius: "6px", fontSize: "0.95rem" }}>
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Base Powers */}
        <div style={{ background: "#1e2937", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>BASE POWERS</h3>
          {stats.powers?.map((p: string, i: number) => (
            <div key={i} style={{ marginBottom: "8px", padding: "10px", background: "#0f172a", borderRadius: "8px" }}>
              <div onClick={() => toggleDescription(p)} style={{ cursor: "pointer", color: "#67e8f9", fontWeight: "500" }}>
                ▶ {p}
              </div>
              {expandedPowers.has(p) && POWER_DESCRIPTIONS[p] && (
                <div style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "8px", paddingLeft: "20px" }}>
                  {POWER_DESCRIPTIONS[p]}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Optional Powers */}
        <div style={{ background: "#1e2937", padding: "16px", borderRadius: "12px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>OPTIONAL POWERS</h3>
          {stats.optionalPowers?.map((p: string, i: number) => (
            <div key={i} style={{ marginBottom: "12px" }}>
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
                <div style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "6px", paddingLeft: "36px" }}>
                  {POWER_DESCRIPTIONS[p]}
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={onClose} style={{ width: "100%", padding: "16px", background: "#334155", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", marginTop: "24px" }}>
          Close Sheet
        </button>
      </div>
    </div>
  );
}