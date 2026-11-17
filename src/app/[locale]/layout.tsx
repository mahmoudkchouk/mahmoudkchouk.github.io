import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales, ui, type Locale } from "@/lib/i18n";
import { profile } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

const descriptions: Record<Locale, string> = {
  fr: "Élève-ingénieur en automatique et informatique industrielle à l'UTT. Systèmes embarqués, IoT industriel, DevOps et cloud. Disponible pour un stage de fin d'études de 6 mois à partir de janvier 2027.",
  en: "Engineering student in automation and industrial computing at UTT, France. Embedded systems, industrial IoT, DevOps and cloud. Available for a 6-month end-of-studies internship from January 2027.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = `${profile.name}, ${profile.role[locale]}`;
  return {
    metadataBase: new URL(profile.siteUrl),
    title: { default: title, template: `%s | ${profile.name}` },
    description: descriptions[locale],
    alternates: {
      canonical: `/${locale}/`,
      languages: { fr: "/fr/", en: "/en/", "x-default": "/fr/" },
    },
    openGraph: {
      type: "profile",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      title,
      description: descriptions[locale],
      url: `/${locale}/`,
      siteName: profile.name,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: profile.name }],
    },
    twitter: { card: "summary_large_image", title, description: descriptions[locale], images: ["/og.png"] },
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  };
}

export const viewport: Viewport = {
  themeColor: "#0d1117",
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = ui[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role[locale],
    email: `mailto:${profile.email}`,
    url: `${profile.siteUrl}/${locale}/`,
    sameAs: [profile.linkedin, profile.github].filter(Boolean),
    alumniOf: { "@type": "CollegeOrUniversity", name: "Université de Technologie de Troyes" },
    address: { "@type": "PostalAddress", addressLocality: "Reims", addressCountry: "FR" },
  };

  return (
    <html lang={locale}>
      <body className="bg-ink text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
        >
          {t.skip}
        </a>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
