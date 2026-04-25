import { useState } from 'react';
import { Character } from '../types';

export const useCharacter = () => {
  const [char, setChar] = useState<Character>({
    name: "KAGE",
    role: "STREET SAMURAI",
    bod: 3, agi: 3, rea: 3, str: 3,
    wil: 3, log: 3, int: 3, cha: 3, mag: 0,
    essence: 3,
    edge: 7,
    edgeCurrent: 4,
    physical: 3,
    stun: 2,
    drainStun: 0,
    minorActions: 1,
    minorActionSlots: 3,
  });

  const update = (key: keyof Character, value: number) => {
    setChar(p => ({ ...p, [key]: value }));
  };

  const addDrain = (amount: number) => {
    setChar(p => ({
      ...p,
      drainStun: Math.min(10, p.drainStun + amount)
    }));
  };

  return { char, update, addDrain };
};