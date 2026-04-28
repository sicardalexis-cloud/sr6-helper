// src/components/EdgePool.tsx
import React from "react";

interface Props {
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function EdgePool({ char, update }: Props) {
  const current = char.edge?.current ?? 0;
  const max = char.edge?.max ?? 7;

  const toggleEdge = (index: number) => {
    update((draft: any) => {
      if (!draft.edge) draft.edge = { current: 0, max: 7 };
      
      if (index + 1 === draft.edge.current) {
        draft.edge.current = index;
      } else {
        draft.edge.current = index + 1;
      }
    });
  };

  return (
    <div style={{
      background: "#1e2937",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      border: "1px solid #334155"
    }}>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <h3 style={{ 
          color: "#eab308", 
          margin: 0, 
          fontSize: "1.4rem",
          letterSpacing: "3px"
        }}>
          EDGE POOL
        </h3>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        flexWrap: "wrap"
      }}>
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            onClick={() => toggleEdge(i)}
            style={{
              width: "46px",
              height: "46px",
              background: i < current ? "#eab308" : "transparent",
              border: i < current ? "3px solid #facc15" : "2px solid #475569",
              borderRadius: "8px",
              transform: "rotate(45deg)",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: i < current ? "0 0 18px #facc15" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}