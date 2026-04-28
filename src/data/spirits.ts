// src/data/spirits.ts
export type SpiritType =
  | 'air' | 'water' | 'fire' | 'earth' | 'man' | 'beast' | 'plant' | 'guardian' | 'guidance' | 'task';

export interface SpiritConfig {
  type: SpiritType;
  label: string;
  emoji: string;
  color: string;
}

export const SPIRIT_TYPES: SpiritConfig[] = [
  { type: 'air', label: 'Air', emoji: '💨', color: '#67E8F9' },
  { type: 'water', label: 'Water', emoji: '🌊', color: '#3B82F6' },
  { type: 'fire', label: 'Fire', emoji: '🔥', color: '#EF4444' },
  { type: 'earth', label: 'Earth', emoji: '🏔️', color: '#A16207' },
  { type: 'man', label: 'Man', emoji: '👤', color: '#A78BFA' },
  { type: 'beast', label: 'Beasts', emoji: '🐺', color: '#22C55E' },
  { type: 'plant', label: 'Plant', emoji: '🌿', color: '#4ADE80' },
  { type: 'guardian', label: 'Guardian', emoji: '🛡️', color: '#F59E0B' },
  { type: 'guidance', label: 'Guidance', emoji: '🔮', color: '#C084FC' },
  { type: 'task', label: 'Task', emoji: '⚙️', color: '#94A3B8' },
];

export interface SpiritAttack {
  name: string;
  dv: string;
  ar: string;
  special?: string;
}

export interface SpiritStats {
  attributes: Record<string, number>;
  defenseRating: number;
  cm: string;
  movement: string;
  initiativePhysical: { baseModifier: number; dice: number };
  initiativeAstral: { baseModifier: number; dice: number };
  skills: string[];
  attacks: SpiritAttack[];
  powers: string[];
  optionalPowers: string[];
}

export const SPIRIT_STATS: Record<SpiritType, SpiritStats> = {
  air: {
    attributes: { BOD: -2, AGI: 3, REA: 4, STR: -3, WIL: 0, LOG: 0, INT: 0, CHA: 0, MAG: 0, ESS: 0 },
    defenseRating: 3,
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Athletics', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    attacks: [
      { name: "Elemental Attack", dv: "{F}P", ar: "0/-2/-8/-10/-" },
      { name: "Engulf (Air)", dv: "{F+2}S + Fatigue I", ar: "0/+1/-/-/-/-" }
    ],
    powers: ['Accident', 'Astral Form', 'Concealment', 'Confusion', 'Engulf (Air)', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Elemental Attack', 'Energy Aura', 'Fear', 'Guard', 'Noxious Breath', 'Psychokinesis'],
  },

  beast: {
    attributes: { BOD: 2, AGI: 1, REA: 0, STR: 2, WIL: 0, LOG: 0, INT: 0, CHA: 0, MAG: 0, ESS: 0 },
    defenseRating: 3,
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception'],
    attacks: [{ name: "Claw/Bite", dv: "{F/2}P", ar: "0/-/-/-/-" }],
    powers: ['Animal Control', 'Astral Form', 'Enhanced Senses', 'Fear', 'Materialization', 'Movement', 'Sapience'],
    optionalPowers: ['Concealment', 'Confusion', 'Guard', 'Natural Weapon', 'Noxious Breath', 'Search', 'Venom'],
  },

  man: {
    attributes: { BOD: 1, AGI: 0, REA: 2, STR: -2, WIL: 0, LOG: 0, INT: 1, CHA: 0, MAG: 0, ESS: 0 },
    defenseRating: 2,
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception', 'Sorcery'],
    attacks: [{ name: "Fists", dv: "{F/2}S", ar: "0/-/-/-/-" }],
    powers: ['Accident', 'Astral Form', 'Concealment', 'Confusion', 'Enhanced Senses', 'Guard', 'Influence', 'Materialization', 'Sapience', 'Search'],
    optionalPowers: ['Fear', 'Innate Spell', 'Movement', 'Psychokinesis'],
  },

  earth: {
    attributes: { BOD: 4, AGI: -2, REA: -1, STR: 4, WIL: -1, LOG: 0, INT: 0, CHA: 0, MAG: 0, ESS: 0 },
    defenseRating: 4,
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    attacks: [{ name: "Elemental Attack (Chemical)", dv: "{F}P", ar: "0/-2/-8/-10/-" }],
    powers: ['Astral Form', 'Binding', 'Guard', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Concealment', 'Confusion', 'Elemental Attack', 'Engulf (Earth)', 'Fear'],
  },

  fire: {
    attributes: { BOD: 1, AGI: 2, REA: 3, STR: -2, WIL: 0, LOG: 0, INT: 1, CHA: 0, MAG: 0, ESS: 0 },
    defenseRating: 2,
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Athletics', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    attacks: [
      { name: "Elemental Attack (Fire)", dv: "{F}P", ar: "0/-2/-8/-10/-" },
      { name: "Engulf (Fire)", dv: "{F+2}S + Fatigue I", ar: "0/+1/-/-/-/-" }
    ],
    powers: ['Accident', 'Astral Form', 'Confusion', 'Elemental Attack (Fire)', 'Energy Aura (Fire)', 'Engulf (Fire)', 'Materialization', 'Sapience'],
    optionalPowers: ['Fear', 'Guard', 'Noxious Breath', 'Search'],
  },

  water: {
    attributes: { BOD: 0, AGI: 1, REA: 2, STR: 0, WIL: 0, LOG: 0, INT: 0, CHA: 0, MAG: 0, ESS: 0 },
    defenseRating: 2,
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Athletics (Swimming)', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    attacks: [
      { name: "Elemental Attack (Cold)", dv: "{F}P", ar: "0/-2/-8/-10/-" },
      { name: "Engulf (Water)", dv: "{F+2}S + Fatigue I", ar: "0/+1/-/-/-/-" }
    ],
    powers: ['Astral Form', 'Concealment', 'Confusion', 'Engulf (Water)', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Accident', 'Binding', 'Elemental Attack', 'Energy Aura', 'Guard', 'Weather Control'],
  },

  plant: {
    attributes: { BOD: 2, AGI: -1, REA: 0, STR: 1, WIL: 0, LOG: -1, INT: 0, CHA: 0, MAG: 0, ESS: 0 },
    defenseRating: 2,
    cm: '(F / 2) + 8',
    movement: '5/10/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    attacks: [{ name: "Engulf", dv: "{F}P", ar: "0/*3/-/-/-/-" }],
    powers: ['Astral Form', 'Concealment', 'Engulf', 'Fear', 'Guard', 'Magical Guard', 'Materialization', 'Sapience', 'Silence'],
    optionalPowers: ['Accident', 'Confusion', 'Movement', 'Noxious Breath', 'Search'],
  },

  guardian: {
    attributes: { BOD: 1, AGI: 2, REA: 3, STR: 2, WIL: 0, LOG: 0, INT: 0, CHA: 0, MAG: 0, ESS: 0 },
    defenseRating: 4,
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    attacks: [{ name: "Natural Weapon", dv: "{F/2 + 1}P", ar: "0/-/-/-/-" }],
    powers: ['Astral Form', 'Fear', 'Guard', 'Magical Guard', 'Materialization', 'Movement', 'Sapience'],
    optionalPowers: ['Animal Control', 'Concealment', 'Elemental Attack', 'Natural Weapon', 'Psychokinesis', 'Skill Specialization'],
  },

  guidance: {
    attributes: { BOD: 3, AGI: -1, REA: 2, STR: 1, WIL: 0, LOG: 0, INT: 0, CHA: 0, MAG: 0, ESS: 0 },
    defenseRating: 3,
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception', 'Spellcasting'],
    attacks: [],
    powers: ['Astral Form', 'Confusion', 'Divining', 'Guard', 'Magical Guard', 'Materialization', 'Sapience', 'Shadow Cloak'],
    optionalPowers: ['Engulf', 'Enhanced Senses', 'Fear', 'Influence'],
  },

  task: {
    attributes: { BOD: 0, AGI: 0, REA: 2, STR: 2, WIL: 0, LOG: 0, INT: 0, CHA: 0, MAG: 0, ESS: 0 },
    defenseRating: 2,
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception'],
    attacks: [],
    powers: ['Accident', 'Astral Form', 'Binding', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Concealment', 'Enhanced Senses', 'Influence', 'Psychokinesis', 'Skill'],
  },
};

export const POWER_DESCRIPTIONS: Record<string, string> = {};

export default POWER_DESCRIPTIONS;