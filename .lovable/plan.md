

## Create `docs/DESIGN_SYSTEM.md`

### What
Create a single comprehensive markdown reference document at `docs/DESIGN_SYSTEM.md` — the human-readable single source of truth for the prompt-x design system. This documents decisions, rules, and inventory rather than duplicating code.

### Structure
The file will contain all 11 sections specified in the request:

1. **Header** — Title, version, date
2. **Executive Summary** — One paragraph overview
3. **Design Principles** — 7-row table
4. **Font System** — Font families table + Font Usage Matrix (18-row table) + critical rule about provider vs model names
5. **Color System** — 6 sub-tables: Core Surfaces, Text Colors, Accent, Semantic Feedback, Anatomy Fields (9), Platform (4), Status (4)
6. **Spacing and Layout** — Base unit, spacing scale, layout dimensions, border radius
7. **Motion and Animation** — 11-row timing table + philosophy statement
8. **Component Inventory** — 4 tables by atomic layer (Atoms 22, Molecules 17, Organisms 38, Templates 7) with Name/Base/Status columns
9. **Accessibility Requirements** — 7-row table
10. **Theme System** — Brief section on 3 themes
11. **Icon Rules** — Lucide React sizes, allowed/disallowed placements
12. **Build Sequence** — Numbered implementation order
13. **Footer** — Stats line

### Technical Details
- All HSL values sourced from the actual `index.css` CSS variables
- All Tailwind classes sourced from `tailwind.config.ts`
- Component inventory reflects what exists in the codebase plus planned items from the spec
- Target length: 400-600 lines of clean markdown
- Tables use standard markdown syntax, not code blocks
- Token values use inline backticks

### Files Changed
| File | Action |
|------|--------|
| `docs/DESIGN_SYSTEM.md` | Create (new file, ~500 lines) |

No existing files are modified. This is a documentation-only change.

