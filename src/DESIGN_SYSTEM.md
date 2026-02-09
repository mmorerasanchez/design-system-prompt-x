# promptx Design System v2.0

> Single Source of Truth · Last updated: 2026-02-09

---

## 1. Executive Summary

promptx is a prompt engineering platform built on the principle that **Prompts Are Code**. The design system uses monochromatic warm stone grays (95% of surface area), a terracotta orange accent (4%), and semantic colors (1%). It is IDE-inspired with a distraction-free workspace aesthetic, ships 86 components across 5 atomic layers, supports 3 themes (dark default, light, warm), and meets WCAG 2.1 AA accessibility standards.

---

## 2. Design Principles

| Principle | Description |
|---|---|
| Monochromatic + Accent | 95% warm stone grays, 4% terracotta orange, 1% semantic |
| 3-Surface Hierarchy | `background` → `surface` → `card` creates depth without complexity |
| Prompts Are Code | All user-editable content, variables, model strings use `font-mono` always |
| Typography as Hierarchy | Display (titles/nav), Body (labels/descriptions), Mono (data/prompts) |
| Progressive Disclosure | Start with lightest variant, add complexity on demand |
| Accessible by Default | WCAG 2.1 AA, 44×44px touch targets, Radix UI primitives |
| IDE-Inspired | Clean, distraction-free workspace for prompt engineering |

---

## 3. Font System

### Font Families

| Token | Font | Fallbacks | Usage |
|---|---|---|---|
| `font-display` | Plus Jakarta Sans | Poppins, Inter, system-ui | Headings, buttons, nav |
| `font-body` | Satoshi | Outfit, Inter, system-ui | Descriptions, labels, helpers |
| `font-mono` | JetBrains Mono | IBM Plex Mono, Consolas | ALL prompt content, variables, inputs, data, badges |

### Font Usage Matrix

| UI Element | Font Class | Size | Weight |
|---|---|---|---|
| Page titles | `font-display` | `text-xl` | `font-semibold` |
| Section headers | `font-display` | `text-lg` | `font-medium` |
| Card titles | `font-display` | `text-md` | `font-medium` |
| Button labels | `font-display` | — | `font-medium` |
| Nav items | `font-display` | `text-sm` | `font-medium` |
| Body text | `font-body` | `text-base` | — |
| Form labels | `font-body` | `text-sm` | `font-medium` |
| Descriptions | `font-body` | `text-sm` | — |
| Anatomy field names | `font-body` | `text-sm` | `font-medium` |
| All inputs/textareas | `font-mono` | `text-base` | — |
| Tab labels | `font-mono` | `text-sm` | `font-medium` |
| Badges | `font-mono` | `text-xs` | `font-medium` |
| Table headers | `font-mono` | `text-xs` | `uppercase tracking-widest` |
| Table data | `font-mono` | `text-sm` | — |
| Token counts | `font-mono` | `text-xs` | — |
| Variables | `font-mono` | `text-sm` | `font-medium` |
| KPI values | `font-mono` | `text-2xl` | `font-bold` |
| Metadata | `font-mono` | `text-2xs` | — |

> **Critical rule:** Provider names (Anthropic, OpenAI) use `font-body`. Model strings (`claude-3.5-sonnet`, `gpt-4-turbo`) **ALWAYS** use `font-mono`.

---

## 4. Color System

### Core Surfaces (3-layer hierarchy)

| Token | CSS Variable | Dark HSL | Tailwind Class | Usage |
|---|---|---|---|---|
| Background | `--background` | `20 14% 4%` | `bg-background` | Page background (darkest) |
| Surface | `--surface` | `24 10% 10%` | `bg-surface` | Panels, sidebars, headers |
| Card | `--card` | `12 6% 15%` | `bg-card` | Cards, dialogs, elevated content |

### Text Colors

| Token | CSS Variable | Dark HSL | Tailwind Class | Usage |
|---|---|---|---|---|
| Foreground | `--foreground` | `60 9% 98%` | `text-foreground` | Primary text |
| Muted | `--muted-foreground` | `24 5% 64%` | `text-muted-foreground` | Secondary text, timestamps |
| Subtle | `--foreground-subtle` | `24 5% 45%` | `text-foreground-subtle` | Tertiary text, placeholders |
| Accent | `--accent` | `18 65% 55%` | `text-accent` | Links, highlights, interactive |

### Accent & Action

| Token | CSS Variable | Dark HSL | Tailwind Class | Usage |
|---|---|---|---|---|
| Accent | `--accent` | `18 65% 55%` | `bg-accent text-accent-foreground` | Primary CTA, terracotta orange |
| Primary | `--primary` | `20 6% 90%` | `bg-primary text-primary-foreground` | Standard buttons (inverts per theme) |
| Destructive | `--destructive` | `0 84% 60%` | `bg-destructive` | Delete, danger actions |

### Semantic Feedback

| State | CSS Variable | HSL | Text | Background | Border |
|---|---|---|---|---|---|
| Success | `--success` | `142 71% 45%` | `text-success` | `bg-success-bg` (10%) | `border-success-border` (30%) |
| Warning | `--warning` | `45 93% 47%` | `text-warning` | `bg-warning-bg` (10%) | `border-warning-border` (30%) |
| Error | `--error` | `0 84% 60%` | `text-error` | `bg-error-bg` (10%) | `border-error-border` (30%) |
| Info | `--info` | `217 91% 60%` | `text-info` | `bg-info-bg` (10%) | `border-info-border` (30%) |

### Anatomy Field Colors (9 fields)

Each field uses a 3px left border + 5% opacity gradient background on field cards.

| Field | CSS Variable | HSL | Tailwind Class |
|---|---|---|---|
| Role | `--anatomy-role` | `185 55% 42%` | `text-anatomy-role` / `border-l-anatomy-role` |
| Tone | `--anatomy-tone` | `38 80% 50%` | `text-anatomy-tone` |
| Context | `--anatomy-context` | `152 55% 40%` | `text-anatomy-context` |
| Task | `--anatomy-task` | `25 85% 52%` | `text-anatomy-task` |
| Reasoning | `--anatomy-reasoning` | `262 55% 55%` | `text-anatomy-reasoning` |
| Examples | `--anatomy-examples` | `340 65% 55%` | `text-anatomy-examples` |
| Output | `--anatomy-output` | `230 60% 58%` | `text-anatomy-output` |
| Constraints | `--anatomy-constraints` | `0 70% 55%` | `text-anatomy-constraints` |
| Tools | `--anatomy-tools` | `48 85% 48%` | `text-anatomy-tools` |

### Status Colors

| Status | CSS Variable | HSL | Tailwind Class |
|---|---|---|---|
| Draft | `--status-draft` | `45 93% 47%` | `text-status-draft` / `bg-status-draft/10` |
| Testing | `--status-testing` | `217 91% 60%` | `text-status-testing` / `bg-status-testing/10` |
| Production | `--status-production` | `142 71% 45%` | `text-status-production` / `bg-status-production/10` |
| Archived | `--status-archived` | `0 0% 45%` | `text-status-archived` / `bg-status-archived/10` |

---

## 5. Spacing & Layout

**Base unit:** 4px

**Spacing scale:** `4` · `8` · `12` · `16` · `24` · `32` · `48` · `64` px

### Layout Dimensions

| Token | CSS Variable | Value | Tailwind Class |
|---|---|---|---|
| Header height | `--header-height` | `56px` (3.5rem) | `h-header` |
| Sidebar width | `--sidebar-width` | `240px` (15rem) | `w-sidebar-w` |
| Sidebar collapsed | `--sidebar-collapsed` | `64px` (4rem) | `w-sidebar-collapsed` |
| Right panel | `--right-panel` | `352px` (22rem) | `w-right-panel` |

### Border Radius

| Token | Value | Tailwind Class |
|---|---|---|
| Small | `4px` | `rounded-sm` |
| Medium | `8px` | `rounded-md` |
| Large | `12px` (`--radius`) | `rounded-lg` |
| Full | `9999px` | `rounded-full` |

### Z-Index Scale

| Layer | Value | Tailwind Class |
|---|---|---|
| Dropdown | `50` | `z-dropdown` |
| Sticky | `100` | `z-sticky` |
| Overlay | `200` | `z-overlay` |
| Modal | `300` | `z-modal` |
| Toast | `400` | `z-toast` |

---

## 6. Motion & Animation

### Duration Tokens

| Token | CSS Variable | Value |
|---|---|---|
| Instant | `--duration-instant` | `50ms` |
| Fast | `--duration-fast` | `100ms` |
| Normal | `--duration-normal` | `150ms` |
| Medium | `--duration-medium` | `200ms` |
| Slow | `--duration-slow` | `300ms` |

### Easing Tokens

| Token | CSS Variable | Value |
|---|---|---|
| Default | `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Out | `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| In | `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| Spring | `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

### Usage Guide

| Interaction | Duration | Easing | CSS Variable |
|---|---|---|---|
| Hover | `150ms` | `ease` | `--duration-normal` |
| Press / active | `100ms` | `ease` | `--duration-fast` |
| Modal enter | `200ms` | `ease-out` | `--duration-medium` |
| Modal exit | `150ms` | `ease-in` | `--duration-normal` |
| Accordion | `200ms` | `ease-out` | `--duration-medium` |
| Toast | `300ms` | `ease-out` | `--duration-slow` |
| Skeleton pulse | `1.5s` | `ease-in-out` | — |
| Toggle | `200ms` | `spring` | `--ease-spring` |
| AI thinking dots | `1.4s` | `ease-in-out` | `ai-pulse` keyframe |
| AI cursor blink | `1s` | `step-end` | `ai-cursor` keyframe |
| Spinner | `1s` | `linear` | — |

> **Motion philosophy:** Restrained and functional. Max 300ms for UI transitions. Respect `prefers-reduced-motion` always.

---

## 7. Component Inventory

### Atoms (22)

| Name | Base | Status |
|---|---|---|
| Button | shadcn/ui Button + CVA | Ready |
| Input | shadcn/ui Input | Ready |
| Textarea | shadcn/ui Textarea | Ready |
| Select | shadcn/ui Select | Ready |
| Checkbox | shadcn/ui Checkbox | Ready |
| RadioGroup | shadcn/ui RadioGroup | Ready |
| Switch | shadcn/ui Switch | Ready |
| Slider | shadcn/ui Slider | Ready |
| Badge | shadcn/ui Badge + CVA | Ready | Status, semantic, count variants (no platform variants) |
| Tag | custom | Ready |
| Avatar | shadcn/ui Avatar | Ready |
| Heading | custom | Ready |
| Text | custom | Ready |
| Label | shadcn/ui Label | Ready |
| Link | custom | Ready |
| Code | custom | Ready |
| Separator | shadcn/ui Separator | Ready |
| Skeleton | shadcn/ui Skeleton | Ready |
| Spinner | custom | Ready |
| Tooltip | shadcn/ui Tooltip | Ready |
| Progress | shadcn/ui Progress | Ready |
| Kbd | custom | Ready |

### Molecules (17)

| Name | Base | Status | Notes |
|---|---|---|---|
| FormField | custom | Ready | |
| SearchBar | custom | Ready | |
| ParameterControl | custom | Planned | |
| VariableHighlight | custom | Planned | |
| TokenCounter | custom | Ready | |
| PromptFieldHeader | custom | Planned | |
| StatCard | custom | Ready | Trend shown via +/- prefix and color only (no icons) |
| EmptyState | custom | Ready | Title + description + CTA button (no icon) |
| NavItem | custom | Ready | |
| TabNav | custom | Ready | Horizontal tab navigation with active state, optional icons, disabled support |
| Breadcrumb | shadcn/ui Breadcrumb | Ready | |
| Pagination | shadcn/ui Pagination | Ready | |

| DiffLine | custom | Planned |
| ActivityFeedItem | custom | Planned |
| VariableEditorRow | custom | Planned |
| RunHistoryItem | custom | Planned |
| TestCaseRow | custom | Planned |

### Organisms (38)

| Name | Base | Status |
|---|---|---|
| Card | shadcn/ui Card | Ready |
| DataTable | custom | Ready |
| Dialog | shadcn/ui Dialog | Ready |
| Sheet | shadcn/ui Sheet | Ready |
| Toast | shadcn/ui Toast | Ready |
| Alert | shadcn/ui Alert | Ready |
| Tabs | shadcn/ui Tabs | Ready |
| Accordion | shadcn/ui Accordion | Ready |
| DropdownMenu | shadcn/ui DropdownMenu | Ready |
| Popover | shadcn/ui Popover | Ready |
| CommandPalette | shadcn/ui Command | Ready |
| Sidebar | shadcn/ui Sidebar | Ready |
| TopBar | custom | Ready |
| AppShell | custom | Partial |
| PromptCard | custom | Ready |
| AnatomyFieldCard — atomic | custom | Planned |
| AnatomyFieldCard — compact | custom | Planned |
| AnatomyFieldCard — expanded | custom | Planned |
| AnatomyFieldCard — inactive | custom | Planned |
| PromptEditorPanel | custom | Planned |
| CompiledPreview | custom | Planned |
| StatusLifecycle | custom | Ready |
| PlaygroundPanel | custom | Planned |
| VariableManager | custom | Planned |
| AIGenerationPanel | custom | Planned |
| TemplatePicker | custom | Planned |
| VersionTimeline | custom | Planned |
| VersionComparison | custom | Planned |
| FilterBar | custom | Ready |
| BulkActionsBar | custom | Ready |
| EvaluationResults | custom | Planned |
| TestDatasetManager | custom | Planned |
| RunHistory | custom | Planned |
| ImportDialog | custom | Planned |
| ExportMenu | custom | Planned |
| UserMenu | custom | Planned |
| SettingsNav | custom | Planned |
| APIKeyManager | custom | Planned |
| IntegrationCard | custom | Planned |
| OnboardingWizard | custom | Planned |
| DashboardStats | custom | Ready |

### Templates (8)

| Name | Description | Status |
|---|---|---|
| EditorLayout | Split-pane: 50/50 editor + preview with resizer | Planned |
| LibraryLayout | Sidebar + filterable card grid | Planned |
| DashboardLayout | Sidebar + header + scrollable main + optional right panel | Ready |
| DetailLayout | Sidebar + full-width detail view with tabs | Planned |
| ComparisonLayout | Side-by-side Version A / Version B (50/50) diff panels | Planned |
| SettingsLayout | Horizontal tab navigation below header + content area | Ready |
| AuthLayout | Centered card on full-height background | Ready |
| ModalLayout | Centered modal (60–80% viewport) over dimmed overlay | Ready |

---

## 8. Accessibility Requirements

| Requirement | Standard |
|---|---|
| Color contrast | 4.5:1 normal text, 3:1 large text |
| Focus indicators | 2px accent ring, `focus-visible` only |
| Keyboard navigation | Radix UI primitives for all interactive elements |
| Screen readers | Semantic HTML + ARIA attributes |
| Motion | `prefers-reduced-motion` disables all animations |
| Touch targets | 44×44px minimum for all interactive elements |
| Forms | `aria-describedby` for help text, `aria-invalid` for errors |

---

## 9. Theme System

Three themes applied via class on `<html>`:

| Theme | Class | Description |
|---|---|---|
| Dark | `.dark` (default) | Warm dark grays, light text |
| Light | `.light` | Cool light grays, dark text |
| Warm | `.warm` | Sepia-toned, paper-like warmth |

- **Primary button** inverts per theme (light-on-dark in dark, dark-on-light in light)
- **Accent** stays terracotta orange (`hue 18°`) across all themes
- All semantic, anatomy, and status colors are theme-invariant

---

## 10. Icon Rules

**Library:** Lucide React

| Size | Pixels | Tailwind Class | Usage |
|---|---|---|---|
| sm | `14px` | `size-3.5` | Inline, badges |
| md | `18px` | `size-4` | Buttons (default), nav |
| lg | `24px` | `size-5` | Large buttons, section headers |

**Color:** `currentColor` always — never hardcode icon colors.

| ✅ Allowed in | ❌ Not allowed in |
|---|---|
| Buttons | Page titles |
| Nav items | Section headers |
| Status indicators | KPI labels |
| Table actions | Card titles |
| — | Table row content |
| — | Empty states |
| — | KPI trend indicators |

---

## 11. Build Sequence

1. **Verify tokens** — check font imports load, feedback opacity syntax works
2. **Build atoms** — Button → Input/Textarea → Badge → Tag → Checkbox/Radio/Switch/Slider → Skeleton → Spinner → Tooltip → Progress → Kbd
3. **Build molecules** — FormField → SearchBar → ParameterControl → VariableHighlight → TokenCounter → StatCard → EmptyState → NavItem → TabNav
4. **Build organisms** — Card → AppShell → Sidebar + TopBar → Tabs → Accordion → Modal → Sheet → Toast → Dropdown → Popover → CommandPalette → DataTable
5. **Build promptx patterns** — AnatomyFieldCard → PromptEditorPanel → CompiledPreview → PlaygroundPanel → VariableManager → StatusLifecycle → VersionTimeline
6. **Build templates** — EditorLayout → LibraryLayout → DashboardLayout → DetailLayout → SettingsLayout → AuthLayout → ModalLayout
7. **Assemble pages** — Dashboard → Library → Prompt Detail/Editor → Settings → Auth

---

*86 components · 3 themes · 9 anatomy fields · WCAG 2.1 AA*
