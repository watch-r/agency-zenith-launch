export interface Agency {
  name: string;
  shortName: string;
  tagline: string;
  logoMark: string;
  yearFounded: number;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  href: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface TrustedByItem {
  name: string;
  logoText: string;
}

export interface HeroGalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  primaryCta: { label: string; action: "order" | "scroll"; target?: string };
  secondaryCta: { label: string; action: "order" | "scroll"; target?: string };
  image: string;
  imageAlt: string;
  gallery: HeroGalleryImage[];
}

export interface AboutValue {
  title: string;
  description: string;
  icon: string;
}

export interface AboutContent {
  eyebrow: string;
  heading: string;
  story: string;
  mission: string;
  vision: string;
  values: AboutValue[];
  image: string;
  imageAlt: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  price: number;
  featured?: boolean;
}

export interface FeaturedService {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  benefits: string[];
  image: string;
  imageAlt: string;
  ctaLabel: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  industry: string;
  coverImage: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  icon: string;
}

export interface PricingIndividual {
  title: string;
  description: string;
  price: number;
  features: string[];
}

export interface PricingPackage {
  title: string;
  description: string;
  regularPrice: number;
  price: number;
  savings: number;
  badge: string;
  features: string[];
}

export interface Pricing {
  currency: string;
  currencySymbol: string;
  individual: PricingIndividual;
  package: PricingPackage;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  photo: string;
  rating: number;
  quote: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInformation {
  eyebrow: string;
  heading: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
}

export interface FinalCTAContent {
  eyebrow: string;
  heading: string;
  description: string;
  primaryCta: { label: string; action: "order" | "scroll"; target?: string };
  secondaryCta: { label: string; action: "order" | "scroll"; target?: string };
}

export interface FooterConfig {
  tagline: string;
  columns: { title: string; links: NavigationItem[] }[];
  legalLinks: NavigationItem[];
  copyright: string;
}

export interface PaymentMethod {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface SiteData {
  agency: Agency;
  navigation: NavigationItem[];
  socials: SocialLink[];
  hero: HeroContent;
  trustedBy: { eyebrow: string; logos: TrustedByItem[]; stats: Stat[] };
  about: AboutContent;
  services: Service[];
  featuredServices: FeaturedService[];
  projects: Project[];
  gallery: GalleryImage[];
  whyChooseUs: { eyebrow: string; heading: string; description: string; items: WhyChooseUsItem[] };
  pricing: Pricing;
  testimonials: Testimonial[];
  faqs: FAQ[];
  finalCta: FinalCTAContent;
  contact: ContactInformation;
  footer: FooterConfig;
  paymentMethods: PaymentMethod[];
}

export interface OrderCustomer {
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
}

export interface OrderSubmission {
  services: Service[];
  customer: OrderCustomer;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  total: number;
}

export interface OrderResult {
  orderNumber: string;
}

export interface ContactFormPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}
