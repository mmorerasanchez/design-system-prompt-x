import { useState } from "react";
import { FormField } from "@/components/molecules/FormField";
import { SearchBar } from "@/components/molecules/SearchBar";
import { NavItem } from "@/components/molecules/NavItem";
import { StatCard } from "@/components/molecules/StatCard";
import { AvatarGroup } from "@/components/molecules/AvatarGroup";
import { BreadcrumbNav } from "@/components/molecules/BreadcrumbNav";
import { TokenCounter } from "@/components/molecules/TokenCounter";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, FileText, Settings, BarChart3, Users, Search } from "lucide-react";

function Section({ id, title, description, composedOf, children }: { id: string; title: string; description: string; composedOf?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-4">
      <div>
        <h2 className="font-display text-lg font-medium tracking-tight">{title}</h2>
        <p className="font-body text-sm text-muted-foreground">{description}</p>
        {composedOf && (
          <p className="mt-1 font-mono text-2xs text-accent">Composed of: {composedOf}</p>
        )}
      </div>
      <div className="rounded-lg border border-border bg-card p-6 space-y-6">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-2 rounded-md border border-border bg-muted p-3 font-mono text-2xs text-muted-foreground overflow-x-auto">
      {children}
    </pre>
  );
}

export default function MoleculesPage() {
  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState("prompts");

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight">Molecules</h1>
        <p className="mt-1 font-body text-base text-muted-foreground">
          Composite components built from atoms. Each molecule combines 2+ atoms into a reusable pattern.
        </p>
      </div>

      {/* ── FORM FIELD ── */}
      <Section id="form-field" title="Form Field" description="Label + Input + Helper/Error text. Vertical layout with consistent spacing." composedOf="Label + Input/Textarea/Select + Helper/Error text">
        <SubSection title="Variants">
          <div className="grid gap-4 max-w-sm">
            <FormField label="Prompt Name" htmlFor="ff-1" helper="A descriptive name for your prompt">
              <Input id="ff-1" placeholder="e.g. Customer Support Bot" />
            </FormField>
            <FormField label="Model" htmlFor="ff-2" required>
              <Select>
                <SelectTrigger id="ff-2" className="font-mono"><SelectValue placeholder="Select model…" /></SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="claude">claude-3.5-sonnet</SelectItem>
                  <SelectItem value="gpt4">gpt-4-turbo</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="System Prompt" htmlFor="ff-3" error="System prompt is required">
              <Textarea id="ff-3" error placeholder="Enter system prompt…" />
            </FormField>
          </div>
        </SubSection>
        <CodeBlock>{`<FormField label="Name" required helper="..." error="..."><Input /></FormField>`}</CodeBlock>
      </Section>

      {/* ── SEARCH BAR ── */}
      <Section id="search-bar" title="Search Bar" description="Input with search icon, clear button, and keyboard shortcut hint." composedOf="Icon + Input + Clear Button + Kbd">
        <div className="max-w-md">
          <SearchBar value={search} onChange={setSearch} placeholder="Search prompts…" />
        </div>
        <CodeBlock>{`<SearchBar value={search} onChange={setSearch} placeholder="..." showShortcut />`}</CodeBlock>
      </Section>

      {/* ── NAV ITEM ── */}
      <Section id="nav-item" title="Nav Item" description="Sidebar navigation item with icon, label, optional badge count." composedOf="Icon + Label + Badge count">
        <SubSection title="States">
          <div className="max-w-[240px] space-y-1">
            <NavItem icon={Home} label="Dashboard" active={activeNav === "dashboard"} onClick={() => setActiveNav("dashboard")} />
            <NavItem icon={FileText} label="Prompts" active={activeNav === "prompts"} onClick={() => setActiveNav("prompts")} count={12} />
            <NavItem icon={BarChart3} label="Evaluations" active={activeNav === "evaluations"} onClick={() => setActiveNav("evaluations")} />
            <NavItem icon={Settings} label="Settings" active={activeNav === "settings"} onClick={() => setActiveNav("settings")} />
            <NavItem icon={Users} label="Team" disabled />
          </div>
        </SubSection>
        <SubSection title="Collapsed">
          <div className="max-w-[64px] space-y-1">
            <NavItem icon={Home} label="Dashboard" collapsed />
            <NavItem icon={FileText} label="Prompts" collapsed active />
            <NavItem icon={Settings} label="Settings" collapsed />
          </div>
        </SubSection>
        <CodeBlock>{`<NavItem icon={Home} label="Dashboard" active count={12} collapsed disabled />`}</CodeBlock>
      </Section>

      {/* ── STAT CARD ── */}
      <Section id="stat-card" title="Stat Card" description="KPI display with label, mono value, and trend indicator." composedOf="Label + Value (font-mono) + Trend">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Prompts" value="1,247" trend={{ direction: "up", value: "+12.5%" }} />
          <StatCard label="Evaluations" value="384" trend={{ direction: "down", value: "-3.2%" }} />
          <StatCard label="Avg Score" value="87.3" trend={{ direction: "neutral", value: "0.0%" }} />
          <StatCard label="Active Users" value="23" trend={{ direction: "up", value: "+2" }} />
        </div>
        <CodeBlock>{`<StatCard label="Total Prompts" value="1,247" trend={{ direction: "up", value: "+12.5%" }} />`}</CodeBlock>
      </Section>

      {/* ── AVATAR GROUP ── */}
      <Section id="avatar-group" title="Avatar Group" description="Avatar with name and optional role text." composedOf="Avatar + Name + Role text">
        <SubSection title="Sizes">
          <div className="space-y-4">
            <AvatarGroup name="Mariano R." role="Designer" size="sm" status="online" />
            <AvatarGroup name="Jane Doe" role="Engineer" size="md" status="busy" />
            <AvatarGroup name="Alex Kim" role="Product Manager" size="lg" status="offline" />
          </div>
        </SubSection>
        <CodeBlock>{`<AvatarGroup name="Mariano" role="Designer" size="md" status="online" />`}</CodeBlock>
      </Section>

      {/* ── BREADCRUMB ── */}
      <Section id="breadcrumb" title="Breadcrumb" description="Linked path segments with chevron separators. Truncation for long paths." composedOf="Path items + Separators">
        <SubSection title="Default">
          <BreadcrumbNav items={[
            { label: "Library", href: "#" },
            { label: "Customer Support", href: "#" },
            { label: "v3" },
          ]} />
        </SubSection>
        <SubSection title="Truncated">
          <BreadcrumbNav items={[
            { label: "Home", href: "#" },
            { label: "Projects", href: "#" },
            { label: "prompt-x", href: "#" },
            { label: "Library", href: "#" },
            { label: "Customer Support", href: "#" },
            { label: "Editor" },
          ]} maxItems={4} />
        </SubSection>
        <CodeBlock>{`<BreadcrumbNav items={[{ label: "Library", href: "#" }, { label: "v3" }]} maxItems={4} />`}</CodeBlock>
      </Section>

      {/* ── TOKEN COUNTER ── */}
      <Section id="token-counter" title="Token Counter" description="Token count with thin progress bar. Color by threshold: safe/warning/danger." composedOf="Text (font-mono) + Progress (60px×3px)">
        <div className="flex flex-wrap items-center gap-8">
          <TokenCounter current={1200} max={4000} />
          <TokenCounter current={3200} max={4000} />
          <TokenCounter current={3800} max={4000} />
          <TokenCounter current={800} max={4000} compact />
        </div>
        <CodeBlock>{`<TokenCounter current={1200} max={4000} compact />`}</CodeBlock>
      </Section>

      {/* ── EMPTY STATE ── */}
      <Section id="empty-state" title="Empty State" description="Centered placeholder for empty views with title, description, and CTA." composedOf="Title + Description + CTA Button">
        <EmptyState
          title="No prompts yet"
          description="Create your first prompt to get started with prompt engineering."
          action={{ label: "Create Prompt", onClick: () => {} }}
        />
        <CodeBlock>{`<EmptyState title="..." description="..." action={{ label: "Create", onClick: fn }} />`}</CodeBlock>
      </Section>
    </div>
  );
}
