import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

const anatomyFields = ["role", "tone", "context", "task", "reasoning", "examples", "output", "constraints", "tools"] as const;

const feedbackTypes = ["success", "warning", "error", "info"] as const;

export default function TokenSmokeTest() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground p-8 max-w-4xl mx-auto space-y-12">
      {/* Theme Switcher */}
      <div className="space-y-2">
        <h1 className="font-display text-xl font-semibold tracking-tight">Token Smoke Test</h1>
        <div className="flex gap-2">
          {(["dark", "light", "warm"] as const).map((t) => (
            <Button
              key={t}
              variant={theme === t ? "default" : "secondary"}
              size="sm"
              onClick={() => setTheme(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Font Test */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-medium">Font Test</h2>
        <p className="font-display text-md">Plus Jakarta Sans — Display Font</p>
        <p className="font-body text-md">Satoshi — Body Font</p>
        <p className="font-mono text-md">JetBrains Mono — Mono Font</p>
      </section>

      {/* Surface Test */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-medium">Surface Test</h2>
        <div className="flex gap-4">
          {[
            { bg: "bg-background", label: "Background" },
            { bg: "bg-surface", label: "Surface" },
            { bg: "bg-card", label: "Card" },
          ].map(({ bg, label }) => (
            <div key={label} className={`${bg} text-foreground border border-border rounded-lg p-6 w-40 text-center font-body text-sm`}>
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Test */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-medium">Feedback Test (10%/30% opacity triplet)</h2>
        <div className="space-y-2">
          <div className="bg-success-bg border border-success-border text-success rounded-md px-4 py-3 font-body text-sm">Success</div>
          <div className="bg-warning-bg border border-warning-border text-warning rounded-md px-4 py-3 font-body text-sm">Warning</div>
          <div className="bg-error-bg border border-error-border text-error rounded-md px-4 py-3 font-body text-sm">Error</div>
          <div className="bg-info-bg border border-info-border text-info rounded-md px-4 py-3 font-body text-sm">Info</div>
        </div>
      </section>

      {/* Anatomy Field Test */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-medium">Anatomy Field Test</h2>
        <div className="space-y-2">
          <div className="border-l-[3px] border-l-anatomy-role bg-anatomy-role/5 rounded-md px-4 py-2 font-mono text-sm text-anatomy-role">role</div>
          <div className="border-l-[3px] border-l-anatomy-tone bg-anatomy-tone/5 rounded-md px-4 py-2 font-mono text-sm text-anatomy-tone">tone</div>
          <div className="border-l-[3px] border-l-anatomy-context bg-anatomy-context/5 rounded-md px-4 py-2 font-mono text-sm text-anatomy-context">context</div>
          <div className="border-l-[3px] border-l-anatomy-task bg-anatomy-task/5 rounded-md px-4 py-2 font-mono text-sm text-anatomy-task">task</div>
          <div className="border-l-[3px] border-l-anatomy-reasoning bg-anatomy-reasoning/5 rounded-md px-4 py-2 font-mono text-sm text-anatomy-reasoning">reasoning</div>
          <div className="border-l-[3px] border-l-anatomy-examples bg-anatomy-examples/5 rounded-md px-4 py-2 font-mono text-sm text-anatomy-examples">examples</div>
          <div className="border-l-[3px] border-l-anatomy-output bg-anatomy-output/5 rounded-md px-4 py-2 font-mono text-sm text-anatomy-output">output</div>
          <div className="border-l-[3px] border-l-anatomy-constraints bg-anatomy-constraints/5 rounded-md px-4 py-2 font-mono text-sm text-anatomy-constraints">constraints</div>
          <div className="border-l-[3px] border-l-anatomy-tools bg-anatomy-tools/5 rounded-md px-4 py-2 font-mono text-sm text-anatomy-tools">tools</div>
        </div>
      </section>

      {/* Border Radius Test */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-medium">Border Radius Test</h2>
        <div className="flex gap-4">
          {[
            { cls: "rounded-sm", label: "rounded-sm (4px)" },
            { cls: "rounded-md", label: "rounded-md (8px)" },
            { cls: "rounded-lg", label: "rounded-lg (12px)" },
            { cls: "rounded-full", label: "rounded-full" },
          ].map(({ cls, label }) => (
            <div key={cls} className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 bg-accent ${cls}`} />
              <span className="font-mono text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
