import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kage-character';

export interface SummonedSpirit {
  id: string;
  element: string;
  force: number;
  servicesRemaining: number;
  conditionDamage: number;
  invocationDate: string;
  solarPhase: "Day" | "Night";
  solarTokens: number;
  optionalPowers: string[];
}

export interface Character {
  name: string;
  attributes: Record<string, number>;
  edge: { current: number; max: number };
  minorActions: { current: number; max: number };
  physical: number;
  stun: number;
  drainStun: number;
  activeSpirits: SummonedSpirit[];
}

const defaultCharacter: Character = {
  name: "KAGE",
  attributes: { BOD: 3, AGI: 3, REA: 3, STR: 3, WIL: 3, LOG: 3, INT: 3, CHA: 3, MAGIC: 6, ESSENCE: 6 },
  edge: { current: 7, max: 7 },
  minorActions: { current: 3, max: 3 },
  physical: 0,
  stun: 0,
  drainStun: 0,
  activeSpirits: [],
};

export function useCharacter() {
  const [char, setChar] = useState<Character>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultCharacter, ...parsed, activeSpirits: parsed.activeSpirits || [] };
      } catch (e) {
        console.error("Failed to load character", e);
      }
    }
    return defaultCharacter;
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

  // === Fonctions pour les esprits ===
  const addSpirit = (spiritData: Omit<SummonedSpirit, 'id'>) => {
    const newSpirit: SummonedSpirit = {
      ...spiritData,
      id: `spirit_${Date.now()}`,
      optionalPowers: [],
    };
    update(draft => {
      draft.activeSpirits.push(newSpirit);
    });
  };

  const updateSpirit = (id: string, updates: Partial<SummonedSpirit>) => {
    update(draft => {
      const index = draft.activeSpirits.findIndex(s => s.id === id);
      if (index !== -1) {
        draft.activeSpirits[index] = { ...draft.activeSpirits[index], ...updates };
      }
    });
  };

  const removeSpirit = (id: string) => {
    update(draft => {
      draft.activeSpirits = draft.activeSpirits.filter(s => s.id !== id);
    });
  };

  const applyDrain = (amount: number) => {
    if (amount <= 0) return;
    update((draft) => {
      draft.drainStun = (draft.drainStun || 0) + amount;
    });
  };

    const advanceSolarPhase = () => {
    update((draft) => {
      // Décrémente d'abord
      draft.activeSpirits.forEach((spirit) => {
        if (spirit.solarTokens > 0) {
          spirit.solarTokens -= 1;
        }
      });

      // Supprime ensuite ceux qui ont 0 token
      draft.activeSpirits = draft.activeSpirits.filter(s => s.solarTokens > 0);
    });
  };

  return {
    char,
    update,
    resetCharacter,
    addSpirit,
    updateSpirit,
    removeSpirit,
    applyDrain,
    advanceSolarPhase,
  };
}