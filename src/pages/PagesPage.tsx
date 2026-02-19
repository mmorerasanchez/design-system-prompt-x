import { useState, lazy, Suspense, useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Kbd } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/atoms";
import { Lock, Mail, ArrowRight, Eye, X } from "lucide-react";
import {
  isPrototypeAuthenticated,
  authenticatePrototype,
  CONTACT_EMAIL,
} from "@/lib/prototype-auth";

// Lazy-load app pages so they don't bloat the showcase bundle
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const LibraryPage = lazy(() => import("@/pages/LibraryPage"));
const AIDesignerPage = lazy(() => import("@/pages/AIDesignerPage"));
const PromptDetailPage = lazy(() => import("@/pages/PromptDetailPage"));
const PromptEditorPage = lazy(() => import("@/pages/PromptEditorPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const OnboardingPage = lazy(() => import("@/pages/OnboardingPage"));

interface PageDef {
  name: string;
  route: string;
  template: string;
  organisms: string[];
  description: string;
  component: React.LazyExoticComponent<React.ComponentType>;
}

const pages: PageDef[] = [
  {
    name: "Dashboard",
    route: "/app",
    template: "DashboardLayout",
    organisms: ["DashboardStats", "TabNav", "PromptConfigFields", "EvalConfirmModal", "EvaluationResultsView", "ActivityFeed"],
    description: "Overview with KPI stats, AI Designer snippet with Generator/Evaluator tabs, activity feed, and recent prompts grid.",
    component: DashboardPage,
  },
  {
    name: "Prompt Store",
    route: "/app/library",
    template: "DashboardLayout",
    organisms: ["StatCard x4", "FilterBar", "PromptCard grid", "BulkActionsBar", "CreatePromptDialog"],
    description: "Searchable, filterable prompt repository with KPI row, toolbar, grid/list view, bulk actions, and new prompt dialog.",
    component: LibraryPage,
  },
  {
    name: "AI Designer",
    route: "/app/ai-designer",
    template: "DashboardLayout",
    organisms: ["StatCard x4", "TabNav", "PromptConfigFields", "EvalConfirmModal", "EvaluationResultsView", "RunHistory", "TestDatasetManager"],
    description: "AI-powered prompt generation (50/50 split-pane) and evaluation (full-width stacked) with EvalConfirmModal → EvaluationResultsView flow.",
    component: AIDesignerPage,
  },
  {
    name: "Prompt Detail",
    route: "/app/library/:id",
    template: "DetailLayout",
    organisms: ["BreadcrumbNav", "StatusLifecycleBar", "StatCard x4", "AnatomyFieldCard", "CompiledPreview", "EvalConfirmModal", "EvaluationResultsView"],
    description: "Read-only 50/50 split: left pane shows Fields, Settings, Variables summaries; right pane shows sticky Compiled Output.",
    component: PromptDetailPage,
  },
  {
    name: "Prompt Editor",
    route: "/app/library/:id/edit",
    template: "EditorLayout",
    organisms: ["BreadcrumbNav", "TabNav", "AnatomyFieldCard", "CompiledPreview", "VariableManager", "VersionTimeline", "VersionComparison", "PromptConfigFields", "EvalConfirmModal", "EvaluationResultsView"],
    description: "50/50 split editor with 5 tabs (Fields, Settings, Variables, Versions, Variations) and sticky Compiled Output.",
    component: PromptEditorPage,
  },
  {
    name: "Settings",
    route: "/app/settings",
    template: "DashboardLayout",
    organisms: ["SettingsNav", "APIKeyManager", "APIDocPanel", "PresetCard", "PresetDetailPanel", "OrganizationManager", "GlobalVariableManager", "DataManager", "IntegrationCard", "StatCard x4"],
    description: "8-tab settings hub: Profile, Billing, API Keys, Presets, Organization, Variables, Data, Team.",
    component: SettingsPage,
  },
  {
    name: "Onboarding",
    route: "/app/welcome",
    template: "Centered (no shell)",
    organisms: ["OnboardingWizard", "PromptConfigFields", "ScoreBreakdown", "TokenCounter"],
    description: "5-step wizard: Select Model → Configure Parameters → Provide Instructions → Generation Animation → Review Result.",
    component: OnboardingPage,
  },
];

/** Inline password gate for the modal */
function ModalPasswordGate({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticatePrototype(password)) {
      onAuthenticated();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-5">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
            <Lock className="h-4 w-4 text-accent" />
          </div>
          <h3 className="font-display text-md font-medium">Protected Prototype</h3>
          <p className="font-body text-sm text-muted-foreground">
            Enter the access password to view this page.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-surface border border-border px-3 py-2">
          <Mail className="h-3.5 w-3.5 text-accent shrink-0" />
          <p className="font-body text-xs text-muted-foreground">
            Request access at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label htmlFor="modal-gate-password" className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
              Password
            </label>
            <Input
              id="modal-gate-password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Enter access password"
              className={error ? "border-destructive" : ""}
              autoFocus
            />
            {error && (
              <p className="font-body text-xs text-destructive">Invalid password. Please try again.</p>
            )}
          </div>
          <Button type="submit" className="w-full" size="sm" disabled={!password.trim()}>
            Access Prototype
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function PagesPage() {
  const [activePage, setActivePage] = useState<PageDef | null>(null);
  const [authenticated, setAuthenticated] = useState(isPrototypeAuthenticated);

  const handleOpenPage = (page: PageDef) => {
    setActivePage(page);
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight">Pages</h1>
        <p className="mt-1 font-body text-base text-muted-foreground">
          Page-level information architecture. Click any card to preview the interactive prototype.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {pages.map((page) => (
          <button
            key={page.route}
            onClick={() => handleOpenPage(page)}
            className="group rounded-lg border border-border bg-card p-5 space-y-3 text-left transition-colors hover:border-accent/40 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-md font-medium group-hover:text-accent transition-colors">{page.name}</h3>
              <div className="flex items-center gap-1.5 shrink-0">
                <Badge variant="outline" size="sm">{page.template}</Badge>
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-3 w-3 text-accent" />
                </div>
              </div>
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
          </button>
        ))}
      </div>

      {/* Full-page modal for prototype preview */}
      <Dialog open={!!activePage} onOpenChange={(open) => { if (!open) setActivePage(null); }}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 gap-0 overflow-hidden flex flex-col [&>button.absolute]:hidden">
          <DialogTitle className="sr-only">{activePage?.name ?? "Page Preview"}</DialogTitle>

          {/* Modal header bar */}
          {activePage && (
            <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5 shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-sm font-medium">{activePage.name}</h2>
                <Badge variant="outline" size="sm">{activePage.template}</Badge>
                <span className="font-mono text-xs text-muted-foreground">{activePage.route}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" size="sm" className="gap-1">
                  <Lock className="h-2.5 w-2.5" />
                  Prototype
                </Badge>
                <DialogClose asChild>
                  <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2 text-muted-foreground hover:text-foreground">
                    <X className="h-3.5 w-3.5" />
                    <Kbd>Esc</Kbd>
                  </Button>
                </DialogClose>
              </div>
            </div>
          )}

          {/* Content area */}
          <div className="flex-1 overflow-auto bg-background">
            {activePage && !authenticated ? (
              <ModalPasswordGate onAuthenticated={() => setAuthenticated(true)} />
            ) : activePage ? (
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <Spinner size="lg" />
                </div>
              }>
                <div className="p-6 max-w-6xl mx-auto">
                  <activePage.component />
                </div>
              </Suspense>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
