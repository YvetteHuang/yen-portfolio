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
  particleMs: 2600,
};

export const introDelay = (ms) => ({ animationDelay: `${ms}ms` });
