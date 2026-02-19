# Getting Started

> Install, run, and start building with **democrito** — the atomic design system and visual foundation of [prompt-x](https://github.com/mmorerasanchez/prompt-x) — in under 5 minutes.

---

## Prerequisites

| Tool | Version |
|---|---|
| **Node.js** | 18+ |
| **npm** | 9+ (ships with Node 18) |
| **Git** | Any recent version |

---

## Installation

```bash
# Clone the repository
git clone https://github.com/mmorerasanchez/democrito.git
cd democrito

# Install dependencies
npm install
```

> A `bun.lockb` file may be present from the Lovable build environment — it can be safely ignored. Always use `npm install` for local development.

---

## Development Server

```bash
npm run dev
```

Opens the showcase at `http://localhost:5173` with hot-reload. Browse tokens, atoms, molecules, organisms, and templates in real time.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest unit tests |

---

## Project Structure

```
src/
├── index.css                # Design tokens (CSS custom properties) — source of truth
├── components/
│   ├── atoms/               # Smallest building blocks (Heading, Tag, Spinner, etc.)
│   ├── molecules/           # Compositions of atoms (FormField, SearchBar, StatCard)
│   ├── organisms/           # Major UI sections (TopBar, DataTable, PromptCard)
│   ├── templates/           # Page layout shells (AppShell, EditorLayout)
│   └── ui/                  # shadcn/ui primitives — extend, never modify
├── pages/                   # Route-level showcase pages
├── hooks/                   # Custom React hooks (use-theme, use-mobile)
└── lib/                     # Utilities (cn helper, etc.)

tailwind.config.ts           # Tailwind mappings to CSS variables
design-tokens.json           # W3C DTCG format for tooling interop
```

---

## Using a Component

Import from the layer barrel export:

```tsx
import { Heading, Tag } from "@/components/atoms";
import { StatCard, SearchBar } from "@/components/molecules";
import { DataTable, TopBar } from "@/components/organisms";
```

Every component uses semantic design tokens — no hardcoded colors:

```tsx
<div className="bg-card text-card-foreground border border-border rounded-lg p-4">
  <Heading level={3}>Dashboard</Heading>
  <Tag color="teal">Active</Tag>
</div>
```

---

## Theming

The system ships with three themes: **Dark** (default), **Light**, and **Warm**. Switch themes by applying a class to the root element:

```html
<!-- Dark (default) -->
<html>

<!-- Light -->
<html class="light">

<!-- Warm -->
<html class="warm">
```

To customize the palette for your brand, override CSS custom properties in `src/index.css`:

```css
:root {
  --accent: 210 100% 55%;   /* swap terracotta for electric blue */
  --radius: 0.75rem;        /* rounder corners */
}
```

📖 See the [full Theming Guide](./theming.md) for complete examples.

---

## Design Rules (Quick Reference)

1. **Never hardcode colors** — use semantic tokens (`bg-surface`, `text-accent`, `border-border`)
2. **Three fonts**: `font-display` for headings, `font-body` for body text, `font-mono` for data/code
3. **Three surfaces**: `--background` → `--surface` → `--card` for depth hierarchy
4. **Extend shadcn/ui** via CVA variants — never rebuild primitives from scratch
5. **All themes**: new tokens must be defined in `:root`, `.light`, and `.warm`

---

## Next Steps

| Resource | Description |
|---|---|
| [Architecture](./architecture.md) | Atomic Design decisions and rationale |
| [Design Tokens](./tokens.md) | Complete token reference |
| [Theming](./theming.md) | Brand customization guide |
| [Migration](./migration.md) | Migrating from MUI, Chakra, Bootstrap, or Tailwind UI |
| [AI Usage](./ai-usage.md) | Using the system with Lovable, Cursor, Claude Code |
| [Contributing](../CONTRIBUTING.md) | How to add components and propose changes |
