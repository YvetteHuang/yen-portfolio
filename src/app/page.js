import AboutSection from "@/components/AboutSection";
import BackgroundEmitter from "@/components/BackgroundEmitter";
import HeroSection from "@/components/HeroSection";
import MoreWorkSection from "@/components/MoreWorkSection";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "StockNews.AI",
    tags: ["AI Product", "Fintech SaaS", "0 → 1"],
    description:
      "Redesigned an AI-powered financial news platform from 0→1. 58% increase in free-to-paid conversion.",
    gradientClassName: "bg-[linear-gradient(to_bottom_right,#87AEF6_0%,#5494DD_36%,#4271AA_62%,#1E2A43_100%)]",

    imageSrc: "/homepage_stocknews.png",
    imageAlt: "StockNews.AI product screens mockup",
    imageRight: false,
    imageHeightClassName: "h-[17.5rem] sm:h-[20rem] md:h-[22.5rem] lg:h-[25rem]",
    href: "/work/stocknews",

  },
  {
    title: "Design System for StockNews.ai",
    tags: ["Design System", "Figma → Storybook"],
    description:
      "Built a design system from scratch while shipping a live product redesign. Reduced engineer handoff cycle by 25%.",
    gradientClassName: "bg-[linear-gradient(to_bottom_right,#1C4481_0%,#096AFA_56%,#2DC3D8_100%)]",
    imageSrc: "/homepage_ds.png",
    imageAlt: "StockNews.ai design system mockup",
    imageRight: true,
    href: "/work/design-system",
  },
  {
    title: "Wondera",
    tags: ["AI Product", "Mobile", "Consumer App"],
    description:
      "Designed the mobile experience for an AI-powered karaoke app. 18% increase in Daily Active Users.",
    gradientClassName: "bg-[linear-gradient(to_bottom_left,#B693FF_0%,#5E21DD_50%,#13072C_100%)]",
    imageSrc: "/homepage_wondera.png",
    imageAlt: "Wondera mobile app mockup",
    imageRight: false,
    imageHeightClassName: "h-80 sm:h-96 md:h-full",
    imageOffsetClassName:
      "md:scale-[0.85] md:group-hover:scale-100 md:-translate-x-6 lg:-translate-x-12",
    href: "/work/wondera",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black font-sans text-zinc-50">
      <BackgroundEmitter />
      <main className="relative z-10 pb-24">
        <HeroSection />

        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <section id="work" aria-labelledby="work-heading" className="scroll-mt-28 pt-4 md:pt-8">
          <h2 id="work-heading" className="sr-only">
            Selected work
          </h2>
          <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>

        <MoreWorkSection />
        <AboutSection />
        </div>
      </main>
    </div>
  );
}
