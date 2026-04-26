import { Character } from "../types/types";

export const defaultCharacter: Character = {
  name: "KAGE",

  // Attributs (noms attendus par le type)
  body: 3,
  agility: 3,
  reaction: 3,
  strength: 3,
  willpower: 3,
  logic: 3,
  intuition: 3,
  charisma: 3,
  magic: 0,
  essence: 3,

  // Edge
  edgeMax: 7,
  edgeCurrent: 0,

  // Minor Actions
  minor: 1,           // ou minorActions si le type l'attend

  // Moniteurs
  physical: 0,
  stun: 0
} as Character;