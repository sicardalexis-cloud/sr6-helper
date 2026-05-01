// src/data/statuses.ts

export interface StatusEffect {
  id: string;
  name: string;
  frenchName?: string;
  color: string;
  description?: string;
  shortDesc?: string;
}

export const ALL_STATUSES: StatusEffect[] = [
  {
    id: "blinded",
    name: "Blinded",
    frenchName: "Aveuglé",
    color: "#a5b4fc",
    description: "The character cannot see. They suffer a -4 dice pool penalty to all actions that require vision.",
  },
  {
    id: "burning",
    name: "Burning",
    frenchName: "En feu",
    color: "#ef4444",
    description: "The character is on fire and takes damage each combat round until the fire is extinguished.",
  },
  {
    id: "chilled",
    name: "Chilled",
    frenchName: "Frigorifié",
    color: "#22d3ee",
    description: "Movement is reduced and the character suffers penalties to physical actions.",
  },
  {
    id: "confused",
    name: "Confused",
    frenchName: "Confus",
    color: "#c084fc",
    description: "The character has difficulty thinking clearly and suffers a penalty to all actions.",
  },
  {
    id: "corrosive",
    name: "Corrosive",
    frenchName: "Corrosif",
    color: "#eab308",
    description: "The target takes ongoing damage from acid or corrosive substances.",
  },
  {
    id: "cover",
    name: "Cover",
    frenchName: "Couvert",
    color: "#64748b",
    description: "The character benefits from cover, gaining a positive dice pool modifier to defense tests.",
  },
  {
    id: "dazed",
    name: "Dazed",
    frenchName: "Étourdi",
    color: "#f59e0b",
    description: "The character is stunned and suffers penalties to actions.",
  },
  {
    id: "deafened",
    name: "Deafened",
    frenchName: "Assourdi",
    color: "#94a3b8",
    description: "The character cannot hear well and suffers penalties to Perception and certain social tests.",
  },
  {
    id: "fatigued",
    name: "Fatigued",
    frenchName: "Fatigué",
    color: "#f59e0b",
    description: "The character is exhausted and suffers increasing penalties.",
  },
  {
    id: "frightened",
    name: "Frightened",
    frenchName: "Effrayé",
    color: "#ec4899",
    description: "The character is terrified and may flee or suffer major penalties.",
  },
  {
    id: "hazed",
    name: "Hazed",
    frenchName: "Dans le brouillard",
    color: "#8b5cf6",
    description: "Vision is impaired by smoke, mist, or magical haze.",
  },
  {
    id: "hobbled",
    name: "Hobbled",
    frenchName: "Boiteux",
    color: "#64748b",
    description: "Movement speed is reduced.",
  },
  {
    id: "immobilized",
    name: "Immobilized",
    frenchName: "Immobilisé",
    color: "#64748b",
    description: "The character cannot move from their current position.",
  },
  {
    id: "invisible",
    name: "Invisible",
    frenchName: "Invisible",
    color: "#67e8f9",
    description: "The character cannot be seen by normal means.",
  },
  {
    id: "invisible-improved",
    name: "Invisible (Improved)",
    frenchName: "Invisible (Amélioré)",
    color: "#22d3ee",
    description: "Advanced invisibility that is harder to detect even with magical senses.",
  },
  {
    id: "nauseated",
    name: "Nauseated",
    frenchName: "Naussé",
    color: "#ec4899",
    description: "The character is sick and suffers major action penalties.",
  },
  {
    id: "panicked",
    name: "Panicked",
    frenchName: "Paniqué",
    color: "#f43f5e",
    description: "The character is in full panic and acts irrationally.",
  },
  {
    id: "petrified",
    name: "Petrified",
    frenchName: "Pétrifié",
    color: "#64748b",
    description: "The character is turned to stone or completely paralyzed.",
  },
  {
    id: "poisoned",
    name: "Poisoned",
    frenchName: "Empoisonné",
    color: "#22c55e",
    description: "The character suffers ongoing poison damage.",
  },
  {
    id: "prone",
    name: "Prone",
    frenchName: "À terre",
    color: "#f59e0b",
    description: "The character is lying on the ground. Good for cover, bad for movement.",
  },
  {
    id: "silent",
    name: "Silent",
    frenchName: "Silencieux",
    color: "#64748b",
    description: "The character makes no sound.",
  },
  {
    id: "silent-improved",
    name: "Silent (Improved)",
    frenchName: "Silencieux (Amélioré)",
    color: "#94a3b8",
    description: "Advanced silence effect.",
  },
  {
    id: "stilled",
    name: "Stilled",
    frenchName: "Paralysé",
    color: "#64748b",
    description: "The character cannot speak or make noise.",
  },
  {
    id: "wet",
    name: "Wet",
    frenchName: "Mouillé",
    color: "#3b82f6",
    description: "The character is soaked, which may affect electricity resistance or other effects.",
  },
  {
    id: "zapped",
    name: "Zapped",
    frenchName: "Électrocuté",
    color: "#a5b4fc",
    description: "The character has been hit by electricity and suffers ongoing effects.",
  },
];

export default ALL_STATUSES;