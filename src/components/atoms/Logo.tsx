import { cn } from "@/lib/utils";

interface LogoProps {
  /** Size in pixels for width/height */
  size?: number;
  className?: string;
}

/**
 * Logo — Brand mark with two overlapping organic circles.
 * Accent-outlined circle (left) + foreground-filled circle (right).
 * In dark mode (:root) the filled circle matches background, leaving only the accent arc.
 * In light/warm modes, the filled circle uses foreground for contrast.
 */
export function Logo({ size = 28, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-label="Logo"
    >
      {/* Filled circle (right) — theme-adaptive via CSS class */}
      <circle
        cx="64"
        cy="48"
        r="32"
        className="logo-fill"
      />
      {/* Outlined accent circle (left) */}
      <circle
        cx="38"
        cy="54"
        r="30"
        stroke="hsl(var(--accent))"
        strokeWidth="4.5"
        fill="none"
      />
    </svg>
  );
}
