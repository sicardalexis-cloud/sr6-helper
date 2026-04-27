import React, { useState } from "react";
import "./styles.css";
import { CharacterProvider } from "./contexts/CharacterContext";

import AttributesPanel from "./components/AttributesPanel";
import EdgePool from "./components/EdgePool";
import MinorActions from "./components/MinorActions";
import ConditionMonitors from "./components/ConditionMonitors";
import BottomSections from "./components/BottomSections";

import SummoningModal from "./components/SummoningModal";
import SpiritsModal from "./components/SpiritsModal";
import SpiritSheetModal from "./components/SpiritSheetModal";

export default function App() {
  return (
    <CharacterProvider>
      <AppContent />
    </CharacterProvider>
  );
}

function AppContent() {
  const [isSummoningOpen, setIsSummoningOpen] = useState(false);
  const [isSpiritsOpen, setIsSpiritsOpen] = useState(false);
  const [isSpiritSheetOpen, setIsSpiritSheetOpen] = useState(false);
  const [selectedSpirit, setSelectedSpirit] = useState<any>(null);

  return (
    <div className="app-container">
      <div className="character-card">
        <div className="header">
          <h1 className="char-name">KAGE</h1>
          <div className="char-role">SHADOWRUNNER</div>
        </div>

        <AttributesPanel />
        <EdgePool />
        <MinorActions />
        <ConditionMonitors />

        <BottomSections 
          onSummoningClick={() => setIsSummoningOpen(true)}
          onSpiritsClick={() => setIsSpiritsOpen(true)}
        />
      </div>

      <SummoningModal 
        isOpen={isSummoningOpen}
        onClose={() => setIsSummoningOpen(false)}
      />

      <SpiritsModal 
  isOpen={isSpiritsOpen}
  onClose={() => setIsSpiritsOpen(false)}
  onViewSpirit={(spirit) => {
    setSelectedSpirit(spirit);
    setIsSpiritSheetOpen(true);
  }}
/>

      <SpiritSheetModal 
        isOpen={isSpiritSheetOpen}
        onClose={() => setIsSpiritSheetOpen(false)}
        spirit={selectedSpirit}
      />
    </div>
  );
}