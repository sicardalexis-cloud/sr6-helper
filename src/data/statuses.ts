// src/data/statuses.ts

export interface StatusEffect {
  id: string;
  name: string;
  frenchName?: string;
  color: string;
  description?: string;
  shortDesc?: string;
  category?: "general" | "drug";   // ← Pour distinguer les drogues
}

export const ALL_STATUSES: StatusEffect[] = [
  // ==================== STATUTS GÉNÉRAUX ====================
  {
    id: "blinded",
    name: "Blinded",
    frenchName: "Aveuglé",
    color: "#a5b4fc",
    description: "Whether it’s flashing lights, some specialized chemical, or the pure force of magic, there are plenty of ways to make it impossible for shadowrunners to see...",
    category: "general"
  },
  {
    id: "burning",
    name: "Burning",
    frenchName: "En feu",
    color: "#ef4444",
    description: "The Burning status is the result of being hit with a flame-based attack...",
    category: "general"
  },
  {
    id: "chilled",
    name: "Chilled",
    frenchName: "Frigorifié",
    color: "#22d3ee",
    description: "When you are truly, damagingly cold...",
    category: "general"
  },
  {
    id: "confused",
    name: "Confused",
    frenchName: "Confus",
    color: "#c084fc",
    description: "Colors, patterns, and weird ideas swirl around your head...",
    category: "general"
  },
  {
    id: "corrosive",
    name: "Corrosive",
    frenchName: "Corrosif",
    color: "#eab308",
    description: "Acids, bases, and other caustics eat into your flesh...",
    category: "general"
  },
  {
    id: "dazed",
    name: "Dazed",
    frenchName: "Étourdi",
    color: "#f59e0b",
    description: "One too many thumps to the head...",
    category: "general"
  },
  {
    id: "deafened",
    name: "Deafened",
    frenchName: "Assourdi",
    color: "#94a3b8",
    description: "Whether you heard a sudden, hugely loud clap...",
    category: "general"
  },
  {
    id: "fatigued",
    name: "Fatigued",
    frenchName: "Fatigué",
    color: "#f59e0b",
    description: "At its top level, this status is that dreamlike weariness...",
    category: "general"
  },
  {
    id: "frightened",
    name: "Frightened",
    frenchName: "Effrayé",
    color: "#ec4899",
    description: "Something has hit your lizard brain...",
    category: "general"
  },
  {
    id: "hazed",
    name: "Hazed",
    frenchName: "Dans le brouillard",
    color: "#8b5cf6",
    description: "Something has messed up your connection to the astral world...",
    category: "general"
  },
  {
    id: "hobbled",
    name: "Hobbled",
    frenchName: "Boiteux",
    color: "#64748b",
    description: "Any movement on foot... is halved",
    category: "general"
  },
  {
    id: "immobilized",
    name: "Immobilized",
    frenchName: "Immobilisé",
    color: "#64748b",
    description: "Characters with this status cannot move...",
    category: "general"
  },
  {
    id: "invisible",
    name: "Invisible",
    frenchName: "Invisible",
    color: "#67e8f9",
    description: "The go-to status for sneak thieves...",
    category: "general"
  },
  {
    id: "nauseated",
    name: "Nauseated",
    frenchName: "Naussé",
    color: "#ec4899",
    description: "Your stomach heaves...",
    category: "general"
  },
  {
    id: "prone",
    name: "Prone",
    frenchName: "À terre",
    color: "#f59e0b",
    description: "One of the classics—you drop to the ground...",
    category: "general"
  },
  {
    id: "wet",
    name: "Wet",
    frenchName: "Mouillé",
    color: "#3b82f6",
    description: "Whether it’s a pouring rain... You take a –6 dice pool penalty...",
    category: "general"
  },

  // ==================== STATUTS LIÉS AUX DROGUES ====================
  {
    id: "alcohol",
    name: "Alcool",
    frenchName: "Alcool",
    color: "#eab308",
    description: "Allant du vin et de la bière jusqu’aux alcools purs et confections de différentes manières... Effet : Réaction -1, Logique -1, Endurance à la douleur.",
    category: "drug"
  },
  {
    id: "bliss",
    name: "Bliss",
    frenchName: "Bliss (Extase)",
    color: "#c084fc",
    description: "Narcotique tranquillisant, le bliss est un opiacé synthétisé... Effet : Réaction -1, Volonté -1, Endurance à la douleur.",
    category: "drug"
  },
  {
    id: "cram",
    name: "Cram",
    frenchName: "Cram",
    color: "#22c55e",
    description: "Le cram est un stimulant extrêmement populaire. Effet : Réaction +1, dés d’initiative +1D6.",
    category: "drug"
  },
  {
    id: "deepweed",
    name: "Deepweed",
    frenchName: "Deepweed",
    color: "#22d3ee",
    description: "Le deepweed est un narcotique dérivé d’une forme d’algue... Effet : Volonté +1, force les Éveillés à percevoir l’astral.",
    category: "drug"
  },
  {
    id: "jazz",
    name: "Jazz",
    frenchName: "Jazz",
    color: "#ec4899",
    description: "Le jazz est un stimulant conçu pour augmenter les capacités des officiers de police... Effet : Réaction +1, dés d’initiative +2D6.",
    category: "drug"
  },
  {
    id: "kamikaze",
    name: "Kamikaze",
    frenchName: "Kamikaze",
    color: "#ef4444",
    description: "Le kamikaze est un stimulant de combat. Effet : Constitution +1, Agilité +1, Force +2, Volonté +1, dés d’initiative +2D6.",
    category: "drug"
  },
  {
    id: "long-cours",
    name: "Long Cours",
    frenchName: "Long Cours",
    color: "#8b5cf6",
    description: "Combinaison d’hormones de synthèse... permet de rester éveillé pendant 4 jours sans subir de malus à cause de la fatigue.",
    category: "drug"
  },
  {
    id: "nitro",
    name: "Nitro",
    frenchName: "Nitro",
    color: "#f59e0b",
    description: "Dangereuse combinaison de drogues puissantes... Effet : Force +2, Volonté +2, Perception +2, dés d’initiative +1D6.",
    category: "drug"
  },
  {
    id: "novacoke",
    name: "Novacoke",
    frenchName: "Novacoke",
    color: "#22c55e",
    description: "Stimulant dérivé de la coca... Effet : Réaction +1, Charisme +1, Perception +1, Endurance à la douleur.",
    category: "drug"
  },
  {
    id: "psyche",
    name: "Psyché",
    frenchName: "Psyché",
    color: "#a855f7",
    description: "Ce stimulant est particulièrement apprécié par les magiciens... Effet : Intuition +1, Logique +1.",
    category: "drug"
  },
  {
    id: "zen",
    name: "Zen",
    frenchName: "Zen",
    color: "#67e8f9",
    description: "Hallucinogène psychédélique... Effet : Réaction -2, Volonté +1, -1 dé pour les actions basées sur les attributs physiques.",
    category: "drug"
  }
];

export default ALL_STATUSES;