import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/services/data";

export function FAQ() {
  const { faqs } = site;
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers to the questions we get most."
            description="Still curious? Send us a note and we'll reply within a working day."
          />
          <Reveal>
            <Accordion type="single" collapsible className="flex w-full flex-col gap-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.id}
                  value={f.id}
                  className="overflow-hidden rounded-2xl border border-brand-deep/15 bg-gradient-to-br from-brand-soft/60 via-card to-brand-light/30 elev-1 transition-shadow data-[state=open]:elev-2 data-[state=open]:border-brand/40 dark:from-brand-soft/25 dark:via-card dark:to-brand-light/15"
                >
                  <AccordionTrigger className="group px-5 py-4 text-left text-base font-medium hover:no-underline sm:px-6">
                    <span className="flex items-center gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full gradient-brand font-mono text-[11px] font-bold text-white elev-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{f.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="border-t border-brand-deep/10 bg-background/60 px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground sm:px-6">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
