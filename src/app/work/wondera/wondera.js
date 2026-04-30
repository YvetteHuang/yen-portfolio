import Link from "next/link";
import Image from "next/image";
import { dsFonts, dsLayout, dsSpacing, dsType } from "@/lib/designSystem";
import { WonderaSolutionFlowScroll } from "./WonderaSolutionFlowScroll";

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
      <p className={`${dsFonts.body.className} ${dsType.meta} font-semibold text-violet-300`}>
        {eyebrow}
      </p>
      <h2
        className={`${dsFonts.display.className} ${dsType.h2} font-semibold leading-[1.08] tracking-tight text-zinc-100`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`${dsFonts.body.className} ${dsType.body} ${dsLayout.textMax} text-zinc-300`}>
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

export default function WonderaCaseStudy() {
  return (
    <main
      className={`${dsFonts.body.className} min-h-screen bg-black pb-24 text-zinc-100`}
    >
      <section className="relative h-[clamp(360px,60vw,1043px)] w-full overflow-hidden bg-[linear-gradient(to_top_right,#6320EE_0%,#351A6B_52%,#161616_100%)]">
        <div className="absolute inset-x-0 top-20 z-20 flex items-center justify-center bg-black py-5 lg:top-24 lg:py-5">
          <h1
            className={`${dsFonts.display.className} ${dsType.h1} font-semibold tracking-tight text-white`}
          >
            Wondera
          </h1>
        </div>
        <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-end justify-center px-6">
          <Image
            src="/wondera_cover.svg"
            alt="Wondera cover hero visual"
            width={1280}
            height={720}
            className="h-auto w-[50%] object-contain"
            priority
          />
        </div>
      </section>

      <article
        className={`${dsLayout.pageFrame} ${dsSpacing.sectionGap} pt-12 min-[720px]:pt-16 min-[1024px]:pt-20`}
      >
        <section className="space-y-12">
          <div>
            <p className={`${dsFonts.body.className} ${dsType.meta} font-semibold text-violet-300`}>
              Overview
            </p>
            <h2
              className={`${dsFonts.display.className} mt-5 text-[2.25rem] font-semibold leading-[1.14] tracking-tight text-zinc-100 min-[720px]:text-[2.75rem] min-[1024px]:text-[3.25rem] min-[1440px]:text-[4rem]`}
            >
              Improve the Engagement and Efficiency of AI training process for user
              to raise the conversion rate
            </h2>
          </div>

          <div className="grid gap-10 min-[1024px]:grid-cols-12 min-[1024px]:gap-14">
            <div className="min-[1024px]:col-span-8">
              <div className={`${dsType.body} ${dsSpacing.paragraphGap} text-zinc-200`}>
                <p>
                  This application aims to provide a fun and interactive way for
                  people to train AI models on the social karaoke app for
                  entertainment purposes.
                </p>
                <p>
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

            <aside className="min-[1024px]:col-span-4">
              <div className="space-y-7">
                <div>
                  <p className={`${dsType.meta} font-semibold text-zinc-100`}>Skill</p>
                  <p className="mt-1 text-xl text-zinc-200">UX Design</p>
                </div>
                <div>
                  <p className={`${dsType.meta} font-semibold text-zinc-100`}>Team</p>
                  <p className="mt-1 text-xl text-zinc-200">
                    Product Manager, Developers
                  </p>
                </div>
                <div>
                  <p className={`${dsType.meta} font-semibold text-zinc-100`}>
                    Platform
                  </p>
                  <p className="mt-1 text-xl text-zinc-200">Mobile &amp; Desktop</p>
                </div>
                <div>
                  <p className={`${dsType.meta} font-semibold text-zinc-100`}>Company</p>
                  <p className="mt-1 text-xl text-zinc-200">Wondera</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className={dsSpacing.sectionInner}>
          <div className="space-y-10">
            <div>
              <p className={`${dsFonts.body.className} ${dsType.meta} font-semibold text-violet-300`}>
                Context
              </p>
              <h2
                className={`${dsFonts.display.className} mt-3 text-[2.25rem] font-semibold leading-[1.14] tracking-tight text-zinc-100 min-[720px]:text-[2.75rem] min-[1024px]:text-[3.25rem] min-[1440px]:text-[4rem]`}
              >
                AI-Empowered Karaoke Social App for General Public
              </h2>
            </div>

            <div className="space-y-10 min-[1024px]:space-y-12">
              <div className="grid gap-6 min-[1024px]:grid-cols-12 min-[1024px]:gap-10">
                <div className="min-[1024px]:col-span-3 min-[1024px]:border-r min-[1024px]:border-white/10 min-[1024px]:pr-8">
                  <p className={`${dsType.subtitle} text-zinc-100`}>
                    Challenge
                  </p>
                </div>
                <div className="min-[1024px]:col-span-9 min-[1024px]:pl-2">
                  <div className={`${dsType.body} space-y-5 text-zinc-200`}>
                    <p>
                      Wondera is a unique AI-empowered karaoke social app designed to
                      help users train their personal AI voice through the fun and
                      engaging medium of karaoke. Initially designed as a gamified
                      social karaoke app, Wondera shifted its focus to include AI
                      voice training upon joining the team. Despite this innovative
                      feature, the adoption rate of personal AI models among users
                      remains low.
                    </p>
                    <p>
                      Our primary revenue stream comes from AI model training and
                      generating songs with these AI models. The key challenge we
                      face is increasing the number of users who own and actively
                      use their personal AI models.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 border-t border-white/10 pt-10 min-[1024px]:grid-cols-12 min-[1024px]:gap-10 min-[1024px]:pt-12">
                <div className="min-[1024px]:col-span-3 min-[1024px]:border-r min-[1024px]:border-white/10 min-[1024px]:pr-8">
                  <p className={`${dsType.subtitle} text-zinc-100`}>
                    Target Users
                  </p>
                </div>
                <div className="min-[1024px]:col-span-9 min-[1024px]:pl-2">
                  <div className={`${dsType.body} space-y-6 text-zinc-200`}>
                    <p>
                      The target users are individuals who are not familiar with
                      complex AI training processes but are passionate about
                      exploring and experimenting with new technology for
                      entertainment and social purposes. These include casual
                      singers, social media users, and content creators.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <p className="font-semibold text-zinc-100">Casual Singers</p>
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
                        <p className="font-semibold text-zinc-100">
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
                        <p className="font-semibold text-zinc-100">Content Creators</p>
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

        <section className={dsSpacing.sectionInner}>
          <SectionHeading
            eyebrow="Research"
            title="Flow Gap between Karaoke and AI-Voice Training"
          />

          <div className="mt-10 space-y-12">
            <div className="grid gap-6 min-[1024px]:grid-cols-12 min-[1024px]:gap-10">
              <div className="min-[1024px]:col-span-3 min-[1024px]:border-r min-[1024px]:border-white/10 min-[1024px]:pr-8">
                <p className={`${dsType.subtitle} text-zinc-100`}>
                  Interviews
                </p>
              </div>

              <div className="min-[1024px]:col-span-9 min-[1024px]:pl-2">
                <div className="space-y-6">
                  <p className={`${dsType.body} text-zinc-300`}>
                    To understand users&apos; pain points, I interviewed 6 users and conducted
                    think-aloud sessions while they used the app. I asked what attracted them
                    to try AI training, how satisfied they were with the experience, and the
                    biggest challenges they faced when training an AI voice model.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
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
                        <p className={`${dsType.meta} font-semibold text-zinc-200`}>
                          Participant 1
                        </p>
                        <p className={`${dsType.body} text-zinc-300`}>
                          &quot;I don&apos;t know where to check my training progress and what all
                          the numbers on the card mean.&quot;
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
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
                        <p className={`${dsType.meta} font-semibold text-zinc-200`}>
                          Participant 2
                        </p>
                        <p className={`${dsType.body} text-zinc-300`}>
                          &quot;I don&apos;t have patience. It feels like I need to spend a lot of
                          time just to train one model.&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 border-t border-white/10 pt-10 min-[1024px]:grid-cols-12 min-[1024px]:gap-10 min-[1024px]:pt-12">
              <div className="min-[1024px]:col-span-3 min-[1024px]:border-r min-[1024px]:border-white/10 min-[1024px]:pr-8">
                <p className={`${dsType.subtitle} text-zinc-100`}>Research Highlight</p>
              </div>
              <div className="min-[1024px]:col-span-9 min-[1024px]:pl-2">
                <div className={`${dsType.body} space-y-5 text-zinc-200`}>
                  <div>
                    <p className="font-semibold text-zinc-100">
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
                    <p className="font-semibold text-zinc-100">
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
          <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#32167A] py-16 min-[720px]:py-20 min-[1024px]:py-24">
            <div className={`${dsLayout.pageFrame}`}>
              <p
                className={`${dsFonts.display.className} max-w-4xl text-left text-[1.75rem] font-semibold leading-[1.4] tracking-tight min-[720px]:text-[2.25rem] min-[1024px]:text-[2.5rem]`}
              >
                How Might We enhance <span className="font-extrabold">engagement</span> and{" "}
                <span className="font-extrabold">ease of management</span> for AI voice training
                within our product?
              </p>
            </div>
          </div>
        </section>

        <section className={dsSpacing.sectionInner}>
          <div className="space-y-10">
            <div>
              <p
                className={`${dsFonts.body.className} ${dsType.meta} font-semibold text-violet-300`}
              >
                Design for engagement
              </p>
              <h2
                className={`${dsFonts.display.className} mt-3 text-[2.25rem] font-semibold leading-[1.14] tracking-tight text-zinc-100 min-[720px]:text-[2.75rem] min-[1024px]:text-[3.25rem] min-[1440px]:text-[4rem]`}
              >
                Boosting{" "}
                <span className="text-violet-300">Engagement</span> with Integrated Training
                Flow, and a Progress Map Layout
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 min-[1024px]:grid-cols-12 min-[1024px]:gap-10">
              <div className="min-[1024px]:col-span-3 min-[1024px]:border-r min-[1024px]:border-white/10 min-[1024px]:pr-8">
                <p className={`${dsType.subtitle} text-zinc-100`}>Product direction</p>
              </div>
              <div className="min-[1024px]:col-span-9 min-[1024px]:pl-2">
                <div className={`${dsType.body} space-y-5 text-zinc-200`}>
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

            <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-10 min-[1024px]:grid-cols-12 min-[1024px]:gap-10 min-[1024px]:pt-12">
              <div className="min-[1024px]:col-span-3 min-[1024px]:border-r min-[1024px]:border-white/10 min-[1024px]:pr-8">
                <p className={`${dsType.subtitle} text-zinc-100`}>Solution</p>
              </div>
              <div className="min-[1024px]:col-span-9 min-[1024px]:pl-2">
                <div className={`${dsType.body} space-y-8 text-zinc-200`}>
                  <p>
                    We integrated the training flow with the main singing loop: users can see how
                    recordings feed the model, jump between practice and training tasks, and return
                    to the map without losing context. The flow strip below compares the previous
                    fragmented journey with the unified one we shipped.
                  </p>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 min-[1024px]:p-8">
                    <WonderaSolutionFlowScroll />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-10 min-[1024px]:grid-cols-12 min-[1024px]:gap-10 min-[1024px]:pt-12">
              <div className="min-[1024px]:col-span-3 min-[1024px]:border-r min-[1024px]:border-white/10 min-[1024px]:pr-8">
                <p className={`${dsType.subtitle} text-zinc-100`}>Map layout</p>
              </div>
              <div className="min-[1024px]:col-span-9 min-[1024px]:pl-2">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div>
                      <p
                        className={`${dsFonts.body.className} text-[1.2rem] font-semibold leading-snug text-zinc-100 min-[1024px]:text-[1.35rem]`}
                      >
                        1. Linear Progression with Hub-and-Spoke Navigation
                      </p>
                      <p className={`${dsType.body} mt-2 text-zinc-300`}>
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

                  <div className="space-y-6 border-t border-white/10 pt-10 min-[1024px]:pt-12">
                    <div>
                      <p
                        className={`${dsFonts.body.className} text-[1.2rem] font-semibold leading-snug text-zinc-100 min-[1024px]:text-[1.35rem]`}
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

        <section className={dsSpacing.sectionInner}>
          <div className="space-y-10">
            <div>
              <p
                className={`${dsFonts.body.className} ${dsType.meta} font-semibold text-violet-300`}
              >
                Iteration for layout design
              </p>
              <h2
                className={`${dsFonts.display.className} mt-3 text-[2.25rem] font-semibold leading-[1.14] tracking-tight text-zinc-100 min-[720px]:text-[2.75rem] min-[1024px]:text-[3.25rem] min-[1440px]:text-[4rem]`}
              >
                Iteration for Layout Design
              </h2>
            </div>

            <div className="grid gap-6 min-[1024px]:grid-cols-12 min-[1024px]:gap-10">
              <div className="min-[1024px]:col-span-3 min-[1024px]:border-r min-[1024px]:border-white/10 min-[1024px]:pr-8">
                <p className={`${dsType.subtitle} text-zinc-100`}>User testing</p>
              </div>
              <div className="min-[1024px]:col-span-9 min-[1024px]:pl-2">
                <div className={`${dsType.body} space-y-5 text-zinc-200`}>
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

            <div className="grid gap-6 border-t border-white/10 pt-10 min-[1024px]:grid-cols-12 min-[1024px]:gap-10">
              <div className="min-[1024px]:col-span-3 min-[1024px]:border-r min-[1024px]:border-white/10 min-[1024px]:pr-8">
                <p className={`${dsType.subtitle} text-zinc-100`}>Redesign</p>
              </div>
              <div className="min-[1024px]:col-span-9 min-[1024px]:pl-2">
                <p className={`${dsType.body} text-zinc-200`}>
                  I found that the current reading order could be confusing for users.
                  To address this, I reversed the order from bottom to top. This way,
                  the training map starts from the completed level and progresses to the
                  next level that requires more training materials. For example, after
                  finishing the first level, the user will need to train with 5 songs to
                  reach the Level 2 model.
                </p>
              </div>
            </div>

            <div className="grid gap-6 border-t border-white/10 pt-10 min-[1024px]:grid-cols-12 min-[1024px]:gap-10">
              <div className="min-[1024px]:col-span-3 min-[1024px]:border-r min-[1024px]:border-white/10 min-[1024px]:pr-8" />
              <div className="min-[1024px]:col-span-9 min-[1024px]:pl-2">
                <div className="grid grid-cols-1 gap-8 min-[720px]:grid-cols-2 min-[1024px]:gap-10">
                  <div className="flex h-full flex-col justify-between gap-4">
                    <Image
                      src="/wondera_iteration_before.svg"
                      alt="Before redesign showing top to bottom level progression"
                      width={300}
                      height={648}
                      className="mx-auto h-auto w-full max-w-[450px]"
                    />
                    <p className={`${dsFonts.body.className} text-center text-[1.05rem] font-semibold text-zinc-100`}>
                      Before - Top to bottom
                    </p>
                  </div>
                  <div className="flex h-full flex-col justify-between gap-4">
                    <Image
                      src="/wondera_iteration_after.svg"
                      alt="After redesign showing bottom to top level progression"
                      width={300}
                      height={648}
                      className="mx-auto h-auto w-full max-w-[450px]"
                    />
                    <p className={`${dsFonts.body.className} text-center text-[1.05rem] font-semibold text-zinc-100`}>
                      After - Bottom to top
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={dsSpacing.sectionInner}>
          <div className="space-y-10">
            <div>
              <p
                className={`${dsFonts.body.className} ${dsType.meta} font-semibold text-violet-300`}
              >
                Design for easy management
              </p>
              <h2
                className={`${dsFonts.display.className} mt-3 text-[2.25rem] font-semibold leading-[1.14] tracking-tight text-zinc-100 min-[720px]:text-[2.75rem] min-[1024px]:text-[3.25rem] min-[1440px]:text-[4rem]`}
              >
                Empowering Users with Detailed Information and Intuitive Display for
                Better Model Training
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 min-[1024px]:grid-cols-12 min-[1024px]:gap-10">
              <div className="min-[1024px]:col-span-3 min-[1024px]:border-r min-[1024px]:border-white/10 min-[1024px]:pr-8">
                <p className={`${dsType.subtitle} text-zinc-100`}>User needs</p>
              </div>
              <div className="min-[1024px]:col-span-9 min-[1024px]:pl-2">
                <p className={`${dsType.body} text-zinc-200`}>
                  From user interviews, it became clear that experienced users require
                  more detailed information and an intuitive way to manage their
                  materials to train high-quality AI models.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-10 min-[1024px]:grid-cols-12 min-[1024px]:gap-10 min-[1024px]:pt-12">
              <div className="min-[1024px]:col-span-3 min-[1024px]:border-r min-[1024px]:border-white/10 min-[1024px]:pr-8">
                <p className={`${dsType.subtitle} text-zinc-100`}>Solution</p>
              </div>
              <div className="min-[1024px]:col-span-9 min-[1024px]:pl-2">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div>
                      <p
                        className={`${dsFonts.body.className} text-[1.2rem] font-semibold leading-snug text-zinc-100 min-[1024px]:text-[1.35rem]`}
                      >
                        1. Provide Detailed Information
                      </p>
                      <p className={`${dsType.body} mt-2 text-zinc-300`}>
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

                  <div className="space-y-6 border-t border-white/10 pt-10 min-[1024px]:pt-12">
                    <div>
                      <p
                        className={`${dsFonts.body.className} text-[1.2rem] font-semibold leading-snug text-zinc-100 min-[1024px]:text-[1.35rem]`}
                      >
                        2. Enhanced Display
                      </p>
                      <p className={`${dsType.body} mt-2 text-zinc-300`}>
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
                        <p className={`${dsFonts.body.className} text-center text-[1.05rem] font-semibold text-zinc-100`}>
                          Before
                        </p>
                      </div>
                      <div className="flex h-full flex-col justify-between gap-4">
                        <Image
                          src="/wondera_enhance_display_after.svg"
                          alt="After enhanced display with clearer level and song details"
                          width={300}
                          height={648}
                          className="mx-auto h-auto w-full max-w-[450px]"
                        />
                        <p className={`${dsFonts.body.className} text-center text-[1.05rem] font-semibold text-zinc-100`}>
                          After
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={dsSpacing.sectionInner}>
          <SectionHeading
            eyebrow="Outcome"
            title="Impact"
            subtitle="The redesign improved understanding, confidence, and overall engagement."
          />
          <div className="grid gap-4 min-[1024px]:grid-cols-2">
            <div className="rounded-2xl border border-violet-400/30 bg-violet-500/10 p-5">
              <p
                className={`${dsFonts.display.className} text-[2.5rem] font-semibold leading-none text-violet-200 min-[1440px]:text-[3.25rem]`}
              >
                +18%
              </p>
              <p className={`${dsType.body} mt-2 text-zinc-200`}>
                Daily engagement with the training feature
              </p>
            </div>
            <div className="rounded-2xl border border-violet-400/30 bg-violet-500/10 p-5">
              <p
                className={`${dsFonts.display.className} text-[2.5rem] font-semibold leading-none text-violet-200 min-[1440px]:text-[3.25rem]`}
              >
                +12%
              </p>
              <p className={`${dsType.body} mt-2 text-zinc-200`}>AI model ownership rate</p>
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

        <section className={`space-y-5 ${dsSpacing.dividerTop}`}>
          <SectionHeading
            eyebrow="Reflection"
            title="Key Takeaways"
            subtitle="Designing AI products is as much about trust and guidance as it is about capability."
          />
          <div className={`${dsType.body} ${dsLayout.contentMax} space-y-8 text-zinc-300`}>
            <div className="space-y-3">
              <p className="font-semibold text-zinc-100">
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
              <p className="font-semibold text-zinc-100">
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

        <section className={`flex items-center justify-between ${dsSpacing.dividerTop}`}>
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
      </article>
    </main>
  );
}
