

# Evaluator Experience: Test Runner Modal + Evaluation Results Panel

## Overview

This plan redesigns the Evaluator tab into a proper prompt evaluation experience. Users paste/write a prompt (or start from a preset), run an AI evaluation that returns a CLEAR framework score, KPIs, and an improved version -- both as full text and as anatomy fields. The current analytics-style dashboard content (EvaluationResults, TestDatasetManager, RunHistory) gets extracted to a separate file for future analytics use.

## What Changes

### 1. Extract analytics data to a separate file

Move the current evaluator tab content (the dashboard-style EvaluationResults, TestDatasetManager, RunHistory mock data and layout) into a new file `src/data/evaluator-analytics-mock.ts` so it's preserved for future analytics implementation but no longer clutters the evaluator UX.

### 2. New Organism: `TestRunnerModal`

A Dialog modal (consistent with CreatePromptDialog and ScoreBreakdown patterns) triggered by "Run" buttons across the app.

**Location**: `src/components/organisms/TestRunnerModal.tsx`

**Contents (top to bottom)**:
- DialogHeader: "Test Run" title + description
- Prompt input: a monospace Textarea for pasting/writing the prompt (pre-filled when launched from editor)
- "Start from preset" link (reuses the same `ArrowRight` pattern from AI Designer)
- Model selection: reuses the existing `ModelSelect` pattern from PromptConfigFields (Select with grouped providers)
- Variable inputs section: if prompt contains `{{variables}}`, show name/value pairs (reuses the VariableEditorRow molecule pattern)
- "Run Evaluation" Button with Sparkles icon
- Results area (appears after run, replaces empty state):
  - KPI row: 3 inline stats (Tokens, Latency, Est. Cost) using the same `font-mono text-lg font-bold` pattern from EvaluationResults
  - CLEAR Score gauge section (see next organism)

**Props**: `open`, `onOpenChange`, `initialPrompt?` (string, pre-filled from editor), `initialVariables?`

**Reused components**: Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button, Select, Textarea, Badge

### 3. New Organism: `CLEARScorePanel`

An expandable/collapsible panel showing the CLEAR framework evaluation results. Used inside TestRunnerModal and also embeddable in the editor as an expandable section.

**Location**: `src/components/organisms/CLEARScorePanel.tsx`

**CLEAR Framework dimensions** (5 criteria):
- **C**larity -- How unambiguous the instructions are
- **L**everage -- How well it uses model capabilities
- **E**fficiency -- Token optimization, no redundancy
- **A**daptability -- Handles edge cases and variations
- **R**obustness -- Resilience to adversarial inputs

**Layout (top to bottom)**:
- Overall CLEAR score: large mono number with semantic color (reuses `scoreColor` pattern from EvaluationResults)
- Dimension breakdown: 5 rows, each with label, Progress bar, score (reuses exact pattern from EvaluationResults metrics section)
- Strengths section: 2-3 bullet points with success-colored dots
- Improvements section: 2-3 bullet points with warning-colored dots
- Top 3 Suggestions: each in a bordered card-row with suggestion text + "Apply" ghost Button

**Reused components**: Progress, Badge, Button

### 4. New Organism: `ImprovedPromptPanel`

Shows the AI-improved version of the prompt in two views.

**Location**: `src/components/organisms/ImprovedPromptPanel.tsx`

**Two sub-sections via TabNav**:
- **Full Version** tab: monospace read-only view of the complete improved prompt (reuses CompiledPreview pattern) with Copy and "Save to Store" buttons. "Save to Store" opens a small inline form with status select (Draft default, Testing, Production) using existing status Badge variants.
- **Anatomy Fields** tab: the improved prompt broken into the 9 anatomy fields, each rendered as an `AnatomyFieldCard` with `variant="expanded"` (editable). Below: "Re-evaluate" Button and "Save to Store" Button.

**Reused components**: TabNav, CompiledPreview (pattern), AnatomyFieldCard, Button, Badge (status variants), Select

### 5. Rewire the Evaluator tab in AIDesignerPage

Replace the current analytics dashboard with the new evaluator experience:

**Layout**: 50/50 split (matching Generator tab), consistent with page architecture.

- **Left pane** ("Evaluate"): card with prompt Textarea input, model select, "Start from preset" link, and "Evaluate" Button. Same card pattern as Generator's Configuration pane.
- **Right pane** ("Results"): Initially shows empty state italic text. After evaluation: CLEARScorePanel + ImprovedPromptPanel stacked in a scrollable area.

### 6. Rewire the Evaluator tab in DashboardPage

Replace the `EvaluationResults` mini-view with a compact evaluator snippet:
- Same compact card pattern as the Generator snippet
- Textarea for prompt + "Evaluate" button
- On click, opens TestRunnerModal

### 7. Wire "Run" buttons to TestRunnerModal

Connect the existing "Run" buttons in:
- `PromptDetailPage` -- the "Run" ghost button in the header opens TestRunnerModal with the compiled prompt pre-filled
- `PromptEditorPage` -- the "Run" ghost button opens TestRunnerModal with current compiled output

### 8. Update organisms barrel export

Add new organisms to `src/components/organisms/index.ts`:
- `TestRunnerModal`
- `CLEARScorePanel`
- `ImprovedPromptPanel`

### 9. Update DESIGN_SYSTEM.md

Document:
- CLEAR framework (5 dimensions with descriptions)
- TestRunnerModal (trigger points, props, content)
- CLEARScorePanel (layout, reused patterns)
- ImprovedPromptPanel (two-tab structure, save flow)
- Updated Evaluator tab description in page architecture

---

## Technical Details

### File changes summary

| Action | File |
|--------|------|
| Create | `src/data/evaluator-analytics-mock.ts` |
| Create | `src/components/organisms/TestRunnerModal.tsx` |
| Create | `src/components/organisms/CLEARScorePanel.tsx` |
| Create | `src/components/organisms/ImprovedPromptPanel.tsx` |
| Modify | `src/pages/AIDesignerPage.tsx` |
| Modify | `src/pages/DashboardPage.tsx` |
| Modify | `src/pages/PromptDetailPage.tsx` |
| Modify | `src/pages/PromptEditorPage.tsx` |
| Modify | `src/components/organisms/index.ts` |
| Modify | `src/DESIGN_SYSTEM.md` |

### Component reuse map

```text
TestRunnerModal
  +-- Dialog, DialogContent, DialogHeader (ui)
  +-- Select w/ grouped models (from PromptConfigFields pattern)
  +-- Textarea (ui)
  +-- Button (ui)
  +-- Badge (ui)
  +-- CLEARScorePanel (new organism)

CLEARScorePanel
  +-- Progress (ui)
  +-- Badge (ui)
  +-- Button (ui)
  (follows EvaluationResults metric-row pattern exactly)

ImprovedPromptPanel
  +-- TabNav (molecule)
  +-- AnatomyFieldCard (organism, variant="expanded")
  +-- Button (ui)
  +-- Badge (status variants)
  +-- Select (ui)
  (follows CompiledPreview monospace pattern for Full Version tab)
```

### Entry points for evaluator

```text
Dashboard Evaluator tab  -->  compact card + opens TestRunnerModal
AI Designer Evaluator tab -->  inline 50/50 split experience
Prompt Detail "Run"       -->  TestRunnerModal (pre-filled)
Prompt Editor "Run"       -->  TestRunnerModal (pre-filled)
```

### Mock data approach

All components remain in prototype mode with hardcoded mock data for CLEAR scores, suggestions, and improved prompt content. No API calls or backend integration.

