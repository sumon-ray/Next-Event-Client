"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Zap, CreditCard, Users, Lightbulb, Globe, CheckCircle2, Shield, Calendar, ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Title from "../shared/Title"
import NextButton from "../shared/NextButton"

export default function FeaturesSection() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })
  const [activeFeatureTab, setActiveFeatureTab] = useState("organizers")

  return (
    <section ref={featuresRef} className="container relative mx-auto my-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute top-0 right-0 w-1/3 -translate-y-1/2 rounded-full h-1/3 bg-blue-50 translate-x-1/3 blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/4 translate-y-1/2 rounded-full h-1/4 bg-indigo-50 -translate-x-1/3 blur-3xl opacity-70"></div>

      <div className="relative z-10 px-4 mx-auto md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
           <p  className="mb-4 bg-[#1E3A8A] text-xs p-1 px-2 w-fit mx-auto text-white rounded-lg">@ Platform features</p>
         <Title title="How EventHub Works"  />
          <p className="text-xl text-gray-700">
            Our platform simplifies every aspect of event planning and participation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs value={activeFeatureTab} onValueChange={setActiveFeatureTab} className="mx-auto ">
            <TabsList className="grid w-full grid-cols-2 p-1 mb-12 bg-gray-100 rounded-full">
              <TabsTrigger
                value="organizers"
                className="rounded-full py-3 data-[state=active]:bg-[#1E3A8A] data-[state=active]:text-white transition-all duration-300"
              >
                For Event Organizers
              </TabsTrigger>
              <TabsTrigger
                value="attendees"
                className="rounded-full py-3 data-[state=active]:bg-[#1E3A8A] data-[state=active]:text-white transition-all duration-300"
              >
                For Event Attendees
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="organizers" className="mt-0">
                <motion.div
                  key="organizers"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-white shadow-xl rounded-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 md:p-12">
                      <h3 className="mb-8 text-3xl font-bold text-gray-900">Create & Manage Events</h3>
                      <ul className="space-y-6">
                        <li className="flex">
                          <div className="flex items-center justify-center flex-shrink-0 p-2 mr-4 bg-blue-100 rounded-full">
                            <Zap className="w-6 h-6 text-[#3B82F6]" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">Create public or private events</p>
                            <p className="text-gray-600">
                              Control who can see and join your events with flexible visibility options
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex items-center justify-center flex-shrink-0 p-2 mr-4 bg-blue-100 rounded-full">
                            <CreditCard className="w-6 h-6 text-[#3B82F6]" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">Optional registration fees</p>
                            <p className="text-gray-600">
                              Monetize your events with secure payment processing and automated attendee management
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex items-center justify-center flex-shrink-0 p-2 mr-4 bg-blue-100 rounded-full">
                            <Users className="w-6 h-6 text-[#3B82F6]" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">Participant management</p>
                            <p className="text-gray-600">
                              Approve requests, send invitations, and manage attendees with our intuitive dashboard
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex items-center justify-center flex-shrink-0 p-2 mr-4 bg-blue-100 rounded-full">
                            <Lightbulb className="w-6 h-6 text-[#3B82F6]" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">Detailed analytics</p>
                            <p className="text-gray-600">
                              Track registrations, payments, and attendance with real-time insights
                            </p>
                          </div>
                        </li>
                      </ul>
                     <div className="mt-16">
                          <Link href="/dashboard">
                        <NextButton name='Create Events' />
                         
                        </Link>
                      </div>
                    </div>
                    <div className="relative h-full min-h-[400px]">
                      <Image
                      src="/images/events/image1.png"

                        alt="Event organizer dashboard"
                        fill
                        className="object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/20 to-indigo-600/20 mix-blend-multiply"></div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="attendees" className="mt-0">
                <motion.div
                  key="attendees"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-white shadow-xl rounded-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-full min-h-[400px] order-2 md:order-1">
                      <Image
                   src="/images/events/image2.png"

                        alt="Event discovery"
                        fill
                        className="object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 mix-blend-multiply"></div>
                    </div>
                    <div className="order-1 p-8 md:p-12 md:order-2">
                      <h3 className="mb-8 text-3xl font-bold text-gray-900">Discover & Join Events</h3>
                      <ul className="space-y-6">
                        <li className="flex">
                          <div className="flex-shrink-0 p-2 mr-4 bg-indigo-100 rounded-full">
                            <Globe className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">Browse upcoming events</p>
                            <p className="text-gray-600">
                              Find events via homepage slider or detailed listings with advanced filtering
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex-shrink-0 p-2 mr-4 bg-indigo-100 rounded-full">
                            <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">Simple joining process</p>
                            <p className="text-gray-600">
                              Join free public events instantly or request access to private ones
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex-shrink-0 p-2 mr-4 bg-indigo-100 rounded-full">
                            <Shield className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">Secure payments</p>
                            <p className="text-gray-600">
                              Pay registration fees through our integrated payment system with full encryption
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex-shrink-0 p-2 mr-4 bg-indigo-100 rounded-full">
                            <Calendar className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">Event reminders</p>
                            <p className="text-gray-600">
                              Never miss an event with our notification system and calendar integration
                            </p>
                          </div>
                        </li>
                      </ul>
                    
                      <div className="mt-16">
                          <Link href="/events">
                        <NextButton name='Explore Events' />
                         
                        </Link>
                      </div>
                     
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
