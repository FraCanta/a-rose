"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandaloneCampaign = pathname.startsWith("/raccolte/");

  if (isStandaloneCampaign) return children;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
