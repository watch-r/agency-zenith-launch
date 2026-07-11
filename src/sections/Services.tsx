import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/use-order";
import { site } from "@/services/data";
import { formatCurrency } from "@/lib/format";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Services() {
  const { services, pricing } = site;
  const { open } = useOrder();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="services" className="relative py-24 md:py-32">
      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-light/40 blur-3xl animate-float" />
        <div
          className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-brand/10 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow="What we do"
          title="Six services. One bundle to rule them all."
          description="Every service is a flat €50. Tap a card to see what's inside — or grab the full bundle and save."
        />

        {/* BUNDLE WRAPPER — a large pill that visually contains all six services */}
        <Reveal delay={0.1}>
          <div className="mt-14 relative">
            <BundleFrame packagePrice={pricing.package.price} savings={pricing.package.savings}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s, i) => (
                  <ServicePill
                    key={s.id}
                    service={s}
                    index={i}
                    isHovered={hovered === s.id}
                    onHover={setHovered}
                    onOrder={() => open([s.id])}
                  />
                ))}
              </div>

              {/* Bundle CTA row */}
              <div className="mt-6 flex flex-col items-stretch gap-4 rounded-3xl border border-brand-deep/20 bg-white/70 p-5 backdrop-blur-sm dark:bg-card/60 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl gradient-brand text-white">
                    <Sparkles size={18} />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-brand-deep">
                      The Ten Piece Bundle
                    </div>
                    <div className="font-display text-xl leading-tight mt-0.5">
                      All six services, working as one system
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:justify-end">
                  <div className="text-right">
                    <div className="flex items-baseline gap-2 justify-end">
                      <span className="text-sm text-muted-foreground line-through">
                        {formatCurrency(pricing.package.regularPrice)}
                      </span>
                      <span className="font-display text-3xl text-gradient-brand font-bold">
                        {formatCurrency(pricing.package.price)}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-brand-deep">
                      Save {formatCurrency(pricing.package.savings)}
                    </div>
                  </div>
                  <Button
                    className="rounded-full gradient-brand text-white hover:opacity-90 whitespace-nowrap"
                    onClick={() => open(services.map((s) => s.id))}
                  >
                    Get the bundle
                    <ArrowUpRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </BundleFrame>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- Bundle frame ---------- */
function BundleFrame({
  children,
  packagePrice,
  savings,
}: {
  children: React.ReactNode;
  packagePrice: number;
  savings: number;
}) {
  return (
    <div className="relative rounded-[2.25rem] border-2 border-dashed border-brand-deep/25 bg-gradient-to-br from-brand-soft/60 via-transparent to-brand-light/30 p-4 sm:p-6 md:p-8">
      {/* Corner badge */}
      <motion.div
        initial={{ scale: 0, rotate: -12 }}
        whileInView={{ scale: 1, rotate: -6 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
        className="absolute -top-4 left-6 z-10 flex items-center gap-2 rounded-full gradient-brand px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-brand-deep/30"
      >
        <Sparkles size={12} /> Bundle & save {formatCurrency(savings)}
      </motion.div>
      <div className="absolute -top-4 right-6 hidden rounded-full border border-brand-deep/25 bg-background px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-brand-deep sm:block">
        All six for {formatCurrency(packagePrice)}
      </div>
      {children}
    </div>
  );
}

/* ---------- Individual service pill ---------- */
function ServicePill({
  service,
  index,
  isHovered,
  onHover,
  onOrder,
}: {
  service: (typeof site)["services"][number];
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onOrder: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[2rem] shadow-lg shadow-brand-deep/10 ring-1 ring-black/5"
    >
      {/* Background image */}
      <img
        src={service.image}
        alt={service.title}
        loading="lazy"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out",
          isHovered ? "scale-110" : "scale-100",
        )}
      />

      {/* Gradient overlay always */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/40 to-transparent" />

      {/* Hover: full navy overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-brand-deep/95 via-brand-deep/85 to-brand/70 transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Top-right price chip */}
      <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-brand-deep backdrop-blur">
        {formatCurrency(service.price)}
      </span>

      {/* Icon top-left */}
      <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-brand-deep backdrop-blur">
        <Icon name={service.icon} size={16} />
      </span>

      {/* Default state: just title at bottom */}
      <div
        className={cn(
          "absolute inset-x-5 bottom-5 transition-all duration-500",
          isHovered ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
        )}
      >
        <div className="text-[10px] uppercase tracking-[0.22em] text-white/70">
          Service · Delivered in 2 wks
        </div>
        <div className="font-display mt-1 text-2xl leading-tight text-white">
          {service.title}
        </div>
      </div>

      {/* Hover state: details */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-between p-5 transition-all duration-500",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        <div className="mt-14">
          <div className="font-display text-xl leading-tight text-white">
            {service.title}
          </div>
          <p className="mt-2 text-sm text-white/80">{service.shortDescription}</p>
          <ul className="mt-4 space-y-1.5">
            {service.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-2 text-[13px] text-white/90">
                <Check size={13} className="mt-0.5 shrink-0 text-brand-light" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          size="sm"
          className="w-full rounded-full bg-white text-brand-deep hover:bg-white/90"
          onClick={(e) => {
            e.stopPropagation();
            onOrder();
          }}
        >
          Order this — {formatCurrency(service.price)}
        </Button>
      </div>
    </motion.div>
  );
}
