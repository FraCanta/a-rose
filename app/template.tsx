import { PageTransition } from "@/components/ui/page-transition";

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PageTransition>{children}</PageTransition>;
}
