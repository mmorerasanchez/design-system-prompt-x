import { cn } from "@/lib/utils";

interface LogoProps {
  /** Size in pixels for width/height */
  size?: number;
  className?: string;
}

/**
 * Logo — Brand mark with two overlapping organic circles.
 * One outlined in foreground, one filled with accent color.
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
      {/* Outlined accent circle (left) */}
      <circle
        cx="38"
        cy="54"
        r="30"
        stroke="hsl(var(--accent))"
        strokeWidth="4.5"
        fill="none"
      />
      {/* Filled foreground circle (right, overlapping) */}
      <circle
        cx="64"
        cy="48"
        r="32"
        fill="currentColor"
      />
    </svg>
  );
}
