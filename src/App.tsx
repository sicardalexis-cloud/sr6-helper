// src/App.tsx
import React, { useState, useEffect } from "react";
import "./styles.css";

import AttributesPanel from "./components/AttributesPanel";
import EdgePool from "./components/EdgePool";
import MinorActions from "./components/MinorActions";
import ConditionMonitors from "./components/ConditionMonitors";
import BottomSections from "./components/BottomSections";

import SummoningModal from "./components/SummoningModal";
import SpiritsModal from "./components/SpiritsModal";
import SpiritSheetModal from "./components/SpiritSheetModal";

const STORAGE_KEY = 'kage-character';

export default function App() {
  // ==================== STATE GLOBAL ====================
  const [char, setChar] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: "KAGE",
      attributes: { BOD: 3, AGI: 3, REA: 3, STR: 3, WIL: 3, LOG: 3, INT: 3, CHA: 3, MAGIC: 6, ESSENCE: 6 },
      edge: { current: 7, max: 7 },
      minorActions: { current: 2, max: 3 },
      physical: 0,
      stun: 0,
      drainStun: 0,
      activeSpirits: []
    };
  });

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(char));
  }, [char]);

  // ==================== UPDATE FUNCTION (corrigée TS) ====================
  const update = (fn: (draft: any) => void) => {
    setChar((prev: any) => {
      const draft = { ...prev };
      fn(draft);
      return draft;
    });
  };

  // ==================== FONCTIONS ESPRITS ====================
  const addSpirit = (spiritData: any) => {
    const newSpirit = {
      ...spiritData,
      id: `spirit_${Date.now()}`,
      optionalPowers: []
    };
    update((draft) => {
      draft.activeSpirits.push(newSpirit);
    });
  };

  const advanceSolarPhase = () => {
    update((draft) => {
      if (!draft.activeSpirits || !Array.isArray(draft.activeSpirits)) return;
      draft.activeSpirits = draft.activeSpirits
        .map((spirit: any) => ({
          ...spirit,
          solarTokens: Math.max(0, spirit.solarTokens - 1)
        }))
        .filter((spirit: any) => spirit.solarTokens > 0);
    });
  };

  const updateName = (newName: string) => {
    update((draft) => { draft.name = newName; });
  };

  // ==================== MODALS ====================
  const [isSummoningOpen, setIsSummoningOpen] = useState(false);
  const [isSpiritsOpen, setIsSpiritsOpen] = useState(false);
  const [isSpiritSheetOpen, setIsSpiritSheetOpen] = useState(false);
  const [selectedSpirit, setSelectedSpirit] = useState<any>(null);

  const openSpiritSheet = (spirit: any) => {
    setSelectedSpirit(spirit);
    setIsSpiritSheetOpen(true);
  };

  return (
    <div style={{
      background: "radial-gradient(circle at center, #1a2333 0%, #0a0f1c 100%)",
      minHeight: "100vh", padding: "20px", color: "#e0f2fe"
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Nom du Personnage */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <input
            type="text"
            value={char.name || ""}
            onChange={(e) => updateName(e.target.value)}
            style={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "2px solid #22ff88",
              color: "#22ff88",
              fontSize: "1.9rem",
              fontWeight: "bold",
              textAlign: "center",
              padding: "10px 24px",
              borderRadius: "10px",
              width: "360px",
              outline: "none"
            }}
          />
        </div>

        <div style={{
          background: "#111827",
          border: "2px solid #22ff88",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 0 40px rgba(34, 255, 136, 0.15)"
        }}>
          <AttributesPanel char={char} update={update} />
          <EdgePool char={char} update={update} />
          <MinorActions char={char} update={update} />
          <ConditionMonitors char={char} update={update} />

          <BottomSections 
            onSummoningClick={() => setIsSummoningOpen(true)}
            onSpiritsClick={() => setIsSpiritsOpen(true)}
          />
        </div>
      </div>

      {/* ==================== MODALS ==================== */}
      <SummoningModal 
        isOpen={isSummoningOpen}
        onClose={() => setIsSummoningOpen(false)}
        addSpirit={addSpirit}
        update={update}
      />

      <SpiritsModal 
        isOpen={isSpiritsOpen}
        onClose={() => setIsSpiritsOpen(false)}
        activeSpirits={char.activeSpirits || []}
        update={update}
        onViewSpirit={openSpiritSheet}
      />

      <SpiritSheetModal 
        isOpen={isSpiritSheetOpen}
        onClose={() => {
          setIsSpiritSheetOpen(false);
          setSelectedSpirit(null);
        }}
        spirit={selectedSpirit}
      />
    </div>
  );
}