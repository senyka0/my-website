"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Code2, Blocks, Cpu, Zap } from "lucide-react";
import type { CV } from "@/lib/types";

const HIGHLIGHT_ICONS = [Blocks, Code2, Cpu, Zap];

type AboutProps = {
  cvData?: CV;
};

export function About({ cvData }: AboutProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeInView = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.4 },
      };

  return (
    <section id="about" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeInView} className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {cvData?.sectionContent?.aboutTitle}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...fadeInView}>
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
          <motion.div {...fadeInView} className="grid gap-4 sm:grid-cols-2">
            {(cvData?.sectionContent?.aboutHighlights ?? []).map(
              (highlight, index) => {
                const Icon = HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length];
                return (
                  <div
                    key={highlight.title}
                    className="glass group rounded-xl p-5 transition-all hover:border-primary/30 md:hover:-translate-y-1"
                  >
                    <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mb-1 font-semibold">{highlight.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {highlight.description}
                    </p>
                  </div>
                );
              },
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
