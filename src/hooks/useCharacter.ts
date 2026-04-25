import { useState, useEffect } from "react";
import type { Character } from "../types/types";
import { defaultCharacter } from "../data/characterDefaults";

const STORAGE_KEY = "sr6-character";

export function useCharacter() {
  // Chargement initial
  const load = (): Character => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      console.warn("Erreur JSON, reset");
    }
    return defaultCharacter;
  };

  const [char, setChar] = useState<Character>(load);

  // Fonction générique de mise à jour
  const update = (key: keyof Character, value: any) => {
    setChar(prev => {
      const updated = { ...prev, [key]: value };

      // --- Recalcul des moniteurs SR6 ---
      const physicalMax = Math.ceil(updated.body / 2) + 8;
      const stunMax = Math.ceil(updated.willpower / 2) + 8;

      // Clamp automatique si Body change
      if (key === "body") {
        updated.physical = Math.min(updated.physical, physicalMax);
      }

      // Clamp automatique si Willpower change
      if (key === "willpower") {
        updated.stun = Math.min(updated.stun, stunMax);
      }

      // --- Clamp Edge ---
      updated.edgeCurrent = Math.max(
        0,
        Math.min(updated.edgeCurrent, updated.edgeMax)
      );

      // --- Clamp Minor Actions ---
      updated.minor = Math.max(0, updated.minor);

      return updated;
    });
  };

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(char));
  }, [char]);

  return { char, update };
}
