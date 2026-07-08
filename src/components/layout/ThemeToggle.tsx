import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggle, ready } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="rounded-full"
    >
      {ready && theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}
