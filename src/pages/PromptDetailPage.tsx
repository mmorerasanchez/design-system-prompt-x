import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BreadcrumbNav } from "@/components/molecules/BreadcrumbNav";
import { StatCard } from "@/components/molecules/StatCard";
import { StatusLifecycleBar } from "@/components/organisms/StatusLifecycleBar";
import { AnatomyFieldCard } from "@/components/organisms/AnatomyFieldCard";
import { CompiledPreview } from "@/components/organisms/CompiledPreview";
import { EvalConfirmModal } from "@/components/organisms/EvalConfirmModal";
import { EvaluationResultsView } from "@/components/organisms/EvaluationResultsView";
import { defaultPromptConfig } from "@/components/organisms/PromptConfigFields";
import { Heading } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, History, Pencil } from "lucide-react";
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

const configSummary = {
  model: "gemini-3-flash-preview",
  platform: "Claude",
  temperature: 0.7,
  maxTokens: 2048,
  complexity: "Standard",
  reasoning: "Chain of Thought",
};

const hasVersions = true;

export default function PromptDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [evalRunning, setEvalRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const evalConfig = useMemo(() => ({
    ...defaultPromptConfig,
    instruction: initialFields.map((f) => `# ${f.field.toUpperCase()}\n${f.content}`).join("\n\n"),
    model: configSummary.model,
    platform: configSummary.platform,
    temperature: configSummary.temperature,
    maxTokens: configSummary.maxTokens,
  }), []);

  const compiledOutput = useMemo(
    () => initialFields.map((f) => `# ${f.field.toUpperCase()}\n${f.content}`).join("\n\n"),
    [],
  );
  const totalTokens = initialFields.reduce((sum, f) => sum + f.tokenCount, 0);

  const promptTitle = id
    ? id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : PROMPT_TITLE;

  if (showResults) {
    return (
      <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <EvaluationResultsView
            onBack={() => setShowResults(false)}
            onReEvaluate={() => {
              setShowResults(false);
              setConfirmOpen(true);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 space-y-0">
        <div className="px-4 pt-3 md:px-6">
          <BreadcrumbNav
            items={[
              { label: "Library", href: "/app/library" },
              { label: promptTitle },
            ]}
          />
        </div>
        <div className="px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Heading level="h1" className="truncate">{promptTitle}</Heading>
              <Badge variant="production" size="sm">v3.2</Badge>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" disabled={!hasVersions}>
                <History className="h-3.5 w-3.5" />
                History
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(true)}>
                <Play className="h-3.5 w-3.5" />
                Run
              </Button>
              <Button size="sm" onClick={() => navigate(`/app/library/${id}/edit`)}>
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
            </div>
          </div>
        </div>
        <div className="px-4 pb-3 md:px-6">
          <StatusLifecycleBar steps={lifecycleSteps} />
        </div>

        {/* KPI Row */}
        <div className="px-4 pb-4 md:px-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Total Tokens" value={String(totalTokens)} trend={{ direction: "up", value: "+24" }} />
            <StatCard label="Fields Active" value={String(initialFields.length)} trend={{ direction: "neutral", value: "of 9" }} />
            <StatCard label="Variables" value={String(initialVariables.length)} trend={{ direction: "neutral", value: "defined" }} />
            <StatCard label="Version" value="v3.2" trend={{ direction: "up", value: "production" }} />
          </div>
        </div>
      </div>

      {/* 50/50 Split */}
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Left — Summary */}
        <div className="flex-1 overflow-auto border-b border-border p-4 md:p-6 lg:border-b-0 lg:border-r space-y-8">
          {/* Fields Summary */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-medium text-foreground">Fields</span>
              <span className="font-mono text-2xs text-muted-foreground">{initialFields.length} fields · {totalTokens} tokens</span>
            </div>
            <div className="space-y-2">
              {initialFields.map((f) => (
                <AnatomyFieldCard
                  key={f.field}
                  field={f.field}
                  variant="compact"
                  tokenCount={f.tokenCount}
                  content={f.content}
                />
              ))}
            </div>
          </section>

          {/* Settings Summary */}
          <section className="space-y-3">
            <span className="font-display text-sm font-medium text-foreground">Settings</span>
            <div className="rounded-md border border-border bg-card">
              <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3">
                {Object.entries(configSummary).map(([key, value]) => (
                  <div key={key} className="bg-card px-3 py-2.5">
                    <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">{key}</span>
                    <p className="mt-0.5 font-mono text-sm text-foreground">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Variables Summary */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-medium text-foreground">Variables</span>
              <span className="font-mono text-2xs text-muted-foreground">{initialVariables.length} defined</span>
            </div>
            <div className="rounded-md border border-border bg-card divide-y divide-border">
              {initialVariables.map((v) => (
                <div key={v.name} className="flex items-center justify-between px-3 py-2">
                  <span className="font-mono text-sm text-accent">{`{{${v.name}}}`}</span>
                  <span className="font-mono text-sm text-muted-foreground">{v.defaultValue}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right — Compiled Output */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <CompiledPreview
            content={compiledOutput}
            totalTokens={totalTokens}
            maxTokens={4096}
            className="sticky top-0 min-h-[400px]"
          />
        </div>
      </div>
    </div>
    <EvalConfirmModal
      open={confirmOpen}
      onOpenChange={setConfirmOpen}
      config={evalConfig}
      running={evalRunning}
      onConfirm={() => {
        setEvalRunning(true);
        setTimeout(() => {
          setEvalRunning(false);
          setConfirmOpen(false);
          setShowResults(true);
        }, 1800);
      }}
    />
    </>
  );
}
