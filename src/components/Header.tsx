"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/lib/i18n";
import { LangSwitch } from "./LangSwitch";

export function Header({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: `/${locale}/#experience`, label: t.nav.experience },
    { href: `/${locale}/#projects`, label: t.nav.projects },
    { href: `/${locale}/#expertise`, label: t.nav.expertise },
    { href: `/${locale}/#background`, label: t.nav.background },
    { href: `/${locale}/#contact`, label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-line bg-ground/95" : "border-transparent bg-ground/0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Link
          href={`/${locale}/`}
          className="font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-fg"
          onClick={() => setOpen(false)}
        >
          Mahmoud Kchouk
        </Link>

        <nav aria-label={t.navLabel} className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-[0.9375rem] text-fg-muted transition-colors duration-200 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
          <span className="mx-2 h-4 w-px bg-line" aria-hidden />
          <LangSwitch locale={locale} />
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t.closeMenu : t.menu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label={t.navLabel} className="border-t border-line bg-ground md:hidden">
          <ul className="mx-auto max-w-[1200px] px-5 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center text-lg text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-line pt-3">
              <LangSwitch locale={locale} />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
