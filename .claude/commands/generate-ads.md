# Generate Ads Command

Generate a batch of ad copy for The Nagging Partner across all personas and formats.

## Usage
```
/generate-ads [persona] [format] [scenario]
```

- `persona` (optional): any persona name from the library, or "random" to pick 3 at random (default: random)
- `format` (optional): hooks, captions, messages, scripts, or all (default: all)
- `scenario` (optional): dishes, trash, laundry, errands, or custom (default: random mix)

## Brand Voice

The Nagging Partner is a humor-driven app that lets users assign tasks and nag people with AI persona notifications. The tone is:
- Playful, irreverent, self-aware
- Millennial/Gen-Z humor
- Anti-shame ("guilt-free nagging")
- The personas are the product — they sell themselves

## Personas

**IMPORTANT:** Read the full persona library at `docs/personas.md`. It contains 20 personas with voice descriptions and escalation examples.

**Pick 3 personas per batch.** If the user specifies a persona by name, use that one. If they say "random" or don't specify, pick 3 interesting/contrasting personas from the library that haven't been used recently. Vary your picks each batch — don't always default to the same 3.

**The escalation examples in the persona file are just tone samples — never copy them verbatim.** Write fresh, original lines every time that capture the same voice and energy.

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
