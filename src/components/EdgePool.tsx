import React from "react";

interface Props {
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function EdgePool({ char, update }: Props) {
  const current = char.edge?.current ?? 0;
  const max = char.edge?.max ?? 7;

  const handleChange = (delta: number) => {
    update((draft: any) => {
      if (!draft.edge) draft.edge = { current: 0, max: 7 };
      
      const newCurrent = Math.max(0, Math.min(draft.edge.max, draft.edge.current + delta));
      draft.edge.current = newCurrent;
    });
  };

  return (
    <div className="edge-pool">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#eab308", fontWeight: "bold" }}>
        ★ EDGE POOL 
        <span style={{ color: "#eab308" }}>{current} / {max}</span>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "48px",
              height: "48px",
              background: i < current ? "#eab308" : "#1e2937",
              transform: "rotate(45deg)",
              borderRadius: "6px",
              border: "3px solid #111827",
              boxShadow: i < current ? "0 0 18px #eab308" : "none"
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => handleChange(-1)}
          style={{
            width: "54px",
            height: "54px",
            background: "#f59e0b",
            color: "white",
            fontSize: "1.8rem",
            border: "none",
            borderRadius: "10px"
          }}
        >
          -
        </button>
        <button
          onClick={() => handleChange(1)}
          style={{
            width: "54px",
            height: "54px",
            background: "#f59e0b",
            color: "white",
            fontSize: "1.8rem",
            border: "none",
            borderRadius: "10px"
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}