"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Locked for launch; v1–v3 ambient code kept below for future iteration. */
const EMITTER_MODE = "solo";

const CURSOR_RADIUS = 10;
const RADIUS_START = CURSOR_RADIUS * 3;
const RADIUS_DIFF = 7;
const FOLLOW_SPEED = 0.5;
const MAX_SQUEEZE = 0.6;
const ACCELERATOR = 1000;
const TRANSITION_DURATION = 18;
const TRANSITION_DELAY = 4;
/** Long-trail ripple: ambient rings lag far behind the moving center. */
const AMBIENT_TRANSITION_DURATION = 58;
const AMBIENT_TRANSITION_DELAY = 18;
const AMBIENT_TRANSITION_STAGGER = 1.12;
const IDLE_MS = 1400;

const AMBIENT_ANCHOR = { x: 0.27, y: 0.48 };
const AMBIENT_PARTICLE_RATIO = 0.52;
const AMBIENT_GROUP_OPACITY = 0.42;
const AMBIENT_STROKE_MAX = 0.15;
const AMBIENT_STROKE_MIN = 0;
const AMBIENT_STROKE_FALLOFF = 2.1;
const AMBIENT_DOT_RADIUS = 6;
const AMBIENT_DOT_FILL = 0.14;

/** Hero left zone — ambient stays here (viewport fractions). */
const HERO_LEFT_BOUNDS = { xMin: 0.08, xMax: 0.38, yMin: 0.12, yMax: 0.72 };

/** v1: slide toward random waypoints. */
const AMBIENT_WAYPOINT_SPEED = 4.2;
const AMBIENT_WAYPOINT_ARRIVE = 14;
const AMBIENT_WAYPOINT_MIN_HOP = 110;

/** v3: teleport center to a new random point on an interval. */
const AMBIENT_HOP_INTERVAL_MS = 1800;
const AMBIENT_HOP_MIN_DIST = 100;
/** v3: slower ring catch-up so ripples diffuse more gently. */
const AMBIENT_V3_TRANSITION_DURATION = 82;
const AMBIENT_V3_TRANSITION_DELAY = 26;
const AMBIENT_V3_TRANSITION_STAGGER = 1.12;

/** v2: ambient center chases cursor but keeps a minimum distance. */
const V2_MIN_DIST = 140;
const V2_PULL = 0.038;
const V2_HOME_BLEND = 0.006;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function heroLeftBoundsPx() {
  return {
    xMin: window.innerWidth * HERO_LEFT_BOUNDS.xMin,
    xMax: window.innerWidth * HERO_LEFT_BOUNDS.xMax,
    yMin: window.innerHeight * HERO_LEFT_BOUNDS.yMin,
    yMax: window.innerHeight * HERO_LEFT_BOUNDS.yMax,
  };
}

/** Inner rings visible; outer rings fade to ~0. */
function ambientRingOpacity(index, total) {
  const t = index / Math.max(total - 1, 1);
  const factor = Math.pow(1 - t, AMBIENT_STROKE_FALLOFF);
  return AMBIENT_STROKE_MIN + (AMBIENT_STROKE_MAX - AMBIENT_STROKE_MIN) * factor;
}

function passiveOffset(time, idleBlend) {
  const t = time * 0.001;
  const always = 0.4 + idleBlend * 0.6;
  const amp = 14 + idleBlend * 36;

  return {
    x:
      Math.sin(t * 0.55) * amp * always +
      Math.sin(t * 0.17 + 1.1) * 10 * idleBlend,
    y:
      Math.cos(t * 0.43) * amp * 0.78 * always +
      Math.cos(t * 0.14 + 0.6) * 8 * idleBlend,
  };
}

function pickRandomPointInBounds(bounds) {
  return {
    x: bounds.xMin + Math.random() * (bounds.xMax - bounds.xMin),
    y: bounds.yMin + Math.random() * (bounds.yMax - bounds.yMin),
  };
}

function pickRandomWaypoint(bounds, from) {
  for (let attempt = 0; attempt < 16; attempt++) {
    const point = pickRandomPointInBounds(bounds);
    if (Math.hypot(point.x - from.x, point.y - from.y) >= AMBIENT_WAYPOINT_MIN_HOP) {
      return point;
    }
  }
  return pickRandomPointInBounds(bounds);
}

function pickRandomHop(bounds, from) {
  for (let attempt = 0; attempt < 16; attempt++) {
    const point = pickRandomPointInBounds(bounds);
    if (Math.hypot(point.x - from.x, point.y - from.y) >= AMBIENT_HOP_MIN_DIST) {
      return point;
    }
  }
  return pickRandomPointInBounds(bounds);
}

/** v3: jump home to a random point on a relaxed interval. */
function advanceAmbientHop(home, bounds, lastHopTime, now) {
  if (now - lastHopTime < AMBIENT_HOP_INTERVAL_MS) {
    return { home, lastHopTime };
  }

  const next = pickRandomHop(bounds, home);
  home.x = next.x;
  home.y = next.y;

  return { home, lastHopTime: now };
}

/** Step home toward a random waypoint within Hero left zone. */
function advanceAmbientWaypoint(home, waypoint, bounds) {
  let dx = waypoint.x - home.x;
  let dy = waypoint.y - home.y;
  let dist = Math.hypot(dx, dy);

  if (dist < AMBIENT_WAYPOINT_ARRIVE) {
    const next = pickRandomWaypoint(bounds, home);
    waypoint.x = next.x;
    waypoint.y = next.y;
    dx = waypoint.x - home.x;
    dy = waypoint.y - home.y;
    dist = Math.hypot(dx, dy) || 1;
  }

  const step = Math.min(AMBIENT_WAYPOINT_SPEED, dist);
  home.x += (dx / dist) * step;
  home.y += (dy / dist) * step;
  home.x = clamp(home.x, bounds.xMin, bounds.xMax);
  home.y = clamp(home.y, bounds.yMin, bounds.yMax);

  return home;
}

/** v2: waypoint home + slow pull toward cursor (outward rings, moving center). */
function ambientDriftV2(cursorX, cursorY, home, displayPos, waypoint, bounds) {
  advanceAmbientWaypoint(home, waypoint, bounds);
  let targetX = home.x + (cursorX - home.x) * 0.32;
  let targetY = home.y + (cursorY - home.y) * 0.32;

  const dx = cursorX - targetX;
  const dy = cursorY - targetY;
  const dist = Math.hypot(dx, dy) || 1;
  if (dist < V2_MIN_DIST) {
    targetX = cursorX - (dx / dist) * V2_MIN_DIST;
    targetY = cursorY - (dy / dist) * V2_MIN_DIST;
  }

  displayPos.x += (targetX - displayPos.x) * V2_PULL;
  displayPos.y += (targetY - displayPos.y) * V2_PULL;
  displayPos.x += (home.x - displayPos.x) * V2_HOME_BLEND;
  displayPos.y += (home.y - displayPos.y) * V2_HOME_BLEND;

  return { x: displayPos.x, y: displayPos.y };
}

function idleBlend(lastMoveTime, now) {
  const elapsed = now - lastMoveTime;
  if (elapsed <= IDLE_MS) return 0;
  return Math.min((elapsed - IDLE_MS) / 2200, 1);
}

function diagonalWindow() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return Math.ceil(Math.sqrt(w * w + h * h));
}

function getParticleCount() {
  return Math.round((diagonalWindow() + RADIUS_DIFF - RADIUS_START) / RADIUS_DIFF);
}

function getAmbientParticleCount(primaryCount) {
  return Math.max(48, Math.round(primaryCount * AMBIENT_PARTICLE_RATIO));
}

function particleRadius(index) {
  return RADIUS_START + index * RADIUS_DIFF;
}

function bindParticleTransitions(node, index) {
  if (!node) return;
  node.style.transitionProperty = "cx, cy";
  node.style.transitionDuration = `${TRANSITION_DURATION + index * TRANSITION_DELAY}ms`;
  node.style.transitionTimingFunction = "linear";
}

function bindAmbientParticleTransitions(node, index, variant = "v1") {
  if (!node) return;
  const isV3 = variant === "v3";
  const baseDuration = isV3 ? AMBIENT_V3_TRANSITION_DURATION : AMBIENT_TRANSITION_DURATION;
  const stepDelay = isV3 ? AMBIENT_V3_TRANSITION_DELAY : AMBIENT_TRANSITION_DELAY;
  const stagger = isV3 ? AMBIENT_V3_TRANSITION_STAGGER : AMBIENT_TRANSITION_STAGGER;
  const duration = baseDuration + Math.pow(index, stagger) * stepDelay;
  node.style.transitionProperty = "cx, cy";
  node.style.transitionDuration = `${duration}ms`;
  node.style.transitionTimingFunction = "ease-out";
}

function placeParticles(nodes, x, y) {
  for (const node of nodes) {
    if (!node) continue;
    node.setAttribute("cx", String(x));
    node.setAttribute("cy", String(y));
  }
}

function hasPassiveLayer(mode) {
  return mode === "v1" || mode === "v2";
}

function hasAmbientLayer(mode) {
  return mode === "v1" || mode === "v2" || mode === "v3";
}

export default function BackgroundEmitter() {
  const posRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const diffRef = useRef({ x: 0, y: 0 });
  const ambientAnchorRef = useRef({ x: 0, y: 0 });
  const ambientHomeRef = useRef({ x: 0, y: 0 });
  const ambientWaypointRef = useRef({ x: 0, y: 0 });
  const ambientPosRef = useRef({ x: 0, y: 0 });
  const ambientLastHopRef = useRef(0);
  const modeRef = useRef(EMITTER_MODE);

  const cursorRef = useRef(null);
  const primaryGroupRef = useRef(null);
  const primaryParticleRefs = useRef([]);
  const ambientDotRef = useRef(null);
  const ambientGroupRef = useRef(null);
  const ambientParticleRefs = useRef([]);

  const [canRun, setCanRun] = useState(false);
  const [particleCount, setParticleCount] = useState(0);
  const [ambientParticleCount, setAmbientParticleCount] = useState(0);

  const syncCounts = useCallback(() => {
    const primary = getParticleCount();
    setParticleCount(primary);
    setAmbientParticleCount(getAmbientParticleCount(primary));
  }, []);

  const initAmbientWaypoint = useCallback(() => {
    const bounds = heroLeftBoundsPx();
    const anchor = {
      x: window.innerWidth * AMBIENT_ANCHOR.x,
      y: window.innerHeight * AMBIENT_ANCHOR.y,
    };
    ambientAnchorRef.current = anchor;
    ambientHomeRef.current = {
      x: clamp(anchor.x, bounds.xMin, bounds.xMax),
      y: clamp(anchor.y, bounds.yMin, bounds.yMax),
    };
    ambientPosRef.current = { ...ambientHomeRef.current };
    const waypoint = pickRandomWaypoint(bounds, ambientHomeRef.current);
    ambientWaypointRef.current = waypoint;
    ambientLastHopRef.current = performance.now();
  }, []);

  const syncAmbientAnchor = useCallback(() => {
    initAmbientWaypoint();
  }, [initAmbientWaypoint]);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    setCanRun(true);
    syncCounts();
    syncAmbientAnchor();

    const center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    posRef.current = { ...center };
    mouseRef.current = { ...center };

    let lastMoveTime = performance.now();

    const onMove = (event) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
      lastMoveTime = performance.now();
    };

    const onResize = () => {
      syncCounts();
      syncAmbientAnchor();
    };

    let visible = !document.hidden;
    const onVisibility = () => {
      visible = !document.hidden;
    };

    let raf = 0;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const pos = posRef.current;
      const mouse = mouseRef.current;
      const diff = diffRef.current;
      const currentMode = modeRef.current;
      const passiveOn = hasPassiveLayer(currentMode);
      const ambientOn = hasAmbientLayer(currentMode);
      const idle = passiveOn ? idleBlend(lastMoveTime, now) : 0;

      diff.x = mouse.x - pos.x;
      diff.y = mouse.y - pos.y;
      pos.x += diff.x * FOLLOW_SPEED;
      pos.y += diff.y * FOLLOW_SPEED;

      if (idle > 0) {
        const t = now * 0.001;
        pos.x += Math.sin(t * 0.38) * 0.55 * idle;
        pos.y += Math.cos(t * 0.31) * 0.45 * idle;
      }

      const passive = passiveOn ? passiveOffset(now, idle) : { x: 0, y: 0 };
      const renderX = pos.x + passive.x;
      const renderY = pos.y + passive.y;

      const speed = Math.hypot(diff.x, diff.y);
      const squeeze = Math.min(speed / ACCELERATOR, MAX_SQUEEZE);
      const angle = Math.atan2(diff.y, diff.x) * (180 / Math.PI);
      const breathe = passiveOn ? Math.sin(now * 0.001 * 0.85) * 0.05 : 0;

      if (cursorRef.current) {
        cursorRef.current.setAttribute("cx", String(renderX));
        cursorRef.current.setAttribute("cy", String(renderY));
        cursorRef.current.style.transformOrigin = `${renderX}px ${renderY}px`;
        cursorRef.current.style.transform = `rotate(${angle}deg) scale(${1 + squeeze}, ${1 - squeeze})`;
        cursorRef.current.setAttribute(
          "fill-opacity",
          String(passiveOn ? 0.32 + breathe * (0.45 + idle * 0.55) : 0.32)
        );
      }

      if (primaryGroupRef.current) {
        primaryGroupRef.current.style.opacity = String(
          passiveOn
            ? 0.88 + Math.sin(now * 0.001 * 0.65) * 0.07 * (0.35 + idle * 0.65)
            : 0.88
        );
      }

      placeParticles(primaryParticleRefs.current, renderX, renderY);

      if (!ambientOn) return;

      const ambientBreathe = Math.sin(now * 0.001 * 0.55 + 1.2) * 0.04;
      const heroBounds = heroLeftBoundsPx();

      let ambient;
      if (currentMode === "v2") {
        ambient = ambientDriftV2(
          renderX,
          renderY,
          ambientHomeRef.current,
          ambientPosRef.current,
          ambientWaypointRef.current,
          heroBounds,
        );
      } else if (currentMode === "v3") {
        const hop = advanceAmbientHop(
          ambientHomeRef.current,
          heroBounds,
          ambientLastHopRef.current,
          now,
        );
        ambientLastHopRef.current = hop.lastHopTime;
        ambient = hop.home;
      } else {
        ambient = advanceAmbientWaypoint(
          ambientHomeRef.current,
          ambientWaypointRef.current,
          heroBounds,
        );
      }

      if (ambientGroupRef.current) {
        ambientGroupRef.current.style.opacity = String(
          AMBIENT_GROUP_OPACITY + ambientBreathe
        );
      }

      if (ambientDotRef.current) {
        ambientDotRef.current.setAttribute("cx", String(ambient.x));
        ambientDotRef.current.setAttribute("cy", String(ambient.y));
        ambientDotRef.current.setAttribute(
          "fill-opacity",
          String(AMBIENT_DOT_FILL + ambientBreathe * 0.5)
        );
      }

      placeParticles(ambientParticleRefs.current, ambient.x, ambient.y);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [initAmbientWaypoint, syncAmbientAnchor, syncCounts]);

  if (!canRun) return null;

  const showEffect = particleCount > 0;

  return showEffect ? (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="emitter-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff78cd" />
            <stop offset="100%" stopColor="#82aaff" />
          </linearGradient>
        </defs>

        {hasAmbientLayer(EMITTER_MODE) && (
          <g key={`ambient-${EMITTER_MODE}`} ref={ambientGroupRef}>
            {Array.from({ length: ambientParticleCount }, (_, i) => (
              <circle
                key={`ambient-${EMITTER_MODE}-${i}`}
                ref={(node) => {
                  ambientParticleRefs.current[i] = node;
                  bindAmbientParticleTransitions(
                    node,
                    i,
                    EMITTER_MODE === "v3" ? "v3" : "v1",
                  );
                }}
                r={particleRadius(i)}
                cx={0}
                cy={0}
                fill="none"
                stroke="url(#emitter-gradient)"
                strokeWidth={1.5}
                strokeOpacity={ambientRingOpacity(i, ambientParticleCount)}
              />
            ))}
            <circle
              ref={ambientDotRef}
              r={AMBIENT_DOT_RADIUS}
              cx={0}
              cy={0}
              fill="url(#emitter-gradient)"
              fillOpacity={AMBIENT_DOT_FILL}
            />
          </g>
        )}

        <g ref={primaryGroupRef} className="particles">
          {Array.from({ length: particleCount }, (_, i) => (
            <circle
              key={`primary-${i}`}
              ref={(node) => {
                primaryParticleRefs.current[i] = node;
                bindParticleTransitions(node, i);
              }}
              r={particleRadius(i)}
              cx={0}
              cy={0}
              fill="none"
              stroke="url(#emitter-gradient)"
              strokeWidth={1.5}
              strokeOpacity={0.2}
            />
          ))}
        </g>

        <circle
          ref={cursorRef}
          r={CURSOR_RADIUS}
          cx={0}
          cy={0}
          fill="url(#emitter-gradient)"
          fillOpacity={0.35}
        />
      </svg>
    </div>
  ) : null;
}
