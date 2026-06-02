import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/Tag";
import { dsFonts } from "@/lib/designSystem";

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string[]} [props.tags] - Short labels rendered as pills under the title
 * @param {string} props.description
 * @param {string} props.gradientClassName - Tailwind gradient utilities, e.g. "bg-gradient-to-br from-blue-600 to-cyan-500"
 * @param {string} props.imageSrc
 * @param {string} props.imageAlt
 * @param {boolean} [props.imageRight=true] - Desktop: text left / image right when true; reversed when false
 * @param {string} [props.imageHeightClassName] - Responsive height utilities for the image box
 * @param {string} [props.imageOffsetClassName] - Extra transform/position utilities for the image box (e.g. nudging it left)
 * @param {string} [props.href] - If set, entire card is wrapped in a link
 */
export default function ProjectCard({
  title,
  tags = [],
  description,
  gradientClassName,
  imageSrc,
  imageAlt,
  imageRight = true,
  imageHeightClassName = "h-56 sm:h-64 md:h-72 lg:h-80",
  imageOffsetClassName = "",
  href,
}) {
  const textBlock = (
    <div
      className={`flex flex-col justify-center gap-3 md:flex-[2] ${
        imageRight ? "order-2 md:order-1" : "order-2 md:order-2"
      }`}
    >
      <h3
        className={`${dsFonts.display.className} text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight text-white`}
      >
        {title}
      </h3>
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
      <p className="text-base leading-relaxed text-white/90 md:text-lg">{description}</p>
    </div>
  );

  const imageBlock = (
    <div
      className={`relative flex items-center justify-center md:flex-[3] ${
        imageRight ? "order-1 md:order-2" : "order-1 md:order-1"
      }`}
    >
      <div
        className={`relative w-full origin-center transition-transform duration-300 ease-out group-hover:scale-[1.08] ${imageHeightClassName} ${imageOffsetClassName}`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain drop-shadow-2xl"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
    </div>
  );

  const inner = (
    <article
      className={`group overflow-hidden rounded-3xl bg-gradient-to-br shadow-xl ring-1 ring-white/10 ${gradientClassName}`}
    >
      <div className="flex flex-col gap-6 px-6 py-8 md:h-[500px] md:flex-row md:items-stretch md:gap-10 md:px-20 md:py-6">
        {textBlock}
        {imageBlock}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}
