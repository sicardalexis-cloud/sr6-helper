// src/components/CombatModal.tsx
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function CombatModal({ isOpen, onClose, char, update }: Props) {
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleClick = (field: string) => {
    setEditingField(editingField === field ? null : field);
  };

  const changeValue = (field: string, delta: number) => {
    update((draft: any) => {
      if (!draft.combat) draft.combat = {};
      draft.combat[field] = (draft.combat[field] || 0) + delta;
    });
  };

  const combatFields = [
    { key: "initiative", label: "Initiative", default: 0 },
    { key: "defense", label: "Defense", default: 0 },
    { key: "armor", label: "Armor", default: 0 },
    { key: "dodge", label: "Dodge", default: 0 },
    { key: "melee", label: "Melee", default: 0 },
    { key: "ranged", label: "Ranged", default: 0 },
    { key: "physicalLimit", label: "Physical Limit", default: 0 },
    { key: "mentalLimit", label: "Mental Limit", default: 0 },
    { key: "socialLimit", label: "Social Limit", default: 0 },
  ];

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#0f172a", width: "95%", maxWidth: "820px", height: "88vh",
        borderRadius: "16px", border: "2px solid #f87171", overflow: "hidden",
        display: "flex", flexDirection: "column"
      }}>
        
        {/* HEADER */}
        <div style={{ padding: "16px 24px", background: "#1e2937", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: "#f87171", margin: 0 }}>⚔️ Attack & Combat</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#f87171", fontSize: "1.8rem", cursor: "pointer" }}>
            ✕
          </button>
        </div>

        <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px"
          }}>
            {combatFields.map(({ key, label, default: def }) => {
              const value = char.combat?.[key] ?? def;
              const isEditing = editingField === key;

              return (
                <div key={key} style={{
                  background: "#1e2937",
                  borderRadius: "10px",
                  padding: "12px",
                  textAlign: "center",
                  border: isEditing ? "2px solid #f87171" : "1px solid #334155"
                }}>
                  <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "6px" }}>
                    {label}
                  </div>

                  <div 
                    onClick={() => handleClick(key)}
                    style={{
                      fontSize: "2.1rem",
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
                        onClick={() => changeValue(key, -1)}
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
                        onClick={() => changeValue(key, 1)}
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
      </div>
    </div>
  );
}