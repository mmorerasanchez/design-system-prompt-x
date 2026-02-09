import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface Step {
  label: string;
  status: "draft" | "testing" | "production" | "archived";
  completed?: boolean;
  active?: boolean;
}

interface StatusLifecycleBarProps {
  steps: Step[];
  className?: string;
}

export function StatusLifecycleBar({ steps, className }: StatusLifecycleBarProps) {
  return (
    <div className={cn("flex items-center gap-0", className)}>
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center">
          <div className={cn("flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors",
            step.active ? "bg-card border border-border" : "bg-transparent"
          )}>
            {/* Gate circle */}
            <span className={cn(
              "flex h-3.5 w-3.5 items-center justify-center rounded-full",
              step.completed ? "bg-success text-success-foreground" : "border-2 border-border bg-transparent",
              step.active && !step.completed && "border-accent",
            )}>
              {step.completed && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
            </span>
            <span className={cn(
              "font-mono text-xs",
              step.active ? "font-medium text-foreground" : "text-muted-foreground",
            )}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn(
              "h-px w-6",
              step.completed ? "bg-success" : "bg-border",
            )} />
          )}
        </div>
      ))}
    </div>
  );
}
