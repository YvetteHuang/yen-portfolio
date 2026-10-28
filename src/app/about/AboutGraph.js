import { dsColors, dsFonts } from "@/lib/designSystem";
import { aboutEdges, aboutNodes } from "@/lib/aboutHero";

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

function GraphEdge({ edge, litId }) {
  const lit = litId && (edge.from === litId || edge.to === litId);
  const kind = EDGE_KIND[edge.kind] ?? {};
  let stroke = g.lineHex;
  let opacity = kind.opacity ?? 1;
  if (lit) {
    stroke = edge.kind === "faint" ? g.accentAltHex : "url(#about-metal)";
    opacity = 1;
  } else if (litId) {
    opacity = EDGE_MUTE_OPACITY;
  }

  return (
    <path
      d={edge.d}
      fill="none"
      strokeWidth={1}
      strokeDasharray={kind.strokeDasharray}
      className={edgeFadeClass}
      style={{ stroke, opacity }}
    />
  );
}

function GraphNode({ node, litId, pinnedId, handlers }) {
  const tier = TIER[node.tier];
  const hasPanel = Boolean(node.hover);
  // Leaf nodes are tool labels: no hover, no focus, no sheet.
  const interactive = node.tier !== "leaf";
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
  );
}

export default function AboutGraph({ litId, pinnedId, ...handlers }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full overflow-visible"
      role="group"
      aria-label="How architecture, HCI, generative design, interaction design, fabrication, XR, design systems and product design connect"
    >
      <defs>
        <linearGradient
          id="about-metal"
          gradientUnits="userSpaceOnUse"
          x1="60"
          y1="40"
          x2="980"
          y2="740"
        >
          <stop offset="0" stopColor="#6FB6EE" />
          <stop offset="0.26" stopColor="#70C0FF" />
          <stop offset="0.40" stopColor="#B6DEFF" />
          <stop offset="0.47" stopColor="#70C0FF" />
          <stop offset="0.72" stopColor="#5287B8" />
          <stop offset="0.80" stopColor="#7BC6FF" />
          <stop offset="1" stopColor="#70C0FF" />
        </linearGradient>
        <linearGradient
          id="about-metal-text"
          gradientUnits="userSpaceOnUse"
          x1="60"
          y1="40"
          x2="980"
          y2="740"
        >
          <stop offset="0" stopColor="#9ED6FF" />
          <stop offset="0.34" stopColor="#CDE9FF" />
          <stop offset="0.52" stopColor="#8FCDFF" />
          <stop offset="0.78" stopColor="#C4E5FF" />
          <stop offset="1" stopColor="#9ED6FF" />
        </linearGradient>
      </defs>

      <g aria-hidden="true">
        {edgePaths.map((edge) => (
          <GraphEdge key={edge.key} edge={edge} litId={litId} />
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
          />
        ))}
      </g>
    </svg>
  );
}
