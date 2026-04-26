import React from "react";

interface Props {
  onSummoningClick: () => void;
  onSpiritsClick: () => void;
}

export default function BottomSections({ onSummoningClick, onSpiritsClick }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      
      {/* SPIRITS & SUMMONING */}
      <div 
        onClick={onSummoningClick}
        style={{
          padding: "18px",
          border: "2px solid #4ade80",
          borderRadius: "12px",
          color: "#4ade80",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "all 0.2s"
        }}
      >
        👻 SUMMONING
      </div>

      {/* ACTIVE SPIRITS */}
      <div 
        onClick={onSpiritsClick}
        style={{
          padding: "18px",
          border: "2px solid #a855f7",
          borderRadius: "12px",
          color: "#a855f7",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "all 0.2s"
        }}
      >
        👤 ACTIVE SPIRITS
      </div>

      <div style={{
        padding: "18px",
        border: "2px solid #67e8f9",
        borderRadius: "12px",
        color: "#67e8f9",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer"
      }}>
        ✨ SPELLS & ASTRAL COMBAT
      </div>

      <div style={{
        padding: "18px",
        border: "2px solid #fbbf24",
        borderRadius: "12px",
        color: "#fbbf24",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer"
      }}>
        ⚔️ ATTACK & COMBAT
      </div>

      <div style={{
        padding: "18px",
        border: "2px solid #f87171",
        borderRadius: "12px",
        color: "#f87171",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer"
      }}>
        ❤️ REST & RECOVERY
      </div>
    </div>
  );
}