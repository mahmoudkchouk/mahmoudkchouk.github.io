import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { isLocale, locales, ui, type Locale } from "@/lib/i18n";
import { getProject, projects } from "@/content/projects";
import { SystemDiagram } from "@/components/SystemDiagram";
import { PidSimulator } from "@/components/PidSimulator";
import { TrajectoryVisual } from "@/components/TrajectoryVisual";

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

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="grid gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-8">
      <h2 id={`${id}-title`} className="text-2xl font-medium tracking-[-0.015em] text-fg lg:col-span-4">
        {title}
      </h2>
      <div className="lg:col-span-8">{children}</div>
    </section>
  );
}

export default async function CaseStudy({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const p = getProject(slug);
  if (!p) notFound();
  const t = ui[locale].caseStudy;

  const index = projects.findIndex((x) => x.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const meta = [
    p.period && { k: t.period, v: p.period[locale] },
    p.context && { k: t.context, v: p.context[locale] },
    { k: t.domain, v: p.domain[locale] },
  ].filter(Boolean) as { k: string; v: string }[];

  // The lead visual: the interactive model for the gimbal, otherwise the first diagram.
  const leadDiagram = p.showcase === "pid" ? null : p.diagrams[0];
  const figures = p.showcase === "pid" ? p.diagrams : p.diagrams.slice(1);

  return (
    <article className="pb-10 pt-28 sm:pt-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <Link
          href={`/${locale}/#projects`}
          className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
          {t.back}
        </Link>

        <header className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <h1 className="max-w-[16ch] text-hero font-medium text-fg">{p.title[locale]}</h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-fg-muted sm:text-xl">{p.summary[locale]}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
            {meta.map((m) => (
              <div key={m.k}>
                <dt className="text-[0.875rem] text-fg-subtle">{m.k}</dt>
                <dd className="tabular mt-0.5 text-fg">{m.v}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-14 sm:mt-20">
          {p.showcase === "pid" ? (
            <>
              <PidSimulator locale={locale} />
              <p className="mt-4 max-w-[70ch] text-[0.9375rem] leading-relaxed text-fg-subtle">{ui[locale].pid.caption}</p>
            </>
          ) : leadDiagram ? (
            <figure>
              <div className="plate rounded-[24px] p-5 sm:p-10 lg:p-14">
                <SystemDiagram diagram={leadDiagram} locale={locale} id={`lead-${p.slug}`} stackBelow="md" />
              </div>
              <figcaption className="mt-4 max-w-[70ch] text-[0.9375rem] text-fg-subtle">
                <span className="text-fg-muted">{t.figure} 1.</span> {leadDiagram.caption[locale]}
              </figcaption>
            </figure>
          ) : p.slug === "robot-abb-irb120" ? (
            <div className="plate mx-auto rounded-[24px] p-8 sm:p-14">
              <div className="mx-auto max-w-[640px]">
                <TrajectoryVisual locale={locale} />
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-20 space-y-16 sm:mt-28">
          <Block id="problem" title={t.objective}>
            <p className="max-w-[62ch] text-lg leading-relaxed text-fg-muted">{p.objective[locale]}</p>
          </Block>

          <Block id="work" title={t.work}>
            <ul className="max-w-[62ch] space-y-4">
              {p.work[locale].map((w) => (
                <li key={w} className="relative pl-6 leading-relaxed text-fg-muted">
                  <span aria-hidden className="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-fg-subtle" />
                  {w}
                </li>
              ))}
            </ul>
          </Block>

          {p.challenges[locale].length > 0 && (
            <Block id="challenges" title={t.challenges}>
              <ol className="grid gap-4 sm:grid-cols-2">
                {p.challenges[locale].map((c) => (
                  <li key={c} className="rounded-[16px] bg-surface p-5 leading-relaxed text-fg">
                    {c}
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {figures.length > 0 && (
            <Block id="architecture" title={t.architecture}>
              <div className="space-y-10">
                {figures.map((d, i) => (
                  <figure key={i}>
                    <div className="plate rounded-[20px] p-5 sm:p-8">
                      <SystemDiagram diagram={d} locale={locale} id={`fig-${p.slug}-${i}`} stackBelow="lg" />
                    </div>
                    <figcaption className="mt-3 max-w-[70ch] text-[0.9375rem] text-fg-subtle">
                      <span className="text-fg-muted">
                        {t.figure} {(leadDiagram ? 2 : 1) + i}.
                      </span>{" "}
                      {d.caption[locale]}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Block>
          )}

          <Block id="stack" title={t.stack}>
            <p className="max-w-[62ch] text-lg leading-relaxed text-fg-muted">{p.stack.join(", ")}</p>
          </Block>
        </div>

        <Link
          href={`/${locale}/projects/${next.slug}/`}
          className="group mt-28 block border-t border-line py-14 sm:mt-36 sm:py-20"
        >
          <span className="text-[0.9375rem] text-fg-subtle">{t.next}</span>
          <span className="mt-3 flex items-center justify-between gap-6">
            <span className="text-title font-medium text-fg transition-colors group-hover:text-white">{next.title[locale]}</span>
            <ArrowUpRight
              size={36}
              strokeWidth={1.25}
              aria-hidden
              className="shrink-0 text-fg-muted transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </span>
        </Link>
      </div>
    </article>
  );
}
