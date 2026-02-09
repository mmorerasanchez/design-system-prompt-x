import { cn } from "@/lib/utils";
import { TokenCounter } from "./TokenCounter";

type AnatomyField = "role" | "tone" | "context" | "task" | "reasoning" | "examples" | "output" | "constraints" | "tools";

interface PromptFieldHeaderProps {
  /** Display label for the field */
  label: string;
  /** Anatomy field type for color coding */
  field: AnatomyField;
  /** Token count for this field */
  tokenCount?: number;
  /** Max tokens for progress bar */
  tokenMax?: number;
  /** Whether the field is required */
  required?: boolean;
  /** Right-side actions slot */
  actions?: React.ReactNode;
  className?: string;
}

const fieldColorMap: Record<AnatomyField, string> = {
  role: "bg-anatomy-role",
  tone: "bg-anatomy-tone",
  context: "bg-anatomy-context",
  task: "bg-anatomy-task",
  reasoning: "bg-anatomy-reasoning",
  examples: "bg-anatomy-examples",
  output: "bg-anatomy-output",
  constraints: "bg-anatomy-constraints",
  tools: "bg-anatomy-tools",
};

/**
 * PromptFieldHeader — Header bar for an anatomy field section.
 * Shows a colored dot, field label, required indicator, token counter, and action slot.
 */
export function PromptFieldHeader({
  label,
  field,
  tokenCount,
  tokenMax = 4000,
  required,
  actions,
  className,
}: PromptFieldHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2 py-1.5", className)}>
      <div className="flex items-center gap-2">
        <span className={cn("h-2 w-2 rounded-full shrink-0", fieldColorMap[field])} />
        <span className="font-body text-sm font-medium text-foreground">{label}</span>
        {required && (
          <span className="font-mono text-2xs text-error">*</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {tokenCount !== undefined && (
          <TokenCounter current={tokenCount} max={tokenMax} compact />
        )}
        {actions}
      </div>
    </div>
  );
}
