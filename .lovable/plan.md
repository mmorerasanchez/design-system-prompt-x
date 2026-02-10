

## Restructuring Prompt Detail into Two Pages

This plan splits the current single prompt detail page into two distinct experiences:

### 1. Saved View Page (`/app/library/:id`)
A read-only summary page showing the prompt at a glance.

**Layout: 50/50 split**
- **Left 50%**: Scrollable summary of Fields, Settings, and Variables (read-only, stacked sections)
- **Right 50%**: Compiled Output (always visible, sticky)

**Header actions**: History (icon + label, disabled if no versions), Run, Edit (navigates to `/app/library/:id/edit`)

**Includes**:
- Breadcrumb
- Title + version badge
- Status lifecycle bar
- KPI row (4 stats)
- NO tabs

### 2. Edit Page (`/app/library/:id/edit`)
The full editing workspace with tabs on the left and compiled output always visible on the right.

**Layout: 50/50 split (using EditorLayout)**
- **Left 50%**: Header bar with actions + TabNav + tab content (scrollable)
- **Right 50%**: Compiled Output (always visible, sticky)

**Header actions**: History (icon), Run, Save

**Tabs** (left pane only): Fields, Settings, Variables, Versions, Variations (disabled/soon)

**No KPIs** in edit mode.

---

### Technical Details

```text
/app/library/:id (Saved View)
+-----------------------------------------------+
| Breadcrumb                                     |
| Title + Badge          [History] [Run] [Edit]  |
| StatusLifecycleBar                             |
| KPI Row (4 cards)                              |
+----------------------+------------------------+
| Fields Summary       | Compiled Output        |
| Settings Summary     | (sticky, always visible)|
| Variables Summary    |                        |
+----------------------+------------------------+

/app/library/:id/edit (Edit View)
+-----------------------------------------------+
| Title + Badge   [History] [Run] [Save]         |
+----------------------+------------------------+
| [Fields][Settings]   | Compiled Output        |
| [Variables][Versions] | (sticky, always visible)|
| [Variations(soon)]   |                        |
|                      |                        |
| << Active tab        |                        |
| << content here      |                        |
+----------------------+------------------------+
```

### Files to Change

**1. `src/pages/PromptDetailPage.tsx`** (major rewrite)
- Remove all tabs and tab content
- Switch to a 50/50 split layout (reuse `EditorLayout` template)
- Left side: stacked read-only summaries of Fields (collapsed anatomy cards), Settings (model, platform, temp, etc.), and Variables
- Right side: `CompiledPreview` always visible
- Header actions: History button (with `History` icon, disabled state for no versions), Run button, Edit button (links to `/:id/edit`)
- Keep KPI row above the split
- Keep breadcrumb, title bar, status bar

**2. `src/pages/PromptEditorPage.tsx`** (major rewrite)
- Move all the current tab-based editing content (Fields, Settings, Variables, Versions, Variations) from `PromptDetailPage` into this file
- Use `EditorLayout` with left pane containing a header bar + tabs + tab content, right pane showing `CompiledPreview`
- Header actions: History (icon button), Run, Save
- Add breadcrumb with "Library > Prompt Name > Edit"
- Remove the current `PlaygroundPanel` from the right side (replaced by `CompiledPreview`)
- No KPI row
- Include the `TabNav` inside the left pane (not in the global header)

**3. `src/components/templates/DetailLayout.tsx`**
- Make `tabs` prop optional since the saved view won't use tabs

**4. No routing changes needed** -- routes already exist for both `/app/library/:id` and `/app/library/:id/edit`
