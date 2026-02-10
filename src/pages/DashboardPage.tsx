import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { DashboardStats } from "@/components/organisms/DashboardStats";
import { ActivityFeed } from "@/components/organisms/ActivityFeed";
import { PromptCard } from "@/components/organisms/PromptCard";
import { Heading, Text } from "@/components/atoms";

const feedItems = [
  { actor: "Sarah K.", initials: "SK", action: "deployed", resource: "onboarding-flow-v3", time: "2 min ago" },
  { actor: "Marcus T.", initials: "MT", action: "updated", resource: "code-review-assistant", time: "15 min ago" },
  { actor: "Priya R.", initials: "PR", action: "created", resource: "customer-support-qa", time: "1 hr ago" },
  { actor: "Alex M.", initials: "AM", action: "evaluated", resource: "data-extraction-v2", time: "2 hrs ago" },
  { actor: "Jordan L.", initials: "JL", action: "archived", resource: "legacy-summarizer", time: "5 hrs ago" },
];

const recentPrompts = [
  { title: "Onboarding Flow v3", status: "production" as const, preview: "You are an onboarding assistant that guides new users through…", version: "v3.2", updatedAgo: "2 min ago", tokens: 1247 },
  { title: "Code Review Assistant", status: "testing" as const, preview: "Analyze the following code diff and provide actionable…", version: "v1.4", updatedAgo: "15 min ago", tokens: 892 },
  { title: "Customer Support QA", status: "draft" as const, preview: "Given the customer query and knowledge base articles…", version: "v0.1", updatedAgo: "1 hr ago", tokens: 634 },
];

export default function DashboardPage() {
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Activity feed — takes 2 cols on desktop */}
        <div className="lg:col-span-2">
          <ActivityFeed items={feedItems} />
        </div>

        {/* Recent prompts sidebar */}
        <div className="space-y-3">
          <h3 className="font-display text-sm font-medium text-foreground">Recent Prompts</h3>
          {recentPrompts.map((prompt) => (
            <PromptCard
              key={prompt.title}
              title={prompt.title}
              status={prompt.status}
              preview={prompt.preview}
              version={prompt.version}
              updatedAgo={prompt.updatedAgo}
              tokens={prompt.tokens}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
