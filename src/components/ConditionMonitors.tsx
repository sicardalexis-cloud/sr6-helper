// src/components/ConditionMonitors.tsx
import React from "react";

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

  const renderBoxes = (current: number, max: number, color: string, type?: string) => (
    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-start" }}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          onClick={() => type && handleClick(type as any, i)}
          style={{
            width: "28px",
            height: "28px",
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

  return (
    <div style={{
      background: "#1e2937",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      border: "1px solid #334155",
      position: "relative"
    }}>
      {/* Titre centré + Dice Pools en haut à droite */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
        <div style={{ flex: 1 }}></div>
        
        <h3 style={{ 
          color: "#67e8f9", 
          margin: 0, 
          fontSize: "1.45rem",
          letterSpacing: "2px",
          textAlign: "center"
        }}>
          CONDITION MONITORS
        </h3>

        {/* Dice Pools en haut à droite */}
        <div style={{ 
          color: totalPenalty > 0 ? "#ef4444" : "#4ade80", 
          fontWeight: "bold", 
          fontSize: "1.1rem",
          flex: 1,
          textAlign: "right"
        }}>
          dice pools {totalPenalty > 0 ? `-${totalPenalty}` : "0"}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* PHYSICAL */}
        <div>
          <div style={{ color: "#ef4444", fontWeight: "bold", marginBottom: "8px" }}>PHYSICAL</div>
          {renderBoxes(physicalCurrent, physicalMax, "#ef4444", "physical")}
        </div>

        {/* STUN */}
        <div>
          <div style={{ color: "#eab308", fontWeight: "bold", marginBottom: "8px" }}>STUN</div>
          {renderBoxes(normalStun, stunMax, "#eab308", "normalStun")}
        </div>

        {/* DRAIN STUN */}
        <div>
          <div style={{ color: "#a855f7", fontWeight: "bold", marginBottom: "8px" }}>DRAIN STUN</div>
          {renderBoxes(drainStun, stunMax, "#a855f7", "drainStun")}
        </div>

        {/* TOTAL STUN */}
        <div>
          <div style={{ color: "#facc15", fontWeight: "bold", marginBottom: "8px" }}>TOTAL STUN</div>
          {renderBoxes(totalStun, stunMax, "#facc15")}
        </div>
      </div>
    </div>
  );
}