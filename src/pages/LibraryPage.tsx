import { useState } from "react";
import { cn } from "@/lib/utils";
import { FilterBar } from "@/components/organisms/FilterBar";
import { PromptCard } from "@/components/organisms/PromptCard";
import { BulkActionsBar } from "@/components/organisms/BulkActionsBar";
import { CreatePromptDialog } from "@/components/organisms/CreatePromptDialog";
import { StatCard } from "@/components/molecules/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Heading, Text } from "@/components/atoms";

const prompts = [
  { id: "1", title: "Onboarding Flow v3", status: "production" as const, preview: "You are an onboarding assistant that guides new users through the product setup…", version: "v3.2", updatedAgo: "2 min ago", tokens: 1247 },
  { id: "2", title: "Code Review Assistant", status: "testing" as const, preview: "Analyze the following code diff and provide actionable feedback on code quality…", version: "v1.4", updatedAgo: "15 min ago", tokens: 892 },
  { id: "3", title: "Customer Support QA", status: "draft" as const, preview: "Given the customer query and knowledge base articles, generate a helpful…", version: "v0.1", updatedAgo: "1 hr ago", tokens: 634 },
  { id: "4", title: "Data Extraction Pipeline", status: "testing" as const, preview: "Extract structured data from the following unstructured text document…", version: "v2.1", updatedAgo: "3 hrs ago", tokens: 1580 },
  { id: "5", title: "Meeting Summarizer", status: "production" as const, preview: "Summarize the following meeting transcript into key decisions, action items…", version: "v4.0", updatedAgo: "1 day ago", tokens: 720 },
  { id: "6", title: "Legacy Email Classifier", status: "archived" as const, preview: "Classify the following email into one of the predefined categories…", version: "v1.0", updatedAgo: "2 weeks ago", tokens: 340 },
  { id: "7", title: "Blog Post Generator", status: "draft" as const, preview: "Write a blog post about the given topic following the brand voice guidelines…", version: "v0.3", updatedAgo: "5 hrs ago", tokens: 1100 },
  { id: "8", title: "SQL Query Builder", status: "testing" as const, preview: "Convert the following natural language question into an optimized SQL query…", version: "v1.2", updatedAgo: "8 hrs ago", tokens: 560 },
  { id: "9", title: "Sentiment Analyzer", status: "production" as const, preview: "Analyze the sentiment of the following customer reviews and classify as…", version: "v2.5", updatedAgo: "2 days ago", tokens: 480 },
];

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [createOpen, setCreateOpen] = useState(false);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = prompts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const productionCount = prompts.filter((p) => p.status === "production").length;
  const avgTokens = Math.round(prompts.reduce((sum, p) => sum + p.tokens, 0) / prompts.length);

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* PageHeader */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <Heading level="h1">Prompt Store</Heading>
            <Text variant="muted" className="mt-1">Browse, search, and manage your prompts.</Text>
          </div>
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            New Prompt
          </Button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total Prompts" value={prompts.length} trend={{ direction: "up", value: "+3 this week" }} />
          <StatCard label="Production" value={productionCount} trend={{ direction: "up", value: "+1" }} />
          <StatCard label="Avg Tokens" value={avgTokens.toLocaleString()} trend={{ direction: "neutral", value: "~steady" }} />
          <StatCard label="This Week" value="12" trend={{ direction: "up", value: "+40%" }} />
        </div>

        {/* Toolbar */}
        <FilterBar search={search} onSearchChange={setSearch} viewMode={viewMode} onViewModeChange={setViewMode} />

        {/* Content Grid / List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((prompt) => (
              <PromptCard
                key={prompt.id}
                title={prompt.title}
                status={prompt.status}
                preview={prompt.preview}
                version={prompt.version}
                updatedAgo={prompt.updatedAgo}
                tokens={prompt.tokens}
                selected={selected.has(prompt.id)}
                onClick={() => toggleSelect(prompt.id)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-border bg-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-4 py-2.5 text-left font-mono text-2xs uppercase tracking-widest text-muted-foreground">Name</th>
                  <th className="px-4 py-2.5 text-left font-mono text-2xs uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-left font-mono text-2xs uppercase tracking-widest text-muted-foreground">Version</th>
                  <th className="px-4 py-2.5 text-right font-mono text-2xs uppercase tracking-widest text-muted-foreground">Tokens</th>
                  <th className="px-4 py-2.5 text-right font-mono text-2xs uppercase tracking-widest text-muted-foreground">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((prompt) => (
                  <tr
                    key={prompt.id}
                    className={cn(
                      "cursor-pointer transition-colors hover:bg-surface",
                      selected.has(prompt.id) && "bg-accent/5"
                    )}
                    onClick={() => toggleSelect(prompt.id)}
                  >
                    <td className="px-4 py-3">
                      <span className="font-display text-sm font-medium text-foreground">{prompt.title}</span>
                      <p className="mt-0.5 font-body text-xs text-muted-foreground line-clamp-1">{prompt.preview}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={prompt.status}>{prompt.status}</Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prompt.version}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-muted-foreground">{prompt.tokens.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-muted-foreground">{prompt.updatedAgo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bulk Actions */}
        {selected.size > 0 && (
          <BulkActionsBar
            selectedCount={selected.size}
            onDismiss={() => setSelected(new Set())}
          />
        )}
        <CreatePromptDialog open={createOpen} onOpenChange={setCreateOpen} />
      </div>
    </div>
  );
}
