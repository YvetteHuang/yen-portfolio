import Link from "next/link";
import Image from "next/image";
import {
  dsCaseStudyType,
  dsColors,
  dsFonts,
  dsLayout,
  dsRadius,
  dsSpacing,
  dsSurface,
  dsType,
} from "@/lib/designSystem";
import { WonderaSolutionFlowScroll } from "./WonderaSolutionFlowScroll";
import { WonderaSectionToc } from "./WonderaSectionToc";

const cs = dsCaseStudyType;
const wonderaEyebrowClass = `${dsType.meta} ${dsColors.wondera.eyebrow} font-semibold`;
const wonderaSubtitleClass = `${cs.subtitle} ${dsColors.text.secondaryOnDark}`;
const wonderaSectionTitleClass = `${dsFonts.display.className} ${cs.sectionTitle} ${dsColors.text.primaryOnDark}`;
const wonderaOverviewLabelClass = `${cs.body} font-bold ${dsColors.text.primaryOnDark}`;
const wonderaBodyStackClass = `${dsFonts.body.className} space-y-7 ${dsColors.text.secondaryOnDark}`;
const wonderaFeatureTitleClass = `${cs.featureTitle} ${dsColors.text.primaryOnDark}`;

function CaseStudyCaption({ variant = "neutral", className = "", children }) {
  const colorClass =
    variant === "before"
      ? dsColors.caseStudy.before
      : variant === "after"
        ? dsColors.caseStudy.after
        : dsColors.text.mutedOnDark;

  return (
    <p
      className={`${dsFonts.body.className} ${cs.caption} ${colorClass} ${className}`}
    >
      {children}
    </p>
  );
}

function PlaceholderFigure({
  label,
  size = "md",
  tone = "light",
}) {
  const sizeClass =
    size === "lg"
      ? "min-h-[280px] md:min-h-[380px]"
      : size === "sm"
        ? "min-h-[180px] md:min-h-[220px]"
        : "min-h-[220px] md:min-h-[280px]";

  const toneClass =
    tone === "dark"
      ? "bg-zinc-900 text-zinc-400 ring-zinc-700/70"
      : "bg-zinc-100 text-zinc-500 ring-zinc-200";

  return (
    <div
      className={`flex w-full items-center justify-center rounded-2xl ring-1 ${sizeClass} ${toneClass}`}
      role="img"
      aria-label={label}
    >
      <p className="px-6 text-center text-sm font-medium uppercase tracking-[0.22em]">
        {label}
      </p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <header className="space-y-3">
      <p className={`${dsFonts.body.className} ${wonderaEyebrowClass}`}>
        {eyebrow}
      </p>
      <h2 className={wonderaSectionTitleClass}>
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`${dsFonts.body.className} ${cs.body} ${dsLayout.textMax} ${dsColors.text.tertiaryOnDark}`}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

export default function WonderaCaseStudy() {
  const tocSections = [
    { id: "overview", label: "Overview" },
    { id: "context", label: "Context" },
    { id: "research", label: "Research" },
    { id: "design-for-engagement", label: "Design for engagement" },
    { id: "iteration-for-layout-design", label: "Iteration for layout design" },
    { id: "design-for-easy-management", label: "Design for easy management" },
    { id: "outcome", label: "Outcome" },
    { id: "reflection", label: "Reflection" },
  ];

  return (
    <main
      className={`${dsFonts.body.className} min-h-screen scroll-smooth bg-black pb-24 text-zinc-100`}
    >
      <section
        className={`${dsLayout.caseStudyHeroSection} ${dsLayout.caseStudyHeroHeight} ${dsColors.wondera.heroGradient}`}
      >
        <div className={dsLayout.caseStudyHeroNavSpacer} aria-hidden="true" />
        <div className={`${dsLayout.caseStudyHeroTitleBar} bg-black`}>
          <h1
            className={`${dsFonts.display.className} ${dsCaseStudyType.heroTitle} ${dsLayout.caseStudyHeroTitlePadding} text-center text-white`}
          >
            Wondera
          </h1>
        </div>
        <div
          className={`${dsLayout.caseStudyHeroMedia} !pb-0 pt-6 min-[720px]:pt-8 min-[1024px]:pt-10`}
        >
          <div className="w-[52%] max-w-[680px] origin-bottom translate-y-7">
            <Image
              src="/wondera_cover.svg"
              alt="Wondera cover hero visual"
              width={1280}
              height={720}
              className="block h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>

      <article
        className={`${dsLayout.pageFrame} relative pt-12 min-[720px]:pt-16 min-[1024px]:pt-20`}
      >
        <div className="relative">
          <aside className="absolute inset-y-0 left-0 hidden w-52 -translate-x-[calc(100%+1.5rem)] min-[1400px]:block">
            <WonderaSectionToc sections={tocSections} />
          </aside>
          <div className={dsSpacing.sectionGap}>
            <section id="overview" className="scroll-mt-28 space-y-12">
          <div>
            <p
              className={`${dsFonts.body.className} ${wonderaEyebrowClass}`}
            >
              Overview
            </p>
            <h2 className={`${wonderaSectionTitleClass} mt-5`}>
              Improve the Engagement and Efficiency of AI training process for user
              to raise the conversion rate
            </h2>
          </div>

          <div className="grid gap-10 min-[1024px]:grid-cols-12 min-[1024px]:gap-14">
            <div className="min-[1024px]:col-span-8">
              <div
                className={`${dsFonts.body.className} space-y-7 ${dsColors.text.secondaryOnDark}`}
              >
                <p className={cs.body}>
                  This application aims to provide a fun and interactive way for
                  people to train AI models on the social karaoke app for
                  entertainment purposes.
                </p>
                <p className={cs.body}>
                  Originally designed as a purely social karaoke app, the
                  stakeholders shifted the focus to AI voice technology to give users
                  more imagination about their voice. In response, I restructured the
                  app to prioritize crucial features and enhance the user experience.
                  To make the training process more accessible and engaging, I
                  redesigned the user flow and created visual aids to help users track
                  their progress. These improvements resulted in a 18% increase in
                  daily active users and a 12% increase in the completion rate of
                  users obtaining an AI model.
                </p>
              </div>
            </div>

            <aside className={`space-y-7 ${cs.body} ${dsColors.text.secondaryOnDark}`}>
              <div className="space-y-1">
                <p className={wonderaOverviewLabelClass}>Skill</p>
                <p>UX Design</p>
              </div>
              <div className="space-y-1">
                <p className={wonderaOverviewLabelClass}>Team</p>
                <p>Product Manager, Developers</p>
              </div>
              <div className="space-y-1">
                <p className={wonderaOverviewLabelClass}>Platform</p>
                <p>Mobile &amp; Desktop</p>
              </div>
              <div className="space-y-1">
                <p className={wonderaOverviewLabelClass}>Company</p>
                <p>Wondera</p>
              </div>
            </aside>
          </div>
        </section>

        <section id="context" className={`${dsSpacing.sectionInner} scroll-mt-28`}>
          <div className="space-y-10">
            <div>
              <p
                className={`${dsFonts.body.className} ${wonderaEyebrowClass}`}
              >
                Context
              </p>
              <h2
                className={`${wonderaSectionTitleClass} mt-3`}
              >
                AI-Empowered Karaoke Social App for General Public
              </h2>
            </div>

            <div className="space-y-10 min-[1024px]:space-y-12">
              <div className={dsLayout.caseStudySplit}>
                <div>
                  <p className={`${wonderaSubtitleClass}`}>
                    Challenge
                  </p>
                </div>
                <div>
                  <div className={wonderaBodyStackClass}>
                    <p className={cs.body}>
                      Wondera is a unique AI-empowered karaoke social app designed to
                      help users train their personal AI voice through the fun and
                      engaging medium of karaoke. Initially designed as a gamified
                      social karaoke app, Wondera shifted its focus to include AI
                      voice training upon joining the team. Despite this innovative
                      feature, the adoption rate of personal AI models among users
                      remains low.
                    </p>
                    <p className={cs.body}>
                      Our primary revenue stream comes from AI model training and
                      generating songs with these AI models. The key challenge we
                      face is increasing the number of users who own and actively
                      use their personal AI models.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${dsSpacing.sectionTopSpaced} ${dsLayout.caseStudySplit}`}>
                <div>
                  <p className={`${wonderaSubtitleClass}`}>
                    Target Users
                  </p>
                </div>
                <div>
                  <div className={`${cs.body} space-y-6 text-zinc-200`}>
                    <p>
                      The target users are individuals who are not familiar with
                      complex AI training processes but are passionate about
                      exploring and experimenting with new technology for
                      entertainment and social purposes. These include casual
                      singers, social media users, and content creators.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <p className={wonderaFeatureTitleClass}>Casual Singers</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          <li>
                            Enjoy singing their favorite songs in different
                            languages for fun.
                          </li>
                          <li>
                            Experiment with different genres and cultural music
                            through AI voice.
                          </li>
                        </ul>
                      </div>

                      <div>
                        <p className={wonderaFeatureTitleClass}>
                          Social Media Users
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          <li>
                            Enjoy sharing their AI-generated singing performances
                            for social engagement.
                          </li>
                        </ul>
                      </div>

                      <div>
                        <p className={wonderaFeatureTitleClass}>Content Creators</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          <li>
                            Create unique and engaging content by singing in
                            multiple languages through AI voice.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id="research" className={`${dsSpacing.sectionInner} scroll-mt-28`}>
          <SectionHeading
            eyebrow="Research"
            title="Flow Gap between Karaoke and AI-Voice Training"
          />

          <div className="mt-10 space-y-12">
            <div className={dsLayout.caseStudySplit}>
              <div>
                <p className={`${wonderaSubtitleClass}`}>
                  Interviews
                </p>
              </div>

              <div>
                <div className="space-y-6">
                  <p className={`${cs.body} text-zinc-300`}>
                    To understand users&apos; pain points, I interviewed 6 users and conducted
                    think-aloud sessions while they used the app. I asked what attracted them
                    to try AI training, how satisfied they were with the experience, and the
                    biggest challenges they faced when training an AI voice model.
                  </p>

                  <div className="space-y-6">
                    <div
                      className={`flex items-start gap-4 p-4 ${dsRadius.lg} ${dsSurface.elevatedCardOnDark}`}
                    >
                      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-zinc-800">
                        <Image
                          src="/user1.png"
                          alt="Participant 1 illustration"
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className={`${cs.body} font-bold ${dsColors.text.secondaryOnDark}`}>
                          Participant 1
                        </p>
                        <p className={`${cs.body} text-zinc-300`}>
                          &quot;I don&apos;t know where to check my training progress and what all
                          the numbers on the card mean.&quot;
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex items-start gap-4 p-4 ${dsRadius.lg} ${dsSurface.elevatedCardOnDark}`}
                    >
                      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-zinc-800">
                        <Image
                          src="/user3.png"
                          alt="Participant 2 illustration"
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className={`${cs.body} font-bold ${dsColors.text.secondaryOnDark}`}>
                          Participant 2
                        </p>
                        <p className={`${cs.body} text-zinc-300`}>
                          &quot;I don&apos;t have patience. It feels like I need to spend a lot of
                          time just to train one model.&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${dsSpacing.sectionTopSpaced} ${dsLayout.caseStudySplit}`}>
              <div>
                <p className={`${wonderaSubtitleClass}`}>Research Highlight</p>
              </div>
              <div>
                <div className={wonderaBodyStackClass}>
                  <div>
                    <p className={wonderaFeatureTitleClass}>
                      1. Engagement Challenges for Beginners
                    </p>
                    <p className="mt-2 text-zinc-300">
                      Beginner users struggle to stay engaged in the AI training process due to a
                      disconnect between the karaoke-focused home page and the AI training flow.
                      To check their training progress, they must navigate away from the main
                      experience into profile and AI card views, which creates confusion and extra
                      steps for new users.
                    </p>
                  </div>
                  <div>
                    <p className={wonderaFeatureTitleClass}>
                      2. Desire for Clearer Information on Training Materials
                    </p>
                    <p className="mt-2 text-zinc-300">
                      More advanced users want detailed insight into the recordings they upload
                      and how those materials influence the AI model quality. They expect guidance
                      on language, pitch range, and recording quality so they can intentionally
                      improve their AI voice instead of guessing what to do next.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-6 text-white">
          <div
            className={`relative left-1/2 right-1/2 w-screen -translate-x-1/2 py-16 min-[720px]:py-20 min-[1024px]:py-24 ${dsColors.wondera.quoteBandBackground}`}
          >
            <div className={`${dsLayout.pageFrame}`}>
              <p
                className={`${dsFonts.display.className} ${cs.pullQuote} max-w-4xl text-left`}
              >
                How Might We enhance <span className="font-extrabold">engagement</span> and{" "}
                <span className="font-extrabold">ease of management</span> for AI voice training
                within our product?
              </p>
            </div>
          </div>
        </section>

        <section
          id="design-for-engagement"
          className={`${dsSpacing.sectionInner} scroll-mt-28`}
        >
          <div className="space-y-10">
            <div>
              <p
                className={`${dsFonts.body.className} ${wonderaEyebrowClass}`}
              >
                Design for engagement
              </p>
              <h2
                className={`${wonderaSectionTitleClass} mt-3`}
              >
                Boosting{" "}
                <span className={dsColors.wondera.eyebrow}>Engagement</span> with Integrated Training
                Flow, and a Progress Map Layout
              </h2>
            </div>

            <div className={dsLayout.caseStudySplit}>
              <div>
                <p className={`${wonderaSubtitleClass}`}>Product direction</p>
              </div>
              <div>
                <div className={wonderaBodyStackClass}>
                  <p>
                    Wondera began as a social karaoke experience; the product direction shifted
                    toward AI voice training as a core value. The design response was to treat
                    singing and training as one continuous journey instead of two disconnected
                    surfaces—so users stay motivated from first song through model completion.
                  </p>
                  <p>
                    That meant tightening navigation between discovery, recording, and progress,
                    and surfacing training status where people already spend time, rather than
                    hiding it behind profile-only entry points.
                  </p>
                </div>
              </div>
            </div>

            <div className={`${dsSpacing.sectionTopSpaced} ${dsLayout.caseStudySplit}`}>
              <div>
                <p className={`${wonderaSubtitleClass}`}>Solution</p>
              </div>
              <div>
                <div className={`${cs.body} space-y-8 text-zinc-200`}>
                  <p>
                    We integrated the training flow with the main singing loop: users can see how
                    recordings feed the model, jump between practice and training tasks, and return
                    to the map without losing context. The flow strip below compares the previous
                    fragmented journey with the unified one we shipped.
                  </p>

                  <div className={`${dsRadius.lg} ${dsSurface.subtleCardOnDark} p-6 min-[1024px]:p-8`}>
                    <WonderaSolutionFlowScroll />
                  </div>
                </div>
              </div>
            </div>

            <div className={`${dsSpacing.sectionTopSpaced} ${dsLayout.caseStudySplit}`}>
              <div>
                <p className={`${wonderaSubtitleClass}`}>Map layout</p>
              </div>
              <div>
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div>
                      <p
                        className={`${dsFonts.body.className} ${cs.featureTitle} ${dsColors.text.primaryOnDark}`}
                      >
                        1. Linear Progression with Hub-and-Spoke Navigation
                      </p>
                      <p className={`${cs.body} mt-2 text-zinc-300`}>
                        Showing all levels in a map and the song number required for
                        leveling up.
                      </p>
                    </div>
                    <div className="mx-auto w-full max-w-[280px] min-[720px]:max-w-[300px] min-[1024px]:max-w-[320px]">
                      <Image
                        src="/wondera_leveldisplay.gif"
                        alt="Linear progression map layout level display demo"
                        width={262}
                        height={566}
                        className="h-auto w-full"
                        unoptimized
                      />
                    </div>
                  </div>

                  <div className={`space-y-6 ${dsSpacing.sectionTopSpaced}`}>
                    <div>
                      <p
                        className={`${dsFonts.body.className} ${cs.featureTitle} ${dsColors.text.primaryOnDark}`}
                      >
                        2. Unified Navigation with Expandable Level Details
                      </p>
                    </div>
                    <div className="mx-auto w-full max-w-[280px] min-[720px]:max-w-[300px] min-[1024px]:max-w-[320px]">
                      <Image
                        src="/wondera_expandable_display.gif"
                        alt="Expandable level details display demo"
                        width={262}
                        height={566}
                        className="h-auto w-full"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="iteration-for-layout-design"
          className={`${dsSpacing.sectionInner} scroll-mt-28`}
        >
          <div className="space-y-10">
            <div>
              <p
                className={`${dsFonts.body.className} ${wonderaEyebrowClass}`}
              >
                Iteration for layout design
              </p>
              <h2
                className={`${wonderaSectionTitleClass} mt-3`}
              >
                Iteration for Layout Design
              </h2>
            </div>

            <div className={dsLayout.caseStudySplit}>
              <div>
                <p className={`${wonderaSubtitleClass}`}>User testing</p>
              </div>
              <div>
                <div className={wonderaBodyStackClass}>
                  <p>
                    Through user testing sessions with five participants, I discovered
                    that all users appreciated the second design, unified navigation.
                  </p>
                  <p>
                    However, one participant noted that the layout made it somewhat
                    difficult to identify the current level. She was unsure whether the
                    current level was the upper or lower one.
                  </p>
                </div>
              </div>
            </div>

            <div className={`${dsSpacing.sectionTopSpaced} ${dsLayout.caseStudySplit}`}>
              <div>
                <p className={`${wonderaSubtitleClass}`}>Redesign</p>
              </div>
              <div>
                <p className={`${cs.body} text-zinc-200`}>
                  I found that the current reading order could be confusing for users.
                  To address this, I reversed the order from bottom to top. This way,
                  the training map starts from the completed level and progresses to the
                  next level that requires more training materials. For example, after
                  finishing the first level, the user will need to train with 5 songs to
                  reach the Level 2 model.
                </p>
              </div>
            </div>

            <div className={`${dsSpacing.sectionTopSpaced} ${dsLayout.caseStudySplit}`}>
              <div  />
              <div>
                <div className="grid grid-cols-1 gap-8 min-[720px]:grid-cols-2 min-[1024px]:gap-10">
                  <div className="flex h-full flex-col justify-between gap-4">
                    <Image
                      src="/wondera_iteration_before.svg"
                      alt="Before redesign showing top to bottom level progression"
                      width={300}
                      height={648}
                      className="mx-auto h-auto w-full max-w-[450px]"
                    />
                    <CaseStudyCaption variant="before">
                      Before - Top to bottom
                    </CaseStudyCaption>
                  </div>
                  <div className="flex h-full flex-col justify-between gap-4">
                    <Image
                      src="/wondera_iteration_after.svg"
                      alt="After redesign showing bottom to top level progression"
                      width={300}
                      height={648}
                      className="mx-auto h-auto w-full max-w-[450px]"
                    />
                    <CaseStudyCaption variant="after">
                      After - Bottom to top
                    </CaseStudyCaption>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="design-for-easy-management"
          className={`${dsSpacing.sectionInner} scroll-mt-28`}
        >
          <div className="space-y-10">
            <div>
              <p
                className={`${dsFonts.body.className} ${wonderaEyebrowClass}`}
              >
                Design for easy management
              </p>
              <h2
                className={`${wonderaSectionTitleClass} mt-3`}
              >
                Empowering Users with Detailed Information and Intuitive Display for
                Better Model Training
              </h2>
            </div>

            <div className={dsLayout.caseStudySplit}>
              <div>
                <p className={`${wonderaSubtitleClass}`}>User needs</p>
              </div>
              <div>
                <p className={`${cs.body} text-zinc-200`}>
                  From user interviews, it became clear that experienced users require
                  more detailed information and an intuitive way to manage their
                  materials to train high-quality AI models.
                </p>
              </div>
            </div>

            <div className={`${dsSpacing.sectionTopSpaced} ${dsLayout.caseStudySplit}`}>
              <div>
                <p className={`${wonderaSubtitleClass}`}>Solution</p>
              </div>
              <div>
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div>
                      <p
                        className={`${dsFonts.body.className} ${cs.featureTitle} ${dsColors.text.primaryOnDark}`}
                      >
                        1. Provide Detailed Information
                      </p>
                      <p className={`${cs.body} mt-2 text-zinc-300`}>
                        Ensure users have access to comprehensive details about their
                        collected materials, such as voice quality, language, and range.
                      </p>
                    </div>
                    <div className="mx-auto w-full max-w-[280px] min-[720px]:max-w-[300px] min-[1024px]:max-w-[320px]">
                      <Image
                        src="/wondera_moredetails.gif"
                        alt="Detailed information display for collected voice training materials"
                        width={262}
                        height={566}
                        className="h-auto w-full"
                        unoptimized
                      />
                    </div>
                  </div>

                  <div className={`space-y-6 ${dsSpacing.sectionTopSpaced}`}>
                    <div>
                      <p
                        className={`${dsFonts.body.className} ${cs.featureTitle} ${dsColors.text.primaryOnDark}`}
                      >
                        2. Enhanced Display
                      </p>
                      <p className={`${cs.body} mt-2 text-zinc-300`}>
                        Introduce a more intuitive display that includes brief
                        information about the current model level and details for each
                        song.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 min-[720px]:grid-cols-2 min-[1024px]:gap-10">
                      <div className="flex h-full flex-col justify-between gap-4">
                        <Image
                          src="/wondera_enhance_display_before.svg"
                          alt="Before enhanced display with fragmented material overview"
                          width={300}
                          height={648}
                          className="mx-auto h-auto w-full max-w-[450px]"
                        />
                        <CaseStudyCaption variant="before">Before</CaseStudyCaption>
                      </div>
                      <div className="flex h-full flex-col justify-between gap-4">
                        <Image
                          src="/wondera_enhance_display_after.svg"
                          alt="After enhanced display with clearer level and song details"
                          width={300}
                          height={648}
                          className="mx-auto h-auto w-full max-w-[450px]"
                        />
                        <CaseStudyCaption variant="after">After</CaseStudyCaption>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="outcome" className={`${dsSpacing.sectionInner} scroll-mt-28`}>
          <SectionHeading
            eyebrow="Outcome"
            title="Impact"
            subtitle="The redesign improved understanding, confidence, and overall engagement."
          />
          <div className="grid gap-4 min-[1024px]:grid-cols-2">
            <div className={`${dsRadius.lg} ${dsSurface.accentCardWondera} p-5`}>
              <p
                className={`${dsFonts.display.className} ${cs.statValue} ${dsColors.wondera.accentText}`}
              >
                +18%
              </p>
              <p className={`${cs.body} mt-2 text-zinc-200`}>
                Daily engagement with the training feature
              </p>
            </div>
            <div className={`${dsRadius.lg} ${dsSurface.accentCardWondera} p-5`}>
              <p
                className={`${dsFonts.display.className} ${cs.statValue} ${dsColors.wondera.accentText}`}
              >
                +12%
              </p>
              <p className={`${cs.body} mt-2 text-zinc-200`}>AI model ownership rate</p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[320px] min-[720px]:max-w-[360px] min-[1024px]:max-w-[420px]">
            <Image
              src="/wondera_layout.gif"
              alt="Final product showcase of Wondera training layout"
              width={430}
              height={932}
              className="h-auto w-full"
              unoptimized
            />
          </div>
        </section>

        <section
          id="reflection"
          className={`scroll-mt-28 space-y-5 ${dsSpacing.sectionTopSpaced}`}
        >
          <SectionHeading
            eyebrow="Reflection"
            title="Key Takeaways"
            subtitle="Designing AI products is as much about trust and guidance as it is about capability."
          />
          <div className={`${cs.body} space-y-8 text-zinc-300`}>
            <div className="space-y-3">
              <p className={`${cs.featureTitle} ${dsColors.text.primaryOnDark}`}>
                - The balance between business needs and user experience
              </p>
              <p>
                Initially, I encountered challenges with implementing features, such as
                adding a button to direct users to the shop within the app, which
                risked disrupting the user experience. Adding this extra flow seemed to
                interfere with the main functionality of the product. To address this, I
                began to explore the reasoning behind the proposed design, aiming to
                understand the underlying intentions.
              </p>
              <p>
                By considering the business objectives, I learned to redefine the
                problem and develop new ideas that balance both business needs and user
                experience. This approach allowed me to create solutions that are more
                cohesive and user-friendly, aligning better with the overall goals of
                the product.
              </p>
            </div>
            <div className="space-y-3">
              <p className={`${cs.featureTitle} ${dsColors.text.primaryOnDark}`}>
                - The challenge of adding extra focus on an existing framework
              </p>
              <p>
                The app initially functioned as a Karaoke platform with a
                well-developed gamification system. However, integrating an AI focus
                shifted the product&apos;s priorities, presenting challenges in merging
                the new system with the existing one. This shift required rapid
                iteration to respond to feedback from both user testing and investors.
              </p>
              <p>
                Through this process, I learned the importance of quickly pinpointing
                key areas for improvement, iterating efficiently, and employing rapid
                prototyping to evaluate design assumptions. This experience honed my
                ability to adapt to changing priorities while maintaining a cohesive user
                experience.
              </p>
            </div>
          </div>
        </section>

        <section
          className={`flex items-center justify-between ${dsSpacing.sectionTopSpaced}`}
        >
          <Link
            href="/"
            className="text-base font-medium text-zinc-300 transition-colors hover:text-white min-[1024px]:text-lg"
          >
            Back to homepage
          </Link>
          <p className={`${dsType.meta} text-zinc-500`}>
            Wondera Case Study
          </p>
        </section>
          </div>
        </div>
      </article>
    </main>
  );
}
