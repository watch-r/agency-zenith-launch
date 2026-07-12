import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { site } from "@/services/data";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useState, useRef } from "react";
import type { Project } from "@/types";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const { projects } = site;
  const [active, setActive] = useState<Project | null>(null);
  const [focus, setFocus] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 blur-3xl" />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow="Selected work"
          title="A quiet portfolio of loud results."
          description="Hover a row to focus it — click any to dive in."
        />

        {/* SPLIT SHOWCASE — image mosaic left, project list right */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* Left: layered image stack that swaps on focus */}
          <div className="relative order-2 h-[28rem] lg:sticky lg:top-24 lg:order-1 lg:h-[34rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={projects[focus].id}
                initial={{ opacity: 0, scale: 1.05, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {/* Back layer (rotated) */}
                <div
                  className="absolute inset-4 rounded-[2rem] bg-brand-deep/10 elev-2"
                  style={{ transform: "rotate(-4deg)" }}
                />
                {/* Mid layer */}
                <div
                  className="absolute inset-2 overflow-hidden rounded-[2rem] elev-3"
                  style={{ transform: "rotate(2deg)" }}
                >
                  <img
                    src={projects[focus].coverImage}
                    alt=""
                    className="h-full w-full object-cover opacity-40 blur-sm"
                  />
                </div>
                {/* Front layer */}
                <button
                  onClick={() => setActive(projects[focus])}
                  className="relative block h-full w-full overflow-hidden rounded-[2rem] elev-4 ring-1 ring-brand-deep/15"
                >
                  <img
                    src={projects[focus].coverImage}
                    alt={projects[focus].title}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/20 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-brand-light">
                      {projects[focus].industry} · {projects[focus].client}
                    </div>
                    <div className="font-display mt-2 text-2xl leading-tight sm:text-3xl">
                      {projects[focus].title}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {projects[focus].results.slice(0, 3).map((r) => (
                        <span
                          key={r}
                          className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] backdrop-blur"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-brand-deep elev-2 transition-transform hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: interactive project list */}
          <div className="order-1 space-y-1 lg:order-2">
            {projects.map((p, i) => (
              <ProjectRow
                key={p.id}
                project={p}
                index={i}
                isActive={focus === i}
                onFocus={() => setFocus(i)}
                onOpen={() => setActive(p)}
              />
            ))}
          </div>
        </div>

        {/* Marquee — client names scrolling with page */}
        <div className="relative mt-20 overflow-hidden">
          <motion.div
            style={{ x: marqueeX }}
            className="flex whitespace-nowrap gap-12 font-display text-5xl uppercase tracking-tight text-brand-deep/10 sm:text-7xl"
          >
            {[...projects, ...projects, ...projects].map((p, i) => (
              <span key={`${p.id}-${i}`} className="shrink-0">
                {p.client} <span className="text-brand/30">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Detail dialog */}
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
                    className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur elev-2"
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
                          className="rounded-2xl bg-gradient-to-br from-brand-light to-brand-soft px-4 py-3 text-sm font-medium text-brand-deep elev-1"
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

function ProjectRow({
  project,
  index,
  isActive,
  onFocus,
  onOpen,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onFocus: () => void;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseEnter={onFocus}
      onFocus={onFocus}
      onClick={onOpen}
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500",
        isActive
          ? "border-brand-deep/30 bg-gradient-to-br from-brand-soft via-background to-brand-light/40 elev-2"
          : "border-transparent hover:border-border",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="text-[10px] uppercase tracking-[0.22em] text-brand-deep">
              {project.industry}
            </div>
          </div>
          <div className="font-display mt-2 text-xl leading-tight sm:text-2xl">
            {project.title}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider transition-colors",
                  isActive
                    ? "border-brand-deep/25 bg-white text-brand-deep"
                    : "border-border bg-background text-muted-foreground",
                )}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <motion.span
          animate={{ rotate: isActive ? 45 : 0, scale: isActive ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors",
            isActive
              ? "gradient-brand text-white elev-2"
              : "bg-secondary text-foreground",
          )}
        >
          <ArrowUpRight size={16} />
        </motion.span>
      </div>
      {/* Bottom hairline */}
      <div
        className={cn(
          "absolute inset-x-5 bottom-0 h-px transition-all duration-500",
          isActive ? "bg-brand-deep/20" : "bg-border",
        )}
      />
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
