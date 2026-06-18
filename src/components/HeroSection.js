"use client";

import { useEffect, useState } from "react";
import { dsFonts, dsType } from "@/lib/designSystem";

const COPY_DELAY_MS = 420;

export default function HeroSection() {
  const [copyVisible, setCopyVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setCopyVisible(true);
      return;
    }

    const timer = window.setTimeout(() => setCopyVisible(true), COPY_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative left-1/2 mb-8 min-h-[calc(100svh-5.5rem)] w-screen -translate-x-1/2 md:mb-12"
      aria-labelledby="intro-heading"
    >
      <div className="relative z-10 flex min-h-[calc(100svh-5.5rem)] flex-col justify-end px-6 pb-12 pt-28 md:px-10 md:pb-14 md:pt-32 min-[1024px]:justify-center">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 min-[1024px]:grid-cols-12 min-[1024px]:items-center">
          <div
            className={`min-w-0 min-[1024px]:col-span-7 min-[1024px]:col-start-6 ${
              copyVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            } transition-all duration-700 ease-out`}
          >
            <h1
              id="intro-heading"
              className={`${dsFonts.display.className} text-[clamp(2.125rem,10vw,3rem)] font-semibold leading-none tracking-tight text-white min-[720px]:text-[3.75rem] min-[1024px]:text-[4rem] min-[1440px]:text-[4.5rem] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] min-[1024px]:whitespace-nowrap`}
            >
              Hi, I&apos;m Yen.
            </h1>
            <p
              className={`${dsFonts.body.className} ${dsType.heroLede} mt-2 max-w-none text-white/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.4)] ${
                copyVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              } transition-all duration-700 ease-out`}
              style={{ transitionDelay: copyVisible ? "180ms" : "0ms" }}
            >
              <span className="min-[1024px]:hidden">
                Product Designer who thinks in systems,
                <br />
                sweats the details, and never stops asking why.
                <br />
                Currently focused on AI products and fintech.
              </span>
              <span className="hidden min-[1024px]:inline">
                Product Designer who thinks in systems, sweats the details, and
                never stops asking why. Currently focused on AI products and
                fintech.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
