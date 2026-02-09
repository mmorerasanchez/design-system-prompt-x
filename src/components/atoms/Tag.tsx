import * as React from "react";
import { cn } from "@/lib/utils";

type AnatomyColor = "role" | "tone" | "context" | "task" | "reasoning" | "examples" | "output" | "constraints" | "tools";

const anatomyColorMap: Record<AnatomyColor, string> = {
  role: "bg-anatomy-role/10 text-anatomy-role border-anatomy-role/30",
  tone: "bg-anatomy-tone/10 text-anatomy-tone border-anatomy-tone/30",
  context: "bg-anatomy-context/10 text-anatomy-context border-anatomy-context/30",
  task: "bg-anatomy-task/10 text-anatomy-task border-anatomy-task/30",
  reasoning: "bg-anatomy-reasoning/10 text-anatomy-reasoning border-anatomy-reasoning/30",
  examples: "bg-anatomy-examples/10 text-anatomy-examples border-anatomy-examples/30",
  output: "bg-anatomy-output/10 text-anatomy-output border-anatomy-output/30",
  constraints: "bg-anatomy-constraints/10 text-anatomy-constraints border-anatomy-constraints/30",
  tools: "bg-anatomy-tools/10 text-anatomy-tools border-anatomy-tools/30",
};

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "removable" | "selectable";
  selected?: boolean;
  onRemove?: () => void;
  color?: AnatomyColor;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = "default", selected, onRemove, color, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-xs transition-colors",
          color
            ? anatomyColorMap[color]
            : selected
              ? "border-accent bg-card text-accent"
              : "border-border bg-muted text-foreground",
          variant === "selectable" && "cursor-pointer hover:bg-card",
          className,
        )}
        {...props}
      >
        {children}
        {variant === "removable" && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
            className="ml-0.5 rounded-sm text-muted-foreground hover:text-foreground"
            aria-label="Remove"
          >
            ×
          </button>
        )}
      </span>
    );
  },
);
Tag.displayName = "Tag";

export { Tag };
export type { TagProps, AnatomyColor };
