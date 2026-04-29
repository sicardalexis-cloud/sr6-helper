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
      { name: "Fists", dv: "2S", ar: "+1/-/-/-/-" },
      { name: "Elemental Attack", dv: "{F}P + chilled or zapped status if not soaked", ar: "0/-2/-8/-10/-" },
      { name: "Engulf (Air)", dv: "{F}S + Engulf", ar: "+1/-/-/-/-" }
    ],
    powers: ['Accident', 'Astral Form', 'Concealment', 'Confusion', 'Engulf (Air)', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Elemental Attack (Cold)', 'Elemental Attack (Electricity)', 'Energy Aura', 'Fear', 'Guard', 'Noxious Breath', 'Psychokinesis'],
  },

  beast: {
    attributes: { BOD: 2, AGI: 1, REA: 0, STR: 2, WIL: 0, LOG: 0, INT: 0, CHA: 0, MAG: 0, ESS: 0 },
    defenseRating: 3,
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Perception'],
    attacks: [{ name: "Claw/Bite", dv: "{F/2}P", ar: "+2/-/-/-/-" }],
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
    attacks: [{ name: "Fists", dv: "2S", ar: "0/-/-/-/-" }],
    powers: ['Accident', 'Astral Form', 'Concealment', 'Confusion', 'Enhanced Senses', 'Guard', 'Influence', 'Materialization', 'Sapience', 'Search'],
    optionalPowers: ['Fear', 'Innate Spell', 'Movement', 'Psychokinesis'],
  },

  earth: {
    attributes: { BOD: 4, AGI: -2, REA: -1, STR: 4, WIL: 0, LOG: -1, INT: 0, CHA: 0, MAG: 0, ESS: 0 },
    defenseRating: 4,
    cm: '(F / 2) + 8',
    movement: '10/15/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    attacks: [
      { name: "Fists", dv: "2S", ar: "+3/-/-/-/-" },
      { name: "Elemental Attack (Chemical)", dv: "{F}P+ corrosive status if not soaked", ar: "0/-2/-8/-10/-" },
      { name: "Engulf (Earth)", dv: "{F}S + Engulf", ar: "+3/-/-/-/-" }
    ],
    powers: ['Astral Form', 'Binding', 'Guard', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Concealment', 'Confusion', 'Elemental Attack (Chemical)', 'Engulf (Earth)', 'Fear'],
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
      { name: "Fists", dv: "2S", ar: "+1/-/-/-/-" },
      { name: "Elemental Attack (Fire)", dv: "{F}P + burning status if not soaked", ar: "0/-2/-8/-10/-" },
      { name: "Engulf (Fire)", dv: "{F}S + Burning + Engulf", ar: "+1/-/-/-/-" }
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
      { name: "Fists", dv: "2S", ar: "+2/-/-/-/-" },
      { name: "Elemental Attack (Cold)", dv: "{F}P+ chilled status if not soaked", ar: "0/-2/-8/-10/-" },
      { name: "Engulf (Water)", dv: "{F}S + Engulf", ar: "+2/-/-/-/-" }
    ],
    powers: ['Astral Form', 'Concealment', 'Confusion', 'Engulf (Water)', 'Materialization', 'Movement', 'Sapience', 'Search'],
    optionalPowers: ['Accident', 'Binding', 'Elemental Attack (Cold)', 'Energy Aura (Cold)', 'Guard', 'Weather Control'],
  },

  plant: {
    attributes: { BOD: 2, AGI: -1, REA: 0, STR: 1, WIL: 0, LOG: -1, INT: 0, CHA: 0, MAG: 0, ESS: 0 },
    defenseRating: 2,
    cm: '(F / 2) + 8',
    movement: '5/10/+1',
    initiativePhysical: { baseModifier: 2, dice: 2 },
    initiativeAstral: { baseModifier: 3, dice: 3 },
    skills: ['Astral', 'Close Combat', 'Exotic Ranged Weapon', 'Perception'],
    attacks: [{ name: "Engulf", dv: "{F}P", ar: "+3/-/-/-/-" }],
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
  "Astral Form": "The most common power of spirits. The spirit exists only on the astral plane. It is invisible and intangible on the physical plane unless it uses Materialization. It can perceive and interact with the astral plane normally.",

  "Materialization": "The spirit can take on a physical tangible form on the material plane. It gains a physical body with the normal physical attributes of its spirit type. It becomes visible and can physically interact with the material world.",

  "Sapience": "The spirit is intelligent and self-aware. It can reason, speak, understand languages, and make complex decisions. Without this power, the spirit acts on instinct.",

  "Accident": "The spirit can cause a minor accident within (Force × 2) meters. Examples: tripping someone, dropping an object, stalling a vehicle, etc. Opposed test: Spirit's Force vs. target's Reaction + Intuition.",

  "Concealment": "Concealment applies the Invisible (Improved) status equal to the critter’s Magic attribute. In combat, an Observe in Detail Major Action must be used to allow a Perception test to attempt to overcome the concealment. Success means the target is spotted by that character until the critter can hide again or the end of the character’s next player turn, whichever comes last. Concealment can be used simultaneously on a number of average metahuman-sized targets (Body up to 5; Body over 5 counts as 2 targets) equal to the critter’s Magic, or a number of much smaller targets equal to the critter’s Magic x 5. Concealed subjects can see each other if the critter allows it. The effect lasts until the critter stops sustaining the power.",

  "Confusion": "The spirit confuses the minds of targets within (Force × 2) meters. Targets suffer a penalty equal to the spirit's Force on all mental skill and Perception tests.",

  "Engulf": "If the attack hits (even if damage is resisted), the target is engulfed and becomes Immobilized. At the start of the critter's turn, the engulfed target automatically suffers damage.",

  "Engulf (Air)": "Air Engulf: if attack hit (even if resisted) the target is engulfed = the target is immobilized and at the start of the critter turn The target resists Stun damage with a DV equal to (Magic + 2). If the victim passes out from Stun damage, they continue to take damage, with the Stun damage overflowing into Physical damage as normal. Victims gain the Fatigued I status. Escape = Major action and Strength + Athletics vs Body + Magic.",

  "Engulf (Earth)": "Earth Engulf: if attack hit (even if resisted) the target is engulfed = the target is immobilized and at the start of the critter turn The target resists Physical damage with a DV equal to (Magic + 2). Victims gain the Fatigued I status. Escape = Major action and Strength + Athletics vs Body + Magic.",

  "Engulf (Fire)": "Fire Engulf: if attack hit (even if resisted) the target is engulfed = the target is immobilized and at the start of the critter turn The victim resists Physical damage with a DV equal to (Magic) and gains the Burning status for as long as they are engulfed + 1 combat round. Escape = Major action and Strength + Athletics vs Body + Magic.",

  "Engulf (Water)": "Water Engulf: if attack hit (even if resisted) the target is engulfed = the target is immobilized and at the start of the critter turn The victim resists Stun with a DV of (Magic + 2). This is rougher than normal drowning, because the critter is capable of exerting great pressure on the victim. Victims who pass out from Stun damage continue to take damage after falling unconscious, with the Stun damage overflowing into Physical damage as normal. The victim suffers the Wet and Fatigued I statuses. Escape = Major action and Strength + Athletics vs Body + Magic.",

"Elemental Attack (Cold)": "The target gains the Chilled status for 3 rounds if the damage is not fully soaked. Chilled: –4 to your Initiative Score and –1 to all dice pools besides Damage Resistance tests. This status cancels and is canceled by the Burning status.If the modified Damage Value of an attack exceeds the Armor of the target, the Defense boost from that piece of armor is permanently decreased by one after the attack is resolved.",

  "Elemental Attack (Electricity)": "The target gains the Zapped status for 2 rounds if the damage is not fully soaked. Zapped: -2 Initiative Score, the inability to take the Sprint Action, and a dice pool penalty of –1 on all actions.",

  "Elemental Attack (Fire)": "The target gains the Burning(P) status if the damage is not fully soaked. Burning: The target takes (P)P damage at the end of each of its Combat Rounds until the status ends or the fire is extinguished.There are multiple ways to remove this status.You can spend a Major Action and roll an Agility + Reaction (2) test; success means the fire is out and the status is removed. You can also jump into water to remove the status without a roll. If you gain the Wet and/or Chilled statuses, the Burning status is canceled. Similarly, gaining the Burning status cancels the Wet or Chilled status.",

  "Elemental Attack (Chemical)": "The target gains the Corrosive(P) status if the damage is not fully soaked. Corrosive: The target takes (P)P damage at the end of each of its Combat Rounds until the status ends . If the modified Damage Value of an attack exceeds the Armor of the target, the Defense boost from that piece of armor is permanently decreased by one after the attack is resolved.",

  "Energy Aura (Cold)": "The spirit is surrounded by a cold aura. Any target that touches or is touched by the spirit suffers Force Cold damage and gains the Chilled status.",

  "Energy Aura (Fire)": "The spirit is surrounded by a fire aura. Any target that touches or is touched by the spirit suffers Force Fire damage and gains the Burning status.",

  "Elemental Attack": "Whether it’s a burst of flame, a spear of ice, a bolt of lightning, or a glob of caustic chemicals, a critter with this power can project a damaging bolt of elemental energy. The power is selected with a specific element type: Electricity, Fire, Chemical, or Cold. Make a ranged combat attack using the critter’s Magic + Agility. DV = (Magic)P. The target gains the appropriate Status Effect only if the damage is not fully soaked.",

  "Energy Aura": "The spirit is surrounded by an elemental aura. Any target that touches or is touched by the spirit suffers Force elemental damage.",

  "Fear": "M Major LOS Special\nThis power allows a critter to fill its victim with overwhelming terror. The victim flees in panic and doesn’t stop until they are safely away and out of the critter’s sight, at which point they gain both the Panicked and Frightened statuses. The critter makes an Opposed test using its Willpower + Magic against the target’s Willpower + Logic. The terror lasts for 1 combat round per net hit scored by the critter, while the status lasts double that number of combat rounds. Even once the fear fades, the target must succeed in a Willpower + Logic (Critter’s Magic/2) test to gather the nerve to face the critter again.",

  "Guard": "The spirit protects a target from accidents and clumsiness. The target gains a bonus equal to the spirit's Force on all Reaction and Intuition tests to avoid accidents.",

  "Influence": "The spirit can influence the emotions and desires of a target. It can suggest a simple emotion or desire.",

  "Innate Spell": "The spirit knows one spell (chosen by the summoner at the time of summoning). It can cast this spell as a magician using its Force as the spell rating.",

  "Magical Guard": "The spirit can protect a target against magic. It adds its Force to the target's magic resistance tests.",

  "Movement": "The spirit can increase or decrease a target's movement speed by ± (Force × 2) meters per turn.",

  "Natural Weapon": "The spirit has natural weapons (claws, fangs, etc.). DV = (Force / 2 + 1) P, AR = (Force × 2) / - / - / - / -",

  "Noxious Breath": "The spirit exhales a toxic gas. Opposed test: Spirit's Force vs. Constitution + Willpower. The target suffers Stun damage and a penalty.",

  "Psychokinesis": "The spirit can move objects at a distance with physical strength equal to its Force.",

  "Search": "The spirit can locate a known object or person. It performs a Search test with a number of dice equal to its Force.",

  "Shadow Cloak": "The spirit can blend into shadows, becoming extremely difficult to detect in darkness.",

  "Silence": "The spirit can create a zone of total silence within a radius of Force × 2 meters.",

  "Skill": "The spirit possesses a specialized skill (Biotech, Electronics, Engineering, etc.).",
  "Skill Specialization": "The spirit possesses a specialized skill (Biotech, Electronics, Engineering, etc.).",

  "Venom": "The spirit injects a powerful venom during a close combat attack.",

  "Weather Control": "The spirit can alter weather conditions in a large area.",

  "Divining": "The spirit can read the future or obtain visions (rare power of Guidance spirits).",

  "Binding": "The spirit can physically bind a target (power of Earth and Water spirits).",

  "Enhanced Senses": "The spirit has enhanced senses (low-light vision, smell, hearing, thermographic, etc.).",

  "Animal Control": "The spirit can control animals (power of Beast and Guardian spirits).",
};

export default POWER_DESCRIPTIONS;