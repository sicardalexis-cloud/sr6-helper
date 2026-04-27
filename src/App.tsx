import React, { useState } from "react";
import "./styles.css";
import { useCharacter } from "./hooks/useCharacter";

import AttributesPanel from "./components/AttributesPanel";
import EdgePool from "./components/EdgePool";
import MinorActions from "./components/MinorActions";
import ConditionMonitors from "./components/ConditionMonitors";
import BottomSections from "./components/BottomSections";
import SummoningModal from "./components/SummoningModal";
import SpiritsModal from "./components/SpiritsModal";
import SpiritSheetModal from "./components/SpiritSheetModal";

export default function App() {
  const { char, update } = useCharacter();

  const [isSummoningOpen, setIsSummoningOpen] = useState(false);
  const [isSpiritsOpen, setIsSpiritsOpen] = useState(false);
  const [isSpiritSheetOpen, setIsSpiritSheetOpen] = useState(false);
  const [selectedSpirit, setSelectedSpirit] = useState<any>(null);

  const [activeSpirits, setActiveSpirits] = useState<any[]>([]);

  const addSpirit = (newSpirit: any) => {
    setActiveSpirits(prev => [...prev, {
      ...newSpirit,
      id: Date.now(),
      servicesRemaining: newSpirit.services || 1,
      conditionDamage: 0,
      solarTokens: 2,
    }]);
  };

  const openSpiritSheet = (spirit: any) => {
    setSelectedSpirit(spirit);
    setIsSpiritSheetOpen(true);
  };

  return (
    <div className="app-container">
      <div className="character-card">
        <div className="header">
          <h1 className="char-name">{char.name || "KAGE"}</h1>
        </div>

        <AttributesPanel char={char} update={update} />
        <EdgePool char={char} update={update} />
        <MinorActions char={char} update={update} />
        <ConditionMonitors char={char} update={update} />

        <BottomSections 
          onSummoningClick={() => setIsSummoningOpen(true)}
          onSpiritsClick={() => setIsSpiritsOpen(true)}
        />

        <SummoningModal 
          isOpen={isSummoningOpen} 
          onClose={() => setIsSummoningOpen(false)} 
          char={char}
          update={update}
          addSpirit={addSpirit}
        />

        <SpiritsModal 
          isOpen={isSpiritsOpen} 
          onClose={() => setIsSpiritsOpen(false)}
          activeSpirits={activeSpirits}
          setActiveSpirits={setActiveSpirits}
          onViewSpirit={openSpiritSheet}
        />

        <SpiritSheetModal 
          isOpen={isSpiritSheetOpen} 
          onClose={() => setIsSpiritSheetOpen(false)}
          spirit={selectedSpirit}
        />
      </div>
    </div>
  );
}