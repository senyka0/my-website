"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Download,
  BriefcaseBusiness,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActiveSection, type Section } from "@/lib/hooks/use-active-section";
import type { CV } from "@/lib/types";

const NAV_ITEMS: { label: string; href: Section }[] = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
];

type NavbarProps = {
  cvData?: CV;
};

export function Navbar({ cvData }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection();
  const shouldReduceMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const socials = [
    {
      id: "github",
      href: cvData?.gitHubUrl,
      label: "GitHub",
      icon: Github,
      external: true,
    },
    {
      id: "linkedin",
      href: cvData?.linkedInUrl,
      label: "LinkedIn",
      icon: Linkedin,
      external: true,
    },
    {
      id: "upwork",
      href: cvData?.upworkUrl,
      label: "Upwork",
      icon: BriefcaseBusiness,
      external: true,
    },
    {
      id: "telegram",
      href: cvData?.telegramUrl,
      label: "Telegram",
      icon: Send,
      external: true,
    },
    {
      id: "email",
      href: cvData?.email ? `mailto:${cvData.email}` : undefined,
      label: "Email",
      icon: Mail,
      external: false,
    },
  ].filter((item) => Boolean(item.href));
  const initials =
    `${cvData?.name?.[0] ?? "A"}${cvData?.surname?.[0] ?? "K"}`.toUpperCase();

  return (
    <>
      <motion.nav
        initial={shouldReduceMotion ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={shouldReduceMotion ? undefined : { duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      >
        <div className="mx-auto max-w-6xl">
          <div className="glass-strong rounded-2xl px-4 py-3 md:px-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => scrollTo("hero")}
                className="text-lg font-semibold tracking-tight transition-transform active:scale-95"
              >
                <span className="text-gradient">{initials}</span>
              </button>
              <div className="hidden items-center gap-1 md:flex">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      activeSection === item.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {activeSection === item.href && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 rounded-lg bg-muted"
                        transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", duration: 0.4, bounce: 0.15 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="hidden items-center gap-2 md:flex">
                {socials.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-9 w-9"
                  >
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      aria-label={item.label}
                    >
                      <item.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}

                {cvData?.linkCV && (
                  <Button asChild size="sm" className="ml-2">
                    <a
                      href={cvData.linkCV}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </a>
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2 md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  className="h-9 w-9"
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`text-3xl font-medium transition-colors ${
                    activeSection === item.href
                      ? "text-gradient"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="flex items-center gap-4 pt-8">
                {socials.map((item) => (
                  <Button key={item.id} variant="outline" size="icon" asChild>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      aria-label={item.label}
                    >
                      <item.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>

              {cvData?.linkCV && (
                <Button asChild size="lg">
                  <a
                    href={cvData.linkCV}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download CV
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
