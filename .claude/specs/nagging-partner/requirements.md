# Requirements Document

## Introduction

The Nagging Partner is a high-converting waitlist landing page for an upcoming app that lets users (couples, roommates, coworkers, parents) assign tasks to people they're connected with and nag them via AI-persona-driven push notifications. The landing page must validate demand with the 20-40 age demographic by communicating the concept with humor, capturing emails via Supabase, and driving viral sharing through a referral mechanic. The goal is idea validation — not a polished beta.

## Alignment with Product Vision

This is a conversion-focused validation page. Research shows optimized waitlist pages convert 20-40% of visitors (vs 6.6% median). The page must: (1) instantly communicate the funny, irreverent value prop, (2) let the personas sell themselves with sample nag messages, (3) capture emails with minimal friction, and (4) turn each signup into a referral engine. Every section exists to move visitors toward the single email field.

## Requirements

### Requirement 1: Hero Section with Inline Email Capture

**User Story:** As a visitor, I want to immediately understand what The Nagging Partner does and sign up without scrolling, so that I can join the waitlist in under 10 seconds.

#### Acceptance Criteria

1. WHEN a visitor lands on the page THEN the system SHALL display an outcome-led headline that communicates the core concept (assign tasks to people + AI personas nag them until they do it)
2. WHEN a visitor views the hero section THEN the system SHALL display a subheadline naming the target relationships (partner, roommate, coworker, kids) and the funny angle
3. WHEN a visitor views the hero section THEN the system SHALL display a single email input field with a "Get Early Access" CTA button directly in the hero (above the fold)
4. WHEN a visitor views the hero section THEN the system SHALL display a social proof element showing the current waitlist count (e.g., "Join 2,847 others")
5. WHEN a visitor views the hero section THEN the system SHALL display a visual preview of a sample nag notification from one of the personas to immediately demonstrate the product
6. WHEN a visitor views the hero section THEN the system SHALL hint at the escalating tone feature — users can opt to have personas start nice but get increasingly urgent/mean as the task deadline approaches

### Requirement 2: Problem / Pain Point Section

**User Story:** As a visitor, I want to see that the app understands my frustration with nagging people manually, so that I feel the product is built for me.

#### Acceptance Criteria

1. WHEN a visitor scrolls past the hero THEN the system SHALL display a short, relatable problem statement about the pain of reminding people to do things
2. WHEN a visitor views the problem section THEN the system SHALL frame the problem with humor consistent with the brand tone (funny/irreverent, not corporate)
3. WHEN a visitor views the problem section THEN the system SHALL transition naturally into the solution (let AI do the nagging for you)

### Requirement 3: AI Persona Showcase

**User Story:** As a visitor, I want to see the different AI nagging personas and what their messages sound like, so that I'm entertained and want to try it.

#### Acceptance Criteria

1. WHEN a visitor scrolls to the persona section THEN the system SHALL display three AI personas: Old Grandma, Drunk Irish Guy, and Military Sergeant
2. WHEN a visitor views a persona card THEN the system SHALL display the persona name, a visual/emoji representation, and a sample nagging message written in that persona's voice
3. WHEN a visitor interacts with a persona card (hover on desktop, tap on mobile) THEN the system SHALL reveal an alternate nagging message to demonstrate variety
4. WHEN a visitor views the persona section THEN the system SHALL display sample messages that feel like real push notifications (with notification UI styling)
5. WHEN a visitor views a persona card THEN the system SHALL showcase the optional escalating tone feature by displaying a message timeline (e.g., Day 1: friendly reminder → Day 3: getting impatient → Overdue: full rage mode) to demonstrate how users can choose to have personas get meaner as deadlines approach

### Requirement 4: How It Works Section

**User Story:** As a visitor, I want to understand how the app works in 3 simple steps, so that I can see the value before signing up.

#### Acceptance Criteria

1. WHEN a visitor scrolls to the "How It Works" section THEN the system SHALL display exactly 3 steps: (1) Assign a task to someone, (2) Pick a nagging persona, (3) They get nagged until it's done
2. WHEN a visitor views each step THEN the system SHALL display an icon or illustration alongside a short, punchy description
3. WHEN a visitor views the steps THEN the system SHALL visually connect them (arrows, line, or flow) to communicate sequence

### Requirement 5: Early Access Benefits + Social Proof

**User Story:** As a visitor, I want to know what I get by joining early, so that I feel urgency to sign up now rather than later.

#### Acceptance Criteria

1. WHEN a visitor scrolls to the benefits section THEN the system SHALL display at least 2 concrete early-access benefits (e.g., "First to pick your persona", "Free forever tier for early users")
2. WHEN a visitor views the section THEN the system SHALL display the live waitlist signup counter as social proof
3. WHEN a visitor views the section THEN the system SHALL communicate scarcity or exclusivity (e.g., "Early access for the first 1,000 users")

### Requirement 6: Final CTA Section

**User Story:** As a visitor who scrolled the full page, I want another chance to sign up at the bottom, so that I don't have to scroll back to the top.

#### Acceptance Criteria

1. WHEN a visitor scrolls to the bottom of the page THEN the system SHALL display a second email capture form with a stronger urgency-driven CTA
2. WHEN a visitor views the final CTA THEN the system SHALL display a different headline than the hero (e.g., "Don't make us send Grandma after you")
3. WHEN the final CTA form is submitted THEN the system SHALL behave identically to the hero form (same validation, same Supabase storage, same success state)

### Requirement 7: Waitlist Signup Form (Shared Behavior)

**User Story:** As a visitor, I want to enter only my email to join the waitlist, so that signup is frictionless.

#### Acceptance Criteria

1. WHEN a visitor enters a valid email and submits THEN the system SHALL store the email in Supabase with a generated unique referral code and waitlist position, and display a success state
2. IF a visitor enters an invalid email THEN the system SHALL display an inline validation error on blur (not on submit) without submitting
3. IF a visitor submits an email that already exists THEN the system SHALL display a friendly message ("You're already on the list!") and show their referral link
4. WHEN the form is submitted THEN the system SHALL disable the submit button and show a loading state to prevent double submissions
5. IF the Supabase connection fails THEN the system SHALL display a user-friendly error message and preserve the email input for retry

### Requirement 8: Post-Signup Success State with Referral Mechanic

**User Story:** As a new signup, I want to see my waitlist position and share my referral link, so that I can move up the list by inviting friends.

#### Acceptance Criteria

1. WHEN a visitor successfully signs up THEN the system SHALL replace the form with a success state showing their waitlist position (e.g., "You're #847")
2. WHEN a visitor views the success state THEN the system SHALL display their unique referral link and one-click share buttons for Twitter/X, WhatsApp, iMessage, and a copy-link button
3. WHEN a visitor views the success state THEN the system SHALL display a pre-written share message (e.g., "I just joined the waitlist for an app that nags your partner as a Drunk Irish Guy. Get on the list: [link]")
4. WHEN a visitor arrives via a referral link (?ref=CODE) THEN the system SHALL record the referral association in Supabase
5. WHEN a referred user signs up THEN the system SHALL update the referrer's position in the waitlist

### Requirement 9: Confirmation Email

**User Story:** As a new signup, I want to receive a confirmation email, so that I know my spot is secured and I have my referral link saved.

#### Acceptance Criteria

1. WHEN a visitor successfully signs up THEN the system SHALL send a confirmation email via Resend within 60 seconds
2. WHEN the email is delivered THEN it SHALL contain: their waitlist position, their unique referral link, what to expect next ("We'll send you an access code when we launch"), and a share CTA
3. WHEN the email is delivered THEN it SHALL be styled with a React Email template matching the landing page brand identity
4. IF the email fails to send THEN the system SHALL NOT block the signup success state (email is best-effort)

### Requirement 10: Responsive Mobile-First Design

**User Story:** As a mobile user (83% of waitlist traffic), I want the landing page to look and work perfectly on my phone.

#### Acceptance Criteria

1. WHEN a visitor views the page on mobile (< 768px) THEN the system SHALL display a single-column layout with minimum 44px touch targets, readable text (16px+ body), and no horizontal scrolling
2. WHEN a visitor views the page on mobile THEN the system SHALL display a sticky CTA button at the bottom of the viewport after scrolling past the hero
3. WHEN a visitor views the page on tablet (768px-1024px) THEN the system SHALL display a two-column layout for persona cards and steps
4. WHEN a visitor views the page on desktop (> 1024px) THEN the system SHALL display a max-width container (1200px) with balanced whitespace and three-column persona cards

### Requirement 11: Brand Identity and Visual Design

**User Story:** As a visitor, I want the page to feel fun, bold, and unlike anything AI-generated, so that the brand is memorable.

#### Acceptance Criteria

1. WHEN a visitor views the page THEN the system SHALL use Space Grotesk (or equivalent bold, quirky font) for headlines and a clean sans-serif for body text via next/font
2. WHEN a visitor views the page THEN the system SHALL use a consistent color palette with one saturated accent color against a neutral/dark base
3. WHEN a visitor views the page THEN the system SHALL incorporate subtle grain/noise texture on backgrounds to avoid a sterile, AI-generated aesthetic
4. WHEN a visitor views the page THEN the system SHALL use scroll-triggered entrance animations (fade-up, slide-in) via Motion (Framer Motion) for section reveals
5. WHEN a visitor views the page THEN the system SHALL use micro-interactions on interactive elements (persona card hovers, button press effects, form focus states)

### Requirement 12: SEO and Social Sharing

**User Story:** As a potential visitor discovering the page via search or social media, I want to see a compelling preview so that I click through.

#### Acceptance Criteria

1. WHEN a search engine crawls the page THEN the system SHALL serve proper meta title, description, and canonical URL
2. WHEN the page URL is shared on social media THEN the system SHALL display Open Graph tags with a custom preview image, title, and description
3. WHEN the page URL is shared on Twitter/X THEN the system SHALL display a Twitter Card with large image summary

### Requirement 13: Analytics and Conversion Tracking

**User Story:** As the product owner, I want to track how visitors interact with the landing page, so that I can measure demand and optimize conversion.

#### Acceptance Criteria

1. WHEN a visitor loads the page THEN the system SHALL track the page view event
2. WHEN a visitor scrolls past each section THEN the system SHALL track scroll depth milestones (25%, 50%, 75%, 100%)
3. WHEN a visitor submits the waitlist form THEN the system SHALL track the signup conversion event with referral source attribution
4. WHEN a visitor clicks a share button on the success state THEN the system SHALL track the share event by platform (Twitter, WhatsApp, iMessage, copy-link)
5. WHEN the product owner views analytics THEN the system SHALL provide data via a lightweight, privacy-respecting analytics tool (e.g., Vercel Analytics or Plausible)

## Non-Functional Requirements

### Performance
- Page load time under 3 seconds on 3G connection
- Lighthouse performance score of 90+
- Minimal client-side JavaScript — Server Components for all static content, client components only for the email form and animations
- Images optimized via next/image with WebP/AVIF auto-format
- Fonts loaded via next/font to eliminate render-blocking requests

### Security
- Email input sanitized before storage
- Supabase Row Level Security enabled on the waitlist table (anonymous insert-only policy)
- Referral codes generated server-side (not guessable)
- No sensitive data (Supabase keys beyond anon key) exposed in client-side code
- Rate limiting on form submissions (max 5 signups per IP per hour) to prevent spam
- HTTPS enforced via Vercel

### Reliability
- Graceful degradation if Supabase is unreachable (error message, not broken page)
- Form state preserved if submission fails (email not cleared)
- Email sending is best-effort — signup succeeds even if Resend fails
- Waitlist counter falls back gracefully if count query fails

### Usability
- WCAG 2.1 AA compliant (color contrast ratios, keyboard navigation, screen reader announcements on form submit/error)
- Clear focus states on all interactive elements
- Form validation on blur with immediate, helpful feedback
- All animations respect prefers-reduced-motion
