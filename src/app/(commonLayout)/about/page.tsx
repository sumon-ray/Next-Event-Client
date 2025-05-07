"use client";

import FeaturesSection from "@/components/about/features-section";
import HeroSection from "@/components/about/hero-section";
import StorySection from "@/components/about/story-section";
import TeamSection from "@/components/about/team-section";
import TestimonialsSection from "@/components/about/testimonial-section";
import ValuesSection from "@/components/about/values-section";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <HeroSection ref={heroRef} heroY={heroY} heroOpacity={heroOpacity} />
      <StorySection />
      <ValuesSection />
      <FeaturesSection />
      <TeamSection />
      <TestimonialsSection />
    </div>
  );
}
