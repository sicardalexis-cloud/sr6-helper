// src/components/BottomSections.tsx
import React from "react";

interface Props {
  onSummoningClick: () => void;
  onSpiritsClick: () => void;
  onRestClick: () => void;
  onSpellsClick: () => void;
  onSpellcastingClick: () => void;
  onCombatClick: () => void;
  onExtendedTestClick: () => void;
  onRoutineClick: () => void;           // ← Ajouté pour la routine magique
}

export default function BottomSections({ 
  onSummoningClick, 
  onSpiritsClick, 
  onRestClick,
  onSpellsClick,
  onSpellcastingClick,
  onCombatClick,
  onExtendedTestClick,
  onRoutineClick                          // ← Ajouté
}: Props) {
  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "1fr 1fr", 
      gap: "14px",
      marginTop: "30px"
    }}>
      
      {/* SUMMONING */}
      <div 
        onClick={onSummoningClick}
        style={{
          background: "rgba(16, 185, 129, 0.1)",
          border: "2px solid #10b981",
          borderRadius: "12px",
          padding: "20px 16px",
          color: "#10b981",
          fontWeight: "bold",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "all 0.2s",
          boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)"
        }}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 0 25px rgba(16, 185, 129, 0.6)"}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 0 15px rgba(16, 185, 129, 0.3)"}
      >
        👻 SUMMONING
      </div>

      {/* ACTIVE SPIRITS */}
      <div 
        onClick={onSpiritsClick}
        style={{
          background: "rgba(168, 85, 247, 0.1)",
          border: "2px solid #a855f7",
          borderRadius: "12px",
          padding: "20px 16px",
          color: "#a855f7",
          fontWeight: "bold",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "all 0.2s",
          boxShadow: "0 0 15px rgba(168, 85, 247, 0.3)"
        }}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 0 25px rgba(168, 85, 247, 0.6)"}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 0 15px rgba(168, 85, 247, 0.3)"}
      >
        👤 ACTIVE SPIRITS
      </div>

      {/* SPELLS */}
      <div 
        onClick={onSpellsClick}
        style={{
          background: "rgba(103, 232, 249, 0.1)",
          border: "2px solid #67e8f9",
          borderRadius: "12px",
          padding: "20px 16px",
          color: "#67e8f9",
          fontWeight: "bold",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "all 0.2s",
          boxShadow: "0 0 15px rgba(103, 232, 249, 0.3)"
        }}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 0 25px rgba(103, 232, 249, 0.6)"}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 0 15px rgba(103, 232, 249, 0.3)"}
      >
        ✨ SPELLS
      </div>

      {/* SPELLCASTING */}
      <div 
        onClick={onSpellcastingClick}
        style={{
          background: "rgba(192, 132, 252, 0.1)",
          border: "2px solid #c084fc",
          borderRadius: "12px",
          padding: "20px 16px",
          color: "#c084fc",
          fontWeight: "bold",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "all 0.2s",
          boxShadow: "0 0 15px rgba(192, 132, 252, 0.3)"
        }}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 0 25px rgba(192, 132, 252, 0.6)"}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 0 15px rgba(192, 132, 252, 0.3)"}
      >
        ⚡ SPELLCASTING
      </div>

      {/* ATTACK & COMBAT */}
      <div 
        onClick={onCombatClick}
        style={{
          background: "rgba(251, 191, 36, 0.1)",
          border: "2px solid #fbbf24",
          borderRadius: "12px",
          padding: "20px 16px",
          color: "#fbbf24",
          fontWeight: "bold",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "all 0.2s",
          boxShadow: "0 0 15px rgba(251, 191, 36, 0.3)"
        }}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 0 25px rgba(251, 191, 36, 0.6)"}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 0 15px rgba(251, 191, 36, 0.3)"}
      >
        ⚔️ ATTACK & COMBAT
      </div>

      {/* EXTENDED TEST */}
      <div 
        onClick={onExtendedTestClick}
        style={{
          background: "rgba(165, 243, 252, 0.1)",
          border: "2px solid #67e8f9",
          borderRadius: "12px",
          padding: "20px 16px",
          color: "#67e8f9",
          fontWeight: "bold",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "all 0.2s",
          boxShadow: "0 0 15px rgba(103, 232, 249, 0.3)"
        }}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 0 25px rgba(103, 232, 249, 0.6)"}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 0 15px rgba(103, 232, 249, 0.3)"}
      >
        📊 EXTENDED TEST
      </div>

      {/* MAGIC ROUTINE */}
      <div 
        onClick={onRoutineClick}
        style={{
          background: "rgba(236, 72, 153, 0.1)",
          border: "2px solid #ec4899",
          borderRadius: "12px",
          padding: "20px 16px",
          color: "#ec4899",
          fontWeight: "bold",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "all 0.2s",
          boxShadow: "0 0 15px rgba(236, 72, 153, 0.3)"
        }}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 0 25px rgba(236, 72, 153, 0.6)"}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 0 15px rgba(236, 72, 153, 0.3)"}
      >
        🔄 MAGIC ROUTINE
      </div>

      {/* REST & RECOVERY */}
      <div 
        onClick={onRestClick}
        style={{
          background: "rgba(248, 113, 113, 0.1)",
          border: "2px solid #f87171",
          borderRadius: "12px",
          padding: "20px 16px",
          color: "#f87171",
          fontWeight: "bold",
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "all 0.2s",
          boxShadow: "0 0 15px rgba(248, 113, 113, 0.3)",
          gridColumn: "1 / -1"
        }}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 0 25px rgba(248, 113, 113, 0.6)"}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 0 15px rgba(248, 113, 113, 0.3)"}
      >
        ❤️ REST & RECOVERY
      </div>

    </div>
  );
}