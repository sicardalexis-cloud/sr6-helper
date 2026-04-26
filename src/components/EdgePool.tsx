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
      
      // Si on clique sur un diamond déjà rempli → on vide jusqu'à ce point
      // Sinon → on remplit jusqu'à ce diamond
      draft.edge.current = draft.edge.current === index + 1 ? index : index + 1;
    });
  };

  return (
    <div className="edge-pool">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#eab308", fontWeight: "bold" }}>
        ★ EDGE POOL 
        <span style={{ color: "#eab308" }}>{current} / {max}</span>
      </div>

      <div style={{ display: "flex", gap: "10px", cursor: "pointer" }}>
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
              boxShadow: i < current ? "0 0 18px #eab308" : "none",
              transition: "all 0.2s"
            }}
          />
        ))}
      </div>

      <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "8px", textAlign: "center" }}>
        Cliquez sur les losanges pour modifier
      </div>
    </div>
  );
}