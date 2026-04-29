// src/components/ConditionMonitors.tsx
import React, { useState } from "react";

interface Props {
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function ConditionMonitors({ char, update }: Props) {
  const bod = char.attributes?.BOD ?? 3;
  const wil = char.attributes?.WIL ?? 3;

  const physicalMax = 8 + Math.ceil(bod / 2);
  const stunMax = 8 + Math.ceil(wil / 2);

  const physicalCurrent = Number(char.physical ?? 0);
  const normalStun = Number(char.stun ?? 0);
  const drainStun = Number(char.drainStun ?? 0);
  const totalStun = normalStun + drainStun;

  const physicalPenalty = Math.floor(physicalCurrent / 3);
  const stunPenalty = Math.floor(totalStun / 3);
  const totalPenalty = physicalPenalty + stunPenalty;

  const statusEffects = char.statusEffects || [];

  const [showSelector, setShowSelector] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleClick = (type: "physical" | "normalStun" | "drainStun", index: number) => {
    update((draft: any) => {
      if (type === "physical") draft.physical = physicalCurrent === index + 1 ? index : index + 1;
      else if (type === "normalStun") draft.stun = normalStun === index + 1 ? index : index + 1;
      else if (type === "drainStun") draft.drainStun = drainStun === index + 1 ? index : index + 1;
    });
  };

  const addStatus = (name: string) => {
    update((draft: any) => {
      if (!draft.statusEffects) draft.statusEffects = [];
      const exists = draft.statusEffects.some((s: any) => s.name === name);
      if (!exists) {
        draft.statusEffects.push({ name, value: 1 });
      }
    });
    setShowSelector(false);
  };

  const updateStatusValue = (index: number, value: number) => {
    update((draft: any) => {
      if (draft.statusEffects && draft.statusEffects[index]) {
        draft.statusEffects[index].value = value;
      }
    });
  };

  const removeStatus = (index: number) => {
    update((draft: any) => {
      if (draft.statusEffects) draft.statusEffects.splice(index, 1);
    });
    if (editingIndex === index) setEditingIndex(null);
  };

  const renderBoxes = (current: number, max: number, color: string, type?: string) => (
    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          onClick={() => type && handleClick(type as any, i)}
          style={{
            width: "26px",
            height: "26px",
            border: "2px solid #475569",
            borderRadius: "6px",
            background: i < current ? color : "#1e2937",
            cursor: "pointer",
            transition: "all 0.1s"
          }}
        />
      ))}
    </div>
  );

  const availableStatuses = [
    { name: "Blinded", color: "#a5b4fc" },
    { name: "Burning", color: "#ef4444" },
    { name: "Chilled", color: "#22d3ee" },
    { name: "Confused", color: "#c084fc" },
    { name: "Corrosive", color: "#eab308" },
    { name: "Cover", color: "#64748b" },
    { name: "Dazed", color: "#f59e0b" },
    { name: "Deafened", color: "#94a3b8" },
    { name: "Fatigued", color: "#f59e0b" },
    { name: "Frightened", color: "#ec4899" },
    { name: "Hazed", color: "#8b5cf6" },
    { name: "Hobbled", color: "#64748b" },
    { name: "Immobilized", color: "#64748b" },
    { name: "Invisible", color: "#67e8f9" },
    { name: "Invisible (Improved)", color: "#22d3ee" },
    { name: "Nauseated", color: "#ec4899" },
    { name: "Panicked", color: "#f43f5e" },
    { name: "Petrified", color: "#64748b" },
    { name: "Poisoned", color: "#22c55e" },
    { name: "Prone", color: "#f59e0b" },
    { name: "Silent", color: "#64748b" },
    { name: "Silent (Improved)", color: "#94a3b8" },
    { name: "Stilled", color: "#64748b" },
    { name: "Wet", color: "#3b82f6" },
    { name: "Zapped", color: "#a5b4fc" },
  ];

  return (
    <div style={{
      background: "#1e2937",
      borderRadius: "12px",
      padding: "18px",
      marginBottom: "20px",
      border: "1px solid #334155"
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ color: "#67e8f9", margin: 0, fontSize: "1.45rem", letterSpacing: "2px" }}>
          CONDITION MONITORS
        </h3>
        <div style={{ 
          color: totalPenalty > 0 ? "#ef4444" : "#4ade80", 
          fontWeight: "bold", 
          fontSize: "1.1rem" 
        }}>
          dice pools {totalPenalty > 0 ? `-${totalPenalty}` : "0"}
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "20px" 
      }}>
        
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* PHYSICAL */}
          <div>
            <div style={{ color: "#ef4444", fontWeight: "bold", marginBottom: "6px", fontSize: "0.95rem" }}>PHYSICAL</div>
            {renderBoxes(physicalCurrent, physicalMax, "#ef4444", "physical")}
          </div>

          {/* STUN */}
          <div>
            <div style={{ color: "#eab308", fontWeight: "bold", marginBottom: "6px", fontSize: "0.95rem" }}>STUN</div>
            {renderBoxes(normalStun, stunMax, "#eab308", "normalStun")}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* TOTAL STUN */}
          <div>
            <div style={{ color: "#facc15", fontWeight: "bold", marginBottom: "6px", fontSize: "0.95rem" }}>TOTAL STUN</div>
            {renderBoxes(totalStun, stunMax, "#facc15")}
          </div>

          {/* DRAIN STUN */}
          <div>
            <div style={{ color: "#a855f7", fontWeight: "bold", marginBottom: "6px", fontSize: "0.95rem" }}>DRAIN STUN</div>
            {renderBoxes(drainStun, stunMax, "#a855f7", "drainStun")}
          </div>
        </div>
      </div>

      {/* STATUS EFFECTS */}
      <div style={{ marginTop: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <h4 style={{ color: "#67e8f9", margin: 0, fontSize: "1.1rem" }}>STATUS</h4>
          <button
            onClick={() => setShowSelector(!showSelector)}
            style={{
              padding: "5px 16px",
              background: "#22c55e",
              color: "#000",
              border: "none",
              borderRadius: "9999px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "0.85rem"
            }}
          >
            + Ajouter status
          </button>
        </div>

        {/* Sélecteur */}
        {showSelector && (
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "6px", 
            marginBottom: "12px", 
            padding: "10px", 
            background: "#111827", 
            borderRadius: "10px" 
          }}>
            {availableStatuses.map(({ name, color }) => (
              <div
                key={name}
                onClick={() => addStatus(name)}
                style={{
                  padding: "5px 14px",
                  background: color,
                  color: "#000",
                  borderRadius: "9999px",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                {name}
              </div>
            ))}
          </div>
        )}

        {/* Status pills */}
        {statusEffects.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {statusEffects.map((status: any, index: number) => {
              const isEditing = editingIndex === index;
              const value = status.value ?? 1;

              return (
                <div key={index} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div
                    onClick={() => setEditingIndex(isEditing ? null : index)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      background: "#1e2937",
                      color: "#e0f2fe",
                      fontSize: "0.82rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      border: "2px solid #475569",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}
                  >
                    {status.name}
                    <span style={{ color: "#67e8f9", fontWeight: "bold" }}>{value}</span>
                  </div>

                  {isEditing && (
                    <div style={{ 
                      padding: "4px 8px", 
                      background: "#111827", 
                      borderRadius: "8px", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "8px" 
                    }}>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={value}
                        onChange={(e) => updateStatusValue(index, Number(e.target.value))}
                        style={{ flex: 1 }}
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); removeStatus(index); }}
                        style={{ 
                          background: "none", 
                          border: "none", 
                          color: "#f87171", 
                          fontSize: "1.3rem", 
                          cursor: "pointer" 
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}