import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/components/home/data";
import { Icon } from "@/components/home/icons";
import { button } from "@/components/home/styles";
import { Entrance } from "@/components/ui/entrance";
import { MobileNavigation } from "./mobile-navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-wine/10 bg-white">
      <Entrance
        className="relative z-[60] mx-auto grid min-h-24 w-full max-w-site grid-cols-[auto_1fr_auto] items-center px-4 lg:px-12 2xl:px-0 max-sm:min-h-[84px]"
        direction="down"
      >
        <Link
          className="flex shrink-0 items-center"
          href="/"
          aria-label="A-ROSE ODV, homepage"
        >
          <Image
            className="block h-auto w-40 object-contain lg:w-48"
            src="/brand/logo2_arose_positivo.png"
            alt="A-ROSE ODV"
            width={1672}
            height={941}
            sizes="(max-width: 1023px) 160px, 192px"
            loading="eager"
          />
        </Link>

        <nav
          className="hidden items-center justify-center gap-6 font-sans text-[13px] font-bold lg:flex xl:gap-9"
          aria-label="Navigazione principale"
        >
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              className="relative whitespace-nowrap py-2 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-rose after:transition-transform hover:text-wine hover:after:scale-x-100"
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link className={`${button} hidden lg:inline-flex`} href="/#dona">
          Sostieni la ricerca <Icon className="size-[18px]" name="heart" />
        </Link>

        <MobileNavigation items={navigation} />
      </Entrance>
    </header>
  );
}
