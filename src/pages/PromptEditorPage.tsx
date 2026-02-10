import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { EditorLayout } from "@/components/templates/EditorLayout";
import { TabNav } from "@/components/molecules/TabNav";
import { BreadcrumbNav } from "@/components/molecules/BreadcrumbNav";
import { AnatomyFieldCard } from "@/components/organisms/AnatomyFieldCard";
import { CompiledPreview } from "@/components/organisms/CompiledPreview";
import { VariableManager } from "@/components/organisms/VariableManager";
import { VersionTimeline } from "@/components/organisms/VersionTimeline";
import { VersionComparison } from "@/components/organisms/VersionComparison";
import { PromptConfigFields, defaultPromptConfig } from "@/components/organisms/PromptConfigFields";
import type { PromptConfigState } from "@/components/organisms/PromptConfigFields";
import { Heading } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, History, Play, ArrowLeft } from "lucide-react";
import type { AnatomyField } from "@/components/organisms/AnatomyFieldCard";

// --- Mock data ---

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

const tabs = [
  { label: "Fields", value: "fields" },
  { label: "Settings", value: "settings" },
  { label: "Variables", value: "variables" },
  { label: "Versions", value: "versions" },
  { label: "Variations", value: "variations", disabled: true, badge: "soon" },
];

export default function PromptEditorPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("fields");
  const [variables, setVariables] = useState(initialVariables);
  const [config, setConfig] = useState<PromptConfigState>(defaultPromptConfig);
  const [selectedVersion, setSelectedVersion] = useState("v3.2");

  const compiledOutput = useMemo(
    () => initialFields.map((f) => `# ${f.field.toUpperCase()}\n${f.content}`).join("\n\n"),
    [],
  );
  const totalTokens = initialFields.reduce((sum, f) => sum + f.tokenCount, 0);

  const promptTitle = id
    ? id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Untitled Prompt";

  return (
    <EditorLayout
      header={
        <div className="space-y-0">
          <div className="px-4 pt-2 md:px-6">
            <BreadcrumbNav
              items={[
                { label: "Library", href: "/app/library" },
                { label: promptTitle, href: `/app/library/${id}` },
                { label: "Edit" },
              ]}
            />
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-2.5 md:px-6">
            <div className="flex items-center gap-3 min-w-0">
              <Heading level="h3" className="truncate">{promptTitle}</Heading>
              <Badge variant="production" size="sm">v3.2</Badge>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/app/library/${id}`}>
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </Link>
              </Button>
              <Button variant="ghost" size="sm">
                <History className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Play className="h-3.5 w-3.5" />
                Run
              </Button>
              <Button size="sm">
                <Save className="h-3.5 w-3.5" />
                Save
              </Button>
            </div>
          </div>
        </div>
      }
      editor={
        <div className="flex flex-col h-full">
          <div className="shrink-0 px-4 pt-3 md:px-6">
            <TabNav items={tabs} value={activeTab} onValueChange={setActiveTab} />
          </div>
          <div className="flex-1 overflow-auto p-4 md:p-6">
            {/* Fields */}
            {activeTab === "fields" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-medium text-foreground">Anatomy Fields</span>
                  <span className="font-mono text-2xs text-muted-foreground">{initialFields.length} fields · {totalTokens} tokens</span>
                </div>
                <div className="space-y-2">
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
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div className="rounded-md border border-border bg-card">
                <div className="border-b border-border px-3 py-2">
                  <span className="font-display text-sm font-medium text-foreground">Prompt Configuration</span>
                </div>
                <div className="space-y-4 p-4">
                  <PromptConfigFields config={config} onChange={setConfig} mode="settings" />
                </div>
              </div>
            )}

            {/* Variables */}
            {activeTab === "variables" && (
              <VariableManager variables={variables} onChange={setVariables} />
            )}

            {/* Versions */}
            {activeTab === "versions" && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div>
                  <VersionTimeline versions={versions} onSelect={setSelectedVersion} />
                </div>
                <div className="lg:col-span-2">
                  <VersionComparison versionA={versionA} versionB={versionB} />
                </div>
              </div>
            )}
          </div>
        </div>
      }
      preview={
        <div className="p-4 md:p-6">
          <CompiledPreview
            content={compiledOutput}
            totalTokens={totalTokens}
            maxTokens={4096}
            className="sticky top-0 min-h-[400px]"
          />
        </div>
      }
    />
  );
}
