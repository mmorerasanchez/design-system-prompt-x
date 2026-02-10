import { useState } from "react";
import { useParams } from "react-router-dom";
import { EditorLayout } from "@/components/templates/EditorLayout";
import { PromptEditorPanel } from "@/components/organisms/PromptEditorPanel";
import { PlaygroundPanel } from "@/components/organisms/PlaygroundPanel";
import { VariableManager } from "@/components/organisms/VariableManager";
import { StatusLifecycleBar } from "@/components/organisms/StatusLifecycleBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/atoms";
import { Save, History } from "lucide-react";
import type { AnatomyField } from "@/components/organisms/AnatomyFieldCard";

const initialFields: { field: AnatomyField; content: string; tokenCount: number }[] = [
  { field: "role", content: "You are an expert onboarding assistant for SaaS products.", tokenCount: 42 },
  { field: "tone", content: "Friendly, professional, and encouraging. Avoid jargon.", tokenCount: 28 },
  { field: "context", content: "The user just signed up for {{product_name}} and is seeing the app for the first time. Their plan is {{plan_type}}.", tokenCount: 89 },
  { field: "task", content: "Guide the user through the initial setup: connecting their workspace, inviting team members, and creating their first project.", tokenCount: 112 },
  { field: "reasoning", content: "Think step-by-step about what the user needs to accomplish. Prioritize the most impactful setup actions first.", tokenCount: 64 },
  { field: "examples", content: "User: \"I just signed up, what do I do first?\"\nAssistant: \"Welcome to {{product_name}}! Let's get you set up in 3 quick steps…\"", tokenCount: 98 },
  { field: "output", content: "Respond in markdown with clear step headings. Include progress indicators like (1/3), (2/3), (3/3).", tokenCount: 56 },
  { field: "constraints", content: "Keep responses under 200 words. Never mention competitors. Don't skip steps.", tokenCount: 38 },
  { field: "tools", content: "You can access: user_profile(), workspace_settings(), send_invite(email).", tokenCount: 47 },
];

const compiledOutput = initialFields.map((f) => `# ${f.field.toUpperCase()}\n${f.content}`).join("\n\n");

const initialVariables = [
  { name: "product_name", defaultValue: "Acme App" },
  { name: "plan_type", defaultValue: "Pro" },
];

const lifecycleSteps = [
  { label: "Draft", status: "draft" as const, completed: true },
  { label: "Testing", status: "testing" as const, completed: true },
  { label: "Production", status: "production" as const, active: true },
  { label: "Archived", status: "archived" as const },
];

export default function PromptEditorPage() {
  const { id } = useParams();
  const [variables, setVariables] = useState(initialVariables);
  const [userInput, setUserInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [response, setResponse] = useState("");

  const handleRun = () => {
    setIsRunning(true);
    setResponse("");
    setTimeout(() => {
      setResponse(
        "Welcome to Acme App! 🎉 Let's get you set up in 3 quick steps:\n\n" +
        "## (1/3) Connect Your Workspace\n" +
        "First, let's link your workspace. Click **Settings → Workspace** and follow the setup wizard.\n\n" +
        "## (2/3) Invite Your Team\n" +
        "Collaboration is key! Head to **Team → Invite Members** and add your colleagues by email.\n\n" +
        "## (3/3) Create Your First Project\n" +
        "Now you're ready! Click **New Project** and choose a template to get started.\n\n" +
        "You're all set! Need help with anything else?"
      );
      setIsRunning(false);
    }, 2000);
  };

  const totalTokens = initialFields.reduce((sum, f) => sum + (f.tokenCount || 0), 0);

  return (
    <EditorLayout
      header={
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 md:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <Heading level="h3" className="truncate">
              {id ? id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Untitled Prompt"}
            </Heading>
            <Badge variant="production" size="sm">v3.2</Badge>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusLifecycleBar steps={lifecycleSteps} className="hidden lg:flex" />
            <Button variant="ghost" size="sm">
              <History className="h-3.5 w-3.5 mr-1" /> History
            </Button>
            <Button size="sm">
              <Save className="h-3.5 w-3.5 mr-1" /> Save
            </Button>
          </div>
        </div>
      }
      editor={
        <div className="space-y-4 p-4 md:p-6">
          <PromptEditorPanel
            fields={initialFields}
            compiledOutput={compiledOutput}
            totalTokens={totalTokens}
            maxTokens={4096}
          />
          <VariableManager
            variables={variables}
            onChange={setVariables}
          />
        </div>
      }
      preview={
        <div className="p-4 md:p-6">
          <PlaygroundPanel
            compiledPrompt={compiledOutput}
            response={response}
            tokenCount={totalTokens}
            maxTokens={4096}
            isRunning={isRunning}
            onRun={handleRun}
            userInput={userInput}
            onUserInputChange={setUserInput}
          />
        </div>
      }
    />
  );
}
