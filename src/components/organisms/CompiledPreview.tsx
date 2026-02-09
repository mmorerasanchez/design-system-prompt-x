import { cn } from "@/lib/utils";
import { TokenCounter } from "@/components/molecules/TokenCounter";

interface CompiledPreviewProps {
  content: string;
  totalTokens?: number;
  maxTokens?: number;
  className?: string;
}

/**
 * CompiledPreview — read-only view of the fully compiled prompt with
 * all anatomy fields merged and variables resolved. Shows token usage.
 */
export function CompiledPreview({
  content,
  totalTokens,
  maxTokens = 4096,
  className,
}: CompiledPreviewProps) {
  return (
    <div className={cn("flex flex-col rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-display text-sm font-medium text-foreground">Compiled Output</span>
        {totalTokens !== undefined && (
          <TokenCounter current={totalTokens} max={maxTokens} compact />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-3">
        {content ? (
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground">
            {content}
          </pre>
        ) : (
          <p className="py-8 text-center font-body text-sm text-foreground-subtle italic">
            No compiled output yet — add content to anatomy fields.
          </p>
        )}
      </div>
    </div>
  );
}
