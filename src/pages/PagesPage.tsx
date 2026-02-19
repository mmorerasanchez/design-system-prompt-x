import { useState, lazy, Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Kbd } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/atoms";
import { Eye, X, Mail } from "lucide-react";

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));

export default function PagesPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight">Pages</h1>
        <p className="mt-1 font-body text-base text-muted-foreground">
          Page-level compositions built with democrito organisms and templates.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Dashboard card */}
        <button
          onClick={() => setOpen(true)}
          className="group rounded-lg border border-border bg-card p-5 space-y-3 text-left transition-colors hover:border-accent/40 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-md font-medium group-hover:text-accent transition-colors">Dashboard</h3>
            <div className="flex items-center gap-1.5 shrink-0">
              <Badge variant="outline" size="sm">DashboardLayout</Badge>
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="h-3 w-3 text-accent" />
              </div>
            </div>
          </div>
          <p className="font-mono text-xs text-accent">/app</p>
          <p className="font-body text-sm text-muted-foreground">
            Overview with KPI stats, AI Designer snippet with Generator/Evaluator tabs, activity feed, and recent prompts grid.
          </p>
          <div>
            <p className="font-mono text-2xs text-muted-foreground mb-1.5">Key Organisms:</p>
            <div className="flex flex-wrap gap-1">
              {["DashboardStats", "TabNav", "ActivityFeed"].map((org) => (
                <Badge key={org} variant="secondary" size="sm">{org}</Badge>
              ))}
            </div>
          </div>
        </button>

        {/* Community showcase card */}
        <div className="rounded-lg border border-dashed border-border bg-card/50 p-5 space-y-4 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-accent/10 p-3">
            <Mail className="h-5 w-5 text-accent" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-md font-medium">Showcase your app</h3>
            <p className="font-body text-sm text-muted-foreground max-w-xs">
              Built something with democrito? We'd love to feature it here. Send us a message to publish your demo.
            </p>
          </div>
          <a
            href="mailto:hola@atomic-products.com?subject=democrito%20showcase%20submission"
            className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent/10 px-4 py-2 font-display text-sm font-medium text-accent hover:bg-accent/20 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            hola@atomic-products.com
          </a>
        </div>
      </div>

      {/* Dashboard preview modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 gap-0 overflow-hidden flex flex-col [&>button.absolute]:hidden">
          <DialogTitle className="sr-only">Dashboard Preview</DialogTitle>

          <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5 shrink-0">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-sm font-medium">Dashboard</h2>
              <Badge variant="outline" size="sm">DashboardLayout</Badge>
              <span className="font-mono text-xs text-muted-foreground">/app</span>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2 text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" />
                <Kbd>Esc</Kbd>
              </Button>
            </DialogClose>
          </div>

          <div className="flex-1 overflow-auto bg-background">
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <Spinner size="lg" />
              </div>
            }>
              <div className="p-6 max-w-6xl mx-auto">
                <DashboardPage />
              </div>
            </Suspense>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
