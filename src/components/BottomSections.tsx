import React from "react";

export default function BottomSections() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <div style={{
        padding: "18px",
        border: "2px solid #4ade80",
        borderRadius: "12px",
        color: "#4ade80",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer"
      }}>
        👻 SPIRITS & SUMMONING
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