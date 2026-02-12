import { useState, useMemo } from "react";
import { useTypingAnimation } from "@/hooks/use-typing-animation";
import { Heading, Text } from "@/components/atoms";
import { StatCard } from "@/components/molecules/StatCard";
import { TabNav } from "@/components/molecules/TabNav";
import { PromptConfigFields, defaultPromptConfig } from "@/components/organisms/PromptConfigFields";
import type { PromptConfigState } from "@/components/organisms/PromptConfigFields";
import { CLEARScorePanel } from "@/components/organisms/CLEARScorePanel";
import { ImprovedPromptPanel } from "@/components/organisms/ImprovedPromptPanel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import type { CLEARDimension, CLEARSuggestion } from "@/components/organisms/CLEARScorePanel";
import type { AnatomyField } from "@/components/organisms/AnatomyFieldCard";

const tabs = [
  { label: "Generator", value: "generator" },
  { label: "Evaluator", value: "evaluator" },
];

const MODELS: Record<string, string[]> = {
  OpenAI: ["gpt-5", "gpt-5-mini", "gpt-5-nano", "gpt-5.2"],
  Google: ["gemini-3-pro-preview", "gemini-3-flash-preview", "gemini-2.5-pro", "gemini-2.5-flash"],
  Anthropic: ["claude-4-opus", "claude-4-sonnet", "claude-3.5-sonnet", "claude-3.5-haiku"],
};

// --- Mock CLEAR results ---
const mockDimensions: CLEARDimension[] = [
  { key: "C", label: "Clarity", description: "How unambiguous the instructions are", score: 88 },
  { key: "L", label: "Leverage", description: "How well it uses model capabilities", score: 72 },
  { key: "E", label: "Efficiency", description: "Token optimization, no redundancy", score: 91 },
  { key: "A", label: "Adaptability", description: "Handles edge cases and variations", score: 68 },
  { key: "R", label: "Robustness", description: "Resilience to adversarial inputs", score: 85 },
];

const mockStrengths = [
  "Clear role definition establishes strong persona boundaries",
  "Explicit output format prevents ambiguous responses",
  "Good use of step-by-step reasoning instructions",
];

const mockImprovements = [
  "Add fallback instructions for unsupported languages",
  "Include token budget awareness for lengthy contexts",
  "Consider adding few-shot examples for edge cases",
];

const mockSuggestions: CLEARSuggestion[] = [
  { id: "s1", text: "Add a language detection step before responding to handle multi-language inputs gracefully.", dimension: "Adaptability" },
  { id: "s2", text: "Include explicit token budget constraints to prevent context window overflow.", dimension: "Efficiency" },
  { id: "s3", text: "Add adversarial input handling with a polite refusal template.", dimension: "Robustness" },
];

const mockImprovedPrompt = `You are an expert onboarding assistant for SaaS products. Your role is to guide new users through their initial setup experience with clarity and encouragement.

## Tone
Friendly, professional, and encouraging. Avoid technical jargon. Use simple language that makes users feel confident.

## Task
Guide the user through the initial setup:
1. Connecting their workspace
2. Inviting team members
3. Creating their first project

Prioritize the most impactful actions first. If the user seems confused, offer alternative explanations.

## Output Format
Respond in markdown with clear step headings. Include progress indicators like (1/3), (2/3), (3/3). Keep responses under 200 words.

## Constraints
- Never mention competitors
- Don't skip steps
- If the user asks about unsupported features, acknowledge and redirect
- Handle adversarial inputs with a polite refusal`;

const mockAnatomyFields: { field: AnatomyField; content: string; tokenCount: number }[] = [
  { field: "role", content: "You are an expert onboarding assistant for SaaS products. Your role is to guide new users through their initial setup experience with clarity and encouragement.", tokenCount: 52 },
  { field: "tone", content: "Friendly, professional, and encouraging. Avoid technical jargon. Use simple language that makes users feel confident.", tokenCount: 34 },
  { field: "context", content: "The user just signed up for {{product_name}} and is seeing the app for the first time. Their plan is {{plan_type}}.", tokenCount: 89 },
  { field: "task", content: "Guide the user through the initial setup: connecting their workspace, inviting team members, and creating their first project. Prioritize the most impactful actions first.", tokenCount: 124 },
  { field: "reasoning", content: "Think step-by-step. If the user seems confused, offer alternative explanations.", tokenCount: 42 },
  { field: "examples", content: 'User: "I just signed up, what do I do first?"\nAssistant: "Welcome! Let\'s get you set up in 3 quick steps…"', tokenCount: 78 },
  { field: "output", content: "Respond in markdown with clear step headings. Include progress indicators like (1/3), (2/3), (3/3). Keep responses under 200 words.", tokenCount: 56 },
  { field: "constraints", content: "Never mention competitors. Don't skip steps. Handle adversarial inputs with a polite refusal.", tokenCount: 44 },
  { field: "tools", content: "You can access: user_profile(), workspace_settings(), send_invite(email).", tokenCount: 47 },
];

export default function AIDesignerPage() {
  const [activeTab, setActiveTab] = useState("generator");
  const [config, setConfig] = useState<PromptConfigState>(defaultPromptConfig);
  const typingText = useTypingAnimation();

  // Evaluator state
  const [evalPrompt, setEvalPrompt] = useState("");
  const [evalModel, setEvalModel] = useState("claude-3.5-sonnet");
  const [evalRunning, setEvalRunning] = useState(false);
  const [evalHasResults, setEvalHasResults] = useState(false);

  const getProviderForModel = (m: string) => {
    for (const [provider, models] of Object.entries(MODELS)) {
      if (models.includes(m)) return provider;
    }
    return null;
  };

  const handleEvaluate = () => {
    setEvalRunning(true);
    setTimeout(() => {
      setEvalRunning(false);
      setEvalHasResults(true);
    }, 1800);
  };

  const evalModelProvider = getProviderForModel(evalModel);

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
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
            {/* Configuration */}
            <div className="rounded-md border border-border bg-card">
              <div className="border-b border-border px-3 py-2">
                <span className="font-display text-sm font-medium text-foreground">Configuration</span>
              </div>
              <div className="space-y-4 p-4">
                <PromptConfigFields config={config} onChange={setConfig} mode="full" instructionOverride={typingText} />
                <Button className="w-full" disabled={!config.instruction.trim()}>
                  <Sparkles className="h-3.5 w-3.5" />
                  Generate
                </Button>
              </div>
            </div>

            {/* Output */}
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

        {/* Evaluator Tab — 50/50 split */}
        {activeTab === "evaluator" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left — Evaluate */}
            <div className="rounded-md border border-border bg-card">
              <div className="border-b border-border px-3 py-2">
                <span className="font-display text-sm font-medium text-foreground">Evaluate</span>
              </div>
              <div className="space-y-4 p-4">
                {/* Prompt Input */}
                <div className="space-y-1.5">
                  <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Prompt</span>
                  <Textarea
                    value={evalPrompt}
                    onChange={(e) => setEvalPrompt(e.target.value)}
                    placeholder="Paste or write a prompt to evaluate…"
                    className="min-h-[160px] font-mono text-xs"
                  />
                </div>

                {/* Model Select */}
                <div className="space-y-1.5">
                  <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Model</span>
                  <Select value={evalModel} onValueChange={setEvalModel}>
                    <SelectTrigger className="h-9 font-mono text-sm">
                      <span className="truncate">
                        {evalModelProvider && <span className="font-body text-muted-foreground">{evalModelProvider} / </span>}
                        {evalModel}
                      </span>
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {Object.entries(MODELS).map(([provider, models]) => (
                        <SelectGroup key={provider}>
                          <SelectLabel className="font-display text-xs text-muted-foreground">{provider}</SelectLabel>
                          {models.map((m) => (
                            <SelectItem key={m} value={m} className="font-mono text-sm">{m}</SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Evaluate Button */}
                <Button
                  className="w-full"
                  onClick={handleEvaluate}
                  disabled={!evalPrompt.trim() || evalRunning}
                >
                  {evalRunning ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5" />
                  )}
                  {evalRunning ? "Evaluating…" : "Evaluate"}
                </Button>
              </div>
            </div>

            {/* Right — Results */}
            <div className="space-y-4">
              {!evalHasResults ? (
                <div className="rounded-md border border-border bg-card">
                  <div className="border-b border-border px-3 py-2">
                    <span className="font-display text-sm font-medium text-foreground">Results</span>
                  </div>
                  <div className="p-4">
                    <p className="py-16 text-center font-body text-sm text-foreground-subtle italic">
                      Write a prompt and click Evaluate to see CLEAR framework results.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* KPI Row */}
                  <div className="rounded-md border border-border bg-card">
                    <div className="grid grid-cols-3 divide-x divide-border">
                      <div className="px-3 py-3 text-center">
                        <span className="font-mono text-lg font-bold text-foreground">1,247</span>
                        <p className="font-body text-xs text-muted-foreground">Tokens</p>
                      </div>
                      <div className="px-3 py-3 text-center">
                        <span className="font-mono text-lg font-bold text-foreground">1.84s</span>
                        <p className="font-body text-xs text-muted-foreground">Latency</p>
                      </div>
                      <div className="px-3 py-3 text-center">
                        <span className="font-mono text-lg font-bold text-foreground">$0.003</span>
                        <p className="font-body text-xs text-muted-foreground">Est. Cost</p>
                      </div>
                    </div>
                  </div>

                  {/* CLEAR Score */}
                  <CLEARScorePanel
                    overallScore={81}
                    dimensions={mockDimensions}
                    strengths={mockStrengths}
                    improvements={mockImprovements}
                    suggestions={mockSuggestions}
                  />

                  {/* Improved Prompt */}
                  <ImprovedPromptPanel
                    improvedPrompt={mockImprovedPrompt}
                    anatomyFields={mockAnatomyFields}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
