import Link from "next/link";
import Image from "next/image";
import {
  dsCaseStudyType,
  dsColors,
  dsDivider,
  dsFonts,
  dsLayout,
  dsSpacing,
  dsType,
} from "@/lib/designSystem";

const overviewDetails = [
  { label: "MY ROLE", value: "Founding Designer\nCore Product Redesign" },
  { label: "TEAM", value: "2 Designers, Front-End Engineer" },
  { label: "PLATFORM", value: "Desktop & Mobile" },
  {
    label: "SCOPE",
    value: "0→1 Product Redesign · Design System · AI Interaction Design",
  },
];

const overviewParagraphs = [
  "As a Founding Designer at StockNews.AI, I led the end-to-end redesign of an AI-powered financial news platform from 0 to 1 — rebuilding the core product experience across three features while establishing the design system that made it all possible.",
  "Professional investors were drowning in financial data. The existing product had no clear information hierarchy, no shared design foundation, and no way to connect market signals to a user's own portfolio. Every feature was a one-off.",
  "I redesigned from the ground up: starting with the AI Newsfeed to solve information overload, then extending into Smart Search and a Personalized Dashboard to take users from passive reading to confident decision-making.",
];

const caseBodyTextClass = dsCaseStudyType.body;
const caseHeroTitleClass = dsCaseStudyType.heroTitle;
const caseSubtitleClass = `${dsCaseStudyType.subtitle} text-inherit`;
const caseSectionEyebrowClass = `${dsFonts.body.className} ${dsType.meta} ${dsColors.caseStudy.eyebrow.stocknews} font-semibold`;
const caseSectionTitleClass = `${dsFonts.display.className} ${dsCaseStudyType.sectionTitle} ${dsLayout.caseStudyContentMax}`;
const caseStudySectionClass = dsLayout.caseStudySection;
const caseStudySectionTightBottomClass = dsLayout.caseStudySectionTightBottom;
const caseStudyDesktopFrameClass =
  "mx-auto box-border flex w-full max-w-[1280px] flex-col items-center justify-center gap-[10px] px-6 py-16 min-[1024px]:h-[685px] min-[1024px]:px-[85px] min-[1024px]:py-[86px]";
const caseStudyDesktopContentClass =
  "mx-auto flex w-full max-w-[1052px] flex-col gap-[10px]";
const caseStudyCaptionClass = `${dsCaseStudyType.caption} mb-2`;

function CaseStudyLockIcon() {
  return (
    <img
      src="/sn_lock.svg"
      alt=""
      width={36}
      height={36}
      className="mr-[0.05em] inline-block h-[0.85em] w-[0.85em] align-[-0.08em]"
      aria-hidden
      decoding="async"
    />
  );
}

const insightItems = [
  {
    title: "Value wasn't legible fast enough",
    body: "Users couldn't quickly identify what was relevant to them. Every news card competed for equal attention, making it impossible to scan efficiently.",
  },
  {
    title: "Features were invisible",
    body: "Users didn't know AI Events existed. Most had never used the filter system. The product had more value than users could find.",
  },
  {
    title: "The free tier removed upgrade pressure",
    body: "Ten articles per day was enough for casual users. Without experiencing the full product, there was no reason to pay.",
  },
];

function CaseStudyRow({ label, children, className = "" }) {
  return (
    <div
      className={`${dsLayout.caseStudySplit} ${className}`}
    >
      <h3 className={caseSubtitleClass}>{label}</h3>
      <div className={caseBodyTextClass}>{children}</div>
    </div>
  );
}

/** @deprecated use CaseStudyRow */
const ContextRow = CaseStudyRow;

function CaseStudyFigure({
  src,
  alt,
  assetHint,
  width = 838,
  height = 430,
  cropBottom,
  className = "",
  imageClassName = "",
}) {
  if (src) {
    const isGif = src.endsWith(".gif");
    // Serve raster assets directly from /public so replaced files show without optimizer cache.
    const unoptimized = /\.(gif|png|jpe?g|webp)$/i.test(src);
    const cropRatio = cropBottom ? 1 - parseFloat(cropBottom) / 100 : 1;
    const displayHeight = Math.round(height * cropRatio);

    if (cropBottom) {
      return (
        <div
          className={`relative w-full overflow-hidden ${className}`}
          style={{ aspectRatio: `${width} / ${displayHeight}` }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            unoptimized={unoptimized}
            className="absolute left-0 top-0 h-auto w-full"
          />
        </div>
      );
    }

    return (
      <div className={`relative w-full ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized={unoptimized}
          className={imageClassName || "h-auto w-full"}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 ${className}`}
      role="img"
      aria-label={alt}
    >
      <p className="text-center text-sm text-zinc-500">
        <span className="block font-medium text-zinc-700">{alt}</span>
        <span className="mt-1 block font-mono text-xs">{assetHint}</span>
      </p>
    </div>
  );
}

function FeatureCallout({ leading, trailing, className = "" }) {
  return (
    <p
      className={`mb-4 text-center text-[0.8125rem] font-normal leading-snug text-[#c94444] min-[720px]:text-[0.875rem] min-[720px]:leading-5 ${className}`}
    >
      {leading}
      {trailing ? ` ${trailing}` : ""}
    </p>
  );
}

function BeforeAfterPair({
  before,
  after,
  callout,
  className = "",
  balanceCardSize = false,
  hideCaptions = false,
  alignAfterToCallout = false,
  alignPairBottom = false,
  matchImageHeight = false,
}) {
  const gridClass = balanceCardSize
    ? "min-[720px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
    : "min-[720px]:grid-cols-2";

  const gridItemsClass = alignPairBottom
    ? "items-end"
    : "items-start";

  const afterOffsetClass = alignAfterToCallout ? "min-[720px]:pt-[2.25rem]" : "";

  if (matchImageHeight) {
    return (
      <div
        className={`grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-stretch gap-x-6 gap-y-2 ${className}`}
      >
        {!hideCaptions ? (
          <>
            <figcaption className={`${caseStudyCaptionClass} ${dsColors.caseStudy.before}`}>Before</figcaption>
            <figcaption className={`${caseStudyCaptionClass} ${dsColors.caseStudy.after}`}>After</figcaption>
          </>
        ) : null}
        <div className="min-w-0">
          <CaseStudyFigure {...before} className="w-full" imageClassName="block h-auto w-full" />
        </div>
        <div className="flex h-full min-h-0 w-full items-end justify-center">
          {/* Scale to row height (set by before); width grows with aspect ratio */}
          <img
            src={after.src}
            alt={after.alt}
            width={after.width}
            height={after.height}
            className="h-full w-auto max-w-full object-contain object-bottom"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${gridItemsClass} ${gridClass} ${className}`}>
      <figure className="min-w-0">
        {!hideCaptions ? (
          <figcaption className={`${caseStudyCaptionClass} ${dsColors.caseStudy.before}`}>Before</figcaption>
        ) : null}
        <div
          className={
            balanceCardSize
              ? "mx-auto flex w-full max-w-[min(100%,560px)] flex-col items-center min-[720px]:max-w-[96%]"
              : callout
                ? "mx-auto flex w-full flex-col items-center"
                : undefined
          }
        >
          {callout ? <FeatureCallout {...callout} className="w-full" /> : null}
          <CaseStudyFigure {...before} className="w-full" />
        </div>
      </figure>
      <figure className="min-w-0">
        {!hideCaptions ? (
          <figcaption className={`${caseStudyCaptionClass} ${dsColors.caseStudy.after}`}>After</figcaption>
        ) : null}
        <div
          className={
            balanceCardSize
              ? `mx-auto w-full min-[720px]:max-w-[100%]${afterOffsetClass ? ` ${afterOffsetClass}` : ""}`
              : afterOffsetClass || undefined
          }
        >
          <CaseStudyFigure {...after} />
        </div>
      </figure>
    </div>
  );
}

const featureOneProblemItems = [
  {
    title: "Scannability",
    body: "Every element on the card competed for equal attention. Users couldn't identify what was relevant fast enough to justify paying for a premium product.",
  },
  {
    title: "Feature Discoverability",
    body: "Watchlist and AI Events existed, but users couldn't find them. Features that should have driven engagement were invisible in the navigation.",
  },
];

const featureOneCardLevelItems = [
  {
    title: "01 Reorganize Information Priority",
    mediaPair: true,
    alignPairBottom: true,
    paragraphs: [
      "Investors don't read news cards — they filter them. The first question is always \"is this relevant to me?\", not \"what does this article say?\"",
      "The original card led with source information. I reordered the hierarchy to put Stock & Prediction signal first based on our research feedback, so users could make the relevance judgment in one glance, before committing to reading anything.",
    ],
    before: {
      src: "/sn_f01_card01_before.png",
      alt: "Annotated news card before reorganizing information priority",
      assetHint: "public/sn_f01_card01_before.png",
      width: 838,
      height: 583,
    },
    after: {
      src: "/sn_f01_card01_after.gif",
      alt: "News card after reorganizing information priority",
      assetHint: "public/sn_f01_card01_after.gif",
      width: 1157,
      height: 523,
    },
  },
  {
    title: "02 Refine Labeling System",
    mediaPair: true,
    alignAfterToCallout: true,
    callout: {
      leading: "Overuse of Color Labels",
      trailing: "Causes Visual Clutter",
    },
    paragraphs: [
      "The original tags were semantically unclear: sentiment, timeframe, and category labels all looked the same, forcing users to read every tag to understand its meaning.",
      "I established a clear taxonomy with distinct visual treatments for each type: sentiment (Bullish/Bearish/Neutral), timeframe (Short Term/Long Term), and category (Earnings/Market Recap/Economic). Signal type became parseable at a glance.",
    ],
    before: {
      src: "/sn_f01_card02_before.png",
      alt: "News card illustrating visual clutter from color labels",
      assetHint: "public/sn_f01_card02_before.png",
      width: 770,
      height: 423,
    },
    after: {
      src: "/sn_f01_card02_after.gif",
      alt: "News card after refining the labeling system",
      assetHint: "public/sn_f01_card02_after.gif",
      width: 1157,
      height: 523,
    },
  },
  {
    title: "03 Restructure Visual Hierarchy",
    mediaPair: true,
    alignAfterToCallout: true,
    callout: {
      leading: "Confusing UI Elements",
      trailing: "Reduce Clarity",
    },
    paragraphs: [
      "With the information priority defined and the labeling system rebuilt, I refined the visual hierarchy to make the new order legible: replaced confusing icons with clearer alternatives, standardized type size and spacing across equivalent information levels, and added a left-edge visual cue on each card — so when cards stack, users can scan the feed vertically without opening anything.",
    ],
    before: {
      src: "/sn_f01_card03_before.png",
      alt: "News card illustrating confusing UI elements",
      assetHint: "public/sn_f01_card03_before.png",
      width: 770,
      height: 423,
    },
    after: {
      src: "/sn_f01_card03_after.gif",
      alt: "News card after restructuring visual hierarchy",
      assetHint: "public/sn_f01_card03_after.gif",
      width: 1157,
      height: 523,
    },
  },
];

const featureOneNavigationItems = [
  {
    title: "01 Surface AI News and AI Events as Primary Entry Points",
    matchImageHeight: true,
    body: "AI Events had low discoverability in the original top navbar. Moving it to the sidebar alongside AI News gave both features equal presence, users could see what the product offered without having to look for it.",
    before: {
      src: "/sn_f01_nav01_before.png",
      alt: "Top navbar before surfacing AI News and AI Events",
      assetHint: "public/sn_f01_nav01_before.png",
      width: 686,
      height: 483,
    },
    after: {
      src: "/sn_f01_nav01_after.png",
      alt: "Sidebar navigation after surfacing AI News and AI Events",
      assetHint: "public/sn_f01_nav01_after.png",
      width: 878,
      height: 518,
    },
  },
  {
    title: "02 Watchlist feature",
    body: "Placed the Watchlist sidebar in direct contrast with the main feed, so users could see their personal holdings alongside market news without switching context. The juxtaposition was intentional: it made the product feel like it was responding to you, not just broadcasting to everyone.",
    figure: {
      src: "/sn_f01_nav02_watchlist.png",
      alt: "Watchlist sidebar alongside the main newsfeed",
      assetHint: "public/sn_f01_nav02_watchlist.png",
      width: 1676,
      height: 858,
    },
  },
];

function ValueGapDiagram() {
  return (
    <figure
      className="relative mx-auto mt-6 h-[280px] w-full max-w-[838px] min-[720px]:h-[340px] min-[1024px]:ml-[214px] min-[1024px]:h-[396px]"
      aria-labelledby="value-gap-caption"
    >
      <Image
        src="/sn_value_gap_ceo.svg"
        alt=""
        width={348}
        height={343}
        className="absolute left-[3%] top-0 h-auto w-[42%] max-w-[348px]"
        aria-hidden
      />
      <Image
        src="/sn_value_gap_users.svg"
        alt=""
        width={302}
        height={303}
        className="absolute right-[3%] top-[8%] h-auto w-[36%] max-w-[302px]"
        aria-hidden
      />
      <figcaption id="value-gap-caption" className="sr-only">
        Value gap diagram comparing CEO assumptions with user needs
      </figcaption>
      <p className="absolute bottom-0 left-[18%] text-base font-bold tracking-tight">
        CEO
      </p>
      <p className="absolute bottom-0 right-[18%] text-base font-bold tracking-tight">
        Users
      </p>
    </figure>
  );
}

function ImpactStat({ value, label, highlight }) {
  return (
    <div className="w-full max-w-[228px]">
      <p
        className={`${dsFonts.display.className} ${dsCaseStudyType.statValue} text-black`}
      >
        {value}
      </p>
      <p className={`${caseBodyTextClass} mt-1 leading-[1.4]`}>
        {label}
        <br />
        <span className="font-bold text-[#0c8ce9]">{highlight}</span>
      </p>
    </div>
  );
}

const impactStats = [
  {
    value: "23%",
    label: "Increase in",
    highlight: "Daily Active Users",
  },
  {
    value: "58%",
    label: "Increase in",
    highlight: "Free-to-Paid Conversion Rate",
  },
];

export default function StockNewsCaseStudy() {
  return (
    <main
      className={`${dsFonts.body.className} min-h-screen bg-black pb-24 text-zinc-100`}
    >
      <section
        className={`${dsLayout.caseStudyHeroSection} ${dsLayout.caseStudyHeroHeight} bg-[linear-gradient(to_bottom_right,#87AEF6_0%,#5494DD_36%,#4271AA_62%,#1E2A43_100%)]`}
      >
        <div className={dsLayout.caseStudyHeroNavSpacer} aria-hidden="true" />
        <div className={`${dsLayout.caseStudyHeroTitleBar} bg-white`}>
          <h1
            className={`${dsFonts.display.className} ${caseHeroTitleClass} ${dsLayout.caseStudyHeroTitlePadding} text-center text-black`}
          >
            StockNews.ai
          </h1>
        </div>
        <div className={dsLayout.caseStudyHeroMedia}>
          <div className="relative h-[389px] w-full max-w-[1786px] min-[720px]:h-[518px] min-[1024px]:h-[720px]">
            <Image
              src="/homepage_stocknews.png"
              alt="StockNews case study hero visual"
              fill
              className="object-contain p-0"
              priority
            />
          </div>
        </div>
      </section>

      <section id="overview" className="scroll-mt-28 bg-white text-black">
        <div className={caseStudySectionClass}>
          <header className="space-y-4">
            <p className={caseSectionEyebrowClass}>Overview</p>
            <h2 className={caseSectionTitleClass}>
              Empowering Investors to Scan Fast, Search Deep, Act Confident
            </h2>
          </header>

          <div className="grid gap-10 min-[1024px]:grid-cols-[minmax(0,719px)_minmax(240px,1fr)] min-[1024px]:gap-6">
            <div>
              <div className={`space-y-7 ${caseBodyTextClass}`}>
                {overviewParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-7 space-y-1">
                <p className={caseBodyTextClass}>
                  Impact: ↑58% Free-to-Paid Conversion · ↑23% Daily Active
                  Users
                </p>
                <a
                  href="https://design.museaward.com/winner-info.php?id=28297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lg font-bold leading-7 text-black transition-opacity hover:opacity-80"
                >
                  <Image
                    src="/sn_muse_award_badge.png"
                    alt=""
                    width={23}
                    height={29}
                    aria-hidden
                  />
                  Silver Winner - MUSE Design Awards
                </a>
              </div>
            </div>

            <aside className={`space-y-8 ${caseBodyTextClass}`}>
              {overviewDetails.map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="font-bold">{item.label}</p>
                  <p className="whitespace-pre-line">{item.value}</p>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section id="context" className="scroll-mt-28 bg-white text-black">
        <div className={caseStudySectionTightBottomClass}>
          <header className="space-y-4">
            <p className={caseSectionEyebrowClass}>Context</p>
            <h2 className={caseSectionTitleClass}>
              Redesigning for Value, Not Just Aesthetics
            </h2>
          </header>

          <div className="flex w-full max-w-[1052px] flex-col gap-10">
            <div>
              <ContextRow label="Research">
                <div className="space-y-7">
                  <p>
                    When I joined StockNews.AI, conversion wasn&apos;t moving.
                    The CEO&apos;s hypothesis: the product looked immature, so
                    users weren&apos;t willing to pay. I initiated user research
                    to pressure-test this assumption, and what we found was more
                    fundamental than a visual problem.
                  </p>
                  <div className="space-y-0">
                    <p>Users were telling us:</p>
                    <p>
                      &quot;There&apos;s too much going on. I wish I could set
                      preferences for the kind of news I want.&quot;
                    </p>
                    <p>
                      &quot;It takes me too long to process what&apos;s important
                      in each card. I wish the design helped highlight the key
                      points more.&quot;
                    </p>
                    <p>
                      &quot;I check the news multiple times a day, but I
                      don&apos;t have time to read everything. I just need the
                      key takeaways.&quot;
                    </p>
                  </div>
                </div>
              </ContextRow>
              <ValueGapDiagram />
            </div>

            <ContextRow label="Insight & Challenge">
              <div className="space-y-7">
                <p>
                  The real barriers to conversion weren&apos;t aesthetics. They
                  were three interconnected problems:
                </p>
                <ul className="list-disc space-y-7 pl-6">
                  {insightItems.map((item) => (
                    <li key={item.title}>
                      <span className="font-bold">{item.title}</span>
                      <br />
                      {item.body}
                    </li>
                  ))}
                </ul>
                <p>
                  This reframed the design challenge entirely. It wasn&apos;t
                  &quot;make it look more polished.&quot; It was &quot;make the
                  value impossible to miss.&quot;
                </p>
              </div>
            </ContextRow>

            <ContextRow label="Strategy">
              <div className="space-y-7">
                <p>
                  With a clear problem definition, I worked with the team to map
                  short and long-term priorities.
                </p>
                <div className="space-y-7">
                  <div>
                    <p className="font-bold">
                      Short-term: Fix the value communication problem
                    </p>
                    <p>
                      Redesign the core newsfeed experience so users could
                      extract value in seconds — not minutes. Surface features
                      that were already built but invisible. Give users enough
                      personalization to feel like the product was working for
                      them specifically.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">
                      Long-term: Move from passive AI to agentic AI
                    </p>
                    <p>
                      User research consistently pointed toward a deeper need:
                      users didn&apos;t just want to read market news, they
                      wanted the product to help them act on it. Combined with
                      broader AI product trends, this shaped the direction for
                      Smart Search and Personalized Dashboard — shifting the
                      product from a news aggregator toward an AI-powered
                      investment assistant.
                    </p>
                  </div>
                </div>
              </div>
            </ContextRow>
          </div>
        </div>
      </section>

      <section id="feature-01" className="scroll-mt-28 bg-white text-black">
        <div className={caseStudySectionTightBottomClass}>
          <header className="space-y-4">
            <p className={caseSectionEyebrowClass}>Feature 01</p>
            <h2 className={caseSectionTitleClass}>
              AI NewsCard: Making Market Signals Impossible to Miss
            </h2>
          </header>

          <div className="flex w-full max-w-[1052px] flex-col gap-10">
            <div>
              <CaseStudyRow label="Problem">
                <div className="space-y-7">
                  <p className="font-bold">
                    Scannability & Feature Discoverability problems were
                    blocking conversion.
                  </p>
                  <ul className="list-disc space-y-7 pl-6">
                    {featureOneProblemItems.map((item) => (
                      <li key={item.title}>
                        <span className="font-bold">{item.title}</span>
                        <br />
                        {item.body}
                      </li>
                    ))}
                  </ul>
                </div>
              </CaseStudyRow>
              <div className="min-[1024px]:ml-[214px]">
                <CaseStudyFigure
                  src="/sn_f01_problem_before.svg"
                  alt="Annotated news card showing scannability problems"
                  width={851}
                  height={297}
                  cropBottom="8%"
                  className="mt-6"
                />
              </div>
            </div>

            <CaseStudyRow label="Solution">
              <p>
                Card level for scannability, navigation level for
                discoverability
              </p>
            </CaseStudyRow>

            <div className={dsLayout.caseStudySplit}>
              <h3 className={caseSubtitleClass}>Card Level</h3>
              <div className="space-y-12">
                {featureOneCardLevelItems.map((item) => (
                  <div key={item.title} className="space-y-6">
                    <div className={`space-y-7 ${caseBodyTextClass}`}>
                      <p className="font-bold">{item.title}</p>
                      {item.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                      ))}
                    </div>
                    <BeforeAfterPair
                      before={item.before}
                      after={item.after}
                      callout={item.callout}
                      balanceCardSize
                      hideCaptions={Boolean(item.mediaPair)}
                      alignPairBottom={Boolean(item.alignPairBottom)}
                      alignAfterToCallout={Boolean(item.alignAfterToCallout)}
                      matchImageHeight={Boolean(item.matchImageHeight)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={dsLayout.caseStudySplit}>
              <h3 className={caseSubtitleClass}>Navigation Level</h3>
              <div className="space-y-7">
                <p>
                  Research showed users constantly switching between the
                  newsfeed and their watchlist. This wasn&apos;t a visual
                  problem, it was a structural one.
                </p>
                <p>
                  Moving from a top navbar to a persistent sidebar kept
                  Watchlist always in view, turning a buried feature into a
                  constant presence. The goal wasn&apos;t better-looking
                  navigation. It was making personalization feel inevitable.
                </p>
              </div>
            </div>

            <div className="space-y-12 min-[1024px]:ml-[214px]">
              {featureOneNavigationItems.map((item) => (
                <div key={item.title} className="space-y-6">
                  <div className="space-y-7">
                    <p className="font-bold">{item.title}</p>
                    <p>{item.body}</p>
                  </div>
                  {item.before && item.after ? (
                    <BeforeAfterPair
                      before={item.before}
                      after={item.after}
                      matchImageHeight={Boolean(item.matchImageHeight)}
                    />
                  ) : (
                    <CaseStudyFigure {...item.figure} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="final-design"
        className="scroll-mt-28 w-full overflow-hidden"
        aria-label="Final design"
      >
        <Image
          src="/sn_finaldesign.png"
          alt="Final StockNews.ai product visual — desktop newsfeed with mobile views"
          width={2560}
          height={1546}
          unoptimized
          className="block h-auto w-full"
          sizes="100vw"
        />
      </section>

      <section id="impact" className="scroll-mt-28 bg-white text-black">
        <div className={caseStudyDesktopFrameClass}>
          <div className={caseStudyDesktopContentClass}>
            <h2 className={caseSectionTitleClass}>Impact</h2>

            <div className="flex flex-col gap-12 min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:justify-between min-[1024px]:gap-10">
            <div className="max-w-[475px] space-y-3">
              <a
                href="https://design.museaward.com/winner-info.php?id=28297"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-bold leading-7 text-black transition-opacity hover:opacity-80"
              >
                <Image
                  src="/sn_muse_award_badge.png"
                  alt=""
                  width={32}
                  height={39}
                  unoptimized
                  aria-hidden
                />
                Silver Winner - MUSE Design Awards
              </a>

              <div className={`space-y-7 ${caseBodyTextClass}`}>
                <p>
                  The redesign enhanced user experience while also contributing
                  to business goals like higher engagement and revenue.
                </p>
                <div>
                  <p>
                    Also got positive feedbacks from follow up user email
                    survey:
                  </p>
                  <p className="mt-7">&ldquo;It&apos;s easier to scan right now&rdquo;</p>
                  <p>&ldquo;Convenient to have watchlist aside!&rdquo;</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-12 gap-y-8 min-[1024px]:gap-x-12">
              {impactStats.map((stat) => (
                <ImpactStat key={stat.highlight} {...stat} />
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="what-next"
        className="w-full text-white"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #ffffff 0.1%, #4f5877 40%, #323d61 45.8%, #4f5877 56.8%, #ffffff 97.2%)",
        }}
      >
        <div className={caseStudyDesktopFrameClass}>
          <div className={caseStudyDesktopContentClass}>
            <h2 className={`${caseSectionTitleClass} text-white`}>
              From passive information to actionable advice.
            </h2>
            <p className={`${caseBodyTextClass} text-white`}>
              With the core feature redesign complete, the focus shifted to
              building what was next. The goal from the start was to move
              StockNews.AI{" "}
              <span className="font-bold">
                beyond passive information delivery, toward a product that
                actively helps investors make decisions
              </span>
              . Smart Search and Personalized Dashboard were the first steps in
              that direction.
            </p>
          </div>
        </div>
      </section>

      <section id="feature-02" className="scroll-mt-28 bg-white text-black">
        <div className={caseStudySectionClass}>
          <header className="space-y-4">
            <p className={caseSectionEyebrowClass}>Feature 02</p>
            <h2 className={caseSectionTitleClass}>
              <span className="block">
                <CaseStudyLockIcon />
                Smart Search:
              </span>
              <span className="block">AI-Guided Search with Traceable Sources</span>
            </h2>
          </header>

          <div className="flex w-full max-w-[1052px] flex-col">
            <CaseStudyRow label="Context">
              <div className="space-y-6">
                <p>
                  Professional investors need to verify AI findings, not just
                  receive them. I designed the Smart Search experience around
                  two AI behavior principles: surface citations for every
                  financial claim, and guide off-topic queries back to financial
                  context rather than refusing them outright.
                </p>
                <div className="grid grid-cols-1 gap-4 min-[1024px]:grid-cols-2 min-[1024px]:gap-[18px]">
                  <img
                    src="/sn_f02_left.png"
                    alt="Smart Search entry screen with guided query suggestions"
                    width={843}
                    height={622}
                    className="block h-auto w-full"
                    decoding="async"
                  />
                  <img
                    src="/sn_f02_right.png"
                    alt="Smart Search results comparing NVDA and AAPL with citations sidebar"
                    width={845}
                    height={624}
                    className="block h-auto w-full"
                    decoding="async"
                  />
                </div>
              </div>
            </CaseStudyRow>
          </div>
        </div>
      </section>

      <section id="feature-03" className="scroll-mt-28 bg-white text-black">
        <div className={caseStudySectionClass}>
          <header className="space-y-4">
            <p className={caseSectionEyebrowClass}>Feature 03</p>
            <h2 className={caseSectionTitleClass}>
              <span className="block">
                <CaseStudyLockIcon />
                Personalized Dashboard:
              </span>
              <span className="block">
                From Passive Reading to Confident Action
              </span>
            </h2>
          </header>

          <div className="flex w-full max-w-[1052px] flex-col">
            <CaseStudyRow label="Context">
              <div className="space-y-6">
                <p>
                  The product was telling users what the market was doing. It
                  wasn&apos;t telling them what to do about it. I designed the
                  Dashboard to connect AI market predictions to each user&apos;s
                  specific portfolio, shifting the experience from broadcasting
                  to advising.
                </p>
                <img
                  src="/sn_f03.png"
                  alt="Personalized Dashboard showing My AI Insights with portfolio bear and bull cases"
                  width={1699}
                  height={1193}
                  className="block h-auto w-full"
                  decoding="async"
                />
              </div>
            </CaseStudyRow>
          </div>
        </div>
      </section>

      <article
        className={`${dsLayout.pageFrame} pt-12 min-[720px]:pt-16 min-[1024px]:pt-20`}
      >
        <div className={dsSpacing.sectionGap}>
          <section
            className={`flex items-center justify-between ${dsDivider.topSpacedOnDark}`}
          >
            <Link
              href="/"
              className="text-base font-medium text-zinc-300 transition-colors hover:text-white min-[1024px]:text-lg"
            >
              Back to homepage
            </Link>
            <p className={`${dsType.meta} text-zinc-500`}>StockNews Case Study</p>
          </section>
        </div>
      </article>
    </main>
  );
}
