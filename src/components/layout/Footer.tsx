import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/common/Icon";
import { Logo } from "@/components/common/Logo";
import { site } from "@/services/data";

export function Footer() {
  const { footer, socials } = site;
  return (
    <footer className="border-t border-border/60 bg-background">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo size={36} showWordmark />

            <p className="mt-4 text-sm text-muted-foreground">{footer.tagline}</p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <Icon name={s.icon} size={15} />
                </a>
              ))}
            </div>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-foreground/80 hover:text-foreground">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Legal</div>
            <ul className="mt-4 space-y-2 text-sm">
              {footer.legalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-foreground/80 hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>{footer.copyright}</div>
          <div>Made with care in Amsterdam.</div>
        </div>
      </Container>
    </footer>
  );
}
