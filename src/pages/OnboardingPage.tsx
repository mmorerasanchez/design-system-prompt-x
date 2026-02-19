import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingWizard } from "@/components/organisms/OnboardingWizard";
import { ParameterControl } from "@/components/molecules/ParameterControl";
import { ScoreBreakdown } from "@/components/molecules/ScoreBreakdown";
import { TokenCounter } from "@/components/molecules/TokenCounter";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Heading, Text } from "@/components/atoms";
import { Copy, Check, Pencil, Save, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WizardStep } from "@/components/organisms/OnboardingWizard";

// --- Constants ---

const MODELS = {
  OpenAI: ["gpt-5", "gpt-5-mini", "gpt-5-nano", "gpt-5.2"],
  Google: ["gemini-3-pro-preview", "gemini-3-flash-preview", "gemini-2.5-pro", "gemini-2.5-flash"],
  Anthropic: ["claude-4-opus", "claude-4-sonnet", "claude-3.5-sonnet", "claude-3.5-haiku"],
};

const PLATFORMS = ["Claude", "Gemini", "ChatGPT", "Lovable"];

const COMPLEXITY_OPTIONS = [
  { value: "basic", label: "Basic" },
  { value: "standard", label: "Standard" },
  { value: "advanced", label: "Advanced" },
] as const;

const REASONING_OPTIONS = [
  { value: "react", label: "ReAct" },
  { value: "cot", label: "Chain of Thought" },
  { value: "zero-shot", label: "Zero Shot" },
  { value: "few-shot", label: "Few Shot" },
] as const;

const ANATOMY_FIELDS = [
  { value: "role", label: "Role", color: "bg-category-teal", borderColor: "border-l-category-teal" },
  { value: "tone", label: "Tone", color: "bg-category-amber", borderColor: "border-l-category-amber" },
  { value: "context", label: "Context", color: "bg-category-emerald", borderColor: "border-l-category-emerald" },
  { value: "task", label: "Task", color: "bg-category-orange", borderColor: "border-l-category-orange" },
  { value: "reasoning", label: "Reasoning", color: "bg-category-violet", borderColor: "border-l-category-violet" },
  { value: "examples", label: "Examples", color: "bg-category-rose", borderColor: "border-l-category-rose" },
  { value: "output", label: "Output", color: "bg-category-blue", borderColor: "border-l-category-blue" },
  { value: "constraints", label: "Constraints", color: "bg-category-red", borderColor: "border-l-category-red" },
  { value: "tools", label: "Tools", color: "bg-category-gold", borderColor: "border-l-category-gold" },
] as const;

const GENERATION_PHASES = ["Analyzing input", "Structuring prompt", "Optimizing clarity", "Scoring quality"];

const MOCK_RESULT = `You are an expert customer support assistant for a SaaS platform.

## Role
Act as a patient, knowledgeable support agent who resolves issues efficiently while maintaining a friendly tone.

## Task
- Greet the user and acknowledge their issue
- Ask clarifying questions when needed
- Provide step-by-step solutions
- Offer alternative approaches if the first solution doesn't work

## Output Format
Respond in clear, concise paragraphs. Use bullet points for multi-step instructions. Always end with a follow-up question to confirm resolution.

## Constraints
- Never share internal documentation links
- Escalate billing issues to the billing team
- Keep responses under 200 words unless the issue is complex`;

// --- Steps definition ---

const STEPS: WizardStep[] = [
  { id: "model", title: "Select Model & Platform", description: "Choose the LLM model for performance and the target platform for output." },
  { id: "params", title: "Configure Parameters", description: "Set reasoning framework, complexity, temperature, and token limits." },
  { id: "input", title: "Provide Instructions", description: "Enter plain text instructions or fill individual anatomy fields." },
  { id: "generate", title: "Generating Your Prompt", description: "Analyzing and optimizing your input…", autoAdvance: true },
  { id: "result", title: "Your Improved Prompt", description: "Review the optimized prompt, check scores, and save." },
];

// --- Component ---

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardSteps, setWizardSteps] = useState<WizardStep[]>(STEPS.map((s) => ({ ...s, completed: false })));

  // Step 1: Model & Platform
  const [model, setModel] = useState("gemini-3-flash-preview");
  const [platform, setPlatform] = useState("Claude");

  // Step 2: Parameters
  const [reasoning, setReasoning] = useState("cot");
  const [complexity, setComplexity] = useState("standard");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);

  // Step 3: Input mode
  const [inputMode, setInputMode] = useState<"text" | "fields">("text");
  const [instruction, setInstruction] = useState("");
  const [fieldContents, setFieldContents] = useState<Record<string, string>>({});

  // Step 4: Generation animation
  const [generationPhase, setGenerationPhase] = useState(0);

  // Step 5: Result
  const [copied, setCopied] = useState(false);

  // --- Helpers ---

  const getProviderForModel = (m: string) => {
    for (const [provider, models] of Object.entries(MODELS)) {
      if (models.includes(m)) return provider;
    }
    return null;
  };

  const markComplete = useCallback((index: number) => {
    setWizardSteps((prev) => prev.map((s, i) => (i === index ? { ...s, completed: true } : s)));
  }, []);

  const handleNext = () => {
    markComplete(currentStep);
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      navigate("/app");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSkip = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1);
    else navigate("/app");
  };

  // Auto-advance for generation step
  useEffect(() => {
    if (currentStep !== 3) return;
    setGenerationPhase(0);
    const interval = setInterval(() => {
      setGenerationPhase((prev) => {
        if (prev >= GENERATION_PHASES.length - 1) {
          clearInterval(interval);
          // Auto-advance after a brief pause
          setTimeout(() => {
            markComplete(3);
            setCurrentStep(4);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [currentStep, markComplete]);

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_RESULT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateField = (field: string, value: string) => {
    setFieldContents((prev) => ({ ...prev, [field]: value }));
  };

  const modelProvider = getProviderForModel(model);
  const isGenerating = currentStep === 3;
  const isResult = currentStep === 4;

  // --- Render ---

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-3xl space-y-6">
        {/* Header — no icon, just title */}
        <div className="text-center">
          <Heading level="h1">
            prompt<span className="text-accent">x</span>
          </Heading>
          <Text variant="muted" className="mt-1">Prompt engineering, perfected.</Text>
        </div>

        <OnboardingWizard
          steps={wizardSteps}
          currentStep={currentStep}
          onStepClick={(i) => { if (i < currentStep) setCurrentStep(i); }}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
          hideActions={isGenerating || isResult}
        >
          {/* ====== STEP 1: Model & Platform ====== */}
          {currentStep === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Model</span>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="h-9 font-mono text-sm">
                    <span className="truncate">
                      {modelProvider && <span className="font-body text-muted-foreground">{modelProvider} / </span>}
                      {model}
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

              <div className="space-y-1.5">
                <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Target Platform</span>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className="h-9 font-mono text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p} value={p} className="font-mono text-sm">{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* ====== STEP 2: Parameters ====== */}
          {currentStep === 1 && (
            <div className="space-y-4">
              {/* Reasoning Framework */}
              <div className="space-y-1.5">
                <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Reasoning Framework</span>
                <Select value={reasoning} onValueChange={setReasoning}>
                  <SelectTrigger className="h-9 font-mono text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {REASONING_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="font-mono text-sm">{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Complexity */}
              <div className="space-y-1.5">
                <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Complexity</span>
                <div className="flex gap-2">
                  {COMPLEXITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setComplexity(opt.value)}
                      className={cn(
                        "flex-1 rounded-md border px-3 py-1.5 font-display text-sm font-medium transition-colors",
                        complexity === opt.value
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border bg-card text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <ParameterControl label="Temperature" value={temperature} onChange={setTemperature} min={0} max={2} step={0.1} />
              <ParameterControl label="Max Tokens" value={maxTokens} onChange={setMaxTokens} min={1} max={8192} step={1} />
            </div>
          )}

          {/* ====== STEP 3: Instructions / Fields (either/or toggle) ====== */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {/* Mode toggle */}
              <div className="flex rounded-md border border-border bg-muted p-0.5">
                <button
                  onClick={() => setInputMode("text")}
                  className={cn(
                    "flex-1 rounded-sm px-3 py-1.5 font-display text-sm font-medium transition-colors",
                    inputMode === "text"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Plain Text
                </button>
                <button
                  onClick={() => setInputMode("fields")}
                  className={cn(
                    "flex-1 rounded-sm px-3 py-1.5 font-display text-sm font-medium transition-colors",
                    inputMode === "fields"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Anatomy Fields
                </button>
              </div>

              {inputMode === "text" ? (
                <Textarea
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  placeholder="Describe what you want the AI to do. Be as specific as possible…"
                  className="min-h-[140px] text-sm"
                />
              ) : (
                <div className="space-y-2">
                  {ANATOMY_FIELDS.map((field) => (
                    <div
                      key={field.value}
                      className="rounded-md bg-card overflow-hidden"
                    >
                      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
                        <span className={cn("h-2 w-2 rounded-full", field.color)} />
                        <span className="font-display text-xs font-medium text-foreground">{field.label}</span>
                      </div>
                      <Textarea
                        value={fieldContents[field.value] || ""}
                        onChange={(e) => updateField(field.value, e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()} content…`}
                        className="min-h-[48px] border-0 rounded-none text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ====== STEP 4: Generation Animation ====== */}
          {currentStep === 3 && (
            <div className="flex flex-col items-center justify-center py-8 space-y-6">

              {/* Phase indicators */}
              <div className="space-y-2 w-full max-w-xs">
                {GENERATION_PHASES.map((phase, i) => (
                  <div
                    key={phase}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 transition-all duration-300",
                      i < generationPhase
                        ? "opacity-50"
                        : i === generationPhase
                        ? "bg-accent/5 border border-accent/20"
                        : "opacity-30"
                    )}
                  >
                    <div className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-2xs",
                      i < generationPhase
                        ? "bg-success text-success-foreground"
                        : i === generationPhase
                        ? "bg-accent text-accent-foreground animate-ai-pulse"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {i < generationPhase ? <Check className="h-3 w-3" /> : i + 1}
                    </div>
                    <span className={cn(
                      "font-body text-sm",
                      i === generationPhase ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {phase}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ====== STEP 5: Results ====== */}
          {currentStep === 4 && (
            <div className="space-y-4">
              {/* Formatted prompt output */}
              <div className="relative rounded-md border border-border bg-surface">
                <div className="flex items-center justify-between border-b border-border px-3 py-2">
                  <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Compiled Output</span>
                  <Button variant="ghost" size="sm" className="h-7 gap-1.5" onClick={handleCopy}>
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
                <pre className="whitespace-pre-wrap p-4 font-mono text-xs text-foreground leading-relaxed max-h-[280px] overflow-y-auto">
                  {MOCK_RESULT}
                </pre>
              </div>

              {/* Indicators row */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <TokenCounter current={347} max={maxTokens} />
                  <ScoreBreakdown score={90} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 border-t border-border pt-4">
                <Button size="sm" className="gap-1.5" onClick={() => navigate("/app")}>
                  <Save className="h-3.5 w-3.5" />
                  Save Prompt
                </Button>
                <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => setCurrentStep(2)}>
                  <Pencil className="h-3.5 w-3.5" />
                  Edit Input
                </Button>
              </div>
            </div>
          )}
        </OnboardingWizard>
      </div>
    </div>
  );
}
