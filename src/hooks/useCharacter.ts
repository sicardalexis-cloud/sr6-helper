import { useState, useCallback } from "react";

const initialCharacter = {
  name: "KAGE",
  attributes: {
    BOD: 3, AGI: 3, REA: 3, STR: 3, WIL: 3,
    LOG: 3, INT: 3, CHA: 3, MAGIC: 0, ESSENCE: 3
  },
  edge: { current: 0, max: 7 },
  minorActions: { current: 1, max: 3 },
  physical: { current: 0, max: 10 },
  stun: { 
    total: { current: 0, max: 10 },
    normal: { current: 0, max: 6 },
    drain: { current: 0, max: 6 }
  }
};

export function useCharacter() {
  const [char, setChar] = useState(initialCharacter);

  const update = useCallback((updater: (draft: any) => void) => {
    setChar(prev => {
      const draft = { ...prev };
      updater(draft);
      return draft;
    });
  }, []);

  return { char, update };
}