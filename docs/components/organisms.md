# Organisms — Component Reference

> Major UI sections composed of molecules, atoms, and UI primitives.
> Directory: `src/components/organisms/`
> **42 components · 8 categories**

---

## Categories

| Category | Count | Components |
|---|---|---|
| [Navigation & Layout](#navigation--layout) | 5 | TopBar, SidebarNav, FilterBar, BulkActionsBar, UserMenu |
| [Dashboard & Data](#dashboard--data) | 4 | DataTable, DashboardStats, ActivityFeed, AuthForm |
| [Prompt Store](#prompt-store) | 3 | PromptCard, StatusLifecycleBar, TemplatePicker |
| [Prompt Editor](#prompt-editor) | 6 | AnatomyFieldCard, CompiledPreview, VariableManager, PromptEditorPanel, VersionTimeline, VersionComparison |
| [Playground & Testing](#playground--testing) | 4 | PlaygroundPanel, RunHistory, TestDatasetManager, EvaluationResults |
| [AI & Evaluation](#ai--evaluation) | 5 | AIGenerationPanel, CLEARScorePanel, ImprovedPromptPanel, EvalConfirmModal, EvaluationResultsView |
| [Import & Export](#import--export) | 2 | ImportDialog, ExportMenu |
| [Settings & Config](#settings--config) | 14 | SettingsNav, APIKeyManager, IntegrationCard, OnboardingWizard, PromptConfigFields, CreatePromptDialog, TestRunnerModal, APIDocPanel, PresetCard, PresetDetailPanel, OrganizationManager, GlobalVariableManager, DataManager |

---

# Navigation & Layout

App chrome, menus, and toolbar components.

---

## TopBar

Sticky header with mobile menu toggle, search button, and action slot.

**Composes**: `Kbd` (atom), `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `onMenuClick` | `() => void` | — | Mobile menu toggle |
| `showMobileMenu` | `boolean` | `true` | Show hamburger button |
| `actions` | `ReactNode` | — | Right-side action slot |

---

## SidebarNav

Full sidebar with hub items, project list, and user footer.

**Composes**: `NavItem` (molecule), `Avatar` (ui), `Badge` (ui), `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `collapsed` | `boolean` | `false` | Collapsed mode |
| `onToggle` | `() => void` | — | Toggle handler |
| `activeItem` | `string` | `"store"` | Active hub item |
| `onItemClick` | `(id: string) => void` | — | Hub item click |
| `activeProject` | `string` | — | Active project |
| `onProjectClick` | `(slug: string) => void` | — | Project click |

---

## FilterBar

Search + status filters + sort + view mode toggle.

**Composes**: `SearchBar` (molecule), `Badge` (ui), `Select` (ui), `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `search` | `string` | — | Search value |
| `onSearchChange` | `(v: string) => void` | — | Search handler |
| `viewMode` | `"grid" \| "list"` | — | Controlled view mode |
| `onViewModeChange` | `(mode: "grid" \| "list") => void` | — | View mode handler |

---

## BulkActionsBar

Floating action bar for multi-select operations.

**Composes**: `Button` (ui), `Badge` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `selectedCount` | `number` | — | Number selected (0 hides bar) |
| `onDismiss` | `() => void` | — | Dismiss handler |
| `onMove`/`onTag`/`onArchive`/`onDelete` | `() => void` | — | Action handlers |

**Animation**: `animate-bulk-bar-in`

---

## UserMenu

Dropdown-style user menu with profile info and actions.

**Composes**: `Badge`/`Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | User name |
| `email` | `string` | — | User email |
| `plan` | `string` | — | Plan badge |
| `onProfile`/`onSettings`/`onBilling`/`onLogout` | `() => void` | — | Action handlers |

---

# Dashboard & Data

Data display, metrics, authentication, and activity tracking.

---

## DataTable

Generic sortable, paginated table.

**Composes**: `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `Column<T>[]` | — | Column definitions |
| `data` | `T[]` | — | Row data |
| `pageSize` | `number` | `10` | Rows per page |
| `onRowClick` | `(row: T) => void` | — | Row click handler |

**Column**: `{ key: string; header: string; sortable?: boolean; render?: (row: T) => ReactNode }`

---

## DashboardStats

4-column stat grid with mock data.

**Composes**: `StatCard` (molecule)

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Additional classes |

---

## ActivityFeed

Scrollable activity list with avatar and resource code highlighting.

**Composes**: `Text`/`Code` (atoms), `Avatar` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `FeedItem[]` | — | Activity entries |

**FeedItem**: `{ actor: string; initials: string; action: string; resource: string; time: string }`

---

## AuthForm

Login/signup form with social OAuth and email/password fields.

**Composes**: `FormField` (molecule), `Heading`/`Text` (atoms), `Input`/`Button`/`Separator` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `"login" \| "signup"` | `"login"` | Form mode |
| `onSubmit` | `(data: { email: string; password: string; name?: string }) => void` | — | Submit handler |

---

# Prompt Store

Prompt browsing, lifecycle management, and template selection.

---

## PromptCard

Library card displaying prompt summary with status badge.

**Composes**: `Text` (atom), `Badge` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Prompt name |
| `status` | `"draft" \| "testing" \| "production" \| "archived"` | — | Lifecycle status |
| `preview` | `string` | — | Content preview |
| `version` | `string` | — | Version label |
| `updatedAgo` | `string` | — | Relative timestamp |
| `tokens` | `number` | — | Token count |
| `selected` | `boolean` | — | Selected state |
| `onClick` | `() => void` | — | Click handler |

---

## StatusLifecycleBar

Horizontal pipeline showing prompt lifecycle stages.

**Composes**: `CheckCircle2` (lucide)

| Prop | Type | Default | Description |
|---|---|---|---|
| `steps` | `Step[]` | — | Lifecycle steps |

**Step**: `{ label: string; status: "draft" \| "testing" \| "production" \| "archived"; completed?: boolean; active?: boolean }`

**Tokens**: `bg-status-draft`, `bg-status-testing`, `bg-status-production`, `bg-status-archived`, `border-status-*`

---

## TemplatePicker

Grid picker for prompt templates with category badges and metadata.

**Composes**: `Badge`/`Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `templates` | `PromptTemplate[]` | — | Available templates |
| `selectedId` | `string \| null` | — | Selected template |
| `onSelect` | `(template: PromptTemplate) => void` | — | Selection handler |

---

# Prompt Editor

Anatomy fields, compiled output, variables, versioning, and diff views.

---

## AnatomyFieldCard

Prompt anatomy field with color-coded header and content variants.

**Composes**: None (standalone)

| Prop | Type | Default | Description |
|---|---|---|---|
| `field` | `AnatomyField` | — | Field type (9 options) |
| `variant` | `"atomic" \| "compact" \| "expanded" \| "inactive"` | `"compact"` | Display mode |
| `content` | `string` | `""` | Field content |
| `tokenCount` | `number` | — | Token count |

**AnatomyField**: `"role" | "tone" | "context" | "task" | "reasoning" | "examples" | "output" | "constraints" | "tools"`

**Tokens**: all `bg-anatomy-*` tokens, `font-mono`, `font-display`

---

## CompiledPreview

Read-only monospace view of compiled prompt with clickable variables.

**Composes**: `TokenCounter` (molecule)

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `string` | — | Compiled prompt text |
| `totalTokens` | `number` | — | Total token count |
| `maxTokens` | `number` | `4096` | Max tokens |
| `onVariableClick` | `(variableName: string) => void` | — | Variable click handler |

---

## VariableManager

List of template variables with add/remove/highlight.

**Composes**: `Input`/`Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `variables` | `Variable[]` | — | Variable list |
| `onChange` | `(variables: Variable[]) => void` | — | Change handler |
| `readOnly` | `boolean` | `false` | Disable editing |
| `highlightedVariable` | `string \| null` | — | Auto-scroll and highlight |

**Variable**: `{ name: string; defaultValue: string }`

---

## PromptEditorPanel

Split panel: anatomy field cards (left) + compiled preview (right).

**Composes**: `AnatomyFieldCard` (organism), `CompiledPreview` (organism)

| Prop | Type | Default | Description |
|---|---|---|---|
| `fields` | `FieldData[]` | — | Anatomy field data |
| `compiledOutput` | `string` | `""` | Compiled prompt text |
| `totalTokens` | `number` | — | Total tokens |
| `maxTokens` | `number` | — | Max tokens |

---

## VersionTimeline

Vertical timeline of prompt version history.

**Composes**: `Badge` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `versions` | `Version[]` | — | Version entries |
| `onSelect` | `(id: string) => void` | — | Selection handler |

**Version**: `{ id: string; label: string; status: string; timestamp: string; author?: string; tokenDelta?: number; active?: boolean }`

---

## VersionComparison

Side-by-side diff view comparing two prompt versions.

**Composes**: `Badge` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `versionA` | `VersionSide` | — | Left version |
| `versionB` | `VersionSide` | — | Right version |

**VersionSide**: `{ label: string; status: VersionStatus; content: string; tokenCount?: number }`

**Tokens**: `bg-success-bg`/`text-success` (added), `bg-error-bg`/`text-error` (removed)

---

# Playground & Testing

Model testing, run tracking, test datasets, and result scoring.

---

## PlaygroundPanel

Model testing surface with system prompt, user message, and response.

**Composes**: `TokenCounter` (molecule), `Badge`/`Button`/`Textarea` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `compiledPrompt` | `string` | — | System prompt content |
| `response` | `string` | — | Model response |
| `model` | `string` | `"claude-3.5-sonnet"` | Model name |
| `isRunning` | `boolean` | `false` | Loading state |
| `onRun` | `() => void` | — | Run handler |
| `userInput` | `string` | `""` | User message |
| `onUserInputChange` | `(value: string) => void` | — | Input handler |

**AI States**: `animate-ai-pulse` thinking dots

---

## RunHistory

Scrollable list of playground/evaluation run entries.

**Composes**: `RunHistoryItem` (molecule), `Badge` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `runs` | `RunEntry[]` | — | Run entries |
| `onRunClick` | `(id: string) => void` | — | Run click handler |

---

## TestDatasetManager

Test case collection manager with bulk selection and actions.

**Composes**: `TestCaseRow` (molecule), `Badge`/`Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `testCases` | `TestCase[]` | — | Test case list |
| `selectedIds` | `string[]` | `[]` | Selected case IDs |
| `onSelectChange` | `(ids: string[]) => void` | — | Selection handler |
| `onAdd`/`onRunSelected`/`onImport` | `() => void` | — | Action handlers |

---

## EvaluationResults

Evaluation run results with overall score, metrics, and pass/fail summary.

**Composes**: `Badge`/`Progress` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `model` | `string` | — | Model used |
| `overallScore` | `number` | — | Overall score (0-100) |
| `metrics` | `EvaluationMetric[]` | — | Per-metric breakdown |
| `totalTests` | `number` | — | Total test count |
| `passed` | `number` | — | Pass count |
| `failed` | `number` | — | Fail count |

---

# AI & Evaluation

AI generation, CLEAR scoring, improved prompts, and evaluation workflows.

---

## AIGenerationPanel

AI-assisted content generation with instruction, generate, and accept flow.

**Composes**: `Badge`/`Button`/`Textarea` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `instruction` | `string` | `""` | Generation instruction |
| `onInstructionChange` | `(value: string) => void` | — | Instruction handler |
| `generatedOutput` | `string` | — | Generated text |
| `isGenerating` | `boolean` | `false` | Loading state |
| `onGenerate` | `() => void` | — | Generate handler |
| `onAccept` | `(output: string) => void` | — | Accept handler |
| `targetField` | `string` | — | Target anatomy field |

---

## CLEARScorePanel

Collapsible CLEAR framework evaluation results with dimension scores.

**Composes**: `Progress`/`Badge`/`Collapsible` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `overallScore` | `number` | — | Overall CLEAR score |
| `dimensions` | `CLEARDimension[]` | — | C/L/E/A/R breakdown |
| `strengths` | `string[]` | — | Strength points |
| `improvements` | `string[]` | — | Improvement suggestions |
| `suggestions` | `CLEARSuggestion[]` | — | Actionable suggestions |

---

## ImprovedPromptPanel

Tabbed view of AI-improved prompt: full version + anatomy field cards.

**Composes**: `TabNav` (molecule), `AnatomyFieldCard` (organism), `Select`/`Button`/`Badge` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `improvedPrompt` | `string` | — | Full improved text |
| `anatomyFields` | `AnatomyFieldData[]` | — | Per-field breakdown |
| `onReEvaluate` | `() => void` | — | Re-evaluate handler |
| `onSaveToStore` | `(status: string) => void` | — | Save handler |

---

## EvalConfirmModal

Configuration summary dialog before running evaluation.

**Composes**: `Dialog`/`Badge`/`Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Dialog open state |
| `config` | `PromptConfigState` | — | Configuration to review |
| `running` | `boolean` | — | Loading state |
| `onConfirm` | `() => void` | — | Confirm handler |

---

## EvaluationResultsView

Full-page results layout: improved prompt, KPIs, CLEAR score.

**Composes**: `Heading`/`Text` (atoms), `StatCard` (molecule), `CLEARScorePanel`/`ImprovedPromptPanel` (organisms), `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `onBack` | `() => void` | — | Back navigation |
| `onReEvaluate` | `() => void` | — | Re-evaluate handler |

---

# Import & Export

Content import and export in multiple formats.

---

## ImportDialog

Import panel with format selection, paste area, and file drop zone.

**Composes**: `Button`/`Input`/`Textarea` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `onImport` | `(content: string, format: ImportFormat) => void` | — | Import handler |
| `onCancel` | `() => void` | — | Cancel handler |

**ImportFormat**: `"json" \| "csv" \| "yaml" \| "text"`

---

## ExportMenu

Export format selection panel with descriptions.

**Composes**: `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `onExport` | `(format: ExportFormat) => void` | — | Export handler |
| `promptName` | `string` | — | Current prompt name |

**ExportFormat**: `"json" \| "csv" \| "yaml" \| "markdown" \| "clipboard"`

---

# Settings & Config

API keys, integrations, onboarding, presets, organization, and data management.

---

## SettingsNav

Horizontal tab navigation for settings pages.

**Composes**: `TabNav` (molecule)

| Prop | Type | Default | Description |
|---|---|---|---|
| `sections` | `SettingsSection[]` | — | Tab definitions |
| `activeSection` | `string` | — | Active tab |
| `onSectionChange` | `(value: string) => void` | — | Change handler |

---

## APIKeyManager

API key list with masked values, reveal toggle, and add form.

**Composes**: `Badge`/`Button`/`Input` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `keys` | `APIKey[]` | — | Key list |
| `onAdd` | `(name: string, value: string) => void` | — | Add handler |
| `onDelete` | `(id: string) => void` | — | Delete handler |

---

## IntegrationCard

External integration card with connection status and actions.

**Composes**: `Badge`/`Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | Integration name |
| `description` | `string` | — | Description |
| `provider` | `string` | — | Provider name |
| `connected` | `boolean` | `false` | Connection status |
| `status` | `"active" \| "inactive" \| "error"` | `"inactive"` | Status |

---

## OnboardingWizard

Step-by-step wizard with progress indicator and navigation.

**Composes**: `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `steps` | `WizardStep[]` | — | Step definitions |
| `currentStep` | `number` | — | Active step index |
| `onNext`/`onBack`/`onSkip` | `() => void` | — | Navigation handlers |
| `children` | `ReactNode` | — | Step content slot |
| `hideActions` | `boolean` | `false` | Hide footer buttons |

---

## PromptConfigFields

Shared prompt configuration (model, platform, temperature, anatomy fields).

**Composes**: `ParameterControl` (molecule), `Select`/`Textarea`/`Checkbox`/`Collapsible`/`Badge` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `config` | `PromptConfigState` | — | Current configuration |
| `onChange` | `(config: PromptConfigState) => void` | — | Change handler |
| `mode` | `"full" \| "compact" \| "settings"` | — | Display mode |
| `instructionOverride` | `string` | — | External instruction override |

**Modes**: `full` = AI Designer (all visible), `compact` = Dashboard (collapsible), `settings` = Detail page (flat)

---

## CreatePromptDialog

Dialog for creating new prompts with anatomy field selection and content.

**Composes**: `ParameterControl` (molecule), `Dialog`/`Input`/`Textarea`/`Select`/`Checkbox`/`Collapsible`/`Badge` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Dialog open state |
| `onOpenChange` | `(open: boolean) => void` | — | Open state handler |
| `onSubmit` | `(data: CreatePromptFormData) => void` | — | Submit handler |

---

## TestRunnerModal

Evaluation runner dialog with prompt input, model selection, and CLEAR results.

**Composes**: `CLEARScorePanel` (organism), `Select`/`Textarea`/`Input`/`Badge`/`Button`/`Dialog` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Dialog open state |
| `onOpenChange` | `(open: boolean) => void` | — | Open state handler |
| `initialPrompt` | `string` | `""` | Pre-filled prompt |
| `initialVariables` | `VariablePair[]` | `[]` | Pre-filled variables |

---

## APIDocPanel

API reference panel with base URL, auth, and expandable endpoints.

**Composes**: `Badge`/`Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Additional classes |

**Method colors**: GET → `success`, POST → `info`, PUT → `warning`, DELETE → `error`

---

## PresetCard

Compact preset row with system/custom badge and actions.

**Composes**: `Badge`/`Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `preset` | `PresetCardData` | — | Preset data |
| `onCopy`/`onConfigure`/`onDelete` | `(id: string) => void` | — | Action handlers |

---

## PresetDetailPanel

Full preset configuration panel with tabbed model/prompt editing.

**Composes**: `TabNav`/`ParameterControl` (molecules), `Input`/`Textarea`/`Select`/`Switch`/`Badge`/`Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `"model" \| "prompt"` | — | Preset type |
| `presetName` | `string` | — | Preset name |
| `onClose` | `() => void` | — | Close handler |

---

## OrganizationManager

Tab and tag management for prompt organization.

**Composes**: `Badge`/`Button`/`Input`/`Dialog`/`RadioGroup` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Additional classes |

---

## GlobalVariableManager

Table-based global variable management with type badges.

**Composes**: `Badge`/`Button`/`Input`/`Select`/`Table` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Additional classes |

---

## DataManager

Data export, import, and danger zone (clear data / delete account).

**Composes**: `Button`/`Checkbox`/`Dialog` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Additional classes |
