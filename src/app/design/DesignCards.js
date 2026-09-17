import Image from "next/image";
import { dsFonts } from "@/lib/designSystem";

function ProjectTags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`${dsFonts.body.className} rounded-full border border-white/[0.16] px-2.5 py-0.5 text-[0.75rem] text-white/70`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function DesignFeaturedCard({ project }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[2/1] w-full overflow-hidden">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        {project.badge ? (
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-black/70 px-2.5 py-1 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-[#0089FF]" aria-hidden />
            <span
              className={`${dsFonts.body.className} text-[0.6875rem] font-semibold tracking-[0.14em] text-white uppercase`}
            >
              {project.badge}
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 pt-4">
        <ProjectTags tags={project.tags} />
        <h2
          className={`${dsFonts.display.className} text-[1.25rem] font-semibold leading-7 text-white`}
        >
          {project.title}
        </h2>
        {project.summary ? (
          <p className={`${dsFonts.body.className} max-w-[64rem] text-base font-light leading-7 text-white/70`}>
            {project.summary}
          </p>
        ) : null}
        <p className={`${dsFonts.body.className} text-xs leading-7 text-white/60`}>
          {project.year} | {project.tools}
        </p>
      </div>
    </article>
  );
}

export function DesignMasonryCard({ project }) {
  const isWide = project.layout === "wide";

  return (
    <article
      className={`flex min-h-0 flex-col ${
        isWide
          ? "min-[720px]:col-span-2 min-[720px]:row-span-2"
          : ""
      }`}
    >
      <div
        className={`relative min-h-[12.5rem] overflow-hidden ${
          isWide
            ? "min-[720px]:min-h-0 min-[720px]:flex-1"
            : "aspect-[16/10] min-[720px]:aspect-auto min-[720px]:min-h-0 min-[720px]:flex-1"
        }`}
      >
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          className="object-cover"
          sizes={
            isWide
              ? "(max-width: 720px) 100vw, 66vw"
              : "(max-width: 720px) 100vw, 33vw"
          }
        />
      </div>
      <div className={`flex flex-none flex-col ${isWide ? "gap-2 pt-4" : "gap-1 pt-3"}`}>
        <ProjectTags tags={project.tags} />
        <h2
          className={`${dsFonts.display.className} text-[1.25rem] font-semibold leading-7 text-white`}
        >
          {project.title}
        </h2>
        {project.summary ? (
          <p className={`${dsFonts.body.className} text-base font-light leading-7 text-white/70`}>
            {project.summary}
          </p>
        ) : null}
        <p className={`${dsFonts.body.className} text-xs leading-relaxed text-white/60`}>
          {project.year} | {project.tools}
        </p>
      </div>
    </article>
  );
}
