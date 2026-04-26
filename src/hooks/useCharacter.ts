import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kage-character';

export function useCharacter() {
  const [char, setChar] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger depuis localStorage au montage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setChar(JSON.parse(saved));
    } else {
      setChar({
        name: "KAGE",
        attributes: { BOD: 3, AGI: 3, REA: 3, STR: 3, WIL: 3, LOG: 3, INT: 3, CHA: 3, MAGIC: 0, ESSENCE: 3 },
        edge: { current: 0, max: 7 },
        minorActions: { current: 1, max: 3 },
        physical: 0,
        stun: 0
      });
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    if (isLoaded && char) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(char));
    }
  }, [char, isLoaded]);

  const update = (fn: (draft: any) => void) => {
    setChar(prev => {
      if (!prev) return prev;
      const draft = { ...prev };
      fn(draft);
      return draft;
    });
  };

  const resetCharacter = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  if (!char) return { char: null, update, resetCharacter };

  return { char, update, resetCharacter };
}