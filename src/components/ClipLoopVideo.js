"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ClipLoopVideo({
  src,
  poster,
  start = 0,
  end,
  alt = "",
}) {
  const videoRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.playsInline = true;

    const clipStart = start;
    const clipEnd = end;

    const seekToStart = () => {
      if (Math.abs(video.currentTime - clipStart) > 0.05) {
        video.currentTime = clipStart;
      }
    };

    const playClip = () => {
      seekToStart();
      video.play().catch(() => {});
    };

    const onTimeUpdate = () => {
      if (typeof clipEnd === "number" && video.currentTime >= clipEnd - 0.05) {
        video.currentTime = clipStart;
      } else if (video.currentTime < clipStart - 0.15) {
        video.currentTime = clipStart;
      }
    };

    video.addEventListener("loadedmetadata", playClip);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", playClip);

    if (video.readyState >= 1) {
      playClip();
    }

    return () => {
      video.removeEventListener("loadedmetadata", playClip);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", playClip);
      video.pause();
    };
  }, [reduceMotion, src, start, end]);

  if (reduceMotion) {
    return (
      <Image
        src={poster}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 1280px) 100vw, 1280px"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
    />
  );
}
