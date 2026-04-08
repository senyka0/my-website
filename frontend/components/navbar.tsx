'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/lib/store';
import { useActiveSection, type Section } from '@/lib/hooks/use-active-section';
import type { CV } from '@/lib/types';

const NAV_ITEMS: { label: string; href: Section }[] = [
  { label: 'Home', href: 'hero' },
  { label: 'About', href: 'about' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projects', href: 'projects' },
];

type NavbarProps = {
  cvData?: CV;
};

export function Navbar({ cvData }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const activeSection = useActiveSection();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const socials = [
    {
      id: 'github',
      href: cvData?.gitHubUrl,
      label: 'GitHub',
      icon: Github,
      external: true,
    },
    {
      id: 'linkedin',
      href: cvData?.linkedInUrl,
      label: 'LinkedIn',
      icon: Linkedin,
      external: true,
    },
    {
      id: 'email',
      href: cvData?.email ? `mailto:${cvData.email}` : undefined,
      label: 'Email',
      icon: Mail,
      external: false,
    },
  ].filter((item) => Boolean(item.href));

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      >
        <div className="mx-auto max-w-6xl">
          <div className="glass-strong rounded-2xl px-4 py-3 md:px-6">
            <div className="flex items-center justify-between">
              <motion.button
                onClick={() => scrollTo('hero')}
                className="text-lg font-semibold tracking-tight"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-gradient">
                  {cvData ? `${cvData.name.charAt(0)}${cvData.surname.charAt(0)}` : 'AK'}
                </span>
              </motion.button>
              <div className="hidden items-center gap-1 md:flex">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      activeSection === item.href
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {activeSection === item.href && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 rounded-lg bg-muted"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="hidden items-center gap-2 md:flex">
                {socials.map((item) => (
                  <Button key={item.id} variant="ghost" size="icon" asChild className="h-9 w-9">
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      aria-label={item.label}
                    >
                      <item.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}

                <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9" aria-label="Toggle theme">
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                {cvData?.linkCV && (
                  <Button asChild size="sm" className="ml-2">
                    <a href={cvData.linkCV} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </a>
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2 md:hidden">
                <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9" aria-label="Toggle theme">
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="h-9 w-9" aria-label="Toggle menu">
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="flex h-full flex-col items-center justify-center gap-8"
            >
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  onClick={() => scrollTo(item.href)}
                  className={`text-3xl font-medium transition-colors ${
                    activeSection === item.href ? 'text-gradient' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex items-center gap-4 pt-8"
              >
                {socials.map((item) => (
                  <Button key={item.id} variant="outline" size="icon" asChild>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      aria-label={item.label}
                    >
                      <item.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </motion.div>

              {cvData?.linkCV && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button asChild size="lg">
                    <a href={cvData.linkCV} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" />
                      Download CV
                    </a>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
