import { useState } from "react";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { DashboardStats } from "@/components/organisms/DashboardStats";
import { ActivityFeed } from "@/components/organisms/ActivityFeed";
import { EvaluationResults } from "@/components/organisms/EvaluationResults";
import { PromptConfigFields, defaultPromptConfig } from "@/components/organisms/PromptConfigFields";
import type { PromptConfigState } from "@/components/organisms/PromptConfigFields";
import { TabNav } from "@/components/molecules/TabNav";
import { Heading, Text } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTypingAnimation } from "@/hooks/use-typing-animation";

const feedItems = [
  { actor: "Sarah K.", initials: "SK", action: "deployed", resource: "onboarding-flow-v3", time: "2 min ago" },
  { actor: "Marcus T.", initials: "MT", action: "updated", resource: "code-review-assistant", time: "15 min ago" },
  { actor: "Priya R.", initials: "PR", action: "created", resource: "customer-support-qa", time: "1 hr ago" },
  { actor: "Alex M.", initials: "AM", action: "evaluated", resource: "data-extraction-v2", time: "2 hrs ago" },
  { actor: "Jordan L.", initials: "JL", action: "archived", resource: "legacy-summarizer", time: "5 hrs ago" },
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
  const [config, setConfig] = useState<PromptConfigState>(defaultPromptConfig);
  const typingText = useTypingAnimation();

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
      {/* AI Designer — full width with external title + tabs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <TabNav items={aiDesignerTabs} value={aiTab} onValueChange={setAiTab} />
          <a
            href="/app/ai-designer"
            className="inline-flex items-center gap-1 font-display text-sm font-medium text-accent hover:underline"
          >
            Open designer
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {aiTab === "generator" ? (
          <div className="rounded-md border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-medium text-foreground">AI Generate</span>
              </div>
              <Badge variant="secondary" size="sm">
                <span className="font-mono">ai-assist</span>
              </Badge>
            </div>
            <div className="p-4 space-y-3">
              <PromptConfigFields
                config={config}
                onChange={setConfig}
                mode="compact"
                instructionOverride={typingText}
              />
              <div className="flex justify-end">
                <Button size="sm" disabled={!config.instruction.trim() && !typingText}>
                  <Sparkles className="h-3.5 w-3.5" />
                  Generate
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <EvaluationResults {...miniEvalData} />
        )}
      </div>

      {/* Recent Activity — full-width */}
      <ActivityFeed items={feedItems} />
    </DashboardLayout>
  );
}
