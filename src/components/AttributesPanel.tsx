// src/components/AttributesPanel.tsx
import React, { useState } from "react";

interface Props {
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function AttributesPanel({ char, update }: Props) {
  const [editingAttr, setEditingAttr] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);   // ← Nouvel état

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

  if (!isVisible) {
    return (
      <div style={{
        background: "#1e2937",
        borderRadius: "12px",
        padding: "12px",
        marginBottom: "16px",
        border: "1px solid #334155",
        textAlign: "center"
      }}>
        <button
          onClick={() => setIsVisible(true)}
          style={{
            background: "#334155",
            color: "#e0f2fe",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          👁️ Show Attributes
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: "#1e2937",
      borderRadius: "12px",
      padding: "12px",
      marginBottom: "16px",
      border: "1px solid #334155"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h3 style={{ color: "#67e8f9", margin: 0, fontSize: "1.1rem" }}>ATTRIBUTES</h3>
        
        <button
          onClick={() => setIsVisible(false)}
          style={{
            background: "#334155",
            color: "#e0f2fe",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            fontSize: "0.9rem",
            cursor: "pointer"
          }}
        >
          Hide Attributes
        </button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
        gap: "8px"
      }}>
        {attributesList.map(attr => {
          const value = char.attributes?.[attr] ?? 3;
          const isEditing = editingAttr === attr;

          return (
            <div key={attr} style={{
              background: "#0f172a",
              borderRadius: "8px",
              padding: "6px 4px 2px 4px",
              textAlign: "center",
              border: isEditing ? "2px solid #22ff88" : "1px solid #334155",
              minHeight: "50px"
            }}>
              <div style={{ 
                color: "#94a3b8", 
                fontSize: "0.78rem", 
                marginBottom: "1px" 
              }}>
                {attr}
              </div>

              <div 
                onClick={() => handleClick(attr)}
                style={{
                  fontSize: "1.85rem",
                  fontWeight: "bold",
                  color: "#f1f5f9",
                  cursor: "pointer",
                  lineHeight: "0.95",
                  padding: "0"
                }}
              >
                {value}
              </div>

              {isEditing && (
                <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "4px" }}>
                  <button
                    onClick={() => changeAttribute(attr, -1)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      fontSize: "1rem",
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
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      fontSize: "1rem",
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