"use client"

import { motion, type MotionValue } from "framer-motion"
import Image from "next/image"

interface ParallaxHeroProps {
  textY?: MotionValue<number>
  opacity?: MotionValue<number>
}

export default function ParallaxHero({ opacity }: ParallaxHeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Simplified background - removed multiple layers */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1920&width=1080"
          alt="Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-indigo-900/70 mix-blend-multiply"></div>
      </div>

      {/* Simplified content - removed complex animations */}
      <motion.div style={{ opacity }} className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Let's Start a <span className="text-blue-300">Conversation</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10">
            We're here to answer your questions and help you succeed
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact-form"
              className="bg-white text-blue-700 px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Us
            </a>
            <a
              href="tel:+15551234567"
              className="bg-transparent text-white border-2 border-white/50 px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300"
            >
              Call Now
            </a>
          </div>
        </motion.div>

        {/* Simplified scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-14 rounded-full border-2 border-white/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-white animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
