import { useEffect, useState } from "react";

/* ── helpers ── */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function parseHsl(raw: string): { h: number; s: number; l: number } | null {
  const parts = raw.trim().split(/\s+/);
  if (parts.length < 3) return null;
  return { h: parseFloat(parts[0]), s: parseFloat(parts[1]), l: parseFloat(parts[2]) };
}

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/* ── Swatch Card ── */
function Swatch({ token, label }: { token: string; label?: string }) {
  const raw = getCssVar(token);
  const parsed = parseHsl(raw);
  const hex = parsed ? hslToHex(parsed.h, parsed.s, parsed.l) : "—";
  const displayName = label || token.replace("--", "");

  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-card p-3">
      <div
        className="h-10 w-10 shrink-0 rounded-md border border-border"
        style={{ backgroundColor: `hsl(${raw})` }}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-mono text-xs font-medium text-foreground">{displayName}</p>
        <p className="font-mono text-2xs text-muted-foreground">{hex} · hsl({raw})</p>
      </div>
    </div>
  );
}

/* ── Section wrapper ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-lg font-medium tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function ColorGroup({ title, tokens }: { title: string; tokens: { token: string; label?: string }[] }) {
  return (
    <div className="space-y-2">
      <h3 className="font-display text-md font-medium text-muted-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((t) => (
          <Swatch key={t.token} {...t} />
        ))}
      </div>
    </div>
  );
}

/* ── Tokens Page ── */
export default function TokensPage() {
  const [, forceUpdate] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Re-render on theme class change to pick up new computed values
  useEffect(() => {
    const observer = new MutationObserver(() => forceUpdate((n) => n + 1));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="space-y-12">
      {/* Page header */}
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight">Design Tokens</h1>
        <p className="mt-1 font-body text-base text-muted-foreground">
          The complete token reference for the promptx design system.
        </p>
      </div>

      {/* ─── COLORS ─── */}
      <Section title="Colors">
        <ColorGroup
          title="Primary & Accent"
          tokens={[
            { token: "--primary", label: "primary" },
            { token: "--primary-foreground", label: "primary-foreground" },
            { token: "--accent", label: "accent" },
            { token: "--accent-foreground", label: "accent-foreground" },
            { token: "--accent-muted", label: "accent-muted" },
            { token: "--accent-subtle", label: "accent-subtle" },
            { token: "--warm-dark", label: "warm-dark" },
          ]}
        />
        <ColorGroup
          title="Secondary & Surface"
          tokens={[
            { token: "--secondary", label: "secondary" },
            { token: "--secondary-foreground", label: "secondary-foreground" },
            { token: "--surface", label: "surface" },
            { token: "--card", label: "card" },
            { token: "--card-foreground", label: "card-foreground" },
            { token: "--muted", label: "muted" },
            { token: "--muted-foreground", label: "muted-foreground" },
            { token: "--background", label: "background" },
            { token: "--foreground", label: "foreground" },
          ]}
        />
        <ColorGroup
          title="Semantic"
          tokens={[
            { token: "--success", label: "success" },
            { token: "--warning", label: "warning" },
            { token: "--error", label: "error" },
            { token: "--info", label: "info" },
            { token: "--destructive", label: "destructive" },
            { token: "--destructive-foreground", label: "destructive-foreground" },
          ]}
        />
        <ColorGroup
          title="Border & Input"
          tokens={[
            { token: "--border", label: "border" },
            { token: "--input", label: "input" },
            { token: "--ring", label: "ring" },
          ]}
        />
        <ColorGroup
          title="Category Palette"
          tokens={[
            { token: "--category-teal", label: "category-teal" },
            { token: "--category-amber", label: "category-amber" },
            { token: "--category-emerald", label: "category-emerald" },
            { token: "--category-orange", label: "category-orange" },
            { token: "--category-violet", label: "category-violet" },
            { token: "--category-rose", label: "category-rose" },
            { token: "--category-blue", label: "category-blue" },
            { token: "--category-red", label: "category-red" },
            { token: "--category-gold", label: "category-gold" },
          ]}
        />
        <ColorGroup
          title="Status"
          tokens={[
            { token: "--status-draft", label: "status-draft" },
            { token: "--status-testing", label: "status-testing" },
            { token: "--status-production", label: "status-production" },
            { token: "--status-archived", label: "status-archived" },
          ]}
        />
      </Section>

      {/* ─── TYPOGRAPHY ─── */}
      <Section title="Typography">
        <div className="space-y-6 rounded-lg border border-border bg-card p-6">
          {/* Font families */}
          <div className="space-y-3">
            <h3 className="font-display text-md font-medium text-muted-foreground">Font Families</h3>
            <div className="space-y-2">
              <p className="font-display text-base">
                <span className="font-mono text-2xs text-muted-foreground mr-3">font-display</span>
                Plus Jakarta Sans — Headings & Navigation
              </p>
              <p className="font-body text-base">
                <span className="font-mono text-2xs text-muted-foreground mr-3">font-body</span>
                Satoshi — Body text & labels
              </p>
              <p className="font-mono text-base">
                <span className="font-mono text-2xs text-muted-foreground mr-3">font-mono</span>
                JetBrains Mono — Code, prompts, data
              </p>
            </div>
          </div>

          {/* Type scale */}
          <div className="space-y-4">
            <h3 className="font-display text-md font-medium text-muted-foreground">Type Scale</h3>
            {([
              { label: "Display / Hero", classes: "text-3xl font-bold font-display tracking-tight", text: "Display Heading" },
              { label: "H1 (Page Title)", classes: "text-xl font-semibold font-display tracking-tight", text: "Page Title" },
              { label: "H2 (Section)", classes: "text-lg font-medium font-display", text: "Section Heading" },
              { label: "H3 (Card Title)", classes: "text-md font-medium font-display", text: "Card Title" },
              { label: "H4 (Subsection)", classes: "text-base font-medium font-display", text: "Subsection" },
              { label: "Body", classes: "text-base font-normal font-body", text: "Body text for descriptions, paragraphs, and general content. Optimized for readability at 14px." },
              { label: "Body Small", classes: "text-sm font-normal font-body", text: "Smaller body text for labels and helpers" },
              { label: "Caption", classes: "text-xs font-normal font-body", text: "Caption text for metadata" },
              { label: "Overline", classes: "text-2xs font-medium font-mono uppercase tracking-widest", text: "OVERLINE LABEL" },
              { label: "Mono Data", classes: "text-sm font-normal font-mono", text: "claude-3.5-sonnet · temperature: 0.7" },
              { label: "KPI Value", classes: "text-2xl font-bold font-mono", text: "1,247" },
            ] as const).map((item) => (
              <div key={item.label} className="flex flex-col gap-1 border-b border-border pb-3 last:border-0">
                <span className="font-mono text-2xs text-muted-foreground">{item.label} · {item.classes}</span>
                <span className={item.classes}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Readability sample */}
          <div className="space-y-2">
            <h3 className="font-display text-md font-medium text-muted-foreground">Readability Sample</h3>
            <p className="max-w-prose font-body text-base leading-relaxed text-foreground">
              The promptx design system treats prompts as code — every piece of user-editable content
              is monospaced, reinforcing that prompts are precise, engineered artifacts. The visual
              language uses 95% warm stone grays, 4% terracotta orange accent, and 1% semantic colors.
              This creates a professional, IDE-like workspace optimized for prompt engineering workflows.
            </p>
          </div>
        </div>
      </Section>

      {/* ─── SPACING ─── */}
      <Section title="Spacing">
        <div className="space-y-2 rounded-lg border border-border bg-card p-6">
          {([
            { name: "space-1", value: "4px", tw: "p-1" },
            { name: "space-2", value: "8px", tw: "p-2" },
            { name: "space-3", value: "12px", tw: "p-3" },
            { name: "space-4", value: "16px", tw: "p-4" },
            { name: "space-6", value: "24px", tw: "p-6" },
            { name: "space-8", value: "32px", tw: "p-8" },
            { name: "space-12", value: "48px", tw: "p-12" },
            { name: "space-16", value: "64px", tw: "p-16" },
          ] as const).map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <span className="w-20 shrink-0 font-mono text-2xs text-muted-foreground">{s.tw}</span>
              <div
                className="h-4 rounded-sm bg-accent"
                style={{ width: s.value }}
              />
              <span className="font-mono text-xs text-foreground">{s.value}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── BORDER RADIUS ─── */}
      <Section title="Border Radius">
        <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-card p-6">
          {([
            { name: "none", tw: "rounded-none" },
            { name: "sm", tw: "rounded-sm" },
            { name: "md", tw: "rounded-md" },
            { name: "lg", tw: "rounded-lg" },
            { name: "xl", tw: "rounded-xl" },
            { name: "full", tw: "rounded-full" },
          ] as const).map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div className={`h-16 w-16 border-2 border-accent bg-accent/10 ${r.tw}`} />
              <span className="font-mono text-2xs text-muted-foreground">{r.tw}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── SHADOWS ─── */}
      <Section title="Shadows">
        <div className="flex flex-wrap gap-6 rounded-lg border border-border bg-card p-6">
          {([
            { name: "none", tw: "shadow-none" },
            { name: "sm", tw: "shadow-sm" },
            { name: "md", tw: "shadow-md" },
            { name: "lg", tw: "shadow-lg" },
            { name: "xl", tw: "shadow-xl" },
          ] as const).map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <div className={`h-20 w-20 rounded-md border border-border bg-surface ${s.tw}`} />
              <span className="font-mono text-2xs text-muted-foreground">{s.tw}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── BREAKPOINTS ─── */}
      <Section title="Breakpoints">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="font-body text-sm text-muted-foreground">Current viewport:</span>
            <span className="font-mono text-sm font-medium text-accent">{viewportWidth}px</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 pr-6 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">Breakpoint</th>
                  <th className="pb-2 pr-6 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">Min Width</th>
                  <th className="pb-2 pr-6 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">Prefix</th>
                  <th className="pb-2 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">Target</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {([
                  { name: "Mobile", min: "0px", prefix: "(none)", target: "Phones", minPx: 0 },
                  { name: "sm", min: "480px", prefix: "sm:", target: "Large phones", minPx: 480 },
                  { name: "md", min: "768px", prefix: "md:", target: "Tablets", minPx: 768 },
                  { name: "lg", min: "1024px", prefix: "lg:", target: "Desktop", minPx: 1024 },
                  { name: "xl", min: "1280px", prefix: "xl:", target: "Large desktop", minPx: 1280 },
                  { name: "2xl", min: "1536px", prefix: "2xl:", target: "Wide screens", minPx: 1536 },
                ] as const).map((bp) => (
                  <tr
                    key={bp.name}
                    className={`border-b border-border last:border-0 ${viewportWidth >= bp.minPx ? "text-foreground" : "text-muted-foreground/50"}`}
                  >
                    <td className="py-2 pr-6 font-medium">{bp.name}</td>
                    <td className="py-2 pr-6">{bp.min}</td>
                    <td className="py-2 pr-6">{bp.prefix}</td>
                    <td className="py-2">{bp.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </div>
  );
}
