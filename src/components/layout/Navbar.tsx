import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/use-order";
import { site } from "@/services/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const { agency, navigation } = site;
  const { open } = useOrder();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background font-display text-sm">
            {agency.logoMark}
          </span>
          <span className="hidden font-display text-lg tracking-tight sm:inline">
            {agency.shortName}
          </span>
        </a>

        <nav className="hidden justify-center gap-8 text-sm text-muted-foreground md:flex">
          {navigation.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 justify-self-end">
          <ThemeToggle />
          <Button
            className="hidden rounded-full sm:inline-flex"
            onClick={() => open()}
          >
            Start a project
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border/60 bg-background"
          >
            <Container className="flex flex-col gap-2 py-4">
              {navigation.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="rounded-lg px-3 py-2 text-sm hover:bg-secondary"
                  onClick={() => setMobileOpen(false)}
                >
                  {n.label}
                </a>
              ))}
              <Button
                className="mt-2 rounded-full"
                onClick={() => {
                  setMobileOpen(false);
                  open();
                }}
              >
                Start a project
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
