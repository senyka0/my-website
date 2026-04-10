"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";
import type { CV, Project } from "@/lib/types";

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group glass rounded-2xl p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 md:hover:-translate-y-2">
      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
          <Folder className="h-5 w-5" />
        </div>
        <div className="flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={`View ${project.name} source code`}
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={`View ${project.name} live demo`}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
      <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
        {project.name}
      </h3>
      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-muted/50 px-2 py-1 font-mono text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 5 && (
          <span className="rounded-md bg-muted/50 px-2 py-1 font-mono text-xs text-muted-foreground">
            +{project.technologies.length - 5}
          </span>
        )}
      </div>
    </article>
  );
}

type ProjectsProps = {
  cvData?: CV;
  projects?: Project[];
};

export function Projects({ cvData, projects = [] }: ProjectsProps) {
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
    <section id="projects" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeInView} className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {cvData?.sectionContent?.projectsTitle}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
          <p className="mt-6 text-muted-foreground">
            {cvData?.sectionContent?.projectsSubtitle}
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center">
            <Folder className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : (
          <motion.div
            {...fadeInView}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
