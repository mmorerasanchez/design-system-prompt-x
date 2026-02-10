import { Heading, Text } from "@/components/atoms";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";

export default function EvaluationsPage() {
  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Heading level="h1">Evaluations</Heading>
            <Text variant="muted" size="sm" className="mt-1">Run and review prompt evaluation results.</Text>
          </div>
          <Badge variant="draft" size="sm">Coming Soon</Badge>
        </div>
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border bg-card/50 py-20">
          <BarChart3 className="h-10 w-10 text-muted-foreground/40 mb-3" />
          <Text variant="muted" className="font-display font-medium">Evaluation dashboard</Text>
          <Text variant="subtle" size="sm" className="mt-1">EvaluationResults, TestDatasetManager, and RunHistory will live here.</Text>
        </div>
      </div>
    </div>
  );
}
