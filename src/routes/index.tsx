import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/sections/Hero";
import { TrustedBy } from "@/sections/TrustedBy";
import { About } from "@/sections/About";
import { Services } from "@/sections/Services";
import { FeaturedServices } from "@/sections/FeaturedServices";
import { Portfolio } from "@/sections/Portfolio";
import { Gallery } from "@/sections/Gallery";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { Pricing } from "@/sections/Pricing";
import { Testimonials } from "@/sections/Testimonials";
import { FAQ } from "@/sections/FAQ";
import { FinalCTA } from "@/sections/FinalCTA";
import { Contact } from "@/sections/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <About />
        <Services />
        <FeaturedServices />
        <Portfolio />
        <Gallery />
        <WhyChooseUs />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
