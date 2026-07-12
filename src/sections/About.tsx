import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/common/Reveal";
import { Icon } from "@/components/common/Icon";
import { site } from "@/services/data";
import { motion } from "framer-motion";
import { Compass, Target } from "lucide-react";

export function About() {
  const { about } = site;
  return (
    <section id="about" className="py-20 md:py-28">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-stretch md:gap-14">
          {/* Text side */}
          <div className="flex flex-col">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <span className="h-px w-8 bg-foreground/30" />
                {about.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-4 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                {about.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {about.story}
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.15}>
                <MissionCard
                  icon={<Target size={18} />}
                  label="Our mission"
                  body={about.mission}
                  tone="brand"
                />
              </Reveal>
              <Reveal delay={0.2}>
                <MissionCard
                  icon={<Compass size={18} />}
                  label="Our vision"
                  body={about.vision}
                  tone="deep"
                />
              </Reveal>
            </div>

            {/* Values row */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {about.values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.05}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-5 elev-1 transition-all duration-300 hover:-translate-y-1 hover:elev-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand-deep">
                      <Icon name={v.icon} size={16} />
                    </span>
                    <h3 className="font-display mt-4 text-lg">{v.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {v.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Long image */}
          <motion.div
            initial={{ opacity: 0, y: 40, clipPath: "inset(10% 10% 10% 10%)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[36rem] overflow-hidden rounded-[2rem] border border-border elev-3 md:min-h-full"
          >
            <img
              src={about.image}
              alt={about.imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-background/85 p-4 backdrop-blur-md elev-2">
              <div className="text-[10px] uppercase tracking-[0.24em] text-brand-deep">
                Ten people. One studio.
              </div>
              <div className="font-display mt-1 text-lg leading-tight">
                Senior-led, close-quartered, honest work.
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function MissionCard({
  icon,
  label,
  body,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  body: string;
  tone: "brand" | "deep";
}) {
  return (
    <div
      className={
        "group relative overflow-hidden rounded-2xl p-5 elev-2 transition-all duration-300 hover:-translate-y-1 hover:elev-4 " +
        (tone === "brand"
          ? "bg-gradient-to-br from-brand-light via-background to-brand-soft border border-brand/25"
          : "bg-gradient-to-br from-brand-deep to-[#0a2f6b] text-white border border-brand-deep/40")
      }
    >
      <div
        className={
          "absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125 " +
          (tone === "brand" ? "bg-brand/25" : "bg-brand/40")
        }
      />
      <div className="relative">
        <span
          className={
            "inline-grid h-10 w-10 place-items-center rounded-xl " +
            (tone === "brand"
              ? "bg-white/90 text-brand-deep elev-1"
              : "bg-white/15 text-white ring-1 ring-white/25")
          }
        >
          {icon}
        </span>
        <div
          className={
            "mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] " +
            (tone === "brand" ? "text-brand-deep/80" : "text-brand-light")
          }
        >
          {label}
        </div>
        <p
          className={
            "mt-2 text-sm leading-relaxed " +
            (tone === "brand" ? "text-foreground/90" : "text-white/90")
          }
        >
          {body}
        </p>
      </div>
    </div>
  );
}
