import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/common/Icon";
import { Logo } from "@/components/common/Logo";
import { Link } from "@tanstack/react-router";
import { site } from "@/services/data";

export function Footer() {
  const { footer, socials, contact, agency } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-deep/15 bg-gradient-to-b from-brand-soft/50 via-secondary/40 to-background dark:from-brand-soft/20">
      <Container className="py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div className="max-w-md">
            <Logo size={40} showWordmark />
            <p className="mt-3 text-sm text-muted-foreground">{footer.tagline}</p>
            <p className="mt-1 text-xs text-muted-foreground/80">
              {contact.address}
            </p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-deep/20 bg-card text-brand-deep elev-1 transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:elev-2"
              >
                <Icon name={s.icon} size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-brand-deep/10 pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>
            © {year} {agency.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {footer.legalLinks.map((l) => (
              <Link key={l.label} to={l.href} className="hover:text-foreground">
                {l.label}
              </Link>
            ))}
            <span className="hidden sm:inline">·</span>
            <span>
              Crafted by{" "}
              <a
                href="https://yum.studio"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-foreground/90 transition-colors hover:text-brand"
              >
                YUM Studio
              </a>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
