# Implementation Plan

## Task Overview
Build the Nagging Partner waitlist landing page from scratch. The project is greenfield — no existing app code. Tasks follow the scroll funnel order: project setup → layout/design system → sections (top to bottom) → backend → email → analytics → polish.

## Steering Document Compliance
- Next.js 15 App Router with `app/` directory
- Tailwind CSS v4 with `@theme` directive in `globals.css`
- TypeScript strict mode
- Server Components by default, `"use client"` only where specified

## Skills, Tools, and MCP Usage
Each task specifies which skills and tools to use. Key rules:
- **Always use Context7 MCP** before writing code that uses Next.js, Tailwind v4, Supabase, Resend, Motion, or shadcn/ui
- **Use `/frontend-design`** as the primary skill for all visual component tasks
- **Use `/vercel-react-best-practices`** when writing React components
- **Run `/audit` and `/polish`** in the final tasks

## Tasks

### Phase 1: Project Setup

- [ ] 1. Initialize Next.js 15 project with TypeScript and Tailwind v4
  - Run `npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --no-eslint --import-alias "@/*"` (non-interactive flags)
  - Verify Tailwind v4 is installed (CSS-first config with `@import "tailwindcss"`)
  - Configure `tsconfig.json` with strict mode
  - Clean out default boilerplate from `app/page.tsx` and `globals.css`
  - **Files:** `package.json`, `tsconfig.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
  - **MCP:** Context7 — look up `create-next-app` latest flags and Tailwind v4 setup
  - _Requirements: All (foundation)_

- [ ] 2. Set up design system: fonts, color palette, and global styles
  - Install Space Grotesk + DM Sans via `next/font/google` in `app/layout.tsx`
  - Define `@theme` block in `globals.css` with full color palette (background, surface, accent orange #FF6B35, text, success, error, border)
  - Add grain overlay CSS (SVG noise filter as background-image)
  - Set base typography scale and spacing
  - **Files:** `app/layout.tsx`, `app/globals.css`
  - **MCP:** Context7 — look up `next/font` API and Tailwind v4 `@theme` syntax
  - **Skill:** `/typeset` — verify font hierarchy and sizing
  - _Requirements: 11.1, 11.2, 11.3_

- [ ] 3. Install and configure shadcn/ui
  - Run `npx shadcn@latest init --defaults` (non-interactive, Tailwind v4 compatibility)
  - Add Button and Input components: `npx shadcn@latest add button input --yes`
  - Verify components work with the custom color palette
  - **Files:** `components/ui/button.tsx`, `components/ui/input.tsx`, `components.json`, `lib/utils.ts`
  - **MCP:** Context7 — look up shadcn/ui installation with Tailwind v4
  - _Requirements: 7 (form components)_

- [ ] 4. Install Motion (Framer Motion) and create ScrollAnimationWrapper
  - Install `motion` package
  - Create `app/components/scroll-animation.tsx` — client component using IntersectionObserver + Motion
  - Props: `children`, `direction` (up/left/right), `delay`
  - Respect `prefers-reduced-motion` via `useReducedMotion` hook
  - **Files:** `app/components/scroll-animation.tsx`
  - **MCP:** Context7 — look up Motion (Framer Motion) `useInView` and `useReducedMotion` API
  - _Requirements: 11.4, 11.5_

- [ ] 5. Create persona data file
  - Create `app/data/personas.ts` with `Persona` and `PersonaMessage` TypeScript interfaces
  - Define 3 personas (Old Grandma, Drunk Irish Guy, Military Sergeant) with:
    - Name, emoji, description
    - 3 escalating messages each (Day 1 friendly → Day 3 impatient → Overdue angry)
    - 1 alternate hover message each
  - Write funny, in-character messages for each persona
  - **Files:** `app/data/personas.ts`
  - **Skill:** `/clarify` — make persona messages punchy and in-character
  - _Requirements: 3.2, 3.3, 3.5_

### Phase 2: Page Sections (Top to Bottom)

- [ ] 6. Build HeroSection component
  - Create `app/components/hero-section.tsx` — Server Component
  - Bold headline (Space Grotesk), subheadline naming target relationships
  - Social proof counter ("Join X others")
  - Slot for WaitlistForm (passed as child or composed)
  - Slot for NotificationPreview
  - Escalating tone hint badge/text near notification preview
  - Above-the-fold layout: headline left, notification preview right (desktop); stacked (mobile)
  - **Files:** `app/components/hero-section.tsx`
  - **Skill:** `/frontend-design` — distinctive hero layout, not generic
  - **MCP:** Context7 — Next.js 15 Server Component patterns
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [ ] 7. Build NotificationPreview component
  - Create `app/components/notification-preview.tsx` — Server Component
  - Styled to look like an iOS push notification (app icon, title, message body, timestamp)
  - Uses first persona from `data/personas.ts` for sample message
  - Subtle entrance animation (slide-in from right with 1s delay)
  - **Files:** `app/components/notification-preview.tsx`
  - **Skill:** `/frontend-design` — make it look like a real push notification
  - _Requirements: 1.5_

- [ ] 8. Build ProblemSection component
  - Create `app/components/problem-section.tsx` — Server Component
  - Short, relatable problem statement about manual nagging frustration
  - Humorous tone matching brand voice
  - Transitions into solution ("Let AI do the nagging for you")
  - Wrapped in ScrollAnimationWrapper (fade-up)
  - **Files:** `app/components/problem-section.tsx`
  - **Skill:** `/frontend-design`, `/clarify` — humor-driven copy
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 9. Build PersonaCard component
  - Create `app/components/persona-card.tsx` — Client Component
  - Notification-style UI for sample nag message
  - Hover (desktop) / tap (mobile) reveals alternate message with Motion animation
  - Escalation timeline: Day 1 → Day 3 → Overdue with visual tone indicators
  - `role="button"`, `aria-expanded`, keyboard accessible (Enter/Space)
  - **Files:** `app/components/persona-card.tsx`
  - **Skill:** `/frontend-design`, `/animate` — card hover micro-interactions
  - **MCP:** Context7 — Motion hover animation API
  - _Requirements: 3.2, 3.3, 3.4, 3.5_

- [ ] 10. Build PersonaShowcase component
  - Create `app/components/persona-showcase.tsx` — Client Component
  - Section heading ("Pick Your Nagger" or similar)
  - Renders 3 PersonaCard components from persona data
  - Layout: 3 columns desktop, 2 columns tablet, 1 column mobile
  - Wrapped in ScrollAnimationWrapper (staggered fade-up)
  - **Files:** `app/components/persona-showcase.tsx`
  - **Skill:** `/frontend-design`
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 11. Build HowItWorks component
  - Create `app/components/how-it-works.tsx` — Server Component
  - 3 steps: (1) Assign a task, (2) Pick a persona, (3) They get nagged
  - Icons or emoji illustrations per step
  - Visual connectors (arrows/line) between steps
  - Horizontal flow (desktop), 2 columns (tablet), vertical stack (mobile)
  - Wrapped in ScrollAnimationWrapper
  - **Files:** `app/components/how-it-works.tsx`
  - **Skill:** `/frontend-design`
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 12. Build BenefitsSection component
  - Create `app/components/benefits-section.tsx` — Server Component
  - 2-3 early access benefits (e.g., "First to pick your persona", "Free forever tier")
  - Live waitlist counter (passed as prop)
  - Scarcity message ("Early access for the first 1,000 users")
  - Wrapped in ScrollAnimationWrapper
  - **Files:** `app/components/benefits-section.tsx`
  - **Skill:** `/frontend-design`, `/clarify` — urgency-driven copy
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 13. Build FinalCTA component
  - Create `app/components/final-cta.tsx` — Server Component
  - Different headline than hero (e.g., "Don't make us send Grandma after you")
  - Wraps WaitlistForm with `variant="footer"`
  - **Files:** `app/components/final-cta.tsx`
  - **Skill:** `/frontend-design`, `/clarify`
  - _Requirements: 6.1, 6.2, 6.3_

### Phase 3: Form & Backend

- [ ] 14. Set up Supabase client and waitlist table
  - Install `@supabase/supabase-js`
  - Create `app/lib/supabase.ts` — initialize anon client + service role client (for API routes)
  - Set up `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
  - Document the SQL for the `waitlist` table + `signup_waitlist` RPC function (to run manually in Supabase dashboard)
  - **Files:** `app/lib/supabase.ts`, `.env.local`, `.env.example`, `supabase/schema.sql`
  - **MCP:** Context7 — Supabase JS client v2 initialization in Next.js
  - _Requirements: 7.1, NFR Security_

- [ ] 15. Create referral code generation utility
  - Create `app/lib/referral.ts`
  - Function: `generateReferralCode()` → 8-char alphanumeric via `crypto.randomBytes`
  - Function: `buildReferralUrl(code: string, origin: string)` → full URL with `?ref=` param
  - **Files:** `app/lib/referral.ts`
  - _Requirements: 7.1, 8.4_

- [ ] 16. Create rate limiting utility
  - Install `@upstash/ratelimit` and `@upstash/redis`
  - Create `app/lib/rate-limit.ts` — sliding window, 5 requests per IP per hour
  - Set up `.env.local` with `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
  - **Files:** `app/lib/rate-limit.ts`, update `.env.local` and `.env.example`
  - **MCP:** Context7 — Upstash rate limiting with Next.js
  - _Requirements: NFR Security (rate limiting)_

- [ ] 17. Build POST /api/waitlist route
  - Create `app/api/waitlist/route.ts`
  - Validate email (server-side regex), sanitize (trim, lowercase)
  - Check rate limit
  - Generate referral code
  - Call Supabase RPC `signup_waitlist` (handles position + duplicate + referral tracking atomically)
  - Send confirmation email via Resend (async, non-blocking)
  - Return `WaitlistResponse` (position, referral code, referral URL, isDuplicate)
  - **Files:** `app/api/waitlist/route.ts`
  - **MCP:** Context7 — Next.js 15 Route Handlers, Supabase RPC calls
  - _Requirements: 7.1, 7.3, 7.4, 7.5, 8.4, 8.5_

- [ ] 18. Build GET /api/waitlist/count route
  - Create `app/api/waitlist/count/route.ts`
  - Query Supabase `SELECT count(*) FROM waitlist` via service role client
  - Return count with `Cache-Control: s-maxage=60, stale-while-revalidate=120`
  - **Files:** `app/api/waitlist/count/route.ts`
  - _Requirements: 1.4, 5.2_

- [ ] 19. Build WaitlistForm client component
  - Create `app/components/waitlist-form.tsx` — Client Component
  - Props: `variant` ("hero" | "footer"), `waitlistCount`, `referralCode?`
  - States: idle, loading, success, error, duplicate
  - Email validation on blur with `aria-invalid` and `aria-describedby`
  - Submit via `fetch` to `POST /api/waitlist`
  - `aria-live="polite"` region for status messages
  - Focus management: move focus to success heading or error message after submit
  - Loading state: disabled input + spinner, prevents double submit
  - **Files:** `app/components/waitlist-form.tsx`
  - **Skill:** `/frontend-design`, `/harden` — robust form with all edge cases
  - **MCP:** Context7 — shadcn/ui Input and Button component API
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 20. Build SuccessState component
  - Create `app/components/success-state.tsx` — Client Component
  - Displays: waitlist position, referral link, share buttons (Twitter/X, WhatsApp, iMessage, Copy Link)
  - Pre-written share message with referral URL
  - Copy-link button with "Copied!" feedback
  - Focus on heading on mount for accessibility
  - **Files:** `app/components/success-state.tsx`
  - **Skill:** `/frontend-design`
  - _Requirements: 8.1, 8.2, 8.3_

### Phase 4: Email

- [ ] 21. Set up Resend and build confirmation email template
  - Install `resend` and `@react-email/components`
  - Create `app/lib/email.ts` — `sendWaitlistConfirmation(props: WaitlistEmailProps)` function
  - Create `app/emails/waitlist-confirmation.tsx` — React Email template
  - Email contains: position badge, referral link, "what happens next", share CTA
  - Brand-consistent styling (Space Grotesk headings, orange accent, dark background)
  - Set up `.env.local` with `RESEND_API_KEY`
  - **Files:** `app/lib/email.ts`, `app/emails/waitlist-confirmation.tsx`, update `.env.local` and `.env.example`
  - **MCP:** Context7 — Resend SDK and React Email component API
  - **Skill:** `/frontend-design` — email template design
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

### Phase 5: Mobile & Navigation

- [ ] 22. Build StickyMobileCTA component
  - Create `app/components/sticky-mobile-cta.tsx` — Client Component
  - Fixed bottom bar on mobile (< 768px) with "Get Early Access" button
  - Uses IntersectionObserver: appears when hero exits viewport, hides when FinalCTA enters viewport
  - Smooth slide-up/slide-down animation
  - 44px minimum touch target
  - **Files:** `app/components/sticky-mobile-cta.tsx`
  - **Skill:** `/adapt` — responsive behavior
  - _Requirements: 10.2_

- [ ] 23. Build GrainOverlay component
  - Create `app/components/grain-overlay.tsx` — Server Component
  - CSS-only noise texture via inline SVG filter
  - `pointer-events: none`, `position: fixed`, covers full viewport
  - Subtle opacity (0.03-0.05)
  - **Files:** `app/components/grain-overlay.tsx`
  - _Requirements: 11.3_

### Phase 6: Assemble Page

- [ ] 24. Assemble full page in app/page.tsx
  - Import all section components
  - Read `searchParams.ref` for referral code, pass to WaitlistForm instances
  - Fetch initial waitlist count (with revalidation)
  - Compose sections in scroll funnel order: Hero → Problem → Personas → How It Works → Benefits → Final CTA
  - Add GrainOverlay and StickyMobileCTA
  - **Files:** `app/page.tsx`
  - **MCP:** Context7 — Next.js 15 page component with searchParams
  - **Skill:** `/vercel-react-best-practices` — ensure optimal component patterns
  - _Requirements: All (page assembly)_

- [ ] 25. Configure SEO metadata and OG image
  - Add full `Metadata` export in `app/layout.tsx` (title, description, OG tags, Twitter Card)
  - Create a static placeholder `public/og-image.png` (1200x630) — can be a simple branded image or placeholder; real OG image can be designed later
  - Add canonical URL placeholder
  - **Files:** `app/layout.tsx`, `public/og-image.png`
  - **MCP:** Context7 — Next.js 15 Metadata API
  - _Requirements: 12.1, 12.2, 12.3_

### Phase 7: Analytics

- [ ] 26. Set up Vercel Analytics, event helpers, and scroll tracker
  - Install `@vercel/analytics`
  - Add `<Analytics />` component in `app/layout.tsx`
  - Create `app/lib/analytics.ts` — `trackEvent()` wrapper with typed `AnalyticsEvent` union
  - Create `app/components/scroll-tracker.tsx` — Client Component with IntersectionObserver sentinels at 25/50/75/100% page depth
  - **Files:** `app/lib/analytics.ts`, `app/components/scroll-tracker.tsx`, update `app/layout.tsx`
  - **MCP:** Context7 — Vercel Analytics custom events API
  - _Requirements: 13.1, 13.2, 13.5_

- [ ] 27. Wire analytics events into form and share components
  - Add signup tracking event in WaitlistForm on successful submit (with referral source attribution)
  - Add share button click tracking in SuccessState (by platform: twitter, whatsapp, imessage, copy_link)
  - Add ScrollTracker to page.tsx
  - **Files:** update `app/components/waitlist-form.tsx`, update `app/components/success-state.tsx`, update `app/page.tsx`
  - _Requirements: 13.3, 13.4_

### Phase 8: Testing & Polish

- [ ] 28. Write E2E tests with Playwright
  - Install and configure Playwright
  - Test: full signup flow (desktop + mobile viewports)
  - Test: form validation states (invalid email, duplicate, server error)
  - Test: persona card interactions (hover/tap)
  - Test: sticky mobile CTA visibility behavior
  - Test: share button URL generation
  - Test: keyboard navigation through all interactive elements
  - **Files:** `e2e/waitlist.spec.ts`, `playwright.config.ts`
  - **MCP:** Playwright MCP for browser automation
  - _Requirements: All (validation)_

- [ ] 29. Responsive design pass
  - Test all breakpoints: mobile (375px), tablet (768px), desktop (1280px)
  - Verify: single-column mobile, two-column tablet, three-column desktop for persona cards
  - Verify: sticky CTA behavior on mobile
  - Verify: 44px touch targets, 16px+ body text on mobile
  - Fix any layout issues
  - **Files:** All component files as needed
  - **Skill:** `/adapt` — systematic responsive review
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 30. Accessibility audit
  - Run accessibility checks across all components
  - Verify: color contrast ratios match design spec
  - Verify: keyboard navigation order is logical
  - Verify: ARIA attributes on form (aria-live, aria-invalid, aria-describedby)
  - Verify: screen reader announcements on form submit/error
  - Verify: prefers-reduced-motion disables all animations
  - Fix any issues found
  - **Files:** All component files as needed
  - **Skill:** `/audit`, `/web-design-guidelines` — comprehensive a11y + UX review
  - _Requirements: NFR Usability, 11.4_

- [ ] 31. Final polish and performance check
  - Run Lighthouse audit — target 90+ performance score
  - Verify: page loads under 3s on throttled 3G
  - Check: client JS bundle is minimal (Server Components for static content)
  - Check: fonts loaded via next/font (no render-blocking)
  - Check: all visual details are consistent and polished
  - Fix any issues found
  - **Files:** All files as needed
  - **Skill:** `/polish` — final alignment, spacing, consistency pass
  - **Skill:** `/optimize` — performance fixes if needed
  - _Requirements: NFR Performance, 11.1-11.5_
