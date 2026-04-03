# Generate Ad Video Command

Generate short video ads for The Nagging Partner using Gemini Veo video generation.

## Usage
```
/generate-ad-video [type] [persona]
```

- `type` (optional): notification, skit, testimonial (default: notification)
- `persona` (optional): any persona name from the library, or "random" (default: random)

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

## Personas

**IMPORTANT:** Read the full persona library at `docs/personas.md`. It contains 20 personas with voice descriptions and escalation examples.

**Pick 1 persona per video.** If the user specifies a persona, use that one. If "random," pick one that's visually/comedically interesting for video format.

**The escalation examples in the persona file are just tone samples — never copy them verbatim.** Write fresh, original dialogue for every video.

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
