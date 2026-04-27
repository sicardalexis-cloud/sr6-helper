import React from "react";
import { useCharacterContext } from "../contexts/CharacterContext";

export default function MinorActions() {
  const { char, update } = useCharacterContext();

  const current = char.minorActions?.current ?? 1;
  const max = char.minorActions?.max ?? 3;

  const toggleMinorAction = (index: number) => {
    update((draft: any) => {
      draft.minorActions.current = index + 1 === current ? index : index + 1;
    });
  };

  return (
    <div style={{ padding: "16px", background: "#1e2937", borderRadius: "12px", marginBottom: "16px" }}>
      <h3 style={{ color: "#c084fc", marginBottom: "12px" }}>MINOR ACTIONS</h3>
      
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            onClick={() => toggleMinorAction(i)}
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              border: "3px solid #22d3ee",
              background: i < current ? "#22d3ee" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.6rem",
              color: i < current ? "#000" : "#22d3ee",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            ⚡
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "12px", color: "#94a3b8" }}>
        {current} / {max} Minor Actions
      </div>
    </div>
  );
}