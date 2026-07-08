import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/common/Reveal";
import { Icon } from "@/components/common/Icon";
import { site } from "@/services/data";
import { motion } from "framer-motion";

export function About() {
  const { about } = site;
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-start md:gap-16">
          <div>
            <Reveal>
              <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
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
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.15}>
                <Card title="Our mission" body={about.mission} />
              </Reveal>
              <Reveal delay={0.2}>
                <Card title="Our vision" body={about.vision} />
              </Reveal>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, clipPath: "inset(10% 10% 10% 10%)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-3xl border border-border"
          >
            <img
              src={about.image}
              alt={about.imageAlt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {about.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.3)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-foreground">
                  <Icon name={v.icon} size={18} />
                </span>
                <h3 className="font-display mt-5 text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-5">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{body}</p>
    </div>
  );
}
