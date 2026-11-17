import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { isLocale, locales, ui, type Locale } from "@/lib/i18n";
import { getProject, projects } from "@/content/projects";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Tag } from "@/components/Sections";

type Params = Promise<{ locale: string; slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getProject(slug);
  if (!p || !isLocale(locale)) return {};
  return {
    title: p.title[locale],
    description: p.summary[locale],
    alternates: {
      canonical: `/${locale}/projects/${slug}/`,
      languages: { fr: `/fr/projects/${slug}/`, en: `/en/projects/${slug}/` },
    },
    openGraph: { title: p.title[locale], description: p.summary[locale], url: `/${locale}/projects/${slug}/` },
  };
}

export default async function CaseStudy({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const p = getProject(slug);
  if (!p) notFound();
  const t = ui[locale].caseStudy;
  const tp = ui[locale].projects;

  const index = projects.findIndex((x) => x.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const meta = [
    p.period && { k: tp.period, v: p.period[locale] },
    p.context && { k: tp.context, v: p.context[locale] },
    { k: tp.domain, v: p.domain[locale] },
  ].filter(Boolean) as { k: string; v: string }[];

  const toc = [
    { id: "objective", label: t.objective },
    { id: "work", label: t.work },
    ...(p.diagrams.length ? [{ id: "architecture", label: t.architecture }] : []),
    { id: "stack", label: t.stack },
  ];

  return (
    <article className="pb-24 pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Link
          href={`/${locale}/#projects`}
          className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
          {t.back}
        </Link>

        <header className="mt-8">
          <h1 className="max-w-[18ch] font-display text-5xl font-semibold leading-[1.02] tracking-[-0.025em] text-fg sm:text-6xl">
            {p.title[locale]}
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-fg-muted sm:text-xl">{p.summary[locale]}</p>

          {/* Document title block */}
          <dl className={`mt-12 grid overflow-hidden rounded-[10px] border border-line ${meta.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {meta.map((m, i) => (
              <div
                key={m.k}
                className={`px-5 py-4 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""}`}
              >
                <dt className="text-[0.8125rem] text-fg-subtle">{m.k}</dt>
                <dd className="tabular mt-1 text-fg">{m.v}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <nav aria-label={locale === "fr" ? "Sommaire" : "Contents"} className="hidden lg:col-span-3 lg:block">
            <ol className="sticky top-28 space-y-1 border-l border-line">
              {toc.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[0.9375rem] text-fg-muted transition-colors hover:border-fg-muted hover:text-fg"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 lg:col-span-9">
            <section id="objective" aria-labelledby="objective-title">
              <h2 id="objective-title" className="font-display text-3xl font-semibold tracking-[-0.015em] text-fg">
                {t.objective}
              </h2>
              <p className="measure mt-4 text-lg leading-relaxed text-fg-muted">{p.objective[locale]}</p>
            </section>

            <section id="work" aria-labelledby="work-title" className="mt-16">
              <h2 id="work-title" className="font-display text-3xl font-semibold tracking-[-0.015em] text-fg">
                {t.work}
              </h2>
              <ul className="measure mt-6 space-y-4">
                {p.work[locale].map((w) => (
                  <li key={w} className="relative pl-6 leading-relaxed text-fg-muted">
                    <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-3 bg-fg-subtle" />
                    {w}
                  </li>
                ))}
              </ul>
            </section>

            {p.diagrams.length > 0 && (
              <section id="architecture" aria-labelledby="architecture-title" className="mt-16">
                <h2 id="architecture-title" className="font-display text-3xl font-semibold tracking-[-0.015em] text-fg">
                  {t.architecture}
                </h2>
                {p.diagrams.map((d, i) => (
                  <figure key={i} className="mt-8">
                    <div
                      className="group overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface/50 p-5 sm:p-8"
                      tabIndex={0}
                      aria-label={`${t.figure} ${i + 1}. ${t.scrollHint}`}
                    >
                      <ArchitectureDiagram diagram={d} locale={locale} id={`fig-${p.slug}-${i}`} live />
                    </div>
                    <figcaption className="mt-3 text-[0.9375rem] text-fg-subtle">
                      <span className="text-fg-muted">
                        {t.figure} {i + 1}.
                      </span>{" "}
                      {d.caption[locale]}
                    </figcaption>
                  </figure>
                ))}
              </section>
            )}

            <section id="stack" aria-labelledby="stack-title" className="mt-16">
              <h2 id="stack-title" className="font-display text-3xl font-semibold tracking-[-0.015em] text-fg">
                {t.stack}
              </h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </ul>
            </section>

            <nav
              aria-label={locale === "fr" ? "Autres projets" : "More projects"}
              className="mt-24 grid gap-3 border-t border-line pt-8 sm:grid-cols-2"
            >
              <Link
                href={`/${locale}/projects/${prev.slug}/`}
                className="group rounded-lg border border-line p-5 transition-colors hover:border-line-strong hover:bg-surface"
              >
                <span className="flex items-center gap-2 text-[0.875rem] text-fg-subtle">
                  <ArrowLeft size={16} strokeWidth={1.75} aria-hidden /> {t.prev}
                </span>
                <span className="mt-2 block font-display text-xl font-medium text-fg">{prev.title[locale]}</span>
              </Link>
              <Link
                href={`/${locale}/projects/${next.slug}/`}
                className="group rounded-lg border border-line p-5 text-right transition-colors hover:border-line-strong hover:bg-surface"
              >
                <span className="flex items-center justify-end gap-2 text-[0.875rem] text-fg-subtle">
                  {t.next} <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
                </span>
                <span className="mt-2 block font-display text-xl font-medium text-fg">{next.title[locale]}</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </article>
  );
}
