import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Ten Piece Marketing Agency" },
      {
        name: "description",
        content:
          "The terms that govern your use of tenpiece.studio and services delivered by Ten Piece.",
      },
      { property: "og:title", content: "Terms of Service — Ten Piece" },
      {
        property: "og:description",
        content: "Terms that govern our services.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: 12 July 2026</p>

          <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-relaxed text-foreground/85">
            <Section title="1. Agreement">
              By using this website or engaging Ten Piece Marketing Agency for services, you
              agree to these terms. If you don't agree, please don't use the site or engage
              us.
            </Section>

            <Section title="2. Services">
              We provide the six services listed on our site at a flat rate of €50 per
              service. Any variation to scope, revisions beyond the included rounds, or
              expedited delivery must be agreed in writing.
            </Section>

            <Section title="3. Payment">
              Orders are payable in full at checkout via the payment methods offered
              (including Revolut, card, PayPal, Apple Pay, and SEPA bank transfer). Invoiced
              engagements are net-14 unless agreed otherwise.
            </Section>

            <Section title="4. Deliverables & IP">
              You own final deliverables upon receipt of full payment. We retain the right to
              display work in our portfolio unless you request otherwise in writing.
              Third-party assets (fonts, stock media) remain licensed under their respective
              terms.
            </Section>

            <Section title="5. Revisions & cancellation">
              Each service includes two rounds of revisions. Cancellations before kickoff are
              refunded in full; after kickoff, we retain a proportional fee for work already
              performed.
            </Section>

            <Section title="6. Confidentiality">
              We treat client information as confidential and will sign an NDA on request.
            </Section>

            <Section title="7. Liability">
              To the maximum extent permitted by law, our liability for any claim arising out
              of a project is limited to the fees paid for that project.
            </Section>

            <Section title="8. Governing law">
              These terms are governed by the laws of the Netherlands. Any dispute is subject
              to the exclusive jurisdiction of the courts of Amsterdam.
            </Section>

            <Section title="9. Contact">
              Questions? Email{" "}
              <a
                href="mailto:hello@tenpiece.studio"
                className="text-brand-deep underline underline-offset-4 hover:text-brand"
              >
                hello@tenpiece.studio
              </a>
              .
            </Section>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-3">{children}</p>
    </section>
  );
}
