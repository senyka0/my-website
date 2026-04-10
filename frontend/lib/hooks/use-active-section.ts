"use client";

import { useState, useEffect } from "react";

const SECTIONS = ["hero", "about", "skills", "projects"] as const;
export type Section = (typeof SECTIONS)[number];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<Section>("hero");

  useEffect(() => {
    const sectionElements = SECTIONS.map((section) => {
      const element = document.getElementById(section);
      return element ? { section, element } : null;
    }).filter(
      (item): item is { section: Section; element: HTMLElement } =>
        item !== null,
    );

    if (!sectionElements.length) {
      return;
    }

    const updateActiveSection = () => {
      const viewportHeight = window.innerHeight;
      const scrollBottom = window.scrollY + viewportHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= documentHeight - 4) {
        setActiveSection(sectionElements[sectionElements.length - 1].section);
        return;
      }

      const probeY = viewportHeight * 0.35;
      let current: Section = sectionElements[0].section;

      for (const { section, element } of sectionElements) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= probeY) {
          current = section;
        } else {
          break;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return activeSection;
}
