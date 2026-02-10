import { cn } from "@/lib/utils";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { SidebarNav } from "@/components/organisms/SidebarNav";
import { TopBar } from "@/components/organisms/TopBar";

/**
 * AppShell — Main application chrome.
 * SidebarNav + TopBar + routed content via <Outlet />.
 */
export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activeItem = location.pathname.split("/")[2] || "dashboard";

  const handleNavClick = (id: string) => {
    navigate(`/app/${id === "dashboard" ? "" : id}`);
    setMobileOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-overlay bg-background/80 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-modal lg:relative lg:z-auto transition-transform duration-200",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}>
        <SidebarNav
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          activeItem={activeItem}
          onItemClick={handleNavClick}
          className="h-full"
        />
      </div>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          onMenuClick={() => setMobileOpen(true)}
          title={activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
        />
        <Outlet />
      </div>
    </div>
  );
}
