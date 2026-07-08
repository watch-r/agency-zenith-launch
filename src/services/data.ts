import rawData from "@/data/data.json";
import type {
  Agency,
  AboutContent,
  ContactInformation,
  FAQ,
  FeaturedService,
  FinalCTAContent,
  FooterConfig,
  GalleryImage,
  HeroContent,
  NavigationItem,
  PaymentMethod,
  Pricing,
  Project,
  Service,
  SiteData,
  SocialLink,
  Stat,
  Testimonial,
  TrustedByItem,
  WhyChooseUsItem,
} from "@/types";

// Single-source data accessor. Currently reads the bundled JSON.
// Later, replace each function's body with a `fetch` call against
// the Django REST API — the return signatures already return promises.
const data = rawData as SiteData;

export async function getSiteData(): Promise<SiteData> {
  return data;
}

export async function getAgencyInfo(): Promise<Agency> {
  return data.agency;
}

export async function getNavigation(): Promise<NavigationItem[]> {
  return data.navigation;
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  return data.socials;
}

export async function getHero(): Promise<HeroContent> {
  return data.hero;
}

export async function getTrustedBy(): Promise<{
  eyebrow: string;
  logos: TrustedByItem[];
  stats: Stat[];
}> {
  return data.trustedBy;
}

export async function getAbout(): Promise<AboutContent> {
  return data.about;
}

export async function getServices(): Promise<Service[]> {
  return data.services;
}

export async function getFeaturedServices(): Promise<FeaturedService[]> {
  return data.featuredServices;
}

export async function getProjects(): Promise<Project[]> {
  return data.projects;
}

export async function getGallery(): Promise<GalleryImage[]> {
  return data.gallery;
}

export async function getWhyChooseUs(): Promise<{
  eyebrow: string;
  heading: string;
  description: string;
  items: WhyChooseUsItem[];
}> {
  return data.whyChooseUs;
}

export async function getPricing(): Promise<Pricing> {
  return data.pricing;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return data.testimonials;
}

export async function getFAQs(): Promise<FAQ[]> {
  return data.faqs;
}

export async function getFinalCTA(): Promise<FinalCTAContent> {
  return data.finalCta;
}

export async function getContact(): Promise<ContactInformation> {
  return data.contact;
}

export async function getFooter(): Promise<FooterConfig> {
  return data.footer;
}

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  return data.paymentMethods;
}

// Synchronous helpers for components that don't need async loading today.
// When migrating to the API, switch components to the async variants above
// (with useQuery / Suspense). The sync accessors below can then be removed.
export const site = data;
