import { cn } from "@/lib/utils";
import { NavItem } from "@/components/molecules/NavItem";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home, FileText, BarChart3, Settings, ChevronsLeft, ChevronsRight } from "lucide-react";

interface SidebarNavProps {
  collapsed?: boolean;
  onToggle?: () => void;
  activeItem?: string;
  onItemClick?: (id: string) => void;
  className?: string;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "library", label: "Prompt Library", icon: FileText },
  { id: "evaluations", label: "Evaluations", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function SidebarNav({ collapsed = false, onToggle, activeItem = "library", onItemClick, className }: SidebarNavProps) {
  return (
    <aside className={cn(
      "flex flex-col border-r border-border bg-surface transition-all duration-200",
      collapsed ? "w-sidebar-collapsed" : "w-sidebar-w",
      className,
    )}>
      {/* Header */}
      <div className={cn("flex h-header items-center border-b border-border px-3", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <span className="font-display text-md font-semibold tracking-tight">
            prompt<span className="text-accent">x</span>
          </span>
        )}
        <Button variant="ghost" size="icon" onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="h-7 w-7">
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeItem === item.id}
            collapsed={collapsed}
            onClick={() => onItemClick?.(item.id)}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-2">
        <Separator className="mb-2" />
        <div className={cn("flex items-center gap-2 rounded-md p-2", collapsed && "justify-center")}>
          <Avatar size="sm">
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-medium">Mariano</p>
              <p className="truncate font-body text-2xs text-muted-foreground">mariano@prompt-x.io</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
