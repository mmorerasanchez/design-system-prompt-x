import { useState } from "react";
import { useTypingAnimation } from "@/hooks/use-typing-animation";
import { Heading, Text } from "@/components/atoms";
import { StatCard } from "@/components/molecules/StatCard";
import { TabNav } from "@/components/molecules/TabNav";
import { PromptConfigFields, defaultPromptConfig } from "@/components/organisms/PromptConfigFields";
import type { PromptConfigState } from "@/components/organisms/PromptConfigFields";
import { EvalConfirmModal } from "@/components/organisms/EvalConfirmModal";
import { EvaluationResultsView } from "@/components/organisms/EvaluationResultsView";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const tabs = [
  { label: "Generator", value: "generator" },
  { label: "Evaluator", value: "evaluator" },
];

export default function AIDesignerPage() {
  const [activeTab, setActiveTab] = useState("generator");
  const [genConfig, setGenConfig] = useState<PromptConfigState>(defaultPromptConfig);
  const [evalConfig, setEvalConfig] = useState<PromptConfigState>(defaultPromptConfig);
  const typingText = useTypingAnimation();

  // Evaluator flow state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [evalRunning, setEvalRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleEvaluateClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmEval = () => {
    setEvalRunning(true);
    setTimeout(() => {
      setEvalRunning(false);
      setConfirmOpen(false);
      setShowResults(true);
    }, 1800);
  };

  const handleBackToEvaluator = () => {
    setShowResults(false);
  };

  const handleReEvaluate = () => {
    setShowResults(false);
    setConfirmOpen(true);
  };

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Show full-page results if evaluation completed */}
        {showResults && activeTab === "evaluator" ? (
          <EvaluationResultsView
            onBack={handleBackToEvaluator}
            onReEvaluate={handleReEvaluate}
          />
        ) : (
          <>
            {/* PageHeader */}
            <div>
              <Heading level="h1">AI Designer</Heading>
              <Text variant="muted" className="mt-1">Generate and evaluate prompts with AI.</Text>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard label="Total Runs" value="384" trend={{ direction: "up", value: "+24 today" }} />
              <StatCard label="Avg Score" value="87.3" trend={{ direction: "up", value: "+2.1" }} />
              <StatCard label="Tokens Used" value="142K" trend={{ direction: "neutral", value: "~avg" }} />
              <StatCard label="Success Rate" value="94%" trend={{ direction: "up", value: "+1.2%" }} />
            </div>

            {/* TabNav */}
            <div className="flex items-center justify-between">
              <TabNav items={tabs} value={activeTab} onValueChange={setActiveTab} />
              <a
                href="/app/library"
                className="inline-flex items-center gap-1 font-display text-sm font-medium text-accent hover:underline"
              >
                Start from preset
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Generator Tab — 50/50 split */}
            {activeTab === "generator" && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-md border border-border bg-card">
                  <div className="border-b border-border px-3 py-2">
                    <span className="font-display text-sm font-medium text-foreground">Configuration</span>
                  </div>
                  <div className="space-y-4 p-4">
                    <PromptConfigFields config={genConfig} onChange={setGenConfig} mode="full" instructionOverride={typingText} />
                    <Button className="w-full" disabled={!genConfig.instruction.trim()}>
                      <Sparkles className="h-3.5 w-3.5" />
                      Generate
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border border-border bg-card">
                  <div className="border-b border-border px-3 py-2">
                    <span className="font-display text-sm font-medium text-foreground">Output</span>
                  </div>
                  <div className="p-4">
                    <p className="py-16 text-center font-body text-sm text-foreground-subtle italic">
                      Configure parameters and click Generate to see output.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Evaluator Tab — full-width config (same as generator) */}
            {activeTab === "evaluator" && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-md border border-border bg-card">
                  <div className="border-b border-border px-3 py-2">
                    <span className="font-display text-sm font-medium text-foreground">Evaluation Configuration</span>
                  </div>
                  <div className="space-y-4 p-4">
                    <PromptConfigFields config={evalConfig} onChange={setEvalConfig} mode="full" />
                    <Button
                      className="w-full"
                      onClick={handleEvaluateClick}
                      disabled={!evalConfig.instruction.trim()}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Evaluate
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border border-border bg-card">
                  <div className="border-b border-border px-3 py-2">
                    <span className="font-display text-sm font-medium text-foreground">Preview</span>
                  </div>
                  <div className="p-4">
                    {evalConfig.instruction.trim() ? (
                      <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted-foreground">
                        {evalConfig.instruction}
                      </pre>
                    ) : (
                      <p className="py-16 text-center font-body text-sm text-foreground-subtle italic">
                        Configure parameters and click Evaluate to see results.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Confirmation Modal */}
        <EvalConfirmModal
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          config={evalConfig}
          running={evalRunning}
          onConfirm={handleConfirmEval}
        />
      </div>
    </div>
  );
}
