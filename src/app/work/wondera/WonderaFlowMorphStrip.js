"use client";

import { smoothstep01 } from "./wonderaFlowMorphMath";

/**
 * Flow morph: Karaoke grows (also borrows mid-scroll width from Home via shared math),
 * Library collapses; lane brackets morph with the same `morph` as flow blocks (no crossfade).
 */

const FLOW = {
  fill: "#E5D9FF",
  ink: "#6233C1",
  text: "#2A1146",
};

const NOTCH = 14;
const FLOW_HEIGHT = "3.35rem";

function LaneLabel({ children }) {
  return (
    <span className="mb-1 block text-center text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-zinc-400 min-[1024px]:text-[0.6875rem]">
      {children}
    </span>
  );
}

function LaneBracket() {
  return (
    <div
      className="h-2 w-full rounded-t-sm border border-b-0"
      style={{ borderColor: FLOW.ink }}
      aria-hidden
    />
  );
}

function FlowBlock({ shape, children, style: outerStyle }) {
  const clip =
    shape === "leftFlatRightArrow"
      ? `polygon(0 0, calc(100% - ${NOTCH}px) 0, 100% 50%, calc(100% - ${NOTCH}px) 100%, 0 100%)`
      : shape === "leftArrowRightFlat"
        ? `polygon(${NOTCH}px 0, 100% 0, 100% 100%, ${NOTCH}px 100%, 0 50%)`
        : `polygon(${NOTCH}px 0, calc(100% - ${NOTCH}px) 0, 100% 50%, calc(100% - ${NOTCH}px) 100%, ${NOTCH}px 100%, 0 50%)`;

  return (
    <div
      className="relative h-full w-full min-w-0"
      style={{
        backgroundColor: FLOW.fill,
        clipPath: clip,
        WebkitClipPath: clip,
        color: FLOW.text,
        ...outerStyle,
      }}
    >
      <div className="flex h-full items-center justify-center px-2 py-2 text-center text-[0.65rem] font-medium leading-snug min-[1024px]:px-4 min-[1024px]:text-sm">
        {children}
      </div>
    </div>
  );
}

export function WonderaFlowMorphStrip({ progress }) {
  const p = Math.max(0, Math.min(1, progress));
  const morph = smoothstep01((p - 0.08) / 0.62);
  const beforeOpacity = 1 - smoothstep01((p - 0.22) / 0.46);
  const slot5AfterOpacity = smoothstep01((p - 0.22) / 0.4);

  // Karaoke expands left: from col3-4 to col2-4 (0-based left units)
  const karaokeLeftCol = 2 - morph;
  const karaokeWidthCol = 2 + morph;
  const homeOpacity = 1 - morph;
  const trainingOpacity = morph;

  return (
    <div className="w-full min-w-0">
      <div className="relative mb-3 min-h-[2.75rem] w-full">
        {/* Lane brackets use the same `morph` as flow blocks: left Training grows, Singing narrows 4→3 cols, right Training slides one column left. */}
        <div
          className="absolute bottom-0 left-0 flex min-w-0 flex-col overflow-hidden"
          style={{
            width: `calc((100% / 6) * ${morph})`,
            opacity: trainingOpacity,
          }}
        >
          <LaneLabel>Training</LaneLabel>
          <LaneBracket />
        </div>

        <div
          className="absolute bottom-0 flex min-w-0 flex-col"
          style={{
            left: `calc((100% / 6) * 1)`,
            width: `calc((100% / 6) * ${4 - morph})`,
          }}
        >
          <LaneLabel>Singing</LaneLabel>
          <LaneBracket />
        </div>

        <div
          className="absolute bottom-0 flex min-w-0 flex-col"
          style={{
            left: `calc((100% / 6) * ${5 - morph})`,
            width: `calc(100% / 6)`,
            opacity: slot5AfterOpacity,
          }}
        >
          <LaneLabel>Training</LaneLabel>
          <LaneBracket />
        </div>
      </div>

      <div className="relative w-full" style={{ height: FLOW_HEIGHT }}>
        <div
          className="absolute left-0 top-0 z-[8] h-full w-0 min-w-0 overflow-hidden"
          style={{
            width: `calc((100% / 6) * ${morph})`,
            opacity: trainingOpacity,
          }}
        >
          <FlowBlock shape="leftFlatRightArrow">
            <>
              Training:
              <br />
              Overview the journey
            </>
          </FlowBlock>
        </div>

        <div
          className="absolute top-0 z-[7] h-full"
          style={{
            left: `calc(100% / 6)`,
            width: `calc(100% / 6)`,
            opacity: homeOpacity,
          }}
        >
          <FlowBlock shape="leftFlatRightArrow">
            <div className="relative w-full">
              Home:
              <br />
              Find a song to sing
            </div>
          </FlowBlock>
        </div>

        <div
          className="absolute top-0 z-[9] h-full"
          style={{
            left: `calc((100% / 6) * ${karaokeLeftCol})`,
            width: `calc((100% / 6) * ${karaokeWidthCol})`,
          }}
        >
          <FlowBlock shape="leftFlatRightArrow">
            <>
              Karaoke:
              <br />
              Collect voice material
            </>
          </FlowBlock>
        </div>

        <div
          className="absolute top-0 z-[6] h-full transition-opacity duration-150 motion-reduce:transition-none"
          style={{
            left: `calc((100% / 6) * 4)`,
            width: `calc(100% / 6)`,
            opacity: beforeOpacity,
          }}
        >
          <FlowBlock shape="leftFlatRightArrow">
            <>
              Library:
              <br />
              Manage posts/props
            </>
          </FlowBlock>
        </div>

        <div
          className="absolute top-0 z-[7] h-full transition-opacity duration-150 motion-reduce:transition-none"
          style={{
            left: `calc((100% / 6) * 4)`,
            width: `calc(100% / 6)`,
            opacity: slot5AfterOpacity,
          }}
        >
          <FlowBlock shape="leftFlatRightArrow">
            <>
              Training:
              <br />
              Manage training progress
            </>
          </FlowBlock>
        </div>

        <div
          className="absolute top-0 z-[6] h-full transition-opacity duration-150 motion-reduce:transition-none"
          style={{
            left: `calc((100% / 6) * 5 - ${NOTCH}px)`,
            width: `calc(100% / 6 + ${NOTCH}px)`,
            opacity: beforeOpacity,
          }}
        >
          <FlowBlock shape="leftArrowRightFlat">
            <div className="relative w-full">
              My AI:
              <br />
              Manage training progress
            </div>
          </FlowBlock>
        </div>
      </div>
    </div>
  );
}
