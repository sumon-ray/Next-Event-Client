"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Rocket,
  TrendingUp,
  Award,
  Target,
  // Lightbulb,
  // Users,
  // Globe,
  Zap,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Users,
  Globe,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Title from "../shared/Title"
import NextButton from "../shared/NextButton"

export default function StorySection() {
  const storyRef = useRef<HTMLDivElement>(null)
  const storyInView = useInView(storyRef, { once: true, amount: 0.2 })
  const [activeYear, setActiveYear] = useState(0)

  const timelineItems = [
    {
      year: "2022",
      title: "The Starting",
      badge: "Foundation",
      icon: <Rocket className="w-6 h-6" />,
      color: "#1E3A8A",
      description:
        "Founded in 2020,Next Event began as a simple solution for community organizers struggling with event management during the pandemic. What started as a tool for virtual events quickly evolved as we identified gaps in the market.",
      mission: "To create accessible virtual event solutions during global lockdowns",
      achievement: "Launched our first virtual event platform with 500+ users",
      image: "/images/stat1.png",
    },
    {
      year: "2023-2024",
      title: "Evolution & Growth",
      badge: "Expansion",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "#1E3A8A",
      description:
        "By 2021, we expanded to support hybrid and in-person events, adding features like payment processing, private events, and approval workflows. Our user base grew as organizers appreciated our flexible, secure approach.",
      mission: "To bridge virtual and physical event experiences seamlessly",
      achievement: "Reached 10,000 active users and processed over $1M in event payments",
      image: "/images/stat2.png",
    },
    {
      year: "2024-Present",
      title: "Today & Beyond",
      badge: "Innovation",
      icon: <Award className="w-6 h-6" />,
      color: "#1E3A8A",
      description:
        "Today,Next Event serves thousands of event creators and participants worldwide. We continue to innovate with new features while maintaining our core values of security, flexibility, and user-centered design.",
      mission: "To revolutionize event planning with AI-powered tools and global accessibility",
      achievement: "Expanded to 25+ countries with 50,000+ active users and 98% satisfaction rate",
      image: "/images/stat3.jpg",

    },
  ]

  const nextItem = () => {
    setActiveYear((prev) => (prev === timelineItems.length - 1 ? 0 : prev + 1))
  }

  const prevItem = () => {
    setActiveYear((prev) => (prev === 0 ? timelineItems.length - 1 : prev - 1))
  }

  return (
    <section ref={storyRef} className="container relative py-24 mx-auto overflow-hidden bg-gradient-to-b ">
    
      <div className="absolute top-0 right-0 w-1/3 -translate-y-1/2 rounded-full h-1/3 translate-x-1/3 blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/4 translate-y-1/2 rounded-full h-1/4 -translate-x-1/3 blur-3xl opacity-70"></div>

      <div className="relative z-10 px-4 mx-auto md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={storyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <p className="mb-4 bg-[#1E3A8A] p-1 px-2 text-xs w-fit mx-auto text-white rounded-lg">@ Our Journey</p>
        <Title title={"Our Story & Mission"} />
          <p className="text-xl text-gray">
            From humble beginnings to industry innovation — discover how we are transforming event planning . Click each of the tabls below to learn more about our journey.
          </p>
        </motion.div>

        
        <div className="pl-4 pr-10 mb-16">
          <div className="relative">
          
            <div className="absolute left-0 w-full h-1 -translate-y-1/2 rounded-full top-1/2"></div>

         
            <div className="relative flex items-center justify-between">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={
                    storyInView
                      ? {
                          scale: activeYear === index ? 1.2 : 1,
                          opacity: 1,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  onClick={() => setActiveYear(index)}
                  className="z-10 cursor-pointer"
                >
                  <div
                    className={`
                      w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center
                      transition-all duration-300 relative
                      ${
                        activeYear === index
                          ? `bg-[${item.color}] text-white scale-110`
                          : `bg-[${item.color}] text-[${item.color}] hover:bg-[${item.color}]`
                      }
                    `}
                  >
                    {item.icon}

                 
                    <div
                      className={`
                        absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap
                        font-bold transition-all duration-300
                        ${activeYear === index ? `text-[${item.color}] text-lg` : "text-gray-500 text-sm"}
                      `}
                    >
                      {item.year} 
                    </div>

                
                    {activeYear === index && (
                      <motion.div
                        className={`absolute -top-1 -right-1 w-4 h-4 bg-[${item.color}]-500 rounded-full`}
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2"
            >
            
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative z-10 overflow-hidden shadow-2xl rounded-2xl"
                  >
                    <Image
                      src={timelineItems[activeYear].image || "/placeholder.svg"}
                      alt={timelineItems[activeYear].title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-auto"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr from-${timelineItems[activeYear].color}-900/70 via-${timelineItems[activeYear].color}-800/40 to-transparent mix-blend-multiply`}
                    ></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <Badge className={`mb-2  backdrop-blur-sm text-white border-none`}>
                        {timelineItems[activeYear].badge}
                      </Badge>
                      <h3 className="text-2xl font-bold">{timelineItems[activeYear].title}</h3>
                    </div>
                  </motion.div>

                  <div
                    className={`absolute -top-6 -right-6 w-24 h-24 bg-${timelineItems[activeYear].color} rounded-full z-0`}
                  ></div>
                  <div
                    className={`absolute -bottom-8 -left-8 w-32 h-32 bg-${timelineItems[activeYear].color} rounded-full z-0`}
                  ></div>
                </div>
              </div>

        
              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Badge
                    className={`mb-4 bg-${timelineItems[activeYear].color} text-${timelineItems[activeYear].color}`}
                  >
                    {timelineItems[activeYear].year}
                  </Badge>
              <div className="mb-4">
                  <Title title={timelineItems[activeYear].title} />
              </div> 
                  <p className="mb-8 text-lg leading-relaxed text-gray">{timelineItems[activeYear].description}</p>

                  <div className="grid grid-cols-1 gap-4 my-8 md:grid-cols-2">
                    <Card
                      className={`border-none shadow-md bg-gradient-to-br from-${timelineItems[activeYear].color}-50 to-white`}
                    >
                      <CardContent className="pt-6">
                        <div
                          className={`bg-${timelineItems[activeYear].color} rounded-full w-12 h-12 flex items-center justify-center mb-4`}
                        >
                          <Target className={`h-6 w-6 text-[#1E3A8A]`} />
                        </div>
                        <h4 className="mb-2 text-lg text-[#1E3A8A] font-bold">Our Mission</h4>
                        <p className="text-gray">{timelineItems[activeYear].mission}</p>
                      </CardContent>
                    </Card>

                    <Card
                      className={`border-none shadow-md bg-gradient-to-br from-${timelineItems[activeYear].color}-50 to-white`}
                    >
                      <CardContent className="pt-6">
                        <div
                          className={`bg-${timelineItems[activeYear].color} rounded-full w-12 h-12 flex items-center justify-center mb-4`}
                        >
                          <Zap className={`h-6 w-6 text-[#1E3A8A]`} />
                        </div>
                        <h4 className="mb-2 text-lg font-bold text-[#1E3A8A]">Key Achievement</h4>
                        <p className="text-gray">{timelineItems[activeYear].achievement}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex items-center justify-between">
                   <NextButton name="Previous" onClick={prevItem} />

                    <div className="flex gap-1">
                      {timelineItems.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${activeYear === index ? `bg-${timelineItems[activeYear].color}` : "bg-gray-300"}`}
                          onClick={() => setActiveYear(index)}
                        />
                      ))}
                    </div>

                  <NextButton name="Next" onClick={nextItem} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>



      </div>
    </section>
  )
}
