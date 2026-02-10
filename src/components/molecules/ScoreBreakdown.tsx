import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

interface ScoreCriterion {
  label: string;
  weight: number;
  score: number;
  explanation: string;
}

const DEFAULT_CRITERIA: ScoreCriterion[] = [
  { label: "Clarity", weight: 25, score: 92, explanation: "Instructions are unambiguous and easy to follow for the target model." },
  { label: "Specificity", weight: 25, score: 88, explanation: "Prompt includes concrete details, avoiding vague or open-ended phrasing." },
  { label: "Structure", weight: 20, score: 95, explanation: "Logical flow with clear sections; anatomy fields are well-organized." },
  { label: "Completeness", weight: 15, score: 85, explanation: "All necessary context, constraints, and output format are defined." },
  { label: "Efficiency", weight: 15, score: 90, explanation: "Token usage is optimized — no redundancy or unnecessary verbosity." },
];

interface ScoreBreakdownProps {
  score?: number;
  criteria?: ScoreCriterion[];
  className?: string;
}

/**
 * ScoreBreakdown — Score badge with popover showing weighted rubric methodology.
 */
export function ScoreBreakdown({
  score = 90,
  criteria = DEFAULT_CRITERIA,
  className,
}: ScoreBreakdownProps) {
  const getScoreColor = (s: number) => {
    if (s >= 90) return "text-success";
    if (s >= 75) return "text-warning";
    return "text-error";
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-sm transition-colors hover:bg-muted",
            className,
          )}
        >
          <span className="text-muted-foreground">Score</span>
          <span className={cn("font-semibold", getScoreColor(score))}>{score}</span>
          <span className="text-muted-foreground">/100</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b border-border px-4 py-3">
          <span className="font-display text-sm font-medium text-foreground">Quality Score Methodology</span>
          <p className="mt-0.5 font-body text-xs text-muted-foreground">
            Weighted evaluation across 5 prompt quality dimensions.
          </p>
        </div>
        <div className="divide-y divide-border">
          {criteria.map((c) => (
            <div key={c.label} className="px-4 py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-medium text-foreground">{c.label}</span>
                  <Badge variant="secondary" size="sm">
                    <span className="font-mono text-2xs">{c.weight}%</span>
                  </Badge>
                </div>
                <span className={cn("font-mono text-sm font-semibold", getScoreColor(c.score))}>
                  {c.score}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                {c.explanation}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 bg-surface">
          <span className="font-display text-sm font-medium text-foreground">Weighted Total</span>
          <span className={cn("font-mono text-sm font-bold", getScoreColor(score))}>{score}/100</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
