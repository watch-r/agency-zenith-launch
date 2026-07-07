
# Ten Piece Marketing Agency — Build Plan

A premium, minimalist, conversion-focused agency site. All content flows from `src/data/data.json` through a swappable service layer so a Django REST API can replace it later without touching UI.

## Design direction

- Aesthetic: high-end editorial minimalism (Awwwards-tier), generous whitespace, oversized display type, restrained motion.
- Palette: white / light gray / dark gray / near-black, with a single elegant accent (warm off-white background `#f7f5f1`, ink `#0b0b0b`, accent `#c8a24b` muted gold). Full dark mode mirror.
- Type: Fraunces (display, tight tracking) + Inter (body). Loaded via `<link>` in `__root.tsx`.
- Motion: Framer Motion — fade-up on scroll, image reveals (clip-path), card lift on hover, marquee for client logos, smooth accordion, modal step transitions.
- Rounded-2xl cards, soft shadows, subtle gradients only as accents.

## Architecture

```
src/
  routes/
    __root.tsx              # fonts, theme provider, meta
    index.tsx               # single-page composition of sections
  components/
    ui/                     # existing shadcn primitives
    layout/                 # Navbar, Footer, ThemeToggle, Container
    common/                 # SectionHeading, AnimatedText, Reveal, Marquee, Rating
    order/                  # OrderModal + Step1..Step5 subcomponents
  sections/
    Hero.tsx
    TrustedBy.tsx
    About.tsx
    Services.tsx
    FeaturedServices.tsx
    Portfolio.tsx
    Gallery.tsx
    WhyChooseUs.tsx
    Pricing.tsx
    Testimonials.tsx
    FAQ.tsx
    FinalCTA.tsx
    Contact.tsx
  data/
    data.json               # single source of truth for all content
  services/
    data.ts                 # getAgencyInfo, getServices, getProjects,
                            # getGallery, getTestimonials, getPricing,
                            # getFAQs, getHero, getAbout, getWhyChooseUs,
                            # getTrustedBy, getContact, getNavigation,
                            # getFooter, getStats, getSocialLinks
    order.ts                # submitOrder() stub returning fake order #
    contact.ts              # submitContactForm() stub
  types/
    index.ts                # all interfaces, strict
  hooks/
    use-theme.ts            # light/dark with localStorage, hydration-safe
    use-order.ts            # order modal + selection state (context)
  lib/
    format.ts               # currency, order-number generator
```

### Data layer contract

`services/data.ts` functions are all `async` and return typed promises even though they read JSON synchronously today. This makes the Django swap a one-line change per function (replace `return data.x` with `fetch(...).then(...)`).

```ts
export async function getServices(): Promise<Service[]> {
  return (data as SiteData).services;
}
```

### TypeScript interfaces (in `types/index.ts`)

`Agency`, `HeroContent`, `AboutContent`, `Service`, `FeaturedService`, `Project`, `GalleryImage`, `Testimonial`, `PricingPackage`, `PricingIndividual`, `FAQ`, `WhyChooseUsItem`, `TrustedByItem`, `Stat`, `ContactInformation`, `SocialLink`, `NavigationItem`, `FooterConfig`, `PaymentMethod`, `OrderState`, `OrderSubmission`, `SiteData`.

## Sections (all data-driven)

Hero, TrustedBy (marquee + stats), About (mission/vision/values + image), Services (6 cards with icon lookup by name from lucide-react), FeaturedServices (alternating rows), Portfolio (project cards with modal detail), Gallery (autoplay slider w/ arrows using embla), WhyChooseUs (icon cards), Pricing (individual €50 cards + package €270 highlighted with "You Save €30"), Testimonials (embla slider), FAQ (shadcn accordion), FinalCTA, Contact (2-col with form using react-hook-form + zod).

## Ordering modal

Shadcn `Dialog`. Opens on any Order / Get Started / Buy Package CTA via `useOrder()` context. Five steps with Framer Motion transitions:

1. Service select — 6 cards, live total, auto-swap to €270 package + "You Save €30" badge when all 6 chosen.
2. Customer info — validated form.
3. Order summary — subtotal, discount, total.
4. Payment method — 5 UI-only options, selection updates state.
5. Success — thank-you, list, total, generated order number (`TPM-XXXXXX`).

`services/order.ts` exposes `submitOrder(payload): Promise<{orderNumber: string}>` — currently local, later an API call.

## Theming, SEO, responsiveness

- Theme toggle stored in `localStorage`, applied via `.dark` class on `<html>`; read inside `useEffect` to avoid hydration mismatch.
- `__root.tsx` head: real title/description/OG/Twitter for Ten Piece Marketing.
- Single H1 in Hero, semantic sections, alt text from JSON, lazy-loaded images.
- Mobile-first with grid → flex responsive pattern for header rows.

## Content in `data.json`

Populated with realistic placeholder copy for a marketing agency covering: agency info, hero, trustedBy (logos + 4 stats), about (story/mission/vision/3 values), 6 services (SEO, Social Media, Content, Paid Ads, Branding, Web Design — each €50, image, icon name, features), 3 featured services, 4 projects, 8 gallery images, 4 whyChooseUs items, pricing (individual + package), 5 testimonials, 8 FAQs, contact info, socials, navigation, footer.

Images use Unsplash URLs (agency/marketing themed) — no image generation to keep build fast; can be swapped for generated hero later if desired.

## Dependencies to add

`framer-motion`, `embla-carousel-react`, `react-hook-form`, `@hookform/resolvers`, `zod` (most may already be present — verified at build time).

## Out of scope

Real payments, real email sending, backend, auth, Lovable Cloud. Everything simulated in the service layer with clear extension points.
