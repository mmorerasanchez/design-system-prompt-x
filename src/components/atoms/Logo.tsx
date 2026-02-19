import { cn } from "@/lib/utils";
import logoMark from "@/assets/logo-mark.png";

interface LogoProps {
  /** Size in pixels for width/height */
  size?: number;
  className?: string;
}

/**
 * Logo — Brand mark using the uploaded logo image.
 * Works across all themes (Dark, Light, Warm).
 */
export function Logo({ size = 28, className }: LogoProps) {
  return (
    <img
      src={logoMark}
      alt="Logo"
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
