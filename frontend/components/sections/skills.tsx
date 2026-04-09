"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { CV } from "@/lib/types";

const SKILL_CATEGORIES: Record<string, string[]> = {
  Frontend: [
    "React",
    "Nextjs",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "TailwindCSS",
    "Vue",
    "Angular",
    "Redux",
  ],
  Backend: [
    "Node.js",
    "Express",
    "Python",
    "Django",
    "FastAPI",
    "Go",
    "Rust",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "RabbitMQ",
  ],
  Blockchain: [
    "Solidity",
    "Ethers.js",
    "Web3.js",
    "Hardhat",
    "Foundry",
    "Smart Contracts",
    "EVM",
    "IPFS",
    "DeFi",
  ],
  Tools: [
    "Git",
    "Docker",
    "AWS",
    "Vercel",
    "CI/CD",
    "Linux",
    "Figma",
    "Testing",
    "Playwright",
    "Selenium",
  ],
};

function categorizeSkill(skill: string): string {
  const lowerSkill = skill.toLowerCase();

  for (const [category, skills] of Object.entries(SKILL_CATEGORIES)) {
    if (
      skills.some(
        (s) =>
          lowerSkill.includes(s.toLowerCase()) ||
          s.toLowerCase().includes(lowerSkill),
      )
    ) {
      return category;
    }
  }
  return "Other";
}

type SkillsProps = {
  cvData?: CV;
};

const skillIconCache = new Map<string, string | null>();

function loadImageSource(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

async function resolveSkillIcon(skill: string): Promise<string | null> {
  const cached = skillIconCache.get(skill);
  if (cached !== undefined) {
    return cached;
  }

  const originalSrc = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill}/${skill}-original.svg`;
  if (await loadImageSource(originalSrc)) {
    skillIconCache.set(skill, originalSrc);
    return originalSrc;
  }

  const plainSrc = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill}/${skill}-plain.svg`;
  if (await loadImageSource(plainSrc)) {
    skillIconCache.set(skill, plainSrc);
    return plainSrc;
  }

  skillIconCache.set(skill, null);
  return null;
}

export function Skills({ cvData }: SkillsProps) {
  const skills = cvData?.skills || [];
  const shouldReduceMotion = useReducedMotion();
  const [iconsLoading, setIconsLoading] = useState(true);
  const [iconSources, setIconSources] = useState<Record<string, string | null>>(
    {},
  );

  const uniqueSkills = useMemo(() => [...new Set(skills)], [skills]);

  useEffect(() => {
    if (!cvData) {
      setIconsLoading(true);
      return;
    }

    if (uniqueSkills.length === 0) {
      setIconSources({});
      setIconsLoading(false);
      return;
    }

    let isCancelled = false;
    setIconsLoading(true);

    const cachedIcons = uniqueSkills
      .filter((skill) => skillIconCache.has(skill))
      .map((skill) => [skill, skillIconCache.get(skill) ?? null] as const);

    const uncachedSkills = uniqueSkills.filter(
      (skill) => !skillIconCache.has(skill),
    );

    if (uncachedSkills.length === 0) {
      setIconSources(Object.fromEntries(cachedIcons));
      setIconsLoading(false);
      return;
    }

    Promise.all(
      uncachedSkills.map(
        async (skill) => [skill, await resolveSkillIcon(skill)] as const,
      ),
    ).then((resolvedIcons) => {
      if (isCancelled) return;
      setIconSources(Object.fromEntries([...cachedIcons, ...resolvedIcons]));
      setIconsLoading(false);
    });

    return () => {
      isCancelled = true;
    };
  }, [cvData, uniqueSkills]);

  const groupedSkills = skills.reduce<Record<string, string[]>>(
    (acc, skill) => {
      const category = categorizeSkill(skill);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    },
    {},
  );

  const orderedCategories = [
    "Frontend",
    "Backend",
    "Blockchain",
    "Tools",
  ].filter((cat) => groupedSkills[cat]?.length);

  const isLoading = !cvData || iconsLoading;

  return (
    <section id="skills" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
          className="mb-10 text-center md:mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {cvData?.sectionContent?.skillsTitle}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
          <p className="mt-6 text-muted-foreground">
            {cvData?.sectionContent?.skillsSubtitle}
          </p>
        </motion.div>

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 text-center"
          >
            <p className="text-muted-foreground">Loading skills...</p>
          </motion.div>
        ) : skills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 text-center"
          >
            <p className="text-muted-foreground">No skills available.</p>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {orderedCategories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, margin: "-50px" }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 0.5, delay: categoryIndex * 0.08 }
                }
                className="glass rounded-2xl p-4 md:p-6"
              >
                <h3 className="mb-4 text-lg font-semibold text-primary">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {groupedSkills[category].map((skill) => (
                    <motion.div
                      key={skill}
                      initial={false}
                      whileInView={undefined}
                      viewport={{ once: true }}
                      transition={undefined}
                      whileHover={
                        shouldReduceMotion ? undefined : { scale: 1.03, y: -1 }
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted p-2 transition-colors hover:bg-primary/20 sm:h-11 sm:w-11"
                      title={skill}
                    >
                      {iconSources[skill] ? (
                        <img
                          src={iconSources[skill] as string}
                          alt={skill}
                          className="h-5 w-5 sm:h-6 sm:w-6"
                          loading="eager"
                          decoding="async"
                          draggable={false}
                        />
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
