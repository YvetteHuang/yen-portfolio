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
          </div>
        </section>

        <section className={dsSpacing.sectionInner}>
          <SectionHeading
            eyebrow="Strategy"
            title="Design Principles"
            subtitle="Three principles guided the end-to-end product direction."
          />
          <div className={`${dsType.body} space-y-4 text-zinc-300`}>
            <p>
              <span className="font-semibold text-zinc-100">1. Progressive clarity:</span>{" "}
              show only what users need at each step, and reveal deeper controls when
              confidence grows.
            </p>
            <p>
              <span className="font-semibold text-zinc-100">2. Explainability first:</span>{" "}
              communicate why each training task matters and how it improves output.
            </p>
            <p>
              <span className="font-semibold text-zinc-100">3. Reward momentum:</span>{" "}
              celebrate small wins through meaningful progress markers and lightweight
              feedback.
            </p>
          </div>
          <PlaceholderFigure label="Principles diagram placeholder" size="sm" />
        </section>

        <section className={dsSpacing.sectionInner}>
          <SectionHeading
            eyebrow="Design"
            title="Core Experience"
            subtitle="The product flow was redesigned from onboarding to daily training."
          />
          <div
            className={`space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] ${dsSpacing.cardPadding}`}
          >
            <div>
              <h3
                className={`${dsFonts.display.className} ${dsType.h3} font-semibold leading-tight text-zinc-100`}
              >
                Onboarding & Setup
              </h3>
              <p className={`${dsType.body} mt-2 text-zinc-300`}>
                Reframed onboarding into short, guided steps with clear completion
                states. Users now reach their first sample significantly faster.
              </p>
            </div>
            <PlaceholderFigure label="Onboarding screens placeholder" />
            <div>
              <h3
                className={`${dsFonts.display.className} ${dsType.h3} font-semibold leading-tight text-zinc-100`}
              >
                Training Dashboard
              </h3>
              <p className={`${dsType.body} mt-2 text-zinc-300`}>
                Introduced a central dashboard with session goals, quality indicators,
                and actionable suggestions for next best tasks.
              </p>
            </div>
            <PlaceholderFigure label="Dashboard UI placeholder" />
            <div>
              <h3
                className={`${dsFonts.display.className} ${dsType.h3} font-semibold leading-tight text-zinc-100`}
              >
                Voice Library
              </h3>
              <p className={`${dsType.body} mt-2 text-zinc-300`}>
                Added a structured library to manage generated voice outputs, compare
                versions, and quickly reuse preferred results.
              </p>
            </div>
            <PlaceholderFigure label="Voice library placeholder" />
          </div>
        </section>

        <section className={dsSpacing.sectionInner}>
          <SectionHeading
            eyebrow="Outcome"
            title="Impact"
            subtitle="The redesign improved understanding, confidence, and overall engagement."
          />
          <div className="grid gap-4 min-[1024px]:grid-cols-3">
            <div className="rounded-2xl border border-violet-400/30 bg-violet-500/10 p-5">
              <p
                className={`${dsFonts.display.className} text-[2.5rem] font-semibold leading-none text-violet-200 min-[1440px]:text-[3.25rem]`}
              >
                +38%
              </p>
              <p className={`${dsType.body} mt-2 text-zinc-200`}>Onboarding completion rate</p>
            </div>
            <div className="rounded-2xl border border-violet-400/30 bg-violet-500/10 p-5">
              <p
                className={`${dsFonts.display.className} text-[2.5rem] font-semibold leading-none text-violet-200 min-[1440px]:text-[3.25rem]`}
              >
                +26%
              </p>
              <p className={`${dsType.body} mt-2 text-zinc-200`}>7-day training retention</p>
            </div>
            <div className="rounded-2xl border border-violet-400/30 bg-violet-500/10 p-5">
              <p
                className={`${dsFonts.display.className} text-[2.5rem] font-semibold leading-none text-violet-200 min-[1440px]:text-[3.25rem]`}
              >
                -31%
              </p>
              <p className={`${dsType.body} mt-2 text-zinc-200`}>Drop-off before first output</p>
            </div>
          </div>
          <PlaceholderFigure label="Final product showcase placeholder" tone="dark" />
        </section>

        <section className={`space-y-5 ${dsSpacing.dividerTop}`}>
          <SectionHeading
            eyebrow="Reflection"
            title="Key Takeaways"
            subtitle="Designing AI products is as much about trust and guidance as it is about capability."
          />
          <p className={`${dsType.body} ${dsLayout.contentMax} text-zinc-300`}>
            This project reinforced the value of pairing technical sophistication with
            human-centered storytelling. When users understand what is happening and
            why it matters, they are far more willing to invest in the journey.
          </p>
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
