"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Linkedin, Twitter, Mail } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import Title from "../shared/Title"

export default function TeamSection() {
  const teamRef = useRef<HTMLDivElement>(null)
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 })

  return (
    <section ref={teamRef} className="py-24 bg-white">
      <div className="container px-4 mx-auto md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
             <p  className="mb-4 bg-[#1E3A8A] text-xs p-1 px-2 w-fit mx-auto text-white rounded-lg">@ Our People</p>
       <Title title="Meet the Team"  />
          <p className="text-xl text-gray-700">The passionate individuals behind EventHub</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 mx-auto mt-20 md:grid-cols-2 lg:grid-cols-4">
      
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl group-hover:shadow-2xl">
              <div className="relative overflow-hidden aspect-square">
                <Image
                 src="/images/profile/profile1.jpg"
                  alt="Sarah Johnson"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end transition-opacity duration-300 opacity-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent group-hover:opacity-100">
                  <div className="w-full p-6">
                    <div className="flex justify-center space-x-3">
                      <a href="#" className="p-2 transition-colors rounded-full bg-white/20 hover:bg-white/40">
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                      <a href="#" className="p-2 transition-colors rounded-full bg-white/20 hover:bg-white/40">
                        <Twitter className="w-5 h-5 text-white" />
                      </a>
                      <a href="#" className="p-2 transition-colors rounded-full bg-white/20 hover:bg-white/40">
                        <Mail className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-xl font-bold text-gray-900">Sarah Johnson</h3>
                <p className="mb-3 font-medium text-blue-600">CEO & Co-Founder</p>
                <p className="text-sm text-gray-600">
                  With 15+ years in tech and event management, Sarah leads our vision and strategy.
                </p>
              </div>
            </div>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl group-hover:shadow-2xl">
              <div className="relative overflow-hidden aspect-square">
                <Image
                 src="/images/profile/profile2.jpg"

                  alt="Michael Chen"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end transition-opacity duration-300 opacity-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/40 to-transparent group-hover:opacity-100">
                  <div className="w-full p-6">
                    <div className="flex justify-center space-x-3">
                      <a href="#" className="p-2 transition-colors rounded-full bg-white/20 hover:bg-white/40">
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                      <a href="#" className="p-2 transition-colors rounded-full bg-white/20 hover:bg-white/40">
                        <Twitter className="w-5 h-5 text-white" />
                      </a>
                      <a href="#" className="p-2 transition-colors rounded-full bg-white/20 hover:bg-white/40">
                        <Mail className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-xl font-bold text-gray-900">Michael Chen</h3>
                <p className="mb-3 font-medium text-indigo-600">CTO & Co-Founder</p>
                <p className="text-sm text-gray-600">
                  Michael architects our platform, ensuring security, scalability, and innovation.
                </p>
              </div>
            </div>
          </motion.div>

        
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl group-hover:shadow-2xl">
              <div className="relative overflow-hidden aspect-square">
                <Image
             src="/images/profile/profile3.jpg"

                  alt="Aisha Patel"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end transition-opacity duration-300 opacity-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent group-hover:opacity-100">
                  <div className="w-full p-6">
                    <div className="flex justify-center space-x-3">
                      <a href="#" className="p-2 transition-colors rounded-full bg-white/20 hover:bg-white/40">
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                      <a href="#" className="p-2 transition-colors rounded-full bg-white/20 hover:bg-white/40">
                        <Twitter className="w-5 h-5 text-white" />
                      </a>
                      <a href="#" className="p-2 transition-colors rounded-full bg-white/20 hover:bg-white/40">
                        <Mail className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-xl font-bold text-gray-900">Aisha Patel</h3>
                <p className="mb-3 font-medium text-purple-600">Head of Product</p>
                <p className="text-sm text-gray-600">
                  Aisha translates user needs into features that make event planning seamless.
                </p>
              </div>
            </div>
          </motion.div>

       
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl group-hover:shadow-2xl">
              <div className="relative overflow-hidden aspect-square">
                <Image
                  src="/images/profile1.jpg"
                  alt="David Rodriguez"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end transition-opacity duration-300 opacity-0 bg-gradient-to-t from-teal-900/80 via-teal-900/40 to-transparent group-hover:opacity-100">
                  <div className="w-full p-6">
                    <div className="flex justify-center space-x-3">
                      <a href="#" className="p-2 transition-colors rounded-full bg-white/20 hover:bg-white/40">
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                      <a href="#" className="p-2 transition-colors rounded-full bg-white/20 hover:bg-white/40">
                        <Twitter className="w-5 h-5 text-white" />
                      </a>
                      <a href="#" className="p-2 transition-colors rounded-full bg-white/20 hover:bg-white/40">
                        <Mail className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-xl font-bold text-gray-900">David Rodriguez</h3>
                <p className="mb-3 font-medium text-teal-600">Head of Customer Success</p>
                <p className="text-sm text-gray-600">
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
