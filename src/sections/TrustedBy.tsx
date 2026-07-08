import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/common/Reveal";
import { site } from "@/services/data";

export function TrustedBy() {
  const { trustedBy } = site;
  // duplicate logos for seamless marquee
  const loop = [...trustedBy.logos, ...trustedBy.logos];

  return (
    <section className="border-y border-border/60 bg-secondary/40 py-14">
      <Container>
        <Reveal>
          <div className="text-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {trustedBy.eyebrow}
          </div>
        </Reveal>
        <div className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-secondary to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-secondary to-transparent" />
          <div className="flex w-max marquee-track gap-14">
            {loop.map((logo, i) => (
              <span
                key={`${logo.name}-${i}`}
                className="font-display text-2xl tracking-[0.2em] text-foreground/40"
              >
                {logo.logoText}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
          {trustedBy.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-background/60 p-6">
                <div className="font-display text-4xl tracking-tight">
                  {s.value}
                  {s.suffix && <span className="text-brand">{s.suffix}</span>}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
