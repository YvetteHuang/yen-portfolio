"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { dsColors } from "@/lib/designSystem";
import { aboutNodes, aboutTourOrder } from "@/lib/aboutHero";
import AboutExplore from "./AboutExplore";
import AboutGraph from "./AboutGraph";
import AboutSheet from "./AboutSheet";
import AboutTourCard from "./AboutTourCard";
import { cameraFor } from "./tourCamera";

const c = dsColors.about;

const nodeById = Object.fromEntries(aboutNodes.map((n) => [n.id, n]));

// One step per node, then the whole map (null).
const STEPS = [...aboutTourOrder, null];
// Scroll distance per step, as a share of the viewport height. Each step
// switches the camera at once and lets the transition do the moving.
const STEP_VH = 0.7;

// Mobile and tablet: a sticky map stage that steps through the nodes as the
// page scrolls, with a card for the current node and a bottom sheet for the
// full text. "Explore map" opens a free-moving full-screen map. No particles
// here.
export default function AboutTour() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const exploreButtonRef = useRef(null);
  const sheetOpenerRef = useRef(null);
  const [step, setStep] = useState(0);
  const [size, setSize] = useState(null);
  const [sheetId, setSheetId] = useState(null);
  const [exploring, setExploring] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width && height) setSize({ width, height });
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      // Hidden on desktop.
      if (!section || !section.offsetParent) return;
      const stepHeight = window.innerHeight * STEP_VH;
      const scrolled = -section.getBoundingClientRect().top;
      const next = Math.round(scrolled / stepHeight);
      setStep(Math.min(STEPS.length - 1, Math.max(0, next)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const closeSheet = useCallback(() => {
    setSheetId(null);
    sheetOpenerRef.current?.focus({ preventScroll: true });
  }, []);

  // Leaving the explore map scrolls the tour to the node last tapped there, so
  // the tour picks up from it.
  const closeExplore = useCallback((nodeId) => {
    setExploring(false);
    const index = nodeId ? STEPS.indexOf(nodeId) : -1;
    const section = sectionRef.current;
    if (index >= 0 && section) {
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + index * window.innerHeight * STEP_VH, behavior: "instant" });
    }
    exploreButtonRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!sheetId && !exploring) return;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (sheetId) closeSheet();
      else closeExplore(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sheetId, exploring, closeSheet, closeExplore]);

  const openSheet = (id) => {
    sheetOpenerRef.current = document.activeElement;
    setSheetId(id);
  };

  const nodeId = STEPS[step];
  const camera = size ? cameraFor(nodeId, size) : null;

  return (
    <section
      ref={sectionRef}
      aria-label="How the practice connects"
      className="relative min-[1024px]:hidden"
      style={{ height: `calc(100svh + ${(STEPS.length - 1) * STEP_VH * 100}vh)` }}
    >
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden">
        {/* Hidden until the camera is placed, so it doesn't jump on load. */}
        <div className={`absolute inset-0 ${camera ? "" : "opacity-0"}`}>
          <AboutGraph
            litId={nodeId}
            pinnedId={null}
            camera={camera}
            interactive={false}
            idPrefix="about-tour"
          />
        </div>

        <button
          ref={exploreButtonRef}
          type="button"
          aria-haspopup="dialog"
          onClick={() => setExploring(true)}
          disabled={!size}
          className={`absolute right-4 top-[calc(5.25rem+0.75rem)] cursor-pointer rounded-full border ${c.lineBorder} bg-black/60 px-3 py-1.5 text-[11px] tracking-[0.06em] backdrop-blur-sm ${c.litText} ${c.inkHoverText} ${c.accentFocusOutline}`}
        >
          Explore map
        </button>

        <div
          aria-live="polite"
          className="absolute inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] mx-auto max-w-[520px]"
        >
          <AboutTourCard key={step} nodeId={nodeId} onOpen={openSheet} />
        </div>
      </div>

      {exploring && size ? (
        <AboutExplore
          size={size}
          startCamera={camera}
          startNodeId={nodeId}
          onClose={closeExplore}
          onOpenSheet={openSheet}
        />
      ) : null}

      <div
        aria-hidden="true"
        onClick={closeSheet}
        className={`fixed inset-0 z-[55] touch-none bg-black/60 transition-opacity duration-[220ms] motion-reduce:transition-none ${
          sheetId ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <AboutSheet
        id="about-sheet-mobile"
        placement="bottom"
        node={sheetId ? nodeById[sheetId] : null}
        onClose={closeSheet}
      />
    </section>
  );
}
