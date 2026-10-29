import { useEffect, useRef, useState } from "react";
import { dsColors, dsFonts } from "@/lib/designSystem";
import { aboutEdges, aboutNodes } from "@/lib/aboutHero";
import { INTRO, introDelay } from "./aboutIntro";

const g = dsColors.about.graph;

export const VIEW_W = 1040;
export const VIEW_H = 780;
const LABEL_GAP = 9;
const HALO_R = 26;
const CORE_RING_R = 14;
const FOCUS_RING_R = 20;

const TIER = {
  core: {
    r: 5.5,
    fontSize: 21,
    fill: g.coreLabelHex,
    fontClass: dsFonts.display.className,
  },
  mid: { r: 4, fontSize: 13.5, fill: g.midLabelHex, fontClass: dsFonts.body.className },
  leaf: { r: 2.5, fontSize: 11, fill: g.dimHex, fontClass: dsFonts.body.className },
  alone: { r: 3, fontSize: 12, fill: g.dimHex, fontClass: dsFonts.body.className },
};

const EDGE_KIND = {
  dashed: { strokeDasharray: "3 6" },
  faint: { strokeDasharray: "1 7", opacity: 0.5 },
};

// Edge width in screen px. The SVG scales with the stage, so the stroke is
// divided by that scale. (vector-effect: non-scaling-stroke would do this, but
// in Chrome it breaks the pathLength-based draw-in and leaves gaps.)
const EDGE_WIDTH_PX = 0.6;

const NODE_MUTE_OPACITY = 0.26;
const EDGE_MUTE_OPACITY = 0.22;

const fadeClass = "transition-[fill,stroke,opacity] duration-[220ms] motion-reduce:transition-none";
const edgeFadeClass = "transition-[stroke,opacity] duration-[250ms] motion-reduce:transition-none";

// Fixed seed so server and client draw the same curves.
const CURVE_SEED = 0x2f6b9e1d;

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const nodeById = Object.fromEntries(aboutNodes.map((n) => [n.id, n]));

const neighbors = Object.fromEntries(aboutNodes.map((n) => [n.id, new Set()]));
aboutEdges.forEach(({ from, to }) => {
  neighbors[from].add(to);
  neighbors[to].add(from);
});

// Each edge bows off its midpoint by up to ±8.5% of its length; edges with a
// fixed control point are jittered around it instead.
function buildEdgePaths() {
  const rnd = mulberry32(CURVE_SEED);
  return aboutEdges.map((edge) => {
    const a = nodeById[edge.from];
    const b = nodeById[edge.to];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    const bow = (rnd() - 0.5) * len * 0.17;
    let cx = (a.x + b.x) / 2 + (-dy / len) * bow;
    let cy = (a.y + b.y) / 2 + (dx / len) * bow;
    if (edge.control) {
      cx = edge.control.x + (rnd() - 0.5) * 26;
      cy = edge.control.y + (rnd() - 0.5) * 18;
    }
    return {
      key: `${edge.from}-${edge.to}`,
      from: edge.from,
      to: edge.to,
      kind: edge.kind,
      d: `M ${a.x} ${a.y} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`,
    };
  });
}

const edgePaths = buildEdgePaths();

// Entrance order: core nodes first, then mid, Mushrooms, and the tool labels;
// data order within a tier. Edges draw in the order their later endpoint
// appeared.
const TIER_ORDER = ["core", "mid", "alone", "leaf"];
const nodeIntroIndex = Object.fromEntries(
  [...aboutNodes]
    .sort((a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier))
    .map((n, i) => [n.id, i])
);
const edgeIntroRank = Object.fromEntries(
  [...edgePaths]
    .sort(
      (a, b) =>
        Math.max(nodeIntroIndex[a.from], nodeIntroIndex[a.to]) -
        Math.max(nodeIntroIndex[b.from], nodeIntroIndex[b.to])
    )
    .map((e, i) => [e.key, i])
);
const introClass = "motion-reduce:animate-none";

function GraphEdge({ edge, litId, width, metalId }) {
  const lit = litId && (edge.from === litId || edge.to === litId);
  const kind = EDGE_KIND[edge.kind] ?? {};
  let stroke = g.lineHex;
  let opacity = kind.opacity ?? 1;
  if (lit) {
    stroke = edge.kind === "faint" ? g.accentAltHex : `url(#${metalId})`;
    opacity = 1;
  } else if (litId) {
    opacity = EDGE_MUTE_OPACITY;
  }

  // Solid edges draw along their length; dashed ones would lose their dash
  // pattern that way, so they fade in instead.
  const solid = !kind.strokeDasharray;
  const delay = introDelay(INTRO.edgeStart + edgeIntroRank[edge.key] * INTRO.edgeStagger);

  return (
    <g
      className={solid ? undefined : `animate-about-fade ${introClass}`}
      style={solid ? undefined : delay}
    >
      <path
        d={edge.d}
        fill="none"
        strokeWidth={width}
        strokeDasharray={kind.strokeDasharray}
        pathLength={solid ? 1 : undefined}
        className={`${edgeFadeClass} ${solid ? `animate-about-draw ${introClass}` : ""}`}
        style={{ stroke, opacity, ...(solid ? delay : null) }}
      />
    </g>
  );
}

function GraphNode({ node, litId, pinnedId, handlers, interactiveGraph }) {
  const tier = TIER[node.tier];
  const hasPanel = Boolean(node.hover);
  // Leaf nodes are tool labels: no hover, no focus, no sheet.
  const interactive = interactiveGraph && node.tier !== "leaf";
  const lit = node.id === litId;
  const muted = litId && !lit && !neighbors[litId].has(node.id);

  let labelFill = tier.fill;
  if (lit) labelFill = node.tier === "alone" ? g.accentAltHex : g.accentHex;
  const dotFill = lit ? g.litDotHex : hasPanel ? g.inkHex : "none";
  const dotStroke = lit ? g.litDotHex : g.inkHex;

  const interactiveProps = interactive
    ? {
        ref: (el) => handlers.registerNode(node.id, el),
        tabIndex: 0,
        role: "button",
        "aria-label": `${node.label}. ${node.hover}`,
        "aria-haspopup": "dialog",
        "aria-expanded": pinnedId === node.id,
        "aria-controls": "about-sheet",
        onMouseEnter: () => handlers.onNodeEnter(node.id),
        onMouseLeave: handlers.onNodeLeave,
        onFocus: () => handlers.onNodeFocus(node.id),
        onBlur: handlers.onNodeBlur,
        onClick: (event) => {
          event.stopPropagation();
          handlers.onNodeToggle(node.id);
        },
        onKeyDown: (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          event.stopPropagation();
          handlers.onNodeToggle(node.id, { viaKeyboard: true });
        },
      }
    : { "aria-hidden": true };

  return (
    <g
      className={`animate-about-rise ${introClass}`}
      style={introDelay(INTRO.nodeStart + nodeIntroIndex[node.id] * INTRO.nodeStagger)}
    >
      <g
        data-node={node.id}
        className={`group outline-none ${interactive ? "cursor-pointer" : "pointer-events-none"} ${fadeClass}`}
        style={{ opacity: muted ? NODE_MUTE_OPACITY : 1 }}
        {...interactiveProps}
      >
        <circle cx={node.x} cy={node.y} r={HALO_R} fill="transparent" />
        {interactive ? (
          <circle
            cx={node.x}
            cy={node.y}
            r={FOCUS_RING_R}
            fill="none"
            stroke={g.accentHex}
            strokeWidth={1.5}
            className="opacity-0 group-focus-visible:opacity-100"
          />
        ) : null}
        {node.tier === "core" ? (
          <circle
            cx={node.x}
            cy={node.y}
            r={CORE_RING_R}
            fill="none"
            stroke={g.ringHex}
            strokeWidth={1}
          />
        ) : null}
        <circle
          cx={node.x}
          cy={node.y}
          r={tier.r}
          strokeWidth={hasPanel ? 0 : 1}
          className={fadeClass}
          style={{ fill: dotFill, stroke: dotStroke }}
        />
        <text
          x={node.x + tier.r + LABEL_GAP}
          y={node.y}
          textAnchor="start"
          dominantBaseline="middle"
          fontSize={tier.fontSize}
          className={`${tier.fontClass} ${fadeClass}`}
          style={{ fill: labelFill }}
        >
          {node.label}
        </text>
      </g>
    </g>
  );
}

// camera: { x, y, zoom } in viewBox units, applied as translate(x, y)
// scale(zoom); omitted on desktop, where the whole map is shown. With
// animateCamera off (while dragging the explore map), the camera follows the
// finger instead of easing. With interactive off (the mobile tour), nodes are display only and the SVG is
// hidden from assistive tech, since the tour card carries the content.
export default function AboutGraph({
  litId,
  pinnedId,
  camera,
  animateCamera = true,
  interactive = true,
  idPrefix = "about",
  ...handlers
}) {
  const svgRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width && height) setScale(Math.min(width / VIEW_W, height / VIEW_H));
    });
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      className={`absolute inset-0 h-full w-full overflow-visible ${interactive ? "" : "pointer-events-none"}`}
      {...(interactive
        ? {
            role: "group",
            "aria-label":
              "How architecture, HCI, generative design, interaction design, fabrication, XR, design systems and product design connect",
          }
        : { "aria-hidden": true })}
    >
      <defs>
        {/* Darker, lighter and shadow tints of the brand blue, for a metallic sheen on lit edges. */}
        <linearGradient
          id={`${idPrefix}-metal`}
          gradientUnits="userSpaceOnUse"
          x1="60"
          y1="40"
          x2="980"
          y2="740"
        >
          <stop offset="0" stopColor="#81A1EE" />
          <stop offset="0.26" stopColor={g.accentHex} />
          <stop offset="0.40" stopColor="#BFD4FF" />
          <stop offset="0.47" stopColor={g.accentHex} />
          <stop offset="0.72" stopColor="#5F77B8" />
          <stop offset="0.80" stopColor="#8CB1FF" />
          <stop offset="1" stopColor={g.accentHex} />
        </linearGradient>
        <linearGradient
          id={`${idPrefix}-metal-text`}
          gradientUnits="userSpaceOnUse"
          x1="60"
          y1="40"
          x2="980"
          y2="740"
        >
          <stop offset="0" stopColor="#AAC5FF" />
          <stop offset="0.34" stopColor="#D3E1FF" />
          <stop offset="0.52" stopColor="#97B8FF" />
          <stop offset="0.78" stopColor="#CBDBFF" />
          <stop offset="1" stopColor="#AAC5FF" />
        </linearGradient>
      </defs>

      <g
        className={
          animateCamera
            ? "transition-transform duration-[700ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
            : undefined
        }
        style={
          camera
            ? { transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})` }
            : undefined
        }
      >
        <g aria-hidden="true">
          {edgePaths.map((edge) => (
            <GraphEdge
              key={edge.key}
              edge={edge}
              litId={litId}
              metalId={`${idPrefix}-metal`}
              width={EDGE_WIDTH_PX / (scale * (camera?.zoom ?? 1))}
            />
          ))}
        </g>

        <g>
          {aboutNodes.map((node) => (
            <GraphNode
              key={node.id}
              node={node}
              litId={litId}
              pinnedId={pinnedId}
              handlers={handlers}
              interactiveGraph={interactive}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
