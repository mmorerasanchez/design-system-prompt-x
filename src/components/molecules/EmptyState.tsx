import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  variant?: "no-data" | "no-results" | "error" | "first-use";
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="mb-4 rounded-lg bg-muted p-3">
        <Icon className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="font-display text-md font-medium text-foreground">{title}</h3>
      <p className="mt-1 max-w-[360px] font-body text-sm text-muted-foreground">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="mt-4">{action.label}</Button>
      )}
    </div>
  );
}
