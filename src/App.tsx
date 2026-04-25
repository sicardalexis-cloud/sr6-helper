import React from "react";
import { useCharacter } from "./hooks/useCharacter";

import AttributesPanel from "./components/AttributesPanel";
import EdgePool from "./components/EdgePool";
import MinorActions from "./components/MinorActions";
import ConditionMonitors from "./components/ConditionMonitors";
import BottomSections from "./components/BottomSections";

import "./styles.css";

export default function App() {
  const { char, update } = useCharacter();

  return (
    <div className="app-container">
      <div className="character-card">

        {/* Nom + Rôle */}
        <div className="header">
          <div className="char-name">{char.name}</div>
          <div className="char-role">STREET SAMURAI</div>
        </div>

        {/* Attributs */}
        <AttributesPanel char={char} update={update} />

        {/* Edge Pool */}
        <EdgePool char={char} update={update} />

        {/* Minor Actions */}
        <MinorActions char={char} update={update} />

        {/* Condition Monitors */}
        <ConditionMonitors char={char} update={update} />

        {/* Sections du bas */}
        <BottomSections />
      </div>
    </div>
  );
}
