"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Rocket,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  Users,
  Globe,
  Zap,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function StorySection() {
  const storyRef = useRef<HTMLDivElement>(null)
  const storyInView = useInView(storyRef, { once: true, amount: 0.2 })
  const [activeYear, setActiveYear] = useState(0)

  const timelineItems = [
    {
      year: "2020",
      title: "The Beginning",
      badge: "Foundation",
      icon: <Rocket className="h-6 w-6" />,
      color: "blue",
      description:
        "Founded in 2020, EventHub began as a simple solution for community organizers struggling with event management during the pandemic. What started as a tool for virtual events quickly evolved as we identified gaps in the market.",
      mission: "To create accessible virtual event solutions during global lockdowns",
      achievement: "Launched our first virtual event platform with 500+ users",
      image: "/images/stat1.png",
    },
    {
      year: "2021-2022",
      title: "Evolution & Growth",
      badge: "Expansion",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "indigo",
      description:
        "By 2021, we expanded to support hybrid and in-person events, adding features like payment processing, private events, and approval workflows. Our user base grew as organizers appreciated our flexible, secure approach.",
      mission: "To bridge virtual and physical event experiences seamlessly",
      achievement: "Reached 10,000 active users and processed over $1M in event payments",
      image: "/images/stat2.png",
    },
    {
      year: "2023-Present",
      title: "Today & Beyond",
      badge: "Innovation",
      icon: <Award className="h-6 w-6" />,
      color: "purple",
      description:
        "Today, EventHub serves thousands of event creators and participants worldwide. We continue to innovate with new features while maintaining our core values of security, flexibility, and user-centered design.",
      mission: "To revolutionize event planning with AI-powered tools and global accessibility",
      achievement: "Expanded to 25+ countries with 50,000+ active users and 98% satisfaction rate",
      image: "/images/stat3.png",

    },
  ]

  const nextItem = () => {
    setActiveYear((prev) => (prev === timelineItems.length - 1 ? 0 : prev + 1))
  }

  const prevItem = () => {
    setActiveYear((prev) => (prev === 0 ? timelineItems.length - 1 : prev - 1))
  }

  return (
    <section ref={storyRef} className="py-24 relative overflow-hidden bg-gradient-to-b ">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3  rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4  rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl opacity-70"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={storyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4">Our Journey</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story & Mission</h2>
          <p className="text-xl text-gray-700">
            From humble beginnings to industry innovation — discover how we're transforming event planning
          </p>
        </motion.div>

        {/* Interactive Timeline Navigation */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 w-full h-1  -translate-y-1/2 rounded-full"></div>

            {/* Timeline points */}
            <div className="relative flex justify-between items-center">
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
                          ? `bg-${item.color}-600 text-white scale-110`
                          : `bg-${item.color}-100 text-${item.color}-600 hover:bg-${item.color}-200`
                      }
                    `}
                  >
                    {item.icon}

                    {/* Year label */}
                    <div
                      className={`
                        absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap
                        font-bold transition-all duration-300
                        ${activeYear === index ? `text-${item.color}-700 text-lg` : "text-gray-500 text-sm"}
                      `}
                    >
                      {item.year}
                    </div>

                    {/* Active indicator */}
                    {activeYear === index && (
                      <motion.div
                        className={`absolute -top-1 -right-1 w-4 h-4 bg-${item.color}-500 rounded-full`}
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

        {/* Content Display */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Left side - Image */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <Image
                      src={timelineItems[activeYear].image || "/placeholder.svg"}
                      alt={timelineItems[activeYear].title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
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

                  {/* Decorative elements */}
                  <div
                    className={`absolute -top-6 -right-6 w-24 h-24 bg-${timelineItems[activeYear].color}-200 rounded-full z-0`}
                  ></div>
                  <div
                    className={`absolute -bottom-8 -left-8 w-32 h-32 bg-${timelineItems[activeYear].color}-100 rounded-full z-0`}
                  ></div>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Badge
                    className={`mb-4 bg-${timelineItems[activeYear].color}-100 text-${timelineItems[activeYear].color}-700`}
                  >
                    {timelineItems[activeYear].year}
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">{timelineItems[activeYear].title}</h3>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">{timelineItems[activeYear].description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <Card
                      className={`border-none shadow-md bg-gradient-to-br from-${timelineItems[activeYear].color}-50 to-white`}
                    >
                      <CardContent className="pt-6">
                        <div
                          className={`bg-${timelineItems[activeYear].color}-100 rounded-full w-12 h-12 flex items-center justify-center mb-4`}
                        >
                          <Target className={`h-6 w-6 text-${timelineItems[activeYear].color}-600`} />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Our Mission</h4>
                        <p className="text-gray-700">{timelineItems[activeYear].mission}</p>
                      </CardContent>
                    </Card>

                    <Card
                      className={`border-none shadow-md bg-gradient-to-br from-${timelineItems[activeYear].color}-50 to-white`}
                    >
                      <CardContent className="pt-6">
                        <div
                          className={`bg-${timelineItems[activeYear].color}-100 rounded-full w-12 h-12 flex items-center justify-center mb-4`}
                        >
                          <Zap className={`h-6 w-6 text-${timelineItems[activeYear].color}-600`} />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Key Achievement</h4>
                        <p className="text-gray-700">{timelineItems[activeYear].achievement}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex justify-between items-center">
                    <Button variant="outline" onClick={prevItem} className="flex items-center gap-2">
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex gap-1">
                      {timelineItems.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${activeYear === index ? `bg-${timelineItems[activeYear].color}-600` : "bg-gray-300"}`}
                          onClick={() => setActiveYear(index)}
                        />
                      ))}
                    </div>

                    <Button variant="outline" onClick={nextItem} className="flex items-center gap-2">
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Vision for the future */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={storyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-5xl mx-auto mt-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 text-white">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/90 text-lg mb-6 leading-relaxed">
                We envision a world where event planning is accessible to everyone, where technology enhances human
                connection rather than replacing it, and where every gathering—virtual or physical—creates meaningful
                experiences.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-3 flex-shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <p className="text-white/90">Connecting communities globally</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-3 flex-shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <p className="text-white/90">Sustainable event solutions</p>
                </div>
              </div>
            </div>
            <div className="relative h-full min-h-[300px] md:min-h-0">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Our vision for the future"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-indigo-900/80"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
