"use client";

import { useEffect, useRef, useState } from "react";
import { dsColors } from "@/lib/designSystem";
import AboutGraph from "./AboutGraph";
import AboutTourCard from "./AboutTourCard";
import { moveCamera, nodeAtPoint } from "./tourCamera";

const c = dsColors.about;

// Movement under this many px still counts as a tap.
const TAP_SLOP = 8;
const WHEEL_ZOOM = 0.002;

// Full-screen map for looking around on mobile: drag to move, pinch (or wheel)
// to zoom, tap a node to see its card. It owns all touch gestures while open,
// so page scrolling, which steps the tour, never competes with it. Mounted
// only while open.
export default function AboutExplore({ size, startCamera, startNodeId, onClose, onOpenSheet }) {
  const stageRef = useRef(null);
  const closeRef = useRef(null);
  const [camera, setCamera] = useState(startCamera);
  const [selectedId, setSelectedId] = useState(startNodeId);
  const [dragging, setDragging] = useState(false);
  // Live pointers and whether the current gesture is still a tap.
  const pointers = useRef(new Map());
  const gesture = useRef({ moved: 0, multi: false });

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  // React's wheel listener is passive; this one has to stop the page scrolling.
  useEffect(() => {
    const stage = stageRef.current;
    const onWheel = (event) => {
      event.preventDefault();
      const rect = stage.getBoundingClientRect();
      setCamera((cam) =>
        moveCamera(
          cam,
          {
            factor: Math.exp(-event.deltaY * WHEEL_ZOOM),
            sx: event.clientX - rect.left,
            sy: event.clientY - rect.top,
          },
          size
        )
      );
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [size]);

  const localPoint = (event) => {
    const rect = stageRef.current.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onPointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, localPoint(event));
    if (pointers.current.size === 1) gesture.current = { moved: 0, multi: false };
    else gesture.current.multi = true;
    setDragging(true);
  };

  const onPointerMove = (event) => {
    const map = pointers.current;
    if (!map.has(event.pointerId)) return;
    const before = [...map.values()];
    const point = localPoint(event);
    const prev = map.get(event.pointerId);
    map.set(event.pointerId, point);
    gesture.current.moved += Math.hypot(point.x - prev.x, point.y - prev.y);

    if (map.size === 1) {
      setCamera((cam) =>
        moveCamera(cam, { dx: point.x - prev.x, dy: point.y - prev.y }, size)
      );
      return;
    }
    // Two fingers: zoom by the change in spread, around their midpoint, and
    // pan by how far the midpoint moved.
    const after = [...map.values()];
    const [a0, b0] = before;
    const [a1, b1] = after;
    const spread0 = Math.hypot(a0.x - b0.x, a0.y - b0.y);
    const spread1 = Math.hypot(a1.x - b1.x, a1.y - b1.y);
    const mid0 = { x: (a0.x + b0.x) / 2, y: (a0.y + b0.y) / 2 };
    const mid1 = { x: (a1.x + b1.x) / 2, y: (a1.y + b1.y) / 2 };
    setCamera((cam) =>
      moveCamera(
        cam,
        {
          factor: spread0 ? spread1 / spread0 : 1,
          sx: mid0.x,
          sy: mid0.y,
          dx: mid1.x - mid0.x,
          dy: mid1.y - mid0.y,
        },
        size
      )
    );
  };

  const onPointerEnd = (event) => {
    const map = pointers.current;
    if (!map.has(event.pointerId)) return;
    const point = map.get(event.pointerId);
    map.delete(event.pointerId);
    if (map.size) return;
    setDragging(false);
    const { moved, multi } = gesture.current;
    if (event.type === "pointerup" && !multi && moved < TAP_SLOP) {
      setSelectedId(nodeAtPoint(camera, point.x, point.y, size));
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Explore the map"
      className={`animate-about-fade fixed inset-x-0 top-0 z-[52] h-svh [animation-duration:250ms] motion-reduce:animate-none ${c.groundBackground}`}
    >
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        className={`absolute inset-0 touch-none select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <AboutGraph
          litId={selectedId}
          pinnedId={null}
          camera={camera}
          animateCamera={false}
          interactive={false}
          idPrefix="about-explore"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <p className={`text-[11px] tracking-[0.06em] ${c.dimText}`}>
          Drag to move · pinch to zoom · tap a node
        </p>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close map"
          onClick={() => onClose(selectedId)}
          className={`pointer-events-auto -mr-2 cursor-pointer px-2 text-2xl leading-none ${c.dimText} ${c.inkHoverText} ${c.accentFocusOutline}`}
        >
          ×
        </button>
      </div>

      {selectedId ? (
        <div className="absolute inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] mx-auto max-w-[520px]">
          <AboutTourCard key={selectedId} nodeId={selectedId} onOpen={onOpenSheet} />
        </div>
      ) : null}
    </div>
  );
}
