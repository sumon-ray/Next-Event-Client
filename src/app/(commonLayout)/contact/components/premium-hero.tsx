"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { User, Mail, Phone, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "./animated-background";

export default function PremiumHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };
  
  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Colored overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-indigo-900/20 z-1"></div>

      {/* Hero content */}
      <div className="container relative z-10 px-4 py-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Headline with staggered animation */}
          <div className="mb-8">
            {isVisible && (
              <>
                <motion.h2 
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={titleVariants}
                  className="text-sm font-medium uppercase tracking-widest text-blue-300 mb-2"
                >
                  We&apos;d Love to Hear From You
                </motion.h2>
                <motion.h1 
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={titleVariants}
                  className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                >
                  Let&apos;s Start a <span className="text-gradient bg-gradient-to-r text-5xl from-blue-400 via-cyan-400 to-teal-400">Conversation</span>
                </motion.h1>
                <motion.p 
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={titleVariants}
                  className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
                >
                  Whether you have a question, a project in mind, or just want to say hello, 
                  our team is here to help you succeed.
                </motion.p>
              </>
            )}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-5 mt-10"
          >
            {/* Email button */}
            <Button 
              size="lg"
              onClick={() => {
                const formElement = document.getElementById("contact-form");
                if (formElement) {
                  formElement.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-white text-slate-900 hover:bg-blue-50 px-8 py-7 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-2 group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Send Message</span>
            </Button>
            
            {/* Call button */}
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.location.href = "tel:+15551234567"}
              className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 px-8 py-7 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call Us Now</span>
            </Button>
            
            {/* Schedule button */}
            <Button 
              size="lg"
              variant="ghost"
              onClick={() => {
                window.open("https://calendly.com", "_blank");
              }}
              className="bg-transparent text-white hover:bg-white/10 px-8 py-7 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2"
            >
              <User className="w-5 h-5" />
              <span>Schedule Meeting</span>
            </Button>
          </motion.div>

          {/* Stats display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
          >
            {[
              { value: "24/7", label: "Customer Support", gradient: "from-blue-400 to-indigo-400" },
              { value: "15min", label: "Response Time", gradient: "from-teal-400 to-emerald-400" },
              { value: "98%", label: "Satisfaction Rate", gradient: "from-cyan-400 to-blue-400" },
              { value: "Global", label: "Presence", gradient: "from-indigo-400 to-purple-400" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className="relative"
              >
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 h-full flex flex-col items-center justify-center">
                  <div className={`absolute -top-1 -bottom-1 left-0 right-0 bg-gradient-to-r ${stat.gradient} opacity-10 rounded-xl`}></div>
                  <span className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</span>
                  <span className="text-blue-200 text-sm">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              repeat: Number.POSITIVE_INFINITY, 
              duration: 2,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              const nextSection = document.getElementById("contact-form");
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="text-white/60 text-sm mb-2">Scroll Down</span>
            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
              <ArrowDown className="w-4 h-4 text-white/60" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
