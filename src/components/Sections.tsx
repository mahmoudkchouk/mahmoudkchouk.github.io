import Link from "next/link";
import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { Linkedin, Github } from "./BrandIcons";
import { ui, asset, type Locale } from "@/lib/i18n";
import { experience, skills, background, profile } from "@/content/site";
import { projects } from "@/content/projects";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

function SectionHead({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
      <h2 id={`${id}-title`} className="font-display text-4xl font-semibold tracking-[-0.02em] text-fg sm:text-5xl lg:col-span-5">
        {title}
      </h2>
      {intro && <p className="max-w-[56ch] text-lg text-fg-muted lg:col-span-6 lg:col-start-7 lg:pt-3">{intro}</p>}
    </div>
  );
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-md border border-line px-2 py-0.5 text-[0.8125rem] leading-6 text-fg-muted">{children}</li>
  );
}

/* ---------------------------------------------------------------- Experience */

export function ExperienceSection({ locale }: { locale: Locale }) {
  const t = ui[locale].experience;
  return (
    <Section id="experience">
      <SectionHead id="experience" title={t.title} intro={t.intro} />
      <ol className="mt-16 sm:mt-20">
        {experience.map((job, i) => (
          <li
            key={job.company}
            className={`grid gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-8 ${i === 0 ? "lg:py-14" : ""}`}
          >
            <div className="lg:col-span-4">
              <p className="tabular text-[0.9375rem] text-fg-muted">{job.period[locale]}</p>
              <p className="mt-2 font-display text-3xl font-semibold tracking-[-0.015em] text-fg">{job.company}</p>
              <p className="mt-1 text-[0.9375rem] text-fg-subtle">{job.location[locale]}</p>
            </div>
            <div className="lg:col-span-8">
              <h3 className="font-display text-2xl font-medium tracking-[-0.01em] text-fg">{job.title[locale]}</h3>
              <p className="mt-1 text-fg-muted">{job.contract[locale]}</p>

              <div className={`mt-8 grid gap-x-10 gap-y-8 ${job.groups.length > 1 ? "md:grid-cols-2" : ""}`}>
                {job.groups.map((g) => (
                  <div key={g.label.fr}>
                    <h4 className="font-medium text-fg">{g.label[locale]}</h4>
                    <ul className="mt-3 space-y-3">
                      {g.items[locale].map((item) => (
                        <li key={item} className="text-[0.9844rem] leading-relaxed text-fg-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {job.stack.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
                  {job.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </ul>
              )}

              {job.caseStudy && (
                <Link
                  href={`/${locale}/projects/${job.caseStudy}/`}
                  className="mt-8 inline-flex min-h-11 items-center gap-1.5 font-medium text-fg underline decoration-line-strong hover:decoration-fg"
                >
                  {t.caseStudy}
                  <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden />
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------ Projects */

export function ProjectsSection({ locale }: { locale: Locale }) {
  const t = ui[locale].projects;
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" className="border-t border-line bg-surface/40">
      <SectionHead id="projects" title={t.title} intro={t.intro} />

      <ul className="mt-16 grid gap-6 sm:mt-20 lg:grid-cols-2">
        {featured.map((p, i) => {
          const wide = i === 0;
          return (
            <li key={p.slug} className={wide ? "lg:col-span-2" : ""}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-ground transition-colors duration-300 hover:border-line-strong">
                {p.diagrams[0] && (
                  <div className={`hidden border-b border-line bg-surface/60 sm:block ${wide ? "px-6 py-8 sm:px-10 sm:py-12" : "px-6 py-8"}`}>
                    <ArchitectureDiagram diagram={p.diagrams[0]} locale={locale} id={`card-${p.slug}`} compact />
                  </div>
                )}
                <div className={`flex flex-1 flex-col p-6 sm:p-8 ${wide ? "lg:grid lg:grid-cols-12 lg:gap-8 lg:p-10" : ""}`}>
                  <div className={wide ? "lg:col-span-7" : ""}>
                    <p className="tabular text-[0.875rem] text-fg-subtle">
                      {[p.context?.[locale], p.period?.[locale]].filter(Boolean).join(", ")}
                    </p>
                    <h3 className={`mt-3 font-display font-semibold tracking-[-0.015em] text-fg ${wide ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
                      <Link href={`/${locale}/projects/${p.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">
                        {p.title[locale]}
                      </Link>
                    </h3>
                    <p className="mt-4 max-w-[56ch] leading-relaxed text-fg-muted">{p.summary[locale]}</p>
                  </div>
                  <div className={`flex flex-1 flex-col ${wide ? "lg:col-span-5 lg:pt-8" : ""}`}>
                    <ul className={`mt-6 flex flex-wrap gap-2 ${wide ? "lg:mt-0" : ""}`} aria-label={t.stack}>
                      {p.stack.slice(0, wide ? 10 : 5).map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-8 font-medium text-fg">
                      {t.read}
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.75}
                        aria-hidden
                        className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-signal group-has-[a:focus-visible]:ring-2"
                  />
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <h3 className="mt-20 font-display text-2xl font-medium text-fg">{t.others}</h3>
      <ul className="mt-6 border-t border-line">
        {others.map((p) => (
          <li key={p.slug} className="border-b border-line">
            <Link
              href={`/${locale}/projects/${p.slug}/`}
              className="group grid gap-2 py-6 transition-colors duration-200 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-3 sm:hover:bg-surface"
            >
              <span className="font-display text-xl font-medium text-fg sm:col-span-5">{p.title[locale]}</span>
              <span className="text-[0.9844rem] text-fg-muted sm:col-span-5">{p.summary[locale]}</span>
              <span className="flex items-center justify-between gap-3 text-[0.875rem] text-fg-subtle sm:col-span-2 sm:justify-end">
                <span className="tabular">{p.period?.[locale] ?? p.context?.[locale]}</span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.75}
                  aria-hidden
                  className="text-fg-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ----------------------------------------------------------------- Expertise */

export function ExpertiseSection({ locale }: { locale: Locale }) {
  const t = ui[locale].expertise;
  return (
    <Section id="expertise" className="border-t border-line">
      <SectionHead id="expertise" title={t.title} intro={t.intro} />
      <ul className="mt-16 grid gap-x-10 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((d) => (
          <li key={d.name.fr} className="border-t border-line py-8">
            <h3 className="font-display text-xl font-medium text-fg">{d.name[locale]}</h3>
            <p className="mt-2 text-[0.9844rem] leading-relaxed text-fg-muted">{d.summary[locale]}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${d.name[locale]} : outils`}>
              {d.tools.map((tool) => (
                <Tag key={tool}>{tool}</Tag>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------------------------------------------------------- Background */

export function BackgroundSection({ locale }: { locale: Locale }) {
  const t = ui[locale].background;
  return (
    <Section id="background" className="border-t border-line">
      <SectionHead id="background" title={t.title} />
      <div className="mt-16 grid gap-16 sm:mt-20 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-14 lg:col-span-6">
          <div>
            <h3 className="font-medium text-fg-muted">{t.education}</h3>
            <ol className="mt-4">
              {background.education.map((e) => (
                <li key={e.school} className="border-t border-line py-6">
                  <p className="tabular text-[0.9375rem] text-fg-subtle">{e.period}</p>
                  <p className="mt-1 font-display text-2xl font-medium tracking-[-0.01em] text-fg">{e.school}</p>
                  <p className="mt-1 text-fg-muted">{e.degree[locale]}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="font-medium text-fg-muted">{t.involvement}</h3>
            <ul className="mt-4 space-y-3">
              {background.involvement[locale].map((item) => (
                <li key={item} className="border-t border-line pt-3 text-fg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-14 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:grid-cols-1">
          <div>
            <h3 className="font-medium text-fg-muted">{t.certifications}</h3>
            <ul className="mt-4 space-y-3">
              {background.certifications.map((c) => (
                <li key={c.name} className="border-t border-line pt-3">
                  <span className="block text-fg">{c.name}</span>
                  <span className="tabular block text-[0.9375rem] text-fg-subtle">
                    {c.issuer}
                    {c.year && `, ${c.year}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-fg-muted">{t.languages}</h3>
            <dl className="mt-4 space-y-3">
              {background.languages[locale].map((l) => (
                <div key={l.name} className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
                  <dt className="text-fg">{l.name}</dt>
                  <dd className="text-[0.9375rem] text-fg-subtle">{l.level}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="font-medium text-fg-muted">{t.interests}</h3>
            <p className="mt-4 border-t border-line pt-3 text-fg">{background.interests[locale]}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------- Contact */

export function ContactSection({ locale }: { locale: Locale }) {
  const t = ui[locale].contact;
  return (
    <Section id="contact" className="border-t border-line">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h2 id="contact-title" className="font-display text-5xl font-semibold tracking-[-0.025em] text-fg sm:text-6xl">
            {t.title}
          </h2>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-fg-muted">{t.lead}</p>
          <p className="mt-6 flex items-center gap-2 text-[0.9375rem] text-fg-subtle">
            <MapPin size={16} strokeWidth={1.75} aria-hidden />
            {t.location}
          </p>
        </div>
        <ul className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="flex min-h-14 items-center justify-between gap-4 rounded-lg bg-fg px-5 font-medium text-ground transition-colors duration-200 hover:bg-white"
            >
              <span className="flex items-center gap-3">
                <Mail size={18} strokeWidth={1.75} aria-hidden />
                {t.email}
              </span>
              <span className="truncate text-[0.875rem] font-normal opacity-70">{profile.email}</span>
            </a>
          </li>
          <li>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-between gap-4 rounded-lg border border-line-strong px-5 font-medium text-fg transition-colors duration-200 hover:bg-surface"
            >
              <span className="flex items-center gap-3">
                <Linkedin size={18} strokeWidth={1.75} aria-hidden />
                {t.linkedin}
              </span>
              <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden className="text-fg-muted" />
            </a>
          </li>
          {profile.github && (
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-between gap-4 rounded-lg border border-line-strong px-5 font-medium text-fg transition-colors duration-200 hover:bg-surface"
              >
                <span className="flex items-center gap-3">
                  <Github size={18} strokeWidth={1.75} aria-hidden />
                  GitHub
                </span>
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden className="text-fg-muted" />
              </a>
            </li>
          )}
          <li>
            <a
              href={asset(profile.cv)}
              download
              className="flex min-h-14 items-center justify-between gap-4 rounded-lg border border-line-strong px-5 font-medium text-fg transition-colors duration-200 hover:bg-surface"
            >
              <span className="flex items-center gap-3">
                <Download size={18} strokeWidth={1.75} aria-hidden />
                {t.cv}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale].footer;
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-10 text-[0.875rem] text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>{t.built}</p>
      </div>
    </footer>
  );
}
