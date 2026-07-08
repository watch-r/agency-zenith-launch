import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { site } from "@/services/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export function Gallery() {
  const { gallery } = site;
  const autoplay = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" }, [autoplay.current]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <SectionHeading
            eyebrow="Inside the studio"
            title="Made in the room, not the deck."
            description="A behind-the-scenes look at how our ten-piece team actually works."
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
          {gallery.map((g) => (
            <div
              key={g.id}
              className="relative min-w-[80%] shrink-0 overflow-hidden rounded-3xl border border-border sm:min-w-[55%] lg:min-w-[38%]"
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-[26rem] w-full object-cover"
              />
              {g.caption && (
                <div className="absolute bottom-4 left-4 rounded-full bg-background/85 px-3 py-1 text-xs backdrop-blur">
                  {g.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Container className="mt-6 flex justify-center gap-1.5">
        {gallery.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => embla?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === selected ? "w-6 bg-foreground" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </Container>
    </section>
  );
}
