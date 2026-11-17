import Link from "next/link";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { ui, asset, type Locale } from "@/lib/i18n";
import { experience, capabilities, background, profile } from "@/content/site";
import { projects, getProject, type Project } from "@/content/projects";
import { SystemDiagram } from "./SystemDiagram";
import { PidSimulator } from "./PidSimulator";
import { TrajectoryVisual } from "./TrajectoryVisual";
import { Linkedin, Github } from "./BrandIcons";

const wrap = "mx-auto max-w-[1320px] px-5 sm:px-8";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <ArrowUpRight
      size={18}
      strokeWidth={1.75}
      aria-hidden
      className={`shrink-0 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${className}`}
    />
  );
}

export function techLine(stack: string[], max = 6) {
  return stack.slice(0, max).join(", ");
}

/* --------------------------------------------------------------- Capabilities */

export function CapabilitiesSection({ locale }: { locale: Locale }) {
  const t = ui[locale].capabilities;
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="border-t border-line py-24 sm:py-32">
      <div className={wrap}>
        <h2 id="expertise-title" className="max-w-[16ch] text-title font-medium text-fg">
          {t.title}
        </h2>
        <ul className="mt-14 border-t border-line sm:mt-20">
          {capabilities.map((c) => (
            <li
              key={c.name.fr}
              className="grid gap-x-8 gap-y-2 border-b border-line py-6 md:grid-cols-12 md:items-baseline md:py-7"
            >
              <h3 className="text-xl font-medium tracking-[-0.01em] text-fg md:col-span-4 lg:text-2xl">{c.name[locale]}</h3>
              <p className="text-fg-muted md:col-span-5">{c.tools[locale]}</p>
              <p className="flex flex-wrap gap-x-4 gap-y-1 text-[0.9375rem] md:col-span-3 md:justify-end">
                <span className="sr-only">{t.proof} : </span>
                {c.proof.map((slug) => {
                  const p = getProject(slug);
                  if (!p) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/${locale}/projects/${slug}/`}
                      className="text-fg-subtle underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-fg-muted"
                    >
                      {shortTitle(p, locale)}
                    </Link>
                  );
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function shortTitle(p: Project, locale: Locale) {
  const short: Record<string, { fr: string; en: string }> = {
    "plateforme-iot-edge-cloud": { fr: "Cascadya", en: "Cascadya" },
    nalen: { fr: "NALEN", en: "NALEN" },
    "gimbal-2-axes-esp32": { fr: "Gimbal", en: "Gimbal" },
    "robotique-mobile-ros": { fr: "ROS", en: "ROS" },
    "traitement-signal-dspic": { fr: "dsPIC", en: "dsPIC" },
    "linux-embarque-raspberry-pi": { fr: "Raspberry Pi", en: "Raspberry Pi" },
    "robot-abb-irb120": { fr: "ABB IRB120", en: "ABB IRB120" },
  };
  return short[p.slug]?.[locale] ?? p.title[locale];
}

/* ------------------------------------------------------------------- Projects */

function Spread({ p, locale, flip }: { p: Project; locale: Locale; flip: boolean }) {
  const t = ui[locale].projects;
  const href = `/${locale}/projects/${p.slug}/`;
  const meta = [p.context?.[locale], p.period?.[locale]].filter(Boolean).join(", ");

  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className={`lg:col-span-7 xl:col-span-8 ${flip ? "lg:order-2" : ""}`}>
        {p.showcase === "pid" ? (
          <PidSimulator locale={locale} />
        ) : (
          <Link href={href} className="group block" tabIndex={-1} aria-hidden>
            <div className="plate rounded-[24px] p-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 sm:p-8 lg:p-10">
              <SystemDiagram diagram={p.diagrams[p.slug === "plateforme-iot-edge-cloud" ? 1 : 0]} locale={locale} id={`spread-${p.slug}`} decorative stackBelow="md" />
            </div>
          </Link>
        )}
        {p.showcase === "pid" && (
          <p className="mt-4 max-w-[60ch] text-[0.9375rem] leading-relaxed text-fg-subtle">{ui[locale].pid.caption}</p>
        )}
      </div>

      <div className={`lg:col-span-5 xl:col-span-4 ${flip ? "lg:order-1" : ""}`}>
        <h3 className="text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-fg">
          <Link href={href} className="hover:underline hover:decoration-line-strong hover:underline-offset-[6px]">
            {p.title[locale]}
          </Link>
        </h3>
        <p className="mt-2 text-[0.9375rem] text-fg-subtle">{meta}</p>
        <p className="mt-6 text-lg leading-relaxed text-fg-muted">{p.summary[locale]}</p>
        <p className="mt-6 text-[0.9375rem] leading-relaxed text-fg-subtle">
          <span className="sr-only">{t.stack} : </span>
          {techLine(p.stack, p.showcase === "pid" ? 4 : 7)}
        </p>
        <Link href={href} className="group mt-8 inline-flex min-h-11 items-center gap-1.5 font-medium text-fg">
          {t.read}
          <Arrow />
        </Link>
      </div>
    </article>
  );
}

function SmallVisual({ p, locale }: { p: Project; locale: Locale }) {
  if (p.slug === "robot-abb-irb120") return <TrajectoryVisual locale={locale} />;
  if (p.diagrams[0])
    return (
      <div className="mx-auto" style={{ maxWidth: `${p.diagrams[0].cols * 140}px` }}>
        <SystemDiagram diagram={p.diagrams[0]} locale={locale} id={`card-${p.slug}`} decorative animated={false} stackBelow="never" />
      </div>
    );
  return null;
}

export function ProjectsSection({ locale }: { locale: Locale }) {
  const t = ui[locale].projects;
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 sm:py-32">
      <div className={wrap}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="projects-title" className="text-title font-medium text-fg">
            {t.title}
          </h2>
          <p className="max-w-[34ch] text-lg text-fg-muted md:text-right">{t.lead}</p>
        </div>

        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {featured.map((p, i) => (
            <Spread key={p.slug} p={p} locale={locale} flip={i % 2 === 1} />
          ))}
        </div>

        <h3 className="mt-28 text-2xl font-medium tracking-[-0.015em] text-fg sm:mt-36">{t.others}</h3>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {others.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${locale}/projects/${p.slug}/`}
                className="group flex h-full flex-col rounded-[20px] border border-line bg-ink-2 p-3 transition-colors duration-300 hover:border-line-strong"
              >
                <div className="plate flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[14px] px-6 py-6 sm:px-10">
                  <div className="w-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.02]">
                    <SmallVisual p={p} locale={locale} />
                  </div>
                </div>
                <div className="flex flex-1 items-start justify-between gap-4 px-3 pb-3 pt-5">
                  <span>
                    <span className="block text-xl font-medium tracking-[-0.01em] text-fg">{p.title[locale]}</span>
                    <span className="mt-2 block leading-relaxed text-fg-muted">{p.summary[locale]}</span>
                  </span>
                  <Arrow className="mt-1 text-fg-muted" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Experience */

export function ExperienceSection({ locale }: { locale: Locale }) {
  const t = ui[locale].experience;
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line py-24 sm:py-32">
      <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:gap-8`}>
        <div className="lg:col-span-4">
          <h2 id="experience-title" className="text-title font-medium text-fg lg:sticky lg:top-28">
            {t.title}
          </h2>
        </div>
        <ol className="space-y-16 lg:col-span-8">
          {experience.map((job) => (
            <li key={job.company}>
              <p className="tabular text-[0.9375rem] text-fg-subtle">
                {job.period[locale]}, {job.location[locale]}
              </p>
              <h3 className="mt-2 text-2xl font-medium tracking-[-0.015em] text-fg sm:text-3xl">
                {job.title[locale]}
              </h3>
              <p className="mt-1 text-fg-muted">
                {job.company}, {job.contract[locale].charAt(0).toLowerCase() + job.contract[locale].slice(1)}
              </p>

              <dl className={`mt-8 grid gap-x-10 gap-y-7 ${job.groups.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {job.groups.map((g) => (
                  <div key={g.label.fr} className="border-t border-line pt-4">
                    <dt className="font-medium text-fg">{g.label[locale]}</dt>
                    <dd className="mt-2 text-[0.9688rem] leading-relaxed text-fg-muted">{g.items[locale][0]}</dd>
                  </div>
                ))}
              </dl>

              {job.caseStudy && (
                <Link
                  href={`/${locale}/projects/${job.caseStudy}/`}
                  className="group mt-8 inline-flex min-h-11 items-center gap-1.5 font-medium text-fg"
                >
                  {t.caseStudy}
                  <Arrow />
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Background */

export function BackgroundSection({ locale }: { locale: Locale }) {
  const t = ui[locale].background;
  return (
    <section id="background" aria-labelledby="background-title" className="bg-ink-2 py-24 sm:py-28">
      <div className={wrap}>
        <h2 id="background-title" className="text-title font-medium text-fg">
          {t.title}
        </h2>
        <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h3 className="text-[0.9375rem] text-fg-subtle">{t.education}</h3>
            <ol className="mt-4 space-y-6">
              {background.education.map((e) => (
                <li key={e.school} className="border-t border-line pt-5">
                  <p className="text-xl font-medium tracking-[-0.01em] text-fg">{e.school}</p>
                  <p className="mt-1 text-fg-muted">{e.degree[locale]}</p>
                  <p className="tabular mt-1 text-[0.9375rem] text-fg-subtle">{e.period}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-4 lg:col-start-7">
            <h3 className="text-[0.9375rem] text-fg-subtle">{t.certifications}</h3>
            <ul className="mt-4 space-y-4">
              {background.certifications.map((c) => (
                <li key={c.name} className="border-t border-line pt-4">
                  <span className="block text-fg">{c.name}</span>
                  <span className="tabular block text-[0.9375rem] text-fg-subtle">
                    {c.issuer}
                    {c.year && `, ${c.year}`}
                  </span>
                </li>
              ))}
            </ul>
            <h3 className="mt-10 text-[0.9375rem] text-fg-subtle">{t.involvement}</h3>
            <ul className="mt-4 space-y-3">
              {background.involvement[locale].map((item) => (
                <li key={item} className="border-t border-line pt-3 text-fg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 lg:col-start-11">
            <h3 className="text-[0.9375rem] text-fg-subtle">{t.languages}</h3>
            <dl className="mt-4 space-y-4">
              {background.languages[locale].map((l) => (
                <div key={l.name} className="border-t border-line pt-4">
                  <dt className="text-fg">{l.name}</dt>
                  <dd className="text-[0.9375rem] text-fg-subtle">{l.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- Contact */

export function ContactSection({ locale }: { locale: Locale }) {
  const t = ui[locale].contact;
  const secondary =
    "group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line-strong px-5 font-medium text-fg transition-colors duration-200 hover:border-fg-subtle hover:bg-surface";
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-28 sm:py-40">
      <div className={wrap}>
        <h2 id="contact-title" className="max-w-[14ch] text-[clamp(2.6rem,1.4rem+4vw,5rem)] font-medium leading-[1.0] tracking-[-0.035em] text-fg">
          {t.title}
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[48ch] text-lg leading-relaxed text-fg-muted lg:col-span-6">{t.lead}</p>
          <div className="lg:col-span-6 lg:justify-self-end">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-medium text-fg underline decoration-line-strong underline-offset-[10px] transition-colors hover:decoration-live"
            >
              <Mail size={24} strokeWidth={1.5} aria-hidden className="text-fg-muted" />
              <span className="sr-only">{t.email} : </span>
              {profile.email}
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={secondary}>
            <Linkedin size={17} strokeWidth={1.75} />
            {t.linkedin}
            <Arrow className="text-fg-muted" />
          </a>
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={secondary}>
              <Github size={17} strokeWidth={1.75} />
              GitHub
              <Arrow className="text-fg-muted" />
            </a>
          )}
          <a href={asset(profile.cv)} download className={secondary}>
            <Download size={17} strokeWidth={1.75} aria-hidden />
            {t.cv}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale].footer;
  return (
    <footer className="border-t border-line">
      <div className={`${wrap} flex flex-col gap-3 py-10 text-[0.875rem] text-fg-subtle sm:flex-row sm:items-center sm:justify-between`}>
        <p>
          © {new Date().getFullYear()} {profile.name}. {t.built}
        </p>
        <a href="#main" className="inline-flex min-h-11 items-center hover:text-fg">
          {t.top}
        </a>
      </div>
    </footer>
  );
}
