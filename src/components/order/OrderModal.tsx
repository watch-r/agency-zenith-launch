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
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
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
  const { isOpen, close, preselected } = useOrder();
  const services = site.services;
  const pricing = site.pricing;
  const paymentMethods = site.paymentMethods;

  const [step, setStep] = useState<Step>(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [customer, setCustomer] = useState<OrderCustomer>(emptyCustomer);
  const [payment, setPayment] = useState<string>("card");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<OrderResult | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelected(preselected.length ? preselected : []);
      setCustomer(emptyCustomer);
      setPayment("card");
      setResult(null);
    }
  }, [isOpen, preselected]);

  const selectedServices = useMemo(
    () => services.filter((s) => selected.includes(s.id)),
    [services, selected],
  );

  const isFullPackage = selectedServices.length === services.length;
  const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const discount = isFullPackage ? pricing.package.savings : 0;
  const total = isFullPackage ? pricing.package.price : subtotal;

  const toggle = (id: string) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((i) => i !== id) : [...cur, id]));

  const canProceed = () => {
    if (step === 1) return selected.length > 0;
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
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-hidden gap-0 p-0">
        <div className="border-b border-border/60 bg-secondary/40 px-6 py-4 sm:px-8">
          <DialogTitle className="font-display text-2xl">Start a project</DialogTitle>
          <DialogDescription className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Step {Math.min(step, 5)} of 5 · {stepTitle(step)}
          </DialogDescription>
          <Stepper current={step} />
        </div>

        <div className="max-h-[62vh] overflow-y-auto px-6 py-6 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 1 && (
                <StepServices
                  services={services}
                  selected={selected}
                  onToggle={toggle}
                  isFullPackage={isFullPackage}
                  subtotal={subtotal}
                  total={total}
                  discount={discount}
                  regularPrice={pricing.package.regularPrice}
                />
              )}
              {step === 2 && <StepCustomer value={customer} onChange={setCustomer} />}
              {step === 3 && (
                <StepSummary
                  services={selectedServices}
                  isFullPackage={isFullPackage}
                  subtotal={subtotal}
                  discount={discount}
                  total={total}
                />
              )}
              {step === 4 && (
                <StepPayment
                  methods={paymentMethods}
                  value={payment}
                  onChange={setPayment}
                />
              )}
              {step === 5 && result && (
                <StepSuccess
                  orderNumber={result.orderNumber}
                  services={selectedServices}
                  total={total}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-background px-6 py-4 sm:px-8">
          <div className="text-sm text-muted-foreground">
            {step < 5 && (
              <span>
                <span className="font-medium text-foreground">{formatCurrency(total)}</span>
                {discount > 0 && (
                  <span className="ml-2 text-brand">You save {formatCurrency(discount)}</span>
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
                onClick={() => setStep((s) => (Math.min(4, s + 1) as Step))}
              >
                Continue <ArrowRight className="ml-1" size={16} />
              </Button>
            )}
            {step === 4 && (
              <Button disabled={!canProceed() || submitting} onClick={handleSubmit}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-1 animate-spin" size={16} /> Placing order
                  </>
                ) : (
                  <>Place order <ArrowRight className="ml-1" size={16} /></>
                )}
              </Button>
            )}
            {step === 5 && <Button onClick={close}>Done</Button>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function stepTitle(step: Step) {
  return (
    {
      1: "Select services",
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
            "h-1 rounded-full transition-all",
            n <= current ? "bg-foreground" : "bg-border",
          )}
        />
      ))}
    </div>
  );
}

function StepServices({
  services,
  selected,
  onToggle,
  isFullPackage,
  subtotal,
  total,
  discount,
  regularPrice,
}: {
  services: Service[];
  selected: string[];
  onToggle: (id: string) => void;
  isFullPackage: boolean;
  subtotal: number;
  total: number;
  discount: number;
  regularPrice: number;
}) {
  return (
    <div>
      {isFullPackage && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-center gap-3 rounded-2xl border border-brand/40 bg-brand-soft/50 px-4 py-3 text-sm"
        >
          <Sparkles size={18} className="text-brand" />
          <div>
            <div className="font-medium">Ten Piece Package unlocked</div>
            <div className="text-xs text-muted-foreground">
              Regular price {formatCurrency(regularPrice)} → {formatCurrency(total)} · you save{" "}
              {formatCurrency(discount)}
            </div>
          </div>
        </motion.div>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((s) => {
          const active = selected.includes(s.id);
          return (
            <button
              type="button"
              key={s.id}
              onClick={() => onToggle(s.id)}
              className={cn(
                "group relative flex items-start gap-4 rounded-2xl border p-4 text-left transition-all",
                active
                  ? "border-foreground bg-foreground/[0.03] shadow-sm"
                  : "border-border hover:border-foreground/40",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                  active ? "bg-foreground text-background" : "bg-secondary text-foreground",
                )}
              >
                <Icon name={s.icon} size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate font-medium">{s.title}</div>
                  <div className="shrink-0 text-sm font-medium">{formatCurrency(s.price)}</div>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {s.shortDescription}
                </p>
              </div>
              <span
                className={cn(
                  "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border transition-all",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background opacity-0 group-hover:opacity-100",
                )}
              >
                <Check size={12} />
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between rounded-2xl bg-secondary/60 px-4 py-3 text-sm">
        <span className="text-muted-foreground">
          {selected.length} selected
          {!isFullPackage && selected.length > 0 && ` · Subtotal ${formatCurrency(subtotal)}`}
        </span>
        <span className="font-display text-lg">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}

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
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Full name" required>
        <Input value={value.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" />
      </Field>
      <Field label="Company">
        <Input value={value.company} onChange={(e) => set("company", e.target.value)} placeholder="Optional" />
      </Field>
      <Field label="Email" required>
        <Input type="email" value={value.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" />
      </Field>
      <Field label="Phone" required>
        <Input value={value.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+31 6 …" />
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

function StepSummary({
  services,
  isFullPackage,
  subtotal,
  discount,
  total,
}: {
  services: Service[];
  isFullPackage: boolean;
  subtotal: number;
  discount: number;
  total: number;
}) {
  return (
    <div>
      <div className="divide-y divide-border rounded-2xl border border-border">
        {services.map((s) => (
          <div key={s.id} className="flex items-center gap-3 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
              <Icon name={s.icon} size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{s.title}</div>
              <div className="truncate text-xs text-muted-foreground">{s.shortDescription}</div>
            </div>
            <div className="text-sm">{formatCurrency(s.price)}</div>
          </div>
        ))}
      </div>
      <dl className="mt-5 space-y-2 text-sm">
        <Row label="Subtotal" value={formatCurrency(subtotal)} />
        {isFullPackage && (
          <Row label="Package discount" value={`− ${formatCurrency(discount)}`} accent />
        )}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total</span>
          <span className="font-display text-2xl">{formatCurrency(total)}</span>
        </div>
      </dl>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn(accent && "text-brand")}>{value}</dd>
    </div>
  );
}

function StepPayment({
  methods,
  value,
  onChange,
}: {
  methods: typeof site.paymentMethods;
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid gap-3">
      {methods.map((m) => {
        const active = value === m.id;
        return (
          <button
            type="button"
            key={m.id}
            onClick={() => onChange(m.id)}
            className={cn(
              "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
              active ? "border-foreground bg-foreground/[0.03]" : "border-border hover:border-foreground/40",
            )}
          >
            <span
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
                active ? "bg-foreground text-background" : "bg-secondary text-foreground",
              )}
            >
              <Icon name={m.icon} size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">{m.label}</div>
              <div className="text-xs text-muted-foreground">{m.description}</div>
            </div>
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border",
                active ? "border-foreground bg-foreground text-background" : "border-border",
              )}
            >
              {active && <Check size={12} />}
            </span>
          </button>
        );
      })}
      <p className="mt-2 text-xs text-muted-foreground">
        Payment integrations are simulated for this demo — no real charge is made.
      </p>
    </div>
  );
}

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
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-background"
      >
        <Check size={28} />
      </motion.div>
      <h3 className="font-display mt-5 text-3xl">Thank you.</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Our team will contact you shortly to kick things off. Your order confirmation is below.
      </p>
      <div className="mx-auto mt-6 max-w-md rounded-2xl border border-border bg-secondary/50 p-5 text-left">
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
          <span className="font-display text-xl">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
