import { Inter, Source_Serif_4 } from "next/font/google";

const displayFont = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const dsFonts = {
  display: displayFont,
  body: bodyFont,
};

export const dsBreakpoints = {
  mobileMin: 320,
  tabletMin: 720,
  desktopMin: 1024,
  largeDesktopMin: 1440,
};

export const dsType = {
  // 320-719 (mobile), 720-1023 (tablet), 1024-1439 (desktop), 1440+ (large desktop)
  h1: "text-[clamp(2.125rem,10vw,3rem)] min-[720px]:text-[3.75rem] min-[1024px]:text-[4.5rem] min-[1440px]:text-[6rem]",
  h2: "text-[clamp(1.875rem,8vw,2.5rem)] min-[720px]:text-[2.75rem] min-[1024px]:text-[3rem] min-[1440px]:text-[3.75rem]",
  h3: "text-[2rem] min-[1024px]:text-[2.375rem] min-[1440px]:text-[2.625rem]",
  subtitle:
    "text-[0.9375rem] min-[720px]:text-[1.125rem] min-[1024px]:text-[1.25rem] min-[1440px]:text-[1.5rem] font-bold uppercase tracking-[0.08em]",
  body: "text-[1rem] leading-[1.65] min-[720px]:text-[1.125rem] min-[1024px]:text-[1.125rem] min-[1440px]:text-[1.5rem]",
  meta: "text-[0.75rem] min-[720px]:text-[0.8125rem] uppercase tracking-[0.2em]",
};

export const dsLayout = {
  pageFrame:
    "mx-auto w-full max-w-[1220px] px-6 min-[720px]:px-10 min-[1024px]:px-12 min-[1440px]:max-w-[1320px]",
  contentMax: "max-w-4xl",
  textMax: "max-w-3xl",
};

export const dsSpacing = {
  // Use these semantic spacing classes for consistent rhythm
  pageTopBottom: "pt-28 pb-24 md:pt-32",
  sectionGap: "space-y-20",
  sectionInnerTight: "space-y-6",
  sectionInner: "space-y-8",
  paragraphGap: "space-y-5",
  cardPadding: "p-6 min-[1024px]:p-8",
  insetPadding: "p-5",
  dividerTop: "border-t border-white/10 pt-10",
};
