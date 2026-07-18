import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}

/**
 * Ten Piece monogram — a rounded navy square with an azure "T"
 * dropping into a soft "P" bowl. Reads cleanly at any size.
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
          <linearGradient id="tp-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b5cc4" />
            <stop offset="100%" stopColor="#07489f" />
          </linearGradient>
          <linearGradient id="tp-fg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#c9e8ff" />
          </linearGradient>
        </defs>
        {/* Rounded plaque */}
        <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#tp-bg)" />
        {/* T bar + stem */}
        <rect x="9" y="11" width="18" height="4.5" rx="1.5" fill="url(#tp-fg)" />
        <rect x="15.75" y="11" width="4.5" height="26" rx="1.5" fill="url(#tp-fg)" />
        {/* P bowl */}
        <path
          d="M27 11 h7.5 c4.14 0 7.5 3.36 7.5 7.5 s-3.36 7.5-7.5 7.5 H31 v11 h-4 z M31 15.5 v6.5 h3.5 c1.8 0 3.25-1.46 3.25-3.25 s-1.45-3.25-3.25-3.25 z"
          fill="#25afff"
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
