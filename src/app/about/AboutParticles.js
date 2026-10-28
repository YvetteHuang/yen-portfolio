import { useEffect, useRef } from "react";
import { createParticleField } from "./particleField";

const PORTRAIT_SRC = "/about/portrait-density.png";

// Decoration only: if the image or canvas fails, the canvas stays empty and
// the graph and CV render as usual.
export default function AboutParticles({ fieldId }) {
  const canvasRef = useRef(null);
  const fieldRef = useRef(null);
  const fieldIdRef = useRef(fieldId);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer = null;
    let cancelled = false;

    const onMotionChange = (event) => fieldRef.current?.setReduceMotion(event.matches);

    // Loaded after hydration, so the portrait never blocks the page.
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      if (cancelled) return;
      try {
        const field = createParticleField(canvas, image, {
          reduceMotion: motionQuery.matches,
        });
        if (!field) return;
        fieldRef.current = field;
        const { width, height } = canvas.getBoundingClientRect();
        field.resize(width, height);
        field.setField(fieldIdRef.current);
        observer = new ResizeObserver(([entry]) => {
          field.resize(entry.contentRect.width, entry.contentRect.height);
          field.setField(fieldIdRef.current);
        });
        observer.observe(canvas);
        motionQuery.addEventListener("change", onMotionChange);
      } catch (error) {
        console.warn("About particles disabled:", error);
        fieldRef.current?.destroy();
        fieldRef.current = null;
      }
    };
    image.src = PORTRAIT_SRC;

    return () => {
      cancelled = true;
      image.onload = null;
      observer?.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
      fieldRef.current?.destroy();
      fieldRef.current = null;
    };
  }, []);

  useEffect(() => {
    fieldIdRef.current = fieldId;
    fieldRef.current?.setField(fieldId);
  }, [fieldId]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
