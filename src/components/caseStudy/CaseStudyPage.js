import Link from "next/link";
import Image from "next/image";
import CaseStudyBlocks, { Inline, MediaItem } from "@/components/caseStudy/CaseStudyBlocks";
import {
  dsDivider,
  dsFonts,
  dsLayout,
  dsSpacing,
  dsType,
} from "@/lib/designSystem";

// Shared markdown-driven case study layout. Classes mirror the StockNews page
// (src/app/work/stocknews/stocknews.js) so both read as one system.

const DEFAULT_ACCENT = "#4271AA";
const DEFAULT_HERO_BACKGROUND =
  "linear-gradient(to bottom right, #87AEF6 0%, #5494DD 36%, #4271AA 62%, #1E2A43 100%)";
const TRANSITION_GRADIENT =
  "linear-gradient(180deg, #ffffff 0.1%, #4f5877 40%, #323d61 45.8%, #4f5877 56.8%, #ffffff 97.2%)";

const caseBodyTextClass = dsType.body;
const caseSubtitleClass = `${dsType.subheading} text-inherit`;
const caseSectionEyebrowClass = `${dsFonts.body.className} ${dsType.eyebrow} font-semibold`;
const caseSectionTitleClass = `${dsFonts.display.className} ${dsType.sectionTitle} ${dsLayout.caseStudyContentMax}`;
// Same as the StockNews impact/transition frame, but grows when content runs long.
const caseStudyDesktopFrameClass =
  "mx-auto box-border flex w-full max-w-[1280px] flex-col items-center justify-center gap-[10px] px-6 py-16 min-[1024px]:min-h-[685px] min-[1024px]:px-[85px] min-[1024px]:py-[86px]";
const caseStudyDesktopContentClass =
  "mx-auto flex w-full max-w-[1052px] flex-col gap-[10px]";

function LockIcon() {
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

function SectionTitle({ section, className = "" }) {
  const title = section.title ?? section.name;
  // Locked teasers break after the colon, like StockNews Feature 02/03.
  const split = title.match(/^(.+?[:：])\s*(.+)$/);
  if (section.locked && split) {
    return (
      <h2 className={`${caseSectionTitleClass} ${className}`}>
        <span className="block">
          <LockIcon />
          {split[1]}
        </span>
        <span className="block">{split[2]}</span>
      </h2>
    );
  }
  return (
    <h2 className={`${caseSectionTitleClass} ${className}`}>
      {section.locked ? <LockIcon /> : null}
      {title}
    </h2>
  );
}

function SectionHeader({ section, accent }) {
  return (
    <header className="space-y-4">
      <p className={caseSectionEyebrowClass} style={{ color: accent }}>
        {section.eyebrow}
      </p>
      <SectionTitle section={section} />
    </header>
  );
}

function CaseStudyRow({ label, children }) {
  return (
    <div className={dsLayout.caseStudySplit}>
      <h3 className={caseSubtitleClass}>{label}</h3>
      <div className={caseBodyTextClass}>{children}</div>
    </div>
  );
}

function RowContent({ row }) {
  return (
    <div className="space-y-7">
      <CaseStudyBlocks blocks={row.blocks} />
      {row.subs.length ? (
        <div className="space-y-12">
          {row.subs.map((sub) => (
            <div key={sub.title} className="space-y-7">
              <p className="font-bold">
                <Inline text={sub.title} />
              </p>
              <CaseStudyBlocks blocks={sub.blocks} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Rows({ rows }) {
  return rows.map((row, index) => (
    <CaseStudyRow key={`${row.label}${index}`} label={row.label}>
      <RowContent row={row} />
    </CaseStudyRow>
  ));
}

function Award({ frontmatter, large = false }) {
  if (!frontmatter.award) return null;
  const content = (
    <>
      {frontmatter.awardBadge ? (
        <Image
          src={frontmatter.awardBadge}
          alt=""
          width={large ? 32 : 23}
          height={large ? 39 : 29}
          unoptimized
          aria-hidden
        />
      ) : null}
      {frontmatter.award}
    </>
  );
  const className = `inline-flex items-center font-bold leading-7 text-black ${large ? "gap-2.5" : "gap-2 text-lg"}`;
  return frontmatter.awardUrl ? (
    <a
      href={frontmatter.awardUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} transition-opacity hover:opacity-80`}
    >
      {content}
    </a>
  ) : (
    <p className={className}>{content}</p>
  );
}

function Hero({ study }) {
  const { frontmatter, hero } = study;
  return (
    <section
      className={`${dsLayout.caseStudyHeroSection} ${dsLayout.caseStudyHeroHeight}`}
      style={{ backgroundImage: frontmatter.heroBackground ?? DEFAULT_HERO_BACKGROUND }}
    >
      <div className={dsLayout.caseStudyHeroNavSpacer} aria-hidden="true" />
      <div className={`${dsLayout.caseStudyHeroTitleBar} bg-white`}>
        <h1
          className={`${dsFonts.display.className} ${dsType.heroTitle} ${dsLayout.caseStudyHeroTitlePadding} text-center text-black`}
        >
          {frontmatter.title}
        </h1>
      </div>
      <div className={dsLayout.caseStudyHeroMedia}>
        <div className="relative h-[389px] w-full max-w-[1786px] min-[720px]:h-[518px] min-[1024px]:h-[720px]">
          {hero?.exists ? (
            <Image
              src={hero.src}
              alt={`${frontmatter.title} case study hero visual`}
              fill
              className="object-contain p-0"
              priority
            />
          ) : hero ? (
            <div
              className="absolute inset-6 flex items-center justify-center rounded-lg border border-dashed border-white/40 min-[1024px]:inset-12"
              role="img"
              aria-label={`${frontmatter.title} hero visual`}
            >
              <p className="text-center text-sm text-white/80">
                <span className="block font-medium text-white">Hero image</span>
                <span className="mt-1 block font-mono text-xs">{hero.src}</span>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function OverviewSection({ section, study, accent }) {
  const { frontmatter } = study;
  const role = Array.isArray(frontmatter.role) ? frontmatter.role.join("\n") : frontmatter.role;
  const details = [
    { label: "MY ROLE", value: role },
    { label: "TEAM", value: frontmatter.team },
    { label: "PLATFORM", value: frontmatter.platform },
    { label: "TIMELINE", value: frontmatter.timeline },
    { label: "SCOPE", value: frontmatter.scope },
  ].filter((item) => item.value);

  return (
    <section id={section.id} className="scroll-mt-28 bg-white text-black">
      <div className={dsLayout.caseStudySection}>
        <SectionHeader section={section} accent={accent} />

        <div className="grid gap-10 min-[1024px]:grid-cols-[minmax(0,719px)_minmax(240px,1fr)] min-[1024px]:gap-6">
          <div>
            <CaseStudyBlocks blocks={section.intro} className={`space-y-7 ${caseBodyTextClass}`} />
            {section.rows.length ? (
              <div className="mt-10 flex flex-col gap-10">
                <Rows rows={section.rows} />
              </div>
            ) : null}

            {frontmatter.impactLine || frontmatter.award ? (
              <div className="mt-7 space-y-1">
                {frontmatter.impactLine ? (
                  <p className={caseBodyTextClass}>Impact: {frontmatter.impactLine}</p>
                ) : null}
                <Award frontmatter={frontmatter} />
              </div>
            ) : null}
          </div>

          <aside className={`space-y-8 ${caseBodyTextClass}`}>
            {details.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="font-bold">{item.label}</p>
                <p className="whitespace-pre-line">{item.value}</p>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}

function ContentSection({ section, accent }) {
  return (
    <section id={section.id} className="scroll-mt-28 bg-white text-black">
      <div className={dsLayout.caseStudySectionTightBottom}>
        <SectionHeader section={section} accent={accent} />
        <div className={`flex w-full max-w-[1052px] flex-col gap-10 ${caseBodyTextClass}`}>
          <CaseStudyBlocks blocks={section.intro} />
          <Rows rows={section.rows} />
        </div>
      </div>
    </section>
  );
}

function allBlocks(section) {
  return [
    ...section.intro,
    ...section.rows.flatMap((row) => [...row.blocks, ...row.subs.flatMap((sub) => sub.blocks)]),
  ];
}

function ShowcaseSection({ section }) {
  const media = allBlocks(section).filter((block) => block.type === "media");
  return (
    <section
      id={section.id}
      className="scroll-mt-28 w-full overflow-hidden"
      aria-label={section.title ?? section.name}
    >
      {media.map((block, index) =>
        block.items.length === 1 ? (
          <MediaItem key={index} item={block.items[0]} fullBleed />
        ) : (
          <CaseStudyBlocks key={index} blocks={[block]} className="" fullBleed />
        ),
      )}
    </section>
  );
}

function ImpactStat({ value, label, highlight, accent }) {
  return (
    <div className="w-full max-w-[228px]">
      <p className={`${dsFonts.display.className} ${dsType.statValue} text-black`}>{value}</p>
      <p className={`${caseBodyTextClass} mt-1 leading-[1.4]`}>
        {label}
        <br />
        <span className="font-bold" style={{ color: accent }}>
          {highlight}
        </span>
      </p>
    </div>
  );
}

function ImpactSection({ section, study, accent }) {
  return (
    <section id={section.id} className="scroll-mt-28 bg-white text-black">
      <div className={caseStudyDesktopFrameClass}>
        <div className={caseStudyDesktopContentClass}>
          <SectionTitle section={section} />

          <div className="flex flex-col gap-12 min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:justify-between min-[1024px]:gap-10">
            <div className="max-w-[475px] space-y-3">
              <Award frontmatter={study.frontmatter} large />
              <CaseStudyBlocks blocks={allBlocks(section)} className={`space-y-7 ${caseBodyTextClass}`} />
            </div>

            {section.stats.length ? (
              <div className="flex flex-wrap gap-x-12 gap-y-8">
                {section.stats.map((stat) => (
                  <ImpactStat key={`${stat.value}${stat.highlight}`} {...stat} accent={accent} />
                ))}
              </div>
            ) : section.outcomes.length ? (
              <ol className={`w-full divide-y divide-zinc-200 border-y border-zinc-200 min-[1024px]:max-w-[475px] ${caseBodyTextClass}`}>
                {section.outcomes.map((outcome, index) => (
                  <li key={outcome} className="flex gap-4 py-4">
                    <span className="font-bold" style={{ color: accent }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <Inline text={outcome} />
                    </span>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function TransitionSection({ section }) {
  // Media can't sit on the gradient (its ends fade to white under white text),
  // so it moves to a white band right after.
  const blocks = allBlocks(section);
  const text = blocks.filter((block) => block.type !== "media");
  const media = blocks.filter((block) => block.type === "media");

  return (
    <>
      <section
        id={section.id}
        className="w-full text-white"
        style={{ backgroundImage: TRANSITION_GRADIENT }}
      >
        <div className={caseStudyDesktopFrameClass}>
          <div className={caseStudyDesktopContentClass}>
            {section.hasCustomEyebrow ? (
              <p className={`${caseSectionEyebrowClass} text-white/80`}>{section.eyebrow}</p>
            ) : null}
            <SectionTitle section={section} className="text-white" />
            <CaseStudyBlocks blocks={text} className={`space-y-7 ${caseBodyTextClass} text-white`} />
          </div>
        </div>
      </section>
      {media.length ? (
        <section className="bg-white text-black">
          <div className={dsLayout.caseStudySection}>
            <CaseStudyBlocks blocks={media} className="mx-auto w-full max-w-[1052px] space-y-7" />
          </div>
        </section>
      ) : null}
    </>
  );
}

const SECTION_COMPONENTS = {
  overview: OverviewSection,
  showcase: ShowcaseSection,
  impact: ImpactSection,
  transition: TransitionSection,
  content: ContentSection,
};

export default function CaseStudyPage({ study }) {
  const accent = study.frontmatter.accent ?? DEFAULT_ACCENT;
  return (
    <main className={`${dsFonts.body.className} min-h-screen bg-black pb-24 text-zinc-100`}>
      <Hero study={study} />

      {study.sections.map((section) => {
        const Section = SECTION_COMPONENTS[section.kind];
        return <Section key={section.id} section={section} study={study} accent={accent} />;
      })}

      <article className={`${dsLayout.pageFrame} pt-12 min-[720px]:pt-16 min-[1024px]:pt-20`}>
        <div className={dsSpacing.sectionGap}>
          <section className={`flex items-center justify-between ${dsDivider.topSpacedOnDark}`}>
            <Link
              href="/"
              className="text-base font-medium text-zinc-300 transition-colors hover:text-white min-[1024px]:text-lg"
            >
              Back to homepage
            </Link>
            <p className={`${dsType.eyebrow} text-zinc-500`}>
              {study.frontmatter.title} Case Study
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
