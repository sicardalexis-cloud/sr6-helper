// src/App.tsx
import React, { useState } from "react";
import { CharacterProvider, useCharacterContext } from "./contexts/CharacterContext";

import AttributesPanel from "./components/AttributesPanel";
import EdgePool from "./components/EdgePool";
import MinorActions from "./components/MinorActions";
import ConditionMonitors from "./components/ConditionMonitors";
import BottomSections from "./components/BottomSections";

import SummoningModal from "./components/SummoningModal";
import SpiritsModal from "./components/SpiritsModal";
import SpiritSheetModal from "./components/SpiritSheetModal";

function AppContent() {
  const { 
    char, 
    update, 
    addSpirit, 
    applyDrain 
  } = useCharacterContext();

  const [isSummoningOpen, setIsSummoningOpen] = useState(false);
  const [isSpiritsOpen, setIsSpiritsOpen] = useState(false);
  const [isSpiritSheetOpen, setIsSpiritSheetOpen] = useState(false);
  const [selectedSpirit, setSelectedSpirit] = useState<any>(null);

  const openSpiritSheet = (spirit: any) => {
    setSelectedSpirit(spirit);
    setIsSpiritSheetOpen(true);
  };

  const updateName = (newName: string) => {
    update((draft: any) => {
      draft.name = newName;
    });
  };

  return (
    <div style={{
      background: "radial-gradient(circle at center, #1a2333 0%, #0a0f1c 100%)",
      minHeight: "100vh", 
      padding: "20px",
      display: "flex",
      justifyContent: "center"
    }}>
      <div style={{ width: "100%", maxWidth: "1100px" }}>

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

      {/* Modals */}
      <SummoningModal 
        isOpen={isSummoningOpen}
        onClose={() => setIsSummoningOpen(false)}
        addSpirit={addSpirit}
        update={update}           // ← important si tu utilises update aussi
      />
      
      <SpiritsModal 
        isOpen={isSpiritsOpen}
        onClose={() => setIsSpiritsOpen(false)}
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

export default function App() {
  return (
    <CharacterProvider>
      <AppContent />
    </CharacterProvider>
  );
}