import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kage-character';

export function useCharacter() {
  const [char, setChar] = useState(() => {
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
      stun: 0
    };
  });

  // Sauvegarde à chaque changement
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(char));
  }, [char]);

  const update = (fn: (draft: any) => void) => {
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