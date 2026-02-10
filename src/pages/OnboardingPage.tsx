import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingWizard } from "@/components/organisms/OnboardingWizard";
import { IntegrationCard } from "@/components/organisms/IntegrationCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heading, Text } from "@/components/atoms";
import { Sparkles } from "lucide-react";

const steps = [
  { id: "welcome", title: "Welcome to prompt·x", description: "Your prompt engineering workspace. Let's get you set up in 3 quick steps.", completed: false },
  { id: "connect", title: "Connect a Provider", description: "Link an LLM provider so you can test and evaluate prompts in the playground.", completed: false },
  { id: "create", title: "Create Your First Prompt", description: "Give your first prompt a name and a quick description to get started.", completed: false },
];

const providers = [
  { name: "OpenAI", provider: "OpenAI", description: "GPT-4o, GPT-4 Turbo, and embedding models.", connected: false, status: "inactive" as const },
  { name: "Anthropic Claude", provider: "Anthropic", description: "Claude 3.5 Sonnet and Haiku models.", connected: false, status: "inactive" as const },
  { name: "Google Gemini", provider: "Google", description: "Gemini Pro and Ultra models.", connected: false, status: "inactive" as const },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardSteps, setWizardSteps] = useState(steps);
  const [connectedProvider, setConnectedProvider] = useState<string | null>(null);
  const [promptName, setPromptName] = useState("");

  const markComplete = (index: number) => {
    setWizardSteps((prev) => prev.map((s, i) => i === index ? { ...s, completed: true } : s));
  };

  const handleNext = () => {
    markComplete(currentStep);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/app");
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/app");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <Heading level="h1">
            prompt<span className="text-accent">x</span>
          </Heading>
          <Text variant="muted" className="mt-1">Prompt engineering, perfected.</Text>
        </div>

        <OnboardingWizard
          steps={wizardSteps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          onNext={handleNext}
          onSkip={handleSkip}
        >
          {currentStep === 0 && (
            <div className="space-y-3 rounded-md border border-border bg-surface p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 font-mono text-sm font-medium text-accent">1</div>
                <Text size="sm">Connect an LLM provider</Text>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 font-mono text-sm font-medium text-accent">2</div>
                <Text size="sm">Create your first prompt</Text>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 font-mono text-sm font-medium text-accent">3</div>
                <Text size="sm">Test and iterate in the playground</Text>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-3">
              {providers.map((p) => (
                <IntegrationCard
                  key={p.name}
                  {...p}
                  connected={connectedProvider === p.name}
                  status={connectedProvider === p.name ? "active" : "inactive"}
                  onConnect={() => setConnectedProvider(p.name)}
                  onDisconnect={() => setConnectedProvider(null)}
                />
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="prompt-name" className="font-display text-sm">Prompt Name</Label>
                <Input
                  id="prompt-name"
                  value={promptName}
                  onChange={(e) => setPromptName(e.target.value)}
                  placeholder="e.g. Customer Support Assistant"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="prompt-desc" className="font-display text-sm">Description (optional)</Label>
                <Textarea
                  id="prompt-desc"
                  placeholder="What does this prompt do?"
                  className="min-h-[80px]"
                />
              </div>
            </div>
          )}
        </OnboardingWizard>
      </div>
    </div>
  );
}
