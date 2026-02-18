
# Color System Upgrade — Cross-Theme Audit Fix

## Overview

Apply 28 token changes across 3 themes plus 3 new tokens to fix the 6 identified issues: collapsed surface hierarchy, cold light theme, theme-blind semantics, accent inconsistency documentation, dark input/card collision, and missing accent variants.

---

## Changes Summary

### Files Modified

1. **`src/index.css`** — All CSS variable updates (28 token changes + 3 new tokens per theme)
2. **`tailwind.config.ts`** — Add 3 new color tokens: `accent-muted`, `accent-subtle`, `warm-dark`
3. **`src/DESIGN_SYSTEM.md`** — Document all changes, new tokens, and the intentional warm accent shift
4. **`src/pages/TokenSmokeTest.tsx`** — Add visual test rows for the 3 new tokens

---

## Token Changes by Theme

### DARK THEME (`:root`) — 9 changes

| Token | Before | After | Reason |
|---|---|---|---|
| `--secondary` | `12 6% 15%` | `20 8% 17%` | Decouple from card |
| `--surface` | `24 10% 10%` | `20 8% 8%` | Decouple from muted, darker |
| `--muted` | `24 10% 10%` | `24 10% 12%` | Distinct middle layer |
| `--input` | `12 6% 15%` | `20 8% 17%` | Decouple from card |
| `--border` | `30 6% 25%` | `25 8% 25%` | Warmer hue |
| `--success` / `-bg` / `-border` | `142 71% 45%` | `148 45% 50%` | Warmer, lighter for dark bg |
| `--warning` / `-bg` / `-border` | `45 93% 47%` | `40 75% 55%` | Golden, less acidic |
| `--error` / `-bg` / `-border` | `0 84% 60%` | `6 65% 60%` | Warm terracotta red |
| `--info` / `-bg` / `-border` | `217 91% 60%` | `215 50% 62%` | Muted, lighter |

Plus `--destructive` updated to match error: `6 65% 60%`

New tokens added:
- `--accent-muted: 18 40% 30%`
- `--accent-subtle: 20 15% 10%`
- `--warm-dark: 20 8% 72%`

### LIGHT THEME (`.light`) — 12 changes

| Token | Before | After | Reason |
|---|---|---|---|
| `--background` | `0 0% 96%` | `30 5% 96%` | Add warmth |
| `--card` | `0 0% 100%` | `40 8% 99%` | Warm white |
| `--popover` | `0 0% 100%` | `40 8% 99%` | Match card |
| `--primary-foreground` | `0 0% 98%` | `40 6% 98%` | Warm white |
| `--secondary` | `0 0% 96%` | `30 8% 93%` | Separate from background |
| `--muted` | `0 0% 96%` | `25 6% 91%` | Distinct layer |
| `--muted-foreground` | `20 3% 41%` | `20 6% 41%` | Less dead gray |
| `--accent-foreground` | `0 0% 100%` | `40 6% 99%` | Warm white |
| `--border` / `--input` | `20 6% 90%` | `25 8% 89%` | Warmer border |
| `--surface` | `0 0% 98%` | `40 6% 97%` | Match warm family |
| `--success` | same base | `148 50% 42%` | Warmer green |
| `--warning` | same base | `40 80% 48%` | Golden amber |
| `--error` / `--destructive` | same base | `6 70% 52%` | Warm red |
| `--info` | same base | `215 55% 52%` | Muted steel-blue |

New tokens:
- `--accent-muted: 18 35% 65%`
- `--accent-subtle: 30 12% 94%`
- `--warm-dark: 20 12% 36%`

Sidebar tokens updated to match warm surface values.

### WARM THEME (`.warm`) — 7 changes

| Token | Before | After | Reason |
|---|---|---|---|
| `--secondary` | `30 18% 91%` | `28 14% 87%` | 4pts darker than bg |
| `--muted` | `30 18% 91%` | `25 12% 88%` | Between secondary and bg |
| `--muted-foreground` | `20 3% 41%` | `20 6% 41%` | Less dead gray |
| `--border` / `--input` | `30 12% 82%` | `28 14% 81%` | Smoother curve |
| `--success` | same base | `152 45% 38%` | Deep earthy green |
| `--warning` | same base | `38 70% 45%` | Deep golden |
| `--error` / `--destructive` | same base | `8 60% 48%` | Deep warm red |
| `--info` | same base | `215 45% 48%` | Deep muted blue |

New tokens:
- `--accent-muted: 18 38% 55%`
- `--accent-subtle: 30 15% 92%`
- `--warm-dark: 20 14% 30%`

---

## Tailwind Config Updates

Add to `colors` in `tailwind.config.ts`:

```text
"accent-muted": "hsl(var(--accent-muted))"
"accent-subtle": "hsl(var(--accent-subtle))"
"warm-dark": "hsl(var(--warm-dark))"
```

Also update `accent` to include `muted` and `subtle` as sub-keys for consistency.

---

## Token Smoke Test Update

Add a new section to `TokenSmokeTest.tsx` showing:
- `accent-muted` swatch (hover state simulation)
- `accent-subtle` swatch (highlight/selection)
- `warm-dark` swatch (emphasis text)

---

## Documentation Updates

Update `src/DESIGN_SYSTEM.md`:
- Add new tokens to the Color Token Quick Reference
- Document the intentional accent lightness shift in warm theme (H4 fix)
- Add changelog entry for the cross-theme color audit
- Update the color distribution description to note theme-adaptive semantics

---

## Technical Notes

- Status colors (`--status-*`) are NOT changed — they use the same base as semantics but serve a different purpose (lifecycle badges). They will inherit the semantic fixes where they share the same CSS variable values.
- The `--destructive` token is updated to match `--error` in each theme for consistency.
- All changes are pure CSS variable updates — no component code changes needed beyond the smoke test.
- The popover tokens mirror card tokens in each theme (existing pattern preserved).
