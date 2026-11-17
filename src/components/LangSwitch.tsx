"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { ui, type Locale } from "@/lib/i18n";

export function LangSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}/`;
  const other: Locale = locale === "fr" ? "en" : "fr";
  const target = pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${other}`);
  const t = ui[locale];

  return (
    <Link
      href={target.endsWith("/") ? target : `${target}/`}
      hrefLang={other}
      lang={other}
      aria-label={t.switchLabel}
      className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-[0.9375rem] text-fg-muted transition-colors duration-200 hover:text-fg"
    >
      <Languages size={16} strokeWidth={1.75} aria-hidden />
      {t.switchTo}
    </Link>
  );
}
