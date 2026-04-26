import React from "react";

interface Props {
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function EdgePool({ char, update }: Props) {
  const current = char.edge?.current ?? 0;
  const max = char.edge?.max ?? 7;

  const handleDiamondClick = (index: number) => {
    update((draft: any) => {
      if (!draft.edge) draft.edge = { current: 0, max: 7 };
      draft.edge.current = draft.edge.current === index + 1 ? index : index + 1;
    });
  };

  return (
    <div className="edge-pool">
      <div style={{ 
        color: "#eab308", 
        fontWeight: "bold", 
        fontSize: "1.2rem",
        marginBottom: "12px",
        textAlign: "center"
      }}>
        ★ EDGE POOL
      </div>

      <div style={{ 
        display: "flex", 
        gap: "10px", 
        justifyContent: "center", 
        cursor: "pointer",
        flexWrap: "wrap"
      }}>
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            onClick={() => handleDiamondClick(i)}
            style={{
              width: "48px",
              height: "48px",
              background: i < current ? "#eab308" : "#1e2937",
              transform: "rotate(45deg)",
              borderRadius: "6px",
              border: "3px solid #111827",
              transition: "all 0.2s",
              // Glow retiré
            }}
          />
        ))}
      </div>
    </div>
  );
}