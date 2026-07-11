import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}

/**
 * TP monogram — bright azure "T" overlapping deep navy "P".
 * Uses the Ten Piece brand blues (#25afff, #07489f).
 */
export function Logo({ className, showWordmark = false, size = 40 }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ten Piece"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="tp-azure" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3ec3ff" />
            <stop offset="100%" stopColor="#25afff" />
          </linearGradient>
          <linearGradient id="tp-navy" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b5cc4" />
            <stop offset="100%" stopColor="#07489f" />
          </linearGradient>
        </defs>
        {/* Italic "T" bar + stem */}
        <path
          d="M4 9 L30 9 L28 15 L20 15 L14 39 L7 39 L13 15 L2 15 Z"
          fill="url(#tp-azure)"
        />
        {/* Italic "P" — stem + bowl */}
        <path
          d="M22 9 L36 9 C42 9 45 13 43.5 19 C42 25 37 28 31 28 L26 28 L23.5 39 L16.5 39 L22 9 Z M28 15 L26.6 22 L31 22 C33.5 22 35.5 20.5 36 18 C36.4 15.5 34.9 15 32.5 15 Z"
          fill="url(#tp-navy)"
        />
      </svg>
      {showWordmark && (
        <span className="font-display text-base font-semibold tracking-tight text-foreground">
          Ten Piece
        </span>
      )}
    </span>
  );
}
