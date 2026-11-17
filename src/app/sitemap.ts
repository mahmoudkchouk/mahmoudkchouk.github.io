import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { projects } from "@/content/projects";
import { profile } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  return locales.flatMap((l) => [
    { url: `${base}/${l}/`, changeFrequency: "monthly" as const, priority: 1 },
    ...projects.map((p) => ({ url: `${base}/${l}/projects/${p.slug}/`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ]);
}
