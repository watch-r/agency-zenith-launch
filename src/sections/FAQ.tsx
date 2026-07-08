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
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f) => (
                <AccordionItem key={f.id} value={f.id} className="border-border">
                  <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
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
