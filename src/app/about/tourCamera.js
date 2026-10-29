import { aboutNodes } from "@/lib/aboutHero";
import { VIEW_H, VIEW_W } from "./AboutGraph";

// Camera for the mobile map: { x, y, zoom } in viewBox units, applied inside
// the SVG as translate(x, y) scale(zoom). The SVG itself is laid out with
// preserveAspectRatio="xMidYMid meet", so a screen point is
// offset + scale * (camera + zoom * point).

const nodeById = Object.fromEntries(aboutNodes.map((n) => [n.id, n]));

// Screen px per viewBox unit when zoomed in on a node, so labels read at
// roughly their desktop size.
const ZOOM_SCREEN_SCALE = 1;
// Where the camera puts the node, as a share of the stage height; the card
// takes the lower part.
const FOCUS_Y = 0.36;
const SIDE_MARGIN = 24;
// Matches the label sizes in AboutGraph, for centring node and label together.
const LABEL_FONT = { core: 21, mid: 13.5, alone: 12 };
const LABEL_CHAR_W = 0.52;
// Explore map limits, relative to the whole-map view.
const MAX_ZOOM_SCREEN_SCALE = 2.2;
// Tap distance for picking a node by its dot, and half-height of the label's
// tap area, in screen px.
const HIT_RADIUS = 30;
const LABEL_HIT_HALF = 16;

// Estimated width of dot plus label, in viewBox units.
function labelWidth(node) {
  return node.label.length * LABEL_FONT[node.tier] * LABEL_CHAR_W + 14;
}

function stageLayout({ width, height }) {
  const scale = Math.min(width / VIEW_W, height / VIEW_H);
  return {
    scale,
    offsetX: (width - VIEW_W * scale) / 2,
    offsetY: (height - VIEW_H * scale) / 2,
  };
}

// Camera that puts viewBox point (px, py) at screen point (sx, sy).
function placeAt(px, py, sx, sy, zoom, size) {
  const { scale, offsetX, offsetY } = stageLayout(size);
  return {
    zoom,
    x: (sx - offsetX) / scale - zoom * px,
    y: (sy - offsetY) / scale - zoom * py,
  };
}

// Tour camera for a node, or the whole map when nodeId is null.
export function cameraFor(nodeId, size) {
  const { width, height } = size;
  const focusY = height * FOCUS_Y;
  if (!nodeId) return placeAt(VIEW_W / 2, VIEW_H / 2, width / 2, focusY, 1, size);

  const node = nodeById[nodeId];
  const { scale } = stageLayout(size);
  const zoom = Math.max(1, ZOOM_SCREEN_SCALE / scale);
  const labelW = labelWidth(node) * scale * zoom;
  const focusX = Math.max(
    SIDE_MARGIN,
    Math.min(width / 2 - labelW / 2, width - SIDE_MARGIN - labelW)
  );
  return placeAt(node.x, node.y, focusX, focusY, zoom, size);
}

// The viewBox point under a screen point.
function pointAt(camera, sx, sy, size) {
  const { scale, offsetX, offsetY } = stageLayout(size);
  return {
    x: ((sx - offsetX) / scale - camera.x) / camera.zoom,
    y: ((sy - offsetY) / scale - camera.y) / camera.zoom,
  };
}

// Keeps the zoom in range and the middle of the screen over the map.
export function clampCamera(camera, size) {
  const { scale } = stageLayout(size);
  const zoom = Math.min(Math.max(camera.zoom, 1), Math.max(1, MAX_ZOOM_SCREEN_SCALE / scale));
  const centre = pointAt({ ...camera, zoom }, size.width / 2, size.height / 2, size);
  const x = Math.min(Math.max(centre.x, 0), VIEW_W);
  const y = Math.min(Math.max(centre.y, 0), VIEW_H);
  return placeAt(x, y, size.width / 2, size.height / 2, zoom, size);
}

// Moves by a screen delta, scaling by `factor` around screen point (sx, sy).
export function moveCamera(camera, { dx = 0, dy = 0, factor = 1, sx = 0, sy = 0 }, size) {
  const { scale } = stageLayout(size);
  const anchor = pointAt(camera, sx, sy, size);
  const zoomed = placeAt(anchor.x, anchor.y, sx, sy, camera.zoom * factor, size);
  return clampCamera(
    { zoom: zoomed.zoom, x: zoomed.x + dx / scale, y: zoomed.y + dy / scale },
    size
  );
}

// The concept node under a tapped screen point: near its dot or on its label.
export function nodeAtPoint(camera, sx, sy, size) {
  const { scale, offsetX, offsetY } = stageLayout(size);
  let best = null;
  let bestDist = Infinity;
  aboutNodes.forEach((node) => {
    if (node.tier === "leaf") return;
    const nx = offsetX + scale * (camera.x + camera.zoom * node.x);
    const ny = offsetY + scale * (camera.y + camera.zoom * node.y);
    const dist = Math.hypot(nx - sx, ny - sy);
    const onLabel =
      sx >= nx &&
      sx <= nx + labelWidth(node) * scale * camera.zoom &&
      Math.abs(sy - ny) <= LABEL_HIT_HALF;
    if ((dist <= HIT_RADIUS || onLabel) && dist < bestDist) {
      best = node.id;
      bestDist = dist;
    }
  });
  return best;
}
