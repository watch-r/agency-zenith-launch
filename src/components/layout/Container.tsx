import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function Container({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
}) {
  return (
    <As className={cn("mx-auto w-full max-w-7xl px-6 md:px-10", className)}>
      {children}
    </As>
  );
}
