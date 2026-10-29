// Particle field behind the About graph: a portrait sampled from a greyscale
// density map, which rearranges into a per-node shape while a node is lit.
// Ported from the About hero prototype; only the setup and teardown differ.

const STEP = 3;
const MAX_DPR = 2;
// Particles set off at staggered times across the first 35% of the intro.
const INTRO_SPREAD = 0.35;

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Draws into an offscreen canvas and keeps bright pixels on a 3px lattice,
// each with probability proportional to its brightness. Every kept point is
// nudged by up to ±jit px so the lattice doesn't show.
function sampleFrom(rnd, drawFn, w, h, prob, jit = 1.6) {
  const o = document.createElement("canvas");
  o.width = w;
  o.height = h;
  const c = o.getContext("2d", { willReadFrequently: true });
  c.fillStyle = "#000";
  c.fillRect(0, 0, w, h);
  drawFn(c, w, h);
  const d = c.getImageData(0, 0, w, h).data;
  const pts = [];
  for (let y = 0; y < h; y += STEP) {
    for (let x = 0; x < w; x += STEP) {
      const l = d[(y * w + x) * 4];
      if (l < 16) continue;
      if (rnd() > (l / 255) * prob) continue;
      pts.push({ x: x + (rnd() - 0.5) * 2 * jit, y: y + (rnd() - 0.5) * 2 * jit, l });
    }
  }
  return pts;
}

function portrait(image) {
  return function (c, w, h) {
    const box = Math.min(w, h) * 0.95;
    c.drawImage(image, (w - box) / 2, (h - box) / 2 - box * 0.02, box, box);
  };
}

// Placeholder target shapes — stand-ins for real project visuals.
function pattern(id) {
  return function (c, w, h) {
    c.save();
    c.translate(w / 2, h / 2);
    const S = Math.min(w, h) / 560;
    c.scale(S, S);
    c.strokeStyle = "#fff";
    c.fillStyle = "#fff";
    c.filter = "blur(2px)";
    const R = 250;
    if (id === "arch") {
      // orthogonal plan grid
      c.globalAlpha = 0.8;
      c.lineWidth = 3;
      for (let i = -4; i <= 4; i++) {
        c.beginPath(); c.moveTo(i * 55, -R); c.lineTo(i * 55, R); c.stroke();
        c.beginPath(); c.moveTo(-R, i * 55); c.lineTo(R, i * 55); c.stroke();
      }
    } else if (id === "hci") {
      // concentric rings
      c.globalAlpha = 0.85;
      c.lineWidth = 3;
      for (let r = 28; r < R; r += 26) { c.beginPath(); c.arc(0, 0, r, 0, 7); c.stroke(); }
    } else if (id === "gen") {
      // one rule, varied across the whole field
      c.globalAlpha = 0.85;
      c.lineWidth = 3.2;
      const hx = w / 2 / S, hy = h / 2 / S, step = 74;
      const nx = Math.ceil(hx / step), ny = Math.ceil(hy / step);
      for (let i = -nx; i <= nx; i++) for (let j = -ny; j <= ny; j++) {
        const u = (i + nx) / (2 * nx || 1), v = (j + ny) / (2 * ny || 1);
        const sz = 14 + u * 30;
        const rot = ((u * 1.1 + v * 1.9) * Math.PI) / 2;
        const sq = 1 - v * 0.75;
        c.save(); c.translate(i * step, j * step); c.rotate(rot);
        c.beginPath();
        for (let k = 0; k < 4; k++) {
          const a = (k * Math.PI) / 2 + Math.PI / 4;
          const px = Math.cos(a) * sz, py = Math.sin(a) * sz * sq;
          if (k === 0) c.moveTo(px, py); else c.lineTo(px, py);
        }
        c.closePath(); c.stroke(); c.restore();
      }
    } else if (id === "ixd") {
      // two-way exchange around a person
      c.globalAlpha = 0.9;
      c.beginPath(); c.arc(0, 0, 30, 0, 7); c.fill();
      c.lineWidth = 4;
      c.lineCap = "round";
      const R0 = 62, R1 = 236, head = 17;
      for (let k = 0; k < 12; k++) {
        const a = (k * Math.PI) / 6, ca = Math.cos(a), sa = Math.sin(a);
        const x0 = ca * R0, y0 = sa * R0, x1 = ca * R1, y1 = sa * R1;
        c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
        // arrowhead pointing out
        for (const s2 of [1, -1]) {
          const b = a + s2 * 0.42;
          c.beginPath(); c.moveTo(x1, y1);
          c.lineTo(x1 - Math.cos(b) * head, y1 - Math.sin(b) * head); c.stroke();
        }
        // arrowhead pointing back in
        for (const s2 of [1, -1]) {
          const b = a + s2 * 0.42;
          c.beginPath(); c.moveTo(x0, y0);
          c.lineTo(x0 + Math.cos(b) * head, y0 + Math.sin(b) * head); c.stroke();
        }
      }
    } else if (id === "ds") {
      // strict modular grid
      c.globalAlpha = 0.8;
      for (let i = -4; i < 4; i++) for (let j = -3; j < 3; j++)
        c.fillRect(i * 58 + 6, j * 72 + 6, 46, 60);
    } else if (id === "react") {
      c.globalAlpha = 0.8;
      c.lineWidth = 4;
      for (let k = 0; k < 3; k++) {
        c.save(); c.rotate((k * Math.PI) / 3);
        c.beginPath(); c.ellipse(0, 0, 190, 72, 0, 0, 7); c.stroke(); c.restore();
      }
      c.beginPath(); c.arc(0, 0, 16, 0, 7); c.fill();
    } else if (id === "fab") {
      // sliced contours, the shape cut into layers
      c.globalAlpha = 0.85;
      c.lineWidth = 4;
      for (let k = 0; k < 11; k++) {
        c.beginPath();
        for (let t = 0; t <= 1.001; t += 0.02) {
          const a = t * Math.PI * 2;
          const r = 115 + Math.sin(a * 3 + k * 0.42) * 68;
          const x = Math.cos(a) * r, y = Math.sin(a) * r * 0.7 + k * 17 - 85;
          if (t === 0) c.moveTo(x, y); else c.lineTo(x, y);
        }
        c.stroke();
      }
    } else if (id === "pd") {
      // overlapping ranges
      c.globalAlpha = 0.88;
      c.lineWidth = 6;
      const rr = 118, orb = 92;
      for (let k = 0; k < 5; k++) {
        const a = -Math.PI / 2 + (k * Math.PI * 2) / 5;
        c.beginPath();
        c.arc(Math.cos(a) * orb, Math.sin(a) * orb * 0.92, rr, 0, 7);
        c.stroke();
      }
    } else if (id === "xr") {
      // a built world, and a layer added onto the real one
      c.globalAlpha = 0.88;
      c.fillRect(-230, -80, 160, 160);
      c.lineWidth = 5;
      c.beginPath(); c.moveTo(-70, 0); c.lineTo(30, 0); c.stroke();
      c.lineWidth = 6;
      c.strokeRect(30, -105, 210, 210);
      c.lineWidth = 3;
      c.globalAlpha = 0.5;
      c.strokeRect(62, -73, 146, 146);
    } else if (id === "mush") {
      // cap + stem
      c.globalAlpha = 0.9;
      c.beginPath(); c.ellipse(0, -30, 170, 105, 0, Math.PI, Math.PI * 2); c.fill();
      c.fillRect(-34, -30, 68, 190);
      c.globalAlpha = 0.5;
      for (let i = -7; i <= 7; i++) c.fillRect(i * 22 - 2, -28, 4, 52);
    } else {
      c.globalAlpha = 0.7;
      c.beginPath(); c.arc(0, 0, 120, 0, 7); c.fill();
    }
    c.restore();
  };
}

// Returns null if a 2D context isn't available; callers treat that as "no
// particles" and leave the canvas empty.
// introMs > 0 starts every particle at a random spot on the canvas and
// gathers them into the portrait over that many ms.
export function createParticleField(
  canvas,
  image,
  { reduceMotion = false, introMs = 0 } = {}
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const rnd = mulberry32((Math.random() * 4294967296) >>> 0);
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
  let W = 0;
  let H = 0;
  let parts = [];
  let cache = {};
  let morph = 0;
  let morphGoal = 0;
  let reduce = reduceMotion;
  let raf = 0;
  let introStart = null;
  let introDone = reduceMotion || introMs <= 0;

  // Even coverage: particles are ordered by angle around the centre, and each
  // takes the target point at the same fraction through the target list.
  // Targets that already have a particle get a faint, scattered duplicate.
  function assignTargets(id) {
    if (!cache[id]) cache[id] = sampleFrom(rnd, pattern(id), W, H, 0.95, 0.8);
    const pts = cache[id];
    if (!pts.length) return false;
    const m = pts.length;
    const n = parts.length;
    const seen = new Uint8Array(m);
    for (let i = 0; i < n; i++) {
      const p = parts[i];
      const idx = Math.min(m - 1, Math.floor((p.ord * m) / n));
      const q = pts[idx];
      if (!seen[idx]) {
        seen[idx] = 1;
        p.tx = q.x;
        p.ty = q.y;
        p.ta = 1;
      } else {
        p.tx = q.x + (rnd() - 0.5) * 9;
        p.ty = q.y + (rnd() - 0.5) * 9;
        p.ta = 0.42;
      }
    }
    return true;
  }

  function seedParticles() {
    const raw = sampleFrom(rnd, portrait(image), W, H, 0.62, 1.6);
    let sx = 0;
    let sy = 0;
    for (const p of raw) { sx += p.x; sy += p.y; }
    const ccx = raw.length ? sx / raw.length : W / 2;
    const ccy = raw.length ? sy / raw.length : H / 2;
    const ds = raw.map((p) => Math.hypot(p.x - ccx, p.y - ccy)).sort((a, b) => a - b);
    const maxR = ds.length ? ds[Math.floor(ds.length * 0.93)] : 1;

    parts = raw.map((p) => {
      const r = Math.min(1, Math.hypot(p.x - ccx, p.y - ccy) / maxR);
      const edge = 0.55 + 1.5 * Math.pow(r, 1.7); // steady core, looser rim
      const soft = 1 + (1 - p.l / 255) * 0.6; // faint pixels wander more
      return {
        x: p.x, y: p.y, tx: p.x, ty: p.y, ta: 1, l: p.l,
        // Intro start point, and how far into the intro this one sets off.
        sx: rnd() * W, sy: rnd() * H, sd: rnd() * INTRO_SPREAD,
        ph: rnd() * Math.PI * 2,
        sp: (0.75 + rnd() * 0.9) / (0.8 + edge * 0.2),
        am: Math.min(9, (1.3 + rnd() * 1.4) * edge * soft),
      };
    });
    parts.sort(
      (a, b) => Math.atan2(a.y - H / 2, a.x - W / 2) - Math.atan2(b.y - H / 2, b.x - W / 2)
    );
    parts.forEach((p, i) => { p.ord = i; });
    cache = {};
  }

  function draw(t, intro = 1) {
    const m = morph < 0.001 ? 0 : morph;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      // Ease-out cubic from the scattered start to the portrait position.
      const k = intro >= 1 ? 1 : Math.min(1, Math.max(0, (intro - p.sd) / (1 - INTRO_SPREAD)));
      const e = 1 - Math.pow(1 - k, 3);
      const px = p.sx + (p.x - p.sx) * e;
      const py = p.sy + (p.y - p.sy) * e;
      const bx = px + (p.tx - p.x) * m;
      const by = py + (p.ty - p.y) * m;
      const dx = reduce ? 0 : Math.sin(t * p.sp + p.ph) * p.am;
      const dy = reduce ? 0 : Math.cos(t * p.sp * 0.83 + p.ph * 1.7) * p.am * 0.8;
      const fade = (1 - m + m * p.ta) * (0.35 + 0.65 * e);
      ctx.fillStyle = `rgba(190,196,214,${((p.l / 255) * (0.3 + m * 0.2) * fade).toFixed(3)})`;
      ctx.fillRect(bx + dx, by + dy, 1.1, 1.1);
    }
  }

  function frame(ts) {
    morph += (morphGoal - morph) * 0.065;
    let intro = 1;
    if (!introDone) {
      if (introStart === null) introStart = ts;
      intro = (ts - introStart) / introMs;
      if (intro >= 1) introDone = true;
    }
    draw(ts / 1000, intro);
    raf = requestAnimationFrame(frame);
  }

  // With reduced motion the portrait is drawn once and stays put.
  function start() {
    cancelAnimationFrame(raf);
    raf = 0;
    if (reduce) {
      morph = 0;
      morphGoal = 0;
      draw(0);
    } else {
      raf = requestAnimationFrame(frame);
    }
  }

  return {
    resize(width, height) {
      W = Math.floor(width);
      H = Math.floor(height);
      if (!W || !H) return;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
      start();
    },
    setField(id) {
      if (reduce) return;
      morphGoal = id && assignTargets(id) ? 1 : 0;
    },
    setReduceMotion(value) {
      reduce = value;
      if (value) introDone = true;
      if (W && H) start();
    },
    destroy() {
      cancelAnimationFrame(raf);
    },
  };
}
