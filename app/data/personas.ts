export interface PersonaMessage {
  label: string;
  tone: "friendly" | "impatient" | "angry";
  text: string;
}

export interface Persona {
  id: string;
  name: string;
  emoji: string;
  description: string;
  messages: PersonaMessage[];
  altMessage: string;
}

export const personas: Persona[] = [
  {
    id: "grandma",
    name: "Old Grandma",
    emoji: "👵",
    description: "Guilt trips and passive-aggressive love",
    messages: [
      {
        label: "Day 1",
        tone: "friendly",
        text: "Sweetie, don't forget to take out the trash. You know I worry about you living in filth.",
      },
      {
        label: "Day 3",
        tone: "impatient",
        text: "I'm not saying you're lazy, dear, but the trash has been there longer than my hip replacement recovery.",
      },
      {
        label: "Overdue",
        tone: "angry",
        text: "I didn't raise you to live like this. Your grandfather is rolling in his grave. TAKE. OUT. THE. TRASH.",
      },
    ],
    altMessage:
      "Back in my day, we didn't need apps to remind us. We had SHAME.",
  },
  {
    id: "irish",
    name: "Drunk Irish Guy",
    emoji: "🍺",
    description: "Chaotic encouragement with zero filter",
    messages: [
      {
        label: "Day 1",
        tone: "friendly",
        text: "Oi mate! Just a wee reminder to do the dishes. No rush, but like... do 'em.",
      },
      {
        label: "Day 3",
        tone: "impatient",
        text: "Listen here ya gobshite, those dishes aren't gonna wash themselves. I've had three pints waitin' on ya!",
      },
      {
        label: "Overdue",
        tone: "angry",
        text: "RIGHT. I've had enough of yer nonsense! Me nan could do the dishes faster and she's been DEAD for twelve years!",
      },
    ],
    altMessage:
      "I swear on me mother's grave — and she's still alive — DO IT NOW.",
  },
  {
    id: "sergeant",
    name: "Military Sergeant",
    emoji: "🎖️",
    description: "Drill instructor energy, zero tolerance",
    messages: [
      {
        label: "Day 1",
        tone: "friendly",
        text: "Soldier. You have a task assigned: clean the bathroom. Execute at your earliest convenience. Dismissed.",
      },
      {
        label: "Day 3",
        tone: "impatient",
        text: "I said EARLIEST CONVENIENCE, not WHENEVER YOU FEEL LIKE IT. That bathroom isn't going to clean itself, PRIVATE.",
      },
      {
        label: "Overdue",
        tone: "angry",
        text: "DROP AND GIVE ME A CLEAN BATHROOM! This is UNACCEPTABLE. You are a DISGRACE to this household! MOVE MOVE MOVE!",
      },
    ],
    altMessage:
      "I've seen combat zones cleaner than your kitchen counter. FALL IN.",
  },
];
