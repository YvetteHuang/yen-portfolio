import fs from "node:fs";
import path from "node:path";
import { parseCaseStudy } from "@/lib/caseStudyParser";

const CONTENT_DIR = path.join(process.cwd(), "content", "drafts");
const PUBLIC_DIR = path.join(process.cwd(), "public");

const VIDEO_FILE = /\.(mp4|webm|mov)$/i;
const DEFAULT_DARK_SURFACE = "#18181B";

// Reads content/drafts/<slug>.md and marks which media files exist, so the
// renderer can fall back to placeholders until real assets land in public/.
export function loadCaseStudy(slug) {
  const source = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
  const study = parseCaseStudy(source);

  const darkSurface = study.frontmatter.darkSurface ?? DEFAULT_DARK_SURFACE;
  const describe = (item) => describeMedia(item, darkSurface);

  for (const section of study.sections) {
    const blockLists = [
      section.intro,
      ...section.rows.flatMap((row) => [row.blocks, ...row.subs.map((sub) => sub.blocks)]),
    ];
    for (const blocks of blockLists) {
      for (const block of blocks) {
        if (block.type === "media") block.items = block.items.map(describe);
      }
    }
  }

  const { heroImage } = study.frontmatter;
  study.hero = heroImage ? describe({ alt: `${study.frontmatter.title} hero`, src: heroImage, options: [] }) : null;
  return study;
}

function publicFileExists(src) {
  return src.startsWith("/") && fs.existsSync(path.join(PUBLIC_DIR, decodeURI(src)));
}

function describeMedia(item, darkSurface) {
  const { src } = item;
  const background = item.options.includes("dark") ? darkSurface : null;

  const youtube = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (youtube) {
    return { ...item, kind: "embed", embedSrc: `https://www.youtube-nocookie.com/embed/${youtube[1]}`, exists: true };
  }
  const vimeo = src.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    return { ...item, kind: "embed", embedSrc: `https://player.vimeo.com/video/${vimeo[1]}`, exists: true };
  }

  const kind = VIDEO_FILE.test(src) ? "video" : "image";
  const exists = /^https?:\/\//.test(src) ? true : publicFileExists(src);
  // A same-named .jpg next to a video (demo.mp4 → demo.jpg) becomes its poster.
  const posterSrc = kind === "video" ? src.replace(VIDEO_FILE, ".jpg") : null;
  const poster = posterSrc && publicFileExists(posterSrc) ? posterSrc : null;
  return { ...item, kind, exists, background, poster };
}
