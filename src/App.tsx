import React, { useState, useEffect } from "react";
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

export interface ActiveSpirit {
  id: number;
  element: string;
  force: number;
  servicesRemaining: number;
  conditionDamage: number;
  invocationDate: string;
  solarPhase: "Jour" | "Nuit";
  solarTokens: number;
}

export default function App() {
  const { char, update } = useCharacter();

  // États des modals
  const [isSummoningOpen, setIsSummoningOpen] = useState(false);
  const [isSpiritsOpen, setIsSpiritsOpen] = useState(false);
  const [isSpiritSheetOpen, setIsSpiritSheetOpen] = useState(false);
  const [selectedSpirit, setSelectedSpirit] = useState<ActiveSpirit | null>(null);

  // Persistance des esprits actifs
  const [activeSpirits, setActiveSpirits] = useState<ActiveSpirit[]>(() => {
    const saved = localStorage.getItem("sr6-active-spirits");
    return saved ? JSON.parse(saved) : [];
  });

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem("sr6-active-spirits", JSON.stringify(activeSpirits));
  }, [activeSpirits]);

  const addSpirit = (spiritData: Omit<ActiveSpirit, "id">) => {
    const newSpirit: ActiveSpirit = {
      ...spiritData,
      id: Date.now(),
    };
    setActiveSpirits(prev => [...prev, newSpirit]);
  };

  const openSpiritSheet = (spirit: ActiveSpirit) => {
    setSelectedSpirit(spirit);
    setIsSpiritSheetOpen(true);
  };

  return (
    <div className="app-container">
      <div className="character-card">
        <div className="header">
          <h1 className="char-name">{char.name || "KAGE"}</h1>
          <div className="char-role">STREET SAMURAI</div>
        </div>

        <AttributesPanel char={char} update={update} />
        <EdgePool char={char} update={update} />
        <MinorActions char={char} update={update} />
        <ConditionMonitors char={char} update={update} />
        <BottomSections 
          onSummoningClick={() => setIsSummoningOpen(true)}
          onSpiritsClick={() => setIsSpiritsOpen(true)}
        />
      </div>

      {/* Modals */}
      <SummoningModal 
        isOpen={isSummoningOpen}
        onClose={() => setIsSummoningOpen(false)}
        addSpirit={addSpirit}
        update={update}
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
  );
}