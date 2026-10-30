"use client";

import { useEffect, useRef } from "react";
import MoreWorkCard from "@/components/MoreWorkCard";
import { dsFonts } from "@/lib/designSystem";

const moreWorkProjects = [
  {
    title: "Gizmu",
    tags: ["AR", "Mobile", "Interaction Design"],
    description:
      "AR interaction game that turns everyday objects into music",
    imageSrc: "/homepage_gizmu.png",
    imageAlt: "Gizmu AR mobile game mockup",
    href: "/work/gizmu",
    mediaClassName:
      "bg-[linear-gradient(134.5deg,#D37DB8_12%,#7A4A7C_45%,#2B2145_92%)]",
    imageClassName: "object-contain p-2",
  },
  {
    title: "NYU Langone",
    tags: ["Service Design", "Healthcare"],
    description: "Care journey research for gender-expansive patients.",
    imageSrc: "/morework_langone.png",
    imageAlt: "NYU Langone research project mockup",
    mediaClassName:
      "bg-[linear-gradient(47.4deg,#382673_61%,#6A24A2_109%)]",
    imageClassName: "object-contain object-center scale-110 -translate-y-0.5",
  },
  {
    title: "jlin CIS",
    tags: ["Brand Identity", "CIS", "Logo Design"],
    description: "Brand identity for an industrial automation company",
    imageSrc: "/morework_jlin.png",
    imageAlt: "jlin CIS brand identity photography",
    mediaClassName: "bg-[#1a1a1a]",
    imageClassName: "object-cover",
  },
  {
    title: "NYU Albert",
    tags: ["UX Redesign", "Higher Ed"],
    description: "Course enrollment system redesign for NYU students.",
    imageSrc: "/homepage_nyualbert.png",
    imageAlt: "NYU Albert course enrollment system mockup",
    mediaClassName:
      "bg-[linear-gradient(133.3deg,#6A24A2_26%,#0B2848_99%)]",
    imageClassName: "object-contain p-4",
  },
];

/**
 * Row = 4×20.8125rem cards + 3×1.25rem gaps = 87rem.
 * Plus 2×2.5rem page pads ≈ 92rem — at/above this, center with mx-auto.
 * Gutter padding only applies below that so it can't fight centering.
 */
const TRACK_CLASS =
  "flex w-max gap-5 max-[91.98rem]:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] md:max-[91.98rem]:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] min-[92rem]:mx-auto";

function canScrollHorizontally(el) {
  return el.scrollWidth > el.clientWidth + 1;
}

export default function MoreWorkSection() {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (event) => {
      if (!canScrollHorizontally(el)) return;

      // Respect native trackpad horizontal gestures.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + event.deltaY;
      const scrollingLeft = event.deltaY < 0;
      const scrollingRight = event.deltaY > 0;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= maxScroll - 1;

      if ((scrollingLeft && atStart) || (scrollingRight && atEnd)) return;

      event.preventDefault();
      el.scrollLeft = next;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // Pixels a press must travel before it counts as a drag, so a plain
    // click still opens a linked card.
    const DRAG_THRESHOLD = 5;

    let isPointerDown = false;
    let isDragging = false;
    let didDrag = false;
    let startX = 0;
    let startScrollLeft = 0;
    let pointerId = null;

    const onPointerDown = (event) => {
      if (event.pointerType === "touch") return;
      if (!canScrollHorizontally(el)) return;

      isPointerDown = true;
      didDrag = false;
      pointerId = event.pointerId;
      startX = event.clientX;
      startScrollLeft = el.scrollLeft;
    };

    const onPointerMove = (event) => {
      if (!isPointerDown || event.pointerId !== pointerId) return;
      const delta = event.clientX - startX;
      if (!isDragging) {
        if (Math.abs(delta) < DRAG_THRESHOLD) return;
        isDragging = true;
        didDrag = true;
        el.setPointerCapture(event.pointerId);
        el.classList.add("cursor-grabbing");
      }
      el.scrollLeft = startScrollLeft - delta;
    };

    const endDrag = (event) => {
      if (!isPointerDown || event.pointerId !== pointerId) return;
      isPointerDown = false;
      isDragging = false;
      pointerId = null;
      el.classList.remove("cursor-grabbing");
      if (el.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId);
      }
    };

    // A drag that ends over a card shouldn't open it.
    const onClickCapture = (event) => {
      if (!didDrag) return;
      didDrag = false;
      event.preventDefault();
      event.stopPropagation();
    };

    // Links are natively draggable, which would cancel the scroll drag.
    const onDragStart = (event) => event.preventDefault();

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("dragstart", onDragStart);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return (
    <section
      id="more-work"
      aria-labelledby="more-work-heading"
      className="scroll-mt-28 mt-16 pb-16 md:mt-20 md:pb-20"
    >
      <h2
        id="more-work-heading"
        className={`${dsFonts.display.className} text-[2.25rem] font-semibold leading-none text-white`}
      >
        More Work
      </h2>

      <div
        ref={scrollerRef}
        className="relative left-1/2 mt-6 w-screen max-w-[100vw] -translate-x-1/2 cursor-grab overflow-x-auto pb-2 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
      >
        <div className={TRACK_CLASS}>
          {moreWorkProjects.map((project) => (
            <MoreWorkCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
