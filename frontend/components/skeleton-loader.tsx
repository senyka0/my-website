"use client";

export function SkeletonLoader() {
  return (
    <div className="min-h-screen px-4 pt-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 h-32 w-32 animate-pulse rounded-full bg-muted md:h-40 md:w-40" />
          <div className="mb-4 h-12 w-80 animate-pulse rounded-lg bg-muted md:h-16 md:w-96" />
          <div className="mb-4 h-6 w-60 animate-pulse rounded-lg bg-muted" />
          <div className="mb-8 h-5 w-40 animate-pulse rounded-lg bg-muted" />
          <div className="mb-10 space-y-2">
            <div className="mx-auto h-5 w-full max-w-lg animate-pulse rounded-lg bg-muted" />
            <div className="mx-auto h-5 w-4/5 max-w-md animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="flex gap-4">
            <div className="h-11 w-36 animate-pulse rounded-lg bg-muted" />
            <div className="h-11 w-36 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 text-muted-foreground">
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
            <span className="ml-2 text-sm">
              Reading profile data from Base Sepolia...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
