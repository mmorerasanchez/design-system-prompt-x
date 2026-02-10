import { Badge } from "@/components/ui/badge";

interface PageDef {
  name: string;
  route: string;
  template: string;
  organisms: string[];
  description: string;
}

const pages: PageDef[] = [
  {
    name: "Dashboard",
    route: "/app",
    template: "DashboardLayout",
    organisms: ["DashboardStats", "TabNav", "AIGenerationPanel", "EvaluationResults", "ActivityFeed", "PromptCard"],
    description: "Overview with KPI stats, AI Designer snippet with Generator/Evaluator tabs, activity feed, and recent prompts grid.",
  },
  {
    name: "Prompt Store",
    route: "/app/library",
    template: "DashboardLayout",
    organisms: ["StatCard x4", "FilterBar", "PromptCard grid", "BulkActionsBar"],
    description: "Searchable, filterable prompt repository with KPI row, toolbar, grid/list view, and bulk actions.",
  },
  {
    name: "AI Designer",
    route: "/app/ai-designer",
    template: "DashboardLayout",
    organisms: ["StatCard x4", "TabNav", "ParameterControl", "AIGenerationPanel", "EvaluationResults", "RunHistory", "TestDatasetManager"],
    description: "AI-powered prompt generation (50/50 split-pane) and evaluation (full-width stacked) with tabbed navigation.",
  },
  {
    name: "Prompt Editor",
    route: "/app/library/:id/edit",
    template: "EditorLayout",
    organisms: ["PromptEditorPanel", "CompiledPreview", "PlaygroundPanel", "VariableManager"],
    description: "Split-pane editor with 9 anatomy fields, compiled preview, and playground.",
  },
  {
    name: "Settings",
    route: "/app/settings",
    template: "DashboardLayout",
    organisms: ["SettingsNav", "Profile form", "APIKeyManager", "IntegrationCard"],
    description: "User settings with profile, API keys, and platform integrations.",
  },
  {
    name: "Login",
    route: "/login",
    template: "AuthLayout",
    organisms: ["AuthForm (login mode)"],
    description: "Authentication with email/password and social login options.",
  },
  {
    name: "Onboarding",
    route: "/app/welcome",
    template: "Modal on Dashboard",
    organisms: ["OnboardingWizard"],
    description: "3-step wizard: Welcome → Connect Provider → Create First Prompt.",
  },
];

export default function PagesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight">Pages</h1>
        <p className="mt-1 font-body text-base text-muted-foreground">
          Page-level information architecture. Each page composes organisms into consistent section blocks.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {pages.map((page) => (
          <div key={page.route} className="rounded-lg border border-border bg-card p-5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-md font-medium">{page.name}</h3>
              <Badge variant="outline" size="sm" className="shrink-0">{page.template}</Badge>
            </div>
            <p className="font-mono text-xs text-accent">{page.route}</p>
            <p className="font-body text-sm text-muted-foreground">{page.description}</p>
            <div>
              <p className="font-mono text-2xs text-muted-foreground mb-1.5">Key Organisms:</p>
              <div className="flex flex-wrap gap-1">
                {page.organisms.map((org) => (
                  <Badge key={org} variant="secondary" size="sm">{org}</Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
