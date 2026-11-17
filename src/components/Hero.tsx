"use client";

import Link from "next/link";
import { MotionConfig, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ui, type Locale } from "@/lib/i18n";
import { heroDiagram, projects } from "@/content/projects";
import { SystemDiagram } from "./SystemDiagram";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ locale }: { locale: Locale }) {
  const t = ui[locale].hero;
  const cascadya = projects[0];

  // Same markup on server and client: reduced motion is handled by MotionConfig
  // (transforms skipped) and CSS (ping hidden), never by branching on a hook,
  // which made the server HTML differ from the first client render.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: EASE },
  });

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-5 pb-20 pt-32 sm:px-8 sm:pt-36 lg:min-h-[min(100svh,880px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:pb-14 lg:pt-28 xl:gap-20">
          <div className="max-w-[36rem]">
            <motion.h1 id="hero-title" className="text-hero font-medium text-fg" {...rise(0.05)}>
              {t.title}
            </motion.h1>
            <motion.p className="mt-6 max-w-[30rem] text-lg leading-relaxed text-fg-muted" {...rise(0.15)}>
              {t.lead}
            </motion.p>
            <motion.div className="mt-10 flex flex-wrap items-center gap-3" {...rise(0.25)}>
              <a
                href={`/${locale}/#projects`}
                className="inline-flex min-h-12 items-center rounded-full bg-fg px-6 font-medium text-ink transition-colors duration-200 hover:bg-white"
              >
                {t.ctaProjects}
              </a>
              <a
                href={`/${locale}/#contact`}
                className="inline-flex min-h-12 items-center rounded-full border border-line-strong px-6 font-medium text-fg transition-colors duration-200 hover:border-fg-subtle hover:bg-surface"
              >
                {t.ctaContact}
              </a>
            </motion.div>
            <motion.p className="mt-10 flex max-w-[30rem] items-start gap-3 text-[0.9375rem] leading-relaxed text-fg-muted" {...rise(0.35)}>
              <span className="relative mt-[0.6em] flex h-2 w-2 shrink-0" aria-hidden>
                <span className="absolute inset-0 rounded-full bg-live" />
                <span className="absolute inset-0 animate-ping rounded-full bg-live opacity-40 [animation-duration:2.4s] motion-reduce:hidden" />
              </span>
              {t.status}
            </motion.p>
          </div>

          {/* The showcase plate: the real Cascadya system, data in motion. */}
          <motion.figure
            className="relative"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: EASE }}
          >
            <div className="plate rounded-[24px] p-5 sm:p-8 lg:p-9">
              <p className="mb-5 flex items-center gap-2.5 text-[0.8125rem] text-fg-subtle sm:mb-7">
                <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden />
                {t.plateLive}
              </p>
              <SystemDiagram diagram={heroDiagram} locale={locale} id="hero" stackBelow="md" compact />
            </div>
            <figcaption className="mt-5 flex flex-col gap-3 px-1 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <span>
                <span className="block text-lg font-medium text-fg">{t.plateTitle}</span>
                <span className="mt-1 block text-[0.9375rem] text-fg-subtle">{t.plateMeta}</span>
              </span>
              <Link
                href={`/${locale}/projects/${cascadya.slug}/`}
                className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[0.9375rem] font-medium text-fg"
              >
                {t.plateLink}
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.75}
                  aria-hidden
                  className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </figcaption>
          </motion.figure>
        </div>
      </section>
    </MotionConfig>
  );
}
