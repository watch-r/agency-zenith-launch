import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/Reveal";
import { useOrder } from "@/hooks/use-order";
import { site } from "@/services/data";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const { hero } = site;
  const { open } = useOrder();

  const handleCta = (cta: typeof hero.primaryCta) => {
    if (cta.action === "order") open();
    else if (cta.target) {
      document.getElementById(cta.target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Ambient background */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-soft/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary blur-3xl" />
      </motion.div>

      <Container className="relative">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <Sparkles size={12} className="text-brand" /> {hero.eyebrow}
          </span>
        </Reveal>

        <div className="mt-8 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <h1 className="font-display text-[2.75rem] leading-[1] tracking-tight sm:text-6xl md:text-[5.25rem]">
              <Reveal y={40}>
                <span className="block">{hero.headline}</span>
              </Reveal>
              <Reveal y={40} delay={0.1}>
                <span className="mt-1 block italic text-foreground/80">
                  {hero.headlineAccent}
                </span>
              </Reveal>
            </h1>
          </div>
          <div className="md:pb-3">
            <Reveal delay={0.2}>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                {hero.description}
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className="group rounded-full px-6"
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
              </div>
            </Reveal>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, clipPath: "inset(20% 0 0 0)" }}
          animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 overflow-hidden rounded-3xl border border-border shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]"
        >
          <img
            src={hero.image}
            alt={hero.imageAlt}
            loading="eager"
            className="h-[26rem] w-full object-cover sm:h-[34rem] md:h-[38rem]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </motion.div>
      </Container>
    </section>
  );
}
