import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { DashboardStats } from "@/components/organisms/DashboardStats";
import { ActivityFeed } from "@/components/organisms/ActivityFeed";
import { AIGenerationPanel } from "@/components/organisms/AIGenerationPanel";
import { EvaluationResults } from "@/components/organisms/EvaluationResults";
import { TabNav } from "@/components/molecules/TabNav";
import { Heading, Text } from "@/components/atoms";
import { ArrowRight } from "lucide-react";

const feedItems = [
  { actor: "Sarah K.", initials: "SK", action: "deployed", resource: "onboarding-flow-v3", time: "2 min ago" },
  { actor: "Marcus T.", initials: "MT", action: "updated", resource: "code-review-assistant", time: "15 min ago" },
  { actor: "Priya R.", initials: "PR", action: "created", resource: "customer-support-qa", time: "1 hr ago" },
  { actor: "Alex M.", initials: "AM", action: "evaluated", resource: "data-extraction-v2", time: "2 hrs ago" },
  { actor: "Jordan L.", initials: "JL", action: "archived", resource: "legacy-summarizer", time: "5 hrs ago" },
];

const miniEvalData = {
  model: "claude-3.5-sonnet",
  overallScore: 87,
  totalTests: 24,
  passed: 21,
  failed: 3,
  metrics: [
    { name: "Accuracy", score: 92 },
    { name: "Relevance", score: 88 },
    { name: "Safety", score: 100 },
  ],
};

const aiDesignerTabs = [
  { label: "Generator", value: "generator" },
  { label: "Evaluator", value: "evaluator" },
];

const TYPING_TEXT = "Generate an onboarding assistant that guides new users through setup…";

function useTypingAnimation() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const indexRef = useRef(0);
  const directionRef = useRef<"typing" | "deleting" | "paused">("typing");

  useEffect(() => {
    const interval = setInterval(() => {
      if (directionRef.current === "typing") {
        indexRef.current += 1;
        setText(TYPING_TEXT.slice(0, indexRef.current));
        if (indexRef.current >= TYPING_TEXT.length) {
          directionRef.current = "paused";
          setIsTyping(false);
          setTimeout(() => {
            directionRef.current = "deleting";
            setIsTyping(true);
          }, 2000);
        }
      } else if (directionRef.current === "deleting") {
        indexRef.current -= 1;
        setText(TYPING_TEXT.slice(0, indexRef.current));
        if (indexRef.current <= 0) {
          directionRef.current = "paused";
          setIsTyping(false);
          setTimeout(() => {
            directionRef.current = "typing";
            setIsTyping(true);
          }, 800);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return { text, isTyping };
}

export default function DashboardPage() {
  const [aiTab, setAiTab] = useState("generator");
  const { text: typingText } = useTypingAnimation();

  return (
    <DashboardLayout
      header={
        <div>
          <Heading level="h1">Dashboard</Heading>
          <Text variant="muted" className="mt-1">Overview of your prompt engineering workspace.</Text>
        </div>
      }
      stats={<DashboardStats />}
    >
      {/* AI Designer — full width with external title + tabs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <TabNav items={aiDesignerTabs} value={aiTab} onValueChange={setAiTab} />
          <a
            href="/app/ai-designer"
            className="inline-flex items-center gap-1 font-display text-sm font-medium text-accent hover:underline"
          >
            Open designer
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {aiTab === "generator" ? (
          <AIGenerationPanel
            instruction={typingText}
            onInstructionChange={() => {}}
            generatedOutput={undefined}
            className=""
          />
        ) : (
          <EvaluationResults {...miniEvalData} />
        )}
      </div>

      {/* Recent Activity — full-width */}
      <ActivityFeed items={feedItems} />
    </DashboardLayout>
  );
}
