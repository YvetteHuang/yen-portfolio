"use client";

import { useEffect, useMemo, useState } from "react";
import { dsColors, dsRadius, dsSurface } from "@/lib/designSystem";

export function WonderaSectionToc({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const sectionIds = useMemo(
    () => sections.map((section) => section.id),
    [sections]
  );

  useEffect(() => {
    if (sectionIds.length === 0) return undefined;

    const getActiveSectionId = () => {
      const offsetFromTop = 140;
      let currentId = sectionIds[0];

      sectionIds.forEach((id) => {
        const sectionElement = document.getElementById(id);
        if (!sectionElement) return;

        const sectionTop = sectionElement.getBoundingClientRect().top;
        if (sectionTop - offsetFromTop <= 0) {
          currentId = id;
        }
      });

      const pageBottomReached =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (pageBottomReached) {
        currentId = sectionIds[sectionIds.length - 1];
      }

      return currentId;
    };

    const updateActiveSection = () => {
      const nextActiveId = getActiveSectionId();
      setActiveId((prev) => (prev === nextActiveId ? prev : nextActiveId));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  const handleNavClick = (event, id) => {
    event.preventDefault();
    const sectionElement = document.getElementById(id);
    if (!sectionElement) return;

    setActiveId(id);
    setIsDrawerOpen(false);
    sectionElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <nav
        className={`sticky top-24 hidden p-4 min-[1400px]:block ${dsRadius.lg} ${dsSurface.subtleCardOnDark}`}
        aria-label="Wondera case study table of contents"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          On this page
        </p>
        <ul className="mt-3 space-y-1">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(event) => handleNavClick(event, section.id)}
                  className={`block ${dsRadius.sm} px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? `${dsColors.wondera.accentBackgroundSelected} ${dsColors.wondera.accentText}`
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                  }`}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="min-[1400px]:hidden">
        <button
          type="button"
          onClick={() => setIsDrawerOpen((prev) => !prev)}
          className={`fixed bottom-6 right-6 z-40 border px-4 py-2 text-sm font-semibold transition ${dsRadius.full} ${dsColors.wondera.accentBorderInteractive} ${dsColors.wondera.accentBackgroundInteractive} ${dsColors.wondera.accentSoftText} ${dsColors.wondera.accentBackgroundInteractiveHover}`}
          aria-expanded={isDrawerOpen}
          aria-controls="wondera-toc-drawer"
        >
          Contents
        </button>

        {isDrawerOpen ? (
          <div
            className="fixed inset-0 z-40 bg-black/45"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
        ) : null}

        <nav
          id="wondera-toc-drawer"
          className={`fixed bottom-20 right-4 z-50 w-[min(22rem,calc(100vw-2rem))] p-4 transition duration-200 ${dsRadius.lg} ${dsSurface.drawerOnDark} ${
            isDrawerOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
          aria-label="Wondera case study table of contents drawer"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            On this page
          </p>
          <ul className="mt-3 max-h-[50vh] space-y-1 overflow-y-auto">
            {sections.map((section) => {
              const isActive = section.id === activeId;
              return (
                <li key={`drawer-${section.id}`}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => handleNavClick(event, section.id)}
                    className={`block ${dsRadius.sm} px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? `${dsColors.wondera.accentBackgroundSelected} ${dsColors.wondera.accentText}`
                        : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100"
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
