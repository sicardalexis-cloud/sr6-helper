import React, { createContext, useContext, ReactNode } from 'react';
import { useCharacter, SummonedSpirit } from '../hooks/useCharacter';  // ← important

interface CharacterContextType {
  char: any;
  update: any;
  addSpirit: any;
  updateSpirit: any;
  removeSpirit: any;
  applyDrain: any;
  advanceSolarPhase: any;
  resetCharacter: any;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const character = useCharacter();

  return (
    <CharacterContext.Provider value={character}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacterContext() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacterContext must be used within a CharacterProvider');
  }
  return context;
}

// Export du type pour que SpiritsModal puisse l'utiliser
export type { SummonedSpirit };