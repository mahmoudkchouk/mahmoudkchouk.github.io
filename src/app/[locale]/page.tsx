import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Hero } from "@/components/Hero";
import {
  BackgroundSection,
  CapabilitiesSection,
  ContactSection,
  ExperienceSection,
  ProjectsSection,
} from "@/components/Sections";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <Hero locale={locale} />
      <ProjectsSection locale={locale} />
      <CapabilitiesSection locale={locale} />
      <ExperienceSection locale={locale} />
      <BackgroundSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
