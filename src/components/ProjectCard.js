import Image from "next/image";
import Link from "next/link";

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {string} props.description
 * @param {string} props.gradientClassName - Tailwind gradient utilities, e.g. "bg-gradient-to-br from-blue-600 to-cyan-500"
 * @param {string} props.imageSrc
 * @param {string} props.imageAlt
 * @param {boolean} [props.imageRight=true] - Desktop: text left / image right when true; reversed when false
 * @param {string} [props.href] - If set, entire card is wrapped in a link
 */
export default function ProjectCard({
  title,
  subtitle,
  description,
  gradientClassName,
  imageSrc,
  imageAlt,
  imageRight = true,
  href,
}) {
  const textBlock = (
    <div
      className={`flex flex-1 flex-col justify-center gap-3 px-6 py-10 md:px-10 md:py-12 lg:max-w-xl ${
        imageRight ? "order-2 md:order-1" : "order-2 md:order-2"
      }`}
    >
      <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
        {title}
      </h3>
      <p className="text-sm font-medium text-white/80 md:text-base">{subtitle}</p>
      <p className="text-base leading-relaxed text-white/90 md:text-lg">{description}</p>
    </div>
  );

  const imageBlock = (
    <div
      className={`relative flex flex-1 items-center justify-center px-6 pb-10 pt-4 md:px-8 md:py-12 ${
        imageRight ? "order-1 md:order-2" : "order-1 md:order-1"
      }`}
    >
      <div className="relative h-56 w-full max-w-lg origin-center transition-transform duration-300 ease-out group-hover:scale-[1.08] sm:h-64 md:h-72 lg:h-80">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain drop-shadow-2xl"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );

  const inner = (
    <article
      className={`group overflow-hidden rounded-3xl bg-gradient-to-br shadow-xl ring-1 ring-white/10 ${gradientClassName}`}
    >
      <div className="flex flex-col md:flex-row md:items-stretch">
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
