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
      { name: "Engulf (Air)", dv: "{F+2}S + Fatigue I", ar: "+1/-/-/-/-" }
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
      { name: "Engulf (Fire)", dv: "{F+2}S + Fatigue I", ar: "+1/-/-/-/-" }
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
      { name: "Engulf (Water)", dv: "{F+2}S + Fatigue I", ar: "+1/-/-/-/-" }
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
    attacks: [{ name: "Engulf", dv: "{F}P", ar: "*3/-/-/-/-" }],
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

export const POWER_DESCRIPTIONS: Record<string, string> = {
  // === Descriptions déjà existantes (gardées) ===
  "Astral Form": "Le pouvoir le plus courant des esprits. L'esprit existe uniquement sur le plan astral. Il est invisible et intangible sur le plan physique sauf s'il utilise Materialization. Il peut percevoir et interagir avec le plan astral normalement.",
  "Materialization": "L'esprit peut prendre une forme physique tangible sur le plan matériel. Il gagne un corps physique avec les attributs physiques normaux de son type d'esprit. Il devient visible et peut interagir physiquement avec le monde matériel.",
  "Sapience": "L'esprit est intelligent et conscient. Il peut raisonner, parler, comprendre les langues, et prendre des décisions complexes. Sans ce pouvoir, l'esprit agit de manière instinctive.",
  "Accident": "L'esprit peut provoquer un accident mineur dans un rayon de (Force × 2) mètres. Exemples : faire trébucher quelqu'un, faire tomber un objet, faire caler un véhicule, etc. Test opposé : Force de l'esprit vs Réaction + Intuition de la cible.",
  "Concealment": "L'esprit peut rendre une cible (ou lui-même) plus difficile à détecter. Il ajoute son Force aux tests de Perception pour détecter la cible cachée.",
  "Confusion": "L'esprit embrouille l'esprit des cibles dans un rayon de (Force × 2) mètres. Les cibles subissent un malus égal à la Force de l'esprit sur tous leurs tests de compétences mentales et de Perception.",
  "Engulf": "L'esprit enveloppe et étouffe une cible. Dégâts = (Force + 2) dégâts de type Stun (Air/Fire) ou Physique (Earth/Water). La cible est immobilisée.",
  "Engulf (Air)": "L'esprit enveloppe et étouffe une cible. Dégâts = (Force + 2)S + Fatigue I. La cible est immobilisée.",
  "Engulf (Fire)": "L'esprit enveloppe et étouffe une cible. Dégâts = (Force + 2)S + Fatigue I. La cible est immobilisée.",
  "Engulf (Water)": "L'esprit enveloppe et étouffe une cible. Dégâts = (Force + 2)S + Fatigue I. La cible est immobilisée.",
  "Engulf (Earth)": "L'esprit enveloppe et étouffe une cible. Dégâts = (Force + 2)P. La cible est immobilisée.",
  "Fear": "L'esprit inspire une peur intense. Les cibles doivent réussir un test de Volonté + Charisme (seuil = Force de l'esprit) ou fuir / se figer de terreur.",
  "Guard": "L'esprit protège une cible contre les accidents et les maladresses. La cible gagne un bonus égal à la Force de l'esprit sur tous ses tests de Réaction et d'Intuition pour éviter les accidents.",
  "Influence": "L'esprit peut influencer les émotions et les désirs d'une cible. Il peut suggérer une émotion ou une envie simple.",
  "Innate Spell": "L'esprit connaît un sort (choisi par le conjurateur au moment de l'invocation). Il peut lancer ce sort comme un magicien avec sa Force comme niveau de sort.",
  "Magical Guard": "L'esprit peut protéger une cible contre la magie. Il ajoute son Force aux tests de résistance à la magie de la cible.",
  "Movement": "L'esprit peut augmenter ou diminuer la vitesse de déplacement d'une cible de ± (Force × 2) mètres par tour.",
  "Natural Weapon": "L'esprit possède des armes naturelles (griffes, crocs, etc.). DV = (Force / 2 + 1) P, AR = (Force × 2) / - / - / - / -",
  "Noxious Breath": "L'esprit exhale un gaz toxique. Test opposé : Force de l'esprit vs Constitution + Volonté. La cible subit des dégâts de Stun et un malus.",
  "Psychokinesis": "L'esprit peut déplacer des objets à distance avec une force physique égale à sa Force.",
  "Search": "L'esprit peut localiser un objet ou une personne connue. Il effectue un test de Recherche avec un nombre de dés égal à sa Force.",
  "Shadow Cloak": "L'esprit peut se fondre dans les ombres, devenant extrêmement difficile à détecter dans l'obscurité.",
  "Silence": "L'esprit peut créer une zone de silence total dans un rayon de Force × 2 mètres.",
  "Skill": "L'esprit possède une compétence spécialisée (Biotech, Electronics, Engineering, etc.).",
  "Skill Specialization": "L'esprit possède une compétence spécialisée (Biotech, Electronics, Engineering, etc.).",
  "Venom": "L'esprit injecte un venin puissant lors d'une attaque au contact.",
  "Weather Control": "L'esprit peut modifier les conditions météorologiques dans une zone importante.",
  "Divining": "L'esprit peut lire l'avenir ou obtenir des visions (pouvoir rare des esprits Guidance).",
  "Binding": "L'esprit peut lier physiquement une cible (pouvoir des esprits de Terre et d'Eau).",
  "Enhanced Senses": "L'esprit possède des sens améliorés (vision nocturne, odorat, ouïe, thermographie, etc.).",
  "Animal Control": "L'esprit peut contrôler les animaux (pouvoir des esprits Bêtes et Guardians).",

  // === NOUVELLES DESCRIPTIONS DEMANDÉES ===
  "Elemental Attack": "Attaque à distance élémentaire. DV = Force P, AR = (Force × 2) / (Force × 2 - 2) / (Force × 2 - 8) / (Force × 2 - 10) / -",
  "Elemental Attack (Fire)": "Attaque à distance de type Feu. DV = Force P, AR = (Force × 2) / (Force × 2 - 2) / (Force × 2 - 8) / (Force × 2 - 10) / -",
  "Elemental Attack (Cold)": "Attaque à distance de type Froid. DV = Force P, AR = (Force × 2) / (Force × 2 - 2) / (Force × 2 - 8) / (Force × 2 - 10) / -",
  "Elemental Attack (Electricity)": "Attaque à distance de type Électricité. DV = Force P, AR = (Force × 2) / (Force × 2 - 2) / (Force × 2 - 8) / (Force × 2 - 10) / -",
  "Elemental Attack (Chemical)": "Attaque à distance de type Chimique. DV = Force P, AR = (Force × 2) / (Force × 2 - 2) / (Force × 2 - 8) / (Force × 2 - 10) / -",

  "Energy Aura": "L'esprit est entouré d'une aura élémentaire. Toute cible qui le touche ou qu'il touche subit (Force) dégâts élémentaires.",
  "Energy Aura (Fire)": "Aura de Feu. Toute cible qui touche l'esprit ou qu'il touche subit Force dégâts de Feu.",
  "Energy Aura (Cold)": "Aura de Froid. Toute cible qui touche l'esprit ou qu'il touche subit Force dégâts de Froid.",
  "Energy Aura (Electricity)": "Aura d'Électricité. Toute cible qui touche l'esprit ou qu'il touche subit Force dégâts d'Électricité.",
};

export default POWER_DESCRIPTIONS;