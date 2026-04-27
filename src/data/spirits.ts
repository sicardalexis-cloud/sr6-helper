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
}

export interface SpiritStats {
  attributes: Record<string, string>;
  defenseRating: string;
  movement: string;
  initiativePhysical: string;
  initiativeAstral: string;
  skills: string[];                    // ← Mis à jour
  powers: string[];
  optionalPowers: string[];
  attacks: SpiritAttack[];
}

export const SPIRIT_STATS: Record<SpiritType, SpiritStats> = {
  air: {
    attributes: { BOD: 'F-2', AGI: 'F+3', REA: 'F+4', STR: 'F-3', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+1',
    movement: '5/10/+5',
    initiativePhysical: 'F+8 + 2D6',
    initiativeAstral: 'F+8 + 3D6',
    skills: ['Astral', 'Athletics', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    powers: ['Accident', 'Astral Form', 'Concealment', 'Confusion', 'Engulf (Air)', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Elemental Attack (Cold or Electricity)', 'Energy Aura (Cold or Electricity)', 'Fear', 'Guard', 'Noxious Breath', 'Psychokinesis'],
    attacks: [
      { name: "Elemental Attack", dv: "{F}P", ar: "{F*2}/{F*2-2}/{F*2-8}/{F*2-10}/-" },
      { name: "Engulf (Air)", dv: "{F+2}S + Fatigue I", ar: "{F*2 + 1}/-/-/-/-" }
    ]
  },

  beast: {
    attributes: { BOD: 'F+2', AGI: 'F+1', REA: 'F', STR: 'F+2', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+2',
    movement: '5/10/+3',
    initiativePhysical: 'F+8 + 2D6',
    initiativeAstral: 'F+8 + 3D6',
    skills: ['Astral', 'Close Combat', 'Perception'],
    powers: ['Animal Control', 'Astral Form', 'Enhanced Senses (Hearing, Low-Light Vision, Smell)', 'Fear', 'Materialization', 'Movement', 'Sapience'],
    optionalPowers: ['Concealment', 'Confusion', 'Guard', 'Natural Weapon', 'Noxious Breath', 'Search', 'Venom'],
    attacks: [
      { name: "Claw/Bite", dv: "{F/2}P", ar: "{F*2}/-/-/-/-" }
    ]
  },

  man: {
    attributes: { BOD: 'F+1', AGI: 'F', REA: 'F+2', STR: 'F-2', WIL: 'F', LOG: 'F', INT: 'F+1', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+1',
    movement: '5/10/+1',
    initiativePhysical: 'F+8 + 2D6',
    initiativeAstral: 'F+8 + 3D6',
    skills: ['Astral', 'Close Combat', 'Perception', 'Sorcery'],
    powers: ['Accident', 'Astral Form', 'Concealment', 'Confusion', 'Enhanced Senses (Low-Light Vision, Thermographic Vision)', 'Guard', 'Influence', 'Materialization', 'Sapience', 'Search'],
    optionalPowers: ['Fear', 'Innate Spell (any one spell known by the summoner)', 'Movement', 'Psychokinesis'],
    attacks: [
      { name: "Fists", dv: "{F/2}S", ar: "{F*2}/-/-/-/-" }
    ]
  },

  earth: {
    attributes: { BOD: 'F+4', AGI: 'F-2', REA: 'F-1', STR: 'F+4', WIL: 'F', LOG: 'F-1', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+4',
    movement: '5/10/+1',
    initiativePhysical: 'F+8 + 2D6',
    initiativeAstral: 'F+8 + 3D6',
    skills: ['Astral', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    powers: ['Astral Form', 'Binding', 'Guard', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Concealment', 'Confusion', 'Elemental Attack (Chemical)', 'Engulf (Earth)', 'Fear'],
    attacks: [
      { name: "Elemental Attack (Earth)", dv: "{F}P", ar: "{F*2}/{F*2-2}/{F*2-8}/{F*2-10}/-" }
    ]
  },

  fire: {
    attributes: { BOD: 'F+1', AGI: 'F+2', REA: 'F+3', STR: 'F-2', WIL: 'F', LOG: 'F', INT: 'F+1', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+1',
    movement: '5/10/+5',
    initiativePhysical: 'F+8 + 2D6',
    initiativeAstral: 'F+8 + 3D6',
    skills: ['Astral', 'Athletics', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    powers: ['Accident', 'Astral Form', 'Confusion', 'Elemental Attack (Fire)', 'Energy Aura (Fire)', 'Engulf (Fire)', 'Materialization', 'Sapience'],
    optionalPowers: ['Fear', 'Guard', 'Noxious Breath', 'Search'],
    attacks: [
      { name: "Elemental Attack (Fire)", dv: "{F}P", ar: "{F*2}/{F*2-2}/{F*2-8}/{F*2-10}/-" },
      { name: "Engulf (Fire)", dv: "{F+2}S + Fatigue I", ar: "{F*2 + 1}/-/-/-/-" }
    ]
  },

  water: {
    attributes: { BOD: 'F', AGI: 'F+1', REA: 'F+2', STR: 'F', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F',
    movement: '5/10/+2',
    initiativePhysical: 'F+8 + 2D6',
    initiativeAstral: 'F+8 + 3D6',
    skills: ['Astral', 'Athletics (Swimming)', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    powers: ['Astral Form', 'Concealment', 'Confusion', 'Engulf (Water)', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Accident', 'Binding', 'Elemental Attack (Cold)', 'Energy Aura (Cold)', 'Guard', 'Weather Control'],
    attacks: [
      { name: "Elemental Attack (Water)", dv: "{F}P", ar: "{F*2}/{F*2-2}/{F*2-8}/{F*2-10}/-" },
      { name: "Engulf (Water)", dv: "{F+2}S + Fatigue I", ar: "{F*2 + 1}/-/-/-/-" }
    ]
  },

  plant: {
    attributes: { BOD: 'F+2', AGI: 'F-1', REA: 'F', STR: 'F+1', WIL: 'F', LOG: 'F-1', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+2',
    movement: '10/15/+1',
    initiativePhysical: 'F+8 + 2D6',
    initiativeAstral: 'F+8 + 3D6',
    skills: ['Astral', 'Close Combat', 'Exotic Ranged Weapon', 'Perception', 'Spellcasting'],
    powers: ['Astral Form', 'Concealment', 'Engulf', 'Fear', 'Guard', 'Magical Guard', 'Materialization', 'Sapience', 'Silence'],
    optionalPowers: ['Accident', 'Confusion', 'Movement', 'Noxious Breath', 'Search'],
    attacks: [
      { name: "Engulf (Plant)", dv: "{F}P", ar: "{F*3}/-/-/-/-" }
    ]
  },

  guardian: {
    attributes: { BOD: 'F+1', AGI: 'F+2', REA: 'F+3', STR: 'F+2', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+1',
    movement: '10/15/+1',
    initiativePhysical: 'F+8 + 2D6',
    initiativeAstral: 'F+8 + 3D6',
    skills: ['Astral', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    powers: ['Astral Form', 'Fear', 'Guard', 'Magical Guard', 'Materialization', 'Movement', 'Sapience'],
    optionalPowers: ['Animal Control', 'Concealment', 'Elemental Attack', 'Natural Weapon', 'Psychokinesis', 'Skill Specialization'],
    attacks: [
      { name: "Natural Weapon", dv: "{F/2 + 1}P", ar: "{F*2}/-/-/-/-" }
    ]
  },

  guidance: {
    attributes: { BOD: 'F+3', AGI: 'F-1', REA: 'F+2', STR: 'F+1', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+3',
    movement: '10/15/+1',
    initiativePhysical: 'F+8 + 2D6',
    initiativeAstral: 'F+8 + 3D6',
    skills: ['Astral', 'Close Combat', 'Perception', 'Spellcasting'],
    powers: ['Astral Form', 'Confusion', 'Divining', 'Guard', 'Magical Guard', 'Materialization', 'Sapience', 'Shadow Cloak'],
    optionalPowers: ['Engulf', 'Enhanced Senses', 'Fear', 'Influence'],
    attacks: []
  },

  task: {
    attributes: { BOD: 'F', AGI: 'F', REA: 'F+2', STR: 'F+2', WIL: 'F', LOG: 'F', INT: 'F', CHA: 'F', MAG: 'F', ESS: 'F' },
    defenseRating: 'F+2',
    movement: '10/15/+1',
    initiativePhysical: 'F+8 + 2D6',
    initiativeAstral: 'F+8 + 3D6',
    skills: ['Astral', 'Close Combat', 'Perception'],
    powers: ['Accident', 'Astral Form', 'Binding', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Concealment', 'Enhanced Senses', 'Influence', 'Psychokinesis', 'Skill'],
    attacks: []
  },
};

export const POWER_DESCRIPTIONS: Record<string, string> = {
  "Astral Form": "Le esprit existe uniquement sur le plan astral. Il est invisible et intangible pour les êtres physiques normaux.",
  "Materialization": "L'esprit peut prendre forme physique dans le monde réel. Il devient visible et tangible.",
  "Accident": "L'esprit peut provoquer un accident mineur (chute, objet qui tombe, perte d'équilibre, etc.).",
  "Concealment": "L'esprit peut rendre une cible (ou lui-même) plus difficile à percevoir (+2 à la difficulté des tests de Perception).",
  "Confusion": "L'esprit embrouille l'esprit de la cible, réduisant sa capacité à agir efficacement.",
  "Engulf": "L'esprit enveloppe la cible dans son élément (feu, eau, air, terre...) et lui inflige des dégâts continus.",
  "Fear": "L'esprit inspire une peur intense à la cible, qui peut fuir ou être paralysée par la terreur.",
  "Guard": "L'esprit protège une cible contre les accidents, les chutes, les pièges ou les dangers environnementaux.",
  "Movement": "L'esprit peut augmenter ou diminuer considérablement la vitesse de déplacement d'une cible.",
  "Sapience": "L'esprit possède une intelligence humaine et peut raisonner, parler et prendre des décisions complexes.",
  "Search": "L'esprit peut localiser une personne, un objet ou un lieu avec une grande efficacité.",
  "Elemental Attack": "L'esprit projette une attaque élémentaire (feu, froid, électricité, etc.) qui inflige des dégâts physiques.",
  "Energy Aura": "L'esprit est entouré d'une aura élémentaire qui blesse quiconque le touche en mêlée.",
  "Noxious Breath": "L'esprit exhale un nuage toxique ou nauséabond qui affaiblit ou empoisonne ses ennemis.",
  "Psychokinesis": "L'esprit peut déplacer des objets à distance par la force de l'esprit.",
  "Natural Weapon": "L'esprit possède des armes naturelles (griffes, crocs...) qui infligent des dégâts physiques.",
  "Influence": "L'esprit peut influencer subtilement les émotions ou les décisions d'une cible.",
  "Binding": "L'esprit peut immobiliser ou entraver physiquement une cible.",
};

export default POWER_DESCRIPTIONS;