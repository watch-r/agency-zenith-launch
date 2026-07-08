import { icons, type LucideIcon, HelpCircle } from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 20, className, strokeWidth = 1.75 }: IconProps) {
  const LucideCmp = (icons as unknown as Record<string, LucideIcon>)[name] ?? HelpCircle;
  return <LucideCmp size={size} strokeWidth={strokeWidth} className={className} />;
}
