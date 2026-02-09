

## Review: Prompts 5-9 vs Current State

After thorough review, here is what is already done, what still needs work, and what needs correction in the prompts themselves.

---

### Prompt 5 (Build Atoms) — Partially Done

**Already implemented:** Heading, Text, Code, Kbd (all in `Typography.tsx`), Tag (`Tag.tsx`), Spinner + ThinkingDots (`Spinner.tsx`). All APIs match the spec.

**Still needed:**
1. **Split `Typography.tsx`** into 4 separate files: `Heading.tsx`, `Text.tsx`, `Code.tsx`, `Kbd.tsx` (one-component-per-file rule)
2. **Create `Link.tsx`** — the only truly new component
3. **Add `color` prop to `Tag.tsx`** for anatomy field colors (using explicit class maps to avoid Tailwind purging)
4. **Delete `Typography.tsx`** after extraction
5. **Update barrel `index.ts`** to export from individual files + add Link
6. **Update 7 import paths** across the codebase (files importing from `atoms/Typography`)

**No logic changes** to existing components — just file splitting and one new component.

---

### Prompt 6 (font-mono Audit) — Partially Done

**Already correct:**
- `input.tsx`: has `font-mono` and `bg-card`, `rounded-md`, focus ring ✓
- `textarea.tsx`: has `font-mono` and `bg-card`, `rounded-md`, focus ring ✓

**Issues found:**
- `select.tsx` SelectTrigger: missing `font-mono`, uses `bg-background` (should be `bg-card`), uses `h-10` (should be `h-9`)
- `AuthForm.tsx`: Inputs override with `className="font-body"` on name, email, and password fields — this **contradicts** the "font-mono on all inputs" rule. However, for auth forms (name, email, password), `font-body` arguably makes more sense than monospace. **Decision needed:** Should auth inputs be an exception, or strict font-mono everywhere?

**My recommendation:** Auth form inputs (name, email, password) are not "prompt content" — they are personal data. Using `font-body` there is sensible and aligns with the "Prompts Are Code" philosophy (these aren't prompts). I'd leave them as `font-body` but document the exception. The `font-mono` rule should apply to all prompt-related inputs.

---

### Prompt 7 (Update Knowledge File / DESIGN_SYSTEM.md) — Mostly Done

**Already correct in the doc:**
- Platform colors already removed from color tables ✓
- TabNav already listed in molecules (line 246) ✓
- Tab labels row already in Font Usage Matrix (line 51) ✓
- Badge row already says "no platform variants" (line 218) ✓
- EmptyState described as "Title + description + CTA button (no icon)" (line 244) ✓
- Icon rules table already excludes Empty states (line 366) ✓

**Still needed:** Nothing — all Prompt 7 items are already reflected in the current `DESIGN_SYSTEM.md`.

---

### Prompt 8 (Reconcile Component Count) — Needed

**Current issues in the doc:**
- Executive summary says "86 components" (line 9) — wrong
- Organisms section header says "(38)" (line 256) — should be (35) after consolidating AnatomyFieldCard
- AnatomyFieldCard listed as 4 separate rows (lines 275-278) — should be 1 row with "4 variants" note
- Molecules table is broken: rows 250-254 lack the Notes column
- Footer says "86 components" (line 383) — wrong

**Correct counts:**
- Atoms: 22 ✓
- Molecules: 17 (12 in main table + 5 below) ✓
- Organisms: 35 (38 rows minus 3 duplicate AnatomyFieldCard rows)
- Templates: 8 ✓
- **Total: 82**

**Work needed:**
1. Consolidate AnatomyFieldCard into 1 row
2. Merge broken molecule rows into main table with Notes column
3. Update organism count to 35
4. Update total from 86 to 82 in summary and footer
5. Add HTML comment checksum at bottom

---

### Prompt 9 (Duration Tokens in index.css) — Partially Done

**Already present in `index.css`:**
- All 5 duration tokens (`--duration-instant` through `--duration-slow`) ✓
- All 4 easing tokens (`--ease-default`, `--ease-in`, `--ease-out`, `--ease-spring`) ✓

**Missing from `index.css`:**
- AI state tokens: `--ai-pulse-duration`, `--ai-thinking-dot-size`, `--ai-thinking-gap`, `--ai-thinking-duration`, `--ai-cursor-width`, `--ai-cursor-blink`

**Tailwind keyframe verification:**
- `ai-pulse`: uses `1.4s` ✓ (matches `--ai-thinking-duration`)
- `ai-cursor`: uses `1s` ✓ (matches `--ai-cursor-blink`)
- These are hardcoded in config (correct — Tailwind can't reference CSS vars at config level)

---

### Summary: What Actually Needs Doing

| Prompt | Status | Remaining Work |
|---|---|---|
| 5 (Atoms) | 70% done | Split Typography.tsx, create Link.tsx, add Tag color prop |
| 6 (font-mono) | 90% done | Fix SelectTrigger (font-mono, bg-card, h-9) |
| 7 (Knowledge) | 100% done | Nothing |
| 8 (Count) | 0% done | Full reconciliation needed |
| 9 (Tokens) | 80% done | Add 6 AI state CSS variables |

### Recommended Implementation Order

1. **Prompt 9** first (add AI state tokens) — no dependencies, quick
2. **Prompt 6** next (fix SelectTrigger) — single file edit
3. **Prompt 5** (split atoms + create Link) — most files touched
4. **Prompt 8** last (doc reconciliation) — purely documentation, reflects final state

Prompt 7 can be skipped entirely — it is already done.

### Decision Needed

Should auth form inputs (name, email, password in `AuthForm.tsx`) keep `font-body` as an intentional exception, or switch to `font-mono` for strict consistency?

