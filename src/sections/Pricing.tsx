import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/use-order";
import { site } from "@/services/data";
import { formatCurrency } from "@/lib/format";
import { Check, Sparkles } from "lucide-react";

export function Pricing() {
  const { pricing, services } = site;
  const { open } = useOrder();

  return (
    <section id="pricing" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Pricing"
          title="Flat rates. No surprises."
          description="Every service is €50. The full package is €270 — a €30 saving over buying each individually."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* Individual */}
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-background p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {pricing.individual.title}
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-6xl">{formatCurrency(pricing.individual.price)}</span>
                <span className="text-sm text-muted-foreground">/ service</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{pricing.individual.description}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {pricing.individual.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={15} className="mt-0.5 shrink-0 text-brand" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-auto rounded-full mt-8"
                variant="outline"
                onClick={() => open()}
              >
                Choose a service
              </Button>
            </div>
          </Reveal>

          {/* Package */}
          <Reveal delay={0.08}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-foreground bg-foreground p-8 text-background shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)]">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/30 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.22em] text-background/70">
                  {pricing.package.title}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-foreground">
                  <Sparkles size={12} /> {pricing.package.badge}
                </span>
              </div>
              <div className="relative mt-4 flex items-baseline gap-3">
                <span className="font-display text-6xl">{formatCurrency(pricing.package.price)}</span>
                <span className="text-sm text-background/60 line-through">
                  {formatCurrency(pricing.package.regularPrice)}
                </span>
              </div>
              <div className="relative mt-1 text-sm text-brand">
                You save {formatCurrency(pricing.package.savings)}
              </div>
              <p className="relative mt-3 text-sm text-background/70">{pricing.package.description}</p>
              <ul className="relative mt-6 space-y-3 text-sm">
                {pricing.package.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={15} className="mt-0.5 shrink-0 text-brand" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="relative mt-auto mt-8 rounded-full bg-brand text-foreground hover:bg-brand/90"
                onClick={() => open(services.map((s) => s.id))}
              >
                Buy the package
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
