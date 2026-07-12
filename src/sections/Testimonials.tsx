import { Container } from "@/components/layout/Container";
import { Rating } from "@/components/common/Rating";
import { site } from "@/services/data";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { testimonials } = site;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const active = testimonials[index];
  const timer = useRef<number | null>(null);

  const go = (dir: number) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!playing) {
      if (timer.current) window.clearInterval(timer.current);
      return;
    }
    timer.current = window.setInterval(() => go(1), 5000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Warm neutral canvas — matches site theme, not stark navy */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-canvas-warm via-background to-brand-soft/40 dark:from-canvas-warm dark:via-background dark:to-brand-soft/20" />
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-brand-light/50 blur-3xl animate-float" />
        <div
          className="absolute -right-40 bottom-10 h-[30rem] w-[30rem] rounded-full bg-brand/10 blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <Container className="relative">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-brand-deep">
            <span className="h-px w-8 bg-brand-deep/30" /> Kind words
          </span>
          <h2 className="font-display mt-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Trusted by teams who don't{" "}
            <span className="italic text-gradient-brand">
              hand out praise lightly.
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          {/* Quote card — layered elevation */}
          <div className="relative">
            {/* Layered shadow cards */}
            <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-brand/15 via-brand-light/30 to-transparent blur-2xl" />
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 h-full w-full rounded-[2rem] border border-brand-deep/15 bg-brand-light/30"
            />
            <AnimatePresence mode="wait">
              <motion.figure
                key={active.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[2rem] border border-border bg-card p-8 elev-3 sm:p-10"
              >
                <div className="absolute -top-6 left-8 grid h-14 w-14 place-items-center rounded-2xl gradient-brand text-white elev-3">
                  <Quote size={22} />
                </div>
                <Rating value={active.rating} />
                <blockquote className="font-display mt-6 text-2xl leading-[1.25] tracking-tight text-foreground sm:text-3xl">
                  "{active.quote}"
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <img
                    src={active.photo}
                    alt={active.name}
                    loading="lazy"
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-brand/30"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-foreground">{active.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {active.role} · {active.company}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls column */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-3">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "relative rounded-full transition-all duration-500",
                    i === index ? "scale-110" : "opacity-50 hover:opacity-100",
                  )}
                  aria-label={`Show testimonial from ${t.name}`}
                >
                  {i === index && (
                    <motion.span
                      layoutId="testimonial-active-ring"
                      className="absolute -inset-1.5 rounded-full border-2 border-brand"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover elev-1"
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => go(-1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground elev-1 transition-colors hover:bg-secondary"
                aria-label="Previous"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => setPlaying((p) => !p)}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground elev-1 transition-colors hover:bg-secondary"
                aria-label={playing ? "Pause autoplay" : "Play autoplay"}
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                onClick={() => go(1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground elev-1 transition-colors hover:bg-secondary"
                aria-label="Next"
              >
                <ArrowRight size={16} />
              </button>
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}{" "}
                <span className="text-muted-foreground/50">
                  / {String(testimonials.length).padStart(2, "0")}
                </span>
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full overflow-hidden rounded-full bg-border">
              <motion.div
                key={`${index}-${playing}`}
                initial={{ width: "0%" }}
                animate={{ width: playing ? "100%" : "0%" }}
                transition={{ duration: playing ? 5 : 0.3, ease: "linear" }}
                className="h-full gradient-brand"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
