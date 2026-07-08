import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/use-order";
import { site } from "@/services/data";
import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FeaturedServices() {
  const { featuredServices } = site;
  const { open } = useOrder();

  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <Container className="flex flex-col gap-24 md:gap-32">
        {featuredServices.map((f, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={f.id}
              className={cn(
                "grid gap-10 md:grid-cols-2 md:items-center md:gap-16",
                flip && "md:[&>div:first-child]:order-2",
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 40, clipPath: "inset(15% 0 0 0)" }}
                whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-3xl border border-border bg-background"
              >
                <img
                  src={f.image}
                  alt={f.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover md:h-[32rem]"
                />
              </motion.div>
              <div>
                <Reveal>
                  <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {f.eyebrow}
                  </span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h3 className="font-display mt-4 text-3xl leading-[1.08] sm:text-4xl md:text-5xl">
                    {f.title}
                  </h3>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-5 text-base text-muted-foreground sm:text-lg">
                    {f.description}
                  </p>
                </Reveal>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {f.benefits.map((b, bi) => (
                    <Reveal key={b} delay={0.15 + bi * 0.05}>
                      <li className="flex items-start gap-2 text-sm text-foreground/85">
                        <Check size={14} className="mt-0.5 shrink-0 text-brand" />
                        <span>{b}</span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
                <Reveal delay={0.3}>
                  <Button
                    className="mt-8 rounded-full group"
                    size="lg"
                    onClick={() => open()}
                  >
                    {f.ctaLabel}
                    <ArrowUpRight
                      size={16}
                      className="ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Button>
                </Reveal>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
