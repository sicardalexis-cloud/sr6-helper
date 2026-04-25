import React from "react";
import type { Character } from "../types/types";
import Circle from "./UI/Circle";

interface Props {
  char: Character;
  update: (key: keyof Character, value: number) => void;
}

export default function MinorActions({ char, update }: Props) {
  const { minor } = char;

  const circles = [];
  for (let i = 0; i < 4; i++) {
    circles.push(<Circle key={i} filled={i < minor} />);
  }

  return (
    <div className="minor-panel">
      <div className="minor-title">MINOR ACTIONS</div>

      <div className="minor-circles">{circles}</div>

      <div className="minor-controls">
        <button
          className="minor-btn"
          onClick={() => update("minor", minor - 1)}
        >
          Spend -1
        </button>

        <button
          className="minor-btn"
          onClick={() => update("minor", 2)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

