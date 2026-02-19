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
      {/* Outlined circle (left) */}
      <ellipse
        cx="40"
        cy="52"
        rx="32"
        ry="34"
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
      />
      {/* Filled accent circle (right, overlapping) */}
      <ellipse
        cx="62"
        cy="46"
        rx="30"
        ry="32"
        fill="hsl(var(--accent))"
      />
    </svg>
  );
}
