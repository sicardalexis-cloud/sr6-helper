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
    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      <div>
        <div style={{ color: "#ef4444", fontWeight: "bold", textAlign: "center", marginBottom: "10px", fontSize: "1.1rem" }}>
          PHYSICAL MONITOR
        </div>
        {renderBoxes(physicalCurrent, physicalMax, "#ef4444", "physical")}
        <div style={{ textAlign: "center", marginTop: "8px", color: "#94a3b8" }}>
          {physicalCurrent} / {physicalMax}
        </div>
      </div>

      <div>
        <div style={{ color: "#eab308", fontWeight: "bold", textAlign: "center", marginBottom: "10px", fontSize: "1.1rem" }}>
          STUN MONITOR
        </div>
        {renderBoxes(normalStun, stunMax, "#eab308", "normalStun")}
        <div style={{ textAlign: "center", marginTop: "8px", color: "#94a3b8" }}>
          {normalStun} / {stunMax}
        </div>
      </div>

      <div>
        <div style={{ color: "#a855f7", fontWeight: "bold", textAlign: "center", marginBottom: "10px", fontSize: "1.1rem" }}>
          DRAIN STUN
        </div>
        {renderBoxes(drainStun, stunMax, "#a855f7", "drainStun")}
        <div style={{ textAlign: "center", marginTop: "8px", color: "#94a3b8" }}>
          {drainStun} / {stunMax}
        </div>
      </div>

      <div>
        <div style={{ color: "#facc15", fontWeight: "bold", textAlign: "center", marginBottom: "10px", fontSize: "1.1rem" }}>
          TOTAL STUN
        </div>
        {renderBoxes(totalStun, stunMax, "#facc15")}
        <div style={{ textAlign: "center", marginTop: "8px", color: "#94a3b8", fontWeight: "bold" }}>
          {totalStun} / {stunMax}
        </div>
      </div>

    </div>
  );
}