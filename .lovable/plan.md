

## prompt-x Design System Foundation

### Step 1: Configure `index.css`
Set up all CSS custom properties from the spec in `:root` (dark theme as default):
- Core shadcn tokens: background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring — all with `-foreground` variants
- Custom tokens: `--surface`, `--foreground-muted`, `--foreground-subtle`
- Semantic feedback triplets: success, warning, error, info — each with `-bg` and `-border` variants
- 9 anatomy field colors (`--anatomy-role` through `--anatomy-tools`)
- 4 platform colors and 4 status colors
- Layout variables (header height, sidebar widths, z-index scale)
- Motion/animation variables
- `--radius: 0.5rem`
- `.light` and `.warm` theme overrides
- `prefers-reduced-motion` media query
- Google Fonts imports (Plus Jakarta Sans, JetBrains Mono, Satoshi via Fontshare)

### Step 2: Configure `tailwind.config.ts`
- Add `font-display`, `font-body`, `font-mono` font families
- Custom fontSize scale (2xs through 3xl with line-heights)
- Extended colors: surface, success, warning, error, info (with bg/border), anatomy (9 fields), platform (4), status (4)
- Custom spacing tokens (header, sidebar, sidebar-collapsed, right-panel)
- Custom z-index scale
- Custom keyframes and animations (ai-pulse, ai-cursor, slide-in-right, bulk-bar-in)
- Ensure Google Fonts are loaded in `index.html`

### Step 3: Create folder structure
Create empty directories with barrel `index.ts` files:
- `src/components/atoms/`
- `src/components/molecules/`
- `src/components/organisms/`
- `src/components/templates/`

### Step 4: Showcase layout
- Sidebar navigation listing: Tokens, Atoms, Molecules, Organisms, Templates, Pages
- Collapsible sidebar using the shadcn Sidebar component (240px expanded, 64px collapsed)
- Header with "prompt-x" branding and a theme toggle (Dark / Light / Warm)
- Main content area with max-w-5xl and comfortable reading padding
- Mobile: sidebar becomes overlay drawer with hamburger trigger
- Route `/` redirects to `/tokens`
- All styling uses our design tokens — this layout validates the token configuration

### Step 5: Tokens showcase page (`/tokens`)
A beautiful, comprehensive documentation page with live visual swatches:

**Colors section:**
- Grouped swatch cards: Primary/Accent, Secondary/Surface, Semantic (success/warning/error/info), Neutral scale, Anatomy fields (9 colors), Platform colors (4), Status colors (4)
- Each swatch shows: color preview rectangle, token name, HSL value, HEX value, Tailwind class
- Theme-aware: swatches update when switching Dark/Light/Warm

**Typography section:**
- Render each type level (Display, H1–H4, Body, Body Small, Caption, Overline, Metadata, KPI Value) using actual fonts, sizes, and weights
- Show Tailwind classes beside each specimen
- Sample paragraph demonstrating readability
- Font family showcase (display, body, mono)

**Spacing section:**
- Horizontal bars visualizing the spacing scale (4px–64px)
- Each bar labeled with pixel value and Tailwind class

**Border Radius section:**
- Row of boxes each demonstrating a radius token (none, sm, md, lg, xl, full)

**Shadows section:**
- Row of cards each demonstrating a shadow level (none, sm, md, lg, xl)

**Breakpoints section:**
- Table of breakpoint names, min-widths, and Tailwind prefixes
- Live "current viewport width" indicator

