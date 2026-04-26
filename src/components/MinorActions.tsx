import React from "react";

interface Props {
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function MinorActions({ char, update }: Props) {
  const current = char.minorActions?.current ?? 1;
  const max = char.minorActions?.max ?? 3;

  const handleCircleClick = (index: number) => {
    update((draft: any) => {
      if (!draft.minorActions) draft.minorActions = { current: 1, max: 3 };
      draft.minorActions.current = draft.minorActions.current === index + 1 
        ? index 
        : index + 1;
    });
  };

  const changeMax = (delta: number) => {
    update((draft: any) => {
      if (!draft.minorActions) draft.minorActions = { current: 1, max: 3 };
      const newMax = Math.max(1, Math.min(8, draft.minorActions.max + delta));
      draft.minorActions.max = newMax;
      if (draft.minorActions.current > newMax) {
        draft.minorActions.current = newMax;
      }
    });
  };

  return (
    <div className="minor-actions">
      {/* Titre + Boutons + et - sur la même ligne */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "16px" 
      }}>
        <div style={{ 
          color: "#67e8f9", 
          fontWeight: "bold", 
          fontSize: "1.1rem" 
        }}>
          MINOR ACTIONS
        </div>

        {/* Boutons + et - à droite du titre */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button 
            onClick={() => changeMax(-1)}
            style={{ 
              width: "42px", 
              height: "42px", 
              background: "#334155", 
              color: "#fff", 
              fontSize: "1.4rem", 
              border: "none", 
              borderRadius: "8px",
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
              width: "42px", 
              height: "42px", 
              background: "#334155", 
              color: "#fff", 
              fontSize: "1.4rem", 
              border: "none", 
              borderRadius: "8px",
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
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "24px", 
        margin: "10px 0 20px 0",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation"
      }}>
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            onClick={() => handleCircleClick(i)}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: i < current ? "#22d3ee" : "#1e2937",
              border: i < current ? "5px solid #67e8f9" : "5px solid #475569",
              boxShadow: i < current ? "0 0 20px #22d3ee" : "none",
              transition: "all 0.2s",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation"
            }}
          />
        ))}
      </div>
    </div>
  );
}