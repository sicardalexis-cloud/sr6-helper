export interface SummonedSpirit {
  type: string;
  force: number;
  services: number;
  timestamp: string;
}

export interface Character {
  name: string;
  role: string;
  bod: number; agi: number; rea: number; str: number;
  wil: number; log: number; int: number; cha: number; mag: number;
  essence: number;
  edge: number;
  edgeCurrent: number;
  physical: number;
  stun: number;
  drainStun: number;
  minorActions: number;
  minorActionSlots: number;
}