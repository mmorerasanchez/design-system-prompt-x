import { useState } from "react";
import { LibraryLayout } from "@/components/templates/LibraryLayout";
import { FilterBar } from "@/components/organisms/FilterBar";
import { PromptCard } from "@/components/organisms/PromptCard";
import { BulkActionsBar } from "@/components/organisms/BulkActionsBar";
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

  return (
    <LibraryLayout
      filters={
        <div className="space-y-3 px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Heading level="h1">Prompt Library</Heading>
              <Text variant="muted" size="sm" className="mt-0.5">{prompts.length} prompts</Text>
            </div>
            <Button size="sm">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              New Prompt
            </Button>
          </div>
          <FilterBar search={search} onSearchChange={setSearch} />
        </div>
      }
      bulkActions={
        <BulkActionsBar
          selectedCount={selected.size}
          onDismiss={() => setSelected(new Set())}
        />
      }
    >
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
    </LibraryLayout>
  );
}
