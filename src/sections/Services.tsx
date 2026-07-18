import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/use-order";
import { site } from "@/services/data";
import { formatCurrency } from "@/lib/format";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Plus, ShoppingBag, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

export function Services() {
  const { services, pricing } = site;
  const { cart, toggleInCart, setCart, clearCart, open, addToCart } = useOrder();

  const selectedServices = services.filter((s) => cart.includes(s.id));
  const isFullPackage = selectedServices.length === services.length;
  const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const total = isFullPackage ? pricing.package.price : subtotal;
  const savings = isFullPackage ? pricing.package.savings : 0;
  const discountPct = Math.round((pricing.package.savings / pricing.package.regularPrice) * 100);

  const selectAll = () => setCart(services.map((s) => s.id));

  return (
    <section id="services" className="relative py-20 md:py-24">
      {/* Ambient */}
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
          description={`Every service is £${pricing.individual.price}. Add all six to unlock the £${pricing.package.price} bundle and save ${discountPct}%.`}
        />

        {/* THE BUNDLE — a single container tying all six cards together */}
        <Reveal delay={0.1}>
          <div className="relative mt-10">
            {/* Rope/lace decorative frame */}
            <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] border-2 border-dashed border-brand-deep/25 sm:-inset-6" aria-hidden />
            <div className="pointer-events-none absolute -inset-2 rounded-[2.25rem] border border-brand-deep/15 sm:-inset-3" aria-hidden />
            {/* Top corner rope "knots" */}
            <span aria-hidden className="absolute -top-6 left-8 h-4 w-4 rounded-full gradient-brand ring-4 ring-background" />
            <span aria-hidden className="absolute -top-6 right-8 h-4 w-4 rounded-full gradient-brand ring-4 ring-background" />
            <span aria-hidden className="absolute -bottom-6 left-8 h-4 w-4 rounded-full gradient-brand ring-4 ring-background" />
            <span aria-hidden className="absolute -bottom-6 right-8 h-4 w-4 rounded-full gradient-brand ring-4 ring-background" />

            {/* Top bundle bar */}
            <div className="relative">
              <TopBadge savings={savings || pricing.package.savings} pct={discountPct} />
              <BundleBar
                selectedCount={selectedServices.length}
                total={total}
                savings={savings}
                regularPrice={pricing.package.regularPrice}
                packagePrice={pricing.package.price}
                isFullPackage={isFullPackage}
                onSelectAll={selectAll}
                onCheckout={() => open()}
                onClear={clearCart}
              />
            </div>

            {/* Service card grid — inside the bundle */}
            <div className="relative mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <ServiceCard
                  key={s.id}
                  service={s}
                  index={i}
                  inCart={cart.includes(s.id)}
                  onToggle={() => toggleInCart(s.id)}
                  onOrderOne={() => {
                    addToCart(s.id);
                    open([s.id]);
                  }}
                />
              ))}
            </div>

            {/* Bottom bundle bar — closes the lace */}
            <div className="relative mt-6">
              <BundleBar
                selectedCount={selectedServices.length}
                total={total}
                savings={savings}
                regularPrice={pricing.package.regularPrice}
                packagePrice={pricing.package.price}
                isFullPackage={isFullPackage}
                onSelectAll={selectAll}
                onCheckout={() => open()}
                onClear={clearCart}
                compact
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function TopBadge({ savings, pct }: { savings: number; pct: number }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -12 }}
      whileInView={{ scale: 1, rotate: -4 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      className="absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full gradient-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white elev-2"
    >
      <Sparkles size={11} /> Bundle & save {formatCurrency(savings)} · −{pct}%
    </motion.div>
  );
}

/* ---------- Bundle bar ---------- */
function BundleBar({
  selectedCount,
  total,
  savings,
  regularPrice,
  packagePrice,
  isFullPackage,
  onSelectAll,
  onCheckout,
  onClear,
  compact,
}: {
  selectedCount: number;
  total: number;
  savings: number;
  regularPrice: number;
  packagePrice: number;
  isFullPackage: boolean;
  onSelectAll: () => void;
  onCheckout: () => void;
  onClear: () => void;
  compact?: boolean;
}) {
  const hasSelection = selectedCount > 0;
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 rounded-3xl border border-brand-deep/20 bg-gradient-to-br from-brand-soft/80 via-background to-brand-light/40 elev-2 sm:flex-row sm:items-center sm:justify-between",
        compact ? "p-3 sm:p-4" : "p-4 sm:p-5",
        "dark:from-brand-soft/40 dark:via-card/60 dark:to-brand-light/20",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl gradient-brand text-white elev-2">
          <ShoppingBag size={18} />
        </span>
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-deep">
            Your bundle
          </div>
          <div className="font-display truncate text-lg leading-tight">
            {hasSelection ? (
              <>
                {selectedCount} of 6 selected ·{" "}
                <span className="text-gradient-brand">
                  {formatCurrency(total)}
                </span>
                {isFullPackage && (
                  <span className="ml-1 text-sm text-muted-foreground line-through">
                    {formatCurrency(regularPrice)}
                  </span>
                )}
              </>
            ) : (
              <>Build your bundle — start by adding a service</>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {hasSelection && (
          <Button variant="ghost" size="sm" className="rounded-full" onClick={onClear}>
            <X size={14} className="mr-1" /> Clear
          </Button>
        )}
        {!isFullPackage && (
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-brand-deep/30 bg-background"
            onClick={onSelectAll}
          >
            Add all six · {formatCurrency(packagePrice)}
          </Button>
        )}
        <Button
          size="sm"
          className="rounded-full gradient-brand text-white hover:opacity-90 elev-2 disabled:opacity-50"
          disabled={!hasSelection}
          onClick={onCheckout}
        >
          Checkout {savings > 0 && `· save ${formatCurrency(savings)}`}
          <ArrowUpRight size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}

/* ---------- Service card — hover reveals details, full card colored when added ---------- */
function ServiceCard({
  service,
  index,
  inCart,
  onToggle,
  onOrderOne,
}: {
  service: Service;
  index: number;
  inCart: boolean;
  onToggle: () => void;
  onOrderOne: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-all duration-300 elev-2 hover:elev-3",
        inCart
          ? "border-brand bg-gradient-to-br from-brand-soft via-brand-light/40 to-background ring-2 ring-brand/50"
          : "border-border bg-card",
      )}
    >
      {/* Image band */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-110",
            inCart && "saturate-[0.85]",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 via-brand-deep/10 to-transparent" />

        {/* Hover overlay with details */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-brand-deep/85 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <div className="text-[10px] uppercase tracking-[0.24em] text-brand-light">
            What's included
          </div>
          <div className="font-display mt-1 text-lg leading-tight text-white">
            {service.title}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-white/85 line-clamp-2">
            {service.description}
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-1 text-[11px] text-white/90">
            {service.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-1">
                <Check size={10} className="mt-0.5 shrink-0 text-brand-light" />
                <span className="truncate">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-brand-deep backdrop-blur elev-1">
          <Icon name={service.icon} size={14} />
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-deep elev-1 backdrop-blur">
          {formatCurrency(service.price)}
        </span>
        <div className="absolute inset-x-4 bottom-3 transition-opacity duration-200 group-hover:opacity-0">
          <div className="font-display text-lg leading-tight text-white">
            {service.title}
          </div>
        </div>

        <AnimatePresence>
          {inCart && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="absolute right-3 bottom-3 z-10 grid h-8 w-8 place-items-center rounded-full gradient-brand text-white elev-2"
              aria-hidden
            >
              <Check size={14} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Body */}
      <div className={cn("p-4 transition-colors", inCart && "bg-transparent")}>
        <p className={cn("line-clamp-2 text-xs", inCart ? "text-brand-deep/80" : "text-muted-foreground")}>
          {service.shortDescription}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <Button
            size="sm"
            variant={inCart ? "default" : "outline"}
            className={cn(
              "flex-1 rounded-full text-xs",
              inCart
                ? "gradient-brand text-white hover:opacity-90"
                : "border-brand-deep/25 bg-background hover:bg-secondary",
            )}
            onClick={onToggle}
          >
            {inCart ? (
              <>
                <Check size={13} className="mr-1" /> Added to bundle
              </>
            ) : (
              <>
                <Plus size={13} className="mr-1" /> Add
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-full text-xs"
            onClick={onOrderOne}
          >
            Order just this
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
