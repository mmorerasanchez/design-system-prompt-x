import * as React from "react";
import { cn } from "@/lib/utils";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "colored";
  removable?: boolean;
  onRemove?: () => void;
  selectable?: boolean;
  selected?: boolean;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = "default", removable, onRemove, selectable, selected, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-xs transition-colors",
          variant === "default" && "border-border text-foreground",
          variant === "colored" && "border-accent/30 bg-accent/5 text-accent",
          selectable && "cursor-pointer hover:bg-muted",
          selected && "border-accent bg-accent/10 text-accent",
          className,
        )}
        {...props}
      >
        {children}
        {removable && (
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
