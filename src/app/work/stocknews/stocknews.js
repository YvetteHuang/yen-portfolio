import Link from "next/link";
import Image from "next/image";
import {
  dsColors,
  dsDivider,
  dsFonts,
  dsLayout,
  dsSpacing,
  dsType,
} from "@/lib/designSystem";

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <header className="space-y-3">
      <p
        className={`${dsFonts.body.className} ${dsType.meta} ${dsColors.text.mutedOnDark} font-semibold`}
      >
        {eyebrow}
      </p>
      <h2 className={`${dsFonts.display.className} ${dsType.h2} ${dsColors.text.primaryOnDark} font-semibold`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`${dsFonts.body.className} ${dsType.body} ${dsLayout.textMax} ${dsColors.text.tertiaryOnDark}`}>
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

export default function StockNewsCaseStudy() {
  return (
    <main className={`${dsFonts.body.className} min-h-screen bg-black pb-24 text-zinc-100`}>
      <section className="relative h-[clamp(360px,60vw,980px)] w-full overflow-hidden border-b border-white/10 bg-[linear-gradient(to_bottom_right,#87AEF6_0%,#5494DD_36%,#4271AA_62%,#1E2A43_100%)]">
        <div className="absolute inset-x-0 top-20 z-20 flex items-center justify-center bg-black py-5 lg:top-24 lg:py-5">
          <h1
            className={`${dsFonts.display.className} ${dsType.h1} px-6 text-center font-semibold tracking-tight text-white`}
          >
            StockNews.ai
          </h1>
        </div>
        <div className="relative mx-auto flex h-full w-full max-w-[1800px] items-end justify-center px-2 pb-1 pt-28 min-[720px]:px-4 min-[720px]:pt-32 min-[1024px]:pb-3 min-[1024px]:pt-36">
          <div className="relative h-[324px] w-full max-w-[1488px] min-[720px]:h-[432px] min-[1024px]:h-[600px]">
            <Image
              src="/homepage_stocknews.svg"
              alt="StockNews case study hero visual"
              fill
              className="object-contain p-0"
              priority
            />
          </div>
        </div>
      </section>

      <article className={`${dsLayout.pageFrame} pt-12 min-[720px]:pt-16 min-[1024px]:pt-20`}>
        <div className={dsSpacing.sectionGap}>
          <section id="overview" className="space-y-8">
            <SectionHeading
              eyebrow="Overview"
              title="Build a clearer and more guided stock learning workflow"
              subtitle="This page is a starter structure for your StockNews case study. You can keep refining copy, visuals, and interaction details section by section."
            />
            <div className="grid gap-8 min-[1024px]:grid-cols-12">
              <div className="min-[1024px]:col-span-8">
                <div className={`${dsType.body} ${dsSpacing.paragraphGap} ${dsColors.text.secondaryOnDark}`}>
                  <p>
                    The current product mixes market updates, educational content, and personalized watchlists, but users can feel overwhelmed when deciding where to start.
                  </p>
                  <p>
                    The redesign direction focuses on clearer information hierarchy, stronger content grouping, and faster access to meaningful actions from each card.
                  </p>
                </div>
              </div>
              <aside className="min-[1024px]:col-span-4">
                <div className="space-y-6">
                  <div>
                    <p className={`${dsType.meta} font-semibold ${dsColors.text.primaryOnDark}`}>Role</p>
                    <p className="mt-1 text-xl text-zinc-200">Product Designer</p>
                  </div>
                  <div>
                    <p className={`${dsType.meta} font-semibold ${dsColors.text.primaryOnDark}`}>Scope</p>
                    <p className="mt-1 text-xl text-zinc-200">Research, UX, Visual Design</p>
                  </div>
                  <div>
                    <p className={`${dsType.meta} font-semibold ${dsColors.text.primaryOnDark}`}>Platform</p>
                    <p className="mt-1 text-xl text-zinc-200">Web</p>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section className={`${dsSpacing.sectionInner} ${dsSpacing.dividerTop}`}>
            <SectionHeading
              eyebrow="Problem"
              title="Users struggle to prioritize signals in a dense content feed"
              subtitle="Important updates, educational context, and task actions compete on the same surface."
            />
          </section>

          <section className={`${dsSpacing.sectionInner} ${dsSpacing.dividerTop}`}>
            <SectionHeading
              eyebrow="Solution"
              title="Introduce a staged information model and clearer action hierarchy"
              subtitle="Group content by intent and provide explicit next steps for each card type."
            />
          </section>

          <section className={`${dsSpacing.sectionInner} ${dsSpacing.dividerTop}`}>
            <SectionHeading
              eyebrow="Impact"
              title="Prepare measurable improvements in comprehension and task completion"
              subtitle="Add your final metrics here when you finish analysis and validation."
            />
          </section>

          <section className={`flex items-center justify-between ${dsDivider.topSpacedOnDark}`}>
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
