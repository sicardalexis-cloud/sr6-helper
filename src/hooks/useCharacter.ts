import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kage-character';

interface Character {
  name: string;
  attributes: Record<string, number>;
  edge: { current: number; max: number };
  minorActions: { current: number; max: number };
  physical: number;
  stun: number;
  drainStun: number;
}

export function useCharacter() {
  const [char, setChar] = useState<Character>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      name: "KAGE",
      attributes: { BOD: 3, AGI: 3, REA: 3, STR: 3, WIL: 3, LOG: 3, INT: 3, CHA: 3, MAGIC: 0, ESSENCE: 3 },
      edge: { current: 0, max: 7 },
      minorActions: { current: 1, max: 3 },
      physical: 0,
      stun: 0,
      drainStun: 0
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(char));
  }, [char]);

  const update = (fn: (draft: Character) => void) => {
    setChar(prev => {
      const draft = { ...prev };
      fn(draft);
      return draft;
    });
  };

  const resetCharacter = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  return { char, update, resetCharacter };
}