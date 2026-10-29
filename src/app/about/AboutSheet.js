import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { dsColors, dsFonts } from "@/lib/designSystem";
import TrackedLink from "@/components/TrackedLink";
import { aboutThumbs, aboutWorkLinks } from "@/lib/aboutHero";

const c = dsColors.about;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

const thumbClass =
  "relative aspect-[4/3] overflow-hidden rounded-[2px] border border-white/[0.07] bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(130,170,255,0.13))] brightness-[0.94] saturate-[0.92] transition-[filter] duration-200 group-hover:brightness-[1.04] group-hover:saturate-100 motion-reduce:transition-none";

function Thumb({ src, className = "" }) {
  return (
    <div className={`${thumbClass} ${className}`}>
      {src ? (
        <Image src={src} alt="" fill sizes="170px" className="object-cover" />
      ) : null}
    </div>
  );
}

// Desktop: a glass card at the right of the stage. Mobile: a bottom sheet over
// the tour, with its own id so both can be on the page.
const PLACEMENT = {
  side: {
    base: `absolute right-[34px] top-1/2 max-h-[76%] w-[392px] rounded-[3px] ${c.glassSheet}`,
    open: "-translate-y-1/2 scale-100 opacity-100",
    closed: "-translate-y-[46%] scale-[0.98] opacity-0",
  },
  bottom: {
    base: `fixed inset-x-0 bottom-0 z-[60] max-h-[85svh] w-full overscroll-contain rounded-t-[10px] pb-[max(22px,env(safe-area-inset-bottom))] ${c.sheetBottom}`,
    open: "translate-y-0 opacity-100",
    closed: "translate-y-full opacity-0",
  },
};

export default function AboutSheet({ node, onClose, id = "about-sheet", placement = "side" }) {
  const sheetRef = useRef(null);
  // Keep the last node's content so the sheet fades out with it.
  const [shown, setShown] = useState(null);
  const open = Boolean(node);

  if (open && node !== shown) setShown(node);

  useEffect(() => {
    if (open) sheetRef.current?.focus({ preventScroll: true });
  }, [open, node]);

  // Keep Tab inside the sheet while it's open.
  const onKeyDown = (event) => {
    if (event.key !== "Tab") return;
    const sheet = sheetRef.current;
    const items = [...sheet.querySelectorAll(FOCUSABLE)];
    if (!items.length) {
      event.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const current = document.activeElement;
    if (event.shiftKey && (current === first || current === sheet)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && current === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const place = PLACEMENT[placement];
  const paragraphs = shown ? (shown.expanded ?? [shown.hover]) : [];

  return (
    <div
      id={id}
      ref={sheetRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      inert={!open}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={onKeyDown}
      className={`overflow-y-auto pt-6 pr-[26px] pb-[22px] pl-[26px] outline-none ${place.base} ${c.thinScrollbar} transition-[opacity,transform] duration-[220ms] motion-reduce:transition-none ${
        open ? `pointer-events-auto ${place.open}` : `pointer-events-none ${place.closed}`
      }`}
    >
      {shown ? (
        <>
          <button
            type="button"
            aria-label="Close"
            onClick={() => onClose()}
            className={`absolute right-3.5 top-3 cursor-pointer text-base leading-none ${c.faintText} ${c.inkHoverText} ${c.accentFocusOutline}`}
          >
            ×
          </button>

          <h3
            id={`${id}-title`}
            className={`${dsFonts.display.className} mb-3 text-2xl font-normal`}
          >
            {shown.label}
          </h3>

          {paragraphs.map((text, i) => (
            <p
              key={i}
              className={`text-[13.5px] leading-[1.62] ${c.sheetText} ${
                i === paragraphs.length - 1 ? "mb-[18px]" : "mb-[11px]"
              }`}
            >
              {text}
            </p>
          ))}

          {shown.gallery?.length ? (
            <div className="mb-4 grid grid-cols-2 gap-2">
              {shown.gallery.map((key) => (
                <div key={key} className="group">
                  <Thumb src={aboutThumbs[key]} />
                </div>
              ))}
            </div>
          ) : null}

          {shown.works?.length ? (
            <>
              <p className={`mb-2.5 text-[10.5px] tracking-[0.09em] ${c.faintText}`}>
                WORK
              </p>
              <ul className="mb-4 grid grid-cols-2 gap-2.5">
                {shown.works.map((work) => {
                  const href = aboutWorkLinks[work];
                  const content = (
                    <>
                      <Thumb
                        src={aboutThumbs[shown.workImages?.[work] ?? work]}
                        className="mb-1.5"
                      />
                      <span
                        className={`text-[11px] leading-[1.35] ${c.dimText} ${href ? c.accentGroupHoverText : ""}`}
                      >
                        {work}
                      </span>
                    </>
                  );
                  return (
                    <li key={work} className="group">
                      {href ? (
                        <TrackedLink
                          href={href}
                          title={work}
                          location="about"
                          className={`block rounded-[2px] outline-offset-4 ${c.accentFocusOutline}`}
                        >
                          {content}
                        </TrackedLink>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
