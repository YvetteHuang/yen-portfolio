"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { dsColors } from "@/lib/designSystem";
import { aboutNodes } from "@/lib/aboutHero";
import AboutCv from "./AboutCv";
import AboutGraph from "./AboutGraph";
import AboutPanel from "./AboutPanel";
import AboutSheet from "./AboutSheet";

const nodeById = Object.fromEntries(aboutNodes.map((n) => [n.id, n]));

export default function AboutHero() {
  // activeId follows hover and keyboard focus; pinnedId is the node whose
  // sheet is open. While a sheet is open, hovering other nodes does nothing.
  const [activeId, setActiveId] = useState(null);
  const [pinnedId, setPinnedId] = useState(null);
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
      className={`flex h-svh w-full overflow-hidden ${dsColors.about.groundBackground} ${dsColors.about.inkText}`}
    >
      <AboutCv litIds={litNode ? litNode.cv : null} />

      <main
        ref={stageRef}
        className="relative min-w-0 flex-1 overflow-hidden"
        onClick={() => closeSheet()}
      >
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
    </div>
  );
}
