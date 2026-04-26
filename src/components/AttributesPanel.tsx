import React, { useState } from "react";

const attrs = ["BOD", "AGI", "REA", "STR", "WIL", "LOG", "INT", "CHA", "MAGIC", "ESSENCE"];

interface Props {
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function AttributesPanel({ char, update }: Props) {
  const attributes = char.attributes || {};
  const [selectedAttr, setSelectedAttr] = useState<string | null>(null);

  const handleChange = (key: string, delta: number) => {
    update((draft: any) => {
      if (!draft.attributes) draft.attributes = {};
      const current = draft.attributes[key] ?? (key === "MAGIC" ? 0 : 3);
      draft.attributes[key] = Math.max(0, Math.min(10, current + delta));
    });
  };

  const toggleButtons = (key: string) => {
    setSelectedAttr(selectedAttr === key ? null : key);
  };

  return (
    <div className="attributes-grid">
      {attrs.map((label) => {
        const value = attributes[label] ?? (label === "MAGIC" ? 0 : 3);
        const isSelected = selectedAttr === label;

        return (
          <div key={label} className="attribute-box">
            <div className="attr-label">{label}</div>
            
            <div 
              className="attr-value" 
              onClick={() => toggleButtons(label)}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              {value}
            </div>

            {isSelected && (
              <div className="attr-controls" style={{ marginTop: "6px" }}>
                <button 
                  className="attr-btn minus"
                  onClick={() => handleChange(label, -1)}
                >
                  -
                </button>
                <button 
                  className="attr-btn plus"
                  onClick={() => handleChange(label, 1)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}