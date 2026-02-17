
# Settings Panel Overhaul — High-Fidelity Prototype

## Overview

Restructure the Settings page from 6 tabs to 7 tabs, consolidating existing content, eliminating redundant tabs, and adding 4 new feature-rich tabs (Presets, Organization, Variables, Data). All new components follow the existing atomic design patterns: bordered card containers with `font-display` headers, `font-mono` data values, `bg-card` surfaces, and `space-y-6` section spacing.

---

## Tab Structure (Before vs After)

| Before | After |
|---|---|
| Profile | Profile (+ merged Preferences content) |
| Billing | Billing (unchanged) |
| API Keys | API Keys (BYOK + API Docs + Integrations merged) |
| Integrations | *removed* |
| Preferences | *removed* (merged into Profile) |
| Team (disabled) | Team (disabled, unchanged) |
| -- | Presets (new) |
| -- | Organization (new) |
| -- | Variables (new) |
| -- | Data (new) |

---

## New Files to Create

### 1. `src/components/organisms/PresetCard.tsx`
Reusable card for both Model and Prompt presets:
- Name (`font-body font-medium`), Badge ("System" read-only or "Custom"), details line (`font-mono text-xs`): Provider, Model, Temp for model presets; Complexity, Field count for prompt presets
- Actions: [Copy] for system, [Configure] / [Delete] for user presets
- Clicking "Configure" opens an inline detail expansion or dialog

### 2. `src/components/organisms/PresetDetailPanel.tsx`
Detail view for configuring a preset:
- **Model Preset Detail**: Two sub-tabs (Generation / Evaluation) each with provider, model_id, temperature, target_platform, system_prompt, field_templates. "View Default" / "Customize" toggle for system prompt override.
- **Prompt Preset Detail**: Single view with provider, model, temperature, platform, user_prompt textarea, complexity select, reasoning_framework select, 9 anatomy field_templates. Context Engineering section (Knowledge Source Templates, Tool Schema Templates, Context Budget Defaults). Quality Gates section (toggle, min CLEAR score slider, required test runs, required fields, max context utilization %).

### 3. `src/components/organisms/OrganizationManager.tsx`
Two-section panel:
- **Tabs Section**: Header with [+ New Tab] button. "All Prompts" default tab (non-deletable, count badge). Custom tabs with edit/delete and prompt counts. Create modal with name field.
- **Tags Section**: Header with [+ New Tag] button. Primary tags (color dot, name, count, edit/delete). Secondary tags (lightweight). Unused tags (0 count) highlighted. Create/edit modal with name, type radio (primary/secondary), color picker (primary only).

### 4. `src/components/organisms/GlobalVariableManager.tsx`
Extended version of the existing `VariableManager` pattern:
- Table-like list: Name, Type badge, Default value, Description, Usage count
- Add variable form: name ({{variable_name}} syntax), type select (text/number/boolean/select/json), default value, description
- Sync note callout: "Global variables are templates -- importing copies the definition into the prompt."

### 5. `src/components/organisms/DataManager.tsx`
Three sections:
- **Export**: Checkboxes (All prompts, Variables, Settings) with [Download Export] button (JSON)
- **Import**: Drag-and-drop zone for `.json` files (reuses ImportDialog pattern)
- **Danger Zone**: Red-bordered card with Clear All Data (confirmation dialog) and Account deletion

### 6. `src/components/organisms/APIDocPanel.tsx`
Standard API documentation panel with mocked endpoints:
- Base URL display, Authentication section (Bearer token)
- Endpoint table: GET /prompts, GET /prompts/:id, POST /prompts, PUT /prompts/:id, DELETE /prompts/:id, POST /evaluate
- Each endpoint shows method badge, path, description, sample request/response in monospace code blocks

---

## Modified Files

### `src/pages/SettingsPage.tsx`
- Update tab array: Profile, Billing, API Keys, Presets, Organization, Variables, Data, Team (disabled)
- **Profile tab**: Keep Personal Information card. Add "Editor Defaults" card below it (moved from Preferences). Remove Danger Zone (moved to Data tab).
- **API Keys tab**: Section 1 = existing `APIKeyManager` (BYOK). Section 2 = new `APIDocPanel`. Section 3 = existing integrations grid using `IntegrationCard`.
- **Presets tab**: Model Presets section (system presets read-only + user presets CRUD) + Prompt Presets section (same pattern)
- **Organization tab**: Render `OrganizationManager`
- **Variables tab**: Render `GlobalVariableManager`
- **Data tab**: Render `DataManager`
- Remove `activeSection === "integrations"` and `activeSection === "preferences"` conditionals
- Update KPI row to reflect new counts (Presets, Variables, etc.)

### `src/components/organisms/index.ts`
- Add exports for all new organisms: `PresetCard`, `PresetDetailPanel`, `OrganizationManager`, `GlobalVariableManager`, `DataManager`, `APIDocPanel`

### `src/DESIGN_SYSTEM.md`
- Add new organisms to the inventory
- Update Settings page description with new tab structure
- Update component counts

---

## Mock Data

All tabs use realistic mocked data:

- **Model Presets**: 3 system (Balanced, Creative, Precise) + 1 user custom
- **Prompt Presets**: 2 system (Customer Support, Code Review) + 1 user custom
- **Tabs**: All Prompts (24), Customer Support (8), Internal Tools (6), Content Gen (10)
- **Tags**: Primary (3 color-coded), Secondary (4 lightweight), 1 unused for cleanup highlight
- **Global Variables**: 5 variables with types and usage counts
- **API Endpoints**: 6 mocked REST endpoints with sample JSON

---

## Technical Notes

- All new components use the standard card pattern: `rounded-md border border-border bg-card` with `border-b border-border px-3 py-2` headers
- Typography: `font-display` for section titles, `font-body` for descriptions, `font-mono` for data/code values
- Dialogs use `z-modal` (300) and `max-w-3xl` for create/edit modals
- Badge variants reuse existing `outline`, `success`, `secondary`, and `count` variants
- Switch, Select, Input, Textarea all follow existing `bg-card h-9 rounded-md` standards
- Color picker for tags uses a simple preset color palette (8-10 colors) rendered as clickable circles
- Quality Gates sliders reuse `ParameterControl` molecule
- The preset system prompt "View Default" / "Customize" toggle uses a read-only textarea that becomes editable
