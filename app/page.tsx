"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { GrainOverlay } from "@/app/components/GrainOverlay";
import { CustomCursor } from "@/app/components/CustomCursor";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { Navigation } from "@/app/components/Navigation";
import { Loader } from "@/app/components/Loader";
import { HeroSection } from "@/app/sections/HeroSection";
import { IdentitySection } from "@/app/sections/IdentitySection";
import { ArsenalSection } from "@/app/sections/ArsenalSection";
import { PhilosophySection } from "@/app/sections/PhilosophySection";
import { ProjectsSection } from "@/app/sections/ProjectsSection";
import { AchievementsSection } from "@/app/sections/AchievementsSection";
import { FootprintSection } from "@/app/sections/FootprintSection";
import { FinalSection } from "@/app/sections/FinalSection";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Init Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll-linked reveal
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    const revealEls = document.querySelectorAll(
      ".reveal-up, .reveal-fade, .reveal-left"
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    // Skill bar animation
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll(".skill-bar-fill");
            fills.forEach((fill) => fill.classList.add("animated"));
          }
        });
      },
      { threshold: 0.3 }
    );

    const skillSections = document.querySelectorAll(".skill-section");
    skillSections.forEach((el) => skillObserver.observe(el));

    return () => {
      lenis.destroy();
      revealObserver.disconnect();
      skillObserver.disconnect();
    };
  }, [loaded]);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      {loaded && (
        <main className="relative bg-obsidian">
          <GrainOverlay />
          <CustomCursor />
          <ScrollProgress />
          <Navigation />
          <HeroSection />
          <IdentitySection />
          <ArsenalSection />
          <PhilosophySection />
          <ProjectsSection />
          <AchievementsSection />
          <FootprintSection />
          <FinalSection />
        </main>
      )}
    </>
  );
}
