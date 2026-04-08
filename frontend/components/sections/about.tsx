"use client";

import { motion } from "framer-motion";
import { Code2, Blocks, Cpu, Zap } from "lucide-react";
import type { CV } from "@/lib/types";

const HIGHLIGHTS = [
  {
    icon: Blocks,
    title: "Web3 Development",
    description:
      "Smart contracts, DeFi protocols, and decentralized applications",
  },
  {
    icon: Code2,
    title: "Full-Stack Apps",
    description:
      "End-to-end solutions with modern frameworks and best practices",
  },
  {
    icon: Cpu,
    title: "Blockchain Integration",
    description: "Seamless integration with multiple blockchain networks",
  },
  {
    icon: Zap,
    title: "Automation",
    description:
      "Efficient workflows, CI/CD pipelines, and process optimization",
  },
];

type AboutProps = {
  cvData?: CV;
};

export function About({ cvData }: AboutProps) {
  return (
    <section id="about" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {cvData?.sectionContent?.aboutTitle}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass rounded-2xl p-6 md:p-8">
              <h3 className="mb-4 text-xl font-semibold">
                {cvData?.sectionContent?.aboutCardTitle}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {cvData?.bio}
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {cvData?.sectionContent?.aboutExtraParagraphOne}
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {cvData?.sectionContent?.aboutExtraParagraphTwo}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {HIGHLIGHTS.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass group rounded-xl p-5 transition-colors hover:border-primary/30"
              >
                <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary/20">
                  <highlight.icon className="h-5 w-5" />
                </div>
                <h4 className="mb-1 font-semibold">{highlight.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
