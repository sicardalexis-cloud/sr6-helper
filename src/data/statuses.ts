// src/data/statuses.ts

export interface StatusEffect {
  id: string;
  name: string;
  frenchName?: string;
  color: string;
  description?: string;
  shortDesc?: string;
}

export const ALL_STATUSES: StatusEffect[] = [
  {
    id: "blinded",
    name: "Blinded",
    frenchName: "Aveuglé",
    color: "#a5b4fc",
    description: "Whether it’s flashing lights, some specialized chemical, or the pure force of magic, there are plenty of ways to make it impossible for shadowrunners to see. For the first two levels of this status, characters take a –3 penalty to all tests involving visibility. At the third level, characters automatically fail any tests involving visibility.",
  },
  {
    id: "burning",
    name: "Burning",
    frenchName: "En feu",
    color: "#ef4444",
    description: "The Burning status is the result of being hit with a flame-based attack. Once the initial blow has done its damage, you have to deal with the continuing heat and flames, and the parts of yourself that may be on fire. The status should be noted with a number that indicates the amount of Physical damage the character must resist each round while the status exists. There are multiple ways to remove this status.",
  },
  {
    id: "chilled",
    name: "Chilled",
    frenchName: "Frigorifié",
    color: "#22d3ee",
    description: "When you are truly, damagingly cold, it seeps into your bones and won’t let go, and you can’t move as smoothly and nimbly as you would like. When you are Chilled, you get –4 to your Initiative Score and –1 to all dice pools besides Damage Resistance tests. This status cancels and is canceled by the Burning status.",
  },
  {
    id: "confused",
    name: "Confused",
    frenchName: "Confus",
    color: "#c084fc",
    description: "Colors, patterns, and weird ideas swirl around your head, keeping you from being able to focus, which makes your actions uncoordinated and awkward. The number after the status acts as a dice pool penalty on any actions you take.",
  },
  {
    id: "corrosive",
    name: "Corrosive",
    frenchName: "Corrosif",
    color: "#eab308",
    description: "Acids, bases, and other caustics eat into your flesh and don’t stop. The ongoing damage from these chemicals is noted with a number after it to denote how much damage the ongoing effect inflicts. The target must resist Physical damage equal to the number each round that the condition exists.",
  },
  {
    id: "cover",
    name: "Cover",
    frenchName: "Couvert",
    color: "#64748b",
    description: "Whether you hide behind a wall, a dumpster, or a body, Cover is protection from hostile fire. It comes at four levels, indicating how much of a character’s body is protected.",
  },
  {
    id: "dazed",
    name: "Dazed",
    frenchName: "Étourdi",
    color: "#f59e0b",
    description: "One too many thumps to the head, or maybe the solar plexus, leaves the character woozy and unable to act with their normal alacrity. The character reduces their Initiative Score by –4, and they cannot gain or spend Edge as long as they have this status.",
  },
  {
    id: "deafened",
    name: "Deafened",
    frenchName: "Assourdi",
    color: "#94a3b8",
    description: "Whether you heard a sudden, hugely loud clap, or someone stuffed your ears full of cotton-like noise, sound waves are not getting through to you. For the first two levels of this status, characters take a –3 penalty to all tests involving hearing. At the third level, characters automatically fail any tests involving hearing.",
  },
  {
    id: "fatigued",
    name: "Fatigued",
    frenchName: "Fatigué",
    color: "#f59e0b",
    description: "At its top level, this status is that dreamlike weariness where your legs are lead and just will. Not. Move. Characters with this status take a –2 penalty per level to all dice pools besides Damage Resistance tests.",
  },
  {
    id: "frightened",
    name: "Frightened",
    frenchName: "Effrayé",
    color: "#ec4899",
    description: "Something has hit your lizard brain, and rational thought flees. All you have left is fear. Characters take a –4 penalty to dice pools to all tests directed to or defending against the source of the effect.",
  },
  {
    id: "hazed",
    name: "Hazed",
    frenchName: "Dans le brouillard",
    color: "#8b5cf6",
    description: "Something has messed up your connection to the astral world, leaving that realm out of your reach. A character with this status is unable to move between the astral plane and the physical world.",
  },
  {
    id: "hobbled",
    name: "Hobbled",
    frenchName: "Boiteux",
    color: "#64748b",
    description: "Any movement on foot, whether by the Move, Sprint, or Avoid Incoming action, is halved (round up).",
  },
  {
    id: "immobilized",
    name: "Immobilized",
    frenchName: "Immobilisé",
    color: "#64748b",
    description: "Characters with this status cannot move, though they can take any actions that will function with their feet stuck to the ground. Their Attack Rating is reduced by 3, and they take a –3 dice pool penalty on all attacks.",
  },
  {
    id: "invisible",
    name: "Invisible",
    frenchName: "Invisible",
    color: "#67e8f9",
    description: "The go-to status for sneak thieves. Characters are less visible to living and sentient beings. The number after the status indicates the threshold people must hit on a Perception test to notice the character with this status.",
  },
  {
    id: "invisible-improved",
    name: "Invisible (Improved)",
    frenchName: "Invisible (Amélioré)",
    color: "#22d3ee",
    description: "The same as Invisibility, but it also affects cameras and other technological ways of seeing.",
  },
  {
    id: "nauseated",
    name: "Nauseated",
    frenchName: "Naussé",
    color: "#ec4899",
    description: "Your stomach heaves, your head spins, and you have trouble thinking about anything other than not throwing up. Characters must pass a Body + Willpower (2) test at the start of a combat round.",
  },
  {
    id: "panicked",
    name: "Panicked",
    frenchName: "Paniqué",
    color: "#f43f5e",
    description: "The drek has hit the fan, and it has splattered everywhere, and you have lost the ability to act in any sort of a coherent fashion. Characters with this status cannot act except to avoid the condition that is causing the Panicked effect.",
  },
  {
    id: "petrified",
    name: "Petrified",
    frenchName: "Pétrifié",
    color: "#64748b",
    description: "There is a good reason why you don’t want to be in the wrong end of a basilisk stare, and this is it. The character is essentially turned into solid material. They cannot take any actions, and they get a +10 Armor Rating.",
  },
  {
    id: "poisoned",
    name: "Poisoned",
    frenchName: "Empoisonné",
    color: "#22c55e",
    description: "Something wrong has gotten into the character’s body, and it’s going to mess them up until it works its way through. This status has a damage code after it, with a number and an indication for either Physical or Stun damage.",
  },
  {
    id: "prone",
    name: "Prone",
    frenchName: "À terre",
    color: "#f59e0b",
    description: "One of the classics—you drop to the ground to get a stable shot and make yourself tougher to shoot. The character’s movement rate is reduced to two meters, and they cannot Sprint.",
  },
  {
    id: "silent",
    name: "Silent",
    frenchName: "Silencieux",
    color: "#64748b",
    description: "Your ability to make noise is greatly hindered. The number after the status indicates the threshold people must hit on a Perception test to hear the character with this status.",
  },
  {
    id: "silent-improved",
    name: "Silent (Improved)",
    frenchName: "Silencieux (Amélioré)",
    color: "#94a3b8",
    description: "The same as Silent, except microphones and other forms of technology are also affected.",
  },
  {
    id: "stilled",
    name: "Stilled",
    frenchName: "Paralysé",
    color: "#64748b",
    description: "There’s bad news and good news! The bad news is you can’t move. Your feet are absolutely stuck in place. You get a –10 penalty on your Defense Rating against incoming attacks.",
  },
  {
    id: "wet",
    name: "Wet",
    frenchName: "Mouillé",
    color: "#3b82f6",
    description: "Whether it’s a pouring rain, a sudden wave, or the efforts of a rampaging water spirit, you are soaked from head to toe. You take a –6 dice pool penalty to Damage Resistance tests against cold and electrical damage.",
  },
  {
    id: "zapped",
    name: "Zapped",
    frenchName: "Électrocuté",
    color: "#a5b4fc",
    description: "A jolt of electrical power has hit you, leaving you fried and scattered. Your muscles aren’t working quite right, either. The character suffers a –2 to their Initiative Score, the inability to take the Sprint Action, and a dice pool penalty of –1 on all actions.",
  },
];

export default ALL_STATUSES;