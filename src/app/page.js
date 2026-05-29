import ProjectCard from "@/components/ProjectCard";


const projects = [
  {
    title: "SotckNews.ai",
    subtitle: "UX Design",
    description:
      "Courses Enrollment System Redesign for efficient and intuitive use.",
    gradientClassName: "bg-[linear-gradient(to_bottom_right,#87AEF6_0%,#5494DD_36%,#4271AA_62%,#1E2A43_100%)]",
    imageSrc: "/homepage_stocknews.svg",
    imageAlt: "SotckNews.ai product screens mockup",
    imageRight: true,
    href: "#",
  },
  {
    title: "Wondera",
    subtitle: "Product Design @Future Effects Studio",
    description:
      "A personal AI training app enables people to train their own unique AI voice.",
    gradientClassName: "bg-[linear-gradient(to_bottom_left,#B693FF_0%,#5E21DD_50%,#13072C_100%)]",
    imageSrc: "/homepage_wondera.png",
    imageAlt: "Wondera mobile app mockup",
    imageRight: false,
    href: "/work/wondera",
  },
  {
    title: "Design System for StockNews.ai",
    subtitle: "Founding Designer @StockNews.ai",
    description:
      "Built a design system from zero in parallel with a live product — Figma to CSS to Storybook.",
    gradientClassName: "bg-[linear-gradient(to_bottom_right,#1C4481_0%,#096AFA_56%,#2DC3D8_100%)]",
    imageSrc: "/homepage_ds.svg",
    imageAlt: "StockNews.ai design system mockup",
    imageRight: true,
    href: "/work/design-system",
  },
  {
    title: "Gizmu",
    subtitle: "UX Design for AR Application",
    description:
      "An AR mobile interactive game for everyone creating music based on daily objects.",
    gradientClassName: "bg-[linear-gradient(to_bottom_right,#FF96D5_0%,#7A4A7C_45%,#2B2145_90%)]",
    imageSrc: "/homepage_gizmu.png",
    imageAlt: "Gizmu AR app mockup",
    imageRight: false,
    href: "#",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black font-sans text-zinc-50">
      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-28 md:px-10 md:pt-32">
        <section className="mb-20 md:mb-28" aria-labelledby="intro-heading">
          <h1
            id="intro-heading"
            className="max-w-4xl tracking-tight text-white"
          >
            <span className="block text-3xl font-semibold leading-tight md:text-4xl md:leading-snug lg:text-5xl">
              Hi, I am Yen
            </span>
            <span className="mt-3 block text-2xl font-semibold leading-snug text-white/90 md:mt-4 md:text-3xl md:leading-snug lg:text-4xl">
              A Product Designer based in New York. I have experience in AI
              products, branding and XR interaction
            </span>
          </h1>
        </section>

        <section id="work" aria-labelledby="work-heading" className="scroll-mt-28">
          <h2 id="work-heading" className="sr-only">
            Selected work
          </h2>
          <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
