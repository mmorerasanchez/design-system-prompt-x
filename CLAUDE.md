# CLAUDE.md — AI Agent Context

> This file is auto-read by AI coding agents (Claude Code, Cursor, Windsurf, etc.)
> working on the **prompt-x** design system. It provides essential project context
> to produce consistent, on-system code from the first generation.

---

## Architecture — Atomic Design

The component library follows **Atomic Design** methodology with five levels:

| Level | Directory | Description | Examples |
|---|---|---|---|
| **Atoms** | `src/components/atoms/` | Smallest building blocks — single-purpose, no child components | `Heading`, `Tag`, `Spinner`, `Code`, `Kbd`, `Link`, `Text` |
| **Molecules** | `src/components/molecules/` | Compositions of 2+ atoms | `FormField`, `SearchBar`, `StatCard`, `TokenCounter`, `TabNav`, `EmptyState` |
| **Organisms** | `src/components/organisms/` | Major UI sections, may include molecules | `TopBar`, `DataTable`, `PromptCard`, `FilterBar`, `DashboardStats`, `VersionTimeline` |
| **Templates** | `src/components/templates/` | Page layout shells — no business logic | `AppShell`, `EditorLayout`, `LibraryLayout`, `DetailLayout`, `DashboardLayout` |
| **Pages** | `src/pages/` | Route-level components that compose templates + organisms | `DashboardPage`, `LibraryPage`, `PromptEditorPage`, `SettingsPage` |

**UI Primitives** (`src/components/ui/`) are shadcn/ui components — extend via CVA variants, never modify directly.

Each level has a barrel `index.ts` for re-exports. One component per file, PascalCase filenames.

---

## Design Tokens

### Spacing

Base unit: **4px**. Use Tailwind spacing utilities mapped to this grid:

| Token | Value |
|---|---|
| `1` | 4px |
| `2` | 8px |
| `3` | 12px |
| `4` | 16px |
| `6` | 24px |
| `8` | 32px |
| `12` | 48px |
| `16` | 64px |

Layout-specific tokens: `--header-height: 3.5rem`, `--sidebar-width: 15rem`, `--sidebar-collapsed: 4rem`, `--right-panel: 22rem`.

### Border Radius

Based on `--radius: 0.75rem` (12px):

| Class | Computed | Pixels |
|---|---|---|
| `rounded-sm` | `calc(var(--radius) - 8px)` | ~4px |
| `rounded-md` | `calc(var(--radius) - 4px)` | ~8px |
| `rounded-lg` | `var(--radius)` | 12px |
| `rounded-full` | `9999px` | pill |

### Colors

All colors are defined as CSS custom properties in HSL (without `hsl()` wrapper) in `src/index.css` and mapped in `tailwind.config.ts`. Three themes: **Dark** (`:root`), **Light** (`.light`), **Warm** (`.warm`).

**Core surfaces** (3-layer hierarchy):
- `--background` → page background (darkest in dark mode)
- `--surface` → panels, sidebars, headers
- `--card` → cards, dialogs, elevated content

**Text**: `--foreground`, `--muted-foreground`, `--foreground-subtle`, `--accent`

**Accent**: `--accent` (terracotta orange), `--accent-muted`, `--accent-subtle`

**Semantic**: `--success`, `--warning`, `--error`, `--info` (each with `-bg` and `-border` variants)

**Anatomy fields** (9 prompt sections): `--anatomy-role`, `--anatomy-tone`, `--anatomy-context`, `--anatomy-task`, `--anatomy-reasoning`, `--anatomy-examples`, `--anatomy-output`, `--anatomy-constraints`, `--anatomy-tools`

**Status lifecycle**: `--status-draft`, `--status-testing`, `--status-production`, `--status-archived`

> **Never hardcode hex/rgb values.** Always use semantic token classes like `bg-surface`, `text-accent`, `border-border`.

### Typography

Three font families — each with a mandatory purpose:

| Family | Class | Font | Use for |
|---|---|---|---|
| Display | `font-display` | Plus Jakarta Sans | Headings, labels, buttons |
| Body | `font-body` | Satoshi | Body text, descriptions |
| Mono | `font-mono` | JetBrains Mono | Data, code, prompts, user content |

Size scale defined in `tailwind.config.ts`:

| Class | Size | Line Height |
|---|---|---|
| `text-2xs` | 10px | 1.4 |
| `text-xs` | 12px | 1.4 |
| `text-sm` | 13px | 1.5 |
| `text-base` | 14px | 1.6 |
| `text-md` | 16px | 1.5 |
| `text-lg` | 18px | 1.5 |
| `text-xl` | 22px | 1.4 |
| `text-2xl` | 24px | 1.3 |
| `text-3xl` | 36px | 1.2 |

---

## Rules

1. **Check existing atoms first** — before creating any new component, verify it doesn't already exist in `atoms/`, `molecules/`, or `ui/`.
2. **Always use design tokens** — never use magic numbers for colors, spacing, or radii. Use Tailwind classes mapped to CSS variables.
3. **TypeScript with proper prop types** — every component must define an explicit `interface` for its props with JSDoc descriptions.
4. **Follow existing naming conventions** — PascalCase filenames, one component per file, barrel `index.ts` exports.
5. **Use shadcn/ui primitives as the base** — extend via CVA variants in `ui/` components; compose them into atoms/molecules, never rebuild from scratch.
6. **Prompts are code** — all user-editable or prompt-related content must use `font-mono`.
7. **Three-theme compliance** — any new color token must be defined in all three themes (`:root`, `.light`, `.warm`) in `src/index.css`.
8. **Semantic color only** — use `bg-card`, `text-muted-foreground`, `border-border` etc. Never write `bg-gray-800` or `text-white`.

---

## Key Files

| File | Purpose |
|---|---|
| `src/index.css` | CSS custom properties — source of truth for all design tokens |
| `tailwind.config.ts` | Tailwind mappings to CSS variables, font/size/color definitions |
| `src/DESIGN_SYSTEM.md` | Full design system specification and component inventory |
| `CONTRIBUTING.md` | Development workflow, commit conventions, component creation guide |
| `CHANGELOG.md` | Version history (Keep a Changelog format) |
