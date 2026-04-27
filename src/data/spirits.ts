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
  { type: 'earth', label: 'Earth', emoji: '🪨', color: '#A16207' },
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
  defenseRating: string;        // Maintenant "F+X" ou "F-X"
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
    defenseRating: 'F-2',
    cm: '(F / 2) + 8',
    movement: '5/10/+5',
    initiativePhysical: { baseModifier: 4, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Athletics', 'Close Combat', 'Perception'],
    attacks: [{ name: 'Unarmed', dv: '2S', attackRatings: '(F×2)+1 / - / - / - / -' }],
    powers: ['Accident', 'Confusion', 'Concealment', 'Engulf (Air)', 'Astral Form', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Elemental Attack (Electricity or Cold)', 'Energy Aura', 'Guard', 'Fear', 'Psychokinesis', 'Noxious Breath', 'Weather Control'],
  },
  beast: {
    attributes: { BOD: 'F+2', AGI: 'F+1', REA: 'F', STR: 'F+2', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+2',
    cm: '(F / 2) + 8',
    movement: '5/10/+3',
    initiativePhysical: { baseModifier: 0, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception'],
    attacks: [{ name: 'Claws/Bite', dv: '3F', attackRatings: '(F×2)+2 / - / - / - / -' }],
    powers: ['Animal Control', 'Enhanced Senses', 'Fear', 'Movement', 'Natural Weapon', 'Astral Form', 'Materialization', 'Sapience'],
    optionalPowers: ['Confusion', 'Guard', 'Influence', 'Search', 'Venom', 'Concealment'],
  },
  earth: {
    attributes: { BOD: 'F+4', AGI: 'F-2', REA: 'F-1', STR: 'F+4', WIL: 'F', LOG: 'F-1', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+4',
    cm: '(F / 2) + 8',
    movement: '5/10/+1',
    initiativePhysical: { baseModifier: -1, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception'],
    attacks: [{ name: 'Unarmed', dv: '2S', attackRatings: '(F×2)+3 / - / - / - / -' }],
    powers: ['Binding', 'Engulf (Earth)', 'Movement', 'Petrification', 'Astral Form', 'Materialization', 'Sapience', 'Guard'],
    optionalPowers: ['Accident', 'Concealment', 'Elemental Attack (Chemical)', 'Fear', 'Search'],
  },
  fire: {
    attributes: { BOD: 'F+1', AGI: 'F+2', REA: 'F+3', STR: 'F-2', WIL: 'F', LOG: 'F', INT: 'F+1', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+1',
    cm: '(F / 2) + 8',
    movement: '5/10/+5',
    initiativePhysical: { baseModifier: 4, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Athletics', 'Close Combat', 'Perception'],
    attacks: [{ name: 'Unarmed', dv: '2S', attackRatings: '(F×2)+1 / - / - / - / -' }],
    powers: ['Accident', 'Elemental Attack (Fire)', 'Energy Aura (Fire)', 'Engulf (Fire)', 'Astral Form', 'Materialization', 'Sapience'],
    optionalPowers: ['Confusion', 'Fear', 'Guard', 'Noxious Breath', 'Search'],
  },
  water: {
    attributes: { BOD: 'F', AGI: 'F+1', REA: 'F+2', STR: 'F', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F',
    cm: '(F / 2) + 8',
    movement: '5/10/+2',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Athletics (Swimming +2)', 'Close Combat', 'Perception'],
    attacks: [{ name: 'Unarmed', dv: '2S', attackRatings: '(F×2)+2 / - / - / - / -' }],
    powers: ['Confusion', 'Concealment', 'Engulf (Water)', 'Movement', 'Astral Form', 'Materialization', 'Sapience'],
    optionalPowers: ['Accident', 'Adherence', 'Elemental Attack (Cold)', 'Energy Aura (Cold)', 'Weather Control', 'Guard'],
  },
  man: {
    attributes: { BOD: 'F+1', AGI: 'F', REA: 'F+2', STR: 'F-2', WIL: 'F', LOG: 'F', INT: 'F+1', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+1',
    cm: '(F / 2) + 8',
    movement: '5/10/+1',
    initiativePhysical: { baseModifier: 1, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception', 'Sorcery'],
    attacks: [{ name: 'Unarmed', dv: '2S', attackRatings: '(F×2) / - / - / - / -' }],
    powers: ['Concealment', 'Confusion', 'Enhanced Senses', 'Influence', 'Astral Form', 'Materialization', 'Sapience'],
    optionalPowers: ['Innate Spell', 'Movement', 'Fear', 'Psychokinesis', 'Search'],
  },
  plant: {
    attributes: { BOD: 'F+2', AGI: 'F-1', REA: 'F', STR: 'F+1', WIL: 'F', LOG: 'F-1', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+2',
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 0, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Exotic Ranged Weapon', 'Perception', 'Spellcasting'],
    attacks: [{ name: 'Engulf', dv: '(F)F', attackRatings: '(F×3) / - / - / - / -' }],
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
    skills: ['Astral', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    attacks: [{ name: 'Optional Natural Weapon', dv: '(F+2)F', attackRatings: '(F×2) / - / - / - / -' }],
    powers: ['Astral Form', 'Fear', 'Guard', 'Magical Guard', 'Materialization', 'Movement', 'Sapience'],
    optionalPowers: ['Animal Control', 'Concealment', 'Elemental Attack', 'Natural Weapon', 'Psychokinesis'],
  },
  guidance: {
    attributes: { BOD: 'F+3', AGI: 'F-1', REA: 'F+2', STR: 'F+1', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+3',
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception', 'Spellcasting'],
    attacks: [{ name: 'Unarmed', dv: '2S', attackRatings: '(F×2) / - / - / - / -' }],
    powers: ['Astral Form', 'Concealment', 'Confusion', 'Divining', 'Guard', 'Magical Guard', 'Materialization', 'Sapience', 'Search', 'Shadow Cloak'],
    optionalPowers: ['Enhanced Senses', 'Fear', 'Influence'],
  },
  task: {
    attributes: { BOD: 'F', AGI: 'F', REA: 'F+2', STR: 'F+2', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+2',
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception', 'One technical skill'],
    attacks: [{ name: 'Unarmed', dv: '(F)F', attackRatings: '(F×2)+2 / - / - / - / -' }],
    powers: ['Accident', 'Astral Form', 'Binding', 'Concealment', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Skill (any technical or physical skill)'],
  },
};

export const POWER_DESCRIPTIONS: Record<string, string> = {
  'Materialization': 'Permet à l’esprit de prendre forme physique.',
  'Astral Form': 'L’esprit existe uniquement sur le plan astral.',
};