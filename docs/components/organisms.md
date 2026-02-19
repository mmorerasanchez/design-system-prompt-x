# Organisms — Component Reference

> Major UI sections composed of molecules, atoms, and UI primitives.
> Directory: `src/components/organisms/`
> **15 components · 4 categories**

---

## Categories

| Category | Count | Components |
|---|---|---|
| [Navigation & Layout](#navigation--layout) | 5 | TopBar, SidebarNav, FilterBar, BulkActionsBar, UserMenu |
| [Dashboard & Data](#dashboard--data) | 4 | DataTable, DashboardStats, ActivityFeed, AuthForm |
| [Import & Export](#import--export) | 2 | ImportDialog, ExportMenu |
| [Settings & Config](#settings--config) | 4 | SettingsNav, APIKeyManager, IntegrationCard, OnboardingWizard |

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

API keys, integrations, onboarding, and settings navigation.

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
