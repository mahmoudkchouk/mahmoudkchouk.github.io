import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Hero } from "@/components/Hero";
import {
  BackgroundSection,
  ContactSection,
  ExperienceSection,
  ExpertiseSection,
  ProjectsSection,
} from "@/components/Sections";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <Hero locale={locale} />
      <ExperienceSection locale={locale} />
      <ProjectsSection locale={locale} />
      <ExpertiseSection locale={locale} />
      <BackgroundSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
