"use client";

import { useEffect, useRef } from "react";

const PALETTE = [
  [255, 130, 210],
  [90, 225, 255],
  [175, 95, 255],
  [255, 255, 255],
  [115, 55, 175],
];

function quantizeColor(r, g, b) {
  let best = PALETTE[0];
  let bestDist = Infinity;
  for (const [pr, pg, pb] of PALETTE) {
    const d = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = [pr, pg, pb];
    }
  }
  return best;
}

class Particle {
  constructor({
    homeX,
    homeY,
    r,
    g,
    b,
    a,
    size,
    phase,
    motionWeight,
    flowAngle,
  }) {
    this.homeX = homeX;
    this.homeY = homeY;
    this.x = homeX;
    this.y = homeY;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.size = size;
    this.phase = phase;
    this.motionWeight = motionWeight;
    this.flowAngle = flowAngle;
  }

  update({
    time,
    flowSpeed,
    flowAmp,
    mouse,
    cursorPush,
    cursorRadius,
    motionSpring,
  }) {
    let targetX = this.homeX;
    let targetY = this.homeY;

    if (flowAmp > 0) {
      const w = this.motionWeight;
      const t = time * flowSpeed + this.phase;
      const along = Math.sin(t) * flowAmp * w;
      const across = Math.sin(t * 0.71 + 1.1) * flowAmp * w * 0.32;
      const fx = Math.cos(this.flowAngle);
      const fy = Math.sin(this.flowAngle);
      targetX += fx * along - fy * across;
      targetY += fy * along + fx * across;
      targetY -= Math.sin(t * 0.55 + this.phase * 0.3) * flowAmp * w * 0.14;
    }

    if (mouse?.active && cursorPush > 0 && cursorRadius > 0) {
      const dx = targetX - mouse.x;
      const dy = targetY - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < cursorRadius && dist > 0.001) {
        const pushT = 1 - dist / cursorRadius;
        const falloff = pushT * pushT * pushT;
        const weightBoost = 0.75 + this.motionWeight * 0.55;
        const force = falloff * cursorPush * weightBoost;
        const nx = dx / dist;
        const ny = dy / dist;
        targetX += nx * force;
        targetY += ny * force;
        targetX += -ny * force * 0.28 * this.motionWeight;
        targetY += nx * force * 0.28 * this.motionWeight;
      }
    }

    const spring = motionSpring ?? 0.16;
    this.x += (targetX - this.x) * spring;
    this.y += (targetY - this.y) * spring;
  }

  draw(ctx) {
    const half = this.size * 0.5;
    ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.a})`;
    ctx.fillRect(this.x - half, this.y - half, this.size, this.size);
  }
}

function fitImageRect(
  iw,
  ih,
  cw,
  ch,
  imageScale = 1,
  portraitAnchor = "center",
  portraitZoneRatio = 0.58,
) {
  const imageAspect = iw / ih;

  let zoneW = cw;
  let zoneH = ch;
  let zoneOffsetX = 0;

  if (portraitAnchor === "left") {
    zoneW = cw * portraitZoneRatio;
    zoneOffsetX = 0;
  }

  const zoneAspect = zoneW / zoneH;
  let drawW;
  let drawH;
  if (zoneAspect > imageAspect) {
    drawH = zoneH * 0.94;
    drawW = drawH * imageAspect;
  } else {
    drawW = zoneW * 0.92;
    drawH = drawW / imageAspect;
  }

  drawW *= imageScale;
  drawH *= imageScale;

  let offsetX;
  let offsetY;
  if (portraitAnchor === "left") {
    offsetX = zoneOffsetX + (zoneW - drawW) * 0.38;
    offsetY = (ch - drawH) / 2;
  } else {
    offsetX = (cw - drawW) / 2;
    offsetY = (ch - drawH) / 2;
  }

  return {
    drawW,
    drawH,
    offsetX,
    offsetY,
    scaleX: drawW / iw,
    scaleY: drawH / ih,
  };
}

function smoothstep(t) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

function normalizeEdgeFeather(feather, bottomOverride) {
  if (typeof feather === "object" && feather !== null) {
    return {
      top: feather.top ?? 0,
      right: feather.right ?? 0,
      bottom: feather.bottom ?? feather.top ?? 0,
      left: feather.left ?? 0,
    };
  }

  const uniform = typeof feather === "number" ? feather : 0;
  return {
    top: uniform,
    right: uniform,
    bottom: bottomOverride ?? uniform,
    left: uniform,
  };
}

function computeEdgeFade(x, y, bounds, feather) {
  const fadeTop =
    feather.top > 0
      ? smoothstep((y - bounds.minY) / feather.top)
      : 1;
  const fadeBottom =
    feather.bottom > 0
      ? smoothstep((bounds.maxY - y) / feather.bottom)
      : 1;
  const fadeLeft =
    feather.left > 0
      ? smoothstep((x - bounds.minX) / feather.left)
      : 1;
  const fadeRight =
    feather.right > 0
      ? smoothstep((bounds.maxX - x) / feather.right)
      : 1;

  return Math.min(fadeTop, fadeBottom, fadeLeft, fadeRight);
}

function computeOpaqueBounds(data, iw, ih, minAlpha) {
  let minX = iw;
  let minY = ih;
  let maxX = 0;
  let maxY = 0;
  let found = false;

  for (let y = 0; y < ih; y++) {
    for (let x = 0; x < iw; x++) {
      const a = data[(y * iw + x) * 4 + 3] / 255;
      if (a < minAlpha) continue;
      found = true;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (!found) {
    return { minX: 0, minY: 0, maxX: iw - 1, maxY: ih - 1 };
  }

  return { minX, minY, maxX, maxY };
}

function hash2(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function sampleLum(data, iw, ih, x, y, minAlpha) {
  const ix = Math.round(x);
  const iy = Math.round(y);
  if (ix < 0 || iy < 0 || ix >= iw || iy >= ih) return 0;
  const i = (iy * iw + ix) * 4;
  const a = data[i + 3] / 255;
  if (a < minAlpha) return 0;
  return (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
}

function gradientAt(data, iw, ih, x, y, step, minAlpha) {
  const l = sampleLum(data, iw, ih, x - step, y, minAlpha);
  const r = sampleLum(data, iw, ih, x + step, y, minAlpha);
  const t = sampleLum(data, iw, ih, x, y - step, minAlpha);
  const b = sampleLum(data, iw, ih, x, y + step, minAlpha);
  const gx = r - l;
  const gy = b - t;
  const mag = Math.hypot(gx, gy);
  let angle = Math.atan2(gy, gx);
  const upBias = -Math.PI / 2;
  angle = angle * 0.82 + upBias * 0.18;
  return { mag, angle };
}

function buildFlowParticles({
  data,
  iw,
  ih,
  cw,
  ch,
  sampleStep,
  minAlpha,
  particleSize,
  imageScale,
  edgeFeather,
  edgeFeatherBottom,
  edgeDither,
  portraitAnchor,
  portraitZoneRatio,
  highlightLum,
  edgeZone,
  gradThreshold,
}) {
  const { offsetX, offsetY, scaleX, scaleY } = fitImageRect(
    iw,
    ih,
    cw,
    ch,
    imageScale,
    portraitAnchor,
    portraitZoneRatio,
  );
  const bounds = computeOpaqueBounds(data, iw, ih, minAlpha);
  const feather = normalizeEdgeFeather(edgeFeather, edgeFeatherBottom);
  const hasFeather =
    feather.top > 0 ||
    feather.right > 0 ||
    feather.bottom > 0 ||
    feather.left > 0;
  const particles = [];

  for (let y = 0; y < ih; y += sampleStep) {
    for (let x = 0; x < iw; x += sampleStep) {
      const i = (y * iw + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3] / 255;

      if (a < minAlpha) continue;

      const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
      const distToEdge = Math.min(
        x - bounds.minX,
        bounds.maxX - x,
        y - bounds.minY,
        bounds.maxY - y,
      );
      const { mag: gradMag, angle: flowAngle } = gradientAt(
        data,
        iw,
        ih,
        x,
        y,
        sampleStep,
        minAlpha,
      );

      const isHighlight = lum >= highlightLum;
      const isEdge = distToEdge < edgeZone;
      const isStroke = gradMag >= gradThreshold;

      if (!isHighlight && !isEdge && !isStroke) continue;
      if (!isHighlight && isStroke && hash2(x, y) > 0.55) continue;

      const edgeFade = hasFeather
        ? computeEdgeFade(x, y, bounds, feather)
        : 1;
      if (edgeFade <= 0.01) continue;
      if (edgeDither && edgeFade < 0.9 && hash2(x, y + 17) > edgeFade) continue;

      const homeX = offsetX + (x + sampleStep * 0.5) * scaleX;
      const homeY = offsetY + (y + sampleStep * 0.5) * scaleY;

      const [qr, qg, qb] = quantizeColor(r, g, b);
      const size = particleSize * (0.65 + lum * 0.65 + (isEdge ? 0.2 : 0));
      const alpha = Math.min(a * (0.55 + lum * 0.45) * edgeFade, 1);

      let motionWeight;
      if (isEdge) {
        motionWeight = 0.88 + gradMag * 0.4;
      } else if (isStroke) {
        motionWeight = 0.55 + gradMag * 1.8;
      } else if (isHighlight) {
        motionWeight = 0.28 + lum * 0.35;
      } else {
        motionWeight = 0.2;
      }
      motionWeight = Math.min(motionWeight, 1);

      particles.push(
        new Particle({
          homeX,
          homeY,
          r: qr,
          g: qg,
          b: qb,
          a: alpha,
          size,
          phase: Math.random() * Math.PI * 2,
          motionWeight,
          flowAngle,
        }),
      );
    }
  }

  return particles;
}

/**
 * Image-to-particle portrait (Canvas only, no <img>).
 * Flow mode: negative-space highlights/edges with stroke-aligned motion.
 */
export default function ParticlePortrait({
  src,
  alt = "Portrait",
  className = "",
  sampleStep,
  minAlpha = 0.18,
  particleSize = 1.25,
  imageScale = 1,
  edgeFeather = 0,
  edgeFeatherBottom,
  edgeDither = true,
  portraitAnchor = "center",
  portraitZoneRatio = 0.58,
  cursorPush = 0,
  cursorRadius = 100,
  flowSpeed = 0.85,
  flowAmp = 3,
  highlightLum = 0.36,
  edgeZone = 16,
  gradThreshold = 0.055,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let cancelled = false;
    let rafId = 0;
    let particles = [];
    let visible = true;
    let startTime = 0;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const cursorEnabled =
      finePointer && !reducedMotion && cursorPush > 0 && cursorRadius > 0;

    const mouse = { x: 0, y: 0, active: false };

    const step =
      sampleStep ??
      (window.innerWidth < 768 || reducedMotion ? 6 : 5);

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    const getLayout = () => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      return { cw, ch, dpr };
    };

    const setupCanvas = (cw, ch, dpr) => {
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
    };

    const pointerToLocal = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const onPointerMove = (event) => {
      const local = pointerToLocal(event.clientX, event.clientY);
      mouse.x = local.x;
      mouse.y = local.y;
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    const initFromImage = () => {
      const { cw, ch, dpr } = getLayout();
      if (!cw || !ch) return false;

      setupCanvas(cw, ch, dpr);

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const off = document.createElement("canvas");
      off.width = iw;
      off.height = ih;
      const offCtx = off.getContext("2d");
      if (!offCtx) return false;

      offCtx.drawImage(img, 0, 0);
      const { data } = offCtx.getImageData(0, 0, iw, ih);

      particles = buildFlowParticles({
        data,
        iw,
        ih,
        cw,
        ch,
        sampleStep: step,
        minAlpha,
        particleSize,
        imageScale,
        edgeFeather,
        edgeFeatherBottom,
        edgeDither,
        portraitAnchor,
        portraitZoneRatio,
        highlightLum,
        edgeZone,
        gradThreshold,
      });

      startTime = performance.now();

      if (process.env.NODE_ENV === "development") {
        console.info(
          `[ParticlePortrait] flow mode — ${particles.length} particles (step=${step})`,
        );
      }

      return particles.length > 0;
    };

    const tick = (now) => {
      if (cancelled || !visible) return;

      const { cw, ch, dpr } = getLayout();
      if (!cw || !ch || particles.length === 0) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      const elapsed = (now - startTime) / 1000;
      const amp = reducedMotion ? 0 : flowAmp;
      const push = cursorEnabled && mouse.active ? cursorPush : 0;

      for (const p of particles) {
        p.update({
          time: elapsed,
          flowSpeed,
          flowAmp: amp,
          mouse: cursorEnabled ? mouse : null,
          cursorPush: push,
          cursorRadius,
          motionSpring: 0.16,
        });
      }

      for (const p of particles) {
        p.draw(ctx);
      }

      rafId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    img.onload = () => {
      if (cancelled) return;
      if (initFromImage()) startLoop();
    };

    img.onerror = () => {
      if (!cancelled) {
        console.error(`[ParticlePortrait] Failed to load: ${src}`);
      }
    };

    const ro = new ResizeObserver(() => {
      if (!img.complete || !img.naturalWidth) return;
      initFromImage();
    });
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && particles.length > 0) startLoop();
        else stopLoop();
      },
      { threshold: 0.05 },
    );
    io.observe(container);

    if (cursorEnabled) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelled = true;
      stopLoop();
      ro.disconnect();
      io.disconnect();
      if (cursorEnabled) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, [
    src,
    sampleStep,
    minAlpha,
    particleSize,
    imageScale,
    edgeFeather,
    edgeFeatherBottom,
    edgeDither,
    portraitAnchor,
    portraitZoneRatio,
    cursorPush,
    cursorRadius,
    flowSpeed,
    flowAmp,
    highlightLum,
    edgeZone,
    gradThreshold,
  ]);

  return (
    <div ref={containerRef} className={`overflow-visible ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className="block h-full w-full"
      />
    </div>
  );
}
