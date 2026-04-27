import React from "react";
import { useCharacterContext } from "../contexts/CharacterContext";   // ← Chemin corrigé (contexts au pluriel)

export default function AttributesPanel() {
  const { char, update } = useCharacterContext();

  const handleAttributeChange = (attr: string, value: number) => {
    update((draft: any) => {
      draft.attributes[attr] = value;
    });
  };

  return (
    <div style={{ padding: "16px", background: "#1e2937", borderRadius: "12px", marginBottom: "16px" }}>
      <h3 style={{ color: "#c084fc", marginBottom: "12px" }}>ATTRIBUTES</h3>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
        {Object.entries(char.attributes || {}).map(([key, value]) => (
          <div key={key} style={{ textAlign: "center" }}>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "4px" }}>{key}</div>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <button 
                onClick={() => handleAttributeChange(key, Math.max(1, Number(value) - 1))}
                style={{ width: "28px", height: "28px", borderRadius: "6px", background: "#334155", color: "#fff" }}
              >
                –
              </button>
              
              <strong style={{ fontSize: "1.5rem", minWidth: "40px" }}>{value}</strong>
              
              <button 
                onClick={() => handleAttributeChange(key, Number(value) + 1)}
                style={{ width: "28px", height: "28px", borderRadius: "6px", background: "#334155", color: "#fff" }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}