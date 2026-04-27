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
  fire: {
    attributes: { BOD: 'F+1', AGI: 'F+2', REA: 'F+2', STR: 'F+1', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F' },
    defenseRating: 'F+2',
    cm: '(F/2)+8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 4, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception', 'Spellcasting'],
    attacks: [{ name: 'Unarmed', dv: 'F', attackRatings: '(F×2)+1' }],
    powers: ['Astral Form', 'Materialization', 'Sapience', 'Elemental Attack (Fire)', 'Energy Aura (Fire)', 'Engulf (Fire)'],
    optionalPowers: ['Fear', 'Innate Spell', 'Enhanced Senses'],
  },

  air: {
    attributes: { BOD: 'F-2', AGI: 'F+3', REA: 'F+3', STR: 'F-2', WIL: 'F', LOG: 'F', INT: 'F+2', CHA: 'F', MAG: 'F' },
    defenseRating: 'F+1',
    cm: '(F/2)+8',
    movement: '15/25/+2',
    initiativePhysical: { baseModifier: 6, dice: 2 },
    initiativeAstral: { baseModifier: 0, dice: 3 },
    skills: ['Astral', 'Perception', 'Exotic Ranged Weapon'],
    attacks: [{ name: 'Unarmed', dv: 'F', attackRatings: '(F×2)+1' }],
    powers: ['Astral Form', 'Materialization', 'Sapience', 'Elemental Attack (Air)', 'Engulf (Air)'],
    optionalPowers: ['Concealment', 'Movement'],
  },

  // Autres esprits (à compléter progressivement)
  water: { /* identique à fire pour le moment */ attributes: {}, defenseRating: 'F', cm: '(F/2)+8', movement: '10/15/+1', initiativePhysical: { baseModifier: 2, dice: 2 }, initiativeAstral: { baseModifier: 0, dice: 3 }, skills: [], attacks: [], powers: [], optionalPowers: [] },
  earth: { /* ... */ attributes: {}, defenseRating: 'F', cm: '(F/2)+8', movement: '5/10/+1', initiativePhysical: { baseModifier: 0, dice: 2 }, initiativeAstral: { baseModifier: 0, dice: 3 }, skills: [], attacks: [], powers: [], optionalPowers: [] },
  man: { /* ... */ attributes: {}, defenseRating: 'F', cm: '(F/2)+8', movement: '10/15/+1', initiativePhysical: { baseModifier: 2, dice: 2 }, initiativeAstral: { baseModifier: 0, dice: 3 }, skills: [], attacks: [], powers: [], optionalPowers: [] },
  beast: { /* ... */ attributes: {}, defenseRating: 'F', cm: '(F/2)+8', movement: '15/25/+2', initiativePhysical: { baseModifier: 4, dice: 2 }, initiativeAstral: { baseModifier: 0, dice: 3 }, skills: [], attacks: [], powers: [], optionalPowers: [] },
  plant: { /* ... */ attributes: {}, defenseRating: 'F', cm: '(F/2)+8', movement: '5/10', initiativePhysical: { baseModifier: 0, dice: 2 }, initiativeAstral: { baseModifier: 0, dice: 3 }, skills: [], attacks: [], powers: [], optionalPowers: [] },
  guardian: { /* ... */ attributes: {}, defenseRating: 'F', cm: '(F/2)+8', movement: '10/15/+1', initiativePhysical: { baseModifier: 4, dice: 2 }, initiativeAstral: { baseModifier: 0, dice: 3 }, skills: [], attacks: [], powers: [], optionalPowers: [] },
  guidance: { /* ... */ attributes: {}, defenseRating: 'F', cm: '(F/2)+8', movement: '10/15/+1', initiativePhysical: { baseModifier: 2, dice: 2 }, initiativeAstral: { baseModifier: 0, dice: 3 }, skills: [], attacks: [], powers: [], optionalPowers: [] },
  task: { /* ... */ attributes: {}, defenseRating: 'F', cm: '(F/2)+8', movement: '10/15/+1', initiativePhysical: { baseModifier: 2, dice: 2 }, initiativeAstral: { baseModifier: 0, dice: 3 }, skills: [], attacks: [], powers: [], optionalPowers: [] },
};

export const POWER_DESCRIPTIONS: Record<string, string> = {
  'Accident': 'Causes seemingly ordinary accidents to occur. The exact nature is up to the gamemaster based on circumstances.',
  'Astral Form': 'Exists only on the astral plane. Can only be affected by astral attacks or mana spells/powers.',
  'Elemental Attack (Fire)': 'Projects a damaging bolt of fire energy. Causes Burning status on the target.',
  'Energy Aura (Fire)': 'Surrounded by a damaging fire aura. Adds Magic/2 (rounded up) to Close Combat DV. Causes Burning status.',
  'Engulf (Fire)': 'Envelops target in roaring flames. Close Combat attack, target gains Immobilized status. Inflicts P damage each round. Causes Burning status.',
  'Fear': 'Fills victim with overwhelming terror. The victim flees in panic.',
  'Innate Spell': 'Casts a single specific spell.',
  'Enhanced Senses': 'The spirit possesses heightened sensory capabilities.',
  'Materialization': 'Astral beings take shape in the physical world with a temporary body.',
  'Sapience': 'Self-aware, no longer driven by instinct. Can learn new skills.',
  // Ajoute d'autres descriptions ici au fur et à mesure
};

export default POWER_DESCRIPTIONS;