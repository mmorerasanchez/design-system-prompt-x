import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Lock, ArrowRight, Mail } from "lucide-react";
import { Logo } from "@/components/atoms";
import {
  isPrototypeAuthenticated,
  authenticatePrototype,
  CONTACT_EMAIL,
} from "@/lib/prototype-auth";

interface ProtectedGateProps {
  children: React.ReactNode;
}

/**
 * ProtectedGate — wraps content behind a password wall.
 * Shows a branded access screen with instructions to request access.
 */
export function ProtectedGate({ children }: ProtectedGateProps) {
  const [authenticated, setAuthenticated] = useState(isPrototypeAuthenticated);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (authenticated) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticatePrototype(password)) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <Lock className="h-5 w-5 text-accent" />
          </div>
          <Logo size={36} />
          <h1 className="font-display text-xl font-semibold tracking-tight">
            Interactive Prototype
          </h1>
          <Badge variant="outline">Interactive Prototype</Badge>
        </div>

        {/* Message */}
        <div className="rounded-lg border border-border bg-card p-4 space-y-3">
          <p className="font-body text-sm text-muted-foreground text-center">
            This section contains an interactive prototype. Enter the access password to continue.
          </p>
          <div className="flex items-center gap-2 rounded-md bg-surface px-3 py-2">
            <Mail className="h-4 w-4 text-accent shrink-0" />
            <p className="font-body text-xs text-foreground">
              Request access at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-accent hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>

        {/* Password form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label htmlFor="gate-password" className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
              Password
            </label>
            <Input
              id="gate-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter access password"
              className={error ? "border-destructive" : ""}
              autoFocus
            />
            {error && (
              <p className="font-body text-xs text-destructive">
                Invalid password. Please try again.
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={!password.trim()}>
            Access Prototype
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        {/* Back link */}
        <p className="text-center">
          <a href="/" className="font-body text-xs text-muted-foreground hover:text-accent transition-colors">
            ← Back to democrito
          </a>
        </p>
      </div>
    </div>
  );
}
