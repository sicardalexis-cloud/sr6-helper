// src/components/AttributesPanel.tsx
import React, { useState } from "react";

interface Props {
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function AttributesPanel({ char, update }: Props) {
  const [editingAttr, setEditingAttr] = useState<string | null>(null);

  const handleClick = (attr: string) => {
    setEditingAttr(editingAttr === attr ? null : attr);
  };

  const changeAttribute = (attr: string, delta: number) => {
    update((draft: any) => {
      if (!draft.attributes) draft.attributes = {};
      draft.attributes[attr] = (draft.attributes[attr] || 3) + delta;
    });
  };

  const attributesList = ["BOD", "AGI", "REA", "STR", "WIL", "LOG", "INT", "CHA", "MAGIC", "ESSENCE"];

  return (
    <div style={{
      background: "#1e2937",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      border: "1px solid #334155"
    }}>
      <h3 style={{ color: "#67e8f9", marginBottom: "16px" }}>ATTRIBUTES</h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "12px"
      }}>
        {attributesList.map(attr => {
          const value = char.attributes?.[attr] ?? 3;
          const isEditing = editingAttr === attr;

          return (
            <div key={attr} style={{
              background: "#0f172a",
              borderRadius: "10px",
              padding: "12px",
              textAlign: "center",
              border: isEditing ? "2px solid #22ff88" : "1px solid #334155"
            }}>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "6px" }}>
                {attr}
              </div>

              <div 
                onClick={() => handleClick(attr)}
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#f1f5f9",
                  cursor: "pointer",
                  padding: "4px 0"
                }}
              >
                {value}
              </div>

              {isEditing && (
                <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "8px" }}>
                  <button
                    onClick={() => changeAttribute(attr, -1)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      fontSize: "1.3rem",
                      cursor: "pointer"
                    }}
                  >
                    −
                  </button>
                  <button
                    onClick={() => changeAttribute(attr, 1)}
                    style={{
                      background: "#22c55e",
                      color: "white",
                      border: "none",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      fontSize: "1.3rem",
                      cursor: "pointer"
                    }}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}