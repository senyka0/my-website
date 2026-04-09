"use client";

import { motion } from "framer-motion";
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

export function Skills({ cvData }: SkillsProps) {
  const skills = cvData?.skills || [];

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

  return (
    <section id="skills" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {cvData?.sectionContent?.skillsTitle}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
          <p className="mt-6 text-muted-foreground">
            {cvData?.sectionContent?.skillsSubtitle}
          </p>
        </motion.div>

        {skills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 text-center"
          >
            <p className="text-muted-foreground">Loading skills...</p>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {orderedCategories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="mb-4 text-lg font-semibold text-primary">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {groupedSkills[category].map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * skillIndex }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted p-2 transition-colors hover:bg-primary/20"
                      title={skill}
                    >
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill}/${skill}-original.svg`}
                        alt={skill}
                        className="h-6 w-6"
                        loading="lazy"
                        onError={(event) => {
                          const target = event.currentTarget;
                          if (target.dataset.fallbackTried === "true") {
                            target.style.display = "none";
                            return;
                          }
                          target.dataset.fallbackTried = "true";
                          target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill}/${skill}-plain.svg`;
                        }}
                      />
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
