'use client';

import { useCVData } from '@/lib/hooks/use-cv-data';
import { AnimatedBackground } from '@/components/animated-background';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Footer } from '@/components/footer';
import { SkeletonLoader } from '@/components/skeleton-loader';
import { ErrorScreen } from '@/components/error-screen';

export function Portfolio() {
  const { data: cvData, isLoading, isError, error, refetch } = useCVData();

  if (isLoading) {
    return (
      <>
        <AnimatedBackground />
        <SkeletonLoader />
      </>
    );
  }

  if (isError && error) {
    return (
      <>
        <AnimatedBackground />
        <ErrorScreen error={error} onRetry={() => refetch()} />
      </>
    );
  }

  return (
    <>
      <AnimatedBackground />
      <Navbar cvData={cvData} />
      <main>
        <Hero cvData={cvData} />
        <About cvData={cvData} />
        <Skills cvData={cvData} />
        <Projects cvData={cvData} projects={cvData?.projects} />
      </main>
      <Footer />
    </>
  );
}
