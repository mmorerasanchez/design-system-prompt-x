import { useState } from "react";
import { SettingsNav } from "@/components/organisms/SettingsNav";
import { APIKeyManager } from "@/components/organisms/APIKeyManager";
import { IntegrationCard } from "@/components/organisms/IntegrationCard";
import { Heading, Text } from "@/components/atoms";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const sections = [
  { label: "Profile", value: "profile" },
  { label: "API Keys", value: "keys" },
  { label: "Integrations", value: "integrations" },
  { label: "Team", value: "team", disabled: true },
];

const mockKeys = [
  { id: "1", name: "openai-prod", provider: "OpenAI", maskedValue: "sk-••••••••••••••3kF9", createdAt: "Jan 12, 2026" },
  { id: "2", name: "claude-dev", provider: "Anthropic", maskedValue: "sk-ant-••••••••••Qx7", createdAt: "Feb 3, 2026" },
  { id: "3", name: "gemini-test", provider: "Google", maskedValue: "AIza••••••••••••mN2", createdAt: "Feb 8, 2026" },
];

const integrations = [
  { name: "OpenAI", provider: "OpenAI", description: "GPT-4o, GPT-4 Turbo, and embedding models for prompt evaluation.", connected: true, status: "active" as const },
  { name: "Anthropic Claude", provider: "Anthropic", description: "Claude 3.5 Sonnet and Haiku for prompt testing and comparison.", connected: true, status: "active" as const },
  { name: "Google Gemini", provider: "Google", description: "Gemini Pro and Ultra models for multi-modal prompt engineering.", connected: false, status: "inactive" as const },
  { name: "GitHub", provider: "GitHub", description: "Sync prompts to repositories and track changes via commits.", connected: false, status: "inactive" as const },
  { name: "Slack", provider: "Slack", description: "Notifications for prompt deployments and evaluation results.", connected: false, status: "inactive" as const },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <SettingsNav
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        className="px-4 md:px-6"
      />

      <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {activeSection === "profile" && (
            <>
              <div>
                <Heading level="h2">Profile</Heading>
                <Text variant="muted" size="sm" className="mt-1">Manage your account details and preferences.</Text>
              </div>
              <div className="space-y-4 rounded-md border border-border bg-card p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="font-display text-sm">Full Name</Label>
                    <Input id="name" defaultValue="Mariano Rodríguez" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="font-display text-sm">Email</Label>
                    <Input id="email" defaultValue="mariano@promptx.io" type="email" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="role" className="font-display text-sm">Role</Label>
                  <Input id="role" defaultValue="Lead Prompt Engineer" />
                </div>
                <div className="flex justify-end">
                  <Button size="sm">Save Changes</Button>
                </div>
              </div>
            </>
          )}

          {activeSection === "keys" && (
            <>
              <div>
                <Heading level="h2">API Keys</Heading>
                <Text variant="muted" size="sm" className="mt-1">Manage credentials for LLM providers used in the playground.</Text>
              </div>
              <APIKeyManager keys={mockKeys} />
            </>
          )}

          {activeSection === "integrations" && (
            <>
              <div>
                <Heading level="h2">Integrations</Heading>
                <Text variant="muted" size="sm" className="mt-1">Connect external services and platforms.</Text>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {integrations.map((i) => (
                  <IntegrationCard key={i.name} {...i} />
                ))}
              </div>
            </>
          )}

          {activeSection === "team" && (
            <div>
              <Heading level="h2">Team</Heading>
              <Text variant="muted" size="sm" className="mt-1">Team management coming soon.</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
