import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/common/Reveal";
import { Icon } from "@/components/common/Icon";
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

const schema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(80),
  company: z.string().trim().max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(3, "Add a phone number").max(40),
  service: z.string().min(1, "Pick a service"),
  budget: z.string().min(1, "Pick a budget"),
  message: z.string().trim().min(10, "A short brief helps").max(1200),
}) satisfies z.ZodType<ContactFormPayload>;

const budgets = ["< €500", "€500 – €1,000", "€1,000 – €3,000", "€3,000+"];

export function Contact() {
  const { contact, services, socials } = site;
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

  const contactCards = [
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      tone: "from-brand-light to-brand-soft",
      accent: "text-brand-deep",
    },
    {
      icon: <Phone size={18} />,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
      tone: "from-brand/20 to-brand-light",
      accent: "text-brand-deep",
    },
    {
      icon: <MapPin size={18} />,
      label: "Studio",
      value: contact.address,
      tone: "from-brand-soft to-brand-light",
      accent: "text-brand-deep",
    },
    {
      icon: <Clock size={18} />,
      label: "Hours",
      value: contact.hours,
      tone: "from-brand-light to-brand/10",
      accent: "text-brand-deep",
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-brand-light/40 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal>
              <span className="text-xs uppercase tracking-[0.22em] text-brand-deep">
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

            {/* Layered colored cards */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {contactCards.map((c, i) => (
                <Reveal key={c.label} delay={0.05 * i}>
                  <LayeredCard {...c} />
                </Reveal>
              ))}
            </div>

            <div className="mt-10">
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Follow
              </div>
              <div className="mt-3 flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-brand-deep transition-all hover:scale-110 hover:border-brand hover:shadow-md hover:shadow-brand/20"
                  >
                    <Icon name={s.icon} size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="relative">
              {/* Layered background shadows */}
              <div className="absolute -inset-2 rounded-[2.25rem] bg-gradient-to-br from-brand/20 via-brand-light/40 to-transparent blur-2xl" />
              <div className="absolute -top-3 -left-3 h-full w-full rounded-[2rem] gradient-brand opacity-30" />
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-[2rem] border-2 border-brand-deep/20" />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative rounded-[2rem] border border-border bg-card p-6 shadow-2xl shadow-brand-deep/10 sm:p-8"
              >
                {sent ? (
                  <div className="flex flex-col items-center py-16 text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full gradient-brand text-white shadow-xl shadow-brand/30">
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
                        className="w-full rounded-full gradient-brand text-white hover:opacity-90 sm:w-auto group"
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

function LayeredCard({
  icon,
  label,
  value,
  href,
  tone,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  tone: string;
  accent: string;
}) {
  const Wrapper: React.ElementType = href ? "a" : "div";
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={`group relative block overflow-hidden rounded-2xl bg-gradient-to-br ${tone} p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-deep/15`}
    >
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/40 blur-2xl transition-all duration-500 group-hover:scale-150" />
      <div className="relative">
        <span className={`inline-grid h-11 w-11 place-items-center rounded-xl bg-white/90 ${accent} shadow-sm`}>
          {icon}
        </span>
        <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-deep/70">
          {label}
        </div>
        <div className="mt-1 text-sm font-semibold text-brand-deep">{value}</div>
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
