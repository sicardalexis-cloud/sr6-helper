import React from "react";

export default function BottomSections() {
  const sections = [
    { label: "SPIRITS & SUMMONING", color: "green", icon: "👻" },
    { label: "SPELLS & ASTRAL COMBAT", color: "yellow", icon: "✨" },
    { label: "ATTACK & COMBAT", color: "yellow", icon: "⚔️" },
    { label: "REST & RECOVERY", color: "red", icon: "❤️" },
  ];

  return (
    <div className="bottom-sections">
      {sections.map((s, i) => (
        <div key={i} className={`bottom-button ${s.color}`}>
          <span className="bottom-icon">{s.icon}</span>
          {s.label}
        </div>
      ))}
    </div>
  );
}
