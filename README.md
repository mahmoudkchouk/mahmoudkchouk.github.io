# mahmoudkchouk.github.io

Portfolio of Mahmoud Kchouk, engineering student in automation and industrial computing at UTT. Bilingual (French and English), static, hosted on GitHub Pages.

Next.js (App Router, static export), TypeScript, Tailwind CSS 4, Motion, Lucide.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000/fr/
npm run build      # static site in out/
```

## Update the content

Everything you would edit lives in `src/content/`:

| File | What it holds |
| --- | --- |
| `src/content/site.ts` | Profile, contact links, experience, skills, education, certifications |
| `src/content/projects.ts` | Projects, case studies and their architecture diagrams |
| `src/lib/i18n.ts` | Interface text in French and English |
| `public/cv/CV_Mahmoud_Kchouk.pdf` | The downloadable CV |

Every text is written as `{ fr: "...", en: "..." }`.

**Add a project**: append an object to `projects` in `src/content/projects.ts`. Set `featured: true` to show it as a large card with its diagram. A case-study page is generated at `/fr/projects/<slug>/` and `/en/projects/<slug>/`.

**Diagrams** are plain data: nodes placed on a grid (`col`, `row`, optional `rowSpan`) and edges between them (`kind: "return"` draws a feedback loop underneath). `tone: "focus"` marks the part the project is about; `tone: "muted"` draws a dashed box for simulated parts.

**GitHub link**: once you have public repositories, set `github` in `src/content/site.ts` to `"https://github.com/mahmoudkchouk"`; the contact section shows it automatically.

## Deploy

1. Push this folder to a repository named `mahmoudkchouk.github.io`, branch `main`.
2. In the repository: Settings, Pages, Source: **GitHub Actions**.
3. Every push to `main` builds and publishes the site with `.github/workflows/deploy.yml`.

The workflow also works from any other repository name: the base path is picked up automatically, and the site is then served at `https://mahmoudkchouk.github.io/<repo>/`. In that case update `siteUrl` in `src/content/site.ts` so canonical links and the sitemap match.

## Design notes

Anthracite ground, aluminium text, one pilot-lamp amber reserved for availability and keyboard focus, steel blue for data flow. Barlow and Barlow Semi Condensed (DIN-like industrial lettering), IBM Plex Mono only inside diagrams. The one orchestrated animation is the signal travelling along the sensor-to-cloud chain in the hero; it is skipped when the visitor asks for reduced motion.
