import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
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
    <html className="scroll-smooth" lang="it">
      <body className="bg-white font-sans text-ink antialiased">
        <a
          className="fixed left-4 top-[-100px] z-[100] rounded-b-lg bg-wine px-5 py-2.5 font-bold text-white focus:top-0"
          href="#contenuto"
        >
          Vai al contenuto
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
