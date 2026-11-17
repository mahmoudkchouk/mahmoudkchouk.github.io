"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import { ui, asset, type Locale } from "@/lib/i18n";
import { profile } from "@/content/site";

const stations = {
  fr: [
    { name: "Capteurs", detail: "Centrale inertielle 6 axes, capteur de gaz, codec SI3000" },
    { name: "Embarqué", detail: "C sur ESP32, dsPIC et STM32, modules noyau Linux" },
    { name: "Edge et protocoles", detail: "Modbus TCP, LoRaWAN, passerelles de collecte" },
    { name: "Cloud et déploiement", detail: "Terraform, Ansible, Docker, Scaleway, GitHub Actions" },
    { name: "Supervision et données", detail: "ThingsBoard, PostgreSQL, InfluxDB, Grafana" },
  ],
  en: [
    { name: "Sensors", detail: "6-axis IMU, gas sensor, SI3000 codec" },
    { name: "Embedded", detail: "C on ESP32, dsPIC and STM32, Linux kernel modules" },
    { name: "Edge and protocols", detail: "Modbus TCP, LoRaWAN, collection gateways" },
    { name: "Cloud and delivery", detail: "Terraform, Ansible, Docker, Scaleway, GitHub Actions" },
    { name: "Monitoring and data", detail: "ThingsBoard, PostgreSQL, InfluxDB, Grafana" },
  ],
};

const EASE = [0.16, 1, 0.3, 1] as const;
const RAIL_DELAY = 0.35;
const RAIL_DURATION = 1.8;

export function Hero({ locale }: { locale: Locale }) {
  const t = ui[locale].hero;
  const reduce = useReducedMotion();
  const list = stations[locale];

  // Lamp i switches on when the signal reaches it along the rail.
  const lampDelay = (i: number) => RAIL_DELAY + (RAIL_DURATION * 0.62 * i) / (list.length - 1);

  return (
    <section aria-labelledby="hero-title" className="relative pt-32 sm:pt-40">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h1 id="hero-title">
          <span className="block font-sans text-lg font-medium text-fg-muted sm:text-xl">
            {profile.name}
            <span className="sr-only">, </span>
          </span>
          <span className="mt-4 block font-display text-display font-semibold text-fg">{t.title}</span>
        </h1>

        <p className="measure mt-8 max-w-[60ch] text-lg leading-[1.6] text-fg-muted sm:text-xl sm:leading-[1.55]">
          {t.lead}
        </p>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`/${locale}/#projects`}
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-fg px-5 font-medium text-ground transition-colors duration-200 hover:bg-white"
            >
              {t.ctaProjects}
              <ArrowDown size={18} strokeWidth={1.75} aria-hidden />
            </a>
            <a
              href={asset(profile.cv)}
              download
              className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-line-strong px-5 font-medium text-fg transition-colors duration-200 hover:border-fg-subtle hover:bg-surface"
            >
              <Download size={18} strokeWidth={1.75} aria-hidden />
              {t.ctaCv}
            </a>
          </div>

          <p className="flex items-start gap-3 text-[0.9375rem] leading-snug">
            <span className="relative mt-[0.3rem] inline-flex h-2.5 w-2.5 shrink-0" aria-hidden>
              <span className="absolute inset-0 rounded-full bg-signal" />
              <span className="absolute -inset-1 rounded-full border border-signal/40" />
            </span>
            <span>
              <span className="block text-fg">{t.status}</span>
              <span className="block text-fg-muted">{t.statusDetail}</span>
            </span>
          </p>
        </div>

        {/* The chain: one signal travels from sensor to monitoring, once. */}
        <div className="mt-20 border-t border-line pt-10 sm:mt-24">
          <h2 className="sr-only">{t.chainLabel}</h2>
          <ol className="relative grid gap-8 pl-7 lg:grid-cols-5 lg:gap-6 lg:pl-0 lg:pt-8">
            {/* Rail, horizontal on desktop */}
            <span aria-hidden className="absolute left-0 right-0 top-[3px] hidden h-px bg-line lg:block" />
            <motion.span
              aria-hidden
              className="absolute left-0 right-0 top-[3px] hidden h-px origin-left bg-flow lg:block"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: RAIL_DELAY, duration: RAIL_DURATION, ease: EASE }}
            />
            {/* Rail, vertical on mobile */}
            <span aria-hidden className="absolute bottom-2 left-[3px] top-2 w-px bg-line lg:hidden" />
            <motion.span
              aria-hidden
              className="absolute bottom-2 left-[3px] top-2 w-px origin-top bg-flow lg:hidden"
              initial={reduce ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: RAIL_DELAY, duration: RAIL_DURATION, ease: EASE }}
            />

            {list.map((s, i) => (
              <li key={s.name} className="relative">
                <motion.span
                  aria-hidden
                  className="absolute -left-7 top-[0.45rem] h-[7px] w-[7px] rounded-full lg:-top-8 lg:left-0"
                  initial={reduce ? false : { backgroundColor: "#3e454d", scale: 1 }}
                  animate={
                    reduce
                      ? { backgroundColor: "#8fb3d1" }
                      : {
                          backgroundColor: ["#3e454d", "#eceef0", "#8fb3d1"],
                          scale: [1, 1.6, 1],
                        }
                  }
                  transition={{ delay: lampDelay(i), duration: 0.9, ease: EASE, times: [0, 0.25, 1] }}
                />
                <span className="block font-display text-xl font-medium tracking-[-0.01em] text-fg">{s.name}</span>
                <span className="mt-2 block text-[0.9375rem] leading-relaxed text-fg-muted">{s.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
