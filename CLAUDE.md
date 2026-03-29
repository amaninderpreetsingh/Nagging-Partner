# The Nagging Partner — Project Instructions

## What This Is
A waitlist landing page for "The Nagging Partner" — an app that lets users assign tasks to people they're connected with and nag them with AI-persona-driven notifications (Old Grandma, Drunk Irish Guy, Military Sergeant).

## Tech Stack
- Next.js 14+ (App Router) with TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (waitlist storage)
- Vercel (deployment)

## Skills Available (in `.claude/skills/` and `.agents/skills/`)
All skills are committed to the repo — no installation needed.

### Design Skills
- `frontend-design` — Anthropic's official skill. Forces distinctive typography, color, layout. Bans AI slop.
- `impeccable` (21 commands) — `/polish`, `/audit`, `/critique`, `/typeset`, `/animate`, `/colorize`, `/bolder`, `/overdrive`, etc.
- `web-design-guidelines` — Vercel's 100+ accessibility/UX rules
- `vercel-react-best-practices` — 57 React/Next.js performance rules

### Spec Workflow (PDD)
Commands: `/spec-create`, `/spec-execute`, `/spec-status`, `/spec-list`, `/spec-steering-setup`
Bug fix: `/bug-create`, `/bug-analyze`, `/bug-fix`, `/bug-verify`, `/bug-status`
Agents: `spec-requirements-validator`, `spec-design-validator`, `spec-task-validator`, `spec-task-executor`

## MCP Servers (in `.mcp.json`)
- **Context7** — real-time docs for Next.js, Tailwind, Supabase
- **Playwright** — browser testing

## One-Time Setup (new machine)
Run `./setup.sh` to install the global dependency (spec-workflow CLI). Skills, commands, agents, and MCP config are all in the repo already.

## Design Principles
- Must NOT look "vibe coded" or generic AI-generated
- Bold, distinctive aesthetics — no Inter font, no purple gradients, no cookie-cutter layouts
- Mobile-first responsive design
- WCAG accessible
