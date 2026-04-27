import React from "react";
import { useCharacterContext } from "../contexts/CharacterContext";

export default function ConditionMonitors() {
  const { char, update } = useCharacterContext();

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

  const handleClick = (type: "physical" | "normalStun" | "drainStun", index: number) => {
    update((draft: any) => {
      if (type === "physical") {
        draft.physical = physicalCurrent === index + 1 ? index : index + 1;
      } else if (type === "normalStun") {
        draft.stun = normalStun === index + 1 ? index : index + 1;
      } else if (type === "drainStun") {
        draft.drainStun = drainStun === index + 1 ? index : index + 1;
      }
    });
  };

  const renderBoxes = (current: number, max: number, color: string, type?: "physical" | "normalStun" | "drainStun") => (
    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-start" }}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          onClick={() => type && handleClick(type, i)}
          style={{
            width: "32px",
            height: "32px",
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
    <div style={{ padding: "16px", background: "#1e2937", borderRadius: "12px", marginBottom: "16px" }}>
      <h3 style={{ color: "#c084fc", marginBottom: "12px" }}>CONDITION MONITORS</h3>

      <div style={{ marginBottom: "16px", fontWeight: "bold", fontSize: "1.25rem" }}>
        MALUS DE DÉS : <span style={{ color: totalPenalty > 0 ? "#ef4444" : "#4ade80" }}>
          {totalPenalty > 0 ? `-${totalPenalty}` : "0"}
        </span>
      </div>

      {/* PHYSICAL */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
        <div style={{ color: "#ef4444", fontWeight: "bold", width: "110px", textAlign: "right" }}>
          PHYSICAL
        </div>
        {renderBoxes(physicalCurrent, physicalMax, "#ef4444", "physical")}
      </div>

      {/* NORMAL STUN */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
        <div style={{ color: "#eab308", fontWeight: "bold", width: "110px", textAlign: "right" }}>
          STUN
        </div>
        {renderBoxes(normalStun, stunMax, "#eab308", "normalStun")}
      </div>

      {/* DRAIN STUN */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
        <div style={{ color: "#a855f7", fontWeight: "bold", width: "110px", textAlign: "right" }}>
          DRAIN STUN
        </div>
        {renderBoxes(drainStun, stunMax, "#a855f7", "drainStun")}
      </div>

      {/* TOTAL STUN */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ color: "#facc15", fontWeight: "bold", width: "110px", textAlign: "right" }}>
          TOTAL STUN
        </div>
        {renderBoxes(totalStun, stunMax, "#facc15")}
      </div>
    </div>
  );
}