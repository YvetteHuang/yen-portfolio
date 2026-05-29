import Image from "next/image";
import Link from "next/link";
import {
  dsDivider,
  dsFonts,
  dsLayout,
  dsSpacing,
  dsType,
} from "@/lib/designSystem";

const overviewDetails = [
  { label: "MY ROLE", value: "Founding Designer" },
  { label: "TEAM", value: "2 Designers, Front-End Engineer" },
  { label: "PLATFORM", value: "Desktop & Mobile" },
  { label: "SCOPE", value: "Figma -> CSS -> Storybook" },
];

const contextChallengeParagraphs = [
  "When I joined StockNews.AI as a Founding Designer, the product was an MVP with no design guidelines - buttons had inconsistent border radii, colors were defined ad hoc, and the existing Figma template was bloated with unused components. Two designers were about to work on the same product simultaneously.",
  "Without a shared language, every sprint would create visual debt the engineering team would eventually pay. I proposed building a design system - and had to make the case for it despite initial skepticism about the time investment.",
  "I proposed building a design system. The harder part was making the case for it. In a fast-moving startup, anything that doesn't ship immediately is a hard sell.",
];

const phaseOneBuildItems = [
  {
    title: "Color system",
    body: "Primary blues, system colors (Bullish/Bearish), function colors - all with semantic naming",
  },
  {
    title: "Typography scale",
    body: "Archivo type family, Display -> Headline -> Body hierarchy with spec'd line heights and letter spacing",
  },
  {
    title: "Atomic components",
    body: "Inputs, buttons, tags - built in Figma with light/dark variants and WCAG-verified contrast (4.83:1)",
  },
  {
    title: "Naming convention",
    body: "Aligned to how engineers write CSS. Handoff became a translation, not an interpretation",
  },
];

const impactStats = [
  {
    value: "Consistency ↑",
    description: "Design misalignments dropped across platforms",
  },
  {
    value: "Scalability ↑",
    description: "System supported responsive & mobile-ready features",
  },
  {
    value: "-25% Handoff",
    description: "Engineer handoff cycle time reduced",
  },
];

const reflectionItems = [
  {
    label: "WHAT WORKED",
    body: "Starting lean and iterating. The Lite Version unblocked both designers immediately without becoming a bottleneck. Letting the system grow with the product meant it stayed relevant.",
  },
  {
    label: "WHAT WAS HARD",
    body: "Cleaning up the old bloated template was unexpectedly time-consuming. Merging inconsistent legacy components into a coherent system takes patience, and discipline to throw things away.",
  },
  {
    label: "WHAT THIS SHOWS",
    body: "I don't just design components. I think about how design decisions live and die in production. That's the part most designers skip.",
  },
  {
    label: "WHAT I'D DO DIFFERENTLY",
    body: "Establish CSS token alignment with engineering at the very start, before any components are built. Discovering the gap in production is a preventable problem.",
  },
];

const caseBodyTextClass = `${dsType.body} min-[1440px]:text-[1.125rem]`;
const caseSubtitleClass = `${caseBodyTextClass} font-bold uppercase leading-tight`;

export default function DesignSystemCaseStudy() {
  return (
    <main
      className={`${dsFonts.body.className} min-h-screen bg-black pb-24 text-zinc-100`}
    >
      <section className="w-full overflow-hidden border-b border-white/10">
        <div className="h-20 bg-[linear-gradient(100deg,#1C4481_0%,#096AFA_56%,#2DC3D8_100%)] min-[1024px]:h-24" />
        <div className="bg-white px-6 py-7 min-[720px]:py-8">
          <h1
            className={`${dsFonts.display.className} mx-auto max-w-[1100px] text-center text-[clamp(2.4rem,7vw,4rem)] font-semibold leading-tight tracking-tight text-black min-[1024px]:text-[4.25rem]`}
          >
            Design System for StockNews.ai
          </h1>
        </div>
        <div className="bg-[linear-gradient(100deg,#26314F_0%,#096AFA_56%,#2DBFDC_100%)]">
          <div className="mx-auto flex h-[clamp(420px,48vw,640px)] w-full max-w-[1280px] items-end justify-center px-6 pt-16">
            <div className="relative h-[390px] w-full max-w-[760px] min-[720px]:h-[500px] min-[1024px]:h-[560px]">
              <Image
                src="/homepage_ds.svg"
                alt="Design system case study hero visual"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section id="overview" className="bg-white text-black">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 py-16 min-[720px]:px-12 min-[1024px]:px-[114px] min-[1024px]:py-20">
          <header className="space-y-4">
            <p className="text-base font-bold uppercase">Overview</p>
            <h2
              className={`${dsFonts.display.className} max-w-[1116px] text-[clamp(2.4rem,7vw,3rem)] font-bold leading-none tracking-tight`}
            >
              Scaling Without Slowing Down
            </h2>
          </header>

          <div className="grid gap-10 min-[1024px]:grid-cols-[minmax(0,729px)_minmax(240px,1fr)] min-[1024px]:gap-5">
            <div className={`space-y-5 ${caseBodyTextClass}`}>
              <p>
                As a Founding Designer at an early-stage AI fintech startup, I
                built a design system from zero, in parallel with a live product
                redesign, with no dedicated DS engineer and an existing template
                too bloated and generic to fit the product.
              </p>
              <p>
                The challenge wasn&apos;t just building the system - it was
                deciding what to build first, when to pause, and when to push it
                further, all without slowing down the product.
              </p>
              <p>
                I approached it in three triggered phases, each one prompted by a
                real gap, not a predetermined plan.
              </p>
              <p>
                Impact: -25% engineer handoff cycle / Design consistency up
                across desktop & mobile / Scalable component library ready for
                Storybook integration
              </p>
            </div>

            <dl
              className={`grid gap-8 min-[720px]:grid-cols-2 min-[1024px]:block min-[1024px]:space-y-8 ${caseBodyTextClass}`}
            >
              {overviewDetails.map((detail) => (
                <div key={detail.label} className="space-y-1">
                  <dt className="font-bold">{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="context" className="bg-white text-black">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 py-16 min-[720px]:px-12 min-[1024px]:px-[114px] min-[1024px]:py-20">
          <header className="space-y-4">
            <p className="text-base font-bold uppercase">Context</p>
            <h2
              className={`${dsFonts.display.className} max-w-[980px] text-[clamp(2.35rem,7vw,3rem)] font-bold leading-[1.1] tracking-tight`}
            >
              We Were Building a Product With No Design Foundation
            </h2>
          </header>

          <div className="grid gap-6 min-[1024px]:grid-cols-[194px_minmax(0,838px)] min-[1024px]:gap-5 min-[1024px]:self-end">
            <h3 className={caseSubtitleClass}>
              Challenge
            </h3>
            <div className={`space-y-5 ${caseBodyTextClass}`}>
              {contextChallengeParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-6 min-[1024px]:ml-auto min-[1024px]:w-[838px] min-[1024px]:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] min-[1024px]:gap-3">
            <div className="space-y-3">
              <figure>
                <Image
                  src="/ds_chaotic_labeling_system.svg"
                  alt="Chaotic labeling system in the original product interface"
                  width={474}
                  height={181}
                  className="h-auto w-full rounded"
                />
                <figcaption className="mt-1 text-center text-xs text-zinc-400">
                  Chaotic Labeling System
                </figcaption>
              </figure>
              <figure>
                <Image
                  src="/ds_bloated_DS_template.svg"
                  alt="Bloated design system template with unused styles and screens"
                  width={474}
                  height={302}
                  className="h-auto w-full rounded"
                />
                <figcaption className="mt-1 text-center text-xs text-zinc-400">
                  Bloated Design System Template
                </figcaption>
              </figure>
            </div>

            <figure>
              <Image
                src="/ds_mvp_design.svg"
                alt="StockNews MVP interface without a design guideline"
                width={437}
                height={425}
                className="h-auto w-full rounded-lg"
              />
              <figcaption className="mt-1 text-center text-xs text-zinc-400">
                MVP Design without Design Guideline
              </figcaption>
            </figure>
          </div>

          <div className="grid gap-6 min-[1024px]:grid-cols-[194px_minmax(0,838px)] min-[1024px]:gap-5 min-[1024px]:self-end">
            <h3 className={caseSubtitleClass}>
              Strategy
            </h3>
            <p className={caseBodyTextClass}>
              Rather than building everything at once, I mapped a phased
              delivery - starting with what would unblock the team immediately,
              and letting each next phase be triggered by a real gap I
              discovered along the way.
            </p>
          </div>

          <figure className="min-[1024px]:ml-auto min-[1024px]:w-[838px]">
            <Image
              src="/ds_flow_diagram.svg"
              alt="Design system building workflow from audit to Figma system, CSS implementation, and Storybook"
              width={838}
              height={215}
              className="h-auto w-full rounded"
            />
          </figure>
        </div>
      </section>

      <section id="phase-01" className="bg-white text-black">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 py-16 min-[720px]:px-12 min-[1024px]:px-[114px] min-[1024px]:py-20">
          <header className="space-y-4">
            <p className="text-base font-bold uppercase">
              Phase 01 - Audit/ Style/ Atom
            </p>
            <h2
              className={`${dsFonts.display.className} max-w-[980px] text-[clamp(2.35rem,7vw,3rem)] font-bold leading-none tracking-tight`}
            >
              A Lite Version, Built in Parallel
            </h2>
          </header>

          <div className="flex flex-col gap-6 min-[1024px]:ml-auto min-[1024px]:w-[1052px]">
            <div className="grid gap-4 min-[1024px]:grid-cols-[194px_minmax(0,838px)] min-[1024px]:gap-5">
              <h3 className={caseSubtitleClass}>
                Problem
              </h3>
              <div className={`space-y-1 ${caseBodyTextClass}`}>
                <p className="font-semibold">
                  Designers shipping simultaneously, no time to build a full
                  system first
                </p>
                <p className="font-normal">
                  I was leading the core product redesign. The second designer
                  was building the landing page. We needed shared buttons,
                  colors, and type - but I couldn&apos;t pause the redesign to
                  build a full system first.
                </p>
              </div>
            </div>

            <div className="grid gap-4 min-[1024px]:grid-cols-[194px_minmax(0,838px)] min-[1024px]:gap-5">
              <h3 className={caseSubtitleClass}>
                Decision
              </h3>
              <div className={`space-y-1 ${caseBodyTextClass}`}>
                <p className="font-semibold">
                  Ship a Lite Version first - unblock both designers without
                  pausing the redesign
                </p>
                <p className="font-normal">
                  Ship a Lite Version immediately, covering only the essentials.
                  Style tokens (color, type, spacing), atomic components
                  (buttons, inputs, tags), and clear naming conventions so the
                  engineer could mirror the system in CSS without ambiguity.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 min-[1024px]:grid-cols-[194px_minmax(0,838px)] min-[1024px]:gap-5">
            <h3 className={caseSubtitleClass}>
              What I Built
            </h3>
            <ul className={`space-y-6 pl-6 marker:text-black ${caseBodyTextClass}`}>
              {phaseOneBuildItems.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold">{item.title}:</p>
                  <p className="font-normal">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <figure className="min-[1024px]:ml-auto min-[1024px]:w-[1055px]">
            <Image
              src="/ds_phase1_Img.svg"
              alt="Phase one design system outputs including logo, colors, typography, buttons, and inputs"
              width={2135}
              height={631}
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <section id="phase-02" className="bg-white text-black">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 py-16 min-[720px]:px-12 min-[1024px]:px-[114px] min-[1024px]:py-20">
          <header className="space-y-4">
            <p className="text-base font-bold uppercase">
              Phase 02 - Organisms/ Documentation
            </p>
            <h2
              className={`${dsFonts.display.className} max-w-[980px] text-[clamp(2.35rem,7vw,3rem)] font-bold leading-none tracking-tight`}
            >
              The System Grows With the Product
            </h2>
          </header>

          <div className="flex flex-col gap-6 min-[1024px]:ml-auto min-[1024px]:w-[1052px]">
            <div className="grid gap-4 min-[1024px]:grid-cols-[194px_minmax(0,838px)] min-[1024px]:gap-5">
              <h3 className={caseSubtitleClass}>
                Trigger
              </h3>
              <div className={`space-y-1 ${caseBodyTextClass}`}>
                <p className="font-semibold">
                  Redesign shipped. Time to close the gaps
                </p>
                <p className="font-normal">
                  Once the core redesign went live, I returned to the system
                  with time to do it properly. The product had grown - new
                  features meant new component patterns that hadn&apos;t been
                  formalized. I documented the full organism layer and wrote
                  interaction specs: hover states, expand/collapse behavior,
                  tooltip triggers, and copy-to-clipboard flows.
                </p>
              </div>
            </div>

            <div className="grid gap-4 min-[1024px]:grid-cols-[194px_minmax(0,838px)] min-[1024px]:gap-5">
              <h3 className={caseSubtitleClass}>
                Approach
              </h3>
              <div className={`space-y-1 ${caseBodyTextClass}`}>
                <p className="font-semibold">
                  Add new components back. Write specs the team can follow.
                </p>
                <p className="font-normal">
                  The redesign had introduced new patterns that lived in the
                  product but not in the system. Every new component was
                  becoming a one-off. I went back to formalize what we&apos;d
                  built - turning product decisions into reusable system rules.
                </p>
              </div>
            </div>
          </div>

          <figure className="min-[1024px]:ml-auto min-[1024px]:w-[853px]">
            <Image
              src="/ds_phase2_Img.svg"
              alt="Phase two mapping from product components to reusable design system components"
              width={853}
              height={400}
              className="h-auto w-full"
            />
            <figcaption className="mt-1 grid gap-2 text-center text-xs leading-[1.4] text-zinc-700 min-[720px]:grid-cols-2">
              <span>Adding Design System Components from Design</span>
              <span>Components in Design System</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="phase-03" className="bg-white text-black">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 py-16 min-[720px]:px-12 min-[1024px]:px-[114px] min-[1024px]:py-20">
          <header className="space-y-4">
            <p className="text-base font-bold uppercase">
              Phase 03 - CSS System/ Storybook
            </p>
            <h2
              className={`${dsFonts.display.className} max-w-[980px] text-[clamp(2.35rem,7vw,3rem)] font-bold leading-[1.1] tracking-tight`}
            >
              When I Realized the System Wasn&apos;t Crossing the Line
            </h2>
          </header>

          <div className="flex flex-col gap-6 min-[1024px]:ml-auto min-[1024px]:w-[1052px]">
            <div className="grid gap-4 min-[1024px]:grid-cols-[194px_minmax(0,838px)] min-[1024px]:gap-5">
              <h3 className={caseSubtitleClass}>
                Problem
              </h3>
              <div className={`space-y-5 ${caseBodyTextClass}`}>
                <div className="space-y-1">
                  <p className="font-semibold">Engineering gap discovered</p>
                  <p className="font-normal">
                    After the redesign launched, I started noticing visual
                    inconsistencies in production - components with slightly off
                    colors, hover states that didn&apos;t match the spec. I
                    traced it back: engineers were applying styles directly in
                    their templates, not pulling from a shared CSS token system.
                  </p>
                </div>
                <p className="font-normal">
                  The design system existed in Figma, but it wasn&apos;t living
                  in code.
                </p>
              </div>
            </div>

            <figure className="min-[1024px]:ml-auto min-[1024px]:w-[843px]">
              <figcaption className="mb-1 grid gap-2 text-center text-sm leading-[1.36] min-[720px]:grid-cols-[450px_369px] min-[720px]:gap-6">
                <span className="text-[#b83d3d]">Implementation</span>
                <span className="text-[#4ba871]">Design in Figma</span>
              </figcaption>
              <div className="grid gap-6 min-[720px]:grid-cols-[minmax(0,450px)_minmax(0,369px)]">
                <Image
                  src="/ds_phase3_implementation.svg"
                  alt="Implementation screenshot annotated with inaccurate colors and mismatched layout patterns"
                  width={450}
                  height={350}
                  className="h-auto w-full rounded-[10px]"
                />
                <Image
                  src="/ds_phase3_design.svg"
                  alt="Figma design reference for the same component pattern"
                  width={369}
                  height={350}
                  className="h-auto w-full rounded-[10px]"
                />
              </div>
            </figure>
          </div>

          <div className="flex flex-col gap-6 min-[1024px]:ml-auto min-[1024px]:w-[1052px]">
            <div className="grid gap-4 min-[1024px]:grid-cols-[194px_minmax(0,838px)] min-[1024px]:gap-5">
              <h3 className={caseSubtitleClass}>
                Decision
              </h3>
              <div className={`space-y-1 ${caseBodyTextClass}`}>
                <p className="font-semibold">
                  Build a Storybook to be the only source of truth
                </p>
                <p className="font-normal">
                  I made the case to build toward Storybook, a component library
                  in code that engineers could pull from directly. This meant
                  bridging the gap between my Figma tokens and the CSS variables
                  the engineering team was already using, and documenting the
                  component API so they could implement with confidence.
                </p>
              </div>
            </div>

            <figure className="min-[1024px]:ml-auto min-[1024px]:w-[838px]">
              <div className="grid gap-3 min-[720px]:grid-cols-2">
                <Image
                  src="/ds_phase3_figma_variable.svg"
                  alt="Figma variables used to define reusable design tokens"
                  width={429}
                  height={266}
                  className="h-auto w-full rounded-[10px]"
                />
                <Image
                  src="/ds_phase3_vscode.svg"
                  alt="VS Code showing CSS variables connected to design system tokens"
                  width={422}
                  height={263}
                  className="h-auto w-full rounded-[10px]"
                />
              </div>
              <Image
                src="/ds_phase3_storybook.svg"
                alt="Storybook component documentation for the button component"
                width={848}
                height={516}
                className="mt-3 h-auto w-full rounded-[10px]"
              />
            </figure>
          </div>
        </div>
      </section>

      <section id="impact" className="bg-white text-black">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 py-16 min-[720px]:px-12 min-[1024px]:px-[114px] min-[1024px]:py-20">
          <h2
            className={`${dsFonts.display.className} text-[clamp(2.35rem,7vw,3rem)] font-bold leading-none tracking-tight`}
          >
            Impact
          </h2>

          <div className="grid gap-4 min-[720px]:grid-cols-3">
            {impactStats.map((stat) => (
              <article
                key={stat.value}
                className="rounded-lg bg-[#1476FF] px-6 py-7 text-white"
              >
                <p className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-none">
                  {stat.value}
                </p>
                <p className="mt-4 text-base leading-snug">{stat.description}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 min-[1024px]:grid-cols-2">
            <figure>
              <figcaption className="mb-2 text-center text-sm text-[#b83d3d]">
                Landing Page Before DS
              </figcaption>
              <Image
                src="/ds_impact_lp_before.svg"
                alt="Landing page before applying the design system"
                width={514}
                height={559}
                className="h-auto w-full"
              />
            </figure>
            <figure>
              <figcaption className="mb-2 text-center text-sm text-[#4ba871]">
                Landing Page After DS
              </figcaption>
              <Image
                src="/ds_impact_lp_after.svg"
                alt="Landing page after applying the design system"
                width={513}
                height={559}
                className="h-auto w-full"
              />
            </figure>
          </div>
        </div>
      </section>

      <section id="reflection" className="bg-white text-black">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 py-10 min-[720px]:px-12 min-[1024px]:px-[114px]">
          <header className="space-y-4">
            <p className="text-base font-bold">Reflection</p>
            <blockquote
              className={`${dsFonts.display.className} max-w-[1052px] text-[clamp(2rem,5vw,2.25rem)] font-bold italic leading-[1.25] tracking-tight`}
            >
              "A design system isn&apos;t a deliverable. It&apos;s an ongoing
              conversation between design intent and engineering reality"
            </blockquote>
          </header>

          <div className="flex flex-col gap-9 min-[1024px]:ml-auto min-[1024px]:w-[1052px]">
            {reflectionItems.map((item) => (
              <div
                key={item.label}
                className="grid gap-4 min-[1024px]:grid-cols-[194px_minmax(0,838px)] min-[1024px]:gap-5"
              >
                <h3 className={caseSubtitleClass}>
                  {item.label}
                </h3>
                <p className={caseBodyTextClass}>
                  {item.body}
                </p>
              </div>
            ))}
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
            <p className={`${dsType.meta} text-zinc-500`}>
              Design System Case Study
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
