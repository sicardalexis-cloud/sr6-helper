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

  const physicalCurrent = char.physical?.current ?? 0;
  const stunCurrent = char.stun?.total?.current ?? 0;

  const updateMonitor = (section: string, delta: number) => {
    update((draft: any) => {
      if (section === "physical") {
        if (!draft.physical) draft.physical = { current: 0 };
        const max = 8 + Math.ceil((draft.attributes?.BOD ?? 3) / 2);
        draft.physical.current = Math.max(0, Math.min(max, (draft.physical.current ?? 0) + delta));
      } 
      else if (section === "stun") {
        if (!draft.stun) draft.stun = { total: { current: 0 } };
        const max = 8 + Math.ceil((draft.attributes?.WIL ?? 3) / 2);
        draft.stun.total.current = Math.max(0, Math.min(max, (draft.stun.total.current ?? 0) + delta));
      }
    });
  };

  const renderBoxes = (current: number, max: number, isStun: boolean = false) => {
    const fillColor = isStun ? "#22d3ee" : "#ef4444";
    const borderColor = isStun ? "#67e8f9" : "#f87171";

    return Array.from({ length: max }).map((_, i) => (
      <div
        key={i}
        className="monitor-box"
        style={{
          background: i < current ? fillColor : "#1e2937",
          borderColor: i < current ? borderColor : "#475569"
        }}
      />
    ));
  };

  return (
    <div className="monitors">
      
      {/* PHYSICAL MONITOR */}
      <div className="monitor-panel" style={{ borderColor: "#f87171" }}>
        <div className="monitor-title" style={{ color: "#f87171" }}>PHYSICAL MONITOR</div>
        <div className="monitor-row">
          {renderBoxes(physicalCurrent, physicalMax)}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "12px", alignItems: "center" }}>
          <button onClick={() => updateMonitor("physical", -1)} style={{width:"48px", height:"48px", background:"#ef4444", color:"white", border:"none", borderRadius:"10px", fontSize:"1.4rem"}}>-</button>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{physicalCurrent} / {physicalMax}</span>
          <button onClick={() => updateMonitor("physical", 1)} style={{width:"48px", height:"48px", background:"#22c55e", color:"white", border:"none", borderRadius:"10px", fontSize:"1.4rem"}}>+</button>
        </div>
      </div>

      {/* STUN MONITORS */}
      <div className="monitor-panel" style={{ borderColor: "#22d3ee" }}>
        <div className="monitor-title" style={{ color: "#22d3ee" }}>STUN MONITORS</div>
        
        <div style={{ marginBottom: "16px" }}>
          <div style={{ color: "#94a3b8", marginBottom: "8px" }}>TOTAL</div>
          <div className="monitor-row">
            {renderBoxes(stunCurrent, stunMax, true)}
          </div>
        </div>

        <div style={{ display: "flex", gap: "40px" }}>
          <div>
            <div style={{ color: "#94a3b8", marginBottom: "8px" }}>NORMAL STUN</div>
            <div className="monitor-row">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="monitor-box" style={{ background: "#1e2937", borderColor: "#475569" }} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: "#94a3b8", marginBottom: "8px" }}>DRAIN</div>
            <div className="monitor-row">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="monitor-box" style={{ background: "#1e2937", borderColor: "#475569" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}