import { useState } from "react";
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

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight">Organisms</h1>
        <p className="mt-1 font-body text-base text-muted-foreground">
          Complex components composed of molecules and atoms. These form the major UI sections.
        </p>
      </div>

      {/* ── TOP BAR ── */}
      <Section id="topbar" title="Top Bar / Header" description="56px sticky header with breadcrumb, search, and user menu." composedOf="BreadcrumbNav + SearchBar + Avatar + Button">
        <TopBar
          breadcrumbs={[
            { label: "Library", href: "#" },
            { label: "Customer Support Bot", href: "#" },
            { label: "Editor" },
          ]}
        />
        <CodeBlock>{`<TopBar breadcrumbs={[...]} onMenuClick={fn} actions={<Button />} />`}</CodeBlock>
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
            content={"You are a helpful customer support agent for Acme Corp.\n\nAlways be polite and professional. Use a friendly but concise tone.\n\nThe customer may ask about:\n- Order status and tracking\n- Returns and refunds\n- Product specifications\n\nRespond in JSON format with fields: response, sentiment, escalate."}
            totalTokens={1842}
            maxTokens={4096}
          />
        </div>
        <CodeBlock>{`<CompiledPreview content="..." totalTokens={1842} maxTokens={4096} />`}</CodeBlock>
      </Section>

      {/* ── VARIABLE MANAGER ── */}
      <Section id="variablemanager" title="Variable Manager" description="Manages template variables like {{company_name}} with name and default value pairs." composedOf="Input + Button + font-mono variable syntax">
        <div className="p-4 max-w-lg">
          <VariableManagerDemo />
        </div>
        <CodeBlock>{`<VariableManager variables={[{ name: "company_name", defaultValue: "Acme Corp" }]} onChange={fn} readOnly={boolean} />`}</CodeBlock>
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
    </div>
  );
}

/** Demo wrapper for VariableManager with local state */
function VariableManagerDemo() {
  const [vars, setVars] = useState([
    { name: "company_name", defaultValue: "Acme Corp" },
    { name: "support_email", defaultValue: "help@acme.com" },
    { name: "tone", defaultValue: "professional" },
  ]);
  return <VariableManager variables={vars} onChange={setVars} />;
}
