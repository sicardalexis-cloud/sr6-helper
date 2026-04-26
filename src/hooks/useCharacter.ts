import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kage-character';

interface Character {
  name: string;
  attributes: Record<string, number>;
  edge: { current: number; max: number };
  minorActions: { current: number; max: number };
  physical: number;
  stun: number;
}

export function useCharacter() {
  const [char, setChar] = useState<Character | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Chargement initial
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setChar(JSON.parse(saved));
      } catch (e) {
        console.error("Erreur localStorage");
        setDefaultCharacter();
      }
    } else {
      setDefaultCharacter();
    }
    setIsLoaded(true);
  }, []);

  const setDefaultCharacter = () => {
    setChar({
      name: "KAGE",
      attributes: { BOD: 3, AGI: 3, REA: 3, STR: 3, WIL: 3, LOG: 3, INT: 3, CHA: 3, MAGIC: 0, ESSENCE: 3 },
      edge: { current: 0, max: 7 },
      minorActions: { current: 1, max: 3 },
      physical: 0,
      stun: 0
    });
  };

  // Sauvegarde automatique
  useEffect(() => {
    if (isLoaded && char) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(char));
    }
  }, [char, isLoaded]);

  const update = (fn: (draft: Character) => void) => {
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

  if (!char) {
    return { char: null as any, update, resetCharacter };
  }

  return { char, update, resetCharacter };
}