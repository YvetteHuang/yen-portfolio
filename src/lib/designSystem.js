import { Inter, Source_Serif_4 } from "next/font/google";

const displayFont = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
  heroLede:
    "text-[1.375rem] min-[720px]:text-[1.625rem] min-[1024px]:text-[2rem] font-light leading-[1.15]",
  emphasisHeading:
    "text-[1.75rem] min-[720px]:text-[2.25rem] min-[1024px]:text-[2.5rem] leading-[1.4] tracking-tight",
  featureTitle:
    "text-[1.2rem] min-[1024px]:text-[1.35rem] font-semibold leading-snug",
  figureCaption: "text-[1.05rem] font-semibold",
  statValue:
    "text-[2.5rem] min-[1440px]:text-[3.25rem] font-semibold leading-none",
};

// Case study typography — size/weight only; pair with dsColors.text.* for color.
// Mobile body: 16/24 · Tablet+: 18/28
export const dsCaseStudyType = {
  heroTitle:
    "text-[clamp(2.4rem,7vw,4rem)] min-[1024px]:text-[4.25rem] font-semibold leading-tight tracking-tight",
  sectionTitle:
    "text-[clamp(1.875rem,8vw,2.5rem)] min-[720px]:text-[2.75rem] min-[1024px]:text-[3rem] font-semibold leading-[1.14] tracking-tight",
  // Eyebrow: dsType.meta + dsColors.caseStudy.eyebrow.{case} + font-semibold (not sectionEyebrow below).
  body:
    "text-[1rem] leading-6 min-[720px]:text-[1.125rem] min-[720px]:leading-7",
  subtitle:
    "text-[1rem] leading-6 min-[720px]:text-[1.125rem] min-[720px]:leading-7 font-bold uppercase",
  featureTitle:
    "text-[1rem] leading-6 min-[720px]:text-[1.125rem] min-[720px]:leading-7 font-bold",
  pullQuote:
    "text-[1.75rem] min-[720px]:text-[2.25rem] min-[1024px]:text-[2.5rem] font-semibold leading-[1.4] tracking-tight",
  blockquote:
    "text-[clamp(2rem,5vw,2.25rem)] font-bold italic leading-[1.25] tracking-tight",
  statValue:
    "text-[2.5rem] min-[1440px]:text-[3.25rem] font-semibold leading-none",
  caption: "text-center text-[0.95rem] font-normal leading-snug",
  annotationLabel:
    "text-center text-xs font-semibold uppercase tracking-[0.14em] min-[1024px]:text-sm",
  annotation:
    "text-center text-xs font-medium leading-snug min-[1024px]:text-base",
};

export const dsLayout = {
  pageFrame:
    "mx-auto w-full max-w-[1280px] px-6 min-[720px]:px-12 min-[1024px]:px-[114px]",
  caseStudyContentMax: "max-w-[1052px]",
  contentMax: "max-w-4xl",
  textMax: "max-w-3xl",
  caseStudySplit:
    "grid gap-6 min-[1024px]:grid-cols-[194px_minmax(0,1fr)] min-[1024px]:gap-10",
  caseStudySection:
    "mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 py-16 min-[720px]:px-12 min-[1024px]:gap-10 min-[1024px]:px-[114px] min-[1024px]:py-20",
  caseStudySectionTightBottom:
    "mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 pb-16 pt-16 min-[720px]:px-12 min-[1024px]:gap-10 min-[1024px]:px-[114px] min-[1024px]:pb-20 min-[1024px]:pt-20",
  caseStudySectionCompact:
    "mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 py-10 min-[720px]:px-12 min-[1024px]:px-[114px]",
  caseStudyHeroSection:
    "relative flex w-full flex-col overflow-hidden border-b border-white/10",
  caseStudyHeroHeight: "min-h-[clamp(360px,60vw,980px)]",
  caseStudyHeroNavSpacer: "pointer-events-none h-20 shrink-0 lg:h-24",
  caseStudyHeroTitleBar:
    "relative z-20 flex w-full shrink-0 justify-center px-6",
  caseStudyHeroTitlePadding: "py-[0.42em]",
  caseStudyHeroMedia:
    "relative mx-auto flex min-h-0 w-full max-w-[1800px] flex-1 items-end justify-center px-2 pb-1 min-[720px]:px-4 min-[1024px]:pb-3",
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
  sectionTopSpaced: "pt-10 min-[1024px]:pt-12",
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
    primaryOnLight: "text-zinc-900",
    secondaryOnLight: "text-zinc-700",
    tertiaryOnLight: "text-zinc-500",
    mutedOnLight: "text-zinc-400",
  },
  caseStudy: {
    before: "text-[#b83d3d]",
    after: "text-[#4ba871]",
    eyebrow: {
      wondera: "text-violet-300",
      stocknews: "text-[#4271AA]",
      designSystem: "text-[#096AFA]",
    },
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
