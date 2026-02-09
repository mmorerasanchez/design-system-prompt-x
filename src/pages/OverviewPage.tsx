import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading, Text, Code } from "@/components/atoms/Typography";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Box, Layers, LayoutGrid, Layout, FileText } from "lucide-react";
const stats = [{
  label: "Design Tokens",
  count: "60+",
  description: "Colors, typography, spacing, radius, shadows"
}, {
  label: "Atoms",
  count: "16",
  description: "Button, Input, Badge, Typography, Avatar, etc."
}, {
  label: "Molecules",
  count: "8",
  description: "FormField, SearchBar, StatCard, NavItem, etc."
}, {
  label: "Organisms",
  count: "10",
  description: "TopBar, Sidebar, DataTable, AuthForm, etc."
}, {
  label: "Templates",
  count: "8",
  description: "AppShell, Editor, Library, Dashboard, Auth, etc."
}];
const principles = [{
  name: "Monochromatic + Accent",
  desc: "95% warm stone grays, 4% terracotta orange accent, 1% semantic colors."
}, {
  name: "3-Surface Hierarchy",
  desc: "Background → Surface → Card creates depth without complexity."
}, {
  name: "Prompts Are Code",
  desc: "All user-editable content uses font-mono. Non-negotiable."
}, {
  name: "Typography as Hierarchy",
  desc: "Three font families convey meaning: Display, Body, Mono."
}, {
  name: "Progressive Disclosure",
  desc: "Start with the lightest variant, add complexity as needed."
}, {
  name: "Accessible by Default",
  desc: "WCAG 2.1 AA, 44×44px touch targets, keyboard navigation."
}, {
  name: "IDE-Inspired",
  desc: "Clean, distraction-free workspace for prompt engineering."
}];
const sections = [{
  name: "Tokens",
  path: "/tokens",
  icon: Palette,
  desc: "Colors, typography, spacing, radius, shadows, breakpoints"
}, {
  name: "Atoms",
  path: "/atoms",
  icon: Box,
  desc: "Buttons, inputs, badges, typography, avatars, form elements"
}, {
  name: "Molecules",
  path: "/molecules",
  icon: Layers,
  desc: "Form fields, search bar, stat cards, breadcrumbs"
}, {
  name: "Organisms",
  path: "/organisms",
  icon: LayoutGrid,
  desc: "Top bar, sidebar, data table, auth form, prompt cards"
}, {
  name: "Templates",
  path: "/templates",
  icon: Layout,
  desc: "App shell, editor, library, dashboard, auth layouts"
}, {
  name: "Pages",
  path: "/pages",
  icon: FileText,
  desc: "Dashboard, library, editor, settings, auth page index"
}];
export default function OverviewPage() {
  return <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            prompt<span className="text-accent">x</span>
          </h1>
          <Badge variant="outline">v2.0.0</Badge>
        </div>
        <Text size="lg" variant="muted" className="max-w-prose">
          Design System for prompt engineering tooling. Minimal, monochromatic, precisely crafted — 
          treating prompts as code with an IDE-inspired aesthetic.
        </Text>
        <Text mono size="xs" variant="muted">Last updated: 2026-02-09 · Author: Mariano</Text>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map(s => <div key={s.label} className="rounded-md border border-border bg-card p-4 space-y-1">
            <p className="font-mono text-2xl font-bold text-accent">{s.count}</p>
            <p className="font-display text-sm font-medium">{s.label}</p>
            <p className="font-body text-2xs text-muted-foreground">{s.description}</p>
          </div>)}
      </div>

      {/* Navigation */}
      <div>
        <Heading level="h2" className="mb-4">Explore</Heading>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(s => <Link key={s.path} to={s.path} className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-150 hover:-translate-y-px hover:shadow-md hover:border-accent/30">
              <div className="rounded-md bg-accent/10 p-2 text-accent">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-medium group-hover:text-accent transition-colors">{s.name}</p>
                <p className="font-body text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
            </Link>)}
        </div>
      </div>

      <Separator />

      {/* Design Principles */}
      <div>
        <Heading level="h2" className="mb-4">Design Principles</Heading>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {principles.map((p, i) => <div key={p.name} className="flex gap-3 rounded-md border border-border bg-card p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-2xs font-bold text-accent">
                {i + 1}
              </span>
              <div>
                <p className="font-display text-sm font-medium">{p.name}</p>
                <p className="font-body text-xs text-muted-foreground">{p.desc}</p>
              </div>
            </div>)}
        </div>
      </div>

      <Separator />

      {/* Getting Started */}
      <div>
        <Heading level="h2" className="mb-4">Getting Started</Heading>
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <Text variant="muted" size="sm">
            This design system serves as the visual reference for all prompt-x projects.
            Other Lovable projects (Customer App, Admin Panel) should reference this project by:
          </Text>
          <ol className="space-y-3 list-decimal list-inside font-body text-sm text-foreground">
            <li>
              <strong className="font-display font-medium">Copy the Tailwind config</strong> — 
              extract <Code>tailwind.config.ts</Code> and <Code>index.css</Code> token definitions
            </li>
            <li>
              <strong className="font-display font-medium">Screenshot components</strong> — 
              use the showcase pages as visual reference for implementation
            </li>
            <li>
              <strong className="font-display font-medium">Follow the token system</strong> — 
              never hardcode colors or sizes; always use semantic tokens
            </li>
            <li>
              <strong className="font-display font-medium">Respect the font rules</strong> — 
              <Code>font-display</Code> for headings, <Code>font-body</Code> for labels, <Code>font-mono</Code> for all data
            </li>
          </ol>
        </div>
      </div>
    </div>;
}