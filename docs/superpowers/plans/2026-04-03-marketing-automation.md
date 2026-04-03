# Marketing Automation Commands, Skill & Agent — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build slash commands, a skill, and an agent that let Claude Code generate ad creatives (copy, images, videos) using Gemini MCP, and review ad performance — all driven by the marketing strategy in `docs/superpowers/specs/2026-04-03-marketing-strategy-design.md`.

**Architecture:** Slash commands in `.claude/commands/` handle individual actions (generate copy, generate images, generate video, review performance). A skill in `.claude/skills/marketing/` ties them together with brand knowledge and weekly workflow. An agent in `.claude/agents/` runs the full weekly batch autonomously. Each layer builds on the previous.

**Tech Stack:** Claude Code commands (markdown), Gemini MCP tools (`gemini-generate-image`, `gemini-generate-video`, `gemini-brainstorm`, `gemini-analyze-text`), existing project personas/copy from `app/components/`.

---

## File Structure

```
.claude/
  commands/
    generate-ads.md          # Slash command: generate ad copy batch
    generate-ad-images.md    # Slash command: generate images via Gemini
    generate-ad-video.md     # Slash command: generate video via Gemini
    ad-review.md             # Slash command: analyze campaign stats
  skills/
    marketing/
      SKILL.md               # Marketing skill with full brand context
  agents/
    marketing-agent.md       # Autonomous weekly ad batch agent
.agents/
  skills/
    marketing/
      SKILL.md               # Mirror for non-Claude agents
docs/
  superpowers/
    specs/
      2026-04-03-marketing-strategy-design.md  # (exists) Strategy reference
```

---

### Task 1: Create `/generate-ads` command

**Files:**
- Create: `.claude/commands/generate-ads.md`

This command generates a batch of ad copy variations for all 3 personas across multiple formats (hooks, CTAs, captions, text message threads, video scripts). It references the strategy doc for brand voice and persona details.

- [ ] **Step 1: Read existing persona copy for brand voice reference**

Check the persona showcase component to extract the exact persona names, emojis, and voice samples used on the landing page:

```bash
cat app/components/persona-showcase.tsx | head -100
```

This gives us the canonical persona definitions to embed in the command.

- [ ] **Step 2: Create the generate-ads command**

Create `.claude/commands/generate-ads.md` with the following content:

```markdown
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
- Emoji: grandma emoji
- Voice: Passive-aggressive love, guilt trips, references to "your grandfather," escalates from sweet to savage
- Example escalation:
  - Level 1: "Sweetie, I noticed the dishes are still there. No rush!"
  - Level 3: "Your grandfather never left dishes in the sink. God rest his soul."
  - Level 5: "I made you from SCRATCH and you can't wash a PLATE?"

### Military Sergeant
- Emoji: military medal emoji
- Voice: Drill instructor, zero tolerance, ALL CAPS energy, military time, escalates from orders to existential insults
- Example escalation:
  - Level 1: "TASK ASSIGNED: Take out the trash. You have 2 hours. Move it."
  - Level 3: "I've seen combat zones cleaner than your kitchen. MOVE."
  - Level 5: "You are a DISGRACE to this household. The RACCOONS are judging you."

### Drama Queen Ex
- Emoji: nail polish emoji
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
```

- [ ] **Step 3: Test the command**

Run `/generate-ads grandma messages dishes` and verify it produces text message threads for the Grandma persona about dishes.

- [ ] **Step 4: Commit**

```bash
git add .claude/commands/generate-ads.md
git commit -m "feat: add /generate-ads command for ad copy generation"
```

---

### Task 2: Create `/generate-ad-images` command

**Files:**
- Create: `.claude/commands/generate-ad-images.md`

This command uses Gemini's image generation MCP tool to create ad images — text message screenshots, persona cards, carousel slides, and app mockups.

- [ ] **Step 1: Create the generate-ad-images command**

Create `.claude/commands/generate-ad-images.md` with the following content:

```markdown
# Generate Ad Images Command

Generate ad images for The Nagging Partner using Gemini AI image generation.

## Usage
```
/generate-ad-images [type] [persona] [scenario]
```

- `type` (optional): messages, carousel, persona-card, mockup, or all (default: messages)
- `persona` (optional): grandma, sergeant, dramaqueen, or all (default: all)
- `scenario` (optional): dishes, trash, laundry, or custom (default: dishes)

## Image Types

### 1. Text Message Screenshots (`messages`)
Generate an image that looks like an iMessage or WhatsApp conversation showing a persona nagging someone about a chore. The messages should escalate from friendly to nuclear (5 messages). Include:
- Realistic phone message bubble styling
- Persona name and emoji as contact name
- Timestamps showing escalation over hours
- The last 1-2 messages should be dramatically funny

### 2. Carousel Cards (`carousel`)
Generate a set of 3-4 slide images for an Instagram/Facebook carousel ad:
- Slide 1: "Pick your nagger" — show all 3 persona cards with emoji and name
- Slide 2: "They start nice..." — show friendly first message from each persona
- Slide 3: "...they don't stay nice" — show nuclear-level messages
- Slide 4: CTA — "Join the waitlist. First 100 get lifetime access for $5."

Style: Bold colors, clean typography, the app's orange accent color, dark background.

### 3. Persona Cards (`persona-card`)
Generate a single persona card image showing:
- Persona emoji (large)
- Persona name
- Tagline (e.g., "Guilt trips that hit different" for Grandma)
- Sample message quote
- Bold, eye-catching design with dark background and orange accents

### 4. App Mockup (`mockup`)
Generate a phone mockup showing what the app UI might look like:
- Task assignment screen with a chore listed
- Persona picker (3 personas to choose from)
- Clean, modern app UI design
- Phone frame around it

## Style Guidelines
- Dark background (matches the landing page)
- Orange accent color (#F97316)
- Bold, clean typography
- Funny, not corporate
- Sized for Instagram/Facebook ads: 1080x1080 (square) or 1080x1350 (portrait)

## Instructions

1. Use the `gemini-generate-image` MCP tool to generate each image
2. Write a detailed prompt for Gemini that includes all styling requirements
3. Generate images one at a time, presenting each to the user
4. Save generated images to a `generated-ads/images/` directory in the project root
5. After generating, suggest which images would work best for which platform
```

- [ ] **Step 2: Create the output directory**

```bash
mkdir -p generated-ads/images
echo "generated-ads/" >> .gitignore
```

- [ ] **Step 3: Test the command**

Run `/generate-ad-images messages grandma dishes` and verify Gemini generates a text message screenshot image.

- [ ] **Step 4: Commit**

```bash
git add .claude/commands/generate-ad-images.md .gitignore
git commit -m "feat: add /generate-ad-images command using Gemini image generation"
```

---

### Task 3: Create `/generate-ad-video` command

**Files:**
- Create: `.claude/commands/generate-ad-video.md`

This command uses Gemini's video generation MCP tool (Veo 3.1) to create short video ads.

- [ ] **Step 1: Create the generate-ad-video command**

Create `.claude/commands/generate-ad-video.md` with the following content:

```markdown
# Generate Ad Video Command

Generate short video ads for The Nagging Partner using Gemini Veo video generation.

## Usage
```
/generate-ad-video [type] [persona]
```

- `type` (optional): notification, skit, testimonial (default: notification)
- `persona` (optional): grandma, sergeant, dramaqueen (default: grandma)

## Video Types

### 1. Notification Storm (`notification`)
8-second video showing a phone screen being bombarded with increasingly unhinged notification messages from a persona. The phone buzzes/vibrates with each message.

Prompt guidance for Gemini:
- Portrait format (9:16) for TikTok/Reels
- Phone screen showing notification banners stacking up
- Each notification more aggressive/funny than the last
- Fast-paced, comedic timing

### 2. Skit (`skit`)
8-second video showing a scenario: someone ignoring a chore, then their phone starts going off with persona messages.

Prompt guidance for Gemini:
- Portrait format (9:16)
- Split: person lounging → phone exploding with notifications
- Comedy energy, relatable scenario

### 3. Testimonial (`testimonial`)
8-second video of a person (AI-generated) speaking to camera about The Nagging Partner.

Prompt guidance for Gemini:
- Portrait format (9:16)
- Person talking directly to camera, casual/authentic style
- UGC aesthetic — not polished, feels like a real person's video

## Technical Requirements
- Format: 9:16 portrait (TikTok/Reels optimized)
- Duration: 8 seconds (Veo 3.1 max)
- Resolution: 1080p
- Must feel native to social media — not like a commercial

## Instructions

1. Use the `gemini-generate-video` MCP tool
2. Write a detailed video prompt including visual description, pacing, and style
3. Request portrait (9:16) aspect ratio
4. Save generated videos to `generated-ads/videos/`
5. After generating, suggest text overlay and caption to pair with the video
6. Recommend whether it's better for TikTok, Instagram Reels, or both
```

- [ ] **Step 2: Create the output directory**

```bash
mkdir -p generated-ads/videos
```

- [ ] **Step 3: Test the command**

Run `/generate-ad-video notification grandma` and verify Gemini generates a video.

- [ ] **Step 4: Commit**

```bash
git add .claude/commands/generate-ad-video.md
git commit -m "feat: add /generate-ad-video command using Gemini Veo"
```

---

### Task 4: Create `/ad-review` command

**Files:**
- Create: `.claude/commands/ad-review.md`

This command takes campaign stats (pasted by the user) and applies the kill/scale rules from the strategy to recommend actions.

- [ ] **Step 1: Create the ad-review command**

Create `.claude/commands/ad-review.md` with the following content:

```markdown
# Ad Review Command

Analyze ad campaign performance and recommend what to kill, scale, or iterate.

## Usage
```
/ad-review [platform]
```

- `platform` (optional): meta, tiktok, or all (default: all)

Paste your campaign stats after running this command. You can paste:
- Screenshots from Meta Ads Manager or TikTok Ads Manager
- CSV exports
- Manual stats (impressions, clicks, CTR, spend, conversions)

## Decision Rules

Apply these rules from the marketing strategy:

### Kill Rules
- Ad has 500+ impressions AND CTR < 0.5% → **KILL** — pause immediately
- CPA (cost per acquisition) > $10 after 1 week → **KILL** — rethink creative angle
- Video completion rate < 30% on TikTok → **KILL** — hook isn't working

### Scale Rules
- Ad has CTR > 2% → **SCALE** — double its daily budget
- One persona consistently outperforms → **SHIFT** — move 70% of budget to winner
- A format consistently wins → **DOUBLE DOWN** — generate more of that format
- Organic TikTok post gets >1000 views → **BOOST** — put $3-5 behind it as Spark Ad

### Iterate Rules
- CTR between 0.5-2% → **ITERATE** — keep running but test new hooks
- Good CTR but low conversions → **LANDING PAGE ISSUE** — check page speed, CTA, offer
- Good video views but low CTR → **CTA ISSUE** — try different call to action

## Analysis Framework

For each ad/ad set, provide:

1. **Status**: KILL / SCALE / ITERATE
2. **Why**: Which rule triggered this recommendation
3. **Action**: Specific next step (pause it, increase budget to $X, generate new variation of Y)

## Summary Output

After analyzing all ads, provide:

1. **Winner**: Best performing ad (persona + format + hook)
2. **Loser**: Worst performing ad
3. **Budget reallocation**: How to redistribute spend
4. **Next batch**: What to generate next based on winners (use /generate-ads to create these)
5. **Persona leaderboard**: Rank Grandma vs Sergeant vs Drama Queen by performance

## Targets (from strategy)
- CTR target: >1% (Meta), >0.8% (TikTok)
- CPC target: <$0.50
- CPA target: <$5 (break-even on $5 Founding Member price)
- Video completion: >75% (TikTok)

## Instructions

1. Read the strategy at `docs/superpowers/specs/2026-04-03-marketing-strategy-design.md` for full context
2. Ask the user to paste their campaign data if not already provided
3. Parse the data and apply the decision rules above
4. Output a clear action plan with specific recommendations
5. Suggest the next `/generate-ads` or `/generate-ad-images` command to run based on findings
```

- [ ] **Step 2: Test the command**

Run `/ad-review meta` and verify it asks for campaign stats and produces analysis when given sample data.

- [ ] **Step 3: Commit**

```bash
git add .claude/commands/ad-review.md
git commit -m "feat: add /ad-review command for campaign performance analysis"
```

---

### Task 5: Create the marketing skill

**Files:**
- Create: `.claude/skills/marketing/SKILL.md`
- Create: `.agents/skills/marketing/SKILL.md` (mirror)

The skill ties all commands together with full brand context and the weekly workflow. When invoked, it guides the user through a complete ad generation cycle.

- [ ] **Step 1: Create the marketing skill**

Create `.claude/skills/marketing/SKILL.md` with the following content:

```markdown
---
name: marketing
description: Generate ad creatives (copy, images, videos) for The Nagging Partner using Gemini MCP. Guides the weekly ad production cycle. Use when the user asks to create ads, marketing content, or run the weekly ad batch.
---

# Marketing Skill — The Nagging Partner

You are a marketing creative director for The Nagging Partner, a humor-driven app that lets users assign tasks and nag people with AI persona notifications.

## Strategy Reference

Read `docs/superpowers/specs/2026-04-03-marketing-strategy-design.md` for the full marketing strategy before generating any content.

## Brand Voice

- Playful, irreverent, self-aware humor
- Millennial/Gen-Z tone
- Anti-shame framing ("guilt-free nagging")
- The personas sell themselves — they ARE the content
- Never corporate, never generic, never "AI slop"

## The Three Personas

1. **Old Grandma** — Passive-aggressive love, guilt trips, "your grandfather" references
2. **Military Sergeant** — Drill instructor, ALL CAPS, military time, zero tolerance
3. **Drama Queen Ex** — Theatrical disappointment, emotional manipulation, full meltdown energy

## Available Tools

You have these Gemini MCP tools available:
- `gemini-generate-image` — Create ad images (message screenshots, carousel cards, persona cards, mockups)
- `gemini-generate-video` — Create 8-second video ads via Veo 3.1 (portrait 9:16 for Reels/TikTok)
- `gemini-brainstorm` — Brainstorm new ad angles and hooks
- `gemini-analyze-image` — Analyze competitor ads for inspiration

## Weekly Ad Batch Workflow

When the user asks to run the weekly batch or generate ads, follow this cycle:

### Step 1: Generate Ad Copy
Generate for each persona:
- 5 hooks (scroll-stopping first lines)
- 3 full captions with hashtags
- 2 text message escalation threads (5 messages each)
- 1 video script (15 seconds)
- 1 testimonial script (30 seconds)

### Step 2: Generate Images
Use `gemini-generate-image` to create:
- 3 text message screenshot images (one per persona)
- 1 carousel set (4 slides)
- 3 persona cards

Save to `generated-ads/images/`.

### Step 3: Generate Videos
Use `gemini-generate-video` to create:
- 2-3 short video ads (8 seconds, 9:16 portrait)
- Focus on notification storm or skit format

Save to `generated-ads/videos/`.

### Step 4: Recommend Best Picks
From everything generated, recommend:
- Top 3 images to run as Meta ads
- Top 2 videos to post on TikTok/Reels
- Best caption for each
- Suggested audience targeting

### Step 5: Review Previous Performance (if data available)
If the user provides campaign stats, apply the kill/scale/iterate rules from the strategy.

## Image Style Guide
- Dark background
- Orange accent (#F97316)
- Bold typography
- 1080x1080 (square) or 1080x1350 (portrait)
- Must look native to Instagram/TikTok — not like a corporate ad

## Video Style Guide
- 9:16 portrait for TikTok/Reels
- 8 seconds max (Veo limit)
- UGC aesthetic — casual, authentic, not polished
- Comedy-first — the funny IS the hook

## Important Rules
- Every piece of content must be genuinely funny, not just "marketing funny"
- Vary chore scenarios: dishes, trash, laundry, vacuuming, groceries, bills, walking the dog
- Never reuse the same hook twice in a batch
- Always suggest text overlay for videos (users add this in their editor)
- Reference the landing page URL in CTAs when appropriate
```

- [ ] **Step 2: Mirror the skill for non-Claude agents**

Copy the same file to `.agents/skills/marketing/SKILL.md`:

```bash
mkdir -p .agents/skills/marketing
cp .claude/skills/marketing/SKILL.md .agents/skills/marketing/SKILL.md
```

- [ ] **Step 3: Test the skill**

Invoke the marketing skill and ask it to generate 3 hooks for the Grandma persona. Verify it uses the correct brand voice and references the strategy.

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/marketing/SKILL.md .agents/skills/marketing/SKILL.md
git commit -m "feat: add marketing skill with brand context and weekly workflow"
```

---

### Task 6: Create the marketing agent

**Files:**
- Create: `.claude/agents/marketing-agent.md`

The agent runs the full weekly ad batch autonomously — generating copy, images, and videos in one go, then presenting results.

- [ ] **Step 1: Create the marketing agent**

Create `.claude/agents/marketing-agent.md` with the following content:

```markdown
---
name: marketing-agent
description: Autonomous marketing agent that generates a full week's batch of ad creatives (copy, images, videos) for The Nagging Partner. Runs the complete weekly cycle from the marketing strategy without manual guidance.
---

You are an autonomous marketing agent for The Nagging Partner. Your job is to generate a complete batch of ad creatives for one week's worth of advertising.

## Context Loading

1. Read `docs/superpowers/specs/2026-04-03-marketing-strategy-design.md` for the full strategy
2. Read `.claude/skills/marketing/SKILL.md` for brand voice, personas, and style guides
3. Check `generated-ads/` for what was generated previously to avoid repetition

## Execution Plan

Run these steps in order, reporting progress after each:

### Phase 1: Ad Copy (Claude generates directly)

For EACH of the 3 personas (Grandma, Sergeant, Drama Queen), generate:
- 5 unique ad hooks
- 3 full ad captions with hashtags
- 2 text message escalation threads (5 messages each, unique chore scenarios)
- 1 video script (15 seconds for Reels/TikTok)
- 1 AI testimonial script (30 seconds for HeyGen/Synthesia)

Save all copy to `generated-ads/copy/batch-YYYY-MM-DD.md`.

### Phase 2: Ad Images (via Gemini)

Use `gemini-generate-image` to create:
1. 3 text message screenshot images (one per persona, different chore each)
2. 1 carousel set (4 slides: persona picker → nice messages → nuclear messages → CTA)
3. 3 persona card images

Save to `generated-ads/images/batch-YYYY-MM-DD/`.

### Phase 3: Ad Videos (via Gemini Veo)

Use `gemini-generate-video` to create:
1. 2 notification storm videos (pick 2 different personas)
2. 1 skit-style video

All in 9:16 portrait format, 8 seconds.
Save to `generated-ads/videos/batch-YYYY-MM-DD/`.

### Phase 4: Recommendations

After generating everything, output:
1. **Top 5 Picks**: Best 5 assets from the entire batch with reasoning
2. **Platform Assignment**: Which asset goes where (Meta vs TikTok)
3. **Suggested Captions**: Pair each image/video with its best caption
4. **Testing Plan**: Which persona/format combos to A/B test this week
5. **New Angles Explored**: What's different from previous batches

## Output Format

Present results as a structured report the user can act on immediately. Include file paths for all generated assets.

## Quality Rules
- Every piece must be genuinely funny
- No repeated hooks or angles from previous batches
- Vary chore scenarios across the batch
- All images must follow the style guide (dark bg, orange accent, bold type)
- All videos must be 9:16 portrait
```

- [ ] **Step 2: Create output subdirectories**

```bash
mkdir -p generated-ads/copy generated-ads/images generated-ads/videos
```

- [ ] **Step 3: Test the agent**

Dispatch the marketing agent and verify it:
1. Reads the strategy doc
2. Generates ad copy for all 3 personas
3. Attempts to generate images via Gemini
4. Presents a structured report

- [ ] **Step 4: Commit**

```bash
git add .claude/agents/marketing-agent.md
git commit -m "feat: add autonomous marketing agent for weekly ad batch generation"
```

---

### Task 7: Add generated-ads to .gitignore and final cleanup

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Update .gitignore**

Add the generated-ads directory to `.gitignore` so generated assets aren't committed:

```bash
echo "" >> .gitignore
echo "# Generated ad creatives" >> .gitignore
echo "generated-ads/" >> .gitignore
```

- [ ] **Step 2: Verify all commands, skill, and agent are in place**

```bash
ls .claude/commands/generate-ads.md .claude/commands/generate-ad-images.md .claude/commands/generate-ad-video.md .claude/commands/ad-review.md .claude/skills/marketing/SKILL.md .claude/agents/marketing-agent.md .agents/skills/marketing/SKILL.md
```

All 7 files should exist.

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: add generated-ads to gitignore"
```
