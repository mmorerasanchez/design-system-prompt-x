import { cn } from "@/lib/utils";
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
    route: "/dashboard",
    template: "DashboardLayout",
    organisms: ["DashboardStats", "ActivityFeed", "QuickActions"],
    description: "Overview with KPI stats, recent activity feed, and quick action buttons.",
  },
  {
    name: "Prompt Library",
    route: "/library",
    template: "LibraryLayout",
    organisms: ["FilterBar", "PromptCard grid", "BulkActionsBar", "Pagination"],
    description: "Searchable, filterable grid of all prompts with bulk actions and view modes.",
  },
  {
    name: "Prompt Detail",
    route: "/library/:id",
    template: "DetailLayout",
    organisms: ["StatusLifecycleBar", "Tabs (Editor/Versions/Evaluations/Settings)"],
    description: "Single prompt view with lifecycle status, tabbed content sections.",
  },
  {
    name: "Prompt Editor",
    route: "/library/:id/edit",
    template: "EditorLayout",
    organisms: ["PromptEditorPanel", "CompiledPreview", "PlaygroundPanel", "VariableManager"],
    description: "Split-pane editor with 9 anatomy fields, compiled preview, and playground.",
  },
  {
    name: "Settings",
    route: "/settings",
    template: "SettingsLayout",
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
    name: "Signup",
    route: "/signup",
    template: "AuthLayout",
    organisms: ["AuthForm (signup mode)"],
    description: "Account creation with name, email, password, and social signup.",
  },
  {
    name: "Onboarding",
    route: "/welcome",
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
          Reference index of all pages defined in the spec. These will be assembled in the application projects.
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
