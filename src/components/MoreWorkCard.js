import Image from "next/image";
import Tag from "@/components/Tag";
import { dsFonts } from "@/lib/designSystem";

/**
 * Compact project card for the More Work horizontal row.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string[]} [props.tags]
 * @param {string} props.description
 * @param {string} props.imageSrc
 * @param {string} props.imageAlt
 * @param {string} [props.imageClassName]
 * @param {string} [props.mediaClassName] - Gradient / fill behind the thumbnail
 */
export default function MoreWorkCard({
  title,
  tags = [],
  description,
  imageSrc,
  imageAlt,
  imageClassName = "object-contain",
  mediaClassName = "bg-zinc-800",
}) {
  return (
    <article className="glass-edge flex w-[20.8125rem] shrink-0 flex-col overflow-hidden rounded-[20px] bg-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md">
      <div
        className={`relative mx-3.5 mt-[15px] h-[16.8125rem] overflow-hidden rounded-[15px] ${mediaClassName}`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          draggable={false}
          className={imageClassName}
          sizes="333px"
        />
      </div>

      <div className="flex flex-col gap-4 px-4 py-6">
        <div className="flex flex-col gap-1">
          <h3
            className={`${dsFonts.display.className} text-[2.25rem] font-bold leading-none text-white`}
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
        </div>
        <p
          className={`${dsFonts.body.className} text-sm font-normal leading-normal text-white`}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
