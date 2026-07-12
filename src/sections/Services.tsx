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
          description="Every service is a flat €50. Tap Add to build your bundle — grab all six and save €30."
        />

        {/* TOP BUNDLE BAR — sticky-ish CTA at the top of the section */}
        <Reveal delay={0.1}>
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
            position="top"
          />
        </Reveal>

        {/* Service card grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* BOTTOM BUNDLE BAR */}
        <Reveal delay={0.15}>
          <div className="mt-8">
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
              position="bottom"
            />
          </div>
        </Reveal>
      </Container>
    </section>
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
  position,
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
  position: "top" | "bottom";
}) {
  const hasSelection = selectedCount > 0;
  return (
    <div className="relative">
      {/* Corner badge */}
      {position === "top" && (
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          whileInView={{ scale: 1, rotate: -4 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="absolute -top-3 left-6 z-10 flex items-center gap-1.5 rounded-full gradient-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white elev-2"
        >
          <Sparkles size={11} /> Bundle & save €{savings > 0 ? savings : 30}
        </motion.div>
      )}
      <div
        className={cn(
          "relative flex flex-col gap-4 rounded-3xl border-2 border-dashed border-brand-deep/25 bg-gradient-to-br from-brand-soft/70 via-background to-brand-light/40 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5",
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
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={onClear}
            >
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
            Checkout <ArrowUpRight size={14} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Service card (smaller, layered) ---------- */
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
        "group relative overflow-hidden rounded-2xl border bg-card elev-2 transition-all duration-300 hover:elev-3",
        inCart ? "border-brand ring-2 ring-brand/40" : "border-border",
      )}
    >
      {/* Image band */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 via-brand-deep/10 to-transparent" />
        <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-brand-deep backdrop-blur elev-1">
          <Icon name={service.icon} size={14} />
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-deep elev-1 backdrop-blur">
          {formatCurrency(service.price)}
        </span>
        <div className="absolute inset-x-4 bottom-3">
          <div className="font-display text-lg leading-tight text-white">
            {service.title}
          </div>
        </div>

        {/* In-cart check */}
        <AnimatePresence>
          {inCart && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="absolute right-3 bottom-3 grid h-8 w-8 place-items-center rounded-full gradient-brand text-white elev-2"
              aria-hidden
            >
              <Check size={14} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="line-clamp-2 text-xs text-muted-foreground">
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
                <Check size={13} className="mr-1" /> Added
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
