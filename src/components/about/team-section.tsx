"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Linkedin, Twitter, Mail } from 'lucide-react'

import { Badge } from "@/components/ui/badge"

export default function TeamSection() {
  const teamRef = useRef<HTMLDivElement>(null)
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 })

  return (
    <section ref={teamRef} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-100">Our People</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-700">The passionate individuals behind EventHub</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Team Member 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
              <div className="aspect-square relative overflow-hidden">
                <Image
                 src="/images/profile/profile1.jpg"
                  alt="Sarah Johnson"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-center space-x-3">
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Twitter className="h-5 w-5 text-white" />
                      </a>
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Mail className="h-5 w-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-900">Sarah Johnson</h3>
                <p className="text-blue-600 mb-3 font-medium">CEO & Co-Founder</p>
                <p className="text-gray-600 text-sm">
                  With 15+ years in tech and event management, Sarah leads our vision and strategy.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Team Member 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
              <div className="aspect-square relative overflow-hidden">
                <Image
                 src="/images/profile/profile2.jpg"

                  alt="Michael Chen"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-center space-x-3">
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Twitter className="h-5 w-5 text-white" />
                      </a>
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Mail className="h-5 w-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-900">Michael Chen</h3>
                <p className="text-indigo-600 mb-3 font-medium">CTO & Co-Founder</p>
                <p className="text-gray-600 text-sm">
                  Michael architects our platform, ensuring security, scalability, and innovation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Team Member 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
              <div className="aspect-square relative overflow-hidden">
                <Image
             src="/images/profile/profile3.jpg"

                  alt="Aisha Patel"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-center space-x-3">
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Twitter className="h-5 w-5 text-white" />
                      </a>
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Mail className="h-5 w-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-900">Aisha Patel</h3>
                <p className="text-purple-600 mb-3 font-medium">Head of Product</p>
                <p className="text-gray-600 text-sm">
                  Aisha translates user needs into features that make event planning seamless.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Team Member 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src="/images/profile1.jpg"
                  alt="David Rodriguez"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-center space-x-3">
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Twitter className="h-5 w-5 text-white" />
                      </a>
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors">
                        <Mail className="h-5 w-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-900">David Rodriguez</h3>
                <p className="text-teal-600 mb-3 font-medium">Head of Customer Success</p>
                <p className="text-gray-600 text-sm">
                  David ensures our users have the best experience with our platform. that is awesome
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
