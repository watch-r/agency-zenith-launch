import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/use-order";
import { site } from "@/services/data";
import { ArrowUpRight } from "lucide-react";

export function FinalCTA() {
  const { finalCta } = site;
  const { open } = useOrder();

  const handle = (cta: typeof finalCta.primaryCta) => {
    if (cta.action === "order") open();
    else if (cta.target) document.getElementById(cta.target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-foreground bg-foreground p-10 text-background md:p-16">
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-brand/15 blur-3xl" />
          <Reveal>
            <span className="text-xs uppercase tracking-[0.22em] text-background/60">
              {finalCta.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-5 max-w-3xl text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              {finalCta.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-base text-background/70 sm:text-lg">
              {finalCta.description}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="rounded-full bg-brand text-foreground hover:bg-brand/90 group"
                onClick={() => handle(finalCta.primaryCta)}
              >
                {finalCta.primaryCta.label}
                <ArrowUpRight
                  size={16}
                  className="ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full text-background hover:bg-background/10 hover:text-background"
                onClick={() => handle(finalCta.secondaryCta)}
              >
                {finalCta.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
