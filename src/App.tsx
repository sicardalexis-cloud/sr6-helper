import React from "react";
import "./styles.css";
import { useCharacter } from "./hooks/useCharacter";

import AttributesPanel from "./components/AttributesPanel";
import EdgePool from "./components/EdgePool";
import MinorActions from "./components/MinorActions";
import ConditionMonitors from "./components/ConditionMonitors";
import BottomSections from "./components/BottomSections";

export default function App() {
  const { char, update } = useCharacter();

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
        <BottomSections />
      </div>
    </div>
  );
}