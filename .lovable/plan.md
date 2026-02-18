

## Redesign Overview Page

### Goal
Refresh the home overview page with accurate component counts, a cleaner minimalist layout inspired by the interface-design.dev reference, and a Getting Started section that links to the GitHub repo with a star CTA.

### Changes (single file: `src/pages/OverviewPage.tsx`)

### 1. Hero Section — Simplified
- Keep the promptx wordmark with accent color and version badge
- Update the subtitle to be more concise and confident
- Add two CTA buttons inspired by the reference site:
  - **Star on GitHub** (primary, links to `https://github.com/mmorerasanchez/design-system-prompt-x`, with a Star icon and external link)
  - **Explore Components** (outline/secondary, scrolls or links to the Tokens page)
- Replace the "Last updated" line with a cleaner mono-styled meta line

### 2. Stats Row — Updated Counts
Update all counters to reflect the actual current inventory:

| Label | Old Count | New Count |
|-------|-----------|-----------|
| Design Tokens | 60+ | 90+ |
| Atoms | 16 | 7 |
| Molecules | 8 | 18 |
| Organisms | 10 | 42 |
| Templates | 8 | 7 |

Add a sixth stat: **UI Primitives: 48** (shadcn/ui base components). Update descriptions to match actual component names.

### 3. Explore Navigation — Keep, Polish
- Keep the 6-card grid (Tokens, Atoms, Molecules, Organisms, Templates, Pages)
- Update descriptions to be more accurate based on actual components
- No structural changes needed; the card style is already clean

### 4. Design Principles — Keep As-Is
- The 7 principles are accurate and well-written; no changes needed

### 5. Getting Started — Full Rewrite
Replace the current generic instructions with a GitHub-focused section:
- Add the repo URL prominently in a copyable code block: `git clone https://github.com/mmorerasanchez/design-system-prompt-x.git`
- Include install + dev commands: `npm install` then `npm run dev`
- Add a "Star on GitHub" CTA button (matching the hero style)
- Keep the 4 usage rules (copy config, screenshot components, follow tokens, respect fonts) but make them more concise
- Add a note about AI usage referencing `CLAUDE.md` and `docs/ai-usage.md`

### 6. Removed Elements
- Remove `<Separator />` dividers between sections (the reference site uses whitespace-only separation, which is cleaner)

### Technical Details

**File modified:** `src/pages/OverviewPage.tsx`

**New imports:** `Star`, `ExternalLink`, `Github`, `Terminal` from lucide-react

**No new components or dependencies required.** All changes are data updates and JSX restructuring within the existing page.

