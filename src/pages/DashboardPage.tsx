import { useState } from "react";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { DashboardStats } from "@/components/organisms/DashboardStats";
import { ActivityFeed } from "@/components/organisms/ActivityFeed";
import { AIGenerationPanel } from "@/components/organisms/AIGenerationPanel";
import { EvaluationResults } from "@/components/organisms/EvaluationResults";
import { PromptCard } from "@/components/organisms/PromptCard";
import { TabNav } from "@/components/molecules/TabNav";
import { Heading, Text } from "@/components/atoms";
import { ArrowRight } from "lucide-react";

const feedItems = [
  { actor: "Sarah K.", initials: "SK", action: "deployed", resource: "onboarding-flow-v3", time: "2 min ago" },
  { actor: "Marcus T.", initials: "MT", action: "updated", resource: "code-review-assistant", time: "15 min ago" },
  { actor: "Priya R.", initials: "PR", action: "created", resource: "customer-support-qa", time: "1 hr ago" },
  { actor: "Alex M.", initials: "AM", action: "evaluated", resource: "data-extraction-v2", time: "2 hrs ago" },
  { actor: "Jordan L.", initials: "JL", action: "archived", resource: "legacy-summarizer", time: "5 hrs ago" },
];

const recentPrompts = [
  { title: "Onboarding Flow v3", status: "production" as const, preview: "You are an onboarding assistant that guides new users through…", version: "v3.2", updatedAgo: "2 min ago", tokens: 1247 },
  { title: "Code Review Assistant", status: "testing" as const, preview: "Analyze the following code diff and provide actionable…", version: "v1.4", updatedAgo: "15 min ago", tokens: 892 },
  { title: "Customer Support QA", status: "draft" as const, preview: "Given the customer query and knowledge base articles…", version: "v0.1", updatedAgo: "1 hr ago", tokens: 634 },
];

const miniEvalData = {
  model: "claude-3.5-sonnet",
  overallScore: 87,
  totalTests: 24,
  passed: 21,
  failed: 3,
  metrics: [
    { name: "Accuracy", score: 92 },
    { name: "Relevance", score: 88 },
    { name: "Safety", score: 100 },
  ],
};

const aiDesignerTabs = [
  { label: "Generator", value: "generator" },
  { label: "Evaluator", value: "evaluator" },
];

export default function DashboardPage() {
  const [aiTab, setAiTab] = useState("generator");
  const [instruction, setInstruction] = useState("");

  return (
    <DashboardLayout
      header={
        <div>
          <Heading level="h1">Dashboard</Heading>
          <Text variant="muted" className="mt-1">Overview of your prompt engineering workspace.</Text>
        </div>
      }
      stats={<DashboardStats />}
    >
      {/* 50/50 Split: AI Designer Snippet + Activity Feed */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* AI Designer Snippet */}
        <div className="rounded-md border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="font-display text-sm font-medium text-foreground">AI Designer</span>
            <TabNav items={aiDesignerTabs} value={aiTab} onValueChange={setAiTab} />
          </div>
          <div className="p-3">
            {aiTab === "generator" ? (
              <AIGenerationPanel
                instruction={instruction}
                onInstructionChange={setInstruction}
                generatedOutput={instruction ? undefined : undefined}
                className="border-0 bg-transparent"
              />
            ) : (
              <div className="space-y-3">
                <EvaluationResults {...miniEvalData} className="border-0 bg-transparent" />
                <a
                  href="/app/ai-designer"
                  className="inline-flex items-center gap-1 font-display text-sm font-medium text-accent hover:underline"
                >
                  View full AI Designer
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <ActivityFeed items={feedItems} />
      </div>

      {/* Recent Prompts — full-width */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-medium text-foreground">Recent Prompts</span>
          <a
            href="/app/library"
            className="inline-flex items-center gap-1 font-display text-sm font-medium text-accent hover:underline"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentPrompts.map((prompt) => (
            <PromptCard
              key={prompt.title}
              title={prompt.title}
              status={prompt.status}
              preview={prompt.preview}
              version={prompt.version}
              updatedAgo={prompt.updatedAgo}
              tokens={prompt.tokens}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
