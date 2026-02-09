import { TemplatePreview } from "@/components/templates/TemplatePreview";

export default function TemplatesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight">Templates</h1>
        <p className="mt-1 font-body text-base text-muted-foreground">
          Page layout templates that define content zones and responsive behavior. Templates compose organisms into full-page structures.
        </p>
      </div>

      <TemplatePreview
        title="App Shell"
        description="CSS Grid: sidebar column + header row + content area. 100vh. Used by all authenticated pages."
        composedOf="SidebarNav + TopBar + main content area"
        responsive="Sidebar becomes overlay drawer on mobile"
        layout="sidebar-main"
        zones={[
          { label: "Sidebar (240px)" },
          { label: "Top Bar (56px)" },
          { label: "Main Content" },
        ]}
      />

      <TemplatePreview
        title="Dashboard Layout"
        description="Max-width content within App Shell. Vertical stack: stats row → quick actions → activity feed."
        composedOf="AppShell + DashboardStats + ActivityFeed"
        responsive="Stats: 2-col mobile → 4-col desktop"
        layout="sidebar-main"
        zones={[
          { label: "Sidebar" },
          { label: "Top Bar" },
          { label: "Stats → Actions → Feed" },
        ]}
      />

      <TemplatePreview
        title="Editor Layout"
        description="Split-pane: left editor (60%) + resizer (4px) + right preview/playground (40%). Collapses to stacked on mobile."
        composedOf="AppShell + PromptEditorPanel + CompiledPreviewPanel"
        responsive="Split-pane collapses to stacked on md and below"
        layout="split-pane"
        zones={[]}
      />

      <TemplatePreview
        title="Library Layout"
        description="FilterBar + card grid/list + Pagination + Bulk Actions (conditional). Card grid: 1-col mobile, 2-col md, 3-col lg."
        composedOf="AppShell + FilterBar + PromptCard grid + Pagination + BulkActionsBar"
        responsive="1-col mobile → 2-col md → 3-col lg"
        layout="sidebar-main"
        zones={[
          { label: "Sidebar" },
          { label: "Top Bar + FilterBar" },
          { label: "Card Grid + Pagination" },
        ]}
      />

      <TemplatePreview
        title="Detail View Layout"
        description="Header with breadcrumb + title + lifecycle bar + actions. Tabs below. Content area."
        composedOf="AppShell + BreadcrumbNav + StatusLifecycleBar + Tabs"
        responsive="Full-width on mobile"
        layout="sidebar-main"
        zones={[
          { label: "Sidebar" },
          { label: "Breadcrumb + Lifecycle" },
          { label: "Tabs + Tab Content" },
        ]}
      />

      <TemplatePreview
        title="Settings Layout"
        description="Flex: SettingsNav (200px) + content (max 600px). Text-only nav with active state."
        composedOf="AppShell + SettingsNav + Form content"
        responsive="Nav becomes top tabs on mobile"
        layout="sidebar-settings"
        zones={[]}
      />

      <TemplatePreview
        title="Auth Layout"
        description="Centered card (400px max) on full-height background. Logo + auth form + footer links."
        composedOf="AuthForm + branding + footer"
        responsive="Full-width card on mobile"
        layout="centered"
        zones={[{ label: "Auth Card (400px)" }]}
      />

      <TemplatePreview
        title="Comparison Layout"
        description="Toolbar with version selectors + sync toggle + close button. 2-column VersionComparison below."
        composedOf="Toolbar + VersionComparison (2-col diff)"
        responsive="Stacked columns on mobile"
        layout="split-pane"
        zones={[]}
      />
    </div>
  );
}
