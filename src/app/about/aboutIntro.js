// Entrance timing for the About page, in ms from first paint. Nodes float up
// one by one, then the edges draw in; meanwhile the particles gather into the
// portrait, and the CV column fades in last, one block at a time.
export const INTRO = {
  nodeStart: 150,
  nodeStagger: 70,
  edgeStart: 1250,
  edgeStagger: 50,
  cvStart: 1700,
  cvStagger: 160,
  // On mobile the CV is the first thing on screen, so it doesn't wait.
  cvStartMobile: 100,
  cvStaggerMobile: 120,
  particleMs: 2600,
};

export const introDelay = (ms) => ({ animationDelay: `${ms}ms` });
