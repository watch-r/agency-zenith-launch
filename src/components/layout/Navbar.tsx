import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/use-order";
import { site } from "@/services/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const { navigation } = site;
  const { open } = useOrder();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Show only in-page nav; legal pages live in the footer
  const nav = navigation.filter((n) => n.href.startsWith("#"));

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-5"
    >
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border border-border/60 bg-background/70 py-2 pl-2 pr-2 backdrop-blur-xl transition-all duration-500 md:gap-4 md:pl-3",
          scrolled
            ? "shadow-[0_10px_40px_-10px_rgba(7,72,159,0.25)] border-border"
            : "shadow-[0_4px_20px_-8px_rgba(7,72,159,0.15)]",
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-secondary/60"
        >
          <Logo size={28} />
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:inline">
            Ten Piece
          </span>
        </a>

        <span className="hidden h-6 w-px bg-border md:inline-block" />

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            className="hidden rounded-full gradient-brand text-white hover:opacity-90 sm:inline-flex"
            size="sm"
            onClick={() => open()}
          >
            Start a project
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-4 top-full mt-2 rounded-3xl border border-border bg-background/95 p-3 backdrop-blur-xl shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="rounded-2xl px-4 py-2.5 text-sm hover:bg-secondary"
                  onClick={() => setMobileOpen(false)}
                >
                  {n.label}
                </a>
              ))}
              <Button
                className="mt-2 rounded-full gradient-brand text-white"
                onClick={() => {
                  setMobileOpen(false);
                  open();
                }}
              >
                Start a project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
