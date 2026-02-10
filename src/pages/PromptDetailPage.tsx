import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { DetailLayout } from "@/components/templates/DetailLayout";
import { TabNav } from "@/components/molecules/TabNav";
import { StatCard } from "@/components/molecules/StatCard";
import { BreadcrumbNav } from "@/components/molecules/BreadcrumbNav";
import { StatusLifecycleBar } from "@/components/organisms/StatusLifecycleBar";
import { AnatomyFieldCard } from "@/components/organisms/AnatomyFieldCard";
import { CompiledPreview } from "@/components/organisms/CompiledPreview";
import { VariableManager } from "@/components/organisms/VariableManager";
import { PlaygroundPanel } from "@/components/organisms/PlaygroundPanel";
import { VersionTimeline } from "@/components/organisms/VersionTimeline";
import { VersionComparison } from "@/components/organisms/VersionComparison";
import { PromptConfigFields, defaultPromptConfig } from "@/components/organisms/PromptConfigFields";
import type { PromptConfigState } from "@/components/organisms/PromptConfigFields";
import { Heading, Text } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Plus, Copy, GitBranch, Pencil } from "lucide-react";
import type { AnatomyField } from "@/components/organisms/AnatomyFieldCard";

// --- Mock data ---

const PROMPT_TITLE = "Onboarding Flow";

const initialFields: { field: AnatomyField; content: string; tokenCount: number }[] = [
  { field: "role", content: "You are an expert onboarding assistant for SaaS products.", tokenCount: 42 },
  { field: "tone", content: "Friendly, professional, and encouraging. Avoid jargon.", tokenCount: 28 },
  { field: "context", content: "The user just signed up for {{product_name}} and is seeing the app for the first time. Their plan is {{plan_type}}.", tokenCount: 89 },
  { field: "task", content: "Guide the user through the initial setup: connecting their workspace, inviting team members, and creating their first project.", tokenCount: 112 },
  { field: "reasoning", content: "Think step-by-step about what the user needs to accomplish. Prioritize the most impactful setup actions first.", tokenCount: 64 },
  { field: "examples", content: 'User: "I just signed up, what do I do first?"\nAssistant: "Welcome to {{product_name}}! Let\'s get you set up in 3 quick steps…"', tokenCount: 98 },
  { field: "output", content: "Respond in markdown with clear step headings. Include progress indicators like (1/3), (2/3), (3/3).", tokenCount: 56 },
  { field: "constraints", content: "Keep responses under 200 words. Never mention competitors. Don't skip steps.", tokenCount: 38 },
  { field: "tools", content: "You can access: user_profile(), workspace_settings(), send_invite(email).", tokenCount: 47 },
];

const initialVariables = [
  { name: "product_name", defaultValue: "Acme App" },
  { name: "plan_type", defaultValue: "Pro" },
];

const lifecycleSteps = [
  { label: "Draft", status: "draft" as const, completed: true },
  { label: "Testing", status: "testing" as const, completed: true },
  { label: "Production", status: "production" as const, active: true },
  { label: "Archived", status: "archived" as const },
];

const versions = [
  { id: "v3.2", label: "v3.2", status: "production" as const, timestamp: "Feb 10, 2026", author: "Mariano R.", tokenDelta: 24, active: true },
  { id: "v3.1", label: "v3.1", status: "testing" as const, timestamp: "Feb 8, 2026", author: "Sarah K.", tokenDelta: -12 },
  { id: "v3.0", label: "v3.0", status: "testing" as const, timestamp: "Feb 5, 2026", author: "Mariano R.", tokenDelta: 156 },
  { id: "v2.0", label: "v2.0", status: "archived" as const, timestamp: "Jan 20, 2026", author: "Alex M.", tokenDelta: 89 },
  { id: "v1.0", label: "v1.0", status: "archived" as const, timestamp: "Jan 5, 2026", author: "Mariano R.", tokenDelta: 0 },
];

const versionA = {
  label: "v3.1",
  status: "testing" as const,
  content: `# ROLE\nYou are an expert onboarding assistant for SaaS products.\n\n# TONE\nFriendly and professional.\n\n# TASK\nGuide the user through initial setup.\n\n# CONSTRAINTS\nKeep responses under 150 words.`,
  tokenCount: 450,
};

const versionB = {
  label: "v3.2",
  status: "production" as const,
  content: `# ROLE\nYou are an expert onboarding assistant for SaaS products.\n\n# TONE\nFriendly, professional, and encouraging. Avoid jargon.\n\n# TASK\nGuide the user through the initial setup: connecting their workspace, inviting team members, and creating their first project.\n\n# CONSTRAINTS\nKeep responses under 200 words. Never mention competitors. Don't skip steps.`,
  tokenCount: 574,
};

const variations = [
  { id: "master", name: "Master", status: "production" as const, tokens: 574, lastEdited: "2 min ago", isMaster: true },
  { id: "concise", name: "Concise", status: "testing" as const, tokens: 320, lastEdited: "1 hr ago", isMaster: false },
  { id: "enterprise", name: "Enterprise Tone", status: "draft" as const, tokens: 610, lastEdited: "3 hrs ago", isMaster: false },
  { id: "multilang", name: "Multi-language", status: "draft" as const, tokens: 680, lastEdited: "1 day ago", isMaster: false },
];

// --- Tabs ---

const tabs = [
  { label: "Editor", value: "editor" },
  { label: "Settings", value: "config" },
  { label: "Variables", value: "variables" },
  { label: "Versions", value: "versions" },
  { label: "Variations", value: "variations", disabled: true, badge: "soon" },
];

// --- Component ---

export default function PromptDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("editor");
  const [variables, setVariables] = useState(initialVariables);
  const [config, setConfig] = useState<PromptConfigState>(defaultPromptConfig);
  const [userInput, setUserInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [response, setResponse] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("v3.2");

  const compiledOutput = useMemo(
    () => initialFields.map((f) => `# ${f.field.toUpperCase()}\n${f.content}`).join("\n\n"),
    [],
  );
  const totalTokens = initialFields.reduce((sum, f) => sum + f.tokenCount, 0);

  const promptTitle = id
    ? id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : PROMPT_TITLE;

  const handleRun = () => {
    setIsRunning(true);
    setResponse("");
    setTimeout(() => {
      setResponse(
        "Welcome to Acme App! 🎉 Let's get you set up in 3 quick steps:\n\n" +
        "## (1/3) Connect Your Workspace\nFirst, let's link your workspace. Click **Settings → Workspace** and follow the setup wizard.\n\n" +
        "## (2/3) Invite Your Team\nCollaboration is key! Head to **Team → Invite Members** and add your colleagues.\n\n" +
        "## (3/3) Create Your First Project\nNow you're ready! Click **New Project** and choose a template.\n\n" +
        "You're all set! Need help with anything else?",
      );
      setIsRunning(false);
    }, 2000);
  };

  return (
    <DetailLayout
      breadcrumb={
        <BreadcrumbNav
          items={[
            { label: "Library", href: "/app/library" },
            { label: promptTitle },
          ]}
        />
      }
      titleBar={
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Heading level="h1" className="truncate">{promptTitle}</Heading>
            <Badge variant="production" size="sm">v3.2</Badge>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm">
              <Play className="h-3.5 w-3.5" />
              Run
            </Button>
            <Button size="sm">
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
          </div>
        </div>
      }
      statusBar={<StatusLifecycleBar steps={lifecycleSteps} />}
      tabs={<TabNav items={tabs} value={activeTab} onValueChange={setActiveTab} />}
    >
      {/* ===== EDITOR TAB ===== */}
      {activeTab === "editor" && (
        <div className="space-y-6">
          {/* KPI row */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Total Tokens" value={String(totalTokens)} trend={{ direction: "up", value: "+24" }} />
            <StatCard label="Fields Active" value={String(initialFields.length)} trend={{ direction: "neutral", value: "of 9" }} />
            <StatCard label="Variables" value={String(variables.length)} trend={{ direction: "neutral", value: "defined" }} />
            <StatCard label="Version" value="v3.2" trend={{ direction: "up", value: "production" }} />
          </div>

          {/* Anatomy Fields + Compiled Preview — 60/40 */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-medium text-foreground">Anatomy Fields</span>
                <span className="font-mono text-2xs text-muted-foreground">{initialFields.length} fields · {totalTokens} tokens</span>
              </div>
              {initialFields.map((f) => (
                <AnatomyFieldCard
                  key={f.field}
                  field={f.field}
                  variant="expanded"
                  tokenCount={f.tokenCount}
                  content={f.content}
                />
              ))}
            </div>
            <div className="space-y-4">
              <CompiledPreview
                content={compiledOutput}
                totalTokens={totalTokens}
                maxTokens={4096}
              />
              <VariableManager
                variables={variables}
                onChange={setVariables}
              />
            </div>
          </div>
        </div>
      )}

      {/* ===== SETTINGS TAB ===== */}
      {activeTab === "config" && (
        <div className="space-y-6">
          <div className="rounded-md border border-border bg-card">
            <div className="border-b border-border px-3 py-2">
              <span className="font-display text-sm font-medium text-foreground">Prompt Configuration</span>
            </div>
            <div className="space-y-4 p-4">
              <PromptConfigFields config={config} onChange={setConfig} mode="full" />
            </div>
          </div>
        </div>
      )}

      {/* ===== VARIABLES TAB ===== */}
      {activeTab === "variables" && (
        <div className="space-y-6">
          <VariableManager
            variables={variables}
            onChange={setVariables}
          />
        </div>
      )}

      {/* ===== VERSIONS TAB ===== */}
      {activeTab === "versions" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Timeline */}
            <div>
              <VersionTimeline
                versions={versions}
                onSelect={setSelectedVersion}
              />
            </div>
            {/* Diff */}
            <div className="lg:col-span-2">
              <VersionComparison versionA={versionA} versionB={versionB} />
            </div>
          </div>
        </div>
      )}

      {/* ===== VARIATIONS TAB ===== */}
      {activeTab === "variations" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display text-sm font-medium text-foreground">Prompt Variations</span>
              <p className="font-body text-xs text-muted-foreground mt-0.5">Create variations from the master prompt to test different approaches.</p>
            </div>
            <Button size="sm" variant="secondary">
              <Plus className="h-3.5 w-3.5" />
              New Variation
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {variations.map((v) => (
              <div
                key={v.id}
                className={`rounded-md border p-4 transition-colors ${
                  v.isMaster ? "border-accent/30 bg-card" : "border-border bg-card"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-medium text-foreground">{v.name}</span>
                      {v.isMaster && (
                        <Badge variant="outline" size="sm">
                          <GitBranch className="h-3 w-3 mr-0.5" />
                          master
                        </Badge>
                      )}
                      <Badge variant={v.status} size="sm">{v.status}</Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-3">
                      <span className="font-mono text-2xs text-muted-foreground">{v.tokens} tokens</span>
                      <span className="text-border">·</span>
                      <span className="font-mono text-2xs text-muted-foreground">{v.lastEdited}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>

                {/* Mini diff preview for non-master */}
                {!v.isMaster && (
                  <div className="mt-3 rounded-sm border border-border bg-surface p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-2xs text-muted-foreground">vs master</span>
                      <span className="font-mono text-2xs text-warning">
                        {v.tokens > 574 ? `+${v.tokens - 574}` : `${v.tokens - 574}`} tokens
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-mono text-2xs text-success">+ Modified tone/constraints</div>
                      <div className="font-mono text-2xs text-error">− Removed examples section</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Compare variations */}
          <div className="rounded-md border border-border bg-card">
            <div className="border-b border-border px-3 py-2">
              <span className="font-display text-sm font-medium text-foreground">Compare Variations</span>
            </div>
            <div className="p-4">
              <VersionComparison
                versionA={{
                  label: "Master",
                  status: "production",
                  content: compiledOutput,
                  tokenCount: totalTokens,
                }}
                versionB={{
                  label: "Concise",
                  status: "testing",
                  content: `# ROLE\nYou are an onboarding assistant.\n\n# TASK\nGuide the user through setup in 3 steps.\n\n# CONSTRAINTS\nKeep responses under 100 words. Be direct.`,
                  tokenCount: 320,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </DetailLayout>
  );
}
