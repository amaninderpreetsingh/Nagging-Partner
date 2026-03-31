export interface PersonaMessage {
  label: string;
  tone: "friendly" | "nudging" | "impatient" | "angry" | "nuclear";
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
        tone: "nudging",
        text: "I made you a casserole once and you didn't even wash the dish. That trash is still there, isn't it?",
      },
      {
        label: "Day 5",
        tone: "impatient",
        text: "I'm not saying you're lazy, dear, but the trash has been there longer than my hip replacement recovery.",
      },
      {
        label: "Last Day",
        tone: "angry",
        text: "I didn't raise you to live like this. Your grandfather is rolling in his grave. TAKE. OUT. THE. TRASH.",
      },
      {
        label: "Day 10+",
        tone: "nuclear",
        text: "That's IT. I'm calling your mother. And your aunt. And Father Michael. We're having an INTERVENTION about your trash situation. I hope you're PROUD.",
      },
    ],
    altMessage:
      "Back in my day, we didn't need apps to remind us. We had SHAME.",
  },
  {
    id: "drama-queen",
    name: "Drama Queen Ex",
    emoji: "💅",
    description: "Passive-aggressive theatrics and emotional warfare",
    messages: [
      {
        label: "Day 1",
        tone: "friendly",
        text: "Hey babe, just a reminder about the dishes. No biggie. I'm totally fine. It's whatever.",
      },
      {
        label: "Day 3",
        tone: "nudging",
        text: "Oh the dishes are still there? Cool cool cool. I mean I would've done them by now but that's just ME I guess.",
      },
      {
        label: "Day 5",
        tone: "impatient",
        text: "You know what, I'm not even mad about the dishes. I'm DISAPPOINTED. There's a difference. Google it.",
      },
      {
        label: "Last Day",
        tone: "angry",
        text: "I just find it SO interesting that you have time to scroll TikTok for 3 hours but can't spend 10 minutes on dishes. Really says a lot about your PRIORITIES.",
      },
      {
        label: "Day 10+",
        tone: "nuclear",
        text: "I told my therapist about the dishes and even SHE gasped. She said 'that's a red flag' and I said 'I KNOW.' Do the dishes or I'm posting about this. WITH screenshots.",
      },
    ],
    altMessage:
      "I'm not being dramatic, YOU'RE being dramatic by NOT doing it.",
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
        tone: "nudging",
        text: "This is your SECOND reminder, Private. I don't enjoy repeating myself. The bathroom. NOW would be ideal.",
      },
      {
        label: "Day 5",
        tone: "impatient",
        text: "I said EARLIEST CONVENIENCE, not WHENEVER YOU FEEL LIKE IT. That bathroom isn't going to clean itself, PRIVATE.",
      },
      {
        label: "Last Day",
        tone: "angry",
        text: "DROP AND GIVE ME A CLEAN BATHROOM! This is UNACCEPTABLE. You are a DISGRACE to this household! MOVE MOVE MOVE!",
      },
      {
        label: "Day 10+",
        tone: "nuclear",
        text: "I have NEVER in my 30 YEARS of service seen such MONUMENTAL INCOMPETENCE. You can't clean ONE BATHROOM?! Report for LATRINE DUTY — EVERY ROOM IN THE HOUSE. THAT IS AN ORDER!",
      },
    ],
    altMessage:
      "I've seen combat zones cleaner than your kitchen counter. FALL IN.",
  },
];
