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
      
      // Comportement identique aux losanges :
      // Clique sur un cercle rempli → réduit jusqu'à ce point
      // Sinon → remplit jusqu'à ce cercle
      draft.minorActions.current = draft.minorActions.current === index + 1 
        ? index 
        : index + 1;
    });
  };

  return (
    <div className="minor-actions">
      <div style={{ 
        color: "#67e8f9", 
        fontWeight: "bold", 
        fontSize: "1.1rem",
        marginBottom: "16px",
        textAlign: "center"
      }}>
        MINOR ACTIONS
      </div>

      {/* Cercles cliquables */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "24px", 
        margin: "20px 0",
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

      {/* Petits boutons pour modifier le maximum */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        <button 
          onClick={() => {
            update((draft: any) => {
              if (!draft.minorActions) draft.minorActions = { current: 1, max: 3 };
              draft.minorActions.max = Math.max(1, Math.min(8, draft.minorActions.max - 1));
              if (draft.minorActions.current > draft.minorActions.max) {
                draft.minorActions.current = draft.minorActions.max;
              }
            });
          }}
          style={{ 
            width: "42px", height: "42px", background: "#334155", color: "#fff", 
            fontSize: "1.3rem", border: "none", borderRadius: "8px" 
          }}
        >
          −
        </button>
        <button 
          onClick={() => {
            update((draft: any) => {
              if (!draft.minorActions) draft.minorActions = { current: 1, max: 3 };
              draft.minorActions.max = Math.max(1, Math.min(8, draft.minorActions.max + 1));
            });
          }}
          style={{ 
            width: "42px", height: "42px", background: "#334155", color: "#fff", 
            fontSize: "1.3rem", border: "none", borderRadius: "8px" 
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}