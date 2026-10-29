import { dsColors, dsFonts } from "@/lib/designSystem";
import { aboutCv, aboutProfile } from "@/lib/aboutHero";
import { INTRO, introDelay } from "./aboutIntro";

const c = dsColors.about;

// Everything inside, padding included, is sized in em off one font size, so the
// column scales as a whole. Content plus padding runs about 74em tall; dividing
// the height left under the fixed navbar (5.25rem) by 76em keeps it from
// scrolling with a little slack for the gaps between sections. Adding CV
// entries means raising the divisor.
const columnClass = `flex h-full w-[332px] shrink-0 flex-col justify-between overflow-hidden border-r ${c.lineBorder} pt-[calc(5.25rem+1.6em)] pr-7 pb-[1.4em] pl-10 text-[clamp(8px,calc((100svh-5.25rem)/76),12.4px)] leading-normal`;

// While a graph node is lit, its CV entries get an accent rule and the rest
// dim. Nodes with no CV entries leave the column as is.
function entryClass(id, litIds) {
  const filtering = litIds?.length > 0;
  const lit = filtering && litIds.includes(id);
  const state = lit ? c.accentBorder : `border-transparent ${filtering ? "opacity-30" : ""}`;
  return {
    lit,
    className: `border-l pl-[9px] transition-[border-color,opacity] duration-[220ms] motion-reduce:transition-none ${state}`,
  };
}

function SectionHeading({ children }) {
  return (
    <h2
      className={`mb-[0.6em] border-b ${c.lineBorder} pb-[0.35em] text-[0.84em] font-normal tracking-[0.11em] ${c.faintText}`}
    >
      {children}
    </h2>
  );
}

function CvEntry({ entry, litIds }) {
  const { lit, className } = entryClass(entry.id, litIds);
  const note = entry.note ? (
    <>
      <br />
      <span className={`text-[0.86em] italic ${c.faintText}`}>{entry.note}</span>
    </>
  ) : null;

  return (
    <li
      id={`cv-${entry.id}`}
      className={`${className} mb-[0.45em] flex items-baseline justify-between gap-2.5 leading-[1.28]`}
    >
      <span className="min-w-0">
        <span className={lit ? c.accentText : c.inkText}>{entry.role}</span>
        {entry.inline ? ", " : <br />}
        <span className={lit ? c.litText : c.dimText}>{entry.org}</span>
        {note}
      </span>
      <span className={`shrink-0 whitespace-nowrap text-[0.86em] ${c.faintText}`}>
        {entry.year}
      </span>
    </li>
  );
}

// Blocks fade in top to bottom: name, education, experience, awards,
// publications.
function blockIntro(step) {
  return {
    className: "animate-about-fade motion-reduce:animate-none",
    style: introDelay(INTRO.cvStart + step * INTRO.cvStagger),
  };
}

function CvList({ title, entries, litIds, step, children }) {
  return (
    <section {...blockIntro(step)}>
      <SectionHeading>{title}</SectionHeading>
      <ul>
        {entries.map((entry) => (
          <CvEntry key={entry.id} entry={entry} litIds={litIds} />
        ))}
      </ul>
      {children}
    </section>
  );
}

export default function AboutCv({ litIds }) {
  return (
    <aside className={columnClass}>
      <div {...blockIntro(0)}>
        <h1
          className={`${dsFonts.display.className} mb-[0.3em] text-[3.05em] font-normal leading-[1.03] tracking-[-0.01em]`}
        >
          {aboutProfile.name}
        </h1>
        <p className={`text-[1.02em] ${c.dimText}`}>{aboutProfile.where}</p>
      </div>

      <CvList title="EDUCATION" entries={aboutCv.education} litIds={litIds} step={1} />
      <CvList title="EXPERIENCE" entries={aboutCv.experience} litIds={litIds} step={2} />
      <CvList title="AWARDS" entries={aboutCv.awards} litIds={litIds} step={3}>
        <p className={`ml-[9px] mt-[0.2em] text-[0.86em] italic ${c.faintText}`}>
          {aboutCv.awardsNote}
        </p>
      </CvList>

      <section {...blockIntro(4)}>
        <SectionHeading>PUBLICATIONS</SectionHeading>
        {aboutCv.publications.map((pub) => {
          const { lit, className } = entryClass(pub.id, litIds);
          return (
            <p
              key={pub.id}
              id={`cv-${pub.id}`}
              className={`${className} mb-[0.5em] text-[0.88em] leading-[1.35] ${lit ? c.litText : c.dimText}`}
            >
              {pub.lead}
              <b className={`font-semibold ${lit ? c.accentText : c.inkText}`}>{pub.self}</b>
              {pub.rest}
            </p>
          );
        })}
      </section>
    </aside>
  );
}
