import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { dsColors, dsType } from "@/lib/designSystem";

// [待確認] / [待補] stay visible while drafting and drop out of production builds.
const showDraftMarkers = process.env.NODE_ENV !== "production";
const DRAFT_MARKER_HREF = "#draft-marker";

const captionClass = `${dsType.caption} mb-2`;

// Line breaks in the .md file become <br>, so "**Title**\nbody" and multi-line
// quotes read like the StockNews page.
const remarkPlugins = [remarkGfm, remarkBreaks];

function withDraftMarkers(source) {
  return source.replace(/\[(待確認|待補)\](?!\()/g, `[$1](${DRAFT_MARKER_HREF})`);
}

function MarkdownLink({ href, children }) {
  if (href === DRAFT_MARKER_HREF) {
    return showDraftMarkers ? (
      <span className="mx-0.5 rounded bg-amber-100 px-1.5 py-0.5 align-middle text-xs font-semibold text-amber-800">
        {children}
      </span>
    ) : null;
  }
  const external = /^https?:\/\//.test(href ?? "");
  return (
    <a
      href={href}
      className="underline underline-offset-4 transition-opacity hover:opacity-80"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

const inlineComponents = {
  a: ({ href, children }) => <MarkdownLink href={href}>{children}</MarkdownLink>,
  strong: ({ children }) => <span className="font-bold">{children}</span>,
  code: ({ children }) => (
    <code className="rounded bg-zinc-100 px-1 font-mono text-[0.9em]">{children}</code>
  ),
};

const proseComponents = {
  ...inlineComponents,
  ul: ({ children }) => <ul className="list-disc space-y-7 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-7 pl-6">{children}</ol>,
  blockquote: ({ children }) => <blockquote className="space-y-0">{children}</blockquote>,
  hr: () => <hr className="border-zinc-200" />,
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-zinc-300 py-2 pr-4 font-bold">{children}</th>
  ),
  td: ({ children }) => <td className="border-b border-zinc-200 py-2 pr-4">{children}</td>,
  img: ({ src, alt }) => (
    <img src={src} alt={alt ?? ""} className="block h-auto w-full" loading="lazy" decoding="async" />
  ),
};

// Inline-only markdown for titles and one-line items: no wrapping <p>.
export function Inline({ text }) {
  return (
    <Markdown
      remarkPlugins={remarkPlugins}
      components={inlineComponents}
      allowedElements={["a", "strong", "em", "code", "br", "del"]}
      unwrapDisallowed
    >
      {withDraftMarkers(text)}
    </Markdown>
  );
}

function Prose({ source }) {
  return (
    <Markdown remarkPlugins={remarkPlugins} components={proseComponents}>
      {withDraftMarkers(source)}
    </Markdown>
  );
}

function MediaPlaceholder({ item, fullBleed }) {
  const label = item.kind === "video" ? "Video" : "Image";
  if (fullBleed) {
    return (
      <div
        className="flex aspect-video w-full items-center justify-center bg-zinc-900 px-6"
        role="img"
        aria-label={item.alt}
      >
        <p className="text-center text-sm text-zinc-400">
          <span className="block font-medium text-zinc-200">
            {item.alt || label}
          </span>
          <span className="mt-1 block font-mono text-xs">{item.src}</span>
        </p>
      </div>
    );
  }
  return (
    <div
      className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10"
      role="img"
      aria-label={item.alt}
    >
      <p className="text-center text-sm text-zinc-500">
        <span className="block font-medium text-zinc-700">
          {item.alt || label}
        </span>
        <span className="mt-1 block font-mono text-xs">{item.src}</span>
      </p>
    </div>
  );
}

// The markdown caption (`![caption](path)`) shows under the media, styled like
// the design-system page captions. Before/After pairs use labels instead.
export function MediaItem({ item, fullBleed = false, showCaption = true, inRow = false }) {
  return (
    <figure className="min-w-0">
      <MediaElement item={item} fullBleed={fullBleed} inRow={inRow} />
      {showCaption && item.alt ? (
        <figcaption
          className={`mt-1 text-center text-xs ${fullBleed ? "px-6 pb-2 text-zinc-500" : "text-zinc-400"}`}
        >
          {item.alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

function MediaElement({ item, fullBleed, inRow }) {
  if (!item.exists) return <MediaPlaceholder item={item} fullBleed={fullBleed} />;

  // `"dark"` puts light-on-transparent artwork on a dark panel so it stays legible.
  if (item.background) {
    return (
      <div className="rounded-lg p-6 min-[720px]:p-10" style={{ background: item.background }}>
        <MediaElement item={{ ...item, background: null }} fullBleed={fullBleed} inRow={inRow} />
      </div>
    );
  }

  if (item.kind === "embed") {
    return (
      <div className="relative aspect-video w-full">
        <iframe
          src={item.embedSrc}
          title={item.alt || "Embedded video"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  if (item.kind === "video") {
    const controls = item.options.includes("controls");
    return (
      <video
        src={item.src}
        poster={item.poster ?? undefined}
        aria-label={item.alt || undefined}
        className="block h-auto w-full"
        playsInline
        preload="metadata"
        {...(controls ? { controls: true } : { autoPlay: true, muted: true, loop: true })}
      />
    );
  }

  // Images never upscale past their own size (some sources are small), and in
  // a side-by-side row a tall portrait screen is capped so it can't dwarf its
  // neighbor. `"cover"` crops to 4:3 so mixed-orientation photos line up.
  const cover = item.options.includes("cover");
  return (
    <img
      src={item.src}
      alt={item.alt}
      className={
        cover
          ? "block aspect-[4/3] w-full rounded-lg object-cover"
          : `mx-auto block h-auto w-auto max-w-full ${inRow ? "max-h-[480px]" : ""}`
      }
      loading="lazy"
      decoding="async"
    />
  );
}

const gridColumns = {
  2: "min-[720px]:grid-cols-2",
  3: "min-[720px]:grid-cols-3",
  4: "min-[720px]:grid-cols-2 min-[1024px]:grid-cols-4",
};

export function MediaRow({ items, fullBleed = false }) {
  if (items.length === 1) return <MediaItem item={items[0]} fullBleed={fullBleed} />;

  const isBeforeAfter =
    items.length === 2 &&
    items[0].alt.toLowerCase() === "before" &&
    items[1].alt.toLowerCase() === "after";

  if (isBeforeAfter) {
    return (
      <div className="grid items-start gap-6 min-[720px]:grid-cols-2">
        {items.map((item, index) => (
          <figure key={index} className="min-w-0">
            <figcaption
              className={`${captionClass} ${index === 0 ? dsColors.caseStudy.before : dsColors.caseStudy.after}`}
            >
              {item.alt}
            </figcaption>
            <MediaItem item={item} showCaption={false} />
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 items-center gap-4 min-[1024px]:gap-[18px] ${gridColumns[items.length] ?? gridColumns[4]}`}
    >
      {items.map((item, index) => (
        <MediaItem key={index} item={item} fullBleed={fullBleed} inRow />
      ))}
    </div>
  );
}

function Swatches({ colors }) {
  return (
    <div className="grid grid-cols-2 gap-4 min-[720px]:grid-cols-4">
      {colors.map((color) => (
        <div key={`${color.name}${color.hex}`} className="min-w-0">
          <div
            className="aspect-[4/3] w-full rounded-lg ring-1 ring-inset ring-black/10"
            style={{ background: color.hex }}
          />
          {color.name ? <p className="mt-3 font-bold">{color.name}</p> : null}
          <p className={`${color.name ? "" : "mt-3 "}text-zinc-500 uppercase`}>
            {color.hex}
          </p>
        </div>
      ))}
    </div>
  );
}

const DEFAULT_SAMPLE = "The quick brown fox jumps over the lazy dog";

function TypeSpecimen({ family, sample, rows }) {
  const weights = [...new Set(rows.map((row) => row.weight))].sort((a, b) => a - b);
  const fontHref = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, "+")}:wght@${weights.join(";")}&display=swap`;

  return (
    <div>
      {/* React hoists this into <head> and dedupes it. */}
      <link rel="stylesheet" href={fontHref} precedence="default" />
      <div className="flex items-baseline justify-between gap-6 pb-4">
        <p className="font-bold">{family}</p>
        <p className="text-[2.5rem] leading-none" style={{ fontFamily: `"${family}", sans-serif` }}>
          Aa
        </p>
      </div>
      <div className="divide-y divide-zinc-200 border-t border-zinc-200">
        {rows.map((row, index) => (
          <div
            key={index}
            className="grid gap-2 py-5 min-[720px]:grid-cols-[120px_minmax(0,1fr)] min-[720px]:items-baseline min-[720px]:gap-6"
          >
            <p className="text-zinc-500">
              {row.size} pt
              {row.label ? <span className="block text-zinc-900">{row.label}</span> : null}
            </p>
            <p
              className="break-words leading-[1.25]"
              style={{
                fontFamily: `"${family}", sans-serif`,
                fontSize: `${row.size}px`,
                fontWeight: row.weight,
              }}
            >
              {sample ?? DEFAULT_SAMPLE}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Block({ block, fullBleed }) {
  switch (block.type) {
    case "markdown":
      return <Prose source={block.source} />;
    case "media":
      return <MediaRow items={block.items} fullBleed={fullBleed} />;
    case "swatches":
      return <Swatches colors={block.colors} />;
    case "typeSpecimen":
      return <TypeSpecimen {...block} />;
    default:
      return null;
  }
}

export default function CaseStudyBlocks({ blocks, className = "space-y-7", fullBleed = false }) {
  if (!blocks.length) return null;
  return (
    <div className={className}>
      {blocks.map((block, index) => (
        <Block key={index} block={block} fullBleed={fullBleed} />
      ))}
    </div>
  );
}
