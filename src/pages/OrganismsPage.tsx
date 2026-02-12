import { useState, useCallback } from "react";
import { TopBar } from "@/components/organisms/TopBar";
import { SidebarNav } from "@/components/organisms/SidebarNav";
import { DataTable } from "@/components/organisms/DataTable";
import { AuthForm } from "@/components/organisms/AuthForm";
import { PromptCard } from "@/components/organisms/PromptCard";
import { StatusLifecycleBar } from "@/components/organisms/StatusLifecycleBar";
import { BulkActionsBar } from "@/components/organisms/BulkActionsBar";
import { FilterBar } from "@/components/organisms/FilterBar";
import { DashboardStats } from "@/components/organisms/DashboardStats";
import { ActivityFeed } from "@/components/organisms/ActivityFeed";
import { AnatomyFieldCard } from "@/components/organisms/AnatomyFieldCard";
import { CompiledPreview } from "@/components/organisms/CompiledPreview";
import { VariableManager } from "@/components/organisms/VariableManager";
import { PromptEditorPanel } from "@/components/organisms/PromptEditorPanel";
import { PlaygroundPanel } from "@/components/organisms/PlaygroundPanel";
import { VersionTimeline } from "@/components/organisms/VersionTimeline";
import { AIGenerationPanel } from "@/components/organisms/AIGenerationPanel";
import { TemplatePicker } from "@/components/organisms/TemplatePicker";
import { VersionComparison } from "@/components/organisms/VersionComparison";
import { EvaluationResults } from "@/components/organisms/EvaluationResults";
import { TestDatasetManager } from "@/components/organisms/TestDatasetManager";
import { RunHistory } from "@/components/organisms/RunHistory";
import { ImportDialog } from "@/components/organisms/ImportDialog";
import { ExportMenu } from "@/components/organisms/ExportMenu";
import { UserMenu } from "@/components/organisms/UserMenu";
import { SettingsNav } from "@/components/organisms/SettingsNav";
import { APIKeyManager } from "@/components/organisms/APIKeyManager";
import { IntegrationCard } from "@/components/organisms/IntegrationCard";
import { OnboardingWizard } from "@/components/organisms/OnboardingWizard";
import { CLEARScorePanel } from "@/components/organisms/CLEARScorePanel";
import { ImprovedPromptPanel } from "@/components/organisms/ImprovedPromptPanel";
import { TestRunnerModal } from "@/components/organisms/TestRunnerModal";
import type { CLEARDimension, CLEARSuggestion } from "@/components/organisms/CLEARScorePanel";
import type { AnatomyField } from "@/components/organisms/AnatomyFieldCard";
import { Badge } from "@/components/ui/badge";

function Section({ id, title, description, composedOf, children }: { id: string; title: string; description: string; composedOf?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-4">
      <div>
        <h2 className="font-display text-lg font-medium tracking-tight">{title}</h2>
        <p className="font-body text-sm text-muted-foreground">{description}</p>
        {composedOf && <p className="mt-1 font-mono text-2xs text-accent">Composed of: {composedOf}</p>}
      </div>
      <div className="rounded-lg border border-border overflow-hidden">{children}</div>
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return <pre className="m-4 rounded-md border border-border bg-muted p-3 font-mono text-2xs text-muted-foreground overflow-x-auto">{children}</pre>;
}

const sampleTableData = [
  { name: "Customer Support Bot", status: "production", tokens: 2847, updated: "2h ago" },
  { name: "Code Review Assistant", status: "testing", tokens: 1523, updated: "5h ago" },
  { name: "Marketing Copy Writer", status: "draft", tokens: 890, updated: "1d ago" },
  { name: "Data Analysis Helper", status: "production", tokens: 3201, updated: "3d ago" },
  { name: "Email Template Generator", status: "archived", tokens: 1100, updated: "1w ago" },
];

const activityItems = [
  { actor: "Mariano", initials: "MR", action: "updated", resource: "Customer Support Bot v3", time: "2 minutes ago" },
  { actor: "Jane", initials: "JD", action: "created evaluation for", resource: "Code Review Assistant", time: "1 hour ago" },
  { actor: "Alex", initials: "AK", action: "promoted to production", resource: "Data Analysis Helper", time: "3 hours ago" },
  { actor: "Mariano", initials: "MR", action: "added variable to", resource: "Marketing Copy Writer", time: "yesterday" },
];

export default function OrganismsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  const [bulkCount, setBulkCount] = useState(3);
  const [highlightedVar, setHighlightedVar] = useState<string | null>(null);

  const handleVariableClick = useCallback((name: string) => {
    setHighlightedVar(name);
    // Auto-clear after 2 seconds
    setTimeout(() => setHighlightedVar(null), 2000);
  }, []);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight">Organisms</h1>
        <p className="mt-1 font-body text-base text-muted-foreground">
          Complex components composed of molecules and atoms. These form the major UI sections.
        </p>
      </div>

      {/* ── TOP BAR ── */}
      <Section id="topbar" title="Top Bar / Header" description="56px sticky header with search command button." composedOf="SearchBar + Kbd">
        <TopBar />
        <CodeBlock>{`<TopBar onMenuClick={fn} actions={<Button />} />`}</CodeBlock>
      </Section>

      {/* ── SIDEBAR ── */}
      <Section id="sidebar" title="Sidebar Navigation" description="240px expanded, 64px collapsed. Surface bg with nav items and user footer." composedOf="NavItem + Avatar + Separator + Button">
        <div className="flex h-[360px]">
          <SidebarNav
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            activeItem="library"
          />
          <div className="flex-1 flex items-center justify-center bg-background">
            <p className="font-body text-sm text-muted-foreground">
              Main content area · Sidebar is {sidebarCollapsed ? "collapsed" : "expanded"}
            </p>
          </div>
        </div>
        <CodeBlock>{`<SidebarNav collapsed={boolean} onToggle={fn} activeItem="library" />`}</CodeBlock>
      </Section>

      {/* ── DATA TABLE ── */}
      <Section id="datatable" title="Data Table" description="Sortable columns, mono headers uppercase, hover with orange left border accent." composedOf="Table headers + sortable columns + rows + pagination">
        <div className="p-4">
          <DataTable
            columns={[
              { key: "name", header: "Name", sortable: true },
              { key: "status", header: "Status", sortable: true, render: (row) => <Badge variant={row.status as "draft" | "testing" | "production" | "archived"} size="sm">{String(row.status)}</Badge> },
              { key: "tokens", header: "Tokens", sortable: true },
              { key: "updated", header: "Updated" },
            ]}
            data={sampleTableData}
            pageSize={3}
            onRowClick={() => {}}
          />
        </div>
        <CodeBlock>{`<DataTable columns={[...]} data={[...]} pageSize={5} onRowClick={fn} />`}</CodeBlock>
      </Section>

      {/* ── AUTH FORM ── */}
      <Section id="authform" title="Auth Form" description="Centered card with social login, email/password, and mode toggle (login/signup)." composedOf="FormField + Input + Button + Separator + Social buttons">
        <div className="flex flex-wrap gap-8 p-6 justify-center bg-background">
          <AuthForm mode="login" />
          <AuthForm mode="signup" />
        </div>
        <CodeBlock>{`<AuthForm mode="login | signup" onSubmit={fn} />`}</CodeBlock>
      </Section>

      {/* ── PROMPT CARD ── */}
      <Section id="promptcard" title="Prompt Card" description="Interactive card with hover lift, status badge, preview, and metadata." composedOf="Card + Badge + Text (mono)">
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
          <PromptCard title="Customer Support Bot" status="production" preview="You are a helpful customer support agent for {{company_name}}. Always be polite and professional." version="v3" updatedAgo="2h ago" tokens={2847} />
          <PromptCard title="Code Review Assistant" status="testing" preview="Analyze the following code and provide constructive feedback on quality, performance, and maintainability." version="v1" updatedAgo="5h ago" tokens={1523} />
          <PromptCard title="Marketing Copy Writer" status="draft" preview="Generate compelling marketing copy for {{product_name}} targeting {{audience}}." version="v2" updatedAgo="1d ago" tokens={890} selected />
        </div>
        <CodeBlock>{`<PromptCard title="..." status="draft" preview="..." version="v3" updatedAgo="2h" tokens={2847} selected />`}</CodeBlock>
      </Section>

      {/* ── STATUS LIFECYCLE ── */}
      <Section id="lifecycle" title="Status Lifecycle Bar" description="Draft → Testing → Production → Archived pipeline with gate indicators." composedOf="Badge + CheckCircle + connectors">
        <div className="p-4 overflow-x-auto">
          <StatusLifecycleBar steps={[
            { label: "Draft", status: "draft", completed: true },
            { label: "Testing", status: "testing", completed: true },
            { label: "Production", status: "production", active: true },
            { label: "Archived", status: "archived" },
          ]} />
        </div>
        <CodeBlock>{`<StatusLifecycleBar steps={[{ label: "Draft", status: "draft", completed: true, active: false }]} />`}</CodeBlock>
      </Section>

      {/* ── FILTER BAR ── */}
      <Section id="filterbar" title="Filter Bar" description="Search + status chips + sort + view toggle for library filtering." composedOf="SearchBar + Badge chips + Select + Button group">
        <div className="p-4">
          <FilterBar search={filterSearch} onSearchChange={setFilterSearch} />
        </div>
        <CodeBlock>{`<FilterBar search={search} onSearchChange={setSearch} />`}</CodeBlock>
      </Section>

      {/* ── DASHBOARD STATS ── */}
      <Section id="dashstats" title="Dashboard Stats" description="4-column stat grid. Auto-fit min 200px columns." composedOf="StatCard × 4">
        <div className="p-4">
          <DashboardStats />
        </div>
        <CodeBlock>{`<DashboardStats />`}</CodeBlock>
      </Section>

      {/* ── ACTIVITY FEED ── */}
      <Section id="activityfeed" title="Activity Feed" description="Scrollable list of activity items. Max-height 400px." composedOf="Avatar + Text + Code + timestamps">
        <div className="p-4">
          <ActivityFeed items={activityItems} />
        </div>
        <CodeBlock>{`<ActivityFeed items={[{ actor, initials, action, resource, time }]} />`}</CodeBlock>
      </Section>

      {/* ── BULK ACTIONS BAR ── */}
      <Section id="bulkactions" title="Bulk Actions Bar" description="Sticky bottom bar for multi-select actions. Slides in from bottom." composedOf="Badge count + Button group + dismiss">
        <div className="relative h-24 bg-background flex items-end justify-center">
          <BulkActionsBar
            selectedCount={bulkCount}
            onDismiss={() => setBulkCount(0)}
            onDelete={() => {}}
          />
        </div>
        <CodeBlock>{`<BulkActionsBar selectedCount={3} onDismiss={fn} onMove={fn} onTag={fn} onArchive={fn} onDelete={fn} />`}</CodeBlock>
      </Section>

      {/* ── ANATOMY FIELD CARD ── */}
      <Section id="anatomyfieldcard" title="Anatomy Field Card" description="Prompt anatomy field with color dot, title, content snippet, and token count. 4 variants: atomic, compact, expanded, inactive." composedOf="Color dot + font-display label + font-mono content + token count">
        <div className="p-4 space-y-4">
          <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">Variants</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <AnatomyFieldCard
              field="role"
              variant="atomic"
              tokenCount={0}
            />
            <AnatomyFieldCard
              field="task"
              variant="compact"
              content="Analyze the provided code and return a structured review covering correctness, performance, and readability."
              tokenCount={245}
            />
            <AnatomyFieldCard
              field="context"
              variant="expanded"
              content={"You are operating within a CI/CD pipeline.\nThe user is a senior engineer.\nCode is primarily TypeScript + React."}
              tokenCount={412}
            />
            <AnatomyFieldCard
              field="output"
              variant="inactive"
              content="Return a JSON object with fields: summary, issues[], suggestions[]."
              tokenCount={87}
            />
          </div>

          <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground mt-6">All Fields</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {(["role", "tone", "context", "task", "reasoning", "examples", "output", "constraints", "tools"] as const).map((field) => (
              <AnatomyFieldCard key={field} field={field} variant="atomic" />
            ))}
          </div>
        </div>
        <CodeBlock>{`<AnatomyFieldCard field="role | tone | context | task | reasoning | examples | output | constraints | tools" variant="atomic | compact | expanded | inactive" content="..." tokenCount={245} />`}</CodeBlock>
      </Section>

      {/* ── COMPILED PREVIEW ── */}
      <Section id="compiledpreview" title="Compiled Preview" description="Read-only view of the fully compiled prompt with token usage indicator." composedOf="TokenCounter + font-mono pre block">
        <div className="p-4">
          <CompiledPreview
            content={"You are a helpful customer support agent for {{company_name}}.\n\nAlways be polite and professional. Use a friendly but concise tone.\n\nThe customer may ask about:\n- Order status and tracking\n- Returns and refunds\n- Product specifications\n\nSend replies from {{support_email}} using a {{tone}} voice.\n\nRespond in JSON format with fields: response, sentiment, escalate."}
            totalTokens={1842}
            maxTokens={4096}
            onVariableClick={handleVariableClick}
          />
        </div>
        <CodeBlock>{`<CompiledPreview content="..." totalTokens={1842} maxTokens={4096} />`}</CodeBlock>
      </Section>

      {/* ── VARIABLE MANAGER ── */}
      <Section id="variablemanager" title="Variable Manager" description="Manages template variables like {{company_name}} with name and default value pairs. Click a {{variable}} in the Compiled Preview above to highlight it here." composedOf="Input + Button + font-mono variable syntax">
        <div className="p-4 max-w-lg">
          <VariableManagerDemo highlightedVariable={highlightedVar} />
        </div>
        <CodeBlock>{`<VariableManager variables={[{ name: "company_name", defaultValue: "Acme Corp" }]} onChange={fn} highlightedVariable="company_name" />`}</CodeBlock>
      </Section>

      {/* ── PROMPT EDITOR PANEL ── */}
      <Section id="prompteditorpanel" title="Prompt Editor Panel" description="Split panel with anatomy field cards on the left and compiled preview on the right." composedOf="AnatomyFieldCard[] + CompiledPreview">
        <div className="p-4">
          <PromptEditorPanel
            fields={[
              { field: "role", content: "You are a helpful customer support agent for {{company_name}}.", tokenCount: 312 },
              { field: "tone", content: "Always be polite and professional. Use a friendly but concise tone.", tokenCount: 145 },
              { field: "task", content: "Help the customer resolve their issue. Ask clarifying questions if needed.", tokenCount: 198 },
              { field: "output", content: "Respond in JSON format with fields: response, sentiment, escalate.", tokenCount: 87 },
            ]}
            compiledOutput={"You are a helpful customer support agent for Acme Corp.\n\nAlways be polite and professional. Use a friendly but concise tone.\n\nHelp the customer resolve their issue. Ask clarifying questions if needed.\n\nRespond in JSON format with fields: response, sentiment, escalate."}
            totalTokens={742}
            maxTokens={4096}
          />
        </div>
        <CodeBlock>{`<PromptEditorPanel fields={[{ field: "role", content: "...", tokenCount: 312 }]} compiledOutput="..." totalTokens={742} />`}</CodeBlock>
      </Section>

      {/* ── PLAYGROUND PANEL ── */}
      <Section id="playgroundpanel" title="Playground Panel" description="Test prompts against a model. Shows system prompt, user input, and model response." composedOf="Badge + TokenCounter + Textarea + Button + ThinkingDots">
        <div className="p-4">
          <PlaygroundPanel
            compiledPrompt={"You are a helpful customer support agent for Acme Corp.\nAlways be polite and professional."}
            response={"Thank you for reaching out! I'd be happy to help you with your order. Could you please provide me with your order number so I can look into this for you?"}
            model="claude-3.5-sonnet"
            tokenCount={2134}
            maxTokens={4096}
            userInput="I need help with my order"
          />
        </div>
        <CodeBlock>{`<PlaygroundPanel compiledPrompt="..." response="..." model="claude-3.5-sonnet" tokenCount={2134} isRunning={boolean} onRun={fn} />`}</CodeBlock>
      </Section>

      {/* ── VERSION TIMELINE ── */}
      <Section id="versiontimeline" title="Version Timeline" description="Vertical timeline showing prompt version history with status badges and token deltas." composedOf="Badge + font-mono labels + timeline dots">
        <div className="p-4 max-w-md">
          <VersionTimeline
            versions={[
              { id: "v4", label: "v4", status: "draft", timestamp: "2 hours ago", author: "Mariano", tokenDelta: 145, active: true },
              { id: "v3", label: "v3", status: "production", timestamp: "3 days ago", author: "Mariano", tokenDelta: -89 },
              { id: "v2", label: "v2", status: "archived", timestamp: "1 week ago", author: "Jane", tokenDelta: 312 },
              { id: "v1", label: "v1", status: "archived", timestamp: "2 weeks ago", author: "Mariano" },
            ]}
            onSelect={() => {}}
          />
        </div>
        <CodeBlock>{`<VersionTimeline versions={[{ id: "v3", label: "v3", status: "production", timestamp: "3 days ago", author: "Mariano", tokenDelta: -89, active: true }]} onSelect={fn} />`}</CodeBlock>
      </Section>

      {/* ── AI GENERATION PANEL ── */}
      <Section id="aigenerationpanel" title="AI Generation Panel" description="AI-assisted prompt generation with instruction input, generate button, and output area." composedOf="Textarea + Button + Badge + AI pulse animation">
        <div className="p-4 max-w-xl">
          <AIGenerationPanel
            instruction="Write a system prompt for a friendly customer support agent that handles returns"
            generatedOutput={"You are a friendly and empathetic customer support agent specializing in returns and refunds.\n\nAlways greet the customer warmly and acknowledge their concern before proceeding.\n\nFollow the company return policy strictly but present options in a positive light.\n\nIf the return window has passed, offer alternatives such as store credit or exchanges."}
            targetField="role"
            onGenerate={() => {}}
            onAccept={() => {}}
          />
        </div>
        <CodeBlock>{`<AIGenerationPanel instruction="..." generatedOutput="..." targetField="role" isGenerating={boolean} onGenerate={fn} onAccept={fn} />`}</CodeBlock>
      </Section>

      {/* ── TEMPLATE PICKER ── */}
      <Section id="templatepicker" title="Template Picker" description="Grid picker for selecting prompt templates with category badges and metadata." composedOf="Badge + Button + Card-like buttons">
        <div className="p-4">
          <TemplatePickerDemo />
        </div>
        <CodeBlock>{`<TemplatePicker templates={[{ id, name, description, category, tokenEstimate, fields }]} selectedId="..." onSelect={fn} />`}</CodeBlock>
      </Section>

      {/* ── VERSION COMPARISON ── */}
      <Section id="versioncomparison" title="Version Comparison" description="Side-by-side diff view comparing two prompt versions with line-level highlighting." composedOf="Badge + DiffLine + font-mono pre">
        <div className="p-4">
          <VersionComparison
            versionA={{
              label: "v2",
              status: "archived",
              tokenCount: 687,
              content: "You are a helpful customer support agent for Acme Corp.\n\nAlways be polite and professional.\n\nHelp the customer with their issue.\n\nRespond in plain text format.",
            }}
            versionB={{
              label: "v3",
              status: "production",
              tokenCount: 742,
              content: "You are a helpful customer support agent for Acme Corp.\n\nAlways be polite and professional. Use a friendly but concise tone.\n\nHelp the customer resolve their issue. Ask clarifying questions if needed.\n\nRespond in JSON format with fields: response, sentiment, escalate.",
            }}
          />
        </div>
        <CodeBlock>{`<VersionComparison versionA={{ label: "v2", status: "archived", content: "...", tokenCount: 687 }} versionB={{ label: "v3", status: "production", content: "...", tokenCount: 742 }} />`}</CodeBlock>
      </Section>

      {/* ── EVALUATION RESULTS ── */}
      <Section id="evaluationresults" title="Evaluation Results" description="Score dashboard with overall score, pass/fail counts, and per-metric breakdowns." composedOf="Badge + Progress + font-mono scores">
        <div className="p-4 max-w-xl">
          <EvaluationResults
            model="claude-3.5-sonnet"
            overallScore={84}
            totalTests={25}
            passed={21}
            failed={4}
            timestamp="10m ago"
            metrics={[
              { name: "Accuracy", score: 92, maxScore: 100 },
              { name: "Relevance", score: 88, maxScore: 100 },
              { name: "Coherence", score: 79, maxScore: 100 },
              { name: "Safety", score: 95, maxScore: 100 },
              { name: "Latency", score: 67, maxScore: 100 },
            ]}
          />
        </div>
        <CodeBlock>{`<EvaluationResults model="claude-3.5-sonnet" overallScore={84} totalTests={25} passed={21} failed={4} metrics={[...]} />`}</CodeBlock>
      </Section>

      {/* ── TEST DATASET MANAGER ── */}
      <Section id="testdatasetmanager" title="Test Dataset Manager" description="Manages test cases with bulk selection, run, and import actions." composedOf="TestCaseRow + Button + Badge">
        <div className="p-4">
          <TestDatasetManagerDemo />
        </div>
        <CodeBlock>{`<TestDatasetManager testCases={[...]} selectedIds={[]} onSelectChange={fn} onAdd={fn} onRunSelected={fn} />`}</CodeBlock>
      </Section>

      {/* ── RUN HISTORY ── */}
      <Section id="runhistory" title="Run History" description="Scrollable list of playground/evaluation run entries with status and metrics." composedOf="RunHistoryItem + Badge">
        <div className="p-4 max-w-2xl">
          <RunHistory
            runs={[
              { id: "1", runId: "#1042", model: "claude-3.5-sonnet", status: "success", tokens: 1247, latencyMs: 820, timestamp: "2m ago" },
              { id: "2", runId: "#1041", model: "gpt-4-turbo", status: "error", tokens: 0, latencyMs: 1500, timestamp: "5m ago" },
              { id: "3", runId: "#1040", model: "claude-3.5-sonnet", status: "running", tokens: 340, timestamp: "8m ago" },
              { id: "4", runId: "#1039", model: "gemini-1.5-pro", status: "pending", timestamp: "12m ago" },
              { id: "5", runId: "#1038", model: "gpt-4-turbo", status: "success", tokens: 890, latencyMs: 650, timestamp: "20m ago" },
            ]}
          />
        </div>
        <CodeBlock>{`<RunHistory runs={[{ id, runId, model, status, tokens, latencyMs, timestamp }]} onRunClick={fn} />`}</CodeBlock>
      </Section>

      {/* ── IMPORT DIALOG ── */}
      <Section id="importdialog" title="Import Dialog" description="Multi-format import with paste area and file drop zone." composedOf="Textarea + Button + format selector">
        <div className="p-4 max-w-lg">
          <ImportDialog />
        </div>
        <CodeBlock>{`<ImportDialog onImport={(content, format) => {}} onCancel={fn} />`}</CodeBlock>
      </Section>

      {/* ── EXPORT MENU ── */}
      <Section id="exportmenu" title="Export Menu" description="Format picker for exporting prompts in JSON, CSV, YAML, Markdown, or clipboard." composedOf="Button list + icons + descriptions">
        <div className="p-4">
          <ExportMenu promptName="Customer Support Bot" />
        </div>
        <CodeBlock>{`<ExportMenu promptName="Customer Support Bot" onExport={(format) => {}} />`}</CodeBlock>
      </Section>

      {/* ── USER MENU ── */}
      <Section id="usermenu" title="User Menu" description="Dropdown-like user menu with profile info, navigation, and logout." composedOf="Avatar + Badge + Button list">
        <div className="p-4">
          <UserMenu name="Mariano Rivera" email="mariano@promptx.dev" plan="Pro" />
        </div>
        <CodeBlock>{`<UserMenu name="Mariano" email="mariano@promptx.dev" plan="Pro" onLogout={fn} />`}</CodeBlock>
      </Section>

      {/* ── SETTINGS NAV ── */}
      <Section id="settingsnav" title="Settings Nav" description="Horizontal tab navigation for settings pages. Wraps TabNav molecule." composedOf="TabNav">
        <div className="p-4">
          <SettingsNavDemo />
        </div>
        <CodeBlock>{`<SettingsNav sections={[{ label: "General", value: "general" }]} activeSection="general" onSectionChange={fn} />`}</CodeBlock>
      </Section>

      {/* ── API KEY MANAGER ── */}
      <Section id="apikeymanager" title="API Key Manager" description="Manages API keys with masked values, reveal toggle, add form, and delete." composedOf="Input + Button + Badge + eye toggle">
        <div className="p-4 max-w-xl">
          <APIKeyManager
            keys={[
              { id: "1", name: "openai-prod", provider: "OpenAI", maskedValue: "sk-••••••••••••3kF9", createdAt: "2 weeks ago" },
              { id: "2", name: "anthropic-dev", provider: "Anthropic", maskedValue: "sk-ant-••••••••Xy2z", createdAt: "3 days ago" },
            ]}
          />
        </div>
        <CodeBlock>{`<APIKeyManager keys={[{ id, name, provider, maskedValue, createdAt }]} onAdd={fn} onDelete={fn} />`}</CodeBlock>
      </Section>

      {/* ── INTEGRATION CARD ── */}
      <Section id="integrationcard" title="Integration Card" description="External service card with connection status and connect/disconnect actions." composedOf="Badge + Button + avatar">
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
          <IntegrationCard name="OpenAI API" provider="OpenAI" description="GPT-4, GPT-3.5 Turbo, and DALL·E models for generation and analysis." connected status="active" />
          <IntegrationCard name="Anthropic API" provider="Anthropic" description="Claude models for safe, helpful AI assistance." connected status="active" />
          <IntegrationCard name="Google AI" provider="Google" description="Gemini models for multimodal understanding." status="inactive" />
        </div>
        <CodeBlock>{`<IntegrationCard name="OpenAI" provider="OpenAI" description="..." connected status="active" onConnect={fn} />`}</CodeBlock>
      </Section>

      {/* ── ONBOARDING WIZARD ── */}
      <Section id="onboardingwizard" title="Onboarding Wizard" description="Step-by-step onboarding flow with progress indicator and navigation." composedOf="Badge + Button + step circles">
        <div className="p-4 max-w-lg">
          <OnboardingWizardDemo />
        </div>
        <CodeBlock>{`<OnboardingWizard steps={[{ id, title, description, completed }]} currentStep={0} onNext={fn} onSkip={fn} />`}</CodeBlock>
      </Section>

      {/* ── CLEAR SCORE PANEL ── */}
      <Section id="clearscorepanel" title="CLEAR Score Panel" description="Displays CLEAR framework evaluation results with overall score, dimension breakdown, strengths/improvements, and actionable suggestions." composedOf="Progress + Collapsible + Badge + Button">
        <div className="p-4">
          <CLEARScorePanel
            overallScore={81}
            dimensions={showcaseCLEARDimensions}
            strengths={showcaseStrengths}
            improvements={showcaseImprovements}
            suggestions={showcaseSuggestions}
          />
        </div>
        <CodeBlock>{`<CLEARScorePanel overallScore={81} dimensions={[...]} strengths={[...]} improvements={[...]} suggestions={[...]} onApplySuggestion={fn} />`}</CodeBlock>
      </Section>

      {/* ── IMPROVED PROMPT PANEL ── */}
      <Section id="improvedpromptpanel" title="Improved Prompt Panel" description="Displays AI-improved prompt with two views: Full Version (monospace, copyable) and Anatomy Fields (editable cards). Includes Save to Store with status selection." composedOf="TabNav + AnatomyFieldCard + Badge + Select + Button">
        <div className="p-4">
          <ImprovedPromptPanel
            improvedPrompt={showcaseImprovedPrompt}
            anatomyFields={showcaseAnatomyFields}
          />
        </div>
        <CodeBlock>{`<ImprovedPromptPanel improvedPrompt="..." anatomyFields={[{ field, content, tokenCount }]} onReEvaluate={fn} onSaveToStore={fn} />`}</CodeBlock>
      </Section>

      {/* ── TEST RUNNER MODAL ── */}
      <Section id="testrunnermodal" title="Test Runner Modal" description="Dialog modal for running prompt evaluations. Triggered from Editor 'Run' buttons and Dashboard/Designer evaluator tabs. Supports variable auto-detection and inline CLEAR results." composedOf="Dialog + Textarea + Select + Input + CLEARScorePanel + Button">
        <div className="p-4">
          <TestRunnerModalDemo />
        </div>
        <CodeBlock>{`<TestRunnerModal open={boolean} onOpenChange={fn} initialPrompt="..." initialVariables={[{ name, value }]} />`}</CodeBlock>
      </Section>
    </div>
  );
}

/** Demo wrapper for VariableManager with local state */
function VariableManagerDemo({ highlightedVariable }: { highlightedVariable?: string | null }) {
  const [vars, setVars] = useState([
    { name: "company_name", defaultValue: "Acme Corp" },
    { name: "support_email", defaultValue: "help@acme.com" },
    { name: "tone", defaultValue: "professional" },
  ]);
  return <VariableManager variables={vars} onChange={setVars} highlightedVariable={highlightedVariable} />;
}

const sampleTemplates = [
  { id: "support", name: "Customer Support", description: "Friendly support agent that handles inquiries, complaints, and returns with empathy.", category: "Support", tokenEstimate: 850, fields: ["role", "tone", "task", "output"] },
  { id: "code-review", name: "Code Reviewer", description: "Thorough code reviewer focusing on correctness, performance, and maintainability.", category: "Engineering", tokenEstimate: 1200, fields: ["role", "context", "task", "constraints", "output"] },
  { id: "copywriter", name: "Marketing Copywriter", description: "Creative copywriter for product descriptions, landing pages, and ad copy.", category: "Marketing", tokenEstimate: 680, fields: ["role", "tone", "examples", "output"] },
  { id: "analyst", name: "Data Analyst", description: "Analytical assistant that interprets data, generates insights, and creates summaries.", category: "Analytics", tokenEstimate: 950, fields: ["role", "context", "task", "reasoning", "output"] },
  { id: "tutor", name: "Learning Tutor", description: "Patient tutor that explains concepts step by step with examples and practice exercises.", category: "Education", tokenEstimate: 1100, fields: ["role", "tone", "reasoning", "examples", "output"] },
  { id: "email", name: "Email Composer", description: "Professional email writer adapting tone for internal, client, and executive audiences.", category: "Communication", tokenEstimate: 520, fields: ["role", "tone", "task"] },
];

/** Demo wrapper for TemplatePicker with local state */
function TemplatePickerDemo() {
  const [selectedId, setSelectedId] = useState<string | null>("code-review");
  return (
    <TemplatePicker
      templates={sampleTemplates}
      selectedId={selectedId}
      onSelect={(t) => setSelectedId(t.id)}
    />
  );
}

/** Demo wrapper for TestDatasetManager with local state */
function TestDatasetManagerDemo() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const testCases = [
    { id: "1", name: "greeting", input: "Say hello to the user", expected: "Hello! How can I help?", status: "pass" as const, score: 95 },
    { id: "2", name: "refusal", input: "Write malicious code", expected: "I cannot help with that", status: "fail" as const, score: 20 },
    { id: "3", name: "summary", input: "Summarize this article about AI safety...", status: "pending" as const },
    { id: "4", name: "translate", input: "Translate to French: Hello world", expected: "Bonjour le monde", status: "pass" as const, score: 88 },
    { id: "5", name: "format", input: "Format this data as a table", expected: "| Col1 | Col2 |", status: "skipped" as const },
  ];
  return <TestDatasetManager testCases={testCases} selectedIds={selectedIds} onSelectChange={setSelectedIds} />;
}

/** Demo wrapper for SettingsNav with local state */
function SettingsNavDemo() {
  const [active, setActive] = useState("general");
  return (
    <SettingsNav
      sections={[
        { label: "General", value: "general" },
        { label: "API Keys", value: "api-keys" },
        { label: "Integrations", value: "integrations" },
        { label: "Team", value: "team" },
        { label: "Billing", value: "billing" },
        { label: "Advanced", value: "advanced", disabled: true },
      ]}
      activeSection={active}
      onSectionChange={setActive}
    />
  );
}

/** Demo wrapper for OnboardingWizard with local state */
function OnboardingWizardDemo() {
  const [step, setStep] = useState(1);
  const steps = [
    { id: "connect", title: "Connect an API Key", description: "Add your OpenAI or Anthropic API key to start using AI models.", completed: true },
    { id: "create", title: "Create Your First Prompt", description: "Use the editor to build a structured prompt with anatomy fields.", completed: false },
    { id: "test", title: "Run a Test", description: "Send your prompt to a model and evaluate the response quality.", completed: false },
    { id: "deploy", title: "Deploy to Production", description: "Promote your prompt from testing to production when it's ready.", completed: false },
  ];
  return (
    <OnboardingWizard
      steps={steps}
      currentStep={step}
      onStepClick={setStep}
      onNext={() => setStep(Math.min(step + 1, steps.length - 1))}
    />
  );
}

// --- CLEAR Score showcase data ---
const showcaseCLEARDimensions: CLEARDimension[] = [
  { key: "C", label: "Clarity", description: "How unambiguous the instructions are", score: 88 },
  { key: "L", label: "Leverage", description: "How well it uses model capabilities", score: 72 },
  { key: "E", label: "Efficiency", description: "Token optimization, no redundancy", score: 91 },
  { key: "A", label: "Adaptability", description: "Handles edge cases and variations", score: 68 },
  { key: "R", label: "Robustness", description: "Resilience to adversarial inputs", score: 85 },
];

const showcaseStrengths = [
  "Clear role definition establishes strong persona boundaries",
  "Explicit output format prevents ambiguous responses",
];

const showcaseImprovements = [
  "Add fallback instructions for unsupported languages",
  "Consider adding few-shot examples for edge cases",
];

const showcaseSuggestions: CLEARSuggestion[] = [
  { id: "s1", text: "Add a language detection step before responding.", dimension: "Adaptability" },
  { id: "s2", text: "Include explicit token budget constraints.", dimension: "Efficiency" },
];

const showcaseImprovedPrompt = `You are an expert onboarding assistant for SaaS products.

## Tone
Friendly, professional, and encouraging.

## Task
Guide the user through initial setup:
1. Connecting their workspace
2. Inviting team members
3. Creating their first project

## Constraints
- Never mention competitors
- Handle adversarial inputs with a polite refusal`;

const showcaseAnatomyFields: { field: AnatomyField; content: string; tokenCount: number }[] = [
  { field: "role", content: "You are an expert onboarding assistant for SaaS products.", tokenCount: 52 },
  { field: "tone", content: "Friendly, professional, and encouraging.", tokenCount: 34 },
  { field: "task", content: "Guide the user through initial setup: connecting workspace, inviting team members, creating first project.", tokenCount: 124 },
  { field: "constraints", content: "Never mention competitors. Handle adversarial inputs with a polite refusal.", tokenCount: 44 },
];

/** Demo wrapper for TestRunnerModal */
function TestRunnerModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md border border-accent bg-accent/10 px-4 py-2 font-display text-sm font-medium text-accent hover:bg-accent/20 transition-colors"
      >
        Open Test Runner Modal
      </button>
      <TestRunnerModal
        open={open}
        onOpenChange={setOpen}
        initialPrompt="You are a helpful customer support agent for {{company_name}}. Always respond politely."
      />
    </>
  );
}
