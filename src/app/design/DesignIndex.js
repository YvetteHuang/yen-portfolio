import { dsFonts, dsSpacing, dsType } from "@/lib/designSystem";
import {
  designPageHero,
  featuredDesignProject,
  masonryDesignProjects,
} from "@/lib/designProjects";
import { DesignFeaturedCard, DesignMasonryCard } from "./DesignCards";

export default function DesignIndex() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 ${dsSpacing.pageTopBottom}`}>
        <header className="mb-14 flex max-w-[64rem] flex-col gap-5 md:mb-16">
          <h1
            className={`${dsFonts.display.className} ${dsType.heroTitle} text-white`}
          >
            {designPageHero.title}
          </h1>
          <p
            className={`${dsFonts.body.className} max-w-[64rem] text-base font-light leading-7 text-white/70 md:text-lg`}
          >
            {designPageHero.lede}
          </p>
        </header>

        <div className="flex flex-col gap-9 min-[720px]:gap-10">
          {featuredDesignProject ? (
            <DesignFeaturedCard project={featuredDesignProject} />
          ) : null}

          <div className="grid grid-cols-1 gap-9 min-[720px]:grid-cols-3 min-[720px]:grid-flow-dense min-[720px]:auto-rows-[18.75rem] min-[720px]:gap-9">
            {masonryDesignProjects.map((project) => (
              <DesignMasonryCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
