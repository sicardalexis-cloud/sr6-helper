import React from "react";
import type { Character } from "../types/types";
import Diamond from "./UI/Diamond";

interface Props {
  char: Character;
  update: (key: keyof Character, value: number) => void;
}

export default function EdgePool({ char, update }: Props) {
  const { edgeCurrent, edgeMax } = char;

  const diamonds = [];
  for (let i = 0; i < edgeMax; i++) {
    diamonds.push(<Diamond key={i} filled={i < edgeCurrent} />);
  }

  return (
    <div className="edge-panel">
      <div className="edge-title">EDGE POOL</div>

      <div className="edge-diamonds">{diamonds}</div>

      <div className="edge-controls">
        <button
          className="edge-btn"
          onClick={() => update("edgeCurrent", edgeCurrent - 1)}
        >
          –
        </button>

        <div className="edge-value">
          {edgeCurrent} / {edgeMax}
        </div>

        <button
          className="edge-btn"
          onClick={() => update("edgeCurrent", edgeCurrent + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
