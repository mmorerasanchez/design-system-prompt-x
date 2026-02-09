import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  disabled?: boolean;
  collapsed?: boolean;
  count?: number;
  onClick?: () => void;
  className?: string;
}

export function NavItem({ icon: Icon, label, active, disabled, collapsed, count, onClick, className }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 font-display text-sm font-medium transition-all duration-150",
        active
          ? "bg-card text-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1 text-left truncate">{label}</span>
          {count !== undefined && <Badge variant="count" size="sm">{count}</Badge>}
        </>
      )}
    </button>
  );
}
