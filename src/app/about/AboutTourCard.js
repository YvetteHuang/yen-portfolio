import { dsColors, dsFonts } from "@/lib/designSystem";
import { aboutCv, aboutNodes, aboutTour, aboutTourOrder } from "@/lib/aboutHero";

const c = dsColors.about;

const nodeById = Object.fromEntries(aboutNodes.map((n) => [n.id, n]));
const cvById = Object.fromEntries(
  [
    ...aboutCv.education,
    ...aboutCv.experience,
    ...aboutCv.awards,
    ...aboutCv.publications,
  ].map((entry) => [entry.id, entry])
);

// Short names for a node's CV entries, shown as chips on the card.
function relatedCv(node) {
  const names = node.cv.map((id) => {
    const entry = cvById[id];
    if (entry.short) return `${entry.short} (${entry.year})`;
    if (id.startsWith("awards-")) return entry.role;
    return entry.org;
  });
  return [...new Set(names)];
}

const pad = (n) => String(n).padStart(2, "0");

// Card under the mobile map: the node's one-liner, its CV entries, and a
// button for the full sheet. With no node it's the whole-map outro.
export default function AboutTourCard({ nodeId, onOpen }) {
  const node = nodeId ? nodeById[nodeId] : null;
  const related = node ? relatedCv(node) : [];

  return (
    <div
      className={`animate-about-fade rounded-[3px] px-5 pt-4 pb-5 motion-reduce:animate-none ${c.glassPanel}`}
    >
      <p className={`mb-2 text-[10.5px] tracking-[0.09em] ${c.faintText}`}>
        {node
          ? `${pad(aboutTourOrder.indexOf(node.id) + 1)} / ${pad(aboutTourOrder.length)}`
          : "ALL TOGETHER"}
      </p>
      <h2 className={`${dsFonts.display.className} mb-2 text-[22px] font-normal leading-tight`}>
        {node ? node.label : aboutTour.outroTitle}
      </h2>
      <p className={`text-[14px] leading-[1.55] ${c.sheetText}`}>
        {node ? node.hover : aboutTour.outroText}
      </p>

      {related.length ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {related.map((name) => (
            <li
              key={name}
              className={`rounded-full border ${c.lineBorder} px-2.5 py-[3px] text-[11px] leading-snug ${c.litText}`}
            >
              {name}
            </li>
          ))}
        </ul>
      ) : null}

      {node ? (
        <button
          type="button"
          aria-haspopup="dialog"
          aria-controls="about-sheet-mobile"
          onClick={() => onOpen(node.id)}
          className={`mt-4 cursor-pointer text-[12px] tracking-[0.04em] ${c.accentText} ${c.accentFocusOutline} outline-offset-4`}
        >
          Read more →
        </button>
      ) : null}
    </div>
  );
}
