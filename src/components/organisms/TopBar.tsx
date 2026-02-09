import { cn } from "@/lib/utils";
import { BreadcrumbNav } from "@/components/molecules/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/atoms";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Bell, Menu } from "lucide-react";

interface TopBarProps {
  breadcrumbs?: { label: string; href?: string }[];
  title?: string;
  onMenuClick?: () => void;
  showMobileMenu?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

export function TopBar({ breadcrumbs, title, onMenuClick, showMobileMenu = true, actions, className }: TopBarProps) {
  return (
    <header className={cn(
      "sticky top-0 z-sticky flex h-header items-center justify-between border-b border-border bg-surface px-4",
      className,
    )}>
      <div className="flex items-center gap-3 min-w-0">
        {showMobileMenu && (
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Toggle menu">
            <Menu className="h-4 w-4" />
          </Button>
        )}
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <BreadcrumbNav items={breadcrumbs} />
        ) : title ? (
          <h1 className="truncate font-display text-lg font-semibold tracking-tight">{title}</h1>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 text-muted-foreground">
          <Search className="h-4 w-4" />
          <span className="font-body text-sm">Search</span>
          <span className="flex items-center gap-0.5"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
        </Button>
        <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Search">
          <Search className="h-4 w-4" />
        </Button>
        {actions}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Avatar size="sm">
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
