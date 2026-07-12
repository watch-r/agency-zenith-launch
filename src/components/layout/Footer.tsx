import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/common/Icon";
import { Logo } from "@/components/common/Logo";
import { Link } from "@tanstack/react-router";
import { site } from "@/services/data";

export function Footer() {
  const { footer, socials } = site;
  const isInternal = (href: string) => href.startsWith("/");

  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <Container className="py-14">
        {/* Top: brand + socials (Follow moved from Contact) */}
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="max-w-md">
            <Logo size={36} showWordmark />
            <p className="mt-4 text-sm text-muted-foreground">{footer.tagline}</p>
          </div>
          <div className="md:justify-self-end md:text-right">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Follow
            </div>
            <div className="mt-3 flex items-center gap-2 md:justify-end">
              {socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-brand-deep elev-1 transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:elev-2"
                >
                  <Icon name={s.icon} size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Columns — 2 per row on mobile, 3 on desktop */}
        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((l) =>
                  isInternal(l.href) ? (
                    <li key={l.label}>
                      <Link
                        to={l.href}
                        className="text-foreground/80 transition-colors hover:text-brand"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-foreground/80 transition-colors hover:text-brand"
                      >
                        {l.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>{footer.copyright}</div>
          <div className="flex items-center gap-4">
            {footer.legalLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className="hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <span>·</span>
            <span>Made with care in Amsterdam.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
