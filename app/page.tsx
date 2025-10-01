"use client";
import {
  AboutSection,
  CtaSection,
  Footer,
} from "@/component/homepage/AboutSection";
import { CalmnessTrackerSection } from "@/component/homepage/CalmnessTrackerSection";
import { ExercisesPreviewSection } from "@/component/homepage/ExercisesPreviewSection";
import { HeroSection } from "@/component/homepage/HeroSection";
import { HowItWorksSection } from "@/component/homepage/HowItWorksSection";
import { TestimonialsSection } from "@/component/homepage/TestimonialsSection";

// The Main Page Component
export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Base Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-primary/10 via-transparent to-primary/10 dark:from-primary/20 dark:via-transparent dark:to-primary/20"></div>

      {/* Extra Gradient Blobs */}
      <div className="absolute -top-20 -left-20 w-[35rem] h-[35rem] bg-gradient-to-tr from-pink-200 via-rose-200 to-transparent opacity-40 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-gradient-to-bl from-blue-200 via-indigo-200 to-transparent opacity-40 blur-3xl rounded-full -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[25rem] h-[25rem] bg-gradient-to-t from-purple-200 via-violet-200 to-transparent opacity-30 blur-3xl rounded-full -z-10"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
       <main className="space-y-12">
          <HeroSection />
          <HowItWorksSection />
          <ExercisesPreviewSection />
          <TestimonialsSection />
          <CalmnessTrackerSection />
          <AboutSection />
          <CtaSection />
        </main>
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </div>
  );
}
