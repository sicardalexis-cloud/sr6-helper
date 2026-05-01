// src/data/gear.ts

export interface GearItem {
  id: string;
  name: string;
  frenchName: string;
  category: "Blades" | "Clubs" | "Firearms" | "Projectiles" | "Armor" | "Cyberware" | "Other";
  dv?: string;                    // Damage Value (ex: "5P")
  attackRatings?: string;         // ex: "9/-/-/ -/-"
  availability: number | string;
  cost: number | string;
  description?: string;
  notes?: string;
  page?: number;
}

export const ALL_GEAR: GearItem[] = [
  // ==================== BLADES ====================
  {
    id: "combat-axe",
    name: "Combat Axe",
    frenchName: "Hache de combat",
    category: "Blades",
    dv: "5P",
    attackRatings: "9/-/-/ -/-",
    availability: 4,
    cost: 500,
    description: "Une hache lourde conçue pour le combat moderne.",
    page: 25
  },
  {
    id: "combat-survival-knife",
    name: "Combat/Survival Knife",
    frenchName: "Couteau de combat/survie",
    category: "Blades",
    dv: "3P",
    attackRatings: "8/2*/-/-/ -",
    availability: 2,
    cost: 220,
    description: "Un couteau polyvalent très courant chez les shadowrunners.",
    notes: "*Max range is 20 meters",
    page: 25
  },
  {
    id: "forearm-snap-blades",
    name: "Forearm Snap Blades",
    frenchName: "Lames rétractiles d'avant-bras",
    category: "Blades",
    dv: "3P",
    attackRatings: "6/-/-/ -/-",
    availability: 3,
    cost: 185,
    description: "Lames rétractiles implantées ou portées sur l'avant-bras.",
    page: 25
  },
  {
    id: "knife",
    name: "Knife",
    frenchName: "Couteau",
    category: "Blades",
    dv: "2P",
    attackRatings: "6/1*/-/-/ -",
    availability: 1,
    cost: 20,
    description: "Un couteau simple et bon marché.",
    notes: "*Max range is 20 meters",
    page: 25
  },
  {
    id: "katana",
    name: "Katana",
    frenchName: "Katana",
    category: "Blades",
    dv: "4P",
    attackRatings: "10/-/-/ -/-",
    availability: 3,
    cost: 350,
    description: "L'arme traditionnelle des samouraïs modernes.",
    page: 25
  },
  {
    id: "polearm",
    name: "Polearm",
    frenchName: "Arme d'hast",
    category: "Blades",
    dv: "4P",
    attackRatings: "8/-/-/ -/-",
    availability: 2,
    cost: 210,
    description: "Hallebarde, lance ou autre arme longue.",
    page: 25
  },
  {
    id: "sword",
    name: "Sword",
    frenchName: "Épée",
    category: "Blades",
    dv: "3P",
    attackRatings: "9/-/-/ -/-",
    availability: 3,
    cost: 320,
    description: "Une épée classique.",
    page: 25
  },

  // Tu peux ajouter d'autres catégories ici (Clubs, Firearms, Armor, etc.)
];

export default ALL_GEAR;