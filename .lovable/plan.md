

# Page Content Architecture — Dashboard, Prompt Store, AI Designer

## Problem

The current pages were assembled quickly by dropping organisms directly into templates without a consistent **content structure pattern**. Each page needs a standardized information architecture that defines reusable section blocks (PageHeader, KPI row, tab bar, content panels) composed strictly from existing atoms, molecules, and organisms.

## Approach

Introduce a thin layer of **page-level section components** (molecules/organisms) that standardize how content blocks are arranged within the DashboardLayout and LibraryLayout templates. Every section follows the same structural rules:

- Every section has a consistent header (title + optional subtitle/action)
- Content is always enclosed in bordered card containers
- Column layouts are strictly 50/50 or full-width
- KPI rows are always 4-column grids (2-col on mobile)

No new design tokens or templates are needed — this is purely about **composing existing components into well-defined page sections**.

---

## Page Structures

### 1. Dashboard (`/app`)

```text
+----------------------------------------------------------+
| PageHeader                                                |
|   H1: "Dashboard"                                         |
|   Subtitle: "Overview of your prompt engineering..."      |
+----------------------------------------------------------+
| KPI Row (DashboardStats — 4 StatCards)                    |
|  [Total Prompts] [AI Runs] [Avg Score] [Active Users]     |
+----------------------------------------------------------+
| 50/50 Split                                               |
| +------------------------+ +---------------------------+  |
| | AI Designer Snippet    | | Activity Feed             |  |
| | (Card container)       | | (existing ActivityFeed)   |  |
| |  TabNav: Generate|Eval | |                           |  |
| |  ────────────────────  | |                           |  |
| |  Generator tab:        | |                           |  |
| |    AIGenerationPanel   | |                           |  |
| |    (compact mode)      | |                           |  |
| |  Evaluator tab:        | |                           |  |
| |    Mini score summary  | |                           |  |
| |    + "View full" link  | |                           |  |
| +------------------------+ +---------------------------+  |
+----------------------------------------------------------+
| Recent Prompts (full-width)                               |
| Section header: "Recent Prompts" + "View all" link        |
| 3-col PromptCard grid                                     |
+----------------------------------------------------------+
```

**Components used:** Heading, Text, DashboardStats (StatCard x4), TabNav, AIGenerationPanel, EvaluationResults (compact), ActivityFeed, PromptCard

### 2. Prompt Store (`/app/library`)

```text
+----------------------------------------------------------+
| PageHeader                                                |
|   H1: "Prompt Store"                                      |
|   Subtitle: "Browse, search, and manage your prompts"     |
|   [+ New Prompt] button (right-aligned)                   |
+----------------------------------------------------------+
| KPI Row (4 StatCards)                                      |
|  [Total Prompts] [Production] [Avg Tokens] [This Week]    |
+----------------------------------------------------------+
| Toolbar                                                   |
|   SearchBar | Status filter badges | Sort select | Grid/  |
|                                                List toggle|
+----------------------------------------------------------+
| Content Grid/List                                         |
|   Grid: 3-col PromptCard grid (1-col mobile)              |
|   List: DataTable rows (future variant)                   |
+----------------------------------------------------------+
| Pagination + BulkActionsBar (conditional)                 |
+----------------------------------------------------------+
```

**Components used:** Heading, Text, Button, StatCard x4, FilterBar (SearchBar + Badge filters + Select + view toggle), PromptCard grid, BulkActionsBar

### 3. AI Designer (`/app/ai-designer`)

```text
+----------------------------------------------------------+
| PageHeader                                                |
|   H1: "AI Designer"                                       |
|   Subtitle: "Generate and evaluate prompts with AI"       |
+----------------------------------------------------------+
| KPI Row (4 StatCards)                                      |
|  [Total Runs] [Avg Score] [Tokens Used] [Success Rate]    |
+----------------------------------------------------------+
| TabNav: [Generator] [Evaluator]                           |
+----------------------------------------------------------+
|                                                            |
| Generator Tab (50/50 split-pane):                         |
| +------------------------+ +---------------------------+  |
| | Configuration          | | Output                    |  |
| | (Card container)       | | (Card container)          |  |
| |  Anatomy field select  | |  Generated prompt         |  |
| |  ParameterControls:    | |  preview (mono)           |  |
| |    Temperature          | |  Copy / Accept actions    |  |
| |    Max tokens           | |                           |  |
| |    Top P                | |                           |  |
| |  Instruction textarea  | |                           |  |
| |  [Generate] button     | |                           |  |
| +------------------------+ +---------------------------+  |
|                                                            |
| Evaluator Tab (full-width stacked):                       |
| +------------------------------------------------------+  |
| | EvaluationResults (full width)                        |  |
| +------------------------------------------------------+  |
| | RunHistory + TestDatasetManager (2/3 + 1/3 split)    |  |
| +------------------------------------------------------+  |
+----------------------------------------------------------+
```

**Components used:** Heading, Text, StatCard x4, TabNav, ParameterControl, Textarea, AnatomyFieldCard/Select, AIGenerationPanel, EvaluationResults, TestDatasetManager, RunHistory

---

## Structural Consistency Rules

1. **PageHeader** — Every page starts with `Heading level="h1"` + `Text variant="muted"` subtitle, wrapped in a flex row with optional right-aligned action button
2. **KPI Row** — Always a `grid grid-cols-2 lg:grid-cols-4 gap-4` of StatCards, placed immediately after the header
3. **Section containers** — All content blocks are wrapped in `rounded-md border border-border bg-card` containers with internal section headers using `font-display text-sm font-medium`
4. **Column balance** — Two-column layouts always use `grid-cols-2` (true 50/50). Three-column splits only within known patterns (e.g., evaluator 2/3+1/3 uses `lg:grid-cols-3` with `lg:col-span-2`)
5. **Spacing** — Sections separated by `space-y-6` within the `max-w-6xl` container

---

## Technical Implementation

### New / Modified Files

| File | Action | Description |
|---|---|---|
| `src/pages/DashboardPage.tsx` | Rewrite | Add KPI row, AI Designer snippet with TabNav, restructure 50/50 layout |
| `src/pages/LibraryPage.tsx` | Rewrite | Add PageHeader with subtitle, KPI row above FilterBar, keep grid/bulk actions |
| `src/pages/EvaluationsPage.tsx` | Rename + Rewrite | Becomes `AIDesignerPage.tsx` with TabNav switching Generator/Evaluator |
| `src/App.tsx` | Update | Change `/app/evaluations` route to `/app/ai-designer` |
| `src/components/AppSidebar.tsx` | Update | Rename "Evaluations" nav item to "AI Designer" |
| `src/components/templates/DashboardLayout.tsx` | Minor update | Ensure slots support the new section ordering |

### No new atoms, molecules, or organisms needed
All page content is composed from existing components. The PageHeader pattern is just a `div` with `Heading` + `Text` + optional `Button` — too simple to warrant a separate component.

### Route Changes

| Before | After |
|---|---|
| `/app/evaluations` | `/app/ai-designer` |

### Build Order

1. Update route and sidebar navigation (Evaluations to AI Designer)
2. Rebuild DashboardPage with all 4 sections
3. Rebuild LibraryPage (Prompt Store) with KPI row and consistent header
4. Build AIDesignerPage with tabbed Generator/Evaluator layout

