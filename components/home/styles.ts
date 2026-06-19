export const container =
  "mx-auto w-[min(1420px,calc(100%-72px))] max-sm:w-[min(1420px,calc(100%-32px))]";

export const section = "py-32 max-md:py-24 max-sm:py-20";

export const heading =
  "m-0 font-serif text-[clamp(30px,4.3vw,30px)] xs:text-[clamp(36px,4.3vw,36px)] lg:text-[clamp(43px,4.3vw,64px)] font-normal leading-[1.05] tracking-[-0.035em] text-ink";

export const button =
  "hidden lg:inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-wine bg-wine px-8 py-3 font-bold leading-tight text-white transition hover:-translate-y-0.5 hover:border-wine-deep hover:bg-wine-deep";

export const lightButton =
  "inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-paper bg-paper px-7 py-3 font-bold leading-tight text-wine-deep transition hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-wine";

export const outlineButton =
  "inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-wine px-7 py-3 font-bold leading-tight text-wine transition hover:-translate-y-0.5 hover:bg-wine hover:text-white";

export const textLink =
  "inline-flex w-fit items-center gap-2 border-b border-current py-1.5 font-bold text-wine transition hover:text-wine-deep [&_svg]:transition-transform hover:[&_svg]:translate-x-1";

export const iconWrap =
  "grid size-[50px] place-items-center rounded-full bg-rose-soft text-wine";
