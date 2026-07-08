import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/use-order";
import { site } from "@/services/data";
import { formatCurrency } from "@/lib/format";
import { ArrowUpRight, Check } from "lucide-react";

export function Services() {
  const { services } = site;
  const { open } = useOrder();

  return (
    <section id="services" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Six services. One integrated studio."
            description="Every service stands alone at a flat €50. Combined, they compound into something better than the sum of their parts."
          />
          <Reveal delay={0.15}>
            <div className="hidden justify-end md:flex">
              <Button
                variant="ghost"
                className="rounded-full"
                onClick={() => open(services.map((s) => s.id))}
              >
                Buy all six <ArrowUpRight size={16} className="ml-1" />
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.4)]">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                  <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-background/90 text-foreground backdrop-blur">
                    <Icon name={s.icon} size={17} />
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
                    {formatCurrency(s.price)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl leading-tight">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.shortDescription}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {s.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-foreground/80">
                        <Check size={14} className="mt-0.5 shrink-0 text-brand" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between pt-2">
                    <Button
                      size="sm"
                      className="rounded-full"
                      onClick={() => open([s.id])}
                    >
                      Order
                    </Button>
                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Delivered in 2 weeks
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
