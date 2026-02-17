import { useState } from "react";
import { SettingsNav } from "@/components/organisms/SettingsNav";
import { APIKeyManager } from "@/components/organisms/APIKeyManager";
import { IntegrationCard } from "@/components/organisms/IntegrationCard";
import { APIDocPanel } from "@/components/organisms/APIDocPanel";
import { PresetCard } from "@/components/organisms/PresetCard";
import { PresetDetailPanel } from "@/components/organisms/PresetDetailPanel";
import { OrganizationManager } from "@/components/organisms/OrganizationManager";
import { GlobalVariableManager } from "@/components/organisms/GlobalVariableManager";
import { DataManager } from "@/components/organisms/DataManager";
import { StatCard } from "@/components/molecules/StatCard";
import { Heading, Text } from "@/components/atoms";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { PresetCardData } from "@/components/organisms/PresetCard";

const sections = [
  { label: "Profile", value: "profile" },
  { label: "Billing", value: "billing" },
  { label: "API Keys", value: "keys" },
  { label: "Presets", value: "presets" },
  { label: "Organization", value: "organization" },
  { label: "Variables", value: "variables" },
  { label: "Data", value: "data" },
  { label: "Team", value: "team", disabled: true },
];

const usageData = [
  { month: "Sep", credits: 42 },
  { month: "Oct", credits: 68 },
  { month: "Nov", credits: 55 },
  { month: "Dec", credits: 81 },
  { month: "Jan", credits: 74 },
  { month: "Feb", credits: 32 },
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

const modelPresets: PresetCardData[] = [
  { id: "m1", name: "Balanced", isSystem: true, type: "model", provider: "Anthropic", model: "claude-3.5-sonnet", temperature: 0.7 },
  { id: "m2", name: "Creative", isSystem: true, type: "model", provider: "OpenAI", model: "gpt-4-turbo", temperature: 1.2 },
  { id: "m3", name: "Precise", isSystem: true, type: "model", provider: "Google", model: "gemini-pro", temperature: 0.2 },
  { id: "m4", name: "My Custom Config", isSystem: false, type: "model", provider: "Anthropic", model: "claude-3.5-sonnet", temperature: 0.5 },
];

const promptPresets: PresetCardData[] = [
  { id: "p1", name: "Customer Support", isSystem: true, type: "prompt", provider: "Anthropic", model: "claude-3.5-sonnet", temperature: 0.5, complexity: "Standard", fieldCount: 7 },
  { id: "p2", name: "Code Review", isSystem: true, type: "prompt", provider: "OpenAI", model: "gpt-4-turbo", temperature: 0.3, complexity: "Advanced", fieldCount: 9 },
  { id: "p3", name: "Blog Writer", isSystem: false, type: "prompt", provider: "Anthropic", model: "claude-3.5-sonnet", temperature: 0.8, complexity: "Simple", fieldCount: 5 },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [configurePreset, setConfigurePreset] = useState<{ type: "model" | "prompt"; name: string } | null>(null);

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* PageHeader */}
        <div>
          <Heading level="h1">Settings</Heading>
          <Text variant="muted" className="mt-1">Manage your account, credentials, and workspace preferences.</Text>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="API Keys" value={String(mockKeys.length)} trend={{ direction: "neutral", value: "active" }} />
          <StatCard label="Presets" value={String(modelPresets.length + promptPresets.length)} trend={{ direction: "up", value: "configured" }} />
          <StatCard label="Variables" value="5" trend={{ direction: "neutral", value: "global" }} />
          <StatCard label="Workspace" value="Pro" trend={{ direction: "up", value: "active" }} />
        </div>

        {/* Section Nav */}
        <SettingsNav
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* ===== PROFILE ===== */}
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

            {/* Editor Defaults (moved from Preferences) */}
            <div className="rounded-md border border-border bg-card">
              <div className="border-b border-border px-3 py-2">
                <span className="font-display text-sm font-medium text-foreground">Editor Defaults</span>
              </div>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="font-body text-sm font-medium">Default Model</Label>
                    <Select defaultValue="gemini-3-flash-preview">
                      <SelectTrigger className="h-9 font-mono text-sm"><SelectValue /></SelectTrigger>
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
                      <SelectTrigger className="h-9 font-mono text-sm"><SelectValue /></SelectTrigger>
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

        {/* ===== BILLING ===== */}
        {activeSection === "billing" && (
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="rounded-md border border-border bg-card">
              <div className="border-b border-border px-3 py-2">
                <span className="font-display text-sm font-medium text-foreground">Current Plan</span>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg font-semibold text-foreground">Pro Plan</span>
                        <Badge variant="success" size="sm">Active</Badge>
                      </div>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">Billed monthly · Next renewal Feb 28, 2026</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-2xl font-bold text-foreground">$49</span>
                    <span className="font-body text-sm text-muted-foreground">/mo</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-md border border-border bg-surface px-3 py-2.5">
                    <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Credits Used</span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="font-mono text-lg font-semibold text-foreground">74</span>
                      <span className="font-mono text-xs text-muted-foreground">/ 100</span>
                    </div>
                    <Progress value={74} className="mt-2 h-1.5" />
                  </div>
                  <div className="rounded-md border border-border bg-surface px-3 py-2.5">
                    <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">API Calls</span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="font-mono text-lg font-semibold text-foreground">2,847</span>
                      <span className="font-mono text-xs text-muted-foreground">/ 5,000</span>
                    </div>
                    <Progress value={57} className="mt-2 h-1.5" />
                  </div>
                  <div className="rounded-md border border-border bg-surface px-3 py-2.5">
                    <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Storage</span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="font-mono text-lg font-semibold text-foreground">1.2</span>
                      <span className="font-mono text-xs text-muted-foreground">GB / 5 GB</span>
                    </div>
                    <Progress value={24} className="mt-2 h-1.5" />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button size="sm">Upgrade to Business</Button>
                  <Button variant="ghost" size="sm">Manage Subscription</Button>
                </div>
              </div>
            </div>

            {/* Usage Chart */}
            <div className="rounded-md border border-border bg-card">
              <div className="border-b border-border px-3 py-2">
                <span className="font-display text-sm font-medium text-foreground">Credit Usage</span>
              </div>
              <div className="p-4">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usageData} barCategoryGap="20%">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 6% 25%)" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "JetBrains Mono", fill: "hsl(24 5% 64%)" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fontFamily: "JetBrains Mono", fill: "hsl(24 5% 64%)" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ background: "hsl(12 6% 15%)", border: "1px solid hsl(30 6% 25%)", borderRadius: "0.5rem", fontFamily: "JetBrains Mono", fontSize: "12px" }}
                        labelStyle={{ color: "hsl(24 5% 64%)" }}
                        itemStyle={{ color: "hsl(18 65% 55%)" }}
                      />
                      <Bar dataKey="credits" fill="hsl(18 65% 55%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="rounded-md border border-border bg-card">
              <div className="border-b border-border px-3 py-2">
                <span className="font-display text-sm font-medium text-foreground">Billing History</span>
              </div>
              <div className="divide-y divide-border">
                {[
                  { date: "Feb 1, 2026", description: "Pro Plan — Monthly", amount: "$49.00", status: "Paid" },
                  { date: "Jan 1, 2026", description: "Pro Plan — Monthly", amount: "$49.00", status: "Paid" },
                  { date: "Dec 1, 2025", description: "Pro Plan — Monthly", amount: "$49.00", status: "Paid" },
                  { date: "Nov 15, 2025", description: "Credit top-up (50 credits)", amount: "$9.99", status: "Paid" },
                  { date: "Nov 1, 2025", description: "Pro Plan — Monthly", amount: "$49.00", status: "Paid" },
                ].map((inv, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2.5">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-muted-foreground w-24 shrink-0">{inv.date}</span>
                      <span className="font-body text-sm text-foreground">{inv.description}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-medium text-foreground">{inv.amount}</span>
                      <Badge variant="success" size="sm">{inv.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== API KEYS ===== */}
        {activeSection === "keys" && (
          <div className="space-y-6">
            <APIKeyManager keys={mockKeys} />
            <APIDocPanel />
            <div className="rounded-md border border-border bg-card">
              <div className="border-b border-border px-3 py-2">
                <span className="font-display text-sm font-medium text-foreground">Integrations</span>
              </div>
              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                {integrations.map((i) => (
                  <IntegrationCard key={i.name} {...i} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== PRESETS ===== */}
        {activeSection === "presets" && (
          <div className="space-y-6">
            {configurePreset ? (
              <PresetDetailPanel
                type={configurePreset.type}
                presetName={configurePreset.name}
                onClose={() => setConfigurePreset(null)}
              />
            ) : (
              <>
                {/* Model Presets */}
                <div className="rounded-md border border-border bg-card">
                  <div className="border-b border-border px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-medium text-foreground">Model Presets</span>
                      <Badge variant="outline" size="sm"><span className="font-mono">{modelPresets.length}</span></Badge>
                    </div>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">Pre-configured model settings for generation and evaluation.</p>
                  </div>
                  <div className="space-y-1 p-2">
                    {modelPresets.map((p) => (
                      <PresetCard
                        key={p.id}
                        preset={p}
                        onConfigure={() => setConfigurePreset({ type: "model", name: p.name })}
                        onCopy={() => {}}
                      />
                    ))}
                  </div>
                </div>

                {/* Prompt Presets */}
                <div className="rounded-md border border-border bg-card">
                  <div className="border-b border-border px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-medium text-foreground">Prompt Presets</span>
                      <Badge variant="outline" size="sm"><span className="font-mono">{promptPresets.length}</span></Badge>
                    </div>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">Use-case templates with pre-filled fields and quality gates.</p>
                  </div>
                  <div className="space-y-1 p-2">
                    {promptPresets.map((p) => (
                      <PresetCard
                        key={p.id}
                        preset={p}
                        onConfigure={() => setConfigurePreset({ type: "prompt", name: p.name })}
                        onCopy={() => {}}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ===== ORGANIZATION ===== */}
        {activeSection === "organization" && <OrganizationManager />}

        {/* ===== VARIABLES ===== */}
        {activeSection === "variables" && <GlobalVariableManager />}

        {/* ===== DATA ===== */}
        {activeSection === "data" && <DataManager />}

        {/* ===== TEAM ===== */}
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
