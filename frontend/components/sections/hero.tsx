"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildIpfsUrl } from "@/lib/portfolio-config";
import type { CV } from "@/lib/types";

type HeroProps = {
  cvData?: CV;
};

export function Hero({ cvData }: HeroProps) {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const photoUrl = cvData?.photoUrl ? buildIpfsUrl(cvData.photoUrl) : "";
  const fullName = `${cvData?.name ?? ""} ${cvData?.surname ?? ""}`.trim();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-4 pt-20"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="glow absolute -inset-2 rounded-full opacity-50" />
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={fullName}
                className="relative h-32 w-32 rounded-full border-2 border-border object-cover md:h-40 md:w-40"
              />
            ) : (
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-border bg-muted md:h-40 md:w-40">
                <span className="text-4xl font-bold text-gradient md:text-5xl">
                  {`${cvData?.name?.charAt(0) ?? ""}${cvData?.surname?.charAt(0) ?? ""}`.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
        >
          {cvData?.name || cvData?.surname ? (
            <>
              {cvData.name}{" "}
              <span className="text-gradient">{cvData.surname}</span>
            </>
          ) : null}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 text-xl font-medium text-muted-foreground md:text-2xl"
        >
          {cvData?.position}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 flex items-center justify-center gap-2 text-muted-foreground"
        >
          <MapPin className="h-4 w-4" />
          <span>{cvData?.location}</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          {cvData?.sectionContent?.heroTagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" onClick={scrollToProjects} className="group">
            View Projects
            <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
          </Button>
          {cvData?.linkCV && (
            <Button variant="outline" size="lg" asChild>
              <a href={cvData.linkCV} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          )}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-2"
        >
          <motion.div className="h-2 w-1 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
