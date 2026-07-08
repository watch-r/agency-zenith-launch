import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Rating } from "@/components/common/Rating";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { site } from "@/services/data";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useRef } from "react";

export function Testimonials() {
  const { testimonials } = site;
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay.current],
  );

  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <SectionHeading
            eyebrow="Kind words"
            title="Trusted by teams who don't hand out praise lightly."
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => embla?.scrollPrev()}
              aria-label="Previous"
            >
              <ArrowLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => embla?.scrollNext()}
              aria-label="Next"
            >
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </Container>

      <div className="mt-12 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 pl-6 md:pl-10">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex min-w-[85%] shrink-0 flex-col justify-between rounded-3xl border border-border bg-background p-8 sm:min-w-[60%] lg:min-w-[40%]"
            >
              <Quote size={22} className="text-brand" />
              <blockquote className="font-display mt-5 text-2xl leading-[1.2] tracking-tight">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <img
                  src={t.photo}
                  alt={t.name}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{t.name}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                </div>
                <Rating value={t.rating} />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
