export interface Character {
  name: string;

  // Attributs SR6
  body: number;
  agility: number;
  reaction: number;
  strength: number;
  willpower: number;
  logic: number;
  intuition: number;
  charisma: number;

  // Ajouts demandés
  magic: number;
  essence: number;

  // Edge Pool
  edgeCurrent: number;
  edgeMax: number;

  // Condition Monitors
  physical: number;
  stun: number;

  // Minor Actions
  minor: number;
}
