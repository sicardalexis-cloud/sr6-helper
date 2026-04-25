import React from "react";
import type { Character } from "../types/types";

interface Props {
  char: Character;
  update: (key: keyof Character, value: number) => void;
}

export default function AttributesPanel({ char, update }: Props) {
  const attrs: { key: keyof Character; label: string }[] = [
    { key: "body", label: "BOD" },
    { key: "agility", label: "AGI" },
    { key: "reaction", label: "REA" },
    { key: "strength", label: "STR" },
    { key: "willpower", label: "WIL" },
    { key: "logic", label: "LOG" },
    { key: "intuition", label: "INT" },
    { key: "charisma", label: "CHA" },
    { key: "magic", label: "MAGIC" },
    { key: "essence", label: "ESSENCE" },
  ];

  return (
    <div className="attributes-panel">
      {attrs.map(attr => (
        <div key={attr.key} className="attribute-box">
          <div className="attr-label">{attr.label}</div>

          <div className="attr-controls">
            <button
              className="attr-btn"
              onClick={() => update(attr.key, char[attr.key] - 1)}
            >
              –
            </button>

            <div className="attr-value">{char[attr.key]}</div>

            <button
              className="attr-btn"
              onClick={() => update(attr.key, char[attr.key] + 1)}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
