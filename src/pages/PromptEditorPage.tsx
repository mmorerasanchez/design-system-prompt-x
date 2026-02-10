import { useParams } from "react-router-dom";
import { Heading, Text } from "@/components/atoms";
import { Badge } from "@/components/ui/badge";
import { PenLine } from "lucide-react";

export default function PromptEditorPage() {
  const { id } = useParams();

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Heading level="h1">Prompt Editor</Heading>
            <Text variant="muted" size="sm" className="mt-1">
              Editing prompt <span className="font-mono text-accent">{id || "untitled"}</span>
            </Text>
          </div>
          <Badge variant="draft" size="sm">Coming Soon</Badge>
        </div>
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border bg-card/50 py-20">
          <PenLine className="h-10 w-10 text-muted-foreground/40 mb-3" />
          <Text variant="muted" className="font-display font-medium">Split-pane editor</Text>
          <Text variant="subtle" size="sm" className="mt-1">PromptEditorPanel, PlaygroundPanel, and VariableManager will live here.</Text>
        </div>
      </div>
    </div>
  );
}
