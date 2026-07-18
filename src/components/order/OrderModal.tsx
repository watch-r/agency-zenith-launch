import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/common/Icon";
import { useOrder } from "@/hooks/use-order";
import { site } from "@/services/data";
import { submitOrder } from "@/services/order";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { OrderCustomer, OrderResult, Service } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Check,
  Loader2,
  Lock,
  Plus,
  Shield,
  ShoppingBag,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Step = 1 | 2 | 3 | 4 | 5;

const emptyCustomer: OrderCustomer = {
  name: "",
  company: "",
  email: "",
  phone: "",
  notes: "",
};

export function OrderModal() {
  const { isOpen, close, cart, removeFromCart, clearCart, setCart, addToCart } = useOrder();
  const services = site.services;
  const pricing = site.pricing;
  const paymentMethods = site.paymentMethods;

  const [step, setStep] = useState<Step>(1);
  const [customer, setCustomer] = useState<OrderCustomer>(emptyCustomer);
  const [payment, setPayment] = useState<string>("card");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<OrderResult | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setCustomer(emptyCustomer);
      setPayment("card");
      setResult(null);
    }
  }, [isOpen]);

  const selectedServices = useMemo(
    () => services.filter((s) => cart.includes(s.id)),
    [services, cart],
  );
  const availableServices = useMemo(
    () => services.filter((s) => !cart.includes(s.id)),
    [services, cart],
  );

  const isFullPackage = selectedServices.length === services.length;
  const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const discount = isFullPackage ? pricing.package.savings : 0;
  const total = isFullPackage ? pricing.package.price : subtotal;
  const discountPct = isFullPackage
    ? Math.round((discount / pricing.package.regularPrice) * 100)
    : 0;
  const deliveryEstimate = estimateDelivery(selectedServices.length, isFullPackage);

  const canProceed = () => {
    if (step === 1) return cart.length > 0;
    if (step === 2)
      return (
        customer.name.trim().length > 1 &&
        /.+@.+\..+/.test(customer.email) &&
        customer.phone.trim().length > 3
      );
    if (step === 4) return Boolean(payment);
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await submitOrder({
        services: selectedServices,
        customer,
        paymentMethod: payment,
        subtotal,
        discount,
        total,
      });
      setResult(res);
      setStep(5);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <DialogContent className="max-h-[92vh] max-w-3xl gap-0 overflow-hidden p-0">
        {/* Header — layered gradient */}
        <div className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-brand-soft via-background to-brand-light/60 px-6 py-5 dark:from-brand-soft/50 dark:via-card dark:to-brand-light/20 sm:px-8">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative">
            <DialogTitle className="font-display flex items-center gap-2 text-2xl">
              <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-white elev-2">
                <ShoppingBag size={16} />
              </span>
              Checkout
            </DialogTitle>
            <DialogDescription className="mt-0.5 text-xs uppercase tracking-[0.2em] text-brand-deep/80">
              Step {Math.min(step, 5)} of 5 · {stepTitle(step)}
            </DialogDescription>
            <Stepper current={step} />
          </div>
        </div>

        <div className="max-h-[62vh] overflow-y-auto bg-secondary/40 px-6 py-6 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 1 && (
                <StepCart
                  services={selectedServices}
                  available={availableServices}
                  onAdd={addToCart}
                  onRemove={removeFromCart}
                  onClear={clearCart}
                  onAddAll={() => setCart(services.map((s) => s.id))}
                  isFullPackage={isFullPackage}
                  subtotal={subtotal}
                  total={total}
                  discount={discount}
                  discountPct={discountPct}
                  regularPrice={pricing.package.regularPrice}
                  deliveryEstimate={deliveryEstimate}
                />
              )}
              {step === 2 && <StepCustomer value={customer} onChange={setCustomer} />}
              {step === 3 && (
                <StepReview
                  services={selectedServices}
                  customer={customer}
                  isFullPackage={isFullPackage}
                  subtotal={subtotal}
                  discount={discount}
                  discountPct={discountPct}
                  total={total}
                  deliveryEstimate={deliveryEstimate}
                />
              )}
              {step === 4 && (
                <StepPayment
                  methods={paymentMethods}
                  value={payment}
                  onChange={setPayment}
                  total={total}
                />
              )}
              {step === 5 && result && (
                <StepSuccess
                  orderNumber={result.orderNumber}
                  services={selectedServices}
                  total={total}
                  deliveryEstimate={deliveryEstimate}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-background px-6 py-4 sm:px-8">
          <div className="text-sm text-muted-foreground">
            {step < 5 && cart.length > 0 && (
              <span>
                <span className="font-display text-lg text-foreground">
                  {formatCurrency(total)}
                </span>
                {discount > 0 && (
                  <span className="ml-2 text-xs text-brand">
                    You save {formatCurrency(discount)}
                  </span>
                )}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {step > 1 && step < 5 && (
              <Button
                variant="ghost"
                onClick={() => setStep((s) => (Math.max(1, s - 1) as Step))}
              >
                <ArrowLeft className="mr-1" size={16} /> Back
              </Button>
            )}
            {step < 4 && (
              <Button
                disabled={!canProceed()}
                className="rounded-full gradient-brand text-white elev-2 hover:opacity-90"
                onClick={() => setStep((s) => (Math.min(4, s + 1) as Step))}
              >
                Continue <ArrowRight className="ml-1" size={16} />
              </Button>
            )}
            {step === 4 && (
              <Button
                disabled={!canProceed() || submitting}
                className="rounded-full gradient-brand text-white elev-2 hover:opacity-90"
                onClick={handleSubmit}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-1 animate-spin" size={16} /> Placing order
                  </>
                ) : (
                  <>
                    Pay {formatCurrency(total)} <ArrowRight className="ml-1" size={16} />
                  </>
                )}
              </Button>
            )}
            {step === 5 && (
              <Button
                className="rounded-full gradient-brand text-white elev-2"
                onClick={close}
              >
                Done
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface DeliveryEstimate {
  label: string;
  weeks: string;
  detail: string;
  startDate: string;
  endDate: string;
}

function estimateDelivery(count: number, isFullPackage: boolean): DeliveryEstimate {
  let minW = 1;
  let maxW = 2;
  let label = "Small project";
  if (isFullPackage) {
    minW = 6;
    maxW = 8;
    label = "Full bundle";
  } else if (count >= 4) {
    minW = 4;
    maxW = 6;
    label = "Large project";
  } else if (count >= 2) {
    minW = 2;
    maxW = 4;
    label = "Medium project";
  }
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() + 2); // kickoff in ~2 business days
  const end = new Date(start);
  end.setDate(end.getDate() + maxW * 7);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return {
    label,
    weeks: `${minW}–${maxW} weeks`,
    detail:
      count === 0
        ? "Pick a service to see delivery estimate"
        : `${label} · ${count} service${count === 1 ? "" : "s"} · scoped for ${minW}–${maxW} weeks`,
    startDate: fmt(start),
    endDate: fmt(end),
  };
}

function stepTitle(step: Step) {
  return (
    {
      1: "Your bundle",
      2: "Your details",
      3: "Review order",
      4: "Payment method",
      5: "All set",
    } as const
  )[step];
}

function Stepper({ current }: { current: Step }) {
  return (
    <div className="mt-4 grid grid-cols-5 gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className={cn(
            "h-1 rounded-full transition-all duration-500",
            n <= current ? "gradient-brand" : "bg-border",
          )}
        />
      ))}
    </div>
  );
}

/* ---------- Step 1: cart summary ---------- */
function StepCart({
  services,
  available,
  onAdd,
  onRemove,
  onClear,
  onAddAll,
  isFullPackage,
  subtotal,
  total,
  discount,
  discountPct,
  regularPrice,
  deliveryEstimate,
}: {
  services: Service[];
  available: Service[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onAddAll: () => void;
  isFullPackage: boolean;
  subtotal: number;
  total: number;
  discount: number;
  discountPct: number;
  regularPrice: number;
  deliveryEstimate: DeliveryEstimate;
}) {
  if (services.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-light text-brand-deep">
          <ShoppingBag size={18} />
        </div>
        <div className="font-display mt-4 text-lg">Your bundle is empty</div>
        <p className="mt-1 text-sm text-muted-foreground">
          Close this and pick services from the Services section, or grab the full bundle.
        </p>
        <Button className="mt-5 rounded-full gradient-brand text-white" onClick={onAddAll}>
          Add all six · {formatCurrency(regularPrice - 30)}
        </Button>
      </div>
    );
  }
  return (
    <div>
      {isFullPackage && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-3 rounded-2xl border border-brand/40 bg-brand-soft/60 px-4 py-3 text-sm elev-1"
        >
          <Sparkles size={18} className="text-brand-deep" />
          <div className="min-w-0">
            <div className="font-medium">The Ten Piece Bundle unlocked</div>
            <div className="text-xs text-muted-foreground">
              Regular {formatCurrency(regularPrice)} → {formatCurrency(total)} · you save{" "}
              {formatCurrency(discount)}
            </div>
          </div>
        </motion.div>
      )}
      <div className="space-y-2">
        {services.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 elev-1"
          >
            <img
              src={s.image}
              alt=""
              className="h-14 w-14 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{s.title}</div>
              <div className="truncate text-xs text-muted-foreground">
                {s.shortDescription}
              </div>
            </div>
            <div className="text-sm font-semibold">{formatCurrency(s.price)}</div>
            <button
              onClick={() => onRemove(s.id)}
              className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label={`Remove ${s.title}`}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={onClear}
          className="text-xs text-muted-foreground hover:text-destructive"
        >
          Clear bundle
        </button>
        <div className="flex items-baseline gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Subtotal
          </span>
          <span className="font-display text-2xl">{formatCurrency(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 2: customer info (3D layered fields) ---------- */
function StepCustomer({
  value,
  onChange,
}: {
  value: OrderCustomer;
  onChange: (c: OrderCustomer) => void;
}) {
  const set = <K extends keyof OrderCustomer>(k: K, v: OrderCustomer[K]) =>
    onChange({ ...value, [k]: v });
  return (
    <div className="relative">
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-light/60 via-transparent to-brand/10 blur-xl" />
      <div className="relative rounded-3xl border border-border bg-card p-5 elev-2 sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-deep">
          <span className="h-px w-6 bg-brand-deep/30" />
          Your details
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" required>
            <Input
              value={value.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Jane Doe"
            />
          </Field>
          <Field label="Company">
            <Input
              value={value.company}
              onChange={(e) => set("company", e.target.value)}
              placeholder="Optional"
            />
          </Field>
          <Field label="Email" required>
            <Input
              type="email"
              value={value.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@company.com"
            />
          </Field>
          <Field label="Phone" required>
            <Input
              value={value.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+31 6 …"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Anything we should know?">
              <Textarea
                rows={4}
                value={value.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Timelines, goals, links to inspiration…"
              />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label} {required && <span className="text-brand">*</span>}
      </Label>
      {children}
    </div>
  );
}

/* ---------- Step 3: review ---------- */
function StepReview({
  services,
  customer,
  isFullPackage,
  subtotal,
  discount,
  total,
}: {
  services: Service[];
  customer: OrderCustomer;
  isFullPackage: boolean;
  subtotal: number;
  discount: number;
  total: number;
}) {
  return (
    <div className="space-y-5">
      {/* Customer summary */}
      <div className="rounded-2xl border border-border bg-card p-5 elev-1">
        <div className="text-xs uppercase tracking-[0.2em] text-brand-deep">Delivered to</div>
        <div className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
          <SummaryLine label="Name" value={customer.name} />
          <SummaryLine label="Email" value={customer.email} />
          <SummaryLine label="Phone" value={customer.phone} />
          <SummaryLine label="Company" value={customer.company || "—"} />
          {customer.notes && (
            <div className="sm:col-span-2">
              <SummaryLine label="Notes" value={customer.notes} />
            </div>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="rounded-2xl border border-border bg-card elev-1">
        <div className="border-b border-border px-5 py-3 text-xs uppercase tracking-[0.2em] text-brand-deep">
          {isFullPackage ? "Ten Piece Bundle · 6 services" : `${services.length} services`}
        </div>
        <div className="divide-y divide-border">
          {services.map((s) => (
            <div key={s.id} className="flex items-center gap-3 px-5 py-3">
              <img
                src={s.image}
                alt=""
                className="h-12 w-12 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{s.title}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {s.shortDescription}
                </div>
              </div>
              <div className="text-sm">{formatCurrency(s.price)}</div>
            </div>
          ))}
        </div>
        <dl className="space-y-1.5 border-t border-border px-5 py-4 text-sm">
          <Row label="Subtotal" value={formatCurrency(subtotal)} />
          {isFullPackage && (
            <Row label="Bundle discount" value={`− ${formatCurrency(discount)}`} accent />
          )}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Total
            </span>
            <span className="font-display text-2xl text-gradient-brand">
              {formatCurrency(total)}
            </span>
          </div>
        </dl>
      </div>

      {/* Delivery */}
      <div className="rounded-2xl border border-dashed border-brand/30 bg-brand-soft/40 p-4 text-xs text-muted-foreground">
        Each service is delivered within two weeks. Bundles run on a coordinated 6–8 week
        schedule. You'll get a project brief within one working day.
      </div>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className="truncate text-foreground">{value}</span>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn(accent && "text-brand-deep")}>{value}</dd>
    </div>
  );
}

/* ---------- Step 4: payment ---------- */
function StepPayment({
  methods,
  value,
  onChange,
  total,
}: {
  methods: typeof site.paymentMethods;
  value: string;
  onChange: (id: string) => void;
  total: number;
}) {
  return (
    <div className="space-y-4">
      {/* Trust bar */}
      <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 elev-1 sm:grid-cols-3">
        <TrustPill
          icon={<Lock size={14} />}
          title="Encrypted"
          body="TLS + tokenised card data"
        />
        <TrustPill
          icon={<Shield size={14} />}
          title="PCI-DSS"
          body="Processed via certified provider"
        />
        <TrustPill
          icon={<Sparkles size={14} />}
          title="No surprises"
          body="One-time charge, no auto-renew"
        />
      </div>

      <div className="grid gap-2">
        {methods.map((m) => {
          const active = value === m.id;
          return (
            <button
              type="button"
              key={m.id}
              onClick={() => onChange(m.id)}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                active
                  ? "border-brand bg-gradient-to-br from-brand-soft to-background elev-2 ring-2 ring-brand/30"
                  : "border-border bg-card hover:-translate-y-0.5 hover:border-brand/40 hover:elev-2",
              )}
            >
              <span
                className={cn(
                  "grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors",
                  active
                    ? "gradient-brand text-white elev-1"
                    : "bg-secondary text-foreground",
                )}
              >
                <Icon name={m.icon} size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{m.label}</div>
                <div className="text-xs text-muted-foreground">{m.description}</div>
              </div>
              <span
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-all",
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-background",
                )}
              >
                {active && <Check size={12} />}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        You'll be charged <span className="font-medium text-foreground">{formatCurrency(total)}</span> on
        confirmation. Payment integrations are simulated for this demo.
      </p>
    </div>
  );
}

function TrustPill({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-lg bg-brand-light text-brand-deep">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-xs font-semibold">{title}</div>
        <div className="text-[11px] text-muted-foreground">{body}</div>
      </div>
    </div>
  );
}

/* ---------- Step 5: success ---------- */
function StepSuccess({
  orderNumber,
  services,
  total,
}: {
  orderNumber: string;
  services: Service[];
  total: number;
}) {
  return (
    <div className="py-4 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full gradient-brand text-white elev-3"
      >
        <Check size={28} />
      </motion.div>
      <h3 className="font-display mt-5 text-3xl">Thank you.</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Our team will contact you shortly to kick things off. Your order confirmation is below.
      </p>
      <div className="mx-auto mt-6 max-w-md rounded-2xl border border-border bg-card p-5 text-left elev-1">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Order</span>
          <span className="font-mono text-sm">{orderNumber}</span>
        </div>
        <ul className="mt-4 space-y-1.5 text-sm">
          {services.map((s) => (
            <li key={s.id} className="flex items-center justify-between">
              <span>{s.title}</span>
              <span className="text-muted-foreground">{formatCurrency(s.price)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Paid</span>
          <span className="font-display text-xl text-gradient-brand">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
