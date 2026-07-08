import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Icon } from "@/components/common/Icon";
import { site } from "@/services/data";

export function WhyChooseUs() {
  const { whyChooseUs } = site;
  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={whyChooseUs.eyebrow}
          title={whyChooseUs.heading}
          description={whyChooseUs.description}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 0.06}>
              <div className="group h-full rounded-3xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-[0_25px_70px_-30px_rgba(0,0,0,0.35)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background transition-transform group-hover:rotate-3">
                  <Icon name={item.icon} size={18} />
                </span>
                <h3 className="font-display mt-6 text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
