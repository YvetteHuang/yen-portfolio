"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Anton } from "next/font/google";
import { dsCaseStudyType, dsColors, dsFonts } from "@/lib/designSystem";

const cs = dsCaseStudyType;

// Condensed display face so the rotated "GAP" can fill the gap's width.
const gapFont = Anton({ subsets: ["latin"], weight: "400" });

/**
 * Before → After flow figure (Figma "Scrolling-01…04").
 * Plays once as a timed transition after the figure has been fully in view, and
 * reverses when scrolled back. Drawn on a fixed canvas as wide as the desktop
 * text column (Figma geometry) and scaled down to fit narrower containers, so
 * text never reflows.
 */

const CANVAS_W = 818;
const CANVAS_H = 405;
const COL = 140;
const PHONE_W = 131;
const PHONE_H = 283;
const PHONE_INSET = (COL - PHONE_W) / 2;

const LABEL_Y = 0;
const BRACKET_Y = 22;
const BLOCK_Y = 44;
const BLOCK_H = 57;
const BODY_INSET = 8;
const TIP = 22;
const PHONE_Y = 122;

// Before: My AI sits apart at the right edge of the text column, after a GAP.
const MY_AI_X = CANVAS_W - PHONE_W;
const GAP_LEFT = 3 * COL + PHONE_INSET + PHONE_W;

// Once the figure is fully visible and within CATCH (fraction of viewport height)
// of the viewport's vertical center, the next scroll gesture is consumed to play
// the transition instead of moving the page (scroll up reverses it). The page stays
// locked for the animation plus any trailing trackpad momentum (events closer
// together than MOMENTUM_GAP ms). If the figure is skipped past without a caught
// gesture (scrollbar drag, TOC jump, touch fling), FALLBACK snaps the state.
const CATCH = 0.12;
const FALLBACK = 0.35;
const MOMENTUM_GAP = 160;
const SCROLL_KEYS = {
  ArrowDown: 1,
  PageDown: 1,
  " ": 1,
  ArrowUp: -1,
  PageUp: -1,
};

const TOTAL = 1100;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const PHASE = {
  // Library + My AI collapse, their phones rise out, title swaps
  exit: [0, 350],
  // Singing group shifts one column right, Karaoke spans three columns
  shift: [200, 550],
  // Training blocks expand from center, their phones rise in
  enter: [450, 650],
};

const FLOW = {
  fill: dsColors.wondera.flowFillHex,
  text: dsColors.wondera.flowTextHex,
};

const PHONES = {
  trainingOverview: { src: "/wondera_training_before.svg", alt: "Training overview" },
  home: { src: "/wondera_homepage.svg", alt: "Home" },
  karaoke: { src: "/wondera_singing.svg", alt: "Karaoke" },
  scoring: { src: "/wondera_scoring.svg", alt: "Scoring" },
  library: { src: "/wondera_library.svg", alt: "Library" },
  trainingProgress: { src: "/wondera_training_after.svg", alt: "Training progress" },
  myAi: { src: "/wondera_old_ai.svg", alt: "My AI" },
};

const colX = (i) => i * COL + PHONE_INSET;

const ARROW_CLIP = `polygon(0 ${BODY_INSET}px, calc(100% - ${TIP}px) ${BODY_INSET}px, calc(100% - ${TIP}px) 0, 100% 50%, calc(100% - ${TIP}px) 100%, calc(100% - ${TIP}px) calc(100% - ${BODY_INSET}px), 0 calc(100% - ${BODY_INSET}px))`;
const RECT_CLIP = `inset(${BODY_INSET}px 0)`;
const OPEN = "inset(0 0% 0 0%)";
const CLOSED = "inset(0 50% 0 50%)";

/** Builds a transition string; delays mirror on reverse so it plays backwards. */
function transition(isAfter, reduceMotion, [start, dur], props) {
  if (reduceMotion) return "none";
  const delay = isAfter ? start : TOTAL - start - dur;
  return props.map((prop) => `${prop} ${dur}ms ${EASE} ${delay}ms`).join(", ");
}

function FlowBlock({ title, subtitle, shape = "arrow" }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center whitespace-nowrap text-center"
      style={{
        backgroundColor: FLOW.fill,
        color: FLOW.text,
        clipPath: shape === "arrow" ? ARROW_CLIP : RECT_CLIP,
        paddingRight: shape === "arrow" ? TIP / 2 : 0,
      }}
    >
      <span className="text-[14px] font-semibold leading-[18px]">{title}</span>
      <span className="text-[11px] leading-[14px] tracking-[-0.01em]">{subtitle}</span>
    </div>
  );
}

function Bracket({ label }) {
  return (
    <div className={`flex flex-col ${dsColors.wondera.eyebrow}`}>
      <span className="whitespace-nowrap text-center text-[14px] font-semibold leading-4">
        {label}
      </span>
      <div
        className="h-3 w-full rounded-t-sm border border-b-0 border-current opacity-70"
        style={{ marginTop: BRACKET_Y - LABEL_Y - 16 }}
      />
    </div>
  );
}

function Phone({ phone }) {
  return (
    <Image
      src={phone.src}
      alt={phone.alt}
      fill
      unoptimized
      className="object-contain object-bottom"
      sizes={`${PHONE_W}px`}
    />
  );
}

export function WonderaSolutionFlowScroll() {
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const [isAfter, setIsAfter] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const reduceMotionRef = useRef(false);
  const [scale, setScale] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reduceMotionRef.current = mq.matches;
      setReduceMotion(mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / CANVAS_W));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let after = false;
    let lockUntil = 0;
    let touchY = null;
    let frame = 0;

    const set = (next) => {
      after = next;
      setIsAfter(next);
    };

    // How far the figure has scrolled past being vertically centered (px).
    const measure = () => {
      const el = rootRef.current;
      if (!el) return null;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      return {
        vh,
        pastCenter: (vh - rect.height) / 2 - rect.top,
        fullyVisible: rect.top >= 0 && rect.bottom <= vh,
      };
    };

    // Consumes a gesture in `dir` (1 = down, -1 = up) if it should play the
    // transition; returns true when the page must not scroll.
    const consume = (dir) => {
      const now = performance.now();
      if (now < lockUntil) {
        lockUntil = Math.max(lockUntil, now + MOMENTUM_GAP);
        return true;
      }
      if (reduceMotionRef.current || !dir) return false;
      const m = measure();
      if (!m || !m.fullyVisible) return false;
      const catchPx = m.vh * CATCH;
      const shouldPlay = dir > 0 ? !after && m.pastCenter >= -catchPx : after && m.pastCenter <= catchPx;
      if (!shouldPlay) return false;
      set(dir > 0);
      lockUntil = now + TOTAL;
      return true;
    };

    const onWheel = (e) => {
      if (consume(Math.sign(e.deltaY))) e.preventDefault();
    };
    const onKeyDown = (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;
      const dir = SCROLL_KEYS[e.key] * (e.key === " " && e.shiftKey ? -1 : 1);
      if (dir && consume(dir)) e.preventDefault();
    };
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (touchY === null) return;
      const dy = touchY - e.touches[0].clientY;
      if (Math.abs(dy) < 8 && performance.now() >= lockUntil) return;
      if (consume(Math.sign(dy)) && e.cancelable) e.preventDefault();
    };

    const fallback = () => {
      frame = 0;
      const m = measure();
      if (!m) return;
      const skipPx = reduceMotionRef.current ? 0 : m.vh * FALLBACK;
      if (!after && m.pastCenter > skipPx) set(true);
      else if (after && m.pastCenter < -skipPx) set(false);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(fallback);
    };

    fallback();
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const t = (phase, props) => transition(isAfter, reduceMotion, phase, props);
  const a = isAfter;

  // Elements that collapse (Before only) or expand (After only) from their center.
  const exitClip = { clipPath: a ? CLOSED : OPEN, transition: t(PHASE.exit, ["clip-path"]) };
  const enterClip = { clipPath: a ? OPEN : CLOSED, transition: t(PHASE.enter, ["clip-path"]) };
  const exitPhone = {
    opacity: a ? 0 : 1,
    transform: `translateY(${a ? -40 : 0}px)`,
    transition: t(PHASE.exit, ["opacity", "transform"]),
  };
  const enterPhone = {
    opacity: a ? 1 : 0,
    transform: `translateY(${a ? 0 : 60}px)`,
    transition: t(PHASE.enter, ["opacity", "transform"]),
  };
  const shiftPhone = {
    transform: `translateX(${a ? COL : 0}px)`,
    transition: t(PHASE.shift, ["transform"]),
  };

  const blockBox = (left, width) => ({ top: BLOCK_Y, height: BLOCK_H, left, width });
  const bracketBox = (left, width) => ({ top: LABEL_Y, left, width });
  const phoneBox = (left) => ({ top: PHONE_Y, left, width: PHONE_W, height: PHONE_H });

  return (
    <div ref={rootRef} className="w-full">
      <div className={`relative ${cs.body} text-zinc-200`}>
        <p
          style={{ opacity: a ? 0 : 1, transition: t(PHASE.exit, ["opacity"]) }}
          aria-hidden={a}
        >
          <span className="font-semibold text-zinc-100">Before</span> — Singing and Training
          experience are separated.
        </p>
        <p
          className="absolute inset-x-0 top-0"
          style={{ opacity: a ? 1 : 0, transition: t(PHASE.exit, ["opacity"]) }}
          aria-hidden={!a}
        >
          <span className="font-semibold text-zinc-100">After</span> — Singing and Training
          experience are integrated.
        </p>
      </div>

      <div
        ref={frameRef}
        className="relative mt-6 w-full"
        style={{
          height: CANVAS_H * (scale ?? 1),
          visibility: scale === null ? "hidden" : "visible",
        }}
      >
        <div
          className={`${dsFonts.body.className} absolute left-0 top-0 origin-top-left overflow-hidden`}
          style={{ width: CANVAS_W, height: CANVAS_H, transform: `scale(${scale ?? 1})` }}
        >
          {/* Lane brackets */}
          <div className="absolute" style={{ ...bracketBox(0, COL - 5), ...enterClip }}>
            <Bracket label="Training" />
          </div>
          <div
            className="absolute"
            style={{
              ...bracketBox(a ? COL + 1 : 0, a ? 3 * COL - 4 : 4 * COL - 8),
              transition: t(PHASE.shift, ["left", "width"]),
            }}
          >
            <Bracket label="Singing" />
          </div>
          <div
            className="absolute"
            style={{
              ...bracketBox(a ? 4 * COL + 1 : MY_AI_X, a ? COL - 5 : PHONE_W),
              transition: t(PHASE.shift, ["left", "width"]),
            }}
          >
            <Bracket label="Training" />
          </div>

          {/* Flow blocks */}
          <div
            className="absolute z-[1]"
            style={{
              ...blockBox(a ? COL : 0, COL),
              opacity: a ? 0 : 1,
              transition: `${t(PHASE.shift, ["left"])}, ${t([400, 350], ["opacity"])}`,
            }}
          >
            <FlowBlock title="Home" subtitle="Find a song to sing" />
          </div>
          <div
            className="absolute z-[3]"
            style={{
              ...blockBox(COL, a ? 3 * COL : 2 * COL),
              transition: t(PHASE.shift, ["width"]),
            }}
          >
            <FlowBlock title="Karaoke" subtitle="Collect voice material" />
          </div>
          <div
            className="absolute z-[2]"
            style={{ ...blockBox(3 * COL, COL - PHONE_INSET), ...exitClip }}
          >
            <FlowBlock title="Library" subtitle="Manage posts/props" shape="rect" />
          </div>
          <div className="absolute z-[2]" style={{ ...blockBox(MY_AI_X, PHONE_W), ...exitClip }}>
            <FlowBlock title="My AI" subtitle="Manage training progress" shape="rect" />
          </div>
          <div className="absolute z-[4]" style={{ ...blockBox(0, COL + 1), ...enterClip }}>
            <FlowBlock title="Training" subtitle="Overview the journey" />
          </div>
          <div className="absolute z-[4]" style={{ ...blockBox(4 * COL, COL + 1), ...enterClip }}>
            <FlowBlock title="Training" subtitle="Manage training progress" />
          </div>

          {/* Before-only GAP marker between Library and My AI */}
          <div
            className={`absolute flex items-center justify-center ${dsColors.wondera.eyebrow}`}
            style={{
              top: PHONE_Y,
              left: GAP_LEFT,
              width: MY_AI_X - GAP_LEFT,
              height: PHONE_H,
              opacity: a ? 0 : 1,
              transition: t(PHASE.exit, ["opacity"]),
            }}
            aria-hidden
          >
            <span
              className={`${gapFont.className} -rotate-90 text-[132px] leading-none tracking-[0.02em]`}
            >
              GAP
            </span>
          </div>

          {/* Phones */}
          <div className="absolute" style={{ ...phoneBox(colX(0)), ...enterPhone }}>
            <Phone phone={PHONES.trainingOverview} />
          </div>
          <div className="absolute" style={{ ...phoneBox(colX(0)), ...shiftPhone }}>
            <Phone phone={PHONES.home} />
          </div>
          <div className="absolute" style={{ ...phoneBox(colX(1)), ...shiftPhone }}>
            <Phone phone={PHONES.karaoke} />
          </div>
          <div className="absolute" style={{ ...phoneBox(colX(2)), ...shiftPhone }}>
            <Phone phone={PHONES.scoring} />
          </div>
          <div className="absolute" style={{ ...phoneBox(colX(3)), ...exitPhone }}>
            <Phone phone={PHONES.library} />
          </div>
          <div className="absolute" style={{ ...phoneBox(MY_AI_X), ...exitPhone }}>
            <Phone phone={PHONES.myAi} />
          </div>
          <div className="absolute" style={{ ...phoneBox(colX(4)), ...enterPhone }}>
            <Phone phone={PHONES.trainingProgress} />
          </div>
        </div>
      </div>
    </div>
  );
}
