

# README.md Professional Upgrade

## Overview

Rewrite `README.md` to accurately reflect the live project architecture, branding ("promptx" not "prompt-x"), actual file paths, component counts, and routing structure. Remove fictional files/folders from the template and replace with the real codebase.

## Key Corrections from Template

The template contains several inaccuracies that need fixing:

1. **Brand name**: "prompt-x" should be "promptx" (no hyphen), with the "x" in accent color per branding rules
2. **Architecture tree**: Template shows fictional paths (`src/tokens/`, `src/styles/`, `src/components/layout/`, `src/components/patterns/`, `src/pages/design/`). Real structure is Atomic Design: `atoms/ molecules/ organisms/ templates/ ui/` plus `pages/`
3. **File references**: No `design-tokens.json`, no `tokens.css`, no `globals.css` — tokens live in `src/index.css` and `tailwind.config.ts`
4. **Component counts**: Real inventory is 22 atoms, 18 molecules, 52 organisms, 8 templates (from DESIGN_SYSTEM.md)
5. **Three-theme table**: Hex values in template are approximations — will use actual HSL values from `index.css`
6. **Platform badges**: Template mentions "platform-badge.tsx" with Claude/GPT/Gemini colors, but these were intentionally removed per project decision
7. **Repo URL**: Use `https://github.com/mmorerasanchez/design-system-prompt-x`
8. **Routes**: Showcase routes (`/`, `/tokens`, `/atoms`, etc.) and app routes (`/app`, `/app/library`, etc.) should be documented

## Changes

### File: `README.md` (full rewrite)

Replace entirely with corrected content including:

- **Header**: Fix brand to "promptx", update badge URLs, add correct repo URL
- **Why This Exists**: Keep as-is (well written), minor polish
- **Quick Start**: Update repo URL to actual GitHub URL
- **Architecture**: Replace fictional tree with real Atomic Design structure showing actual folders and key files
- **Design Principles**: Keep table, remove "Invisible Intelligence" (not in DESIGN_SYSTEM.md), align with actual 7 principles
- **Three-Theme Table**: Use real HSL values from `index.css` converted to hex, remove fictional accent-400/600/700 tiers (we use a single `--accent` per theme)
- **For AI Agents**: Update file references (`index.css` not `globals.css`, no `design-tokens.json`)
- **Tech Stack**: Remove "W3C DTCG" (no such file exists), keep everything else
- **Documentation table**: Fix file paths to actual files
- **Component counts**: Add summary stats from DESIGN_SYSTEM.md
- **Routes section**: Add showcase and app route tables
- **License**: MIT with correct LICENSE link
- **Author**: Keep as-is

### File: `LICENSE` (new file)

Create standard MIT license file with author "Mariano Morera Sanchez" and year 2026.

## Technical Details

- All shield.io badge URLs will use proper markdown image syntax (the template had broken badge formatting — missing `!` for image rendering)
- The architecture tree will match the actual `src/` directory structure verified via `lov-list-dir`
- Component inventory numbers sourced from `src/DESIGN_SYSTEM.md` (v2.3)
- Live demo URL: `https://design-system-prompt-x.lovable.app/`
- GitHub URL: `https://github.com/mmorerasanchez/design-system-prompt-x`

