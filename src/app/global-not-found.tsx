import type { Metadata } from "next";
import "./globals.css";
import { basePath } from "@/lib/i18n";

export const metadata: Metadata = { title: "404 | Mahmoud Kchouk" };

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className="bg-ink text-fg">
        <main className="mx-auto flex min-h-screen max-w-[1200px] flex-col justify-center px-5 sm:px-8">
          <p className="tabular text-xl text-fg-subtle">404</p>
          <h1 className="mt-4 text-5xl font-medium tracking-[-0.025em]">Page introuvable</h1>
          <p className="mt-4 max-w-[52ch] text-lg text-fg-muted">
            Cette adresse ne correspond à aucune page du site.{" "}
            <span lang="en">This address does not match any page on the site.</span>
          </p>
          <p className="mt-8 flex flex-wrap gap-3">
            <a href={`${basePath}/fr/`} className="inline-flex min-h-12 items-center rounded-lg bg-fg px-5 font-medium text-ink">
              Retour à l&apos;accueil
            </a>
            <a href={`${basePath}/en/`} lang="en" className="inline-flex min-h-12 items-center rounded-lg border border-line-strong px-5 font-medium">
              Back to home
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
