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
