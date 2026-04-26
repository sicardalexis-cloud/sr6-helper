

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
  const normalStunCurrent = char.stun?.normal?.current ?? 0;
  const drainCurrent = char.stun?.drain?.current ?? 0;
  const totalStunCurrent = normalStunCurrent + drainCurrent;

  // Malus cumulatifs : -1 tous les 3 cases (Physical + Stun)
  const physicalPenalty = Math.floor(physicalCurrent / 3);
  const stunPenalty = Math.floor(totalStunCurrent / 3);
  const totalPenalty = physicalPenalty + stunPenalty;   // ← CUMULATIF

  const updateMonitor = (type: "physical" | "normal" | "drain", delta: number) => {
    update((draft: any) => {
      if (type === "physical") {
        if (!draft.physical) draft.physical = { current: 0 };
        const max = 8 + Math.ceil((draft.attributes?.BOD ?? 3) / 2);
        draft.physical.current = Math.max(0, Math.min(max, (draft.physical.current ?? 0) + delta));
      } else if (type === "normal" || type === "drain") {
        if (!draft.stun) draft.stun = { normal: { current: 0 }, drain: { current: 0 } };
        const max = 8 + Math.ceil((draft.attributes?.WIL ?? 3) / 2);
        const target = type === "normal" ? "normal" : "drain";
        draft.stun[target].current = Math.max(0, Math.min(max, (draft.stun[target].current ?? 0) + delta));
      }
    });
  };

  const renderBoxes = (current: number, max: number, color: string, borderColor: string) => {
    return Array.from({ length: max }).map((_, i) => (
      <div
        key={i}
        className="monitor-box"
        style={{
          background: i < current ? color : "#1e2937",
          borderColor: i < current ? borderColor : "#475569"
        }}
      />
    ));
  };

  return (
    <div className="monitor-panel" style={{ 
      borderColor: "#334155", 
      padding: "24px",
      marginBottom: "30px"
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>

        {/* PHYSICAL MONITOR */}
        <div>
          <div className="monitor-title" style={{ color: "#f87171", marginBottom: "12px" }}>PHYSICAL MONITOR</div>
          <div className="monitor-row">
            {renderBoxes(physicalCurrent, physicalMax, "#ef4444", "#f87171")}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "12px" }}>
            <button onClick={() => updateMonitor("physical", -1)} style={{width:"48px", height:"48px", background:"#ef4444", color:"white", border:"none", borderRadius:"10px", fontSize:"1.4rem"}}>-</button>
            <button onClick={() => updateMonitor("physical", 1)} style={{width:"48px", height:"48px", background:"#22c55e", color:"white", border:"none", borderRadius:"10px", fontSize:"1.4rem"}}>+</button>
          </div>
          {physicalPenalty > 0 && (
            <div style={{ textAlign: "center", marginTop: "8px", color: "#f87171", fontWeight: "bold" }}>
              -{physicalPenalty} dés
            </div>
          )}
        </div>

        {/* STUN MONITORS */}
        <div>
          <div className="monitor-title" style={{ color: "#22d3ee", marginBottom: "12px" }}>STUN MONITORS</div>
          
          <div style={{ marginBottom: "20px" }}>
            <div style={{ color: "#94a3b8", marginBottom: "8px" }}>TOTAL</div>
            <div className="monitor-row">
              {renderBoxes(totalStunCurrent, stunMax, "#22d3ee", "#67e8f9")}
            </div>
          </div>

          <div style={{ display: "flex", gap: "50px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#94a3b8", marginBottom: "8px" }}>NORMAL STUN</div>
              <div style={{ fontSize: "2.1rem", fontWeight: "bold", color: "#67e8f9" }}>{normalStunCurrent}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "8px" }}>
                <button onClick={() => updateMonitor("normal", -1)} style={{width:"38px", height:"38px", background:"#22d3ee", color:"#111", border:"none", borderRadius:"8px"}}>-</button>
                <button onClick={() => updateMonitor("normal", 1)} style={{width:"38px", height:"38px", background:"#22d3ee", color:"#111", border:"none", borderRadius:"8px"}}>+</button>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#94a3b8", marginBottom: "8px" }}>DRAIN STUN</div>
              <div style={{ fontSize: "2.1rem", fontWeight: "bold", color: "#c4d0ff" }}>{drainCurrent}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "8px" }}>
                <button onClick={() => updateMonitor("drain", -1)} style={{width:"38px", height:"38px", background:"#a5b4fc", color:"#111", border:"none", borderRadius:"8px"}}>-</button>
                <button onClick={() => updateMonitor("drain", 1)} style={{width:"38px", height:"38px", background:"#a5b4fc", color:"#111", border:"none", borderRadius:"8px"}}>+</button>
              </div>
            </div>
          </div>

          {stunPenalty > 0 && (
            <div style={{ textAlign: "center", marginTop: "8px", color: "#67e8f9", fontWeight: "bold" }}>
              -{stunPenalty} dés
            </div>
          )}
        </div>

      </div>

      {/* MALUS TOTAL CUMULATIF */}
      {totalPenalty > 0 && (
        <div style={{ 
          textAlign: "center", 
          marginTop: "25px", 
          padding: "12px", 
          background: "#1f2937", 
          borderRadius: "10px",
          color: "#fbbf24",
          fontWeight: "bold",
          fontSize: "1.2rem",
          border: "1px solid #fbbf24"
        }}>
          MALUS TOTAL : -{totalPenalty} DÉS
        </div>
      )}
    </div>
  );
}