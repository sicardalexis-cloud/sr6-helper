

interface Props {
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function MinorActions({ char, update }: Props) {
  const current = char.minorActions?.current ?? 1;
  const max = char.minorActions?.max ?? 3;

  const changeMax = (delta: number) => {
    update((draft: any) => {
      if (!draft.minorActions) draft.minorActions = { current: 1, max: 3 };
      
      const newMax = Math.max(1, Math.min(8, draft.minorActions.max + delta)); // entre 1 et 8
      draft.minorActions.max = newMax;
      
      // Si on réduit le max en dessous du current, on ajuste le current
      if (draft.minorActions.current > newMax) {
        draft.minorActions.current = newMax;
      }
    });
  };

  const spend = () => {
    update((draft: any) => {
      if (!draft.minorActions) draft.minorActions = { current: 1, max: 3 };
      if (draft.minorActions.current > 0) {
        draft.minorActions.current -= 1;
      }
    });
  };

  const reset = () => {
    update((draft: any) => {
      if (!draft.minorActions) draft.minorActions = { current: 1, max: 3 };
      draft.minorActions.current = draft.minorActions.max;
    });
  };

  return (
    <div className="minor-actions">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ color: "#67e8f9", fontWeight: "bold", fontSize: "1.1rem" }}>MINOR ACTIONS</div>
        
        {/* Petits boutons pour modifier le MAX */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button 
            onClick={() => changeMax(-1)}
            style={{ 
              width: "42px", height: "42px", background: "#22d3ee", color: "#111", 
              fontSize: "1.4rem", border: "none", borderRadius: "8px" 
            }}
          >
            -
          </button>
          <button 
            onClick={() => changeMax(1)}
            style={{ 
              width: "42px", height: "42px", background: "#22d3ee", color: "#111", 
              fontSize: "1.4rem", border: "none", borderRadius: "8px" 
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Cercles */}
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", margin: "20px 0" }}>
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: i < current ? "#22d3ee" : "#1e2937",
              border: i < current ? "5px solid #67e8f9" : "5px solid #475569",
              boxShadow: i < current ? "0 0 20px #22d3ee" : "none"
            }}
          />
        ))}
      </div>

      {/* Boutons Spend & Reset */}
      <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        <button 
          onClick={spend}
          disabled={current === 0}
          style={{ 
            background: "#22d3ee", 
            color: "#111", 
            padding: "10px 32px", 
            borderRadius: "8px", 
            fontWeight: "bold",
            border: "none",
            cursor: current > 0 ? "pointer" : "not-allowed",
            opacity: current > 0 ? 1 : 0.5
          }}
        >
          Spend -1
        </button>
        
        <button 
          onClick={reset}
          style={{ 
            background: "transparent", 
            border: "2px solid #64748b", 
            color: "#e2e8f0", 
            padding: "10px 32px", 
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}