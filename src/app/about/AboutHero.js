"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { dsColors } from "@/lib/designSystem";
import { aboutNodes } from "@/lib/aboutHero";
import AboutCv from "./AboutCv";
import AboutGraph from "./AboutGraph";
import AboutPanel from "./AboutPanel";
import AboutParticles from "./AboutParticles";
import AboutSheet from "./AboutSheet";
import AboutTour from "./AboutTour";

const nodeById = Object.fromEntries(aboutNodes.map((n) => [n.id, n]));

// Matches the min-[1024px] breakpoint where the two-column layout starts.
const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeDesktop(onChange) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Layout switches in CSS; this only decides whether the particle canvas runs,
// so the server answer (false) just means it starts after hydration.
function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false
  );
}

export default function AboutHero() {
  // activeId follows hover and keyboard focus; pinnedId is the node whose
  // sheet is open. While a sheet is open, hovering other nodes does nothing.
  const [activeId, setActiveId] = useState(null);
  const [pinnedId, setPinnedId] = useState(null);
  const isDesktop = useIsDesktop();
  const stageRef = useRef(null);
  const nodeRefs = useRef({});
  // Focus goes back to the opening node on close; after a pointer close that
  // shouldn't relight the node the way keyboard focus does.
  const skipFocusLight = useRef(false);

  const registerNode = useCallback((id, el) => {
    nodeRefs.current[id] = el;
  }, []);

  const litId = pinnedId ?? activeId;
  const litNode = litId ? nodeById[litId] : null;
  const panelNode = !pinnedId && activeId ? nodeById[activeId] : null;

  const activate = useCallback(
    (id) => {
      if (!pinnedId) setActiveId(id);
    },
    [pinnedId]
  );

  const deactivate = useCallback(() => {
    if (!pinnedId) setActiveId(null);
  }, [pinnedId]);

  const focusNode = useCallback(
    (id) => {
      if (!skipFocusLight.current) activate(id);
    },
    [activate]
  );

  const closeSheet = useCallback(
    ({ viaKeyboard = false } = {}) => {
      if (!pinnedId) return;
      const opener = nodeRefs.current[pinnedId];
      setPinnedId(null);
      setActiveId(viaKeyboard ? pinnedId : null);
      if (opener) {
        // The focus event fires synchronously inside focus().
        skipFocusLight.current = !viaKeyboard;
        opener.focus({ preventScroll: true });
        skipFocusLight.current = false;
      }
    },
    [pinnedId]
  );

  const toggleSheet = useCallback(
    (id, { viaKeyboard = false } = {}) => {
      if (pinnedId === id) {
        closeSheet({ viaKeyboard });
        return;
      }
      setPinnedId(id);
      setActiveId(id);
    },
    [pinnedId, closeSheet]
  );

  useEffect(() => {
    if (!pinnedId) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeSheet({ viaKeyboard: true });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pinnedId, closeSheet]);

  return (
    <div
      className={`w-full ${dsColors.about.groundBackground} ${dsColors.about.inkText} min-[1024px]:flex min-[1024px]:h-svh min-[1024px]:overflow-hidden`}
    >
      <AboutCv litIds={litNode ? litNode.cv : null} />

      <main
        ref={stageRef}
        className="relative hidden min-w-0 flex-1 overflow-hidden min-[1024px]:block"
        onClick={() => closeSheet()}
      >
        {isDesktop ? <AboutParticles fieldId={litId} /> : null}
        <AboutGraph
          litId={litId}
          pinnedId={pinnedId}
          registerNode={registerNode}
          onNodeEnter={activate}
          onNodeLeave={deactivate}
          onNodeFocus={focusNode}
          onNodeBlur={deactivate}
          onNodeToggle={toggleSheet}
        />
        <AboutPanel node={panelNode} stageRef={stageRef} />
        <AboutSheet
          node={pinnedId ? nodeById[pinnedId] : null}
          onClose={closeSheet}
        />
      </main>

      <AboutTour />
    </div>
  );
}
