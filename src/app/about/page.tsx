"use client";

import CtaSection from "@/components/AboutUs/cta-section";
import FaqSection from "@/components/AboutUs/faq-section";
import FeaturesSection from "@/components/AboutUs/features-section";
import HeroSection from "@/components/AboutUs/hero-section";
// import MissionSection from "@/components/AboutUs/misson-section";
import StorySection from "@/components/AboutUs/story-section";
import TeamSection from "@/components/AboutUs/team-section";
import TestimonialsSection from "@/components/AboutUs/testimonial-section";
import ValuesSection from "@/components/AboutUs/values-section";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// import HeroSection from "./components/hero-section"
// import MissionSection from "./components/mission-section"
// import StorySection from "./components/story-section"
// import ValuesSection from "./components/values-section"
// import FeaturesSection from "./components/features-section"
// import TeamSection from "./components/team-section"
// import TestimonialsSection from "./components/testimonials-section"
// import FaqSection from "./components/faq-section"
// import CtaSection from "./components/cta-section"

export default function AboutPage() {
  // Parallax effect for hero section
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section with Parallax and Video Background */}
      <HeroSection ref={heroRef} heroY={heroY} heroOpacity={heroOpacity} />

      {/* Mission & Vision with Animated Stats */}
      {/* <MissionSection /> */}

      {/* Our Story with Timeline */}
      <StorySection />

      {/* Core Values with Animated Icons */}
      <ValuesSection />

      {/* Key Features with Interactive Tabs */}
      <FeaturesSection />

      {/* Meet Our Team with Hover Effects */}
      <TeamSection />

      {/* Testimonials Carousel */}
      <TestimonialsSection />

      {/* FAQ Section with Animated Accordions */}
      <FaqSection />

      {/* Contact & CTA Section */}
      <CtaSection />
    </div>
  );
}
