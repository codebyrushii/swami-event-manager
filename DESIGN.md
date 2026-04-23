# Design Brief

## Direction

Swami Event Manager — mobile-first booking & management platform for Sound & Lighting rental with confident, event-industry boldness and real-time availability.

## Tone

High-energy, professional, purposeful — event-industry confidence without generic SaaS aesthetics. Typeform-style step-by-step forms with smooth motion choreography.

## Differentiation

Multi-step booking UX with card-based dashboards and vivid electric blue primary accent that signals real-time event management. Amber warmth reflects rented equipment value.

## Color Palette

| Token        | OKLCH       | Role                                  |
|--------------|-------------|---------------------------------------|
| background   | 0.98 0.008 230 | Light mode: cool cream; Dark: deep charcoal |
| foreground   | 0.18 0.015 230 | Text: cool-toned, high contrast       |
| card         | 1.0 0.004 230  | Surface: float above background       |
| primary      | 0.48 0.22 265  | Electric blue: event-energy CTAs     |
| accent       | 0.58 0.18 55   | Deep amber: premium equipment warmth |
| muted        | 0.94 0.01 230  | Subtle: disabled, secondary labels    |
| destructive  | 0.55 0.22 25   | Red: cancellations, errors            |

## Typography

- Display: Space Grotesk — sharp, modern, high-confidence headings
- Body: DM Sans — clean, friendly, readable at small sizes
- Mono: Geist Mono — equipment codes, timestamps
- Scale: hero `text-5xl md:text-7xl`, h1 `text-3xl md:text-5xl`, label `text-sm uppercase`, body `text-base`

## Elevation & Depth

Four-level shadow hierarchy: card (subtle elevated), popover (soft focus), destructive (alert prominence). Backgrounds use layer depth via OKLCH lightness variation.

## Structural Zones

| Zone    | Background     | Border            | Notes                            |
|---------|----------------|-------------------|----------------------------------|
| Header  | card + shadow  | subtle bottom     | Navigation, logo, profile access |
| Content | background    | —                 | Alternating card/section layout  |
| Footer  | muted/40       | subtle top        | Legal, support, company links    |
| Modal   | popover/90 bg  | floating shadow   | Booking forms, confirmations     |

## Spacing & Rhythm

Mobile-first: 16px base spacing, 8px micro-spacing. Section gaps 32px. Cards 16px padding. Grid density 12px gutter on mobile, 16px desktop. Breathing room in list items (12px vertical).

## Component Patterns

- Buttons: Primary (electric blue solid), Secondary (muted outline), Destructive (red). Rounded 8px, 12px padding. Hover: 5% lighter.
- Cards: Rounded 12px, card-bg, shadow-card. Hover: slide-up 4px. Booking steps: card-based, full-width mobile.
- Badges: Availability (emerald), Pending (amber), Booked (primary), Maintenance (orange).

## Motion

- Entrance: Fade-in 0.3s, slide-up 8px stagger for list items.
- Hover: Button glow subtle, card elevation shift. Typeform steps: smooth fade+slide transition.
- Decorative: Pulse-ring on active booking (primary color), gentle breathing on form focus.

## Constraints

- No rainbow palettes — max 5 colors (primary, accent, success, warning, destructive).
- No generic AI gradients — color confidence via OKLCH saturation & hue, not alpha blending.
- Android mobile priority: touch targets 44px min, full-width cards on sm screens.

## Signature Detail

Typeform-style multi-step booking form with electric blue accent pulse on active step — event-industry boldness meets SaaS polish.
