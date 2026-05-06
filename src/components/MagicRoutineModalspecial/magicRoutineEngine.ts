// src/components/MagicRoutineModal/magicRoutineEngine.ts

export interface RollResult {
  rolls: number[];
  hits: number;
}

export const rollDice = (pool: number): number[] => 
  Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);

export const countHits = (rolls: number[]): number => 
  rolls.filter(r => r >= 5).length;

export const processSummonStep = async (
  step: any,
  currentDrain: number,
  attributes: { WIL: number; TDA: number; BOD: number },
  maxDrainThreshold: number,
  maxAutoRests: number,
  autoRestsUsed: number,
  onRest: (rest: any) => void
) => {
  // Cette fonction sera développée plus tard avec la logique complète
  // Pour l'instant on garde la structure
  return {
    services: 0,
    drain: 0,
    attempts: 0,
    allAttempts: [],
    interruptedByDrain: false,
    interruptingAttempt: 0
  };
};