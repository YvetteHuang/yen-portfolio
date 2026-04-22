"use client";

import { useEffect, useRef, useState } from "react";
import { WonderaFlowMorphStrip } from "./WonderaFlowMorphStrip";
import { WonderaSolutionMockupRow } from "./WonderaSolutionMockupRow";

export function WonderaSolutionFlowScroll() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const tick = () => {
      const el = trackRef.current;
      if (!el) return;
      let raw = 0;
      if (reduceMotion) {
        const rect = el.getBoundingClientRect();
        raw = rect.top < window.innerHeight * 0.5 ? 1 : 0;
      } else {
        const rect = el.getBoundingClientRect();
        const passed = Math.max(0, -rect.top);
        const startOffset = window.innerHeight * 0.14;
        const denom = Math.max(1, rect.height - window.innerHeight * 0.35 - startOffset);
        raw = Math.min(1, Math.max(0, (passed - startOffset) / denom));
      }
      setProgress(raw);
    };

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [reduceMotion]);

  const subBefore = 1 - progress;
  const subAfter = progress;

  return (
    <div ref={trackRef} className="relative min-h-[min(220vh,1300px)] w-full">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
        Scroll to morph the flow from before to after
      </p>

      <div className="sticky top-24 z-10 w-full py-1 min-[1024px]:top-28">
        <div className="relative mb-4 min-h-[1.25rem] w-full">
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 transition-opacity duration-150 motion-reduce:transition-none"
            style={{ opacity: subBefore }}
          >
            Before — singing and training journeys stay apart
          </p>
          <p
            className="absolute left-0 top-0 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 transition-opacity duration-150 motion-reduce:transition-none"
            style={{ opacity: subAfter }}
          >
            After — integrated training + singing loop
          </p>
        </div>

        <div>
          <WonderaFlowMorphStrip progress={progress} />
        </div>

        <WonderaSolutionMockupRow progress={progress} reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}
