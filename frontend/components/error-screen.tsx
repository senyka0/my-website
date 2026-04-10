"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorScreenProps = {
  error: Error;
  onRetry: () => void;
};

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-2xl p-8 text-center">
        <div className="mx-auto mb-6 inline-flex rounded-full bg-destructive/10 p-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>

        <p className="mb-6 text-muted-foreground">
          Portfolio data could not be loaded. Check network access and retry.
        </p>

        <div className="mb-6 rounded-lg bg-muted/50 p-3">
          <p className="font-mono text-xs text-muted-foreground break-all">
            {error.message}
          </p>
        </div>

        <Button onClick={onRetry} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
