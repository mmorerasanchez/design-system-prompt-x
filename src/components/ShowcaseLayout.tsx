import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/atoms";
import { Outlet } from "react-router-dom";
export function ShowcaseLayout() {
  return <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-sticky flex h-header items-center justify-between border-b border-border bg-surface px-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="lg:hidden" />
              <Logo size={24} />
              <h1 className="font-mono text-lg font-semibold tracking-tight lowercase">
                democrito
              </h1>
              <span className="font-mono text-2xs text-muted-foreground">v2.0.0</span>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-10">
            <div className="mx-auto max-w-5xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>;
}