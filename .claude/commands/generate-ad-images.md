# Generate Ad Images Command

Generate ad images for The Nagging Partner using Gemini AI image generation.

## Usage
```
/generate-ad-images [type] [persona] [scenario]
```

- `type` (optional): messages, carousel, persona-card, mockup, or all (default: messages)
- `persona` (optional): any persona name from the library, or "random" to pick 3 at random (default: random)
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

## Personas

**IMPORTANT:** Read the full persona library at `docs/personas.md`. It contains 20 personas with voice descriptions and escalation examples.

**Pick 3 personas per batch.** If the user specifies a persona by name, use that one. If they say "random" or don't specify, pick 3 interesting/contrasting personas from the library. Vary your picks each batch.

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
