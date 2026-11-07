---
name: Corporate Tech Glass Skyline
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#44474e'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#495f82'
  primary: '#001026'
  on-primary: '#ffffff'
  primary-container: '#0b2545'
  on-primary-container: '#778db2'
  inverse-primary: '#b1c7f0'
  secondary: '#2559bd'
  on-secondary: '#ffffff'
  secondary-container: '#6c98ff'
  on-secondary-container: '#002f76'
  tertiary: '#001218'
  on-tertiary: '#ffffff'
  tertiary-container: '#002933'
  on-tertiary-container: '#0099b8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#b1c7f0'
  on-primary-fixed: '#001c3b'
  on-primary-fixed-variant: '#314769'
  secondary-fixed: '#dae2ff'
  secondary-fixed-dim: '#b1c5ff'
  on-secondary-fixed: '#001946'
  on-secondary-fixed-variant: '#00419e'
  tertiary-fixed: '#b3ebff'
  tertiary-fixed-dim: '#4cd6fb'
  on-tertiary-fixed: '#001f27'
  on-tertiary-fixed-variant: '#004e5f'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
  navy-deep: '#0B2545'
  navy-midnight: '#0D3B66'
  royal-blue: '#0047AB'
  royal-vibrant: '#0066FF'
  sky-cyan: '#00B4D8'
  sky-tint: '#E0F2FE'
  sky-subtle: '#F0F9FF'
  slate-surface: '#F8FAFC'
  slate-border: '#E2E8F0'
  text-dark: '#0F172A'
  text-muted: '#64748B'
  white-pure: '#FFFFFF'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.025em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
---

## Brand & Style

This design system establishes a high-trust, elite enterprise digital presence inspired by modern glass-facade skyscraper architecture, ambient daylight, and precise engineering. Built to convey stability, innovation, and partnership ("Grow Together" / "Building a Better Future Together"), the visual aesthetic pairs corporate gravitas with clean digital-first ergonomics.

The overall style integrates **Corporate Modern** with refined **Glassmorphism**:
- Primary structural planes use pristine white backgrounds accented with atmospheric slate and cyan-tinted fills.
- Glassmorphic overlays (floating navigational headers, high-elevation modals, floating action indicators) utilize high-translucency white substrates (`rgba(255, 255, 255, 0.85)`) coupled with multi-layered specular borders and soft optical blurs (`backdrop-filter: blur(16px)`).
- Visual assets emphasize high-resolution architectural glass structures, vibrant daylight sky tones, crisp geometric angles, and clean circular icon badges.
- Interactions are confident, swift, and friction-free, reflecting institutional excellence and technical modernity.

## Colors

The color palette centers on a disciplined continuum of blues—from commanding deep oceanic navies to electric cobalt active points and buoyant atmospheric cyans:

- **Primary (`#0B2545` / Deep Navy):** Represents authority, solid enterprise foundations, and institutional governance. Applied across primary buttons, hero display text, and high-impact baseline structural bars.
- **Secondary (`#0047AB` / Royal Blue):** Provides purposeful kinetic energy. Reserved for focal interaction points, link hovers, active navigation markers, and linear gradient transitions toward `#0066FF`.
- **Tertiary (`#00B4D8` / Sky Cyan):** Acts as an illuminated accent, applied to status tags, category badges, subtle gradient terminal points, and luminous highlights over deep navy fills.
- **Neutral (`#0F172A` / Slate Midnight):** Provides the foundational contrast for high-legibility typography, accompanied by `#64748B` for secondary explanatory copy and metadata.
- **Surfaces & Backgrounds:** The base canvas is `#FFFFFF`, interspersed with alternating architectural bands of `#F8FAFC` and soft `#E0F2FE` sky tints to maintain contrast without harsh demarcations.

## Typography

The typography strategy leverages **Plus Jakarta Sans** for structural display, headlines, and interaction tokens, paired with **Inter** for clean editorial prose and tabular data:

- **Plus Jakarta Sans (Headings & Labels):** Delivers clean geometric forms with humanist terminals, evoking technological optimism and corporate presence. Tight letter-spacing on headline tiers (-0.01em to -0.025em) creates a commanding editorial rhythm.
- **Inter (Body Copy):** Maximizes readability at 14px–18px scales across modern desktop monitors and mobile touchscreens. Line heights are calibrated generously (1.6x) to avoid visual fatigue in content-heavy enterprise case studies.
- **Responsive Handling:** Desktop hero titles (`48px`) step down dynamically to `34px` on mobile screens to preserve line wraps without horizontal overflow. Section titles scale down from `36px` to `28px`.

## Layout & Spacing

The layout is built upon an 8pt architectural rhythm structured across an adaptive 12-column grid:

- **Desktop (1200px+):** 12-column configuration constrained to a max-width container of `1280px` (or `1440px` for wide canvas banners). Columns are spaced with `gutter: 1.5rem` (24px) and page boundaries with `margin: 2rem` (32px). Section vertical padding uses `space-2xl` (64px) to `space-3xl` (96px) to provide ample breathing room reminiscent of modern open-plan architecture.
- **Tablet (768px – 1023px):** 8-column layout with 20px gutters and 24px margins. Asymmetric split layouts (e.g., visual thumbnail left, descriptive copy right) preserve balanced proportions before stacking.
- **Mobile (< 768px):** 4-column layout with `gutter-mobile: 1rem` (16px) and `margin-mobile: 1.25rem` (20px). Horizontal cards, split value propositions, and leadership grids reflow gracefully into single-column vertical stacks.

## Elevation & Depth

Visual depth combines subtle tinted ambient shadows with structural glassmorphism to reflect corporate transparency and high-tech sophistication:

- **Base Level (Canvas):** Pure `#FFFFFF` and `#F8FAFC`. Zero elevation, grounded with hairline separators (`1px solid #E2E8F0`).
- **Surface Elevation (Cards & Containers):** Flat white surfaces suspended over slate planes using diffuse cool shadows: `box-shadow: 0 4px 20px -2px rgba(11, 37, 69, 0.06), 0 2px 6px -1px rgba(11, 37, 69, 0.04)`. Card borders feature a soft outline in `rgba(226, 232, 240, 0.8)`.
- **Hover & Active Elevation:** Interactive service cards translate `translateY(-4px)` with an expanded shadow envelope: `box-shadow: 0 20px 30px -10px rgba(0, 71, 171, 0.12), 0 8px 12px -4px rgba(11, 37, 69, 0.04)`.
- **Glassmorphic Floating Tier (Navbars & Popovers):** Translucent white base `rgba(255, 255, 255, 0.88)` with `backdrop-filter: blur(16px)`, secured by an internal border `1px solid rgba(255, 255, 255, 0.6)` and an outer drop shadow `0 10px 25px -5px rgba(15, 23, 42, 0.08)`.

## Shapes

The design system incorporates **Pill-shaped (Level 3)** geometry to provide contrast against rectangular architectural photography:

- **Buttons & Interactive Tags:** Formatted as full pills (`border-radius: 9999px`) for CTA buttons ("Get in Touch", "Explore More →", "Kunjungi Website Kami"), category filter pills, and navigation highlights. This ensures key actions remain instantly recognizable against rectilinear layouts.
- **Icon Badges & Avatars:** Circular enclosures (`border-radius: 50%`) with dark navy or cyan fills to elevate icon markers.
- **Cards & Content Surfaces:** Use `rounded-lg` (2rem / 32px) or standard `rounded` (1rem / 16px) corner radiuses on white surfaces, creating a polished, approachable corporate aesthetic without sharp edges.
- **Inputs & Search Bars:** Rounded pill structures with generous interior padding to maintain tactile consistency with primary interactive buttons.

## Components

### Buttons
- **Primary Pill:** Background `#0B2545`, text `#FFFFFF`, font `label-md`. Padding `12px 28px`. Hover shifts to `#0047AB` with micro-scale `translateY(-1px)`. Contains rightward directional arrows (`→`) for action flows.
- **Accent / Electric Pill:** Background `linear-gradient(135deg, #0047AB 0%, #0066FF 100%)`, text `#FFFFFF`, subtle glowing hover shadow `0 8px 20px rgba(0, 102, 255, 0.35)`.
- **Ghost / Outlined Pill:** Background transparent, border `1.5px solid #0B2545`, text `#0B2545`. Hover fills with `#E0F2FE`.

### Navigation Bar
- Sticky, floating horizontal container with top margin `16px`. Built with pill-contoured edges or full-bleed glass bar with `backdrop-blur(16px)` and background `rgba(255, 255, 255, 0.92)`.
- Features geometric hexagon logo anchored on the left, centered menu navigation with `#0F172A` text (active item indicated by `#0047AB` text and a subtle 4px bottom dot), and a primary pill CTA on the far right.

### Value & Feature Cards
- Constructed on clean `#FFFFFF` canvases over `#F8FAFC` section bands.
- Header showcases a circular badge (48px × 48px) in `#0B2545` or light sky blue `#E0F2FE`, housing geometric icons (Globe, Chart Growth, Security Shield).
- Headings set in `headline-sm` (`#0F172A`) followed by muted supporting body text in `body-sm` (`#64748B`).

### Video Thumbnail & Media Modules
- Architectural image containers framed with `rounded-xl` (24px) corners and a fine `1px solid rgba(255, 255, 255, 0.4)` inner border.
- Centered circular Play Action button (64px diameter) with pure white fill, `#0047AB` directional arrow, and a subtle pulsing radial glow.

### Chips & Badges
- **Status & Category Pills:** Height 28px, padding `4px 14px`, `border-radius: 9999px`.
- Inactive filters use `#F1F5F9` background with `#64748B` typography; active filters switch to `#0B2545` background with pure white text.

### Form Inputs & Search Fields
- Enclosed with pill borders (`rounded-full`) or soft-radiused boxes (`12px`).
- Background `#FFFFFF`, border `1px solid #CBD5E1`. On focus: border shifts to `#0047AB` with a 3px ring of `rgba(0, 71, 171, 0.15)`. Text set in `Inter 15px`.

### Bottom Trust Bar / Corporate Value Strip
- Full-width deep navy `#0B2545` banner divided into 3 equal symmetrical columns separated by subtle vertical dividers (`rgba(255, 255, 255, 0.15)`).
- Each cell contains an outline icon (Handshake for Collaboration, Lightbulb for Innovation, People Figure for Community) paired with crisp white `label-md` text.