import { useState } from "react";
import { SettingsNav } from "@/components/organisms/SettingsNav";
import { APIKeyManager } from "@/components/organisms/APIKeyManager";
import { IntegrationCard } from "@/components/organisms/IntegrationCard";
import { StatCard } from "@/components/molecules/StatCard";
import { Heading, Text } from "@/components/atoms";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const sections = [
  { label: "Profile", value: "profile" },
  { label: "API Keys", value: "keys" },
  { label: "Integrations", value: "integrations" },
  { label: "Preferences", value: "preferences" },
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
    <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* PageHeader — consistent with Dashboard, Library, AI Designer */}
        <div>
          <Heading level="h1">Settings</Heading>
          <Text variant="muted" className="mt-1">Manage your account, credentials, and workspace preferences.</Text>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="API Keys" value={String(mockKeys.length)} trend={{ direction: "neutral", value: "active" }} />
          <StatCard label="Integrations" value={String(integrations.filter((i) => i.connected).length)} trend={{ direction: "up", value: `of ${integrations.length}` }} />
          <StatCard label="Team Members" value="1" trend={{ direction: "neutral", value: "owner" }} />
          <StatCard label="Workspace" value="Pro" trend={{ direction: "up", value: "active" }} />
        </div>

        {/* Section Nav — horizontal tabs below header */}
        <SettingsNav
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Section Content */}
        {activeSection === "profile" && (
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="rounded-md border border-border bg-card">
              <div className="border-b border-border px-3 py-2">
                <span className="font-display text-sm font-medium text-foreground">Personal Information</span>
              </div>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="font-body text-sm font-medium">Full Name</Label>
                    <Input id="name" defaultValue="Mariano Rodríguez" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="font-body text-sm font-medium">Email</Label>
                    <Input id="email" defaultValue="mariano@promptx.io" type="email" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="role" className="font-body text-sm font-medium">Role</Label>
                    <Input id="role" defaultValue="Lead Prompt Engineer" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="timezone" className="font-body text-sm font-medium">Timezone</Label>
                    <Select defaultValue="utc-5">
                      <SelectTrigger className="h-9 font-mono text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="utc-8">UTC-8 (Pacific)</SelectItem>
                        <SelectItem value="utc-5">UTC-5 (Eastern)</SelectItem>
                        <SelectItem value="utc+0">UTC+0 (GMT)</SelectItem>
                        <SelectItem value="utc+1">UTC+1 (CET)</SelectItem>
                        <SelectItem value="utc+9">UTC+9 (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button size="sm">Save Changes</Button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-md border border-destructive/30 bg-card">
              <div className="border-b border-destructive/30 px-3 py-2">
                <span className="font-display text-sm font-medium text-destructive">Danger Zone</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <span className="font-body text-sm font-medium text-foreground">Delete Account</span>
                  <p className="font-body text-xs text-muted-foreground">Permanently remove your account and all data.</p>
                </div>
                <Button variant="destructive" size="sm">Delete Account</Button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "keys" && (
          <div className="space-y-6">
            <APIKeyManager keys={mockKeys} />
          </div>
        )}

        {activeSection === "integrations" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {integrations.map((i) => (
                <IntegrationCard key={i.name} {...i} />
              ))}
            </div>
          </div>
        )}

        {activeSection === "preferences" && (
          <div className="space-y-6">
            <div className="rounded-md border border-border bg-card">
              <div className="border-b border-border px-3 py-2">
                <span className="font-display text-sm font-medium text-foreground">Editor Defaults</span>
              </div>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="font-body text-sm font-medium">Default Model</Label>
                    <Select defaultValue="gemini-3-flash-preview">
                      <SelectTrigger className="h-9 font-mono text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="gemini-3-flash-preview" className="font-mono text-sm">gemini-3-flash-preview</SelectItem>
                        <SelectItem value="claude-3.5-sonnet" className="font-mono text-sm">claude-3.5-sonnet</SelectItem>
                        <SelectItem value="gpt-5" className="font-mono text-sm">gpt-5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-body text-sm font-medium">Default Platform</Label>
                    <Select defaultValue="Claude">
                      <SelectTrigger className="h-9 font-mono text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="Claude">Claude</SelectItem>
                        <SelectItem value="Gemini">Gemini</SelectItem>
                        <SelectItem value="ChatGPT">ChatGPT</SelectItem>
                        <SelectItem value="Lovable">Lovable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-md border border-border bg-surface px-4 py-3">
                  <div>
                    <span className="font-body text-sm font-medium text-foreground">Auto-save prompts</span>
                    <p className="font-body text-xs text-muted-foreground">Automatically save changes while editing.</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-md border border-border bg-surface px-4 py-3">
                  <div>
                    <span className="font-body text-sm font-medium text-foreground">Show token counter</span>
                    <p className="font-body text-xs text-muted-foreground">Display live token count in the editor.</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-md border border-border bg-surface px-4 py-3">
                  <div>
                    <span className="font-body text-sm font-medium text-foreground">Compact view</span>
                    <p className="font-body text-xs text-muted-foreground">Reduce spacing for denser information display.</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "team" && (
          <div className="rounded-md border border-border bg-card">
            <div className="border-b border-border px-3 py-2">
              <span className="font-display text-sm font-medium text-foreground">Team Management</span>
            </div>
            <p className="px-4 py-8 text-center font-body text-sm text-foreground-subtle italic">
              Team management coming soon. Invite collaborators and manage roles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
