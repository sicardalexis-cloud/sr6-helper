import React from "react";
import { useCharacterContext } from "../contexts/CharacterContext";   // ← Chemin important (contexts au pluriel)

export default function EdgePool() {
  const { char, update } = useCharacterContext();

  const current = char.edge?.current ?? 0;
  const max = char.edge?.max ?? 7;

  const toggleEdge = (index: number) => {
    update((draft: any) => {
      draft.edge.current = index + 1 === current ? index : index + 1;
    });
  };

  return (
    <div style={{ padding: "16px", background: "#1e2937", borderRadius: "12px", marginBottom: "16px" }}>
      <h3 style={{ color: "#c084fc", marginBottom: "12px" }}>EDGE POOL</h3>
      
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            onClick={() => toggleEdge(i)}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "3px solid #eab308",
              background: i < current ? "#eab308" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
              color: i < current ? "#000" : "#eab308",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            💎
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "12px", color: "#94a3b8" }}>
        {current} / {max} Edge
      </div>
    </div>
  );
}