// src/components/MinorActions.tsx
import React from "react";

interface Props {
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function MinorActions({ char, update }: Props) {
  const current = char.minorActions?.current ?? 1;
  const max = char.minorActions?.max ?? 3;

  const changeMax = (delta: number) => {
    update((draft) => {
      if (!draft.minorActions) draft.minorActions = { current: 1, max: 3 };
      const newMax = Math.max(1, Math.min(8, draft.minorActions.max + delta));
      draft.minorActions.max = newMax;
      if (draft.minorActions.current > newMax) {
        draft.minorActions.current = newMax;
      }
    });
  };

  const toggleCircle = (index: number) => {
    update((draft) => {
      if (!draft.minorActions) draft.minorActions = { current: 1, max: 3 };
      draft.minorActions.current = index + 1 === draft.minorActions.current ? index : index + 1;
    });
  };

  return (
    <div style={{
      background: "#1e2937",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      border: "1px solid #334155",
      position: "relative"
    }}>
      {/* Titre centré + Boutons en haut à droite */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
        <div style={{ flex: 1 }}></div> {/* Espace à gauche pour centrer le titre */}

        <h3 style={{ 
          color: "#67e8f9", 
          margin: 0, 
          fontSize: "1.45rem",
          letterSpacing: "2px",
          textAlign: "center"
        }}>
          MINOR ACTIONS
        </h3>

        {/* Boutons + et - */}
        <div style={{ display: "flex", gap: "8px", flex: 1, justifyContent: "flex-end" }}>
          <button
            onClick={() => changeMax(-1)}
            style={{
              background: "#67e8f9",
              color: "#0f172a",
              border: "none",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              fontSize: "1.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            −
          </button>
          <button
            onClick={() => changeMax(1)}
            style={{
              background: "#67e8f9",
              color: "#0f172a",
              border: "none",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              fontSize: "1.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Cercles cliquables */}
      <div style={{ display: "flex", justifyContent: "center", gap: "14px" }}>
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            onClick={() => toggleCircle(i)}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "3px solid #67e8f9",
              background: i < current ? "#67e8f9" : "transparent",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: i < current ? "0 0 16px #67e8f9" : "none"
            }}
          />
        ))}
      </div>
    </div>
  );
}