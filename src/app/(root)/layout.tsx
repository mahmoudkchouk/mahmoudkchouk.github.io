import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Mahmoud Kchouk",
  robots: { index: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-ink text-fg">{children}</body>
    </html>
  );
}
