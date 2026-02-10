

## Navigation Restructuring

### Overview

Simplify the top bar to contain only the search command component, and reorganize the sidebar into three distinct sections: active Hubs, Projects (tag-based prompt organization), and Coming Soon modules.

---

### 1. TopBar Simplification

**Remove**: title/breadcrumbs, notifications bell, avatar/profile button.
**Keep**: mobile hamburger menu (left), search command button with keyboard shortcut (right).

The header becomes a minimal, utility-only bar -- all identity lives in the sidebar footer, and page titles are handled by each page's own content area.

---

### 2. Sidebar Reorganization

The sidebar nav gets three grouped sections:

```text
+---------------------------+
| promptx          [<<]     |
+---------------------------+
| HUBS                      |
|   Store                   |
|   Designer                |
|   Settings                |
+---------------------------+
| PROJECTS            [+]   |
|   # Work            (12)  |
|   # Personal         (8)  |
|   # Client ABC       (5)  |
|   # Side Projects    (3)  |
|   # Research          (2) |
+---------------------------+
| COMING SOON               |
|   Analytics          --   |
|   Templates          --   |
|   API                --   |
+---------------------------+
|  [MR] Mariano             |
|  mariano@promptx.io       |
+---------------------------+
```

**Section 1 -- Hubs**: Active, clickable navigation modules.
- "Store" (was "Prompt Store", routes to `/app/library`)
- "Designer" (was "AI Designer", routes to `/app/ai-designer`)
- "Settings" (routes to `/app/settings`)
- Uses icons: `FileText`, `Sparkles`, `Settings`

**Section 2 -- Projects**: Tag-based prompt organization. Each project is a primary tag that acts like a folder filter.
- Mock data: Work (12), Personal (8), Client ABC (5), Side Projects (3), Research (2)
- Clicking a project navigates to `/app/library?project=<slug>` (filters the store view)
- A small "+" button in the section header to add new projects
- Items use a `#` prefix (hash icon or text) to convey the tag/folder concept
- Uses the `count` badge on `NavItem` to show prompt count
- In collapsed mode, projects section is hidden (too many items, no meaningful icons)

**Section 3 -- Coming Soon**: Non-interactive, dimmed modules.
- Analytics, Templates, API
- Rendered with `disabled` prop on `NavItem` plus a "soon" badge
- No hover/click styling (already handled by `NavItem`'s disabled state)

---

### 3. Route Mapping Update

The `AppShell` route mapping needs updating since nav IDs change:
- "store" maps to `/app/library`
- "designer" maps to `/app/ai-designer`
- "settings" maps to `/app/settings`
- Dashboard removed from sidebar nav (still accessible as `/app` index route)
- Project clicks navigate to `/app/library?project=<slug>`

---

### Technical Details

#### Files to modify:

**`src/components/organisms/TopBar.tsx`**
- Remove `Avatar`, `AvatarFallback` imports and usage
- Remove `Bell` icon import and notifications button
- Remove `BreadcrumbNav` import and title/breadcrumb rendering
- Keep only: mobile menu button (left side) and search button with `Cmd+K` shortcut (right side)
- Remove `breadcrumbs`, `title` props from interface (keep `onMenuClick`, `showMobileMenu`, `actions`, `className`)

**`src/components/organisms/SidebarNav.tsx`**
- Replace flat `navItems` array with three section arrays: `hubItems`, `projectItems`, `comingSoonItems`
- Hub items: `{ id: "store", label: "Store", icon: FileText }`, `{ id: "designer", label: "Designer", icon: Sparkles }`, `{ id: "settings", label: "Settings", icon: Settings }`
- Project mock data: `{ id: "work", label: "Work", count: 12 }`, `{ id: "personal", label: "Personal", count: 8 }`, etc.
- Coming soon items: `{ id: "analytics", label: "Analytics", icon: BarChart3 }`, `{ id: "templates", label: "Templates", icon: LayoutTemplate }`, `{ id: "api", label: "API", icon: Code2 }`
- Render three `SidebarGroupLabel`-style section headers: "Hubs", "Projects" (with a `+` button), "Coming Soon"
- Projects section uses `Hash` icon and `NavItem` with `count` prop
- Coming soon section uses `NavItem` with `disabled` and a "soon" `Badge`
- Hide Projects section when `collapsed` is true
- Add `onProjectClick` callback prop for project tag navigation

**`src/components/templates/AppShell.tsx`**
- Update `handleNavClick` route mapping: `store` -> `/app/library`, `designer` -> `/app/ai-designer`
- Remove `title` prop from `TopBar` (no longer needed)
- Add `handleProjectClick` that navigates to `/app/library?project=<slug>`
- Update `activeItem` detection logic for new IDs

**`src/components/molecules/NavItem.tsx`**
- Add optional `badge` prop (for "soon" text) alongside existing `count`
- Render badge when provided (uses `Badge` variant="secondary" or similar)

