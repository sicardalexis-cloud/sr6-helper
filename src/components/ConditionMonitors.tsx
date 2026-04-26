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
            width: "30px",
            height: "30px",
            background: i < current ? color : "#1e2937",
            border: "2px solid #475569",
            borderRadius: "4px",
            cursor: type ? "pointer" : "default",
            transition: "all 0.2s"
          }}
        />
      ))}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* MALUS GLOBAL */}
      <div style={{ textAlign: "center", marginBottom: "12px" }}>
        <div style={{ color: "#facc15", fontWeight: "bold", fontSize: "1.25rem" }}>
          MALUS DE DÉS : <span style={{ color: totalPenalty > 0 ? "#ef4444" : "#4ade80" }}>
            {totalPenalty > 0 ? `-${totalPenalty}` : "0"}
          </span>
        </div>
      </div>

      {/* PHYSICAL */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ color: "#ef4444", fontWeight: "bold", width: "110px", textAlign: "right" }}>
          PHYSICAL
        </div>
        {renderBoxes(physicalCurrent, physicalMax, "#ef4444", "physical")}
      </div>

      {/* STUN */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ color: "#eab308", fontWeight: "bold", width: "110px", textAlign: "right" }}>
          STUN
        </div>
        {renderBoxes(normalStun, stunMax, "#eab308", "normalStun")}
      </div>

      {/* DRAIN STUN */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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