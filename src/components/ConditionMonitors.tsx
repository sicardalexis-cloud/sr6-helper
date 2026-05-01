// src/components/ConditionMonitors.tsx
import React, { useState } from "react";
import { ALL_STATUSES, StatusEffect } from "../data/statuses";

interface Props {
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function ConditionMonitors({ char, update }: Props) {
  const bod = char.attributes?.BOD ?? 3;
  const wil = char.attributes?.WIL ?? 3;

  const physicalMax = 8 + Math.ceil(bod / 2);
  const stunMax = 8 + Math.ceil(wil / 2);

  const normalPhysical = Number(char.normalPhysical ?? char.physical ?? 0);
  const drainPhysical = Number(char.drainPhysical ?? 0);
  const totalPhysical = normalPhysical + drainPhysical;

  const normalStun = Number(char.stun ?? 0);
  const drainStun = Number(char.drainStun ?? 0);
  const totalStun = normalStun + drainStun;

  const physicalPenalty = Math.floor(totalPhysical / 3);
  const stunPenalty = Math.floor(totalStun / 3);
  const totalPenalty = physicalPenalty + stunPenalty;

  const effectiveNormalPhysicalMax = Math.max(0, physicalMax - drainPhysical);
  const effectiveDrainPhysicalMax = Math.max(0, physicalMax - normalPhysical);
  const effectiveNormalStunMax = Math.max(0, stunMax - drainStun);
  const effectiveDrainStunMax = Math.max(0, stunMax - normalStun);

  const activeStatuses = char.statusEffects || []; // [{id: "burning", value: 3}, ...]

  const [showSelector, setShowSelector] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any>(null); // status + value

  const toggleStatus = (statusId: string) => {
    update((draft: any) => {
      if (!draft.statusEffects) draft.statusEffects = [];
      const existing = draft.statusEffects.findIndex((s: any) => s.id === statusId);

      if (existing !== -1) {
        draft.statusEffects.splice(existing, 1);
      } else {
        draft.statusEffects.push({ id: statusId, value: 1 });
      }
    });
    setShowSelector(false);
  };

  const updateStatusValue = (statusId: string, newValue: number) => {
    update((draft: any) => {
      if (!draft.statusEffects) return;
      const status = draft.statusEffects.find((s: any) => s.id === statusId);
      if (status) status.value = newValue;
    });
  };

  const removeStatus = (statusId: string) => {
    update((draft: any) => {
      if (draft.statusEffects) {
        draft.statusEffects = draft.statusEffects.filter((s: any) => s.id !== statusId);
      }
    });
    if (selectedStatus?.id === statusId) setSelectedStatus(null);
  };

  const markMagicalHealing = () => {
    update((draft: any) => {
      draft.drainPhysical = (draft.drainPhysical || 0) + (draft.normalPhysical || 0);
      draft.drainStun = (draft.drainStun || 0) + (draft.stun || 0);
      draft.normalPhysical = 0;
      draft.stun = 0;
    });
  };

  const renderBoxes = (current: number, max: number, color: string, type: string) => (
    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          onClick={() => {
            update((draft: any) => {
              if (type === "normalPhysical") draft.normalPhysical = normalPhysical === i + 1 ? i : i + 1;
              else if (type === "drainPhysical") draft.drainPhysical = drainPhysical === i + 1 ? i : i + 1;
              else if (type === "normalStun") draft.stun = normalStun === i + 1 ? i : i + 1;
              else if (type === "drainStun") draft.drainStun = drainStun === i + 1 ? i : i + 1;
            });
          }}
          style={{
            width: "26px",
            height: "26px",
            border: "2px solid #475569",
            borderRadius: "6px",
            background: i < current ? color : "#1e2937",
            cursor: "pointer"
          }}
        />
      ))}
    </div>
  );

  return (
    <div style={{
      background: "#1e2937",
      borderRadius: "12px",
      padding: "18px",
      marginBottom: "20px",
      border: "1px solid #334155"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ color: "#67e8f9", margin: 0, fontSize: "1.45rem" }}>CONDITION MONITORS</h3>
        <div style={{ color: totalPenalty > 0 ? "#ef4444" : "#4ade80", fontWeight: "bold", fontSize: "1.1rem" }}>
          Penalty: {totalPenalty > 0 ? `-${totalPenalty}` : "0"}
        </div>
        <button onClick={markMagicalHealing} style={{ padding: "6px 16px", background: "#c084fc", color: "#000", border: "none", borderRadius: "9999px", fontWeight: "bold", cursor: "pointer" }}>
          ✨ Soins Magiques
        </button>
      </div>

      {/* Moniteurs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <div style={{ color: "#ef4444", fontWeight: "bold", marginBottom: "6px" }}>PHYSICAL</div>
            {renderBoxes(normalPhysical, effectiveNormalPhysicalMax, "#ef4444", "normalPhysical")}
          </div>
          <div>
            <div style={{ color: "#eab308", fontWeight: "bold", marginBottom: "6px" }}>STUN</div>
            {renderBoxes(normalStun, effectiveNormalStunMax, "#eab308", "normalStun")}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <div style={{ color: "#c084fc", fontWeight: "bold", marginBottom: "6px" }}>DRAIN PHYSICAL</div>
            {renderBoxes(drainPhysical, effectiveDrainPhysicalMax, "#c084fc", "drainPhysical")}
          </div>
          <div>
            <div style={{ color: "#a855f7", fontWeight: "bold", marginBottom: "6px" }}>DRAIN STUN</div>
            {renderBoxes(drainStun, effectiveDrainStunMax, "#a855f7", "drainStun")}
          </div>
        </div>
      </div>

      {/* STATUS EFFECTS */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <h4 style={{ color: "#67e8f9", margin: 0 }}>STATUS EFFECTS</h4>
          <button
            onClick={() => setShowSelector(!showSelector)}
            style={{
              padding: "6px 16px",
              background: "#22c55e",
              color: "#000",
              border: "none",
              borderRadius: "9999px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            + Ajouter status
          </button>
        </div>

        {/* Liste d'ajout */}
        {showSelector && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px", padding: "12px", background: "#111827", borderRadius: "10px" }}>
            {ALL_STATUSES.map((status) => (
              <div
                key={status.id}
                onClick={() => toggleStatus(status.id)}
                style={{
                  padding: "6px 14px",
                  background: "#1e2937",
                  border: `1px solid ${status.color}`,
                  color: status.color,
                  borderRadius: "9999px",
                  fontSize: "0.9rem",
                  cursor: "pointer"
                }}
              >
                {status.name}
              </div>
            ))}
          </div>
        )}

        {/* Statuts actifs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {activeStatuses.map((statusData: any) => {
            const status = ALL_STATUSES.find(s => s.id === statusData.id);
            if (!status) return null;
            return (
              <div
                key={status.id}
                onClick={() => setSelectedStatus(statusData)}
                style={{
                  background: "#0f172a",
                  border: `2px solid ${status.color}`,
                  color: status.color,
                  padding: "6px 12px",
                  borderRadius: "9999px",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                {status.name} <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>({statusData.value || 1})</span>
                <span onClick={(e) => { e.stopPropagation(); removeStatus(status.id); }} style={{ cursor: "pointer" }}>✕</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal détail avec slider */}
      {selectedStatus && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 3000,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "#0f172a", maxWidth: "420px", width: "90%", borderRadius: "12px",
            border: `2px solid ${ALL_STATUSES.find(s => s.id === selectedStatus.id)?.color}`, padding: "24px"
          }}>
            <h3 style={{ color: ALL_STATUSES.find(s => s.id === selectedStatus.id)?.color }}>
              {ALL_STATUSES.find(s => s.id === selectedStatus.id)?.name}
            </h3>

            {ALL_STATUSES.find(s => s.id === selectedStatus.id)?.description && (
              <p style={{ color: "#e2e8f0", lineHeight: "1.6", margin: "16px 0" }}>
                {ALL_STATUSES.find(s => s.id === selectedStatus.id)?.description}
              </p>
            )}

            <div style={{ margin: "20px 0" }}>
              <label>Niveau : <strong>{selectedStatus.value || 1}</strong></label>
              <input
                type="range"
                min="1"
                max="10"
                value={selectedStatus.value || 1}
                onChange={(e) => updateStatusValue(selectedStatus.id, Number(e.target.value))}
                style={{ width: "100%", marginTop: "8px" }}
              />
            </div>

            <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
              <button
                onClick={() => removeStatus(selectedStatus.id)}
                style={{ flex: 1, padding: "12px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold" }}
              >
                Remove Status
              </button>
              <button
                onClick={() => setSelectedStatus(null)}
                style={{ flex: 1, padding: "12px", background: "#334155", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}