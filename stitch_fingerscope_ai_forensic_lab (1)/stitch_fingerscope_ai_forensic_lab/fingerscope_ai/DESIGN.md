---
name: FINGERSCOPE AI
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bcc9cd'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#869397'
  outline-variant: '#3d494c'
  surface-tint: '#4cd7f6'
  primary: '#4cd7f6'
  on-primary: '#003640'
  primary-container: '#06b6d4'
  on-primary-container: '#00424f'
  inverse-primary: '#00687a'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#ffb2b7'
  on-tertiary: '#67001b'
  tertiary-container: '#ff7f8b'
  on-tertiary-container: '#7d0023'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#acedff'
  primary-fixed-dim: '#4cd7f6'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000d'
  on-tertiary-fixed-variant: '#92002a'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  data-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  data-value:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-page: 32px
  container-padding: 24px
  stack-sm: 8px
  stack-md: 16px
---

## Brand & Style
The design system is engineered for forensic precision, embodying a "Technological Realism" aesthetic. It targets forensic analysts, investigators, and laboratory technicians who require a high-density information environment that minimizes cognitive load while maintaining a sophisticated, modern scientific feel.

The visual narrative is inspired by high-resolution optical hardware and digital microscopy. It utilizes a refined **Glassmorphism** approach—not for decorative flair, but to simulate the layering of translucent biological samples and digital overlays. The interface must feel like a precision instrument: cold, stable, and meticulously organized. Abstract ridge-line patterns and thin geometric markers serve as subtle backdrops to reinforce the subject matter of dactyloscopy without distracting from active data.

## Colors
The palette is rooted in a "Deep Space" dark mode to maximize the luminance of forensic markers and data visualizations.

- **Primary (Cyan):** Used for active forensic markers, ridge tracing, and high-priority action states.
- **Secondary (Electric Blue):** Used for secondary navigation, data classifications, and system-level feedback.
- **Tertiary (Warning Red):** Reserved strictly for "No Match" scenarios, corrupted data, or critical biometric discrepancies.
- **Neutral/Surface:** A progression of deep navies and charcols provides a low-strain environment for long-duration analysis.

Data visualization should use a monochromatic scale of the primary cyan to indicate confidence intervals, only shifting to secondary blue for comparative data sets.

## Typography
The system utilizes a dual-font approach to distinguish between narrative interface elements and technical data output.

- **Inter** is the primary typeface for all UI labels, headers, and instructional text, ensuring high legibility and a modern, professional tone.
- **JetBrains Mono** (monospaced) is used exclusively for forensic coordinates, hash values, timestamps, and confidence scores. This creates a clear visual distinction between "Interface" and "Evidence."

Avoid all-caps for body text. Use all-caps with increased letter spacing only for `data-label` roles to mimic the look of physical lab equipment labeling.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for primary forensic analysis tools to ensure that evidence images are always viewed at standardized aspect ratios.

- **Desktop:** 12-column grid with a fixed sidebar (280px) for analysis tools. Main content areas use a 24px gutter.
- **Tablet:** 8-column grid with a collapsible sidebar.
- **Spacing Rhythm:** Based on a 4px baseline. Components should generally use 16px (4 units) or 24px (6 units) of internal padding to maintain a sense of clinical cleanliness.

Critical analysis panels should occupy "locked" positions on the screen to build muscle memory for the investigator, avoiding fluid reflows that might shift the position of a biometric sample during examination.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Glassmorphism**, rather than traditional drop shadows.

- **Surface Level 0:** Background navy (#0F172A).
- **Surface Level 1 (Panels):** Charcoal (#1E293B) with a 60% opacity and a 16px backdrop blur.
- **Borders:** Panels are defined by 1px solid "Ghost Borders" (rgba(148, 163, 184, 0.1)). When a panel is active or "in focus," the border transitions to a thin Primary Cyan (#06B6D4) line.
- **Interactive Depth:** Elements do not "lift" off the page. Instead, they "illuminate." Hovering over a card or list item should increase its background opacity and add a subtle inner glow rather than a shadow.

## Shapes
The shape language is "Soft-Technical." Elements use a consistent 4px (`rounded-sm`) radius. This provides enough softness to feel modern while maintaining the rigid, structural integrity expected of a scientific application.

- **Standard Buttons/Inputs:** 4px radius.
- **Micro-indicators:** 2px or sharp.
- **Analysis Viewports:** Sharp (0px) to maximize the visible area of the evidence being analyzed.

## Components

### Buttons & Inputs
- **Primary Action:** Solid Primary Cyan background with white text. No gradients.
- **Ghost Action:** Transparent background with 1px Cyan border.
- **Inputs:** Darker than the panel surface (#0F172A) with monospaced text input. The focus state is a 1px Primary Cyan glow.

### Forensic Cards (Analysis Panels)
Cards must feature a thin header containing the panel title in `data-label` typography and a "status dot" indicating if the data inside is verified, processing, or failed. Use background ridge-line patterns (low opacity) only in empty states.

### Status Indicators
High-contrast pill shapes.
- **Verified:** Primary Cyan text on a 10% opacity Cyan background.
- **In Progress:** Secondary Blue with a pulsing animation.
- **Anomaly:** Tertiary Red with high-contrast white text.

### Data Lists
Zebra-striping is prohibited. Use 1px subtle borders between rows. Each row should have a monospaced "Index Number" to the left for quick verbal reference during lab collaboration.

### Crosshair & Markers
Markers used on fingerprint images must be 1px thin lines. Use a "reticle" style for point-of-interest markers rather than a standard pin or cursor.