

## Fix Consistency Issues: Border Radius and Motion Variables

Two corrections to align the codebase with the intended design specification.

---

### 1. Border Radius Update

**Problem:** The current `--radius` is `0.5rem` (8px), which produces `rounded-lg: 8px`, `rounded-md: 6px`, `rounded-sm: 4px`. The spec wants `rounded-lg: 12px`, `rounded-md: 8px`, `rounded-sm: 4px`.

**Fix:**
- In `src/index.css`: Change `--radius: 0.5rem` to `--radius: 0.75rem` (12px)
- The existing calc chain in `tailwind.config.ts` already produces the correct values:
  - `lg` = `var(--radius)` = 12px
  - `md` = `calc(var(--radius) - 2px)` = 10px
  - `sm` = `calc(var(--radius) - 4px)` = 8px

**Wait** -- that gives 12/10/8, but the spec says 12/8/4. So the calc chain also needs updating.

**Revised fix:**
- `src/index.css`: `--radius: 0.75rem`
- `tailwind.config.ts` borderRadius:
  - `lg`: `var(--radius)` = 12px
  - `md`: `calc(var(--radius) - 4px)` = 8px
  - `sm`: `calc(var(--radius) - 8px)` = 4px

- Update `src/DESIGN_SYSTEM.md` border radius table to reflect `Small = 4px`, `Medium = 8px`, `Large = 12px`.

---

### 2. Motion Variables Rename

**Problem:** Current variable names (`--duration-fast`, `--duration-default`, `--duration-moderate`, `--duration-slow`) don't match the spec names. Missing `--duration-instant`.

**Current (index.css line 94-98):**
```
--duration-fast: 100ms;
--duration-default: 150ms;
--duration-moderate: 200ms;
--duration-slow: 300ms;
```

**New values:**
```
--duration-instant: 50ms;
--duration-fast: 100ms;
--duration-normal: 150ms;
--duration-medium: 200ms;
--duration-slow: 300ms;
```

The easing variables (`--ease-default`, `--ease-in`, `--ease-out`, `--ease-spring`) are already named correctly -- no changes needed there.

- Update `src/DESIGN_SYSTEM.md` motion table to use the corrected variable names.

---

### Files Modified

| File | Change |
|---|---|
| `src/index.css` | Update `--radius` to `0.75rem`; rename motion variables, add `--duration-instant` |
| `tailwind.config.ts` | Update `borderRadius` calc values for `md` and `sm` |
| `src/DESIGN_SYSTEM.md` | Update border radius table and motion variable names |

### Impact

No components currently reference the motion CSS variables directly (they use Tailwind `duration-*` utilities), so the rename is safe. The border radius change will subtly increase corner rounding across all components using `rounded-lg` (8px to 12px) and `rounded-md` (6px to 8px), while `rounded-sm` stays at 4px.

