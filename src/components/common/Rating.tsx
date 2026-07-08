import { Star } from "lucide-react";

export function Rating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < value ? "fill-brand text-brand" : "text-muted-foreground/40"}
        />
      ))}
    </div>
  );
}
