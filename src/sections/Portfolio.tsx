import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { site } from "@/services/data";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/types";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function Portfolio() {
  const { projects } = site;
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="A quiet portfolio of loud results."
          description="A small window into recent projects. Each one measured, each one shipped."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.06}>
              <button
                type="button"
                onClick={() => setActive(p)}
                className="group block w-full overflow-hidden rounded-3xl border border-border bg-card text-left transition-all hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)]"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] opacity-80">
                        {p.industry}
                      </div>
                      <div className="font-display mt-1 text-2xl leading-tight sm:text-3xl">
                        {p.title}
                      </div>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 backdrop-blur transition-all group-hover:bg-white group-hover:text-foreground">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 px-6 py-4">
                  <span className="text-sm font-medium">{p.client}</span>
                  <span className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto p-0">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="relative">
                  <img
                    src={active.coverImage}
                    alt={active.title}
                    className="h-72 w-full object-cover"
                  />
                  <button
                    onClick={() => setActive(null)}
                    className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {active.industry} · {active.client}
                  </div>
                  <DialogTitle className="font-display mt-2 text-3xl leading-tight">
                    {active.title}
                  </DialogTitle>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <Block label="Challenge" body={active.challenge} />
                    <Block label="Solution" body={active.solution} />
                  </div>
                  <div className="mt-6">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Results
                    </div>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                      {active.results.map((r) => (
                        <li
                          key={r}
                          className="rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm font-medium"
                        >
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/85">{body}</p>
    </div>
  );
}
