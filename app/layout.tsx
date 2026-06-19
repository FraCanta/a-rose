import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A-ROSE ODV | Ricerca oncologica, prevenzione e formazione",
  description:
    "A-ROSE ODV sostiene la ricerca oncologica traslazionale, la formazione e la prevenzione per avvicinare la scienza alla vita delle persone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
