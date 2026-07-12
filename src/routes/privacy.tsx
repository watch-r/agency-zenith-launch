import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Ten Piece Marketing Agency" },
      {
        name: "description",
        content:
          "How Ten Piece Marketing Agency collects, uses, and protects your personal information.",
      },
      { property: "og:title", content: "Privacy Policy — Ten Piece" },
      {
        property: "og:description",
        content: "How Ten Piece handles your data.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-20 md:pt-40">
        <Container>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={14} /> Back home
          </Link>
          <h1 className="font-display mt-6 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: 12 July 2026
          </p>

          <div className="prose-invert mt-10 max-w-3xl space-y-8 text-[15px] leading-relaxed text-foreground/85">
            <Section title="1. Who we are">
              Ten Piece Marketing Agency ("we", "us") is an independent studio based in
              Amsterdam, the Netherlands. This page is maintained by Ten Piece and describes
              how we collect and handle information on our website and during client
              engagements.
            </Section>

            <Section title="2. What we collect">
              We collect the information you give us when you submit a contact or order form
              — name, company, email, phone, project brief, and payment details processed by
              our payment provider. We also collect standard analytics (pages viewed,
              referrer, device type) via privacy-friendly tooling.
            </Section>

            <Section title="3. How we use it">
              To respond to your enquiries, deliver services you've ordered, invoice you,
              improve the website, and — only when you opt in — send you occasional studio
              updates.
            </Section>

            <Section title="4. Legal basis">
              We rely on your consent (contact forms, marketing), the performance of a
              contract (client work, invoicing), and legitimate interests (site analytics,
              service improvement).
            </Section>

            <Section title="5. Sharing">
              We do not sell personal data. We share it only with vetted processors that help
              us operate — email, hosting, analytics, and payment providers — under written
              agreements.
            </Section>

            <Section title="6. Your rights" id="cookies">
              Under the GDPR you can request access, correction, deletion, or export of your
              data, and object to processing. Email{" "}
              <a
                href="mailto:hello@tenpiece.studio"
                className="text-brand-deep underline underline-offset-4 hover:text-brand"
              >
                hello@tenpiece.studio
              </a>{" "}
              and we'll respond within 30 days.
            </Section>

            <Section title="7. Cookies">
              We use strictly necessary cookies for the site to function and a small set of
              first-party analytics cookies. You can disable non-essential cookies from your
              browser at any time.
            </Section>

            <Section title="8. Contact">
              Questions? Write to{" "}
              <a
                href="mailto:hello@tenpiece.studio"
                className="text-brand-deep underline underline-offset-4 hover:text-brand"
              >
                hello@tenpiece.studio
              </a>{" "}
              or Ten Piece Studio, Prinsengracht 500, Amsterdam.
            </Section>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

function Section({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-3">{children}</p>
    </section>
  );
}
