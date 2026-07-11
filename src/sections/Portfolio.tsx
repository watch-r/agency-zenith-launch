import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { site } from "@/services/data";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useState, useRef, type MouseEvent } from "react";
import type { Project } from "@/types";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function Portfolio() {
  const { projects } = site;
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 blur-3xl" />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow="Selected work"
          title="A quiet portfolio of loud results."
          description="Hover to peek inside. Click to dive in."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10">
          {projects.map((p, i) => (
            <TiltCard key={p.id} project={p} index={i} onOpen={() => setActive(p)} />
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
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 to-transparent" />
                  <button
                    onClick={() => setActive(null)}
                    className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="text-xs uppercase tracking-[0.2em] text-brand-deep">
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
                          className="rounded-2xl bg-gradient-to-br from-brand-light to-brand-soft px-4 py-3 text-sm font-medium text-brand-deep"
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

/* ---------- 3D tilt card ---------- */
function TiltCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className="group relative block w-full overflow-hidden rounded-[2rem] text-left"
    >
      <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-brand-deep shadow-[0_25px_60px_-20px_rgba(7,72,159,0.45)]">
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.08]"
          style={{ transform: "translateZ(0)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/95 via-brand-deep/30 to-transparent" />

        {/* Glow layer */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-x-8 top-8 h-40 rounded-full bg-brand/40 blur-3xl" />
        </div>

        {/* Tags floating (elevated in 3D) */}
        <div
          className="absolute right-5 top-5 flex flex-wrap justify-end gap-1.5"
          style={{ transform: "translateZ(40px)" }}
        >
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-deep backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Content bottom */}
        <div
          className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-[0.24em] text-brand-light">
              {project.industry} · {project.client}
            </div>
            <div className="font-display mt-2 text-2xl leading-tight sm:text-3xl">
              {project.title}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.results.slice(0, 2).map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
          <motion.span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-brand-deep shadow-lg"
            whileHover={{ rotate: 45 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowUpRight size={18} />
          </motion.span>
        </div>
      </div>
    </motion.button>
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
