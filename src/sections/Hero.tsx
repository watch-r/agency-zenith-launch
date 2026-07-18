import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/use-order";
import { site } from "@/services/data";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Hero() {
  const { hero } = site;
  const { open } = useOrder();
  const gallery = hero.gallery;
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + gallery.length) % gallery.length),
    [gallery.length],
  );

  // Autoplay
  useEffect(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => go(1), 5200);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [go]);

  const handleCta = (cta: typeof hero.primaryCta) => {
    if (cta.action === "order") open();
    else if (cta.target) {
      document.getElementById(cta.target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Peek neighbours
  const prev = (index - 1 + gallery.length) % gallery.length;
  const next = (index + 1) % gallery.length;

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20">
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-light/60 blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand/15 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, oklch(0.5 0.14 240 / 0.06) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 rounded-full border border-brand-deep/15 bg-card px-1 py-1 pr-4 elev-1 backdrop-blur"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-deep text-[9px] font-bold uppercase tracking-widest text-white">
            10
          </span>
          <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {hero.eyebrow}
          </span>
        </motion.div>

        <div className="mt-6 grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-12">
          {/* Copy side */}
          <div>
            <h1 className="font-display text-[2.75rem] leading-[1] tracking-tight sm:text-6xl md:text-[4.75rem]">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {hero.headline}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-1 block italic text-gradient-brand"
              >
                {hero.headlineAccent}
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {hero.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button
                size="lg"
                className="group rounded-full gradient-brand px-6 text-white hover:opacity-90 elev-2"
                onClick={() => handleCta(hero.primaryCta)}
              >
                {hero.primaryCta.label}
                <ArrowUpRight
                  size={16}
                  className="ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full px-6"
                onClick={() => handleCta(hero.secondaryCta)}
              >
                {hero.secondaryCta.label}
              </Button>
            </motion.div>

            {/* Indicator dots + counter */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex gap-1.5">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === index ? "w-8 bg-brand-deep" : "w-3 bg-brand-deep/25 hover:bg-brand-deep/50",
                    )}
                  />
                ))}
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* Gallery carousel */}
          <div className="relative h-[26rem] sm:h-[30rem] md:h-[36rem]">
            {/* Peek left */}
            <motion.div
              key={`peek-l-${prev}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              className="pointer-events-none absolute left-[-8%] top-1/2 hidden h-[70%] w-[35%] -translate-y-1/2 overflow-hidden rounded-3xl md:block"
              style={{ transform: "translateY(-50%) rotate(-3deg) scale(0.9)" }}
            >
              <img src={gallery[prev].src} alt="" className="h-full w-full object-cover" />
            </motion.div>
            {/* Peek right */}
            <motion.div
              key={`peek-r-${next}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              className="pointer-events-none absolute right-[-6%] top-1/2 hidden h-[80%] w-[40%] -translate-y-1/2 overflow-hidden rounded-3xl md:block"
              style={{ transform: "translateY(-50%) rotate(4deg) scale(0.94)" }}
            >
              <img src={gallery[next].src} alt="" className="h-full w-full object-cover" />
            </motion.div>

            {/* Main slide */}
            <div className="relative h-full overflow-hidden rounded-[2rem] elev-4 ring-1 ring-brand-deep/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.06, clipPath: "inset(20% 0 0 0)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0)" }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={gallery[index].src}
                    alt={gallery[index].alt}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 via-brand-deep/10 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Caption chip */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cap-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3"
                >
                  <div className="max-w-[70%]">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-brand-light">
                      Now showing · {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="font-display mt-1 text-lg leading-tight text-white sm:text-xl">
                      {gallery[index].caption ?? gallery[index].alt}
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => go(-1)}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-brand-deep backdrop-blur hover:bg-white"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => go(1)}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-brand-deep backdrop-blur hover:bg-white"
                      aria-label="Next"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating stat chip */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="absolute -left-3 top-6 hidden rounded-2xl bg-background elev-3 p-4 md:block"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Since 2019
              </div>
              <div className="font-display mt-1 text-2xl text-gradient-brand">
                240+ projects
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
