import { useState, useEffect } from "react";
import { Character } from "../types/types";

const STORAGE_KEY = "sr6-character";

export function useCharacter() {
  const load = (): Character => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      console.warn("Erreur JSON, reset");
    }

    return {
      name: "KAGE",
      physical: 3,
      stun: 0,
    };
  };

  const [char, setChar] = useState<Character>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(char));
  }, [char]);

  const update = (key: keyof Character, value: number) => {
    setChar(prev => ({ ...prev, [key]: value }));
  };

  return { char, update };
}
