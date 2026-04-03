# The Nagging Partner — Pre-Launch Marketing Strategy

## Overview

**Goal:** Drive Founding Member sales ($5) and waitlist signups using AI-generated ads on Meta + TikTok, spending $0 on tools and $30-50/mo on ad spend.

**Core Insight:** The personas ARE the ad. Grandma guilt-tripping someone about dishes is inherently funny and shareable — the ad content IS a product demo.

**Two Phases:**
- **Phase 1 (Now):** Semi-automated — Claude Code + Gemini generate all creatives and copy. You upload and manage campaigns manually.
- **Phase 2 (Month 2+):** Full automation — Add Meta Ads MCP server to Claude Code. Claude creates, uploads, monitors, and pauses ads automatically.

**Success Metrics:**
- Founding Member conversions (primary)
- Waitlist signups (secondary)
- Cost per acquisition under $5 (break-even on Founding Member price)
- Learn which persona + format combo converts best

---

## Ad Content Pipeline

### Who Creates What

| Asset | Tool | Cost |
|-------|------|------|
| Ad copy (hooks, CTAs, captions) | Claude Code | Free |
| Text message screenshots | Gemini image generation | Free |
| Persona carousel cards | Gemini image generation | Free |
| Short video ads (8s clips) | Gemini `generate-video` (Veo 3.1) | Free (Gemini Pro) |
| AI testimonial videos | HeyGen / Synthesia free tier | Free (1-3/mo) |
| App UI mockups | Claude Code builds mockup page | Free |
| Video scripts | Claude Code | Free |
| Screen recordings | You + your phone | Free |

### Weekly Cycle

1. Claude Code generates 10 ad copy variations + 3 video scripts
2. Gemini generates 10 text message screenshots + carousel assets
3. Gemini generates 2-3 short video ads via Veo
4. Use 1 free HeyGen/Synthesia credit for a testimonial-style video
5. You pick best 5-6 assets, upload to Meta + TikTok
6. After 3-4 days, kill underperformers
7. Next week: more of what worked, new angles for what didn't

**Total cost for content creation: $0**

### Ad Types by Priority

| Priority | Format | Effort | Platform |
|----------|--------|--------|----------|
| 1 | Text message screenshots (persona nagging) | 5 min — Gemini generates images | Meta + TikTok |
| 2 | Carousel — all 3 personas side by side | 10 min — Gemini generates cards | Meta |
| 3 | AI testimonial video | 10 min — HeyGen/Synthesia free tier | Meta + TikTok |
| 4 | Short video ad (8s Veo clip) | 10 min — Gemini generate-video | TikTok + Reels |
| 5 | Screen recording — fake notifications coming in | 15 min — you record your phone | TikTok + Reels |
| 6 | App mockup carousel — what the product looks like | 30 min — Claude builds mockup page | Meta |
| 7 | 15-30s skit — "POV: you picked Military Sergeant" | 1 hr — you film + edit | TikTok + Reels |

---

## Ad Spend Strategy

### Monthly Budget: $30-50

### Platform Split

| Platform | Budget | Why |
|----------|--------|-----|
| Meta (Instagram/Facebook) | $25-35/mo | Carousel + Reels perform best, broader age range, better for conversion ads |
| TikTok | $5-15/mo | Test organic-first, only boost posts that get natural traction (Spark Ads) |

### Meta Campaign Structure

- **Campaign objective:** Conversions (optimize for landing page clicks -> Founding Member purchase)
- **Daily budget:** ~$1/day to start
- **Ad sets:** Test 3 personas against each other (Grandma vs Sergeant vs Drama Queen)
- **Ads per ad set:** 2-3 formats (screenshot + carousel + video)
- **Audience:** Broad targeting, ages 22-40, let Meta's algorithm find your people
- **Kill rule:** After 500 impressions, pause anything with CTR below 1%

### TikTok Strategy

- Post organically first — 3-5 videos/week using AI-generated content
- Only boost winners — if a post gets natural engagement, put $3-5 behind it as a Spark Ad
- Hashtags: #naggingpartner #roommateproblem #choreswars #AIapp
- Don't make it look like an ad — TikTok penalizes polished content

### Testing Matrix (Month 1)

| Week | What You're Testing | Budget |
|------|-------------------|--------|
| 1 | 3 personas x screenshot format | $10 |
| 2 | Winner persona x 3 formats (screenshot vs carousel vs video) | $10 |
| 3 | Winner persona + format x 3 different hooks | $10 |
| 4 | Scale winner combo + test on TikTok | $10-20 |

By end of Month 1 you know: which persona, which format, and which hook converts best.

---

## Platform Setup & Automation Roadmap

### Phase 1: Setup (Day 1-2)

| Task | What To Do | Cost |
|------|-----------|------|
| Meta Business Account | business.facebook.com -> create account -> create Ad Account | Free |
| Facebook Page | Required to run ads — create "The Nagging Partner" page | Free |
| Instagram Business Account | Connect to Facebook Page in Meta Business Suite | Free |
| TikTok Ads Manager | ads.tiktok.com -> sign up with email | Free |
| Meta Pixel | Install on landing page for conversion tracking | Free (Claude Code can add this) |
| TikTok Pixel | Install on landing page for conversion tracking | Free (Claude Code can add this) |

### Phase 2: Semi-Automated (Weeks 1-4)

**You do:**
- Upload creatives to Meta Ads Manager + TikTok Ads
- Set budgets and audiences
- Check results every 3-4 days, pause losers

**Claude Code + Gemini do:**
- Generate all ad copy, scripts, images, and videos
- Analyze what's working and suggest next batch
- Build landing page variants for A/B testing

### Phase 3: Full Automation (Month 2+)

Add MCP servers to automate:

| MCP Server | What It Automates |
|------------|-------------------|
| Meta Ads MCP | Create campaigns, upload creatives, pause underperformers, pull performance data |
| Google Ads MCP | (If you expand to Google later) |
| Video Editor MCP | Generate + edit video ads from Claude Code |

**What this looks like when fully set up:**
1. You tell Claude Code: "Generate 10 new Grandma screenshot ads and 3 video ads"
2. Claude Code generates everything via Gemini
3. Claude Code uploads to Meta via MCP
4. Claude Code checks performance next day, pauses anything below 1% CTR
5. You review a summary once a week

---

## Content Examples

### Text Message Screenshot Ads

**Grandma persona — dishes scenario:**
```
Grandma (2:15 PM): Sweetie, I noticed the dishes are still there. No rush!
Grandma (4:30 PM): Just thinking about you and those dishes, honey
Grandma (6:00 PM): Your grandfather never left dishes in the sink. God rest his soul.
Grandma (7:45 PM): I'm not saying I'm disappointed. I'm saying your mother would be.
Grandma (9:00 PM): I made you from SCRATCH and you can't wash a PLATE?
```

**Sergeant persona — taking out trash:**
```
Sergeant (0800): TASK ASSIGNED: Take out the trash. You have 2 hours. Move it.
Sergeant (1000): That's 2 hours, soldier. The trash is still here. So is my patience. Barely.
Sergeant (1200): I've seen combat zones cleaner than your kitchen. MOVE.
Sergeant (1400): You are a DISGRACE to this household. The RACCOONS are judging you.
```

**Ad caption:** "Tired of nagging your roommate? Let AI do it. Link in bio"

### Carousel Ad (3-4 slides)

1. **Slide 1:** "Pick your nagger" — show all 3 persona cards side by side
2. **Slide 2:** "They start nice..." — friendly first message from each
3. **Slide 3:** "...they don't stay nice" — nuclear-level final messages
4. **CTA slide:** "Join the waitlist — first 100 get lifetime access for $5"

### Video Ad Script (15 seconds — Reels/TikTok)

```
[HOOK - 0-3s] Text on screen: "I stopped nagging my boyfriend"
[BODY - 3-10s] Screen recording: phone notifications from "Grandma AI"
              escalating from sweet to savage about doing laundry
[CTA - 10-15s] Text on screen: "The Nagging Partner — let AI do the dirty work"
              "Link in bio"
```

### AI Testimonial Video (HeyGen/Synthesia)

```
[AI Avatar speaking to camera]
"So my roommate NEVER does the dishes. I signed up for this app
called The Nagging Partner and set the Military Sergeant on him.
Within 2 hours he was washing dishes AND apologizing.
Best $5 I ever spent."
```

---

## Metrics & Decision Framework

### What To Track

| Metric | Target | Where To Check |
|--------|--------|---------------|
| CTR (Click-Through Rate) | >1% (Meta), >0.8% (TikTok) | Ads Manager |
| CPC (Cost Per Click) | <$0.50 | Ads Manager |
| Founding Member conversions | Track every $5 sale | Stripe + Meta Pixel |
| Waitlist signups | Track every email | Supabase |
| Cost per acquisition | <$5 (break-even on Founding Member) | Manual calc |
| Video completion rate | >75% (critical for TikTok algorithm) | TikTok Ads Manager |

### Kill / Scale Rules

| Signal | Action |
|--------|--------|
| Ad has 500+ impressions and CTR < 0.5% | Kill it |
| Ad has CTR > 2% | Double its budget |
| One persona consistently outperforms others | Shift 70% of budget to that persona |
| A format consistently wins (e.g. video > carousel) | Make more of that format |
| CPA > $10 after 1 week | Pause campaign, rethink creative angle |
| Organic TikTok post gets >1000 views naturally | Boost it with $3-5 Spark Ad |

### Monthly Review

At the end of each month, answer these:
1. Which persona converts best?
2. Which format converts best?
3. Which hook/angle converts best?
4. What's my average cost per Founding Member?
5. Is paid ads worth it, or should I go organic-only?

---

## Tools Reference

### Already Available (Free)
- **Claude Code** — ad copy, scripts, automation, MCP integrations
- **Gemini MCP (Pro)** — image generation, video generation (Veo 3.1), research, brainstorming

### Free Tier Tools
- **HeyGen** (1 free video/mo) — AI avatar testimonial videos
- **Synthesia** (3 free videos/mo) — AI avatar talking head videos
- **Invideo AI** — multi-actor testimonials
- **Bandy AI** — UGC ads via chat
- **Predis.ai** — UGC video maker
- **VEED** — AI avatar generator
- **Lipsync.video** — upload photo, make it talk (no sign-up)

### MCP Servers for Phase 3 Automation
- **Meta Ads MCP** — campaign management from Claude Code
- **Google Ads MCP** — (future expansion)
- **mcp-luma** — Luma Dream Machine video generation
- **Video Editor MCP** — open-source video editing from Claude Code
