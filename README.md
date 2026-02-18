# ⚛️ prompt**x** — Atomic Design System

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-000000?logo=shadcnui&logoColor=white)

**The visual foundation for promptx — a prompt engineering workspace built for AI-native developers and vibe coders.**

Structured tokens, accessible components, and three-theme support designed to be consumed by both humans and AI agents.

[🌐 Live Demo](https://design-system-prompt-x.lovable.app/) · [📦 GitHub](https://github.com/mmorerasanchez/design-system-prompt-x)

---

## Why This Exists

AI-assisted development tools like Lovable, Cursor, v0, and Claude Code generate UI at incredible speed — but without a shared design system, every generated component looks different. Colors drift, typography is inconsistent, spacing feels random, and the product loses its identity.

This design system solves that problem by providing a **single source of truth** for every visual decision: CSS custom properties as design tokens, pre-built accessible components following Atomic Design, a three-font typography hierarchy, and a monochromatic + accent color philosophy. Whether a human engineer or an AI agent is building the next feature, the output looks and feels like **promptx**.

---

## Quick Start

```bash
git clone https://github.com/mmorerasanchez/design-system-prompt-x.git
cd design-system-prompt-x
npm install
npm run dev
```

---

## Architecture

The design system follows **Atomic Design** methodology — Atoms → Molecules → Organisms → Templates — with design tokens defined as CSS custom properties in `src/index.css` and mapped through `tailwind.config.ts`.

```
src/
├── index.css                          # Design tokens (CSS custom properties), font imports, base resets
│
├── components/
│   ├── atoms/                         # Smallest building blocks (7 components)
│   │   ├── Code.tsx                   #   Inline code with accent styling
│   │   ├── Heading.tsx                #   H1–H4 with font-display
│   │   ├── Kbd.tsx                    #   Keyboard shortcut badges
│   │   ├── Link.tsx                   #   Styled anchor with accent underline
│   │   ├── Spinner.tsx                #   Loading indicator
│   │   ├── Tag.tsx                    #   Anatomy field color tags
│   │   ├── Text.tsx                   #   Body text variants (muted, subtle)
│   │   └── index.ts
│   │
│   ├── molecules/                     # Compositions of atoms (18 components)
│   │   ├── ActivityFeedItem.tsx       #   Single activity entry
│   │   ├── AvatarGroup.tsx            #   Stacked avatar display
│   │   ├── BreadcrumbNav.tsx          #   Navigation breadcrumbs
│   │   ├── DiffLine.tsx               #   Version diff line display
│   │   ├── EmptyState.tsx             #   Empty content placeholder
│   │   ├── FormField.tsx              #   Label + input composition
│   │   ├── NavItem.tsx                #   Sidebar navigation item
│   │   ├── ParameterControl.tsx       #   Model parameter slider
│   │   ├── PromptFieldHeader.tsx      #   Anatomy field section header
│   │   ├── RunHistoryItem.tsx         #   Single run history entry
│   │   ├── ScoreBreakdown.tsx         #   Evaluation score display
│   │   ├── SearchBar.tsx              #   Search input with icon
│   │   ├── StatCard.tsx               #   Dashboard metric card
│   │   ├── TabNav.tsx                 #   Tab navigation bar
│   │   ├── TestCaseRow.tsx            #   Test dataset row
│   │   ├── TokenCounter.tsx           #   Token usage display
│   │   ├── VariableEditorRow.tsx      #   Variable key-value editor
│   │   ├── VariableHighlight.tsx      #   Inline variable highlight
│   │   └── index.ts
│   │
│   ├── organisms/                     # Major UI sections (42 components)
│   │   ├── AIGenerationPanel.tsx      #   AI prompt generation interface
│   │   ├── APIDocPanel.tsx            #   API documentation viewer
│   │   ├── APIKeyManager.tsx          #   API key CRUD management
│   │   ├── ActivityFeed.tsx           #   Activity timeline
│   │   ├── AnatomyFieldCard.tsx       #   9-field anatomy editor card
│   │   ├── AuthForm.tsx               #   Login/signup form
│   │   ├── BulkActionsBar.tsx         #   Multi-select action bar
│   │   ├── CLEARScorePanel.tsx        #   CLEAR scoring panel
│   │   ├── CompiledPreview.tsx        #   Compiled prompt preview
│   │   ├── CreatePromptDialog.tsx     #   New prompt creation dialog
│   │   ├── DashboardStats.tsx         #   Dashboard statistics grid
│   │   ├── DataManager.tsx            #   Data management interface
│   │   ├── DataTable.tsx              #   Sortable data table
│   │   ├── EvalConfirmModal.tsx       #   Evaluation confirmation
│   │   ├── EvaluationResults.tsx      #   Evaluation results display
│   │   ├── EvaluationResultsView.tsx  #   Full evaluation results view
│   │   ├── ExportMenu.tsx             #   Export options menu
│   │   ├── FilterBar.tsx              #   Filter controls bar
│   │   ├── GlobalVariableManager.tsx  #   Global variable management
│   │   ├── ImportDialog.tsx           #   Import dialog
│   │   ├── ImprovedPromptPanel.tsx    #   AI-improved prompt display
│   │   ├── IntegrationCard.tsx        #   Third-party integration card
│   │   ├── OnboardingWizard.tsx       #   User onboarding flow
│   │   ├── OrganizationManager.tsx    #   Organization settings
│   │   ├── PlaygroundPanel.tsx        #   Prompt playground
│   │   ├── PresetCard.tsx             #   Model preset card
│   │   ├── PresetDetailPanel.tsx      #   Preset detail panel
│   │   ├── PromptCard.tsx             #   Prompt library card
│   │   ├── PromptConfigFields.tsx     #   Prompt configuration
│   │   ├── PromptEditorPanel.tsx      #   Main prompt editor
│   │   ├── RunHistory.tsx             #   Run history list
│   │   ├── SettingsNav.tsx            #   Settings navigation
│   │   ├── SidebarNav.tsx             #   Collapsible sidebar
│   │   ├── StatusLifecycleBar.tsx     #   Status workflow bar
│   │   ├── TemplatePicker.tsx         #   Template selection
│   │   ├── TestDatasetManager.tsx     #   Test dataset management
│   │   ├── TestRunnerModal.tsx        #   Test execution modal
│   │   ├── TopBar.tsx                 #   Top navigation bar
│   │   ├── UserMenu.tsx               #   User dropdown menu
│   │   ├── VariableManager.tsx        #   Variable management panel
│   │   ├── VersionComparison.tsx      #   Version diff comparison
│   │   ├── VersionTimeline.tsx        #   Version history timeline
│   │   └── index.ts
│   │
│   ├── templates/                     # Page layout shells (7 components)
│   │   ├── AppShell.tsx               #   Root app layout (sidebar + topbar + outlet)
│   │   ├── ComparisonLayout.tsx       #   Side-by-side comparison layout
│   │   ├── DashboardLayout.tsx        #   Dashboard grid layout
│   │   ├── DetailLayout.tsx           #   Detail view with right panel
│   │   ├── EditorLayout.tsx           #   Split-pane editor layout
│   │   ├── LibraryLayout.tsx          #   Library grid/list layout
│   │   ├── TemplatePreview.tsx        #   Template wireframe preview
│   │   └── index.ts
│   │
│   └── ui/                            # shadcn/ui primitives (40+ components)
│       ├── button.tsx, input.tsx, card.tsx, badge.tsx, dialog.tsx,
│       │   select.tsx, tabs.tsx, table.tsx, toast.tsx, tooltip.tsx,
│       │   accordion.tsx, checkbox.tsx, popover.tsx, slider.tsx, ...
│       └── (Radix UI based, extended via CVA variants)
│
├── pages/                             # Route pages
│   ├── OverviewPage.tsx               #   Design system overview (/)
│   ├── TokensPage.tsx                 #   Token reference (/tokens)
│   ├── AtomsPage.tsx                  #   Atoms showcase (/atoms)
│   ├── MoleculesPage.tsx              #   Molecules showcase (/molecules)
│   ├── OrganismsPage.tsx              #   Organisms showcase (/organisms)
│   ├── TemplatesPage.tsx              #   Templates showcase (/templates)
│   ├── PagesPage.tsx                  #   Full pages showcase (/pages)
│   ├── DashboardPage.tsx              #   App dashboard (/app)
│   ├── LibraryPage.tsx                #   Prompt library (/app/library)
│   ├── PromptDetailPage.tsx           #   Prompt detail (/app/library/:id)
│   ├── PromptEditorPage.tsx           #   Prompt editor (/app/library/:id/edit)
│   ├── AIDesignerPage.tsx             #   AI designer (/app/ai-designer)
│   ├── SettingsPage.tsx               #   Settings (/app/settings)
│   ├── OnboardingPage.tsx             #   Onboarding (/app/welcome)
│   └── TokenSmokeTest.tsx             #   Token smoke test (/test/tokens)
│
├── hooks/                             # Custom React hooks
│   ├── use-theme.tsx                  #   Theme provider (dark/light/warm)
│   ├── use-mobile.tsx                 #   Mobile breakpoint detection
│   └── use-typing-animation.ts        #   Typing animation effect
│
├── data/                              # Mock data
│   └── evaluator-analytics-mock.ts
│
└── lib/
    └── utils.ts                       # Utility functions (cn, etc.)
```

### Component Inventory

| Layer | Count | Description |
| --- | --- | --- |
| **Atoms** | 7 | Typography, code, tags, links, spinners |
| **Molecules** | 18 | Form fields, nav items, stat cards, search bars |
| **Organisms** | 42 | Editors, panels, modals, data tables, navigation |
| **Templates** | 7 | Page layout shells (app shell, editor, dashboard) |
| **UI Primitives** | 40+ | shadcn/ui + Radix UI accessible base components |

---

## Routes

### Design System Showcase

| Route | Page | Description |
| --- | --- | --- |
| `/` | Overview | Design system introduction and principles |
| `/tokens` | Tokens | Color, typography, spacing token reference |
| `/atoms` | Atoms | Atomic component gallery |
| `/molecules` | Molecules | Molecule composition showcase |
| `/organisms` | Organisms | Organism component demos |
| `/templates` | Templates | Page layout template previews |
| `/pages` | Pages | Full page compositions |

### Application Pages

| Route | Page | Description |
| --- | --- | --- |
| `/app` | Dashboard | Metrics, activity feed, quick actions |
| `/app/library` | Prompt Library | Browse, search, filter prompts |
| `/app/library/:id` | Prompt Detail | Version history, analytics, metadata |
| `/app/library/:id/edit` | Prompt Editor | Split-pane anatomy field editor |
| `/app/ai-designer` | AI Designer | AI-powered prompt generation |
| `/app/settings` | Settings | API keys, integrations, preferences |
| `/app/welcome` | Onboarding | First-run onboarding wizard |

---

## Design Principles

| Principle | Description |
| --- | --- |
| **Monochromatic + Accent** | 95% warm stone grays, 4% terracotta orange (hsl 18°), 1% semantic colors |
| **3-Surface Hierarchy** | `--background` → `--surface` → `--card` creates depth without complexity |
| **Typography as Hierarchy** | Three fonts convey meaning: Display (titles), Body (content), Mono (data) |
| **Purposeful Color** | Every color has a specific function. No decorative colors. |
| **IDE-Inspired** | Clean, distraction-free workspace optimized for prompt engineering |

---

## Three-Theme Support

All tokens are defined as HSL in `src/index.css`. Hex approximations below for quick reference.

| Token | Dark (Default) | Light | Warm |
| --- | --- | --- | --- |
| `--background` | `hsl(20 14% 4%)` · `#0E0C0B` | `hsl(30 5% 96%)` · `#F5F4F3` | `hsl(30 18% 91%)` · `#EDE8E2` |
| `--surface` | `hsl(20 8% 8%)` · `#161413` | `hsl(40 6% 97%)` · `#F8F7F6` | `hsl(40 15% 94%)` · `#F3F0EB` |
| `--card` | `hsl(12 6% 15%)` · `#282423` | `hsl(40 8% 99%)` · `#FDFCFB` | `hsl(30 25% 97%)` · `#FAF8F5` |
| `--foreground` | `hsl(60 9% 98%)` · `#FAFAF9` | `hsl(24 10% 10%)` · `#1C1917` | `hsl(12 6% 15%)` · `#282423` |
| `--accent` | `hsl(18 65% 55%)` · `#D4734A` | `hsl(18 65% 55%)` · `#D4734A` | `hsl(18 60% 45%)` · `#B85C33` |

---

## For AI Agents & Vibe Coders

This design system is optimized to work with AI development tools. Paste or reference the relevant sections when prompting.

### With Lovable

Point your Lovable project to the live design system URL and reference it in prompts:

```
Use the promptx design system at https://design-system-prompt-x.lovable.app/
for all visual decisions. Key rules:
- 3 fonts: Plus Jakarta Sans (font-display) for titles, Satoshi (font-body)
  for body text, JetBrains Mono (font-mono) for ALL prompt content and data
- Colors: 95% warm stone grays, 4% terracotta orange accent (hsl 18°), 1% semantic
- 3-surface hierarchy: Background → Surface → Card
- Radix UI / shadcn/ui for all component primitives
- Dark theme is default. Support Light and Warm themes.
```

### With Cursor / Claude Code

Reference `src/index.css` and `tailwind.config.ts` directly in your context:

```
@src/index.css @tailwind.config.ts
Build a new component following the promptx design system.
Use CSS custom properties (--background, --surface, --card, --foreground).
All user-editable content must use font-mono (JetBrains Mono).
Button labels use font-display (Plus Jakarta Sans).
```

### With v0 / Bolt

Include the core design rules in your system prompt:

```
Design system: monochromatic warm stone grays with terracotta orange accent.
Use shadcn/ui components, Tailwind CSS, Lucide React icons.
Typography: font-display for headings, font-body for paragraphs, font-mono for code/data.
No decorative colors — every color has a specific semantic function.
IDE-inspired, clean, distraction-free aesthetic.
```

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| **React 18** | UI library |
| **TypeScript 5** (strict) | Type safety |
| **Tailwind CSS 3.4** | Utility-first styling with design token integration |
| **Radix UI / shadcn/ui** | Accessible, unstyled component primitives |
| **Lucide React** | Icon library |
| **Vite** | Build tool and dev server |
| **Plus Jakarta Sans + Satoshi + JetBrains Mono** | Three-font typography system |

---

## Documentation

| Resource | Description |
| --- | --- |
| [Live Design System](https://design-system-prompt-x.lovable.app/) | Interactive component gallery, token reference, and theme playground |
| [`src/DESIGN_SYSTEM.md`](src/DESIGN_SYSTEM.md) | Complete design system specification (v2.3) — component inventory, token reference, usage rules |
| [`src/index.css`](src/index.css) | CSS custom properties, font imports, three-theme definitions, base resets |
| [`tailwind.config.ts`](tailwind.config.ts) | Tailwind CSS integration with all custom tokens, fonts, spacing, and animations |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Contribution guidelines, commit conventions, and component creation workflow |

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Author

**Mariano** — Creator & Product Lead

[LinkedIn](https://www.linkedin.com/in/mmorerasanchez/)

---

Built with ❤️ from 🇪🇸
