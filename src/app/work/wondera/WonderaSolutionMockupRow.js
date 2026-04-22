"use client";

import Image from "next/image";
import { smoothstep01 } from "./wonderaFlowMorphMath";

const MOCK = {
  slot1After: "/wondera_training_before.svg",
  home: "/wondera_homepage.svg",
  singing: "/wondera_singing.svg",
  scoring: "/wondera_scoring.svg",
  library: "/wondera_library.svg",
  trainingAfter: "/wondera_training_after.svg",
  myAi: "/wondera_old_ai.svg",
  mobileBefore: "/wondera_mobile_before.svg",
  mobileAfter: "/wondera_mobile_after.svg",
};
const BASE_Y = 0;

function Phone({ src, alt, style }) {
  return (
    <div
      className="relative mx-auto aspect-[9/19.5] w-full max-w-[6rem] min-[1280px]:max-w-[7.2rem]"
      style={style}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        className="object-contain object-bottom"
        sizes="(max-width: 1280px) 80px, 96px"
      />
    </div>
  );
}

export function WonderaSolutionMockupRow({ progress, reduceMotion }) {
  const p = Math.max(0, Math.min(1, progress));

  const riseIn = smoothstep01((p - 0.12) / 0.44);
  const riseOut = smoothstep01((p - 0.26) / 0.44);
  const slot5Swap = smoothstep01((p - 0.38) / 0.26);
  const slot5AfterIn = smoothstep01((p - 0.48) / 0.24);
  const slot1In = slot5AfterIn;
  const mobileAfterOpacity = reduceMotion ? (p >= 0.5 ? 1 : 0) : p;

  return (
    <>
      <div className="mt-5 min-[1024px]:hidden">
        <div className="relative mx-auto aspect-[16/9] w-full max-w-[30rem] overflow-hidden rounded-lg border border-white/10 bg-black/30">
          <div className="absolute inset-0" style={{ opacity: 1 - mobileAfterOpacity }}>
            <Image
              src={MOCK.mobileBefore}
              alt="Mobile before flow"
              fill
              unoptimized
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0" style={{ opacity: mobileAfterOpacity }}>
            <Image
              src={MOCK.mobileAfter}
              alt="Mobile after flow"
              fill
              unoptimized
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      </div>

      <div className="relative z-[30] mt-[4.5rem] hidden grid-cols-6 gap-0 min-[1024px]:grid">
        <div className="relative min-w-0">
          <div className="relative min-h-[12rem]">
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                opacity: slot1In,
                transform: `translateY(calc(${BASE_Y}px + ${(1 - slot1In) * 140}%))`,
              }}
            >
              <Phone src={MOCK.slot1After} alt="Training overview" />
            </div>
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="relative min-h-[12rem]">
            <div
              className="absolute inset-x-0 bottom-0"
              style={{ transform: `translateY(${BASE_Y}px)` }}
            >
              <Phone src={MOCK.home} alt="Home" />
            </div>
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="relative min-h-[12rem]">
            <div
              className="absolute inset-x-0 bottom-0"
              style={{ transform: `translateY(${BASE_Y}px)` }}
            >
              <Phone src={MOCK.singing} alt="Karaoke" />
            </div>
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="relative min-h-[12rem]">
            <div
              className="absolute inset-x-0 bottom-0"
              style={{ transform: `translateY(${BASE_Y}px)` }}
            >
              <Phone src={MOCK.scoring} alt="Scoring" />
            </div>
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="relative min-h-[12rem]">
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                opacity: 1 - slot5Swap,
                transform: `translateY(calc(${BASE_Y}px + ${-150 * riseOut}%))`,
              }}
            >
              <Phone src={MOCK.library} alt="Library" />
            </div>
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                opacity: slot5AfterIn,
                transform: `translateY(calc(${BASE_Y}px + ${(1 - slot5AfterIn) * 140}%))`,
              }}
            >
              <Phone src={MOCK.trainingAfter} alt="Training after integration" />
            </div>
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="relative min-h-[12rem]">
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                opacity: 1 - riseOut,
                transform: `translateY(calc(${BASE_Y}px + ${-150 * riseOut}%))`,
              }}
            >
              <Phone src={MOCK.myAi} alt="My AI" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
