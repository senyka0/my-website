"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile/low-power devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(hover: none)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Disable animations on mobile or when user prefers reduced motion
  const disableAnimation = shouldReduceMotion || isMobile;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Static gradient orbs with CSS-only animations for desktop, static for mobile */}
      <div
        className={`absolute -top-40 -right-40 h-[300px] w-[300px] rounded-full bg-primary/15 blur-[60px] md:h-[500px] md:w-[500px] md:blur-[100px] will-change-transform ${
          disableAnimation ? "" : "animate-float-slow"
        }`}
        style={{ transform: "translate3d(0, 0, 0)" }}
      />
      <div
        className={`absolute -bottom-40 -left-40 h-[250px] w-[250px] rounded-full bg-accent/10 blur-[50px] md:h-[400px] md:w-[400px] md:blur-[80px] will-change-transform ${
          disableAnimation ? "" : "animate-float-slower"
        }`}
        style={{ transform: "translate3d(0, 0, 0)" }}
      />
      {/* Only show third orb on desktop */}
      <div
        className={`absolute top-1/2 left-1/2 hidden h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[60px] md:block will-change-transform ${
          disableAnimation ? "" : "animate-float-medium"
        }`}
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      />
      {/* Grid pattern - hidden on mobile for performance */}
      <div
        className="absolute inset-0 hidden opacity-[0.02] md:block"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                           linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
