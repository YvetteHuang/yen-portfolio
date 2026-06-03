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
  h2: "text-[clamp(1.875rem,8vw,2.5rem)] min-[720px]:text-[2.75rem] min-[1024px]:text-[3rem] min-[1440px]:text-[3.75rem] leading-[1.14] tracking-tight",
  h3: "text-[2rem] min-[1024px]:text-[2.375rem] min-[1440px]:text-[2.625rem]",
  subtitle:
    "text-[0.9375rem] min-[720px]:text-[1.125rem] min-[1024px]:text-[1.25rem] min-[1440px]:text-[1.5rem] font-bold uppercase tracking-[0.08em]",
  body: "text-[1rem] leading-[1.65] min-[720px]:text-[1.125rem] min-[1024px]:text-[1.125rem] min-[1440px]:text-[1.5rem]",
  meta: "text-[0.75rem] min-[720px]:text-[0.8125rem] uppercase tracking-[0.2em]",
  emphasisHeading:
    "text-[1.75rem] min-[720px]:text-[2.25rem] min-[1024px]:text-[2.5rem] leading-[1.4] tracking-tight",
  featureTitle:
    "text-[1.2rem] min-[1024px]:text-[1.35rem] font-semibold leading-snug",
  figureCaption: "text-[1.05rem] font-semibold",
  statValue:
    "text-[2.5rem] min-[1440px]:text-[3.25rem] font-semibold leading-none",
};

// Case study body copy — explicit size/line-height pairs per breakpoint (Figma Body 01 at 720px+).
// Mobile: 16/24 · Tablet & desktop: 18/28
export const dsCaseStudyType = {
  body:
    "text-[1rem] leading-6 min-[720px]:text-[1.125rem] min-[720px]:leading-7",
  subtitle:
    "text-[1rem] leading-6 min-[720px]:text-[1.125rem] min-[720px]:leading-7 font-bold uppercase",
  sectionEyebrow: "text-base font-bold uppercase",
};

export const dsLayout = {
  pageFrame:
    "mx-auto w-full max-w-[1220px] px-6 min-[720px]:px-10 min-[1024px]:px-12 min-[1440px]:max-w-[1320px]",
  contentMax: "max-w-4xl",
  textMax: "max-w-3xl",
};

export const dsDivider = {
  topOnDark: "border-t border-white/10",
  topSpacedOnDark: "border-t border-white/10 pt-10",
  rightOnDesktopOnDark: "min-[1024px]:border-r min-[1024px]:border-white/10",
  navbarBottomOnDark: "border-b border-white/10",
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
  dividerTop: dsDivider.topSpacedOnDark,
};

export const dsRadius = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-2xl",
  full: "rounded-full",
};

export const dsSurface = {
  subtleCardOnDark: "border border-white/10 bg-white/[0.02]",
  elevatedCardOnDark: "border border-white/10 bg-white/[0.03]",
  drawerOnDark: "border border-white/10 bg-zinc-950/95 shadow-2xl backdrop-blur",
  mobilePreviewOnDark: "rounded-lg border border-white/10 bg-black/30",
  accentCardWondera: "border border-violet-400/30 bg-violet-500/10",
};

export const dsColors = {
  text: {
    primaryOnDark: "text-zinc-100",
    secondaryOnDark: "text-zinc-200",
    tertiaryOnDark: "text-zinc-300",
    mutedOnDark: "text-zinc-400",
  },
  border: {
    subtleOnDark: "border-white/10",
  },
  surface: {
    panelOnDark: "bg-white/[0.02]",
    overlayOnDark: "bg-white/[0.03]",
  },
  wondera: {
    eyebrow: "text-violet-300",
    accentText: "text-violet-200",
    accentSoftText: "text-violet-100",
    accentBackgroundSoft: "bg-violet-500/10",
    accentBackgroundInteractive: "bg-violet-500/25",
    accentBackgroundInteractiveHover: "hover:bg-violet-500/35",
    accentBackgroundSelected: "bg-violet-400/20",
    accentBorderSoft: "border-violet-400/30",
    accentBorderInteractive: "border-violet-300/40",
    heroGradient:
      "bg-[linear-gradient(to_top_right,#6320EE_0%,#351A6B_52%,#161616_100%)]",
    quoteBandBackground: "bg-[#32167A]",
    flowFillHex: "#E5D9FF",
    flowInkHex: "#6233C1",
    flowTextHex: "#2A1146",
  },
};
