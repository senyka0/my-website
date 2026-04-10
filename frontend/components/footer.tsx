"use client";

import { ExternalLink, Database, Server } from "lucide-react";
import { PORTFOLIO_CONTRACT_ADDRESS } from "@/lib/portfolio-config";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const contractUrl = `https://sepolia.basescan.org/address/${PORTFOLIO_CONTRACT_ADDRESS}`;

  return (
    <footer className="relative px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="glass rounded-2xl p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-primary" />
              <span>Base Sepolia</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-accent" />
              <span>IPFS Storage</span>
            </div>
          </div>

          <div className="mb-6 text-center">
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
              Smart Contract
            </p>
            <a
              href={contractUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <span className="truncate max-w-[200px] sm:max-w-none">
                {PORTFOLIO_CONTRACT_ADDRESS}
              </span>
              <ExternalLink className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="mx-auto mb-6 h-px w-full max-w-xs bg-border" />
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} • Powered by decentralized technology
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span>Decentralized & Immutable</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
