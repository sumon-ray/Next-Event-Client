"use client";

import { motion, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NextButton from "../shared/NextButton";

interface HeroSectionProps {
  heroY: MotionValue<string>;
  heroOpacity: MotionValue<number>;
}

const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ heroY, heroOpacity }, ref) => {
    return (
      <section
        ref={ref}
        className="relative flex items-center justify-center h-screen overflow-hidden"
      >
       
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-black/50"></div>
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-blue-900/30 to-indigo-900/30 mix-blend-multiply"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute object-cover w-full h-full"
            poster="/placeholder.svg?height=1080&width=1920"
          >
            <source src="/images/video.mp4" type="video/mp4" />
           
            <Image
              src="/images/video.mp4"
              alt="Events background"
              fill
              className="object-cover"
              priority
            />
          </video>
        </div>

       
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container relative z-30 px-4 mx-auto text-center "
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="px-4 py-2 mx-auto mb-6 text-sm text-white border-none rounded-md w-fit bg-white/20 backdrop-blur-sm">
              Connecting Communities Through Events
            </p>
            <h1 className="mx-auto mb-6 text-5xl font-bold tracking-tight text-white rounded-md md:text-6xl lg:text-7xl">
              Revolutionizing{" "}
              <span className="tracking-wide text-transparent  drop-shadow-sm bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text">
                   Event  Planning
              </span>
           
            </h1>
            <p className="max-w-3xl pb-8 mx-auto mb-10 text-xl leading-relaxed md:text-2xl text-white/90">
              We are building the most comprehensive platform for creating,
              managing, and participating in events of all types.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-12 mt-20"
          ><Link href="/events">
              
               
                 <NextButton name="Explore Events" onClick={() => {}} ></NextButton>
              </Link>
         
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-white rounded-full hover:bg-white/10 hover:text-white backdrop-blur-sm"
            >
              <Link href="/register">Join Our Community</Link>
            </Button>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute py-8 my-4 transform -translate-x-1/2 bottom-10 left-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="flex justify-center w-8 pt-2 border-2 rounded-full h-14 border-white/50"
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



