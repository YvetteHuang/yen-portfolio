/**
 * Shared column math for flow strip + mockup row so they stay aligned.
 * Mid-scroll, Karaoke "borrows" a bit of width from Home (then settles to design end-state).
 */

export function getMorphFracs(progress) {
  const p = Math.max(0, Math.min(1, progress));
  const baseC1 = 1.05 * (1 - p) + 1 * p;
  const baseC2 = 1.85 * (1 - p) + 2.6 * p;
  const bump = 4 * p * (1 - p);
  const steal = 0.22 * bump;
  const c1 = Math.max(0.38, baseC1 - steal);
  const c2 = baseC2 + steal;
  // Keep column-3 width stable so Karaoke mainly expands toward Home.
  const c3 = 1.1;
  const c4 = 1;
  const gridCols = `minmax(0,${c1}fr) minmax(0,${c2}fr) minmax(0,${c3}fr) minmax(0,${c4}fr)`;
  return { p, c1, c2, c3, c4, gridCols };
}

/** Smoothstep 0→1 for t in [0,1] */
export function smoothstep01(t) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}
