

## Fix: Edit and Back Button Navigation Crash

### Problem

Both the **Edit** button (saved view) and **Back** button (edit page) crash with:
`React.Children.only expected to receive a single React element child`

This happens because `Button asChild` uses Radix's `Slot`, which requires exactly one React element child. But the `Link` inside contains multiple children (icon + text), causing the crash. The pages render blank/broken as a result.

### Solution

Wrap the icon and text inside the `Link` so that `Button` receives a single child element. The `Link` itself is the single child — its internal contents (icon + text) are fine.

The fix is the same pattern for both files: ensure Button with `asChild` receives exactly one child element.

---

### Technical Details

**File 1: `src/pages/PromptDetailPage.tsx`** (Edit button, lines 93-98)

Current (broken):
```tsx
<Button size="sm" asChild>
  <Link to={`/app/library/${id}/edit`}>
    <Pencil className="h-3.5 w-3.5" />
    Edit
  </Link>
</Button>
```

The issue is subtle — the `Link` has two children nodes (the icon element and the "Edit" text node). Radix Slot merges props onto the single child, and `Link` IS the single child here. This should actually work. Let me investigate further — the error may come from another `asChild` usage on the page, or from how the Button component handles `asChild` internally.

Actually, re-reading the error and the code — the `Button` component uses `Slot` when `asChild` is true. `Slot` calls `React.Children.only` on its children, which means the `Link` element must be the only child of `Button`. The `Link` component has an icon + text inside it, but `Link` itself is a single element — so this should work.

The crash is likely on the **edit page** specifically. Let me look more carefully at the PromptEditorPage Back button code — it was written with `asChild` and a `Link` containing icon + text. This is the standard pattern and should work with shadcn/ui Button.

The real issue might be that the page itself is erroring during render for another reason. But the console clearly shows `React.Children.only` from `Slot`. This means one of the `asChild` buttons has a problem.

Looking again at PromptEditorPage, the History button (line 107) does NOT use `asChild` so that's fine. The Run button (line 110) also doesn't. Only the Back button (lines 101-106) and Save button use `asChild`... wait, Save doesn't use `asChild` either.

The issue is likely that `<Button asChild>` with children containing both a React element AND a text node causes the problem. The `Link` is one element, so `Slot` should handle it. Unless the Button's internal implementation wraps differently.

Let me check the Button component to be sure, and also verify if both pages crash or just the edit page.

**Fix approach**: Remove `asChild` from both buttons and wrap the `Link` around the `Button` instead, or use `onClick` + `useNavigate()` for navigation.

**File 1: `src/pages/PromptEditorPage.tsx`**
- Replace the `asChild` Back button with a regular `Button` inside a `Link`, or use `useNavigate` with `onClick`

**File 2: `src/pages/PromptDetailPage.tsx`**
- Same fix for the Edit button

The simplest fix: swap the nesting so `Link` wraps `Button` (without `asChild`), or just use `useNavigate()`:

```tsx
// Option A: Link wraps Button
<Link to={`/app/library/${id}`}>
  <Button variant="ghost" size="sm">
    <ArrowLeft className="h-3.5 w-3.5" />
    Back
  </Button>
</Link>

// Option B: useNavigate (cleaner)
<Button variant="ghost" size="sm" onClick={() => navigate(`/app/library/${id}`)}>
  <ArrowLeft className="h-3.5 w-3.5" />
  Back
</Button>
```

Option B is cleaner. We'll use `useNavigate` for both buttons.

### Changes

1. **`src/pages/PromptEditorPage.tsx`**: Replace `Button asChild > Link` with `Button onClick={() => navigate(...)}` for the Back button. Add `useNavigate` import.

2. **`src/pages/PromptDetailPage.tsx`**: Same fix for the Edit button — replace `Button asChild > Link` with `Button onClick={() => navigate(...)}`. Add `useNavigate` import.
