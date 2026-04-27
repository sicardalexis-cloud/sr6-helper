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
  attackRatings: string;
  special?: string;
}

export interface SpiritInitiative {
  baseModifier: number;
  dice: number;
}

export interface SpiritStats {
  attributes: Record<string, string>;
  defenseRating: string;
  cm: string;
  movement: string;
  initiativePhysical: SpiritInitiative;
  initiativeAstral: SpiritInitiative;
  skills: string[];
  attacks: SpiritAttack[];
  powers: string[];
  optionalPowers: string[];
}

export const SPIRIT_STATS: Record<SpiritType, SpiritStats> = {
  air: {
    attributes: { BOD: 'F-2', AGI: 'F+3', REA: 'F+4', STR: 'F-3', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+1',
    cm: '(F / 2) + 8',
    movement: '5/10/+5',
    initiativePhysical: { baseModifier: 4, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Athletics', 'Close Combat', 'Perception'],
    attacks: [],
    powers: ['Accident', 'Astral Form', 'Concealment', 'Confusion', 'Engulf (Air)', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Elemental Attack (Cold or Electricity)', 'Energy Aura (Cold or Electricity)', 'Fear', 'Guard', 'Noxious Breath', 'Psychokinesis'],
  },

  beast: {
    attributes: { BOD: 'F+2', AGI: 'F+1', REA: 'F', STR: 'F+2', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+2',
    cm: '(F / 2) + 8',
    movement: '5/10/+3',
    initiativePhysical: { baseModifier: 0, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception'],
    attacks: [],
    powers: ['Animal Control', 'Astral Form', 'Enhanced Senses (Hearing, Low-Light Vision, Smell)', 'Fear', 'Materialization', 'Movement', 'Sapience'],
    optionalPowers: ['Concealment', 'Confusion', 'Guard', 'Natural Weapon', 'Noxious Breath', 'Search', 'Venom'],
  },

  man: {
    attributes: { BOD: 'F+1', AGI: 'F', REA: 'F+2', STR: 'F-2', WIL: 'F', LOG: 'F', INT: 'F+1', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+1',
    cm: '(F / 2) + 8',
    movement: '5/10/+1',
    initiativePhysical: { baseModifier: 1, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception', 'Sorcery'],
    attacks: [],
    powers: ['Accident', 'Astral Form', 'Concealment', 'Confusion', 'Enhanced Senses (Low-Light Vision, Thermographic Vision)', 'Guard', 'Influence', 'Materialization', 'Sapience', 'Search'],
    optionalPowers: ['Fear', 'Innate Spell (any one spell known by the summoner)', 'Movement', 'Psychokinesis'],
  },

  earth: {
    attributes: { BOD: 'F+4', AGI: 'F-2', REA: 'F-1', STR: 'F+4', WIL: 'F', LOG: 'F-1', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+4',
    cm: '(F / 2) + 8',
    movement: '5/10/+1',
    initiativePhysical: { baseModifier: 0, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception'],
    attacks: [],
    powers: ['Astral Form', 'Binding', 'Guard', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Concealment', 'Confusion', 'Elemental Attack (Chemical)', 'Engulf (Earth)', 'Fear'],
  },

  fire: {
    attributes: { BOD: 'F+1', AGI: 'F+2', REA: 'F+3', STR: 'F-2', WIL: 'F', LOG: 'F', INT: 'F+1', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+1',
    cm: '(F / 2) + 8',
    movement: '5/10/+5',
    initiativePhysical: { baseModifier: 4, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Athletics', 'Close Combat', 'Perception'],
    attacks: [],
    powers: ['Accident', 'Astral Form', 'Confusion', 'Elemental Attack (Fire)', 'Energy Aura (Fire)', 'Engulf (Fire)', 'Materialization', 'Sapience'],
    optionalPowers: ['Fear', 'Guard', 'Noxious Breath', 'Search'],
  },

  water: {
    attributes: { BOD: 'F', AGI: 'F+1', REA: 'F+2', STR: 'F', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F',
    cm: '(F / 2) + 8',
    movement: '5/10/+2',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Athletics (Swimming +2)', 'Close Combat', 'Perception'],
    attacks: [],
    powers: ['Astral Form', 'Concealment', 'Confusion', 'Engulf (Water)', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Accident', 'Binding', 'Elemental Attack (Cold)', 'Energy Aura (Cold)', 'Guard', 'Weather Control'],
  },

  plant: {
    attributes: { BOD: 'F+2', AGI: 'F-1', REA: 'F', STR: 'F+1', WIL: 'F', LOG: 'F-1', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+2',
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 0, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception'],
    attacks: [],
    powers: ['Astral Form', 'Concealment', 'Engulf', 'Fear', 'Guard', 'Magical Guard', 'Materialization', 'Sapience', 'Silence'],
    optionalPowers: ['Accident', 'Confusion', 'Movement', 'Noxious Breath', 'Search'],
  },

  guardian: {
    attributes: { BOD: 'F+1', AGI: 'F+2', REA: 'F+3', STR: 'F+2', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+1',
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 3, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception'],
    attacks: [],
    powers: ['Astral Form', 'Fear', 'Guard', 'Magical Guard', 'Materialization', 'Movement', 'Sapience'],
    optionalPowers: ['Animal Control', 'Concealment', 'Elemental Attack (element chosen by conjurer at summoning)', 'Natural Weapon', 'Psychokinesis', 'Skill Specialization (any Close Combat skill)'],
  },

  guidance: {
    attributes: { BOD: 'F+3', AGI: 'F-1', REA: 'F+2', STR: 'F+1', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+3',
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception', 'Spellcasting'],
    attacks: [],
    powers: ['Astral Form', 'Confusion', 'Divining', 'Guard', 'Magical Guard', 'Materialization', 'Sapience', 'Shadow Cloak'],
    optionalPowers: ['Engulf', 'Enhanced Senses (Hearing, Low-Light Vision, Thermographic Vision, or Smell)', 'Fear', 'Influence'],
  },

  task: {
    attributes: { BOD: 'F', AGI: 'F', REA: 'F+2', STR: 'F+2', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+2',
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception'],
    attacks: [],
    powers: ['Accident', 'Astral Form', 'Binding', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Concealment', 'Enhanced Senses (Hearing, Low-Light Vision, Thermographic Vision, or Smell)', 'Influence', 'Psychokinesis', 'Skill'],
  },
};

export const POWER_DESCRIPTIONS: Record<string, string> = {
  // Tu peux laisser vide ou remplir progressivement
};

export default POWER_DESCRIPTIONS;