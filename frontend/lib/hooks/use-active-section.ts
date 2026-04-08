"use client";

import { useState, useEffect } from "react";

const SECTIONS = ["hero", "about", "skills", "projects"] as const;
export type Section = (typeof SECTIONS)[number];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<Section>("hero");

  useEffect(() => {
    const sectionElements = SECTIONS.map((section) => ({
      section,
      element: document.getElementById(section),
    })).filter((item): item is { section: Section; element: HTMLElement } =>
      Boolean(item.element),
    );

    if (!sectionElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) {
          return;
        }

        const currentId = visible[0].target.id as Section;
        setActiveSection(currentId);
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sectionElements.forEach(({ element }) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
