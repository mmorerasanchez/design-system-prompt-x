import { cn } from "@/lib/utils";

interface ContentZone {
  label: string;
  className?: string;
}

interface TemplatePreviewProps {
  title: string;
  description: string;
  responsive: string;
  composedOf: string;
  zones: ContentZone[];
  layout: "sidebar-main" | "centered" | "full-width" | "sidebar-settings" | "split-pane" | "sidebar-main-panel";
  className?: string;
}

function Zone({ label, className }: ContentZone) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/50 p-4 font-mono text-xs text-muted-foreground",
      className,
    )}>
      {label}
    </div>
  );
}

export function TemplatePreview({ title, description, responsive, composedOf, zones, layout, className }: TemplatePreviewProps) {
  const renderLayout = () => {
    switch (layout) {
      case "sidebar-main":
        return (
          <div className="flex h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label={zones[0]?.label || "Sidebar"} className="w-[60px] sm:w-[100px] rounded-none border-0 border-r-2 shrink-0" />
            <div className="flex-1 flex flex-col">
              <Zone label={zones[1]?.label || "Header"} className="h-10 rounded-none border-0 border-b-2 shrink-0" />
              <Zone label={zones[2]?.label || "Main Content"} className="flex-1 rounded-none border-0" />
            </div>
          </div>
        );
      case "sidebar-main-panel":
        return (
          <div className="flex h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label="Sidebar" className="w-[60px] sm:w-[80px] rounded-none border-0 border-r-2 shrink-0" />
            <div className="flex-1 flex flex-col">
              <Zone label="Header" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
              <div className="flex flex-1">
                <Zone label="Main Content" className="flex-1 rounded-none border-0" />
                <Zone label="Right Panel" className="w-[80px] rounded-none border-0 border-l-2 shrink-0 hidden sm:flex" />
              </div>
            </div>
          </div>
        );
      case "split-pane":
        return (
          <div className="flex h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label="Sidebar" className="w-[60px] rounded-none border-0 border-r-2 shrink-0" />
            <div className="flex-1 flex flex-col">
              <Zone label="Header" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
              <div className="flex flex-1">
                <Zone label="Editor (50%)" className="flex-1 rounded-none border-0" />
                <div className="w-1 bg-border cursor-col-resize shrink-0" />
                <Zone label="Preview (50%)" className="flex-1 rounded-none border-0" />
              </div>
            </div>
          </div>
        );
      case "centered":
        return (
          <div className="flex h-[320px] items-center justify-center rounded-md border border-border bg-muted/30">
            <Zone label={zones[0]?.label || "Auth Card"} className="w-[200px] h-[180px]" />
          </div>
        );
      case "full-width":
        return (
          <div className="flex flex-col h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label="Header" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
            <Zone label="Hero / Content" className="flex-1 rounded-none border-0" />
            <Zone label="Footer" className="h-10 rounded-none border-0 border-t-2 shrink-0" />
          </div>
        );
      case "sidebar-settings":
        return (
          <div className="flex h-[320px] rounded-md border border-border overflow-hidden">
            <Zone label="Sidebar" className="w-[60px] rounded-none border-0 border-r-2 shrink-0" />
            <div className="flex-1 flex flex-col">
              <Zone label="Header" className="h-10 rounded-none border-0 border-b-2 shrink-0" />
              <div className="flex flex-1">
                <Zone label="Settings Nav" className="w-[80px] rounded-none border-0 border-r-2 shrink-0" />
                <Zone label="Settings Content" className="flex-1 rounded-none border-0 max-w-[300px]" />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <h3 className="font-display text-md font-medium">{title}</h3>
        <p className="font-body text-sm text-muted-foreground">{description}</p>
        <p className="mt-1 font-mono text-2xs text-accent">Composed of: {composedOf}</p>
        <p className="font-mono text-2xs text-muted-foreground">Responsive: {responsive}</p>
      </div>
      {renderLayout()}
    </div>
  );
}
