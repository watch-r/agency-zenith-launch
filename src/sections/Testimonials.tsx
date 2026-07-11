import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Rating } from "@/components/common/Rating";
import { site } from "@/services/data";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { testimonials } = site;
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  const go = (dir: number) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Ambient — deep navy backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-deep via-brand-deep to-[#0a2f6b]" />
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-brand/40 blur-3xl animate-float" />
        <div
          className="absolute -right-40 bottom-10 h-[30rem] w-[30rem] rounded-full bg-brand/20 blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <Container className="relative">
        <div className="max-w-3xl text-white">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-brand-light">
            <span className="h-px w-8 bg-white/30" /> Kind words
          </span>
          <h2 className="font-display mt-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Trusted by teams who don't{" "}
            <span className="italic text-brand-light">hand out praise lightly.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          {/* Featured quote card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.figure
                key={active.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[2rem] bg-white/95 p-8 backdrop-blur-xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)] sm:p-10 dark:bg-card"
              >
                <div className="absolute -top-6 left-8 grid h-14 w-14 place-items-center rounded-2xl gradient-brand text-white shadow-xl">
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

          {/* Avatar stack + controls */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-3">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "relative rounded-full transition-all duration-500",
                    i === index ? "scale-110" : "opacity-60 hover:opacity-100",
                  )}
                  aria-label={`Show testimonial from ${t.name}`}
                >
                  {i === index && (
                    <motion.span
                      layoutId="testimonial-active-ring"
                      className="absolute -inset-1.5 rounded-full border-2 border-brand-light"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-white/20"
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => go(-1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                aria-label="Previous"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => go(1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                aria-label="Next"
              >
                <ArrowRight size={16} />
              </button>
              <span className="ml-2 text-sm text-white/70">
                {String(index + 1).padStart(2, "0")}{" "}
                <span className="text-white/40">/ {String(testimonials.length).padStart(2, "0")}</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
