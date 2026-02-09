import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface WizardStep {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
}

interface OnboardingWizardProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  onNext?: () => void;
  onSkip?: () => void;
  children?: React.ReactNode;
  className?: string;
}

/**
 * OnboardingWizard — Step-by-step onboarding flow with progress indicator,
 * step content slot, and navigation actions.
 */
export function OnboardingWizard({
  steps,
  currentStep,
  onStepClick,
  onNext,
  onSkip,
  children,
  className,
}: OnboardingWizardProps) {
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="font-display text-sm font-medium text-foreground">Getting Started</span>
        <span className="font-mono text-2xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      {/* Progress steps */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2">
              {i > 0 && (
                <div className={cn(
                  "h-px w-6 transition-colors",
                  i <= currentStep ? "bg-accent" : "bg-border",
                )} />
              )}
              <button
                type="button"
                onClick={() => onStepClick?.(i)}
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-medium transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  step.completed
                    ? "bg-success text-success-foreground"
                    : i === currentStep
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {step.completed ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Current step info */}
      <div className="px-4 py-4">
        <h3 className="font-display text-md font-medium text-foreground">
          {steps[currentStep]?.title}
        </h3>
        <p className="mt-1 font-body text-sm text-muted-foreground">
          {steps[currentStep]?.description}
        </p>

        {/* Content slot */}
        {children && <div className="mt-4">{children}</div>}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <Button variant="ghost" size="sm" onClick={onSkip}>
          Skip
        </Button>
        <Button size="sm" onClick={onNext}>
          {isLastStep ? "Finish" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
