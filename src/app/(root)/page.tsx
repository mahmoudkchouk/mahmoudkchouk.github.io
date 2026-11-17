import { basePath } from "@/lib/i18n";

// GitHub Pages cannot redirect server-side: pick the visitor's language in the
// browser, fall back to French without JavaScript.
export default function RootRedirect() {
  const fr = `${basePath}/fr/`;
  const en = `${basePath}/en/`;
  const script = `(function(){var l=(navigator.languages&&navigator.languages[0])||navigator.language||"fr";location.replace(/^fr/i.test(l)?${JSON.stringify(fr)}:${JSON.stringify(en)});})();`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${fr}`} />
      </noscript>
      <main className="mx-auto max-w-xl px-6 py-24">
        <p className="font-display text-2xl text-fg">Mahmoud Kchouk</p>
        <p className="mt-4 text-fg-muted">
          <a className="underline" href={fr}>Version française</a>
          {" / "}
          <a className="underline" href={en} lang="en">English version</a>
        </p>
      </main>
    </>
  );
}
