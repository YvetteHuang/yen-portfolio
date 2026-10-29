import { useLayoutEffect, useRef, useState } from "react";
import { dsColors } from "@/lib/designSystem";
import { VIEW_H, VIEW_W } from "./AboutGraph";

const c = dsColors.about;

// Nodes right of this x (in viewBox units) open their panel to the left.
const FLIP_X = 620;
const OFFSET_X = 22;
const OFFSET_BELOW = 16;
const OFFSET_ABOVE = 12;
const EDGE_MARGIN = 10;

// Maps a node's viewBox position to pixels in the stage, matching the SVG's
// preserveAspectRatio="xMidYMid meet".
function placePanel(node, stage, panelHeight) {
  const { width, height } = stage.getBoundingClientRect();
  const scale = Math.min(width / VIEW_W, height / VIEW_H);
  const px = (width - VIEW_W * scale) / 2 + node.x * scale;
  const py = (height - VIEW_H * scale) / 2 + node.y * scale;
  const flip = node.x > FLIP_X;
  const top =
    node.panelPos === "ne"
      ? py - panelHeight - OFFSET_ABOVE
      : py + OFFSET_BELOW;
  return {
    left: flip ? "auto" : `${px + OFFSET_X}px`,
    right: flip ? `${width - px + OFFSET_X}px` : "auto",
    top: `${Math.max(EDGE_MARGIN, Math.min(top, height - panelHeight - EDGE_MARGIN))}px`,
  };
}

export default function AboutPanel({ node, stageRef }) {
  const panelRef = useRef(null);
  // Keep the last node's text so the panel fades out with its content.
  const [shown, setShown] = useState(null);
  const [position, setPosition] = useState(null);
  const open = Boolean(node?.hover);

  if (open && node !== shown) setShown(node);

  useLayoutEffect(() => {
    if (!open || !shown || !stageRef.current || !panelRef.current) return;
    setPosition(placePanel(shown, stageRef.current, panelRef.current.offsetHeight));
  }, [open, shown, stageRef]);

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      className={`pointer-events-none absolute max-w-[288px] rounded-[2px] px-[15px] py-3 ${c.glassPanel} transition-[opacity,transform] duration-[180ms] motion-reduce:transition-none ${
        open && position ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      }`}
      style={position ?? { left: 0, top: 0 }}
    >
      {shown ? (
        <>
          <div className={`mb-[5px] text-[11px] ${c.faintText}`}>{shown.label}</div>
          <div className={`text-[13px] leading-normal ${c.inkText}`}>{shown.hover}</div>
          {shown.expanded ? (
            <div className={`mt-[7px] text-[10px] ${c.faintText}`}>click to expand</div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
