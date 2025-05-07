"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Zap, CreditCard, Users, Lightbulb, Globe, CheckCircle2, Shield, Calendar, ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FeaturesSection() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })
  const [activeFeatureTab, setActiveFeatureTab] = useState("organizers")

  return (
    <section ref={featuresRef} className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-50 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl opacity-70"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-teal-100 text-teal-700 hover:bg-teal-100">Platform Features</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How EventHub Works</h2>
          <p className="text-xl text-gray-700">
            Our platform simplifies every aspect of event planning and participation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs value={activeFeatureTab} onValueChange={setActiveFeatureTab} className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-12 p-1 bg-gray-100 rounded-full">
              <TabsTrigger
                value="organizers"
                className="rounded-full py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                For Event Organizers
              </TabsTrigger>
              <TabsTrigger
                value="attendees"
                className="rounded-full py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
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
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 md:p-12">
                      <h3 className="text-3xl font-bold mb-8 text-gray-900">Create & Manage Events</h3>
                      <ul className="space-y-6">
                        <li className="flex">
                          <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
                            <Zap className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Create public or private events</p>
                            <p className="text-gray-600">
                              Control who can see and join your events with flexible visibility options
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
                            <CreditCard className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Optional registration fees</p>
                            <p className="text-gray-600">
                              Monetize your events with secure payment processing and automated attendee management
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
                            <Users className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Participant management</p>
                            <p className="text-gray-600">
                              Approve requests, send invitations, and manage attendees with our intuitive dashboard
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
                            <Lightbulb className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Detailed analytics</p>
                            <p className="text-gray-600">
                              Track registrations, payments, and attendance with real-time insights
                            </p>
                          </div>
                        </li>
                      </ul>
                      <Button asChild className="mt-10 bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-6 h-auto">
                        <Link href="/dashboard">
                          Create Your First Event
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                    <div className="relative h-full min-h-[400px]">
                      <Image
                      src="/images/events/image1.png"

                        alt="Event organizer dashboard"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 mix-blend-multiply"></div>
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
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-full min-h-[400px] order-2 md:order-1">
                      <Image
                   src="/images/events/image2.png"

                        alt="Event discovery"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 mix-blend-multiply"></div>
                    </div>
                    <div className="p-8 md:p-12 order-1 md:order-2">
                      <h3 className="text-3xl font-bold mb-8 text-gray-900">Discover & Join Events</h3>
                      <ul className="space-y-6">
                        <li className="flex">
                          <div className="bg-indigo-100 rounded-full p-2 mr-4 flex-shrink-0">
                            <Globe className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Browse upcoming events</p>
                            <p className="text-gray-600">
                              Find events via homepage slider or detailed listings with advanced filtering
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-indigo-100 rounded-full p-2 mr-4 flex-shrink-0">
                            <CheckCircle2 className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Simple joining process</p>
                            <p className="text-gray-600">
                              Join free public events instantly or request access to private ones
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-indigo-100 rounded-full p-2 mr-4 flex-shrink-0">
                            <Shield className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Secure payments</p>
                            <p className="text-gray-600">
                              Pay registration fees through our integrated payment system with full encryption
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-indigo-100 rounded-full p-2 mr-4 flex-shrink-0">
                            <Calendar className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Event reminders</p>
                            <p className="text-gray-600">
                              Never miss an event with our notification system and calendar integration
                            </p>
                          </div>
                        </li>
                      </ul>
                      <Button asChild className="mt-10 bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 py-6 h-auto">
                        <Link href="/events">
                          Explore Events
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
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
