# Generate Ads Command

Generate a batch of ad copy for The Nagging Partner across all personas and formats.

## Usage
```
/generate-ads [persona] [format] [scenario]
```

- `persona` (optional): grandma, sergeant, dramaqueen, or all (default: all)
- `format` (optional): hooks, captions, messages, scripts, or all (default: all)
- `scenario` (optional): dishes, trash, laundry, errands, or custom (default: random mix)

## Brand Voice

The Nagging Partner is a humor-driven app that lets users assign tasks and nag people with AI persona notifications. The tone is:
- Playful, irreverent, self-aware
- Millennial/Gen-Z humor
- Anti-shame ("guilt-free nagging")
- The personas are the product — they sell themselves

## Personas

### Old Grandma
- Voice: Passive-aggressive love, guilt trips, references to "your grandfather," escalates from sweet to savage
- Example escalation:
  - Level 1: "Sweetie, I noticed the dishes are still there. No rush!"
  - Level 3: "Your grandfather never left dishes in the sink. God rest his soul."
  - Level 5: "I made you from SCRATCH and you can't wash a PLATE?"

### Military Sergeant
- Voice: Drill instructor, zero tolerance, ALL CAPS energy, military time, escalates from orders to existential insults
- Example escalation:
  - Level 1: "TASK ASSIGNED: Take out the trash. You have 2 hours. Move it."
  - Level 3: "I've seen combat zones cleaner than your kitchen. MOVE."
  - Level 5: "You are a DISGRACE to this household. The RACCOONS are judging you."

### Drama Queen Ex
- Voice: Theatrical disappointment, emotional manipulation, ALL about the drama, escalates from passive to full meltdown
- Example escalation:
  - Level 1: "So... you're just gonna leave those dishes there? Cool cool cool."
  - Level 3: "I'm not being dramatic, YOU'RE being dramatic by NOT doing it."
  - Level 5: "I gave you EVERYTHING and you can't even take out the TRASH?!"

## Output Format

Generate the following for each persona requested:

### 1. Ad Hooks (5 per persona)
Short attention-grabbing first lines for ads. Must work in first 1-3 seconds.
Format: One line each, punchy, scroll-stopping.

### 2. Ad Captions (3 per persona)
Full ad captions for Meta/TikTok posts. Include:
- Hook line
- 1-2 sentences of body copy
- CTA pointing to waitlist/founding member signup
- Relevant hashtags

### 3. Text Message Threads (2 per persona)
Escalating nag message sequences (5 messages each) for a specific chore scenario.
Format: Timestamp + persona name + message, escalating from friendly to nuclear.

### 4. Video Scripts (1 per persona)
15-second Reels/TikTok script with:
- [HOOK 0-3s]: Text on screen
- [BODY 3-10s]: What the viewer sees (screen recording description or skit action)
- [CTA 10-15s]: Text on screen with call to action

### 5. Testimonial Scripts (1 per persona)
30-second fake testimonial script for AI avatar (HeyGen/Synthesia):
- Speaking to camera
- Describes the problem (roommate/partner not doing chores)
- Describes using The Nagging Partner with a specific persona
- Punchline/result
- CTA

## Instructions

1. Read the strategy doc at `docs/superpowers/specs/2026-04-03-marketing-strategy-design.md` for full context
2. Generate all requested copy types for the requested personas
3. Each piece of copy should be UNIQUE — no repeated hooks or angles
4. Vary the chore scenarios: dishes, trash, laundry, vacuuming, groceries, bills, errands
5. Make it genuinely funny — this is comedy content, not corporate marketing
6. Output everything in a clean format the user can copy-paste into ad platforms
7. At the end, suggest which 3 pieces are strongest and why
