"use client";

import { motion, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  heroY: MotionValue<string>;
  heroOpacity: MotionValue<number>;
}

const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ heroY, heroOpacity }, ref) => {
    return (
      <section
        ref={ref}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-indigo-900/30 mix-blend-multiply z-20"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
            poster="/placeholder.svg?height=1080&width=1920"
          >
            <source src="/images/video.mp4" type="video/mp4" />
            {/* Fallback image */}
            <Image
              src="/images/video.mp4"
              alt="Events background"
              fill
              className="object-cover"
              priority
            />
          </video>
        </div>

        {/* Hero Content with Parallax Effect */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container relative z-30 mx-auto px-4 text-center "
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-6 px-4 py-2 text-sm bg-white/20 backdrop-blur-sm text-white border-none">
              Connecting Communities Through Events
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Revolutionizing{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                Event Planning
              </span>
            </h1>
            <p className="text-xl md:text-2xl pb-8 text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              We are building the most comprehensive platform for creating,
              managing, and participating in events of all types.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex  flex-wrap justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className=" text-blue-700 hover:bg-blue-50 h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/events">
                Explore Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className=" border-white hover:bg-white/20 hover:text-black h-14 px-8 text-lg rounded-full backdrop-blur-sm"
            >
              <Link href="/register">Join Our Community</Link>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute py-8 bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="w-8 h-14 rounded-full border-2 border-white/50 flex justify-center pt-2"
            >
              <motion.div className="w-1.5 h-3 rounded-full bg-white" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export default HeroSection;
