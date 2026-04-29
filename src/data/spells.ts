// src/data/spells.ts
export interface Spell {
  id: string;
  name: string;
  frenchName: string;
  category: "Combat" | "Detection" | "Illusion" | "Manipulation" | "Health" | "Other";
  type: "Mana" | "Physical";
  drain: string;
  range: string;
  duration: string;
  page: number;
  description?: string;
}

export const ALL_SPELLS: Spell[] = [
  // ==================== A ====================
  { id: "agony", name: "Agony", frenchName: "Agonie", category: "Combat", type: "Mana", drain: "F", range: "LOS", duration: "Special", page: 13 },
  { id: "analyze-magic", name: "Analyze Magic", frenchName: "Analyse de la magie", category: "Detection", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 7 },
  { id: "analyze-truth", name: "Analyze Truth", frenchName: "Analyse de la véracité", category: "Detection", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 7 },
  { id: "analyze-object", name: "Analyze Object", frenchName: "Analyse d'objet", category: "Detection", type: "Mana", drain: "F", range: "Touch", duration: "Sustained", page: 7 },
  { id: "anaphylaxis", name: "Anaphylaxis", frenchName: "Anaphylaxie", category: "Health", type: "Physical", drain: "F+2", range: "LOS", duration: "Permanent", page: 10 },
  { id: "animate-stone", name: "Animate Stone", frenchName: "Animation de la pierre", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 17 },
  { id: "animate-wood", name: "Animate Wood", frenchName: "Animation du bois", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 16 },
  { id: "animate-metal", name: "Animate Metal", frenchName: "Animation du métal", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 16 },
  { id: "animate-plastic", name: "Animate Plastic", frenchName: "Animation du plastique", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 17 },
  { id: "anti-detect", name: "Anti-Detect", frenchName: "Anti-détecteurs", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 14 },
  { id: "antidote", name: "Antidote", frenchName: "Antidote", category: "Health", type: "Mana", drain: "F", range: "Touch", duration: "Permanent", page: 10 },
  { id: "armor", name: "Armor", frenchName: "Armure", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 17 },
  { id: "astral-armor", name: "Astral Armor", frenchName: "Armure astrale", category: "Manipulation", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 17 },
  { id: "vehicle-armor", name: "Vehicle Armor", frenchName: "Armure de véhicule", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 17 },
  { id: "elemental-armor", name: "Elemental Armor", frenchName: "Armure élémentaire", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 17 },
  { id: "attribute-boost", name: "Attribute Boost", frenchName: "Augmentation d'attribut", category: "Manipulation", type: "Physical", drain: "F", range: "Touch", duration: "Sustained", page: 10 },
  { id: "reflexes-boost", name: "Reflexes Boost", frenchName: "Augmentation de réflexes", category: "Manipulation", type: "Physical", drain: "F", range: "Touch", duration: "Sustained", page: 10 },

  // ==================== B ====================
  { id: "mana-barrier", name: "Mana Barrier", frenchName: "Barrière mana", category: "Manipulation", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 17 },
  { id: "physical-barrier", name: "Physical Barrier", frenchName: "Barrière physique", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 18 },
  { id: "boil-object", name: "Boil Object", frenchName: "Bouillie (objet)", category: "Manipulation", type: "Physical", drain: "F", range: "Touch", duration: "Permanent", page: 4 },
  { id: "camouflage", name: "Camouflage", frenchName: "Brouillage", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 14 },

  // ==================== C ====================
  { id: "catalog", name: "Catalog", frenchName: "Catalogue", category: "Detection", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 9 },
  { id: "charisma", name: "Charisma", frenchName: "Charabia", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 14 },
  { id: "catfall", name: "Catfall", frenchName: "Chute féline", category: "Manipulation", type: "Physical", drain: "F", range: "Self", duration: "Sustained", page: 18 },
  { id: "clairaudience", name: "Clairaudience", frenchName: "Clairaudience", category: "Detection", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 7 },
  { id: "clairvoyance", name: "Clairvoyance", frenchName: "Clairvoyance", category: "Detection", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 8 },
  { id: "glue", name: "Glue", frenchName: "Colle", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 18 },
  { id: "lokis-musical-comedy", name: "Loki's Musical Comedy", frenchName: "Comédie musicale de Loki", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 18 },
  { id: "confusion", name: "Confusion", frenchName: "Confusion", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 14 },
  { id: "superior-confusion", name: "Superior Confusion", frenchName: "Confusion supérieure", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 14 },
  { id: "control-actions", name: "Control Actions", frenchName: "Contrôle des actes", category: "Manipulation", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 18 },
  { id: "control-thoughts", name: "Control Thoughts", frenchName: "Contrôle des pensées", category: "Manipulation", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 19 },
  { id: "control-mob", name: "Control Mob", frenchName: "Contrôle des pensées des foules", category: "Manipulation", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 19 },

  // ==================== D ====================
  { id: "decomposition", name: "Decomposition", frenchName: "Décomposition", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Permanent", page: 10 },
  { id: "decor-phantasm", name: "Decor Phantasm", frenchName: "Décor fantôme", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 15 },
  { id: "deflagration", name: "Deflagration", frenchName: "Déflagration", category: "Combat", type: "Physical", drain: "F", range: "LOS", duration: "Instant", page: 6 },
  { id: "detox", name: "Detox", frenchName: "Dégagement", category: "Health", type: "Mana", drain: "F", range: "Touch", duration: "Permanent", page: 11 },
  { id: "detection-magic", name: "Detection of Magic", frenchName: "Détection de la magie", category: "Detection", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 8 },
  { id: "life-detection", name: "Life Detection", frenchName: "Détection de la vie", category: "Detection", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 8 },
  { id: "enemy-detection", name: "Enemy Detection", frenchName: "Détection des ennemis", category: "Detection", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 8 },
  { id: "diagnostic", name: "Diagnostic", frenchName: "Diagnostic", category: "Detection", type: "Mana", drain: "F", range: "Touch", duration: "Sustained", page: 11 },
  { id: "attribute-reduction", name: "Attribute Reduction", frenchName: "Diminution d'attribut", category: "Manipulation", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 11 },
  { id: "telekinetic-fingers", name: "Telekinetic Fingers", frenchName: "Doigts télékinésiques", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 19 },

  // ==================== E ====================
  { id: "overclock", name: "Overclock", frenchName: "Overclock", category: "Manipulation", type: "Physical", drain: "F", range: "Touch", duration: "Sustained", page: 21 },
  { id: "oxygenation", name: "Oxygenation", frenchName: "Oxygénation", category: "Health", type: "Mana", drain: "F", range: "Touch", duration: "Sustained", page: 12 },

  // ==================== F ====================
  { id: "phantasm", name: "Phantasm", frenchName: "Fantasme", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 15 },
  { id: "superior-phantasm", name: "Superior Phantasm", frenchName: "Fantasme supérieur", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 15 },
  { id: "false-impression", name: "False Impression", frenchName: "Fausse impression", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 15 },
  { id: "flamethrower", name: "Flamethrower", frenchName: "Foudre", category: "Combat", type: "Physical", drain: "F", range: "LOS", duration: "Instant", page: 5 },

  // ==================== I ====================
  { id: "invisibility", name: "Invisibility", frenchName: "Invisibilité", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 15 },
  { id: "superior-invisibility", name: "Superior Invisibility", frenchName: "Invisibilité supérieure", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 15 },

  // ==================== L ====================
  { id: "levitation", name: "Levitation", frenchName: "Lévitation", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 19 },
  { id: "light", name: "Light", frenchName: "Lumière", category: "Manipulation", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 20 },

  // ==================== M ====================
  { id: "makeup", name: "Makeup", frenchName: "Maquillage", category: "Illusion", type: "Mana", drain: "F", range: "Touch", duration: "Sustained", page: 20 },
  { id: "mask", name: "Mask", frenchName: "Masque", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 15 },
  { id: "superior-mask", name: "Superior Mask", frenchName: "Masque supérieur", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 15 },

  // ==================== N ====================
  { id: "napalm", name: "Napalm", frenchName: "Napalm", category: "Combat", type: "Physical", drain: "F", range: "LOS", duration: "Instant", page: 6 },
  { id: "nutrition", name: "Nutrition", frenchName: "Nutrition", category: "Health", type: "Mana", drain: "F", range: "Touch", duration: "Permanent", page: 12 },

  // ==================== O ====================
  { id: "overclock", name: "Overclock", frenchName: "Overclock", category: "Manipulation", type: "Physical", drain: "F", range: "Touch", duration: "Sustained", page: 21 },
  { id: "oxygenation", name: "Oxygenation", frenchName: "Oxygénation", category: "Health", type: "Mana", drain: "F", range: "Touch", duration: "Sustained", page: 12 },

  // ==================== P ====================
  { id: "projectile", name: "Projectile", frenchName: "Projectile", category: "Combat", type: "Physical", drain: "F", range: "LOS", duration: "Instant", page: 21 },
  { id: "radiant-tint", name: "Radiant Tint", frenchName: "Teint radieux", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 13 },

  // ==================== R ====================
  { id: "wall-reinforcement", name: "Wall Reinforcement", frenchName: "Renfort de mur", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 21 },
  { id: "gecko-grip", name: "Gecko Grip", frenchName: "Reptation du gecko", category: "Manipulation", type: "Physical", drain: "F", range: "Self", duration: "Sustained", page: 21 },
  { id: "rose-bush", name: "Rose Bush", frenchName: "Rosier", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 22 },

  // ==================== S ====================
  { id: "silence", name: "Silence", frenchName: "Silence", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 16 },
  { id: "superior-silence", name: "Superior Silence", frenchName: "Silence supérieur", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 16 },
  { id: "healing", name: "Healing", frenchName: "Soins", category: "Health", type: "Mana", drain: "F", range: "Touch", duration: "Permanent", page: 12 },
  { id: "stabilization", name: "Stabilization", frenchName: "Stabilisation", category: "Health", type: "Mana", drain: "F", range: "Touch", duration: "Permanent", page: 13 },
  { id: "treatment", name: "Treatment", frenchName: "Traitement", category: "Health", type: "Mana", drain: "F", range: "Touch", duration: "Permanent", page: 13 },
  { id: "transparency", name: "Transparency", frenchName: "Transparence", category: "Illusion", type: "Mana", drain: "F", range: "LOS", duration: "Sustained", page: 22 },
  { id: "vine", name: "Vine", frenchName: "Vigne", category: "Manipulation", type: "Physical", drain: "F", range: "LOS", duration: "Sustained", page: 22 },
];

export default ALL_SPELLS;