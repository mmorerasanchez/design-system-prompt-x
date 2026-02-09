import { cn } from "@/lib/utils";
import { forwardRef } from "react";

/* ── Heading ── */
type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: HeadingLevel;
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: "text-xl font-semibold font-display tracking-tight",
  h2: "text-lg font-medium font-display",
  h3: "text-md font-medium font-display",
  h4: "text-base font-medium font-display",
};

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = "h2", as, className, children, ...props }, ref) => {
    const Tag = as || level;
    return (
      <Tag ref={ref} className={cn(headingStyles[level], className)} {...props}>
        {children}
      </Tag>
    );
  },
);
Heading.displayName = "Heading";

/* ── Text ── */
type TextVariant = "default" | "muted" | "subtle" | "accent" | "error" | "success";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  size?: "xs" | "sm" | "base" | "lg";
  mono?: boolean;
  as?: "p" | "span" | "div";
}

const textVariantStyles: Record<TextVariant, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  subtle: "text-foreground-subtle",
  accent: "text-accent",
  error: "text-error",
  success: "text-success",
};

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ variant = "default", size = "base", mono = false, as: Tag = "p", className, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          `text-${size}`,
          mono ? "font-mono" : "font-body",
          textVariantStyles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

/* ── Code (inline) ── */
interface CodeProps extends React.HTMLAttributes<HTMLElement> {}

const Code = forwardRef<HTMLElement, CodeProps>(({ className, ...props }, ref) => {
  return (
    <code
      ref={ref}
      className={cn(
        "rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-sm text-accent",
        className,
      )}
      {...props}
    />
  );
});
Code.displayName = "Code";

/* ── Kbd ── */
interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

const Kbd = forwardRef<HTMLElement, KbdProps>(({ className, ...props }, ref) => {
  return (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 font-mono text-2xs text-muted-foreground shadow-[0_1px_0_1px_hsl(var(--border))]",
        className,
      )}
      {...props}
    />
  );
});
Kbd.displayName = "Kbd";

export { Heading, Text, Code, Kbd };
