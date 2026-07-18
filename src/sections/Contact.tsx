import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/services/data";
import { submitContactForm } from "@/services/contact";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ContactFormPayload } from "@/types";
import { ArrowRight, Check, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(80),
  company: z.string().trim().max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(3, "Add a phone number").max(40),
  service: z.string().min(1, "Pick a service"),
  budget: z.string().min(1, "Pick a budget"),
  message: z.string().trim().min(10, "A short brief helps").max(1200),
}) satisfies z.ZodType<ContactFormPayload>;

const budgets = ["< £500", "£500 – £1,500", "£1,500 – £3,000", "£3,000+"];

export function Contact() {
  const { contact, services } = site;
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormPayload>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormPayload) => {
    await submitContactForm(values);
    setSent(true);
    reset();
  };

  const waNumber = (contact.whatsapp ?? contact.phone).replace(/\D/g, "");
  const contactCards = [
    {
      tone: "brand" as const,
      icon: <Mail size={16} />,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      tone: "emerald" as const,
      icon: <Phone size={16} />,
      label: "WhatsApp",
      value: contact.phone,
      href: `https://wa.me/${waNumber}`,
      external: true,
    },
    {
      tone: "amber" as const,
      icon: <MapPin size={16} />,
      label: "Studio",
      value: contact.address,
    },
    {
      tone: "violet" as const,
      icon: <Clock size={16} />,
      label: "Hours",
      value: contact.hours,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-brand-light/40 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-brand-deep">
                <span className="h-px w-8 bg-brand-deep/30" />
                {contact.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-4 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                Tell us what you're{" "}
                <span className="text-gradient-brand italic">building.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base text-muted-foreground sm:text-lg">
                {contact.description}
              </p>
            </Reveal>

            {/* Aligned equal-height cards */}
            <div className="mt-10 grid auto-rows-fr gap-3 sm:grid-cols-2">
              {contactCards.map((c, i) => (
                <Reveal key={c.label} delay={0.05 * i}>
                  <ContactCard {...c} />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="relative">
              {/* Layered background */}
              <div className="absolute -inset-2 rounded-[2.25rem] bg-gradient-to-br from-brand/15 via-brand-light/30 to-transparent blur-2xl" />
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-[2rem] border border-brand-deep/15 bg-brand-light/25" />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative rounded-[2rem] border border-border bg-card p-6 elev-3 sm:p-8"
              >
                {sent ? (
                  <div className="flex flex-col items-center py-16 text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full gradient-brand text-white elev-3">
                      <Check size={26} />
                    </span>
                    <h3 className="font-display mt-5 text-2xl">Message received.</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Thanks for reaching out — we'll be back to you within one working day.
                    </p>
                    <Button variant="ghost" className="mt-6 rounded-full" onClick={() => setSent(false)}>
                      Send another
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Name" error={errors.name?.message}>
                      <Input placeholder="Jane Doe" {...register("name")} />
                    </FormField>
                    <FormField label="Company" error={errors.company?.message}>
                      <Input placeholder="Optional" {...register("company")} />
                    </FormField>
                    <FormField label="Email" error={errors.email?.message}>
                      <Input type="email" placeholder="you@company.com" {...register("email")} />
                    </FormField>
                    <FormField label="Phone" error={errors.phone?.message}>
                      <Input placeholder="+31 6 …" {...register("phone")} />
                    </FormField>
                    <FormField label="Interested service" error={errors.service?.message}>
                      <Controller
                        control={control}
                        name="service"
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose one" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((s) => (
                                <SelectItem key={s.id} value={s.slug}>
                                  {s.title}
                                </SelectItem>
                              ))}
                              <SelectItem value="package">The Ten Piece Bundle</SelectItem>
                              <SelectItem value="not-sure">Not sure yet</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormField>
                    <FormField label="Budget" error={errors.budget?.message}>
                      <Controller
                        control={control}
                        name="budget"
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pick a range" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgets.map((b) => (
                                <SelectItem key={b} value={b}>
                                  {b}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormField>
                    <div className="sm:col-span-2">
                      <FormField label="Project brief" error={errors.message?.message}>
                        <Textarea rows={4} placeholder="A few sentences on what you're building…" {...register("message")} />
                      </FormField>
                    </div>
                    <div className="sm:col-span-2">
                      <Button
                        type="submit"
                        size="lg"
                        className="group w-full rounded-full gradient-brand text-white hover:opacity-90 elev-2 sm:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending…" : "Send message"}
                        <ArrowRight
                          size={16}
                          className="ml-1 transition-transform group-hover:translate-x-0.5"
                        />
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

type Tone = "brand" | "emerald" | "amber" | "violet";
const toneMap: Record<Tone, { bg: string; icon: string; border: string; glow: string }> = {
  brand: {
    bg: "bg-gradient-to-br from-brand-soft via-brand-light/50 to-background dark:from-brand-soft/40 dark:via-brand-light/25 dark:to-card",
    icon: "gradient-brand text-white",
    border: "border-brand/40",
    glow: "bg-brand/30",
  },
  emerald: {
    bg: "bg-gradient-to-br from-emerald-50 via-emerald-100/60 to-background dark:from-emerald-900/30 dark:via-emerald-800/20 dark:to-card",
    icon: "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white",
    border: "border-emerald-400/40",
    glow: "bg-emerald-400/40",
  },
  amber: {
    bg: "bg-gradient-to-br from-amber-50 via-amber-100/60 to-background dark:from-amber-900/30 dark:via-amber-800/20 dark:to-card",
    icon: "bg-gradient-to-br from-amber-400 to-orange-600 text-white",
    border: "border-amber-400/40",
    glow: "bg-amber-400/40",
  },
  violet: {
    bg: "bg-gradient-to-br from-violet-50 via-violet-100/60 to-background dark:from-violet-900/30 dark:via-violet-800/20 dark:to-card",
    icon: "bg-gradient-to-br from-violet-500 to-purple-700 text-white",
    border: "border-violet-400/40",
    glow: "bg-violet-400/40",
  },
};

function ContactCard({
  icon,
  label,
  value,
  href,
  tone,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  tone: Tone;
  external?: boolean;
}) {
  const Wrapper: React.ElementType = href ? "a" : "div";
  const t = toneMap[tone];
  return (
    <Wrapper
      {...(href ? { href, ...(external ? { target: "_blank", rel: "noreferrer" } : {}) } : {})}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 elev-2 transition-all duration-300 hover:-translate-y-1 hover:elev-3",
        t.bg,
        t.border,
      )}
    >
      <div className={cn("absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150", t.glow)} />
      <div className="relative flex h-full flex-col">
        <span className={cn("inline-grid h-10 w-10 place-items-center rounded-xl elev-1", t.icon)}>
          {icon}
        </span>
        <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/60">
          {label}
        </div>
        <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
      </div>
    </Wrapper>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </Label>
      {children}
      {error && <div className="mt-1 text-xs text-destructive">{error}</div>}
    </div>
  );
}
